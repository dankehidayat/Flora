import { NextResponse } from "next/server";
import type { PinReadings } from "@/types/sensor";

export const dynamic = "force-dynamic";

/**
 * The firmware pin map. Fixed by the ESP32 project and not open to redesign.
 * v0 temperature, v1 humidity, v2 pressure, v3 altitude, v4-v6 soil moisture
 * percentages, v7-v9 raw soil values, v10-v15 the device RTC fields.
 */
const SENSOR_PINS = [
  "v0",
  "v1",
  "v2",
  "v3",
  "v4",
  "v5",
  "v6",
  "v7",
  "v8",
  "v9",
  "v10",
  "v11",
  "v12",
  "v13",
  "v14",
  "v15",
] as const;

const PIN_TIMEOUT_MS = 3000;

/**
 * Fetch one pin.
 *
 * Returns `number` only when the pin genuinely reported a finite number.
 * Every failure mode - non-OK status, aborted after the timeout, malformed
 * body, unparseable text - returns `null`. It never returns `0`: a pin that
 * cannot be read has not measured zero, and reporting it as zero would make an
 * outage indistinguishable from a real reading at the far end of the wire.
 */
async function fetchPin(url: string, pin: string): Promise<number | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PIN_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`Pin ${pin} returned HTTP ${response.status}; treating as unreported.`);
      return null;
    }

    const data = await response.json();
    const parsed = Array.isArray(data) ? parseFloat(data[0]) : parseFloat(data);

    if (!Number.isFinite(parsed)) {
      console.warn(`Pin ${pin} returned a non-numeric body; treating as unreported.`);
      return null;
    }

    return parsed;
  } catch (error) {
    console.warn(`Pin ${pin} could not be read; treating as unreported.`, error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchAllPins(): Promise<PinReadings> {
  const baseUrl = process.env.BLYNK_BASE_URL;
  const authToken = process.env.BLYNK_AUTH_TOKEN;

  if (!baseUrl || !authToken) {
    throw new Error(
      "Blynk environment variables not configured: add BLYNK_BASE_URL and BLYNK_AUTH_TOKEN to .env.local"
    );
  }

  // Pins are fetched in parallel and settle independently: one dead pin must
  // never take the other fifteen readings down with it.
  const settled = await Promise.all(
    SENSOR_PINS.map((pin) => fetchPin(`${baseUrl}/${authToken}/get/${pin}`, pin))
  );

  const readings: PinReadings = {};
  SENSOR_PINS.forEach((pin, index) => {
    readings[pin] = settled[index];
  });

  return readings;
}

export async function GET() {
  try {
    const readings = await fetchAllPins();

    // 200 even when every pin is unreported: the route itself worked, and the
    // per-pin `null`s already say everything the interface is allowed to say.
    return NextResponse.json({
      success: true,
      readings,
      measuredAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in sensor data API:", error);

    const isConfigError =
      error instanceof Error && error.message.includes("environment variables");

    return NextResponse.json(
      {
        success: false,
        error: isConfigError
          ? "Server configuration error: " + error.message
          : "Failed to read the sensor pins from the Blynk server",
        measuredAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
