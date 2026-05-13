"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/features/dashboard/business/ui/MetricCard";
import { AlertsSummaryCard } from "@/features/dashboard/business/ui/AlertsSummaryCard";
import { ChildrenDropdown } from "@/features/dashboard/business/ui/ChildrenDropdown";
import { DeviceUsageCard } from "@/shared/ui/DeviceStatusCard/DeviceStatusCard";
import { InfoListCard } from "@/shared/ui/AppListCard/AppListCard";
import { appData } from "@/app/(in-app)/dashboard/data";
import { useDragScroll } from "@/shared/hooks/useDragScroll";
import { useRouter } from "next/navigation";
import { formatDate } from "date-fns";
import { useParentZones, useZoneDevices } from "@/features/mdm-sync/model/useMdmSync";

export default function ParentDashboard() {
  const { scrollContainerRef, events } = useDragScroll();
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);

  const { data: parentZonesRes } = useParentZones();

  const zoneId = parentZonesRes?.[0]?.id;

  const { data: devices, isLoading: isLoadingDevices } = useZoneDevices(zoneId);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  console.log(devices);

  const router = useRouter();

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#1B3C73]">Hello Janet</h1>
          <p className="text-sm font-medium text-slate-400">
            {currentDate && formatDate(currentDate, "MMMM dd, yyyy")}
          </p>
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
        {devices && devices.length > 0 ? (
          devices.map((device) => (
            <DeviceUsageCard
              key={device.id}
              deviceName={device.model}
              status="active" // Defaulting to active as per instruction "For data that are not available you can leave them blank"
              percentage={0} // Defaulting to 0 as battery percentage is not in the provided response
              device={device.manufacturer}
              isRow={true}
              onClick={() => router.push(`/devices/${device.deviceId}`)}
            />
          ))
        ) : !isLoadingDevices ? (
          <div className="flex h-40 w-full items-center justify-center rounded-[24px] border border-dashed border-[#1B3C73] bg-[#081223] text-[#8198BF]">
            No devices found
          </div>
        ) : (
          <div className="flex h-40 w-full animate-pulse items-center justify-center rounded-[24px] bg-[#081223]" />
        )}
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
