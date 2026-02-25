"use client";

import { childrenProfiles } from "@/app/(in-app)/child/[child]/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar/Avatar";
import { DeviceUsageCard } from "@/shared/ui/DeviceStatusCard/DeviceStatusCard";
import { EmptyDeviceCard } from "@/shared/ui/DeviceStatusCard/EmptyDevice";
import Back from "@/shared/ui/go-back";
import IconWrapper from "@/shared/ui/IconWrapper";
import { H2, H3, P } from "@/shared/ui/typography";
import { Delete, DeleteIcon, Edit2, Edit2Icon, Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const ChildDevices = () => {
  const { child } = useParams();

  const childData = childrenProfiles.find((item) => item.id === child);

  console.log(childData);
  return (
    <div>
      <div className="">
        <Back label="Go back" />

        <div className="my-[3rem] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-[80px] w-[80px]">
              <AvatarImage src={childData?.image} alt={childData?.name} />
              <AvatarFallback>{childData?.name}</AvatarFallback>
            </Avatar>

            <div className="">
              <H3 className="text-[#1B3C73]">{childData?.name}</H3>
              <P className="leading-0 text-slate-400">January 10, 16</P>
            </div>
          </div>

          <div className="flex gap-4">
            <IconWrapper
              action={() => console.log("Edit")}
              icon={<Edit2Icon className="h-4 w-4" />}
            />
            <IconWrapper
              action={() => console.log("Edit")}
              icon={<Trash2Icon className="h-4 w-4 text-[#B34740]" />}
            />
          </div>
        </div>

        <P className="mb-[1rem] font-medium">Select a device to view</P>
        <div className="grid w-full grid-cols-2 gap-4">
          <DeviceUsageCard
            deviceName="Mide's iPhone"
            status="active"
            percentage={37.5}
            device="Google Pixel 9"
            isRow={false}
          />
          <DeviceUsageCard
            deviceName="Mide's iPhone"
            status="locked"
            percentage={100}
            device="Iphone 14"
            isRow={false}
          />
          <DeviceUsageCard
            deviceName="Mide's iPhone"
            status="locked"
            percentage={100}
            device="Iphone 14"
            isRow={false}
          />
          <EmptyDeviceCard onClick={() => console.log("Pair new device")} />
        </div>
      </div>
    </div>
  );
};

export default ChildDevices;
