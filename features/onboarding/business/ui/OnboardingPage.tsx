"use client";

import { useState } from "react";
import InviteTeamMembersForm from "./InviteTeamMembersForm";
import PricingStep from "@/features/payments/ui/PricingStep";
import BusinessDetailsForm from "./BusinessDetailsForm";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useCreateZone, useParentZones } from "@/features/mdm-sync/model/useMdmSync";
import { useActiveSubscription } from "@/features/payments/model/usePayments";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { useGetBusiness } from "@/entities/business/model/useBusiness";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetFullBusinessDetails } from "../model/useGetBusinessDetails";
import { useGetTeamMembers } from "@/entities/business/model/useTeamMembers";

export default function OnboardingPage() {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const [step, setStep] = useState(1);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const { businessProfile, isLoadingBusinessProfile } = useGetFullBusinessDetails();
  const { data: initialTeamMembers, isPending: isLoadingTeamMembers } = useGetTeamMembers();

  const { user } = useAuth();
  const { data: userProfile } = useUserProfile();
  const { zoneId } = user || {};

  const { data: parentZones } = useParentZones();

  const [freePlanChosen, setFreePlanChosen] = useState(false);

  const { data: subscriptionData } = useActiveSubscription(userProfile?.zoneId?.[0]?.id!);
  const hasPaid = subscriptionData?.active ?? freePlanChosen ?? false;

  const canProceed = hasPaid || freePlanChosen;

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSelectPlan = () => {
    setFreePlanChosen(true);
  };

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
      {!hasPaid ? (
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
          {step === 2 && (
            <InviteTeamMembersForm
              onBack={handlePreviousStep}
              isLoadingTeamMembers={isLoadingTeamMembers}
              // initialTeamMembers={
              //   (initialTeamMembers as any)?.staff
              //     .filter((member: any) => member?.user?.email !== userProfile?.email)
              //     .map((member: any) => ({
              //       ...member,
              //       id: member.id,
              //       location: member.location || "N/A",
              //       email: member?.user?.email || "N/A",
              //     })) ?? []
              // }
            />
          )}
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
