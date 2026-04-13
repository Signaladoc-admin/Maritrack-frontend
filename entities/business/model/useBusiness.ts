import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/ui/toast";
import {
  createBusinessProfileAction,
  getBusinessProfileAction,
  updateBusinessAction,
  updateBusinessProfileAction,
} from "../api/business-action";
import { useServerActionQuery } from "@/shared/api/server-action-hooks";

export function useGetBusinessProfile(id: string) {
  return useServerActionQuery(["business-profile", id], getBusinessProfileAction, [id], {
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 0,
  });
}
export function useCreateBusinessProfile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Parameters<typeof createBusinessProfileAction>[0]) => {
      const result = await createBusinessProfileAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["business-profile"], data);
      toast({
        type: "success",
        title: "Business profile created successfully",
        message: "Business profile created successfully",
      });
    },
    onError: (err: any) => {
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      toast({
        type: "error",
        title: "Failed to create business profile",
        message: errorMessage,
      });
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
    mutationFn: async (data: Parameters<typeof updateBusinessProfileAction>[0]) => {
      const result = await updateBusinessProfileAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["business-profile"], data);
      toast({
        type: "success",
        title: "Business profile updated successfully",
        message: "Business profile updated successfully",
      });
    },
    onError: (err: any) => {
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      toast({
        type: "error",
        title: "Failed to update business profile",
        message: errorMessage,
      });
    },
  });

  return {
    updateBusinessProfile: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
export function useUpdateBusiness() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Parameters<typeof updateBusinessAction>[0]) => {
      const result = await updateBusinessAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["business"], data);
    },
    onError: (err: any) => {
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      toast({
        type: "error",
        title: "Failed to update business",
        message: errorMessage,
      });
    },
  });

  return {
    updateBusiness: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
