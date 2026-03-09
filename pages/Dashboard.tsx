"use client";

import React from "react";
import { MetricCard } from "@/features/dashboard/ui/MetricCard";
import { AlertsSummaryCard } from "@/features/dashboard/ui/AlertsSummaryCard";
import { ChildrenDropdown } from "@/features/dashboard/ui/ChildrenDropdown";
import { DeviceUsageCard } from "@/shared/ui/DeviceStatusCard/DeviceStatusCard";
import { InfoListCard } from "@/shared/ui/AppListCard/AppListCard";
import { appData } from "@/app/(in-app)/dashboard/data";
import { useDragScroll } from "@/shared/hooks/useDragScroll";
import { useRouter } from "next/navigation";
import { useParentZones } from "@/features/mdm-sync/model/useMdmSync";

export default function Dashboard() {
  const { scrollContainerRef, events } = useDragScroll();

  const router = useRouter();

  const { data: parentZonesRes, isLoading: isFetchingChildren } = useParentZones();

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#1B3C73]">Hello Janet</h1>
          <p className="text-sm font-medium text-slate-400">January 10, 2026</p>
        </div>
        <ChildrenDropdown />
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <MetricCard
          title="Total Screen Time"
          value="4h 20"
          trendValue="+1h"
          trendType="positive"
          chartColor="green"
          chartData={[30, 45, 60, 80, 70, 90, 100]}
        />
        <MetricCard
          title="Battery health"
          value="60%"
          trendValue="-10%"
          trendType="negative"
          chartColor="red"
          chartData={[100, 90, 80, 70, 65, 60, 55]}
        />
      </div>

      <div
        ref={scrollContainerRef}
        {...events}
        className="flex w-full cursor-grab gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] *:min-w-[92%] *:shrink-0 active:cursor-grabbing md:*:max-w-[calc((100%-48px)/1.8)] md:*:min-w-[calc((100%-48px)/1.8)] lg:*:max-w-[calc((100%-48px)/2.2)] lg:*:min-w-[calc((100%-48px)/2.2)] [&::-webkit-scrollbar]:hidden"
      >
        <DeviceUsageCard
          deviceName="Mide's iPhone"
          status="active"
          percentage={37.5}
          device="Google Pixel 9"
          isRow={true}
          onClick={() => router.push(`/device/1`)}
        />
        <DeviceUsageCard
          deviceName="Mide's iPhone"
          status="locked"
          percentage={100}
          device="Iphone 14"
          isRow={true}
          onClick={() => router.push(`/device/2`)}
        />
        <DeviceUsageCard
          deviceName="Mide's iPhone"
          status="locked"
          percentage={100}
          device="Iphone 14"
          isRow={true}
          onClick={() => router.push(`/device/3`)}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoListCard
          title="Most used apps"
          actionText="View all"
          onActionClick={() => console.log("View Apps")}
          items={appData}
        />
        <AlertsSummaryCard />
      </div>
    </div>
  );
}
