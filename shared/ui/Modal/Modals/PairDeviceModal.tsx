"use client";

import * as React from "react";
import { QrCode, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Modal/dialog"; // Adjust path as needed

export function PairDeviceModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <div className="grid md:grid-cols-2">
          {/* Left Column: Instructions */}
          <div className="flex flex-col justify-center p-8 md:p-10">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-left text-2xl font-bold text-[#1B3C73]">
                Pair new device
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 text-base text-slate-600">
              <p>Scan the QR code on your child's device to connect it.</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Open the app on the child's phone</li>
                <li>Tap Pair device</li>
                <li>Scan the QR code to finish setup</li>
              </ul>
            </div>

            <div className="mt-8 flex items-center gap-2 rounded border bg-slate-50/50 p-2 text-xs text-slate-400">
              <Lock className="h-3 w-3" />
              <span>Pairing is secure and only works with your approval.</span>
            </div>
          </div>

          {/* Right Column: QR Code Visual */}
          <div className="flex flex-col items-center justify-center bg-[#EF897B] p-8 text-center text-white md:p-10">
            <div className="mb-4 rounded-3xl bg-white/20 p-6">
              {/* Using an icon as a placeholder for the actual QR image */}
              <QrCode className="h-32 w-32 text-white" />
            </div>
            <p className="max-w-[200px] font-medium">
              Scan this QR Code on the child's device to pair
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
