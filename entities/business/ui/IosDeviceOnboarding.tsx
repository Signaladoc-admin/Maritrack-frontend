"use client";

import { useState } from "react";
import { ArrowLeft, Check, CheckCircle2, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { BusinessStaff } from "../types";
import { InputGroup } from "@/shared/ui/input-group";
import { Input } from "@/shared/ui/input";
import { Loader } from "@/shared/ui/loader";
import { useAddIosDevice } from "@/features/mdm-sync/model/useMdmSync";

interface IosDeviceOnboardingProps {
  staffMember: BusinessStaff;
  onComplete: () => void;
  onBack: () => void;
}

export default function IosDeviceOnboarding({
  staffMember,
  onComplete,
  onBack,
}: IosDeviceOnboardingProps) {
  const [deviceSerial, setDeviceSerial] = useState("");
  const [serialError, setSerialError] = useState<string | null>(null);
  const [enrolledSerial, setEnrolledSerial] = useState<string | null>(null);

  const { mutateAsync: addIosDevice, isPending } = useAddIosDevice();

  const firstName = staffMember.user?.firstName ?? "";
  const lastName = staffMember.user?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || staffMember.user?.email || "Team member";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "TM";
  const isAdmin = staffMember.businessRole === "ORGANIZATION_ADMIN";
  const targetUserId = staffMember.userId || staffMember.user?.id || staffMember.id;

  const handleSerialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uppercased = e.target.value.toUpperCase();
    setDeviceSerial(uppercased);
    if (serialError && uppercased.trim().length > 0) {
      setSerialError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = deviceSerial.trim().toUpperCase();
    if (!trimmed) {
      setSerialError("Device serial number is required");
      return;
    }
    if (trimmed.length < 6) {
      setSerialError("Please enter a valid Apple device serial number");
      return;
    }

    try {
      await addIosDevice({
        deviceSerial: trimmed,
        userId: targetUserId,
      });
      setEnrolledSerial(trimmed);
    } catch {
      // Error toast handled by useAddIosDevice
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar: Back navigation + Step progress badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--card-line)] pb-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to device details
        </button>

        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--card-line)] bg-[var(--card-fill)] px-3 py-1 text-[11px] font-medium text-[var(--text-3)]">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Step 2 of 2: iOS Enrollment
        </div>
      </div>

      {/* Main 2-column content */}
      <div className="grid items-stretch gap-6 md:grid-cols-[1fr_1.15fr] md:gap-8">
        {/* Left column: Staff Assignment Context & Numbered Steps */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 sm:p-6">
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                <Sparkles className="h-3.5 w-3.5" />
                Apple iOS Enrollment
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--text-1)]">
                Onboard iOS device
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-2)]">
                Register the iPhone or iPad serial number to enroll and assign it directly to this
                user.
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
                Where to find the serial number
              </div>
              <ol className="space-y-2.5">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)] text-xs font-bold text-[var(--text-1)]">
                    1
                  </span>
                  <div className="pt-0.5 text-xs text-[var(--text-2)]">
                    On the iPhone or iPad, open{" "}
                    <strong className="font-semibold text-[var(--text-1)]">
                      Settings → General → About
                    </strong>
                    , or check the device box.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)] text-xs font-bold text-[var(--text-1)]">
                    2
                  </span>
                  <div className="pt-0.5 text-xs text-[var(--text-2)]">
                    Enter the{" "}
                    <strong className="font-semibold text-[var(--text-1)]">Serial Number</strong>{" "}
                    in the form on the right (automatically formatted in uppercase).
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-tint)] text-xs font-bold text-[var(--accent)]">
                    3
                  </span>
                  <div className="pt-0.5 text-xs text-[var(--text-2)]">
                    Submit to register the device and link it to{" "}
                    <strong className="font-semibold text-[var(--text-1)]">{fullName}</strong>.
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-[var(--card-line)] bg-[var(--card-raised)] px-3 py-2.5 text-[11px] text-[var(--text-3)]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--accent)]" />
            <span>Device serial is enrolled securely under your organization&apos;s Apple MDM policy.</span>
          </div>
        </div>

        {/* Right column: Serial Input Form or Success State */}
        <div className="flex flex-col justify-between gap-5">
          {enrolledSerial ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-tint)]/40 p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-[var(--text-1)]">
                  iOS Device Enrolled
                </h4>
                <p className="max-w-sm text-xs leading-relaxed text-[var(--text-2)]">
                  Serial <span className="font-mono font-bold text-[var(--text-1)]">{enrolledSerial}</span>{" "}
                  has been registered and assigned to{" "}
                  <span className="font-semibold text-[var(--text-1)]">{fullName}</span>.
                </p>
              </div>
              <div className="mt-2 flex w-full max-w-xs items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEnrolledSerial(null);
                    setDeviceSerial("");
                  }}
                  className="flex-1 cursor-pointer rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] px-4 py-2.5 text-xs font-bold text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)]"
                >
                  Add another
                </button>
                <button
                  type="button"
                  onClick={onComplete}
                  className="btn-primary flex-1 cursor-pointer justify-center rounded-xl px-4 py-2.5 text-xs font-bold"
                >
                  <Check className="h-4 w-4" />
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 sm:p-6"
            >
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--card-line)] bg-[var(--card-raised)] text-[var(--accent)]">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-1)]">iOS Device Details</h4>
                    <p className="text-xs text-[var(--text-3)]">
                      Enter the hardware serial number to complete onboarding
                    </p>
                  </div>
                </div>

                <InputGroup
                  label="Device Serial Number"
                  helpText="Automatically converted to uppercase (e.g. C02ZN123MD6R)"
                  error={serialError || undefined}
                >
                  <Input
                    value={deviceSerial}
                    onChange={handleSerialChange}
                    placeholder="E.G. C02ZN123MD6R"
                    autoComplete="off"
                    spellCheck={false}
                    className="font-mono uppercase tracking-wider"
                    disabled={isPending}
                  />
                </InputGroup>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onBack}
                  disabled={isPending}
                  className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] px-4 py-3 text-xs font-bold text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)] disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isPending || !deviceSerial.trim()}
                  className="btn-primary inline-flex flex-[2] cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader size="sm" />
                      Onboarding iOS Device...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Onboard iOS Device
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
