"use client";

import { Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Modal/dialog"; // Adjust path as needed
import { useChildQrCode } from "@/features/mdm-sync/model/useQrCode";
import { useParams } from "next/navigation";
import { QRCodeCard } from "../../cards/qr-code-card";

export function PairDeviceModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const params = useParams<{ child: string }>();
  const child = params?.child;

  const {
    qrCodeSrc,
    isLoading: isGenerating,
    isError,
  } = useChildQrCode({ childId: child as string });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 left-0 h-dvh w-full max-w-none translate-x-0 translate-y-0 gap-0 overflow-auto rounded-none border-0 p-6 sm:top-[50%] sm:left-[50%] sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:max-w-3xl sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg sm:border sm:p-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Left Column: Instructions */}
          <div className="flex flex-col justify-between rounded-3xl bg-neutral-100 p-8 md:p-10">
            <div className="">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-left text-lg font-bold text-[#1B3C73]">
                  Pair new device
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm text-slate-600">
                <p>Scan the QR code on your child's device to connect it.</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Open the app on the child's phone</li>
                  <li>Tap Pair device</li>
                  <li>Scan the QR code to finish setup</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 rounded text-xs text-slate-400">
              <Lock className="h-3 w-3" />
              <span className="text-center">
                Pairing is secure and only works with your approval.
              </span>
            </div>
          </div>

          {/* Right Column: QR Code Visual */}
          <QRCodeCard
            src={qrCodeSrc!}
            isLoading={isGenerating}
            isError={isError}
            className="max-w-full min-w-[260px] p-4 sm:max-w-[500px] sm:p-8"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
