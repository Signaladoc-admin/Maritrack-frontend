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
        <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-[40px] bg-[#FF7E7E] p-8 shadow-2xl transition-transform hover:scale-[1.02]">
          <div className="flex h-full w-full items-center justify-center rounded-[32px] bg-transparent p-4">
            <div className="grid h-full w-full grid-cols-2 gap-4">
              {/* Top-left marker */}
              <div className="rounded-[24px] bg-white p-3">
                <div className="h-full w-full rounded-[14px] bg-[#FF7E7E]"></div>
              </div>
              {/* Top-right marker */}
              <div className="rounded-[24px] bg-white p-3">
                <div className="h-full w-full rounded-[14px] bg-[#FF7E7E]"></div>
              </div>
              {/* Bottom-left marker */}
              <div className="rounded-[24px] bg-white p-3">
                <div className="h-full w-full rounded-[14px] bg-[#FF7E7E]"></div>
              </div>
              {/* Bottom-right specialized frame */}
              <div className="relative">
                <div className="absolute inset-0 m-2 flex items-center justify-center">
                  <div className="absolute top-0 left-0 h-6 w-6 rounded-tl-xl border-t-[7px] border-l-[7px] border-white"></div>
                  <div className="absolute top-0 right-0 h-6 w-6 rounded-tr-xl border-t-[7px] border-r-[7px] border-white"></div>
                  <div className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-xl border-b-[7px] border-l-[7px] border-white"></div>
                  <div className="absolute right-0 bottom-0 h-6 w-6 rounded-br-xl border-r-[7px] border-b-[7px] border-white"></div>
                  <div className="h-5 w-5 rounded-lg bg-white/90"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-end justify-center pb-8">
            {/* The text is now outside or below in the image? Actually it's inside in my prev version, but in the image it's below the inner box. */}
          </div>
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
