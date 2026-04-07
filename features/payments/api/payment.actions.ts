"use server";

import { apiClient } from "@/shared/lib/api-client";
<<<<<<< HEAD
=======
import { withSafeAction } from "@/shared/lib/safe-action";
>>>>>>> dev/dev
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
<<<<<<< HEAD
  try {
    const response = await apiClient("/payments/plans", {
      method: "GET",
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch payment plans" };
  }
=======
  return withSafeAction(
    async () => {
      const response = await apiClient("/payments/plans", { method: "GET" });
      return response.data;
    },
    "Failed to fetch payment plans"
  );
>>>>>>> dev/dev
}

export async function initializePaymentAction(data: {
  planId: string;
  zoneId: string;
  callbackUrl: string;
}): Promise<ActionResult<{ authorizationUrl: string }>> {
<<<<<<< HEAD
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
=======
  return withSafeAction(
    async () => {
      const response = await apiClient("/payments/paystack/initialize", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.data;
    },
    "Failed to initialize payment"
  );
}

export async function verifyPaymentAction(reference: string): Promise<ActionResult<any>> {
  return withSafeAction(
    async () => {
      const response = await apiClient("/payments/paystack/verify", {
        method: "POST",
        body: JSON.stringify({ reference }),
      });
      return response.data;
    },
    "Failed to verify payment"
  );
>>>>>>> dev/dev
}

export interface ActiveSubscription {
  active: boolean;
  subscription: {
    id: string;
    zoneId: string;
    planId: string;
    status: string;
    deviceLimit: number;
    devicesUsed: number;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    plan: PaymentPlan;
  } | null;
}

export async function getActiveSubscriptionAction(
  zoneId: string
): Promise<ActionResult<ActiveSubscription>> {
<<<<<<< HEAD
  try {
    const response = await apiClient(`/payments/subscriptions/zone/${zoneId}/active`, {
      method: "GET",
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch subscription status" };
  }
=======
  return withSafeAction(
    async () => {
      const response = await apiClient(`/payments/subscriptions/zone/${zoneId}/active`, {
        method: "GET",
      });
      return response.data;
    },
    "Failed to fetch subscription status"
  );
>>>>>>> dev/dev
}
