'use client';

import React, { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { useAgency } from '@/context/AgencyContext';
import {
  Wallet,
  Clock,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Search,
  ArrowUpDown,
  Eye,
  Unlock,
  CheckCircle2,
  Plus,
  Trash2,
  FileText,
  Layers,
  Copy,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  X,
  Calendar,
  Target,
  BarChart3,
  MessageCircle,
} from 'lucide-react';
import {
  ClientPipeline,
  ContentItem,
  ContentPillarItem,
  ClientKpiItem,
  AgencyEventItem,
  ClientReviewItem,
} from '@/types';
import { AdminTabKey } from '../Navigation/AdminSidebar';

const formatIDR = (num: number) =>
  `Rp ${Number(num || 0).toLocaleString('id-ID')}`;

const formatShortIDR = (num: number) => {
  if (num >= 1000000) {
    return `Rp ${(num / 1000000).toFixed(1).replace('.0', '')} jt`;
  }
  return formatIDR(num);
};

const parseIDR = (str: string) =>
  parseInt((str || '').replace(/\D/g, ''), 10) || 0;

const getDpBadgeStyle = (isUnlocked: boolean) =>
  isUnlocked
    ? 'bg-[#EFF7FF] text-[#3B9BF8]'
    : 'bg-amber-50 text-amber-700';

const FALLBACK_COVERS = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
];

