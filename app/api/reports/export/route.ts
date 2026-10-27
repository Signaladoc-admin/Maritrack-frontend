import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  maxVersion: "TLSv1.2",
  keepAlive: true,
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dev-api.flentra.io/api/v1";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const report = searchParams.get("report"); // "user" | "device"
    const type = searchParams.get("type") || "csv"; // "csv" | "xlxs" | "xlsx"

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required. Please log in again." },
        { status: 401 }
      );
    }

    const formatType =
      type.toLowerCase() === "csv" ? "CSV" : "XLSX";

    let endpoint = "";
    if (report === "user") {
      endpoint = `/device-finance-user/export/retailer?type=${formatType}`;
    } else if (report === "device") {
      endpoint = `/devices/export/retailer?type=${formatType}`;
    } else {
      return NextResponse.json(
        { error: "Invalid report type specified" },
        { status: 400 }
      );
    }

    const targetUrl = `${API_BASE_URL}${endpoint}`;

    let response = await axios({
      url: targetUrl,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
      responseType: "arraybuffer",
      validateStatus: () => true,
    });

    // If device report returns 403 on retailer, fallback to partner device export endpoint
    if (response.status === 403 && report === "device") {
      response = await axios({
        url: `${API_BASE_URL}/devices/export/partner?type=${formatType}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpsAgent,
        responseType: "arraybuffer",
        validateStatus: () => true,
      });
    }

    if (response.status >= 400) {
      let errorMessage = "Failed to export report";
      try {
        const errorJson = JSON.parse(Buffer.from(response.data).toString("utf-8"));
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // Not JSON
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    // Check if the response is JSON containing a download link
    const rawContentType = response.headers["content-type"];
    const contentType = typeof rawContentType === "string" ? rawContentType : String(rawContentType || "");
    if (contentType.includes("application/json")) {
      const jsonStr = Buffer.from(response.data).toString("utf-8");
      try {
        const parsed = JSON.parse(jsonStr);
        if (parsed?.data?.link || parsed?.link) {
          return NextResponse.json(parsed);
        }
      } catch {
        // Not valid JSON, treat as file
      }
    }

    // Determine download filename
    const filenameHeader = response.headers["content-disposition"];
    const filenameHeaderStr = typeof filenameHeader === "string" ? filenameHeader : "";
    const matchedFilename = filenameHeaderStr.match(/filename="?([^";]+)"?/)?.[1];
    const extension = formatType === "CSV" ? "csv" : "xlsx";
    const filename = matchedFilename || `${report}-report.${extension}`;

    const resContentType: string =
      contentType ||
      (formatType === "CSV"
        ? "text/csv; charset=utf-8"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    return new Response(response.data, {
      status: 200,
      headers: {
        "Content-Type": resContentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("[Reports Export API Error]", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
