"use client";

import { Header } from "@/shared/ui/layout/header";
import { Button } from "@/shared/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/shared/ui/toast";

import { QRCodeCard } from "@/shared/ui/cards/qr-code-card";
import { useQrCode } from "@/features/mdm-sync/model/useQrCode";

interface PairingQRStepProps {
  childName: string;
  zoneId?: string;
  onboardingCode?: string;
  childId?: string;
  onBack: () => void;
  onComplete: () => void;
  onRollback?: () => void;
}

export default function PairingQRStep({
  childName,
  childId,
  zoneId,
  onboardingCode,
  onBack,
  onComplete,
  onRollback,
}: PairingQRStepProps) {
  const { toast } = useToast();
  const { qrCodeSrc, isLoading: isGenerating, isError, error } = useQrCode(childId!, {
    zoneId,
    onboardingCode,
  });

  useEffect(() => {
    if (isError && error) {
      console.error("QR Fetch failed:", error);
      toast({
        title: "Error",
        message: "Child profile could not be created. Please try again.",
        type: "error",
      });
      if (onRollback) {
        onRollback();
      } else {
        onBack();
      }
    }
  }, [isError, error, toast, onBack, onRollback]);

  return (
    <div className="space-y-7">
      <Button variant="link" onClick={onBack} className="flex items-center gap-1! px-0">
        <ChevronLeft className="h-6! w-6! text-orange-500" /> Go back
      </Button>

      <Header
        title={`Pair ${childName}'s device`}
        subtitle="Pair your child's account by scanning the code"
      />

      <div className="space-y-8">
        <button
          className="cursor-pointer"
          disabled={isGenerating || !qrCodeSrc}
          onClick={onComplete}
        >
          <QRCodeCard src={qrCodeSrc || ""} isLoading={isGenerating} />
        </button>

        {/* <Button
          disabled={isGenerating || !qrCodeSrc}
          onClick={onComplete}
          className="w-full max-w-[400px] rounded-2xl bg-[#1B3C73] py-7 text-lg font-semibold shadow-lg transition-all hover:bg-[#1B3C73]/90 active:scale-95"
        >
          Finish Pairing
        </Button> */}
      </div>
    </div>
  );
}
