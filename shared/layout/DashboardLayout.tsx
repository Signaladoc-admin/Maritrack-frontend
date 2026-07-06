"use client";

import { ReactNode } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Sidebar } from "../ui/Sidebar/Sidebar";
import { MobileNavbar } from "../ui/layout/mobile-navbar";
import TopNavbar from "../ui/TopNavbar/TopNavbar";
import { ProfilePopover } from "@/shared/ui/Sidebar/ProfilePopover";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // AuthProvider only renders children once `user` is resolved, but guard here too —
  // defaulting to either layout for an unsettled `user` would briefly show the wrong shell.
  if (!user) return null;

  const Layout = user.appRole === "PARENT" ? ParentLayout : BusinessLayout;

  return <Layout>{children}</Layout>;
}

function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#F7F7F7] lg:bg-white">
      <div className="absolute right-6 top-6 z-50 flex items-center lg:right-12 lg:top-12">
        <ProfilePopover />
      </div>
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl p-6 lg:p-12">{children}</div>
      </main>
    </div>
  );
}

function BusinessLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopNavbar />
      <main className="min-w-0 flex-1 pt-20">
        <div className="mx-auto max-w-6xl p-6 lg:p-12">{children}</div>
      </main>
    </div>
  );
}
