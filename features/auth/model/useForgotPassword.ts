"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAction } from "../api/auth.actions";
import type { ForgotPasswordDto } from "@/entities/user/model/user.schema";
import { useToast } from "@/shared/ui/toast";

export function useForgotPassword() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordDto) => forgotPasswordAction(data),
    onSuccess: () => {
      toast({
        type: "success",
        title: "Email Sent",
        message: "Password reset instructions have been sent to your email.",
      });
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Request Failed",
        message: err.message || "Failed to send reset email.",
      });
    },
  });

  return {
    forgotPassword: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
