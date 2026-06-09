"use client";

import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useZoneDevices } from "@/features/mdm-sync/model/useMdmSync";
import { getDeviceDetailAction } from "@/features/device/api/device.actions";
import type { MDMDeviceDetailsResponse } from "@/features/device/types";

// How many devices to pull hardware details for. Keeps N parallel fetches
// bounded while still giving a statistically representative fleet sample.
const SAMPLE_SIZE = 20;
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Cache hardware detail results for 5 min — prevents window-refocus from
// re-firing up to SAMPLE_SIZE parallel requests.
const HARDWARE_STALE_MS = 5 * 60 * 1_000;

function formatHours(hours: number): string {
  if (hours <= 0) return "0m";

  const totalMinutes = Math.round(hours * 60);
  const mins = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hrs = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  const days = totalDays % 7;
  const weeks = Math.floor(totalDays / 7);

  if (weeks > 0) return days > 0 ? `${weeks}w ${days}d` : `${weeks}w`;
  if (days > 0) return hrs > 0 ? `${days}d ${hrs}h` : `${days}d`;
  if (hrs > 0) return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  return `${mins}m`;
}

/**
 * Fetches hardware details for up to SAMPLE_SIZE zone devices in parallel
 * and derives fleet-level aggregates from their realTimeStats snapshots.
 *
 * Shared by multiple dashboard widgets — React Query deduplicates every
 * per-device query key, so both callers read from the same cached results.
 */
