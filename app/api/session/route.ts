import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Returns the current access token from the httpOnly cookie without refreshing it.
 * Used by AuthProvider on mount to rehydrate Zustand when the token is still valid,
 * avoiding an unnecessary refresh call right after login.
 */
export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  return NextResponse.json({ accessToken });
}
