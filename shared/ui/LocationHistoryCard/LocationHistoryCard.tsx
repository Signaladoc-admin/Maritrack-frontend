"use client";

import * as React from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";
import { Button } from "../Button/button";

// --- Data Structure ---
interface LocationItem {
  id: string;
  name: string; // Head text
  timestamp: string; // Time and date text
  date: string;
}

interface RecentLocationCardProps {
  className?: string;
  onSeeMore?: () => void;
}

const recentLocations: LocationItem[] = [
  {
    id: "1",
    name: "Ikeja City Mall",
    timestamp: "2:30 PM",
    date: "February 1, 2026",
  },
  {
    id: "2",
    name: "Maryland Mall",
    timestamp: "4:15 PM",
    date: "February 1, 2026",
  },
  {
    id: "3",
    name: "Unilag Campus",
    timestamp: "10:00 AM",
    date: "February 1, 2026",
  },
];

export function RecentLocationCard({ className, onSeeMore }: RecentLocationCardProps) {
  return (
    <Card className="h-full w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>Recent Location</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {recentLocations.map((location) => (
          <div
            key={location.id}
            className="flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition-all"
          >
            {/* Icon Container */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEEEEE]">
              <MapPin className="h-5 w-5 text-[#FF736A]" />
            </div>

            {/* Text Content */}
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                {/* Head Text */}
                <span className="text-sm font-bold text-[#212529]">{location.name}</span>

                {/* Time and Date Text */}
                <span className="text-xs font-medium text-[#667085]">{location.timestamp}</span>
              </div>
              <div className="">
                <span className="text-xs font-medium text-[#667085]">{location.date}</span>
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={onSeeMore}
          variant={"link"}
          className="mt-2 text-center text-sm font-semibold text-[#667085] transition-colors hover:underline"
        >
          See 5 more
        </Button>

        {recentLocations.length === 0 && (
          <div className="py-4 text-center text-sm text-[#667085]">No recent locations found.</div>
        )}
      </CardContent>
    </Card>
  );
}
