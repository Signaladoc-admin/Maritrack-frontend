"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trendValue: string;
  trendType: "positive" | "negative";
  chartData: number[]; // Simple array for mini bars
  chartColor: "green" | "red";
  className?: string;
}

export function MetricCard({
  title,
  value,
  trendValue,
  trendType,
  chartData,
  chartColor,
  className,
}: MetricCardProps) {
  const isPositive = trendType === "positive";

  return (
    <div className={cn("space-y-4 rounded-[32px] bg-[#F8F9FA] p-8 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <h2 className="text-5xl font-bold tracking-tight text-[#1B3C73]">{value}</h2>
        </div>

        {/* Mini Bar Chart */}
        <div className="flex h-16 items-end gap-1.5 pt-2">
          {chartData.map((height, i) => (
            <div
              key={i}
              className={cn(
                "w-2.5 rounded-full transition-all duration-500",
                chartColor === "green" ? "bg-[#22C55E]" : "bg-[#EF4444]",
                i < 2 ? "opacity-30" : "opacity-100" // Fading effect for logic representation
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

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
    </div>
  );
}
