'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

export function HighlightBlueSection() {
  const cards = [
    {
      title: 'Social Media Management',
      subtitle: 'Customized Content Strategy',
      buttonText: 'Selengkapnya',
      href: '#services',
      // Card 1: 3D Calendar Illustration
      visual: (
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Isometric Calendar Body */}
          <div className="w-24 h-28 sm:w-28 sm:h-30 bg-white rounded-xl shadow-[0_15px_30px_-8px_rgba(0,0,0,0.18)] border border-zinc-100 p-2.5 flex flex-col justify-between transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            {/* Calendar Header with Rings */}
            <div className="border-b border-zinc-100 pb-1.5 flex items-center justify-between">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="w-8 h-1.5 rounded-full bg-zinc-200" />
            </div>
            {/* Calendar Grid with Colorful Status Dots */}
            <div className="grid grid-cols-4 gap-1.5 py-1">
              <div className="w-4 h-4 rounded-md bg-zinc-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#01A0CA]" />
              </div>
              <div className="w-4 h-4 rounded-md bg-zinc-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <div className="w-4 h-4 rounded-md bg-zinc-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="w-4 h-4 rounded-md bg-zinc-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#01A0CA]" />
              </div>
              <div className="w-4 h-4 rounded-md bg-zinc-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="w-4 h-4 rounded-md bg-zinc-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#01A0CA]" />
              </div>
              <div className="w-4 h-4 rounded-md bg-zinc-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <div className="w-4 h-4 rounded-md bg-zinc-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
              </div>
            </div>
            {/* Bottom Bar */}
            <div className="w-full h-2 rounded bg-blue-50/80 flex items-center px-1">
              <span className="w-10 h-1 rounded bg-[#01A0CA]/60" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Instagram & TikTok Feeds',
      subtitle: 'Video Vertikal 9:16 4K',
      buttonText: 'Selengkapnya',
      href: '#works',
      // Card 2: 3D Floating Social Media / App Icons (Instagram, TikTok, YouTube, Facebook)
      visual: (
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2 transform rotate-6 hover:rotate-0 transition-transform duration-300">
            {/* Instagram 3D Icon */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-2 text-white shadow-md flex items-center justify-center">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            {/* TikTok / Video 3D Icon */}
            <div className="w-11 h-11 rounded-xl bg-black p-2 text-white shadow-md flex items-center justify-center">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-1.02-.08A6.34 6.34 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V9.37a8.16 8.16 0 0 0 3.91.99V6.91a4.78 4.78 0 0 1-.002-.22z"/>
              </svg>
            </div>
            {/* Facebook 3D Icon */}
            <div className="w-11 h-11 rounded-xl bg-[#1877F2] p-2 text-white shadow-md flex items-center justify-center">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            {/* YouTube 3D Icon */}
            <div className="w-11 h-11 rounded-xl bg-[#FF0000] p-2 text-white shadow-md flex items-center justify-center">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Graphic Design (3x3)',
      subtitle: 'Identitas & Grid Feed',
      buttonText: 'Selengkapnya',
      href: '#services',
      // Card 3: 3D Grid 3x3 + Alert / Approval Bubble
      visual: (
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Grid Feed 3x3 Mockup in background */}
          <div className="grid grid-cols-3 gap-1 p-2 bg-zinc-50 rounded-xl border border-zinc-200/80 shadow-md transform -rotate-3 hover:rotate-0 transition-transform">
            <div className="w-5 h-5 rounded-sm bg-[#01A0CA]" />
            <div className="w-5 h-5 rounded-sm bg-zinc-200" />
            <div className="w-5 h-5 rounded-sm bg-[#01A0CA]/40" />
            <div className="w-5 h-5 rounded-sm bg-zinc-200" />
            <div className="w-5 h-5 rounded-sm bg-[#01A0CA]" />
            <div className="w-5 h-5 rounded-sm bg-zinc-200" />
            <div className="w-5 h-5 rounded-sm bg-[#01A0CA]/60" />
            <div className="w-5 h-5 rounded-sm bg-zinc-200" />
            <div className="w-5 h-5 rounded-sm bg-[#01A0CA]" />
          </div>
          {/* Floating SLA & Approval Badge */}
          <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#FFB800] border-2 border-white shadow-lg flex items-center justify-center">
            <span className="text-white font-black text-sm font-mono">✓</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-[#01A0CA] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        
        {/* Section Header (Sesuai Konteks Cermin Kreatif) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white text-zinc-900 font-semibold text-xs sm:text-sm shadow-sm">
            Tumbuh Bersama Cermin
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            #1 Creative Video &amp; Retainer Studio
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto font-normal">
            Tiga pilar layanan terpadu untuk membentuk persepsi visual brand Anda agar berkelas dan mendominasi linimasa.
          </p>
        </div>

        {/* 3 Highlight Cards Grid with Yellow Decorative Stripes */}
        <div className="relative">
          
          {/* Yellow Diagonal Stripes (Persis di kanan atas kartu 3 pada referensi) */}
          <div className="hidden lg:block absolute -top-7 -right-3 w-28 h-14 pointer-events-none z-0">
            <div 
              className="w-full h-full opacity-90"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #FFC72C, #FFC72C 5px, transparent 5px, transparent 12px)'
              }}
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 text-zinc-900 shadow-xl border border-white/60 flex items-center justify-between min-h-[160px] sm:min-h-[175px] hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden"
              >
                {/* Left Side: Title & Action Button */}
                <div className="flex flex-col justify-between h-full space-y-4 max-w-[55%]">
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-[#141B2D] tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[11px] font-medium text-zinc-400 mt-1">
                      {card.subtitle}
                    </p>
                  </div>

                  <div>
                    <a
                      href={card.href}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#141B2D] hover:bg-[#0A0F1A] text-white text-xs font-bold transition shadow-xs group-hover:bg-[#01A0CA]"
                    >
                      <span>{card.buttonText}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Right Side: 3D Visual Asset */}
                <div className="shrink-0">
                  {card.visual}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
