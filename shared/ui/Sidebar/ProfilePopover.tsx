"use client";

import Link from "next/link";
import { User as UserIcon, LogOut, CreditCard as CardIcon } from "lucide-react";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { logoutAction } from "@/features/auth/api/auth.actions";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ProfilePopover() {
  const { data: userProfile } = useUserProfile();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await logoutAction();
    router.push("/login");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="h-12 w-12 cursor-pointer overflow-hidden rounded-full transition-all hover:ring-2 hover:ring-[#1B3C73] hover:ring-offset-2">
          {userProfile?.imageUrl ? (
            <img src={userProfile.imageUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#EEEEEE] text-[#1B3C73]">
              <UserIcon className="h-6 w-6" />
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="end"
        className="z-99999 ml-4 w-56 rounded-[24px] border-none p-4"
      >
        <div className="flex flex-col gap-1">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl p-3 text-[#1B3C73] transition-colors hover:bg-[#F7F7F7]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F7F7] text-[#1B3C73]">
              <UserIcon className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Profile</span>
          </Link>
          <Link
            href="/plans"
            className="flex items-center gap-3 rounded-xl p-3 text-[#1B3C73] transition-colors hover:bg-[#F7F7F7]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F7F7] text-[#1B3C73]">
              <CardIcon className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Plans</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 rounded-xl p-3 text-[#FF736A] transition-colors hover:bg-[#FFF5F5]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF5F5] text-[#FF736A]">
              <LogOut className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
