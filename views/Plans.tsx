"use client";

import { useBusinessZone, useBusinessZones, useParentZone, useParentZones } from "@/features/mdm-sync/model/useMdmSync";
import { useActiveSubscription, useAllSubscriptions, useVerifyPayment } from "@/features/payments/model/usePayments";
import { Subscription } from "@/features/payments/types";
import BillingHistoryTable from "@/features/payments/ui/BillingHistoryTable";
import PlanCard from "@/features/payments/ui/PlanCard";
import VerifyPayment from "@/features/payments/ui/VerifyPayment";
import { useAuth } from "@/shared/auth/AuthProvider";
import { formatCurrency, formatPaystackKoboAmount } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { Skeleton } from "@/shared/ui/skeleton";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

// Mirrors PlanCard exactly: same rounded-xl, px-6 py-5, inline border styles
function PlanCardSkeleton() {
  return (
    <div
      className="flex items-start justify-between rounded-xl bg-white px-6 py-5"
      style={{ border: "3.5px solid #eeeeee", borderBottom: "20px solid #eeeeee" }}
    >
      <div className="space-y-2">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-52" />
      </div>
      <Skeleton className="h-8 w-24 rounded-lg" />
    </div>
  );
}

export default function Plans() {
  const { user } = useAuth();

  const { data: businessZone, isLoading: isLoadingBusinessZone } = useBusinessZone({
    enabled: user?.appRole === "BUSINESS",
  });
  const { data: parentZone, isLoading: isLoadingParentZone } = useParentZone({
    enabled: user?.appRole === "PARENT",
  });

  const zoneId =
    user?.appRole === "BUSINESS" ? businessZone?.id : parentZone?.id;

  const { data: activeSubscriptionRes, isLoading: isLoadingSubscription } =
    useActiveSubscription(zoneId);
  const activeSubscription = activeSubscriptionRes?.data?.subscription || null;

  const { data: allSubscriptionsRes, isLoading: isLoadingAllSubscriptions } =
    useAllSubscriptions(zoneId);
  const allSubscriptions = allSubscriptionsRes?.data || [];

  const otherSubscriptions = Array.isArray(allSubscriptions)
    ? allSubscriptions.filter((s: Subscription) => s.id !== activeSubscription?.id)
    : [];

  const isLoadingZone =
    user?.appRole === "BUSINESS" ? isLoadingBusinessZone : isLoadingParentZone;
  // Stay in skeleton until zones resolve AND (if a zone exists) subscription resolves
  const isResolving =
    isLoadingZone || (!!zoneId && (isLoadingSubscription || isLoadingAllSubscriptions));

  const [reference] = useQueryState("reference");

  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/plans/subscribe");
  };

  if (reference) return <VerifyPayment reference={reference} />

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <Header title="Your Plans" subtitle="Manage your subscription and billing history" />

      {isResolving ? (
        <div className="space-y-4">
          <PlanCardSkeleton />
          <PlanCardSkeleton />
        </div>
      ) : !activeSubscription ? (
        <div className="flex flex-col gap-4 w-fit mx-auto">
          <p className="text-muted-foreground text-center">No active subscription found</p>
          <Button onClick={handleUpgrade}>Upgrade</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <PlanCard
            price={formatCurrency(formatPaystackKoboAmount(activeSubscription.plan?.priceNGN) || 0)}
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
  );
}
