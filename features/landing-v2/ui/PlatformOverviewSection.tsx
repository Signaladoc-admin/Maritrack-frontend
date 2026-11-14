import {
  platformOverviewWhatItDoes,
  platformPortfolioCards,
  platformWorksWith,
} from "@/features/landing-v2/data";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2Card from "@/features/landing-v2/ui/LandingV2Card";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2SectionHeader from "@/features/landing-v2/ui/LandingV2SectionHeader";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function PlatformOverviewSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[{ label: "Platform" }]}
        badge={{ label: "Platform overview", tone: "cyan" }}
        title="One platform for your device portfolio and every device in it."
        description="Flentra connects your customers or staff, their agreements and their devices in one live portal, so you can track, manage and protect your fleet from day one to final return or payment."
        ctas={[
          { label: "Book a demo", href: "/book-a-demo", variant: "primary" },
          {
            label: "See integrations",
            href: "/platform/integrations",
            variant: "secondary",
          },
        ]}
      />

      <LandingV2FeatureGridSection
        title="What the platform does"
        background="deep"
        cardSurface="navy"
        cardPadding="md"
        items={platformOverviewWhatItDoes.map((item) => ({
          ...item,
          linkLabel: "Learn more →",
        }))}
      />

      {/* Portfolio management Section */}
      <section className="px-6 py-[72px] min-[721px]:py-[88px]">
        <div className="mx-auto flex max-w-site flex-wrap items-start gap-12">
          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-3.5">
            <LandingV2SectionHeader
              eyebrow="Portfolio management"
              title="Built around your business, not just the device."
              description="Every device in Flentra is linked to the person, team or repayment plan it belongs to. That is what turns a list of devices into a portfolio you can manage."
              titleClassName="text-[30px] leading-[1.1] font-extrabold tracking-[-0.025em] min-[721px]:text-[36px]"
              descriptionClassName="text-[17px] leading-[1.6] text-text-muted"
            />
          </div>

          <div className="grid min-w-0 flex-[1_1_480px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
            {platformPortfolioCards.map((card) => (
              <LandingV2Card
                key={card.title}
                surface="surface"
                padding="sm"
                radius="md"
                gap="xs"
                title={card.title}
                titleClassName="text-[18px] font-bold text-white"
                description={card.description}
                descriptionClassName="text-[15px] leading-[1.55] text-text-muted"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Works with Banner */}
      <section className="px-6 pb-6">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-surface px-[26px] py-[22px]">
          <p className="m-0 text-[16px] font-bold text-white">Works with</p>
          <div className="flex flex-wrap gap-2.5 text-[14px] font-semibold">
            {platformWorksWith.map((platform) => (
              <LandingV2Badge
                key={platform}
                tone="neutral"
                bordered
                className="px-3.5 py-2 text-[14px] font-semibold text-white"
              >
                {platform}
              </LandingV2Badge>
            ))}
          </div>
        </div>
      </section>

      <SeeFlentraCtaBand />
    </>
  );
}
