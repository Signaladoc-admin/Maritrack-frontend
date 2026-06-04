"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export type ChartColor = "green" | "red" | "yellow" | "blue"

interface MetricCardProps {
  title: string;
  value: string;
  trendValue?: string;
  trendType?: "positive" | "negative";
  chartData: number[]; // Simple array for mini bars
  chartColor: ChartColor;
  footerText?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  trendValue,
  trendType,
  chartData,
  chartColor,
  footerText,
  className,
}: MetricCardProps) {
  const isPositive = trendType === "positive";

  const colorClasses = {
    green: "text-[#22C55E] bg-[#22C55E]",
    red: "text-[#EF4444] bg-[#EF4444]",
    yellow: "text-[#EAB308] bg-[#EAB308]",
    blue: "text-[#3B82F6] bg-[#3B82F6]",
  };

  const currentColorClass = colorClasses[chartColor].split(" ")[0];
  const currentBgClass = colorClasses[chartColor].split(" ")[1];

  return (
    <div className={cn("space-y-4 rounded-[32px] bg-[#F8F9FA] p-8", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <h2 className={cn("text-5xl font-bold tracking-tight", currentColorClass)}>{value}</h2>
        </div>

        {/* Mini Bar Chart */}
        <div className="flex h-16 items-end gap-1.5 pt-2">
          {chartData.map((height, i) => (
            <div
              key={i}
              className={cn(
                "w-2.5 rounded-full transition-all duration-500",
                currentBgClass,
                i < 2 ? "opacity-30" : "opacity-100" // Fading effect for logic representation
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {trendValue && trendType && (
        <div className="flex items-center gap-2 pt-2">
          <div
            className={cn(
              "flex items-center justify-center rounded-sm p-0.5",
              isPositive ? "text-emerald-500" : "text-rose-500"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4 fill-current" />
            ) : (
              <TrendingDown className="h-4 w-4 fill-current" />
            )}
          </div>
          <p className="text-sm font-medium text-slate-500">
            <span className={cn(isPositive ? "text-emerald-500" : "text-rose-500")}>
              {trendValue}
            </span>{" "}
            better than yesterday
          </p>
        </div>
      )}

      {footerText && (
        <div className="pt-2">
          <p className={cn("text-sm font-semibold", currentColorClass)}>{footerText}</p>
        </div>
      )}
    </div>
  );
}
