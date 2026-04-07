import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerParentAction } from "../api/register-parent.action";
import { useToast } from "@/shared/ui/toast";

export function useRegisterParent() {
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: Parameters<typeof registerParentAction>[0]) => {
      const result = await registerParentAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
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
    registerParent: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
