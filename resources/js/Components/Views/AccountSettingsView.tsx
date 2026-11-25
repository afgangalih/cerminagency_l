'use client';

import React, { useState } from 'react';
import { useAgency } from '@/context/AgencyContext';
import { ArrowLeft, Check } from 'lucide-react';

interface AccountSettingsViewProps {
  onBack: () => void;
}

export function AccountSettingsView({ onBack }: AccountSettingsViewProps) {
  const { triggerNotification } = useAgency();

  const [activeTab, setActiveTab] = useState<'notifikasi' | 'keamanan' | 'operasional'>('notifikasi');

  // Notification Toggles
  const [waApproval, setWaApproval] = useState(true);
  const [waRevision, setWaRevision] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [invoiceReminders, setInvoiceReminders] = useState(true);

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Operational
  const [timezone, setTimezone] = useState('Asia/Jakarta (WIB • UTC+7)');
  const [slaHours, setSlaHours] = useState('24 Jam Kerja');
  const [operatingDays, setOperatingDays] = useState('Senin – Sabtu (09:00 – 18:00 WIB)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerNotification('Konfigurasi pengaturan akun & studio berhasil diperbarui!');
  };

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
              Pengaturan Akun & Studio
            </h1>
            <p className="text-xs text-zinc-500 font-light mt-0.5">
              Konfigurasi pemberitahuan otomatis, keamanan akun, dan standar operasional tim kreatif.
            </p>
          </div>
        </div>

        {/* Flat Segmented Control */}
        <div className="inline-flex rounded-xl p-1 bg-white border border-zinc-200 shadow-2xs text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('notifikasi')}
            className={`py-1.5 px-3 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === 'notifikasi'
                ? 'bg-[#01A0CA] text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Notifikasi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('keamanan')}
            className={`py-1.5 px-3 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === 'keamanan'
                ? 'bg-[#01A0CA] text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Keamanan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('operasional')}
            className={`py-1.5 px-3 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === 'operasional'
                ? 'bg-[#01A0CA] text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Standar Studio
          </button>
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-2xs p-6 sm:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 1: NOTIFIKASI */}
          {activeTab === 'notifikasi' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-sm font-semibold text-zinc-900">Pemberitahuan Otomatis & Alert WhatsApp</h3>
                <p className="text-xs text-zinc-500 font-light mt-0.5">
                  Tentukan peristiwa alur kerja yang memicu pesan alert otomatis ke tim produser.
                </p>
              </div>

              {/* Clean, Flat Toggle List (No Colored Squares!) */}
              <div className="divide-y divide-zinc-100">
                <div className="py-3.5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-zinc-900">Alert Persetujuan Draf Video (WhatsApp)</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5 font-light leading-relaxed">
                      Kirim pesan otomatis seketika saat brand menekan tombol "Setujui" di Portal Klien.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={waApproval}
                    onChange={(e) => setWaApproval(e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-900 mt-1 cursor-pointer"
                  />
                </div>

                <div className="py-3.5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-zinc-900">Alert Catatan Revisi Video (WhatsApp)</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5 font-light leading-relaxed">
                      Peringatan instan saat klien memasukkan feedback revisi dengan timecode menit/detik.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={waRevision}
                    onChange={(e) => setWaRevision(e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-900 mt-1 cursor-pointer"
                  />
                </div>

                <div className="py-3.5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-zinc-900">Email Digest Jadwal Syuting Mingguan</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5 font-light leading-relaxed">
                      Kirim rekap agenda syuting studio dan daftar talenta setiap hari Senin pukul 08:00 WIB.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-900 mt-1 cursor-pointer"
                  />
                </div>

                <div className="py-3.5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-zinc-900">Pengingat Termin Tagihan Retainer</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5 font-light leading-relaxed">
                      Notifikasi penagihan 3 hari sebelum siklus 30 hari kontrak retainer berakhir.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={invoiceReminders}
                    onChange={(e) => setInvoiceReminders(e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-900 mt-1 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KEAMANAN */}
          {activeTab === 'keamanan' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-sm font-semibold text-zinc-900">Keamanan Akses & Kata Sandi</h3>
                <p className="text-xs text-zinc-500 font-light mt-0.5">
                  Perbarui kata sandi secara berkala untuk menjaga integritas data kontrak studio.
                </p>
              </div>

              <div className="max-w-xl space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                    Kata Sandi Saat Ini
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan sandi saat ini"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                      Kata Sandi Baru
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 8 karakter"
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                      Ulangi Kata Sandi Baru
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Konfirmasi sandi baru"
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-zinc-900">Autentikasi Dua Langkah (2FA)</div>
                    <div className="text-[11px] text-zinc-500 font-light mt-0.5">Terproteksi Google Authenticator OTP</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-200 bg-white text-zinc-700 font-semibold">
                    AKTIF
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OPERASIONAL */}
          {activeTab === 'operasional' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-sm font-semibold text-zinc-900">Standar Alur Kerja & SLA Studio</h3>
                <p className="text-xs text-zinc-500 font-light mt-0.5">
                  Parameter operasional yang disepakati bersama seluruh brand retainer Cermin Kreatif.
                </p>
              </div>

              <div className="max-w-2xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                      Zona Waktu Resmi Studio
                    </label>
                    <input
                      type="text"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                      Standar Target SLA Peninjauan Klien
                    </label>
                    <select
                      value={slaHours}
                      onChange={(e) => setSlaHours(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
                    >
                      <option value="12 Jam Kerja">12 Jam Kerja (Fast-track Urgent)</option>
                      <option value="24 Jam Kerja">24 Jam Kerja (Standar Industri Cermin)</option>
                      <option value="48 Jam Kerja">48 Jam Kerja (Fleksibel)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                    Jadwal Operasional Tim Kreatif
                  </label>
                  <input
                    type="text"
                    value={operatingDays}
                    onChange={(e) => setOperatingDays(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-100">
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
              <span>Simpan Konfigurasi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
