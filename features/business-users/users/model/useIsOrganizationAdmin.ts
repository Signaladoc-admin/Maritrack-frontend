import { useAuth } from "@/shared/auth/AuthProvider";

export function useIsOrganizationAdmin() {
  const { user } = useAuth();

  const isOrganizationAdmin =
    user?.appRole === "BUSINESS" && user?.businessRole === "ORGANIZATION_ADMIN";

  return { isOrganizationAdmin };
}
