"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, BarChart2, Zap, Globe2, LineChart, Shield, Smartphone, Bell, MapPin, TrendingUp, Lock } from "lucide-react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'businesses' | 'parents'>('businesses');

  const businessFeatures = [
    { icon: BarChart2, title: "Real-Time Analytics", desc: "Track every user interaction as it happens with sub-second latency and instant dashboards." },
    { icon: Zap, title: "Lightning Fast", desc: "Process millions of events per second with our high performance infrastructure." },
    { icon: Globe2, title: "Global Coverage", desc: "Monitor users across 180+ countries with distributed data centers worldwide." },
    { icon: LineChart, title: "Predictive Insights", desc: "AI-powered analytics predict user behavior and highlight optimization opportunities." },
    { icon: Shield, title: "Privacy Compliant", desc: "SOC2 and GDPR compliant by default. Your users' data is protected and anonymized." },
    { icon: Smartphone, title: "Multi-Platform", desc: "Track iOS, Android, web, and desktop apps with unified SDKs and seamless integration." },
  ];

  const parentFeatures = [
    { icon: BarChart2, title: "Healthy Screen Habits", desc: "Encourage balanced phone use with insights into daily screen time and app activity patterns." },
    { icon: Bell, title: "Instant Alerts", desc: "Get notified in real-time about unusual activity, excessive usage, or restricted content access." },
    { icon: MapPin, title: "Location Awareness", desc: "Stay informed with live location tracking and movement history for added peace of mind." },
    { icon: TrendingUp, title: "Behavior Insights", desc: "Understand your child's digital habits with simple reports that highlight trends and changes." },
    { icon: Lock, title: "Safe & Secure", desc: "Protect your child from harmful content with built-in controls and privacy-first monitoring." },
    { icon: Smartphone, title: "All Devices Covered", desc: "Monitor activity across Android, iOS, and tablets from one easy-to-use dashboard." },
  ];

  return (
    <div className="min-h-screen overflow-hidden text-white bg-[#0A0E1A]" 
    >
      {/* Header */}
      <header className="container mx-auto px-10 py-6 flex items-center justify-between">
        <Link href="/landing" className="flex items-center">
          <Image 
            src="/assets/FlentraLogo.svg" 
            alt="Flentra Logo" 
            width={118} 
            height={30} 
            className="h-8 w-auto"
            priority
          />
        </Link>
      </header>

      {/* Hero Section — two-column layout */}
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
              className="relative w-full max-w-[700px] rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Features Grid Section */}
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
          {[
            { icon: BarChart2, title: "Real-Time Analytics", desc: "Track every user interaction as it happens with sub-second latency and instant dashboards." },
            { icon: Zap, title: "Lightning Fast", desc: "Process millions of events per second with our high performance infrastructure." },
            { icon: Globe2, title: "Global Coverage", desc: "Monitor users across 180+ countries with distributed data centers worldwide." },
            { icon: LineChart, title: "Predictive Insights", desc: "AI-powered analytics predict user behavior and highlight optimization opportunities." },
            { icon: Shield, title: "Privacy Compliant", desc: "SOC2 and GDPR compliant by default. Your users' data is protected and anonymized." },
            { icon: Smartphone, title: "Multi-Platform", desc: "Track iOS, Android, web, and desktop apps with unified SDKs and seamless integration." },
          ].map((feature, i) => (
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
      {/* Product Grid Section */}
      <section className="container mx-auto px-10 ">
        <div className="text-center mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            A Product for <span className="text-[#04DB62]">All Users</span>
          </h2>
          <p className="text-gray-400 text-[20px] max-w-3xl mx-auto mb-12">
            Powerful analytics features that reveal exactly how users interact with your product.
          </p>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="flex bg-[#161A25] rounded-xl p-1">
              <button
                onClick={() => setActiveTab('businesses')}
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${activeTab === 'businesses' ? 'bg-[#05E0E4] text-[#161A25]' : 'text-gray-400 hover:text-white'}`}
              >
                Businesses
              </button>
              <button
                onClick={() => setActiveTab('parents')}
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${activeTab === 'parents' ? 'bg-[#05E0E4] text-[#161A25]' : 'text-gray-400 hover:text-white'}`}
              >
                Parents
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'businesses' ? businessFeatures : parentFeatures).map((feature, i) => (
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

      {/* Enterprise Section */}
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
              {[
                "Real-time event streaming pipeline",
                "Automated anomaly detection with ML",
                "Distributed data processing at scale",
                "End-to-end encryption for all data"
              ].map((item, i) => (
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

      {/* CTA Section */}
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
              src="/assets/Rectangle1.svg" 
              alt="Dashboard statistics" 
              width={600} 
              height={400} 
              className=""
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#FFFFFF40] mt-12 py-16">
        <div className="container mx-auto px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <div className="flex items-center">
              <Image 
                src="/assets/FlentraLogo.svg" 
                alt="Flentra Logo" 
                width={118} 
                height={30} 
                className="h-7 w-auto" 
              />
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Real-time analytics platform helping product teams understand user behavior and drive growth.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
                <Image src="/assets/Icon1.svg" alt="Icon 1" width={16} height={16} />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
                <Image src="/assets/Icon2.svg" alt="Icon 2" width={16} height={16} />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
                <Image src="/assets/Icon3.svg" alt="Icon 3" width={16} height={16} />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-[#FFFFFF99]">
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-[#FFFFFF99]">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-[#FFFFFF99]">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">GDPR</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#FFFFFF99]">
          <p>© 2026 Flentra. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
            <Link href="#" className="hover:text-white transition-colors">Trust Center</Link>
            <Link href="#" className="hover:text-white transition-colors">Compliance</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
