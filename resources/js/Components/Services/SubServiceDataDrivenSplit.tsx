'use client';

import React from 'react';
import { Target, TrendingUp, Sparkles, BarChart2, CheckCircle2 } from 'lucide-react';

interface SubServiceDataDrivenSplitProps {
  platformName?: string;
}

export function SubServiceDataDrivenSplit({ platformName = 'Instagram' }: SubServiceDataDrivenSplitProps) {
  const bulletPoints = [
    {
      title: 'Target Audiens Tepat Sasaran',
      desc: 'Menemukan segmen audiens yang relevan dan siap berinteraksi dengan produk atau jasa Anda.',
      icon: Target,
    },
    {
      title: 'Meningkatkan Peluang Konversi',
      desc: 'Setiap konten memiliki objektif yang jelas: membangun reputasi brand atau konversi penjualan langsung.',
      icon: TrendingUp,
    },
    {
      title: 'Konten Relevan & Engaging',
      desc: 'Mengikuti tren visual dan gaya bahasa yang disukai target audiens tanpa merusak citra brand.',
      icon: Sparkles,
    },
    {
      title: 'Keputusan Berbasis Data Nyata',
      desc: 'Evaluasi berkala berbasis metrik analitik objektif, bukan asumsi atau tebak-tebakan semata.',
      icon: BarChart2,
    },
  ];

  return (
    <section id="data-driven" className="py-20 sm:py-24 bg-white border-b border-zinc-200/80 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono mb-2">
                Riset Tren &amp; Data
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight leading-tight">
                Strategi Berbasis Tren &amp; Data
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              Jangkau target pasar yang paling relevan untuk bisnis Anda. Pendekatan analitik kami memastikan setiap konten diproduksi dengan arah yang terukur dan berdampak nyata bagi pertumbuhan brand.
            </p>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs sm:text-sm text-zinc-700 leading-relaxed">
              Hal ini memungkinkan akun <strong className="text-zinc-900 font-bold">{platformName}</strong> yang Cermin kelola menjangkau audiens berkualitas melalui:
            </div>

            {/* 4 Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {bulletPoints.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-zinc-200/90 hover:border-[#01A0CA]/50 hover:shadow-sm transition space-y-2 group"
                  >
                    <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs sm:text-[13px]">
                      <div className="w-6 h-6 rounded-lg bg-[#01A0CA]/10 text-[#01A0CA] flex items-center justify-center shrink-0 group-hover:bg-[#01A0CA] group-hover:text-white transition">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed pl-8">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (6 Cols): Clean Analytics Dashboard Card (Cermin Palette) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-200/40 overflow-hidden p-6 sm:p-7 space-y-6">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#01A0CA] text-white flex items-center justify-center font-black text-xs shadow-xs">
                    CR
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">
                      Instagram Insights &amp; Performance
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-mono">
                      Laporan Bulanan Klien • Studio Cermin
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-600">
                  +184.2% Pertumbuhan
                </span>
              </div>

              {/* 3 Metrics Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1">
                  <span className="text-[10px] font-medium text-zinc-500 block">Akun Terjangkau</span>
                  <span className="text-base sm:text-lg font-bold text-zinc-900 block tracking-tight font-mono">142.8K</span>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    ↑ 184.2%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1">
                  <span className="text-[10px] font-medium text-zinc-500 block">Total Interaksi</span>
                  <span className="text-base sm:text-lg font-bold text-zinc-900 block tracking-tight font-mono">28.4K</span>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    ↑ 92.6%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1">
                  <span className="text-[10px] font-medium text-zinc-500 block">Follower Baru</span>
                  <span className="text-base sm:text-lg font-bold text-zinc-900 block tracking-tight font-mono">+3,240</span>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    Organik
                  </span>
                </div>
              </div>

              {/* Reach Curve SVG Chart (Cermin Blue #01A0CA) */}
              <div className="p-4 rounded-xl bg-sky-50/40 border border-sky-100/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="font-semibold text-zinc-700">Kurva Jangkauan Akun (Reach Trends)</span>
                  <span className="text-[10px] text-[#01A0CA] font-bold">Puncak: Weekend 20:00 WIB</span>
                </div>

                {/* SVG Curve Line */}
                <div className="h-28 w-full pt-2">
                  <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="cerminCurve" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#01A0CA" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#01A0CA" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area under curve */}
                    <path
                      d="M 0,80 Q 50,75 100,55 T 200,45 T 300,20 T 400,10 L 400,100 L 0,100 Z"
                      fill="url(#cerminCurve)"
                    />
                    {/* Stroke line */}
                    <path
                      d="M 0,80 Q 50,75 100,55 T 200,45 T 300,20 T 400,10"
                      fill="none"
                      stroke="#01A0CA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Active Point Circle */}
                    <circle cx="300" cy="20" r="4" fill="#01A0CA" />
                    <circle cx="300" cy="20" r="7" fill="#01A0CA" fillOpacity="0.2" />
                  </svg>
                </div>

                <div className="flex justify-between text-[10px] font-mono text-zinc-400 pt-1">
                  <span>Minggu 1</span>
                  <span>Minggu 2</span>
                  <span>Minggu 3</span>
                  <span className="text-[#01A0CA] font-bold">Minggu 4</span>
                </div>
              </div>

              {/* Demographics & Peak Activity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-between">
                  <span className="text-zinc-600 font-medium">Demografi Dominan:</span>
                  <span className="font-bold text-zinc-900 font-mono">25–34 Thn (46%)</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-between">
                  <span className="text-zinc-600 font-medium">Jam Tayang Optimal:</span>
                  <span className="font-bold text-[#01A0CA] font-mono">19:00 - 21:00 WIB</span>
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-2 border-t border-zinc-100 flex items-center gap-2 text-[11px] text-zinc-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#01A0CA] shrink-0" />
                <span>Pelaporan berkala transparan via Client Portal Cermin tanpa manipulasi bot.</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
