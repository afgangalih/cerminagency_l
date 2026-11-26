'use client';

import React from 'react';
import { Lock, MessageSquare, X, Receipt } from 'lucide-react';
import { useAgency } from '@/context/AgencyContext';

interface LockedFeatureModalProps {
  onClose: () => void;
}

export function LockedFeatureModal({ onClose }: LockedFeatureModalProps) {
  const { selectedClient } = useAgency();

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo Tim Cermin Kreatif! 👋\n` +
      `Saya *${selectedClient.name}* dari brand *${selectedClient.business}* (${selectedClient.instagram}).\n\n` +
      `📄 No. Faktur: ${selectedClient.invoiceNumber}\n` +
      `💳 Nilai DP 50%: ${selectedClient.dpAmount}\n\n` +
      `Saya ingin mengonfirmasi pembayaran DP agar akses kalender produksi & jadwal studio segera dibuka. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative text-center animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-sm">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-semibold text-zinc-900">Fitur Terkunci — Menunggu Verifikasi DP</h3>
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed font-light">
          Kalender distribusi konten, pengajuan request, dan progres studio Malang akan terbuka otomatis setelah pembayaran DP 50% diverifikasi oleh tim Admin Cermin Kreatif.
        </p>

        <div className="mt-4 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-left text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-[#01A0CA]" />
              No. Faktur
            </span>
            <span className="font-mono font-semibold text-zinc-900">{selectedClient.invoiceNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Tagihan DP 50%</span>
            <span className="font-bold text-amber-700">{selectedClient.dpAmount}</span>
          </div>
        </div>

        <div className="mt-6 space-y-2.5">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-3 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>Konfirmasi Pembayaran DP via WhatsApp</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-medium text-xs transition cursor-pointer"
          >
            Mengerti, Kembali ke Ringkasan
          </button>
        </div>
      </div>
    </div>
  );
}
