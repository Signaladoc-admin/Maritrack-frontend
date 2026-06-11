"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { ActionResult, ApiResponse, MessageResponse } from "@/shared/api/types";
import { withSafeAction } from "@/shared/lib/safe-action";
import { AssignDeviceToUserDto } from "@/features/business-users/users/types";
import type { Device } from "@/entities/device/model/types";
import { BusinessZone, ParentZone } from "../types";

export interface CreateZoneDto {
  name?: string;
}

export async function createZoneAction(data?: CreateZoneDto): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient("/mdm-sync/zones", {
        method: "POST",
        ...(data?.name && { body: JSON.stringify({ name: data.name }) }),
      }),
    "Failed to create zone"
  );
}

export async function getQrCodeAction(zoneId: string, onboardingCode: string) {
  return withSafeAction(
    async () =>
      await apiClient<{ status: true; statusCode: 200; message: string; data: string }>(
        `/mdm-sync/zones/${zoneId}/qrcode/${onboardingCode}`,
        {
          method: "GET",
        }
      ),
    "Failed to get QR code"
  );
}

export async function getParentZonesAction() {
  return withSafeAction(async () => {
    const response = await apiClient<ApiResponse<ParentZone[]>>("/mdm-sync/zones/parent", {
      method: "GET",
    });
    return response.data ?? [];
  }, "Failed to fetch parent zones");
}

export async function getParentZoneAction() {
  return withSafeAction(async () => {
    const response = await apiClient<ApiResponse<ParentZone[]>>("/mdm-sync/zones/parent", {
      method: "GET",
    });
    return response.data?.[0] ?? null;
  }, "Failed to fetch parent zone");
}

export async function createBusinessZoneAction(data?: CreateZoneDto): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient("/mdm-sync/business/zones", {
        method: "POST",
        ...(data?.name && { body: JSON.stringify({ name: data.name }) }),
      }),
    "Failed to create business zone"
  );
}

export async function getBusinessZonesAction(): Promise<ActionResult<BusinessZone[]>> {
  return withSafeAction(async () => {
    const response = await apiClient<ApiResponse<BusinessZone[]>>("/mdm-sync/zones/business", {
      method: "GET",
    });
    return response.data ?? [];
  }, "Failed to fetch business zones");
}
export async function getBusinessZoneAction() {
  return withSafeAction(async () => {
    const response = await apiClient<ApiResponse<BusinessZone[]>>("/mdm-sync/zones/business", {
      method: "GET",
    });
    return response.data?.[0] ?? null;
  }, "Failed to fetch business zone");
}

export async function assignUserToDeviceAction(
  data: AssignDeviceToUserDto
): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient("/mdm-sync/assign-user-to-device", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    "Failed to assign device to user"
  );
}

export async function getZoneDevicesAction(zoneId: string): Promise<ActionResult<Device[]>> {
  return withSafeAction(async () => {
    const response = await apiClient(`/mdm-sync/zones/${zoneId}/devices`, {
      method: "GET",
    });
    return response?.data?.data ?? [];
  }, "Failed to fetch zone devices");
}

export interface AppLimitDayDetail {
  packageName: string;
  minutes: number;
  appName: string;
  hour: number;
  day: string;
  date?: string | number;
}

export interface SetAppLimitPayload {
  appUsage: Record<string, AppLimitDayDetail[]>;
}

export interface SetAppLimitVariables {
  deviceId: string;
  data: SetAppLimitPayload;
}

export interface AppLimitData {
  deviceId: string | null;
  createdBy: string | null;
  updatedTime: number;
  appUsage: Record<string, AppLimitDayDetail[]>;
}

export interface GetAppLimitResponse {
  code: number;
  data: AppLimitData;
}

export async function getAppLimitsAction(deviceId: string): Promise<ActionResult<AppLimitData>> {
  return withSafeAction(async () => {
    const response = await apiClient(`/mdm-sync/${deviceId}/applimits`, {
      method: "GET",
    });
    return response.data.data;
  }, "Failed to fetch app limits");
}

export async function setAppLimitAction({
  deviceId,
  data,
}: SetAppLimitVariables): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient(`/mdm-sync/${deviceId}/applimits`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    "Failed to set app limit"
  );
}

export interface BlockUnblockAppVariables {
  deviceId: string;
  packageName: string;
}

export async function blockAppAction({
  deviceId,
  packageName,
}: BlockUnblockAppVariables): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient(`/mdm-sync/${deviceId}/action`, {
        method: "POST",
        body: JSON.stringify({ deviceIds: [deviceId], actionId: 27, message: packageName }),
      }),
    "Failed to block app"
  );
}

export async function unblockAppAction({
  deviceId,
  packageName,
}: BlockUnblockAppVariables): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient(`/mdm-sync/${deviceId}/action`, {
        method: "POST",
        body: JSON.stringify({ deviceIds: [deviceId], actionId: 28, message: packageName }),
      }),
    "Failed to unblock app"
  );
}

// --- Domain blocking ---
// Endpoint: POST /mdm-sync/{deviceId}/block-domain  { domains: string[] }

export async function blockDomainAction(
  deviceId: string,
  domains: string[]
): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient(`/mdm-sync/${deviceId}/block-domain`, {
        method: "POST",
        body: JSON.stringify({ domains }),
      }),
    "Failed to block domain"
  );
}

export async function unblockDomainAction(
  deviceId: string,
  domains: string[]
): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient(`/mdm-sync/${deviceId}/unblock-domain`, {
        method: "POST",
        body: JSON.stringify({ domains }),
      }),
    "Failed to unblock domain"
  );
}
