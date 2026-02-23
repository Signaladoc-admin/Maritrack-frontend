import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAction } from "../api/login.action";
import type { LoginValues, UserProfile } from "@/entities/user/model/user.schema";
import { useToast } from "@/shared/ui/toast";

export function useLogin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
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
    login: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
