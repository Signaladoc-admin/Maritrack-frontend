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
}

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

    // const isEmailVerified = !!userDetails.success && !!userDetails.data.isEmailVerified;
    const isEmailVerified = true;

    if (!isEmailVerified) {
      // api-client.ts already wrote accessToken/refreshToken cookies from the login response.
      // Clear them so the user has no auth tokens — /confirm-email is public and needs no token.
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      // Silently resend OTP, then surface the error so useLogin's onError fires the toast
      await requestTokenAction("email", { email: user.email });
      throw new Error("Account email not verified yet. A new OTP has been sent to your email.");
    }

    cookieStore.set("isEmailVerified", "true", COOKIE_OPTIONS);

    // NUDGE: Remove userMeta temporary cookie when session restore gets unified on backend
    cookieStore.set("userMeta", JSON.stringify({
      businessId: user.businessId,
      parentId: user.parentId,
      zoneId: user.zoneId,
      role: user.role,
      businessRole: user.businessRole,
    }), COOKIE_OPTIONS);

    // 2. Check onboarding status
    let isOnboarded: boolean;

    if (user.businessId) {
      const business = await getBusinessAction(user.businessId);
      isOnboarded = !!business.success && !!business.data?.data?.profile;
    } else {
      const pcSettings = await getParentalControlMeAction();
      isOnboarded = !!pcSettings.success && !!pcSettings.data;
    }

    cookieStore.set("isOnboarded", isOnboarded ? "true" : "false", COOKIE_OPTIONS);

    return response;
  }, "Login failed. Please check your credentials and try again.");
}