"use client";

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { useBusinessZones } from "@/features/mdm-sync/model/useMdmSync";
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
    { enabled: !!zoneId, retry: false }
  );

  const { data: appsRaw, isLoading: isLoadingApps } = useServerActionQuery(
    dashboardKeys.apps(zoneId ?? ""),
    getDashboardAppsAction,
    [zoneId as string],
    { enabled: !!zoneId, retry: false }
  );

  const { data: usageRaw, isLoading: isLoadingUsage } = useServerActionQuery(
    dashboardKeys.usage(zoneId ?? ""),
    getDashboardUsageAction,
    [zoneId as string],
    { enabled: !!zoneId, retry: false }
  );

  // All queries dependent on zoneId loading first
  const isLoading =
    isLoadingZone || (!!zoneId && (isLoadingDevices || isLoadingApps || isLoadingUsage));

  // Devices data
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
  const deviceLocations: { id: string; lat: number; lng: number }[] =
    devicesData?.deviceLocations ?? [];

  // Apps data
  const appsData = appsRaw?.data;
  const managerAppVersionsChart = {
    x: (appsData?.managerAppVersions?.x ?? []) as string[],
    y: ((appsData?.managerAppVersions?.y ?? []) as string[]).map(Number),
  };

  // Usage data
  const usageData = usageRaw?.data;
  const storageChart = {
    x: (usageData?.storageData?.x ?? []) as string[],
    y: ((usageData?.storageData?.y ?? []) as string[]).map(Number),
  };
  const wifiChart = {
    x: (usageData?.wifiUsageData?.x ?? []) as string[],
    y: ((usageData?.wifiUsageData?.y ?? []) as string[]).map(Number),
  };
  const mobileChart = {
    x: (usageData?.mobileUsageData?.x ?? []) as string[],
    y: ((usageData?.mobileUsageData?.y ?? []) as string[]).map(Number),
  };

  return {
    isLoading,
    zoneId,
    deviceStats,
    newDevicesChart,
    osVersionsChart,
    deviceLocations,
    managerAppVersionsChart,
    storageChart,
    wifiChart,
    mobileChart,
  };
}
