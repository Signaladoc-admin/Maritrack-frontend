import { Gauge, Smartphone, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfilePopover } from "../Sidebar/ProfilePopover";

const businessNavLinks = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Devices", href: "/devices", icon: Smartphone },
  { label: "Users", href: "/users", icon: User },
];

export default function TopNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed z-9999 w-screen">
      <div className="flex items-center justify-center gap-8 border-b-[1.5px] border-[#eee] bg-[#f7f7f7] py-6 text-sm md:gap-16">
        {businessNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              className={`flex items-center gap-2 font-semibold transition-all ${isActive ? "text-[#1B3C73]" : "text-[#999]"}`}
              key={link.label}
              href={link.href}
            >
              <link.icon />
              <p>{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="absolute right-10 bottom-1/2 hidden translate-y-1/2 sm:block">
        <ProfilePopover />
      </div>
    </div>
  );
}
