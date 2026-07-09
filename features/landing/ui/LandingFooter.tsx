"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { footerLinks, footerSocials } from "@/features/landing/data";
import "./landing.css";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
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
      { threshold: 0.08 }
    );
    el.querySelectorAll(".fl-reveal").forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t border-[#FFFFFF40] mt-12 md:py-16 py-10"
    >
      <div className="container mx-auto md:px-10 px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Brand column */}
        <div className="col-span-2 lg:col-span-2 space-y-6 fl-reveal">
          <div className="flex items-center">
            <Image
              src="/assets/FlentraLogo.svg"
              alt="Flentra Logo"
              width={118}
              height={30}
              className="h-9 w-auto"
            />
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            Flentra is the intelligent device management platform for enterprises
            and families — real-time tracking, MDM compliance, geofencing, and
            parental controls in one unified solution.
          </p>
          <div className="flex items-center gap-4">
            {footerSocials.map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                aria-label={social.alt}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 cursor-pointer transition-all duration-200 hover:scale-110"
              >
                <Image src={social.icon} alt={social.alt} width={16} height={16} />
              </Link>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerLinks.map((column, idx) => (
          <div
            key={idx}
            className={`fl-reveal fl-stagger-${idx + 2}`}
          >
            <h4 className="font-bold mb-6 text-white">{column.title}</h4>
            <ul className="space-y-4 text-sm text-[#FFFFFF99]">
              {column.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 hover:pl-1"
                    style={{ transition: "color 0.2s, padding-left 0.2s" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#FFFFFF99] fl-reveal">
        <p>© {currentYear} Flentra. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-white transition-colors">Security</Link>
          <Link href="#" className="hover:text-white transition-colors">Trust Center</Link>
          <Link href="#" className="hover:text-white transition-colors">Compliance</Link>
        </div>
      </div>
    </footer>
  );
}
