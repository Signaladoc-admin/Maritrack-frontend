"use client";

import { useServerActionQuery, useServerActionMutation } from "@/shared/api/server-action-hooks";
import {
  getPaymentPlansAction,
  initializePaymentAction,
  verifyPaymentAction,
  getActiveSubscriptionAction,
  getPaymentHistoryAction,
  getAllSubscriptionsAction,
  exportSubscriptionsAction,
} from "../api/payment.actions";
import { useCallback, useState } from "react";
import { useToast } from "@/shared/ui/toast";
import { useQueryState } from "nuqs";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/shared/auth/AuthProvider";

export const paymentKeys = {
  all: ["payments"] as const,
  plans: ["payments", "plans"] as const,
  subscription: (zoneId: string) => ["payments", "subscription", zoneId] as const,
  paymentHistory: (zoneId: string, page: number) =>
    ["payments", "paymentHistory", zoneId, page] as const,
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

export function useActiveSubscription(zoneId?: string | undefined) {
  const { user } = useAuth()

  return useServerActionQuery(
    paymentKeys.subscription(zoneId ?? user?.zoneId ?? ""),
    getActiveSubscriptionAction,
    [zoneId ?? user?.zoneId ?? ""],
    { enabled: !!(zoneId || user?.zoneId)}
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

export function usePaymentHistory(
  zoneId: string | undefined,
  options: { page?: number; limit?: number } = {}
) {
  const { page = 1, limit = 10 } = options;
  return useServerActionQuery(
    paymentKeys.paymentHistory(zoneId ?? "", page),
    getPaymentHistoryAction,
    [zoneId ?? "", page, limit],
    { enabled: !!zoneId }
  );
}

export function useExportSubscriptions() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const exportSubscriptions = useCallback(async () => {
    setIsExporting(true);
    try {
      const result = await exportSubscriptionsAction();

      if (!result.success || !result.data) {
        toast({
          title: "Error",
          message: result.error ?? "Failed to export subscriptions",
          type: "error",
        });
        return;
      }

      window.open(result.data.link, "_blank");
    } catch {
      toast({
        title: "Error",
        message: "Failed to export subscriptions",
        type: "error",
      });
    } finally {
      setIsExporting(false);
    }
  }, [toast]);

  return { exportSubscriptions, isExporting };
}
