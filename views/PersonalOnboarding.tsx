"use client";
import ChildrenProfiles from "@/features/onboarding/personal/ui/ChildrenProfiles";
import ParentalControlSetup from "@/features/parents/ui/ParentalControlSetup";
import { setOnboardedAction } from "@/features/onboarding/api/onboarding.actions";
import { createZoneAction } from "@/features/mdm-sync/api/mdm-sync.actions";
import { useParentZones, mdmSyncKeys } from "@/features/mdm-sync/model/useMdmSync";
import { MultiStepForm } from "@/shared/ui/multi-step-form";
import { useState, useEffect, Suspense } from "react";
import { PageLoader } from "@/shared/ui/loader";
import { useRouter } from "next/navigation";
import { useQueryState, parseAsInteger } from "nuqs";
import { useVerifyPayment } from "@/features/payments/model/usePayments";
import { useToast } from "@/shared/ui/toast";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/shared/lib/utils";

function OnboardingContent() {
  const router = useRouter();
  const { data: userProfile } = useUserProfile();
  const { data: parentZones } = useParentZones();
  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const [reference, setReference] = useQueryState("reference");
  const [isFullWidth, setIsFullWidth] = useState(false);

  const { mutateAsync: verifyPayment } = useVerifyPayment();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const { toast } = useToast();

  // Create zone on first landing if one doesn't exist yet
  useEffect(() => {
    const hasZone = Array.isArray(parentZones) && parentZones.length > 0;
    if (userProfile && !hasZone) {
      createZoneAction().then(() => {
        queryClient.invalidateQueries({ queryKey: mdmSyncKeys.parentZones });
      });
    }
  }, [userProfile, parentZones]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!reference) return;
    verifyPayment(reference)
      .then(() => {
        toast({ title: "Success", message: "Payment verified successfully", type: "success" });
        setReference(null);
        setCurrentStep(0);
      })
      .catch((err) => {
        toast({
          title: "Verification Failed",
          message: err.message || "Could not verify payment",
          type: "error",
        });
        setReference(null);
        setCurrentStep(0);
      });
  }, [reference]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextStep = () => setCurrentStep((p) => Math.min((p ?? 0) + 1, 1));
  const prevStep = () => setCurrentStep((p) => Math.max((p ?? 0) - 1, 0));
  const handleStepClick = (index: number) => setCurrentStep(index);

  async function handleLogout() {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    }
  }

  async function handleOnboardingComplete() {
    await setOnboardedAction();
    router.push("/dashboard");
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
        <ParentalControlSetup handleSubmit={handleOnboardingComplete} goToPrevStep={prevStep} />
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
          currentStep={currentStep ?? 0}
          onStepClick={handleStepClick}
          isFullWidth={isFullWidth}
        />
      </div>
    </div>
  );
}

export default function PersonalOnboarding() {
  return (
    <Suspense fallback={<PageLoader />}>
      <OnboardingContent />
    </Suspense>
  );
}
