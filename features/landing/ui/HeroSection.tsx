import Image from "next/image";
import Link from "next/link";
import { Shield } from "lucide-react";
import { heroTrustBadges } from "@/features/landing/data";
import RegisterOrSignInButtons from "./RegisterOrSignIn";

export default function HeroSection() {
  return (
    <section className="relative w-full pt-10 pb-24">
      <div className="container mx-auto md:pl-10 pl-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 relative z-10">
        {/* Left: Text Content */}
        <div className="flex flex-col items-start text-left space-y-6 lg:w-1/2 flex-shrink-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#E5E7EB] bg-[#53565f] backdrop-blur-sm px-4 py-2 rounded-full text-sm  text-white/80">
            <Shield className="w-4 h-4 text-white" />
            <span>Trusted by 10,000+ families</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-normal leading-tight text-white max-w-lg">
            Know what&apos;s happening{" "}
            <span className="text-[#4A9EFF]">on every device</span>{" "}
            Always.
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
            Real-time visibility and control for parents and businesses. Simple, secure, and always on.
          </p>

          {/* CTA Buttons */}
          <RegisterOrSignInButtons />


          {/* Trust badges */}
          <div className="flex items-center gap-20 text-xs text-[#7496C7]">
            {heroTrustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Image src={badge.icon} alt="Check" width={12} height={12} />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer for Right side */}
        <div className="hidden lg:block lg:w-1/2 flex-shrink-0 min-h-[500px]" />
      </div>

      {/* Right: Dashboard Mockup */}
      <div className="mt-12 lg:mt-0 relative px-6 lg:px-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 flex justify-end z-0">
        <div className="relative ">
          <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-3xl" />
          <Image
            src="/assets/heroFrame.png"
            alt="Dashboard mockup"
            width={2100}
            height={700}
            className="relative w-full max-w-[400px] md:max-w-[550px] lg:max-w-[700px] rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </div>


    </section>
  );
}
