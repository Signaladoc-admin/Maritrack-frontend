import { landingStats } from "@/features/landing/data";

export default function StatsSection() {
  return (
    <section className="border-y border-[#FFFFFF40]">
      <div className="container mx-auto md:px-10 px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {landingStats.map((stat, idx) => (
            <div key={idx} className="text-center px-4">
              <div className="text-4xl font-bold text-[#05E0E4] mb-2">{stat.value}</div>
              <div className="text-sm text-[#FFFFFF99]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
