"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { ChevronRight, X } from "lucide-react";
import { useToast } from "@/shared/ui/toast";

interface SetLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
}

export function SetLimitModal({ isOpen, onClose, appName }: SetLimitModalProps) {
  const { toast } = useToast();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl">Set Limit for {appName}</DialogTitle>
        </DialogHeader>

        {/* Time Settings */}
        <div className="rounded-xl bg-slate-50 p-6 dark:bg-slate-900/50">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-medium text-slate-900 dark:text-slate-100">Time</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              1hr, everyday
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Hour Select */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-500">Hour</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                  <option>0</option>
                  <option selected>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <ChevronRight className="pointer-events-none absolute top-3 right-3 h-4 w-4 rotate-90 text-slate-400" />
              </div>
            </div>

            {/* Minute Select */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-500">Minutes</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                  <option selected>0</option>
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                </select>
                <ChevronRight className="pointer-events-none absolute top-3 right-3 h-4 w-4 rotate-90 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Customize Days */}
        <button className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-4 text-left transition-colors hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900">
          <span className="font-medium text-slate-900 dark:text-slate-100">Customize days</span>
          <ChevronRight className="h-5 w-5 text-slate-400" />
        </button>

        {/* Footer Actions */}
        <div className="mt-4">
          <Button
            className="w-full bg-[#1b3c73] hover:bg-[#152e5a] dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => {
              toast({
                type: "success",
                title: "Limit Set",
                message: `Time limit updated successfully for ${appName}.`,
              });
              onClose();
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
