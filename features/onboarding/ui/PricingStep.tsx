"use client";

import { useState } from "react";
import { PricingCard } from "@/shared/ui/PricingCard/PricingCard";
import { Header } from "@/shared/ui/layout/header";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface PricingStepProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function PricingStep({ onBack, onSuccess }: PricingStepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = () => {
    setIsLoading(true);
    // Simulate payment gateway loading
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 2000);
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
          onButtonClick={handleSelectPlan}
        />
        <PricingCard
          title="PREMIUM PLAN"
          price="49"
          isPremium
          description="On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe."
          features={premiumFeatures}
          buttonText="Get the premium"
          onButtonClick={handleSelectPlan}
        />
      </div>
    </div>
  );
}
