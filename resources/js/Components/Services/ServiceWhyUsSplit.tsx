'use client';

import React from 'react';
import { WhyUsData } from '@/types/service';
import { CheckCircle2, ShieldCheck, MapPin, Clock } from 'lucide-react';

interface ServiceWhyUsSplitProps {
  whyUs: WhyUsData;
  heroVisualType: string;
}

export function ServiceWhyUsSplit({ whyUs, heroVisualType }: ServiceWhyUsSplitProps) {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-zinc-50/60 border-b border-zinc-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Studio & Trust Highlights (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200/90 shadow-xl bg-white p-2">
              <img
                src="/images/about/studio-room.jpg"
                alt="Studio Cermin Kreatif Malang"
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
              
              {/* Overlay Badge at Bottom */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-zinc-200/80 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#01A0CA] flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-900">Studio Fisik Malang</h5>
                    <p className="text-[10px] text-zinc-500">Peralatan Sinema & Tata Lampu Pro</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#01A0CA]/10 text-[#01A0CA]">
                  Terverifikasi
                </span>
              </div>
            </div>

            {/* Quick 2 Stat Cards below */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#01A0CA] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-zinc-900 block">SLA &lt; 24 Jam</span>
                  <span className="text-[10px] text-zinc-500">Respons Cepat</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-zinc-900 block">2x Revisi Teratur</span>
                  <span className="text-[10px] text-zinc-500">Anti-Scope Creep</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Why Us Bullets & Explanation (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
                Keunggulan Cermin Kreatif
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight leading-snug">
                {whyUs.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                {whyUs.description}
              </p>
            </div>

            {/* Checklist Bullets */}
            <div className="space-y-3.5 pt-2">
              {whyUs.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-zinc-200/80 hover:border-[#01A0CA]/40 transition"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#01A0CA] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-zinc-800 leading-relaxed">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

