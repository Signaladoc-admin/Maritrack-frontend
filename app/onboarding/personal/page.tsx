"use client";

import { useUserProfile } from "@/entities/user/model/useUserProfile";
import BasicInformationForm from "@/features/onboarding/ui/BasicInformationForm";
import ChildrenProfiles from "@/features/onboarding/ui/ChildProfiles";
import ParentalControlSetup from "@/features/onboarding/ui/ParentalControlSetup";
import { useParentStore } from "@/shared/stores/user-store";
import { MultiStepForm } from "@/shared/ui/multi-step-form";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyPayment } from "@/entities/payments/model/usePayments";
import { useToast } from "@/shared/ui/toast";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stepParam = searchParams?.get("step");
  const reference = searchParams?.get("reference");

  const [currentStep, setCurrentStep] = useState(() => {
    if (reference) return 2; // Payment is done, jump to step 3 (index 2)
    if (stepParam) return parseInt(stepParam, 10);
    return 0; // Default to basic info
  });

  const nextStep = () => {
    setCurrentStep((p) => {
      const next = Math.min(p + 1, 2);
      return next;
    });
    // Get the new step directly from state queue or compute it manually to avoid stale closures
    const currentParam = parseInt(stepParam || "0", 10);
    const next = Math.min(currentParam + 1, 2);
    router.push(`/onboarding/personal?step=${next}`);
  };

  const prevStep = () => {
    setCurrentStep((p) => {
      const prev = Math.max(p - 1, 0);
      return prev;
    });
    const currentParam = parseInt(stepParam || "0", 10);
    const prev = Math.max(currentParam - 1, 0);
    router.push(`/onboarding/personal?step=${prev}`);
  };

  const { parentId: storeParentId } = useParentStore();
  const { mutateAsync: verifyPayment } = useVerifyPayment();
  const { toast } = useToast();

  useEffect(() => {
    if (stepParam && !reference) {
      setCurrentStep(parseInt(stepParam, 10));
    }
  }, [stepParam, reference]);

  useEffect(() => {
    if (reference) {
      verifyPayment(reference)
        .then(() => {
          toast({ title: "Success", message: "Payment verified successfully", type: "success" });
          router.replace("/onboarding/personal?step=2");
        })
        .catch((err) => {
          toast({
            title: "Verification Failed",
            message: err.message || "Could not verify payment",
            type: "error",
          });
          // If it fails, maybe drop them back to the children profiles mapping to restart payment
          router.replace("/onboarding/personal?step=1");
        });
    }
  }, [reference, verifyPayment, toast, router]);

  const steps = [
    {
      title: "Basic Information",
      component: <BasicInformationForm goToNextStep={nextStep} />,
    },
    {
      title: "Children Profiles",
      component: <ChildrenProfiles goToPrevStep={prevStep} goToNextStep={nextStep} />,
    },
    {
      title: "Parental Control & Consent Setup",
      component: <ParentalControlSetup goToPrevStep={prevStep} />,
    },
  ];

  return (
    <div className="p-14">
      <MultiStepForm steps={steps} currentStep={currentStep} />
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="p-14 text-center">Loading onboarding...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
