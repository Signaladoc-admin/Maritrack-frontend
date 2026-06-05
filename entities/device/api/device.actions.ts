"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { ActionResult } from "@/shared/api/types";
import type { DeviceQueryOptions, PaginatedDevices } from "../model/types";

export async function getDevicesAction(
  options?: DeviceQueryOptions
): Promise<ActionResult<PaginatedDevices>> {
  return withSafeAction(async () => {
    const res = await apiClient("/devices", {
      method: "GET",
      noRedirect: true,
      params: options as Record<string, string | number | boolean | undefined>,
    });
    return res.data ?? res;
  }, "Failed to fetch devices");
}

export async function getDeviceAction(deviceId: string) {
  return withSafeAction(async () => {
    const res = await apiClient(`/devices/${deviceId}`, {
      method: "GET",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to fetch device");
}

export async function markDeviceAsReturnedAction(deviceId: string, flagReason: string) {
  return withSafeAction(async () => {
    const res = await apiClient(`/devices/${deviceId}`, {
      method: "PATCH",
      body: JSON.stringify({ assignmentStatus: "RETURNED", flagged: true, flagReason }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data ?? res;
  }, "Failed to mark device as returned");
}
export async function exportDevicesAction() {
  return withSafeAction(async () => {
    const res = await apiClient(`/devices/export/devices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data ?? res;
  }, "Failed to export devices");
}
