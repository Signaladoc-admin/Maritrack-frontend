"use client";

import { Header } from "@/shared/ui/layout/header";
import { Button } from "@/shared/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface PairingQRStepProps {
  childName: string;
  qrCode?: string | null;
  onBack: () => void;
  onComplete: () => void;
}

export default function PairingQRStep({
  childName,
  qrCode,
  onBack,
  onComplete,
}: PairingQRStepProps) {
  return (
    <div className="space-y-7">
      <Button variant="link" onClick={onBack} className="flex items-center gap-1! px-0">
        <ChevronLeft className="h-6! w-6! text-orange-500" /> Go back
      </Button>

      <Header
        title={`Pair ${childName}'s device`}
        subtitle="Pair your child's account by scanning the code"
      />

      <div className="flex flex-col items-center justify-center space-y-8 py-10">
        <div className="relative flex aspect-square w-full max-w-[320px] items-center justify-center overflow-hidden rounded-[40px] border border-slate-200 bg-slate-50 p-6 shadow-2xl transition-transform hover:scale-[1.02]">
          {qrCode ? (
            <img
              src={qrCode.startsWith("data:image") ? qrCode : `data:image/png;base64,${qrCode}`}
              alt="QR Code"
              className="h-full w-full rounded-2xl object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 text-slate-400">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-orange-500" />
              <p className="text-sm font-medium">Generating QR Code...</p>
            </div>
          )}
        </div>

        <p className="max-w-[280px] text-center text-sm leading-relaxed font-medium text-slate-500">
          Scan this QR Code on the child's device to pair
        </p>

        <Button
          onClick={onComplete}
          className="w-full max-w-[320px] bg-[#1B3C73] py-6 text-lg font-semibold hover:bg-[#1B3C73]/90"
        >
          Finish Pairing
        </Button>
      </div>
    </div>
  );
}
