"use client";

import { useCallback, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useToast } from "@/shared/ui/toast";
import { useQrCode } from "@/features/mdm-sync/model/useQrCode";
import {
  ShieldCheck,
  ArrowLeft,
  Check,
  ChevronUp,
  Download,
  Maximize2,
  Copy,
  QrCode,
  RefreshCw,
  AlertCircle,
  X,
} from "lucide-react";
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
  const { qrCodeSrc, isLoading, isPending, isError, error, refetch } = useQrCode(staffMember.id!);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [copied, setCopied] = useState(false);

  const isGenerating = isLoading || isPending;

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error",
        message: "Failed to generate pairing code. Please try again.",
        type: "error",
      });
    }
  }, [isError, error, toast]);

  const firstName = staffMember.user?.firstName ?? "";
  const lastName = staffMember.user?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || staffMember.user?.email || "Team member";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "TM";
  const isAdmin = staffMember.businessRole === "ORGANIZATION_ADMIN";

  // Access / Activation code fallback for manual entry on device
  const accessCode =
    staffMember.onboardingCode ||
    staffMember.activationCode?.code ||
    (staffMember.user as any)?.onboardingCode ||
    null;

  const downloadFileName = `flentra-simplified-qr-${(staffMember.user?.firstName || "device").toLowerCase()}.png`;

  const handleDownload = useCallback(() => {
    if (!qrCodeSrc) return;
    const a = document.createElement("a");
    a.href = qrCodeSrc;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [qrCodeSrc, downloadFileName]);

  const handleCopyCode = useCallback(() => {
    if (!accessCode) return;
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    toast({
      title: "Copied",
      message: "Access code copied to clipboard",
      type: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  }, [accessCode, toast]);

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

      {/* Section Title: FieldX EMM Based Enrolment */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-1)]">
          FieldX EMM Based Enrolment
        </h2>
        <p className="text-xs text-[var(--text-3)]">
          Pair and enroll Android Enterprise devices into workspace management.
        </p>
      </div>

      {/* Main Enrolment Panel */}
      <div className="rounded-3xl border border-[var(--card-line)] bg-[var(--card-fill)] p-6 sm:p-8 shadow-sm">
        {/* Panel Sub-header: Simplified QR Code / Camera notice */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--card-line)] pb-4 mb-6">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-1)]">
            Simplified QR Code
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-3)] font-medium">
            <span>QR Code for Low Resolution Camera Devices</span>
            <ChevronUp className="h-4 w-4 text-[var(--text-3)]" />
          </div>
        </div>

        {/* 2-Column Layout: Left = Large QR Code, Right = Instructions & Assignment */}
        <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8 items-start">
          {/* LEFT COLUMN: Large Crisp QR Code Card */}
          <div className="flex flex-col items-start gap-3 w-full max-w-[440px] mx-auto lg:mx-0">
            {/* White Square Container */}
            <div className="relative w-full rounded-2xl bg-white p-6 shadow-md border border-slate-200/80 flex flex-col items-center">
              {isGenerating ? (
                <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-xl bg-slate-100/90 animate-pulse">
                  <QrCode className="h-16 w-16 text-slate-300 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-500">
                    Generating enrollment QR code...
                  </span>
                </div>
              ) : isError ? (
                <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 p-4 text-center">
                  <AlertCircle className="h-10 w-10 text-[var(--coral)]" />
                  <p className="text-xs font-semibold text-slate-800">
                    Failed to generate pairing QR
                  </p>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" /> Retry
                  </button>
                </div>
              ) : qrCodeSrc ? (
                <div className="flex w-full flex-col">
                  {/* High-contrast QR code with click-to-enlarge */}
                  <div
                    className="group relative flex w-full items-center justify-center cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setIsEnlarged(true)}
                    title="Click to enlarge"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCodeSrc}
                      alt="FieldX EMM Enrollment QR Code"
                      draggable={false}
                      loading="eager"
                      decoding="sync"
                      className="qr-crisp-image block h-auto w-full select-none"
                      style={{
                        maxWidth: 400,
                        imageRendering: "pixelated",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/15 transition-colors">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-black/80 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg flex items-center gap-1.5">
                        <Maximize2 className="h-3.5 w-3.5" /> Click to enlarge
                      </span>
                    </div>
                  </div>

                  {/* Version tag at bottom-left inside white card */}
                  <div className="mt-4 pt-1 text-left">
                    <span className="font-sans text-xs font-bold text-slate-800 tracking-tight">
                      v4.1.0 - Flentra
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center">
                  <QrCode className="h-32 w-32 text-slate-300" />
                </div>
              )}
            </div>

            {/* Below White Card: Download Link & Enlarge Fallback */}
            {qrCodeSrc && (
              <div className="flex w-full items-center justify-between px-1">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-500 hover:text-sky-400 hover:underline cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Simplified QR
                </button>

                <button
                  type="button"
                  onClick={() => setIsEnlarged(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--text-3)] hover:text-[var(--text-1)] cursor-pointer"
                >
                  <Maximize2 className="h-3 w-3" /> Having trouble? Enlarge
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Instructions, Staff Details, Manual Code, Actions */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {/* Low-Resolution Camera Advisory */}
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
                If your device has low resolution camera or unable to scan the above QR code, we
                recommend trying the simplified QR code.
              </p>

              {/* Numbered / Bulleted Steps */}
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-[var(--text-1)]">
                  To use the Simplified QR code follow the steps
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-2)]">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>Scan the Simplified QR code shown in this panel</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>Wait for the Manager app to download and install on the phone</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>
                      After app installation, the app will prompt users to scan another Activation
                      QR Code or Enter Access codes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>
                      Navigate to the{" "}
                      <span className="text-sky-500 font-semibold">
                        Activation QR Code Page
                      </span>{" "}
                      to find the corresponding codes to register the device in Web Portal
                    </span>
                  </li>
                </ul>
              </div>

              {/* Assigned Staff Preview */}
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--card-line)] bg-[var(--card-raised)] p-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-tint)] text-xs font-bold text-[var(--accent)]">
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

              {/* Manual Access Code Card */}
              {accessCode && (
                <div className="flex items-center justify-between rounded-2xl border border-[var(--card-line)] bg-[var(--card-raised)] p-3.5">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider font-semibold text-[var(--text-3)]">
                      Access / Activation Code
                    </span>
                    <span className="font-mono text-base font-bold tracking-widest text-[var(--accent)]">
                      {accessCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] px-3 py-1.5 text-xs font-semibold text-[var(--text-1)] hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? "Copied" : "Copy Code"}
                  </button>
                </div>
              )}

              {/* Security note */}
              <div className="flex items-center gap-2 rounded-xl border border-[var(--card-line)] bg-[var(--card-raised)] px-3 py-2 text-[11px] text-[var(--text-3)]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                <span>End-to-end encrypted enrollment verified by your workspace MDM keys.</span>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[var(--card-line)]">
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

      {/* Full-screen Enlarge Modal for Low Resolution Camera Scanning */}
      {isEnlarged && qrCodeSrc && (
        <DialogPrimitive.Root open={isEnlarged} onOpenChange={setIsEnlarged}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-xs" />
            <DialogPrimitive.Content
              aria-describedby={undefined}
              className="fixed inset-0 z-[100001] flex items-center justify-center p-4 outline-none"
              onClick={() => setIsEnlarged(false)}
            >
              <DialogPrimitive.Title className="sr-only">
                Enlarged pairing QR code
              </DialogPrimitive.Title>
              <div
                className="relative flex flex-col items-center rounded-3xl bg-white p-8 sm:p-10 shadow-2xl max-w-[95vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeSrc}
                  alt="Enlarged Pairing QR Code"
                  draggable={false}
                  className="qr-crisp-image block h-auto w-full select-none"
                  style={{
                    maxWidth: Math.min(
                      640,
                      typeof window !== "undefined" ? window.innerHeight - 180 : 640
                    ),
                    imageRendering: "pixelated",
                  }}
                />
                <div className="mt-4 flex w-full items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-700">
                  <span className="font-sans text-xs font-bold">v4.1.0 - Flentra</span>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 font-semibold text-sky-500 hover:underline cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    Download Simplified QR
                  </button>
                </div>
                <DialogPrimitive.Close className="absolute top-3 right-3 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </div>
  );
}
