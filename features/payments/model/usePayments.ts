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
import { useCallback, useMemo, useState } from "react";
import { useToast } from "@/shared/ui/toast";
import { useQueryState } from "nuqs";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import type { PlanAudience } from "../types";

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

const ROLE_TO_PLAN_AUDIENCE: Record<"PARENT" | "BUSINESS", PlanAudience> = {
  PARENT: "B2C",
  BUSINESS: "B2B",
};

/**
 * Pricing plans scoped to the signed-in user's side of the app.
 *
 * `/payments/plans` is not paginated — every plan (B2C + B2B, monthly + annual)
 * comes back in one shot. This hook narrows that list to the "premium" plans for
 * the current `appRole`: the ANNUAL plans, which are the discounted ones we surface
 * on the pricing screen, sorted cheapest-first. It also picks the `bestChoiceId` —
 * the plan with the largest discount (best value) — for the "Best choice" badge.
 */
export function usePricingPlans() {
  const { user } = useAuth();
  const query = usePaymentPlans();

  const audience = user?.appRole ? ROLE_TO_PLAN_AUDIENCE[user.appRole] : undefined;

  const premiumPlans = useMemo(() => {
    const plans = Array.isArray(query.data) ? query.data : [];
    return plans
      .filter((p) => p.isActive && !p.deleted)
      .filter((p) => (audience ? p.type === audience : true))
      .filter((p) => p.billingCycle === "ANNUAL")
      .sort((a, b) => a.priceNGN - b.priceNGN);
  }, [query.data, audience]);

  const bestChoiceId = useMemo(() => {
    if (premiumPlans.length === 0) return null;
    return premiumPlans.reduce((best, p) =>
      p.discountPercentage > best.discountPercentage ? p : best
    ).id;
  }, [premiumPlans]);

  return { ...query, premiumPlans, bestChoiceId, audience };
}

export function useInitializePayment() {
  return useServerActionMutation(initializePaymentAction);
}

export function useVerifyPayment() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  return useServerActionMutation(verifyPaymentAction, {
    onSuccess: (res) => {
      // Refresh the active-subscription status so gates like `hasPaid` flip immediately
      // (no manual page refresh). Prefix match invalidates the query for every zoneId,
      // so this works for both business and parent flows that reuse this hook.
      queryClient.invalidateQueries({ queryKey: ["payments", "subscription"] });
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
