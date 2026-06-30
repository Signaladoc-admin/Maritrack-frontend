"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";

/**
 * Ghost "Sign out" button matching the onboarding screens — sits top-right and
 * confirms before logging out. Used on standalone, dashboard-less pages such as
 * /change-password where the normal nav chrome isn't rendered.
 */
export function SignOutButton() {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-foreground h-auto p-0 font-medium hover:bg-transparent"
        onClick={() => setShowSignOutModal(true)}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Signing out..." : "Sign out"}
      </Button>

      <ConfirmationModal
        open={showSignOutModal}
        onOpenChange={setShowSignOutModal}
        title="Are you sure you want to sign out?"
        confirmText="Sign out"
        onConfirm={() => logout()}
        variant="destructive"
        loading={isLoggingOut}
        loadingText="Signing out..."
      />
    </>
  );
}
