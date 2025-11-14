# FloraPro - Environmental Monitoring System

## Overview

FloraPro is an IoT environmental monitoring system that tracks real-time environmental conditions and soil moisture levels using ESP32 microcontrollers and multiple sensors.

## Features

- Real-time temperature, humidity, and pressure monitoring
- Three soil moisture sensors with percentage readings
- Precise RTC time synchronization
- Responsive web dashboard
- Professional glass morphism design

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

- Next.js 16 with TypeScript
- Tailwind CSS v4
- Phosphor Icons
- Real-time data updates

### Backend

- Next.js API Routes
- Blynk IoT Platform integration
- 5-second data refresh intervals

### Firmware

- ESP32 Arduino-based firmware
- WiFiManager for network configuration
- RTC time synchronization
- Multi-sensor data collection

## Project Structure

```
src/
├── app/
│   ├── api/sensor-data/route.ts
│   ├── components/
│   │   ├── ui/card.tsx
│   │   ├── navbar.tsx
│   │   ├── rtc-display.tsx
│   │   ├── sensor-card.tsx
│   │   ├── soil-moisture-gauge.tsx
│   │   └── status-indicator.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/utils.ts
└── types/sensor.ts
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local`:

```env
BLYNK_BASE_URL=http://iot.serangkota.go.id:8080
BLYNK_AUTH_TOKEN=your_auth_token_here
```

3. Run the development server:

```bash
npm run dev
```

## Sensor Data

The system monitors:

- Temperature (°C) from AHT20
- Humidity (%) from AHT20
- Pressure (hPa) from BMP280
- Altitude (m) from BMP280
- Soil moisture levels from 3 sensors
- Real-time RTC clock data

## License

This project is licensed under the MIT License. Refer to the LICENSE file for complete terms and conditions.
