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

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import type { BusinessProfileData } from "../types";
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
    try {
      const data = await getBusinessAction(id);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
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

export function useCreateBusinessProfile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      data: Parameters<typeof createBusinessProfileAction>[0]
    ): Promise<ActionResponse> => {
      const result = await createBusinessProfileAction(data);
      return {
        status: result.success,
        error: result.success ? null : (result.error ?? null),
        data: result.success ? result.data : null,
      };
    },
    onSuccess: (res) => {
      if (res.status) {
        queryClient.setQueryData(["business-profile"], res.data);
        toast({ type: "success", title: "Business profile created successfully" });
      } else {
        toast({
          type: "error",
          title: "Failed to create business profile",
          message: res.error ?? undefined,
        });
      }
    },
  });

  return {
    createBusinessProfile: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}

export function useUpdateBusinessProfile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      data: Parameters<typeof updateBusinessProfileAction>[0]
    ): Promise<ActionResponse> => {
      const result = await updateBusinessProfileAction(data);
      return {
        status: result.success,
        error: result.success ? null : (result.error ?? null),
        data: result.success ? result.data : null,
      };
    },
    onSuccess: (res) => {
      if (res.status) {
        queryClient.setQueryData(["business-profile"], res.data);
        toast({ type: "success", title: "Business profile updated successfully" });
      } else {
        toast({
          type: "error",
          title: "Failed to update business profile",
          message: res.error ?? undefined,
        });
      }
    },
  });

  return {
    updateBusinessProfile: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}

// export function useGetBusinessProfile(businessId: string | null | undefined) {
//   return useServerActionQuery<BusinessProfileData, [string]>(
//     ["business-profile", businessId ?? ""],
//     getBusinessProfileAction,
//     [businessId as string],
//     { enabled: !!businessId }
//   );
// }

// export function useUpdateBusiness() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: async (data: Parameters<typeof updateBusinessAction>[0]) => {
//       const result = await updateBusinessAction(data);
//       if (!result.success) throw new Error(result.error);
//       return result.data;
//     },
//     onSuccess: (data) => {
//       queryClient.setQueryData(["business"], data);
//     },
//     onError: (err: any) => {
//       const errorMessage = err.message || "An unexpected error occurred. Please try again.";
//       toast({
//         type: "error",
//         title: "Failed to update business",
//         message: errorMessage,
//       });
//     },
//   });

//   return {
//     updateBusiness: mutation.mutateAsync,
//     isSubmitting: mutation.isPending,
//     error: mutation.error?.message || null,
//     mutation,
//   };
// }
