"use client";

import DeviceCard from "@/features/parents/ui/DeviceCard";
import { Skeleton } from "@/shared/ui/skeleton";
import { useDragScroll } from "@/shared/hooks/useDragScroll";
import { useRouter } from "next/navigation";

interface ParentDevicesSectionProps {
  device: any;
  deviceId: string;
  childName?: string;
  isLoadingChild: boolean;
}

export function ParentDevicesSection({ device, deviceId, childName, isLoadingChild }: ParentDevicesSectionProps) {
  const { scrollContainerRef, events } = useDragScroll();
  const router = useRouter();

  if (isLoadingChild) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-[24px] bg-[#081223]">
        <Skeleton className="h-full w-full rounded-[24px]" />
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      {...events}
      className="flex h-full w-full cursor-grab items-stretch gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] *:min-w-full *:shrink-0 active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
    >
      {device ? (
        <DeviceCard
          device={{ ...device, deviceId }}
          childName={childName}
          onClick={() => router.push(`/devices/${deviceId}`)}
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded-[24px] border border-dashed border-[#1B3C73] bg-[#081223] text-[#8198BF]">
          No devices found for this child
        </div>
      )}
    </div>
  );
}
