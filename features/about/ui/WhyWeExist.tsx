"use client";

import { useEffect, useRef } from "react";
import "@/features/landing/ui/landing.css";

const scenarios = [
  "A delivery rider's only way to reach the next drop.",
  "A field agent's proof of a completed job.",
  "A financed handset still being paid off.",
  "A nurse's access to patient records.",
  "A remote employee's laptop and everything on it.",
  "A child's location and a parent's ability to sleep at night.",
];

export default function WhyWeExist() {
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
      aria-label="Why Flentra exists"
    >
      <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

        {/* Left — sticky label + heading */}
        <div className="lg:w-5/12 lg:sticky lg:top-32 space-y-6 fl-reveal-left">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#05E0E4]">
            Why We Exist
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            A device is never{" "}
            <span className="text-[#4A9EFF]">just hardware.</span>
          </h2>
          <p className="text-[#FFFFFFB2] text-base leading-relaxed">
            Every one of those things carries real value — financial, operational, or deeply personal.
            And in almost every case, once a device leaves the building, that value goes largely unprotected.
          </p>
          <p className="text-[#FFFFFFB2] text-base leading-relaxed">
            Most organizations discover this the hard way: a device goes missing, a former employee
            walks off with company data still on their phone, a field fleet has no idea where half
            its tablets are, or a payment default turns an asset into a write-off overnight.
          </p>
          <blockquote className="border-l-2 border-[#05E0E4] pl-5 text-white/70 italic text-base leading-relaxed">
            Flentra exists to close that gap — for any business with devices to protect, and for
            the families who want the same peace of mind at home.
          </blockquote>
        </div>

        {/* Right — scenario list */}
        <div className="lg:w-7/12 space-y-4">
          {scenarios.map((scenario, i) => (
            <div
              key={i}
              className={`fl-reveal fl-stagger-${i + 1} group flex items-start gap-5 bg-[#161A25] border border-white/8 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5`}
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-[#0A0E1A]"
                style={{ background: i % 3 === 0 ? "#05E0E4" : i % 3 === 1 ? "#4A9EFF" : "#04DB62" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-white/80 text-base leading-relaxed group-hover:text-white transition-colors duration-200">
                {scenario}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
