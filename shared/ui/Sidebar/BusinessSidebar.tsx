"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { ProfilePopover } from "../Sidebar/ProfilePopover";

export function BusinessSidebar({ 
  mobileOpen, 
  setMobileOpen 
}: { 
  mobileOpen?: boolean; 
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState({ monitor: false, manage: false });
  const [isAppCollapsed, setIsAppCollapsed] = useState(false);

  const toggleSection = (section: 'monitor' | 'manage') => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

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
          // Desktop behavior: sticky, always visible.
          "md:!sticky md:translate-x-0 md:flex",
          // Mobile behavior: fixed drawer, hidden unless mobileOpen is true.
          "!fixed top-0 left-0 z-[10002] h-full shadow-xl md:shadow-none",
          mobileOpen ? "translate-x-0 flex" : "-translate-x-full md:-translate-x-0"
        )}
      >
        <div className="brand-zone">
          <div className="brand flex items-center justify-between w-full">
            <img src="/assets/FlentraLogo.svg" alt="Flentra Logo" />
            {setMobileOpen && (
              <button 
                className="md:hidden p-1 text-muted-foreground hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
          </div>
          <button className="collapse-btn hidden md:flex" aria-label="Collapse sidebar" onClick={() => setIsAppCollapsed(!isAppCollapsed)}>
            <svg viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

      <div className="nav-section no-card">
        <div className="nav-section-body">
          <Link href="/dashboard" className={cn("nav-item", pathname === "/dashboard" && "active")}>
            <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M3 13h4V4H3v9zM3 20h4v-4H3v4zM10 20h4V11h-4v9zM10 8h4V4h-4v4zM17 20h4v-6h-4v6zM17 4v6h4V4h-4z" fill="currentColor"/></svg></span>
            <span className="label">Dashboard</span>
            <span className="active-dot"></span>
            <span className="nav-tooltip">Dashboard</span>
          </Link>
          <Link href="/enrol" className={cn("nav-item", pathname === "/enrol" && "active")}>
            <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M9 7h6M12 16l0-6M9 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
            <span className="label">Enrol devices</span>
            <span className="active-dot"></span>
            <span className="nav-tooltip">Enrol devices</span>
          </Link>
        </div>
      </div>

      <div className={cn("nav-section", collapsed.monitor && "collapsed-section")}>
        <button className="nav-section-head" onClick={() => toggleSection('monitor')}>
          <span>Monitor devices</span>
          <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        {!collapsed.monitor && (
          <div className="nav-section-body">
            <Link href="/devices" className={cn("nav-item", pathname === "/devices" && "active")}>
              <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="2.2" stroke="currentColor" strokeWidth="1.6"/><path d="M9 19h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
              <span className="label">Devices</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Devices</span>
            </Link>
            <Link href="/reports" className={cn("nav-item", pathname === "/reports" && "active")}>
              <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 21V9M12 21V3M20 21v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span>
              <span className="label">Reports</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Reports</span>
            </Link>
            <Link href="/logs" className={cn("nav-item", pathname === "/logs" && "active")}>
              <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span>
              <span className="label">Device logs</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Device logs</span>
            </Link>
          </div>
        )}
      </div>

      <div className={cn("nav-section", collapsed.manage && "collapsed-section")}>
        <button className="nav-section-head" onClick={() => toggleSection('manage')}>
          <span>Manage devices</span>
          <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        {!collapsed.manage && (
          <div className="nav-section-body">
            <Link href="/groups" className={cn("nav-item", pathname === "/groups" && "active")}>
              <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="9" r="3" stroke="currentColor" strokeWidth="1.6"/><circle cx="17" cy="9" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M11 20c0-3 2.5-5 5-5s5 2 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
              <span className="label">Groups</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Groups</span>
            </Link>
            <Link href="/restrictions" className={cn("nav-item", pathname === "/restrictions" && "active")}>
              <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6"/><path d="M6.5 6.5l11 11" stroke="currentColor" strokeWidth="1.6"/></svg></span>
              <span className="label">Restrictions</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Restrictions</span>
            </Link>
            <Link href="/apps" className={cn("nav-item", pathname === "/apps" && "active")}>
              <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6"/></svg></span>
              <span className="label">Apps</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Apps</span>
            </Link>
            <Link href="/firmware" className={cn("nav-item", pathname === "/firmware" && "active")}>
              <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
              <span className="label">Firmware</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Firmware</span>
            </Link>
            <Link href="/users" className={cn("nav-item", pathname === "/users" && "active")}>
              <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6"/><path d="M4.5 20c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
              <span className="label">Device users</span>
              <span className="active-dot"></span>
              <span className="nav-tooltip">Device users</span>
            </Link>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="account-row w-full flex items-center gap-2">
          <ProfilePopover />
        </div>
      </div>
    </aside>
    </>
  );
}
