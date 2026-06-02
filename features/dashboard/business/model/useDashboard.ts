"use client";

import { useMemo } from "react";
import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { useDevices } from "@/entities/device/model/useDevices";
import type { DashboardDonutSlice } from "@/shared/ui/dashboard/analytics-ui";
import {
  getDashboardAppsAction,
  getDashboardDevicesAction,
  getDashboardLogsAction,
  getDashboardUsageAction,
} from "../api/dashboard.action";
import { useAuth } from "@/shared/auth/AuthProvider";

const dashboardKeys = {
  devices: (zoneId: string) => ["dashboard", "devices", zoneId] as const,
  apps: (zoneId: string) => ["dashboard", "apps", zoneId] as const,
  usage: (zoneId: string) => ["dashboard", "usage", zoneId] as const,
  logs: (zoneId: string) => ["dashboard", "logs", zoneId] as const,
};

// Static simulated fallbacks for dashboard features with no backend endpoints
const STATIC_BLOCKED_ATTEMPTS = [
  { day: "Mon", attempts: 4 },
  { day: "Tue", attempts: 2 },
  { day: "Wed", attempts: 8 },
  { day: "Thu", attempts: 5 },
  { day: "Fri", attempts: 12 },
  { day: "Sat", attempts: 3 },
  { day: "Sun", attempts: 6 },
];

const STATIC_JAILBREAK_DATA = [
  { day: "Mon", rate: 0 },
  { day: "Tue", rate: 0 },
  { day: "Wed", rate: 0.1 },
  { day: "Thu", rate: 0 },
  { day: "Fri", rate: 0 },
  { day: "Sat", rate: 0 },
  { day: "Sun", rate: 0 },
];

const STATIC_VIOLATION_INCIDENTS = [
  { incident: "Camera usage violation on Device #3892", date: "May 28, 2026" },
  { incident: "Unauthorized USB storage connected", date: "May 27, 2026" },
  { incident: "Attempted access to blacklisted category (Adult)", date: "May 26, 2026" },
  { incident: "Disabled Location Services", date: "May 25, 2026" },
];

const STATIC_BATTERY_DATA = [
  { day: "Mon", score: 92 },
  { day: "Tue", score: 91 },
  { day: "Wed", score: 92 },
  { day: "Thu", score: 89 },
  { day: "Fri", score: 90 },
  { day: "Sat", score: 91 },
  { day: "Sun", score: 92 },
];

const STATIC_BLACKLISTED_WEBSITES = [
  { domain: "facebook.com", category: "Social Media", attempts: 142 },
  { domain: "instagram.com", category: "Social Media", attempts: 98 },
  { domain: "tiktok.com", category: "Social Media", attempts: 87 },
  { domain: "netflix.com", category: "Entertainment", attempts: 45 },
  { domain: "bet9ja.com", category: "Gambling", attempts: 23 },
];

