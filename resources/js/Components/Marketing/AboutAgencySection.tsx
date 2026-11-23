'use client';

import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, X } from 'lucide-react';
import { CerminLogo } from '@/Components/UI/CerminLogo';

export function AboutAgencySection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // 4 baris komparasi — teks disesuaikan dengan konteks Cermin Kreatif
  const rows = [
    {
      cerminTitle: 'Studio Fisik & Produksi 4K Sinematik',
      cerminSub: 'Syuting di studio Malang + kamera cinema + tata lampu profesional.',
      othersText: 'Hanya editing video seadanya.',
    },
    {
      cerminTitle: 'Layanan Siap 7 Hari, SLA < 24 Jam',
      cerminSub: 'Siap merespons setiap hari, tidak terbatas hari kerja saja.',
      othersText: 'Hanya saat weekdays.',
    },
    {
      cerminTitle: 'Update Rutin & Kalender Konten Terstruktur',
      cerminSub: 'Pelaporan & sinkronisasi kalender konten bulanan yang tertib.',
      othersText: 'Seringkali sulit dihubungi.',
    },
    {
      cerminTitle: '94% Retensi Klien & Track Record Teruji',
      cerminSub: 'Berpengalaman mengelola puluhan brand F&B, klinik, dan lifestyle.',
      othersText: 'Hasil belum tentu teruji.',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-16 md:py-20 bg-white overflow-hidden border-b border-zinc-100"
    >
      {/* =========================================================== */}
      {/* Background: Figma diagonal-stripe/wavy SVG pattern          */}
      {/* Uses the downloaded Figma asset as a full-bleed bg          */}
      {/* =========================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/why-bg.png"
          alt=""
          className="absolute left-0 top-0 w-full h-[115%] object-cover object-left-top opacity-60 select-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">

          {/* ======================================================= */}
          {/* SISI KIRI: Label + Judul + Paragraf + Video Card + Link  */}
          {/* Width: 475px (Figma) → w-[475px] / lg:w-5/12            */}
          {/* ======================================================= */}
          <div className="w-full lg:w-[475px] shrink-0 space-y-4">

            {/* Label kecil */}
            <p className="text-xs uppercase tracking-[0.5px] font-semibold text-zinc-500 leading-[20px]">
              WHY CHOOSE US?
            </p>

            {/* Heading — teks biru untuk nama brand, hitam untuk sisanya */}
            <h2 className="text-[30px] font-semibold leading-[42px] text-zinc-900">
              <span className="text-[#01A0CA]">Cermin Kreatif.</span>
              {' '}Lebih dari Sekadar Rumah Produksi ✨
            </h2>

            {/* Sub-paragraf */}
            <p className="text-base font-normal text-zinc-500 leading-[26px]">
              Kami percaya, persepsi brand yang kuat lahir dari standar visual sinematik, disiplin jadwal tanpa drama molor, dan komunikasi transparan sebagai partner pertumbuhan.
            </p>

            {/* Video Card (gambar Figma persis: rasio 4:3-ish, border-radius 12px) */}
            <div className="pt-2 space-y-2">
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: '428 / 262' }}
              >
                {/* Figma downloaded thumbnail dari node imgContainer1 */}
                <img
                  src="/images/why-video-thumb.jpg"
                  alt="Studio Produksi Cermin Kreatif Malang"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gelap ringan — tidak berubah saat hover */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Badge kiri atas: "#1 Video Retainer Studio" */}
                <div className="absolute top-4 left-5 z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#01A0CA] text-white text-[11px] font-bold shadow-sm">
                    #1 Video Retainer Studio
                  </div>
                </div>

                {/* Tombol Play tengah — HANYA play button yang hover, bukan gambar */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-[68px] h-[68px] rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl group-active:scale-95 transition-all duration-300">
                    <Play className="w-6 h-6 ml-1 fill-zinc-900 text-zinc-900" />
                  </div>
                </div>
              </div>

              {/* Link bawah video — persis Figma: ikon play kecil + teks */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-2 text-[12.8px] text-zinc-500 hover:text-[#01A0CA] transition cursor-pointer group pt-1"
              >
                {/* Ikon play kecil (Font Awesome glyph → ganti dengan SVG) */}
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
          {/* Width: ~635px (Figma) → flex-1                          */}
          {/* ======================================================= */}
          <div className="w-full flex-1 min-w-0">
            <div
              className="bg-white border border-[#e7eaf3] rounded-xl overflow-hidden"
              style={{ boxShadow: '0px 2px 8px 0px rgba(15,23,42,0.04)' }}
            >

              {/* Table Header */}
              <div className="flex border-b border-[#e7eaf3]">
                {/* Kolom kiri header: Logo Cermin */}
                <div className="flex items-center justify-center px-3 py-4 bg-[#f7faff]" style={{ width: '57%' }}>
                  <CerminLogo size="sm" textColor="text-zinc-900" />
                </div>
                {/* Kolom kanan header: "OTHER SERVICES" */}
                <div className="flex items-center justify-center px-3 py-4 bg-white border-l border-[#e7eaf3]" style={{ width: '43%' }}>
                  <span className="text-base font-semibold text-zinc-900 uppercase tracking-wide text-center">
                    OTHER SERVICES
                  </span>
                </div>
              </div>

              {/* Table Rows */}
              {rows.map((row, idx) => (
                <div
                  key={idx}
                  className="flex border-t border-[#e7eaf3]"
                >
                  {/* Kolom kiri: Cermin (bg-[#f7faff]) */}
                  <div
                    className="flex items-center gap-3 px-6 py-4 bg-[#f7faff]"
                    style={{ width: '57%' }}
                  >
                    {/* Green check icon */}
                    <CheckCircle2
                      className="w-[15px] h-[15px] text-[#00c9a7] shrink-0 mt-0.5"
                      fill="none"
                      strokeWidth={2.5}
                    />
                    <div className="min-w-0">
                      <p className="text-[15.2px] font-bold text-zinc-900 leading-[24px]">
                        {row.cerminTitle}
                      </p>
                      <p className="text-[15.2px] font-normal text-zinc-500 leading-[24px]">
                        {row.cerminSub}
                      </p>
                    </div>
                  </div>

                  {/* Kolom kanan: Others (bg-white) */}
                  <div
                    className="flex items-center gap-3 px-6 py-4 bg-white border-l border-[#e7eaf3]"
                    style={{ width: '43%' }}
                  >
                    {/* Red X icon */}
                    <XCircle
                      className="w-[15px] h-[15px] text-[#ed4c78] shrink-0"
                      fill="none"
                      strokeWidth={2.5}
                    />
                    <p className="text-[15.2px] font-normal text-zinc-500 leading-[24px]">
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
