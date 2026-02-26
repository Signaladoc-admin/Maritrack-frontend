import React from "react";
import { Sidebar } from "@/shared/ui/Sidebar/Sidebar";

export default function InAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="ml-[80px] flex-1">
        <div className="mx-auto max-w-(--breakpoint-2xl) p-8 md:p-12">{children}</div>
      </main>
    </div>
  );
}
