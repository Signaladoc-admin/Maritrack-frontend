"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { LoginValues, UserProfile } from "@/entities/user/model/user.schema";
import { cookies } from "next/headers";

export async function loginAction(credentials: LoginValues): Promise<UserProfile> {
  console.log("LOGGING IN WITH:", credentials);

  try {
    const response = await apiClient("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    console.log("LOGIN SUCCESS RESPONSE:", response);

    return response.data;
  } catch (error: any) {
    console.error("LOGIN ERROR:", error.message);
    throw error;
  }
}

export async function debugCookies() {
  const cookieStore = await cookies();
  console.log(cookieStore.getAll());
}
