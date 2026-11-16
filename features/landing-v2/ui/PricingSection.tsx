import { pricingPilotChecklist } from "@/features/landing-v2/data";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";
import LandingV2Card from "@/features/landing-v2/ui/LandingV2Card";
import { CheckIcon } from "@/features/landing-v2/ui/LandingV2Icons";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-deep px-6 py-[72px] min-[721px]:py-[104px]"
    >
      <div className="mx-auto flex max-w-site flex-wrap items-stretch gap-[18px]">
        <LandingV2Card
          surface="navy"
          padding="xl"
          gap="lg"
          className="min-w-0 flex-[1_1_500px]"
        >
          <p className="m-0 text-[12.5px] font-bold tracking-[0.08em] text-cyan uppercase">
            Pricing
          </p>
          <h2 className="m-0 text-[30px] leading-[1.1] font-extrabold tracking-[-0.025em] text-white min-[721px]:text-[38px]">
            Simple per-device pricing, monthly or yearly.
          </h2>
          <p className="m-0 text-[17px] leading-[1.65] text-text-muted">
            Pay per device, per month or per year, whichever suits your
            business. Prices are set by device type, with volume discounts as
            your fleet grows. Standard support is included, and prices exclude
            VAT.
          </p>
          <LandingV2Button
            href="#demo"
            variant="primary"
            size="md"
            className="mt-1 self-start"
          >
            Request our rate card
          </LandingV2Button>
        </LandingV2Card>

        <LandingV2Card
          surface="green-tint"
          padding="xl"
          gap="md"
          title="Try it first"
          titleClassName="text-[26px] font-extrabold text-white"
          description="Start a 30-day pilot on your own devices."
          descriptionClassName="text-[17px] leading-[1.6] text-text-soft"
          className="min-w-0 flex-[1_1_380px]"
        >
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15.5px] text-text-soft">
            {pricingPilotChecklist.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckIcon tone="green-light" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <LandingV2Button
            href="#demo"
            variant="secondary"
            size="md"
            className="mt-1 self-start"
          >
            Start a pilot
          </LandingV2Button>
        </LandingV2Card>
      </div>
    </section>
  );
}
