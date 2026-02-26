"use client";

import { useMutation } from "@tanstack/react-query";
import { resetPasswordAction, resetForgottenPasswordAction } from "../api/auth.actions";
import type {
  ResetPasswordDto,
  ResetForgottenPasswordDto,
} from "@/entities/user/model/user.schema";
import { useToast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";

export function useResetPassword() {
  const { toast } = useToast();
  const router = useRouter();

  const resetMutation = useMutation({
    mutationFn: (data: ResetPasswordDto) => resetPasswordAction(data),
    onSuccess: () => {
      toast({
        type: "success",
        title: "Password Reset",
        message: "Your password has been reset successfully.",
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

  const resetForgottenMutation = useMutation({
    mutationFn: (data: ResetForgottenPasswordDto) => resetForgottenPasswordAction(data),
    onSuccess: () => {
      toast({
        type: "success",
        title: "Password Reset",
        message: "Your password has been reset successfully. Please log in.",
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
