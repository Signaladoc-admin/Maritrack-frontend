"use client";

import * as React from "react";
import { BatteryCharging, BatteryFullIcon, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type DeviceUsageStatus = "active" | "locked";

interface DeviceUsageCardProps {
  deviceName: string;
  status: DeviceUsageStatus;
  percentage: number;
  className?: string;
  device: string;
}

export function DeviceUsageCard({
  deviceName,
  status,
  percentage,
  className,
  device = "Iphone 14",
}: DeviceUsageCardProps) {
  const isActive = status === "active";

  // --- Colors ---
  // Active: Green #0EDD9F
  // Locked: Red #FF736A
  // Primary Blue: #1B3C73
  const accentColor = isActive ? "#0EDD9F" : "#FF736A";
  const accentTextClass = isActive ? "text-[#0EDD9F]" : "text-[#FF736A]";

  // --- SVG Geometry for Curved Bar ---
  // A semi-circle arc
  const radius = 35;
  const strokeWidth = 20;
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - Math.min(percentage, 100) / 100);

  return (
    <div
      className={cn(
        "relative flex w-full max-w-xl items-center justify-between overflow-hidden rounded-[24px] border border-[#1B3C73] bg-[#081223] p-8 shadow-2xl",
        className
      )}
    >
      {/* --- Left Side: Text Info --- */}
      <div className="z-10 flex flex-col gap-2">
        <div>
          <h3 className="text-[18px] font-bold tracking-wide text-white">{deviceName}</h3>
        </div>

        <div className="flex items-baseline gap-1 font-medium text-[#8198BF]">
          <span className="text-[15px]">{device}</span>
        </div>
      </div>

      {/* --- Right Side: Half Phone Display --- */}
      {/* Container clips the bottom of the phone */}
      <div className="relative -bottom-[3rem] z-10 flex h-[150px] w-[200px] justify-center overflow-hidden">
        {/* The Phone Frame (Taller than container to simulate cut-off) */}
        <div className="absolute top-0 h-[180px] w-full rounded-[24px] border-[4px] border-[#1B3C73] bg-transparent">
          {/* The Notch (Nob) */}
          <div className="absolute -top-[4px] left-1/2 z-20 h-5 w-16 -translate-x-1/2 rounded-b-xl border-r-[4px] border-b-[4px] border-l-[4px] border-[#1B3C73] bg-[#081223]" />

          {/* Screen Content */}
          <div className="flex h-full w-full flex-col items-center justify-start pt-8">
            {/* 1. Curved Gauge (SVG) */}
            <div className="relative h-[60px] w-[300px]">
              <svg
                className="h-full w-full overflow-visible"
                viewBox="0 0 100 50"
                preserveAspectRatio="xMidYMax meet"
              >
                {/* Track (Blue) */}
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke="#1B3C73"
                  strokeWidth={strokeWidth}
                  className="opacity-40"
                />
                {/* Progress (Green/Red) */}
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={arcLength}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
            </div>

            {/* 2. Battery & Percentage (Under the arc) */}
            <div className="-mt-4 flex flex-col items-center">
              <div className="flex items-center gap-1">
                {isActive ? (
                  <BatteryFullIcon className={cn("h-6 w-6", accentTextClass)} fill="currentColor" />
                ) : (
                  <BatteryFullIcon className="h-6 w-6 text-[#FF736A]" />
                )}
              </div>
              <span className={cn("text-lg leading-none font-bold", accentTextClass)}>
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Glow Effect --- */}
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 right-10 h-40 w-40 -translate-y-1/2 rounded-full opacity-10 blur-[60px]",
          isActive ? "bg-[#0EDD9F]" : "bg-[#FF736A]"
        )}
      />
    </div>
  );
}
