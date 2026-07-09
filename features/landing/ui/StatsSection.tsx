"use client";

import { useEffect, useRef, useState } from "react";
import { landingStats } from "@/features/landing/data";
import "./landing.css";

/** Animate a number from 0 to target over `duration` ms */
function useCountUp(target: number, duration = 1800, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const numericTarget = parseFloat(target.toString());

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [active, target, duration]);

  return value;
}

/** Parse "500M+" → { numeric: 500, suffix: "M+" } */
function parseStatValue(val: string) {
  const match = val.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { numeric: 0, suffix: val };
  return { numeric: parseFloat(match[1]), suffix: match[2] };
}

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { numeric, suffix } = parseStatValue(value);
  const animatedNum = useCountUp(numeric, 1800, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="text-center px-4 fl-reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="text-4xl md:text-5xl font-bold mb-2 text-[#05E0E4]"
        aria-label={value}
      >
        {visible ? `${animatedNum}${suffix}` : value}
      </div>
      <div className="text-sm text-[#FFFFFF99]">{label}</div>
    </div>
  );
}

export default function StatsSection() {
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
      { threshold: 0.12 }
    );
    el.querySelectorAll(".fl-reveal").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-y border-[#FFFFFF40]"
      aria-label="Platform statistics"
    >
      <div className="container mx-auto md:px-10 px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {landingStats.map((stat, idx) => (
            <AnimatedStat key={idx} value={stat.value} label={stat.label} delay={idx * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
