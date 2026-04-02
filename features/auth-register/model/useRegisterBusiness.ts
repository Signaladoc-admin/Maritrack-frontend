import { useMutation } from "@tanstack/react-query";
import { registerBusinessAction } from "../api/register-business.action";
import { useToast } from "@/shared/ui/toast";

export function useRegisterBusiness() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: registerBusinessAction,
    onSuccess: (res) => {
      console.log("Business Registration Response:", res);
      console.log("Token received:", (res as any).token);
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
    registerBusiness: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
