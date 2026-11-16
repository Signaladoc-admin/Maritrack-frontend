import {
  heroDeviceRows,
  heroPlatforms,
  heroStats,
} from "@/features/landing-v2/data";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";
import { LockAlertIcon } from "@/features/landing-v2/ui/LandingV2Icons";

const statToneClasses = {
  white: "text-white",
  coral: "text-coral-light",
  green: "text-green-light",
} as const;

export default function HeroSection() {
  return (
    <section
      id="top"
      className="px-6 pt-14 pb-20 min-[721px]:pt-20 min-[721px]:pb-24"
    >
      <div className="mx-auto flex max-w-site flex-wrap items-center gap-14">
        {/* Left Hero Content */}
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[22px]">
          <div className="self-start fl-v2-enter-badge">
            <LandingV2Badge tone="cyan" size="lg" bordered>
              Intelligent device portfolio management for business
            </LandingV2Badge>
          </div>

          <h1 className="m-0 text-[38px] leading-[1.04] font-extrabold tracking-[-0.03em] text-white min-[721px]:text-[60px] fl-v2-enter-title">
            Every Device. Always Visible. Always in Control.
          </h1>

          <p className="m-0 max-w-[560px] text-[19px] leading-[1.6] text-text-muted fl-v2-enter-desc">
            Flentra gives businesses, financial institutions and device financiers real-time visibility, intelligent device management and control over every device they finance, deploy or manage.
          </p>

          <div className="flex flex-wrap gap-3 pt-1.5 fl-v2-enter-actions">
            <LandingV2Button href="#demo" variant="primary" size="lg">
              Book a demo
            </LandingV2Button>
            <LandingV2Button href="#solutions" variant="secondary" size="lg">
              Explore solutions
            </LandingV2Button>
          </div>

          <div className="flex flex-wrap gap-1.5 self-start rounded-24 border border-line bg-surface p-1 text-[12.5px] font-semibold text-text-muted fl-v2-enter-meta">
            {heroPlatforms.map((platform) => (
              <span
                key={platform}
                className="rounded-badge px-[13px] py-[7px]"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        {/* Right Sample Dashboard Card */}
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-3.5 rounded-lg border border-line bg-surface p-5 fl-v2-enter-aside">
          <div className="flex items-center justify-between gap-3">
            <p className="m-0 text-[16px] font-bold text-white">All devices</p>
            <LandingV2Badge tone="muted" size="xs" bordered>
              Sample screen
            </LandingV2Badge>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-line p-3.5"
              >
                <p className="m-0 mb-2.5 text-[12.5px] font-semibold text-text-dim">
                  {stat.label}
                </p>
                <p
                  className={`m-0 text-[28px] font-extrabold tracking-[-0.02em] ${
                    statToneClasses[stat.tone]
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-md border border-line text-[13.5px]">
            <div className="grid grid-cols-[1.3fr_1.3fr_1.1fr] gap-2 bg-surface-raised px-3.5 py-2.5 text-[12px] font-bold tracking-[0.05em] text-text-dim uppercase">
              <span>Assigned to</span>
              <span>Device</span>
              <span>Status</span>
            </div>
            {heroDeviceRows.map((row) => (
              <div
                key={row.assignedTo}
                className="grid grid-cols-[1.3fr_1.3fr_1.1fr] items-center gap-2 border-t border-divider px-3.5 py-3"
              >
                <span className="flex flex-col gap-0.5">
                  <b className="font-semibold text-white">{row.assignedTo}</b>
                  <span className="text-[12px] text-text-dim">
                    {row.subtitle}
                  </span>
                </span>
                <span className="text-text-muted">{row.device}</span>
                <div className="justify-self-start">
                  <LandingV2Badge
                    tone={row.tone}
                    size="xs"
                    dotColor={row.tone}
                    className="px-[11px] py-[5px]"
                  >
                    {row.status}
                  </LandingV2Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-md border border-coral-border bg-coral-tint px-4 py-3.5">
            <LockAlertIcon />
            <p className="m-0 text-[13.5px] leading-[1.45] text-white">
              Samsung S22 reported lost by Sales, Abuja.{" "}
              <span className="font-semibold text-green-light">
                Locked remotely in seconds.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
