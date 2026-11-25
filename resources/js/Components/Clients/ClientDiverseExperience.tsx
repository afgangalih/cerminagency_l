'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { ClientLogoItem } from '@/types/clientStory';

interface ClientDiverseExperienceProps {
  logos: ClientLogoItem[];
}

export function ClientDiverseExperience({ logos }: ClientDiverseExperienceProps) {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-t border-zinc-100">
      {/* Subtle Architectural Diagonal Cut on Right (Consistent with ServiceHero & Figma) */}
      <div
        className="hidden md:block absolute top-0 right-0 w-[34%] h-full bg-[#f4f6f9] pointer-events-none"
        style={{
          clipPath: 'polygon(32% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#01A0CA]">
            Diverse Experience
          </p>
          <p className="text-base sm:text-lg font-semibold text-[#121212] leading-relaxed">
            Telah dipercaya puluhan klien, dari UMKM bertumbuh, brand ternama, institusi pendidikan, hingga perusahaan berskala nasional.
          </p>
        </div>

        {/* Dynamic Logo Grid from Database */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-8 items-center justify-items-center">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="h-10 flex items-center justify-center px-2 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition duration-200"
            >
              <img
                src={logo.logo_url}
                alt={logo.name}
                loading="lazy"
                className="max-h-9 max-w-[125px] w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Portfolio Redirect Strip (Persis Figma Node 6:16262) */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-zinc-200 shadow-xs hover:border-[#01A0CA] text-xs sm:text-sm transition group"
          >
            <span className="text-zinc-500">Lihat hasil karya kami</span>
            <span className="text-zinc-200" aria-hidden="true">|</span>
            <span className="font-bold text-[#01A0CA] group-hover:underline">
              Portofolio &rsaquo;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

