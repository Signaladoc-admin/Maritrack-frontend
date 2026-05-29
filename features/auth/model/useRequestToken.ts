"use client";

import { useMutation } from "@tanstack/react-query";
import { requestTokenAction } from "../api/auth.actions";
import { useToast } from "@/shared/ui/toast";

export function useRequestToken() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (method: string) => requestTokenAction(method),
    onSuccess: () => {
      toast({
        type: "success",
        title: "Token Requested",
        message: "A verification token has been sent.",
      });
    },
    onError: (err: any) => {
      toast({
        type: "error",
        title: "Request Failed",
        message: err.message || "Failed to request verification token.",
      });
    },
  });

  return {
    requestToken: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
}
