"use server";

import { cookies } from "next/headers";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function setOnboardedAction() {
  const cookieStore = await cookies();
  cookieStore.set("isOnboarded", "true", COOKIE_OPTIONS);
}
