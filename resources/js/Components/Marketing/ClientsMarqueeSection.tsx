'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface ClientLogo {
  name: string;
  src: string;
}

const row1Logos: ClientLogo[] = [
  { name: 'Instax Fujifilm', src: '/images/clients/instax.png' },
  { name: 'Komdigi', src: '/images/clients/komdigi.png' },
  { name: 'Triv', src: '/images/clients/triv.png' },
  { name: 'Universitas Terbuka', src: '/images/clients/ut.png' },
  { name: 'OCBC', src: '/images/clients/ocbc.png' },
  { name: 'Labore', src: '/images/clients/labore.png' },
  { name: 'Depok Single Window', src: '/images/clients/dsw.png' },
  { name: 'Dusdukduk', src: '/images/clients/dusdukduk.png' },
  { name: 'Flecto', src: '/images/clients/flecto.png' },
  { name: 'Aza Wear', src: '/images/clients/azawear.png' },
  { name: 'Andalusia Property', src: '/images/clients/andalusia.png' },
];

const row2Logos: ClientLogo[] = [
  { name: 'Gappu', src: '/images/clients/gappu.png' },
  { name: 'Nav Karaoke', src: '/images/clients/nav.png' },
  { name: 'Bunda Medic Hospital', src: '/images/clients/bundamedic.png' },
  { name: 'Sands Bosum Indonesia', src: '/images/clients/sandsbosum.png' },
  { name: 'EBright Skin', src: '/images/clients/ebrightskin.png' },
  { name: 'Bromen', src: '/images/clients/bromen.png' },
  { name: 'Essenza Indonesia', src: '/images/clients/essenza.png' },
  { name: 'Draisal', src: '/images/clients/draisal.png' },
  { name: 'Iplaco Granite', src: '/images/clients/iplaco.png' },
  { name: 'Syuvera', src: '/images/clients/syuvera.png' },
  { name: 'Indo Makmur Food', src: '/images/clients/indomakmur.png' },
  { name: 'Kementrian Pertanian', src: '/images/clients/kementan.png' },
];

const row3Logos: ClientLogo[] = [
  { name: 'Summarecon', src: '/images/clients/summarecon.png' },
  { name: 'Alfa One', src: '/images/clients/alfaone.png' },
  { name: 'Binus Graduate Program', src: '/images/clients/binusgrad.png' },
  { name: 'Ibu Women Children Care', src: '/images/clients/ibucare.png' },
  { name: 'RS Happy Land Jogja', src: '/images/clients/happyland.png' },
  { name: 'SNA Medika', src: '/images/clients/snamedika.png' },
  { name: 'RS Tjandra Medika Hospital', src: '/images/clients/tjandramedika.png' },
  { name: 'National Battery', src: '/images/clients/nationalbattery.png' },
  { name: 'Binus School', src: '/images/clients/binusschool.png' },
  { name: 'RS Onkology Surabaya', src: '/images/clients/rsonkology.png' },
  { name: 'Universitas Inaba', src: '/images/clients/inaba.png' },
  { name: 'Plaza Mini Indonesia', src: '/images/clients/plazamini.png' },
];

function LogoRow({
  logos,
  direction = 'left',
  speed = 32,
}: {
  logos: ClientLogo[];
  direction?: 'left' | 'right';
  speed?: number;
}) {
  // Duplicate logos 3 times to ensure a seamless infinite loop inside container
  const items = [...logos, ...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-1">
      <div
        className={`flex w-max items-center ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        } hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((logo, idx) => (
          <div
            key={idx}
            className="w-[155px] min-w-[155px] md:w-[170px] md:min-w-[170px] h-[44px] shrink-0 flex items-center justify-center px-3"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="max-w-[110px] max-h-[34px] w-auto h-auto object-contain select-none pointer-events-none transition-opacity opacity-90 hover:opacity-100"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientsMarqueeSection() {
  return (
    <section className="relative py-14 md:py-16 bg-white overflow-hidden border-b border-zinc-100">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333333%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-33.333333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Header Container - Max width 666px persis seperti Figma */}
      <div className="max-w-[680px] mx-auto px-4 text-center mb-10 md:mb-12">
        <p className="text-[12px] font-semibold text-[#01A0CA] uppercase tracking-[0.5px] leading-5">
          Diverse Experience
        </p>
        <h3 className="mt-1.5 text-[17px] md:text-[18px] font-semibold text-[#1e2022] leading-[26px]">
          Telah dipercaya ribuan klien, dari UMKM, brand ternama, pemerintahan, hingga perusahaan multinasional.
        </h3>
      </div>

      {/* Boxed Marquee Container - Max width 1110px persis seperti Figma (tidak full-bleed) */}
      <div className="max-w-[1110px] mx-auto px-4 sm:px-6 relative">
        {/* Soft edge gradient masks inside the container */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-4 sm:right-6 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* 3 Rows with compact height & spacing */}
        <div className="space-y-4 md:space-y-5 overflow-hidden">
          {/* Row 1: Ke Kiri */}
          <LogoRow logos={row1Logos} direction="left" speed={30} />

          {/* Row 2: Ke Kanan */}
          <LogoRow logos={row2Logos} direction="right" speed={34} />

          {/* Row 3: Ke Kiri */}
          <LogoRow logos={row3Logos} direction="left" speed={28} />
        </div>
      </div>

      {/* Bottom CTA Pill button */}
      <div className="flex justify-center pt-10 md:pt-12">
        <Link
          href="/our-clients"
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[#e7eaf3] bg-white text-[13px] md:text-sm shadow-xs hover:border-[#01A0CA] transition group cursor-pointer"
        >
          <span className="text-[#677788]">Lihat selengkapnya</span>
          <span className="font-semibold text-[#01A0CA]">Our Clients</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#01A0CA] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
