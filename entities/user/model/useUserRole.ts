"use client";

import { useQuery } from "@tanstack/react-query";
import { getSessionAction } from "@/features/auth/api/auth.actions";
import type { UserProfile, BusinessRole } from "./user.schema";

export type AccountType = "admin" | "business" | "personal" | null;

export function useUserRole() {
  const { data: user } = useQuery<UserProfile | null>({
    queryKey: ["session"],
    queryFn: getSessionAction,
    staleTime: Infinity,
  });

  const accountType: AccountType = !user
    ? null
    : user.role === "ADMIN"
    ? "admin"
    : user.businessRole
    ? "business"
    : "personal";

  return {
    user: user ?? null,
    /** Platform-level role: "ADMIN" | "USER" */
    role: user?.role ?? null,
    /** Business-level role: "ORGANIZATION_ADMIN" | "DEVICE_MANAGER" | "DEPARTMENT_MANAGER" | null */
    businessRole: (user?.businessRole ?? null) as BusinessRole | null,
    /** Derived account type for easy branching */
    accountType,
    isAdmin: user?.role === "ADMIN",
    isBusinessUser: !!user?.businessRole,
    isPersonalUser: !!user && !user.businessRole && user.role !== "ADMIN",
  };
}
