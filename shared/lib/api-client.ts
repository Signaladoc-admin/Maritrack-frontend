"use server";

import { redirect } from "next/navigation";
import { refreshAccessToken } from "./api/refresh-token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

let refreshPromise: Promise<string | null> | null = null;

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit & { noRedirect?: boolean } = {}
): Promise<T> {
  const isServer = typeof window === "undefined";
  const { noRedirect, ...fetchOptions } = options;
  const url = `${API_BASE_URL}${endpoint}`;

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
  } catch (error) {
    console.error(`[apiClient] Fetch error for ${url}:`, error);
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

  console.log("responnse:", response);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    console.log(`\n================ API ERROR RESPONSE ================`);
    console.log(`[STATUS]: ${response.status} ${response.statusText}`);
    console.log(`[DATA]:`, JSON.stringify(errorData, null, 2));
    console.log(`====================================================\n`);

    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message.join(", ")
      : errorData.message;

    throw new Error(errorMessage || response.statusText);
  }

  const parsedResponse = await response.json();

  console.log(`\n================ API SUCCESS RESPONSE ================`);
  console.log(`[STATUS]: ${response.status} ${response.statusText}`);
  console.log(
    `[DATA]:`,
    JSON.stringify(parsedResponse, null, 2).substring(0, 1000) +
      (JSON.stringify(parsedResponse).length > 1000 ? "... (truncated)" : "")
  );
  console.log(`======================================================\n`);

  if (isServer && cookieStore) {
    const accessToken =
      parsedResponse.accessToken ||
      parsedResponse.access_token ||
      parsedResponse.data?.accessToken ||
      parsedResponse.data?.access_token;

    const refreshToken =
      parsedResponse.refreshToken ||
      parsedResponse.refresh_token ||
      parsedResponse.data?.refreshToken ||
      parsedResponse.data?.refresh_token;

    if (accessToken || refreshToken) {
      const cookieDefaults = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      };

      if (accessToken) {
        cookieStore.set("accessToken", accessToken, cookieDefaults);
      }

      if (refreshToken) {
        cookieStore.set("refreshToken", refreshToken, cookieDefaults);
      }
    }
  }

  return parsedResponse;
}
