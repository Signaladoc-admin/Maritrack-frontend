"use client";

import { useState, useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import "./landing.css";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface ProductGridProps {
  businessFeatures: Feature[];
  parentFeatures: Feature[];
}

export default function ProductGrid({ businessFeatures, parentFeatures }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<"businesses" | "parents">("businesses");
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Scroll reveal observer
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
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    el.querySelectorAll(".fl-reveal").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  // Re-trigger card animations on tab switch
  const handleTabSwitch = (tab: "businesses" | "parents") => {
    if (tab === activeTab || animating) return;
    setAnimating(true);
    setActiveTab(tab);
    setTimeout(() => setAnimating(false), 100);
  };

  // Re-observe grid cards after tab switch
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".fl-reveal");
    cards.forEach((c) => c.classList.remove("fl-visible"));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fl-visible");
          }
        });
      },
      { threshold: 0.01 }
    );
    setTimeout(() => {
      cards.forEach((c) => obs.observe(c));
    }, 60);

    return () => obs.disconnect();
  }, [activeTab]);

  const features = activeTab === "businesses" ? businessFeatures : parentFeatures;

  return (
    <section
      ref={sectionRef}
      className="container mx-auto md:px-10 px-6 pb-10 md:pb-24"
      aria-label="Product features for enterprises and families"
    >
      {/* Header */}
      <div className="text-center mx-auto mb-10 md:mb-16 fl-reveal">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          A Product for <span className="text-[#04DB62]">All Users</span>
        </h2>
        <p className="text-gray-400 text-[20px] max-w-3xl mx-auto mb-12">
          Whether you&apos;re securing a corporate fleet or keeping your family
          safe online — Flentra&apos;s intelligent MDM and parental control tools
          have you covered.
        </p>

        {/* Animated sliding-pill Tabs */}
        <div className="flex justify-center">
          <div className="relative flex bg-[#161A25] rounded-xl p-2">
            {/* Sliding pill indicator */}
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 rounded-lg bg-[#05E0E4] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: "calc(50% - 8px)",
                left: activeTab === "businesses" ? "8px" : "calc(50%)",
              }}
            />
            <button
              onClick={() => handleTabSwitch("businesses")}
              className={`relative z-10 md:px-8 px-5 py-4 rounded-lg font-semibold transition-colors duration-300 text-lg ${
                activeTab === "businesses" ? "text-[#161A25]" : "text-gray-400 hover:text-white"
              }`}
              aria-selected={activeTab === "businesses"}
            >
              Enterprise Management
            </button>
            <button
              onClick={() => handleTabSwitch("parents")}
              className={`relative z-10 md:px-8 px-5 py-4 rounded-lg font-semibold transition-colors duration-300 text-lg ${
                activeTab === "parents" ? "text-[#161A25]" : "text-gray-400 hover:text-white"
              }`}
              aria-selected={activeTab === "parents"}
            >
              Family Management
            </button>
          </div>
        </div>
      </div>

      {/* Feature cards grid */}
      <div
        ref={gridRef}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        key={activeTab}
      >
        {features.map((feature, i) => {
          const staggerIdx = Math.min(i + 1, 9);
          return (
            <article
              key={`${activeTab}-${i}`}
              className={`
                fl-reveal fl-stagger-${staggerIdx}
                bg-[#161A25] border border-white/10 p-8 rounded-2xl
                hover:border-[#05E0E4] transition-all duration-300 group
                cursor-default
              `}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
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
