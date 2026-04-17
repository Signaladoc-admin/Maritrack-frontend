"use client";

import { useState, useEffect, useRef } from "react";
import InviteTeamMembersForm from "./InviteTeamMembersForm";
import PricingStep from "@/features/payments/ui/PricingStep";
import BusinessDetailsForm from "./BusinessDetailsForm";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useCreateZone } from "@/features/mdm-sync/model/useMdmSync";
import { PageLoader } from "@/shared/ui/loader";

export default function OnboardingPage() {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const [hasPaid, setHasPaid] = useState(false);
  const [step, setStep] = useState(1);

  const { data: user, isLoading: isLoadingUser, isFetching: isFetchingUser } = useUserProfile();
  const { mutateAsync: createZone, isPending: isCreatingZone } = useCreateZone();
  const zoneCreationAttempted = useRef(false);

  const zoneId = user?.zoneId?.[0]?.id;

  // useEffect(() => {
  //   async function getBusinessProfile() {
  //     const res = await getBusinessProfileAction(user?.businessId!);
  //     console.log("res", res);
  //   }
  //   getBusinessProfile();
  // }, [user]);

  useEffect(() => {
    if (!isLoadingUser && user && !zoneId && !zoneCreationAttempted.current) {
      zoneCreationAttempted.current = true;
      createZone(undefined).catch(() => {
        zoneCreationAttempted.current = false;
      });
    }
  }, [isLoadingUser, user, zoneId]);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  if (!hasPaid)
    return (
      <PricingStep
        onBack={() => {}}
        onSuccess={() => setHasPaid(true)}
        isShowingBackButton={false}
        isShowingSignOutButton={true}
      />
    );

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
      {step === 1 && <BusinessDetailsForm onNext={handleNextStep} />}
      {step === 2 && <InviteTeamMembersForm onBack={handlePreviousStep} />}
    </div>
  );
}
