"use client";

import { useEffect, useState } from "react";
import { ChildrenDropdown } from "@/features/dashboard/business/ui/ChildrenDropdown";
import { formatDate } from "date-fns";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useParentStore } from "@/shared/stores/user.store";
import { useGetChild } from "@/features/child-profile/model/useGetChildrenProfile";
import { Child as ChildType } from "@/features/child-profile/model/types";
import { ParentMetricsSection } from "@/features/parents/ui/Dashboard/ParentMetricsSection";
import { ParentDevicesSection } from "@/features/parents/ui/Dashboard/ParentDevicesSection";
import { ParentAppsSection } from "@/features/parents/ui/Dashboard/ParentAppsSection";
import { ParentDashboardSkeleton } from "@/features/parents/ui/Dashboard/ParentDashboardSkeleton";

import { useParentChildren } from "@/entities/children/model/useChildren";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function ParentDashboard() {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const { selectedChildId, setSelectedChildId, children: storeChildren } = useParentStore();

  // Fetch children list to handle loading state
  const { data: childrenData, isLoading: isFetchingChildren } = useParentChildren();

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

  const { data: appsData, isPending: isAppsPending } = useDeviceDetail(deviceId, "apps", {
    enabled: !!deviceId,
  });

  const { user } = useAuth();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // Show full dashboard skeleton only during initial children fetch or if child data is loading
  if ((isFetchingChildren || isLoadingChild) && !childData) {
    return <ParentDashboardSkeleton />;
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#1B3C73]">
            Hello {user?.firstName}
          </h1>
          <p className="text-sm font-medium text-slate-400">
            {currentDate && formatDate(currentDate, "MMMM dd, yyyy")}
          </p>
        </div>
        <ChildrenDropdown />
      </header>

      {/* Metrics Section */}
      <ParentMetricsSection
        hardwareData={hardwareData}
        isPending={isHardwarePending && !!deviceId}
      />

      {/* Main Grid Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ParentDevicesSection
          device={device}
          deviceId={deviceId}
          isLoadingChild={isLoadingChild && !!selectedChildId && selectedChildId !== "all"}
        />

        <ParentAppsSection appsData={appsData} isPending={isAppsPending && !!deviceId} />
      </div>
    </div>
  );
}
