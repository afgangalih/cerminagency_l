'use client';

import React from 'react';
import { Link } from '@inertiajs/react';

export function ClientHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-28 sm:pt-24 sm:pb-36 min-h-[380px] sm:min-h-[440px] flex items-center">
      {/* Digital Creative Agency Workspace Background (subtle softening at 95% opacity over clean white base) */}
      <img
        src="/images/clients/client-hero-workspace.webp"
        alt="Ruang Kerja Kreatif Desain & Manajemen Media Sosial Cermin Agency"
        className="absolute inset-0 w-full h-full object-cover object-right md:object-center opacity-95"
        loading="eager"
        decoding="async"
      />

      {/* Directional Scrim: solid white protection on left text area, fading out to 0% on the right to preserve vibrant colors */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 36%, rgba(255,255,255,0.4) 62%, rgba(255,255,255,0) 100%)',
        }}
      />
      {/* Mobile top-to-bottom subtle darkening protection */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/95 via-white/80 to-transparent sm:hidden" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3.5">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-500">
            <Link href="/" className="text-[#01A0CA] hover:underline font-semibold transition">
              Home
            </Link>
            <span className="text-zinc-400">/</span>
            <span className="text-[#121212] font-semibold">Our Clients</span>
          </nav>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#121212] tracking-tight leading-[1.15]">
            Case Study Cermin Kreatif
          </h1>

          {/* Subtitle highlighting the 3 core pillars */}
          <p className="text-base sm:text-xl font-semibold text-[#01A0CA] leading-relaxed">
            Membangun persepsi visual &amp; pertumbuhan digital brand Anda.
          </p>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed pt-1">
            Eksplorasi portofolio strategi manajemen konten, estetika feeds Instagram &amp; TikTok, serta desain grafis terukur dari puluhan brand mitra kami.
          </p>
        </div>
      </div>

      {/* Seamless Curved Transition (Persis Figma Node 6:16072) */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none leading-none z-10">
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-16"
        >
          <path d="M0 72C360 12 1080 12 1440 72V72H0Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}

