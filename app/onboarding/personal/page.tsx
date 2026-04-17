"use client";

import { useIsOnboarded } from "@/entities/user/model/useIsOnboarded";
import ChildrenProfiles from "@/features/onboarding/personal/ui/ChildrenProfiles";
import ParentalControlSetup from "@/features/parents/ui/ParentalControlSetup";
import { MultiStepForm } from "@/shared/ui/multi-step-form";
import { useState, useEffect, Suspense } from "react";
import { PageLoader } from "@/shared/ui/loader";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyPayment } from "@/features/payments/model/usePayments";
import { useToast } from "@/shared/ui/toast";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { cn } from "@/shared/lib/utils";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stepParam = searchParams?.get("step");
  const reference = searchParams?.get("reference");

  const { profile, pcSettings, checkAndRedirect } = useIsOnboarded();

  const [isFullWidth, setIsFullWidth] = useState(false);
  const [currentStep, setCurrentStep] = useState(() => {
    if (stepParam) return parseInt(stepParam, 10);
    return 0;
  });

  const { mutateAsync: verifyPayment } = useVerifyPayment();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const { toast } = useToast();

  useEffect(() => {
    if (profile && pcSettings) {
      checkAndRedirect(profile, pcSettings);
    }
  }, [profile, pcSettings, checkAndRedirect]);

  useEffect(() => {
    if (stepParam && !reference) {
      const step = parseInt(stepParam, 10);
      setCurrentStep(step);
      setIsFullWidth(false);
    }
  }, [stepParam, reference]);

  useEffect(() => {
    if (reference) {
      verifyPayment(reference)
        .then(() => {
          toast({ title: "Success", message: "Payment verified successfully", type: "success" });
          router.replace("/onboarding/personal?step=0");
        })
        .catch((err) => {
          toast({
            title: "Verification Failed",
            message: err.message || "Could not verify payment",
            type: "error",
          });
          router.replace("/onboarding/personal?step=0");
        });
    }
  }, [reference, verifyPayment, toast, router]);

  const nextStep = () => {
    setCurrentStep((p) => {
      const next = Math.min(p + 1, 1);
      return next;
    });
    const currentParam = parseInt(stepParam || "0", 10);
    const next = Math.min(currentParam + 1, 1);
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

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    router.push(`/onboarding/personal?step=${index}`);
  };

  async function handleLogout() {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    }
  }

  const steps = [
    {
      title: "Children Profiles",
      onClick: () => handleStepClick(0),
      component: (
        <ChildrenProfiles
          goToNextStep={nextStep}
          onViewChange={(view) => setIsFullWidth(view === "pricing")}
        />
      ),
    },
    {
      title: "Parental Control & Consent Setup",
      onClick: () => handleStepClick(1),
      component: (
        <ParentalControlSetup
          handleSubmit={() => router.push("/dashboard")}
          goToPrevStep={prevStep}
        />
      ),
    },
  ];

  return (
    <div className={cn("relative", isFullWidth ? "p-0" : "p-14")}>
        <Button
          variant="ghost"
          className={cn(
            "text-muted-foreground hover:text-foreground absolute h-auto p-0! font-medium transition-colors hover:bg-transparent",
            isFullWidth ? "top-6 right-6" : "top-14 right-14"
          )}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </Button>
        <div className={cn(isFullWidth ? "mx-auto w-full max-w-7xl px-14 py-20" : "")}>
          <MultiStepForm
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            isFullWidth={isFullWidth}
          />
        </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <OnboardingContent />
    </Suspense>
  );
}
