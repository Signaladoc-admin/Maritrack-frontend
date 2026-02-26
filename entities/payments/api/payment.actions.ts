"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { ActionResult } from "@/shared/api/types";

export interface PaymentPlan {
  id: string;
  name: string;
  slug: string;
  billingCycle: string;
  deviceLimit: number;
  priceNGN: number;
  paystackPlanCode: string | null;
  telcoPlanId: string | null;
  description: string;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
}

export async function getPaymentPlansAction(): Promise<ActionResult<PaymentPlan[]>> {
  try {
    const response = await apiClient("/payments/plans", {
      method: "GET",
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch payment plans" };
  }
}

export async function initializePaymentAction(data: {
  planId: string;
  zoneId: string;
  callbackUrl: string;
}): Promise<ActionResult<{ checkoutUrl: string }>> {
  try {
    const response = await apiClient("/payments/paystack/initialize", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to initialize payment" };
  }
}

export async function verifyPaymentAction(reference: string): Promise<ActionResult<any>> {
  try {
    const response = await apiClient("/payments/paystack/verify", {
      method: "POST",
      body: JSON.stringify({ reference }),
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to verify payment" };
  }
}
