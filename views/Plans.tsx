"use client";

import { useActiveSubscription, useAllSubscriptions } from "@/features/payments/model/usePayments";
import { Subscription } from "@/features/payments/types";
import BillingHistoryTable from "@/features/payments/ui/BillingHistoryTable";
import PlanCard from "@/features/payments/ui/PlanCard";
import VerifyPayment from "@/features/payments/ui/VerifyPayment";
import { useAuth } from "@/shared/auth/AuthProvider";
import { formatCurrency, formatPaystackKoboAmount } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";

// Mirrors PlanCard exactly: same rounded-[var(--radius-lg)], p-6, border border-[var(--card-line)]
function PlanCardSkeleton() {
  return (
    <div className="surface flex items-start justify-between rounded-[var(--radius-lg)] border border-[var(--card-line)] p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-52" />
      </div>
      <Skeleton className="h-8 w-24 rounded-full" />
    </div>
  );
}

export default function Plans() {
  const { user } = useAuth();
  const zoneId = user?.zoneId || "";

  const { data: activeSubscriptionRes, isLoading: isLoadingSubscription } =
    useActiveSubscription(zoneId);
  const activeSubscription = activeSubscriptionRes?.data?.subscription || null;

  const { data: allSubscriptionsRes, isLoading: isLoadingAllSubscriptions } =
    useAllSubscriptions(zoneId);
  const allSubscriptions = allSubscriptionsRes?.data || [];

  const otherSubscriptions = Array.isArray(allSubscriptions)
    ? allSubscriptions.filter((s: Subscription) => s.id !== activeSubscription?.id)
    : [];

  // Stay in skeleton until zones resolve AND (if a zone exists) subscription resolves
  const isResolving = zoneId && (isLoadingSubscription || isLoadingAllSubscriptions);

  const [reference] = useQueryState("reference");

  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/plans/subscribe");
  };

  if (reference) return <VerifyPayment reference={reference} />;

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-start">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex cursor-pointer items-center text-sm font-medium text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dashboard
        </button>
      </div>

      <div className="mx-auto max-w-3xl space-y-10 pt-2">
        <Header title="Your Plans" subtitle="Manage your subscription and billing history" />

        {isResolving ? (
          <div className="space-y-4">
            <PlanCardSkeleton />
            <PlanCardSkeleton />
          </div>
        ) : !activeSubscription ? (
          <div className="mx-auto flex w-fit flex-col gap-4">
            <p className="text-muted-foreground text-center">No active subscription found</p>
            <Button onClick={handleUpgrade}>Upgrade</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <PlanCard
              key={crypto.randomUUID()}
              price={formatCurrency(
                formatPaystackKoboAmount(activeSubscription.plan?.priceNGN) || 0
              )}
              name={activeSubscription.plan?.name || ""}
              billingCycle={activeSubscription.plan?.billingCycle || ""}
              isCurrent={activeSubscriptionRes?.data?.active}
            />
            {otherSubscriptions.map((subscription: Subscription) => (
              <PlanCard
                key={subscription.id}
                price={formatCurrency(formatPaystackKoboAmount(subscription.plan?.priceNGN) || 0)}
                name={subscription.plan?.name || ""}
                billingCycle={subscription.plan?.billingCycle || ""}
              />
            ))}
          </div>
        )}

        <BillingHistoryTable />
      </div>
    </div>
  );
}
