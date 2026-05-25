"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { ActionResult } from "@/shared/api/types";
import { withSafeAction } from "@/shared/lib/safe-action";
import { AssignDeviceToUserDto } from "@/features/business-users/users/types";
import type { Device } from "@/entities/device/model/types";

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

export async function getQrCodeAction(
  zoneId: string,
  onboardingCode: string
): Promise<ActionResult<string>> {
  try {
    const response = await apiClient(`/mdm-sync/zones/${zoneId}/qrcode/${onboardingCode}`, {
      method: "GET",
    });
    // The qr code text is in response.data based on the instruction
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to get QR code" };
  }
}

export async function getParentZonesAction(): Promise<ActionResult<any>> {
  try {
    const response = await apiClient("/mdm-sync/zones/parent", {
      method: "GET",
    });
    return { success: true, data: response.data ?? response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch parent zones" };
  }
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

export async function getBusinessZonesAction(): Promise<ActionResult<any>> {
  return withSafeAction(async () => {
    const response = await apiClient("/mdm-sync/zones/business", {
      method: "GET",
    });
    return response.data ?? response;
  }, "Failed to fetch business zones");
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
    return response.data.data;
  }, "Failed to fetch zone devices");
}

export interface AppLimitDayDetail {
  packageName: string;
  minutes: number;
  appName: string;
  hour: number;
  day: string;
  date: string;
}

export interface SetAppLimitPayload {
  actionId: number;
  message: {
    appUsage: Record<string, AppLimitDayDetail[]>;
  };
}

export interface SetAppLimitVariables {
  deviceId: string;
  data: SetAppLimitPayload;
}

export async function setAppLimitAction({
  deviceId,
  data,
}: SetAppLimitVariables): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient(`/mdm-sync/${deviceId}/action`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    "Failed to set app limit"
  );
}

// export async function getZoneDevicesAction(zoneId: string): Promise<
//   ActionResult<{
//     status: boolean;
//     statusCode: number;
//     message?: string;
//     devicesData: {
//       code: number;
//       data: Device[];
//       totalElements: number;
//       numberOfElements: number;
//       totalPages: number;
//     };
//   }>
// > {
//   return withSafeAction(async () => {
//     const res = await apiClient(`/mdm-sync/zones/${zoneId}/devices`, {
//       method: "GET",
//     });

//     return {
//       devicesData: res.data,
//       status: res.status,
//       statusCode: res.data.code,
//       message: res.data.message,
//     };
//   }, "Failed to fetch zone devices");
// }
