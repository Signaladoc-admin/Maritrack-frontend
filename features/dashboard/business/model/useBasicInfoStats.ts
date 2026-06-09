"use client";

import { useDevices } from "@/entities/device/model/useDevices";

// Targeted count queries — limit:1 transfers only pagination metadata.
export function useBasicInfoStats() {
  const { data: totalData, isLoading: isLoadingTotal } = useDevices({ limit: 1 });
  const { data: assignedData, isLoading: isLoadingAssigned } = useDevices({
    assignmentStatus: "ASSIGNED",
    limit: 1,
  });
  const { data: unassignedData, isLoading: isLoadingUnassigned } = useDevices({
    assignmentStatus: "UNASSIGNED",
    limit: 1,
  });
  const { data: damagedData, isLoading: isLoadingDamaged } = useDevices({
    deviceStatus: "DAMAGED",
    limit: 1,
  });

  return {
    isLoading: isLoadingTotal || isLoadingAssigned || isLoadingUnassigned || isLoadingDamaged,
    totalAssets: totalData?.total ?? 0,
    assignedAssets: assignedData?.total ?? 0,
    unassignedAssets: unassignedData?.total ?? 0,
    damagedAssets: damagedData?.total ?? 0,
  };
}
