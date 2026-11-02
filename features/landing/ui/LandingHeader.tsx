"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import "./landing.css";

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isBlogActive = pathname === "/blog" || pathname.startsWith("/blog/");
  const isAboutActive = pathname === "/about";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const showSolidBg = scrolled || mobileMenuOpen;

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: showSolidBg ? "rgba(10,14,26,0.92)" : "transparent",
        backdropFilter: showSolidBg ? "blur(20px)" : "none",
        borderBottom: showSolidBg
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        boxShadow: showSolidBg ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
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

        {/* Desktop Nav links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-3">
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
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="landing-mobile-menu"
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5 text-white hover:bg-white/10 hover:border-white/25 transition-all duration-200"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation dropdown */}
      <div
        id="landing-mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-72 opacity-100 border-t border-white/10" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="container mx-auto px-6 py-4 flex flex-col gap-2">
          <Link
            href="/about"
            aria-current={isAboutActive ? "page" : undefined}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
              isAboutActive
                ? "bg-white/10 text-white"
                : "text-white/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span>About</span>
            {isAboutActive && <span className="h-2 w-2 rounded-full bg-[#05E0E4]" />}
          </Link>
          <Link
            href="/blog"
            aria-current={isBlogActive ? "page" : undefined}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
              isBlogActive
                ? "bg-white/10 text-white"
                : "text-white/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span>Blog</span>
            {isBlogActive && <span className="h-2 w-2 rounded-full bg-[#05E0E4]" />}
          </Link>
          <div className="pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-all duration-200"
            >
              Sign In →
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
