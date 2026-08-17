"use client";

import { useServerActionMutation, useServerActionQuery } from "@/shared/api/server-action-hooks";
import {
  createDeviceFinanceAction,
  CreateDeviceFinanceDto,
  getDeviceFinanceByDeviceIdAction,
} from "../api/device-finance.actions";

export function useCreateDeviceFinance() {
  return useServerActionMutation((data: CreateDeviceFinanceDto) => createDeviceFinanceAction(data));
}

export function useGetDeviceFinanceByDeviceId(deviceId: string) {
  return useServerActionQuery(
    ["device-finance", deviceId],
    getDeviceFinanceByDeviceIdAction,
    [deviceId],
    {
      enabled: !!deviceId,
    }
  );
}
