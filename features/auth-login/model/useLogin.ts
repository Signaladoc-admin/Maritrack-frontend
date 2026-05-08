import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAction } from "../api/login.action";
import { useToast } from "@/shared/ui/toast";

export function useLogin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (result) => {
      if (!result.success) return;
      queryClient.setQueryData(["session"], result.data.profile);
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

  const login = async (...args: Parameters<typeof mutation.mutateAsync>) => {
    const result = await mutation.mutateAsync(...args);
    if (!result.success) throw new Error(result.error);
    return result.data;
  };

  return {
    login,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
