import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";

interface SeeFlentraCtaBandProps {
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export default function SeeFlentraCtaBand({
  title = "See Flentra on your own devices.",
  description = "Book a demo, or start a 30-day pilot. Pay per device, monthly or yearly.",
  primaryCtaLabel = "Book a demo",
  primaryCtaHref = "/book-a-demo",
  secondaryCtaLabel = "Talk to our team",
  secondaryCtaHref = "mailto:info@flentra.io",
}: SeeFlentraCtaBandProps) {
  return (
    <section className="bg-navy px-6 py-[72px] font-sans text-white min-[721px]:py-[88px]">
      <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-7 rounded-lg border border-line bg-deep p-8 min-[721px]:p-12">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-3">
          <h2 className="m-0 text-[30px] leading-[1.12] font-extrabold tracking-[-0.025em] text-white min-[721px]:text-[36px]">
            {title}
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-text-muted">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <LandingV2Button href={primaryCtaHref} variant="primary" size="lg">
            {primaryCtaLabel}
          </LandingV2Button>
          <LandingV2Button
            href={secondaryCtaHref}
            variant="secondary"
            size="lg"
          >
            {secondaryCtaLabel}
          </LandingV2Button>
        </div>
      </div>
    </section>
  );
}
