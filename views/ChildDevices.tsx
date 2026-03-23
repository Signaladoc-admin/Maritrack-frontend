"use client";

import { childrenProfiles } from "@/app/(in-app)/child/[child]/data";
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
import { IChildProfile } from "@/features/onboarding/types";
import { useGetChild } from "@/features/child-profile/model/useGetChildrenProfile";

import { ChildDevicesSkeleton } from "./ChildDevicesSkeleton";

import { getInitials } from "@/shared/lib/utils";
import { PairDeviceModal } from "../ui/Modal/Modals/PairDeviceModal";
import { useChildStore } from "../stores/user-store";

const ChildDevices = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [isPairNewDeviceModalOpen, setIsPairNewDeviceModalOpen] = useState(false);

  const params = useParams<{ child: string }>();
  const child = params?.child;
  const router = useRouter();

  const { data: childData, isLoading } = useGetChild(child as string);

  if (isLoading) {
    return <ChildDevicesSkeleton />;
  }

  return (
    <div>
      <div className="">
        <Back label="Go back" />

        <div className="my-12 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-[80px] w-[80px]">
              <AvatarImage src={childData?.image} alt={childData?.name} />
              <AvatarFallback>{getInitials(childData?.name)}</AvatarFallback>
            </Avatar>

            <div className="">
              <H3 className="text-[#1B3C73]">{childData?.name}</H3>
              <P className="leading-0 text-slate-400">January 10, 16</P>
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
          <DeviceUsageCard
            deviceName="Mide's iPhone"
            status="active"
            percentage={37.5}
            device="Google Pixel 9"
            isRow={false}
            onClick={() => router.push(`/device/device-id`)}
          />
          <DeviceUsageCard
            deviceName="Mide's iPhone"
            status="locked"
            percentage={100}
            device="Iphone 14"
            isRow={false}
            onClick={() => router.push(`/device/device-id`)}
          />
          <DeviceUsageCard
            deviceName="Mide's iPhone"
            status="locked"
            percentage={100}
            device="Iphone 14"
            isRow={false}
            onClick={() => router.push(`/device/device-id`)}
          />
          <EmptyDeviceCard onClick={() => setIsPairNewDeviceModalOpen(true)} />
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
        description={`Deleting ${childData?.name || "this child"}’s profile cannot be reverted. Are you sure?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => console.log("Delete")}
        variant="destructive"
      />

      <PairDeviceModal open={isPairNewDeviceModalOpen} onOpenChange={setIsPairNewDeviceModalOpen} />
    </div>
  );
};

export default ChildDevices;
