'use client';

import React from 'react';
import { Lock, MessageCircle, X, Receipt } from 'lucide-react';
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
        `Saya ingin mengonfirmasi pembayaran DP agar akses kalender konten & progres desain segera dibuka. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 !mt-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-100 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-7 relative text-center animate-in fade-in zoom-in-95">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
          <Lock className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-slate-900">
          Fitur Terkunci — Menunggu Verifikasi DP
        </h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Kalender distribusi konten, pengajuan request, dan progres desain &amp; aset akan terbuka otomatis setelah pembayaran DP 50% diverifikasi oleh tim Admin Cermin Kreatif.
        </p>

        <div className="mt-4 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 text-left text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-[#3B9BF8]" />
              No. Faktur
            </span>
            <span className="font-mono font-bold text-slate-900">
              {selectedClient.invoiceNumber}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Tagihan DP 50%</span>
            <span className="font-bold text-amber-600">
              {selectedClient.dpAmount}
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full py-2.5 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Konfirmasi Pembayaran DP via WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs transition cursor-pointer"
          >
            Mengerti, Kembali ke Ringkasan
          </button>
        </div>
      </div>
    </div>
  );
}
