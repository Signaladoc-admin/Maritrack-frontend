"use client";

import * as React from "react";
import { Smartphone, Tablet } from "lucide-react";
import { Button } from "@/shared/ui/Button/button";

interface DeviceEmptyStateProps {
  onPairClick: () => void;
}

export function DeviceEmptyState({ onPairClick }: DeviceEmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[24px] border border-slate-100 bg-[#F8F9FA] px-4 py-20 text-center">
      {/* Visual Graphic */}
      <div className="relative mb-6">
        <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B3C73]/5 blur-xl" />
        <div className="relative flex items-center justify-center">
          <Tablet
            className="absolute top-2 -left-6 h-20 w-20 rotate-[-12deg] text-[#1B3C73] opacity-20"
            strokeWidth={1.5}
          />
          <Smartphone
            className="relative z-10 h-24 w-24 fill-white text-[#1B3C73]"
            strokeWidth={1.5}
          />
        </div>
      </div>

      <h2 className="mb-2 text-xl font-bold text-[#1B3C73]">No devices paired yet</h2>
      <p className="mb-8 max-w-[280px] text-sm leading-relaxed text-slate-500">
        Click the button below to pair a new device to this account and start monitoring.
      </p>

      <Button
        size="lg"
        className="w-full max-w-[200px] bg-[#1B3C73] font-semibold shadow-lg shadow-[#1B3C73]/20 hover:bg-[#1B3C73]/90"
        onClick={onPairClick}
      >
        Pair Device
      </Button>
    </div>
  );
}
