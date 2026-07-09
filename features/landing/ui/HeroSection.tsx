"use client";

import Image from "next/image";
import { Shield, MapPin, Smartphone, Lock } from "lucide-react";
import { heroTrustBadges } from "@/features/landing/data";
import RegisterOrSignInButtons from "./RegisterOrSignIn";
import "./landing.css";

/** Floating status chips over the dashboard */
const floatingChips = [
  {
    icon: MapPin,
    label: "Live tracking",
    color: "#04DB62",
    style: { top: "14%", right: "6%", animationDelay: "0s", animationDuration: "5.5s" },
  },
  {
    icon: Smartphone,
    label: "42 devices online",
    color: "#4A9EFF",
    style: { top: "50%", right: "2%", animationDelay: "1.5s", animationDuration: "6.5s" },
  },
  {
    icon: Lock,
    label: "Policy enforced",
    color: "#05E0E4",
    style: { bottom: "18%", right: "10%", animationDelay: "0.8s", animationDuration: "7s" },
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative w-full pt-10 pb-24 overflow-hidden"
      aria-label="Flentra — Device Management and Parental Control Platform"
    >
      {/* ── Main layout ─────────────────────────── */}
      <div className="container mx-auto md:pl-10 pl-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 relative z-10">
        {/* Left: Text Content */}
        <div className="flex flex-col items-start text-left space-y-6 lg:w-1/2 flex-shrink-0">

          {/* Animated badge */}
          <div
            className="inline-flex items-center gap-2 border border-[#E5E7EB] bg-[#53565f] backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/80"
            style={{ animation: "fl-slide-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <Shield className="w-4 h-4 text-white" />
            <span>Trusted by 10,000+ families &amp; enterprises</span>
          </div>

          {/* Heading — each line staggered */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-normal leading-tight text-white max-w-lg">
            <span
              className="fl-word-reveal block"
              style={{ animationDelay: "0.2s" }}
            >
              Know what&apos;s
            </span>
            <span
              className="fl-word-reveal block"
              style={{ animationDelay: "0.35s" }}
            >
              happening{" "}
              <span className="text-[#4A9EFF]">on every device</span>
            </span>
            <span
              className="fl-word-reveal block"
              style={{ animationDelay: "0.5s" }}
            >
              Always.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed"
            style={{ animation: "fl-slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.6s both" }}
          >
            Real-time visibility and control for parents and enterprises.
            MDM, device tracking, geofencing, and compliance — all in one
            intelligent platform.
          </p>

          {/* CTA Buttons */}
          <div style={{ animation: "fl-slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.75s both" }}>
            <RegisterOrSignInButtons />
          </div>

          {/* Trust badges */}
          <div
            className="flex items-center gap-8 md:gap-20 text-xs text-[#7496C7] flex-wrap"
            style={{ animation: "fl-slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.9s both" }}
          >
            {heroTrustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Image src={badge.icon} alt="Check" width={12} height={12} />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer for right side on desktop */}
        <div className="hidden lg:block lg:w-1/2 flex-shrink-0 min-h-[500px]" />
      </div>

      {/* ── Right: Dashboard Mockup ──────────────── */}
      <div className="mt-12 lg:mt-0 relative px-6 lg:px-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 flex justify-end z-0">
        <div className="relative fl-animate-float-slow">
          {/* Dashboard image */}
          <Image
            src="/assets/heroFrame.png"
            alt="Flentra MDM dashboard — device monitoring and control interface"
            width={2100}
            height={700}
            className="relative w-full max-w-[400px] md:max-w-[550px] lg:max-w-[700px] rounded-2xl shadow-2xl"
            priority
          />

          {/* Floating status chips */}
          {floatingChips.map((chip, i) => {
            const Icon = chip.icon;
            return (
              <div
                key={i}
                aria-hidden="true"
                className="absolute hidden lg:flex items-center gap-2 rounded-xl border border-white/10 bg-[#0A0E1A]/80 backdrop-blur-md px-3 py-2 text-xs font-medium text-white shadow-xl fl-animate-float"
                style={chip.style}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ background: `${chip.color}22` }}
                >
                  <Icon style={{ color: chip.color }} className="h-3 w-3" />
                </span>
                <span>{chip.label}</span>
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: chip.color }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
