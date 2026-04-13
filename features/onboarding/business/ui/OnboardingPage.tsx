"use client";

import { useState, useEffect, useRef } from "react";
import InviteTeamMembersForm from "./InviteTeamMembersForm";
import PricingStep from "@/features/payments/ui/PricingStep";
import BusinessDetailsForm from "./BusinessDetailsForm";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useCreateZone } from "@/features/mdm-sync/model/useMdmSync";
import { Loader } from "@/shared/ui/loader";
import {
  useCreateBusinessProfile,
  useGetBusinessProfile,
  useUpdateBusiness,
  useUpdateBusinessProfile,
} from "@/entities/business/model/useBusiness";
import useBusinessDetails from "../useBusinessDetails";
import { getBusinessProfileAction } from "@/entities/business/api/business-action";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const [hasPaid, setHasPaid] = useState(false);
  const [step, setStep] = useState(1);

  const { businessData, handleAddBusinessDetails, handleAddTeamMember, handleRemoveTeamMember } =
    useBusinessDetails();

  const { data: user, isLoading: isLoadingUser, isFetching: isFetchingUser } = useUserProfile();
  const { mutateAsync: createZone, isPending: isCreatingZone } = useCreateZone();
  const zoneCreationAttempted = useRef(false);

  const zoneId = user?.zoneId?.[0]?.id;

  const { createBusinessProfile } = useCreateBusinessProfile();
  const { updateBusinessProfile } = useUpdateBusinessProfile();
  const { data: businessProfile } = useGetBusinessProfile(user?.businessId!);

  console.log("businessProfile", businessProfile);

  const router = useRouter();
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

  async function handleSubmit() {
    const payload = {
      profile: businessData.businessProfile,
      departments: businessData.departments ?? [],
      locations: businessData.locations ?? [],
    };

    const res = businessProfile
      ? await updateBusinessProfile({ id: user?.businessId!, ...payload })
      : await createBusinessProfile(payload);
    if (res.status === true) {
      router.push("/dashboard");
    }
  }

  if (isLoadingUser || isCreatingZone || (isFetchingUser && !zoneId)) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <Loader size="lg" className="scale-150" />
      </div>
    );
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
      {step === 1 && <BusinessDetailsForm onNext={handleNextStep} />}
      {step === 2 && <InviteTeamMembersForm onBack={handlePreviousStep} />}
    </div>
  );
}
