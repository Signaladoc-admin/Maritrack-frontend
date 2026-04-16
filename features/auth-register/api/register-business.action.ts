"use server";

import { createBusinessAction } from "@/entities/business/api/business.actions";
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
    () => createBusinessAction(data),
    "Business registration failed. Please try again."
  );
}
