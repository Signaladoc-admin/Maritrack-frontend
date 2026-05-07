export default function StatsSection() {
  return (
    <section className="border-y border-[#FFFFFF40]">
      <div className="container mx-auto px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center px-4">
            <div className="text-4xl font-bold text-[#05E0E4] mb-2">500M+</div>
            <div className="text-sm text-[#FFFFFF99]">Events per Day</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-bold text-[#05E0E4] mb-2">25K+</div>
            <div className="text-sm text-[#FFFFFF99]">Apps Tracked</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-bold text-[#05E0E4] mb-2">180+</div>
            <div className="text-sm text-[#FFFFFF99]">Countries</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-bold text-[#05E0E4] mb-2">99.9%</div>
            <div className="text-sm text-[#FFFFFF99]">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
