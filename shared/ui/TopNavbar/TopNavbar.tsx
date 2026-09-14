"use client";

import { useState } from "react";
import { Gauge, Menu, Smartphone, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfilePopover } from "../Sidebar/ProfilePopover";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { cn, getInitials } from "@/shared/lib/utils";
import { useAuth } from "@/shared/auth/AuthProvider";

const businessNavLinks = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Devices", href: "/devices", icon: Smartphone },
  { label: "Users", href: "/users", icon: User },
];

export default function TopNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();
  const isParent = user?.appRole === "PARENT";
  const userInitials = user
    ? getInitials(`${user.firstName || ""} ${user.lastName || ""}`) || "U"
    : "U";

  return (
    <>
      {/* Top bar (Desktop & Mobile) */}
      <div className="topbar sticky top-0 z-50">
        {/* Mobile menu button */}
        <button
          className={cn(
            "text-muted-foreground hover:text-foreground mr-2 cursor-pointer p-1 md:hidden",
            searchOpen && "hidden"
          )}
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search bar */}
        <div
          className={cn(
            "search-wrap transition-all",
            searchOpen ? "flex w-full" : "hidden sm:flex",
            "sm:w-auto"
          )}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M21 21l-4.3-4.3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input type="text" placeholder="Search by serial number, IMEI, MAC, or alias" />
          {searchOpen && (
            <button
              className="ml-1 cursor-pointer p-1 sm:hidden"
              onClick={() => setSearchOpen(false)}
            >
              <X className="text-muted-foreground hover:text-foreground h-4 w-4" />
            </button>
          )}
        </div>

        {/* Mobile Search Icon (when search is closed) */}
        {!searchOpen && (
          <button
            className="text-muted-foreground hover:text-foreground ml-auto cursor-pointer p-1 sm:hidden"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M21 21l-4.3-4.3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}

        {/* OS Filters (Business accounts only) */}
        {!isParent && (
          <div className={cn("os-pills hidden sm:flex")}>
            <button className="os-pill active">Android</button>
            <button className="os-pill">Windows</button>
            <button className="os-pill">iOS</button>
          </div>
        )}

        {/* Theme Toggle */}
        <div className={cn("flex items-center gap-2", searchOpen && "hidden sm:flex")}>
          <ThemeToggle variant="pill" className="hidden sm:inline-flex" />
          <ThemeToggle variant="icon" className="sm:hidden" />
        </div>

        {/* Avatar */}
        <Link
          href="/profile"
          className={cn(
            "topbar-avatar hidden cursor-pointer transition-opacity hover:opacity-80 sm:flex"
          )}
        >
          {userInitials}
        </Link>
      </div>
    </>
  );
}
