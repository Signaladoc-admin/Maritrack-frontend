"use client";

import { useBusinessZones, useParentZones } from "@/features/mdm-sync/model/useMdmSync";
import { useActiveSubscription, useAllSubscriptions } from "@/features/payments/model/usePayments";
import { Subscription } from "@/features/payments/types";
import BillingHistoryTable from "@/features/payments/ui/BillingHistoryTable";
import PlanCard from "@/features/payments/ui/PlanCard";
import { useAuth } from "@/shared/auth/AuthProvider";
import { formatCurrency } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { Skeleton } from "@/shared/ui/skeleton";
import { useRouter } from "next/navigation";

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

  const { data: businessZones, isLoading: isLoadingBusinessZones } = useBusinessZones({
    enabled: user?.appRole === "BUSINESS",
  });
  const { data: parentZones, isLoading: isLoadingParentZones } = useParentZones({
    enabled: user?.appRole === "PARENT",
  });

  const zoneId =
    user?.appRole === "BUSINESS" ? (businessZones as any)?.[0]?.id : (parentZones as any)?.[0]?.id;

  const { data: activeSubscriptionRes, isLoading: isLoadingSubscription } =
    useActiveSubscription(zoneId);
  const activeSubscription = activeSubscriptionRes?.data?.subscription || null;

  const { data: allSubscriptionsRes, isLoading: isLoadingAllSubscriptions } =
    useAllSubscriptions(zoneId);
  const allSubscriptions = allSubscriptionsRes?.data || [];

  const otherSubscriptions = Array.isArray(allSubscriptions)
    ? allSubscriptions.filter((s: Subscription) => s.id !== activeSubscription?.id)
    : [];

  const isLoadingZones =
    user?.appRole === "BUSINESS" ? isLoadingBusinessZones : isLoadingParentZones;
  // Stay in skeleton until zones resolve AND (if a zone exists) subscription resolves
  const isResolving =
    isLoadingZones || (!!zoneId && (isLoadingSubscription || isLoadingAllSubscriptions));

  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/plans/subscribe");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <Header title="Your Plans" subtitle="Manage your subscription and billing history" />

      {isResolving ? (
        <div className="space-y-4">
          <PlanCardSkeleton />
          <PlanCardSkeleton />
        </div>
      ) : !activeSubscription ? (
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-center">No active subscription found</p>

          <Button onClick={handleUpgrade}>Upgrade</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <PlanCard
            price={formatCurrency(activeSubscription.plan?.priceNGN || 0)}
            name={activeSubscription.plan?.name || ""}
            billingCycle={activeSubscription.plan?.billingCycle || ""}
            isCurrent={activeSubscriptionRes?.data?.active}
          />
          {otherSubscriptions.map((subscription: Subscription) => (
            <PlanCard
              key={subscription.id}
              price={formatCurrency(subscription.plan?.priceNGN || 0)}
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
