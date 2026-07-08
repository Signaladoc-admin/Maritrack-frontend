"use client";

import { useMemo } from "react";
import ApexChart from "./ApexChart";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import Badge from "@/shared/ui/Badge";
import { Calendar } from "lucide-react";
import { ApexOptions } from "apexcharts";

interface CircularProgressCardProps {
  title: string;
  timingLabel?: string;
  primaryValue: number;
  primaryLabel: string;
  primaryColor: string;
  secondaryValue: number;
  secondaryLabel: string;
  secondaryColor: string;
}

export default function CircularProgressCard({
  title,
  timingLabel = "This month",
  primaryValue,
  primaryLabel,
  primaryColor,
  secondaryValue,
  secondaryLabel,
  secondaryColor,
}: CircularProgressCardProps) {
  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "donut",
        animations: { enabled: false },
      },
      colors: [primaryColor, secondaryColor],
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: { show: false },
          },
          expandOnClick: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        colors: ["#ffffff"],
        width: 8,
      },
      tooltip: {
        enabled: false,
      },
    }),
    [primaryColor, secondaryColor]
  );

  return (
    <CardWrapper variant="outline" className="relative p-5 lg:p-6 min-h-[220px]">
      <div className="flex items-start justify-between z-20 mb-6">
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
      
      <div className="flex items-center justify-between w-full">
        <div className="space-y-4 max-w-[50%]">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-sm shadow-sm"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="text-[11px] font-semibold text-neutral-600">
              {primaryLabel} ({primaryValue}%)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-sm shadow-sm"
              style={{ backgroundColor: secondaryColor }}
            />
            <span className="text-[11px] font-semibold text-neutral-600">
              {secondaryLabel} ({secondaryValue}%)
            </span>
          </div>
        </div>
        
        <div className="w-[140px] h-[140px] relative">
          {/* Inner shadow effect pseudo-element to match design if needed */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.06)] scale-75 pointer-events-none" />
          <ApexChart
            options={chartOptions}
            series={[primaryValue, secondaryValue]}
            type="donut"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </CardWrapper>
  );
}
