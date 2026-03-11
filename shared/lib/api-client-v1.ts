import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/login");
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    const message = error?.message || error?.error || res.statusText || "Something went wrong";

    throw new Error(message);
  }

  const data = await res.json();

  return data;
}
