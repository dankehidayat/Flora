"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: ReactNode;
  trend?: "up" | "down" | "stable";
  className?: string;
  description?: string;
  gradient?: string;
}

export function SensorCard({
  title,
  value,
  unit,
  icon,
  trend,
  className,
  description,
  gradient = "from-blue-500 to-cyan-500",
}: SensorCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-slate-400";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <Card className={cn("group hover:scale-105 hover:rotate-1", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        <div
          className={cn(
            "p-3 rounded-2xl bg-gradient-to-br",
            gradient,
            "text-white shadow-soft"
          )}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-2">
          <div className="text-3xl font-bold text-slate-800">{value}</div>
          <div className="text-sm font-medium text-slate-500">{unit}</div>
          {trend && (
            <span className={cn("text-lg font-semibold", getTrendColor())}>
              {getTrendIcon()}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-slate-500 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow"></div>
          <p className="text-xs text-slate-400">Real-time</p>
        </div>
      </CardContent>
    </Card>
  );
}
