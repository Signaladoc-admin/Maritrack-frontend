"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { ActionResult } from "@/shared/api/types";

export async function getDashboardDevicesAction(zoneId: string): Promise<ActionResult<any>> {
  return withSafeAction(async () => {
    const response = await apiClient(`/mdm-sync/dashboard/devices/${zoneId}`, { method: "GET" });
    return response.data ?? response;
  }, "Failed to fetch dashboard devices");
}

export async function getDashboardAppsAction(zoneId: string): Promise<ActionResult<any>> {
  return withSafeAction(async () => {
    const response = await apiClient(`/mdm-sync/dashboard/apps/${zoneId}`, { method: "GET" });
    return response.data ?? response;
  }, "Failed to fetch dashboard apps");
}

export async function getDashboardUsageAction(zoneId: string): Promise<ActionResult<any>> {
  return withSafeAction(async () => {
    const response = await apiClient(`/mdm-sync/dashboard/usage/${zoneId}`, { method: "GET" });
    return response.data ?? response;
  }, "Failed to fetch dashboard usage");
}
