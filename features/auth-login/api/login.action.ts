"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { LoginValues, UserProfile } from "@/entities/user/model/user.schema";
import { getParentalControlMeAction } from "@/entities/parental-controls/api/parental-controls.actions";
import { getBusinessAction } from "@/entities/business/api/business.actions";
import { ApiResponse } from "@/shared/api/types";
import { LoginResponse } from "../types";
import { ROUTES } from "@/features/auth-register/constants";



const ONBOARDED_COOKIE_OPTIONS = {
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

    console.log("response", response);

    const user = response.data;
    const accessToken = response.accessToken;
    const cookieStore = await cookies();

    let isOnboarded: boolean = false;

    if (user.businessId) {
      const business = await getBusinessAction(user.businessId);
      isOnboarded = business.success && !!business.data;

      return { user, accessToken, redirectTo: ROUTES.onboarding.business };
    } else {
      const pcSettings = await getParentalControlMeAction();
      isOnboarded = pcSettings.success && !!pcSettings.data;
    }

    cookieStore.set("isOnboarded", isOnboarded ? "true" : "false", ONBOARDED_COOKIE_OPTIONS);

    return { user, accessToken, redirectTo: ROUTES.dashboard };
  }, "Login failed. Please check your credentials and try again.");
}
