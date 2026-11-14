import { challengeCards } from "@/features/landing-v2/data";
import LandingV2Card from "@/features/landing-v2/ui/LandingV2Card";
import { ChallengeIcon } from "@/features/landing-v2/ui/LandingV2Icons";
import LandingV2SectionHeader from "@/features/landing-v2/ui/LandingV2SectionHeader";

export default function ChallengeSection() {
  return (
    <section className="px-6 py-[72px] min-[721px]:py-[104px]">
      <div className="mx-auto flex max-w-site flex-col gap-11">
        <LandingV2SectionHeader
          eyebrow="The challenge"
          title="Devices leave your building every day. Your control shouldn’t leave with them."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
          {challengeCards.map((card) => (
            <LandingV2Card
              key={card.title}
              surface="surface"
              padding="md"
              customIcon={
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-icon border border-coral-border bg-coral-tint">
                  <ChallengeIcon icon={card.icon} />
                </span>
              }
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
