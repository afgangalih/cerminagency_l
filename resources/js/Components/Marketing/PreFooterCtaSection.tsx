'use client';

import React from 'react';
import { ArrowRight, Phone, TrendingDown, Sparkles } from 'lucide-react';

export function PreFooterCtaSection() {
  return (
    <>
      {/* 1. Pre-Footer Call to Action Banner (Dominant Cermin Blue #01A0CA) */}
      <section className="bg-gradient-to-r from-[#01A0CA] via-[#0193bb] to-[#008db3] text-white py-16 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-cyan-100 text-xs font-bold uppercase tracking-wider">
              <TrendingDown className="w-4 h-4 text-white" />
              <span>Jangan Sampai Tertinggal Algoritma</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Don't get left behind..
            </h2>
            <p className="text-sm sm:text-base text-cyan-50 font-normal">
              Tingkatkan kehadiran bisnis Anda di era video digital sekarang bersama Cermin Kreatif!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
            <a
              href="#pricing"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-cyan-50 text-[#01A0CA] font-bold text-xs shadow-lg text-center transition cursor-pointer transform active:scale-95"
            >
              Lihat Paket Retainer
            </a>
            <a
              href="#brief-section"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border-2 border-white/80 hover:bg-white/10 text-white font-bold text-xs shadow-md text-center transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Konsultasi WhatsApp Studio</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Media Mentions / As Seen On (Persis Figma) */}
      <section className="bg-zinc-100 py-10 px-4 sm:px-6 lg:px-8 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-4 text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            <div className="h-px bg-zinc-300 flex-1 max-w-xs" />
            <span>As Seen On:</span>
            <div className="h-px bg-zinc-300 flex-1 max-w-xs" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-zinc-400 font-bold text-sm tracking-wider grayscale opacity-75">
            <span className="hover:text-zinc-700 transition">KOMPAS.com</span>
            <span className="hover:text-zinc-700 transition">detikcom</span>
            <span className="hover:text-zinc-700 transition font-extrabold text-base">IDN TIMES</span>
            <span className="hover:text-zinc-700 transition font-serif">TEMPO.CO</span>
            <span className="hover:text-zinc-700 transition">SINDONEWS.com</span>
          </div>
        </div>
      </section>
    </>
  );
}

