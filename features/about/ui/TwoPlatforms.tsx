"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Building2, Users } from "lucide-react";
import { businessProtections, familyProtections } from "@/features/about/data";
import "@/features/landing/ui/landing.css";

export default function TwoPlatforms() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("fl-visible"); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    el.querySelectorAll(".fl-reveal, .fl-reveal-left, .fl-reveal-right").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="container mx-auto md:px-10 px-6 py-16 md:py-28"
      aria-label="Two platforms"
    >
      {/* Header */}
      <div className="text-center mb-16 fl-reveal">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#4A9EFF] mb-4">
          One Platform, Two Ways We Protect What Matters
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
          The same underlying device intelligence,{" "}
          <span className="text-[#05E0E4]">two very different experiences</span>
        </h2>
        <p className="text-white/55 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          The same underlying device intelligence — real-time location, remote lock and wipe, usage
          insight, and secure recovery — serves two very different audiences, built into two very
          different experiences.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

        {/* Business card */}
        <div className="fl-reveal-left group bg-[#161A25] border border-white/10 rounded-3xl p-8 md:p-10 hover:border-[#05E0E4]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#05E0E4]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-6 h-6 text-[#05E0E4]" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#05E0E4]">
                Flentra for Business
              </p>
              <h3 className="text-xl font-bold text-white mt-1">
                Device intelligence for any organization that issues, assigns, or manages mobile devices in the field.
              </h3>
            </div>
          </div>


          <ul className="space-y-3 mt-auto">
            {businessProtections.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#05E0E4] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t border-white/8">
            <span className="text-[#05E0E4] text-sm font-semibold">
              For enterprises &amp; field teams →
            </span>
          </div>
        </div>

        {/* Family card */}
        <div className="fl-reveal-right group bg-[#161A25] border border-white/10 rounded-3xl p-8 md:p-10 hover:border-[#4A9EFF]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#4A9EFF]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-[#4A9EFF]" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#4A9EFF]">
                Flentra for Family
              </p>
              <h3 className="text-xl font-bold text-white mt-1">
                Simple, reassuring device safety for parents and guardians.
              </h3>
            </div>
          </div>


          <ul className="space-y-3 mt-auto">
            {familyProtections.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#4A9EFF] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t border-white/8">
            <span className="text-[#4A9EFF] text-sm font-semibold">
              For parents &amp; guardians →
            </span>
          </div>
        </div>
      </div>

      {/* Unifying statement */}
      <p className="fl-reveal text-center text-white/50 text-base mt-10 max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: "0.2s" }}>
        Different audiences, different problems, and deliberately different tones. But the same
        conviction sits underneath both: a device&apos;s value — financial or personal — shouldn&apos;t
        be left unprotected just because the device left the building.
      </p>
    </section>
  );
}
