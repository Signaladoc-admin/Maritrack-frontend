"use client";

import { useState, useEffect } from "react";
import InviteTeamMembersForm from "./InviteTeamMembersForm";
import PricingStep from "@/features/payments/ui/PricingStep";
import BusinessDetailsForm from "./BusinessDetailsForm";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { createBusinessZoneAction } from "@/features/mdm-sync/api/mdm-sync.actions";
import { useBusinessZones } from "@/features/mdm-sync/model/useMdmSync";
import { useActiveSubscription } from "@/features/payments/model/usePayments";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { useGetFullBusinessDetails } from "../model/useGetBusinessDetails";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import VerifyPayment from "@/features/payments/ui/VerifyPayment";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function OnboardingPage() {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const [step, setStep] = useState(1);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const { businessProfile, isLoadingBusinessProfile } = useGetFullBusinessDetails();

  const { data: userProfile } = useUserProfile();
  const queryClient = useQueryClient();

  const [freePlanChosen, setFreePlanChosen] = useState(false);

  const { user } = useAuth();
  const zoneId = user?.zoneId || "";

  const { data: subscriptionData, isLoading: isLoadingSubscription } =
    useActiveSubscription(zoneId);
  const hasPaid = !!subscriptionData?.data?.active;

  const canProceed = hasPaid || freePlanChosen;

  // True until we know whether the user has already paid — prevents pricing step flicker
  const isResolvingPaymentStatus = !!zoneId && isLoadingSubscription;

  const [reference] = useQueryState("reference");

  // Create business zone on first landing if one doesn't exist yet
  useEffect(() => {
    if (userProfile && !zoneId) {
      createBusinessZoneAction().then(() => {
        queryClient.invalidateQueries({ queryKey: ["mdm-sync", "businessZones"] });
      });
    }
  }, [userProfile, zoneId]);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);
  const handleSelectPlan = () => setFreePlanChosen(true);

  if (reference) return <VerifyPayment reference={reference} />;

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground top-4 right-6 h-auto p-0 font-medium hover:bg-transparent"
          onClick={() => setShowSignOutModal(true)}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </Button>
      </div>
      {isResolvingPaymentStatus ? null : !canProceed ? (
        <PricingStep onBack={() => {}} onSuccess={handleSelectPlan} isShowingBackButton={false} />
      ) : (
        <div className="mx-auto max-w-2xl py-5">
          {step === 1 && (
            <BusinessDetailsForm
              onNext={handleNextStep}
              businessProfile={businessProfile}
              isLoadingBusinessProfile={isLoadingBusinessProfile}
            />
          )}
          {step === 2 && <InviteTeamMembersForm onBack={handlePreviousStep} />}
        </div>
      )}

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
