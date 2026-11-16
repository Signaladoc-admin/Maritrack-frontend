import { trustBadges } from "@/features/landing-v2/data";
import { ShieldTrustIcon } from "@/features/landing-v2/ui/LandingV2Icons";

export default function PartnersSection() {
  return (
    <section
      aria-label="Trust"
      className="border-y border-divider px-6 py-7"
    >
      <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-[18px]">
        <p className="m-0 text-[14.5px] text-text-muted">
          Built and run by <b className="text-white">Marimax Global Concepts Limited</b>
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
    </section>
  );
}
