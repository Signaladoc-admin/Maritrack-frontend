"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  mobileNavGroups,
  navDropdownPanels,
  type MobileNavGroup,
  type NavMenuKey,
} from "@/features/landing-v2/data";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";
import { useAuth } from "@/shared/auth/AuthProvider";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  HamburgerMenuIcon,
  NavItemIcon,
  SignInUserIcon,
} from "@/features/landing-v2/ui/LandingV2Icons";
import "./landing-v2.css";

type ActiveMenuKey = NavMenuKey | "mobile";

function DesktopChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-150 ease-in-out ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MobileAccordionGroup({
  group,
  onNavigate,
}: {
  group: MobileNavGroup;
  onNavigate: () => void;
}) {
  return (
    <details className="fl-mgroup border-b border-line">
      <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-[15px] font-bold text-white">
        <span>{group.label}</span>
        <ChevronDownIcon size={16} />
      </summary>
      <div className="flex flex-col gap-1 border-t border-divider px-2 py-2">
        {group.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="fl-mlink flex flex-col gap-0.5 rounded-sm px-3 py-2.5 no-underline transition-colors hover:bg-surface-hover"
          >
            <span className="text-[14.5px] font-bold text-white">
              {link.title}
            </span>
            <span className="text-[13px] leading-[1.4] text-text-muted">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </details>
  );
}

const panelOrder: NavMenuKey[] = ["platform", "solutions", "resources"];

export default function LandingV2Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthenticated = mounted && Boolean(user);
  const dashboardHref =
    user?.businessRole === "RETAILER_ADMIN" ? "/devices" : "/dashboard";

  const [menuState, setMenuState] = useState<{
    menu: ActiveMenuKey;
    pathname: string;
  } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMenu: ActiveMenuKey | null =
    menuState && menuState.pathname === pathname ? menuState.menu : null;

  const closeMenu = () => setMenuState(null);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuState(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuState(null);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 961) {
        setMenuState((prev) => (prev?.menu === "mobile" ? null : prev));
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = (menu: ActiveMenuKey) => {
    setMenuState((prev) =>
      prev && prev.pathname === pathname && prev.menu === menu
        ? null
        : { menu, pathname }
    );
  };

  const getDropdownTriggerClass = (menu: NavMenuKey) => {
    const isOpen = openMenu === menu;
    const isRouteActive =
      (menu === "platform" &&
        (pathname === "/platform" || pathname.startsWith("/platform/"))) ||
      (menu === "solutions" &&
        (pathname === "/solutions" || pathname.startsWith("/solutions/"))) ||
      (menu === "resources" &&
        (pathname === "/resources" || pathname.startsWith("/resources/")));
    const isActive = isOpen || isRouteActive;
    return `fl-nav flex cursor-pointer items-center gap-[6px] rounded-full border-none px-[14px] py-[9px] text-[14px] font-semibold transition-colors ${
      isActive
        ? "bg-green-tint text-green-light"
        : "bg-transparent text-white hover:text-green-light"
    }`;
  };

  const isFamilyActive =
    pathname === "/family" || pathname.startsWith("/family/");
  const isCompanyActive = pathname === "/about" || pathname === "/company";
  const isMobileOpen = openMenu === "mobile";
  const showElevatedBg = scrolled || openMenu !== null;

  return (
    <header
      ref={headerRef}
      onBlur={(e) => {
        if (
          e.relatedTarget &&
          headerRef.current &&
          !headerRef.current.contains(e.relatedTarget as Node)
        ) {
          closeMenu();
        }
      }}
      className={`site-header sticky top-0 z-20 px-6 font-sans text-white transition-all duration-300 ${
        showElevatedBg
          ? "border-b border-line bg-navy/92 shadow-[0_4px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          : "border-b border-divider bg-navy"
      }`}
    >
      <nav
        aria-label="Main"
        className="fl-v2-enter-header mx-auto flex min-h-[76px] max-w-site flex-wrap items-center justify-between gap-[14px]"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/assets/flentra-logo.png"
            alt="Flentra home"
            width={123}
            height={26}
            priority
            className="block h-[26px] w-auto"
          />
        </Link>

        <div className="fl-links hidden flex-wrap items-center gap-1 rounded-full border border-line bg-surface p-1 text-[14px] font-medium min-[961px]:flex">
          <button
            type="button"
            data-menu="platform"
            aria-expanded={openMenu === "platform"}
            aria-controls="menu-platform"
            onClick={() => toggleMenu("platform")}
            className={getDropdownTriggerClass("platform")}
          >
            Platform
            <DesktopChevronIcon isOpen={openMenu === "platform"} />
          </button>

          <button
            type="button"
            data-menu="solutions"
            aria-expanded={openMenu === "solutions"}
            aria-controls="menu-solutions"
            onClick={() => toggleMenu("solutions")}
            className={getDropdownTriggerClass("solutions")}
          >
            Solutions
            <DesktopChevronIcon isOpen={openMenu === "solutions"} />
          </button>

          <Link
            href="/family"
            onClick={closeMenu}
            aria-current={isFamilyActive ? "page" : undefined}
            className={`fl-nav rounded-full px-[14px] py-[9px] text-[14px] font-semibold no-underline transition-colors ${
              isFamilyActive
                ? "bg-green-tint text-green-light"
                : "text-text-nav hover:text-white"
            }`}
          >
            Flentra for Family
          </Link>

          <button
            type="button"
            data-menu="resources"
            aria-expanded={openMenu === "resources"}
            aria-controls="menu-resources"
            onClick={() => toggleMenu("resources")}
            className={getDropdownTriggerClass("resources")}
          >
            Resources
            <DesktopChevronIcon isOpen={openMenu === "resources"} />
          </button>

          <Link
            href="/company"
            onClick={closeMenu}
            aria-current={isCompanyActive ? "page" : undefined}
            className={`fl-nav rounded-full px-[14px] py-[9px] text-[14px] font-semibold no-underline transition-colors ${
              isCompanyActive
                ? "bg-green-tint text-green-light"
                : "text-text-nav hover:text-white"
            }`}
          >
            Company
          </Link>
        </div>

        <div className="flex items-center gap-[10px]">
          {/* Desktop-only actions: on tablet/mobile these live inside the hamburger menu */}
          <div className="hidden items-center gap-[10px] min-[961px]:flex">
            {isAuthenticated ? (
              <LandingV2Button
                href={dashboardHref}
                onClick={closeMenu}
                variant="primary"
                size="sm"
                className="fl-cta gap-2"
              >
                Dashboard
                <ArrowRightIcon />
              </LandingV2Button>
            ) : (
              <>
                <LandingV2Button
                  href="/login"
                  onClick={closeMenu}
                  variant="ghost"
                  size="sm"
                  className="fl-signin gap-2"
                >
                  <SignInUserIcon />
                  Sign in
                </LandingV2Button>

                <LandingV2Button
                  href="/book-a-demo"
                  onClick={closeMenu}
                  variant="primary"
                  size="sm"
                  className="fl-cta gap-2"
                >
                  Book a demo
                  <ArrowRightIcon />
                </LandingV2Button>
              </>
            )}
          </div>

          <button
            type="button"
            data-menu="mobile"
            aria-expanded={isMobileOpen}
            aria-controls="menu-mobile"
            aria-label="Menu"
            onClick={() => toggleMenu("mobile")}
            className={`fl-burger inline-flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-xl border transition-colors min-[961px]:hidden ${
              isMobileOpen
                ? "border-green-border bg-green-tint text-green-light"
                : "border-line bg-surface text-white hover:bg-surface-hover"
            }`}
          >
            <HamburgerMenuIcon />
          </button>
        </div>
      </nav>

      {/* Desktop Dropdown Panels */}
      {panelOrder.map((key) => {
        const panel = navDropdownPanels[key];
        const isOpen = openMenu === key;

        return (
          <div
            key={panel.id}
            id={panel.id}
            hidden={!isOpen}
            className="fl-panel fl-v2-panel-enter absolute top-[77px] right-0 left-0 hidden border-b border-line bg-deep px-6 pt-8 pb-9 min-[961px]:block"
          >
            <div className="mx-auto flex max-w-site flex-wrap gap-8">
              {/* Left Intro Column */}
              <div className="flex min-w-0 flex-[0_1_260px] flex-col gap-3 border-r border-divider-soft pr-2">
                <p className="m-0 text-[12px] font-bold tracking-[0.08em] text-cyan uppercase">
                  {panel.eyebrow}
                </p>
                <p className="m-0 text-[22px] leading-[1.25] font-extrabold tracking-[-0.02em] text-white">
                  {panel.headline}
                </p>
                <p className="m-0 text-[14.5px] leading-[1.55] text-text-muted">
                  {panel.description}
                </p>
                {panel.overviewLink && (
                  <Link
                    href={panel.overviewLink.href}
                    onClick={closeMenu}
                    className="mt-1 text-[14.5px] font-bold text-green-light no-underline transition-colors hover:text-cyan-light"
                  >
                    {panel.overviewLink.label}
                  </Link>
                )}
              </div>

              {/* Center Links Grid */}
              <div
                className={`grid min-w-0 ${
                  panel.promo ? "flex-[1_1_520px]" : "flex-[0_1_560px]"
                } grid-cols-[repeat(auto-fit,minmax(250px,1fr))] content-start gap-[6px]`}
              >
                {panel.items.map((item) => {
                  const isGreen = item.tone === "green";
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="fl-item group flex items-start gap-[14px] rounded-md p-[14px] no-underline transition-colors hover:bg-surface-hover"
                    >
                      <span
                        className={`flex h-10 w-10 flex-none items-center justify-center rounded-icon border ${
                          isGreen
                            ? "border-green-border bg-green-tint"
                            : "border-cyan-border bg-cyan-tint"
                        }`}
                      >
                        <NavItemIcon icon={item.icon} tone={item.tone} />
                      </span>
                      <span className="flex flex-col gap-[3px]">
                        <span className="fl-title text-[15px] font-bold text-white transition-colors group-hover:text-green-light">
                          {item.title}
                        </span>
                        <span className="text-[13.5px] leading-[1.45] text-text-muted">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Right Promo Card (optional) */}
              {panel.promo ? (
                <div className="flex min-w-0 flex-[0_1_260px] flex-col gap-[10px] rounded-lg border border-line bg-navy p-[22px]">
                  <p
                    className={`m-0 self-start rounded-badge px-[10px] py-1 text-[11.5px] font-bold ${
                      panel.promo.badgeTone === "green"
                        ? "bg-green-tint text-green-light"
                        : "bg-cyan-tint text-cyan-light"
                    }`}
                  >
                    {panel.promo.badge}
                  </p>
                  <p className="m-0 text-[17px] leading-[1.3] font-bold text-white">
                    {panel.promo.title}
                  </p>
                  {panel.promo.cta.variant === "button" ? (
                    <LandingV2Button
                      href={panel.promo.cta.href}
                      onClick={closeMenu}
                      variant="primary"
                      size="sm"
                      className="mt-1 self-start px-4 py-2.5"
                    >
                      {panel.promo.cta.label}
                    </LandingV2Button>
                  ) : (
                    <a
                      href={panel.promo.cta.href}
                      className="mt-1 self-start text-[14px] font-bold text-green-light no-underline transition-colors hover:text-cyan-light"
                    >
                      {panel.promo.cta.label}
                    </a>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}

      {/* Mobile Hamburger Menu Panel */}
      <div
        id="menu-mobile"
        hidden={!isMobileOpen}
        className="fl-panel fl-v2-panel-enter -mx-6 border-t border-line bg-deep px-6 py-5 min-[961px]:hidden"
      >
        <div className="mx-auto flex max-w-[600px] flex-col gap-2">
          <MobileAccordionGroup
            group={mobileNavGroups.platform}
            onNavigate={closeMenu}
          />
          <MobileAccordionGroup
            group={mobileNavGroups.solutions}
            onNavigate={closeMenu}
          />
          <Link
            href="/family"
            onClick={closeMenu}
            aria-current={isFamilyActive ? "page" : undefined}
            className="flex items-center justify-between  border-b border-line  px-4 py-3.5 text-[15px] font-bold text-white no-underline transition-colors hover:bg-surface-hover"
          >
            Flentra for Family
          </Link>
          <MobileAccordionGroup
            group={mobileNavGroups.resources}
            onNavigate={closeMenu}
          />
          <Link
            href="/company"
            onClick={closeMenu}
            aria-current={isCompanyActive ? "page" : undefined}
            className="flex items-center justify-between  border-b border-line  px-4 py-3.5 text-[15px] font-bold text-white no-underline transition-colors hover:bg-surface-hover"
          >
            Company
          </Link>
          {isAuthenticated ? (
            <div className="mt-2">
              <LandingV2Button
                href={dashboardHref}
                onClick={closeMenu}
                variant="primary"
                size="block"
                className="gap-2"
              >
                Dashboard
                <ArrowRightIcon />
              </LandingV2Button>
            </div>
          ) : (
            <div className="mt-2 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
              <LandingV2Button
                href="/book-a-demo"
                onClick={closeMenu}
                variant="primary"
                size="block"
              >
                Book a demo
              </LandingV2Button>
              <LandingV2Button
                href="/login"
                onClick={closeMenu}
                variant="secondary"
                size="block"
              >
                Sign in
              </LandingV2Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
