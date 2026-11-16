"use client";

import { useRef, type ReactNode } from "react";
import { useScrollReveal } from "@/features/landing-v2/model/useScrollReveal";
import LandingV2Footer from "@/features/landing-v2/ui/LandingV2Footer";
import LandingV2Header from "@/features/landing-v2/ui/LandingV2Header";
import "@/features/landing-v2/ui/landing-v2.css";

interface LandingV2PageShellProps {
  children: ReactNode;
  /** Fade each section up as it scrolls into view (the first section is skipped). Defaults to true. */
  revealSections?: boolean;
  /** Smoothly animate in on-screen sections on initial mount (e.g. for sign-in or book-a-demo). */
  animateInitial?: boolean;
}

export default function LandingV2PageShell({
  children,
  revealSections = true,
  animateInitial = false,
}: LandingV2PageShellProps) {
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef, { enabled: revealSections, animateInitial });

  return (
    <div className="flentra-v2 flex min-h-screen min-w-0 flex-col bg-navy font-sans text-white">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <LandingV2Header />
      <main ref={mainRef} id="main" className="flex-1">
        {children}
      </main>
      <LandingV2Footer />
    </div>
  );
}
