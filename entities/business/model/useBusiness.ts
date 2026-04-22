import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/ui/toast";

export interface ActionResponse<T = any> {
  status: boolean;
  error: string | null;
  data: T | null;
}
import {
  createBusinessAction,
  createBusinessProfileAction,
  deleteBusinessAction,
  getBusinessAction,
  updateBusinessAction,
  updateBusinessProfileAction,
} from "../api/business.actions";

import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";
import type { CreateBusinessDto, UpdateBusinessDto } from "../schema";
import { Business } from "../types";

const businessActions: ResourceActions<Business, CreateBusinessDto, UpdateBusinessDto> = {
  getAll: async (options?: any) => {
    try {
      const data = await getBusinessAction(options);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  getById: async (id: string) => {
    return await getBusinessAction(id);
  },
  create: async (data: CreateBusinessDto) => {
    try {
      const result = await createBusinessAction(data);
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  update: async (id: string, data: UpdateBusinessDto) => {
    try {
      const result = await updateBusinessAction({ id, ...data });
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  delete: async (id: string) => {
    try {
      await deleteBusinessAction(id);
      return { success: true, data: undefined };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

export const {
  useGetAll: useGetBusinesses,
  useGetById: useGetBusiness,
  useCreate: useCreateBusiness,
  useUpdate: useUpdateBusiness,
  useDelete: useDeleteBusiness,
} = createResourceHooks<Business, CreateBusinessDto, UpdateBusinessDto>(
  "businesses",
  businessActions
);
