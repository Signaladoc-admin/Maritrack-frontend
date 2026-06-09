"use client";

import * as React from "react";
import {
  DashboardEmptyState,
  DashboardLineChart,
  DashboardValueCard,
} from "@/shared/ui/dashboard/analytics-ui";
import { useNetworkAppUsage } from "@/features/dashboard/business/model/useConnectivityLearning";

export function ConnectivityLearningWidget() {
  const { avgWifiValue, avgScreenTimeValue, wifiChartData, screenTimeData, isLoading } =
    useNetworkAppUsage();

  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">App Usage &amp; Connectivity</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardValueCard
          value={isLoading ? "—" : avgWifiValue}
          label="Avg WiFi data per device"
          isLoading={isLoading}
          color="#e418ff"
          chartBadge="WiFi usage"
        >
          {wifiChartData.some((d) => d.usage > 0) ? (
            <DashboardLineChart data={wifiChartData} dataKey="usage" xAxisKey="day" />
          ) : (
            <DashboardEmptyState />
          )}
        </DashboardValueCard>

        <DashboardValueCard
          value={isLoading ? "—" : avgScreenTimeValue}
          label="Avg screen time per device"
          isLoading={isLoading}
          color="#003366"
          chartBadge="Screen time"
        >
          {screenTimeData.some((d) => d.hours > 0) ? (
            <DashboardLineChart data={screenTimeData} dataKey="hours" xAxisKey="day" />
          ) : (
            <DashboardEmptyState />
          )}
        </DashboardValueCard>
      </div>
    </div>
  );
}
