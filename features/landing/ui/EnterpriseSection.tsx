"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { enterpriseChecklist } from "@/features/landing/data";
import "./landing.css";

export default function EnterpriseSection() {
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
      { threshold: 0.1 }
    );
    el.querySelectorAll(".fl-reveal, .fl-reveal-left, .fl-reveal-right").forEach((e) =>
      obs.observe(e)
    );
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="container mx-auto md:px-10 px-6 py-10 md:py-24"
      aria-label="Enterprise infrastructure"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left: Text */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="fl-reveal text-5xl md:text-6xl font-bold leading-tight">
            Built on a{" "}
            <span className="text-[#05E0E4]">secure enterprise infrastructure</span>
          </h2>

          <p className="fl-reveal text-[#FFFFFFB2] text-lg max-w-[600px]" style={{ transitionDelay: "0.1s" }}>
            Built for scale and speed, our platform analyses billions of daily events
            with millisecond responsiveness using advanced AI and stream processing technology.
          </p>

          {/* Checklist */}
          <ul className="space-y-4">
            {enterpriseChecklist.map((item, i) => (
              <li
                key={i}
                className="fl-reveal flex items-center gap-3 group"
                style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <CheckCircle2 className="w-5 h-5 text-[#1B3C73]" />
                </div>
                <span className="font-medium text-[#FFFFFFB2] group-hover:text-white transition-colors duration-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Phone mockup */}
        <div className="lg:w-1/2 relative flex justify-center lg:justify-end fl-reveal-right">
          <div className="fl-animate-float">
            <Image
              src="/assets/device.png"
              alt="Mobile app interface"
              width={400}
              height={700}
              className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-none lg:w-[600px] lg:h-[600px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
