"use client";

import { useState } from "react";
import { PricingCard } from "@/shared/ui/PricingCard/PricingCard";
import { Header } from "@/shared/ui/layout/header";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { usePaymentPlans, useInitializePayment } from "@/entities/payments/model/usePayments";
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
    // Basic plan or skip
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

      if (response?.checkoutUrl) {
        // Redirect to paystack checkout window
        window.location.href = response.checkoutUrl;
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

  const premiumFeatures = [
    { text: "Customer Support", included: true },
    { text: "Upto 10 Users", included: true },
    { text: "Monthly Reports", included: true },
    { text: "Multiple Devices Supported", included: true },
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

  return (
    <div className="space-y-10">
      <Button variant="link" onClick={onBack} className="flex items-center gap-1! px-0">
        <ChevronLeft className="h-6! w-6! text-orange-500" /> Go back
      </Button>

      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Start today, with free or premium plan, you choose
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          With lots of unique and useful features, you can easily manage your wallet easily without
          any problem.
        </p>
      </div>

      <div className="mx-auto grid gap-8 pb-10 md:grid-cols-2 lg:max-w-4xl">
        <PricingCard
          title="BASIC PLAN"
          price="0"
          description="Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured."
          features={features}
          buttonText="Get Basic"
          onButtonClick={handleSelectBasicPlan}
        />
        <PricingCard
          title={premiumTitle}
          price={premiumPrice}
          isPremium
          description={premiumDesc}
          features={premiumFeatures}
          buttonText="Get the premium"
          onButtonClick={() => {
            if (premiumPlanData?.id) {
              handleSelectPremiumPlan(premiumPlanData.id);
            } else {
              toast({
                title: "Error",
                message: "Premium plan not available right now",
                type: "error",
              });
            }
          }}
        />
      </div>
    </div>
  );
}
