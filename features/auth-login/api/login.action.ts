"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { LoginValues, UserProfile } from "@/entities/user/model/user.schema";
import { getParentalControlMeAction } from "@/entities/parental-controls/api/parental-controls.actions";

export async function loginAction(
  credentials: LoginValues
): Promise<{ profile: UserProfile; redirectTo: string }> {
  const response = await apiClient("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const profile = response.data as UserProfile;

  let redirectTo: string;

  if (profile.role === "ADMIN") {
    redirectTo = "/admin";
  } else if (profile.businessRole) {
    // Business account — use isFirstLogin to decide onboarding vs dashboard
    redirectTo = profile.isFirstLogin ? "/onboarding/business" : "/dashboard";
  } else {
    // Personal account — check parental control setup
    const pcSettings = await getParentalControlMeAction();
    redirectTo = pcSettings ? "/dashboard" : "/onboarding/personal";
  }

  return { profile, redirectTo };
}
