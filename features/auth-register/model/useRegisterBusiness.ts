import { useMutation } from "@tanstack/react-query";
import { registerBusinessAction } from "../api/register-business.action";
import { useToast } from "@/shared/ui/toast";

export function useRegisterBusiness() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: Parameters<typeof registerBusinessAction>[0]) => {
      const result = await registerBusinessAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
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
    registerBusiness: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
