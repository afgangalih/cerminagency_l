'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { Service } from '@/types/service';
import { ArrowRight } from 'lucide-react';

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  // Contextual badge & spotlight data based on service slug
  const getSpotlightData = () => {
    switch (service.slug) {
      case 'jasa-kelola-instagram':
        return {
          headerBadge: 'Instagram Specialist 📸',
          headerTitle: 'Jasa Kelola Instagram',
          headerSubtitle:
            'Pengelolaan akun Instagram bisnis profesional menyeluruh: desain feed 3x3 estetik, naskah Reels engaging, kalender editorial 30 hari, dan optimasi jam tayang.',
          tag: 'PROGRAM KELOLA INSTAGRAM TERPILIH',
          title: 'Estetika Grid Feed 3x3 & Pertumbuhan Follower Organik',
          description:
            'Kami memastikan profil Instagram brand Anda tampil memikat saat dibuka pertama kali, dengan konten carousel edukasi dan video Reels beritme tinggi.',
          image: '/images/about/studio-workspace.jpg',
          badge: 'Instagram Feed & Reels',
        };
      case 'jasa-kelola-tiktok':
        return {
          headerBadge: 'TikTok FYP Specialist 🎵',
          headerTitle: 'Jasa Kelola TikTok',
          headerSubtitle:
            'Layanan manajemen akun TikTok bisnis terpadu: perumusan ide hook 3 detik pertama, kurasi sound trending berlisensi, dan editing video vertikal 9:16.',
          tag: 'PROGRAM KELOLA TIKTOK TERPILIH',
          title: 'Masuki Algoritma FYP & Bangun Engagement Generasi Muda',
          description:
            'Tim kreator muda kami memantau tren audio harian dan mengeksekusi format video pendek yang mempertahankan retensi penonton hingga akhir.',
          image: '/images/about/studio-room.jpg',
          badge: 'TikTok FYP Growth',
        };
      case 'jasa-kelola-facebook':
        return {
          headerBadge: 'Facebook Community 👥',
          headerTitle: 'Jasa Kelola Facebook',
          headerSubtitle:
            'Pengelolaan Facebook Page bisnis dan ekosistem komunitas: konten artikel storytelling persuasif, penataan album katalog produk, dan retensi pelanggan setia.',
          tag: 'PROGRAM KELOLA FACEBOOK TERPILIH',
          title: 'Perkuat Loyalitas Pelanggan & Interaksi Halaman Bisnis',
          description:
            'Menjangkau segmen pasar matang dengan daya beli tinggi melalui narasi tulisan mendalam, album katalog produk terstruktur, dan sinkronisasi Meta Business.',
          image: '/images/about/studio-team.jpg',
          badge: 'Facebook Fanpage & Group',
        };
      case 'instagram-tiktok-feeds':
        return {
          headerBadge: 'Sinematik 4K 🎥',
          headerTitle: 'Jasa Instagram & TikTok Feeds',
          headerSubtitle:
            'Produksi video vertikal 9:16 sinematik untuk Instagram Reels dan TikTok. Syuting langsung di studio fisik Malang dengan kamera cinema, lighting pro, dan alur penceritaan berkonversi tinggi.',
          tag: 'PROGRAM VIDEO VERTIKAL TERPILIH',
          title: 'Produksi Video Reels & TikTok Sinematik di Studio Malang',
          description:
            'Dikerjakan dengan kamera cinema 4K 60fps, tata lampu studio terkalibrasi, talent komunikatif, dan sound design berlisensi komersial aman dari hak cipta.',
          image: '/images/about/studio-room.jpg',
          badge: 'Studio Fisik Malang',
        };
      case 'graphic-design':
        return {
          headerBadge: 'Visual Identity 🎨',
          headerTitle: 'Jasa Graphic Design',
          headerSubtitle:
            'Perancangan estetika visual brand yang eksklusif dan kohesif: dari susunan puzzle feed 3x3 bersambung harmonis, cover Reels yang clickable, hingga infografis carousel edukasi informatif.',
          tag: 'PROGRAM VISUAL BRAND TERPILIH',
          title: 'Desain Grid Feed 3x3 & Cover Reels yang Membangun Reputasi',
          description:
            'Bebas dari template pasaran. Setiap aset visual dirancang dengan riset tipografi, palet warna, dan hierarki baca berstandar RGB 300 DPI siap tayang.',
          image: '/images/about/studio-team.jpg',
          badge: 'Desain Autentik',
        };
      case 'social-media-management':
      default:
        return {
          headerBadge: 'Top Rated 🏆',
          headerTitle: 'Jasa Social Media Management',
          headerSubtitle:
            'Solusi terpadu pengelolaan media sosial brand: mulai dari strategi, kalender konten bulanan, copywriting naskah, hingga pelaporan insight performa berkala.',
          tag: 'PROGRAM SOCIAL MEDIA TERPILIH',
          title: 'Manajemen Kalender Konten 30 Hari Tanpa Drama Molor',
          description:
            'Seluruh pilar konten, copywriting naskah, dan jadwal tayang dirumuskan secara terstruktur. Klien meninjau dan memberi persetujuan satu pintu di Client Portal Cermin.',
          image: '/images/about/studio-workspace.jpg',
          badge: 'SOP Terjadwal',
        };
    }
  };

  const spotlight = getSpotlightData();

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo Tim Cermin Kreatif! Saya ingin konsultasi terkait layanan *${service.title}* untuk brand saya.`
  )}`;

  return (
    <section className="relative overflow-hidden bg-white border-b border-zinc-200/80 pt-12 pb-20 sm:pt-16 sm:pb-24">
      {/* Sleek Architectural Diagonal Polygon Cut on Right (Persis Referensi GoSocial & Figma 17:1867) */}
      <div 
        className="hidden md:block absolute top-0 right-0 w-[38%] lg:w-[32%] h-full bg-[#f4f6f9] pointer-events-none -z-0"
        style={{
          clipPath: 'polygon(32% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* CENTERED HEADER (PERSIS GAMBAR REFERENSI USER)              */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            Layanan Strategis Cermin
          </p>

          {/* Main H1 Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#111827] tracking-tight leading-[1.18]">
            {spotlight.headerTitle}
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-normal max-w-2xl mx-auto">
            {spotlight.headerSubtitle}
          </p>

          {/* Centered Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-500 pt-1">
            <Link href="/" className="text-[#01A0CA] hover:underline font-semibold transition">
              Home
            </Link>
            {service.parent_slug && (
              <>
                <span className="text-zinc-300">/</span>
                <Link href={`/services/${service.parent_slug}`} className="text-[#01A0CA] hover:underline font-semibold transition">
                  Social Media Management
                </Link>
              </>
            )}
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-800 font-semibold">{service.title}</span>
          </nav>

        </div>

        {/* ============================================================ */}
        {/* SPOTLIGHT SHOWCASE CARD (PROGRAM TERPILIH DI BAWAH HEADER)   */}
        {/* ============================================================ */}
        <div className="mt-12 sm:mt-14 max-w-4xl mx-auto bg-white rounded-2xl border border-zinc-200/90 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            
            {/* Left Content (7 Cols) */}
            <div className="p-7 sm:p-9 md:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#01A0CA] font-extrabold block">
                  {spotlight.tag}
                </span>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] leading-snug tracking-tight">
                  {spotlight.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                  {spotlight.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white text-xs font-bold shadow-md shadow-[#01A0CA]/25 hover:shadow-lg transition transform active:scale-95 cursor-pointer"
                >
                  <span>Konsultasi Program Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Media Preview (5 Cols - Real Studio Photography) */}
            <div className="md:col-span-5 relative min-h-[220px] sm:min-h-[280px] bg-zinc-100 overflow-hidden">
              <img
                src={spotlight.image}
                alt={spotlight.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Bottom Subtle Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-zinc-900 backdrop-blur-md shadow-xs">
                  {spotlight.badge}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/80 font-bold">
                  Cermin Kreatif
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
