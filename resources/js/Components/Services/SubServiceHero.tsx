'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { Check, ArrowRight } from 'lucide-react';
import { Service } from '@/types/service';

interface SubServiceHeroProps {
  service: Service;
}

export function SubServiceHero({ service }: SubServiceHeroProps) {
  // Contextual copy per platform, anchored in Cermin studio reality
  const getPlatformDetails = () => {
    switch (service.slug) {
      case 'jasa-kelola-tiktok':
        return {
          platformWord: 'TikTok',
          subtitle:
            'Layanan pengelolaan akun TikTok bisnis oleh Cermin Studio Malang: perumusan ide hook 3 detik pertama, kurasi sound tren berlisensi komersial, dan produksi video vertikal 9:16 beritme tinggi.',
          spotlightTitle: 'Kuasai Algoritma FYP & Bangun Engagement Generasi Muda',
          spotlightDesc:
            'Dikerjakan langsung oleh tim kreator muda Cermin dengan riset tren audio harian dan format video pendek yang mempertahankan retensi penonton hingga akhir video.',
          image: '/images/about/studio-room.jpg',
          bullets: [
            'Riset audio trending harian & perumusan hook 3 detik pertama yang teruji',
            'Produksi video vertikal 9:16 sinematik di studio fisik Cermin Malang',
            'Distribusi konten tepat waktu & evaluasi retensi penonton berkala',
          ],
        };
      case 'jasa-kelola-facebook':
        return {
          platformWord: 'Facebook',
          subtitle:
            'Pengelolaan Facebook Fanpage bisnis dan ekosistem komunitas: artikel storytelling persuasif, penataan album katalog produk, dan retensi pelanggan loyal dengan daya beli tinggi.',
          spotlightTitle: 'Perkuat Loyalitas Pelanggan & Interaksi Halaman Bisnis',
          spotlightDesc:
            'Menjangkau segmen pasar matang melalui narasi tulisan mendalam, album katalog produk terstruktur, dan sinkronisasi profesional via Meta Business Suite.',
          image: '/images/about/studio-team.jpg',
          bullets: [
            'Storytelling artikel mendalam yang membangun kepercayaan & reputasi brand',
            'Penataan album katalog produk & sinkronisasi Meta Business Suite resmi',
            'Admin interaksi aktif untuk merespon pertanyaan dan pesan pelanggan',
          ],
        };
      case 'jasa-kelola-instagram':
      default:
        return {
          platformWord: 'Instagram',
          subtitle:
            'Pengelolaan akun Instagram bisnis menyeluruh oleh Cermin Studio Malang: perancangan kalender konten 30 hari, estetika grid feed 3x3 bersambung, naskah Reels engaging, dan optimasi jam tayang.',
          spotlightTitle: 'Tingkatkan Otoritas, Estetika Feed & Pertumbuhan Organik',
          spotlightDesc:
            'Kami memastikan profil Instagram brand Anda tampil memikat saat dibuka pertama kali. Seluruh pilar konten, visual, dan jadwal tayang dirumuskan terstruktur dan dipreview sebelum rilis.',
          image: '/images/about/studio-workspace.jpg',
          bullets: [
            'Perencanaan kalender konten 30 hari berbasis riset audiens & analisis tren',
            'Tim terdedikasi: Creative Director, Graphic Designer, Scriptwriter & Admin',
            'Eksekusi visual berstandar studio: Carousel edukatif & video Reels sinematik',
          ],
        };
    }
  };

  const details = getPlatformDetails();

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo Tim Cermin Kreatif! Saya tertarik untuk konsultasi layanan *${service.title}* untuk bisnis saya.`
  )}`;

  return (
    <section className="relative overflow-hidden bg-white border-b border-zinc-200/80 pt-12 pb-16 sm:pt-16 sm:pb-20">
      {/* Background Soft Glow with Cermin Blue #01A0CA */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#01A0CA]/8 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Sleek Architectural Diagonal Polygon Cut on Right (Persis Referensi GoSocial & Figma 18:3776) */}
      <div
        className="hidden md:block absolute top-0 right-0 w-[36%] lg:w-[30%] h-full bg-[#f4f6f9] pointer-events-none -z-0"
        style={{
          clipPath: 'polygon(32% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* CENTERED HEADER (BERSIH, TANPA BADGE PILL GAGUNA)           */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Clean Tagline Text (No Pill Badge, Clean Typography) */}
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            Social Media Retainer Cermin
          </p>

          {/* Main Title (Cermin Color Theme: Black + #01A0CA Accent) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121212] tracking-tight leading-[1.18]">
            Jasa Kelola <span className="text-[#01A0CA]">{details.platformWord}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {details.subtitle}
          </p>

          {/* Centered Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-500 pt-1">
            <Link href="/" className="text-[#01A0CA] hover:underline font-semibold transition">
              Home
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href="/services/social-media-management" className="text-[#01A0CA] hover:underline font-semibold transition">
              Social Media Management
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-800 font-semibold">{service.title}</span>
          </nav>
        </div>

        {/* ============================================================ */}
        {/* SPOTLIGHT SHOWCASE CARD (CERMIN THEME: WHITE & #01A0CA)      */}
        {/* ============================================================ */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto bg-white rounded-2xl border border-zinc-200/90 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            
            {/* Left Studio Media Preview (5 cols) */}
            <div className="md:col-span-5 relative min-h-[260px] sm:min-h-[300px] bg-zinc-100 overflow-hidden">
              <img
                src={details.image}
                alt={details.spotlightTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              
              {/* Overlay Studio Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-[11px] font-bold text-white">
                  Studio Fisik Malang
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/80 font-semibold">
                  Cermin Kreatif
                </span>
              </div>
            </div>

            {/* Right Details & Checklist (7 cols) */}
            <div className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#01A0CA] font-mono mb-1">
                    Fokus Manajemen {details.platformWord}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#121212] leading-snug tracking-tight">
                    {details.spotlightTitle}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                  {details.spotlightDesc}
                </p>

                {/* Clean Checklist with Cermin Blue #01A0CA Circles */}
                <div className="space-y-2.5 pt-1">
                  {details.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#01A0CA]/15 text-[#01A0CA] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-[13px] text-zinc-700 font-medium leading-snug">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white text-xs font-bold shadow-md shadow-[#01A0CA]/20 hover:shadow-lg transition transform active:scale-95 cursor-pointer"
                >
                  <span>Konsultasi Program Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#features"
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition"
                >
                  <span>Pelajari Fitur</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
