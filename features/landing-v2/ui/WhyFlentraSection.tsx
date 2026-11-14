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

        <div className="fl-comparison-card overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="fl-comparison-table w-full min-w-[620px] border-collapse text-left">
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
                  <td className="fl-col-need">{row.need}</td>
                  <td
                    className={
                      row.standardPositive
                        ? "fl-col-standard"
                        : "fl-col-standard-dim"
                    }
                  >
                    {row.standard}
                  </td>
                  <td className="fl-col-flentra">{row.flentra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
