"use client";

import { useState } from "react";
import { CurrentLocationCard } from "./CurrentLocationCard";
import { MapCard } from "@/features/general/ui/map-card";
import GeofencingCard, {
  FormattedGeofenceLocation,
} from "@/shared/ui/GeofencingCard/GeofencingCard";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

const historyItems = [
  { id: "1", name: "Lekki Phase 1", duration: "2h 33mins", date: "January 1, 2026" },
  { id: "2", name: "Ikeja", duration: "1h 45mins", date: "February 15, 2026" },
  { id: "3", name: "Victoria Island", duration: "2h 10mins", date: "March 3, 2026" },
  { id: "4", name: "Surulere", duration: "1h 30mins", date: "April 20, 2026" },
  { id: "5", name: "Yaba", duration: "1h 55mins", date: "May 5, 2026" },
];

import { GeofencingModal } from "@/shared/ui/Modal/Modals/GeofencingModal";
import { useGetBusiness } from "@/entities/business/model/useBusiness";
import { useChild } from "@/entities/children/model/useChildren";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useQueryState } from "nuqs";
import { useGetRestrictions } from "@/features/mdm-sync/model/useRestrictions";

export function LocationView({ deviceId }: { deviceId: string }) {
  const [isGeofencingModalOpen, setIsGeofencingModalOpen] = useState(false);
  const [initialLocations, setInitialLocations] = useState<FormattedGeofenceLocation[]>([]);

  const { data: hardwareData } = useDeviceDetail(deviceId, "hardware", {
    enabled: !!deviceId,
  });

  const { data: restrictionsResponse } = useGetRestrictions(deviceId, { enabled: !!deviceId });

  const location = hardwareData?.deviceDetails?.lastKnownLocation;
  let lat: number | undefined = undefined;
  let lon: number | undefined = undefined;

  if (location && typeof location === "object") {
    const rawLat = (location as any).latitude ?? (location as any).lat;
    const rawLon = (location as any).longitude ?? (location as any).lng ?? (location as any).lon;
    if (typeof rawLat === "number" && !isNaN(rawLat)) lat = rawLat;
    if (typeof rawLon === "number" && !isNaN(rawLon)) lon = rawLon;
  } else if (typeof location === "string") {
    try {
      const parsed = JSON.parse(location);
      const rawLat = parsed.latitude ?? parsed.lat;
      const rawLon = parsed.longitude ?? parsed.lng ?? parsed.lon;
      if (typeof rawLat === "number" && !isNaN(rawLat)) lat = rawLat;
      if (typeof rawLon === "number" && !isNaN(rawLon)) lon = rawLon;
    } catch {}
  }

  // organizationName: business name for business accounts, child's name for parent accounts.
  const { user } = useAuth();
  const businessId = user?.businessId ?? "";
  const [childId] = useQueryState("childId", { defaultValue: "" });

  const { data: business } = useGetBusiness(businessId, { enabled: !!businessId });
  const { data: child } = useChild(childId, { enabled: !!childId });
  const organizationName = business?.name ?? child?.name ?? "";

  const geoFencingLocations = restrictionsResponse?.data?.geofences || [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <CurrentLocationCard lat={lat} lon={lon} />
          <GeofencingCard
            locations={geoFencingLocations}
            onSetGeofencing={(locs) => {
              setInitialLocations(locs);
              setIsGeofencingModalOpen(true);
            }}
          />
        </div>

        {/* Right Column - Map */}
        <MapCard deviceId={deviceId} />
      </div>

      <GeofencingModal
        open={isGeofencingModalOpen}
        onOpenChange={setIsGeofencingModalOpen}
        initialLocations={initialLocations}
      />
    </div>
  );
}
