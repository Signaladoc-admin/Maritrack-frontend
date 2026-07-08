"use client";
import ChildrenProfiles from "@/features/onboarding/personal/ui/ChildrenProfiles";
import { setOnboardedAction } from "@/features/onboarding/api/onboarding.actions";
import { MultiStepForm } from "@/shared/ui/multi-step-form";
import { useState, Suspense } from "react";
import { PageLoader } from "@/shared/ui/loader";
import { useRouter } from "next/navigation";
import { useQueryState, parseAsInteger } from "nuqs";
import VerifyPayment from "@/features/payments/ui/VerifyPayment";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { cn } from "@/shared/lib/utils";
import DeviceConfigurationSetup from "@/features/parents/ui/DeviceConfigurationSetup";
import DevicesConfigurationSetup from "@/features/parents/ui/DeviceConfigurationSetup";

function OnboardingContent() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const [isFullWidth, setIsFullWidth] = useState(false);

  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const [reference] = useQueryState("reference");

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
        <DevicesConfigurationSetup
          handleSubmit={handleOnboardingComplete}
          goToPrevStep={prevStep}
        />
      ),
    },
  ];

  // While a Paystack reference is present, show the shared (guarded) verification screen.
  // It fires verification exactly once per reference and clears the URL params on success —
  // avoiding the duplicate "Payment verified" toasts the old inline effect produced.
  if (reference) return <VerifyPayment reference={reference} />;

  return (
    <div className={cn("relative", isFullWidth ? "p-0" : "p-8 lg:p-14")}>
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
