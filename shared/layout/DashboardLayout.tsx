"use client";

import { ReactNode } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Sidebar } from "../ui/Sidebar/Sidebar";
import { MobileNavbar } from "../ui/layout/mobile-navbar";
import TopNavbar from "../ui/TopNavbar/TopNavbar";
import { Loader } from "../ui/loader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  const Layout = user?.appRole === "PARENT" ? ParentLayout : BusinessLayout;

  if (isLoading) {
    return <Loader size="lg" className="flex h-screen w-screen items-center justify-center" />;
  }

  return <Layout>{children}</Layout>;
}

function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <MobileNavbar />
      <main className="min-w-0 flex-1 lg:ml-[100px]">
        <div className="mx-auto max-w-(--breakpoint-2xl) p-6 lg:p-12">{children}</div>
      </main>
    </div>
  );
}

function BusinessLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopNavbar />
      <main className="min-w-0 flex-1 pt-20">
        <div className="mx-auto max-w-(--breakpoint-2xl) p-6 lg:p-12">{children}</div>
      </main>
    </div>
  );
}
