import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/shared/lib/api/refresh-token";

export async function POST() {
  try {
    const accessToken = await refreshAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }
    return NextResponse.json({ accessToken });
  } catch {
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }
}
