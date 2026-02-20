"use client";

import BasicInformationForm from "@/features/onboarding/ui/BasicInformationForm";
import ChildrenProfiles from "@/features/onboarding/ui/ChildProfiles";
import ParentalControlSetup from "@/features/onboarding/ui/ParentalControlSetup";
import { MultiStepForm } from "@/shared/ui/multi-step-form";
import { useState } from "react";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 2));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

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
