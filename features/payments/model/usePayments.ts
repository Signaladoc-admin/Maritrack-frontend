"use client";

import { useServerActionQuery, useServerActionMutation } from "@/shared/api/server-action-hooks";
import {
  getPaymentPlansAction,
  initializePaymentAction,
  verifyPaymentAction,
  getActiveSubscriptionAction,
  getPaymentHistoryAction,
  getAllSubscriptionsAction,
} from "../api/payment.actions";
import { useEffect } from "react";
import { useToast } from "@/shared/ui/toast";
import { useQueryState } from "nuqs";
import { usePathname, useRouter } from "next/navigation";
import { QueryOptions } from "@/shared/api/types";

export const paymentKeys = {
  all: ["payments"] as const,
  plans: ["payments", "plans"] as const,
  subscription: (zoneId: string) => ["payments", "subscription", zoneId] as const,
  paymentHistory: (zoneId: string) => ["payments", "paymentHistory", zoneId] as const,
};

export function usePaymentPlans() {
  return useServerActionQuery(paymentKeys.plans, getPaymentPlansAction, []);
}

export function useInitializePayment() {
  return useServerActionMutation(initializePaymentAction);
}

export function useVerifyPayment() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  return useServerActionMutation(verifyPaymentAction, {
    onSuccess: (res) => {
      toast({ title: "Success", message: res?.message || "Payment verified successfully", type: "success" });
      // Clear all query / search params from the URL
      router.replace(pathname, { scroll: false });
    },
    onError: (err) => {
      toast({
        title: "Verification Failed",
        message: err.message || "Could not verify payment",
        type: "error",
      });
      // Clear all query / search params from the URL
      router.replace(pathname, { scroll: false });
    }
  });
}

export function useActiveSubscription(zoneId: string | undefined) {
  return useServerActionQuery(
    paymentKeys.subscription(zoneId ?? ""),
    getActiveSubscriptionAction,
    [zoneId ?? ""],
    { enabled: !!zoneId }
  );
}

export function useAllSubscriptions(zoneId: string | undefined) {
  return useServerActionQuery(
    paymentKeys.subscription(zoneId ?? ""),
    getAllSubscriptionsAction,
    [zoneId ?? ""],
    { enabled: !!zoneId }
  );
}

export function usePaymentHistory(zoneId: string | undefined, options?: QueryOptions) {
  return useServerActionQuery(
    paymentKeys.paymentHistory(zoneId ?? ""),
    getPaymentHistoryAction,
    [zoneId ?? ""],
    { enabled: !!zoneId, ...options }
  );
}
