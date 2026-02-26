"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyAccountAction } from "../api/auth.actions";
import { useToast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";

export function useVerifyAccount() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { email: string; token: string }) => verifyAccountAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast({
        type: "success",
        title: "Account Verified",
        message: "Your account has been verified. Please log in.",
      });
      router.push("/login");
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Verification Failed",
        message: err.message || "Failed to verify account.",
      });
    },
  });

  return {
    verifyAccount: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
