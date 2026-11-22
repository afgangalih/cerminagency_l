'use client';

import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Play, CheckCircle2, ShieldCheck, Calendar, Grid3X3, Film, ArrowRight, ExternalLink } from 'lucide-react';

export function AppShowcaseSection() {
  const [activeTab, setActiveTab] = useState<'review' | 'calendar' | 'kanban'>('review');

  return (
    <section className="py-12 md:py-20 bg-white border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-inter uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
            TRANSPARANSI PRODUKSI
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Tinjau dan Setujui Konten Video dalam Satu Layar Terpadu
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-light mt-3">
            Tidak ada lagi draf video yang tenggelam di grup chat. Masuk ke portal untuk memutar video vertikal 9:16, mencatat poin revisi secara terstruktur, atau menyetujui penayangan dengan satu klik.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl p-1 bg-zinc-100 border border-zinc-200/90 shadow-2xs">
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'review'
                  ? 'bg-white text-zinc-950 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Pemutar Video 9:16</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-white text-zinc-950 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Simulasi Feed Instagram</span>
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'kanban'
                  ? 'bg-white text-zinc-950 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Alur Produksi 5 Tahap</span>
            </button>
          </div>
        </div>

        {/* Browser Mock Frame */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Browser Chrome Header */}
          <div className="bg-zinc-100/80 px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            </div>

            <div className="px-6 py-1 rounded-md bg-white border border-zinc-200 text-[11px] font-inter text-zinc-500 font-medium tracking-tight">
              portal.cerminkreatif.com/mavencoffee
            </div>

            <div className="text-[11px] font-inter text-zinc-400 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Aktif</span>
            </div>
          </div>

          {/* Interactive Screen Content */}
          <div className="p-6 sm:p-8 bg-zinc-50/50 min-h-[460px] flex items-center justify-center">
            {activeTab === 'review' && (
              <div className="w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 aspect-[9/16] rounded-xl overflow-hidden bg-zinc-950 relative shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80"
                    alt="Draf Video Kopi"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-4">
                    <span className="self-start text-[10px] font-inter uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/80 text-white font-semibold">
                      Draf V2 Siap Review
                    </span>
                    <div className="w-12 h-12 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center mx-auto shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                    <div className="text-white text-xs font-medium">
                      0:28 • Hook Storytelling Specialty
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-inter px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 font-semibold">
                      Menunggu Persetujuan
                    </span>
                    <span className="text-xs text-zinc-400 font-inter">
                      Revisi 1 dari maks. 2
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950">
                    Kisah Di Balik Biji Kopi Specialty: Mengapa Rasa Kami Berbeda?
                  </h3>

                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    Naskah fokus pada keunikan rasa biji kopi pegunungan Jawa Timur. Musik latar berirama santai dengan teks penjelas yang mudah terbaca.
                  </p>

                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-600 space-y-1.5">
                    <div className="font-semibold text-zinc-800 text-[11px] uppercase tracking-wider">
                      Catatan Tim Kreatif Agensi:
                    </div>
                    <p className="text-xs italic text-zinc-500 font-light">
                      "Warna sudah kami sesuaikan agar warna seduhan kopi terlihat lebih hangat. Siap rilis sesuai jadwal tgl 21."
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs hover:bg-emerald-700 transition">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Setujui Tayang (1-Klik)</span>
                    </button>
                    <button className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-700 font-semibold text-xs hover:bg-zinc-50 transition">
                      Beri Catatan Revisi
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-100">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">
                      Kalender Konten Bulan Ini (30 Hari Terjadwal)
                    </h4>
                    <p className="text-xs text-zinc-400">
                      8 Video Reels & 12 Post Feed terjadwal rapi
                    </p>
                  </div>
                  <span className="text-xs font-inter font-semibold text-zinc-700 px-2.5 py-1 rounded-md bg-zinc-100">
                    Oktober 2026
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, i) => (
                    <div key={i} className="text-[11px] font-semibold text-zinc-400 py-1">
                      {day}
                    </div>
                  ))}
                  {[...Array(28)].map((_, idx) => {
                    const hasContent = [3, 7, 10, 14, 17, 21, 24].includes(idx + 1);
                    return (
                      <div
                        key={idx}
                        className={`h-12 rounded-lg border flex flex-col items-center justify-between p-1 text-[11px] ${
                          hasContent
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-semibold'
                            : 'bg-zinc-50/50 border-zinc-100 text-zinc-400'
                        }`}
                      >
                        <span>{idx + 1}</span>
                        {hasContent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'kanban' && (
              <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-zinc-700">
                    <span>1. Naskah & Konsep</span>
                    <span className="text-zinc-400 font-inter">2</span>
                  </div>
                  <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs space-y-1">
                    <span className="text-[10px] font-inter text-zinc-500 font-medium">Reels #05</span>
                    <h5 className="font-semibold text-zinc-900 leading-snug">Tren Audio Barista Life</h5>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-zinc-700">
                    <span>2. Syuting Studio</span>
                    <span className="text-zinc-400 font-inter">3</span>
                  </div>
                  <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs space-y-1">
                    <span className="text-[10px] font-inter text-zinc-500 font-medium">Reels #06</span>
                    <h5 className="font-semibold text-zinc-900 leading-snug">Shooting Botol Cold Brew</h5>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-zinc-700">
                    <span>3. Siap Tayang</span>
                    <span className="text-emerald-600 font-inter font-bold">4</span>
                  </div>
                  <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs space-y-1">
                    <span className="text-[10px] font-inter text-emerald-700 font-semibold">Disetujui Klien</span>
                    <h5 className="font-semibold text-zinc-900 leading-snug">Eksplanasi Biji Kopi V1</h5>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
