"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface ProductGridProps {
  businessFeatures: Feature[];
  parentFeatures: Feature[];
}

export default function ProductGrid({ businessFeatures, parentFeatures }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<'businesses' | 'parents'>('businesses');

  return (
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
  );
}
