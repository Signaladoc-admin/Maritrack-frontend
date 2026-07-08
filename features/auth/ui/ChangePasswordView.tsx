"use client";

import { useRouter } from "next/navigation";
import { ChangePasswordForm } from "./ChangePasswordForm";

/**
 * Standalone (non-modal) wrapper around ChangePasswordForm for the /change-password
 * page. On success it sends the user into the app. Invited first-login staff reach
 * this from login; after changing their default password they land on the dashboard.
 */
export function ChangePasswordView() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-md">
      <ChangePasswordForm onSuccess={() => router.push("/dashboard")} />
    </div>
  );
}
