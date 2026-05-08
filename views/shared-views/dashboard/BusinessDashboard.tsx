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
import { cn } from "@/shared/lib/utils";
import { useBusinessDashboard } from "@/features/dashboard/business/model/useDashboard";
import { Skeleton } from "@/shared/ui/skeleton";

// Static fallback data (used when API returns empty arrays)
const fallbackData = [0, 0, 0, 0, 0, 0];

// Mock data for sections not yet covered by the dashboard API
const blockedAppData = [10, 5, 8, 23, 10, 15, 12, 5, 8, 10, 15, 18];
const jailbreakData = [15, 10, 20, 40, 25, 30, 15, 20, 10, 5, 15, 18];

// Table Mock Data
const violationsData = [
  { incident: "Violation A", date: "18 Apr 2021, 5:30pm" },
  { incident: "Violation B", date: "18 Apr 2021, 3:23pm" },
  { incident: "Violation C", date: "20 May 2021, 4:22am" },
  { incident: "Violation D", date: "12 Jul 2021, 9:30am" },
];

const lostDevicesData = [
  { device: "Samsung S7", location: "Victoria Island, Lagos" },
  { device: "Nokia 3310", location: "Victoria Island, Lagos" },
  { device: "iPhone 11", location: "Victoria Island, Lagos" },
  { device: "Motorolla GCX", location: "Victoria Island, Lagos" },
];

const blacklistedWebsitesData = [
  { website: "pornhub.com", category: "Adult & Pornographic Content", attempts: 12 },
  { website: "bet9ja.com", category: "Gambling & Betting Site", attempts: 100 },
  { website: "facebook.com", category: "Social media", attempts: "3,200" },
  { website: "netflix.com", category: "Streaming & Entertainment", attempts: 200 },
];

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

  console.log(newDevicesChart);

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
            chartColor="#EF4444" // Red
            badgeLabel="23 Blocked attempts"
            badgeIndex={3}
            data={blockedAppData}
          />
          <CircularProgressCard
            title="Devices with Latest Security Patch"
            primaryValue={60.6}
            primaryLabel="Vulnerable"
            primaryColor="#EF4444"
            secondaryValue={37.5}
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
            data={violationsData}
            timingLabel="This month"
          />
          <MiniLineChartCard
            title="Jailbreak/Root Detection Rate"
            chartColor="#171717" // Black/Dark
            badgeLabel="40% Detection rate"
            badgeIndex={3}
            data={jailbreakData}
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
            primaryValue={60.6}
            primaryLabel="Damaged"
            primaryColor="#EF4444"
            secondaryValue={37.5}
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
            data={lostDevicesData}
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
            data={blacklistedWebsitesData}
            timingLabel="This month"
          />
        </div>
      </div>
    </div>
  );
}
