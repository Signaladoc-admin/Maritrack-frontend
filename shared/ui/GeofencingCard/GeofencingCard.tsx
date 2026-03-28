"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../Card/Card";
import { MapPin, MapPinIcon } from "lucide-react";
import { Button } from "../Button/button";

export interface GeofencingLocation {
  id: string;
  name: string;
  radius: string;
}

interface GeofencingCardProps {
  locations?: GeofencingLocation[];
  isActive?: boolean;
  onSetGeofencing?: () => void;
}

const GeofencingCard = ({
  locations = [],
  isActive = false,
  onSetGeofencing,
}: GeofencingCardProps) => {
  return (
    <Card>
      <CardContent className="p-[1rem]">
        <div className="w-[30rem] rounded-[20px] bg-[#EEEEEE] p-16 py-12">
          {isActive && locations.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-[#667085]">
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {location.name}, {location.radius} radius
                    </span>
                  </div>
                ))}
              </div>
              <Button variant={"white"} className="w-fit" onClick={onSetGeofencing}>
                Set Geofencing
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <MapPinIcon />
              <p className="text-[#667085]">No geofencing set yet</p>
              <Button variant={"white"} onClick={onSetGeofencing}>
                Set Geofencing
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeofencingCard;
