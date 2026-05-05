"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { LoginValues, UserProfile } from "@/entities/user/model/user.schema";
import { getParentalControlMeAction } from "@/entities/parental-controls/api/parental-controls.actions";
import { getBusinessAction } from "@/entities/business/api/business.actions";

interface LoginResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    access_token_expires_on: string;
    refresh_token: string;
    date: string;
    isFirstLogin: boolean;
    role: string;
    businessRole: string;
    email: string;
    id: string;
    parentId: string | null;
    businessId: string | null;
    imageUrl: string | null;
  };
  accessToken: string;
}

const ONBOARDED_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function loginAction(credentials: LoginValues) {
  return withSafeAction(async () => {
    const response: LoginResponse = await apiClient("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    console.log("response", response);

    const profile = response.data as UserProfile;
    const accessToken = response.accessToken;
    const cookieStore = await cookies();

    if (profile.role === "ADMIN") {
      return { profile, accessToken, redirectTo: "/admin" };
    }

    let isOnboarded: boolean;

    if (profile.businessRole) {
      const business = await getBusinessAction(profile.businessId!);
      isOnboarded = !!business.data?.profile;
    } else {
      const pcSettings = await getParentalControlMeAction();
      isOnboarded = !!pcSettings;
    }

    cookieStore.set("isOnboarded", isOnboarded ? "true" : "false", ONBOARDED_COOKIE_OPTIONS);

    return { profile, accessToken, redirectTo: "/dashboard" };
  }, "Login failed. Please check your credentials and try again.");
}
