import { Check } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { H3, H4, P } from "@/shared/ui/typography";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  planName: string;
  price: string;
  description: string;
  features: PricingFeature[];
  ctaText?: string;
  popular?: boolean;
  onCtaClick?: () => void;
}

export function PricingCard({
  planName,
  price,
  description,
  features,
  ctaText = "Get Started",
  popular = false,
  onCtaClick,
}: PricingCardProps) {
  return (
    <CardWrapper
      variant={popular ? "primary" : "default"}
      className={popular ? "border-primary relative shadow-lg" : ""}
      header={
        <div className="space-y-2">
          {popular && (
            <span className="bg-primary text-primary-foreground absolute -top-3 right-4 rounded-full px-3 py-1 text-xs">
              Popular
            </span>
          )}
          <H3>{planName}</H3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <P className="text-muted-foreground text-sm">{description}</P>
        </div>
      }
      footer={
        <Button className="w-full" variant={popular ? "secondary" : "default"} onClick={onCtaClick}>
          {ctaText}
        </Button>
      }
    >
      <ul className="space-y-4 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="text-primary h-4 w-4" />
            <span className={feature.included ? "" : "text-muted-foreground line-through"}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
}
