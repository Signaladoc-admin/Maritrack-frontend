import { MetricCard } from "@/features/dashboard/business/ui/MetricCard";
import { InfoListCard } from "@/shared/ui/AppListCard/AppListCard";
import { MapCard } from "@/features/general/ui/map-card";
import React from "react";
import { ChartColor } from "@/features/dashboard/business/ui/MetricCard";
import { MDMDeviceDetailsResponse } from "@/features/device/types";
import { useAuth } from "@/shared/auth/AuthProvider";
import DeviceHardwareDetailsCard from "@/features/device/ui/DeviceHardwareDetailsCard";
import DevicePossesorDetailsCard from "@/features/device/ui/DevicePossesorDetailsCard";

interface Props {
  storageUsedGB: string;
  totalStorageGB: string;
  storageColor: ChartColor;
  storageFooter: string;
  batteryLevel: number;
  batteryColor: ChartColor;
  batteryFooter: string;
  top5Apps: any[];
  deviceId: string;
  freePercent: number;
  fullDeviceDetails: MDMDeviceDetailsResponse;
}

export default function DeviceDetailsGeneralTabContent({
  storageUsedGB,
  totalStorageGB,
  storageColor,
  storageFooter,
  batteryLevel,
  batteryColor,
  batteryFooter,
  top5Apps,
  deviceId,
  freePercent,
  fullDeviceDetails,
}: Props) {
  const { user } = useAuth();
  const isBusinessUser = user?.appRole === "BUSINESS";

  const memoryCard = (
    <MetricCard
      title="Memory"
      value={`${storageUsedGB} GB of ${totalStorageGB} GB`}
      chartColor={storageColor}
      chartData={[20, 30, 40, 50, 60, 70, 100 - freePercent]}
      footerText={storageFooter}
    />
  );

  const batteryCard = (
    <MetricCard
      title="Battery health"
      value={`${batteryLevel}%`}
      chartColor={batteryColor}
      chartData={[100, 90, 80, 70, 65, 60, batteryLevel]}
      footerText={batteryFooter}
    />
  );

  return (
    <div className="flex flex-col gap-6">
      {isBusinessUser ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(260px,360px),1fr]">
          {/* Hardware card — stretches to match right column height */}
          <DeviceHardwareDetailsCard device={fullDeviceDetails} />

          {/* Right column: possessor, memory, battery in a single 3-col row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <DevicePossesorDetailsCard device={fullDeviceDetails} />
            {memoryCard}
            {batteryCard}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {memoryCard}
          {batteryCard}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoListCard
          title="Top 5 apps"
          actionText="View all"
          onActionClick={() => console.log("View Apps")}
          items={top5Apps}
        />
        <MapCard deviceId={deviceId} />
      </div>
    </div>
  );
}
