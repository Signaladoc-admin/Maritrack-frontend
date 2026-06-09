"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { useDevices } from "@/entities/device/model/useDevices";
import { useDeviceHealthSample } from "./useDeviceHealthSample";
import type { DashboardDonutSlice } from "@/shared/ui/dashboard/analytics-ui";

export function useComplianceSecurity() {
  // --- Device compliance counts (MDM compliance status) ---
  const { data: totalData, isLoading: isLoadingTotal } = useDevices({ limit: 1 });
  const { data: compliantData, isLoading: isLoadingCompliant } = useDevices({
    mdmComplianceStatus: "COMPLIANT",
    limit: 1,
  });
  const { data: nonCompliantData, isLoading: isLoadingNonCompliant } = useDevices({
    mdmComplianceStatus: "NON_COMPLIANT",
    limit: 1,
  });

  // --- Flagged devices — used as policy violation incidents ---
  const { data: flaggedData, isLoading: isLoadingFlagged } = useDevices({
    flagged: true,
    limit: 20,
  });

  // --- Hardware sample — jailbreak detection via selEnforced field ---
  const { jailbreakChartData, rootedCount, isLoading: isLoadingHealth } = useDeviceHealthSample();

  // Security patch compliance donut.
  const deviceListTotal = totalData?.total ?? 0;
  const compliantCount = compliantData?.total ?? 0;
  const nonCompliantCount = nonCompliantData?.total ?? 0;

  const securityPatchData = useMemo<DashboardDonutSlice[]>(() => {
    if (deviceListTotal === 0) return [];
    return [
      {
        name: "Compliant",
        value: Math.round((compliantCount / deviceListTotal) * 100),
        color: "#22C55E",
      },
      {
        name: "Non-compliant",
        value: Math.round((nonCompliantCount / deviceListTotal) * 100),
        color: "#EF4444",
      },
    ];
  }, [deviceListTotal, compliantCount, nonCompliantCount]);

  // Policy violation incidents — flagged devices, excluding those marked as returned.
  // Returned devices are also flagged (assignmentStatus: "RETURNED", flagged: true) but
  // represent an asset return workflow, not a compliance violation.
  const violationIncidents = useMemo(() => {
    return (flaggedData?.devices ?? [])
      .filter((d) => d.assignmentStatus !== "RETURNED")
      .map((d) => ({
        incident:
          d.flagReason ??
          `Device flagged: ${[d.manufacturer, d.model].filter(Boolean).join(" ") || d.serialNumber}`,
        date: d.flaggedAt ? format(new Date(d.flaggedAt), "MMM d, yyyy") : "Unknown date",
      }));
  }, [flaggedData]);

  // Jailbreak/root detection chart — selEnforced === false in realTimeStats
  // indicates SELinux permissive mode, a strong signal of rooting.
  // No data for "blocked app attempts" from any available endpoint — show
  // empty state in the widget rather than fabricating rows.

  return {
    isLoading:
      isLoadingTotal || isLoadingCompliant || isLoadingNonCompliant || isLoadingFlagged || isLoadingHealth,
    securityPatchData,
    blockedAttemptsData: [] as { day: string; attempts: number }[],
    jailbreakData: jailbreakChartData,
    violationIncidents,
    rootedCount,
  };
}
