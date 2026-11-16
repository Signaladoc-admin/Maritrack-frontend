import { faqItems } from "@/features/landing-v2/data";
import LandingV2Breadcrumb from "@/features/landing-v2/ui/LandingV2Breadcrumb";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function ResourcesFaqsSection() {
  return (
    <>
      <section className="px-6 pt-14 pb-20 min-[721px]:pt-[72px] min-[721px]:pb-[88px]">
        <div className="mx-auto flex max-w-[880px] flex-col gap-[18px]">
          <div className="fl-v2-enter-badge">
            <LandingV2Breadcrumb
              items={[{ label: "Resources" }, { label: "FAQs" }]}
            />
          </div>

          <h1 className="m-0 text-[38px] leading-[1.06] font-extrabold tracking-[-0.03em] text-white min-[721px]:text-[52px] fl-v2-enter-title">
            Frequently asked questions
          </h1>

          <p className="m-0 mb-[18px] text-[19px] leading-[1.6] text-text-muted fl-v2-enter-desc">
            Can’t find your answer? Email{" "}
            <a
              href="mailto:info@flentra.io"
              className="font-semibold text-cyan no-underline hover:text-cyan-light"
            >
              info@flentra.io
            </a>
            .
          </p>

          <div className="flex flex-col gap-2.5">
            {faqItems.map((item, idx) => (
              <details
                key={item.question}
                open={item.defaultOpen}
                style={{
                  animation:
                    "fl-v2-slide-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
                  animationDelay: `${0.25 + idx * 0.04}s`,
                }}
                className="faq overflow-hidden rounded-md border border-line bg-surface"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-[22px] py-5 text-[17px] font-bold text-white">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="faq-sign text-[22px] font-medium text-cyan"
                  >
                    +
                  </span>
                </summary>
                <p className="m-0 px-[22px] pt-0 pb-[22px] text-[16px] leading-[1.65] text-white/[0.78]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SeeFlentraCtaBand />
    </>
  );
}
