"use client";

import { useEffect, useRef } from "react";
import { landingFeatures } from "@/features/landing/data";
import "./landing.css";

export default function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fl-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    el.querySelectorAll(".fl-reveal").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="container mx-auto md:px-10 px-6 md:py-24 py-10"
      aria-label="Platform features"
    >
      {/* Section header */}
      <div className="text-center mx-auto md:mb-16 mb-10 fl-reveal">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Everything you need to{" "}
          <span className="text-[#04DB62]">Track your devices</span>
        </h2>
        <p className="text-gray-400 text-[20px] max-w-3xl mx-auto">
          Enterprise-grade MDM, real-time device tracking, geofencing, and
          compliance — all powered by an intelligent, always-on platform.
        </p>
      </div>

      {/* Feature cards — staggered entrance */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landingFeatures.map((feature, i) => {
          const staggerClass = `fl-stagger-${i + 1}`;
          return (
            <article
              key={i}
              className={`
                fl-reveal ${staggerClass}
                bg-[#161A25] border border-white/10 p-8 rounded-2xl
                hover:border-[#05E0E4] transition-all duration-300 group
                relative overflow-hidden
              `}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              >
                <feature.icon className="w-6 h-6 text-[#05E0E4]" />
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-[#05E0E4] transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
