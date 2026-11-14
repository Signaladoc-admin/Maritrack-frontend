import LandingV2Card from "@/features/landing-v2/ui/LandingV2Card";

export interface RelatedLinkItem {
  title: string;
  href: string;
  description?: string;
}

export interface LandingV2RelatedSectionProps {
  title?: string;
  items: RelatedLinkItem[];
}

export default function LandingV2RelatedSection({
  title = "Related",
  items,
}: LandingV2RelatedSectionProps) {
  const hasDescriptions = items.some((item) => Boolean(item.description));

  return (
    <section className="px-6 py-[72px] min-[721px]:py-[88px]">
      <div
        className={`mx-auto flex max-w-site flex-col ${
          hasDescriptions ? "gap-7" : "gap-6"
        }`}
      >
        <h2
          className={`m-0 font-extrabold text-white ${
            hasDescriptions
              ? "text-[28px] leading-[1.1] tracking-[-0.025em] min-[721px]:text-[34px]"
              : "text-[26px] tracking-[-0.02em] min-[721px]:text-[30px]"
          }`}
        >
          {title}
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {items.map((item) => (
            <LandingV2Card
              key={`${item.title}-${item.href}`}
              href={item.href}
              surface="surface"
              padding={hasDescriptions ? "24" : "sm"}
              radius={hasDescriptions ? "lg" : "md"}
              gap={hasDescriptions ? "sm" : "xs"}
              title={item.title}
              titleAs="span"
              titleClassName={
                hasDescriptions
                  ? "text-[19px] font-bold text-white"
                  : "text-[17px] font-bold text-white"
              }
              description={item.description}
              descriptionClassName="text-[15px] leading-[1.55] text-text-muted"
              linkLabel="Learn more →"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
