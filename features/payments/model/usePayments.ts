"use client";

import { useServerActionQuery, useServerActionMutation } from "@/shared/api/server-action-hooks";
import {
  getPaymentPlansAction,
  initializePaymentAction,
  verifyPaymentAction,
  getActiveSubscriptionAction,
} from "../api/payment.actions";

export const paymentKeys = {
  all: ["payments"] as const,
  plans: ["payments", "plans"] as const,
  subscription: (zoneId: string) => ["payments", "subscription", zoneId] as const,
};

export function usePaymentPlans() {
  return useServerActionQuery(paymentKeys.plans, getPaymentPlansAction, []);
}

export function useInitializePayment() {
  return useServerActionMutation(initializePaymentAction);
}

export function useVerifyPayment() {
  return useServerActionMutation(verifyPaymentAction);
}

export function useActiveSubscription(zoneId: string | undefined) {
  return useServerActionQuery(
    paymentKeys.subscription(zoneId ?? ""),
    getActiveSubscriptionAction,
    [zoneId ?? ""],
    { enabled: !!zoneId }
  );
}
