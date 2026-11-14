"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import {
  forgotPasswordAction,
  resendVerificationAction,
  resetForgottenPasswordAction,
} from "@/features/auth/api/auth.actions";
import { useToast } from "@/shared/ui/toast";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";

type Step = 1 | 2;

export default function ForgotPasswordSection() {
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 2 state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Resend timer
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Password rules checks
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const isPasswordValid =
    hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
  const doPasswordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;

  // Countdown timer lifecycle
  const clearCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startCountdown = () => {
    clearCountdown();
    setCountdown(30);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearCountdown();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return clearCountdown;
  }, []);

  // Step 1: Request OTP
  const handleRequestOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await forgotPasswordAction({ email: email.trim() });
      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        title: "Code Sent",
        message: "A 6-digit verification code has been sent to your email.",
        type: "success",
      });

      setStep(2);
      startCountdown();
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to send reset code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend code handler
  const handleResendOtp = async () => {
    if (!email || countdown > 0 || isResending) return;

    setIsResending(true);
    setErrorMessage(null);

    try {
      const result = await resendVerificationAction("email", { email: email.trim() });
      if (!result.success) throw new Error(result.error);

      toast({
        title: "Code Resent",
        message: "A fresh verification code has been sent to your email.",
        type: "success",
      });
      startCountdown();
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to resend code.");
    } finally {
      setIsResending(false);
    }
  };

  // OTP box input handling
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(pasted.length, 5);
    otpInputsRef.current[nextIndex]?.focus();
  };

  // Step 2: Submit Reset Password
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length < 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }
    if (!isPasswordValid) {
      setErrorMessage("Please ensure your new password meets all security requirements.");
      return;
    }
    if (!doPasswordsMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await resetForgottenPasswordAction({
        email: email.trim(),
        otp: fullOtp,
        password: newPassword,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        title: "Password Reset Successful",
        message: "Your password has been changed. Please sign in with your new password.",
        type: "success",
      });

      router.push("/sign-in");
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to reset password. Please check your code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelClassName =
    "flex flex-col gap-[7px] text-[13.5px] font-semibold text-text-soft";
  const inputClassName =
    "w-full rounded-sm border border-line bg-surface px-3.5 py-3 text-[15px] font-normal text-white placeholder:text-text-dim focus:border-cyan focus:outline-none";

  return (
    <section className="px-6 pt-20 pb-[120px] min-[721px]:pt-24 font-sans text-white">
      <div className="mx-auto flex max-w-[440px] flex-col gap-6">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <div className="fl-v2-enter-badge">
            <Image
              src="/assets/flentra-logo.png"
              alt="Flentra"
              width={114}
              height={26}
              className="h-[26px] w-auto"
              priority
            />
          </div>
          <h1 className="m-0 mt-3 text-[32px] font-extrabold tracking-[-0.02em] text-white fl-v2-enter-title">
            {step === 1 ? "Reset your password" : "Create new password"}
          </h1>
          <p className="m-0 text-[15px] leading-[1.5] text-text-muted fl-v2-enter-desc">
            {step === 1
              ? "Let's reset your password"
              : `A 6-digit code was sent to ${email}. Enter it below to reset your password.`}
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="rounded-sm border border-red-500/40 bg-red-500/10 px-3.5 py-2.5 text-[14px] text-red-200"
          >
            {errorMessage}
          </div>
        )}

        {step === 1 ? (
          /* STEP 1: Enter email */
          <form
            aria-label="Request password reset"
            onSubmit={handleRequestOtp}
            className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-7 fl-v2-enter-aside"
          >
            <label className={labelClassName}>
              Work email
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={isSubmitting}
                placeholder="name@company.com"
                className={inputClassName}
                autoFocus
              />
            </label>

            <LandingV2Button
              type="submit"
              variant="primary"
              size="block"
              disabled={isSubmitting}
              className="mt-2 flex items-center justify-center gap-2 font-semibold"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Sending code..." : "Send reset code"}
            </LandingV2Button>
          </form>
        ) : (
          /* STEP 2: Enter OTP & New Password */
          <form
            aria-label="Enter code and new password"
            onSubmit={handleResetPassword}
            className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-7 fl-v2-enter-aside"
          >
            {/* OTP Boxes */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13.5px]">
                <span className="font-semibold text-text-soft">Verification code</span>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setErrorMessage(null);
                  }}
                  className="cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-cyan hover:text-cyan-light"
                >
                  Change email
                </button>
              </div>

              <div className="flex items-center justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpInputsRef.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    disabled={isSubmitting}
                    className="h-12 w-12 rounded-sm border border-line bg-navy text-center text-[20px] font-bold text-white focus:border-cyan focus:outline-none"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 text-[13px]">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={countdown > 0 || isResending}
                  className="cursor-pointer border-none bg-transparent p-0 font-semibold text-cyan disabled:cursor-not-allowed disabled:text-text-dim hover:text-cyan-light"
                >
                  {isResending
                    ? "Resending..."
                    : countdown > 0
                      ? `Resend code in ${countdown}s`
                      : "Resend code"}
                </button>
              </div>
            </div>

            {/* New Password */}
            <label className={labelClassName}>
              New password
              <div className="relative flex items-center">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                  placeholder="••••••••"
                  className={`${inputClassName} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  tabIndex={-1}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 cursor-pointer border-none bg-transparent p-1 text-text-dim transition-colors hover:text-white"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            {/* Password Requirement Checklist */}
            <div className="flex flex-col gap-1.5 rounded bg-navy/60 p-3 text-[12.5px]">
              <span className="font-semibold text-text-muted">Password must contain:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <span
                  className={`flex items-center gap-1.5 ${
                    hasMinLength ? "text-green-light" : "text-text-dim"
                  }`}
                >
                  {hasMinLength ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  8+ characters
                </span>
                <span
                  className={`flex items-center gap-1.5 ${
                    hasUpperCase ? "text-green-light" : "text-text-dim"
                  }`}
                >
                  {hasUpperCase ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  1 uppercase
                </span>
                <span
                  className={`flex items-center gap-1.5 ${
                    hasLowerCase ? "text-green-light" : "text-text-dim"
                  }`}
                >
                  {hasLowerCase ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  1 lowercase
                </span>
                <span
                  className={`flex items-center gap-1.5 ${
                    hasNumber ? "text-green-light" : "text-text-dim"
                  }`}
                >
                  {hasNumber ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  1 number
                </span>
                <span
                  className={`flex items-center gap-1.5 ${
                    hasSymbol ? "text-green-light" : "text-text-dim"
                  }`}
                >
                  {hasSymbol ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  1 symbol
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <label className={labelClassName}>
              Confirm new password
              <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                  placeholder="••••••••"
                  className={`${inputClassName} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 cursor-pointer border-none bg-transparent p-1 text-text-dim transition-colors hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            <LandingV2Button
              type="submit"
              variant="primary"
              size="block"
              disabled={isSubmitting || !isPasswordValid || !doPasswordsMatch}
              className="mt-2 flex items-center justify-center gap-2 font-semibold"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Resetting password..." : "Reset password"}
            </LandingV2Button>
          </form>
        )}

        <p className="m-0 text-center text-[14.5px] text-text-muted">
          Remember your password?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-cyan no-underline transition-colors hover:text-cyan-light"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
