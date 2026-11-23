'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Play, Sparkles, Star, TrendingUp, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-zinc-50/50 to-white">
      {/* Background Decorative Mesh Glow with Cermin Blue #01A0CA */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#01A0CA]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* SISI KIRI: Headline & Value Proposition (Persis Figma) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Tagline Teks Bersih (Tanpa Badge, Tanpa Dot) */}
            <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
              Tumbuh Bersama Cermin
            </p>

            {/* Main H1 Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#121212] leading-[1.14]">
              Jalin Kemitraan Strategis di Era{' '}
              <span className="text-[#01A0CA] inline-block">Video Vertikal</span> & Digital Marketing
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal max-w-2xl">
              Kami membuka kesempatan kolaborasi dan retainer bulanan untuk membantu brand Anda berkembang melalui produksi video Reels, TikTok sinematik, dan sistem operasi konten terpadu bebas drama revisi.
            </p>

            {/* Action Buttons (Dominant Cermin Blue #01A0CA) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#brief-section"
                className="px-7 py-3.5 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white font-bold text-sm shadow-lg shadow-[#01A0CA]/25 flex items-center justify-center gap-2 transition cursor-pointer transform active:scale-95"
              >
                <span>Mulai Kolaborasi</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <a
                href="#our-works"
                className="px-6 py-3.5 rounded-xl border border-zinc-200 bg-white hover:border-[#01A0CA] hover:text-[#01A0CA] text-zinc-800 font-semibold text-sm shadow-2xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Lihat Portofolio Karya</span>
              </a>
            </div>

            {/* Social Proof Rating */}
            <div className="pt-6 border-t border-zinc-200/70 flex items-center gap-1.5 text-xs text-zinc-600">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-[#121212] text-sm ml-1">4.9 / 5.0</span>
              <span className="text-zinc-500">(50+ Brand Ternama)</span>
            </div>
          </div>

          {/* SISI KANAN: 3D Isometric Floating Showcase (Statis Tanpa Hover, Luas ke Kanan) */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end pointer-events-none select-none">
            <div className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl lg:-mr-10 xl:-mr-20">
              {/* Soft Ambient Glow in Cermin Blue #01A0CA */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#01A0CA]/10 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* 3D Isometric Cards Showcase Image (Statis & Non-interactive) */}
              <img
                src="/images/hero-image.webp"
                alt="Cermin Kreatif 3D Creative Suite & Video Retainer Mockup Showcase"
                className="w-full h-auto object-contain block pointer-events-none select-none"
                loading="eager"
                draggable={false}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
