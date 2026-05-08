"use client";

import * as React from "react";
import { LineChartCard } from "@/shared/ui/dashboard/LineChartCard";

const usageData = [
  { month: "SEP", usage: 40 },
  { month: "OCT", usage: 30 },
  { month: "NOV", usage: 70 },
  { month: "DEC", usage: 20 },
  { month: "JAN", usage: 50 },
  { month: "FEB", usage: 45 },
];

const learningData = [
  { month: "SEP", hours: 15 },
  { month: "OCT", hours: 25 },
  { month: "NOV", hours: 45 },
  { month: "DEC", hours: 10 },
  { month: "JAN", hours: 30 },
  { month: "FEB", hours: 50 },
];

export function ConnectivityLearningWidget() {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Connectivity & Learning Access</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <LineChartCard
          title="Usage of preloaded content"
          value="20"
          trendValue="+2.46%"
          trendDirection="up"
          data={usageData}
          dataKey="usage"
          xAxisKey="month"
          color="#D946EF"
          timeRangeAction="Last week"
        />
        <LineChartCard
          title="Offline learning hours logged"
          value="34h 54m 22s"
          trendValue="+2.46%"
          trendDirection="up"
          data={learningData}
          dataKey="hours"
          xAxisKey="month"
          color="#1E3A8A"
          timeRangeAction="Last week"
        />
      </div>
    </div>
  );
}
