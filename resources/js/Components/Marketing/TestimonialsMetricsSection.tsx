'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export function TestimonialsMetricsSection() {
  const reviews = [
    {
      name: 'Budi Santoso',
      role: 'Founder & Head Roaster',
      company: 'Maven Coffee Roasters',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      text: 'Thank you Cermin Kreatif! Hasil video Reels pour-over dan atmosfer kedai beneran sinematik. Kualitas visualnya berhasil menaikkan penjualan biji kopi specialty kami secara signifikan.',
    },
    {
      name: 'Sarah Wijaya',
      role: 'Marketing Director',
      company: 'Lumen Skin Clinic',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      text: 'Portal review video Cermin bener-bener game-changer. Kami tidak perlu lagi pusing koordinasi revisi di obrolan WhatsApp. Semua draf tersimpan rapi dan tim eksekusinya tepat waktu.',
    },
    {
      name: 'Dwinanda Haryadi',
      role: 'Brand Lead',
      company: 'Arche Lifestyle & Denim',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      text: 'Senang bisa berkolaborasi dengan Cermin Kreatif. Walaupun komunikasi berjalan secara terstruktur, eksekusi visual di studio Malang sangat memuaskan dan lookbook kami tembus FYP.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#01A0CA] font-semibold">
            TESTIMONIALS & TRUST
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121212]">
            Bagaimana Pendapat Klien Kami?
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal">
            Kisah nyata para founder dan direktur pemasaran yang mempercayakan produksi konten visual mereka kepada studio kami.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-zinc-50/70 rounded-2xl border border-zinc-200/90 p-7 space-y-5 flex flex-col justify-between hover:border-[#01A0CA]/60 hover:shadow-sm transition"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-zinc-300" />
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/60">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-zinc-300"
                />
                <div className="min-w-0">
                  <span className="font-bold text-xs text-[#121212] block truncate">
                    {rev.name}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono block truncate">
                    {rev.role} • {rev.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Big Metrics Ribbon (Dominant Cermin Blue #01A0CA) */}
        <div className="bg-gradient-to-r from-[#01A0CA] via-[#0196be] to-[#008db3] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-[#01A0CA]/20">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-bold bg-white/20 px-3 py-1 rounded-full inline-block">
              KONSISTENSI & KEPUASAN
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Tingkat Retensi Kontrak Klien 94% Setiap Bulan
            </h3>
            <p className="text-xs sm:text-sm text-cyan-50 font-normal leading-relaxed">
              Klien bertahan karena alur kerja yang teratur, kepastian tanggal rilis konten, dan kualitas video vertikal yang konsisten mendongkrak citra brand.
            </p>
          </div>

          <div className="flex items-center gap-8 shrink-0 text-center">
            <div className="space-y-0.5">
              <span className="text-4xl sm:text-5xl font-extrabold font-inter text-white">94%</span>
              <span className="text-xs text-cyan-100 block font-mono font-medium">Retensi Klien</span>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="space-y-0.5">
              <span className="text-4xl sm:text-5xl font-extrabold font-inter text-white">18.2 Jam</span>
              <span className="text-xs text-cyan-100 block font-mono font-medium">SLA Review Klien</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

