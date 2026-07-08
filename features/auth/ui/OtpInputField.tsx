"use client";

import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { OTPInput } from "@/shared/ui/otp-input";
import { useEffect, useRef, useState } from "react";
import { useResendVerification } from "../model/useResendVerification";

interface OtpInputFieldProps {
  /** Controlled value from the parent form */
  value: string;
  onChange: (value: string) => void;
  /** Validation error message from the parent form */
  error?: string;
  /** Email used to trigger the resend request */
  email: string;
  /** Number of OTP digits (defaults to 6) */
  length?: number;
  /** Initial countdown in seconds before the resend button becomes active (defaults to 30) */
  initialCountdown?: number;
  /** Show the "Change email" button (defaults to true) */
  showChangeEmail?: boolean;
  /** Called when the user clicks "Change email" */
  onChangeEmail?: () => void;
}

export function OtpInputField({
  value,
  onChange,
  error,
  email,
  length = 6,
  initialCountdown = 30,
  showChangeEmail = true,
  onChangeEmail,
}: OtpInputFieldProps) {
  const [countdown, setCountdown] = useState(initialCountdown);
  const { resendVerification, isSubmitting: isResending } = useResendVerification();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function clearCountdownInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startCountdown() {
    clearCountdownInterval();
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearCountdownInterval();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    startCountdown();
    return clearCountdownInterval;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleResend() {
    if (!email) return;
    setCountdown(initialCountdown);
    startCountdown();
    await resendVerification({ email });
  }

  return (
    <div className="space-y-2">
      <InputGroup label="Enter OTP">
        <div className="space-y-2">
          <OTPInput value={value} onChange={onChange} length={length} />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      </InputGroup>
      <div className="text-muted-foreground flex items-center justify-between text-sm font-medium">
        <Button
          variant="link"
          type="button"
          className="text-muted-foreground px-0 py-0 h-auto!"
          disabled={countdown > 0 || isResending}
          onClick={handleResend}
        >
          {isResending ? (
            <>Resending...</>
          ) : countdown > 0 ? (
            <>Resend in {countdown}s</>
          ) : (
            "Resend code"
          )}
        </Button>
        {showChangeEmail && (
          <Button
            variant="link"
            type="button"
            className="text-muted-foreground px-0 py-0 h-auto!"
            onClick={onChangeEmail}
          >
            Change email
          </Button>
        )}
      </div>
    </div>
  );
}
