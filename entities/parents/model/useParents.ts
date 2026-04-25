import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";
import { useServerActionMutation } from "@/shared/api/server-action-hooks";
import { useQueryClient } from "@tanstack/react-query";
import {
  createParentAction,
  getParentsAction,
  getParentByIdAction,
  updateParentAction,
  deleteParentAction,
} from "../api/parent.actions";
import type { ParentProfile, CreateParentDto, UpdateParentDto } from "../schema";

const parentActions: ResourceActions<ParentProfile, CreateParentDto, UpdateParentDto> = {
  getAll: async (options?: any) => {
    try {
      const data = await getParentsAction(options);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  getById: async (id: string) => {
    try {
      const data = await getParentByIdAction(id);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  create: async (data: CreateParentDto) => {
    try {
      const result = await createParentAction(data);
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  // update is handled by the standalone useUpdateParent hook below
  update: async () => ({ success: false, error: "Use useUpdateParent hook" }),
  delete: async (id: string) => {
    try {
      await deleteParentAction(id);
      return { success: true, data: undefined };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

export const {
  useGetAll: useGetParents,
  useGetById: useGetParent,
  useCreate: useCreateParent,
  useDelete: useDeleteParent,
} = createResourceHooks<ParentProfile, CreateParentDto, UpdateParentDto>("parents", parentActions);

// Standalone update hook — returns the full API response (status, message, data)
// instead of unwrapping to just data like createResourceHooks does.
export function useUpdateParent() {
  const queryClient = useQueryClient();
  return useServerActionMutation(
    async ({ id, ...data }: { id: string } & UpdateParentDto) => {
      try {
        const result = await updateParentAction(id, data);
        return { success: true as const, data: result };
      } catch (error: any) {
        return { success: false as const, error: error.message as string };
      }
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["parents", "list"] });
        queryClient.invalidateQueries({ queryKey: ["parents", "detail", variables.id] });
      },
    }
  );
}
