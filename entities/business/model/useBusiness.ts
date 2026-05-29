import {
    createBusinessAction,
    deleteBusinessAction,
    getBusinessAction,
    getBusinessesAction,
    updateBusinessAction,
} from "../api/business.actions";

import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";
import type { UpdateBusinessDto } from "../schema";
import { Business, RegisterBusinessRequest as CreateBusinessDto } from "../types";
import type { ApiResponse } from "@/shared/api/types";

const businessActions: ResourceActions<Business, CreateBusinessDto, UpdateBusinessDto> = {
    getAll: async (options?: any) => {
        try {
            const data = await getBusinessesAction(options);
            return { success: true, data };
        } catch (error: any) {
            return { success: false, error: error?.message || "Failed to fetch businesses" };
        }
    },
    getById: async (id: string) => {
        try {
            const res = await getBusinessAction(id) as { success: true; data: ApiResponse<Business> } | { success: false; error: any };
            if (res.success) {
                return { success: true, data: res.data.data };
            }
            return { success: false, error: String(res.error || "Failed to fetch business") };
        } catch (error: any) {
            return { success: false, error: error?.message || "Failed to fetch business" };
        }
    },
    create: async (data: CreateBusinessDto) => {
        try {
            const res = await createBusinessAction(data);
            if (res.success) {
                return { success: true, data: res.data as unknown as Business };
            }
            return { success: false, error: res.error };
        } catch (error: any) {
            return { success: false, error: error?.message || "Failed to create business" };
        }
    },
    update: async (id: string, data: UpdateBusinessDto) => {
        try {
            const res = await updateBusinessAction({ id, ...data });
            if (res.success) {
                return { success: true, data: res.data as unknown as Business };
            }
            return { success: false, error: res.error };
        } catch (error: any) {
            return { success: false, error: error?.message || "Failed to update business" };
        }
    },
    delete: async (id: string) => {
        try {
            const res = await deleteBusinessAction(id);
            if (res.success) {
                return { success: true, data: undefined };
            }
            return { success: false, error: res.error };
        } catch (error: any) {
            return { success: false, error: error?.message || "Failed to delete business" };
        }
    },
};

export const {
    useGetAll: useGetBusinesses,
    useGetById: useGetBusiness,
    useCreate: useCreateBusiness,
    useUpdate: useUpdateBusiness,
    useDelete: useDeleteBusiness,
} = createResourceHooks<
    Business,
    CreateBusinessDto,
    UpdateBusinessDto
>(
    "businesses",
    businessActions
);