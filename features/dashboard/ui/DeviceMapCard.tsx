"use client";

import { CardWrapper } from "@/shared/ui/card-wrapper";
import Badge from "@/shared/ui/Badge";
import { Calendar } from "lucide-react";
import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("./DeviceMapClient").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[200px] bg-[#f5f6f8] rounded-md animate-pulse flex items-center justify-center">
        <span className="text-neutral-400 text-sm">Loading map...</span>
      </div>
    ),
  }
);

interface DeviceMapCardProps {
  title: string;
  timingLabel?: string;
}

export default function DeviceMapCard({ title, timingLabel = "This month" }: DeviceMapCardProps) {
  return (
    <CardWrapper variant="outline" className="p-5 lg:p-6 flex flex-col h-full w-full">
      <div className="flex items-center justify-between z-20 mb-4">
        <h3 className="font-semibold text-neutral-800 text-sm">{title}</h3>
        <Badge
          variant="secondary"
          content={
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
              <Calendar size={13} />
              <span className="text-[11px]">{timingLabel}</span>
            </div>
          }
        />
      </div>

      <div className="w-full flex-1 min-h-[200px] rounded-lg overflow-hidden relative">
        <Map />
      </div>
    </CardWrapper>
  );
}
