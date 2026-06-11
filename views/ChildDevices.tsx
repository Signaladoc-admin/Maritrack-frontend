"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar/Avatar";
import { DeviceUsageCard } from "@/shared/ui/DeviceStatusCard/DeviceStatusCard";
import { EmptyDeviceCard } from "@/shared/ui/DeviceStatusCard/EmptyDevice";
import Back from "@/shared/ui/go-back";
import IconWrapper from "@/features/child-profile/ui/IconWrapper";
import { AddEditChildModal } from "@/features/child-profile/ui/ChildDetailsModal";
import { H3, P } from "@/shared/ui/typography";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteChildModal } from "@/features/child-profile/ui/ChildDeleteModal";
import { IChildProfile } from "@/features/onboarding/personal/types";
import { useGetChild, useDeleteChild } from "@/features/child-profile/model/useGetChildrenProfile";
import { Child } from "@/features/child-profile/model/types";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

import { ChildDevicesSkeleton } from "./ChildDevicesSkeleton";

import { getInitials } from "@/shared/lib/utils";
import { PairDeviceModal } from "@/shared/ui/Modal/Modals/PairDeviceModal";

const ChildDevices = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [isPairNewDeviceModalOpen, setIsPairNewDeviceModalOpen] = useState(false);

  const params = useParams<{ child: string }>();
  const child = params?.child;
  const router = useRouter();

  const { data: childData, isLoading } = useGetChild(child as string);
  const { mutateAsync: deleteChild, isPending: isDeleting } = useDeleteChild();

  const typedChild = childData as Child | undefined;
  const device = typedChild?.device ?? null;

  const { data: hardwareData } = useDeviceDetail(device?.mdmId || "", "hardware", {
    enabled: !!device?.mdmId,
  });
  const batteryLevel = hardwareData?.data?.realTimeStats?.batteryLevel ?? 0;

  const handleDelete = async () => {
    if (!child) return;
    await deleteChild(child);
    setShowDelete(false);
    router.push("/children");
  };

  if (isLoading) {
    return <ChildDevicesSkeleton />;
  }

  return (
    <div>
      <div className="">
        <Back label="Go back" href="/dashboard" />

        <div className="my-12 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-[80px] w-[80px]">
              <AvatarImage src={typedChild?.imageUrl ?? undefined} alt={typedChild?.name} />
              <AvatarFallback>{getInitials(typedChild?.name)}</AvatarFallback>
            </Avatar>

            <div className="">
              <H3 className="text-[#1B3C73]">{typedChild?.name}</H3>
              <P className="leading-0 text-slate-400">
                {typedChild?.age ? `${typedChild.age} years old` : ""}
              </P>
            </div>
          </div>

          <div className="flex gap-4">
            <IconWrapper
              action={() => setShowEdit(true)}
              icon={<Edit2Icon className="h-7 w-7" />}
            />
            <IconWrapper
              action={() => setShowDelete(true)}
              icon={<Trash2Icon className="h-7 w-7 text-[#B34740]" />}
            />
          </div>
        </div>

        <P className="mb-4 font-medium">Select a device to view</P>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {device ? (
            <DeviceUsageCard
              deviceName={device.manufacturer || "Device"}
              status={device.deviceStatus === "ACTIVE" ? "active" : "locked"}
              percentage={batteryLevel}
              device={device.model || device.mdmId}
              isRow={false}
              onClick={() => router.push(`/devices/${device.mdmId}`)}
            />
          ) : (
            <EmptyDeviceCard onClick={() => setIsPairNewDeviceModalOpen(true)} />
          )}
        </div>
      </div>

      <AddEditChildModal
        open={showEdit}
        onOpenChange={setShowEdit}
        initialData={childData as IChildProfile}
      />

      <DeleteChildModal
        open={showDelete}
        onOpenChange={setShowDelete}
        data={childData as IChildProfile}
        title="Are you sure you want to delete this child profile?"
        description={`Deleting ${typedChild?.name || "this child"}'s profile cannot be reverted. Are you sure?`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={handleDelete}
        variant="destructive"
      />

      <PairDeviceModal open={isPairNewDeviceModalOpen} onOpenChange={setIsPairNewDeviceModalOpen} />
    </div>
  );
};

export default ChildDevices;
