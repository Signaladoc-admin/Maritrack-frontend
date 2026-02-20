import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerAction } from "../api/register.action";
import type { RegisterValues } from "@/entities/user/model/user.schema";
import { useToast } from "@/shared/ui/toast";
import { useNewUserStore } from "@/shared/stores/user-store";

export function useRegister() {
  const router = useRouter();
  const { toast } = useToast();
  const setToken = useNewUserStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: registerAction,
    onSuccess: (res) => {
      console.log("Registration Response:", res);

      // Store the verification token if available in the response
      if ((res as any).token) {
        setToken((res as any).token);
      }

      router.push("/confirm-email");
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
