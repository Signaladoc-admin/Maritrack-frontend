"use client";

import { useState } from "react";
import { Gauge, Menu, Smartphone, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfilePopover } from "../Sidebar/ProfilePopover";
import { cn } from "@/shared/lib/utils";

const businessNavLinks = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Devices", href: "/devices", icon: Smartphone },
  { label: "Users", href: "/users", icon: User },
];

export default function TopNavbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="fixed z-9999 w-screen">
        <div className="relative flex items-center border-b-[1.5px] border-[#eee] bg-[#f7f7f7] px-5 py-3 text-sm md:py-6">
          {/* Small screens — hamburger */}
          <button
            className="p-1 text-[#1B3C73] md:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Large screens — centred nav links */}
          <div className="hidden w-full items-center justify-center gap-16 md:flex">
            {businessNavLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 font-semibold transition-all",
                    isActive ? "text-[#1B3C73]" : "text-[#999]"
                  )}
                >
                  <Icon />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Avatar — flow on small screens, absolute on large so nav links stay centred */}
          <div className="ml-auto md:absolute md:right-10 md:bottom-1/2 md:ml-0 md:translate-y-1/2">
            <ProfilePopover />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-10001 bg-black/40 transition-opacity duration-300 md:hidden",
          drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Slide-out drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 z-10002 h-full w-64 bg-[#f7f7f7] shadow-xl transition-transform duration-300 md:hidden",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-[#eee] px-5 py-6">
          <span className="font-semibold text-[#1B3C73]">Menu</span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="text-[#999] hover:text-[#1B3C73]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {businessNavLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-all",
                  isActive
                    ? "bg-[#1B3C73] text-white"
                    : "text-[#999] hover:bg-[#eee] hover:text-[#1B3C73]"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
