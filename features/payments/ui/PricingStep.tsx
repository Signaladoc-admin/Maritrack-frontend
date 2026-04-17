"use client";

import { useState } from "react";
import { PricingCard } from "@/shared/ui/PricingCard/PricingCard";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { usePaymentPlans, useInitializePayment } from "@/features/payments/model/usePayments";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useToast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/model/useLogout";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";

function PricingCardSkeleton({ isPremium }: { isPremium?: boolean }) {
  const shimmer = isPremium ? "bg-white/20" : "bg-slate-200";
  return (
    <div
      className={`relative flex h-full w-full flex-col rounded-[32px] p-8 shadow-xl ${isPremium ? "bg-[#1B3C73]" : "bg-white ring-1 ring-slate-100"}`}
    >
      <div className="flex min-h-[180px] flex-col space-y-4">
        <Skeleton className={`h-4 w-24 ${shimmer}`} />
        <Skeleton className={`h-14 w-44 ${shimmer}`} />
        <Skeleton className={`h-4 w-20 ${shimmer}`} />
        <Skeleton className={`h-10 w-full ${shimmer}`} />
      </div>
      <div className={`mb-8 h-px w-full ${isPremium ? "bg-white/20" : "bg-slate-100"}`} />
      <ul className="mb-10 space-y-5">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="flex items-center gap-3">
            <Skeleton className={`h-6 w-6 shrink-0 rounded-full ${shimmer}`} />
            <Skeleton className={`h-4 w-32 ${shimmer}`} />
          </li>
        ))}
      </ul>
      <Skeleton className={`h-14 w-full rounded-full ${shimmer}`} />
    </div>
  );
}

interface PricingStepProps {
  onBack: () => void;
  onSuccess: () => void; // Used for basic plan skip,
  isShowingBackButton?: boolean;
  isShowingSignOutButton?: boolean;
}

export default function PricingStep({
  onBack,
  onSuccess,
  isShowingBackButton,
  isShowingSignOutButton,
}: PricingStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: plans, isLoading: isLoadingPlans } = usePaymentPlans();
  const { mutateAsync: initializePayment } = useInitializePayment();
  const { data: user } = useUserProfile();
  const { toast } = useToast();

  const handleSelectBasicPlan = () => {
    onSuccess();
  };

  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const handleSelectPremiumPlan = async (planId: string) => {
    if (!user?.zoneId?.[0]?.id) {
      toast({
        title: "Error",
        message:
          "No active zone setup found for your account. Please set up a child profile first.",
        type: "error",
      });
      return;
    }

    try {
      setIsLoading(true);
      const host = window.location.origin;
      const callbackUrl = `${host}/onboarding/personal`;

      const response = await initializePayment({
        planId,
        zoneId: user.zoneId[0].id,
        callbackUrl,
      });

      if (response?.authorizationUrl) {
        // Redirect to paystack checkout window
        window.location.href = response.authorizationUrl;
      } else {
        toast({ title: "Error", message: "Could not generate checkout session", type: "error" });
        setIsLoading(false);
      }
    } catch (e: any) {
      toast({ title: "Error", message: e.message || "Checkout failed", type: "error" });
      setIsLoading(false);
    }
  };

  const features = [
    { text: "Customer Support", included: true },
    { text: "Free User Account", included: true },
    { text: "Monthly Reports", included: false },
    { text: "Multiple Devices", included: false },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#1B3C73]" />
        <p className="text-sm font-medium text-slate-500">Processing payment...</p>
      </div>
    );
  }

  // Use the last plan in the array for the premium card
  const premiumPlanData = Array.isArray(plans) && plans.length > 0 ? plans[plans.length - 1] : null;
  const premiumPrice = premiumPlanData ? String(premiumPlanData.priceNGN) : "49";
  const premiumTitle = premiumPlanData ? premiumPlanData.name.toUpperCase() : "PREMIUM PLAN";
  const premiumDesc = premiumPlanData
    ? premiumPlanData.description
    : "On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe.";

  const premiumFeatures = [
    { text: premiumPlanData?.name.toUpperCase().split("—")[0]!, included: true },
    { text: "Customer Support", included: true },
    { text: "Monthly Reports", included: true },
    { text: "Multiple Devices Supported", included: true },
  ];

  return (
    <div className="space-y-10">
      {isShowingBackButton && (
        <Button variant="link" onClick={onBack} className="flex items-center gap-1! px-0">
          <ChevronLeft className="h-6! w-6! text-orange-500" /> Go back
        </Button>
      )}

      <div className="mx-auto max-w-5xl space-y-6 px-10">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Start today, with free or premium plan, you choose
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            With lots of unique and useful features, you can easily manage your wallet easily
            without any problem.
          </p>
        </div>
        <div className="grid justify-center gap-8 md:grid-cols-2">
          {isLoadingPlans ? (
            <>
              <PricingCardSkeleton />
              <PricingCardSkeleton isPremium />
            </>
          ) : (
            <>
              <PricingCard
                plan={{
                  id: "basic",
                  name: "Basic Plan",
                  billingCycle: "Per month",
                  deviceLimit: 1,
                  priceNGN: 0,
                  description: "Get started with our free plan and enjoy basic features.",
                }}
                buttonText="Get Basic"
                onButtonClick={handleSelectBasicPlan}
              />
              <PricingCard
                plan={plans?.at(-1)!}
                key={plans?.at(-1)!.id}
                isPremium
                buttonText="Get the premium"
                onButtonClick={() => handleSelectPremiumPlan(plans?.at(-1)!.id!)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
