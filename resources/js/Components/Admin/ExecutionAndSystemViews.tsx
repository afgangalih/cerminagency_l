'use client';

import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
  Columns,
  Calendar,
  Grid,
  Smartphone,
  Plus,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Play,
  Clapperboard,
  Camera,
  CheckCircle2,
  Building2,
  Trash2,
  FolderOpen,
  CheckCheck,
  MapPin,
  User,
  Shield,
  Users,
  Laptop,
  ExternalLink,
  X,
} from 'lucide-react';
import {
  ClientPipeline,
  ContentItem,
  ContentStage,
  PlatformType,
  VideoProductionTask,
  AgencyNotificationItem,
  StudioTeamMember,
} from '@/types';

const KANBAN_STAGES: {
  id: ContentStage;
  label: string;
  short: string;
  dot: string;
  badge: string;
}[] = [
  {
    id: 'script',
    label: '1. Riset & Naskah',
    short: 'Naskah',
    dot: 'bg-slate-400',
    badge: 'bg-slate-100 text-slate-600',
  },
  {
    id: 'production',
    label: '2. Produksi & Edit',
    short: 'Produksi',
    dot: 'bg-[#3B9BF8]',
    badge: 'bg-[#EFF7FF] text-[#3B9BF8]',
  },
  {
    id: 'review',
    label: '3. Menunggu Review',
    short: 'Review',
    dot: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-700',
  },
  {
    id: 'revision',
    label: '4. Perlu Revisi',
    short: 'Revisi',
    dot: 'bg-rose-500',
    badge: 'bg-rose-50 text-rose-600',
  },
  {
    id: 'scheduled',
    label: '5. Siap Tayang',
    short: 'Siap Tayang',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 'published',
    label: '6. Sudah Tayang (Live)',
    short: 'Sudah Tayang',
    dot: 'bg-[#3B9BF8]',
    badge: 'bg-[#EFF7FF] text-[#3B9BF8]',
  },
];

const STUDIO_PHASES = [
  'Riset & Naskah',
  'Produksi & Shoot',
  'Penyuntingan & Desain',
  'Quality Control',
];

const FALLBACK_THUMB =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

