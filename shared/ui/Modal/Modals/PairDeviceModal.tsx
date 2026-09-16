"use client";

import { Lock, ShieldCheck, Check, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/Modal/dialog";
import { useQrCode } from "@/features/mdm-sync/model/useQrCode";
import { useParams } from "next/navigation";
import { QRCodeCard } from "../../cards/qr-code-card";

export function PairDeviceModal({
  open,
  onOpenChange,
  childId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  childId?: string;
}) {
  const params = useParams<{ child: string }>();
  const child = childId || params?.child;

  const { qrCodeSrc, isLoading: isGenerating, isError } = useQrCode(child as string);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[1050px] sm:max-w-[1050px] md:max-w-[1050px] p-6 sm:p-8 md:p-10 rounded-3xl bg-[var(--surface)] border border-[var(--card-line-strong)]">
        {/* Header */}
        <DialogHeader className="mb-2 space-y-1 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            <Sparkles className="h-3.5 w-3.5" />
            Device Enrollment
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-1)]">
            Pair new device
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed text-[var(--text-2)]">
            Follow the steps below on the target phone or tablet to pair and sync protection rules.
          </DialogDescription>
        </DialogHeader>

        {/* 2-Column Grid */}
        <div className="grid items-stretch gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8 pt-2">
          {/* Left Column: Numbered Instructions & Security Note */}
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 sm:p-6">
            <div className="space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-3)]">
                Setup Instructions
              </div>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)] text-xs font-bold text-[var(--text-1)]">
                    1
                  </span>
                  <div className="pt-0.5 text-xs text-[var(--text-2)]">
                    Open the <strong className="font-semibold text-[var(--text-1)]">Flentra Kids</strong> app on your child&apos;s device.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)] text-xs font-bold text-[var(--text-1)]">
                    2
                  </span>
                  <div className="pt-0.5 text-xs text-[var(--text-2)]">
                    Tap <strong className="font-semibold text-[var(--text-1)]">Pair device</strong> on the welcome screen.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-tint)] text-xs font-bold text-[var(--accent)]">
                    3
                  </span>
                  <div className="pt-0.5 text-xs text-[var(--text-2)]">
                    Scan this QR code with the camera to link the profile and finish setup.
                  </div>
                </li>
              </ol>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2.5 rounded-xl border border-[var(--card-line)] bg-[var(--card-raised)] px-3 py-2.5 text-[11px] text-[var(--text-3)]">
              <Lock className="h-4 w-4 shrink-0 text-[var(--accent)]" />
              <span>Pairing is encrypted and only activates with your parental authorization.</span>
            </div>
          </div>

          {/* Right Column: QR Code Visual & Action Buttons */}
          <div className="flex flex-col justify-between gap-5">
            <QRCodeCard
              src={qrCodeSrc || ""}
              isLoading={isGenerating}
              isError={isError}
              description="Scan this QR Code on your child’s device to pair"
              statusLabel="Ready to pair"
              className="h-full justify-center p-6"
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 inline-flex items-center justify-center rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] px-4 py-3 text-xs font-bold text-[var(--text-1)] hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={isGenerating || !qrCodeSrc}
                className="flex-[2] btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="h-4 w-4" />
                Done
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
