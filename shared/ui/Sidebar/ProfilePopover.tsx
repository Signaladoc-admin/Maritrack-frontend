"use client";

import Link from "next/link";
import { User as UserIcon, LogOut, CreditCard as CardIcon } from "lucide-react";
import { useUserProfile } from "@/entities/user/model/useUserProfile";

import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ConfirmationModal } from "../Modal/Modals/ConfirmationModal";
import { useToast } from "../toast";
import { useLogout } from "@/features/auth/model/useLogout";

export function ProfilePopover() {
  const { data: userProfile } = useUserProfile();
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
            {userProfile?.imageUrl ? (
              <img src={userProfile.imageUrl} alt="Profile" className="h-full w-full object-cover rounded-[10px]" />
            ) : (
              <UserIcon className="h-4 w-4" />
            )}
          </div>
          <div className="who">
            <div className="name">{userProfile?.firstName || 'Damola'} {userProfile?.lastName || 'Ojo'}</div>
            <div className="role">{userProfile?.role || 'Operations admin'}</div>
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
          <button
            onClick={() => setIsSignoutModalOpen(true)}
            className="flex items-center gap-3 rounded-md p-3 text-destructive transition-colors hover:bg-destructive/10"
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
