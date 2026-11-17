import Link from "next/link";
import { ThemeToggle } from "@/shared/ui/ThemeToggle/ThemeToggle";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-background text-foreground">
      {/* BRAND PANEL */}
      <div className="relative hidden flex-col overflow-hidden border-r border-border bg-background p-11 lg:flex">
        <Link href="/" aria-label="Flentra home" className="inline-flex w-fit items-center">
          <img src="/assets/FlentraLogo.svg" alt="Flentra Logo" className="h-8 w-auto" />
        </Link>

        <div className="relative my-auto max-w-[460px] py-16">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-tint px-3.5 py-1.5 text-xs font-bold tracking-wide text-accent">
            Portfolio protection platform
          </span>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-foreground">
            Protect, monitor, and recover every financed device.
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Flentra gives telecom operators, lenders, and leasing providers real-time visibility and control over their entire device portfolio — from activation to recovery.
          </p>
          <div className="flex gap-7 relative">
            <div>
              <b className="block text-2xl font-extrabold text-foreground">842</b>
              <span className="text-xs text-muted-foreground">Devices monitored</span>
            </div>
            <div>
              <b className="block text-2xl font-extrabold text-foreground">94%</b>
              <span className="text-xs text-muted-foreground">Fleet recovery rate</span>
            </div>
            <div>
              <b className="block text-2xl font-extrabold text-foreground">24/7</b>
              <span className="text-xs text-muted-foreground">Live location tracking</span>
            </div>
          </div>
        </div>

        <div className="relative text-xs text-muted-foreground">
          © 2026 Flentra. All rights reserved.
        </div>
      </div>

      {/* FORM PANEL */}
      <div className="flex items-center justify-center p-10 relative">
        <div className="absolute top-6 right-6">
          <ThemeToggle variant="icon" />
        </div>
        <div className="w-full max-w-[400px]">
          <div className="mb-7 flex justify-center lg:hidden">
            <Link href="/" aria-label="Flentra home" className="inline-flex items-center">
              <img src="/assets/FlentraLogo.svg" alt="Flentra Logo" className="h-8 w-auto" />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
