import type { ReactNode } from "react";
import type { BadgeSize, BadgeTone } from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2Card, {
  type CardPadding,
  type CardSurface,
} from "@/features/landing-v2/ui/LandingV2Card";

export interface FeatureGridCardItem {
  title?: string;
  description: string;
  href?: string;
  linkLabel?: string;
  surface?: CardSurface;
  padding?: CardPadding;
  descriptionTone?: "muted" | "soft";
  badge?: {
    label: string;
    tone?: BadgeTone;
    size?: BadgeSize;
    bordered?: boolean;
    weight?: "bold" | "extrabold";
  };
}

export interface LandingV2FeatureGridSectionProps {
  title: string;
  headingSize?: "lg" | "md";
  background?: "deep" | "navy";
  cardSurface?: CardSurface;
  cardPadding?: CardPadding;
  asList?: boolean;
  minColWidth?: "220" | "240" | "260";
  items: FeatureGridCardItem[];
  children?: ReactNode;
}

const gridColClasses: Record<"220" | "240" | "260", string> = {
  "220": "grid-cols-[repeat(auto-fit,minmax(220px,1fr))]",
  "240": "grid-cols-[repeat(auto-fit,minmax(240px,1fr))]",
  "260": "grid-cols-[repeat(auto-fit,minmax(260px,1fr))]",
};

export default function LandingV2FeatureGridSection({
  title,
  headingSize = "lg",
  background = "deep",
  cardSurface,
  cardPadding = "24",
  asList = false,
  minColWidth = "260",
  items,
  children,
}: LandingV2FeatureGridSectionProps) {
  const defaultSurface: CardSurface =
    cardSurface ?? (background === "deep" ? "navy" : "surface");

  const gridClassName = `m-0 grid list-none ${gridColClasses[minColWidth]} gap-4 p-0`;

  const renderCards = () =>
    items.map((item, idx) => {
      const resolvedSurface = item.surface ?? defaultSurface;
      const resolvedPadding = item.padding ?? cardPadding;
      const isSoftText =
        item.descriptionTone === "soft" || resolvedSurface === "green-tint";

      return (
        <LandingV2Card
          key={item.title ?? item.badge?.label ?? idx}
          as={asList ? "li" : "div"}
          href={item.href}
          surface={resolvedSurface}
          padding={resolvedPadding}
          gap={item.badge ? "2.5" : "sm"}
          badge={item.badge}
          title={item.title}
          titleClassName="text-[19px] font-bold text-white"
          description={item.description}
          descriptionClassName={`text-[15.5px] leading-[1.6] ${
            isSoftText ? "text-text-soft" : "text-text-muted"
          }`}
          linkLabel={item.linkLabel}
        />
      );
    });

  return (
    <section
      className={`${
        background === "deep" ? "bg-deep" : "bg-navy"
      } px-6 py-[72px] min-[721px]:py-[88px]`}
    >
      <div
        className={`mx-auto flex max-w-site flex-col ${
          headingSize === "md" ? "gap-7" : "gap-9"
        }`}
      >
        <h2
          className={`m-0 leading-[1.1] font-extrabold tracking-[-0.025em] text-white ${
            headingSize === "md"
              ? "text-[28px] min-[721px]:text-[34px]"
              : "text-[30px] min-[721px]:text-[38px]"
          }`}
        >
          {title}
        </h2>

        {asList ? (
          <ol className={gridClassName}>{renderCards()}</ol>
        ) : (
          <div className={gridClassName}>{renderCards()}</div>
        )}

        {children}
      </div>
    </section>
  );
}
