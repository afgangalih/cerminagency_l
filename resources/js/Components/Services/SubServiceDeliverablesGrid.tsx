'use client';

import React from 'react';
import { ArrowRight, LayoutGrid, UserCheck, MessageSquare, BarChart3, LineChart, Megaphone } from 'lucide-react';

interface SubServiceDeliverablesGridProps {
  platformName?: string;
  serviceTitle: string;
}

export function SubServiceDeliverablesGrid({ platformName = 'Instagram', serviceTitle }: SubServiceDeliverablesGridProps) {
  const deliverables = [
    {
      title: `Pembuatan Konten ${platformName}`,
      desc: 'Lebih dari sekadar posting, kami analisa tren visual untuk memproduksi feeds, carousel edukatif, dan video Reels berkualitas tinggi.',
      icon: LayoutGrid,
    },
    {
      title: 'Optimasi Profil & Estetika Akun',
      desc: 'Penataan bio profesional, highlight story terstruktur, tautan bio link terintegrasi, dan username/branding optimal.',
      icon: UserCheck,
    },
    {
      title: 'Manajemen Interaksi & Admin',
      desc: 'Admin aktif untuk membalas komentar, menyapa audiens, dan merespon pesan DM masuk dengan nada ramah & komunikatif.',
      icon: MessageSquare,
    },
    {
      title: 'Laporan Insight & Evaluasi',
      desc: 'Perkembangan akun dilaporkan secara berkala setiap bulan, lengkap dengan evaluasi jangkauan, interaksi, dan rekomendasi langkah lanjut.',
      icon: BarChart3,
    },
    {
      title: 'Competitor & Trend Analysis',
      desc: 'Kami membedah strategi kompetitor dan mengidentifikasi tren peluang agar brand Anda selalu selangkah lebih maju.',
      icon: LineChart,
    },
    {
      title: 'Manajemen Iklan Meta Ads & KOL',
      desc: 'Pendampingan setup Meta Ads bersponsor (boost post) serta rekomendasi kolaborasi influencer/KOL yang relevan.',
      icon: Megaphone,
    },
  ];

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo Tim Cermin Kreatif! Saya ingin konsultasi terkait ruang lingkup layanan *${serviceTitle}*.`
  )}`;

  return (
    <section id="features" className="py-20 sm:py-24 bg-white border-b border-zinc-200/80 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Bersih, Tanpa Pill Badge, Tanpa Emoji) */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            Ruang Lingkup Layanan
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight">
            Termasuk Apa Saja?
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed font-normal">
            Layanan terpadu tanpa biaya tersembunyi untuk pengelolaan dan pertumbuhan akun {platformName} bisnis Anda.
          </p>
        </div>

        {/* 6 Clean White Cards Grid (Cermin Blue Accents) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {deliverables.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200/90 p-6 flex flex-col justify-between hover:border-[#01A0CA]/50 hover:shadow-sm transition duration-200 group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#01A0CA]/10 text-[#01A0CA] flex items-center justify-center font-bold shadow-xs group-hover:bg-[#01A0CA] group-hover:text-white transition">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-bold text-base text-[#121212] group-hover:text-[#01A0CA] transition leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Dual Action Buttons (Cermin Blue) */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white text-xs font-bold shadow-md shadow-[#01A0CA]/20 hover:shadow-lg transition transform active:scale-95 cursor-pointer"
          >
            <span>Konsultasi Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-200 bg-white hover:border-[#01A0CA] hover:text-[#01A0CA] text-zinc-800 text-xs font-semibold transition"
          >
            <span>Lihat Portofolio</span>
          </a>
        </div>

      </div>
    </section>
  );
}
