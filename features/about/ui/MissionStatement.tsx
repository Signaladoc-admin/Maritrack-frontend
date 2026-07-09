"use client";

import { useEffect, useRef } from "react";
import "@/features/landing/ui/landing.css";

export default function MissionStatement() {
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
      { threshold: 0.3 }
    );
    el.querySelectorAll(".fl-reveal").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-y border-white/10"
      aria-label="Our mission"
    >
      <div className="container mx-auto md:px-10 px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center space-y-6">

          <p className="fl-reveal text-xs font-semibold tracking-widest uppercase text-[#04DB62]">
            Our Mission
          </p>

          <p
            className="fl-reveal text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ transitionDelay: "0.12s" }}
          >
            To make sure that no device —{" "}
            <span className="text-[#05E0E4]">
              and nothing it carries
            </span>{" "}
            — is ever truly out of reach of the people{" "}
            <span className="text-[#4A9EFF]">responsible for it.</span>
          </p>

        </div>
      </div>
    </section>
  );
}
