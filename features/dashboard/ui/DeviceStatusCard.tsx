"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Apple } from "lucide-react";

interface DeviceStatusCardProps {
  ownerName: string;
  deviceName: string;
  modelName: string;
  batteryLevel?: number;
  brand: "apple" | "samsung";
  className?: string;
}

export function DeviceStatusCard({
  ownerName,
  deviceName,
  modelName,
  batteryLevel,
  brand,
  className,
}: DeviceStatusCardProps) {
  return (
    <div
      className={cn(
        "relative flex justify-between overflow-hidden rounded-[32px] bg-[#0A1629] p-8 text-white",
        className
      )}
    >
      <div className="z-10 flex h-full flex-col justify-between space-y-8">
        <div className="flex flex-col gap-4">
          {brand === "apple" ? (
            <Apple className="h-6 w-6 text-white opacity-80" fill="currentColor" />
          ) : (
            <div className="text-[10px] font-bold tracking-tighter italic opacity-80">SAMSUNG</div>
          )}

          <div className="space-y-1">
            <h3 className="text-xl leading-tight font-bold">{ownerName}’s phone</h3>
            <p className="text-sm font-medium text-slate-400">{modelName}</p>
          </div>
        </div>
      </div>

      {/* Battery Gauge (Simplified SVG) */}
      {batteryLevel !== undefined && (
        <div className="relative z-10 flex items-center justify-center p-2">
          <div className="relative h-24 w-24">
            {/* The phone outline is complex, let's simplify for now with just the ring */}
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#132847]"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#22C55E]"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * batteryLevel) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <div className="relative mb-1 h-4 w-6 rounded-xs border-2 border-white/40">
                <div
                  className="absolute bottom-0 left-0 h-full bg-emerald-500"
                  style={{ width: `${batteryLevel}%` }}
                ></div>
              </div>
              <span className="text-lg font-bold">{batteryLevel}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Background Decorative Phone (Conceptual) */}
      <div className="pointer-events-none absolute top-1/2 right-0 translate-x-8 -translate-y-1/2 opacity-20">
        {/* Simplified shadow/shape of a phone */}
        <div className="h-48 w-32 rounded-3xl border-4 border-slate-600 bg-slate-800"></div>
      </div>
    </div>
  );
}
