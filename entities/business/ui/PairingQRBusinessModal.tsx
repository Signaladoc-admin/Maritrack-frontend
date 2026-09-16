"use client";

import { useEffect } from "react";
import { useToast } from "@/shared/ui/toast";
import { QRCodeCard } from "@/shared/ui/cards/qr-code-card";
import { useQrCode } from "@/features/mdm-sync/model/useQrCode";
import { ShieldCheck, ArrowLeft, Check, Smartphone, Sparkles } from "lucide-react";
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

  const firstName = staffMember.user?.firstName ?? "";
  const lastName = staffMember.user?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || staffMember.user?.email || "Team member";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "TM";
  const isAdmin = staffMember.businessRole === "ORGANIZATION_ADMIN";

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar: Back navigation + Step progress badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--card-line)] pb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to user details
        </button>

        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--card-line)] bg-[var(--card-fill)] px-3 py-1 text-[11px] font-medium text-[var(--text-3)]">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Step 2 of 2: Device Pairing
        </div>
      </div>

      {/* Main 2-column content */}
      <div className="grid items-stretch gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8">
        {/* Left column: Staff Assignment Context & Numbered Steps */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 sm:p-6">
          <div className="space-y-5">
            {/* Header & Staff Preview */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                <Sparkles className="h-3.5 w-3.5" />
                Fleet Enrollment
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--text-1)]">
                Pair new device
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-2)]">
                Scan this enrollment QR code using the Flentra MDM Companion app on the device to
                automatically register and configure it.
              </p>
            </div>

            {/* Target Staff Card */}
            <div className="flex items-center gap-3 rounded-xl border border-[var(--card-line)] bg-[var(--card-raised)] p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-tint)] text-xs font-bold text-[var(--accent)]">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold text-[var(--text-1)]">
                    {fullName}
                  </span>
                  {isAdmin && (
                    <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-tint)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                      Admin
                    </span>
                  )}
                </div>
                <span className="block truncate text-xs text-[var(--text-3)]">
                  {staffMember.user?.email}
                </span>
              </div>
            </div>

            {/* Numbered Steps */}
            <div className="space-y-3 pt-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-3)]">
                Instructions
              </div>
              <ol className="space-y-2.5">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)] text-xs font-bold text-[var(--text-1)]">
                    1
                  </span>
                  <div className="pt-0.5 text-xs text-[var(--text-2)]">
                    Open the <strong className="font-semibold text-[var(--text-1)]">Flentra MDM</strong> app on the target phone or tablet.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)] text-xs font-bold text-[var(--text-1)]">
                    2
                  </span>
                  <div className="pt-0.5 text-xs text-[var(--text-2)]">
                    Tap <strong className="font-semibold text-[var(--text-1)]">Pair Device</strong> on the welcome screen.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-tint)] text-xs font-bold text-[var(--accent)]">
                    3
                  </span>
                  <div className="pt-0.5 text-xs text-[var(--text-2)]">
                    Scan the QR code to finish enrollment and apply security policies.
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-center gap-2 rounded-xl border border-[var(--card-line)] bg-[var(--card-raised)] px-3 py-2.5 text-[11px] text-[var(--text-3)]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--accent)]" />
            <span>End-to-end encrypted enrollment verified by your workspace MDM keys.</span>
          </div>
        </div>

        {/* Right column: QR Code Card & Actions */}
        <div className="flex flex-col justify-between gap-5">
          <QRCodeCard
            description="Scan this QR Code with the device camera to complete pairing."
            src={qrCodeSrc || ""}
            isLoading={isGenerating}
            isError={isError}
            statusLabel="Live Enrollment Key"
            className="h-full justify-center p-6"
          />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] px-4 py-3 text-xs font-bold text-[var(--text-1)] hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <button
              type="button"
              onClick={onComplete}
              disabled={isGenerating || !qrCodeSrc}
              className="w-full sm:flex-[2] btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="h-4 w-4" />
              Done / Finish Pairing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

