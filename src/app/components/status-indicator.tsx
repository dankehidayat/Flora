"use client";

import { cn } from "@/lib/utils";
import { WifiHigh, WifiSlash } from "phosphor-react";

interface StatusIndicatorProps {
  isOnline: boolean;
  lastUpdate: string;
  className?: string;
}

export function StatusIndicator({
  isOnline,
  lastUpdate,
  className,
}: StatusIndicatorProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-3 border border-white/20 shadow-soft max-w-md",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <WifiHigh size={16} weight="fill" className="text-green-500" />
          ) : (
            <WifiSlash size={16} weight="fill" className="text-red-500" />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              isOnline ? "text-green-700" : "text-red-700"
            )}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        <div className="h-4 w-px bg-slate-300"></div>
        <div className="text-sm text-slate-600 flex-1 min-w-0">
          Updated:{" "}
          <span className="font-medium text-slate-800">{lastUpdate}</span>
        </div>
        <div className="ml-auto">
          <div
            className={cn(
              "w-2 h-2 rounded-full animate-pulse-glow",
              isOnline ? "bg-green-400" : "bg-red-400"
            )}
          />
        </div>
      </div>
    </div>
  );
}
