"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { ApiResponse, type ActionResult } from "@/shared/api/types";
import type { DeviceQueryOptions, PaginatedDevices, StaffDevice, PaginatedDeviceMessages } from "../model/types";

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
    const res = await apiClient<ApiResponse<StaffDevice>>(`/devices/${deviceId}`, {
      method: "GET",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to fetch device");
}

export async function markDeviceAsReturnedAction(
  deviceId: string,
  flagReason: string,
  flaggedByUserId?: string
) {
  return withSafeAction(async () => {
    const res = await apiClient(`/devices/${deviceId}`, {
      method: "PATCH",
      body: JSON.stringify({
        assignmentStatus: "RETURNED",
        flagged: true,
        flagReason,
        flaggedByUserId: flaggedByUserId ?? null,
        flaggedAt: new Date().toISOString(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    return res.data ?? res;
  }, "Failed to mark device as returned");
}
export async function exportDevicesAction() {
  return withSafeAction(async () => {
    const res = await apiClient<ApiResponse<{ link: string }>>(`/devices/export/devices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }, "Failed to export devices");
}

export async function bulkActionDevicesAction(
  ids: string[],
  actionId: number,
  messageText?: string
) {
  return withSafeAction(async () => {
    const payload = {
      ids,
      // deviceCount: ids.length,
      action: {
        actionId,
        ...(messageText ? { message: messageText } : {}),
      },
    };

    const res = await apiClient("/mdm-sync/action/bulk", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    return res.data ?? res;
  }, "Failed to perform bulk action");
}

export async function getDeviceMessagesAction(
  deviceId: string,
  options?: { page?: number; limit?: number }
): Promise<ActionResult<PaginatedDeviceMessages>> {
  return withSafeAction(async () => {
    const res = await apiClient(`/devices/recovery-messages/${deviceId}`, {
      method: "GET",
      noRedirect: true,
      params: options as Record<string, string | number | boolean | undefined>,
    });
    return res.data ?? res;
  }, "Failed to fetch device messages");
}
