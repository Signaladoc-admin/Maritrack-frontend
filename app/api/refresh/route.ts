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
    const zoneId = cookieStore.get("zoneId")?.value ?? null;

    return NextResponse.json({ accessToken, zoneId });
  } catch {
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }
}
