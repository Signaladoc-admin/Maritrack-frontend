"use client";

import { Header } from "@/shared/ui/layout/header";
import { Button } from "@/shared/ui/button";
import { DownloadCloud, MonitorPlay, WifiOff } from "lucide-react";
import AnalyticsLineCard from "@/features/dashboard/ui/AnalyticsLineCard";
import MiniLineChartCard from "@/features/dashboard/ui/MiniLineChartCard";
import CircularProgressCard from "@/features/dashboard/ui/CircularProgressCard";
import DashboardTableCard, { Column } from "@/features/dashboard/ui/DashboardTableCard";
import DeviceMapCard from "@/features/dashboard/ui/DeviceMapCard";
import { H4 } from "@/shared/ui/typography";
import { cn } from "@/shared/lib/utils";

// Mock Data
const userAnalyticsData = [10, 15, 12, 18, 40, 25, 15, 20, 30, 38, 45, 48];
const sessionData = [15, 22, 18, 28, 55, 30, 25, 35, 45, 52, 60, 65];
const preloadedContentData = [5, 12, 10, 25, 20, 45, 30, 35, 50, 48, 55, 60];
const offlineLearningData = [20, 15, 25, 18, 30, 22, 40, 35, 55, 45, 60, 50];

const blockedAppData = [10, 5, 8, 23, 10, 15, 12, 5, 8, 10, 15, 18];
const jailbreakData = [15, 10, 20, 40, 25, 30, 15, 20, 10, 5, 15, 18];
const batteryData = [30, 28, 25, 40, 35, 20, 15, 25, 30, 35, 28, 32];

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
  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center justify-between">
        <Header
          title="Analytics"
          className="mb-0"
          subtitle={
            <div className="flex items-center gap-2">
              <span className="font-normal">Analytics for</span>
              <select className="rounded-md border-transparent font-semibold bg-transparent outline-none">
                <option value="this_week">This week</option>
                <option value="last_week">Last week</option>
                <option value="this_month">This month</option>
                <option value="last_month">Last month</option>
              </select>
            </div>
          }
        />
        <Button variant="outline" className="flex items-center gap-2 text-sm font-semibold text-neutral-600 rounded-lg">
          <DownloadCloud size={16} />
          Download
        </Button>
      </div>

      {/* TOP SECTION: Analytics Line Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsLineCard
          title="Daily active users"
          count="10,000"
          percentageChange={2.45}
          timingLabel="This month"
          chartColor="#4F46E5" // Indigo
          badgeLabel="40 Active devices"
          badgeIndex={4}
          data={userAnalyticsData}
        />
        <AnalyticsLineCard
          title="Average session duration"
          count="10:56:22"
          percentageChange={2.45}
          timingLabel="Last week"
          chartColor="#E81CFF" // Pink/Magenta
          badgeLabel="01:12:44 sessions"
          badgeIndex={8}
          data={sessionData}
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
            title="Usage of preloaded content"
            count="20"
            percentageChange={2.45}
            timingLabel="Last week"
            chartColor="#C026D3" // Fuchsia
            badgeLabel="Learning Videos (20%)"
            badgeIndex={5}
            data={preloadedContentData}
            icon={<MonitorPlay size={16} className="text-[#C026D3]" />}
          />
          <AnalyticsLineCard
            title="Offline learning hours logged"
            count="34h 54m 22s"
            percentageChange={2.45}
            timingLabel="Last week"
            chartColor="#0F172A" // Slate 900
            badgeLabel="2 hours logged"
            badgeIndex={6}
            data={offlineLearningData}
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
            title="Battery health score"
            chartColor="#EF4444" // Red
            badgeLabel="40%"
            badgeIndex={3}
            data={batteryData}
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
          <DeviceMapCard
            title="Jailbreak/Root Detection Rate"
            timingLabel="This month"
          />
        </div>

        {/* Full Width Row */}
        <div>
          <H4 className="text-sm font-bold text-[#1a3860] mb-4 mt-6">Blacklisted Website Categories</H4>
          <DashboardTableCard
            columns={[
              { key: "website", header: "Websites", className: "w-[40%]" },
              { key: "category", header: "Category", className: "w-[40%] text-neutral-600 font-semibold text-[13px]" },
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
