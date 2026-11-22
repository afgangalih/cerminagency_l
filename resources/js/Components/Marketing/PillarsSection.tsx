'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { 
  ShieldCheck, Clock, FileText, Receipt, Users, 
  BarChart3, ArrowRight, Star, Check 
} from 'lucide-react';

export function PillarsSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Portal Klien Transparan',
      description: 'Brand Anda mendapatkan portal khusus untuk meninjau draf video, membaca naskah, dan mengunduh file master tanpa obrolan yang hilang di grup WhatsApp.',
      linkText: 'Jelajahi Portal Klien →'
    },
    {
      icon: Clock,
      title: 'Syuting Fisik Studio Malang',
      description: 'Sesi produksi dengan kamera sinematik 4K, tata cahaya profesional, dan pengarah gaya untuk produk F&B, fashion, maupun klinik kecantikan.',
      linkText: 'Lihat Fasilitas Studio →'
    },
    {
      icon: FileText,
      title: 'SOP Naskah & Persetujuan 1-Klik',
      description: 'Naskah video diriset berdasarkan tren audio dan angle masalah konsumen. Brand Anda dapat menyetujui draf dalam satu klik atau mengajukan revisi terarah.',
      linkText: 'Pelajari Alur Kerja →'
    },
    {
      icon: Receipt,
      title: 'Faktur & Termin Pembayaran Resmi',
      description: 'Faktur proforma otomatis, termin DP 50% untuk pembukaan kalender produksi, serta pelunasan yang transparan tanpa biaya siluman.',
      linkText: 'Detail Finansial →'
    },
    {
      icon: Users,
      title: 'Pedoman & Aset Visual Brand',
      description: 'Aset logo, palet warna, gaya tipografi, dan persona brand Anda tersimpan aman sebagai acuan konsisten bagi tim naskah dan editor video.',
      linkText: 'Konsistensi Brand →'
    },
    {
      icon: BarChart3,
      title: 'Kalender Konten 30 Hari',
      description: 'Pratinjau tampilan feed Instagram 3x3 dan format vertikal TikTok sebelum konten resmi ditayangkan ke publik.',
      linkText: 'Pantau Jadwal Tayang →'
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Hero Grid: Value Statement & Featured Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Heading Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <span className="text-[11px] font-inter uppercase tracking-wider text-zinc-400 font-semibold block">
              SISTEM KERJA PROFESIONAL
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 leading-[1.15]">
              Standar Kerja Agensi yang Rapi, Jelas, dan Tepat Waktu.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-2xl">
              Cermin Kreatif memadukan keahlian produksi video sinematik dengan alur kerja modern. Brand Anda memiliki kendali penuh atas persetujuan draf, catatan revisi, hingga jadwal rilis bulanan melalui portal khusus yang mudah diakses.
            </p>
            <div className="pt-2">
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition shadow-xs"
              >
                <span>Coba Portal Klien Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Featured Scaled Testimonial */}
          <div className="lg:col-span-5 p-7 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-base sm:text-lg font-medium text-zinc-900 leading-snug">
                "Sejak bermitra dengan Cermin Kreatif, <span className="underline decoration-zinc-400 font-bold">jadwal konten bulanan kami teratur tanpa ada revisi yang tercecer di grup chat</span>. Kualitas visual klinik kami meningkat drastis."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/60">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Sarah Wijaya"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
              />
              <div>
                <h4 className="text-xs font-bold text-zinc-900">Sarah Wijaya</h4>
                <p className="text-[11px] text-zinc-500 font-inter">Owner, Lumen Skin Clinic</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Feature Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl border border-zinc-200/80 hover:border-zinc-300 hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-5 bg-white group"
              >
                <div className="space-y-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 group-hover:bg-zinc-950 group-hover:text-white transition">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100">
                  <span className="text-xs font-semibold text-zinc-800 group-hover:text-zinc-950 inline-flex items-center gap-1">
                    {pillar.linkText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
