import {
  getBusinessProfileAction,
  createBusinessProfileAction,
  updateBusinessProfileAction,
  deleteBusinessProfileAction,
} from "../api/business.actions";

import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";
import type { BusinessProfileDto } from "../schema";
import { BusinessProfile } from "../types";

const businessActions: ResourceActions<BusinessProfile, BusinessProfileDto> = {
  getAll: async (options?: any) => {
    try {
      const data = await getBusinessProfileAction(options);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  getById: async (id: string) => {
    return await getBusinessProfileAction(id);
  },
  create: async (data: BusinessProfileDto) => {
    try {
      const result = await createBusinessProfileAction(data);
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  update: async (id: string, data: BusinessProfileDto) => {
    try {
      const result = await updateBusinessProfileAction({ id, ...data });
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  delete: async (id: string) => {
    try {
      await deleteBusinessProfileAction(id);
      return { success: true, data: undefined };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

export const {
  useGetAll: useGetBusinessProfiles,
  useGetById: useGetBusinessProfile,
  useCreate: useCreateBusinessProfile,
  useUpdate: useUpdateBusinessProfile,
  useDelete: useDeleteBusinessProfile,
} = createResourceHooks<BusinessProfile, BusinessProfileDto>("business-profiles", businessActions);
