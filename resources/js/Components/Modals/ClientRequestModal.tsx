'use client';

import React, { useState } from 'react';
import { useAgency } from '@/context/AgencyContext';
import { PlatformType } from '@/types';
import { X, Send, Sparkles, AlertCircle } from 'lucide-react';

interface ClientRequestModalProps {
  onClose: () => void;
}

export function ClientRequestModal({ onClose }: ClientRequestModalProps) {
  const { submitClientRequest, selectedClient } = useAgency();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Reels / Video Pendek');
  const [pillar, setPillar] = useState(
    selectedClient.contentPillars?.[0]?.title || ''
  );
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [platforms, setPlatforms] = useState<PlatformType[]>(['instagram', 'tiktok']);
  const [notes, setNotes] = useState('');

  const pillars = selectedClient.contentPillars || [];

  const togglePlatform = (p: PlatformType) => {
    if (platforms.includes(p)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter((item) => item !== p));
      }
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const isReels =
    type.includes('Reels') ||
    type.includes('Video') ||
    platforms.includes('tiktok');
  const used = isReels ? selectedClient.reelsUsed : selectedClient.postsUsed;
  const max = isReels ? selectedClient.reelsMax : selectedClient.postsMax;
  const isQuotaFull = used >= max;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    submitClientRequest({
      title: title.trim(),
      type,
      pillar: pillar.trim(),
      platforms,
      date,
      notes: notes.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 !mt-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-100 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Ajukan Permintaan Konten Baru
              </h3>
              <p className="text-[11px] text-slate-500">
                Brand: {selectedClient.business}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {isQuotaFull && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong>Kuota Reguler Penuh ({used}/{max}):</strong> Pengajuan ini tetap diteruskan ke tim agensi sebagai slot tambahan (Add-on).
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
              Judul Ide / Konsep Konten <span className="text-[#3B9BF8]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Promo Akhir Bulan Beli 1 Gratis 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
            />
          </div>

          {pillars.length > 0 && (
            <div>
              <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                Pilar Konten Brand
              </label>
              <select
                value={pillar}
                onChange={(e) => setPillar(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition cursor-pointer"
              >
                <option value="">Umum / Bebas</option>
                {pillars.map((p, idx) => (
                  <option key={idx} value={p.title}>
                    {p.title} ({p.ratio})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                Format Konten
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition cursor-pointer"
              >
                <option value="Reels / Video Pendek">Reels / Video Pendek</option>
                <option value="Instagram Carousel">Instagram Carousel</option>
                <option value="Single Post High-Res">Single Post High-Res</option>
                <option value="TikTok & Reels">TikTok &amp; Reels</option>
              </select>
            </div>

            <div>
              <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                Target Tanggal Tayang
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
              Platform Distribusi
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'instagram' as PlatformType, label: 'Instagram Reels & Feed' },
                { id: 'tiktok' as PlatformType, label: 'TikTok Video' },
                { id: 'youtube_shorts' as PlatformType, label: 'YouTube Shorts' },
              ].map((p) => {
                const isSelected = platforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#3B9BF8] text-white shadow-sm'
                        : 'bg-[#F4F6F9] text-slate-600 hover:bg-[#EFF7FF] hover:text-[#3B9BF8]'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
              Catatan Pesan / Brief Konsep
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan poin utama yang wajib masuk ke dalam naskah atau desain visual..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex gap-2.5 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Pengajuan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
