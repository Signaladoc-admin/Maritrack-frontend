"use client";

import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  DashboardAreaChart,
  DashboardEmptyState,
  DashboardValueCard,
} from "@/shared/ui/dashboard/analytics-ui";

interface DeviceUtilizationWidgetProps {
  dailyActiveDevices?: number;
  avgSessionDuration?: string;
  screenTimePerUser?: string;
  activeUsersChartData?: Record<string, string | number>[];
  sessionDurationChartData?: Record<string, string | number>[];
  isLoading?: boolean;
}

export function DeviceUtilizationWidget({
  dailyActiveDevices = 0,
  avgSessionDuration = "—",
  screenTimePerUser = "—",
  activeUsersChartData = [],
  sessionDurationChartData = [],
  isLoading = false,
}: DeviceUtilizationWidgetProps) {
  const metrics = [
    { title: "Daily active devices", value: dailyActiveDevices.toLocaleString() },
    { title: "Average session duration", value: avgSessionDuration },
    { title: "Screen time per user", value: screenTimePerUser },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">Device Utilization &amp; Engagement</h2>

      {/* Top summary stat cards */}
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

      {/* Large area chart value cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardValueCard
          value={isLoading ? "—" : dailyActiveDevices.toLocaleString()}
          label="Daily active users"
          isLoading={isLoading}
          color="#4318ff"
          chartBadge={`${dailyActiveDevices.toLocaleString()} Active devices`}
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

        <DashboardValueCard
          value={isLoading ? "—" : avgSessionDuration}
          label="Average session duration"
          isLoading={isLoading}
          color="#e418ff"
          chartBadge={`${avgSessionDuration} sessions`}
        >
          {sessionDurationChartData.length > 0 ? (
            <DashboardAreaChart
              data={sessionDurationChartData}
              dataKey="duration"
              xAxisKey="month"
              gradientId="devutil-session-duration"
            />
          ) : (
            <DashboardEmptyState />
          )}
        </DashboardValueCard>
      </div>
    </div>
  );
}
