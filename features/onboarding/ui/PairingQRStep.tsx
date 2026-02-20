"use client";

import { Header } from "@/shared/ui/layout/header";
import { Button } from "@/shared/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface PairingQRStepProps {
  childName: string;
  onBack: () => void;
  onComplete: () => void;
}

export default function PairingQRStep({ childName, onBack, onComplete }: PairingQRStepProps) {
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
        <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-[40px] bg-[#FF7E7E]/90 p-10 shadow-2xl transition-transform hover:scale-[1.02]">
          <div className="flex h-full w-full items-center justify-center rounded-[32px] bg-white/20 p-8 backdrop-blur-sm">
            {/* Using a placeholder for QR code, in a real app this would be a generated QR */}
            <div className="grid h-full w-full grid-cols-2 gap-4 opacity-90">
              <div className="rounded-2xl border-8 border-white"></div>
              <div className="rounded-2xl border-8 border-white"></div>
              <div className="rounded-2xl border-8 border-white"></div>
              <div className="flex items-center justify-center rounded-2xl border-8 border-white">
                <div className="h-10 w-10 rounded-lg bg-white"></div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-end justify-center pb-8">
            <p className="text-center font-bold tracking-wide text-white">
              Scan this QR Code on the child's device to pair
            </p>
          </div>
        </div>

        <Button
          onClick={onComplete}
          className="w-full max-w-[400px] bg-[#1B3C73] hover:bg-[#1B3C73]/90"
        >
          Finish Pairing
        </Button>
      </div>
    </div>
  );
}
