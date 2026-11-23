'use client';

import React from 'react';
import { useAgency } from '@/context/AgencyContext';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';

interface RetainerPlansViewProps {
  onBack: () => void;
}

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Growth',
    subtitle: 'Cocok untuk brand lokal yang memulai konsistensi ritme video mingguan.',
    price: 'Rp 7.500.000',
    period: '/bln',
    dp: 'Rp 3.750.000',
    reels: '8 Video',
    posts: '12 Konten',
    shoots: '1x Sesi Studio/Lokasi',
    sla: '48 Jam Peninjauan',
    revisions: '2x Putaran Minor',
    features: [
      'Riset naskah & hook bulanan',
      'Penyuntingan ritme dinamis Shorts & Reels',
      'Akses Portal Peninjauan Klien',
      'Penyimpanan raw footage Google Drive'
    ],
    highlighted: false,
    badge: null,
  },
  {
    id: 'signature',
    name: 'Signature Retainer',
    subtitle: 'Standar utama Cermin Kreatif untuk F&B, lifestyle, dan klinik estetika.',
    price: 'Rp 13.500.000',
    period: '/bln',
    dp: 'Rp 6.750.000',
    reels: '15 Video',
    posts: '20 Konten',
    shoots: '2x Sesi Studio/Lokasi',
    sla: '24 Jam (Prioritas)',
    revisions: 'Revisi Minor Tanpa Batas',
    features: [
      'Dedicated Video Editor & Motion Designer',
      'Penyusunan Kalender Editorial 1–31',
      'Supervisi Creative Lead saat syuting',
      'Dashboard Komando Real-Time Agensi',
      'Analitik performa hook & retensi bulanan'
    ],
    highlighted: true,
    badge: 'Paling Banyak Dipilih',
  },
  {
    id: 'enterprise',
    name: 'Scale Enterprise',
    subtitle: 'Eksekusi agresif omnichannel multi-talent dan supervisi produser di lokasi.',
    price: 'Rp 25.000.000',
    period: '/bln',
    dp: 'Rp 12.500.000',
    reels: '30 Video',
    posts: '35 Konten',
    shoots: '4x Sesi Studio/Lokasi',
    sla: '12 Jam Peninjauan Kilat',
    revisions: 'Revisi Minor Tanpa Batas',
    features: [
      'On-site Producer & Pengarah Bakat (Talent)',
      'Multi-Platform (IG Reels, TikTok, YT Shorts)',
      'Prioritas slot studio fisik Malang 48 jam',
      'Custom BGM berlisensi komersial',
      'SLA tanggap darurat konten tren viral'
    ],
    highlighted: false,
    badge: 'Skala Agresif',
  },
];

