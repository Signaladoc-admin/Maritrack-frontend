"use client";

import { Header } from "@/shared/ui/layout/header";
import { Button } from "@/shared/ui/button";
import { DownloadCloud, MonitorPlay, WifiOff } from "lucide-react";
import AnalyticsLineCard from "@/features/dashboard/business/ui/AnalyticsLineCard";
import MiniLineChartCard from "@/features/dashboard/business/ui/MiniLineChartCard";
import CircularProgressCard from "@/features/dashboard/business/ui/CircularProgressCard";
import DashboardTableCard, { Column } from "@/features/dashboard/business/ui/DashboardTableCard";
import DeviceMapCard from "@/features/dashboard/business/ui/DeviceMapCard";
import { H4 } from "@/shared/ui/typography";
import { useBusinessDashboard } from "@/features/dashboard/business/model/useDashboard";
import { Skeleton } from "@/shared/ui/skeleton";

// Fallback for chart sections not yet covered by the dashboard API
const fallbackData = [0, 0, 0, 0, 0, 0];

export default function BusinessDashboard() {
  const {
    isLoading,
    deviceStats,
    newDevicesChart,
    storageChart,
    wifiChart,
    mobileChart,
    managerAppVersionsChart,
  } = useBusinessDashboard();

  const resolve = (data: number[]) => (data.length > 0 ? data : fallbackData);

  if (isLoading) {
    return (
      <div className="space-y-10 pb-10">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center justify-between">
        <Header
          title="Analytics"
          className="mb-0"
          subtitle={
            <div className="flex items-center gap-2">
              <span className="font-normal">Analytics for</span>
              <select className="rounded-md border-transparent bg-transparent font-semibold outline-none">
                <option value="this_week">This week</option>
                <option value="last_week">Last week</option>
                <option value="this_month">This month</option>
                <option value="last_month">Last month</option>
              </select>
            </div>
          }
        />
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-lg text-sm font-semibold text-neutral-600"
        >
          <DownloadCloud size={16} />
          Download
        </Button>
      </div>

      {/* TOP SECTION: Analytics Line Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsLineCard
          title="New devices"
          count={String(deviceStats.total)}
          percentageChange={0}
          timingLabel="All time"
          chartColor="#4F46E5"
          badgeLabel={`${deviceStats.active} Active`}
          badgeIndex={Math.max(0, newDevicesChart.y.length - 1)}
          data={resolve(newDevicesChart.y)}
        />
        <AnalyticsLineCard
          title="Online vs Offline"
          count={`${deviceStats.online} / ${deviceStats.offline}`}
          percentageChange={0}
          timingLabel="Live"
          chartColor="#E81CFF"
          badgeLabel={`${deviceStats.locked} Locked`}
          badgeIndex={0}
          data={resolve(mobileChart.y)}
        />
      </div>

      {/* COMPLIANCE & SECURITY */}
      <div className="space-y-5">
        <H4 className="text-sm font-bold text-[#1a3860]">Compliance & Security</H4>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Row 1 */}
          <MiniLineChartCard
            title="Blocked App Installation Attempts"
            chartColor="#EF4444"
            badgeLabel="—"
            badgeIndex={0}
            data={fallbackData}
          />
          <CircularProgressCard
            title="Devices with Latest Security Patch"
            primaryValue={0}
            primaryLabel="Vulnerable"
            primaryColor="#EF4444"
            secondaryValue={0}
            secondaryLabel="Secured"
            secondaryColor="#22C55E"
          />

          {/* Row 2 */}
          <DashboardTableCard
            title="Policy Violation incidents"
            columns={[
              { key: "incident", header: "Incident", className: "w-1/2" },
              { key: "date", header: "DATE", className: "w-1/2 text-right font-medium" },
            ]}
            data={[]}
            timingLabel="This month"
          />
          <MiniLineChartCard
            title="Jailbreak/Root Detection Rate"
            chartColor="#171717"
            badgeLabel="—"
            badgeIndex={0}
            data={fallbackData}
          />
        </div>
      </div>

      {/* CONNECTIVITY & LEARNING ACCESS */}
      <div className="space-y-5">
        <H4 className="text-sm font-bold text-[#1a3860]">Connectivity & Learning Access</H4>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AnalyticsLineCard
            title="WiFi data usage"
            count="—"
            percentageChange={0}
            timingLabel="This month"
            chartColor="#C026D3"
            badgeLabel="WiFi"
            badgeIndex={Math.max(0, wifiChart.y.length - 1)}
            data={resolve(wifiChart.y)}
            icon={<MonitorPlay size={16} className="text-[#C026D3]" />}
          />
          <AnalyticsLineCard
            title="Mobile data usage"
            count="—"
            percentageChange={0}
            timingLabel="This month"
            chartColor="#0F172A"
            badgeLabel="Mobile"
            badgeIndex={Math.max(0, mobileChart.y.length - 1)}
            data={resolve(mobileChart.y)}
            icon={<WifiOff size={16} className="text-[#0F172A]" />}
          />
        </div>
      </div>

      {/* ASSET TRACKING & INVENTORY HEALTH */}
      <div className="space-y-5">
        <H4 className="text-sm font-bold text-[#1a3860]">Asset Tracking & Inventory Health</H4>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Row 1 */}
          <MiniLineChartCard
            title="Storage usage"
            chartColor="#EF4444"
            badgeLabel="Storage"
            badgeIndex={3}
            data={resolve(storageChart.y)}
          />
          <CircularProgressCard
            title="Devices availability"
            primaryValue={0}
            primaryLabel="Damaged"
            primaryColor="#EF4444"
            secondaryValue={0}
            secondaryLabel="Functional"
            secondaryColor="#22C55E"
          />

          {/* Row 2 */}
          <DashboardTableCard
            title="Lost/Stolen Device Reports"
            columns={[
              { key: "device", header: "Device", className: "w-[40%]" },
              { key: "location", header: "Last known location", className: "w-[60%] font-medium" },
            ]}
            data={[]}
            timingLabel="This month"
          />
          <DeviceMapCard title="Jailbreak/Root Detection Rate" timingLabel="This month" />
        </div>

        {/* Full Width Row */}
        <div>
          <H4 className="mt-6 mb-4 text-sm font-bold text-[#1a3860]">
            Blacklisted Website Categories
          </H4>
          <DashboardTableCard
            columns={[
              { key: "website", header: "Websites", className: "w-[40%]" },
              {
                key: "category",
                header: "Category",
                className: "w-[40%] text-neutral-600 font-semibold text-[13px]",
              },
              { key: "attempts", header: "Attempts", className: "w-[20%]" },
            ]}
            data={[]}
            timingLabel="This month"
          />
        </div>
      </div>
    </div>
  );
}
