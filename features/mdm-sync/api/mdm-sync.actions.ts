"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { ActionResult } from "@/shared/api/types";
import { withSafeAction } from "@/shared/lib/safe-action";

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
