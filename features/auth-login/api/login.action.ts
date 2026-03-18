"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { LoginValues, UserProfile } from "@/entities/user/model/user.schema";
import { cookies } from "next/headers";

export async function loginAction(credentials: LoginValues): Promise<UserProfile> {
  try {
    const response = await apiClient("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function debugCookies() {
  const cookieStore = await cookies();
}
