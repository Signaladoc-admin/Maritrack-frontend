"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { footerColumns, trustBadges } from "@/features/landing-v2/data";
import {
  REVEAL_PENDING_CLASS,
  REVEAL_VISIBLE_CLASS,
} from "@/features/landing-v2/model/useScrollReveal";
import { ShieldTrustIcon } from "@/features/landing-v2/ui/LandingV2Icons";
import "./landing-v2.css";

export default function LandingV2Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>("[data-footer-reveal]"),
    );
    const armed: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(REVEAL_VISIBLE_CLASS);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
    );

    targets.forEach((target) => {
      if (target.getBoundingClientRect().top < window.innerHeight) return;
      target.classList.add(REVEAL_PENDING_CLASS);
      observer.observe(target);
      armed.push(target);
    });

    return () => {
      observer.disconnect();
      armed.forEach((target) =>
        target.classList.remove(REVEAL_PENDING_CLASS, REVEAL_VISIBLE_CLASS),
      );
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="site-footer border-t border-divider bg-navy px-6 pt-14 pb-9 font-sans text-white"
    >
      <div className="mx-auto flex max-w-site flex-col gap-9">
        <div className="flex flex-wrap justify-between gap-10">
          {/* Brand column */}
          <div
            data-footer-reveal
            className="flex min-w-0 flex-[1_1_280px] flex-col gap-[14px]"
          >
            <Link
              href="/"
              className="self-start transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/assets/flentra-logo.png"
                alt="Flentra"
                width={104}
                height={22}
                className="h-[22px] w-auto"
              />
            </Link>
            <p className="m-0 max-w-[320px] text-[15px] leading-[1.6] text-text-muted">
              Intelligent device portfolio management for business. Built and
              run by Marimax Global Concepts Limited.
            </p>
            <p className="m-0 text-[14.5px] leading-[1.7] text-text-soft">
              <a
                href="mailto:info@flentra.io"
                className="text-cyan no-underline transition-colors hover:text-cyan-light"
              >
                info@flentra.io
              </a>
              <br />
              <a
                href="https://www.flentra.io"
                className="text-cyan no-underline transition-colors hover:text-cyan-light"
              >
                www.flentra.io
              </a>
            </p>
          </div>

          {/* Link columns */}
          <div className="grid min-w-0 flex-[2_1_640px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8 text-[14.5px]">
            {footerColumns.map((columnGroups, colIdx) => (
              <div
                key={colIdx}
                data-footer-reveal
                style={{ transitionDelay: `${0.08 * (colIdx + 1)}s` }}
                className="flex flex-col gap-[10px]"
              >
                {columnGroups.map((group, groupIdx) => (
                  <div key={group.heading} className="contents">
                    <p
                      className={`${
                        groupIdx > 0 ? "mt-3 mb-0" : "m-0"
                      } text-[12px] font-bold tracking-[0.06em] text-text-dim uppercase`}
                    >
                      {group.heading}
                    </p>
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-text-soft no-underline transition-[color,padding-left] duration-200 hover:pl-1 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          data-footer-reveal
          style={{ transitionDelay: "0.24s" }}
          aria-label="Trust and compliance"
          className="flex flex-wrap items-center justify-between gap-4 border-t border-divider pt-7"
        >
          <p
          data-footer-reveal
          style={{ transitionDelay: "0.3s" }}
          className="m-0 text-[13px] text-text-dim"
        >
          © 2026 Marimax Global Concepts Limited. All rights reserved.
        </p>
          <div className="flex flex-wrap gap-2.5">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-badge border border-line bg-surface px-3.5 py-2 text-[13px] font-semibold text-text-soft"
              >
                <ShieldTrustIcon />
                {badge}
              </span>
            ))}
          </div>
        </div>

       
        
      </div>
    </footer>
  );
}
