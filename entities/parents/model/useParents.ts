import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";
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
  update: async (id: string, data: UpdateParentDto) => {
    try {
      const result = await updateParentAction(id, data);
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
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
  useGetAll: useParents,
  useGetById: useParent,
  useCreate: useCreateParent,
  useUpdate: useUpdateParent,
  useDelete: useDeleteParent,
} = createResourceHooks<ParentProfile, CreateParentDto, UpdateParentDto>("parents", parentActions);
