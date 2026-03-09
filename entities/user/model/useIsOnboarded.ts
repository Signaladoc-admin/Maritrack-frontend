"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProfileAction } from "../api/user.actions";
import { useParentalControlMe } from "@/entities/parental-controls/model/useParentalControls";
import { useCallback } from "react";

export function useIsOnboarded() {
  const router = useRouter();

  const {
    data: profile,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfileAction,
    staleTime: 0,
    retry: false,
  });

  const { data: pcSettings, isLoading: isPcLoading, refetch: refetchPc } = useParentalControlMe();

  const checkAndRedirect = useCallback(
    (userProfile: any = profile, settings: any = pcSettings) => {
      if (!userProfile) return;

      if (userProfile.role === "ADMIN") {
        router.push("/admin");
        return;
      }

      // If no PC settings exist yet, user needs onboarding
      const needsOnboarding = !settings;

      if (needsOnboarding) {
        router.push("/onboarding/personal");
      } else {
        router.push("/dashboard");
      }
    },
    [profile, pcSettings, router]
  );

  return {
    profile,
    pcSettings,
    isLoading: isProfileLoading || isPcLoading,
    checkAndRedirect,
    refetch: async () => {
      await Promise.all([refetchProfile(), refetchPc()]);
    },
  };
}
