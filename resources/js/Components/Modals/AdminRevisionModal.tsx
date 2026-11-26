'use client';

import React, { useState } from 'react';
import { ContentItem } from '@/types';
import { useAgency } from '@/context/AgencyContext';
import { X, Send, Sparkles } from 'lucide-react';

interface AdminRevisionModalProps {
  item: ContentItem;
  onClose: () => void;
}

export function AdminRevisionModal({ item, onClose }: AdminRevisionModalProps) {
  const { submitRevisionFix } = useAgency();
  const [resolutionNote, setResolutionNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRevisionFix(item.id, resolutionNote);
    onClose();
  };

  const latestFeedback = item.feedbackHistory[item.feedbackHistory.length - 1];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-100 w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-7 relative animate-in fade-in zoom-in-95">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Kirim Draf Revisi V2</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Konten: <strong className="text-slate-800">{item.title}</strong>
            </p>
          </div>
        </div>

        {latestFeedback && (
          <div className="my-4 p-3.5 bg-rose-50/80 border border-rose-100 rounded-xl text-xs text-rose-900">
            <span className="font-bold text-rose-700 block mb-0.5">Catatan Masukan Klien:</span>
            <p className="italic text-rose-800">&ldquo;{latestFeedback.text}&rdquo;</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Penjelasan Solusi Perbaikan (Tampil ke Klien)
            </label>
            <textarea
              rows={3}
              required
              placeholder="Contoh: 'Cover naskah sudah disesuaikan, logo dipertegas, dan audio diganti sesuai arahan.'"
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-transparent rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 focus:bg-white transition"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Unggah Draf V2 &amp; Kirim ke Klien</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
