import Image from "next/image";
import { companyBeliefCards } from "@/features/landing-v2/data";
import LandingV2Card from "@/features/landing-v2/ui/LandingV2Card";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function CompanySection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[{ label: "Company" }]}
        badge={{ label: "About us", tone: "cyan" }}
        title="We help businesses stay in control of the devices they depend on."
        description="Flentra is an intelligent portfolio and device management platform. It links each person, their agreement and their device in one real-time record, giving businesses full visibility and control from activation through to recovery or renewal."
      />

      {/* Flentra & Marimax Global Cards Section */}
      <section className="bg-deep px-6 py-[72px] min-[721px]:py-[88px]">
        <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[18px]">
          <LandingV2Card surface="navy" padding="lg" className="gap-3.5">
            <Image
              src="/assets/flentra-logo.png"
              alt="Flentra"
              width={105}
              height={24}
              className="h-6 w-auto self-start"
            />
            <p className="m-0 text-[16px] leading-[1.65] text-text-soft">
              Flentra serves device financiers, banks, telecoms, retailers and
              companies that issue devices to their staff, with Flentra for
              Family for households.
            </p>
            <p className="m-0 text-[15px] leading-[1.7]">
              <a
                href="mailto:info@flentra.io"
                className="font-semibold text-cyan no-underline hover:text-cyan-light"
              >
                info@flentra.io
              </a>
              <br />
              <a
                href="https://www.flentra.io"
                className="font-semibold text-cyan no-underline hover:text-cyan-light"
              >
                www.flentra.io
              </a>
            </p>
          </LandingV2Card>

          <LandingV2Card surface="navy" padding="lg" className="gap-3.5">
            <p className="m-0 text-[20px] font-extrabold text-white">
              Marimax Global Limited
            </p>
            <p className="m-0 text-[16px] leading-[1.65] text-text-soft">
              Flentra is built and run by Marimax Global Concepts Limited. We build innovative, easy-to-use cloud software that
              empowers businesses. We believe technology should serve people, so
              businesses can focus on what matters most: their people and their
              customers.
            </p>
            <p className="m-0 text-[15px]">
              <a
                href="mailto:info@marimaxglobal.com"
                className="font-semibold text-cyan no-underline hover:text-cyan-light"
              >
                info@marimaxglobal.com
              </a>
              <br />
              <a
                href="https://www.marimaxglobal.com"
                className="font-semibold text-cyan no-underline hover:text-cyan-light"
              >
                www.marimaxglobal.com
              </a>
            </p>
          </LandingV2Card>
        </div>
      </section>

      <LandingV2FeatureGridSection
        title="What we believe"
        headingSize="md"
        background="navy"
        cardSurface="surface"
        items={companyBeliefCards}
      />

      <SeeFlentraCtaBand />
    </>
  );
}
