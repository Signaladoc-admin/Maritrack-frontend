"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { validateOtpAction } from "../api/auth.actions";
import { useNewUserStore } from "@/shared/stores/user.store";
import { useLogin } from "@/features/auth-login/model/useLogin";
import { useToast } from "@/shared/ui/toast";
import type { OtpConfirmFormValues } from "../schema";
import { useIsOnboarded } from "@/entities/user/model/useIsOnboarded";
import { getParentalControlMeAction } from "@/entities/parental-controls/api/parental-controls.actions";

export function useValidateOtp() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useLogin();
  const { email, password, token, clearCredentials } = useNewUserStore();
  const queryClient = useQueryClient();
  const { checkAndRedirect } = useIsOnboarded();

  console.log(password, email);

  const mutation = useMutation({
    mutationFn: (data: OtpConfirmFormValues) => {
      if (!email || !token) {
        throw new Error("Session expired. Please register again.");
      }
      return validateOtpAction({
        email,
        token,
        otp: data.otp,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast({
        type: "success",
        title: "Account Verified",
        message: "Your account has been successfully verified!",
      });

      // Auto-login
      if (password && email) {
        try {
          const profile = await login({ email, password });
          clearCredentials();

          // Fetch parental controls to determine onboarding status accurately
          const pcSettings = await getParentalControlMeAction();
          checkAndRedirect(profile as any, pcSettings);
        } catch (loginErr) {
          console.error("Auto-login failed:", loginErr);
          toast({
            type: "warning",
            title: "Auto-login Failed",
            message:
              "Your account is verified, but we couldn't log you in automatically. Please log in manually.",
          });
          // router.push("/login");
        }
      } else {
        // router.push("/login");
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