// ============================================================================
// VIEW 7: CONTENT ENGINE (MULTI-VIEW PER-BRAND)
// ============================================================================
export function ContentEngineView({
  selectedClient,
  contents,
  onOpenAddContent,
  onPreviewContent,
  onOpenDraftV2,
  onMoveStage,
  onDeleteContent,
}: {
  selectedClient: ClientPipeline;
  contents: ContentItem[];
  onOpenAddContent: () => void;
  onPreviewContent: (item: ContentItem) => void;
  onOpenDraftV2: (item: ContentItem) => void;
  onMoveStage: (contentId: number, stage: ContentStage, publishedUrl?: string) => void;
  onDeleteContent: (contentId: number) => void;
}) {
  const [contentViewMode, setContentViewMode] = useState<
    'kanban' | 'calendar' | 'ig' | 'tiktok'
  >('kanban');
  const [platformFilter, setPlatformFilter] = useState<'Semua' | PlatformType>(
    'Semua'
  );
  const [selectedTiktokIdx, setSelectedTiktokIdx] = useState(0);
  const [publishModalItem, setPublishModalItem] = useState<ContentItem | null>(null);
  const [publishUrlInput, setPublishUrlInput] = useState('');

  const brandItems = contents.filter((item) => {
    const matchBrand = item.clientId === selectedClient.id;
    const matchPlatform =
      platformFilter === 'Semua' || item.platforms.includes(platformFilter);
    return matchBrand && matchPlatform;
  });

  const tiktokItems = brandItems.filter(
    (i) =>
      i.type.toLowerCase().includes('reel') ||
      i.type.toLowerCase().includes('video') ||
      i.platforms.includes('tiktok')
  );
  const activeTiktok =
    tiktokItems[Math.min(selectedTiktokIdx, Math.max(0, tiktokItems.length - 1))] ||
    brandItems[0] ||
    null;

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'kanban', label: 'Kanban SOP 5 Tahap', icon: Columns },
              { id: 'calendar', label: 'Matriks Kalender 1–31', icon: Calendar },
              { id: 'ig', label: 'Simulator IG 3x3', icon: Grid },
              { id: 'tiktok', label: 'Simulator TikTok 9:16', icon: Smartphone },
            ] as const
          ).map((v) => {
            const Icon = v.icon;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setContentViewMode(v.id)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  contentViewMode === v.id
                    ? 'bg-[#3B9BF8] text-white shadow-sm'
                    : 'bg-[#F4F6F9] text-slate-600 hover:bg-[#EAF4FF] hover:text-[#3B9BF8]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {v.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { key: 'Semua', label: 'Semua' },
              { key: 'instagram', label: 'Instagram' },
              { key: 'tiktok', label: 'TikTok' },
            ] as const
          ).map((plat) => (
            <button
              key={plat.key}
              type="button"
              onClick={() => setPlatformFilter(plat.key)}
              className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg cursor-pointer ${
                platformFilter === plat.key
                  ? 'bg-[#EFF7FF] text-[#3B9BF8] ring-1 ring-[#BFDBFE]'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {plat.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onOpenAddContent}
            className="inline-flex items-center gap-1.5 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold px-3.5 py-2 rounded-xl cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Konten Baru
          </button>
        </div>
      </div>

      {/* MODE 1: KANBAN SOP 6 TAHAP */}
      {contentViewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
          {KANBAN_STAGES.map((stage) => {
            const stageItems = brandItems.filter((i) => i.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="bg-[#F4F8FD] rounded-2xl p-3 border border-[#E6F0FA] space-y-3"
              >
                <div className="flex items-center justify-between px-1">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-800">
                    <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                    {stage.short}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md tabular-nums ${stage.badge}`}
                  >
                    {stageItems.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {stageItems.length === 0 ? (
                    <div className="bg-white/70 rounded-xl p-4 text-center text-[11px] text-slate-400 border border-dashed border-slate-200">
                      Belum ada konten
                    </div>
                  ) : (
                    stageItems.map((item) => {
                      const lastFeedback =
                        item.feedbackHistory?.[item.feedbackHistory.length - 1]?.text;
                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm space-y-2 group"
                        >
                          <div className="relative h-24 rounded-lg overflow-hidden bg-slate-100">
                            <img
                              src={item.mediaUrl || FALLBACK_THUMB}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-1.5 left-1.5 bg-white/95 text-[#3B9BF8] text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase">
                              {item.platforms[0] || 'IG'}
                            </span>
                            <span className="absolute top-1.5 right-1.5 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                              {item.version}
                            </span>
                          </div>

                          <div className="flex items-start justify-between gap-1">
                            <div className="min-w-0">
                              <p className="text-[11.5px] font-bold text-slate-800 leading-snug line-clamp-2">
                                {item.title}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {item.day} • {item.type}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => onDeleteContent(item.id)}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-0.5 transition-opacity cursor-pointer"
                              title="Hapus konten"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          {item.stage === 'revision' && lastFeedback && (
                            <div className="bg-rose-50 border border-rose-100 rounded-lg p-2 text-[10px] text-rose-700 leading-snug">
                              <strong>Revisi Klien:</strong> {lastFeedback}
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={() => onPreviewContent(item)}
                              className="flex-1 bg-[#F4F6F9] hover:bg-[#EAF4FF] text-slate-600 hover:text-[#3B9BF8] text-[10px] font-semibold py-1.5 rounded-lg cursor-pointer"
                            >
                              Pratinjau
                            </button>
                            {item.stage === 'revision' ? (
                              <button
                                type="button"
                                onClick={() => onOpenDraftV2(item)}
                                className="flex-1 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[10px] font-semibold py-1.5 rounded-lg cursor-pointer"
                              >
                                Input V2
                              </button>
                            ) : (
                              <select
                                value={item.stage}
                                onChange={(e) => {
                                  const nextStage = e.target.value as ContentStage;
                                  if (nextStage === 'published') {
                                    setPublishUrlInput(item.publishedUrl || '');
                                    setPublishModalItem(item);
                                  } else {
                                    onMoveStage(item.id, nextStage);
                                  }
                                }}
                                className="flex-1 bg-[#EFF7FF] border-0 text-[#3B9BF8] text-[10px] font-semibold px-1.5 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/30 cursor-pointer"
                              >
                                {KANBAN_STAGES.map((st) => (
                                  <option key={st.id} value={st.id}>
                                    {st.short}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>

                          {item.stage === 'published' && item.publishedUrl && (
                            <a
                              href={item.publishedUrl.startsWith('http') ? item.publishedUrl : `https://${item.publishedUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#3B9BF8] hover:underline pt-0.5"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Lihat Postingan Live
                            </a>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 2: MATRIKS KALENDER 1-31 */}
      {contentViewMode === 'calendar' && (() => {
        const now = new Date();
        const calYear = now.getFullYear();
        const calMonth = now.getMonth();
        const calMonthNames = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
        ];
        const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
        const prevMonthDays = new Date(calYear, calMonth, 0).getDate();
        const startWeekday = new Date(calYear, calMonth, 1).getDay();

        const calCells: { day: number; type: 'prev' | 'curr' | 'next' }[] = [];
        for (let i = startWeekday - 1; i >= 0; i--) {
          calCells.push({ day: prevMonthDays - i, type: 'prev' });
        }
        for (let d = 1; d <= daysInMonth; d++) {
          calCells.push({ day: d, type: 'curr' });
        }
        let nextDay = 1;
        while (calCells.length % 7 !== 0) {
          calCells.push({ day: nextDay++, type: 'next' });
        }

        const getStagePillClass = (st: ContentStage) => {
          switch (st) {
            case 'script':
              return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'production':
              return 'bg-[#EFF7FF] text-[#3B9BF8] border-[#BFDBFE]';
            case 'review':
              return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'revision':
              return 'bg-rose-50 text-rose-700 border-rose-200';
            case 'scheduled':
              return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            default:
              return 'bg-slate-100 text-slate-600 border-slate-200';
          }
        };

        return (
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[15px] font-bold text-slate-900">
                  Matriks Jadwal Tayang — {calMonthNames[calMonth]} {calYear}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {brandItems.length} konten terjadwal untuk {selectedClient.business}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[10.5px]">
                {KANBAN_STAGES.map((st) => (
                  <span
                    key={st.id}
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-semibold ${st.badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                    {st.short}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold text-slate-400">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {calCells.map((cell, idx) => {
                const isCurr = cell.type === 'curr';
                const isToday = isCurr && cell.day === now.getDate();
                const dItems = isCurr
                  ? brandItems.filter((i) => i.dayNumber === cell.day)
                  : [];

                return (
                  <div
                    key={idx}
                    className={`min-h-[104px] rounded-xl border p-2 flex flex-col justify-between transition-colors ${
                      !isCurr
                        ? 'bg-slate-50/60 border-slate-100/60 text-slate-300'
                        : isToday
                        ? 'bg-[#F5FAFF] border-[#3B9BF8] ring-2 ring-[#3B9BF8]/15'
                        : 'bg-white border-slate-100 hover:border-sky-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[11px] font-bold w-6 h-6 rounded-lg flex items-center justify-center tabular-nums ${
                          isToday
                            ? 'bg-[#3B9BF8] text-white'
                            : isCurr
                            ? 'text-slate-700'
                            : 'text-slate-300'
                        }`}
                      >
                        {cell.day}
                      </span>
                      {dItems.length > 0 && (
                        <span className="text-[9.5px] font-bold text-[#3B9BF8] bg-[#EFF7FF] px-1.5 py-0.5 rounded-md tabular-nums">
                          {dItems.length}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 flex-1">
                      {dItems.map((it) => (
                        <button
                          key={it.id}
                          type="button"
                          onClick={() => onPreviewContent(it)}
                          className={`w-full text-left border rounded-lg px-2 py-1 text-[10px] font-semibold truncate block cursor-pointer transition-opacity hover:opacity-85 ${getStagePillClass(
                            it.stage
                          )}`}
                          title={`${it.title} (${it.status})`}
                        >
                          {it.title}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* MODE 3: SIMULATOR IG FEED 3x3 */}
      {contentViewMode === 'ig' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-[#3B9BF8] text-white font-bold flex items-center justify-center ring-2 ring-[#3B9BF8]/30">
              {selectedClient.business.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {selectedClient.instagram}
              </h3>
              <p className="text-xs text-slate-500">{selectedClient.business}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Simulasi Grid 3×3 • {brandItems.length} Draf Konten
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {brandItems.slice(0, 9).map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => onPreviewContent(it)}
                className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 group cursor-pointer"
              >
                <img
                  src={it.mediaUrl || FALLBACK_THUMB}
                  alt={it.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1 left-1 bg-slate-900/75 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                  {it.type}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODE 4: SIMULATOR TIKTOK 9:16 */}
      {contentViewMode === 'tiktok' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-5 flex justify-center">
            {activeTiktok ? (
              <div className="w-[270px] h-[480px] rounded-[32px] border-[6px] border-slate-900 overflow-hidden relative bg-slate-900 shadow-xl">
                <img
                  src={activeTiktok.mediaUrl || FALLBACK_THUMB}
                  alt={activeTiktok.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-4 flex flex-col justify-between text-white">
                  <div className="flex justify-between text-[10px] font-semibold">
                    <span>Following • For You</span>
                    <span className="bg-[#3B9BF8] px-2 py-0.5 rounded-full">
                      {activeTiktok.version}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-bold">{selectedClient.instagram}</p>
                      <p className="text-[11px] font-semibold leading-snug">
                        {activeTiktok.title}
                      </p>
                      <p className="text-[10px] text-white/80 line-clamp-2">
                        {activeTiktok.caption}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-[10px]">
                      <Heart className="w-5 h-5" />
                      <MessageCircle className="w-5 h-5" />
                      <Bookmark className="w-5 h-5" />
                      <Share2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-xs text-slate-400">
                Belum ada video 9:16 untuk brand ini.
              </div>
            )}
          </div>
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Antrean Video 9:16 — {selectedClient.business}
            </h3>
            <div className="space-y-2.5">
              {tiktokItems.map((it, idx) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setSelectedTiktokIdx(idx)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeTiktok?.id === it.id
                      ? 'border-[#3B9BF8] bg-[#F5FAFF]'
                      : 'border-slate-100 hover:border-sky-100'
                  }`}
                >
                  <img
                    src={it.mediaUrl || FALLBACK_THUMB}
                    alt={it.title}
                    className="w-12 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {it.title}
                    </p>
                    <p className="text-[10.5px] text-slate-400 mt-0.5">
                      {it.day} • {it.version}
                    </p>
                  </div>
                  <Play className="w-4 h-4 text-[#3B9BF8] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Modal Input Link Postingan Live saat Menandai Sudah Tayang */}
      {publishModalItem && (
        <div className="fixed inset-0 !mt-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Tandai Sudah Tayang (Live)
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate max-w-[260px]">
                    {publishModalItem.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPublishModalItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onMoveStage(publishModalItem.id, 'published', publishUrlInput.trim());
                setPublishModalItem(null);
                setPublishUrlInput('');
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1.5">
                  Link Postingan Live (Instagram / TikTok)
                </label>
                <input
                  type="url"
                  placeholder="https://www.instagram.com/reel/... (opsional)"
                  value={publishUrlInput}
                  onChange={(e) => setPublishUrlInput(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 transition"
                />
                <p className="text-[10.5px] text-slate-400 mt-1.5">
                  Tautan ini akan tampil di Client Portal sebagai bukti konten sudah tayang.
                </p>
              </div>
              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPublishModalItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white font-semibold shadow-sm cursor-pointer"
                >
                  Konfirmasi Sudah Tayang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// VIEW 8: OPERASIONAL STUDIO MALANG
// ============================================================================
export function StudioMalangView({
  clients,
  selectedClient,
  videoTasks,
  onOpenAddTask,
  onUpdateTask,
  onDeleteTask,
  onJumpToKanban,
  onCopyRawLink,
}: {
  clients: ClientPipeline[];
  selectedClient: ClientPipeline;
  videoTasks: VideoProductionTask[];
  onOpenAddTask: () => void;
  onUpdateTask: (
    taskId: number,
    progress: number,
    status: VideoProductionTask['status']
  ) => void;
  onDeleteTask: (taskId: number) => void;
  onJumpToKanban: (clientId: string) => void;
  onCopyRawLink: (url: string) => void;
}) {
  const [studioScope, setStudioScope] = useState<'active' | 'all'>('active');
  const [studioPhaseFilter, setStudioPhaseFilter] = useState('Semua');

  const scopedTasks = videoTasks.filter((t) => {
    const matchScope = studioScope === 'all' || t.clientId === selectedClient.id;
    const matchPhase =
      studioPhaseFilter === 'Semua' || t.phase === studioPhaseFilter;
    return matchScope && matchPhase;
  });

  const runningCount = scopedTasks.filter(
    (t) => t.status === 'Sedang Berjalan'
  ).length;
  const qcCount = scopedTasks.filter((t) => t.status === 'Selesai').length;
  const uniqueBrands = new Set(scopedTasks.map((t) => t.clientId)).size;

  return (
    <div className="space-y-5">
      {/* 4 KPI Aset & Desain */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: 'Total Task Desain', value: scopedTasks.length, icon: Clapperboard },
          { label: 'Sedang Dikerjakan', value: runningCount, icon: Camera },
          { label: 'Selesai / Siap Pakai', value: qcCount, icon: CheckCircle2 },
          { label: 'Brand Aktif', value: uniqueBrands, icon: Building2 },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="bg-[#EFF7FF] rounded-2xl p-4 border border-[#E1F0FF] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-[#3B9BF8] flex items-center justify-center shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500">{k.label}</p>
                <p className="text-[19px] font-bold text-slate-900 tabular-nums">
                  {k.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scope & Phase Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#F4F6F9] p-1 rounded-xl inline-flex">
            <button
              type="button"
              onClick={() => setStudioScope('active')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                studioScope === 'active'
                  ? 'bg-[#3B9BF8] text-white'
                  : 'text-slate-600'
              }`}
            >
              Brand Aktif ({selectedClient.business.split(' ')[0]})
            </button>
            <button
              type="button"
              onClick={() => setStudioScope('all')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                studioScope === 'all'
                  ? 'bg-[#3B9BF8] text-white'
                  : 'text-slate-600'
              }`}
            >
              Semua Brand ({videoTasks.length})
            </button>
          </div>

          <select
            value={studioPhaseFilter}
            onChange={(e) => setStudioPhaseFilter(e.target.value)}
            className="bg-[#F4F6F9] border border-transparent text-xs font-medium text-slate-600 px-3 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 cursor-pointer"
          >
            <option value="Semua">Semua Tahapan</option>
            {STUDIO_PHASES.map((ph) => (
              <option key={ph} value={ph}>
                {ph}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={onOpenAddTask}
          className="inline-flex items-center gap-1.5 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold px-3.5 py-2 rounded-xl cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Task Desain Baru
        </button>
      </div>

      {/* Studio Task Cards */}
      {scopedTasks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-xs text-slate-400">
          Belum ada task produksi studio untuk filter ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {scopedTasks.map((task) => {
            const brand = clients.find((c) => c.id === task.clientId) || selectedClient;
            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3.5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center shrink-0">
                    <Clapperboard className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold bg-[#EFF7FF] text-[#3B9BF8] px-2 py-0.5 rounded-md">
                        {task.phase}
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteTask(task.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                        aria-label="Hapus task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-[13.5px] font-bold text-slate-900 mt-1">
                      {task.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {brand.business} • PIC: {task.shooter}
                    </p>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] rounded-xl p-3 text-[11px] text-slate-600 space-y-2">
                  <p className="font-semibold text-slate-700">
                    Link Hasil / Folder Aset
                  </p>
                  {(() => {
                    const links =
                      task.assetLinks && task.assetLinks.length > 0
                        ? task.assetLinks
                        : task.rawFolder
                        ? [{ label: 'Folder Master', url: task.rawFolder }]
                        : [];
                    if (links.length === 0) {
                      return <p className="text-slate-400">Belum ada link terlampir</p>;
                    }
                    return (
                      <div className="flex flex-wrap gap-1.5">
                        {links.map((link, idx) => (
                          <a
                            key={`${task.id}-link-${idx}`}
                            href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={link.url}
                            className="inline-flex items-center gap-1 bg-white hover:bg-[#EFF7FF] text-[#3B9BF8] border border-slate-200/80 hover:border-[#3B9BF8]/40 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition"
                          >
                            <FolderOpen className="w-3 h-3 shrink-0" />
                            <span className="truncate max-w-[160px]">{link.label || 'Buka Link'}</span>
                          </a>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Progress Bar + Interactive Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-500">
                      Progres Produksi
                    </span>
                    <span className="font-bold text-[#3B9BF8] tabular-nums">
                      {task.progress}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) =>
                      onUpdateTask(task.id, parseInt(e.target.value, 10), task.status)
                    }
                    className="w-full accent-[#3B9BF8] cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-50">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      onUpdateTask(
                        task.id,
                        task.progress,
                        e.target.value as VideoProductionTask['status']
                      )
                    }
                    className="bg-[#F4F6F9] border border-transparent text-[11px] font-semibold text-slate-700 px-2.5 py-1.5 rounded-lg focus:bg-white focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 cursor-pointer"
                  >
                    <option value="Dalam Antrean">Dalam Antrean</option>
                    <option value="Sedang Berjalan">Sedang Berjalan</option>
                    <option value="Selesai">Selesai</option>
                  </select>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const links =
                          task.assetLinks && task.assetLinks.length > 0
                            ? task.assetLinks
                            : task.rawFolder
                            ? [{ label: 'Folder Master', url: task.rawFolder }]
                            : [];
                        const text =
                          links.length > 1
                            ? links.map((l) => `${l.label}: ${l.url}`).join('\n')
                            : links[0]?.url || '';
                        onCopyRawLink(text);
                      }}
                      className="inline-flex items-center gap-1 bg-[#F4F6F9] hover:bg-slate-200 text-slate-600 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg cursor-pointer"
                    >
                      Salin Link
                    </button>
                    <button
                      type="button"
                      onClick={() => onJumpToKanban(task.clientId)}
                      className="inline-flex items-center gap-1 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg cursor-pointer"
                    >
                      Ke Kanban
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// VIEW 9: HALAMAN NOTIFIKASI KHUSUS
// ============================================================================
export function NotificationsView({
  notifications,
  onMarkAllRead,
  onClearRead,
  onNotificationAction,
}: {
  notifications: AgencyNotificationItem[];
  onMarkAllRead: () => void;
  onClearRead: () => void;
  onNotificationAction: (notif: AgencyNotificationItem) => void;
}) {
  const [notifFilter, setNotifFilter] = useState('Semua');
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>({
    dpTransfer: true,
    bottleneckAlert: true,
    clientRevision: true,
    studioReminder: false,
  });

  const categories = [
    'Semua',
    'Belum Dibaca',
    'Finansial & DP',
    'Review & Revisi',
    'Klien & Onboarding',
  ];

  const filteredNotifs = notifications.filter((n) => {
    if (notifFilter === 'Semua') return true;
    if (notifFilter === 'Belum Dibaca') return n.unread;
    return n.category === notifFilter;
  });

  const groups = ['Hari Ini', 'Sebelumnya'];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
      <div className="xl:col-span-8 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setNotifFilter(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  notifFilter === cat
                    ? 'bg-[#3B9BF8] text-white'
                    : 'bg-[#F4F6F9] text-slate-600 hover:bg-[#EAF4FF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onMarkAllRead}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B9BF8] hover:underline cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Tandai Semua Dibaca
            </button>
            <button
              type="button"
              onClick={onClearRead}
              className="text-xs font-medium text-slate-400 hover:text-rose-500 cursor-pointer"
            >
              Bersihkan
            </button>
          </div>
        </div>

        {filteredNotifs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-xs text-slate-400">
            Tidak ada notifikasi di kategori ini.
          </div>
        ) : (
          groups.map((grp) => {
            const grpItems = filteredNotifs.filter((n) => n.group === grp);
            if (grpItems.length === 0) return null;
            return (
              <div key={grp} className="space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  {grp}
                </p>
                <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50 shadow-sm overflow-hidden">
                  {grpItems.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                        notif.unread ? 'bg-[#F6FAFF]' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                            notif.unread ? 'bg-[#3B9BF8]' : 'bg-slate-200'
                          }`}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xs font-bold text-slate-900">
                              {notif.title}
                            </h3>
                            <span className="text-[10px] font-semibold bg-[#EFF7FF] text-[#3B9BF8] px-2 py-0.5 rounded-md">
                              {notif.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {notif.description}
                          </p>
                          <p className="text-[10.5px] text-slate-400 mt-1.5">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNotificationAction(notif)}
                        className="shrink-0 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl cursor-pointer"
                      >
                        {notif.actionLabel}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Preferensi Peringatan
        </h3>
        <div className="space-y-3 text-xs">
          {[
            {
              key: 'dpTransfer',
              title: 'Bukti Transfer DP 50%',
              desc: 'Peringatan instan saat prospek mengunggah slip transfer.',
            },
            {
              key: 'bottleneckAlert',
              title: 'Radar Bottleneck (>24 Jam)',
              desc: 'Notifikasi otomatis jika klien belum review draf >24 jam.',
            },
            {
              key: 'clientRevision',
              title: 'Catatan Revisi Klien',
              desc: 'Info langsung saat klien meminta revisi Draf V2.',
            },
            {
              key: 'studioReminder',
              title: 'Pengingat Jadwal Studio Malang',
              desc: 'Pengingat H-1 sebelum sesi syuting 4K di studio.',
            },
          ].map((pref) => (
            <div
              key={pref.key}
              className="flex items-start justify-between gap-3 py-2 border-b border-slate-50 last:border-0"
            >
              <div>
                <p className="font-semibold text-slate-800">{pref.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{pref.desc}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setNotifPrefs((prev) => ({
                    ...prev,
                    [pref.key]: !prev[pref.key],
                  }))
                }
                className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  notifPrefs[pref.key] ? 'bg-[#3B9BF8]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    notifPrefs[pref.key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 10: PROFIL & AKUN (CLEAN MINIMALIST)
// ============================================================================
export function AdminProfileAccountView({
  initialSubTab = 'profil',
  studioTeam = [],
  onToast,
}: {
  initialSubTab?: 'profil' | 'keamanan' | 'tim';
  studioTeam?: StudioTeamMember[];
  onToast: (msg: string) => void;
}) {
  const page = usePage();
  const authUser = (page.props as any)?.auth?.user;

  const [profileTab, setProfileTab] = useState<'profil' | 'keamanan' | 'tim'>(
    initialSubTab
  );
  const [profileForm, setProfileForm] = useState({
    name: authUser?.name || 'Dimas Pratama',
    email: authUser?.email || 'admin@cerminkreatif.com',
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    router.patch('/profile', profileForm, {
      preserveScroll: true,
      onSuccess: () => onToast('Profil akun berhasil diperbarui!'),
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    router.put('/password', passwordForm, {
      preserveScroll: true,
      onSuccess: () => {
        setPasswordForm({
          current_password: '',
          password: '',
          password_confirmation: '',
        });
        onToast('Kata sandi berhasil diperbarui!');
      },
    });
  };

  const initials = profileForm.name
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-[#3B9BF8] text-white font-bold text-xl flex items-center justify-center ring-2 ring-[#EFF7FF]">
                {initials || 'DP'}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[17px] font-bold text-slate-900 leading-tight">
                  {profileForm.name}
                </h2>
                <span className="text-[10.5px] font-semibold bg-[#EFF7FF] text-[#3B9BF8] px-2.5 py-0.5 rounded-lg">
                  Creative Director &amp; Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{profileForm.email}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 inline-flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#3B9BF8]" />
                Malang Studio HQ, Jawa Timur
              </p>
            </div>
          </div>
        </div>

        {/* Underline Tabs */}
        <div className="flex items-center gap-6 mt-6 pt-3 border-t border-slate-100 overflow-x-auto">
          {(
            [
              { id: 'profil', label: 'Profil Saya', icon: User },
              { id: 'keamanan', label: 'Keamanan & Sesi', icon: Shield },
              { id: 'tim', label: 'Tim Studio', icon: Users },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = profileTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setProfileTab(tab.id)}
                className={`inline-flex items-center gap-1.5 pb-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'border-[#3B9BF8] text-[#3B9BF8]'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {profileTab === 'profil' && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-5 text-xs"
        >
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-[14px] font-bold text-slate-900">
              Informasi Pribadi
            </h3>
            <p className="text-[11.5px] text-slate-400 mt-0.5">
              Perbarui nama dan email akun yang tersimpan di Cermin OS.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11.5px] text-slate-500 font-medium mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full bg-[#F8FAFC] border border-slate-200/70 px-3.5 py-2.5 rounded-xl text-slate-800 focus:bg-white focus:border-[#3B9BF8] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11.5px] text-slate-500 font-medium mb-1.5">
                Email Kerja
              </label>
              <input
                type="email"
                required
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full bg-[#F8FAFC] border border-slate-200/70 px-3.5 py-2.5 rounded-xl text-slate-800 focus:bg-white focus:border-[#3B9BF8] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="bg-[#3B9BF8] hover:bg-[#2589F5] text-white font-semibold px-5 py-2 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      )}

      {profileTab === 'keamanan' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100 text-xs">
          <form onSubmit={handleUpdatePassword} className="p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-[14px] font-bold text-slate-900">Kata Sandi</h3>
              <p className="text-[11.5px] text-slate-400 mt-0.5">
                Gunakan minimal 8 karakter untuk menjaga keamanan akses admin.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-[11px] text-slate-500 font-medium mb-1">
                  Kata Sandi Saat Ini
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.current_password}
                  onChange={(e) =>
                    setPasswordForm((f) => ({
                      ...f,
                      current_password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="w-full bg-[#F8FAFC] border border-slate-200/70 px-3.5 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 font-medium mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.password}
                  onChange={(e) =>
                    setPasswordForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="Minimal 8 karakter"
                  className="w-full bg-[#F8FAFC] border border-slate-200/70 px-3.5 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 font-medium mb-1">
                  Konfirmasi Baru
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.password_confirmation}
                  onChange={(e) =>
                    setPasswordForm((f) => ({
                      ...f,
                      password_confirmation: e.target.value,
                    }))
                  }
                  placeholder="Ulangi kata sandi"
                  className="w-full bg-[#F8FAFC] border border-slate-200/70 px-3.5 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#3B9BF8] hover:bg-[#2589F5] text-white font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Perbarui Kata Sandi
              </button>
            </div>
          </form>

          <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-[13.5px] font-bold text-slate-900">
                Autentikasi 2 Faktor (2FA)
              </h3>
              <p className="text-[11.5px] text-slate-400 mt-0.5">
                Tambahkan verifikasi ekstra saat menyetujui verifikasi DP 50%.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactorEnabled((v) => !v)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 cursor-pointer ${
                twoFactorEnabled ? 'bg-[#3B9BF8]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-3">
            <h3 className="text-[13.5px] font-bold text-slate-900">
              Sesi Perangkat Aktif
            </h3>
            <div className="flex items-center justify-between gap-3 py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F4F6F9] text-[#3B9BF8] flex items-center justify-center">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Browser Desktop — Sesi Aktif
                  </p>
                  <p className="text-[10.5px] text-slate-400">
                    Malang Studio OS • Terautentikasi
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-lg">
                Aktif
              </span>
            </div>
          </div>
        </div>
      )}

      {profileTab === 'tim' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
          {studioTeam.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              Belum ada anggota tim internal terdaftar selain Anda.
            </div>
          ) : (
            studioTeam.map((member) => (
              <div
                key={member.id}
                className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-[#FAFCFF] transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] font-bold text-xs flex items-center justify-center shrink-0">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {member.role} • {member.email}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-semibold px-2.5 py-1 rounded-lg text-[10.5px] bg-emerald-50 text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Aktif
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

