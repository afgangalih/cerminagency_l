'use client';

import React from 'react';
import { Share2, Video, Palette, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export function OurServicesDarkSection() {
  const services = [
    {
      title: 'Social Media Management',
      tag: 'End-to-End Retainer',
      icon: Share2,
      desc: 'Pengelolaan akun media sosial secara menyeluruh untuk membangun persepsi brand yang kuat, terpercaya, dan konsisten di hadapan target audiens Anda.',
      points: [
        'Riset tren, positioning brand & audience profiling',
        'Perencanaan kalender konten bulanan terstruktur',
        'Penulisan naskah, hook engaging & copywriting caption',
        'Distribusi konten berkala & laporan analisis performa',
      ],
      linkText: 'Konsultasi Social Media',
    },
    {
      title: 'Instagram & TikTok Feeds',
      tag: 'Video Production 9:16',
      icon: Video,
      desc: 'Produksi konten video vertikal Reels & TikTok sinematik beresolusi 4K dengan storytelling visual yang memikat dan terarah untuk meningkatkan retensi penonton.',
      points: [
        'Sesi syuting di Studio Cermin Malang & on-location',
        'Peralatan cinema camera, lighting pro & audio hi-res',
        'Editing dinamis, sound design & color grading sinematik',
        'Standar format 9:16 vertikal dengan SLA revisi teratur',
      ],
      linkText: 'Produksi Video Feeds',
    },
    {
      title: 'Graphic Design',
      tag: 'Visual Identity & Grid 3x3',
      icon: Palette,
      desc: 'Perancangan estetika visual brand yang elegan dan kohesif: dari susunan grid feed 3x3 Instagram, cover Reels yang clickable, hingga infografis carousel informatif.',
      points: [
        'Desain layout feed Instagram (Single Post & Carousel)',
        'Desain cover Reels interaktif, Story & Highlight icons',
        'Penyusunan palet warna, tipografi & visual branding',
        'Simulasi feed 3x3 tertata rapi sebelum tayang publik',
      ],
      linkText: 'Lihat Desain Grafis',
    },
  ];

  return (
    <section id="services" className="bg-zinc-50/70 py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-y border-zinc-200/80">
      {/* Background Soft Glow with Cermin Blue #01A0CA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#01A0CA]/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#01A0CA] font-bold bg-[#01A0CA]/10 px-3.5 py-1 rounded-full inline-block">
            SERVICES & EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#121212]">
            Fokus Layanan Cermin Kreatif
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
            Tiga pilar layanan utama kami untuk mentransformasi citra dan pertumbuhan visual brand Anda. <em className="text-[#01A0CA] font-medium not-italic">Perception is Everything.</em>
          </p>
        </div>

        {/* 3 Focused Service Cards Grid (Persis 3 Gambar Layanan Cermin) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200/90 p-8 flex flex-col justify-between hover:border-[#01A0CA] hover:shadow-xl hover:shadow-[#01A0CA]/10 transition duration-300 group relative"
              >
                {/* Top Accent Line on hover */}
                <div className="absolute top-0 left-8 right-8 h-[3px] bg-transparent group-hover:bg-[#01A0CA] transition rounded-t-full" />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#01A0CA]/10 text-[#01A0CA] flex items-center justify-center group-hover:bg-[#01A0CA] group-hover:text-white transition duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-zinc-400 font-mono font-bold">0{idx + 1}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-bold block w-fit">
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-extrabold text-zinc-900 group-hover:text-[#01A0CA] transition leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Feature Points */}
                  <ul className="space-y-2.5 pt-4 border-t border-zinc-100 text-xs text-zinc-700">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#01A0CA] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="#brief-section"
                    className="w-full py-2.5 rounded-xl bg-blue-50/70 hover:bg-[#01A0CA] text-[#01A0CA] hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs group-hover:bg-[#01A0CA] group-hover:text-white"
                  >
                    <span>{item.linkText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
