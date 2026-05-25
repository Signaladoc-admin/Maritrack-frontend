"use client";

import { useMemo } from "react";
import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { useBusinessZones } from "@/features/mdm-sync/model/useMdmSync";
import { useDevices } from "@/entities/device/model/useDevices";
import type { DashboardDonutSlice } from "@/shared/ui/dashboard/analytics-ui";
import {
  getDashboardAppsAction,
  getDashboardDevicesAction,
  getDashboardUsageAction,
} from "../api/dashboard.action";

const dashboardKeys = {
  devices: (zoneId: string) => ["dashboard", "devices", zoneId] as const,
  apps: (zoneId: string) => ["dashboard", "apps", zoneId] as const,
  usage: (zoneId: string) => ["dashboard", "usage", zoneId] as const,
};

export function useBusinessDashboard() {
  const { data: businessZones, isLoading: isLoadingZone } = useBusinessZones();
  const zoneId: string | undefined = (businessZones as any)?.[0]?.id;

  const { data: devicesRaw, isLoading: isLoadingDevices } = useServerActionQuery(
    dashboardKeys.devices(zoneId ?? ""),
    getDashboardDevicesAction,
    [zoneId as string],
    { enabled: !!zoneId, retry: false },
  );

  const { data: appsRaw, isLoading: isLoadingApps } = useServerActionQuery(
    dashboardKeys.apps(zoneId ?? ""),
    getDashboardAppsAction,
    [zoneId as string],
    { enabled: !!zoneId, retry: false },
  );

  const { data: usageRaw, isLoading: isLoadingUsage } = useServerActionQuery(
    dashboardKeys.usage(zoneId ?? ""),
    getDashboardUsageAction,
    [zoneId as string],
    { enabled: !!zoneId, retry: false },
  );

  // ---------------------------------------------------------------------------
  // Targeted count queries — limit:1 transfers only pagination metadata.
  // ---------------------------------------------------------------------------
  const { data: totalData,      isLoading: isLoadingTotal }      = useDevices({ limit: 1 });
  const { data: assignedData,   isLoading: isLoadingAssigned }   = useDevices({ assignmentStatus: "ASSIGNED",     limit: 1 });
  const { data: unassignedData, isLoading: isLoadingUnassigned } = useDevices({ assignmentStatus: "UNASSIGNED",   limit: 1 });
  const { data: damagedData,    isLoading: isLoadingDamaged }    = useDevices({ deviceStatus: "DAMAGED",          limit: 1 });
  const { data: activeData,     isLoading: isLoadingActive }     = useDevices({ deviceStatus: "ACTIVE",           limit: 1 });
  const { data: inactiveData,   isLoading: isLoadingInactive }   = useDevices({ deviceStatus: "INACTIVE",         limit: 1 });
  const { data: compliantData,  isLoading: isLoadingCompliant }  = useDevices({ mdmComplianceStatus: "COMPLIANT", limit: 1 });

  // Full device records — used for map pins. Memoized reference kept stable
  // so the map's FitBounds effect only fires when coordinates actually change.
  const { data: locationsData, isLoading: isLoadingLocations } = useDevices({ limit: 100 });

  const isLoadingDeviceStats =
    isLoadingTotal || isLoadingAssigned || isLoadingUnassigned || isLoadingDamaged ||
    isLoadingActive || isLoadingInactive || isLoadingCompliant || isLoadingLocations;

  const isLoading =
    isLoadingZone ||
    isLoadingDeviceStats ||
    (!!zoneId && (isLoadingDevices || isLoadingApps || isLoadingUsage));

  // ---------------------------------------------------------------------------
  // MDM dashboard endpoint data
  // ---------------------------------------------------------------------------

  const devicesData = devicesRaw?.data;

  const deviceStats = {
    total: devicesData?.total ?? 0,
    online: devicesData?.online ?? 0,
    offline: devicesData?.offline ?? 0,
    active: devicesData?.active ?? 0,
    locked: devicesData?.locked ?? 0,
  };

  const newDevicesChart = {
    x: (devicesData?.newDevices?.x ?? []) as string[],
    y: ((devicesData?.newDevices?.y ?? []) as string[]).map(Number),
  };

  const osVersionsChart = {
    x: (devicesData?.osVersions?.x ?? []) as string[],
    y: ((devicesData?.osVersions?.y ?? []) as string[]).map(Number),
  };

  const storageChart = {
    x: ((usageRaw?.data?.storageData?.x ?? []) as string[]),
    y: ((usageRaw?.data?.storageData?.y ?? []) as string[]).map(Number),
  };

  const wifiChart = {
    x: ((usageRaw?.data?.wifiUsageData?.x ?? []) as string[]),
    y: ((usageRaw?.data?.wifiUsageData?.y ?? []) as string[]).map(Number),
  };

  const mobileChart = {
    x: ((usageRaw?.data?.mobileUsageData?.x ?? []) as string[]),
    y: ((usageRaw?.data?.mobileUsageData?.y ?? []) as string[]).map(Number),
  };

  const managerAppVersionsChart = {
    x: ((appsRaw?.data?.managerAppVersions?.x ?? []) as string[]),
    y: ((appsRaw?.data?.managerAppVersions?.y ?? []) as string[]).map(Number),
  };

  // ---------------------------------------------------------------------------
  // /api/v1/devices — server-filtered counts
  // ---------------------------------------------------------------------------

  const deviceListTotal  = totalData?.total      ?? 0;
  const assignedCount    = assignedData?.total    ?? 0;
  const unassignedCount  = unassignedData?.total  ?? 0;
  const damagedCount     = damagedData?.total     ?? 0;
  const activeCount      = activeData?.total      ?? 0;
  const inactiveCount    = inactiveData?.total    ?? 0;
  const compliantCount   = compliantData?.total   ?? 0;
  const nonCompliantCount = deviceListTotal - compliantCount;

  // GPS pins — memoized so FitBounds only fires when coordinates actually change.
  const deviceLocations = useMemo(
    () =>
      (locationsData?.devices ?? [])
        .filter((d) => d.lastKnownLocation !== null)
        .map((d) => ({
          id: d.id,
          label: [d.manufacturer, d.model].filter(Boolean).join(" ") || d.serialNumber,
          lat: d.lastKnownLocation!.latitude,
          lng: d.lastKnownLocation!.longitude,
        })),
    [locationsData],
  );

  // Devices availability donut.
  // DashboardDonutChart has its own zero-guard — if both values are 0% the
  // chart falls back to "No data available" rather than rendering an empty ring.
  const devicesAvailabilityData = useMemo<DashboardDonutSlice[]>(() => {
    if (deviceListTotal === 0) return [];
    return [
      { name: "Active",   value: Math.round((activeCount   / deviceListTotal) * 100), color: "#22C55E" },
      { name: "Inactive", value: Math.round((inactiveCount / deviceListTotal) * 100), color: "#EF4444" },
    ];
  }, [deviceListTotal, activeCount, inactiveCount]);

  // Security patch compliance donut.
  const securityPatchData = useMemo<DashboardDonutSlice[]>(() => {
    if (deviceListTotal === 0) return [];
    return [
      { name: "Compliant",     value: Math.round((compliantCount    / deviceListTotal) * 100), color: "#22C55E" },
      { name: "Non-compliant", value: Math.round((nonCompliantCount / deviceListTotal) * 100), color: "#EF4444" },
    ];
  }, [deviceListTotal, compliantCount, nonCompliantCount]);

  return {
    isLoading,
    zoneId,
    deviceStats,
    newDevicesChart,
    osVersionsChart,
    managerAppVersionsChart,
    storageChart,
    wifiChart,
    mobileChart,
    deviceListTotal,
    assignedCount,
    unassignedCount,
    damagedCount,
    deviceLocations,
    devicesAvailabilityData,
    securityPatchData,
  };
}
