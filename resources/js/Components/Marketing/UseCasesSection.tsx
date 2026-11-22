'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { Utensils, Sparkles, Shirt, Building2, ArrowRight } from 'lucide-react';

export function UseCasesSection() {
  const cases = [
    {
      icon: Utensils,
      title: 'Kuliner, Kafe & Restoran (F&B)',
      description: 'Sorotan tekstur makanan beresolusi tinggi, ritual peracikan minuman, suasana tempat, dan video TikTok yang memikat audiens lokal untuk datang langsung.',
      linkText: 'Lihat Contoh Video F&B →'
    },
    {
      icon: Sparkles,
      title: 'Klinik Kecantikan & Skincare',
      description: 'Video edukasi dokter spesialis, penjelasan keamanan perawatan klinis, ulasan bahan aktif, dan konten testimoni pasien yang membangun rasa percaya.',
      linkText: 'Lihat Contoh Video Klinik →'
    },
    {
      icon: Shirt,
      title: 'Brand Fashion & Lifestyle',
      description: 'Video lookbook vertikal 9:16, sorotan detail jahitan kain, transisi outfit dinamis, dan pemanfaatan audio tren untuk menjangkau pembeli baru.',
      linkText: 'Lihat Contoh Video Fashion →'
    },
    {
      icon: Building2,
      title: 'Bisnis Jasa & Korporasi',
      description: 'Video profil perusahaan berstandar sinematik, pengenalan tim ahli di balik layar, peluncuran produk baru, dan konten branding yang profesional.',
      linkText: 'Lihat Contoh Video Korporat →'
    }
  ];

  return (
    <section id="use-cases" className="py-20 md:py-28 bg-white border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-inter uppercase tracking-wider text-zinc-400 font-semibold block">
            KOLABORASI INDUSTRI
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            Pendekatan Visual yang Disesuaikan dengan Karakter Brand Anda
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed">
            Setiap industri memiliki bahasa visual dan target pasar yang unik. Kami menyesuaikan sudut pandang naskah, ritme editing, dan tata cahaya studio agar relevan dengan audiens Anda.
          </p>
        </div>

        {/* 4 Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-zinc-50/70 border border-zinc-200/90 hover:border-zinc-300 hover:bg-white hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-800 shadow-2xs group-hover:scale-105 transition">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 tracking-tight leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-xs text-zinc-600 font-light leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-200/50">
                  <a
                    href="#brief-section"
                    className="text-xs font-semibold text-zinc-800 group-hover:text-zinc-950 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{c.linkText}</span>
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
