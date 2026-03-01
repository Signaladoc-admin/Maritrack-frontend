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
} from "@/features/mdm-sync/api/mdm-sync.actions";
import { useParentZones } from "@/features/mdm-sync/model/useMdmSync";
import { useEffect, useCallback } from "react";
import { useToast } from "@/shared/ui/toast";
import { Loader } from "@/shared/ui/loader";
import { useSearchParams, useRouter } from "next/navigation";
import { useParentStore } from "@/shared/stores/user-store";

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

  const { data: user, isLoading: isLoadingUser } = useUserProfile();
  const storedParentId = useParentStore((state) => state.parentId);
  const activeParentId = user?.parentId || storedParentId;

  console.log(activeParentId);

  const { data: parent } = useParent(activeParentId!);

  const { data: parentZonesRes, isLoading: isFetchingChildren } = useParentZones({
    enabled: !!activeParentId,
  });
  console.log(parentZonesRes);
  const { mutateAsync: createChild, isPending: isCreatingChild } = useCreateChild();
  const { mutateAsync: updateChild, isPending: isUpdatingChild } = useUpdateChild();
  const { toast } = useToast();

  const { data: userProfile } = useUserProfile();

  console.log(userProfile);



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

  console.log(user);

  const handleAddChild = useCallback(
    async (data: IChildProfile) => {
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
        console.log(res);

        if (res) {
          const newChildInfo = { ...data, ...res };
          setChildProfiles((prev) => [...prev, newChildInfo as any]);
          setPendingChild(newChildInfo as any);

          try {
            // STEP 1: Wait briefly for backend replicas to stabilize the new child record
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // STEP 2: GET the child details so we have the onboarding code
            // (Cache is explicitly disabled in child.actions.ts for this)
            let onboardingCode = res?.onboardingCode;
            if (!onboardingCode) {
              const childDetails = await getChildByIdAction(res.id);
              onboardingCode = (childDetails as any)?.onboardingCode;
            }

            if (!onboardingCode) {
              throw new Error("Could not retrieve child onboarding code from server.");
            }

            // STEP 3: Create a Zone if the parent doesn't have one yet.
            // The API requires a Zone ID to generate a QR code.
            let activeZoneId = user?.zoneId?.[0]?.id;
            if (!activeZoneId) {
              // Action checks if it exists internally and safely creates it
              await createZoneAction({});

              // Refresh user profile so we have the newly created zoneId
              const updatedProfile = await getProfileAction();
              activeZoneId = (updatedProfile as any).zoneId?.[0]?.id;
            }

            if (!activeZoneId) {
              throw new Error("Failed to create or retrieve a valid Zone ID for pairing.");
            }

            // STEP 4: Fetch the pairing QR Code
            const qrCodeRes = await getQrCodeAction(activeZoneId, onboardingCode);
            if (qrCodeRes.success) {
              setQrCodeData(qrCodeRes.data as string);
              setCurrentView("qr");
              toast({
                title: "Success",
                message: "Child profile created successfully!",
                type: "success",
              });
            } else {
              throw new Error(qrCodeRes.error || "Failed to generate QR code");
            }
          } catch (e: any) {
            console.error("Pairing sequence failed:", e);
            toast({
              title: "Partial Success",
              message:
                "Child profile created, but QR generation failed. Please try pairing from the list.",
              type: "warning", // Using warning because child WAS created, just QR failed
            });
            setCurrentView("list");
          }
        }
      } catch (e: any) {
        const errorMsg = e.message || "";
        toast({
          title: "Error",
          message: errorMsg || "Failed to create child profile",
          type: "error",
        });
      }
    },
    [parent, activeParentId, createChild, toast]
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
          parentId: activeParentId || parent?.id || "",
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

  const isInitialLoading = isLoadingUser || (!!activeParentId && isFetchingChildren);

  console.log(isFetchingChildren);

  if (isInitialLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Header title="Create your children's profile" subtitle="Create your children's accounts" />
      <div>
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
        {childProfiles.length === 0 && (
          <button
            onClick={() => handleOpenForm()}
            className="border-muted-foreground/20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed bg-neutral-50/50 py-12 transition-colors hover:bg-neutral-100/50"
          >
            <Plus className="text-primary/70 h-5 w-5" />
            <span className="font-medium text-slate-500">Add a profile</span>
          </button>
        )}
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
    </div>
  );
}
