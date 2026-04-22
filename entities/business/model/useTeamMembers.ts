import {
  createTeamMemberAction,
  createTeamMembersAction,
  deleteTeamMemberAction,
  getTeamMemberAction,
  getTeamMembersAction,
  updateTeamMemberAction,
} from "../api/team-members.actions";
import { createResourceHooks, ResourceActions } from "@/shared/api/createResourceHooks";
import { BusinessStaff } from "../types";
import { TeamMemberSchemaValues as TeamMemberDto } from "@/features/onboarding/business/schema";

const businessActions: ResourceActions<BusinessStaff, TeamMemberDto> = {
  getAll: async (options?: any) => await getTeamMembersAction(options),
  getById: async (id: string) => await getTeamMemberAction(id),
  create: async (data: TeamMemberDto) => await createTeamMemberAction(data),
  createMultiple: async (data: TeamMemberDto[]) => await createTeamMembersAction(data),
  update: async (id: string, data: TeamMemberDto) => await updateTeamMemberAction(id, data),
  delete: async (id: string) => await deleteTeamMemberAction(id),
};

export const {
  useGetAll: useGetTeamMembers,
  useGetById: useGetTeamMember,
  useCreate: useCreateTeamMember,
  useCreateMultiple: useCreateTeamMembers,
  useUpdate: useUpdateTeamMember,
  useDelete: useDeleteTeamMember,
} = createResourceHooks<BusinessStaff, TeamMemberDto, TeamMemberDto>(
  "team-members",
  businessActions
);
