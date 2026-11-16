"use client";

import DeviceCard from "@/features/parents/ui/DeviceCard";
import { Skeleton } from "@/shared/ui/skeleton";
import { useRouter } from "next/navigation";
import { Smartphone, Plus } from "lucide-react";

interface ParentDevicesSectionProps {
  device: any;
  deviceId: string;
  childName?: string;
  childId?: string;
  isLoadingChild: boolean;
  onPairDevice?: () => void;
}

export function ParentDevicesSection({
  device,
  deviceId,
  childName,
  childId,
  isLoadingChild,
  onPairDevice,
}: ParentDevicesSectionProps) {
  const router = useRouter();

  if (isLoadingChild) {
    return (
      <div className="flex h-60 w-full items-center justify-center">
        <Skeleton className="h-full w-full rounded-[var(--radius-lg)]" />
      </div>
    );
  }

  if (device) {
    const targetDeviceId = deviceId || device.mdmId || device.id || "";
    return (
      <div className="h-full">
        <DeviceCard
          device={{ ...device, deviceId: targetDeviceId }}
          childName={childName}
          childId={childId}
          onClick={() =>
            router.push(`/devices/${targetDeviceId}${childId ? `?childId=${childId}` : ""}`)
          }
        />
      </div>
    );
  }

  return (
    <div className="surface flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border-dashed border-[var(--card-line-strong)] p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] text-[var(--text-3)]">
        <Smartphone className="h-6 w-6" />
      </div>
      <div>
        <h4 className="mb-1 text-sm font-bold text-[var(--text-1)]">No device paired</h4>
        <p className="max-w-xs text-xs text-[var(--text-2)]">
          {childName
            ? `${childName} does not have an active device enrolled yet.`
            : "No active device enrolled for this child."}
        </p>
      </div>
      {onPairDevice && (
        <button
          type="button"
          onClick={onPairDevice}
          className="btn-primary mt-2 cursor-pointer px-4 py-2 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Pair new device
        </button>
      )}
    </div>
  );
}
