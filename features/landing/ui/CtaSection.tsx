import Image from "next/image";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="container mx-auto px-4 md:px-10 py-6 md:py-10">
      <div className="bg-[#17366A] rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group text-center lg:text-left">          
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-[600px]">Start tracking smarter today</h2>
          <p className="text-gray-300 text-lg max-w-md">
            Join 25,000+ product teams who rely on us to understand their users. Get actionable insights in minutes.
          </p>
          <div>
            <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 bg-[#06FCFF] text-[#1B3C73] font-bold rounded-lg  transition-colors">
              Start Free Trial →
            </Link>
          </div>
          <p className="text-sm text-[#FFFFFF99]">
            No credit card required • 14-day free trial • Setup in under 5 minutes
          </p>
        </div>
        
        <div className="lg:w-1/2 relative z-10 flex justify-center lg:justify-end">
          <Image 
            src="/assets/herroframe2.png" 
            alt="Dashboard statistics" 
            width={600} 
            height={400} 
            className=""
          />
        </div>
      </div>
    </section>
  );
}
