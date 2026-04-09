import { useAuth } from "@/shared/auth/AuthProvider";
import { Gauge, Map, Bell, Settings, HardHat, Smartphone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const businessNavLinks = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Devices", href: "/devices", icon: Smartphone },
  { label: "Users", href: "/users", icon: User },
];

export default function TopNavbar() {
  const pathname = usePathname();

  const { user } = useAuth();

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-16 bg-[#f7f7f7] py-8 text-sm">
        {businessNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              className={`transition-allC flex items-center gap-2 ${isActive ? "font-semibold text-[#1B3C73]" : "text-[#666666]"}`}
              key={link.label}
              href={link.href}
            >
              <link.icon />
              <p>{link.label}</p>
            </Link>
          );
        })}
      </div>
      <Link
        href="/profile"
        className="absolute right-5 bottom-1/2 translate-y-1/2 rounded-full bg-[#e5e5e5] p-3"
      >
        {user?.imageUrl ? (
          <Image src={user.imageUrl} alt="" width={50} height={50} />
        ) : (
          <User className="text-neutral-500" />
        )}
      </Link>
    </div>
  );
}
