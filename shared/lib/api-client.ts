"use server";

import { redirect } from "next/navigation";
import { refreshAccessToken } from "./api/refresh-token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

let refreshPromise: Promise<string | null> | null = null;

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit & {
    noRedirect?: boolean;
    params?: Record<string, string | number | boolean | undefined>;
  } = {}
): Promise<T> {
  const isServer = typeof window === "undefined";
  const { noRedirect, params, ...fetchOptions } = options;
  let url = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  // Use dynamic import for cookies to avoid build errors in Pages Router
  let accessToken: string | undefined;
  let cookieStore: any = null;

  if (isServer) {
    const { cookies } = await import("next/headers");
    cookieStore = await cookies();
    accessToken = cookieStore.get("accessToken")?.value;
  } else {
    // Browser fallback
    const cookies = document.cookie.split("; ").reduce((acc: any, curr) => {
      const [key, value] = curr.split("=");
      acc[key] = value;
      return acc;
    }, {});
    accessToken = cookies["accessToken"];
  }

  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!(fetchOptions.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  console.log(`\n================ API REQUEST ================`);
  console.log(`[URL]: ${url}`);
  console.log(`[METHOD]: ${fetchOptions.method || "GET"}`);
  console.log(`[HEADERS]:`, JSON.stringify(headers, null, 2));
  if (fetchOptions.body) {
    console.log(`[BODY]:`, fetchOptions.body);
  }
  console.log(`=============================================\n`);
  let response: Response;
  try {
    response = await fetch(url, {
      ...fetchOptions,
      headers,
      cache: "no-store",
    });
  } catch (error: any) {
    console.error(`[apiClient] Fetch error for ${url}:`, error);
    const isNetworkError =
      error?.message === "Failed to fetch" ||
      error?.message === "fetch failed" ||
      error?.name === "TypeError";
    if (isNetworkError) {
      throw new Error("No internet connection. Please check your network and try again.");
    }
    throw error;
  }
  console.log(`[apiClient] Response status for ${url}: ${response.status}`);

  if (
    response.status === 401 &&
    isServer &&
    !noRedirect &&
    !endpoint.includes("/login") &&
    !endpoint.includes("/refresh")
  ) {
    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      if (!newAccessToken) {
        if (isServer && cookieStore) {
          cookieStore.delete("accessToken");
          cookieStore.delete("refreshToken");
        }
        redirect("/login");
      }

      headers["Authorization"] = `Bearer ${newAccessToken}`;

      response = await fetch(url, {
        ...fetchOptions,
        headers,
        cache: "no-store",
      });
    } catch {
      if (isServer && cookieStore) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
      }
      redirect("/login");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.message;

    const errorMessage = Array.isArray(message)
      ? message.filter((m: any) => typeof m === "string").join(", ") ||
        message.map((m: any) => (typeof m === "object" ? JSON.stringify(m) : String(m))).join(", ")
      : typeof message === "string"
        ? message
        : response.statusText;

    throw new Error(errorMessage || response.statusText || "Request failed");
  }

  const parsedResponse = await response.json();

  // Persist both tokens to httpOnly cookies so server actions can authenticate.
  // The access token is also returned to the client (via loginAction) to be stored in Zustand,
  // keeping both in sync from the same source value.
  //
  // Login response:   { accessToken: "...", data: { refresh_token: "..." } }
  // Refresh response: { data: { access_token: "...", refresh_token: "..." }, accessToken: null }
  if (isServer && cookieStore) {
    const accessToken =
      parsedResponse.accessToken || // login: top-level camelCase
      parsedResponse.data?.access_token || // refresh: nested snake_case
      parsedResponse.data?.accessToken; // future-proofing

    const refreshToken =
      parsedResponse.data?.refresh_token || parsedResponse.data?.refreshToken; // login + refresh: nested snake_case // future-proofing

    const cookieDefaults = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    };

    if (accessToken) cookieStore.set("accessToken", accessToken, cookieDefaults);
    if (refreshToken) cookieStore.set("refreshToken", refreshToken, cookieDefaults);
  }

  return parsedResponse;
}
