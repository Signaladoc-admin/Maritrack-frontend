"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createParentalControlAction,
  getParentalControlByParentIdAction,
  getMdmPolicyByParentIdAction,
  updateParentalControlAction,
  getParentalControlMeAction,
} from "../api/parental-controls.actions";
import type { ParentalControlDto } from "./parental-controls.schema";
import { useToast } from "@/shared/ui/toast";

export const parentalControlKeys = {
  all: ["parental-controls"] as const,
  byParentId: (parentId: string) => ["parental-controls", "parent", parentId] as const,
  policyByParentId: (parentId: string) => ["parental-controls", "policy", parentId] as const,
  me: ["parental-controls", "me"] as const,
};

export function useCreateParentalControl() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ParentalControlDto) => createParentalControlAction(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: parentalControlKeys.all });
      toast({
        type: "success",
        title: "Success",
        message: "Parental controls saved successfully.",
      });
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Error",
        message: err.message || "Failed to save parental controls.",
      });
    },
  });
}

export function useUpdateParentalControl() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Partial<ParentalControlDto>) => updateParentalControlAction(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: parentalControlKeys.all });
      toast({
        type: "success",
        title: "Success",
        message: "Parental controls updated successfully.",
      });
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Error",
        message: err.message || "Failed to update parental controls.",
      });
    },
  });
}

export function useParentalControlByParentId(parentId: string | undefined) {
  return useQuery({
    queryKey: parentalControlKeys.byParentId(parentId || ""),
    queryFn: () => getParentalControlByParentIdAction(parentId!),
    enabled: !!parentId,
    retry: 1, // Don't retry too much if it doesn't exist yet
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching when refocusing the browser
  });
}

export function useMdmPolicyByParentId(parentId: string | undefined) {
  return useQuery({
    queryKey: parentalControlKeys.policyByParentId(parentId || ""),
    queryFn: () => getMdmPolicyByParentIdAction(parentId!),
    enabled: !!parentId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useParentalControlMe() {
  return useQuery({
    queryKey: parentalControlKeys.me,
    queryFn: () => getParentalControlMeAction(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
