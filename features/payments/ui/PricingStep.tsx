"use client";

import Image from "next/image";
import { PricingCard } from "@/shared/ui/PricingCard/PricingCard";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { usePricingPlans, useInitializePayment } from "@/features/payments/model/usePayments";
import { useToast } from "@/shared/ui/toast";
import { useAuth } from "@/shared/auth/AuthProvider";
import { SUPPORT_EMAIL } from "@/shared/lib/constants";
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
  const { premiumPlans, bestChoiceId, isLoading: isLoadingPlans } = usePricingPlans();

  const { mutateAsync: initializePayment, isPending: isInitializingPayment } =
    useInitializePayment();
  const { user } = useAuth();
  const appRole = user?.appRole;

  const zoneId = user?.zoneId || "";

  const pathname = usePathname();
  const isOnboarding = pathname.includes("onboarding");

  const { toast } = useToast();

  const isBusiness = appRole === "BUSINESS";

  // Business users who need to monitor more devices than the largest published tier
  // (200) can request a custom plan over email instead of self-serve checkout.
  const handleRequestCustomPlan = () => {
    const subject = "Custom plan request — more than 200 devices";
    const body =
      "Hi Flentra team,\n\n" +
      "We'd like to monitor more than 200 devices and would like to discuss a custom plan.\n\n" +
      "Number of devices needed: \n" +
      "Company name: \n\n" +
      "Thanks.";
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSelectBasicPlan = () => {
    onSuccess();
  };

  const handleSelectPremiumPlan = async (planId: string) => {
    try {
      const host = window.location.origin;
      const callbackUrl = isOnboarding
        ? `${host}/onboarding/${appRole === "PARENT" ? "personal" : "business"}`
        : `${host}/plans`;

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

  if (isInitializingPayment) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#1B3C73]" />
        <p className="text-sm font-medium text-slate-500">Processing payment...</p>
      </div>
    );
  }

  return (
    <div className="relative space-y-10">
      <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-screen -translate-x-1/2">
        <Image
          src="/bg-texture.png"
          alt=""
          fill
          className="object-cover object-center opacity-60 select-none"
          priority={false}
        />
      </div>
      {isShowingBackButton && (
        <Button variant="link" onClick={onBack} className="flex items-center gap-1! px-0">
          <ChevronLeft className="h-6! w-6! text-orange-500" /> Go back
        </Button>
      )}

      <div className="space-y-16">
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-[2.35rem]">
            Start today, with free or <br /> premium plan, you choose
          </h1>
          <p className="text-muted-foreground text-lg">
            With lots of unique and useful features, you can easily manage your wallet easily
            without any problem.
          </p>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8">
          {isLoadingPlans ? (
            <>
              <div className="w-full max-w-[360px]">
                <PricingCardSkeleton />
              </div>
              <div className="w-full max-w-[360px]">
                <PricingCardSkeleton isPremium />
              </div>
              <div className="w-full max-w-[360px]">
                <PricingCardSkeleton />
              </div>
            </>
          ) : (
            <>
              <div className="w-full max-w-[360px]">
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
              </div>
              {premiumPlans.map((plan) => {
                const isBestChoice = plan.id === bestChoiceId;
                return (
                  <div key={plan.id} className="w-full max-w-[360px]">
                    <PricingCard
                      plan={plan}
                      isPremium={isBestChoice}
                      buttonText={isBestChoice ? "Get the premium" : "Choose plan"}
                      onButtonClick={() => handleSelectPremiumPlan(plan.id)}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>

        {isBusiness && !isLoadingPlans && (
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white/70 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Need more than 200 devices?</h3>
              <p className="text-muted-foreground text-sm">
                Tell us how many devices you manage and we&apos;ll tailor a plan for your
                organisation.
              </p>
            </div>
            <Button
              onClick={handleRequestCustomPlan}
              className="h-12 shrink-0 rounded-full bg-[#1B3C73] px-8 text-base font-bold text-white hover:bg-[#16315e]"
            >
              Request a custom plan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
