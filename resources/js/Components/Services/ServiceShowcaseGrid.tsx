'use client';

import React from 'react';
import { ShowcaseItem } from '@/types/service';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface ServiceShowcaseGridProps {
  items: ShowcaseItem[];
  serviceTitle: string;
}

export function ServiceShowcaseGrid({ items, serviceTitle }: ServiceShowcaseGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <section id="portfolio" className="py-20 bg-white border-b border-zinc-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            Portofolio Karya
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212] tracking-tight">
            Hasil Karya &amp; Implementasi Nyata
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Eksplorasi hasil produksi untuk klien retainer Cermin yang terbukti meningkatkan persepsi dan interaksi audiens.
          </p>
        </div>

        {/* 3 Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-zinc-200/90 bg-white hover:border-[#01A0CA]/50 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                
                {/* Metric Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#01A0CA] shadow-sm">
                    {item.metrics}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-zinc-900 transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                  {item.category}
                </span>
                <h3 className="font-bold text-base text-[#121212] group-hover:text-[#01A0CA] transition leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

