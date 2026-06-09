import {
  createStaffMemberAction,
  createStaffsBulkAction,
  deleteStaffMemberAction,
  getStaffMemberAction,
  getStaffMembersAction,
  updateStaffMemberAction,
} from "../api/staff.actions";
import { createResourceHooks, ResourceActions } from "@/shared/api/createResourceHooks";
import { BusinessStaff, StaffMembersPaginatedResponse } from "../types";
import { StaffMemberValues as StaffMemberDto } from "@/features/onboarding/business/schema";
import { PaginatedResponse, QueryOptions } from "@/shared/api/types";

const businessActions: ResourceActions<
  BusinessStaff,
  StaffMemberDto,
  StaffMemberDto,
  StaffMembersPaginatedResponse
> = {
  getAll: async (options?: QueryOptions) => await getStaffMembersAction(options),
  getById: async (id: string) => await getStaffMemberAction(id),
  create: async (data: StaffMemberDto) => await createStaffMemberAction(data),
  createMultiple: async (data: StaffMemberDto[]) => await createStaffsBulkAction(data),
  update: async (id: string, data: StaffMemberDto) => await updateStaffMemberAction(id, data),
  delete: async (id: string) => await deleteStaffMemberAction(id),
};

export const {
  useGetAll: useGetStaffMembers,
  useGetById: useGetStaffMember,
  useCreate: useCreateStaffMember,
  useCreateMultiple: useCreateStaffMembers,
  useUpdate: useUpdateStaffMember,
  useDelete: useDeleteStaffMember,
} = createResourceHooks<
  BusinessStaff,
  StaffMemberDto,
  StaffMemberDto,
  StaffMembersPaginatedResponse
>("staff-members", businessActions);
