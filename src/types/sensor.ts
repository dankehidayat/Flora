export interface SensorData {
  v0: number; // Temperature from AHT20
  v1: number; // Humidity from AHT20
  v2: number; // Pressure from BMP280
  v3: number; // Altitude from BMP280
  v4: number; // Soil 1 moisture %
  v5: number; // Soil 2 moisture %
  v6: number; // Soil 3 moisture %
  v7: number; // Soil 1 raw value
  v8: number; // Soil 2 raw value
  v9: number; // Soil 3 raw value
  v10: number; // Year
  v11: number; // Month
  v12: number; // Day
  v13: number; // Hour
  v14: number; // Minute
  v15: number; // Second
  timestamp?: string;
}

export interface DashboardStats {
  temperature: number;
  humidity: number;
  pressure: number;
  altitude: number;
  soilMoisture: {
    soil1: { percentage: number; raw: number };
    soil2: { percentage: number; raw: number };
    soil3: { percentage: number; raw: number };
  };
  rtcTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    formatted: string;
    fullFormatted: string;
  };
  lastUpdate: string; // Add this line to fix the error
}
