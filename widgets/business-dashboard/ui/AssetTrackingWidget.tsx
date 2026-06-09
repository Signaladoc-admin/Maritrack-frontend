"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  DashboardAreaChart,
  DashboardDonutChart,
  DashboardEmptyState,
  DashboardTableSkeleton,
  DashboardTitledCard,
} from "@/shared/ui/dashboard/analytics-ui";
import { useAssetTracking } from "@/features/dashboard/business/model/useAssetTracking";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <Skeleton className="h-[250px] w-full rounded-xl" />,
});

const STATUS_LABEL: Record<string, string> = {
  DAMAGED: "Damaged",
  LOST: "Lost",
};

export function AssetTrackingWidget() {
  const { batteryChartData, devicesAvailabilityData, lostReports, deviceLocations, isLoading } =
    useAssetTracking();

  const hasBatteryData = batteryChartData.some((d) => d.score > 0);

  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">
        Asset Tracking &amp; Inventory Health
      </h2>

      {/* Row 1: Battery health + Devices availability donut */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardTitledCard title="Battery health (sampled avg %)">
          {isLoading ? (
            <Skeleton className="h-[220px] w-full rounded-xl" />
          ) : hasBatteryData ? (
            <DashboardAreaChart
              data={batteryChartData}
              dataKey="score"
              xAxisKey="day"
              initialColor="#ff1818"
              gradientId="asset-battery-health"
              height={220}
            />
          ) : (
            <DashboardEmptyState height={220} message="No battery data available" />
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

      {/* Row 2: Lost/Damaged table + Map */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardTitledCard title="Lost / Stolen Devices">
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
                    Status
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
                    <td className="py-3">
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600">
                        {STATUS_LABEL[v.status] ?? v.status}
                      </span>
                    </td>
                    <td className="py-3 text-[#667085]">{v.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <DashboardEmptyState message="No lost or stolen devices" height={180} />
          )}
        </DashboardTitledCard>

        <DashboardTitledCard title="Device Locations">
          <MapComponent locations={deviceLocations} />
        </DashboardTitledCard>
      </div>
    </div>
  );
}
