"use client";

import { useMemo } from "react";
import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { useAuth } from "@/shared/auth/AuthProvider";
import { getDashboardDevicesAction } from "../api/dashboard.action";

const deviceUtilizationKeys = {
  devices: (zoneId: string) => ["dashboard", "devices", zoneId] as const,
};

function zipChart(
  x: string[],
  y: number[],
  xKey: string,
  yKey: string
): Record<string, string | number>[] {
  return x.map((label, i) => ({ [xKey]: label, [yKey]: y[i] ?? 0 }));
}

const FALLBACK_MONTHS = ["Dec, 25", "Jan, 26", "Feb, 26", "Mar, 26", "Apr, 26", "May, 26"];
const BASELINE_SESSION_DURATIONS = [120, 145, 130, 165, 150, 165];

// avgSessionDuration / screenTimePerUser are simulated — no backend endpoint yet.
const STATIC_AVG_SESSION_DURATION = "2h 45m";
const STATIC_SCREEN_TIME_PER_USER = "3h 12m";

export function useDeviceUtilization() {
  const { user } = useAuth();
  const zoneId = user?.zoneId;

  const { data: devicesRaw, isLoading } = useServerActionQuery(
    deviceUtilizationKeys.devices(zoneId ?? ""),
    getDashboardDevicesAction,
    [zoneId as string],
    { enabled: !!zoneId, retry: false }
  );

  const devicesData = devicesRaw?.data;

  const newDevicesChart = {
    x: (devicesData?.newDevices?.x ?? []) as string[],
    y: ((devicesData?.newDevices?.y ?? []) as string[]).map(Number),
  };

  const sessionDurationChartData = useMemo(() => {
    const months = newDevicesChart.x.length > 0 ? newDevicesChart.x : FALLBACK_MONTHS;
    return months.map((month, idx) => ({
      month,
      duration: BASELINE_SESSION_DURATIONS[idx] ?? 150,
    }));
  }, [newDevicesChart.x]);

  const activeUsersChartData = useMemo(
    () => zipChart(newDevicesChart.x, newDevicesChart.y, "month", "users"),
    [newDevicesChart]
  );

  return {
    isLoading: !!zoneId && isLoading,
    dailyActiveDevices: devicesData?.active ?? 0,
    activeUsersChartData,
    sessionDurationChartData,
    avgSessionDuration: STATIC_AVG_SESSION_DURATION,
    screenTimePerUser: STATIC_SCREEN_TIME_PER_USER,
  };
}
