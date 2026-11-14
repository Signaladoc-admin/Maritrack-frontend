"use client";

import { useEffect, type RefObject } from "react";

export const REVEAL_PENDING_CLASS = "fl-v2-reveal";
export const REVEAL_VISIBLE_CLASS = "fl-v2-reveal-in";

export interface UseScrollRevealOptions {
  enabled?: boolean;
  skip?: number;
  rootMargin?: string;
  animateInitial?: boolean;
}

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    skip = 1,
    rootMargin = "0px 0px -8% 0px",
    animateInitial = false,
  }: UseScrollRevealOptions = {},
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let raf1: number | null = null;
    let raf2: number | null = null;
    const armed: HTMLElement[] = [];

    // 1. Initial on-screen entrance animation (e.g. for sign-in or book-a-demo)
    if (animateInitial) {
      const initialSections = Array.from(container.children).filter(
        (el): el is HTMLElement => el.tagName === "SECTION",
      );

      initialSections.forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight) {
          section.classList.add(REVEAL_PENDING_CLASS);
          armed.push(section);
        }
      });

      if (armed.length > 0) {
        raf1 = requestAnimationFrame(() => {
          raf2 = requestAnimationFrame(() => {
            if (cancelled) return;
            armed.forEach((section) => {
              section.classList.add(REVEAL_VISIBLE_CLASS);
            });
          });
        });
      }
    }

    // 2. Below-the-fold scroll observer
    const sections = Array.from(container.children)
      .filter((el): el is HTMLElement => el.tagName === "SECTION")
      .slice(animateInitial ? 0 : skip);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(REVEAL_VISIBLE_CLASS);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin },
    );

    sections.forEach((section) => {
      // If already armed in animateInitial, don't re-arm with observer
      if (armed.includes(section)) return;
      // Already on screen (or scrolled past): leave it visible.
      if (section.getBoundingClientRect().top < window.innerHeight) return;
      section.classList.add(REVEAL_PENDING_CLASS);
      observer.observe(section);
      armed.push(section);
    });

    // Restore the DOM on unmount / re-run (also covers React Strict Mode in dev).
    return () => {
      cancelled = true;
      if (raf1 !== null) cancelAnimationFrame(raf1);
      if (raf2 !== null) cancelAnimationFrame(raf2);
      observer.disconnect();
      armed.forEach((section) =>
        section.classList.remove(REVEAL_PENDING_CLASS, REVEAL_VISIBLE_CLASS),
      );
    };
  }, [containerRef, enabled, skip, rootMargin, animateInitial]);
}
