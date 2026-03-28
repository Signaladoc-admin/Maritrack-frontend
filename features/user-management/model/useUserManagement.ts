"use client";

import { useQueryClient } from "@tanstack/react-query";
import { createResourceHooks } from "@/shared/api/createResourceHooks";
import { useServerActionMutation } from "@/shared/api/server-action-hooks";
import type { UserProfile, AdminUpdateProfileDto } from "@/entities/user/model/user.schema";
import {
  getAllUsersAction,
  getUserByIdAction,
  adminUpdateUserAction,
  adminDeleteUserAction,
  deactivateUserAction,
  initiateDeleteAction,
  deleteUserAction,
} from "../api/user-management.actions";
import type { ActionResult } from "@/shared/api/types";

// --- Standard CRUD hooks via createResourceHooks ---

const userManagementActions = {
  getAll: getAllUsersAction,
  getById: getUserByIdAction,
  create: async (_data: any): Promise<ActionResult<UserProfile>> => {
    // User creation is handled by the register flow; this is a no-op placeholder
    return { success: false, error: "Use the registration flow to create users." };
  },
  update: adminUpdateUserAction,
  delete: adminDeleteUserAction,
};

export const {
  keys: userKeys,
  useGetAll: useGetAllUsers,
  useGetById: useGetUserById,
  useUpdate: useAdminUpdateUser,
  useDelete: useAdminDeleteUser,
} = createResourceHooks<UserProfile, any, AdminUpdateProfileDto>("users", userManagementActions);

// --- Additional Admin Hooks ---

export function useDeactivateUser() {
  const queryClient = useQueryClient();
  return useServerActionMutation(deactivateUserAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}

export function useInitiateDeleteUser() {
  const queryClient = useQueryClient();
  return useServerActionMutation(initiateDeleteAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useServerActionMutation(deleteUserAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}
