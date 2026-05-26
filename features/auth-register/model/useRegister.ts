import { useServerActionMutation } from "@/shared/api/server-action-hooks";
import { registerAction } from "../api/register.action";
import { useToast } from "@/shared/ui/toast";

export function useRegister() {
  const { toast } = useToast();

  const mutation = useServerActionMutation(registerAction, {
    onSuccess: () => {
      toast({
        type: "success",
        title: "Registration successful",
      });
    },
    onError: (err: any) => {
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      toast({
        type: "error",
        title: "Registration Failed",
        message: errorMessage,
      });
    },
  });

  return {
    register: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
