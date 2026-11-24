'use client';

import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface SubServiceWorkflowAndBannerProps {
  platformName?: string;
  serviceTitle: string;
}

export function SubServiceWorkflowAndBanner({ platformName = 'Instagram', serviceTitle }: SubServiceWorkflowAndBannerProps) {
  const steps = [
    {
      step: 1,
      title: 'Riset & Analisis',
      desc: `Audit mendalam terhadap akun ${platformName}, analisis kompetitor, riset audiens, serta perumusan Content Pillar 30 hari ke depan.`,
    },
    {
      step: 2,
      title: 'Handling & Aktivasi',
      desc: 'Produksi aset visual berstandar studio, video Reels 4K, copywriting caption interaktif, serta penjadwalan konten teratur.',
    },
    {
      step: 3,
      title: 'Koordinasi & Evaluasi',
      desc: 'Koordinasi transparan via Client Portal (SLA < 24 jam) serta laporan analitik performa bulanan untuk perbaikan berkelanjutan.',
    },
  ];

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo Tim Cermin Kreatif! Saya ingin konsultasi alur kerjasama untuk *${serviceTitle}*.`
  )}`;

  return (
    <section id="our-process" className="py-20 sm:py-24 bg-zinc-50/50 border-b border-zinc-200/80 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Clean Typography, No Pill Badges, No Emojis) */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            Alur Kerja Retainer Cermin
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight">
            Proses Kelola {platformName}
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed font-normal">
            Alur kerja sistematis dan teruji agar pengelolaan media sosial brand Anda berjalan konsisten tanpa drama revisi.
          </p>
        </div>

        {/* 3 Numbered Steps Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl border border-zinc-200/90 p-7 text-center flex flex-col items-center space-y-4 shadow-xs hover:border-[#01A0CA]/50 hover:shadow-sm transition duration-200"
            >
              {/* Number Circle Badge (Cermin Blue #01A0CA) */}
              <div className="w-12 h-12 rounded-full bg-[#01A0CA] text-white flex items-center justify-center font-bold text-lg font-mono shadow-md shadow-[#01A0CA]/25">
                {item.step}
              </div>

              <h3 className="font-bold text-lg text-[#121212] leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Wide Creative Showcase Banner (Cermin Blue #01A0CA Gradient Theme) */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#0180A0] via-[#01A0CA] to-[#008db3] p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-white/20">
          {/* Soft ambient lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content (7 Cols) */}
            <div className="md:col-span-7 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/90 font-mono">
                SOP Teruji &amp; Client Portal
              </p>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Metode Terstruktur &amp; Transparan
              </h3>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-lg">
                Optimasi akun {platformName} dilakukan dengan pendekatan terstruktur dan SOP ketat. Klien meninjau dan memberi persetujuan draf sebelum posting via Client Portal Cermin tanpa file berserakan di chat WhatsApp.
              </p>

              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#01A0CA] hover:bg-zinc-100 text-xs font-bold shadow-lg transition transform active:scale-95 cursor-pointer"
                >
                  <span>Mulai Kolaborasi</span>
                  <ArrowRight className="w-4 h-4 text-[#01A0CA]" />
                </a>
              </div>
            </div>

            {/* Right Visual Collage (5 Cols: Real Studio Photography) */}
            <div className="md:col-span-5 relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden shadow-md border border-white/20 aspect-video">
                    <img
                      src="/images/about/studio-workspace.jpg"
                      alt="Studio Setup"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md border border-white/20 aspect-square">
                    <img
                      src="/images/about/studio-room.jpg"
                      alt="Filming Room"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="rounded-xl overflow-hidden shadow-md border border-white/20 aspect-square">
                    <img
                      src="/images/about/studio-team.jpg"
                      alt="Team Editing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-center font-mono">
                    <div className="text-xs font-bold text-white">SLA &lt; 24 Jam</div>
                    <div className="text-[10px] text-white/80">Approval Cepat</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
