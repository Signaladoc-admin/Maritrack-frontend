"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { validateOtpAction } from "../api/auth.actions";
import { useNewUserStore } from "@/shared/stores/user.store";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useToast } from "@/shared/ui/toast";
import type { OtpConfirmFormValues } from "../schema";

export function useValidateOtp() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: OtpConfirmFormValues) => {
      const { email } = useNewUserStore.getState();
      if (!email) {
        throw new Error("Session expired. Please register again.");
      }
      const result = await validateOtpAction({ email, otp: data.otp });
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: async (res) => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast({
        type: "success",
        title: "Account Verified",
        message: res.message || "Your account has been successfully verified!",
      });

      const { email, password, clearCredentials } = useNewUserStore.getState();
      if (password && email) {
        try {
          await login({ email, password });
          clearCredentials();
          router.push("/dashboard");
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
