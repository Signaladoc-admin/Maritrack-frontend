"use client";
import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DashboardCard } from "./DashboardCard";
import { Calendar } from "lucide-react";

interface DonutChartData {
  name: string;
  value: number;
  color: string;
}

interface DonutChartCardProps {
  title: string;
  data: DonutChartData[];
  timeRangeAction?: string;
}

export function DonutChartCard({
  title,
  data,
  timeRangeAction = "This month",
}: DonutChartCardProps) {
  return (
    <DashboardCard
      title={title}
      titleAction={
        <button className="flex items-center gap-1.5 rounded bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          <Calendar className="h-3 w-3" />
          {timeRangeAction}
        </button>
      }
    >
      <div className="mt-4 flex flex-col items-center justify-between sm:flex-row">
        {/* Legend */}
        <div className="flex w-full flex-col gap-4 sm:w-1/2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-4 w-4 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {item.name} ({item.value}%)
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="relative mt-6 flex h-[160px] w-full justify-center sm:mt-0 sm:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={0}
                stroke="none"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#111827", fontSize: "14px", fontWeight: 500 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardCard>
  );
}
