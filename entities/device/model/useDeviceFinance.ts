"use client";

import { useServerActionMutation } from "@/shared/api/server-action-hooks";
import { createDeviceFinanceAction, CreateDeviceFinanceDto } from "../api/device-finance.actions";

export function useCreateDeviceFinance() {
  return useServerActionMutation((data: CreateDeviceFinanceDto) => createDeviceFinanceAction(data));
}
