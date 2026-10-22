"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./landing.css";

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isBlogActive = pathname === "/blog" || pathname.startsWith("/blog/");
  const isAboutActive = pathname === "/about";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,14,26,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        animation: "fl-slide-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <div className="container mx-auto md:px-10 px-6 py-4 flex items-center justify-between">
        <Link
          href="/landing"
          className="flex items-center transition-transform duration-200 hover:scale-105"
          aria-label="Flentra home"
        >
          <Image
            src="/assets/FlentraLogo.svg"
            alt="Flentra — Smart MDM and Parental Controls Platform"
            width={118}
            height={30}
            className="lg:h-10 h-8 w-auto"
            priority
          />
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/about"
            aria-current={isAboutActive ? "page" : undefined}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isAboutActive ? "text-white" : "text-white/70 hover:text-white"
            }`}
          >
            About
            {isAboutActive && (
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-[#05E0E4]" />
            )}
          </Link>
          <Link
            href="/blog"
            aria-current={isBlogActive ? "page" : undefined}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isBlogActive ? "text-white" : "text-white/70 hover:text-white"
            }`}
          >
            Blog
            {isBlogActive && (
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-[#05E0E4]" />
            )}
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-all duration-200 hover:scale-105"
          >
            Sign In →
          </Link>
        </div>

      </div>
    </header>
  );
}
