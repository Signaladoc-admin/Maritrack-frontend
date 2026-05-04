import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAction } from "../api/login.action";
import { useToast } from "@/shared/ui/toast";

export function useLogin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (credentials: Parameters<typeof loginAction>[0]) => {
      const result = await loginAction(credentials);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: ({ profile }) => {
      queryClient.setQueryData(["session"], profile);
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
