"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  DashboardAreaChart,
  DashboardDonutChart,
  DashboardDonutSlice,
  DashboardEmptyState,
  DashboardTableSkeleton,
  DashboardTitledCard,
} from "@/shared/ui/dashboard/analytics-ui";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <Skeleton className="h-[250px] w-full rounded-xl" />,
});

interface LostReport {
  device: string;
  location: string;
}

interface DeviceLocation {
  id: string;
  label?: string;
  lat: number;
  lng: number;
}

interface AssetTrackingWidgetProps {
  batteryData?: Record<string, string | number>[];
  devicesAvailabilityData?: DashboardDonutSlice[];
  lostReports?: LostReport[];
  deviceLocations?: DeviceLocation[];
  isLoading?: boolean;
}

export function AssetTrackingWidget({
  batteryData = [],
  devicesAvailabilityData = [],
  lostReports = [],
  deviceLocations = [],
  isLoading = false,
}: AssetTrackingWidgetProps) {
  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">
        Asset Tracking &amp; Inventory Health
      </h2>

      {/* Row 1: Battery health (if data present) + Devices availability donut */}
      {batteryData.length > 0 && (
        <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DashboardTitledCard title="Battery health score">
            {isLoading ? (
              <Skeleton className="h-[220px] w-full rounded-xl" />
            ) : (
              <DashboardAreaChart
                data={batteryData}
                dataKey="score"
                xAxisKey="day"
                initialColor="#ff1818"
                gradientId="asset-battery-health"
                height={220}
              />
            )}
          </DashboardTitledCard>

          <DashboardTitledCard title="Devices availability">
            {isLoading ? (
              <Skeleton className="h-[220px] w-full rounded-xl" />
            ) : devicesAvailabilityData.length > 0 ? (
              <DashboardDonutChart data={devicesAvailabilityData} />
            ) : (
              <DashboardEmptyState height={220} />
            )}
          </DashboardTitledCard>
        </div>
      )}

      {/* Devices availability donut shown alone when batteryData absent */}
      {batteryData.length === 0 && (
        <div className="mb-4">
          <DashboardTitledCard title="Devices availability">
            {isLoading ? (
              <Skeleton className="h-[220px] w-full rounded-xl" />
            ) : devicesAvailabilityData.length > 0 ? (
              <DashboardDonutChart data={devicesAvailabilityData} />
            ) : (
              <DashboardEmptyState height={220} />
            )}
          </DashboardTitledCard>
        </div>
      )}

      {/* Row 2: Lost/Stolen table + Map */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardTitledCard title="Lost/Stolen Device Reports">
          {isLoading ? (
            <DashboardTableSkeleton />
          ) : lostReports.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="pb-3 text-xs font-semibold tracking-wide text-[#667085] uppercase">
                    Device
                  </th>
                  <th className="pb-3 text-xs font-semibold tracking-wide text-[#667085] uppercase">
                    Last known location
                  </th>
                </tr>
              </thead>
              <tbody>
                {lostReports.map((v, idx) => (
                  <tr key={idx} className="border-b border-[#f3f4f6] last:border-0">
                    <td className="py-3 font-medium text-slate-900">{v.device}</td>
                    <td className="py-3 text-[#667085]">{v.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <DashboardEmptyState message="No reports found" height={180} />
          )}
        </DashboardTitledCard>

        <DashboardTitledCard title="Device Locations">
          <MapComponent locations={deviceLocations} />
        </DashboardTitledCard>
      </div>
    </div>
  );
}
