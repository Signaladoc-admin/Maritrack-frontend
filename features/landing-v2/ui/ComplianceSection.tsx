import { complianceChecklist } from "@/features/landing-v2/data";
import { CheckIcon } from "@/features/landing-v2/ui/LandingV2Icons";
import LandingV2SectionHeader from "@/features/landing-v2/ui/LandingV2SectionHeader";

export default function ComplianceSection() {
  return (
    <section
      id="compliance"
      className="px-6 py-[72px] min-[721px]:py-[88px]"
    >
      <div className="mx-auto flex max-w-site flex-wrap items-center gap-12">
        <div className="min-w-0 flex-[1_1_440px]">
          <LandingV2SectionHeader
            eyebrow="Trust and compliance"
            title="Accountable by design."
            titleClassName="text-[32px] leading-[1.1] font-extrabold tracking-[-0.025em] min-[721px]:text-[38px]"
            description="Built with the Nigeria Data Protection Act 2023 in mind and, for lenders, the FCCPC Digital Lending Regulations, so you can show auditors and regulators exactly what happened, and why."
            maxWidthClassName="max-w-none"
          />
        </div>

        <ul className="m-0 grid min-w-0 flex-[1_1_480px] list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5 p-0">
          {complianceChecklist.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-md border border-line bg-surface p-4"
            >
              <CheckIcon tone="green" size={20} />
              <span className="text-[15.5px] font-semibold text-white">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
