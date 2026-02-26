"use client";

import { useServerActionQuery, useServerActionMutation } from "@/shared/api/server-action-hooks";
import {
  getPaymentPlansAction,
  initializePaymentAction,
  verifyPaymentAction,
} from "../api/payment.actions";

export const paymentKeys = {
  all: ["payments"] as const,
  plans: ["payments", "plans"] as const,
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
