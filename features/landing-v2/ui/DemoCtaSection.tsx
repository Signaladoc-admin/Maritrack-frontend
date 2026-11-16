import DemoRequestForm from "@/features/landing-v2/ui/DemoRequestForm";

export default function DemoCtaSection() {
  return (
    <section
      id="demo"
      className="px-6 py-[72px] min-[721px]:py-[104px]"
    >
      <div className="mx-auto flex max-w-site flex-wrap items-start gap-14">
        <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-4">
          <p className="m-0 text-[12.5px] font-bold tracking-[0.08em] text-cyan uppercase">
            Book a demo
          </p>
          <h2 className="m-0 text-[34px] leading-[1.08] font-extrabold tracking-[-0.03em] text-white min-[721px]:text-[46px]">
            See every device you own, in one place.
          </h2>
          <p className="m-0 text-[17px] leading-[1.65] text-text-muted">
            Tell us about your devices and we’ll show you how Flentra fits your
            business.
          </p>

          <p className="m-0 text-[16px] text-text-muted">
            Or email{" "}
            <a
              href="mailto:info@flentra.io"
              className="font-semibold text-cyan no-underline transition-colors hover:text-cyan-light"
            >
              info@flentra.io
            </a>
          </p>
        </div>

        <DemoRequestForm variant="home" />
      </div>
    </section>
  );
}
