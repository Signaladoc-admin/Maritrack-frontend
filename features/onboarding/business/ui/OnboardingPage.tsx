"use client";

import { useState } from "react";
import InviteTeamMembersForm from "./InviteTeamMembersForm";
import PricingStep from "@/features/payments/ui/PricingStep";
import { Header } from "@/shared/ui/layout/header";
import BusinessDetailsForm from "./BusinessDetailsForm";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { useBusiness } from "@/entities/business/model/useUpdateBusiness";
import { TeamMemberSchemaValues } from "../schema";
import useBusinessDetails from "../useBusinessDetails";

export default function OnboardingPage() {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const [hasPaid, setHasPaid] = useState(false);
  const [step, setStep] = useState(1);

  const { updateBusiness, isSubmitting } = useBusiness();
  const { businessData, handleAddBusinessDetails, handleAddTeamMember, handleRemoveTeamMember } =
    useBusinessDetails();

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  async function handleSubmit() {
    console.log("businessData", businessData);
    // await updateBusiness({
    //   id: "",
    //   ...(businessData as any),
    // });
  }

  if (!hasPaid) return <PricingStep onBack={() => {}} onSuccess={() => setHasPaid(true)} />;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-foreground absolute top-4 right-6 h-auto p-0 font-medium hover:bg-transparent"
        onClick={() => logout()}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Signing out..." : "Sign out"}
      </Button>
      {step === 1 && (
        <BusinessDetailsForm
          businessDetails={businessData}
          onNext={handleNextStep}
          onAddBusinessDetails={handleAddBusinessDetails}
        />
      )}
      {step === 2 && (
        <InviteTeamMembersForm
          onSubmit={handleSubmit}
          onBack={handlePreviousStep}
          onAddTeamMember={handleAddTeamMember}
          onRemoveTeamMember={handleRemoveTeamMember}
          teamMembers={businessData.teamMembers!}
        />
      )}
    </div>
  );
}
