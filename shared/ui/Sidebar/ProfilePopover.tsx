"use client";

import Link from "next/link";
import { User as UserIcon, LogOut, CreditCard as CardIcon } from "lucide-react";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useAuth } from "@/shared/auth/AuthProvider";

import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ConfirmationModal } from "../Modal/Modals/ConfirmationModal";
import { useToast } from "../toast";
import { useLogout } from "@/features/auth/model/useLogout";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

// e.g. "ORGANIZATION_ADMIN" -> "Organization admin"
function formatRole(role: string) {
  const label = role.replace(/_/g, " ").toLowerCase();
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function ProfilePopover() {
  const { user } = useAuth();
  const { data: userProfile } = useUserProfile();

  const firstName = userProfile?.firstName || user?.firstName || "";
  const lastName = userProfile?.lastName || user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const displayName = fullName || user?.email || userProfile?.email || "";
  const imageUrl = userProfile?.imageUrl || user?.imageUrl || null;
  const roleLabel = user?.businessRole
    ? formatRole(user.businessRole)
    : user?.appRole === "BUSINESS"
      ? "Business"
      : "Parent";
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false);
  const { toast } = useToast();
  const { mutateAsync: logout, isPending: isSigningOut } = useLogout();

  const handleSignOut = async () => {
    await logout();
    setIsSignoutModalOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex w-full items-center gap-2 cursor-pointer border-none bg-transparent p-0 text-left focus:outline-none">
          <div className="avatar">
            {imageUrl ? (
              <img src={imageUrl} alt={displayName || "Profile"} className="h-full w-full object-cover rounded-[10px]" />
            ) : (
              <UserIcon className="h-4 w-4" />
            )}
          </div>
          <div className="who">
            <div className="name" title={displayName}>{displayName}</div>
            <div className="role">{roleLabel}</div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="z-[99999] mt-2 w-56 rounded-xl border border-card-line bg-card p-4 shadow-none"
      >
        <div className="flex flex-col gap-1">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-md p-3 text-foreground transition-colors hover:bg-card-hover"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-card-fill text-foreground">
              <UserIcon className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Profile</span>
          </Link>
          <Link
            href="/plans"
            className="flex items-center gap-3 rounded-md p-3 text-foreground transition-colors hover:bg-card-hover"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-card-fill text-foreground">
              <CardIcon className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Plans</span>
          </Link>
          <div className="border-t border-card-line my-1" />
          <button
            onClick={() => setIsSignoutModalOpen(true)}
            className="flex items-center gap-3 rounded-md p-3 text-destructive transition-colors hover:bg-destructive/10 cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <LogOut className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>
      </PopoverContent>

      <ConfirmationModal
        open={isSignoutModalOpen}
        onOpenChange={setIsSignoutModalOpen}
        title="Are you sure you want to sign out?"
        confirmText="Sign out"
        onConfirm={handleSignOut}
        variant="destructive"
        loading={isSigningOut}
        loadingText="Signing out..."
      />
    </Popover>
  );
}
