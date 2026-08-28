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
