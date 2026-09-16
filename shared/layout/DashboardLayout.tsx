"use client";

import { ReactNode, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Sidebar } from "../ui/Sidebar/Sidebar";
import { MobileNavbar } from "../ui/layout/mobile-navbar";
import TopNavbar from "../ui/TopNavbar/TopNavbar";
import { ProfilePopover } from "@/shared/ui/Sidebar/ProfilePopover";

import { BusinessSidebar } from "../ui/Sidebar/BusinessSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // AuthProvider only renders children once `user` is resolved, but guard here too —
  // defaulting to either layout for an unsettled `user` would briefly show the wrong shell.
  if (!user) return null;

  const Layout = user.appRole === "PARENT" ? ParentLayout : BusinessLayout;

  return <Layout>{children}</Layout>;
}

function ParentLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full">
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavbar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="mx-auto w-full max-w-[1360px] flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

function BusinessLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full">
      <BusinessSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavbar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="mx-auto w-full max-w-[1360px] flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
