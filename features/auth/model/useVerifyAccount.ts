"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyUserAction } from "../api/auth.actions";
import { useToast } from "@/shared/ui/toast";
import { usePathname, useRouter } from "next/navigation";
import { VerifyUserRequest } from "../types";

export function useVerifyAccount() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname()
  const isBusinessPath = pathname.toLowerCase().includes('business')

  const mutation = useMutation({
    mutationFn: async (data: VerifyUserRequest) => {
      const res = await verifyUserAction(data)

      if (!res.success) {
        throw new Error(res.error)
      }

      return res
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast({
        type: "success",
        title: "Account Verified",
        message: res?.data?.message || "Your account has been verified. You can now proceed to login.",
      });

      isBusinessPath ? router.push("/business/login") : router.push("/login");
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
