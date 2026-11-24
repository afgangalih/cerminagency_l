'use client';

import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, X } from 'lucide-react';
import { CerminLogo } from '@/Components/UI/CerminLogo';

export function AboutAgencySection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // 4 baris komparasi — ringkas, padat, tidak wrapping berlebih agar tabel memanjang ke samping (landscape)
  const rows = [
    {
      cerminTitle: 'Studio Fisik & Kamera 4K',
      cerminSub: 'Syuting studio Malang, lighting terarah & kamera sinema.',
      othersText: 'Hanya editing video seadanya.',
    },
    {
      cerminTitle: 'Layanan Siap 7 Hari (SLA < 24 Jam)',
      cerminSub: 'Siap merespons setiap hari tanpa batasan weekdays.',
      othersText: 'Hanya saat weekdays.',
    },
    {
      cerminTitle: 'Kalender Konten & Update Rutin',
      cerminSub: 'Komunikasi intens, jadwal teratur & transparan.',
      othersText: 'Seringkali sulit dihubungi.',
    },
    {
      cerminTitle: '94% Retensi & Track Record Teruji',
      cerminSub: 'Berpengalaman mengelola puluhan brand aktif.',
      othersText: 'Hasil belum tentu teruji.',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-16 md:py-24 bg-white overflow-hidden border-b border-zinc-100"
    >
      {/* Background SVG wave/pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/why-bg.png"
          alt=""
          className="absolute left-0 top-0 w-full h-[115%] object-cover object-left-top opacity-60 select-none"
          aria-hidden="true"
        />
      </div>

      {/* Main Container - Lebar & berjarak lega */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 xl:gap-28">

          {/* ======================================================= */}
          {/* SISI KIRI: Label + Judul + Paragraf + Video Card + Link  */}
          {/* ======================================================= */}
          <div className="w-full lg:w-[410px] shrink-0 space-y-4">

            {/* Label kecil */}
            <p className="text-xs uppercase tracking-[0.5px] font-semibold text-zinc-500 leading-none">
              WHY CHOOSE US?
            </p>

            {/* Heading */}
            <h2 className="text-[28px] md:text-[32px] font-bold leading-[38px] md:leading-[42px] text-zinc-900">
              <span className="text-[#01A0CA]">Cermin Kreatif.</span>
              {' '}Lebih dari Sekadar Rumah Produksi ✨
            </h2>

            {/* Sub-paragraf */}
            <p className="text-sm font-normal text-zinc-500 leading-[24px]">
              Kami percaya, persepsi brand yang kuat lahir dari standar visual sinematik, disiplin jadwal tanpa drama molor, dan komunikasi transparan sebagai partner pertumbuhan.
            </p>

            {/* Video Card */}
            <div className="pt-1.5 space-y-2">
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm"
                style={{ aspectRatio: '428 / 245' }}
              >
                <img
                  src="/images/why-video-thumb.jpg"
                  alt="Studio Produksi Cermin Kreatif Malang"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gelap ringan */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Badge kiri atas: "#1 Video Retainer Studio" */}
                <div className="absolute top-3.5 left-4 z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#01A0CA] text-white text-[11px] font-bold shadow-sm">
                    #1 Video Retainer Studio
                  </div>
                </div>

                {/* Tombol Play tengah — hanya ikon yang membesar saat hover */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-[62px] h-[62px] rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                    <Play className="w-5 h-5 ml-1 fill-zinc-900 text-zinc-900" />
                  </div>
                </div>
              </div>

              {/* Link bawah video */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-2 text-xs text-zinc-500 hover:text-[#01A0CA] transition cursor-pointer group pt-0.5"
              >
                <svg className="w-3 h-3 fill-zinc-500 group-hover:fill-[#01A0CA] transition shrink-0" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>
                  Lihat bagaimana{' '}
                  <span className="font-bold text-zinc-700 group-hover:text-[#01A0CA] transition">Cermin Kreatif</span>
                  {' '}memproduksi konten brand Anda
                </span>
              </button>
            </div>
          </div>

          {/* ======================================================= */}
          {/* SISI KANAN: Comparison Table Card                        */}
          {/* Berjarak jauh dari gambar/video kiri (gap-20 / gap-28)    */}
          {/* ======================================================= */}
          <div className="w-full lg:w-[620px] lg:max-w-[640px] shrink-0 min-w-0">
            <div
              className="bg-white border border-[#e7eaf3] rounded-2xl overflow-hidden"
              style={{ boxShadow: '0px 4px 20px 0px rgba(15,23,42,0.05)' }}
            >

              {/* Table Header */}
              <div className="flex border-b border-[#e7eaf3]">
                {/* Kolom kiri header: Logo Cermin */}
                <div className="flex items-center justify-center px-4 py-4 bg-[#f7faff]" style={{ width: '54%' }}>
                  <CerminLogo size="sm" textColor="text-zinc-900" />
                </div>
                {/* Kolom kanan header: "OTHER SERVICES" */}
                <div className="flex items-center justify-center px-4 py-4 bg-white border-l border-[#e7eaf3]" style={{ width: '46%' }}>
                  <span className="text-sm font-bold text-zinc-800 uppercase tracking-wider text-center">
                    OTHER SERVICES
                  </span>
                </div>
              </div>

              {/* Table Rows */}
              {rows.map((row, idx) => (
                <div
                  key={idx}
                  className="flex border-t border-[#e7eaf3] min-h-[64px]"
                >
                  {/* Kolom kiri: Cermin (bg-[#f7faff]) */}
                  <div
                    className="flex items-center gap-3 px-5 py-3.5 bg-[#f7faff]"
                    style={{ width: '54%' }}
                  >
                    {/* Green check icon */}
                    <CheckCircle2
                      className="w-4 h-4 text-[#00c9a7] shrink-0 mt-0.5"
                      fill="none"
                      strokeWidth={2.5}
                    />
                    <div className="min-w-0 leading-tight">
                      <p className="text-[13.5px] md:text-[14px] font-bold text-zinc-900">
                        {row.cerminTitle}
                      </p>
                      <p className="text-[12px] md:text-[12.5px] font-normal text-zinc-500 mt-0.5">
                        {row.cerminSub}
                      </p>
                    </div>
                  </div>

                  {/* Kolom kanan: Others (bg-white) */}
                  <div
                    className="flex items-center gap-3 px-5 py-3.5 bg-white border-l border-[#e7eaf3]"
                    style={{ width: '46%' }}
                  >
                    {/* Red X icon */}
                    <XCircle
                      className="w-4 h-4 text-[#ed4c78] shrink-0"
                      fill="none"
                      strokeWidth={2.5}
                    />
                    <p className="text-[13px] md:text-[13.5px] font-normal text-zinc-500 leading-snug">
                      {row.othersText}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>

      {/* =========================================================== */}
      {/* VIDEO MODAL                                                  */}
      {/* =========================================================== */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-zinc-950">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Cermin Kreatif Studio Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
