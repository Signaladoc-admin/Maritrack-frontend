import * as React from "react";
import { cn } from "@/lib/utils";
import { DashboardCard } from "./DashboardCard";

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trendValue?: string;
  trendLabel?: string;
  trendDirection?: "up" | "down";
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, icon, trendValue, trendLabel, trendDirection, ...props }, ref) => {
    return (
      <DashboardCard ref={ref} className={cn("p-5 sm:p-6", className)} {...props}>
        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              {icon}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
            
            {(trendValue || trendLabel) && (
              <div className="mt-1 flex items-center gap-1.5 text-xs">
                {trendValue && (
                  <span
                    className={cn(
                      "font-medium",
                      trendDirection === "up" ? "text-emerald-500" : trendDirection === "down" ? "text-rose-500" : "text-gray-500"
                    )}
                  >
                    {trendDirection === "up" ? "↑ " : trendDirection === "down" ? "↓ " : ""}
                    {trendValue}
                  </span>
                )}
                {trendLabel && <span className="text-gray-400">{trendLabel}</span>}
              </div>
            )}
          </div>
        </div>
      </DashboardCard>
    );
  }
);

MetricCard.displayName = "MetricCard";
