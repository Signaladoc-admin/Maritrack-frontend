"use client";

import PricingStep from "@/features/payments/ui/PricingStep";
import { useRouter } from "next/navigation";

export default function PlanSubscription() {
  const router = useRouter();

  return (
    <>
      <PricingStep
        onBack={() => router.back()}
        onSuccess={() => router.push("/plans")}
        isShowingBackButton
      />
    </>
  );
}
