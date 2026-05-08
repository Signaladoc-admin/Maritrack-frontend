import React from "react";
import { DashboardHeaderWidget } from "@/widgets/business-dashboard/ui/DashboardHeaderWidget";
import { BasicInfoWidget } from "@/widgets/business-dashboard/ui/BasicInfoWidget";
import { DeviceUtilizationWidget } from "@/widgets/business-dashboard/ui/DeviceUtilizationWidget";
import { ComplianceSecurityWidget } from "@/widgets/business-dashboard/ui/ComplianceSecurityWidget";
import { ConnectivityLearningWidget } from "@/widgets/business-dashboard/ui/ConnectivityLearningWidget";
import { AssetTrackingWidget } from "@/widgets/business-dashboard/ui/AssetTrackingWidget";
import { BlacklistedWebsitesWidget } from "@/widgets/business-dashboard/ui/BlacklistedWebsitesWidget";

const BusinessDashboard = () => {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl py-6 sm:px-6 lg:px-8">
      <DashboardHeaderWidget />
      <BasicInfoWidget />
      <DeviceUtilizationWidget />
      <ComplianceSecurityWidget />
      <ConnectivityLearningWidget />
      <AssetTrackingWidget />
      <BlacklistedWebsitesWidget />
    </div>
  );
};

export default BusinessDashboard;
