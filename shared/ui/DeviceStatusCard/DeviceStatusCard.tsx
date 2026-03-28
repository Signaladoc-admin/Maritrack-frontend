"use client";

import * as React from "react";
import { BatteryCharging, BatteryFullIcon, Plus, Zap } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export type DeviceUsageStatus = "active" | "locked";

interface DeviceUsageCardProps {
  deviceName: string;
  status: DeviceUsageStatus;
  percentage: number;
  className?: string;
  device: string;
  isRow?: boolean;
  onClick?: () => void;
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

  const accentColor = isActive ? "#0EDD9F" : "#FF736A";
  const accentTextClass = isActive ? "text-[#0EDD9F]" : "text-[#FF736A]";

  // --- SVG Geometry for Curved Bar ---
  const radius = 35;
  const strokeWidth = 15;
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - Math.min(percentage, 100) / 100);

  return (
    <div
      className={cn(
        "relative flex cursor-pointer overflow-hidden rounded-[24px] border border-[#1B3C73] bg-[#081223] p-6 transition-colors hover:bg-[#0a172d] lg:p-8",
        isRow ? "w-full flex-row items-center justify-between gap-4" : "flex-col",
        className
      )}
      onClick={onClick}
    >
      {/* --- Left Side: Text Info --- */}
      <div className="z-10 flex h-full flex-col justify-start gap-2">
        <h3 className="text-[18px] font-bold tracking-wide text-white lg:text-[20px]">
          {deviceName}
        </h3>
        <span className="text-[14px] font-medium text-[#8198BF] lg:text-[15px]">{device}</span>
      </div>

      {/* --- Right Side: Half Phone Display --- */}
      <div
        className={cn(
          "relative z-10 flex shrink-0 justify-center overflow-hidden",
          isRow ? "-bottom-2 h-[150px] w-[180px] px-2" : "-bottom-[5rem] h-[300px] w-full"
        )}
      >
        {/* The Phone Frame */}
        <div
          className={cn(
            "absolute top-0 w-full rounded-[24px] border-[3px] border-[#1B3C73] bg-transparent",
            isRow ? "h-[190px]" : "h-[300px]"
          )}
        >
          {/* Notch */}
          <div className="absolute -top-[1px] left-1/2 z-20 h-3 w-10 -translate-x-1/2 rounded-b-lg border-x-[3px] border-b-[3px] border-[#1B3C73] bg-[#081223]" />

          {/* Screen Content */}
          <div className="flex h-full w-full flex-col items-center justify-start pt-8">
            <div className="relative h-[60px] w-full px-2">
              <svg
                className="h-full w-full overflow-visible"
                viewBox="0 0 100 50"
                preserveAspectRatio="xMidYMax meet"
              >
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke="#1B3C73"
                  strokeWidth={strokeWidth}
                  className="opacity-20"
                />
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={arcLength}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
            </div>

            {/* Battery & Percentage */}
            <div className="mt-4 flex flex-col items-center">
              <BatteryFullIcon
                className={cn(isRow ? "h-5 w-5" : "h-10 w-10", accentTextClass)}
                fill={isActive ? "currentColor" : "none"}
              />
              <span
                className={cn(
                  isRow ? "text-lg" : "text-3xl",
                  "mt-2 leading-none font-bold",
                  accentTextClass
                )}
              >
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className={cn(
          "pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full opacity-10 blur-[80px]",
          isActive ? "bg-[#0EDD9F]" : "bg-[#FF736A]"
        )}
      />
    </div>
  );
}
