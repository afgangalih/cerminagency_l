'use client';

import React from 'react';
import { PricingPackage } from '@/types/service';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface ServicePricingTiersProps {
  packages: PricingPackage[];
  serviceTitle: string;
}

export function ServicePricingTiers({ packages, serviceTitle }: ServicePricingTiersProps) {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-zinc-50/70 border-b border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#01A0CA] font-bold bg-[#01A0CA]/10 px-3.5 py-1 rounded-full inline-block">
            PAKET RETAINER BULANAN
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight">
            Pilihan Paket {serviceTitle}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Transparansi biaya tanpa biaya tersembunyi. Skema termin aman: 50% DP di muka sebelum pra-produksi dan 50% pelunasan di akhir siklus.
          </p>
        </div>

        {/* 3 Packages Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col justify-between transition duration-300 relative ${
                pkg.is_popular
                  ? 'bg-white border-2 border-[#01A0CA] shadow-xl shadow-[#01A0CA]/10 lg:-translate-y-2'
                  : 'bg-white border border-zinc-200/90 shadow-sm hover:border-zinc-300'
              }`}
            >
              {/* Popular Ribbon */}
              {pkg.is_popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#01A0CA] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Paling Diminati Klien</span>
                </div>
              )}

              {/* Package Header */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#121212]">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 min-h-[32px] leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-b border-zinc-100 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-[#121212] tracking-tight">
                    {pkg.price}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500">
                    {pkg.period}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                    Deliverables Termasuk:
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-700 leading-relaxed font-medium">
                        <div className="w-4 h-4 rounded-full bg-blue-50 text-[#01A0CA] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-8 mt-6 border-t border-zinc-100">
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                    `Halo Tim Cermin Kreatif! Saya tertarik untuk konsultasi Paket *${pkg.name}* untuk layanan *${serviceTitle}*. Mohon info ketersediaan slot syuting/produksi bulan ini.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    pkg.is_popular
                      ? 'bg-[#01A0CA] hover:bg-[#008db3] text-white shadow-md shadow-[#01A0CA]/25 hover:shadow-lg'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                  }`}
                >
                  <span>Pilih Paket {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Guarantee Note */}
        <div className="mt-12 text-center text-xs text-zinc-500">
          Butuh penyesuaian kuota atau format kustom?{' '}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#01A0CA] font-bold hover:underline"
          >
            Diskusikan kebutuhan spesifik brand Anda via WhatsApp &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}

