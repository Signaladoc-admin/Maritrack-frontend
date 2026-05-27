"use server";

import { createBusinessAction } from "@/entities/business/api/business.actions";
import { withSafeAction } from "@/shared/lib/safe-action";
import { RegisterBusinessRequest } from "../types";

export async function registerBusinessAction(data: RegisterBusinessRequest) {
  return withSafeAction(
    async () => createBusinessAction(data),
    "Business registration failed. Please try again."
  );
}
