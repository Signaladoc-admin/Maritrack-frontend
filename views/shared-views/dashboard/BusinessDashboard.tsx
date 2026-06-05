"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useBusinessDashboard } from "@/features/dashboard/business/model/useDashboard";
import { DashboardFilterProvider } from "@/shared/ui/dashboard/analytics-ui";
import { DashboardHeaderWidget } from "@/widgets/business-dashboard/ui/DashboardHeaderWidget";
import { BasicInfoWidget } from "@/widgets/business-dashboard/ui/BasicInfoWidget";
import { DeviceUtilizationWidget } from "@/widgets/business-dashboard/ui/DeviceUtilizationWidget";
import { ComplianceSecurityWidget } from "@/widgets/business-dashboard/ui/ComplianceSecurityWidget";
import { ConnectivityLearningWidget } from "@/widgets/business-dashboard/ui/ConnectivityLearningWidget";
import { AssetTrackingWidget } from "@/widgets/business-dashboard/ui/AssetTrackingWidget";
import { BlacklistedWebsitesWidget } from "@/widgets/business-dashboard/ui/BlacklistedWebsitesWidget";

function zipChart(
  x: string[],
  y: number[],
  xKey: string,
  yKey: string,
): Record<string, string | number>[] {
  return x.map((label, i) => ({ [xKey]: label, [yKey]: y[i] ?? 0 }));
}

const BusinessDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const timeRangeLabel = useMemo(() => {
    if (!dateRange?.from) return "All time";
    if (!dateRange.to) return format(dateRange.from, "MMM d, yyyy");
    return `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d, yyyy")}`;
  }, [dateRange]);

  const {
    isLoading,
    deviceStats,
    newDevicesChart,
    storageChart,
    wifiChart,
    deviceListTotal,
    assignedCount,
    unassignedCount,
    damagedCount,
    deviceLocations,
    devicesAvailabilityData,
    securityPatchData,
    preloadedContentValue,
    offlineLearningValue,
    lostReports,
    avgSessionDuration,
    screenTimePerUser,
    sessionDurationChartData,
    blockedAttemptsData,
    jailbreakData,
    violationIncidents,
    batteryData,
    blacklistedWebsites,
  } = useBusinessDashboard();

  return (
    <DashboardFilterProvider label={timeRangeLabel}>
      <div className="mx-auto min-h-screen w-full max-w-7xl py-6 sm:px-6 lg:px-8">
        <DashboardHeaderWidget date={dateRange} onDateSelect={setDateRange} />
        <BasicInfoWidget
          totalAssets={deviceListTotal}
          assignedAssets={assignedCount}
          unassignedAssets={unassignedCount}
          damagedAssets={damagedCount}
          isLoading={isLoading}
        />
        {/* DeviceUtilizationWidget — avgSessionDuration, screenTimePerUser, sessionDurationChartData are simulated */}
        {/* <DeviceUtilizationWidget
          dailyActiveDevices={deviceStats.active}
          avgSessionDuration={avgSessionDuration}
          screenTimePerUser={screenTimePerUser}
          activeUsersChartData={zipChart(newDevicesChart.x, newDevicesChart.y, "month", "users")}
          sessionDurationChartData={sessionDurationChartData}
          isLoading={isLoading}
        /> */}
        {/* ComplianceSecurityWidget — blockedAttemptsData, jailbreakData, violationIncidents are static mock data */}
        {/* <ComplianceSecurityWidget
          securityPatchData={securityPatchData}
          blockedAttemptsData={blockedAttemptsData}
          violationIncidents={violationIncidents}
          jailbreakData={jailbreakData}
          isLoading={isLoading}
        /> */}
        <ConnectivityLearningWidget
          preloadedContentValue={preloadedContentValue}
          offlineLearningValue={offlineLearningValue}
          preloadedContentData={zipChart(storageChart.x, storageChart.y, "month", "usage")}
          offlineLearningData={zipChart(wifiChart.x, wifiChart.y, "month", "hours")}
          isLoading={isLoading}
        />
        {/* batteryData omitted — backed by static mock data */}
        <AssetTrackingWidget
          devicesAvailabilityData={devicesAvailabilityData}
          deviceLocations={deviceLocations}
          lostReports={lostReports}
          isLoading={isLoading}
        />
        {/* BlacklistedWebsitesWidget — entirely static mock data */}
        {/* <BlacklistedWebsitesWidget websites={blacklistedWebsites} isLoading={isLoading} /> */}
      </div>
    </DashboardFilterProvider>
  );

};

export default BusinessDashboard;
