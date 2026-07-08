"use client";

import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  DashboardAreaChart,
  DashboardEmptyState,
  DashboardValueCard,
} from "@/shared/ui/dashboard/analytics-ui";
import { useDeviceUtilization } from "@/features/dashboard/business/model/useDeviceUtilization";
import { useDeviceHealthSample } from "@/features/dashboard/business/model/useDeviceHealthSample";

export function DeviceUtilizationWidget() {
  // MDM backend aggregate — daily active count + new-device trend chart
  const {
    dailyActiveDevices,
    activeUsersChartData,
    isLoading: isLoadingUtilization,
  } = useDeviceUtilization();

  // Sampled hardware details — session duration (powerOnTime) + screen time
  // (sum of foreground app usage). React Query deduplicates these queries if
  // AssetTrackingWidget has already fetched the same zone devices.
  const {
    avgSessionDuration,
    avgScreenTime,
    batteryChartData,
    isLoading: isLoadingHealth,
  } = useDeviceHealthSample();

  const isLoading = isLoadingUtilization || isLoadingHealth;

  const metrics = [
    { title: "Daily active devices", value: dailyActiveDevices.toLocaleString() },
    { title: "Avg session duration", value: avgSessionDuration },
    { title: "Screen time per device", value: avgScreenTime },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">
        Device Utilization &amp; Engagement
      </h2>

      {/* Summary stat cards */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map(({ title, value }) => (
          <CardWrapper key={title} variant="outline" padding="default">
            <p className="text-xs font-medium text-[#667085]">{title}</p>
            {isLoading ? (
              <Skeleton className="mt-2 h-7 w-24" />
            ) : (
              <h4 className="mt-1 text-2xl font-bold text-slate-900">{value}</h4>
            )}
          </CardWrapper>
        ))}
      </div>

      {/* Value chart cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Active devices over time (from MDM backend) */}
        <DashboardValueCard
          value={isLoadingUtilization ? "—" : dailyActiveDevices.toLocaleString()}
          label="Daily active devices"
          isLoading={isLoadingUtilization}
          color="#4318ff"
          chartBadge={`${dailyActiveDevices.toLocaleString()} active`}
        >
          {activeUsersChartData.length > 0 ? (
            <DashboardAreaChart
              data={activeUsersChartData}
              dataKey="users"
              xAxisKey="month"
              gradientId="devutil-active-users"
            />
          ) : (
            <DashboardEmptyState />
          )}
        </DashboardValueCard>

        {/* Avg session duration from sampled powerOnTime */}
        <DashboardValueCard
          value={isLoadingHealth ? "—" : avgSessionDuration}
          label="Avg session duration (sampled)"
          isLoading={isLoadingHealth}
          color="#e418ff"
          chartBadge={avgSessionDuration !== "—" ? `${avgSessionDuration} avg uptime` : undefined}
        >
          {batteryChartData.length > 0 ? (
            <DashboardAreaChart
              data={batteryChartData}
              dataKey="score"
              xAxisKey="day"
              gradientId="devutil-session-health"
              initialColor="#e418ff"
            />
          ) : (
            <DashboardEmptyState />
          )}
        </DashboardValueCard>
      </div>
    </div>
  );
}
