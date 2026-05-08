"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { ActionResult } from "@/shared/api/types";
import { ActiveSubscription, PaymentPlan, Subscription, Transaction } from "../types";

export async function getPaymentPlansAction(): Promise<ActionResult<PaymentPlan[]>> {
  return withSafeAction(async () => {
    const response = await apiClient("/payments/plans", { method: "GET" });
    return response.data;
  }, "Failed to fetch payment plans");
}

export async function initializePaymentAction(data: {
  planId: string;
  zoneId: string;
  callbackUrl: string;
}): Promise<ActionResult<{ authorizationUrl: string }>> {
  return withSafeAction(async () => {
    const response = await apiClient("/payments/paystack/initialize", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.data;
  }, "Failed to initialize payment");
}

export async function verifyPaymentAction(reference: string): Promise<ActionResult<any>> {
  return withSafeAction(async () => {
    const response = await apiClient("/payments/paystack/verify", {
      method: "POST",
      body: JSON.stringify({ reference }),
    });
    return response.data;
  }, "Failed to verify payment");
}

export async function getActiveSubscriptionAction(zoneId: string): Promise<
  ActionResult<{
    data: ActiveSubscription;
    status: string;
    message: string;
  }>
> {
  return withSafeAction(async () => {
    const response = await apiClient(`/payments/subscriptions/zone/${zoneId}/active`, {
      method: "GET",
    });

    return response;
  }, "Failed to fetch subscription status");
}

export async function getAllSubscriptionsAction(zoneId: string): Promise<
  ActionResult<{
    data: Subscription[];
    status: string;
    message: string;
  }>
> {
  return withSafeAction(async () => {
    const response = await apiClient(`/payments/subscriptions/zone/${zoneId}`, {
      method: "GET",
    });

    return response;
  }, "Failed to fetch subscription status");
}

export async function getPaymentHistoryAction(
  zoneId: string
): Promise<ActionResult<{ results: Transaction[]; total: number; page: number; limit: number }>> {
  return withSafeAction(async () => {
    const response = await apiClient(`/payments/transactions/zone/${zoneId}`, {
      method: "GET",
    });
    return response.data;
  }, "Failed to fetch payment history");
}
