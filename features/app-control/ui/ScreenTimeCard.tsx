"use client";

import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";
import { cn } from "@/shared/lib/utils";

const data = [
  { name: "M", value: 5.5 },
  { name: "T", value: 4.0 },
  { name: "W", value: 6.5 },
  { name: "T", value: 4.8 },
  { name: "F", value: 5.2, isCurrent: true },
  { name: "S", value: 1.5 },
  { name: "S", value: 1.2 },
];

export function ScreenTimeCard() {
  return (
    <Card className="h-full w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-[#667085]">Screen Time</span>
        <span className="text-xs text-[#667085]">Updated at 3:12pm</span>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-[32px] font-bold text-[#1B3C73]">4h 20</h2>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#00B087]" />
            <span className="text-xs font-medium text-[#667085]">
              <span className="text-[#00B087]">+1h</span> better than yesterday
            </span>
          </div>
        </div>

        <div className="h-[200px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#667085", fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#667085", fontSize: 10 }}
                tickFormatter={(val) => (val === 0 ? "0" : val === 5 ? "avg" : `${val}h`)}
                ticks={[0, 5, 10]}
              />
              <Tooltip
                cursor={{ fill: "#f3f4f6" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-white p-2 shadow-sm">
                        <p className="text-xs font-bold text-[#1B3C73]">{payload[0].value}h</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" barSize={24} radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isCurrent ? "#1B3C73" : "#D0D5DD"}
                    className="transition-opacity hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
