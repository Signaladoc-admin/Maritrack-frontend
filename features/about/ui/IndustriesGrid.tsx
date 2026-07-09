"use client";

import { useEffect, useRef } from "react";
import { industries } from "@/features/about/data";
import "@/features/landing/ui/landing.css";

export default function IndustriesGrid() {
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
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    el.querySelectorAll(".fl-reveal").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-t border-white/10 bg-[#0D1120]"
      aria-label="Industries we serve"
    >
      <div className="container mx-auto md:px-10 px-6 py-16 md:py-28">

        {/* Header */}
        <div className="text-center mb-16 fl-reveal">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#04DB62] mb-4">
            Built for Every Business With Devices in the Field
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Flentra started by solving device risk for telecom operators and their financing
            partners — but the same problem shows up everywhere an organization hands a device
            to someone it doesn&apos;t see every day. That&apos;s the pattern we built for.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            const stagger = Math.min(i + 1, 9);
            return (
              <article
                key={i}
                className={`fl-reveal fl-stagger-${stagger} group bg-[#161A25] border border-white/8 rounded-2xl p-7 hover:border-white/20 transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${industry.accent}12` }}
                >
                  <Icon className="w-5 h-5" style={{ color: industry.accent }} />
                </div>
                <h3 className="font-bold text-white mb-2 leading-snug group-hover:text-[#05E0E4] transition-colors duration-200">
                  {industry.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{industry.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
