"use client";

import * as React from "react";
import { ChevronRight, ChevronDown, ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/Button/button";

export function SetTimeLimitModal({
  open,
  onOpenChange,
  appName = "WhatsApp",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appName?: string;
}) {
  const [view, setView] = React.useState<"general" | "custom">("general");

  // Reset view when closing
  React.useEffect(() => {
    if (!open) setTimeout(() => setView("general"), 300);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 sm:max-w-lg">
        <DialogHeader className="mb-4">
          {view === "custom" && (
            <button
              onClick={() => setView("general")}
              className="mb-2 flex items-center text-sm font-medium text-[#1B3C73] hover:underline"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to general
            </button>
          )}
          <DialogTitle className="text-xl font-bold text-slate-900">
            {view === "general" ? `Set Limit for ${appName}` : `Set Limit for ${appName} (custom)`}
          </DialogTitle>
        </DialogHeader>

        {view === "general" ? (
          // === GENERAL VIEW ===
          <div className="space-y-6">
            <div className="space-y-4 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Time</span>
                <span className="font-medium text-[#1B3C73]">1hr, everyday</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hour</label>
                  <SelectBox value="1" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minutes</label>
                  <SelectBox value="0" />
                </div>
              </div>
            </div>

            <button
              onClick={() => setView("custom")}
              className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-4 transition-colors hover:bg-slate-100"
            >
              <span className="text-lg font-medium">Customize days</span>
              <ChevronRight className="h-5 w-5 text-[#1B3C73]" />
            </button>
          </div>
        ) : (
          // === CUSTOM VIEW ===
          <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
              (day, i) => (
                <div key={day} className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{day}</span>
                    <span className="text-sm font-medium text-[#1B3C73]">1hr</span>
                  </div>
                  {/* Only showing dropdowns for the first item to mimic the screenshot, or all if needed */}
                  {i === 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <SelectBox value="1" />
                      <SelectBox value="0" />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button
            className="h-12 w-full bg-[#1B3C73] text-base"
            onClick={() => onOpenChange(false)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Simple Helper Component for the dropdowns
function SelectBox({ value }: { value: string }) {
  return (
    <div className="relative">
      <select className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 text-slate-600 focus:border-[#1B3C73] focus:outline-none">
        <option>{value}</option>
        <option>2</option>
        <option>3</option>
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}
