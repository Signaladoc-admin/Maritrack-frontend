"use client";

import { useMutation } from "@tanstack/react-query";
import { resetPasswordAction, resetForgottenPasswordAction } from "../api/auth.actions";
import { useToast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";
import { ResetPasswordRequest } from "../types";

export function useResetPassword() {
  const { toast } = useToast();
  const router = useRouter();

  const resetMutation = useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const result = await resetPasswordAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      toast({
        type: "success",
        title: "Password Reset",
        message: data?.message,
      });
      router.push("/login");
    },
    onError: (err) => {
      toast({
        type: "error",
        title: "Reset Failed",
        message: err?.message || "Failed to reset password.",
      });
    },
  });

  const resetForgottenMutation = useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const result = await resetForgottenPasswordAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      toast({
        type: "success",
        title: "Forgotten Password Reset",
        message: data?.message,
      });
      router.push("/login");
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Reset Failed",
        message: err.message || "Failed to reset password.",
      });
    },
  });

  return {
    resetPassword: resetMutation.mutateAsync,
    resetForgottenPassword: resetForgottenMutation.mutateAsync,
    isResetting: resetMutation.isPending,
    isResettingForgotten: resetForgottenMutation.isPending,
    error: resetMutation.error?.message || resetForgottenMutation.error?.message || null,
  };
}
