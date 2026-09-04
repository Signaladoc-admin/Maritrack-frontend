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
      {/* Top bar (Desktop & Mobile) */}
      <div className="topbar">
        {/* Mobile menu button */}
        <button
          className="p-1 text-muted-foreground hover:text-foreground md:hidden mr-2"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search bar */}
        <div className="search-wrap">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <input type="text" placeholder="Search by serial number, IMEI, MAC, or alias" />
        </div>

        {/* OS Filters */}
        <div className="os-pills hidden sm:flex">
          <button className="os-pill active">Android</button>
          <button className="os-pill">Windows</button>
          <button className="os-pill">iOS</button>
        </div>

        {/* Avatar */}
        <div className="topbar-avatar hidden sm:flex">DO</div>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[10001] bg-black/40 transition-opacity duration-300 md:hidden",
          drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Slide-out drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 z-[10002] h-full w-64 border-r border-card-line bg-background shadow-none transition-transform duration-300 md:hidden",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-card-line px-5 py-6">
          <span className="font-bold text-foreground">Menu</span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="text-muted-foreground hover:text-foreground"
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
                  "flex items-center gap-3 rounded-full px-4 py-3 font-semibold transition-all",
                  isActive
                    ? "bg-accent-tint text-white"
                    : "text-muted-foreground hover:bg-card-hover hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-5 left-0 w-full px-4">
          <div className="flex items-center gap-2.5 rounded-md border border-card-line bg-card-fill p-2.5">
            <ProfilePopover />
          </div>
        </div>
      </div>
    </>
  );
}
