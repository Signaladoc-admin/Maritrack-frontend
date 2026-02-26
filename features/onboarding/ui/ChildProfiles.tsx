import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { Plus } from "lucide-react";
import { useState } from "react";
import { IChildProfile } from "../types";
import CreateChildProfileForm from "./CreateChildProfileForm";
import { ChildProfileCard } from "@/shared/ui/cards/child-profile-card";
import PricingStep from "./PricingStep";
import PairingQRStep from "./PairingQRStep";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useParent } from "@/entities/parents/model/useParents";
import { useCreateChild, useUpdateChild } from "@/entities/children/model/useChildren";
import { createChildAction, getChildByIdAction } from "@/entities/children/api/child.actions";
import { getProfileAction } from "@/entities/user/api/user.actions";
import {
  createZoneAction,
  getQrCodeAction,
  getParentZonesAction,
} from "@/features/mdm-sync/api/mdm-sync.actions";
import { useParentZones } from "@/features/mdm-sync/model/useMdmSync";
import { useEffect, useCallback } from "react";
import { useToast } from "@/shared/ui/toast";
import { Loader } from "@/shared/ui/loader";
import { useSearchParams, useRouter } from "next/navigation";

export default function ChildrenProfiles({
  goToPrevStep,
  goToNextStep,
}: {
  goToPrevStep: () => void;
  goToNextStep: () => void;
}) {
  const [childProfiles, setChildProfiles] = useState<IChildProfile[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: user } = useUserProfile();
  const { data: parent } = useParent(user?.parentId!);

  const { data: parentZonesRes, isLoading: isFetchingChildren } = useParentZones();
  const { mutateAsync: createChild, isPending: isCreatingChild } = useCreateChild();
  const { mutateAsync: updateChild, isPending: isUpdatingChild } = useUpdateChild();
  const { toast } = useToast();

  useEffect(() => {
    if (Array.isArray(parentZonesRes)) {
      // Extract children from the zones list
      const extractedChildren = parentZonesRes.flatMap(
        (zone: any) => zone.parentChildren?.map((pc: any) => pc.child) || []
      );
      // Remove any undefined/null values that might have snuck in and format
      setChildProfiles(extractedChildren.filter(Boolean) as any);
    }
  }, [parentZonesRes]);

  const [currentView, setCurrentView] = useState<"form" | "list" | "pricing" | "qr">("list");
  const [selectedChildProfile, setSelectedChildProfile] = useState<IChildProfile | null>(null);
  const [pendingChild, setPendingChild] = useState<IChildProfile | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const handleAddChild = useCallback(
    async (data: IChildProfile) => {
      if (!parent?.id) {
        toast({ title: "Error", message: "Parent profile not found", type: "error" });
        return;
      }

      try {
        const result = await createChildAction({ ...data, parentId: parent.id });
        console.log(result);

        const res: any = await createChild({
          name: data.name,
          age: Number(data.age),
          gender: data.gender as any,
          parentId: parent.id,
        });
        console.log(res);

        if (res) {
          const newChildInfo = { ...data, ...res };
          setChildProfiles((prev) => [...prev, newChildInfo as any]);
          setPendingChild(newChildInfo as any);

          try {
            // 1. Get child details to extract onboardingCode
            const childDetails = await getChildByIdAction(res.id);
            const onboardingCode = (childDetails as any).onboardingCode;

            // 2. Create zone completely conditionally if one doesn't exist AND we now have a child
            if (!user?.zoneId?.length) {
              await createZoneAction({});
            }

            // 3. Get updated user profile which now contains the newly created zoneId
            const updatedProfile = await getProfileAction();
            const zoneId = (updatedProfile as any).zoneId?.[0]?.id || user?.zoneId?.[0]?.id;

            // 4. Fetch the QR code
            if (zoneId && onboardingCode) {
              const qrCodeRes = await getQrCodeAction(zoneId, onboardingCode);
              if (qrCodeRes.success) {
                setQrCodeData(qrCodeRes.data as string);
              }
            }
          } catch (e) {
            console.error("Failed to generate QR code", e);
          }
        } else {
          const dummyChild = { ...data, id: "pending-" + crypto.randomUUID() };
          setChildProfiles((prev) => [...prev, dummyChild]);
          setPendingChild(dummyChild);
        }
        toast({
          title: "Success",
          message: "Child profile created successfully!",
          type: "success",
        });
        setCurrentView("qr");
      } catch (e: any) {
        const errorMsg = e.message || "";
        toast({
          title: "Error",
          message: errorMsg || "Failed to create child profile",
          type: "error",
        });
      }
    },
    [parent, user, createChild, toast]
  );

  const handleEditChild = async (data: IChildProfile) => {
    try {
      if (data.id && !data.id.startsWith("pending-")) {
        await updateChild({
          id: data.id,
          data: { name: data.name, age: Number(data.age), gender: data.gender as any },
        } as any);
      }
      setChildProfiles((prev) => prev.map((child) => (child.id === data.id ? data : child)));
      setCurrentView("list");
      toast({ title: "Success", message: "Child profile updated", type: "success" });
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

  if (currentView === "form") {
    return (
      <CreateChildProfileForm
        onCancel={() => {
          setSelectedChildProfile(null);
          setCurrentView("list");
        }}
        onAddChild={selectedChildProfile ? handleEditChild : handleAddChild}
        initialData={selectedChildProfile || undefined}
        goToNextStep={goToNextStep}
        isLoading={selectedChildProfile ? isUpdatingChild : isCreatingChild}
      />
    );
  }

  if (currentView === "pricing") {
    return <PricingStep onBack={() => setCurrentView("list")} onSuccess={() => goToNextStep()} />;
  }

  if (currentView === "qr") {
    return (
      <PairingQRStep
        childName={pendingChild?.name || "Child"}
        qrCode={qrCodeData}
        onBack={() => setCurrentView("list")}
        onComplete={handleFinishPairing}
      />
    );
  }

  async function handleSubmit() {
    if (!childProfiles.length) {
      toast({
        title: "Error",
        message: "Please add at least one child profile",
        type: "error",
      });
      return;
    }

    // Create children
    await Promise.all(
      childProfiles.map((child) => {
        createChild({
          name: child.name,
          age: Number(child.age),
          gender: child.gender as any,
          parentId: user?.parentId || parent?.id || "",
        });
      })
    );

    toast({
      title: "Success",
      message: "Children profiles created successfully!",
      type: "success",
    });

    goToNextStep();
  }

  return (
    <div className="space-y-5">
      <Header title="Create your children's profile" subtitle="Create your children's accounts" />

      <div className="space-y-4">
        {childProfiles.map((childProfile, index) => (
          <ChildProfileCard
            key={childProfile.id || index}
            onEdit={() => handleOpenForm(childProfile)}
            onViewQR={() => {
              setPendingChild(childProfile);
              setCurrentView("qr");
            }}
            {...childProfile}
          />
        ))}
      </div>

      <button
        onClick={() => handleOpenForm()}
        className="border-muted-foreground/20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed bg-neutral-50/50 py-12 transition-colors hover:bg-neutral-100/50"
      >
        <Plus className="text-primary/70 h-5 w-5" />
        <span className="font-medium text-slate-500">Add a profile</span>
      </button>

      <div className="flex gap-4 pt-4">
        <Button
          variant="secondary"
          className="text-primary flex-1 bg-neutral-100 hover:bg-neutral-200"
          onClick={goToPrevStep}
        >
          Previous
        </Button>
        <Button
          disabled={!childProfiles.length}
          className="bg-primary hover:bg-primary/90 flex-1"
          onClick={() => setCurrentView("pricing")}
        >
          Next
        </Button>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => {
            if (!childProfiles.length) {
              toast({
                title: "Error",
                message: "Please add at least one child profile",
                type: "error",
              });
              return;
            }
            goToNextStep();
          }}
          variant="link"
          className="font-normal text-slate-500"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}
