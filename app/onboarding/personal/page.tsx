"use client";

import { useUserProfile } from "@/entities/user/model/useUserProfile";
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

function OnboardingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stepParam = searchParams?.get("step");
  const reference = searchParams?.get("reference");

  const [currentStep, setCurrentStep] = useState(() => {
    if (reference) return 1; // Payment is done, jump to step 2 (index 1)
    if (stepParam) return parseInt(stepParam, 10);
    return 0; // Default to children profiles
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

  const [isFullWidth, setIsFullWidth] = useState(false);

  useEffect(() => {
    if (stepParam && !reference) {
      const step = parseInt(stepParam, 10);
      setCurrentStep(step);
      // Reset full width when switching main steps
      setIsFullWidth(false);
    }
  }, [stepParam, reference]);

  useEffect(() => {
    if (reference) {
      verifyPayment(reference)
        .then(() => {
          toast({ title: "Success", message: "Payment verified successfully", type: "success" });
          router.replace("/onboarding/personal?step=1");
        })
        .catch((err) => {
          toast({
            title: "Verification Failed",
            message: err.message || "Could not verify payment",
            type: "error",
          });
          // If it fails, maybe drop them back to the children profiles mapping to restart payment
          router.replace("/onboarding/personal?step=0");
        });
    }
  }, [reference, verifyPayment, toast, router]);

  const steps = [
    {
      title: "Children Profiles",
      component: (
        <ChildrenProfiles
          goToNextStep={nextStep}
          onViewChange={(view) => setIsFullWidth(view === "pricing")}
        />
      ),
    },
    {
      title: "Parental Control & Consent Setup",
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
        <MultiStepForm steps={steps} currentStep={currentStep} isFullWidth={isFullWidth} />
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
