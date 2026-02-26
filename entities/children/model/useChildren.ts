import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";
import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import {
  createChildAction,
  getChildrenAction,
  getChildByIdAction,
  updateChildAction,
  deleteChildAction,
} from "../api/child.actions";
import type { ChildProfile, CreateChildDto, UpdateChildDto, ChildFilterParams } from "../schema";

const childActions: ResourceActions<ChildProfile, CreateChildDto, UpdateChildDto> = {
  getAll: async (options?: ChildFilterParams) => {
    try {
      const data = await getChildrenAction(options);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  getById: async (id: string) => {
    try {
      const data = await getChildByIdAction(id);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  create: async (data: CreateChildDto) => {
    try {
      const result = await createChildAction(data);
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  update: async (id: string, data: UpdateChildDto) => {
    try {
      const result = await updateChildAction(id, data);
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  delete: async (id: string) => {
    try {
      await deleteChildAction(id);
      return { success: true, data: undefined };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

export const {
  useGetAll: useChildren,
  useGetById: useChild,
  useCreate: useCreateChild,
  useUpdate: useUpdateChild,
  useDelete: useDeleteChild,
} = createResourceHooks<ChildProfile, CreateChildDto, UpdateChildDto>("children", childActions);

export const useChildrenByParent = (parentId: string | null | undefined) => {
  return useServerActionQuery(
    ["children", "list", { parentId }],
    childActions.getAll,
    [{ parentId: parentId as string }],
    { enabled: !!parentId }
  );
};
