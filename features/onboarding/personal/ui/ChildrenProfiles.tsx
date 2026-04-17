import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { useState } from "react";
import { IChildProfile } from "../types";
import CreateChildProfileForm from "./CreateChildProfileForm";
import { ChildProfileCard, ChildProfileCardSkeleton } from "@/shared/ui/cards/child-profile-card";

import PairingQRStep from "./PairingQRStep";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import {
  useCreateChild,
  useUpdateChild,
  useDeleteChild,
} from "@/entities/children/model/useChildren";
import { getProfileAction } from "@/entities/user/api/user.actions";
import { createZoneAction } from "@/features/mdm-sync/api/mdm-sync.actions";
import { useParentZones, mdmSyncKeys } from "@/features/mdm-sync/model/useMdmSync";
import { useEffect } from "react";
import { useToast } from "@/shared/ui/toast";
import { useParentStore } from "@/shared/stores/user.store";
import { useQueryClient } from "@tanstack/react-query";
import NewChildProfileButton from "@/features/child-profile/ui/NewChildProfileButton";
import { useActiveSubscription } from "@/features/payments/model/usePayments";
import PricingStep from "@/features/payments/ui/PricingStep";

export default function ChildrenProfiles({
  goToNextStep,
  onViewChange,
}: {
  goToNextStep: () => void;
  onViewChange?: (view: "form" | "list" | "pricing" | "qr") => void;
}) {
  const [childProfiles, setChildProfiles] = useState<IChildProfile[]>([]);
  const queryClient = useQueryClient();

  const { data: user, isLoading: isLoadingUser } = useUserProfile();
  const storedParentId = useParentStore((state) => state.parentId);
  const activeParentId = user?.parentId || storedParentId;

  const { data: parentZonesRes, isLoading: isFetchingChildren } = useParentZones({
    enabled: !!activeParentId,
  });

  const zoneId = user?.zoneId?.[0]?.id;
  const { data: subscriptionData } = useActiveSubscription(zoneId);
  const hasPaid = subscriptionData?.active ?? false;

  const [planChosen, setPlanChosen] = useState(false);
  const canProceed = hasPaid || planChosen;
  console.log(canProceed);

  const { mutateAsync: createChild, isPending: isCreatingChild } = useCreateChild();
  const { mutateAsync: updateChild, isPending: isUpdatingChild } = useUpdateChild();
  const { mutateAsync: deleteChild } = useDeleteChild();
  const { toast } = useToast();

  useEffect(() => {
    if (Array.isArray(parentZonesRes)) {
      const extractedChildren = parentZonesRes.flatMap(
        (zone: any) => zone.parentChildren?.map((pc: any) => pc.child) || []
      );
      setChildProfiles(extractedChildren.filter(Boolean) as any);
    }
  }, [parentZonesRes]);

  const [currentView, setCurrentView] = useState<"form" | "list" | "pricing" | "qr">("list");

  useEffect(() => {
    onViewChange?.(currentView);
  }, [currentView, onViewChange]);

  const isInitialLoading = isLoadingUser || (!!activeParentId && isFetchingChildren);

  const [selectedChildProfile, setSelectedChildProfile] = useState<IChildProfile | null>(null);
  const [pendingChild, setPendingChild] = useState<IChildProfile | null>(null);

  function onNextStep() {
    if (canProceed) {
      goToNextStep();
    } else {
      if (!pendingChild && childProfiles.length > 0) {
        setPendingChild(childProfiles[0] as any);
      }
      setCurrentView("pricing");
    }
  }

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

        setChildProfiles((prev) => [...prev, newChildInfo as any]);
        setPendingChild(newChildInfo as any);

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

        if (canProceed) {
          setCurrentView("qr");
        } else {
          setCurrentView("pricing");
        }
      }
    } catch (e: any) {
      toast({
        title: "Error",
        message: e.message || "Failed to create child profile",
        type: "error",
      });
    }
  };

  const handleEditChild = async (data: IChildProfile) => {
    try {
      if (data.id && !data.id.startsWith("pending-")) {
        await updateChild({
          id: data.id,
          name: data.name,
          age: Number(data.age),
          gender: data.gender as any,
        } as any);
      }
      setChildProfiles((prev) => prev.map((child) => (child.id === data.id ? data : child)));
      toast({ title: "Success", message: "Child profile updated", type: "success" });
      setCurrentView("list");
    } catch (e: any) {
      toast({ title: "Error", message: e.message || "Failed to update profile", type: "error" });
    }
  };

  const handleFinishPairing = () => {
    setPendingChild(null);
    setCurrentView("list");
  };

  const handleOpenForm = (profile?: IChildProfile) => {
    setSelectedChildProfile(profile || null);
    setCurrentView("form");
  };

  const handleViewQR = (childProfile: IChildProfile) => {
    setPendingChild(childProfile);
    setCurrentView(canProceed ? "qr" : "pricing");
  };

  const handlePairingRollback = async () => {
    if (pendingChild?.id) {
      try {
        await deleteChild(pendingChild.id);
        setChildProfiles((prev) => prev.filter((cp) => cp.id !== pendingChild.id));
      } catch (deleteError) {
        console.error("Failed to delete child during rollback:", deleteError);
      }
    }
    setPendingChild(null);
    setCurrentView("list");
  };

  if (currentView === "form") {
    return (
      <CreateChildProfileForm
        onCancel={() => {
          setSelectedChildProfile(null);
          setCurrentView("list");
        }}
        onAddChild={selectedChildProfile ? handleEditChild : handleAddChild}
        initialData={selectedChildProfile || undefined}
        isLoading={selectedChildProfile ? isUpdatingChild : isCreatingChild}
      />
    );
  }

  if (currentView === "pricing") {
    return (
      <PricingStep
        onBack={() => setCurrentView("list")}
        onSuccess={() => {
          setPlanChosen(true);
          setCurrentView(pendingChild ? "qr" : "list");
          toast({
            title: "Plan Selected",
            message: "You can now pair your children's devices",
            type: "success",
          });
        }}
      />
    );
  }

  if (currentView === "qr") {
    // let onboardingCode = pendingChild?.onboardingCode;
    // if (!onboardingCode && pendingChild?.id) {
    //   const zoneWithChild = parentZonesRes?.find((zone: any) =>
    //     zone.parentChildren?.some((pc: any) => pc.childId === pendingChild.id)
    //   );
    //   const childRecord = zoneWithChild?.parentChildren?.find(
    //     (pc: any) => pc.childId === pendingChild.id
    //   )?.child;
    //   onboardingCode = childRecord?.onboardingCode;
    // }
    // const activeZoneId = user?.zoneId?.[0]?.id || parentZonesRes?.[0]?.id;
    return (
      <PairingQRStep
        childId={pendingChild?.id!}
        childName={pendingChild?.name || "Child"}
        onboardingCode={pendingChild?.onboardingCode}
        zoneId={user?.zoneId?.[0]?.id}
        onBack={() => setCurrentView("list")}
        onComplete={handleFinishPairing}
        onRollback={handlePairingRollback}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <Header title="Create your children's profile" subtitle="Create your children's accounts" />
      </div>
      <div>
        <div className="space-y-4">
          {isInitialLoading ? (
            <ChildProfileCardSkeleton />
          ) : (
            childProfiles.map((childProfile, index) => (
              <ChildProfileCard
                key={childProfile.id || index}
                onEdit={() => handleOpenForm(childProfile)}
                onViewQR={() => handleViewQR(childProfile)}
                {...childProfile}
              />
            ))
          )}
        </div>
        {!isInitialLoading && childProfiles.length === 0 && (
          <NewChildProfileButton onClick={() => handleOpenForm()} />
        )}
        <div className="flex gap-4 pt-4">
          <Button
            disabled={!childProfiles.length}
            className="bg-primary hover:bg-primary/90 w-full"
            onClick={onNextStep}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
