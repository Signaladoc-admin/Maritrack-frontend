import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/ui/toast";
import { updateBusinessAction } from "../api/business-action";

export function useBusiness() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateBusinessAction,
    onSuccess: ({ profile }) => {
      queryClient.setQueryData(["business"], profile);
    },
    onError: (err: any) => {
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      toast({
        type: "error",
        title: "Login Failed",
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
