"use client";

import React from "react";
import { Home, User, Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [{ icon: Home, href: "/dashboard", active: pathname === "/dashboard" }];

  // Mock child profiles for now
  const children = [
    { id: "1", name: "Sammie", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sammie" },
    { id: "2", name: "Kuroebi", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kuroebi" },
  ];

  return (
    <aside className="fixed top-0 left-0 z-50 flex h-full w-[80px] flex-col items-center border-r border-neutral-100 bg-[#F8F9FA] py-8">
      {/* Main Nav */}
      <div className="flex w-full flex-col items-center gap-6">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200",
              item.active
                ? "bg-[#1B3C73] text-white shadow-lg shadow-blue-900/20"
                : "text-slate-400 hover:bg-white hover:text-[#1B3C73]"
            )}
          >
            <item.icon className="h-6 w-6" strokeWidth={2.5} />
          </Link>
        ))}
      </div>

      {/* Children Avatars */}
      <div className="mt-12 flex w-full flex-col items-center gap-5">
        {children.map((child) => (
          <button
            key={child.id}
            className="group relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-transparent transition-all hover:border-[#1B3C73]"
          >
            <img src={child.image} alt={child.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer Nav */}
      <div className="flex w-full flex-col items-center gap-6 pb-4">
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F3F5] text-slate-500 transition-colors hover:bg-white hover:text-[#1B3C73]">
          <User className="h-6 w-6" strokeWidth={2.5} />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F3F5] text-slate-500 transition-colors hover:bg-white hover:text-orange-500">
          <Plus className="h-6 w-6 text-orange-400" strokeWidth={3} />
        </button>
      </div>
    </aside>
  );
}
