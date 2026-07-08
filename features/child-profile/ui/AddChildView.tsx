"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateChildProfileForm from "@/features/onboarding/personal/ui/CreateChildProfileForm";
import { useParentStore } from "@/shared/stores/user.store";
import { useCreateChild } from "@/entities/children/model/useChildren";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/ui/toast";
import { IChildProfile } from "@/features/onboarding/personal/types";
import { useActiveSubscription } from "@/features/payments/model/usePayments";
import LoaderText from "@/shared/ui/LoaderText";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function AddChildView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const storedParentId = useParentStore((state) => state.parentId);
  const activeParentId = user?.parentId || storedParentId;
  const zoneId = user?.zoneId;
  const { toast } = useToast();

  const { mutateAsync: createChild, isPending: isCreatingChild } = useCreateChild();

  const { data: activeSubscriptionRes, status: subscriptionStatus } = useActiveSubscription(
    zoneId as string
  );

  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

  useEffect(() => {
    const subscriptionSettled = subscriptionStatus === "success" || subscriptionStatus === "error";

    if (subscriptionSettled) {
      setIsLoadingSubscription(false);
    }
  }, [subscriptionStatus]);

  useEffect(() => {
    if (!activeSubscriptionRes?.data?.active && !isLoadingSubscription) {
      toast({
        title: "No active subscription",
        message: "You need an active subscription to add a child.",
        type: "error",
      });
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
        profilePicture: data.profilePicture as File,
      });

      if (res) {
        queryClient.invalidateQueries({ queryKey: ["children", "parent"] });
        toast({ title: "Success", message: "Child profile created", type: "success" });
        router.push("/children");
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
    return <LoaderText text="Checking subscription status..." />;
  }

  if (!activeSubscriptionRes?.data?.active) {
    return (
      <>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
          <h3 className="text-xl font-bold">No active subscription</h3>
          <p className="text-muted-foreground text-center">
            You need an active subscription to add a child.
          </p>
          <Button href="/plans/subscribe" className="mt-4">
            Upgrade
          </Button>
        </div>
      </>
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
