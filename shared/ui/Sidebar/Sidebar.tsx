"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { ProfilePopover } from "./ProfilePopover";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { useParentChildren } from "@/entities/children/model/useChildren";
import { Child } from "@/features/child-profile/model/types";
import { useRecentChildren } from "@/shared/hooks/useRecentChildren";
import { Plus } from "lucide-react";

export function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [isAppCollapsed, setIsAppCollapsed] = useState(false);
  const [childrenCollapsed, setChildrenCollapsed] = useState(false);

  const { data: parentChildren, isLoading: isFetchingChildren } = useParentChildren();
  const { recentIds } = useRecentChildren();

  const childrenList: Child[] = parentChildren?.data ?? [];
  const visibleChildren = useMemo(() => {
    const recent = recentIds
      .map((id) => childrenList.find((c) => c.id === id))
      .filter(Boolean) as Child[];
    const rest = childrenList.filter((c) => !recentIds.includes(c.id));
    return [...recent, ...rest];
  }, [childrenList, recentIds]);

  if (isFetchingChildren) {
    return <SidebarSkeleton />;
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {setMobileOpen && (
        <div
          className={cn(
            "fixed inset-0 z-[10001] bg-black/40 transition-opacity duration-300 md:hidden",
            mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "sidebar transition-all duration-300",
          isAppCollapsed ? "collapsed w-[70px]" : "w-[258px]",
          "md:!sticky md:flex md:translate-x-0",
          "!fixed top-0 left-0 z-[10002] h-full shadow-none",
          mobileOpen ? "flex translate-x-0" : "-translate-x-full md:-translate-x-0"
        )}
      >
        <div className="brand-zone">
          <div className="brand flex w-full items-center justify-between">
            <img src="/assets/FlentraLogo.svg" alt="Flentra Logo" />
            {setMobileOpen && (
              <button
                className="text-muted-foreground hover:text-foreground cursor-pointer p-1 md:hidden"
                onClick={() => setMobileOpen(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
          <button
            className="collapse-btn hidden md:flex"
            aria-label="Collapse sidebar"
            onClick={() => setIsAppCollapsed(!isAppCollapsed)}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Main Nav Section */}
        <div className="nav-section no-card">
          <div className="nav-section-body">
            <Link
              href="/dashboard"
              className={cn("nav-item", pathname === "/dashboard" && "active")}
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 13h4V4H3v9zM3 20h4v-4H3v4zM10 20h4V11h-4v9zM10 8h4V4h-4v4zM17 20h4v-6h-4v6zM17 4v6h4V4h-4z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="label">Dashboard</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Dashboard</span>
            </Link>

            <Link
              href="/children"
              className={cn(
                "nav-item",
                (pathname === "/children" || pathname.startsWith("/child/")) && "active"
              )}
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M5 20c0-3.8 3.1-7 7-7s7 3.2 7 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="label">Children</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Children</span>
            </Link>
            <Link
              href="/plans"
              className={cn("nav-item", pathname.startsWith("/plans") && "active")}
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <span className="label">Plans</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Plans</span>
            </Link>
          </div>
        </div>

        {/* Children Section */}
        <div className={cn("nav-section", childrenCollapsed && "collapsed-section")}>
          <button
            className="nav-section-head"
            onClick={() => setChildrenCollapsed(!childrenCollapsed)}
          >
            <span>My Children</span>
            <svg
              className="chev"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {!childrenCollapsed && (
            <div className="nav-section-body">
              {visibleChildren.map((child) => {
                const isChildActive = pathname === `/child/${child.id}`;
                return (
                  <Link
                    key={child.id}
                    href={`/child/${child.id}`}
                    className={cn("nav-item", isChildActive && "active")}
                  >
                    <span className="nav-icon">
                      <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-[var(--card-line)] bg-[var(--card-fill)] text-[11px] font-bold text-[var(--accent)]">
                        {child.imageUrl ? (
                          <img
                            src={child.imageUrl}
                            alt={child.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          child.name?.slice(0, 1).toUpperCase()
                        )}
                      </div>
                    </span>
                    <span className="label truncate">{child.name}</span>
                    <span className="active-dot"></span>
                    <span className="nav-tooltip">{child.name}</span>
                  </Link>
                );
              })}

              <Link
                href="/children/add"
                className={cn("nav-item", pathname === "/children/add" && "active")}
              >
                <span className="nav-icon text-[var(--accent)]">
                  <Plus className="h-4 w-4" />
                </span>
                <span className="label text-[12.5px] font-semibold text-[var(--accent)]">
                  Add a child
                </span>
                <span className="nav-tooltip">Add child</span>
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="account-row flex w-full items-center gap-2">
            <ProfilePopover />
          </div>
        </div>
      </aside>
    </>
  );
}
