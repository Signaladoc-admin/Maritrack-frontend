"use client";

import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card"; // Adjust path to your card component
import { cn } from "@/lib/utils";

// --- Types ---
export interface ChartDataPoint {
  name: string; // e.g., "Mon", "Tue"
  value: number; // e.g., 4 (hours)
  label?: string; // Optional display label for tooltips
}

interface BarChartCardProps {
  title: string;
  time?: string;
  data: ChartDataPoint[];
  filterLabel?: string; // e.g., "This Week"
  onFilterClick?: () => void;
  barColor?: string;
  height?: number;
  className?: string;
  subtitle?: string;
}

// --- Custom Tooltip Component ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-100 bg-white p-2 shadow-xl">
        <p className="text-xs font-semibold text-slate-700">{label}</p>
        <p className="text-sm font-bold text-[#1B3C73]">{payload[0].value} hrs</p>
      </div>
    );
  }
  return null;
};

export function BarChartCard({
  title,
  time,
  data,
  filterLabel = "This Week",
  onFilterClick,
  barColor = "#1B3C73",
  height = 250,
  className,
  subtitle,
}: BarChartCardProps) {
  return (
    <Card className={cn("flex h-full w-full flex-col", className)}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#1B3C73]">{time}</CardTitle>
          {subtitle && <p className="text-sm font-medium text-slate-500">{subtitle}</p>}
        </div>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 pl-0">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: string) => `${value}h`}
            />
            <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill={barColor}
              radius={[4, 4, 4, 4]} // Rounded corners on all sides
              barSize={32} // Width of the bars
            >
              {/* Optional: Make the max value a slightly different color if desired */}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColor}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
