"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useNewUserStore, useParentStore } from "@/shared/stores/user.store";
import { useToast } from "@/shared/ui/toast";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";

export default function SignInSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [email, setEmailInput] = useState("");
  const [password, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isSubmitting, loginError, resetLoginError } = useAuth();
  const { setParentId } = useParentStore();
  const { clearCredentials, setEmail } = useNewUserStore();
  const { toast } = useToast();

  useEffect(() => {
    resetLoginError();
  }, [resetLoginError]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || isSubmitting) return;

    resetLoginError();

    try {
      const { data: user, message } = await login({ email, password });

      toast({
        title: message || "Welcome back!",
        type: "success",
        ...(user?.isFirstLogin && {
          message: "Please complete your onboarding to continue",
        }),
      });

      clearCredentials();
      if (user?.parentId) setParentId(user.parentId);

      // RETAILER_ADMIN must change their default password before accessing the dashboard
      const isRetailerAdmin = user?.businessRole === "RETAILER_ADMIN";
      const isDefaultPasswordChanged = user?.isDefaultPasswordChanged ?? true;

      if (isRetailerAdmin && !isDefaultPasswordChanged) {
        router.push("/change-password");
      } else if (isRetailerAdmin) {
        router.push("/devices");
      } else if (user?.isFirstLogin && user?.isInvited) {
        router.push("/change-password");
      } else if (callbackUrl && callbackUrl.startsWith("/")) {
        router.push(callbackUrl);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      // If email is not verified, set email in store and redirect to verification
      if (err?.message?.toLowerCase().includes("not verified")) {
        setEmail(email);
        toast({
          title: "Email Not Verified",
          message: "A verification code has been sent to your email.",
          type: "error",
        });
        setTimeout(() => router.push("/confirm-email"), 1500);
      }
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
            Sign in to your portal
          </h1>
          <p className="m-0 text-[15.5px] text-text-muted fl-v2-enter-desc">
            For Flentra customers, retailers and staff.
          </p>
        </div>

        <form
          aria-label="Sign in"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-7 fl-v2-enter-aside"
        >
          {loginError && (
            <div
              role="alert"
              className="rounded-sm border border-red-500/40 bg-red-500/10 px-3.5 py-2.5 text-[14px] text-red-200"
            >
              {loginError}
            </div>
          )}

          <label className={labelClassName}>
            Work email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              autoComplete="username"
              required
              disabled={isSubmitting}
              placeholder="name@company.com"
              className={inputClassName}
            />
          </label>

          <label className={labelClassName}>
            Password
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoComplete="current-password"
                required
                disabled={isSubmitting}
                placeholder="••••••••"
                className={`${inputClassName} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 cursor-pointer border-none bg-transparent p-1 text-text-dim transition-colors hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </label>

          <div className="flex items-end justify-end gap-2.5 text-[14px]">
            <Link
              href="/forgot-password"
              className="font-semibold text-cyan no-underline transition-colors hover:text-cyan-light"
            >
              Forgot password?
            </Link>
          </div>

          <LandingV2Button
            type="submit"
            variant="primary"
            size="block"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 font-semibold"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Signing in..." : "Sign in"}
          </LandingV2Button>
        </form>

        <p className="m-0 text-center text-[14.5px] text-text-muted">
          New to Flentra?{" "}
          <Link
            href="/book-a-demo"
            className="font-semibold text-cyan no-underline transition-colors hover:text-cyan-light"
          >
            Book a demo
          </Link>
        </p>
      </div>
    </section>
  );
}
