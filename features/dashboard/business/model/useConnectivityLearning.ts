"use client";

import { useMemo } from "react";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useDeviceHealthSample } from "./useDeviceHealthSample";

export function useNetworkAppUsage() {
  const { user } = useAuth();
  const zoneId = user?.zoneId;

  const {
    isLoading,
    avgWifiUsageGB,
    avgScreenTime,
    wifiUsageChartData,
    screenTimeChartData,
  } = useDeviceHealthSample();

  // Average WiFi data consumed per device in the sample, formatted as "X.XX GB".
  const avgWifiValue = useMemo(() => {
    if (!zoneId || avgWifiUsageGB === 0) return "—";
    return `${avgWifiUsageGB.toFixed(2)} GB`;
  }, [zoneId, avgWifiUsageGB]);

  // Average foreground app usage time per device (sum of mFgUsageTime across all apps).
  const avgScreenTimeValue = useMemo(() => {
    if (!zoneId || avgScreenTime === "—") return "—";
    return avgScreenTime;
  }, [zoneId, avgScreenTime]);

  // WiFi usage chart — per sampled device mapped to Mon–Sun axis.
  const wifiChartData = useMemo(
    () => wifiUsageChartData.map(({ day, gb }) => ({ day, usage: gb })),
    [wifiUsageChartData]
  );

  // Screen time chart — per sampled device mapped to Mon–Sun axis.
  const screenTimeData = useMemo(
    () => screenTimeChartData.map(({ day, hours }) => ({ day, hours })),
    [screenTimeChartData]
  );

  return {
    isLoading: !!zoneId && isLoading,
    avgWifiValue,
    avgScreenTimeValue,
    wifiChartData,
    screenTimeData,
  };
}
