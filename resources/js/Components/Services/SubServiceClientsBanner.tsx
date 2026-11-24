'use client';

import React from 'react';

interface ClientLogo {
  name: string;
  src: string;
}

const clientLogos: ClientLogo[] = [
  { name: 'Instax Fujifilm', src: '/images/clients/instax.png' },
  { name: 'Komdigi', src: '/images/clients/komdigi.png' },
  { name: 'Triv', src: '/images/clients/triv.png' },
  { name: 'Universitas Terbuka', src: '/images/clients/ut.png' },
  { name: 'OCBC', src: '/images/clients/ocbc.png' },
  { name: 'Labore', src: '/images/clients/labore.png' },
  { name: 'Gappu', src: '/images/clients/gappu.png' },
  { name: 'RS Onkology Surabaya', src: '/images/clients/rsonkology.png' },
  { name: 'Summarecon', src: '/images/clients/summarecon.png' },
  { name: 'Binus School', src: '/images/clients/binusschool.png' },
  { name: 'Nav Karaoke', src: '/images/clients/nav.png' },
  { name: 'Dusdukduk', src: '/images/clients/dusdukduk.png' },
];

export function SubServiceClientsBanner() {
  const items = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="relative py-7 md:py-8 bg-[#01A0CA] overflow-hidden border-b border-[#008db3]">
      <style>{`
        @keyframes subservice-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333333%, 0, 0); }
        }
        .animate-subservice-marquee {
          animation: subservice-marquee 32s linear infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 mb-3.5 text-center">
        <p className="text-xs font-bold tracking-widest text-white/95 uppercase font-mono">
          Dipercaya berbagai brand &amp; bisnis di Indonesia
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Soft edge blur masks with Cermin Blue #01A0CA */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#01A0CA] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#01A0CA] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max items-center animate-subservice-marquee hover:[animation-play-state:paused]">
          {items.map((logo, idx) => (
            <div
              key={idx}
              className="w-[150px] min-w-[150px] md:w-[170px] md:min-w-[170px] h-[36px] shrink-0 flex items-center justify-center px-4"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-w-[110px] max-h-[26px] w-auto h-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition duration-200 select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
