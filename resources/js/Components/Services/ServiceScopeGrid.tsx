'use client';

import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ScopeItem } from '@/types/service';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface ServiceScopeGridProps {
  scopes: ScopeItem[];
  serviceTitle: string;
  slug?: string;
}

export function ServiceScopeGrid({ scopes, serviceTitle, slug }: ServiceScopeGridProps) {
  // State for active card (defaults to center card 1 = TikTok, or 0)
  const [activeIndex, setActiveIndex] = useState<number>(1);

  // Platform data for Social Media Management (Instagram, TikTok, Facebook)
  const socialPlatforms = [
    {
      id: 'instagram',
      slug: 'jasa-kelola-instagram',
      indexLabel: '1 of 3',
      name: 'Jasa Kelola Instagram',
      tag: 'Feed 3x3 & Reels',
      description:
        'Kelola feed, reels, dan story Instagram Anda secara profesional dan terencana. Desain feed 3x3 estetik, naskah Reels engaging, dan optimasi jam tayang.',
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#01A0CA]/10 p-2.5 text-[#01A0CA] shadow-xs flex items-center justify-center">
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
      ),
      waMessage: 'Halo Tim Cermin Kreatif! Saya ingin konsultasi Jasa Kelola Instagram untuk brand saya.',
    },
    {
      id: 'tiktok',
      slug: 'jasa-kelola-tiktok',
      indexLabel: '2 of 3',
      name: 'Jasa Kelola TikTok',
      tag: 'FYP & Hook 3 Detik',
      description:
        'Manfaatkan kekuatan TikTok yang trending untuk menjangkau generasi muda yang dinamis melalui riset tren audio dan video vertikal.',
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#121212] p-2.5 text-white shadow-xs flex items-center justify-center">
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-1.02-.08A6.34 6.34 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V9.37a8.16 8.16 0 0 0 3.91.99V6.91a4.78 4.78 0 0 1-.002-.22z"/>
          </svg>
        </div>
      ),
      waMessage: 'Halo Tim Cermin Kreatif! Saya ingin konsultasi Jasa Kelola TikTok untuk brand saya.',
    },
    {
      id: 'facebook',
      slug: 'jasa-kelola-facebook',
      indexLabel: '3 of 3',
      name: 'Jasa Kelola Facebook',
      tag: 'Fanpage & Komunitas',
      description:
        'Tingkatkan kehadiran di Facebook Page dan ekosistem komunitas bisnis dengan konten berkualitas tinggi yang relevan dengan target audiens.',
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#01A0CA]/10 p-2.5 text-[#01A0CA] shadow-xs flex items-center justify-center">
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      ),
      waMessage: 'Halo Tim Cermin Kreatif! Saya ingin konsultasi Jasa Kelola Facebook untuk brand saya.',
    },
  ];

  // Specific handler for platform choice in Social Media Management
  const isSocialMedia = slug === 'social-media-management';

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : socialPlatforms.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < socialPlatforms.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-20 lg:py-24 bg-white border-b border-zinc-200/80 relative overflow-hidden">
      
      {/* Decorative Striped Circle on Top Left (Persis Referensi Gambar) */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-14 pointer-events-none select-none opacity-80 z-0">
        <svg className="w-20 h-20 sm:w-28 sm:h-28 text-[#01A0CA]" viewBox="0 0 100 100">
          <defs>
            <pattern id="diagonal-stripes" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="4.5" />
            </pattern>
            <mask id="circle-mask">
              <circle cx="50" cy="50" r="46" fill="white" />
            </mask>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#diagonal-stripes)" mask="url(#circle-mask)" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      </div>

      {/* Decorative Dot Matrix on Bottom Right (Persis Referensi Gambar) */}
      <div className="hidden sm:grid absolute bottom-8 right-12 grid-cols-5 gap-3.5 opacity-25 pointer-events-none select-none z-0">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#01A0CA]" />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            {isSocialMedia ? 'Pilihan Platform Retainer' : 'Ruang Lingkup & Deliverables'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            {isSocialMedia ? 'Pilihan Social Media' : `Spesifikasi Layanan ${serviceTitle}`}
          </h2>
        </div>

        {/* ============================================================ */}
        {/* PLATFORM CARDS FOR SOCIAL MEDIA MANAGEMENT (IG, TIKTOK, FB)  */}
        {/* ============================================================ */}
        {isSocialMedia ? (
          <div className="relative">
            
            {/* Slider Container with Left & Right Arrow Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
              
              {/* Left Navigation Arrow */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous platform"
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-zinc-200/90 shadow-md items-center justify-center text-zinc-600 hover:text-[#01A0CA] hover:border-[#01A0CA] transition z-20 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Right Navigation Arrow */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next platform"
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-zinc-200/90 shadow-md items-center justify-center text-zinc-600 hover:text-[#01A0CA] hover:border-[#01A0CA] transition z-20 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {socialPlatforms.map((platform, idx) => {
                const isSelected = activeIndex === idx;

                return (
                  <div
                    key={platform.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`bg-white rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer text-center relative ${
                      isSelected
                        ? 'border-2 border-[#01A0CA] shadow-xl shadow-[#01A0CA]/10 md:-translate-y-1.5'
                        : 'border border-zinc-200/90 shadow-sm hover:border-zinc-300 hover:shadow-md'
                    }`}
                  >
                    {/* Index Label (e.g. 1 of 3) */}
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-4">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-50 border border-zinc-100">
                        {platform.indexLabel}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#01A0CA]">
                        {platform.tag}
                      </span>
                    </div>

                    {/* Platform Icon */}
                    <div className="flex flex-col items-center space-y-2 my-2">
                      {platform.icon}
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2.5 my-3">
                      <h3 className="font-extrabold text-lg text-[#111827]">
                        {platform.name}
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed font-normal min-h-[56px]">
                        {platform.description}
                      </p>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="pt-4 border-t border-zinc-100/80 mt-2">
                      <Link
                        href={`/services/social-media-management/${platform.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#01A0CA] hover:text-[#008db3] transition group"
                      >
                        <span>Selengkapnya</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Pagination Dots at Bottom */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {socialPlatforms.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    activeIndex === idx ? 'w-6 bg-[#01A0CA]' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>

          </div>
        ) : (
          /* Default Deliverables Grid for other services */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopes.map((scope, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200/90 p-6 flex flex-col justify-between hover:border-[#01A0CA]/50 hover:shadow-lg transition duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#01A0CA] flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 uppercase">
                      {scope.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#121212] group-hover:text-[#01A0CA] transition leading-snug mb-2">
                      {scope.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {scope.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Standar Cermin</span>
                  <span className="font-mono font-bold text-zinc-700">0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
