const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function refreshAccessToken() {
  const isServer = typeof window === "undefined";
  if (!isServer) return null;

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${API_BASE_URL}/users/refreshToken?token=${refreshToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Token refresh failed");
  }

  const data = await response.json();

  const newAccessToken =
    data.accessToken || data.access_token || data.data?.accessToken || data.data?.access_token;

  const cookieDefaults = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  };

  if (newAccessToken) {
    cookieStore.set("accessToken", newAccessToken, cookieDefaults);
  }

  return newAccessToken;
}
