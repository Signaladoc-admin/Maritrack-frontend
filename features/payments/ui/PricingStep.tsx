"use client";

import Image from "next/image";
import { PricingCard } from "@/shared/ui/PricingCard/PricingCard";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { usePaymentPlans, useInitializePayment } from "@/features/payments/model/usePayments";
import { useToast } from "@/shared/ui/toast";
import { useAuth } from "@/shared/auth/AuthProvider";
import { formatPaystackKoboAmount } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";

function PricingCardSkeleton({ isPremium }: { isPremium?: boolean }) {
  const shimmer = isPremium ? "bg-white/20" : "bg-slate-200";
  return (
    <div
      className={`relative flex h-full w-full min-w-[320px] flex-col rounded-[32px] p-8 shadow-xl sm:min-w-[470px] md:min-w-0 ${isPremium ? "bg-[#1B3C73]" : "bg-white ring-1 ring-slate-100"}`}
    >
      <div className="flex min-h-[180px] flex-col space-y-4">
        <Skeleton className={`h-4 w-1/2 ${shimmer}`} />
        <Skeleton className={`h-14 w-full ${shimmer}`} />
        <Skeleton className={`h-4 w-1/2 ${shimmer}`} />
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
}

export default function PricingStep({ onBack, onSuccess, isShowingBackButton }: PricingStepProps) {
  const { data: plans, isLoading: isLoadingPlans } = usePaymentPlans();

  const { mutateAsync: initializePayment, isPending: isInitializingPayment } = useInitializePayment();
  const { user } = useAuth();
  const appRole = user?.appRole;

  const zoneId = user?.zoneId || ''

  const pathname = usePathname()
  const isOnboarding = pathname.includes("onboarding");

  const { toast } = useToast();

  const handleSelectBasicPlan = () => {
    onSuccess();
  };

  const handleSelectPremiumPlan = async (planId: string) => {
    try {
      const host = window.location.origin;
      const callbackUrl = isOnboarding ? `${host}/onboarding/${appRole === "PARENT" ? "personal" : "business"}` : `${host}/plans`;

      const response = await initializePayment({
        planId,
        zoneId,
        callbackUrl,
      });

      if (response?.authorizationUrl) {
        // Redirect to paystack checkout window
        window.location.href = response.authorizationUrl;
      } else {
        toast({ title: "Error", message: "Could not generate checkout session", type: "error" });

      }
    } catch (e: any) {
      toast({ title: "Error", message: e.message || "Checkout failed", type: "error" });
    }
  };

  const features = [
    { text: "Customer Support", included: true },
    { text: "Free User Account", included: true },
    { text: "Monthly Reports", included: false },
    { text: "Multiple Devices", included: false },
  ];

  if (isInitializingPayment) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#1B3C73]" />
        <p className="text-sm font-medium text-slate-500">Processing payment...</p>
      </div>
    );
  }

  // Use the last plan in the array for the premium card
  const premiumPlanData = Array.isArray(plans) && plans.length > 0 ? plans[plans.length - 1] : null;
  const premiumPrice = premiumPlanData ? formatPaystackKoboAmount(premiumPlanData.priceNGN) : 49;
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
    <div className="relative space-y-10">
      <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-screen -translate-x-1/2">
        <Image
          src="/bg-texture.png"
          alt=""
          fill
          className="select-none object-cover object-center opacity-60"
          priority={false}
        />
      </div>
      {isShowingBackButton && (
        <Button variant="link" onClick={onBack} className="flex items-center gap-1! px-0">
          <ChevronLeft className="h-6! w-6! text-orange-500" /> Go back
        </Button>
      )}

      <div className="space-y-16">
        <div className="space-y-4 text-center max-w-xl mx-auto">
          <h1 className="text-3xl md:text-[2.35rem] font-extrabold tracking-tight text-slate-900">
            Start today, with free or <br /> premium plan, you choose
          </h1>
          <p className="text-muted-foreground text-lg">
            With lots of unique and useful features, you can easily manage your wallet easily
            without any problem.
          </p>
        </div>
        <div className="grid justify-center gap-8 md:grid-cols-2 mx-auto max-w-4xl">
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
