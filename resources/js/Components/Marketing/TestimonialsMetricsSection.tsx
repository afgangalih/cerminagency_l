'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Monica Hidajat',
    role: 'Project Manager',
    company: 'PT. Digerati Atomic',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Setelah optimasi rutin Sosial Media dan produksi video melalui Cermin Kreatif, visual brand perusahaan semakin berkembang baik dan jadi jauh lebih profesional di mata klien.',
  },
  {
    id: 2,
    name: 'Gabriel Rey',
    role: 'CEO',
    company: 'Triv Indonesia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Cermin Kreatif telah membantu kami dalam memberikan strategi konten visual dan video vertikal dengan berbagai ide yang out of the box dan mengeksekusinya dengan sangat rapi.',
  },
  {
    id: 3,
    name: 'Dedy Rahmat',
    role: 'Owner',
    company: 'Zenmen Barber & ShoesCare',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Setelah Instagram & TikTok feeds dikelola rutin oleh tim Cermin, insight dan interaksi langsung meningkat signifikan. Jadwal tayang tertib tanpa drama molor.',
  },
  {
    id: 4,
    name: 'Sarah Wijaya',
    role: 'Marketing Director',
    company: 'Lumen Skin Clinic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'SOP dan alur kerja Cermin bener-bener memudahkan kami. Kami tidak perlu lagi pusing koordinasi draf di obrolan chat yang tercecer. Kualitas visualnya konsisten berkelas.',
  },
  {
    id: 5,
    name: 'Budi Santoso',
    role: 'Founder & Head Roaster',
    company: 'Maven Coffee Roasters',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Hasil video vertikal 4K dan foto produk dari studio Malang sangat memuaskan. Tone sinematiknya berhasil memperkuat positioning brand specialty coffee kami.',
  },
  {
    id: 6,
    name: 'Dwinanda Haryadi',
    role: 'Brand Lead',
    company: 'Arche Lifestyle & Denim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Kolaborasi yang menyenangkan dengan Cermin Kreatif. Feed 3x3 tertata estetik dan kampanye peluncuran koleksi baru kami mendapat respons yang sangat positif.',
  },
];

