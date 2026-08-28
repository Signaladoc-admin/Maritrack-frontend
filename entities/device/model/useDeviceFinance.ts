"use client";

import { useServerActionMutation } from "@/shared/api/server-action-hooks";
import { useQuery } from "@tanstack/react-query";
import {
  createDeviceFinanceAction,
  CreateDeviceFinanceDto,
  getDeviceFinanceAction,
  markPlanAsPaidAction
} from "../api/device-finance.actions";

export function useCreateDeviceFinance() {
  return useServerActionMutation((data: CreateDeviceFinanceDto) => createDeviceFinanceAction(data));
}

export function useDeviceFinanceDetails(id?: string) {
  return useQuery({
    queryKey: ["device-finance", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await getDeviceFinanceAction(id);
      if (res.success) return res.data;

      throw new Error(res.error || "Failed to fetch device finance details");
    },
    enabled: !!id,
  });
}

export function useMarkPlanAsPaid() {
  return useServerActionMutation(
    ({ installmentId, amountKobo }: { installmentId: string; amountKobo: number }) =>
      markPlanAsPaidAction(installmentId, amountKobo)
  );
}

import { checkDeviceFinanceUserAction } from "../api/device-finance-user.actions";

export function useDeviceFinanceUserCheck() {
  return useQuery({
    queryKey: ["device-finance-user-check"],
    queryFn: async () => {
      const res = await checkDeviceFinanceUserAction();
      if (res.success) return res.data;
      throw new Error(res.error || "Failed to check device finance user");
    },
  });
}
