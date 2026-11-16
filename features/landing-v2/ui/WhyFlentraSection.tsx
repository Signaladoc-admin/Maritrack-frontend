import { Check } from "lucide-react";

import { whyFlentraComparisonRows } from "@/features/landing-v2/data";
import LandingV2SectionHeader from "@/features/landing-v2/ui/LandingV2SectionHeader";

export default function WhyFlentraSection() {
  return (
    <section id="why" className="px-6 py-[72px] min-[721px]:py-[104px]">
      <div className="mx-auto flex max-w-site flex-col gap-9">
        <LandingV2SectionHeader
          eyebrow="Why Flentra"
          title="More than device management."
        />

        <div className="fl-comparison-container">
          <div
            tabIndex={0}
            role="region"
            aria-labelledby="why-flentra-table-caption"
            className="fl-comparison-card rounded-2xl border border-line bg-surface"
          >
            <table className="fl-comparison-table w-full border-collapse text-left">
              <caption id="why-flentra-table-caption" className="sr-only">
                Comparison between standard device management and Flentra
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[46%]">
                    What you need
                  </th>
                  <th scope="col" className="w-[28%]">
                    Standard device management
                  </th>
                  <th scope="col" className="fl-col-flentra w-[26%]">
                    Flentra
                  </th>
                </tr>
              </thead>
              <tbody>
                {whyFlentraComparisonRows.map((row) => (
                  <tr key={row.need}>
                    <th scope="row" className="fl-col-need">
                      {row.need}
                    </th>
                    <td
                      className={
                        row.standardPositive
                          ? "fl-col-standard"
                          : "fl-col-standard-dim"
                      }
                    >
                      {row.standard}
                    </td>
                    <td className="fl-col-flentra">
                      <span className="fl-flentra-mobile">
                        <Check
                          aria-hidden="true"
                          className="h-3.5 w-3.5 shrink-0"
                          strokeWidth={2.5}
                        />
                        <span>Flentra</span>
                      </span>{" "}
                      <span className="fl-flentra-desktop">{row.flentra}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
