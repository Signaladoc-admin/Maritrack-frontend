"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";

export interface CreateDeviceFinanceDto {
  deviceFinanceUserId: string;
  gracePeriodInDays?: number;
  devicePriceInKobo: number;
  downPaymentInKobo?: number;
  monthlyPaymentInKobo: number;
  paymentPlanDuration: number;
  paymentStartDate: string;
  transFer?: boolean;
  gender?: "MALE" | "FEMALE";
  address?: string;
  state?: string;
  country?: string;
}

export async function createDeviceFinanceAction(data: CreateDeviceFinanceDto) {
  return withSafeAction(async () => {
    const res = await apiClient(`/device-finance`, {
      method: "POST",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res;
  }, "Failed to create device finance plan");
}

export async function getDeviceFinanceAction(id: string) {
  return withSafeAction(async () => {
    const res = await apiClient(`/device-finance/${id}`, {
      method: "GET",
      noRedirect: true,
    });
    return res;
  }, "Failed to fetch device finance details");
}

export async function markPlanAsPaidAction(installmentId: string) {
  return withSafeAction(async () => {
    const res = await apiClient(`/device-finance/installments/${installmentId}/pay`, {
      method: "PATCH",
      body: JSON.stringify({ amountKobo: 0 }),
      headers: { "Content-Type": "application/json" },
      noRedirect: true,
    });
    return res;
  }, "Failed to mark plan as paid");
}
