"use client";

import { cn } from "@/lib/utils";
import { Clock } from "phosphor-react";
import { useEffect, useState } from "react";

interface RtcDisplayProps {
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
  className?: string;
}

export function RtcDisplay({ rtcTime, className }: RtcDisplayProps) {
  const [currentSecond, setCurrentSecond] = useState(rtcTime.second);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSecond((prev) => (prev + 1) % 60);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const displayTime = `${String(rtcTime.hour).padStart(2, "0")}:${String(
    rtcTime.minute
  ).padStart(2, "0")}:${String(currentSecond).padStart(2, "0")}`;

  return (
    <div
      className={cn(
        "glass rounded-2xl p-3 border border-white/20 shadow-soft max-w-md",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Clock size={16} weight="fill" className="text-blue-500" />
          <span className={cn("text-sm font-medium text-slate-700")}>
            Device Time
          </span>
        </div>
        <div className="h-4 w-px bg-slate-300"></div>
        <div className="text-sm text-slate-600 flex-1 min-w-0">
          <span className="font-medium text-slate-800">{displayTime}</span>
        </div>
        <div className="ml-auto">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-glow"></div>
        </div>
      </div>
    </div>
  );
}
