import { platformFeatureCards } from "@/features/landing-v2/data";
import LandingV2Card from "@/features/landing-v2/ui/LandingV2Card";
import LandingV2SectionHeader from "@/features/landing-v2/ui/LandingV2SectionHeader";

export default function PlatformSection() {
  return (
    <section
      id="platform"
      className="bg-deep px-6 py-[72px] min-[721px]:py-[104px]"
    >
      <div className="mx-auto flex max-w-site flex-wrap items-start gap-12">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5">
          <LandingV2SectionHeader
            eyebrow="The platform"
            title="Everything you need to manage devices, in one portal."
            description="Flentra connects each device to the person, team or contract it belongs to, so you manage the business behind the device, not just the device."
            maxWidthClassName="max-w-none"
          />
          <a
            href="#demo"
            className="mt-1 self-start text-[15px] font-bold text-green-light no-underline transition-colors hover:text-cyan-light"
          >
            Book a walkthrough →
          </a>
        </div>

        <div className="grid min-w-0 flex-[2_1_560px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {platformFeatureCards.map((card) => (
            <LandingV2Card
              key={card.title}
              surface="navy"
              padding="sm"
              radius="md"
              gap="sm"
              title={card.title}
              titleClassName="text-[17px] font-bold text-white"
              description={card.description}
              descriptionClassName="text-[15px] leading-[1.55] text-text-muted"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
