"use client";

import { useState, useEffect } from "react";
import InviteTeamMembersForm from "./InviteTeamMembersForm";
import PricingStep from "@/features/payments/ui/PricingStep";
import BusinessDetailsForm from "./BusinessDetailsForm";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useCreateZone } from "@/features/mdm-sync/model/useMdmSync";
import { useActiveSubscription } from "@/features/payments/model/usePayments";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";

export default function OnboardingPage() {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const [step, setStep] = useState(1);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const { data: user, isLoading: isLoadingUser } = useUserProfile();
  const zoneId = user?.zoneId?.[0]?.id;

  const [freePlanChosen, setFreePlanChosen] = useState(false);

  const { data: subscriptionData } = useActiveSubscription(zoneId);
  const hasPaid = subscriptionData?.active ?? freePlanChosen ?? false;

  const canProceed = hasPaid || freePlanChosen;

  const { mutateAsync: createZone, isPending: isCreatingZone } = useCreateZone();

  // useEffect(() => {
  //   async function getBusinessProfile() {
  //     const res = await getBusinessProfileAction(user?.businessId!);
  //     console.log("res", res);
  //   }
  //   getBusinessProfile();
  // }, [user]);

  useEffect(() => {
    if (!isLoadingUser && user && !zoneId) {
      createZone(undefined);
    }
  }, [isLoadingUser, user, zoneId]);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  console.log(step);
  const handleSelectPlan = () => {
    console.log("Plan selected");
    setFreePlanChosen(true);
    setStep(2);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground top-4 right-6 h-auto p-0 font-medium hover:bg-transparent sm:fixed sm:top-4 sm:right-6"
          onClick={() => setShowSignOutModal(true)}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </Button>
      </div>
      {!hasPaid ? (
        <PricingStep onBack={() => {}} onSuccess={handleSelectPlan} isShowingBackButton={false} />
      ) : (
        <div className="mx-auto max-w-2xl py-5">
          {step === 1 && <BusinessDetailsForm onNext={handleNextStep} />}
          {step === 2 && <InviteTeamMembersForm onBack={handlePreviousStep} />}
        </div>
      )}

      {/* Sign out modal */}
      <ConfirmationModal
        open={showSignOutModal}
        onOpenChange={setShowSignOutModal}
        title="Are you sure you want to sign out?"
        confirmText="Sign out"
        onConfirm={() => logout()}
        variant="destructive"
        loading={isLoggingOut}
        loadingText="Signing out..."
      />
    </div>
  );
}
