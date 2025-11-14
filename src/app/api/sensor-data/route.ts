import { NextResponse } from "next/server";

// Helper function to fetch individual sensor value
async function fetchSensorValue(url: string, pin: string): Promise<number> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? parseFloat(data[0]) : parseFloat(data);
  } catch (error) {
    console.error(`Error fetching sensor V${pin}:`, error);
    return 0;
  }
}

// Helper function to fetch all sensor values in parallel
async function fetchAllSensors() {
  const BLYNK_BASE_URL = process.env.BLYNK_BASE_URL;
  const BLYNK_AUTH_TOKEN = process.env.BLYNK_AUTH_TOKEN;

  // Validate environment variables
  if (!BLYNK_BASE_URL || !BLYNK_AUTH_TOKEN) {
    throw new Error(
      "Blynk environment variables not configured:\n" +
        "Please add BLYNK_BASE_URL and BLYNK_AUTH_TOKEN to your .env.local file"
    );
  }

  const sensorPins = [
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
    "v15", // RTC time data
  ];

  try {
    const sensorPromises = sensorPins.map((pin) => {
      const url = `${BLYNK_BASE_URL}/${BLYNK_AUTH_TOKEN}/get/${pin}`;
      return fetchSensorValue(url, pin);
    });

    const sensorValues = await Promise.all(sensorPromises);

    return {
      v0: sensorValues[0], // Temperature
      v1: sensorValues[1], // Humidity
      v2: sensorValues[2], // Pressure
      v3: sensorValues[3], // Altitude
      v4: sensorValues[4], // Soil 1 moisture %
      v5: sensorValues[5], // Soil 2 moisture %
      v6: sensorValues[6], // Soil 3 moisture %
      v7: sensorValues[7], // Soil 1 raw value
      v8: sensorValues[8], // Soil 2 raw value
      v9: sensorValues[9], // Soil 3 raw value
      v10: sensorValues[10], // Year
      v11: sensorValues[11], // Month
      v12: sensorValues[12], // Day
      v13: sensorValues[13], // Hour
      v14: sensorValues[14], // Minute
      v15: sensorValues[15], // Second
    };
  } catch (error) {
    console.error("Error fetching all sensors:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const sensorData = await fetchAllSensors();

    return NextResponse.json({
      success: true,
      data: sensorData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in sensor data API:", error);

    if (
      error instanceof Error &&
      error.message.includes("environment variables")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error: " + error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch sensor data from Blynk server",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
