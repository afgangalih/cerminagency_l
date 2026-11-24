'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface SiblingCrossSellProps {
  currentSlug: string;
}

export function ServiceSiblingCrossSell({ currentSlug }: SiblingCrossSellProps) {
  const allSubServices = [
    {
      slug: 'jasa-kelola-instagram',
      name: 'Jasa Kelola Instagram',
      tag: 'Feed & Reels',
      description: 'Optimasi estetika grid feed 3x3 bersambung, Reels beritme tinggi, dan copywriting caption interaktif.',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#01A0CA]/10 p-2 text-[#01A0CA] flex items-center justify-center">
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
      ),
    },
    {
      slug: 'jasa-kelola-tiktok',
      name: 'Jasa Kelola TikTok',
      tag: 'FYP & Video Pendek',
      description: 'Penulisan hook 3 detik pertama memikat, kurasi sound tren harian, dan editing dinamis video vertikal 9:16.',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-black p-2 text-white flex items-center justify-center">
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-1.02-.08A6.34 6.34 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V9.37a8.16 8.16 0 0 0 3.91.99V6.91a4.78 4.78 0 0 1-.002-.22z"/>
          </svg>
        </div>
      ),
    },
    {
      slug: 'jasa-kelola-facebook',
      name: 'Jasa Kelola Facebook',
      tag: 'Fanpage & Komunitas',
      description: 'Pengelolaan Facebook Fanpage bisnis, artikel storytelling persuasif, dan penataan album katalog produk.',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#1877F2]/10 p-2 text-[#1877F2] flex items-center justify-center">
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      ),
    },
  ];

  // Exclude current platform from cross-sell list
  const otherPlatforms = allSubServices.filter((s) => s.slug !== currentSlug);

  return (
    <section className="py-20 bg-zinc-50/70 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Bersih, Tanpa Pill Badge) */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            Platform Lainnya
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212] tracking-tight">
            Social Media Lainnya
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed font-normal">
            Eksplorasi layanan pengelolaan platform media sosial lainnya untuk memperkuat jangkauan brand Anda.
          </p>
        </div>

        {/* Other Sibling Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {otherPlatforms.map((platform) => (
            <div
              key={platform.slug}
              className="bg-white rounded-2xl border border-zinc-200/90 p-7 flex flex-col justify-between hover:border-[#01A0CA]/60 hover:shadow-md transition duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {platform.icon}
                  <span className="text-xs font-mono font-bold text-[#01A0CA]">
                    {platform.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-[#121212] group-hover:text-[#01A0CA] transition leading-snug">
                    {platform.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mt-2">
                    {platform.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-zinc-100 flex items-center justify-between">
                <Link
                  href={`/services/social-media-management/${platform.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#01A0CA] hover:text-[#008db3] transition"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
