import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerAction } from "../api/register.action";
import { useToast } from "@/shared/ui/toast";

export function useRegister() {
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: registerAction,
    onSuccess: (res) => {
      console.log("Registration Response:", res);

      // Verification token handling removed as useNewUserStore is deleted
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
    register: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
