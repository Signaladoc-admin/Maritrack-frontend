import BasicInfoCard from "@/features/dashboard/ui/BasicInfoCard";
import DeviceUtilizationCard from "@/features/dashboard/ui/DeviceUtilizationCard";
import UserAnalyticsCard from "@/features/dashboard/ui/UserAnalyticsCard";
import { formatNumber } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { H4 } from "@/shared/ui/typography";
import { DownloadCloud } from "lucide-react";

export default function BusinessDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <Header
          title="Analytics"
          className="mb-0"
          subtitle={
            <div className="flex items-center gap-2">
              <span className="font-normal">Analytics for</span>
              <select className="rounded-md border-transparent font-semibold">
                <option value="this_week">This week</option>
                <option value="last_week">Last week</option>
                <option value="this_month">This month</option>
                <option value="last_month">Last month</option>
              </select>
            </div>
          }
        />
        <Button variant="outline" className="flex items-center gap-3">
          <DownloadCloud />
          Download
        </Button>
      </div>
      <div className="space-y-5">
        <H4>Basic Information</H4>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <BasicInfoCard title="Total assets added" count={formatNumber(30000)} />
          <BasicInfoCard title="Total assigned assets" count={formatNumber(20000)} />
          <BasicInfoCard title="Total unassigned assets" count={formatNumber(10000)} />
          <BasicInfoCard title="Damaged assets" count={formatNumber(300)} />
        </div>
      </div>

      <div className="space-y-5">
        <H4>Device Utilization & Engagement</H4>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <DeviceUtilizationCard
              title="Total assets added"
              count={formatNumber(30000)}
              percentageChange={10}
            />
            <DeviceUtilizationCard
              title="Total assigned assets"
              count={formatNumber(20000)}
              percentageChange={-10}
            />
            <DeviceUtilizationCard
              title="Total unassigned assets"
              count={formatNumber(10000)}
              percentageChange={10}
            />
            <DeviceUtilizationCard
              title="Damaged assets"
              count={formatNumber(300)}
              percentageChange={-10}
            />
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <UserAnalyticsCard
              measureCount={10000}
              percentageChange={2.5}
              title="Daily active users"
            />
            <UserAnalyticsCard
              measureCount={10000}
              percentageChange={2.5}
              title="Daily active users"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
