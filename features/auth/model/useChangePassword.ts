"use client";

import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "../api/auth.actions";
import type { ChangePasswordDto } from "@/entities/user/model/user.schema";
import { useToast } from "@/shared/ui/toast";

export function useChangePassword() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: ChangePasswordDto) => changePasswordAction(data),
    onSuccess: () => {
      toast({
        type: "success",
        title: "Password Changed",
        message: "Your password has been changed successfully.",
      });
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Change Failed",
        message: err.message || "Failed to change password.",
      });
    },
  });

  return {
    changePassword: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
