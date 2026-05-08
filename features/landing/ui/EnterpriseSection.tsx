import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { enterpriseChecklist } from "@/features/landing/data";

export default function EnterpriseSection() {
  return (
    <section className="container mx-auto md:px-10 px-6 py-10 md:py-24">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Built on a <span className="text-[#05E0E4]">secure enterprise infrastructure</span>
          </h2>
          <p className="text-[#FFFFFFB2] text-lg max-w-[600px]">
            Built for scale and speed, our platform analyses billions of daily events with millisecond responsiveness using advanced AI and stream processing technology.
          </p>
          <ul className="space-y-4">
            {enterpriseChecklist.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#1B3C73]" />
                </div>
                <span className="font-medium text-[#FFFFFFB2]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-1/2 relative flex justify-center lg:justify-end ">
          <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-3xl" />

          <Image 
            src="/assets/device.png" 
            alt="Mobile app interface" 
            width={400} 
            height={700} 
            className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-none lg:w-[600px] lg:h-[600px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
