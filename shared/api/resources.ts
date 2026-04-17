import {
  useGetParents,
  useGetParent,
  useCreateParent,
  useUpdateParent,
  useDeleteParent,
} from "@/entities/parents/model/useParents";

import {
  userKeys,
  useGetAllUsers,
  useGetUserById,
  useAdminUpdateUser,
  useAdminDeleteUser,
  useDeactivateUser,
  useInitiateDeleteUser,
  useDeleteUser,
} from "@/features/user-management/model/useUserManagement";

export const parentHooks = {
  useGetAll: useGetParents,
  useGetById: useGetParent,
  useCreate: useCreateParent,
  useUpdate: useUpdateParent,
  useDelete: useDeleteParent,
};

export const userHooks = {
  keys: userKeys,
  useGetAll: useGetAllUsers,
  useGetById: useGetUserById,
  useUpdate: useAdminUpdateUser,
  useDelete: useAdminDeleteUser,
  useDeactivate: useDeactivateUser,
  useInitiateDelete: useInitiateDeleteUser,
  useAdminDelete: useAdminDeleteUser,
  useDeleteUser: useDeleteUser,
};
