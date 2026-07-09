"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Scroll-reveal hook using IntersectionObserver.
 * Applies .fl-visible to elements with .fl-reveal / .fl-reveal-left / .fl-reveal-right.
 *
 * Performance notes:
 * - Single shared observer per hook instance
 * - Uses rootMargin to trigger slightly before viewport
 * - Once triggered, element is unobserved to free resources
 */
export function useScrollReveal(threshold = 0.12) {
  const containerRef = useRef<HTMLElement | null>(null);

  const observe = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      containerRef.current = node;

      if (typeof window === "undefined" || !("IntersectionObserver" in window))
        return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fl-visible");
              observer.unobserve(entry.target); // fire-once → no re-triggering
            }
          });
        },
        { threshold, rootMargin: "0px 0px -60px 0px" }
      );

      const targets = node.querySelectorAll(
        ".fl-reveal, .fl-reveal-left, .fl-reveal-right"
      );
      targets.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    },
    [threshold]
  );

  // Re-observe on mount
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    observe(node);
  }, [observe]);

  return observe;
}
