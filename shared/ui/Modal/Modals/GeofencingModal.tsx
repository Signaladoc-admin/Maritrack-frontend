"use client";

import * as React from "react";
import { Search, ChevronRight, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/Button/button";

export function GeofencingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold text-slate-900">Set Geofencing</DialogTitle>
          <p className="text-sm text-slate-500">2/4</p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Existing Saved Location (Collapsed) */}
          <div className="flex cursor-pointer items-center justify-between rounded-lg border border-transparent bg-slate-50 p-4 hover:border-slate-200">
            <div>
              <h4 className="font-semibold text-slate-900">Oshodi, Lagos (2km radius)</h4>
              <p className="text-xs text-slate-400">Location 1</p>
            </div>
            <ChevronRight className="h-5 w-5 text-[#1B3C73]" />
          </div>

          {/* Active Edit Form (Expanded) */}
          <div className="space-y-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-900">Location 2</h4>
              <button className="rounded p-1 text-[#D95D55] hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Enter location</label>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="h-11 w-full rounded-md border border-slate-200 pr-3 pl-10 focus:ring-2 focus:ring-[#1B3C73] focus:outline-none"
                  placeholder="Enter Location here"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Set radius (in KM)</label>
              <input
                className="h-11 w-full rounded-md border border-slate-200 px-3 focus:ring-2 focus:ring-[#1B3C73] focus:outline-none"
                placeholder="0"
                type="number"
              />
            </div>
          </div>

          {/* Add Button */}
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 py-3 text-slate-600 transition-colors hover:border-[#1B3C73] hover:text-[#1B3C73]">
            <Plus className="h-4 w-4" />
            <span className="font-medium">Add another location</span>
          </button>
        </div>

        <DialogFooter className="mt-4">
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
