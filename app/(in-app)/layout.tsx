import React from "react";
import { Sidebar } from "@/shared/ui/Sidebar/Sidebar";
import { MobileNavbar } from "@/shared/ui/layout/mobile-navbar";

export default function InAppLayout({ children }: { children: React.ReactNode }) {
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
