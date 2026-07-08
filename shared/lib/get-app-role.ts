import { cookies } from "next/headers";
import { decodeJwt } from "jose";

/**
 * Reads the access / refresh token cookie and returns the app role exactly
 * as AuthProvider derives it: businessRole set → "BUSINESS", otherwise "PARENT".
 * Returns null when no valid token is present.
 */
export async function getAppRole(): Promise<"BUSINESS" | "PARENT" | null> {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("accessToken")?.value ??
    cookieStore.get("refreshToken")?.value;

  if (!token) return null;

  try {
    const payload = decodeJwt(token);
    const businessRole = (payload as any).businessRole;
    return businessRole ? "BUSINESS" : "PARENT";
  } catch {
    return null;
  }
}
