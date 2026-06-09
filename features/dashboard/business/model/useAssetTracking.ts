"use client";

import { useMemo } from "react";
import { useDevices } from "@/entities/device/model/useDevices";
import { useDeviceHealthSample } from "./useDeviceHealthSample";
import type { DashboardDonutSlice } from "@/shared/ui/dashboard/analytics-ui";

export function useAssetTracking() {
  // --- Count-only queries (limit:1 — only pagination metadata is transferred) ---

  const { data: totalData, isLoading: isLoadingTotal } = useDevices({ limit: 1 });

  // --- Device records for the lost/stolen table (full payloads, bounded limit) ---

  const { data: damagedDevices, isLoading: isLoadingDamaged } = useDevices({
    deviceStatus: "DAMAGED",
    limit: 50,
  });
  const { data: lostDevices, isLoading: isLoadingLost } = useDevices({
    deviceStatus: "LOST",
    limit: 50,
  });

  // --- Battery health + GPS locations from sampled hardware details ---
  // React Query deduplicates the per-device queries if DeviceUtilizationWidget
  // also calls useDeviceHealthSample in the same render tree.
  // deviceLocations comes from the MDM hardware endpoint — same source as map-card.tsx
  // (device details page) — so it shows accurate GPS coordinates rather than the
  // stale lastKnownLocation field on the /devices list endpoint.

  const { batteryChartData, deviceLocations, isLoading: isLoadingHealth } = useDeviceHealthSample();

  // --- Derived values ---

  const total = totalData?.total ?? 0;
  // damagedDevices is already fetched for the table — reuse its count.
  const damagedCount = damagedDevices?.total ?? 0;
  const functionalCount = Math.max(0, total - damagedCount);

  // Devices availability donut — Functional vs Damaged.
  // DashboardDonutChart has its own zero-guard and falls back to an empty-state
  // message when both values are 0.
  const devicesAvailabilityData = useMemo<DashboardDonutSlice[]>(() => {
    if (total === 0) return [];
    return [
      {
        name: "Functional",
        value: Math.round((functionalCount / total) * 100),
        color: "#22C55E",
      },
      {
        name: "Damaged",
        value: Math.round((damagedCount / total) * 100),
        color: "#EF4444",
      },
    ];
  }, [total, functionalCount, damagedCount]);

  // Lost-only records for the lost/stolen reports table.
  const lostReports = useMemo(() => {
    const records = lostDevices?.devices ?? [];
    return records.map((d) => ({
      device: [d.manufacturer, d.model].filter(Boolean).join(" ") || d.serialNumber,
      status: d.deviceStatus as string,
      location: d.lastKnownLocation
        ? `${d.lastKnownLocation.latitude.toFixed(4)}, ${d.lastKnownLocation.longitude.toFixed(4)}`
        : "Unknown location",
    }));
  }, [damagedDevices, lostDevices]);

  return {
    isLoading: isLoadingTotal || isLoadingDamaged || isLoadingLost || isLoadingHealth,
    devicesAvailabilityData,
    deviceLocations,
    lostReports,
    batteryChartData,
  };
}
