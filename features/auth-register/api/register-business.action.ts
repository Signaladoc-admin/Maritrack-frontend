"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";

export async function registerBusinessAction(data: {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationSize: string;
  adminBusinessRole: string;
  estimatedDevices: number;
  address: string;
  country: string;
  state: string;
  password: string;
}) {
  return withSafeAction(
    () => apiClient("/businesses", { method: "POST", body: JSON.stringify(data), noRedirect: true }),
    "Business registration failed. Please try again."
  );
}
