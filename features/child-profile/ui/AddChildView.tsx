"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateChildProfileForm from "@/features/onboarding/personal/ui/CreateChildProfileForm";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useParentStore } from "@/shared/stores/user.store";
import { useCreateChild } from "@/entities/children/model/useChildren";
import { getProfileAction } from "@/entities/user/api/user.actions";
import { createZoneAction } from "@/features/mdm-sync/api/mdm-sync.actions";
import { mdmSyncKeys, useParentZones } from "@/features/mdm-sync/model/useMdmSync";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/ui/toast";
import { IChildProfile } from "@/features/onboarding/personal/types";
import PairingQRStep from "@/features/onboarding/personal/ui/PairingQRStep";

export default function AddChildView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useUserProfile();
  const storedParentId = useParentStore((state) => state.parentId);
  const activeParentId = user?.parentId || storedParentId;
  const { toast } = useToast();

  const { mutateAsync: createChild, isPending: isCreatingChild } = useCreateChild();

  const { data: parentZonesRes, isLoading: isFetchingChildren } = useParentZones({
    enabled: !!activeParentId,
  });

  const [pendingChild, setPendingChild] = useState<IChildProfile | null>(null);

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

        console.log("newChildInfo:", newChildInfo);

        // Ensure zone exists
        let activeZoneId = user?.zoneId?.[0]?.id;
        if (!activeZoneId) {
          await createZoneAction();
          const updatedProfile = await getProfileAction();
          activeZoneId = (updatedProfile as any).zoneId?.[0]?.id;
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

  if (pendingChild) {
    return (
      <div className="max-w-2xl">
        <PairingQRStep
          entityId={pendingChild.id!}
          entityName={pendingChild.name || "Child"}
          onboardingCode={pendingChild.onboardingCode}
          zoneId={user?.zoneId?.[0]?.mdmZoneId}
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
