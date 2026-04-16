"use client";

import { useMemo } from "react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import Badge from "@/shared/ui/Badge";
import { Calendar, Signal, BarChart2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";

interface AnalyticsLineCardProps {
  title: string;
  count: string | number;
  percentageChange: number;
  timingLabel?: string;
  chartColor: string;
  badgeLabel?: string;
  badgeIndex?: number;
  data: number[];
  icon?: React.ReactNode;
}

export default function AnalyticsLineCard({
  title,
  count,
  percentageChange,
  timingLabel = "This month",
  chartColor,
  badgeLabel,
  badgeIndex = 5,
  data,
  icon = <BarChart2 size={16} className="text-[#5B3DF5]" />,
}: AnalyticsLineCardProps) {
  
  const chartData = useMemo(() => {
    return data.map((val, idx) => ({ name: idx.toString(), pv: val }));
  }, [data]);

  const suffix = badgeLabel ? badgeLabel.replace(/^[\d:.,%]+\s*/, "") : "";

  return (
    <CardWrapper variant="outline" className="relative p-6 lg:p-8 flex flex-col justify-between h-[280px] overflow-hidden">
      <div className="flex items-center justify-between mb-4 relative z-20">
        <Badge
          variant="secondary"
          content={
            <div className="flex items-center gap-2 text-neutral-500 font-medium">
              <Calendar size={16} />
              <span className="text-sm">{timingLabel}</span>
            </div>
          }
        />
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
          {icon}
        </span>
      </div>
      
      <div className="flex-1 flex gap-4 h-full relative z-10 w-full mt-4">
        <div className="w-2/5 flex flex-col justify-center space-y-2 relative z-20">
          <p className="text-4xl font-bold tracking-tight text-neutral-900">{count}</p>
          <p className="text-[13px] font-medium text-neutral-400">{title}</p>
          <p
            className={cn(
              "text-[13px] font-bold flex items-center gap-1",
              percentageChange >= 0 ? "text-emerald-500" : "text-rose-500"
            )}
          >
            <span className="text-lg leading-none">{percentageChange >= 0 ? "▴" : "▾"}</span>
            {Math.abs(percentageChange)}%
          </p>
        </div>
        
        <div className="w-3/5 relative h-[140px] mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
              <Tooltip
                content={<CustomTooltip active={false} payload={[]} labelSuffix={suffix} />}
                cursor={false}
              />
              <Line
                type="monotone"
                dataKey="pv"
                stroke={chartColor}
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: chartColor,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Bottom xAxis mock labels matching the design (SEP OCT NOV DEC JAN FEB) */}
      <div className="flex justify-between items-center pl-[40%] pr-4 pt-2 text-[10px] font-semibold text-neutral-300 w-full">
        <span>SEP</span>
        <span>OCT</span>
        <span>NOV</span>
        <span>DEC</span>
        <span>JAN</span>
        <span>FEB</span>
      </div>
    </CardWrapper>
  );
}
