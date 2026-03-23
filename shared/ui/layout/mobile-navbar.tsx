"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Home, Users, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/stores/ui-store";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Children", href: "/children", icon: Users },
  { label: "Profile", href: "/profile", icon: User },
];

export function MobileNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { mobileBackLabel, mobileBackHref } = useUIStore();

  return (
    <nav className="sticky top-0 z-50 flex min-h-[64px] w-full border-b bg-[#F7F7F7] lg:hidden">
      <div className="flex w-full items-center px-4 py-4">
        {mobileBackLabel ? (
          <button
            onClick={() => (mobileBackHref ? router.push(mobileBackHref) : router.back())}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 transition-all active:scale-95"
          >
            <ChevronLeft className="h-6 w-6 text-[#FF736A]" />
            <span>{mobileBackLabel}</span>
          </button>
        ) : (
          <div className="flex w-full items-center justify-around">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-bold transition-all",
                    isActive ? "text-[#1B3C73]" : "text-slate-400"
                  )}
                >
                  <Icon className={cn("h-6 w-6", isActive ? "fill-[#1B3C73]" : "fill-none")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
