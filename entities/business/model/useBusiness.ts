import {
  createBusinessAction,
  deleteBusinessAction,
  getBusinessAction,
  getBusinessesAction,
  updateBusinessAction,
} from "../api/business.actions";

import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";
import type { CreateBusinessDto, UpdateBusinessDto } from "../schema";
import { Business } from "../types";

const businessActions: ResourceActions<Business, CreateBusinessDto, UpdateBusinessDto> = {
  getAll: async (options?: any) => {
    try {
      const data = await getBusinessesAction(options);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  getById: async (id: string) => {
    const res = await getBusinessAction(id);
    if (res.success && res.data?.data) {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: String(res.error || "Business not found") };
  },
  create: async (data: CreateBusinessDto) => {
    return await createBusinessAction(data);
  },
  update: async (id: string, data: UpdateBusinessDto) => {
    return await updateBusinessAction({ id, ...data });
  },
  delete: async (id: string) => {
    return await deleteBusinessAction(id);
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
