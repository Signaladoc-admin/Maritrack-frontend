import {
  integrationsConnectCards,
  integrationsHowWeConnect,
} from "@/features/landing-v2/data";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2SectionHeader from "@/features/landing-v2/ui/LandingV2SectionHeader";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function IntegrationsSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[
          { label: "Platform", href: "/platform" },
          { label: "Integrations" },
        ]}
        badge={{ label: "Integrations", tone: "cyan" }}
        title="Connect Flentra to the systems you already run."
        description="Share data between Flentra and your loan, payment, HR and finance systems, so devices react to what happens in your business without anyone re-typing it."
        ctas={[
          {
            label: "Talk about your integration",
            href: "/book-a-demo",
            variant: "primary",
          },
        ]}
      />

      <LandingV2FeatureGridSection
        title="What you can connect"
        background="deep"
        cardSurface="navy"
        items={integrationsConnectCards}
      />

      {/* How we connect Section */}
      <section className="px-6 py-[72px] min-[721px]:py-[88px]">
        <div className="mx-auto flex max-w-site flex-wrap items-start gap-12">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3.5">
            <LandingV2SectionHeader
              eyebrow="How we connect"
              title="Standard APIs, with help when you need it."
              titleClassName="text-[30px] leading-[1.1] font-extrabold tracking-[-0.025em] min-[721px]:text-[36px]"
            />
          </div>

          <ul className="m-0 flex min-w-0 flex-[1_1_460px] list-none flex-col gap-3 p-0 text-[16px]">
            {integrationsHowWeConnect.map((item) => (
              <li
                key={item.title}
                className="rounded-md flex border border-line bg-surface px-5 py-[18px]"
              >
                <b className="font-bold text-white min-w-[120px]">{item.title}</b>
                
                <span className="text-text-muted">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SeeFlentraCtaBand />
    </>
  );
}
