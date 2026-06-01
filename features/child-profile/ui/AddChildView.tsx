"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateChildProfileForm from "@/features/onboarding/personal/ui/CreateChildProfileForm";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useParentStore } from "@/shared/stores/user.store";
import { useCreateChild } from "@/entities/children/model/useChildren";
import { getProfileAction } from "@/entities/user/api/user.actions";
import { createZoneAction } from "@/features/mdm-sync/api/mdm-sync.actions";
import { mdmSyncKeys } from "@/features/mdm-sync/model/useMdmSync";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/ui/toast";
import { IChildProfile } from "@/features/onboarding/personal/types";
import PairingQRStep from "@/features/onboarding/personal/ui/PairingQRStep";
import { useActiveSubscription } from "@/features/payments/model/usePayments";
import LoaderText from "@/shared/ui/LoaderText";
import { Button } from "@/shared/ui/button";

export default function AddChildView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useUserProfile();
  const storedParentId = useParentStore((state) => state.parentId);
  const activeParentId = user?.parentId || storedParentId;
  const { toast } = useToast();

  const { mutateAsync: createChild, isPending: isCreatingChild } = useCreateChild();

  const [pendingChild, setPendingChild] = useState<IChildProfile | null>(null);

  const zoneId = user?.zone.id;

  const { data: activeSubscriptionRes, status: subscriptionStatus } =
    useActiveSubscription(zoneId);

  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

  useEffect(() => {
    const subscriptionSettled = subscriptionStatus === "success" || subscriptionStatus === "error";

    if (subscriptionSettled) {
      setIsLoadingSubscription(false);
    }
  }, [subscriptionStatus]);

  useEffect(() => {
    if (!activeSubscriptionRes?.data?.active && !isLoadingSubscription) {
      toast({ title: "No active subscription", message: "You need an active subscription to add a child.", type: "error" });
    }
  }, [isLoadingSubscription, activeSubscriptionRes]);

  const handleAddChild = async (data: IChildProfile) => {
    if (!activeParentId) {
      toast({ title: "Error", message: "Parent profile not found", type: "error" });
      return;
    }

    try {
      const res: any = await createChild({
        name: data.name,
        age: Number(data.age),
        gender: data.gender as any,
        parentId: activeParentId,
      });

      if (res) {
        const onboardingCode = res.onboardingCode || res.data?.onboardingCode;
        const newChildInfo = {
          ...data,
          ...res,
          id: res.id || res.data?.id,
          onboardingCode,
        };

        // Ensure zone exists
        let activeZoneId = user?.zone.id;
        if (!activeZoneId) {
          await createZoneAction();
          const updatedProfile = await getProfileAction();
          activeZoneId = (updatedProfile as any).zone.id;
          queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        }

        queryClient.invalidateQueries({ queryKey: mdmSyncKeys.parentZones });
        toast({ title: "Success", message: "Child profile created", type: "success" });
        setPendingChild(newChildInfo as any);
      }
    } catch (e: any) {
      toast({
        title: "Error",
        message: e.message || "Failed to create child profile",
        type: "error",
      });
    }
  };

  if (isLoadingSubscription) {
    return (
      <LoaderText
        text="Checking subscription status..."
      />
    )
  }

  if (!activeSubscriptionRes?.data?.active) {
    return (
      <>
        <div className="flex flex-col gap-4 justify-center items-center min-h-[70vh]">
          <h3 className="text-xl font-bold">No active subscription</h3>
          <p className="text-muted-foreground text-center">You need an active subscription to add a child.</p>
          <Button href="/plans/subscribe" className="mt-4">Upgrade</Button>
        </div>
      </>
    )
  }

  if (pendingChild) {
    return (
      <div className="max-w-2xl">
        <PairingQRStep
          entityId={pendingChild.id!}
          entityName={pendingChild.name || "Child"}
          onboardingCode={pendingChild.onboardingCode}
          onBack={() => setPendingChild(null)}
          onComplete={() => router.push("/children")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <CreateChildProfileForm
        onCancel={() => router.back()}
        onAddChild={handleAddChild}
        isLoading={isCreatingChild}
      />
    </div>
  );
}
