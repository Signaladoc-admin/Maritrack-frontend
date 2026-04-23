"use server";

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

export async function loginAction(credentials: LoginValues) {
  return withSafeAction(async () => {
    const response: LoginResponse = await apiClient("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const profile = response.data as UserProfile;
    const accessToken = response.accessToken;

    let redirectTo: string;

    if (profile.role === "ADMIN") {
      redirectTo = "/admin";
    } else if (profile.businessRole) {
      const business = await getBusinessAction(profile.businessId!);
      const hasProfile = !!business.data?.profile;
      const hasStaff = (business.data?.staff?.length ?? 0) > 0;
      redirectTo = hasProfile && hasStaff ? "/dashboard" : "/onboarding/business";
    } else {
      const pcSettings = await getParentalControlMeAction();
      redirectTo = pcSettings ? "/dashboard" : "/onboarding/personal";
    }

    return { profile, accessToken, redirectTo };
  }, "Login failed. Please check your credentials and try again.");
}
