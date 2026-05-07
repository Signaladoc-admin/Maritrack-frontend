import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const checklistItems = [
  "Real-time event streaming pipeline",
  "Automated anomaly detection with ML",
  "Distributed data processing at scale",
  "End-to-end encryption for all data",
];

export default function EnterpriseSection() {
  return (
    <section className="container mx-auto px-10 py-24">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Built on <span className="text-[#05E0E4]">enterprise infrastructure</span>
          </h2>
          <p className="text-[#FFFFFFB2] text-lg max-w-[600px]">
            Our platform processes billions of events daily with millisecond precision, powered by advanced stream processing and machine learning.
          </p>
          <ul className="space-y-4">
            {checklistItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#1B3C73]" />
                </div>
                <span className="font-medium text-[#FFFFFFB2]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-1/2 relative flex justify-end ">
          <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-3xl" />

          <Image 
            src="/assets/Container1.svg" 
            alt="Mobile app interface" 
            width={400} 
            height={700} 
            className=""
          />
        </div>
      </div>
    </section>
  );
}
