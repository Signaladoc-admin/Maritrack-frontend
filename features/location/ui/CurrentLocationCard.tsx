"use client";

import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card/Card";
import { CurrentLocationCardProps } from "../types";

export function CurrentLocationCard({ address, updatedAt, className }: CurrentLocationCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Location</CardTitle>
        <span className="text-xs text-[#667085]">Updated at {updatedAt}</span>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 rounded-2xl bg-[#F7F7F7] p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <MapPin className="h-5 w-5 text-[#FF736A]" />
          </div>
          <span className="text-lg font-bold text-[#1B3C73]">{address}</span>
        </div>
      </CardContent>
    </Card>
  );
}
