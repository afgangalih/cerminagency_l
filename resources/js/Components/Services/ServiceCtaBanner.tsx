'use client';

import React from 'react';
import { ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';

interface ServiceCtaBannerProps {
  serviceTitle: string;
}

export function ServiceCtaBanner({ serviceTitle }: ServiceCtaBannerProps) {
  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo Tim Cermin Kreatif! Kami ingin konsultasi lebih lanjut terkait layanan ${serviceTitle} untuk brand kami.`
  )}`;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0180A0] via-[#01A0CA] to-[#008db3] text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        <p className="text-xs font-bold uppercase tracking-widest text-white/80 font-mono">
          Konsultasi Retainer Cermin
        </p>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
          Siap Meningkatkan Standar Visual &amp; Reputasi Brand Anda?
        </h2>

        <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-normal">
          Diskusikan tantangan konten Anda bersama tim kreatif Cermin Studio Malang. Kami siap membantu merumuskan strategi yang tepat.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#01A0CA] hover:bg-zinc-100 text-sm font-bold shadow-xl transition transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-[#01A0CA]" />
            <span>Konsultasi Cepat via WhatsApp</span>
          </a>

          <a
            href="/#brief-section"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-black/25 hover:bg-black/35 text-white border border-white/20 text-sm font-semibold transition"
          >
            <span>Kirim Brief Proforma Online</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

