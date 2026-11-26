'use client';

import React, { useState } from 'react';
import { useAgency } from '@/context/AgencyContext';
import { X, Film, Plus, Trash2, Link2 } from 'lucide-react';

interface AddStudioTaskModalProps {
  onClose: () => void;
}

export function AddStudioTaskModal({ onClose }: AddStudioTaskModalProps) {
  const { clientPipeline, selectedClientId, addStudioTask, triggerNotification } = useAgency();

  const [clientId, setClientId] = useState(selectedClientId || (clientPipeline[0]?.id || ''));
  const [title, setTitle] = useState('');
  const [phase, setPhase] = useState<'Riset & Naskah' | 'Produksi & Shoot' | 'Penyuntingan & Desain' | 'Quality Control'>('Penyuntingan & Desain');
  const [shooter, setShooter] = useState('Raka (Graphic Designer)');
  const [assetLinks, setAssetLinks] = useState<{ label: string; url: string }[]>([
    { label: 'Folder Drive', url: '' },
  ]);
  const [status, setStatus] = useState<'Dalam Antrean' | 'Sedang Berjalan' | 'Selesai'>('Sedang Berjalan');
  const [progress, setProgress] = useState(25);

  const handleAddLinkRow = () => {
    setAssetLinks((prev) => [...prev, { label: '', url: '' }]);
  };

  const handleUpdateLinkRow = (index: number, field: 'label' | 'url', value: string) => {
    setAssetLinks((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const handleRemoveLinkRow = (index: number) => {
    setAssetLinks((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      triggerNotification('Judul task produksi wajib diisi.');
      return;
    }

    const validLinks = assetLinks
      .map((item) => ({
        label: item.label.trim() || 'Tautan Hasil',
        url: item.url.trim(),
      }))
      .filter((item) => item.url.length > 0);

    addStudioTask({
      clientId,
      title: title.trim(),
      phase,
      shooter,
      rawFolder: validLinks[0]?.url || 'https://drive.google.com',
      assetLinks: validLinks,
      status,
      progress
    });

    triggerNotification(`Task desain "${title}" berhasil ditambahkan!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-7 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Tambah Task Desain &amp; Aset</h3>
            <p className="text-xs text-slate-500">
              Catat pekerjaan desain grafis, editing konten, dan tautan link hasil (Drive / Figma / Canva).
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Pilih Klien</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
            >
              {clientPipeline.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.business} ({c.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Judul Pekerjaan / Aset</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Desain Template Feed IG & Highlight Icon"
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Tahapan Kerja</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
              >
                <option value="Riset & Naskah">Riset &amp; Konsep</option>
                <option value="Penyuntingan & Desain">Desain Grafis &amp; Editing</option>
                <option value="Produksi & Shoot">Produksi Aset</option>
                <option value="Quality Control">Quality Control</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">PIC (Designer / Editor)</label>
              <input
                type="text"
                value={shooter}
                onChange={(e) => setShooter(e.target.value)}
                placeholder="Raka (Graphic Designer)"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-700">
                <Link2 className="w-3.5 h-3.5 text-[#3B9BF8]" />
                <span>Tautan Hasil (Drive / Figma / Canva)</span>
              </label>
              <button
                type="button"
                onClick={handleAddLinkRow}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3B9BF8] bg-[#EFF7FF] hover:bg-[#DCEEFF] px-2.5 py-1 rounded-lg transition cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                Tambah Link
              </button>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {assetLinks.map((link, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleUpdateLinkRow(idx, 'label', e.target.value)}
                    placeholder="Label (mis: Figma / Drive)"
                    className="w-1/3 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleUpdateLinkRow(idx, 'url', e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                  />
                  {assetLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLinkRow(idx)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                      aria-label="Hapus link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Status Awal</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
            >
              <option value="Dalam Antrean">Dalam Antrean</option>
              <option value="Sedang Berjalan">Sedang Berjalan</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-zinc-700">Progres Pengerjaan</label>
              <span className="text-xs font-inter font-semibold text-zinc-900">{progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value, 10))}
              className="w-full accent-[#3B9BF8] cursor-pointer"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold transition shadow-sm cursor-pointer"
            >
              Simpan Task Desain
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