export function RetainerPlansView({ onBack }: RetainerPlansViewProps) {
  const { selectedClient, triggerNotification } = useAgency();

  const handleContactBilling = (planName: string) => {
    const text = encodeURIComponent(
      `Halo Tim Billing Cermin Kreatif!\n` +
      `Saya ingin berkonsultasi mengenai paket "${planName}" untuk brand ${selectedClient?.business || 'kami'}. Mohon informasi ketersediaan slot produksi bulan ini. Terima kasih.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    triggerNotification(`Membuka WhatsApp Billing untuk paket ${planName}.`);
  };

  const isClientUnlocked = selectedClient?.isUnlocked ?? false;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950 transition cursor-pointer shadow-2xs flex items-center gap-2 text-xs font-medium"
            title="Kembali ke Pusat Kendali"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Kembali</span>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">
              Paket Retainer & Skema Kontrak
            </h1>
            <p className="text-xs text-zinc-500 font-light mt-0.5">
              Matriks alokasi kuota video bulanan, jadwal syuting studio fisik, dan kebijakan pembayaran.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleContactBilling('Konsultasi Custom')}
          className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <span>Hubungi Billing</span>
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Active Client Retainer Summary (Zero Candy Badges, 100% Typographic Precision) */}
      {selectedClient && (
        <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                Konteks Klien Aktif
              </span>
              <div className="text-base font-semibold text-zinc-950 flex items-center gap-2 mt-0.5">
                <span>{selectedClient.business}</span>
                <span className="text-zinc-300">•</span>
                <span className="text-xs font-normal text-zinc-600">{selectedClient.package}</span>
              </div>
            </div>

            {/* Status: Honest Data Display (No Fake Green Marshmallow!) */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-zinc-400">Status Kontrak:</span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200/80 bg-zinc-50/80 text-zinc-700 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${isClientUnlocked ? 'bg-emerald-500' : 'bg-amber-500'} shrink-0`} />
                <span>{selectedClient.status}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-zinc-50/60 border border-zinc-200/60">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Alokasi Reels & TikTok</div>
              <div className="text-xl font-bold font-inter text-zinc-950 mt-1">
                {selectedClient.reelsUsed} <span className="text-xs font-normal text-zinc-400 font-mono">/ {selectedClient.reelsMax} Video</span>
              </div>
              <div className="w-full bg-zinc-200/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div 
                  className="bg-zinc-900 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (selectedClient.reelsUsed / (selectedClient.reelsMax || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50/60 border border-zinc-200/60">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Alokasi Feed & Carousel</div>
              <div className="text-xl font-bold font-inter text-zinc-950 mt-1">
                {selectedClient.postsUsed} <span className="text-xs font-normal text-zinc-400 font-mono">/ {selectedClient.postsMax} Konten</span>
              </div>
              <div className="w-full bg-zinc-200/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div 
                  className="bg-zinc-900 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (selectedClient.postsUsed / (selectedClient.postsMax || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50/60 border border-zinc-200/60">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Nilai Kontrak Bulanan</div>
              <div className="text-xl font-bold font-inter text-zinc-950 mt-1">
                {selectedClient.totalValue}
              </div>
              <div className="text-xs text-zinc-500 mt-1 font-mono">
                Termin 1 (DP 50%): {selectedClient.dpAmount}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3 Tier Comparison Grid (Clean Spec Sheet, Zero Icon Clutter) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between transition ${
              pkg.highlighted
                ? 'border-zinc-900 bg-white ring-1 ring-zinc-900/10 shadow-xs'
                : 'border-zinc-200/90 bg-white shadow-2xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Tier Retainer</span>
                {pkg.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-900 text-white">
                    {pkg.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-zinc-950">{pkg.name}</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed font-light">{pkg.subtitle}</p>

              <div className="mt-5 pb-5 border-b border-zinc-100">
                <span className="text-2xl sm:text-3xl font-bold font-inter text-zinc-950 tracking-tight">
                  {pkg.price}
                </span>
                <span className="text-xs text-zinc-400 font-mono ml-1">{pkg.period}</span>
                <div className="text-[11px] text-zinc-500 font-mono mt-1">
                  Uang Muka (DP 50%): {pkg.dp}
                </div>
              </div>

              {/* Clean Spec Rows (No redundant icons on every line!) */}
              <div className="py-4 space-y-2.5 text-xs border-b border-zinc-100">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Video Reels & TikTok</span>
                  <span className="font-semibold text-zinc-900 font-mono">{pkg.reels}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Feed & Carousel</span>
                  <span className="font-semibold text-zinc-900 font-mono">{pkg.posts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Sesi Syuting Studio</span>
                  <span className="font-semibold text-zinc-900">{pkg.shoots}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Target SLA Peninjauan</span>
                  <span className="font-semibold text-zinc-900">{pkg.sla}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Batas Revisi Minor</span>
                  <span className="font-semibold text-zinc-900">{pkg.revisions}</span>
                </div>
              </div>

              {/* Service Inclusions */}
              <div className="pt-4 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  Cakupan Layanan:
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-600 font-light">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-zinc-400 font-mono shrink-0">—</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-100">
              <button
                onClick={() => handleContactBilling(pkg.name)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium transition cursor-pointer text-center ${
                  pkg.highlighted
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-2xs'
                    : 'border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-800'
                }`}
              >
                Pilih / Konsultasi Paket
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contract & Payment Policy */}
      <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white shadow-2xs space-y-3">
        <h4 className="text-sm font-semibold text-zinc-900">
          Ketentuan Pembayaran & Kebijakan Retainer
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-600 font-light leading-relaxed">
          <div className="p-4 rounded-xl bg-zinc-50/50 border border-zinc-200/60 space-y-1">
            <strong className="font-medium text-zinc-900 block">1. Skema Termin Pembayaran 50:50</strong>
            <p>
              Termin 1 (DP 50%) wajib diselesaikan sebelum tim memulai riset naskah dan alokasi jadwal syuting studio. Termin 2 (Pelunasan 50%) ditagihkan di akhir siklus 30 hari sebelum pengiriman bundle master video resolusi tinggi.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50/50 border border-zinc-200/60 space-y-1">
            <strong className="font-medium text-zinc-900 block">2. Kebijakan Anti-Scope Creep</strong>
            <p>
              Setiap draf konten berhak mendapatkan hingga 2 putaran revisi minor (teks, musik, urutan klip). Perubahan konsep naskah atau pengambilan ulang footage di luar brief awal akan ditagihkan sebagai add-on produksi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
