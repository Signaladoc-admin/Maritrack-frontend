"use server";

import { apiClient } from "@/shared/lib/api-client";

export async function registerBusinessAction(data: {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationSize: string;
  adminBusinessRole: string;
  estimatedDevices: number;
  country: string;
  state: string;
  password: string;
}): Promise<any> {
  return apiClient("/businesses", {
    method: "POST",
    body: JSON.stringify(data),
    noRedirect: true,
  });
}
