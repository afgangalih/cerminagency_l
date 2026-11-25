'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { Clock, MessageCircle } from 'lucide-react';
import { PortfolioServiceSummary } from '@/types/portfolio';

interface PortfolioStrategyCtaProps {
  services: PortfolioServiceSummary[];
}

export function PortfolioStrategyCta({ services }: PortfolioStrategyCtaProps) {
  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    'Halo Tim Cermin Kreatif! Saya baru melihat portofolio karya Cermin dan ingin konsultasi strategi konten untuk brand saya.'
  )}`;

  return (
    <section className="pt-8 pb-16 sm:pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0180A0] via-[#01A0CA] to-[#008db3] p-7 sm:p-10 text-white shadow-xl">
          {/* Subtle Ambient Circles */}
          <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 left-32 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy & Service Navigation */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/85 font-mono">
                Konsultasi Strategi Konten
              </p>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug tracking-tight">
                Mau hasil lebih terarah dengan target performa yang jelas?
              </h2>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl font-normal">
                Konsultasi gratis untuk kebutuhan konten dan visual brand Anda. Tim studio Cermin siap membantu menyusun strategi konten, kalender tayang, hingga produksi video vertikal 9:16 yang terukur.
              </p>

              {services.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold text-white transition"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Right Glass Card: Let's Talk */}
            <div className="lg:col-span-5 flex lg:justify-end">
              <div className="w-full max-w-[330px] rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 p-6 text-center space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    Let&apos;s Talk
                  </h3>
                  <p className="text-xs text-white/85">
                    Konsultasi bersama tim kreatif studio kami
                  </p>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-[#121212] text-xs sm:text-sm font-extrabold shadow-lg transition transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]/15" />
                  <span>Konsultasi Gratis Sekarang</span>
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/80 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Respon cepat 1x24 jam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

