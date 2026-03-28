"use client";

import { useState } from "react";
import { PricingCard } from "@/shared/ui/PricingCard/PricingCard";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { usePaymentPlans, useInitializePayment } from "@/features/payments/model/usePayments";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useToast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";

interface PricingStepProps {
  onBack: () => void;
  onSuccess: () => void; // Used for basic plan skip
}

export default function PricingStep({ onBack, onSuccess }: PricingStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: plans } = usePaymentPlans();
  const { mutateAsync: initializePayment } = useInitializePayment();
  const { data: user } = useUserProfile();
  const { toast } = useToast();
  const router = useRouter();

  const handleSelectBasicPlan = () => {
    onSuccess();
  };

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
      <div className="flex h-[400px] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#1B3C73]" />
        <p className="text-lg font-medium text-slate-600">Processing payment...</p>
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
      <Button variant="link" onClick={onBack} className="flex items-center gap-1! px-0">
        <ChevronLeft className="h-6! w-6! text-orange-500" /> Go back
      </Button>

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
        </div>
      </div>
    </div>
  );
}
