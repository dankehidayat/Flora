"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Drop, CloudRain, Cloud, Fire } from "phosphor-react";

interface SoilMoistureGaugeProps {
  soilNumber: 1 | 2 | 3;
  percentage: number;
  rawValue: number;
  className?: string;
}

export function SoilMoistureGauge({
  soilNumber,
  percentage,
  rawValue,
  className,
}: SoilMoistureGaugeProps) {
  const getMoistureColor = (percent: number) => {
    if (percent < 25) return "from-red-500 to-orange-500";
    if (percent < 50) return "from-orange-400 to-amber-400";
    if (percent < 75) return "from-amber-400 to-lime-400";
    return "from-lime-500 to-green-500";
  };

  const getMoistureStatus = (percent: number) => {
    if (percent < 25)
      return {
        text: "Very Dry",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
      };
    if (percent < 50)
      return {
        text: "Dry",
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
      };
    if (percent < 75)
      return {
        text: "Moist",
        color: "text-lime-600",
        bg: "bg-lime-50",
        border: "border-lime-200",
      };
    return {
      text: "Wet",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    };
  };

  const getMoistureIcon = (percent: number) => {
    if (percent < 25)
      return <Fire size={20} weight="fill" className="text-red-500" />;
    if (percent < 50)
      return <Cloud size={20} weight="fill" className="text-orange-500" />;
    if (percent < 75)
      return <CloudRain size={20} weight="fill" className="text-lime-500" />;
    return <Drop size={20} weight="fill" className="text-green-500" />;
  };

  const status = getMoistureStatus(percentage);

  return (
    <Card className={cn("group hover:scale-105", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Soil {soilNumber}
          </CardTitle>
          {getMoistureIcon(percentage)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Circular Progress Gauge */}
        <div className="relative w-32 h-32 mx-auto">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * percentage) / 100}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  className={cn(
                    percentage < 25
                      ? "stop-color-red-500"
                      : percentage < 50
                      ? "stop-color-orange-400"
                      : percentage < 75
                      ? "stop-color-amber-400"
                      : "stop-color-green-500"
                  )}
                />
                <stop
                  offset="100%"
                  className={cn(
                    percentage < 25
                      ? "stop-color-orange-500"
                      : percentage < 50
                      ? "stop-color-amber-400"
                      : percentage < 75
                      ? "stop-color-lime-400"
                      : "stop-color-emerald-500"
                  )}
                />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-slate-800">
              {percentage}%
            </div>
            <div className="text-xs text-slate-500">moisture</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">Raw Value</div>
            <div className="font-semibold text-slate-800">{rawValue}</div>
          </div>
          <div
            className={cn("rounded-xl p-3 border", status.bg, status.border)}
          >
            <div className="text-xs text-slate-500 mb-1">Status</div>
            <div className={cn("font-semibold", status.color)}>
              {status.text}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={cn(
            "rounded-full px-4 py-2 text-center text-sm font-medium border flex items-center justify-center gap-2",
            status.bg,
            status.border,
            status.color
          )}
        >
          {getMoistureIcon(percentage)} {status.text}
        </div>
      </CardContent>
    </Card>
  );
}