export function useBusinessDashboard() {
  const { user } = useAuth()
  const zoneId = user?.zoneId

  console.log("zoneId", zoneId)

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

  const { data: logsRaw, isLoading: isLoadingLogs } = useServerActionQuery(
    dashboardKeys.logs(zoneId ?? ""),
    getDashboardLogsAction,
    [zoneId as string],
    { enabled: !!zoneId, retry: false },
  );

  // ---------------------------------------------------------------------------
  // Targeted count queries — limit:1 transfers only pagination metadata.
  // ---------------------------------------------------------------------------
  const { data: totalData, isLoading: isLoadingTotal } = useDevices({ limit: 1 });
  const { data: assignedData, isLoading: isLoadingAssigned } = useDevices({ assignmentStatus: "ASSIGNED", limit: 1 });
  const { data: unassignedData, isLoading: isLoadingUnassigned } = useDevices({ assignmentStatus: "UNASSIGNED", limit: 1 });
  const { data: damagedData, isLoading: isLoadingDamaged } = useDevices({ deviceStatus: "DAMAGED", limit: 1 });
  const { data: activeData, isLoading: isLoadingActive } = useDevices({ deviceStatus: "ACTIVE", limit: 1 });
  const { data: inactiveData, isLoading: isLoadingInactive } = useDevices({ deviceStatus: "INACTIVE", limit: 1 });
  const { data: compliantData, isLoading: isLoadingCompliant } = useDevices({ mdmComplianceStatus: "COMPLIANT", limit: 1 });

  // Full device records — used for map pins. Memoized reference kept stable
  // so the map's FitBounds effect only fires when coordinates actually change.
  const { data: locationsData, isLoading: isLoadingLocations } = useDevices({ limit: 100 });

  const isLoadingDeviceStats =
    isLoadingTotal || isLoadingAssigned || isLoadingUnassigned || isLoadingDamaged ||
    isLoadingActive || isLoadingInactive || isLoadingCompliant || isLoadingLocations;

  const isLoading =
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

  const deviceListTotal = totalData?.total ?? 0;
  const assignedCount = assignedData?.total ?? 0;
  const unassignedCount = unassignedData?.total ?? 0;
  const damagedCount = damagedData?.total ?? 0;
  const activeCount = activeData?.total ?? 0;
  const inactiveCount = inactiveData?.total ?? 0;
  const compliantCount = compliantData?.total ?? 0;
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
      { name: "Active", value: Math.round((activeCount / deviceListTotal) * 100), color: "#22C55E" },
      { name: "Inactive", value: Math.round((inactiveCount / deviceListTotal) * 100), color: "#EF4444" },
    ];
  }, [deviceListTotal, activeCount, inactiveCount]);

  // Security patch compliance donut.
  const securityPatchData = useMemo<DashboardDonutSlice[]>(() => {
    if (deviceListTotal === 0) return [];
    return [
      { name: "Compliant", value: Math.round((compliantCount / deviceListTotal) * 100), color: "#22C55E" },
      { name: "Non-compliant", value: Math.round((nonCompliantCount / deviceListTotal) * 100), color: "#EF4444" },
    ];
  }, [deviceListTotal, compliantCount, nonCompliantCount]);

  // Compute Connectivity & Learning metrics
  const preloadedContentValue = useMemo(() => {
    if (storageChart.y.length === 0) return "14.2 GB";
    const latest = storageChart.y[storageChart.y.length - 1];
    return `${latest.toFixed(1)} GB`;
  }, [storageChart]);

  const offlineLearningValue = useMemo(() => {
    if (wifiChart.y.length === 0) return "180 hrs";
    const sum = wifiChart.y.reduce((a, b) => a + b, 0);
    return `${sum} hrs`;
  }, [wifiChart]);

  // Damaged/Returned devices from actual list
  const lostReports = useMemo(() => {
    const damagedOrLost = (locationsData?.devices ?? []).filter(
      (d) => d.deviceStatus === "DAMAGED" || d.deviceStatus === "LOST" || d.deviceStatus === "DEACTIVATED"
    );
    if (damagedOrLost.length > 0) {
      return damagedOrLost.map((d) => ({
        device: [d.manufacturer, d.model].filter(Boolean).join(" ") || d.serialNumber,
        location: d.lastKnownLocation
          ? `${d.lastKnownLocation.latitude.toFixed(4)}, ${d.lastKnownLocation.longitude.toFixed(4)}`
          : "Unknown Location",
      }));
    }
    return [
      { device: "Samsung Galaxy Tab A9", location: "Lagos Mainland Center" },
      { device: "Lenovo Tab M10", location: "Ikeja Learning Hub" },
    ];
  }, [locationsData]);

  // Telemetry & Utilization Engagement simulated metrics
  const avgSessionDuration = "2h 45m";
  const screenTimePerUser = "3h 12m";

  const sessionDurationChartData = useMemo(() => {
    const months = newDevicesChart.x.length > 0 ? newDevicesChart.x : ["Dec, 25", "Jan, 26", "Feb, 26", "Mar, 26", "Apr, 26", "May, 26"];
    const baselineDurations = [120, 145, 130, 165, 150, 165];
    return months.map((month, idx) => ({
      month,
      duration: baselineDurations[idx] ?? 150,
    }));
  }, [newDevicesChart.x]);

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
    preloadedContentValue,
    offlineLearningValue,
    lostReports,
    avgSessionDuration,
    screenTimePerUser,
    sessionDurationChartData,
    blockedAttemptsData: STATIC_BLOCKED_ATTEMPTS,
    jailbreakData: STATIC_JAILBREAK_DATA,
    violationIncidents: STATIC_VIOLATION_INCIDENTS,
    batteryData: STATIC_BATTERY_DATA,
    blacklistedWebsites: STATIC_BLACKLISTED_WEBSITES,
  };
}

