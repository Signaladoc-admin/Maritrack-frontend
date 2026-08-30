"use server";

import { redirect } from "next/navigation";
import { refreshAccessToken } from "./api/refresh-token";
import axios, { AxiosResponse } from "axios";
import https from "https";

function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload;
    if (typeof Buffer !== 'undefined') {
      jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
    } else {
      jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

// Cloudflare drops Node 22's default TLS 1.3 ClientHello (due to Kyber cryptography fragmentation on some networks)
// Forcing TLSv1.2 prevents the ECONNRESET socket disconnect error.
// We also enable keepAlive: true to prevent "socket hang up" on sequential API calls.
const httpsAgent = new https.Agent({
  maxVersion: "TLSv1.2",
  keepAlive: true,
  scheduling: "lifo", // Re-use most recently used sockets first to avoid Cloudflare idle disconnects
});

let refreshPromise: Promise<string | null> | null = null;

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit & {
    noRedirect?: boolean;
    skipAuth?: boolean;
    params?: Record<string, string | number | boolean | undefined>;
  } = {}
): Promise<T> {
  const isServer = typeof window === "undefined";
  const { noRedirect, skipAuth, params, ...fetchOptions } = options;
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
    if (typeof fetchOptions.body === "string") {
      headers["Content-Length"] = String(Buffer.byteLength(fetchOptions.body));
    }
  }

  if (accessToken && !skipAuth) {
    const payload = decodeJwt(accessToken);
    if (payload && payload.exp && !endpoint.includes("/login") && !endpoint.includes("/refresh")) {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = payload.exp - now;

      if (timeLeft <= 0) {
        if (isServer && cookieStore) {
          cookieStore.delete("accessToken");
          cookieStore.delete("refreshToken");
          cookieStore.delete("isEmailVerified");
          cookieStore.delete("isOnboarded");
        }
        redirect("/login");
      } else if (timeLeft < 3 * 60) {
        try {
          if (!refreshPromise) {
            refreshPromise = refreshAccessToken().finally(() => {
              refreshPromise = null;
            });
          }
          const newAccessToken = await refreshPromise;
          if (newAccessToken) {
            accessToken = newAccessToken;
          } else {
            if (isServer && cookieStore) {
              cookieStore.delete("accessToken");
              cookieStore.delete("refreshToken");
              cookieStore.delete("isEmailVerified");
              cookieStore.delete("isOnboarded");
            }
            redirect("/login");
          }
        } catch {
          if (isServer && cookieStore) {
            cookieStore.delete("accessToken");
            cookieStore.delete("refreshToken");
            cookieStore.delete("isEmailVerified");
            cookieStore.delete("isOnboarded");
          }
          redirect("/login");
        }
      }
    }

    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response: AxiosResponse;
  try {
    response = await axios({
      url,
      method: fetchOptions.method || "GET",
      data: fetchOptions.body,
      headers,
      httpsAgent,
      timeout: 30000, // 30 seconds request timeout to prevent hanging
      validateStatus: () => true, // Resolve promise for all HTTP status codes
    });
  } catch (error: any) {
    console.error(`[apiClient] Fetch error for ${url}:`, error);
    // Axios throws on network errors, timeouts, CORS, etc. (since we bypass validateStatus for HTTP codes)
    const err: any = new Error("No internet connection. Please check your network and try again.");
    err.isNetworkError = true;
    throw err;
  }

  const isOk = response.status >= 200 && response.status < 300;

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
          cookieStore.delete("isEmailVerified");
          cookieStore.delete("isOnboarded");
        }
        redirect("/login");
      }

      headers["Authorization"] = `Bearer ${newAccessToken}`;

      response = await axios({
        url,
        method: fetchOptions.method || "GET",
        data: fetchOptions.body,
        headers,
        httpsAgent,
        timeout: 30000,
        validateStatus: () => true,
      });
    } catch {
      if (isServer && cookieStore) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        cookieStore.delete("isEmailVerified");
        cookieStore.delete("isOnboarded");
      }
      redirect("/login");
    }
  }

  // Check response OK after potential 401 retry
  const isFinalOk = response.status >= 200 && response.status < 300;

  if (!isFinalOk) {
    const errorData = response.data || {};
    const message = errorData?.message;

    const errorMessage = Array.isArray(message)
      ? message.filter((m: any) => typeof m === "string").join(", ") ||
      message.map((m: any) => (typeof m === "object" ? JSON.stringify(m) : String(m))).join(", ")
      : typeof message === "string"
        ? message
        : response.statusText || `Request failed with status ${response.status}`;

    const error: any = new Error(errorMessage);
    error.isBackendError = true;
    error.status = response.status;
    error.responseData = response.data;
    throw error;
  }

  // Axios automatically parses JSON to response.data
  // If it was text, it will be a string. But assuming parsed JSON.
  const parsedResponse = typeof response.data === "string" && response.data.trim().startsWith("{")
    ? JSON.parse(response.data)
    : response.data;

  // Persist both tokens to httpOnly cookies so server actions can authenticate.
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
