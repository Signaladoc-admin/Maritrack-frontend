"use client";

import { useState } from "react";
import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationHistoryCard } from "./LocationHistoryCard";
import { MapCard } from "@/features/general/ui/map-card";
import GeofencingCard, { GeofencingLocation } from "@/shared/ui/GeofencingCard/GeofencingCard";

const historyItems = [
  { id: "1", name: "Lekki Phase 1", duration: "2h 33mins", date: "January 1, 2026" },
  { id: "2", name: "Ikeja", duration: "1h 45mins", date: "February 15, 2026" },
  { id: "3", name: "Victoria Island", duration: "2h 10mins", date: "March 3, 2026" },
  { id: "4", name: "Surulere", duration: "1h 30mins", date: "April 20, 2026" },
  { id: "5", name: "Yaba", duration: "1h 55mins", date: "May 5, 2026" },
];

const geofencingLocations: GeofencingLocation[] = [
  { id: "1", name: "Oshodi, Lagos", radius: "2km" },
  { id: "2", name: "Maryland, Lagos", radius: "1km" },
  { id: "3", name: "Ikeja, Lagos", radius: "3km" },
];

export function LocationView() {
  const [isGeofencingActive, setIsGeofencingActive] = useState(true);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <CurrentLocationCard address="23 Ebinpejo Lane, Idumota, Lagos" updatedAt="3:12pm" />
          <LocationHistoryCard items={historyItems} onSeeMore={() => console.log("See more")} />
          <GeofencingCard
            locations={geofencingLocations}
            isActive={isGeofencingActive}
            onSetGeofencing={() => setIsGeofencingActive(!isGeofencingActive)}
          />
        </div>

        {/* Right Column - Map */}
        <div className="lg:col-span-7">
          <MapCard />
        </div>
      </div>
    </div>
  );
}
