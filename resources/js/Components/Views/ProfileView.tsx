'use client';

import React, { useState } from 'react';
import { useAgency } from '@/context/AgencyContext';
import { ArrowLeft, Check } from 'lucide-react';

interface ProfileViewProps {
  onBack: () => void;
}

export function ProfileView({ onBack }: ProfileViewProps) {
  const { triggerNotification, clientPipeline } = useAgency();

  const [name, setName] = useState('Dimas Pratama');
  const [title, setTitle] = useState('Creative Lead & Director');
  const [initials, setInitials] = useState('DP');
  const [email, setEmail] = useState('dimas@cerminkreatif.com');
  const [phone, setPhone] = useState('+62 812-3456-7890');
  const [location, setLocation] = useState('Studio Malang, Jawa Timur');
  const [bio, setBio] = useState(
    'Memimpin pengarahan visual kreatif, kurasi ritme konten video pendek (Shorts & Reels), serta supervisi alur kerja pascaproduksi dan standar kualitas editorial di Cermin Kreatif.'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerNotification('Profil akun studio berhasil diperbarui!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Back Action */}
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
              Profil Akun Studio
            </h1>
            <p className="text-xs text-zinc-500 font-light mt-0.5">
              Identitas kepemimpinan kreatif, kontak operasional resmi, dan status otentikasi akun.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200/80 bg-zinc-50 text-zinc-700 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Super Admin
          </span>
        </div>
      </div>

      {/* Main Grid: Left Profile Summary, Right Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Summary Card (~4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white shadow-2xs space-y-5">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#01A0CA] to-sky-400 text-white flex items-center justify-center font-bold text-xl shadow-xs mb-3">
                {initials}
              </div>
              <h2 className="text-base font-semibold text-zinc-900">{name}</h2>
              <p className="text-xs text-zinc-500 mt-0.5 font-light">{title}</p>
              <div className="mt-2 text-[10px] font-mono text-zinc-400">
                cermin.id • studio os
              </div>
            </div>

            <div className="h-px bg-zinc-100" />

            {/* Clean Typographic Data Rows (Zero Icon Soup!) */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-zinc-600">
                <span className="text-zinc-400">Email:</span>
                <span className="font-medium text-zinc-900 font-mono truncate max-w-[190px]">{email}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span className="text-zinc-400">WhatsApp:</span>
                <span className="font-medium text-zinc-900 font-mono">{phone}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span className="text-zinc-400">Base Studio:</span>
                <span className="font-medium text-zinc-900">{location}</span>
              </div>
            </div>

            <div className="h-px bg-zinc-100" />

            {/* Active Assignment */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                Tanggung Jawab Retainer ({clientPipeline.length} Brand)
              </div>
              <div className="space-y-1.5">
                {clientPipeline.slice(0, 3).map((client) => (
                  <div key={client.id} className="p-2 rounded-lg bg-zinc-50/70 border border-zinc-200/60 flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-800 truncate">{client.business}</span>
                    <span className="text-[10px] font-mono text-zinc-400">{client.package.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sesi Aktif */}
          <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-1.5 text-xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Sesi Login Aktif</div>
            <p className="text-xs text-zinc-600 leading-relaxed font-light">
              MacBook Pro • Chrome 122 di Malang, ID. Enkripsi sesi tersertifikasi.
            </p>
          </div>
        </div>

        {/* Right Column: Edit Form (Zero Clutter Inside Inputs) */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl border border-zinc-200/80 bg-white shadow-2xs space-y-6">
            <div className="border-b border-zinc-100 pb-4">
              <h3 className="text-sm font-semibold text-zinc-900">Pengaturan Identitas Studio</h3>
              <p className="text-xs text-zinc-500 font-light mt-0.5">
                Informasi ini tercantum pada header laporan draf konten, invoice, dan portal kolaborasi brand klien.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Inisial Avatar
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 text-center font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Jabatan / Peran
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Lokasi Studio
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Alamat Email Resmi
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Nomor WhatsApp Operasional
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition font-mono"
                />
                <p className="text-[10px] text-zinc-400 mt-1">
                  Digunakan untuk notifikasi SLA dan pengiriman draf ke klien.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Catatan Editorial & Visi Studio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition resize-none leading-relaxed font-light"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition cursor-pointer"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white text-xs font-semibold transition cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
