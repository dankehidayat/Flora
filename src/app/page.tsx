"use client";

import { useEffect, useState } from "react";
import { SensorCard } from "./components/sensor-card";
import { SoilMoistureGauge } from "./components/soil-moisture-gauge";
import { StatusIndicator } from "./components/status-indicator";
import { RtcDisplay } from "./components/rtc-display";
import { Navbar } from "./components/navbar";
import { SensorData, DashboardStats } from "@/types/sensor";
import { Thermometer, CloudRain, Gauge, Mountains } from "phosphor-react";

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<DashboardStats | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("Loading...");
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSensorData = async () => {
    try {
      const response = await fetch("/api/sensor-data");
      const result = await response.json();

      if (result.success) {
        const data: SensorData = result.data;

        // Format RTC time
        const rtcTime = {
          year: data.v10 || new Date().getFullYear(),
          month: data.v11 || new Date().getMonth() + 1,
          day: data.v12 || new Date().getDate(),
          hour: data.v13 || new Date().getHours(),
          minute: data.v14 || new Date().getMinutes(),
          second: data.v15 || new Date().getSeconds(),
          formatted: `${String(data.v13 || 0).padStart(2, "0")}:${String(
            data.v14 || 0
          ).padStart(2, "0")}:${String(data.v15 || 0).padStart(2, "0")}`,
          fullFormatted: `${data.v10 || 0}-${String(data.v11 || 0).padStart(
            2,
            "0"
          )}-${String(data.v12 || 0).padStart(2, "0")}`,
        };

        const stats: DashboardStats = {
          temperature: data.v0 || 0,
          humidity: data.v1 || 0,
          pressure: data.v2 || 0,
          altitude: data.v3 || 0,
          soilMoisture: {
            soil1: {
              percentage: data.v4 || 0,
              raw: data.v7 || 0,
            },
            soil2: {
              percentage: data.v5 || 0,
              raw: data.v8 || 0,
            },
            soil3: {
              percentage: data.v6 || 0,
              raw: data.v9 || 0,
            },
          },
          rtcTime: rtcTime,
          lastUpdate: new Date().toLocaleTimeString(),
        };

        setSensorData(stats);
        setLastUpdate(new Date().toLocaleTimeString());
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            FloraPro
          </h2>
          <p className="text-slate-600">Initializing dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 custom-scrollbar">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header - Simplified without leaf icon */}
        <header className="text-center mb-8 mt-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-2">
              FloraPro
            </h1>
            <p className="text-slate-600 text-lg">
              Intelligent Environmental Monitoring System
            </p>
          </div>
        </header>

        {/* Compact Status Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <StatusIndicator isOnline={isOnline} lastUpdate={lastUpdate} />
          {sensorData?.rtcTime && <RtcDisplay rtcTime={sensorData.rtcTime} />}
        </div>

        {/* Environmental Sensors Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Environmental Sensors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SensorCard
              title="Temperature"
              value={sensorData?.temperature.toFixed(1) || "0.0"}
              unit="°C"
              icon={<Thermometer size={24} weight="fill" />}
              gradient="from-orange-500 to-red-500"
              description="Ambient temperature from AHT20 sensor"
              trend="stable"
            />

            <SensorCard
              title="Humidity"
              value={sensorData?.humidity.toFixed(1) || "0.0"}
              unit="%"
              icon={<CloudRain size={24} weight="fill" />}
              gradient="from-blue-500 to-cyan-500"
              description="Relative humidity from AHT20 sensor"
              trend="stable"
            />

            <SensorCard
              title="Pressure"
              value={sensorData?.pressure.toFixed(0) || "0"}
              unit="hPa"
              icon={<Gauge size={24} weight="fill" />}
              gradient="from-purple-500 to-pink-500"
              description="Atmospheric pressure from BMP280"
              trend="stable"
            />

            <SensorCard
              title="Altitude"
              value={sensorData?.altitude.toFixed(0) || "0"}
              unit="m"
              icon={<Mountains size={24} weight="fill" />}
              gradient="from-emerald-500 to-teal-500"
              description="Calculated altitude from BMP280"
              trend="stable"
            />
          </div>
        </section>

        {/* Soil Moisture Section - Simplified */}
        <section className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800">Soil Moisture</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SoilMoistureGauge
              soilNumber={1}
              percentage={sensorData?.soilMoisture.soil1.percentage || 0}
              rawValue={sensorData?.soilMoisture.soil1.raw || 0}
            />
            <SoilMoistureGauge
              soilNumber={2}
              percentage={sensorData?.soilMoisture.soil2.percentage || 0}
              rawValue={sensorData?.soilMoisture.soil2.raw || 0}
            />
            <SoilMoistureGauge
              soilNumber={3}
              percentage={sensorData?.soilMoisture.soil3.percentage || 0}
              rawValue={sensorData?.soilMoisture.soil3.raw || 0}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm py-8 border-t border-slate-200/50">
          <p className="mb-2">FloraPro IoT System • By Danke Hidayat</p>
          <p>PT. Labdha Teknika Nusantara</p>
        </footer>
      </div>
    </div>
  );
}
