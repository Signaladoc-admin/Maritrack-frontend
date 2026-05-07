import Image from "next/image";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full pt-10 pb-24">
      <div className="container mx-auto pl-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 relative z-10">
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
            <span className="text-[#4A9EFF]">on every device.</span>{" "}
            Always.
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
            Real-time visibility and control for parents and businesses. Simple, secure, and always on.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row items-center gap-4">
              <Link
              href="/login"
              className="px-6 py-3 bg-[#1a3a6b] hover:bg-[#1e4580] border border-white/10 transition-colors text-white font-semibold rounded-lg text-sm w-36 flex items-center justify-center"
            >
              Start for free
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-white hover:bg-gray-100 transition-colors text-black font-semibold rounded-lg text-sm w-32 flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-20 text-xs text-[#7496C7]">
            <div className="flex items-center gap-2">
              <Image src="/assets/Vector.svg" alt="Check" width={12} height={12} />
              <span>Easy setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/assets/Vector.svg" alt="Check" width={12} height={12} />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Spacer for Right side */}
        <div className="hidden lg:block lg:w-1/2 flex-shrink-0 min-h-[500px]" />
      </div>

      {/* Right: Dashboard Mockup */}
      <div className="mt-12 lg:mt-0 relative px-6 lg:px-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 flex justify-end z-0">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-3xl" />
          <Image
            src="/assets/Frame1.svg"
            alt="Dashboard mockup"
            width={500}
            height={350}
            className="relative w-full max-w-[550px] rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
