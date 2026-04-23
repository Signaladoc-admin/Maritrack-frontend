import {
  createBusinessAction,
  deleteBusinessAction,
  getBusinessAction,
  updateBusinessAction,
} from "../api/business.actions";

import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";
import type { CreateBusinessDto, UpdateBusinessDto } from "../schema";
import { Business } from "../types";

const businessActions: ResourceActions<Business, CreateBusinessDto, UpdateBusinessDto> = {
  getAll: async (options?: any) => {
    return await getBusinessAction(options);
  },
  getById: async (id: string) => {
    return await getBusinessAction(id);
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
