import { gettingStartedSteps } from "@/features/landing-v2/data";
import LandingV2Card from "@/features/landing-v2/ui/LandingV2Card";
import LandingV2SectionHeader from "@/features/landing-v2/ui/LandingV2SectionHeader";

export default function GettingStartedSection() {
  return (
    <section
      id="how"
      className="px-6 py-[72px] min-[721px]:py-[104px]"
    >
      <div className="mx-auto flex max-w-site flex-col gap-11">
        <LandingV2SectionHeader
          eyebrow="How it works"
          title="Quiet when all is well. Fast when something changes."
        />

        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[18px] p-0">
          {gettingStartedSteps.map((step) => (
            <LandingV2Card
              key={step.step}
              as="li"
              surface={step.highlighted ? "green-tint" : "surface"}
              padding="md"
              badge={{
                label: step.step,
                tone: step.badgeTone,
                size: "sm",
                weight: "extrabold",
              }}
              title={step.title}
              description={step.description}
              descriptionClassName={
                step.highlighted
                  ? "text-[16px] leading-[1.6] text-text-soft"
                  : "text-[16px] leading-[1.6] text-text-muted"
              }
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
