import { cookies } from "next/headers";

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
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || response.statusText || "An unexpected error occurred");
  }

  return response.json();
}
