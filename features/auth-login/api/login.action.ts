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

    const cookieStore = await cookies();

    // Set refreshToken if it exists in response.data
    if (response.data?.refresh_token) {
      cookieStore.set("refreshToken", response.data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
    }

    // Set accessToken if it exists in the root response
    if (response.accessToken) {
      cookieStore.set("accessToken", response.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });
    }

    return response.data;
  } catch (error: any) {
    console.error("LOGIN ERROR:", error.message);
    throw error;
  }
}
