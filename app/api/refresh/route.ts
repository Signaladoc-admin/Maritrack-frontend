import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/shared/lib/api/refresh-token";

export async function POST() {
  try {
    const accessToken = await refreshAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }
    const cookieStore = await cookies();
    // NUDGE: Remove userMeta temporary cookie retrieval when session restore gets unified on backend
    const userMetaStr = cookieStore.get("userMeta")?.value;
    const userMeta = userMetaStr ? JSON.parse(userMetaStr) : null;

    return NextResponse.json({ accessToken, userMeta });
  } catch {
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }
}
