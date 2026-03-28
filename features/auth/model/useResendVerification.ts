"use client";

import { useMutation } from "@tanstack/react-query";
import { resendVerificationAction } from "../api/auth.actions";
import { useToast } from "@/shared/ui/toast";

export function useResendVerification() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (method: string) => resendVerificationAction(method),
    onSuccess: () => {
      toast({
        type: "success",
        title: "Verification Sent",
        message: "A new verification token has been sent.",
      });
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Resend Failed",
        message: err.message || "Failed to resend verification.",
      });
    },
  });

  return {
    resendVerification: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
