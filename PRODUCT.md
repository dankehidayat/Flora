# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

Inferred from the codebase (Next.js App Router, no native wrapper or mobile shell) rather than stated by the user. Mobile web counts as `web`; treat as `web` unless evidence of a native app appears.

## Users

Growers and agronomists checking a plot, outdoors in direct sunlight or indoors at home or in the office, on a phone. They open the page to answer one question: does the soil need water right now. They are not monitoring engineers and are not assumed to read documentation.

**Interface language is English (user-confirmed).** This record stays in English as internal documentation.

> **Reversed, deliberately and on purpose.** This line previously read "Interface language is
> Bahasa Indonesia (user-confirmed)", and Product Principle 3 previously read "Speak Indonesian,
> plainly." Both were user-confirmed commitments. The user has since reversed them by explicit
> decision, and the interface is now plain English. The earlier Indonesian commitment is not
> deleted here — it is left in this note so the reversal stays legible and is not mistaken for
> an oversight. Consequence for the build: the decimal separator is a full stop again
> (`29.4 °C`, not `29,4 °C`), and every user-facing string lives in `src/app/copy.ts`.

## Product Purpose

Let a grower read the current condition of their plot's soil and air from a phone, without installing anything, and decide whether to water.

A live, read-only display is the finished product by decision, not by omission. There is no history, no charting, no thresholds, and no alerting, and none should be implied in the product's voice. Success is a grower seeing the current reading in seconds and acting on it.

## Positioning

Field-specific soil and air readings, measured by the plot's own hardware and read in a browser. Three soil probes in one kit, a hardware real-time clock so the reading is timestamped by the device itself, and a self-hosted backend so a grower is not dependent on a consumer cloud account. The browser page exists to show what the ESP32's own 20×4 LCD cannot.

Do not describe the product as intelligent, predictive, or automated anywhere user-facing. It reports measurements; it does not decide anything.

## Operating Context

- The ESP32 sits in the plot with its 20×4 LCD, WiFiManager-configured network, and DS3231 RTC.
- Readings flow ESP32 → Blynk virtual pins → self-hosted Blynk server → Next.js API route → browser.
- The page is a live window onto one instant, refreshed every 5 seconds. It is never a report and never a record.
- Two access contexts, both confirmed: a phone held outdoors in bright sun, and a phone indoors at home or in the office. Outdoor sun legibility is the harder constraint and governs.
- The Next.js app's own hosting is undecided; the Blynk server lives at `iot.serangkota.go.id:8080`.

## Capabilities and Constraints

- **Stack (from code, not a decision to revisit):** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4. One route (`/`) plus one API route (`/api/sensor-data`). No database, no user accounts, no authentication, no persistence of any kind.
- **Fixed firmware contract (binding).** Sixteen Blynk virtual pins with fixed meaning: `v0` temperature, `v1` humidity, `v2` pressure, `v3` altitude, `v4`–`v6` soil moisture percentages, `v7`–`v9` raw soil values, `v10`–`v15` RTC date and time fields. The pin map and the self-hosted Blynk server are set by the ESP32 firmware and are not open to redesign.
- **Hardware set (binding):** ESP32, AHT20 (temperature/humidity), BMP280 (pressure/altitude), three soil moisture probes, DS3231 RTC, 20×4 LCD, 5V 3A supply. Bill of materials with real IDR costs is in `README.md`.
- Firmware is not in this repository. Any change to pin semantics, sampling, or calibration happens in the firmware project, not here.
- Values are fetched per pin in parallel with a 3-second timeout, and a failed fetch currently resolves to `0` rather than to a failure. A reading and a transport failure are therefore indistinguishable downstream. This is a known open risk, not an accepted behavior to design around.
- Poll interval is 5 seconds. The RTC seconds field is interpolated client-side between polls.
- Read-only: the product sends nothing to the device. No actuators, no irrigation control, no remote configuration.
- Open decisions: no formal accessibility target has been set. The name is settled as **Flora** everywhere in code and metadata; the `FloraPro` navbar is gone.
- **Settled by the user:** the outbound link to the Energy Monitor at `flowpoint.dankehidayat.my.id`, and its label, are **removed from the product.** The author's own site at `dankehidayat.my.id` was later removed from the foot as well, on the grounds that on a page whose whole answer is a soil reading, a link to elsewhere is out of nowhere: it was the loudest element in the lower half of the page and explained none of it. The attribution "Flora • By Danke Hidayat" carries the maker; nothing links away. **The foot is one line and links nowhere.**

## Brand Commitments

- The product name is **Flora**.
- The foot attribution "Flora • By Danke Hidayat" is kept, and is the only thing the foot contains.
- **"PT. Labdha Teknika Nusantara" must be removed from the product.** The user made this explicit; treat its removal as binding, including from metadata and any other surface where it appears.
- The author publishes related work elsewhere, which is **not** linked from Flora. The Energy Monitor at `flowpoint.dankehidayat.my.id` is not part of Flora and must not be linked from it; neither is the author's personal site. Flora's foot names the maker and goes no further.
- `README.md` calls the project "FloraPro"; the commit history shows a deliberate rebrand to "Flora".

## Evidence on Hand

- Real hardware bill of materials with unit and total costs in Indonesian rupiah, totalling Rp423,700 (`README.md`).
- Live sensor data from actual deployed hardware, available through the Blynk server described in `README.md`.
- A real sibling product, the Energy Monitor at `flowpoint.dankehidayat.my.id`.
- MIT license (`LICENSE`).
- **Absences — future work must not invent these:** no user testimonials, no field-test results, no accuracy or uptime claims, no customer list, no pricing, no photos of the deployed device, no recorded history of readings, and no deployment URL for the dashboard itself.

## Product Principles

1. **The current reading, and nothing else.** Lean is the design constraint, not a missing feature. Resist adding panels, trends, or insights.
2. **Legible in direct sun, at arm's length, on a phone.** If it cannot be read outdoors at a glance, it is not finished.
3. **Speak English, plainly.** Plain, non-technical English, with no unexplained technical vocabulary; sensor part numbers are not user-facing vocabulary. *This principle previously read "Speak Indonesian, plainly." It was reversed by explicit user decision; see the note in **Users** above.*
4. **Never display a number the device did not measure.** A failed fetch must never be readable as a real reading of 0.
5. **Earn the web page's place next to the LCD.** Whatever the dashboard shows must be something the on-device 20×4 display cannot show.

## Accessibility & Inclusion

- Legibility in bright outdoor sunlight on a phone is a confirmed product need, driven by the primary user's environment.
- The interface language is a confirmed access requirement, not a localization nicety — and it is **now English.** It was confirmed as Bahasa Indonesia first, and reversed by explicit user decision; the reversal is recorded in **Users** and in Product Principle 3 rather than applied silently.
- Reading happens one-handed and at a distance, so content hierarchy must survive without fine motor control or precise pointing.
- No formal standard or conformance target has been set. This is an open decision, not an assumption of compliance.
