"use client";

import RegisterOrSignInButtons from "@/features/landing/ui/RegisterOrSignIn";
import "@/features/landing/ui/landing.css";

export default function AboutHero() {
  return (
    <section
      className="relative w-full pt-20 pb-28 overflow-hidden"
      aria-label="About Flentra"
    >
      <div className="container mx-auto md:px-10 px-6 flex flex-col items-center text-center gap-8">

        {/* Label chip */}
        <div
          className="inline-flex items-center gap-2 border border-[#05E0E4]/30 bg-[#05E0E4]/5 px-4 py-2 rounded-full text-sm text-[#05E0E4] font-medium tracking-widest uppercase"
          style={{ animation: "fl-slide-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
        >
          <span className="relative flex items-center justify-center h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#05E0E4] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#05E0E4]" />
          </span>
          About Flentra
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white max-w-4xl">
          <span className="fl-word-reveal block" style={{ animationDelay: "0.15s" }}>
            Every Device Carries
          </span>
          <span className="fl-word-reveal block" style={{ animationDelay: "0.28s" }}>
            Something Worth{" "}
            <span className="text-[#05E0E4]">Protecting</span>
          </span>
        </h1>

        {/* Subline */}
        <p
          className="fl-word-reveal text-lg md:text-xl text-white/55 max-w-2xl leading-relaxed"
          style={{ animationDelay: "0.42s" }}
        >
          Flentra builds the intelligence layer that protects what a mobile device
          carries — for any organization that issues, manages, or depends on devices
          in the field, and for the families who depend on the devices in their pockets.
        </p>

        {/* CTAs */}
        <div
          className="flex items-center gap-4 mt-2"
          style={{ animation: "fl-slide-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.55s both" }}
        >
          <RegisterOrSignInButtons />
        </div>
      </div>

      {/* Decorative divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
