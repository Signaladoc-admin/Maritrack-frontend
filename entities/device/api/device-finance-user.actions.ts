"use server";
import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";

export async function checkDeviceFinanceUserAction() {
  return withSafeAction(async () => {
    const res = await apiClient(`/device-finance-user`, {
      method: "GET",
      noRedirect: true,
    });
    return res;
  }, "Failed to fetch device finance users");
}

export async function exportRetailerUserReportAction(type: "CSV" | "XLSX" | "csv" | "xlxs" = "CSV") {
  return withSafeAction(async () => {
    const format = type.toUpperCase() === "XLXS" || type.toUpperCase() === "XLSX" ? "XLSX" : "CSV";
    const res = await apiClient(`/device-finance-user/export/retailer`, {
      method: "GET",
      params: { type: format },
    });
    return res;
  }, "Failed to export retailer user report");
}

