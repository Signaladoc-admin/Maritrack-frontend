"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfileAction,
  getUserByIdAction,
  updateProfileAction,
  searchUsersAction,
  filterUsersAction,
  checkEmailAction,
  supportRequestAction,
  checkIfEmailExistsAction,
} from "../api/user.actions";
import type { SupportRequestDto, UserFilterParams } from "./user.schema";
import { useToast } from "@/shared/ui/toast";

// --- Profile Hooks ---

export function useUserProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfileAction,
  });
}

export function useUserById(id: string, options?: {enabled: boolean}) {
  return useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => getUserByIdAction(id),
    enabled: !!id,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}

// --- Search & Filter Hooks ---

export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: ["users-search", query],
    queryFn: () => searchUsersAction(query),
    enabled: query.length > 0,
  });
}

export function useFilterUsers(params: UserFilterParams) {
  return useQuery({
    queryKey: ["users-filter", params],
    queryFn: () => filterUsersAction(params),
    enabled: !!(params.name || params.status || params.role),
  });
}

// --- Email Check ---

export function useCheckEmail(email: string) {
  return useQuery({
    queryKey: ["check-email", email],
    queryFn: () => checkEmailAction(email),
    enabled: !!email && email.includes("@"),
  });
}

// --- Support ---

export function useSupportRequest() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: SupportRequestDto) => supportRequestAction(data),
    onSuccess: () => {
      toast({
        type: "success",
        title: "Request Sent",
        message: "Your support request has been submitted.",
      });
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Request Failed",
        message: err.message || "Failed to send support request.",
      });
    },
  });
}

export function useUserExists(email: string) {
  return useQuery({
    queryKey: ["user-exists", email],
    queryFn: () => checkIfEmailExistsAction(email),
    enabled: !!email && email.includes("@"),
  });
}
