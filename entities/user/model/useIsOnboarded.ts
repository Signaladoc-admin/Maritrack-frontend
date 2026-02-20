"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProfileAction } from "../api/user.actions";
import { useCallback } from "react";

export function useIsOnboarded() {
  const router = useRouter();

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfileAction,
    staleTime: 0, // Always get fresh data for onboarding check
    retry: false,
  });

  const checkAndRedirect = useCallback(
    (userProfile = profile) => {
      if (!userProfile) return;

      if (userProfile.role === "ADMIN") {
        router.push("/admin");
        return;
      }

      // Prioritize isFirstLogin flag
      const needsOnboarding =
        userProfile.isFirstLogin === true || !userProfile.firstName || !userProfile.lastName;

      if (needsOnboarding) {
        router.push("/onboarding/personal");
      } else {
        router.push("/dashboard");
      }
    },
    [profile, router]
  );

  return {
    profile,
    isLoading,
    checkAndRedirect,
    refetch,
  };
}
