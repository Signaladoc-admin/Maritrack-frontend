"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { validateOtpAction } from "../api/auth.actions";
import { useNewUserStore } from "@/shared/stores/user.store";
import { useLogin } from "@/features/auth-login/model/useLogin";
import { useToast } from "@/shared/ui/toast";
import type { OtpConfirmFormValues } from "../schema";

export function useValidateOtp() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useLogin();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: OtpConfirmFormValues) => {
      const { email } = useNewUserStore.getState();
      if (!email) {
        throw new Error("Session expired. Please register again.");
      }
      return validateOtpAction({ email, otp: data.otp });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast({
        type: "success",
        title: "Account Verified",
        message: "Your account has been successfully verified!",
      });

      const { email, password, clearCredentials } = useNewUserStore.getState();
      if (password && email) {
        try {
          const { redirectTo } = await login({ email, password });
          clearCredentials();
          router.push(redirectTo);
        } catch {
          toast({
            type: "warning",
            title: "Auto-login Failed",
            message:
              "Your account is verified, but we couldn't log you in automatically. Please log in manually.",
          });
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    },
    onError: (err: any) => {
      const errorMessage = err.message || "Invalid OTP. Please try again.";
      toast({
        type: "error",
        title: "Verification Failed",
        message: errorMessage,
      });

      if (errorMessage.includes("Session expired")) {
        router.push("/register/personal");
      }
    },
  });

  return {
    validateOtp: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
