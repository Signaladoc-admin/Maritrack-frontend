"use client";

import * as React from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { DashboardCard } from "./DashboardCard";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface LineChartCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trendValue: string;
  trendDirection: "up" | "down";
  data: any[];
  dataKey: string;
  xAxisKey: string;
  color: string;
  timeRangeAction?: string;
}

export function LineChartCard({
  title,
  value,
  subtitle,
  trendValue,
  trendDirection,
  data,
  dataKey,
  xAxisKey,
  color,
  timeRangeAction = "Last week",
}: LineChartCardProps) {
  return (
    <DashboardCard
      titleAction={
        <button className="flex items-center gap-1.5 rounded bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          <Calendar className="h-3 w-3" />
          {timeRangeAction}
        </button>
      }
    >
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-3xl font-bold text-gray-900">{value}</h4>
          <p className="text-sm font-medium text-gray-500">{subtitle || title}</p>
          <div className="mt-2 flex items-center gap-1 text-xs font-medium">
            <span className={cn(trendDirection === "up" ? "text-emerald-500" : "text-rose-500")}>
              {trendDirection === "up" ? "↑ " : "↓ "}
              {trendValue}
            </span>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey={xAxisKey}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 10 }}
                dy={10}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0, fill: color }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardCard>
  );
}
