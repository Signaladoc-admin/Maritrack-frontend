import type { ReactNode } from "react";
import LandingV2Badge, {
  type BadgeTone,
} from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2Breadcrumb, {
  type BreadcrumbSegment,
} from "@/features/landing-v2/ui/LandingV2Breadcrumb";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";

export interface SubpageHeroCta {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface LandingV2SubpageHeroProps {
  breadcrumbs: BreadcrumbSegment[];
  badge: {
    label: string;
    tone?: BadgeTone;
  };
  title: string;
  description: string;
  ctas?: SubpageHeroCta[];
  actionSlot?: ReactNode;
  aside?: ReactNode;
}

export default function LandingV2SubpageHero({
  breadcrumbs,
  badge,
  title,
  description,
  ctas,
  actionSlot,
  aside,
}: LandingV2SubpageHeroProps) {
  const hasAside = Boolean(aside);

  return (
    <section className="px-6 pt-14 pb-20 min-[721px]:pt-[72px] min-[721px]:pb-[88px]">
      <div
        className={
          hasAside
            ? "mx-auto flex max-w-site flex-wrap items-center gap-12"
            : "mx-auto flex max-w-site flex-col gap-5"
        }
      >
        <div
          className={
            hasAside
              ? "flex min-w-0 flex-[1_1_480px] flex-col gap-5"
              : "flex flex-col gap-5"
          }
        >
          <div className="fl-v2-enter-badge">
            <LandingV2Breadcrumb items={breadcrumbs} />
          </div>

          <div className="self-start fl-v2-enter-badge">
            <LandingV2Badge
              tone={badge.tone ?? "cyan"}
              bordered
              className="px-3.5 py-[7px] text-[12.5px]"
            >
              {badge.label}
            </LandingV2Badge>
          </div>

          <h1
            className={`m-0 text-[38px] leading-[1.06] font-extrabold tracking-[-0.03em] text-white min-[721px]:text-[54px] fl-v2-enter-title ${
              hasAside ? "" : "max-w-[900px]"
            }`}
          >
            {title}
          </h1>

          <p
            className={`m-0 text-[19px] leading-[1.6] text-text-muted fl-v2-enter-desc ${
              hasAside ? "" : "max-w-[760px]"
            }`}
          >
            {description}
          </p>

          {ctas && ctas.length > 0 ? (
            <div className="flex flex-wrap gap-3 pt-1.5 fl-v2-enter-actions">
              {ctas.map((cta) => (
                <LandingV2Button
                  key={`${cta.label}-${cta.href}`}
                  href={cta.href}
                  variant={cta.variant ?? "primary"}
                  size="lg"
                >
                  {cta.label}
                </LandingV2Button>
              ))}
            </div>
          ) : null}

          {actionSlot ? (
            <div className="fl-v2-enter-actions">{actionSlot}</div>
          ) : null}
        </div>

        {aside ? (
          <div className="min-w-0 flex-[1_1_420px] fl-v2-enter-aside">
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
