"use client";

import * as React from "react";
import { BatteryCharging, BatteryFullIcon, Plus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type DeviceUsageStatus = "active" | "locked";

interface DeviceUsageCardProps {
  deviceName: string;
  status: DeviceUsageStatus;
  percentage: number;
  className?: string;
  device: string;
  isRow: boolean;
  onClick: () => void;
}

export function DeviceUsageCard({
  deviceName,
  status,
  percentage,
  className,
  device = "Iphone 14",
  isRow = false,
  onClick,
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
        `relative flex cursor-pointer overflow-hidden rounded-[24px] border border-[#1B3C73] bg-[#081223] p-8 transition-colors hover:bg-[#0a172d] ${isRow ? "w-full max-w-xl flex-row items-center justify-between" : "flex-col"}`,
        className
      )}
      onClick={onClick}
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
      <div
        className={cn(
          `relative z-10 flex justify-center overflow-hidden`,
          isRow ? "-bottom-[3rem] h-[150px] w-[200px]" : "-bottom-[5rem] h-[300px] w-[400px]"
        )}
      >
        {/* The Phone Frame (Taller than container to simulate cut-off) */}
        <div
          className={cn(
            "absolute top-0 w-full rounded-[24px] border-[4px] border-[#1B3C73] bg-transparent",
            isRow ? "h-[180px]" : "h-[300px]"
          )}
        >
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
                  <BatteryFullIcon
                    className={cn(isRow ? "h-6 w-6" : "h-10 w-10", accentTextClass)}
                    fill="currentColor"
                  />
                ) : (
                  <BatteryFullIcon
                    className={cn(isRow ? "h-6 w-6" : "h-10 w-10", "text-[#FF736A]")}
                  />
                )}
              </div>
              <span
                className={cn(
                  isRow ? "text-lg" : "text-3xl",
                  "leading-none font-bold",
                  accentTextClass
                )}
              >
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
