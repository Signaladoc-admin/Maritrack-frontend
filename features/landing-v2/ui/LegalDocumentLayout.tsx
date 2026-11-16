import type { ReactNode } from "react";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2Breadcrumb from "@/features/landing-v2/ui/LandingV2Breadcrumb";

interface LegalDocumentLayoutProps {
  breadcrumbLabel: string;
  badgeLabel: string;
  title: string;
  effectiveDate: string;
  appliesTo: string;
  note: string;
  children: ReactNode;
}

export default function LegalDocumentLayout({
  breadcrumbLabel,
  badgeLabel,
  title,
  effectiveDate,
  appliesTo,
  note,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <>
      {/* Header Section */}
      <section className="px-6 pt-14 pb-10 min-[721px]:pt-[72px] min-[721px]:pb-12">
        <div className="mx-auto flex max-w-[880px] flex-col gap-5">
          <div className="fl-v2-enter-badge">
            <LandingV2Breadcrumb
              items={[{ label: "Legal" }, { label: breadcrumbLabel }]}
            />
          </div>

          <div className="self-start fl-v2-enter-badge">
            <LandingV2Badge
              tone="cyan"
              bordered
              className="px-3.5 py-[7px] text-[12.5px]"
            >
              {badgeLabel}
            </LandingV2Badge>
          </div>

          <h1 className="m-0 text-[38px] leading-[1.06] font-extrabold tracking-[-0.03em] text-white min-[721px]:text-[52px] fl-v2-enter-title">
            {title}
          </h1>

          <div className="mt-2 flex flex-col gap-2 rounded-lg border border-line bg-surface p-6 text-[14.5px] leading-[1.6] text-text-muted fl-v2-enter-desc">
            <p className="m-0">
              <strong className="font-semibold text-white">
                Effective date:
              </strong>{" "}
              {effectiveDate}
            </p>
            <p className="m-0">
              <strong className="font-semibold text-white">Applies to:</strong>{" "}
              {appliesTo}
            </p>
            <p className="m-0 pt-1 italic text-text-dim">{note}</p>
          </div>
        </div>
      </section>

      {/* Main Legal Clauses */}
      <section className="px-6 pb-20 min-[721px]:pb-24">
        <div className="mx-auto max-w-[880px]">
          <div className="fl-v2-legal-prose fl-v2-enter-desc border-t border-line pt-10">
            {children}
          </div>        
        </div>
      </section>
    </>
  );
}
