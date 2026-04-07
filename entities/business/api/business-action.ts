"use server";

import { apiClient } from "@/shared/lib/api-client";

export async function updateBusinessAction({
  id,
  ...data
}: {
  id: string;
  name: string;
  email: string;
  estimatedDevices: number;
  country: string;
  state: string;
}): Promise<any> {
  return apiClient(`/businesses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    noRedirect: true,
  });
}
