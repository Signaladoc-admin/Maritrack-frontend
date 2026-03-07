"use client";

import { useIsOnboarded } from "@/entities/user/model/useIsOnboarded";
import ChildrenProfiles from "@/features/onboarding/ui/ChildProfiles";
import ParentalControlSetup from "@/features/onboarding/ui/ParentalControlSetup";
import { useParentStore } from "@/shared/stores/user-store";
import { MultiStepForm } from "@/shared/ui/multi-step-form";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyPayment } from "@/entities/payments/model/usePayments";
import { useToast } from "@/shared/ui/toast";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/shared/lib/utils";
import { Loader } from "@/shared/ui/loader";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stepParam = searchParams?.get("step");
  const reference = searchParams?.get("reference");

  // 1. All hooks at the very top
  const { profile, pcSettings, isLoading: isAuthLoading, checkAndRedirect } = useIsOnboarded();

  const [hasPaid, setHasPaid] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [currentStep, setCurrentStep] = useState(() => {
    if (stepParam) return parseInt(stepParam, 10);
    return 0;
  });

  const nextStep = () => {
    setCurrentStep((p) => {
      const next = Math.min(p + 1, 1);
      return next;
    });
    // Get the new step directly from state queue or compute it manually to avoid stale closures
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

  const { parentId: storeParentId } = useParentStore();
  const { mutateAsync: verifyPayment } = useVerifyPayment();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Redirect if already onboarded
  useEffect(() => {
    if (profile && pcSettings) {
      checkAndRedirect(profile, pcSettings);
      // checkAndRedirect(profile, null);
    }
  }, [profile, pcSettings, checkAndRedirect]);

  // Check for persisted payment state on mount
  useEffect(() => {
    const paid = localStorage.getItem("maritrack_onboarding_paid") === "true";
    if (paid) setHasPaid(true);
  }, []);

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
          setHasPaid(true);
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

  // 2. Early returns AFTER all hooks
  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // 3. Helper functions and render logic
  const handleHasPaid = (value: boolean) => {
    setHasPaid(value);
    localStorage.setItem("maritrack_onboarding_paid", String(value));
  };

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
      queryClient.clear();
      router.push("/login");
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
          hasPaid={hasPaid}
          setHasPaid={handleHasPaid}
        />
      ),
    },
    {
      title: "Parental Control & Consent Setup",
      onClick: () => {
        if (!hasPaid) {
          toast({
            title: "Access Restricted",
            message: "Please select a plan before configuring parental controls",
            type: "warning",
          });
          return;
        }
        handleStepClick(1);
      },
      component: <ParentalControlSetup goToPrevStep={prevStep} />,
    },
  ];

  async function handleLogout() {
    try {
      await logout();
      queryClient.clear();
      router.push("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  }

  return (
    <div className={cn("relative p-14", isFullWidth ? "p-0" : "p-14")}>
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
    <Suspense fallback={<div className="p-14 text-center">Loading onboarding...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
