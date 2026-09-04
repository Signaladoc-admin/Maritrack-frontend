"use client";

import { ReactNode } from "react";
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
  return (
    <div className="flex min-h-screen bg-background text-foreground w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex w-full items-center justify-end p-6 lg:p-8 md:hidden">
           <ProfilePopover />
        </div>
        <main className="mx-auto w-full max-w-[1360px] p-6 lg:p-10 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function BusinessLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground w-full">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />
        <main className="mx-auto w-full max-w-[1360px] p-6 lg:p-10 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
