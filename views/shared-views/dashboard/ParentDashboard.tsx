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
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useParentStore } from "@/shared/stores/user.store";
import { useGetChild } from "@/features/child-profile/model/useGetChildrenProfile";
import { Child as ChildType } from "@/features/child-profile/model/types";
import DeviceCard from "@/features/parents/ui/DeviceCard";

export default function ParentDashboard() {
  const { scrollContainerRef, events } = useDragScroll();
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const router = useRouter();

  const { selectedChildId, setSelectedChildId, children: storeChildren } = useParentStore();

  // Ensure a child is selected by default
  useEffect(() => {
    if ((selectedChildId === "all" || !selectedChildId) && storeChildren?.length > 0) {
      setSelectedChildId(storeChildren[0].id);
    }
  }, [selectedChildId, storeChildren, setSelectedChildId]);

  const { data: childData, isLoading: isLoadingChild } = useGetChild(selectedChildId);
  const typedChild = childData as ChildType | undefined;
  const device = typedChild?.device ?? null;
  const deviceId = device?.mdmId || "";

  // Fetch device metrics
  const { data: hardwareData, isPending: isHardwarePending } = useDeviceDetail(
    deviceId,
    "hardware",
    {
      enabled: !!deviceId,
    }
  );
  const { data: networkData, isPending: isNetworkPending } = useDeviceDetail(deviceId, "network", {
    enabled: !!deviceId,
  });
  const { data: appsData, isPending: isAppsPending } = useDeviceDetail(deviceId, "apps", {
    enabled: !!deviceId,
  });

  const fetchedApps = (appsData?.data?.apps || [])
    .filter((app: any) => app.systemApp === false)
    .slice(0, 5);
  const fetchedHardware = hardwareData?.data?.hardwareInfo || {};
  const fetchedNetwork = networkData?.data?.realTimeStats || {};

  const batteryLevel = fetchedNetwork?.batteryLevel ?? 0;

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

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
          value={`${batteryLevel}%`}
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
        {device ? (
          <DeviceCard
            device={{ ...device, deviceId }}
            onClick={() => router.push(`/devices/${deviceId}`)}
          />
        ) : !isLoadingChild ? (
          <div className="flex h-40 w-full items-center justify-center rounded-[24px] border border-dashed border-[#1B3C73] bg-[#081223] text-[#8198BF]">
            No devices found for this child
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
          items={
            fetchedApps.length > 0
              ? fetchedApps.map((app: any) => ({
                  id: app.id,
                  name: app.appName || app.packageName,
                  totalTime: app.totalTime || `Size: ${app.installedAPKSize || 0}`,
                  icon: () => (
                    <div className="w-full text-center text-xs text-gray-400">
                      {app.appName?.slice(0, 2)}
                    </div>
                  ),
                  limits: app.limits || 0,
                }))
              : appData
          }
        />
        <AlertsSummaryCard />
      </div>
    </div>
  );
}
