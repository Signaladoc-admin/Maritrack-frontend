"use client";

import { useEffect, useRef } from "react";
import RegisterOrSignInButtons from "@/features/landing/ui/RegisterOrSignIn";
import "@/features/landing/ui/landing.css";

export default function AboutCta() {
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
      { threshold: 0.2 }
    );
    el.querySelectorAll(".fl-reveal").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="container mx-auto px-4 md:px-10 py-6 md:py-16"
      aria-label="Get started with Flentra"
    >
      <div className="bg-[#17366A] rounded-3xl p-10 md:p-16 flex flex-col items-center text-center gap-8">

        <div className="fl-reveal space-y-4 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            No device — and nothing it carries — should ever be out of reach.
          </h2>
        </div>

        <div
          className="fl-reveal"
          style={{ transitionDelay: "0.1s" }}
        >
          <RegisterOrSignInButtons />
        </div>

      </div>
    </section>
  );
}
