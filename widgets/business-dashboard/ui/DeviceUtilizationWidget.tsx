"use client";

import * as React from "react";
import { MetricCard } from "@/shared/ui/dashboard/MetricCard";
import { AreaChartCard } from "@/shared/ui/dashboard/AreaChartCard";

const deviceData = [
  { month: "SEP", users: 4000 },
  { month: "OCT", users: 3000 },
  { month: "NOV", users: 7000 },
  { month: "DEC", users: 2780 },
  { month: "JAN", users: 4890 },
  { month: "FEB", users: 5390 },
];

const sessionData = [
  { month: "SEP", duration: 200 },
  { month: "OCT", duration: 350 },
  { month: "NOV", duration: 500 },
  { month: "DEC", duration: 200 },
  { month: "JAN", duration: 400 },
  { month: "FEB", duration: 380 },
];

export function DeviceUtilizationWidget() {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-base font-semibold text-gray-900">
        Device Utilization & Engagement
      </h2>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          title="Daily active devices"
          value="10,000"
          trendValue="+31%"
          trendLabel="since last month"
          trendDirection="up"
        />
        <MetricCard
          title="Average session duration"
          value="300"
          trendValue="-25%"
          trendLabel="since last month"
          trendDirection="down"
        />
        <MetricCard
          title="Screen time per user"
          value="40min"
          trendValue="-23%"
          trendLabel="since last month"
          trendDirection="down"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AreaChartCard
          title="Daily active users"
          value="10,000"
          trendValue="+2.46%"
          trendDirection="up"
          data={deviceData}
          dataKey="users"
          xAxisKey="month"
          color="#6366F1"
          gradientId="deviceGradient"
          timeRangeAction="This month"
        />
        <AreaChartCard
          title="Average session duration"
          value="10:56:22"
          trendValue="+2.46%"
          trendDirection="up"
          data={sessionData}
          dataKey="duration"
          xAxisKey="month"
          color="#D946EF"
          gradientId="sessionGradient"
          timeRangeAction="Last week"
        />
      </div>
    </div>
  );
}
