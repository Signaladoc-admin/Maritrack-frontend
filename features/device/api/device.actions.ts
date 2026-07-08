"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { ActionResult } from "@/shared/api/types";

export type DeviceDetailFilter = "apps" | "hardware" | "type" | "realtime" | "network";

export async function getDeviceDetailAction(id: string, filter: DeviceDetailFilter): Promise<ActionResult<any>> {
  return withSafeAction(async () => {
    const response = await apiClient(`/devices/detail/${id}?filter=${filter}`, { method: "GET" });
    return response.data ?? response;
  }, `Failed to fetch device detail for filter ${filter}`);
}
