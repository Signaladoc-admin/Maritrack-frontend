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
} from "../api/user.actions";
import type { UpdateProfileDto, SupportRequestDto, UserFilterParams } from "./user.schema";
import { useToast } from "@/shared/ui/toast";

// --- Profile Hooks ---

export function useUserProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfileAction,
  });
}

export function useUserById(id: string) {
  return useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => getUserByIdAction(id),
    enabled: !!id,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateProfileDto) => updateProfileAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast({
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been updated successfully.",
      });
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Update Failed",
        message: err.message || "Failed to update profile.",
      });
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
