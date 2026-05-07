import { BarChart2, Zap, Globe2, LineChart, Shield, Smartphone } from "lucide-react";

const features = [
  { icon: BarChart2, title: "Real-Time Analytics", desc: "Track every user interaction as it happens with sub-second latency and instant dashboards." },
  { icon: Zap, title: "Lightning Fast", desc: "Process millions of events per second with our high performance infrastructure." },
  { icon: Globe2, title: "Global Coverage", desc: "Monitor users across 180+ countries with distributed data centers worldwide." },
  { icon: LineChart, title: "Predictive Insights", desc: "AI-powered analytics predict user behavior and highlight optimization opportunities." },
  { icon: Shield, title: "Privacy Compliant", desc: "SOC2 and GDPR compliant by default. Your users' data is protected and anonymized." },
  { icon: Smartphone, title: "Multi-Platform", desc: "Track iOS, Android, web, and desktop apps with unified SDKs and seamless integration." },
];

export default function FeaturesGrid() {
  return (
    <section className="container mx-auto px-10 py-24 ">
      <div className="text-center mx-auto mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Everything you need to <span className="text-[#04DB62]">Track your devices</span>
        </h2>
        <p className="text-gray-400 text-[20px] max-w-3xl mx-auto">
          Powerful analytics features that reveal exactly how users interact with your product.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="bg-[#161A25] border border-white/10 p-8 rounded-2xl hover:border-[#05E0E4] transition-colors group">
            <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6 text-[#05E0E4]" />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
