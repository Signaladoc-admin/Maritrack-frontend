"use client";

import { useState } from "react";
import { Gauge, Menu, Smartphone, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfilePopover } from "../Sidebar/ProfilePopover";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { cn } from "@/shared/lib/utils";

const businessNavLinks = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Devices", href: "/devices", icon: Smartphone },
  { label: "Users", href: "/users", icon: User },
];

export default function TopNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Top bar (Desktop & Mobile) */}
      <div className="topbar sticky top-0 z-50">
        {/* Mobile menu button */}
        <button
          className={cn(
            "p-1 text-muted-foreground hover:text-foreground md:hidden mr-2 cursor-pointer",
            searchOpen && "hidden"
          )}
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search bar */}
        <div className={cn(
          "search-wrap transition-all",
          searchOpen ? "flex w-full" : "hidden sm:flex",
          "sm:w-auto"
        )}>
          <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <input type="text" placeholder="Search by serial number, IMEI, MAC, or alias" />
          {searchOpen && (
            <button className="sm:hidden p-1 ml-1 cursor-pointer" onClick={() => setSearchOpen(false)}>
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Mobile Search Icon (when search is closed) */}
        {!searchOpen && (
          <button 
            className="p-1 ml-auto text-muted-foreground hover:text-foreground sm:hidden cursor-pointer"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        )}

        {/* OS Filters */}
        <div className={cn("os-pills hidden sm:flex")}>
          <button className="os-pill active">Android</button>
          <button className="os-pill">Windows</button>
          <button className="os-pill">iOS</button>
        </div>

        {/* Theme Toggle */}
        <div className={cn("flex items-center gap-2", searchOpen && "hidden sm:flex")}>
          <ThemeToggle variant="pill" className="hidden sm:inline-flex" />
          <ThemeToggle variant="icon" className="sm:hidden" />
        </div>

        {/* Avatar */}
        <div className={cn("topbar-avatar hidden sm:flex")}>DO</div>
      </div>
    </>
  );
}
