# Flora

A live readout of soil and air from a field monitor. One plot, the current
reading, and nothing the device did not measure.

## Overview

Flora is an IoT environmental monitoring system. An ESP32 reads a set of
sensors in the field and publishes each reading to Blynk; a Next.js app reads
them back and shows the current state of the soil and the air on one screen.

The interface shows **the current reading only**. There is no history, no
chart, no threshold and no alerting. A value the device did not read is never
displayed as a number — absence is shown as absence, so an outage can never be
mistaken for a real reading of zero.

## The readout

The dashboard is drawn as a handloom rather than a dashboard of cards. A
moisture value is a **count of finished stripes** on a 100-stripe run, where
one stripe is one percentage point, so a reported value is exact and countable
rather than approximated by a gauge or a curve.

Each soil probe is in one of three states, and each renders differently:

| State        | Meaning                                     | Rendering                     |
| ------------ | ------------------------------------------- | ----------------------------- |
| `live`       | The device reported a value on this poll   | Stripes filled to the value   |
| `drained`    | Reported before, has now stopped            | Ghost run, no number shown    |
| `unmeasured` | Never reported                              | Flat bar carrying nothing     |

Only `live` shows a number.

## Features

- Three soil moisture probes rendered as countable stripe runs
- Air temperature, humidity, pressure and altitude in a single weft strip
- Device RTC clock, read from the device rather than the browser
- Independent pin settlement: one failed sensor never blanks the others
- Plain-English interface, legible in direct sun on a phone

## Hardware Components

| No        | Component                    | Quantity | Unit Price (IDR) | Total Price (IDR) | Notes                           |
| --------- | ---------------------------- | -------- | ---------------- | ----------------- | ------------------------------- |
| 1         | BMP280 Sensor Module         | 1        | Rp21,000         | Rp21,000          | Pressure, temperature, altitude |
| 2         | ESP32 DOIT + Expansion Plate | 1        | Rp94,200         | Rp94,200          | Main microcontroller            |
| 3         | Soil Moisture Module         | 3        | Rp49,900         | Rp149,700         | Soil humidity sensing           |
| 4         | LCD 20x4 Display             | 1        | Rp59,900         | Rp59,900          | Status display                  |
| 5         | LCD 20x4 Frame               | 1        | Rp19,500         | Rp19,500          | Display enclosure               |
| 6         | 5V 3A Power Adapter          | 1        | Rp40,000         | Rp40,000          | Power supply                    |
| 7         | RTC DS3231 Module            | 1        | Rp22,500         | Rp22,500          | Real-time clock                 |
| 8         | Jumper Cable F to F          | 1        | Rp16,900         | Rp16,900          | Interconnections                |
| **Total** |                              |          |                  | **Rp423,700**     |                                 |

## Technical Architecture

### Frontend

- Next.js 16 (App Router) with React 19 and TypeScript
- Tailwind CSS v4
- All user-facing strings live in `src/app/copy.ts`
- No icon library and no charting library
- Polls every 5 seconds

### Backend

- Next.js API Route at `/api/sensor-data`
- Reads each pin from Blynk independently, with a 3-second timeout per pin
- Returns `null` for any pin that did not report — never `0`
- Returns `200` with `null` values in `readings`; the route itself succeeded,
  and the nulls carry the truth

### Firmware

- ESP32 Arduino-based firmware
- WiFiManager for network configuration
- RTC time synchronization
- Multi-sensor data collection

## Sensor and pin map

The pin map is fixed by the firmware and is not open to redesign.

| Pin(s)   | Reading                                        | Shown |
| -------- | ---------------------------------------------- | ----- |
| `v0`     | Air temperature (°C), AHT20                    | Yes   |
| `v1`     | Air humidity (%), AHT20                        | Yes   |
| `v2`     | Air pressure (hPa), BMP280                     | Yes   |
| `v3`     | Altitude (m), BMP280                           | Yes   |
| `v4-v6`  | Soil moisture percentages, one per probe       | Yes   |
| `v7-v9`  | Raw soil probe values                          | No    |
| `v10-v15`| Device RTC fields                              | Clock |

Raw probe values (`v7-v9`) are fetched but deliberately not displayed: an
unexplained number is not a reading a grower can act on.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── sensor-data/route.ts   Blynk fetch, per-pin timeout, null on failure
│   ├── components/
│   │   ├── foot.tsx               attribution and scope
│   │   ├── selvedge.tsx           device clock and connection mark
│   │   ├── soil-band.tsx          one probe: label, stripe run, value
│   │   ├── warp-run.tsx           the 100-stripe countable run
│   │   └── weft-strip.tsx         the four air readings
│   ├── copy.ts                    every user-facing string
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx                   poll loop, pin state, layout
└── types/
    └── sensor.ts                  PinReadings, SensorResponse, BandState
```

The product constraints are recorded in `PRODUCT.md` and the design system in
`DESIGN.md`.

## Installation

1. Install dependencies (pnpm — a `pnpm-lock.yaml` is committed):

```bash
pnpm install
```

2. Configure environment variables in `.env` (Next also reads `.env.local`):

```env
BLYNK_BASE_URL=http://iot.serangkota.go.id:8080
BLYNK_AUTH_TOKEN=your_auth_token_here
```

`.env` is git-ignored. Both variables are required; without them the route
reports that Blynk is not configured rather than showing empty readings. Note
the error message names `.env.local` — either filename works.

3. Run the development server:

```bash
pnpm dev
```

## Scripts

| Command      | Purpose                          |
| ------------ | -------------------------------- |
| `pnpm dev`   | Development server               |
| `pnpm build` | Production build                 |
| `pnpm start` | Serve the production build       |
| `pnpm lint`  | ESLint                          |

To type-check: `npx tsc --noEmit`. Note that `next.config.ts` currently sets
`ignoreBuildErrors` and `ignoreDuringBuilds`, so `pnpm build` does not enforce
either — run them directly if you want them to gate a commit.

## Sensor Data

The system monitors:

- Air temperature (°C) from AHT20
- Air humidity (%) from AHT20
- Air pressure (hPa) from BMP280
- Altitude (m) from BMP280
- Soil moisture levels from 3 sensors
- The device's own RTC clock

## License

This project is licensed under the MIT License. Refer to the LICENSE file for complete terms and conditions.
