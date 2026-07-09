"use client";

import { useEffect, useRef } from "react";
import { values } from "@/features/about/data";
import "@/features/landing/ui/landing.css";

export default function OurValues() {
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
      aria-label="What we value"
    >
      <div className="container mx-auto md:px-10 px-6 py-16 md:py-28">

        {/* Header */}
        <div className="text-center mb-16 fl-reveal">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#05E0E4] mb-4">
            What We Value
          </p>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((value, i) => {
            const Icon = value.icon;
            const stagger = i + 1;
            return (
              <article
                key={i}
                className={`fl-reveal fl-stagger-${stagger} group flex flex-col gap-5 bg-[#161A25] border border-white/8 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon + accent line */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${value.accent}12` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: value.accent }} />
                  </div>
                  <div
                    className="h-px flex-1 opacity-30"
                    style={{ background: `linear-gradient(to right, ${value.accent}, transparent)` }}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#05E0E4] transition-colors duration-200">
                    {value.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
