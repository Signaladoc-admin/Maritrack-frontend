import { solutionCards } from "@/features/landing-v2/data";
import LandingV2Card from "@/features/landing-v2/ui/LandingV2Card";
import LandingV2SectionHeader from "@/features/landing-v2/ui/LandingV2SectionHeader";

export default function SolutionsSection() {
  return (
    <section
      id="who"
      className="bg-deep px-6 py-[72px] min-[721px]:py-[104px]"
    >
      <div className="mx-auto flex max-w-site flex-col gap-11">
        <LandingV2SectionHeader
          eyebrow="Who it’s for"
          title="Built for businesses that buy, issue or finance devices."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[18px]">
          {solutionCards.map((card) => (
            <LandingV2Card
              key={card.title}
              surface="navy"
              padding="md"
              gap="2.5"
              title={card.title}
              titleClassName="text-[20px] font-bold text-white"
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