export function useDeviceHealthSample() {
  const { user } = useAuth();
  const zoneId = user?.zoneId;

  const { data: zoneDevices, isLoading: isLoadingDevices } = useZoneDevices(zoneId ?? undefined);

  // Stable list of MDM device IDs to sample — memoised so useQueries doesn't
  // reinstantiate queries on every render.
  const sampleIds = useMemo(
    () =>
      (zoneDevices ?? [])
        .slice(0, SAMPLE_SIZE)
        .map((d) => d.deviceId)
        .filter(Boolean),
    [zoneDevices]
  );

  const hardwareQueries = useQueries({
    queries: sampleIds.map((mdmId) => ({
      queryKey: ["deviceDetail", mdmId, "hardware"],
      queryFn: async (): Promise<MDMDeviceDetailsResponse | null> => {
        const result = await getDeviceDetailAction(mdmId, "hardware");
        return result.success ? (result.data as MDMDeviceDetailsResponse) : null;
      },
      staleTime: HARDWARE_STALE_MS,
      enabled: sampleIds.length > 0,
    })),
  });

  // isLoading uses the v5-correct flag: only true while actively fetching,
  // never stuck true on disabled queries.
  const isLoading = isLoadingDevices || hardwareQueries.some((q) => q.isLoading);

  const realTimeStatsList = useMemo(
    () =>
      hardwareQueries
        .map((q) => (q.data as MDMDeviceDetailsResponse | null)?.data?.realTimeStats)
        .filter(Boolean),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hardwareQueries.map((q) => q.dataUpdatedAt).join(",")]
  );

  const n = realTimeStatsList.length;

  // Mean battery level (0–100) across sampled devices.
  const avgBatteryLevel = useMemo(() => {
    if (n === 0) return 0;
    return Math.round(realTimeStatsList.reduce((sum, s) => sum + (s?.batteryLevel ?? 0), 0) / n);
  }, [realTimeStatsList, n]);

  // Percentage of sampled devices whose battery health is "Good".
  const batteryHealthPercent = useMemo(() => {
    if (n === 0) return 0;
    const healthy = realTimeStatsList.filter(
      (s) => (s?.batteryHealth ?? "").toLowerCase() === "good"
    ).length;
    return Math.round((healthy / n) * 100);
  }, [realTimeStatsList, n]);

  // powerOnTime is a Unix epoch timestamp in ms (when the device last booted).
  // Uptime = Date.now() - powerOnTime → convert ms → hours for display.
  const avgSessionDuration = useMemo(() => {
    if (n === 0) return "—";
    const now = Date.now();
    const avgMs =
      realTimeStatsList.reduce((sum, s) => {
        const powerOnMs = s?.powerOnTime ?? 0;
        return sum + (powerOnMs > 0 ? Math.max(0, now - powerOnMs) : 0);
      }, 0) / n;
    return formatHours(avgMs / 3_600_000);
  }, [realTimeStatsList, n]);

  // Screen time = total foreground app usage per device (mFgUsageTime is in ms).
  const avgScreenTime = useMemo(() => {
    if (n === 0) return "—";
    const avgMs =
      realTimeStatsList.reduce((deviceSum, s) => {
        const deviceMs = (s?.appUsageData ?? []).reduce(
          (appSum: number, app: any) => appSum + (app.mFgUsageTime ?? 0),
          0
        );
        return deviceSum + deviceMs;
      }, 0) / n;
    return formatHours(avgMs / 3_600_000);
  }, [realTimeStatsList, n]);

  // Battery level of each sampled device mapped to a Mon–Sun axis so it
  // slots into the existing DashboardAreaChart format. Gaps filled with the
  // fleet average to avoid a flat-zero tail.
  const batteryChartData = useMemo(() => {
    const levels = realTimeStatsList.slice(0, 7).map((s) => s?.batteryLevel ?? avgBatteryLevel);
    return DAY_LABELS.map((day, i) => ({
      day,
      score: levels[i] ?? avgBatteryLevel,
    }));
  }, [realTimeStatsList, avgBatteryLevel]);

  // Per-device WiFi usage in GB mapped to Mon–Sun for connectivity chart.
  const wifiUsageChartData = useMemo(
    () =>
      DAY_LABELS.map((day, i) => ({
        day,
        gb: parseFloat(((realTimeStatsList[i]?.deviceWiFiUsage ?? 0) / 1024 ** 3).toFixed(2)),
      })),
    [realTimeStatsList]
  );

  // Per-device internal storage used in GB mapped to Mon–Sun.
  const storageUsageChartData = useMemo(
    () =>
      DAY_LABELS.map((day, i) => ({
        day,
        gb: parseFloat(((realTimeStatsList[i]?.internalStorageUsed ?? 0) / 1024 ** 3).toFixed(2)),
      })),
    [realTimeStatsList]
  );

  // Per-device foreground app usage (sum of mFgUsageTime) in hours mapped to Mon–Sun.
  const screenTimeChartData = useMemo(
    () =>
      DAY_LABELS.map((day, i) => {
        const s = realTimeStatsList[i];
        const totalMs = (s?.appUsageData ?? []).reduce(
          (sum: number, app: any) => sum + (app.mFgUsageTime ?? 0),
          0
        );
        return { day, hours: parseFloat((totalMs / 3_600_000).toFixed(1)) };
      }),
    [realTimeStatsList]
  );

  // Average app count across sampled devices (proxy for preloaded/managed content count).
  const avgAppCount = useMemo(() => {
    if (n === 0) return 0;
    return Math.round(
      realTimeStatsList.reduce((sum, s) => sum + (s?.appUsageData?.length ?? 0), 0) / n
    );
  }, [realTimeStatsList, n]);

  // Average WiFi usage in GB across sampled devices.
  const avgWifiUsageGB = useMemo(() => {
    if (n === 0) return 0;
    return realTimeStatsList.reduce((sum, s) => sum + (s?.deviceWiFiUsage ?? 0), 0) / n / 1024 ** 3;
  }, [realTimeStatsList, n]);

  // Jailbreak / root detection: selEnforced === false means SELinux permissive mode.
  // Map per-device status to Mon–Sun chart (1 = suspicious, 0 = clean).
  const jailbreakChartData = useMemo(
    () =>
      DAY_LABELS.map((day, i) => ({
        day,
        rate: realTimeStatsList[i] ? (realTimeStatsList[i]!.selEnforced === false ? 1 : 0) : 0,
      })),
    [realTimeStatsList]
  );

  // Total number of sampled devices flagged as likely rooted (SELinux permissive).
  const rootedCount = useMemo(
    () => realTimeStatsList.filter((s) => s?.selEnforced === false).length,
    [realTimeStatsList]
  );

  // GPS locations extracted from the hardware detail responses — the same data source
  // used by map-card.tsx (device details page), which shows accurate MDM-synced
  // coordinates. The /devices list endpoint's lastKnownLocation field can be stale.
  // lastKnownLocation is typed as string | null in DeviceDetails but the MDM endpoint
  // actually returns { latitude, longitude } — hence the cast below.
  const deviceLocations = useMemo(() => {
    return hardwareQueries
      .map((q) => {
        const detail = q.data as MDMDeviceDetailsResponse | null;
        if (!detail) return null;
        const loc = detail.deviceDetails?.lastKnownLocation as unknown as {
          latitude?: number;
          longitude?: number;
        } | null;
        const lat = typeof loc?.latitude === "number" && !isNaN(loc.latitude) ? loc.latitude : null;
        const lng =
          typeof loc?.longitude === "number" && !isNaN(loc.longitude) ? loc.longitude : null;
        if (lat === null || lng === null || (lat === 0 && lng === 0)) return null;
        return {
          id: detail.deviceDetails?.id ?? detail.data?.deviceId ?? "",
          label:
            [detail.data?.manufacturer, detail.data?.model].filter(Boolean).join(" ") ||
            detail.data?.serialNumber ||
            "Device",
          lat,
          lng,
        };
      })
      .filter((loc): loc is NonNullable<typeof loc> => loc !== null && loc.id !== "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardwareQueries.map((q) => q.dataUpdatedAt).join(",")]);

  return {
    isLoading,
    sampleCount: n,
    avgBatteryLevel,
    batteryHealthPercent,
    avgSessionDuration,
    avgScreenTime,
    batteryChartData,
    wifiUsageChartData,
    storageUsageChartData,
    screenTimeChartData,
    avgAppCount,
    avgWifiUsageGB,
    jailbreakChartData,
    rootedCount,
    deviceLocations,
  };
}
