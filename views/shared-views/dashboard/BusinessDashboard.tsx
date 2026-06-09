"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { DashboardFilterProvider } from "@/shared/ui/dashboard/analytics-ui";
import { DashboardHeaderWidget } from "@/widgets/business-dashboard/ui/DashboardHeaderWidget";
import { BasicInfoWidget } from "@/widgets/business-dashboard/ui/BasicInfoWidget";
import { DeviceUtilizationWidget } from "@/widgets/business-dashboard/ui/DeviceUtilizationWidget";
import { ConnectivityLearningWidget } from "@/widgets/business-dashboard/ui/ConnectivityLearningWidget";
import { ComplianceSecurityWidget } from "@/widgets/business-dashboard/ui/ComplianceSecurityWidget";
import { AssetTrackingWidget } from "@/widgets/business-dashboard/ui/AssetTrackingWidget";

const BusinessDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const timeRangeLabel = useMemo(() => {
    if (!dateRange?.from) return "All time";
    if (!dateRange.to) return format(dateRange.from, "MMM d, yyyy");
    return `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d, yyyy")}`;
  }, [dateRange]);

  return (
    <DashboardFilterProvider label={timeRangeLabel}>
      <div className="mx-auto min-h-screen w-full max-w-7xl py-6 sm:px-6 lg:px-8">
        <DashboardHeaderWidget date={dateRange} onDateSelect={setDateRange} />
        <BasicInfoWidget />
        <DeviceUtilizationWidget />
        <ComplianceSecurityWidget />
        <ConnectivityLearningWidget />
        <AssetTrackingWidget />
        {/* BlacklistedWebsitesWidget — entirely static mock data */}
        {/* <BlacklistedWebsitesWidget /> */}
      </div>
    </DashboardFilterProvider>
  );
};

export default BusinessDashboard;
