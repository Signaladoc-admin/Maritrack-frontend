"use client";

import { useEffect } from "react";
import { useToast } from "@/shared/ui/toast";
import { QRCodeCard } from "@/shared/ui/cards/qr-code-card";
import { useQrCode } from "@/features/mdm-sync/model/useQrCode";
import { ShieldCheck } from "lucide-react";
import { BusinessStaff } from "../types";

interface BusinessPairingQRProps {
  staffMember: BusinessStaff;
  onComplete: () => void;
  onBack: () => void;
}

export default function BusinessPairingQR({
  staffMember,
  onComplete,
  onBack,
}: BusinessPairingQRProps) {
  const { toast } = useToast();
  const { qrCodeSrc, isLoading, isPending, isError, error } = useQrCode(staffMember.id!);

  const isGenerating = isLoading || isPending;

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error",
        message: "Failed to generate pairing code. Please try again.",
        type: "error",
      });
      onBack();
    }
  }, [isError, error, toast, onBack]);

  return (
    <div className="grid min-h-auto grid-cols-1 gap-6 sm:grid-cols-2 md:gap-x-14">
      {/* Left — instructions */}
      <div className="flex flex-col justify-between gap-6 rounded-xl bg-[#f7f7f7] p-6 py-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[#1B3C73]">Pair new device</h3>
            <p className="mt-1 text-sm text-slate-500">
              Scan the QR code on the new device to connect it.
            </p>
          </div>
          <ul className="list-inside list-disc space-y-2 pl-2 text-sm text-slate-600">
            <li>Open the app on the phone</li>
            <li>
              Tap <strong className="mx-0.5">Pair device</strong>
            </li>
            <li>Scan the QR code to finish setup</li>
          </ul>
        </div>

        <p className="flex items-start gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
          Pairing is secure and only works with your approval.
        </p>
      </div>

      {/* Right — QR code */}
      <div className="flex flex-col items-center gap-3">
        <button
          className="w-full min-w-[320px] cursor-pointer disabled:cursor-default"
          disabled={isGenerating || !qrCodeSrc}
          onClick={onComplete}
        >
          <QRCodeCard
            description="Scan this QR Code on the device to pair"
            src={qrCodeSrc || ""}
            isLoading={isGenerating}
          />
        </button>
      </div>
    </div>
  );
}
