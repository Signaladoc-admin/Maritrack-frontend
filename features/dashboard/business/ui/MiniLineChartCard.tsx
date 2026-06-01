"use client";

import { useMemo } from "react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import Badge from "@/shared/ui/Badge";
import { Calendar } from "lucide-react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";

interface MiniLineChartCardProps {
  title: string;
  timingLabel?: string;
  chartColor: string;
  badgeLabel?: string;
  badgeIndex?: number;
  data: number[];
}

export default function MiniLineChartCard({
  title,
  timingLabel = "This month",
  chartColor,
  badgeLabel,
  badgeIndex = 3,
  data,
}: MiniLineChartCardProps) {
  
  const chartData = useMemo(() => {
    return data.map((val, idx) => ({ name: idx.toString(), pv: val }));
  }, [data]);

  const suffix = badgeLabel ? badgeLabel.replace(/^[\d:.,%]+\s*/, "") : "";

  return (
    <CardWrapper variant="outline" className="relative overflow-hidden p-5 lg:p-6 flex flex-col justify-between min-h-[220px]">
      <div className="flex items-start justify-between z-20">
        <h3 className="font-semibold text-neutral-800 text-sm max-w-[60%]">{title}</h3>
        <Badge
          variant="secondary"
          content={
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
              <Calendar size={13} />
              <span className="text-[11px]">{timingLabel}</span>
            </div>
          }
        />
      </div>
      
      <div className="flex-1 w-full relative z-10 mt-4">
        <ResponsiveContainer width="100%" height={120}>
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
                r: 5,
                fill: chartColor,
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between items-center px-4 pt-2 text-[9px] font-bold text-neutral-300 w-full absolute bottom-4 left-0">
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THUR</span>
        <span>FRI</span>
        <span>SAT</span>
        <span>SUN</span>
      </div>
    </CardWrapper>
  );
}
