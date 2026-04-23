"use client";

import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "../api/auth.actions";
import type { ChangePasswordDto } from "@/entities/user/model/user.schema";
import { useToast } from "@/shared/ui/toast";

export function useChangePassword() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: ChangePasswordDto) => {
      const result = await changePasswordAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast({
        type: "success",
        title: "Password Changed",
        message: "Your password has been changed successfully.",
      });
    },
    onError: (error) => {
      toast({
        type: "error",
        title: "Failed to change password",
        message: error.message,
      });
    },
  });

  return {
    changePassword: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message ?? null,
    mutation,
  };
}
