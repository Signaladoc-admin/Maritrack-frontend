"use client";

import { useEffect, useRef } from "react";
import { timelineEvents } from "@/features/about/data";
import "@/features/landing/ui/landing.css";

export default function OriginStory() {
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
    el.querySelectorAll(".fl-reveal, .fl-reveal-left, .fl-reveal-right").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="container mx-auto md:px-10 px-6 py-16 md:py-28"
      aria-label="Where Flentra started"
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

        {/* Left: narrative */}
        <div className="lg:w-1/2 space-y-8">
          <div className="fl-reveal-left space-y-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#4A9EFF]">
              Where We Started
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Where We Started
            </h2>
          </div>

          {[
            `Flentra began with a simple observation: organizations were investing millions in mobile devices, yet the moment those devices left their premises, they lost visibility and control.`,
            `We first encountered this challenge while working with telecom operators and device financing partners. Every year, financed smartphones went missing, company-issued devices were never returned, and businesses struggled to recover assets or enforce policies once a device was in the hands of a customer or employee. The financial losses were significant, but so were the operational and security risks.`,
            `As we worked to solve these problems, we realized the issue wasn't unique to telecom. The same pattern existed across industries. Logistics companies depended on drivers carrying business-critical devices. Healthcare providers relied on tablets containing sensitive patient information. Schools issued devices to students. Enterprises equipped employees with laptops and smartphones. In every case, once a device left the building, organizations lost the confidence that they could locate it, secure it, or recover it when something went wrong.`,
            `To address this, we built a platform that combined real-time device intelligence, remote security controls, and policy enforcement into a single solution. More importantly, we designed it to work in real operating environments—including places with inconsistent connectivity—by supporting both mobile data and SMS-based communication.`,
            `As the platform matured, another realization emerged. The technology that helps an IT administrator recover a lost company device is just as valuable to a parent trying to keep track of a child’s phone. The same intelligence that protects enterprise assets can also provide reassurance to families.`,
            `Today, Flentra serves both businesses and households with solutions tailored to their unique needs, while remaining driven by the same mission that inspired us from the beginning: ensuring that no device—and nothing it carries—is ever truly out of reach of the people responsible for it.`,
          ].map((paragraph, i) => (
            <p
              key={i}
              className={`fl-reveal text-[#FFFFFFB2] leading-relaxed text-base`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Right: visual timeline */}
        <div className="lg:w-1/2 fl-reveal-right">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10" />

            <div className="space-y-10">
              {timelineEvents.map((event, i) => {
                const accent = i % 3 === 0 ? "#05E0E4" : i % 3 === 1 ? "#4A9EFF" : "#04DB62";
                const stagger = i + 1;
                return (
                  <div
                    key={i}
                    className={`fl-reveal fl-stagger-${stagger} relative group`}
                  >
                    {/* Dot */}
                    <span
                      className="absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 border-[#0A0E1A] transition-transform duration-300 group-hover:scale-125"
                      style={{ background: accent }}
                    />
                    {/* Content */}
                    <div className="bg-[#161A25] border border-white/8 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-lg"
                          style={{ background: `${accent}18`, color: accent }}
                        >
                          {event.year}
                        </span>
                        <h3 className="font-bold text-white text-sm">{event.label}</h3>
                      </div>
                      <p className="text-white/55 text-sm leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