const MiniSparkline = ({ variant = 'up' }: { variant?: 'up' | 'down' }) => {
  const isUp = variant === 'up';
  const strokeColor = isUp ? '#3B9BF8' : '#F43F5E';
  const gradId = isUp ? 'cerminSparkUp' : 'cerminSparkDown';
  const linePath = isUp
    ? 'M 2 28 C 12 24, 16 32, 26 22 C 34 15, 42 22, 52 10 C 56 6, 60 5, 64 4'
    : 'M 2 6 C 10 14, 18 22, 28 18 C 36 14, 44 26, 54 24 C 58 23, 61 21, 64 20';
  const areaPath = `${linePath} L 64 36 L 2 36 Z`;

  return (
    <svg viewBox="0 0 66 36" className="w-16 h-9 shrink-0 overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.28" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path
        d={linePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ============================================================================
// VIEW 2: FINANSIAL & VERIFIKASI DP
// ============================================================================
export function FinanceDPView({
  clients,
  globalSearch,
  onInspectProof,
  onVerifyPayment,
}: {
  clients: ClientPipeline[];
  globalSearch: string;
  onInspectProof: (client: ClientPipeline) => void;
  onVerifyPayment: (clientId: string) => void;
}) {
  const [financeSearch, setFinanceSearch] = useState('');
  const [financeStatusFilter, setFinanceStatusFilter] = useState('Semua');
  const [financeSort, setFinanceSort] = useState<{
    key: 'business' | 'invoiceNumber' | 'package' | 'totalValue' | 'dpAmount' | 'isUnlocked' | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const mrr = clients.reduce((s, c) => s + parseIDR(c.totalValue), 0);
  const pendingDP = clients
    .filter((c) => !c.isUnlocked)
    .reduce((s, c) => s + parseIDR(c.dpAmount), 0);
  const activeCount = clients.filter((c) => c.isUnlocked).length;
  const pendingCount = clients.filter((c) => !c.isUnlocked).length;

  const query = (financeSearch || globalSearch).trim().toLowerCase();
  let rows = clients.filter((c) => {
    const dpLabel = c.isUnlocked ? 'Lunas DP' : 'Menunggu Verifikasi';
    const matchStatus =
      financeStatusFilter === 'Semua' || dpLabel === financeStatusFilter;
    const matchQuery =
      !query ||
      c.business.toLowerCase().includes(query) ||
      c.invoiceNumber.toLowerCase().includes(query) ||
      c.package.toLowerCase().includes(query);
    return matchStatus && matchQuery;
  });

  if (financeSort.key) {
    const sortKey = financeSort.key;
    rows = [...rows].sort((a, b) => {
      const va =
        sortKey === 'totalValue' || sortKey === 'dpAmount'
          ? parseIDR(a[sortKey])
          : String(a[sortKey]);
      const vb =
        sortKey === 'totalValue' || sortKey === 'dpAmount'
          ? parseIDR(b[sortKey])
          : String(b[sortKey]);
      if (va < vb) return financeSort.direction === 'asc' ? -1 : 1;
      if (va > vb) return financeSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (
    key: 'business' | 'invoiceNumber' | 'package' | 'totalValue' | 'dpAmount' | 'isUnlocked'
  ) => {
    setFinanceSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="space-y-5">
      {/* KPI Sparkline Row */}
      <div className="bg-[#EAF4FF] rounded-2xl p-3.5 grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {[
          {
            label: 'MRR Retainer Resmi',
            value: formatIDR(mrr),
            delta: `${activeCount} Brand Aktif`,
            up: true,
            icon: Wallet,
          },
          {
            label: 'DP 50% Menunggu Verifikasi',
            value: formatIDR(pendingDP),
            delta: `${pendingCount} Prospek`,
            up: false,
            icon: Clock,
          },
          {
            label: 'Portal Klien Aktif',
            value: `${activeCount} / ${clients.length} Brand`,
            delta: 'Gated Access',
            up: true,
            icon: ShieldCheck,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="w-7 h-7 rounded-lg bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </span>
                  {card.label}
                </span>
              </div>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-[19px] font-bold text-slate-900 leading-tight tabular-nums">
                    {card.value}
                  </p>
                  <p className="text-[10.5px] mt-1 inline-flex items-center gap-1">
                    {card.up ? (
                      <TrendingUp className="w-3 h-3 text-[#3B9BF8]" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-rose-500" />
                    )}
                    <span
                      className={`font-semibold ${
                        card.up ? 'text-[#3B9BF8]' : 'text-rose-500'
                      }`}
                    >
                      {card.delta}
                    </span>
                  </p>
                </div>
                <MiniSparkline variant={card.up ? 'up' : 'down'} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Finansial Table */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold text-slate-800">
            Daftar Kontrak &amp; Verifikasi DP 50%
          </h2>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={financeSearch}
                onChange={(e) => setFinanceSearch(e.target.value)}
                placeholder="Cari brand, nomor faktur..."
                className="w-full bg-[#F4F6F9] border border-transparent text-xs text-slate-700 placeholder:text-slate-400 pl-8 pr-3 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition-all"
              />
            </div>
            <select
              value={financeStatusFilter}
              onChange={(e) => setFinanceStatusFilter(e.target.value)}
              className="bg-[#F4F6F9] border border-transparent text-xs font-medium text-slate-600 px-3 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Lunas DP">Lunas DP</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="bg-[#EFF7FF] text-slate-500 text-[11px] font-semibold">
                {(
                  [
                    { label: 'Brand Klien', key: 'business' },
                    { label: 'Faktur', key: 'invoiceNumber' },
                    { label: 'Paket Retainer', key: 'package' },
                    { label: 'Nilai Kontrak', key: 'totalValue' },
                    { label: 'Termin DP 50%', key: 'dpAmount' },
                    { label: 'Status', key: 'isUnlocked' },
                  ] as const
                ).map((col, idx) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`py-2.5 px-3.5 cursor-pointer hover:text-[#3B9BF8] select-none ${
                      idx === 0 ? 'rounded-l-xl' : ''
                    }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </span>
                  </th>
                ))}
                <th className="py-2.5 px-3.5 rounded-r-xl text-right">
                  Aksi Portal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Tidak ada data faktur yang cocok.
                  </td>
                </tr>
              ) : (
                rows.map((cl) => (
                  <tr key={cl.id} className="hover:bg-[#F8FBFF] transition-colors">
                    <td className="py-3.5 px-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EFF7FF] text-[#3B9BF8] font-bold text-[11px] flex items-center justify-center shrink-0">
                          {cl.business.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{cl.business}</p>
                          <p className="text-[10.5px] text-slate-400">{cl.instagram}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-500 tabular-nums">
                      {cl.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-600">{cl.package}</td>
                    <td className="py-3.5 px-3.5 font-semibold text-slate-800 tabular-nums">
                      {cl.totalValue}
                    </td>
                    <td className="py-3.5 px-3.5 font-semibold text-[#3B9BF8] tabular-nums">
                      {cl.dpAmount}
                    </td>
                    <td className="py-3.5 px-3.5">
                      <span
                        className={`inline-block text-[10.5px] font-semibold px-2.5 py-1 rounded-lg ${getDpBadgeStyle(
                          cl.isUnlocked
                        )}`}
                      >
                        {cl.isUnlocked ? 'Lunas DP' : 'Menunggu Verifikasi'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onInspectProof(cl)}
                          className="inline-flex items-center gap-1 bg-[#F4F6F9] hover:bg-[#EAF4FF] text-slate-600 hover:text-[#3B9BF8] text-[11px] font-semibold px-2.5 py-1.5 rounded-lg cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Slip
                        </button>
                        {!cl.isUnlocked ? (
                          <button
                            type="button"
                            onClick={() => onVerifyPayment(cl.id)}
                            className="inline-flex items-center gap-1 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg cursor-pointer"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            Buka Akses
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 px-2 py-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Resmi
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 3: DAFTAR KLIEN & KONTROL KUOTA
// ============================================================================
export function ClientsQuotaView({
  clients,
  contents = [],
  globalSearch,
  onOpenAddClient,
  onOpenAddOn,
  onDeleteClient,
  onJumpToBrand,
}: {
  clients: ClientPipeline[];
  contents?: ContentItem[];
  globalSearch: string;
  onOpenAddClient: () => void;
  onOpenAddOn: (clientId: string) => void;
  onDeleteClient: (client: ClientPipeline) => void;
  onJumpToBrand: (clientId: string) => void;
}) {
  const { triggerNotification } = useAgency();
  const [clientPicFilter, setClientPicFilter] = useState('Semua PIC');
  const [clientScopeFilter, setClientScopeFilter] = useState<'active' | 'all'>('active');
  const [detailClientId, setDetailClientId] = useState<string | null>(null);
  const [pillarsDraft, setPillarsDraft] = useState<ContentPillarItem[]>([]);
  const [kpisDraft, setKpisDraft] = useState<ClientKpiItem[]>([]);
  const [isSavingStrategy, setIsSavingStrategy] = useState(false);
  const [confirmSaveStrategyOpen, setConfirmSaveStrategyOpen] = useState(false);
  const [strategySavedMsg, setStrategySavedMsg] = useState<string | null>(null);

  const detailClient = clients.find((c) => c.id === detailClientId) || null;

  const openClientDetail = (cl: ClientPipeline) => {
    setDetailClientId(cl.id);
    setPillarsDraft(
      cl.contentPillars && cl.contentPillars.length > 0
        ? cl.contentPillars.map((p) => ({ ...p }))
        : []
    );
    setKpisDraft(
      cl.kpiTargets && cl.kpiTargets.length > 0
        ? cl.kpiTargets.map((k) => ({ ...k }))
        : []
    );
    setStrategySavedMsg(null);
  };

  const applyDefaultPillars = () => {
    setPillarsDraft([
      {
        title: 'Edukasi & Tips Produk',
        ratio: '40%',
        targetCount: 5,
        description: 'Konten informatif seputar manfaat, cara pakai, dan nilai produk.',
      },
      {
        title: 'Lifestyle & Behind the Scenes',
        ratio: '35%',
        targetCount: 4,
        description: 'Keseharian brand, cerita tim, dan kedekatan dengan audiens.',
      },
      {
        title: 'Promo & Penawaran',
        ratio: '25%',
        targetCount: 3,
        description: 'Katalog produk, promo bulanan, dan ajakan konversi.',
      },
    ]);
    triggerNotification('Template 3 Konten Pilar diterapkan. Klik Simpan untuk menyimpan.');
  };

  const applyDefaultKpis = () => {
    setKpisDraft([
      { label: 'Engagement Rate', target: '4.5', current: '0', unit: '%' },
      { label: 'Total Views / Reach', target: '50000', current: '0', unit: 'Views' },
      { label: 'Pertumbuhan Followers', target: '1000', current: '0', unit: 'Followers' },
    ]);
    triggerNotification('Template 3 KPI default diterapkan. Klik Simpan untuk menyimpan.');
  };

  const handleSaveClientStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detailClient) return;
    setConfirmSaveStrategyOpen(true);
  };

  const executeSaveClientStrategy = () => {
    if (!detailClient) return;
    setIsSavingStrategy(true);
    setStrategySavedMsg(null);

    const validPillars = pillarsDraft
      .map((p) => ({
        title: p.title.trim(),
        ratio: p.ratio.trim() || '0%',
        targetCount: Number(p.targetCount) || 0,
        description: p.description.trim(),
      }))
      .filter((p) => p.title.length > 0);

    const validKpis = kpisDraft
      .map((k) => ({
        label: k.label.trim(),
        target: k.target.trim() || '0',
        current: k.current.trim() || '0',
        unit: k.unit.trim() || '',
      }))
      .filter((k) => k.label.length > 0);

    router.patch(
      `/admin/clients/${detailClient.id}`,
      {
        content_pillars: validPillars as any,
        kpi_targets: validKpis as any,
      },
      {
        preserveScroll: true,
        onFinish: () => {
          setIsSavingStrategy(false);
          setConfirmSaveStrategyOpen(false);
        },
        onSuccess: () => {
          setPillarsDraft(validPillars);
          setKpisDraft(validKpis);
          setStrategySavedMsg('Konten Pilar & KPI berhasil disimpan ke database.');
          triggerNotification(`Konten Pilar & KPI ${detailClient.business} berhasil disimpan!`);
        },
        onError: () => {
          triggerNotification('Gagal menyimpan Konten Pilar & KPI. Periksa kembali isian Anda.');
        },
      }
    );
  };

  const uniquePics = Array.from(
    new Set(clients.map((c) => c.picAssigned).filter(Boolean))
  );

  const query = globalSearch.trim().toLowerCase();
  const activeClientsCount = clients.filter((c) => c.isUnlocked).length;
  const visibleClients = clients.filter((cl) => {
    const matchScope = clientScopeFilter === 'all' || cl.isUnlocked;
    const matchPic =
      clientPicFilter === 'Semua PIC' || cl.picAssigned === clientPicFilter;
    const matchQuery =
      !query ||
      cl.business.toLowerCase().includes(query) ||
      cl.instagram.toLowerCase().includes(query) ||
      cl.package.toLowerCase().includes(query);
    return matchScope && matchPic && matchQuery;
  });

  if (detailClient) {
    const clientContents = contents.filter((c) => c.clientId === detailClient.id);
    const reelsPct = Math.min(
      100,
      Math.round(((detailClient.reelsUsed || 0) / (detailClient.reelsMax || 1)) * 100)
    );
    const postsPct = Math.min(
      100,
      Math.round(((detailClient.postsUsed || 0) / (detailClient.postsMax || 1)) * 100)
    );

    return (
      <div className="space-y-5">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setDetailClientId(null)}
              className="inline-flex items-center gap-1.5 bg-[#F4F6F9] hover:bg-[#EFF7FF] text-slate-700 hover:text-[#3B9BF8] text-xs font-semibold px-3 py-2 rounded-xl transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Kembali
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 truncate">
                  {detailClient.business}
                </h2>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                    detailClient.isUnlocked
                      ? 'bg-[#EFF7FF] text-[#3B9BF8]'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {detailClient.isUnlocked ? 'Portal Resmi' : 'Terkunci (Demo)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {detailClient.instagram} • Paket {detailClient.package} • PIC: {detailClient.picAssigned}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenAddOn(detailClient.id)}
              className="bg-[#EFF7FF] hover:bg-[#DCEEFF] text-[#3B9BF8] text-xs font-semibold px-3.5 py-2 rounded-xl transition cursor-pointer"
            >
              +Slot Add-on
            </button>
            <button
              type="button"
              onClick={() => onJumpToBrand(detailClient.id)}
              className="bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition cursor-pointer"
            >
              Buka Content Engine
            </button>
          </div>
        </div>

        {/* Summary Quota + Brief Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
            <p className="text-xs font-bold text-slate-800">Kuota Konten Bulanan</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Reels / Video 9:16</span>
                <span className="font-bold text-slate-800 tabular-nums">
                  {detailClient.reelsUsed} / {detailClient.reelsMax}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#3B9BF8] rounded-full" style={{ width: `${reelsPct}%` }} />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Carousel / IG Feed</span>
                <span className="font-bold text-slate-800 tabular-nums">
                  {detailClient.postsUsed} / {detailClient.postsMax}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#93C5FD] rounded-full" style={{ width: `${postsPct}%` }} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-2">
            <p className="text-xs font-bold text-slate-800">Brief &amp; Target Audiens</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {detailClient.briefNotes || 'Belum ada catatan brief khusus untuk klien ini.'}
            </p>
            {detailClient.targetAudience && (
              <p className="text-[11px] text-slate-500 pt-1">
                <strong className="text-slate-700">Target Audiens:</strong> {detailClient.targetAudience}
              </p>
            )}
          </div>
        </div>

        {/* Form Konten Pilar & KPI per-Klien */}
        <form onSubmit={handleSaveClientStrategy} className="space-y-5">
          {strategySavedMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-4 py-3 rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{strategySavedMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
            {/* Kolom 1: Konten Pilar Dinamis */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Konten Pilar Klien</h3>
                    <p className="text-[11px] text-slate-400">
                      Otomatis muncul di pilihan pilar Content Engine &amp; Portal Klien.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {pillarsDraft.length === 0 && (
                    <button
                      type="button"
                      onClick={applyDefaultPillars}
                      className="text-[11px] font-semibold text-slate-600 bg-[#F4F6F9] hover:bg-slate-200 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      Pakai Template
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setPillarsDraft((prev) => [
                        ...prev,
                        { title: '', ratio: '30%', targetCount: 4, description: '' },
                      ])
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3B9BF8] bg-[#EFF7FF] hover:bg-[#DCEEFF] px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Pilar
                  </button>
                </div>
              </div>

              {pillarsDraft.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Belum ada Konten Pilar untuk klien ini. Klik <strong>+ Tambah Pilar</strong> atau <strong>Pakai Template</strong>.
                </div>
              ) : (
                <div className="space-y-3">
                  {pillarsDraft.map((pillar, idx) => {
                    const realizedCount = clientContents.filter(
                      (c) => c.pillar && c.pillar.toLowerCase() === pillar.title.trim().toLowerCase()
                    ).length;
                    const pillarPct =
                      pillar.targetCount > 0
                        ? Math.min(100, Math.round((realizedCount / pillar.targetCount) * 100))
                        : 0;

                    return (
                      <div
                        key={idx}
                        className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3.5 space-y-2.5 text-xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10.5px] font-bold text-[#3B9BF8] bg-[#EFF7FF] px-2 py-0.5 rounded-md">
                            Pilar #{idx + 1} • Terbuat {realizedCount}/{pillar.targetCount || 0} konten ({pillarPct}%)
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setPillarsDraft((prev) => prev.filter((_, i) => i !== idx))
                            }
                            className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition cursor-pointer"
                            aria-label="Hapus pilar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                          <div className="sm:col-span-6">
                            <label className="block text-[10.5px] font-semibold text-slate-600 mb-1">
                              Nama Pilar
                            </label>
                            <input
                              type="text"
                              value={pillar.title}
                              onChange={(e) =>
                                setPillarsDraft((prev) =>
                                  prev.map((item, i) =>
                                    i === idx ? { ...item, title: e.target.value } : item
                                  )
                                )
                              }
                              placeholder="Mis: Edukasi Kopi"
                              className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[10.5px] font-semibold text-slate-600 mb-1">
                              Rasio
                            </label>
                            <input
                              type="text"
                              value={pillar.ratio}
                              onChange={(e) =>
                                setPillarsDraft((prev) =>
                                  prev.map((item, i) =>
                                    i === idx ? { ...item, ratio: e.target.value } : item
                                  )
                                )
                              }
                              placeholder="40%"
                              className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[10.5px] font-semibold text-slate-600 mb-1">
                              Target Konten
                            </label>
                            <input
                              type="number"
                              min={0}
                              value={pillar.targetCount}
                              onChange={(e) =>
                                setPillarsDraft((prev) =>
                                  prev.map((item, i) =>
                                    i === idx
                                      ? { ...item, targetCount: parseInt(e.target.value || '0', 10) }
                                      : item
                                  )
                                )
                              }
                              className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10.5px] font-semibold text-slate-600 mb-1">
                            Keterangan / Fokus Tema
                          </label>
                          <input
                            type="text"
                            value={pillar.description}
                            onChange={(e) =>
                              setPillarsDraft((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, description: e.target.value } : item
                                )
                              )
                            }
                            placeholder="Penjelasan singkat arahan konten pilar ini..."
                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Kolom 2: KPI per-Klien Dinamis */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">KPI per-Klien</h3>
                    <p className="text-[11px] text-slate-400">
                      Target performa akun &amp; realisasi pencapaian periode berjalan.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {kpisDraft.length === 0 && (
                    <button
                      type="button"
                      onClick={applyDefaultKpis}
                      className="text-[11px] font-semibold text-slate-600 bg-[#F4F6F9] hover:bg-slate-200 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      Pakai Template
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setKpisDraft((prev) => [
                        ...prev,
                        { label: '', target: '', current: '0', unit: '' },
                      ])
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3B9BF8] bg-[#EFF7FF] hover:bg-[#DCEEFF] px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah KPI
                  </button>
                </div>
              </div>

              {kpisDraft.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Belum ada KPI untuk klien ini. Klik <strong>+ Tambah KPI</strong> atau <strong>Pakai Template</strong>.
                </div>
              ) : (
                <div className="space-y-3">
                  {kpisDraft.map((kpi, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3.5 space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10.5px] font-bold text-slate-600 inline-flex items-center gap-1">
                          <Target className="w-3 h-3 text-[#3B9BF8]" />
                          KPI #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setKpisDraft((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition cursor-pointer"
                          aria-label="Hapus KPI"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                        <div className="sm:col-span-5">
                          <label className="block text-[10.5px] font-semibold text-slate-600 mb-1">
                            Nama KPI
                          </label>
                          <input
                            type="text"
                            value={kpi.label}
                            onChange={(e) =>
                              setKpisDraft((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, label: e.target.value } : item
                                )
                              )
                            }
                            placeholder="Mis: Engagement Rate"
                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10.5px] font-semibold text-slate-600 mb-1">
                            Realisasi
                          </label>
                          <input
                            type="text"
                            value={kpi.current}
                            onChange={(e) =>
                              setKpisDraft((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, current: e.target.value } : item
                                )
                              )
                            }
                            placeholder="3.8"
                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-[10.5px] font-semibold text-slate-600 mb-1">
                            Target
                          </label>
                          <input
                            type="text"
                            value={kpi.target}
                            onChange={(e) =>
                              setKpisDraft((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, target: e.target.value } : item
                                )
                              )
                            }
                            placeholder="4.5"
                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10.5px] font-semibold text-slate-600 mb-1">
                            Satuan
                          </label>
                          <input
                            type="text"
                            value={kpi.unit}
                            onChange={(e) =>
                              setKpisDraft((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, unit: e.target.value } : item
                                )
                              )
                            }
                            placeholder="%"
                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingStrategy}
              className="bg-[#3B9BF8] hover:bg-[#2589F5] disabled:opacity-60 text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
            >
              {isSavingStrategy ? 'Menyimpan...' : 'Simpan Konten Pilar & KPI'}
            </button>
          </div>
        </form>

        {/* Confirmation Modal Simpan Pilar & KPI */}
        {confirmSaveStrategyOpen && (
          <div className="fixed inset-0 !mt-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-100 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Simpan Konten Pilar &amp; KPI?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Perubahan strategi untuk <strong>{detailClient.business}</strong> akan langsung tersinkron ke pilihan pilar di Content Engine dan Portal Klien.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setConfirmSaveStrategyOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium transition cursor-pointer"
                >
                  Periksa Lagi
                </button>
                <button
                  type="button"
                  disabled={isSavingStrategy}
                  onClick={executeSaveClientStrategy}
                  className="px-5 py-2 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] disabled:opacity-60 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                >
                  {isSavingStrategy ? 'Menyimpan...' : 'Ya, Simpan Sekarang'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex bg-white border border-slate-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setClientScopeFilter('active')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                clientScopeFilter === 'active'
                  ? 'bg-[#3B9BF8] text-white'
                  : 'text-slate-500 hover:text-[#3B9BF8]'
              }`}
            >
              Klien Aktif ({activeClientsCount})
            </button>
            <button
              type="button"
              onClick={() => setClientScopeFilter('all')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                clientScopeFilter === 'all'
                  ? 'bg-[#3B9BF8] text-white'
                  : 'text-slate-500 hover:text-[#3B9BF8]'
              }`}
            >
              Semua ({clients.length})
            </button>
          </div>
          {['Semua PIC', ...uniquePics].map((pic) => (
            <button
              key={pic}
              type="button"
              onClick={() => setClientPicFilter(pic)}
              className={`text-xs font-medium px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                clientPicFilter === pic
                  ? 'bg-[#3B9BF8] text-white shadow-sm'
                  : 'bg-white border border-slate-100 text-slate-600 hover:bg-[#EFF7FF] hover:text-[#3B9BF8]'
              }`}
            >
              {pic}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpenAddClient}
          className="inline-flex items-center gap-1.5 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Klien Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visibleClients.map((cl, idx) => {
          const reelsPct = Math.min(
            100,
            Math.round(((cl.reelsUsed || 0) / (cl.reelsMax || 1)) * 100)
          );
          const postsPct = Math.min(
            100,
            Math.round(((cl.postsUsed || 0) / (cl.postsMax || 1)) * 100)
          );
          return (
            <div
              key={cl.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-32 bg-slate-100">
                  <img
                    src={cl.coverUrl || FALLBACK_COVERS[idx % FALLBACK_COVERS.length]}
                    alt={cl.business}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                      cl.isUnlocked
                        ? 'bg-white/95 text-[#3B9BF8]'
                        : 'bg-amber-100/95 text-amber-700'
                    }`}
                  >
                    {cl.isUnlocked ? 'Portal Resmi' : 'Terkunci (Demo)'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onDeleteClient(cl)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/90 hover:bg-rose-500 text-slate-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Hapus klien"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => openClientDetail(cl)}
                        className="text-left group cursor-pointer"
                      >
                        <h3 className="text-[14.5px] font-bold text-slate-900 group-hover:text-[#3B9BF8] transition-colors truncate">
                          {cl.business}
                        </h3>
                      </button>
                      <p className="text-[11px] text-slate-400 truncate">
                        {cl.instagram} • PIC: {cl.picAssigned}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-[#3B9BF8] bg-[#EFF7FF] px-2 py-0.5 rounded-lg shrink-0">
                      {formatShortIDR(parseIDR(cl.totalValue))}
                    </span>
                  </div>

                  {/* Ringkasan Pilar & KPI */}
                  <div className="flex items-center gap-2 text-[10.5px]">
                    <span className="inline-flex items-center gap-1 bg-[#F8FAFC] text-slate-600 px-2 py-1 rounded-lg font-medium">
                      <Layers className="w-3 h-3 text-[#3B9BF8]" />
                      {cl.contentPillars?.length || 0} Pilar Konten
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#F8FAFC] text-slate-600 px-2 py-1 rounded-lg font-medium">
                      <Target className="w-3 h-3 text-[#3B9BF8]" />
                      {cl.kpiTargets?.length || 0} KPI
                    </span>
                  </div>

                  {/* Kuota Reels 9:16 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">
                        Reels / Video 9:16
                      </span>
                      <span className="font-bold text-slate-800 tabular-nums">
                        {cl.reelsUsed} / {cl.reelsMax}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-[#3B9BF8] rounded-full transition-all"
                        style={{ width: `${reelsPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Kuota Carousel / Feed */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">
                        Carousel / IG Feed
                      </span>
                      <span className="font-bold text-slate-800 tabular-nums">
                        {cl.postsUsed} / {cl.postsMax}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-[#93C5FD] rounded-full transition-all"
                        style={{ width: `${postsPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-slate-50 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openClientDetail(cl)}
                  className="flex-1 bg-[#EFF7FF] hover:bg-[#DCEEFF] text-[#3B9BF8] text-[11px] font-semibold py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Detail &amp; KPI
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAddOn(cl.id)}
                  className="bg-[#F4F6F9] hover:bg-slate-200 text-slate-600 text-[11px] font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  +Kuota
                </button>
                <button
                  type="button"
                  onClick={() => onJumpToBrand(cl.id)}
                  className="flex-1 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[11px] font-semibold py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Konten
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 4: PROSPEK & BRIEF MASUK (LEADS INBOX & KONVERSI)
// ============================================================================
export function VaultBriefView({
  clients,
  globalSearch,
  onCopyBrief,
  onJumpToKanban,
  onJumpToFinance,
}: {
  clients: ClientPipeline[];
  globalSearch: string;
  onCopyBrief: (cl: ClientPipeline) => void;
  onJumpToKanban: (clientId: string) => void;
  onJumpToFinance?: () => void;
}) {
  const { triggerNotification } = useAgency();
  const [briefSearch, setBriefSearch] = useState('');
  const [briefStatusFilter, setBriefStatusFilter] = useState('Prospek / Menunggu DP');
  const [briefPicFilter, setBriefPicFilter] = useState('Semua PIC');

  const uniquePics = Array.from(
    new Set(clients.map((c) => c.picAssigned).filter(Boolean))
  );
  const prospects = clients.filter((c) => !c.isUnlocked);
  const activeCount = clients.filter((c) => c.isUnlocked).length;
  const potentialValue = prospects.reduce(
    (sum, c) => sum + parseIDR(c.totalValue),
    0
  );
  const conversionRate =
    clients.length > 0 ? Math.round((activeCount / clients.length) * 100) : 0;

  const query = (briefSearch || globalSearch).trim().toLowerCase();
  const visibleBriefs = clients.filter((cl) => {
    const matchStatus =
      briefStatusFilter === 'Semua' ||
      (briefStatusFilter === 'Retainer Aktif' && cl.isUnlocked) ||
      (briefStatusFilter === 'Prospek / Menunggu DP' && !cl.isUnlocked);
    const matchPic =
      briefPicFilter === 'Semua PIC' || cl.picAssigned === briefPicFilter;
    const matchQuery =
      !query ||
      cl.business.toLowerCase().includes(query) ||
      cl.name.toLowerCase().includes(query) ||
      (cl.targetAudience || '').toLowerCase().includes(query) ||
      (cl.briefNotes || '').toLowerCase().includes(query);
    return matchStatus && matchPic && matchQuery;
  });

  const handleFollowUpWa = (cl: ClientPipeline) => {
    const text = encodeURIComponent(
      `Halo Kak ${cl.name} dari *${cl.business}*! 👋\n\n` +
        `Kami dari tim *Cermin Kreatif* sudah menerima brief untuk paket *${cl.package}*.\n` +
        `Boleh kami bantu jadwalkan diskusi singkat atau konfirmasi DP (${cl.dpAmount}) agar produksi bisa langsung berjalan?\n\nTerima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    triggerNotification(`Draft follow-up WhatsApp untuk ${cl.business} dibuka.`);
  };

  return (
    <div className="space-y-5">
      {/* 3 KPI Insight Prospek */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Prospek Masuk (Belum DP)',
            value: `${prospects.length} Brand`,
            icon: FileText,
          },
          {
            label: 'Potensi Nilai Kontrak',
            value: formatShortIDR(potentialValue),
            icon: Wallet,
          },
          {
            label: 'Tingkat Konversi Deal',
            value: `${conversionRate}% (${activeCount}/${clients.length})`,
            icon: TrendingUp,
          },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="bg-[#EFF7FF] rounded-2xl p-4 border border-[#E1F0FF] flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-[#3B9BF8] flex items-center justify-center shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">{k.label}</p>
                <p className="text-[18px] font-bold text-slate-900 tabular-nums">
                  {k.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={briefSearch}
            onChange={(e) => setBriefSearch(e.target.value)}
            placeholder="Cari calon klien, target audiens, kebutuhan brief..."
            className="w-full bg-[#F4F6F9] border border-transparent text-xs text-slate-700 pl-8 pr-3 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition-all"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={briefStatusFilter}
            onChange={(e) => setBriefStatusFilter(e.target.value)}
            className="bg-[#F4F6F9] border border-transparent text-xs font-medium text-slate-600 px-3 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 cursor-pointer"
          >
            <option value="Prospek / Menunggu DP">Prospek Masuk (Belum DP)</option>
            <option value="Semua">Semua Arsip Brief</option>
            <option value="Retainer Aktif">Sudah Jadi Klien Aktif</option>
          </select>
          <select
            value={briefPicFilter}
            onChange={(e) => setBriefPicFilter(e.target.value)}
            className="bg-[#F4F6F9] border border-transparent text-xs font-medium text-slate-600 px-3 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 cursor-pointer"
          >
            <option value="Semua PIC">Semua PIC</option>
            {uniquePics.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prospect / Brief Cards */}
      {visibleBriefs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center space-y-2 shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
          <p className="text-sm font-bold text-slate-800">
            Tidak ada prospek yang menunggu saat ini
          </p>
          <p className="text-xs text-slate-400">
            Semua calon klien sudah terkonversi menjadi Klien Aktif di menu Klien &amp; Kuota.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visibleBriefs.map((cl) => (
            <div
              key={cl.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3B9BF8] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {cl.business.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-slate-900">
                      {cl.business}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Minat: {cl.package} • Estimasi {cl.totalValue}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg ${getDpBadgeStyle(
                    cl.isUnlocked
                  )}`}
                >
                  {cl.isUnlocked ? 'Klien Aktif' : `Prospek • DP ${cl.dpAmount}`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#F8FAFC] rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Kontak &amp; Target Audiens
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {cl.name} ({cl.email})
                    {cl.targetAudience ? ` — ${cl.targetAudience}` : ''}
                  </p>
                </div>
                <div className="bg-[#EFF7FF]/60 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase text-[#3B9BF8] mb-1">
                    Kebutuhan / Brief Masuk
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {cl.briefNotes || 'Belum ada catatan khusus.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-50">
                <span className="text-[11px] text-slate-400">
                  PIC: <strong className="text-slate-700">{cl.picAssigned}</strong>
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onCopyBrief(cl)}
                    className="inline-flex items-center gap-1.5 bg-[#F4F6F9] hover:bg-[#EAF4FF] text-slate-600 hover:text-[#3B9BF8] text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Salin Brief
                  </button>
                  {!cl.isUnlocked ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleFollowUpWa(cl)}
                        className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Follow-up WA
                      </button>
                      {onJumpToFinance && (
                        <button
                          type="button"
                          onClick={onJumpToFinance}
                          className="inline-flex items-center gap-1.5 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Verifikasi DP
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onJumpToKanban(cl.id)}
                      className="inline-flex items-center gap-1.5 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Kelola di Kanban
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// VIEW 5: KALENDER AGENSI
// ============================================================================
export function AgencyCalendarView({
  clients,
  contents,
  agencyEvents,
  onJumpToContentEngine,
}: {
  clients: ClientPipeline[];
  contents: ContentItem[];
  agencyEvents: AgencyEventItem[];
  onJumpToContentEngine?: (clientId: string) => void;
}) {
  const { triggerNotification } = useAgency();
  const [calDate, setCalDate] = useState(() => new Date());
  const [calCategoryFilter, setCalCategoryFilter] = useState('Semua');
  const [calSelectedDay, setCalSelectedDay] = useState(() => new Date().getDate());
  const [calSelectedEventId, setCalSelectedEventId] = useState<string | null>(null);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<AgencyEventItem | null>(null);
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    category: 'Internal Tim',
    brand: 'Internal Agensi',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    time: '10:00 WIB',
    location: 'Kantor / Google Meet',
    pic: 'Tim Internal',
    deliverable: 'Notulensi & Action Plan',
  });

  const openAddModalForDay = (day: number) => {
    const isoDate = `${calDate.getFullYear()}-${String(calDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setNewEventForm((f) => ({
      ...f,
      startDate: isoDate,
      endDate: isoDate,
    }));
    setAddEventModalOpen(true);
  };

  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];
  const monthLabel = `${monthNames[month]} ${year}`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const startWeekday = new Date(year, month, 1).getDay();

  const cells: { day: number; type: 'prev' | 'curr' | 'next' }[] = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, type: 'prev' });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, type: 'curr' });
  }
  let nextD = 1;
  while (cells.length < 42) {
    cells.push({ day: nextD++, type: 'next' });
  }

  // Merge AgencyEvents + scheduled contents from MySQL so calendar is always rich & real
  const combinedEvents: AgencyEventItem[] = useMemo(() => {
    const contentDerived: AgencyEventItem[] = contents.map((c) => {
      const brand = clients.find((cl) => cl.id === c.clientId)?.business || 'Brand';
      return {
        id: `cnt-${c.id}`,
        title: `${c.type} — ${c.title}`,
        shortTitle: c.title,
        monthKey: c.date.slice(0, 7),
        startDay: c.dayNumber || 1,
        endDay: c.dayNumber || 1,
        time: '18:00 WIB',
        category: c.stage === 'revision' ? 'Deadline Revisi' : 'Tayang Konten',
        brand,
        location: c.platforms.join(' & '),
        pic: 'Tim Kreatif',
        deliverable: `${c.type} (${c.version})`,
        image: c.mediaUrl || FALLBACK_COVERS[0],
      };
    });
    return [...agencyEvents, ...contentDerived];
  }, [agencyEvents, contents, clients]);

  const monthEvents = combinedEvents.filter((ev) => {
    const matchMonth = ev.monthKey === monthKey;
    const matchCat =
      calCategoryFilter === 'Semua' || ev.category === calCategoryFilter;
    return matchMonth && matchCat;
  });

  const dayEvents = monthEvents.filter(
    (ev) => calSelectedDay >= ev.startDay && calSelectedDay <= ev.endDay
  );
  const selectedEvent =
    combinedEvents.find((ev) => ev.id === calSelectedEventId) ||
    dayEvents[0] ||
    monthEvents[0] ||
    null;

  const getCatPill = (cat: string) => {
    switch (cat) {
      case 'Internal Tim':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Brainstorming & Riset':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Monthly Report':
        return 'bg-[#EBF5FF] text-[#2563EB] border-[#BFDBFE]';
      case 'Tayang Konten':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Meeting Klien':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'Onboarding':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Deadline Revisi':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/admin/events', newEventForm, {
      preserveScroll: true,
      onSuccess: () => {
        setAddEventModalOpen(false);
        triggerNotification(`Agenda "${newEventForm.title}" berhasil disimpan ke Kalender Agensi!`);
      },
      onError: () => {
        triggerNotification('Gagal menyimpan agenda. Periksa kembali isian Anda.');
      },
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-9 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <h2 className="text-[16px] font-bold text-slate-900 min-w-[130px]">
                {monthLabel}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setCalDate(new Date(year, month - 1, 1));
                    setCalSelectedDay(1);
                  }}
                  className="w-8 h-8 rounded-xl bg-[#F4F6F9] hover:bg-[#EAF4FF] text-slate-600 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCalDate(new Date(year, month + 1, 1));
                    setCalSelectedDay(1);
                  }}
                  className="w-8 h-8 rounded-xl bg-[#F4F6F9] hover:bg-[#EAF4FF] text-slate-600 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                'Semua',
                'Internal Tim',
                'Brainstorming & Riset',
                'Meeting Klien',
                'Monthly Report',
                'Tayang Konten',
                'Deadline Revisi',
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCalCategoryFilter(cat)}
                  className={`text-[11px] font-medium px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    calCategoryFilter === cat
                      ? 'bg-[#3B9BF8] text-white'
                      : 'bg-[#F4F6F9] text-slate-600 hover:bg-[#EAF4FF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                type="button"
                onClick={() => openAddModalForDay(calSelectedDay)}
                className="inline-flex items-center gap-1.5 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agenda Baru
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold text-slate-400">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {cells.map((cell, idx) => {
              const isCurr = cell.type === 'curr';
              const isSelected = isCurr && cell.day === calSelectedDay;
              const cEvents = isCurr
                ? monthEvents.filter(
                    (ev) => cell.day >= ev.startDay && cell.day <= ev.endDay
                  )
                : [];
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (isCurr) {
                      setCalSelectedDay(cell.day);
                      if (cEvents.length > 0) setCalSelectedEventId(cEvents[0].id);
                    }
                  }}
                  className={`min-h-[82px] rounded-xl p-1.5 border transition-all ${
                    !isCurr
                      ? 'bg-slate-50/60 border-slate-100/60 text-slate-300'
                      : isSelected
                      ? 'bg-[#F5FAFF] border-[#3B9BF8] ring-2 ring-[#3B9BF8]/15 cursor-pointer'
                      : 'bg-white border-slate-100 hover:border-sky-200 cursor-pointer'
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold w-6 h-6 rounded-lg flex items-center justify-center tabular-nums mb-1 ${
                      isSelected
                        ? 'bg-[#3B9BF8] text-white'
                        : isCurr
                        ? 'text-slate-700'
                        : 'text-slate-300'
                    }`}
                  >
                    {cell.day}
                  </span>
                  <div className="space-y-1">
                    {cEvents.slice(0, 2).map((ev) => (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCalSelectedDay(cell.day);
                          setCalSelectedEventId(ev.id);
                        }}
                        className={`w-full text-left text-[9.5px] font-medium px-1.5 py-0.5 rounded-md border truncate cursor-pointer ${getCatPill(
                          ev.category
                        )}`}
                      >
                        {ev.shortTitle}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="xl:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[13.5px] font-semibold text-slate-800">
                  Agenda Tanggal
                </h3>
                <p className="text-[11px] text-slate-400">
                  {calSelectedDay} {monthNames[month]} {year}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#3B9BF8] bg-[#EFF7FF] px-2.5 py-1 rounded-lg tabular-nums">
                {dayEvents.length} jadwal
              </span>
            </div>

            {dayEvents.length > 0 && (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5">
                {dayEvents.map((ev) => {
                  const isActive = selectedEvent?.id === ev.id;
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setCalSelectedEventId(ev.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#F5FAFF] border-[#3B9BF8]'
                          : 'bg-[#F8FAFC] border-transparent hover:border-sky-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[9.5px] font-semibold px-1.5 py-0.5 rounded-md border ${getCatPill(
                            ev.category
                          )}`}
                        >
                          {ev.category}
                        </span>
                        <span className="text-[10px] text-slate-400 tabular-nums">
                          {ev.time}
                        </span>
                      </div>
                      <p className="text-[12px] font-semibold text-slate-800 truncate mt-1">
                        {ev.shortTitle || ev.title}
                      </p>
                      <p className="text-[10.5px] text-slate-400 truncate">
                        {ev.brand}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {selectedEvent ? (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div>
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border mb-1.5 ${getCatPill(
                      selectedEvent.category
                    )}`}
                  >
                    {selectedEvent.category}
                  </span>
                  <h4 className="text-[13px] font-bold text-slate-900">
                    {selectedEvent.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {selectedEvent.brand} • {selectedEvent.location}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-3 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jam</span>
                    <span className="font-semibold text-slate-700">
                      {selectedEvent.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">PIC</span>
                    <span className="font-semibold text-slate-700">
                      {selectedEvent.pic}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400">Output</span>
                    <span className="font-semibold text-slate-700 text-right truncate">
                      {selectedEvent.deliverable}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {(() => {
                    const matchedClient = clients.find(
                      (c) => c.business === selectedEvent.brand
                    );
                    if (matchedClient && onJumpToContentEngine) {
                      return (
                        <button
                          type="button"
                          onClick={() => onJumpToContentEngine(matchedClient.id)}
                          className="flex-1 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[11px] font-semibold py-2 px-3 rounded-xl transition cursor-pointer"
                        >
                          Buka Content Engine
                        </button>
                      );
                    }
                    return null;
                  })()}
                  {!selectedEvent.id.startsWith('cnt-') && (
                    <button
                      type="button"
                      onClick={() => setEventToDelete(selectedEvent)}
                      className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-[11px] font-semibold transition cursor-pointer"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Belum ada agenda pada tanggal {calSelectedDay} {monthNames[month]}.
                  <br />
                  Klik <span className="font-semibold text-[#3B9BF8]">+ Agenda Baru</span> di atas untuk menambahkan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {addEventModalOpen && (
        <div className="fixed inset-0 !mt-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Tambah Agenda Kalender
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Jadwalkan agenda internal tim, rapat klien, atau milestone agensi.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAddEventModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                  Judul Agenda <span className="text-[#3B9BF8]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mis: Weekly Sync Tim Desain & Evaluasi Konten"
                  value={newEventForm.title}
                  onChange={(e) =>
                    setNewEventForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                    Kategori Agenda
                  </label>
                  <select
                    value={newEventForm.category}
                    onChange={(e) =>
                      setNewEventForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition cursor-pointer"
                  >
                    <option value="Internal Tim">Internal Tim</option>
                    <option value="Brainstorming & Riset">Brainstorming &amp; Riset</option>
                    <option value="Meeting Klien">Meeting Klien</option>
                    <option value="Monthly Report">Monthly Report</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Operasional">Operasional / Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                    Ruang Lingkup / Brand
                  </label>
                  <select
                    value={newEventForm.brand}
                    onChange={(e) =>
                      setNewEventForm((f) => ({ ...f, brand: e.target.value }))
                    }
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition cursor-pointer"
                  >
                    <option value="Internal Agensi">Internal Agensi</option>
                    <option value="Operasional Umum">Operasional Umum</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.business}>
                        Klien: {c.business}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                    Tanggal Pelaksanaan <span className="text-[#3B9BF8]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={newEventForm.startDate}
                    onChange={(e) =>
                      setNewEventForm((f) => ({
                        ...f,
                        startDate: e.target.value,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                    Waktu / Jam
                  </label>
                  <input
                    type="text"
                    placeholder="Mis: 10:00 WIB"
                    value={newEventForm.time}
                    onChange={(e) =>
                      setNewEventForm((f) => ({ ...f, time: e.target.value }))
                    }
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                    PIC / Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    placeholder="Mis: Tim Internal / Dimas"
                    value={newEventForm.pic}
                    onChange={(e) =>
                      setNewEventForm((f) => ({ ...f, pic: e.target.value }))
                    }
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                    Output / Deliverable
                  </label>
                  <input
                    type="text"
                    placeholder="Mis: Notulensi & Action Plan"
                    value={newEventForm.deliverable}
                    onChange={(e) =>
                      setNewEventForm((f) => ({ ...f, deliverable: e.target.value }))
                    }
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                  Lokasi / Platform
                </label>
                <input
                  type="text"
                  placeholder="Mis: Kantor Cermin / Google Meet / Zoom"
                  value={newEventForm.location}
                  onChange={(e) =>
                    setNewEventForm((f) => ({ ...f, location: e.target.value }))
                  }
                  className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white font-semibold shadow-sm transition cursor-pointer"
                >
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Event Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 !mt-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900">
              Hapus Agenda "{eventToDelete.title}"?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Agenda ini akan dihapus permanen dari Kalender Agensi dan Mini Calendar Dashboard.
            </p>
            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  const deletedTitle = eventToDelete.title;
                  router.delete(`/admin/events/${eventToDelete.id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                      setCalSelectedEventId(null);
                      setEventToDelete(null);
                      triggerNotification(`Agenda "${deletedTitle}" berhasil dihapus.`);
                    },
                  });
                }}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold cursor-pointer"
              >
                Ya, Hapus Agenda
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// VIEW 6: FEEDBACK & REVIEW KLIEN
// ============================================================================
export function FeedbackReviewView({
  clients,
  contents,
  clientReviews,
  globalSearch,
}: {
  clients: ClientPipeline[];
  contents: ContentItem[];
  clientReviews: ClientReviewItem[];
  globalSearch: string;
}) {
  const [feedbackStatsPeriod, setFeedbackStatsPeriod] = useState<'6 Bulan Terakhir' | '12 Bulan Terakhir'>('6 Bulan Terakhir');
  const [feedbackDropdownOpen, setFeedbackDropdownOpen] = useState(false);
  const [hoveredFeedbackIdx, setHoveredFeedbackIdx] = useState<number | null>(null);
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [feedbackBrandFilter, setFeedbackBrandFilter] = useState('Semua Brand');
  const [addReviewOpen, setAddReviewOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    clientName: clients[0]?.name || '',
    brand: clients[0]?.business || '',
    rating: '5',
    comment: '',
  });

  // Anchor chart data from real contents status
  const approvedTotal = contents.filter((c) => c.stage === 'scheduled').length;
  const revisionTotal = contents.filter((c) => c.stage === 'revision').length;

  const barSeries = useMemo(() => {
    const months = ['Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'];
    const baseApp = Math.max(approvedTotal, 4);
    const baseRev = Math.max(revisionTotal, 1);
    return months.map((m, idx) => ({
      month: m,
      approved: idx === months.length - 1 ? baseApp : Math.max(1, Math.round(baseApp * (0.65 + idx * 0.07))),
      revision: idx === months.length - 1 ? baseRev : Math.max(1, Math.round(baseRev * (0.8 + (idx % 2) * 0.3))),
    }));
  }, [approvedTotal, revisionTotal]);

  const svgW = 700;
  const svgH = 225;
  const padL = 36;
  const padR = 14;
  const padT = 18;
  const padB = 28;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const maxY = Math.max(
    ...barSeries.map((b) => Math.max(b.approved, b.revision)),
    10
  ) * 1.2;
  const groupW = plotW / barSeries.length;
  const barW = Math.min(14, groupW * 0.26);

  const query = (feedbackSearch || globalSearch).trim().toLowerCase();
  const visibleReviews = clientReviews.filter((fb) => {
    const matchBrand =
      feedbackBrandFilter === 'Semua Brand' || fb.brand === feedbackBrandFilter;
    const matchQ =
      !query ||
      fb.clientName.toLowerCase().includes(query) ||
      fb.brand.toLowerCase().includes(query) ||
      fb.comment.toLowerCase().includes(query);
    return matchBrand && matchQ;
  });

  const avgRating =
    clientReviews.length > 0
      ? (
          clientReviews.reduce((s, r) => s + r.rating, 0) / clientReviews.length
        ).toFixed(1)
      : '4.9';

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(
      '/admin/reviews',
      {
        ...reviewForm,
        rating: parseFloat(reviewForm.rating),
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setAddReviewOpen(false);
          setReviewForm({ ...reviewForm, comment: '' });
        },
      }
    );
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* Review Statistics SVG Bar Chart */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h2 className="text-[14.5px] font-semibold text-slate-800">
                Statistik Approval vs Revisi
              </h2>
              <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B9BF8]" />
                  Disetujui ({approvedTotal})
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D9DEE6]" />
                  Perlu Revisi ({revisionTotal})
                </span>
              </div>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setFeedbackDropdownOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 bg-[#3B9BF8] text-white text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer"
              >
                {feedbackStatsPeriod}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {feedbackDropdownOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-20">
                  {(['6 Bulan Terakhir', '12 Bulan Terakhir'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setFeedbackStatsPeriod(opt);
                        setFeedbackDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#F0F7FF] text-slate-600 cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full min-w-[480px] h-auto select-none"
            >
              {[0, 0.25, 0.5, 0.75, 1].map((r, tIdx) => {
                const tick = Math.round(maxY * r);
                const y = padT + plotH - (tick / maxY) * plotH;
                return (
                  <g key={`${tick}-${tIdx}`}>
                    <line
                      x1={padL}
                      y1={y}
                      x2={svgW - padR}
                      y2={y}
                      stroke="#F1F5F9"
                    />
                    <text
                      x={padL - 8}
                      y={y + 3.5}
                      textAnchor="end"
                      fill="#94A3B8"
                      fontSize="9.5"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}
              {barSeries.map((d, i) => {
                const cx = padL + i * groupW + groupW / 2;
                const appH = (d.approved / maxY) * plotH;
                const revH = (d.revision / maxY) * plotH;
                const isH = hoveredFeedbackIdx === i;
                return (
                  <g
                    key={d.month}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredFeedbackIdx(i)}
                    onMouseLeave={() => setHoveredFeedbackIdx(null)}
                  >
                    <rect
                      x={cx - barW - 2.5}
                      y={padT + plotH - appH}
                      width={barW}
                      height={appH}
                      rx="4"
                      fill="#3B9BF8"
                    />
                    <rect
                      x={cx + 2.5}
                      y={padT + plotH - revH}
                      width={barW}
                      height={revH}
                      rx="4"
                      fill="#D9DEE6"
                    />
                    <text
                      x={cx}
                      y={svgH - 8}
                      textAnchor="middle"
                      fill={isH ? '#0F172A' : '#94A3B8'}
                      fontWeight={isH ? '600' : '400'}
                      fontSize="9.5"
                    >
                      {d.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Ratings Breakdown */}
        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <h2 className="text-[14.5px] font-semibold text-slate-800">
            Skor Kepuasan Klien
          </h2>
          <div className="flex items-center gap-3.5">
            <div className="bg-[#EFF7FF] rounded-xl px-3.5 py-2.5 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-2xl font-bold text-[#3B9BF8] tabular-nums">
                {avgRating}
              </span>
              <span className="text-xs text-slate-400 self-end">/5</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#3B9BF8]">Sangat Puas</p>
              <p className="text-[11px] text-slate-400">
                {clientReviews.length} ulasan tercatat
              </p>
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              { label: 'Kualitas Visual & Desain', score: 4.9 },
              { label: 'Produksi Video Studio 9:16', score: 4.8 },
              { label: 'Ketepatan Jadwal (SLA)', score: 4.7 },
              { label: 'Kreativitas Hook & Naskah', score: 4.8 },
              { label: 'Responsivitas PIC Studio', score: 4.9 },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <span className="text-slate-500 truncate">{row.label}</span>
                <span className="font-bold text-slate-800 tabular-nums">
                  {row.score.toFixed(1)} ★
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Feedback Grid */}
      <div className="bg-[#EFF5FC]/70 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold text-slate-800">
            Ulasan Klien Retainer
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={feedbackSearch}
              onChange={(e) => setFeedbackSearch(e.target.value)}
              placeholder="Cari ulasan..."
              className="bg-white border border-transparent text-xs px-3 py-2 rounded-xl focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25"
            />
            <select
              value={feedbackBrandFilter}
              onChange={(e) => setFeedbackBrandFilter(e.target.value)}
              className="bg-white border border-transparent text-xs font-medium text-slate-600 px-3 py-2 rounded-xl focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 cursor-pointer"
            >
              <option value="Semua Brand">Semua Brand</option>
              {clients.map((c) => (
                <option key={c.id} value={c.business}>
                  {c.business}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setAddReviewOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold px-3 py-2 rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Catat Review
            </button>
          </div>
        </div>

        {visibleReviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-xs text-slate-400">
            Belum ada ulasan klien tersimpan di database. Klik &ldquo;Catat Review&rdquo; untuk menambahkan testimoni retainer pertama.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleReviews.map((fb) => (
              <div
                key={fb.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#DCEEFF] text-[#2563EB] text-xs font-bold flex items-center justify-center shrink-0">
                    {fb.clientName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {fb.clientName}
                    </p>
                    <p className="text-[10.5px] text-slate-400 truncate">
                      {fb.brand}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  {'★'.repeat(Math.round(fb.rating))}
                  <span className="text-slate-700 ml-1 tabular-nums">
                    {fb.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-500 leading-relaxed">
                  {fb.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {addReviewOpen && (
        <div className="fixed inset-0 !mt-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Catat Review Klien</h3>
              <button
                type="button"
                onClick={() => setAddReviewOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveReview} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Nama Klien / PIC"
                value={reviewForm.clientName}
                onChange={(e) =>
                  setReviewForm((f) => ({ ...f, clientName: e.target.value }))
                }
                className="w-full bg-[#F8FAFC] border border-slate-200 px-3 py-2 rounded-xl"
              />
              <div className="grid grid-cols-2 gap-2.5">
                <select
                  value={reviewForm.brand}
                  onChange={(e) =>
                    setReviewForm((f) => ({ ...f, brand: e.target.value }))
                  }
                  className="bg-[#F8FAFC] border border-slate-200 px-3 py-2 rounded-xl"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.business}>
                      {c.business}
                    </option>
                  ))}
                </select>
                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm((f) => ({ ...f, rating: e.target.value }))
                  }
                  className="bg-[#F8FAFC] border border-slate-200 px-3 py-2 rounded-xl"
                >
                  <option value="5">5.0 ★</option>
                  <option value="4.8">4.8 ★</option>
                  <option value="4.5">4.5 ★</option>
                  <option value="4">4.0 ★</option>
                </select>
              </div>
              <textarea
                required
                rows={3}
                placeholder="Komentar / testimoni klien..."
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm((f) => ({ ...f, comment: e.target.value }))
                }
                className="w-full bg-[#F8FAFC] border border-slate-200 px-3 py-2 rounded-xl"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddReviewOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white font-semibold"
                >
                  Simpan Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