export function TestimonialsMetricsSection() {
  const [currentIndex, setCurrentIndex] = useState(1); // Default ke Gabriel Rey (kartu tengah aktif)

  const total = testimonialsData.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Indeks untuk 3 kartu berdampingan
  const leftIndex = (currentIndex - 1 + total) % total;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % total;

  const leftItem = testimonialsData[leftIndex];
  const centerItem = testimonialsData[centerIndex];
  const rightItem = testimonialsData[rightIndex];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white border-b border-zinc-100 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ========================================================= */}
        {/* BAGIAN ATAS: CARD DOKUMENTASI & TENTANG CERMIN KREATIF    */}
        {/* ========================================================= */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[26px] md:text-[34px] font-bold text-zinc-900 leading-tight">
            Studio Retainer Video <span className="text-[#01A0CA]">No.1 di Jawa Timur</span>{' '}
            <span className="text-xs font-bold uppercase tracking-wider bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded text-zinc-700 ml-1.5 align-middle">
              ID
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#01A0CA] font-medium mt-2.5">
            &ldquo;Sebagai partner dalam setiap langkah menuju kesuksesan di dunia digital 🚀&rdquo;
          </p>
        </div>

        {/* Card Putih Dokumentasi */}
        <div className="bg-white rounded-3xl border border-[#e7eaf3] p-5 sm:p-7 lg:p-9 shadow-[0_4px_24px_rgba(15,23,42,0.04)] mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Visual Collage: Gambar Utama + 2 Gambar Bertumpuk */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                {/* Gambar Besar Kiri */}
                <div className="sm:col-span-7 h-[240px] sm:h-[300px] rounded-2xl overflow-hidden relative shadow-xs">
                  <img
                    src="/images/about/studio-workspace.jpg"
                    alt="Workspace Studio Cermin Kreatif"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Dua Gambar Kecil Bertumpuk */}
                <div className="sm:col-span-5 flex flex-col gap-3 sm:gap-4 h-[240px] sm:h-[300px]">
                  <div className="flex-1 rounded-xl overflow-hidden relative shadow-xs">
                    <img
                      src="/images/about/studio-room.jpg"
                      alt="Ruang Kreatif & Lounge Cermin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 rounded-xl overflow-hidden relative shadow-xs">
                    <img
                      src="/images/about/studio-team.jpg"
                      alt="Tim Produksi Cermin Kreatif"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 mt-2.5 font-normal">
                Tentang PT. Cermin Kreatif Studio (Dokumentasi)
              </p>
            </div>

            {/* Kolom Teks Deskripsi */}
            <div className="lg:col-span-4 space-y-3.5 sm:space-y-4 lg:pl-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#01A0CA] text-white text-[11px] font-bold tracking-wide">
                About Us
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-tight">
                Tentang Cermin Kreatif
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed text-justify sm:text-left">
                Cermin Kreatif hadir sebagai studio produksi video dan retainer agensi terintegrasi untuk berbagai jenis industri maupun skala bisnis. Mulai dari Startup, Brand Lokal, UMKM, Profesional, Perusahaan, Organisasi hingga Pemerintahan.
              </p>
              <div className="pt-1">
                <a
                  href="#about"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#01A0CA] hover:underline transition"
                >
                  <span>Tentang Perusahaan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* BAGIAN BAWAH: TESTIMONI KLIEN (Bagaimana pendapat klien kami?) */}
        {/* ========================================================= */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.5px] font-semibold text-zinc-400">
            FROM OUR SATISFIED CLIENTS
          </p>
          <h2 className="text-[28px] md:text-[34px] font-bold text-zinc-900 mt-1.5 leading-tight">
            Bagaimana pendapat klien kami?
          </h2>
        </div>

        {/* ========================================================= */}
        {/* CAROUSEL CONTAINER (3 Cards + Nav Arrows)                 */}
        {/* ========================================================= */}
        <div className="relative">
          
          {/* Tombol Panah Kiri */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Testimonial"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-md text-zinc-700 hover:text-[#01A0CA] hover:border-[#01A0CA] transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Tombol Panah Kanan */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Testimonial"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-md text-zinc-700 hover:text-[#01A0CA] hover:border-[#01A0CA] transition cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Grid 3 Kartu (Mobile: hanya kartu aktif, Desktop: 3 kartu dengan tengah aktif biru) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* ── KARTU 1: Kiri (Inactive - Putih) ── */}
            <div
              onClick={prevSlide}
              className="hidden md:flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#e7eaf3] shadow-xs cursor-pointer hover:border-zinc-300 transition-all duration-300 opacity-90 hover:opacity-100"
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-1 text-[#f59e0b]">
                  {[...Array(leftItem.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
                  ))}
                </div>
                {/* Text */}
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  {leftItem.text}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-zinc-100">
                <img
                  src={leftItem.avatar}
                  alt={leftItem.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className="font-bold text-sm text-zinc-900 block truncate">
                    {leftItem.name}
                  </span>
                  <span className="text-xs text-zinc-500 block truncate">
                    {leftItem.role} {leftItem.company}
                  </span>
                </div>
              </div>
            </div>

            {/* ── KARTU 2: Tengah (ACTIVE - Biru Cerah Cermin #01A0CA) ── */}
            <div className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#01A0CA] text-white shadow-xl shadow-[#01A0CA]/25 transition-all duration-300 transform md:-translate-y-1">
              <div className="space-y-4">
                {/* Stars (Gold/Amber) */}
                <div className="flex gap-1 text-[#fbbf24]">
                  {[...Array(centerItem.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#fbbf24]" />
                  ))}
                </div>
                {/* Text (White) */}
                <p className="text-sm sm:text-base text-white leading-relaxed font-normal">
                  {centerItem.text}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-white/20">
                <img
                  src={centerItem.avatar}
                  alt={centerItem.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0 border-2 border-white/40"
                />
                <div className="min-w-0">
                  <span className="font-bold text-sm text-white block truncate">
                    {centerItem.name}
                  </span>
                  <span className="text-xs text-white/80 block truncate">
                    {centerItem.role} {centerItem.company}
                  </span>
                </div>
              </div>
            </div>

            {/* ── KARTU 3: Kanan (Inactive - Putih) ── */}
            <div
              onClick={nextSlide}
              className="hidden md:flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#e7eaf3] shadow-xs cursor-pointer hover:border-zinc-300 transition-all duration-300 opacity-90 hover:opacity-100"
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-1 text-[#f59e0b]">
                  {[...Array(rightItem.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
                  ))}
                </div>
                {/* Text */}
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  {rightItem.text}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-zinc-100">
                <img
                  src={rightItem.avatar}
                  alt={rightItem.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className="font-bold text-sm text-zinc-900 block truncate">
                    {rightItem.name}
                  </span>
                  <span className="text-xs text-zinc-500 block truncate">
                    {rightItem.role} {rightItem.company}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* PAGINATION DOTS                                           */}
          {/* ========================================================= */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Lihat ulasan ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-[#01A0CA]'
                    : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>

        </div>

        {/* ========================================================= */}
        {/* SIMPLE, HONEST STAT (Seperti di Referensi GoSocial)        */}
        {/* ========================================================= */}
        <div className="mt-14 pt-8 flex justify-end">
          <div className="max-w-sm text-right space-y-1">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#01A0CA] tracking-tight block">
              80%
            </span>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Klien kami merasakan peningkatan konsistensi visual dan efisiensi produksi konten setelah bekerjasama dengan Cermin Kreatif.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
