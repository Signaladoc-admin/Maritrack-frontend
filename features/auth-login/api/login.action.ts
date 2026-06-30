"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { LoginValues } from "@/entities/user/model/user.schema";
import { getParentalControlMeAction } from "@/entities/parental-controls/api/parental-controls.actions";
import { getBusinessAction } from "@/entities/business/api/business.actions";
import { LoginResponse } from "../types";
import { ApiResponse } from "@/shared/api/types";
import { getUserByIdAction } from "@/entities/user/api/user.actions";
import { requestTokenAction } from "@/features/auth/api/auth.actions";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function loginAction(credentials: LoginValues) {
  return withSafeAction(async () => {
    const response = await apiClient<ApiResponse<LoginResponse>>("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const user = response.data;
    const cookieStore = await cookies();

    // 1. Check email verification first — no point checking onboarding for an unverified account
    const userDetails = await getUserByIdAction(user.id);

    const isEmailVerified = !!userDetails.success && !!userDetails.data.isEmailVerified;

    if (!isEmailVerified) {
      // api-client.ts already wrote accessToken/refreshToken cookies from the login response.
      // Clear them so the user has no auth tokens — /confirm-email is public and needs no token.
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      // Also clear any leftover onboarding/verification flags so a stale `isOnboarded=true`
      // from a previous session can never pair up with a token re-established later.
      cookieStore.delete("isOnboarded");
      cookieStore.delete("isEmailVerified");
      // Silently resend OTP, then surface the error so useLogin's onError fires the toast
      await requestTokenAction("email", { email: user.email });
      throw new Error("Account email not verified yet. A new OTP has been sent to your email.");
    }

    cookieStore.set("isEmailVerified", "true", COOKIE_OPTIONS);

    // 2. Determine onboarding status.

    let isOnboarded = false;

    const backendOnboardedFlag = (user as { isOnboarded?: boolean }).isOnboarded;

    if (typeof backendOnboardedFlag === "boolean") {
      isOnboarded = backendOnboardedFlag;
    } else if (user.businessId) {
      const businessRes = await getBusinessAction(user.businessId);
      // getBusinessAction returns the full API envelope, so the business sits at `.data.data`.
      // A completed business has a persisted profile (with an id), not an empty stub.
      const business = businessRes.success
        ? (businessRes.data?.data as { profile?: { id?: string } } | null)
        : null;
      isOnboarded = false;
      // !!business?.profile?.id;
    } else {
      const pcSettingsRes = await getParentalControlMeAction();
      // A completed parent has a persisted parental-control record (with an id).
      const settings = pcSettingsRes.success
        ? (pcSettingsRes.data as { id?: string } | null)
        : null;
      isOnboarded = !!settings?.id;
    }

    cookieStore.set("isOnboarded", isOnboarded ? "true" : "false", COOKIE_OPTIONS);

    // Persist zoneId in a dedicated cookie — the JWT stops carrying it after a token
    // refresh (backend bug). This cookie is the stable source of truth until fixed.
    if (user.zoneId) {
      cookieStore.set("zoneId", user.zoneId, COOKIE_OPTIONS);
    }

    return response;
  }, "Login failed. Please check your credentials and try again.");
}
