"use client";

import React from "react";
import { Card, CardContent, CardTitle } from "../Card/Card";
import { Loader2 } from "lucide-react";
import { Button } from "../Button/button";
import { GeofenceLocation } from "@/features/mdm-sync/types";
import { useReverseGeocode } from "@/features/mdm-sync/model/useRestrictions";

export type FormattedGeofenceLocation = GeofenceLocation & { name: string };

interface GeofencingCardProps {
  locations?: GeofenceLocation[];
  onSetGeofencing?: (locations: FormattedGeofenceLocation[]) => void;
}

const GeofencingCard = ({ locations = [], onSetGeofencing }: GeofencingCardProps) => {
  const { data: resolvedNames, isLoading: isResolving } = useReverseGeocode(
    locations.map(({ lat, lng }) => ({ lat, lng }))
  );

  const formattedLocations = locations.map((loc, i) => ({
    ...loc,
    name: resolvedNames?.[i] ?? `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`,
  }));

  const hasLocations = locations.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground font-medium">Geofencing</p>
      <Card>
        <CardContent className="p-4">
          <div className="rounded-[20px] bg-[#EEEEEE] px-8 py-10">
            {hasLocations ? (
              <div className="flex flex-col gap-6 text-xs! font-medium">
                {isResolving ? (
                  <div className="flex items-center gap-2 text-[#667085]">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Loading locations…</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {formattedLocations.map((location) => (
                      <p key={location.id} className="text-base text-[#667085]">
                        {location.name.slice(0, 20)}
                        {location.name.length > 20 && "..."}, {location.radius}km radius
                      </p>
                    ))}
                  </div>
                )}
                <Button
                  variant="white"
                  className="w-fit font-semibold text-[#1B3C73]"
                  onClick={() => onSetGeofencing?.(formattedLocations)}
                >
                  Update geofencing
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-6">
                <p className="text-[#667085]">No geofencing set yet</p>
                <Button variant="white" onClick={() => onSetGeofencing?.([])}>
                  Set Geofencing
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeofencingCard;
