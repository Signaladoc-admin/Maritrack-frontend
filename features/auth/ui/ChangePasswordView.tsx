"use client";

import { useRouter } from "next/navigation";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { useAuth } from "@/shared/auth/AuthProvider";

/**
 * Standalone (non-modal) wrapper around ChangePasswordForm for the /change-password
 * page. On success it sends the user into the app. Invited first-login staff reach
 * this from login; after changing their default password they land on the dashboard.
 */
export function ChangePasswordView() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-md">
      <ChangePasswordForm
        onSuccess={() => {
          const destination = user?.businessRole === "RETAILER_ADMIN" ? "/devices" : "/dashboard";
          window.location.href = destination;
        }}
      />
    </div>
  );
}
