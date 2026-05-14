"use client";

import { LocationView } from "@/features/location/ui/LocationView";
import { LocationSkeleton } from "@/features/device/ui/DeviceTabsSkeletons";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

export default function LocationPage() {
  const params = useParams<{ device: string }>();
  const { isPending } = useDeviceDetail(params?.device || "", "hardware", {
    enabled: !!params?.device,
  });

  if (isPending) return <LocationSkeleton />;

  return <LocationView deviceId={params?.device || ""} />;
}
