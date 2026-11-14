import { twoWaysCards } from "@/features/landing-v2/data";
import LandingV2Card from "@/features/landing-v2/ui/LandingV2Card";
import LandingV2SectionHeader from "@/features/landing-v2/ui/LandingV2SectionHeader";

export default function TwoWaysSection() {
  return (
    <section
      id="solutions"
      className="bg-deep px-6 py-[72px] min-[721px]:py-[104px]"
    >
      <div className="mx-auto flex max-w-site flex-col gap-11">
        <LandingV2SectionHeader
          eyebrow="Solutions"
          title="One platform, two ways to use it."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[18px]">
          {twoWaysCards.map((card) => (
            <LandingV2Card
              key={card.badge}
              surface="navy"
              padding="lg"
              gap="lg"
              badge={{
                label: card.badge,
                tone: card.badgeTone,
                size: "md",
                bordered: true,
              }}
              title={card.title}
              titleClassName="text-[28px] font-extrabold tracking-[-0.02em] text-white"
              description={card.description}
              checklist={{
                items: card.checklist,
                tone: card.badgeTone,
              }}
              cta={card.cta}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
