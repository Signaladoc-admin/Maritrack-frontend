import { bookADemoChecklist } from "@/features/landing-v2/data";
import DemoRequestForm from "@/features/landing-v2/ui/DemoRequestForm";
import LandingV2Breadcrumb from "@/features/landing-v2/ui/LandingV2Breadcrumb";
import { CheckIcon } from "@/features/landing-v2/ui/LandingV2Icons";

export default function BookADemoSection() {
  return (
    <section className="px-6 pt-14 pb-20 min-[721px]:pt-20 min-[721px]:pb-[104px]">
      <div className="mx-auto flex max-w-site flex-wrap items-start gap-14">
        <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-[18px]">
          <div className="fl-v2-enter-badge">
            <LandingV2Breadcrumb items={[{ label: "Book a demo" }]} />
          </div>

          <h1 className="m-0 text-[36px] leading-[1.06] font-extrabold tracking-[-0.03em] text-white min-[721px]:text-[50px] fl-v2-enter-title">
            See Flentra on your own devices.
          </h1>

          <p className="m-0 text-[18px] leading-[1.6] text-text-muted fl-v2-enter-desc">
            Tell us a little about your business and we’ll set up a demo around
            how you finance, issue or manage devices.
          </p>

          <ul className="m-0 mt-2 flex list-none flex-col gap-3 p-0 text-[16px] fl-v2-enter-actions">
            {bookADemoChecklist.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckIcon tone="green" size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="m-0 mt-2 text-[16px] text-text-muted fl-v2-enter-meta">
            Prefer email?{" "}
            <a
              href="mailto:info@flentra.io"
              className="font-semibold text-cyan no-underline hover:underline"
            >
              info@flentra.io
            </a>
          </p>
        </div>

        <div className="min-w-0 flex-[1_1_480px] fl-v2-enter-aside [&>*]:w-full">
          <DemoRequestForm variant="page" />
        </div>
      </div>
    </section>
  );
}
