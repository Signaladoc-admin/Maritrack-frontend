"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const isServer = typeof window === "undefined";
  const url = `${API_BASE_URL}${endpoint}`;

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (isServer) {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    if (cookieString) {
      headers["Cookie"] = cookieString;
    }
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch (error: any) {
    // Detect network-level errors thrown naturally by fetch()
    if (error.name === "TypeError" && error.message.includes("fetch failed")) {
      throw new Error(
        "Unable to connect to the server. Please check your internet connection and try again."
      );
    }
    // Fallback for other catastrophic network failures
    throw new Error(error.message || "A network error occurred.");
  }

  // Handle Set-Cookie if on server
  if (isServer && response.headers.has("Set-Cookie")) {
    const setCookieHeader = response.headers.get("Set-Cookie");
    if (setCookieHeader) {
      const cookieStore = await cookies();

      // Simple parse for cookies (splits multiple cookies if present)
      // Note: In a real-world scenario, you might need a more robust parser like 'cookie'
      const cookiesToSet = setCookieHeader.split(/,(?=[^;]+;)/);

      for (const cookieStr of cookiesToSet) {
        const [nameValue, ...parts] = cookieStr.split(";");
        const [name, value] = nameValue.split("=");
        if (name && value) {
          const cookieOptions: any = {};
          parts.forEach((part) => {
            const [k, v] = part.trim().split("=");
            const key = k.toLowerCase();
            if (key === "httponly") cookieOptions.httpOnly = true;
            if (key === "secure") cookieOptions.secure = true;
            if (key === "path") cookieOptions.path = v;
            if (key === "samesite") cookieOptions.sameSite = v.toLowerCase();
            if (key === "max-age") cookieOptions.maxAge = parseInt(v);
            if (key === "expires") cookieOptions.expires = new Date(v);
          });
          cookieStore.set(name.trim(), value.trim(), cookieOptions);
        }
      }
    }
  }

  if (!response.ok) {
    if (
      response.status === 401 &&
      !endpoint.includes("/login") &&
      !endpoint.includes("/register")
    ) {
      redirect("/login");
    }
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message.join(", ")
      : errorData.message;
    throw new Error(errorMessage || response.statusText || "An unexpected error occurred");
  }

  return response.json();
}
