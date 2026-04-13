"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { LoginValues, UserProfile } from "@/entities/user/model/user.schema";
import { getParentalControlMeAction } from "@/entities/parental-controls/api/parental-controls.actions";
import { getBusinessProfileAction } from "@/entities/business/api/business-action";

export async function loginAction(
  credentials: LoginValues
): Promise<{ profile: UserProfile; redirectTo: string }> {
  const response = await apiClient("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const profile = response.data as UserProfile;

  // Cookie is now in scope — call PC check in the same server context
  const pcSettings = await getParentalControlMeAction();

  let redirectTo: string;

  console.log(profile);

  if (profile.role === "ADMIN") {
    redirectTo = "/admin";
  } else if (profile.businessRole) {
    const businessProfile = await getBusinessProfileAction(profile.businessId!);

    if (businessProfile.error) {
      redirectTo = "/onboarding/business";
    } else {
      redirectTo = "/dashboard";
    }
  } else {
    const pcSettings = await getParentalControlMeAction();
    redirectTo = pcSettings ? "/dashboard" : "/onboarding/personal";
  }

  return { profile, redirectTo };
}
