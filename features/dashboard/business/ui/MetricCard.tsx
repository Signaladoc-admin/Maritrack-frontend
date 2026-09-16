"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export type ChartColor = "green" | "red" | "yellow" | "blue";

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
    green: "text-[var(--green)] bg-[var(--green)]",
    red: "text-[var(--coral)] bg-[var(--coral)]",
    yellow: "text-[#EAB308] bg-[#EAB308]",
    blue: "text-[var(--cyan)] bg-[var(--cyan)]",
  };

  const currentColorClass = colorClasses[chartColor].split(" ")[0];
  const currentBgClass = colorClasses[chartColor].split(" ")[1];

  return (
    <div
      className={cn(
        "surface flex flex-col justify-between rounded-[var(--radius-lg)] p-6",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-bold tracking-wider text-[var(--text-3)] uppercase">{title}</p>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-1)] sm:text-3xl">
            {value}
          </h2>
        </div>

        {/* Mini Bar Chart */}
        <div className="flex h-12 items-end gap-1.5 pt-1">
          {chartData.map((height, i) => (
            <div
              key={i}
              className={cn(
                "w-2 rounded-full transition-all duration-500",
                currentBgClass,
                i < 2 ? "opacity-30" : "opacity-100"
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {trendValue && trendType && (
        <div className="mt-3 flex items-center gap-2 border-t border-[var(--card-line)] pt-3">
          <div
            className={cn(
              "flex items-center justify-center rounded-sm p-0.5",
              isPositive ? "text-[var(--green)]" : "text-[var(--coral)]"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4 fill-current" />
            ) : (
              <TrendingDown className="h-4 w-4 fill-current" />
            )}
          </div>
          <p className="text-xs font-medium text-[var(--text-2)]">
            <span className={cn(isPositive ? "text-[var(--green)]" : "text-[var(--coral)]")}>
              {trendValue}
            </span>{" "}
            better than yesterday
          </p>
        </div>
      )}

      {footerText && (
        <div className="mt-3 flex items-center gap-2 border-t border-[var(--card-line)] pt-3">
          <span
            className={cn(
              "text-[10px]",
              chartColor === "green"
                ? "text-[var(--green)]"
                : chartColor === "red"
                  ? "text-[var(--coral)]"
                  : "text-[#EAB308]"
            )}
          >
            {chartColor === "green" ? "▲" : chartColor === "red" ? "▼" : "■"}
          </span>
          <p className="text-xs font-medium text-[var(--text-2)]">{footerText}</p>
        </div>
      )}
    </div>
  );
}
