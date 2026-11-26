'use client';

import React, { useState, useMemo } from 'react';
import { ContentItem, PlatformType } from '@/types';
import { useAgency } from '@/context/AgencyContext';
import {
  Calendar,
  Grid3X3,
  Film,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Play,
} from 'lucide-react';

interface CalendarViewProps {
  onSelectItem: (item: ContentItem) => void;
}

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export function CalendarView({ onSelectItem }: CalendarViewProps) {
  const { activeClientContents, selectedClient } = useAgency();

  const [viewMode, setViewMode] = useState<'calendar' | 'instagram' | 'tiktok'>('calendar');
  const [platformFilter, setPlatformFilter] = useState<PlatformType | 'all'>('all');

  // Auto-detect initial month from first scheduled content or current date
  const [calDate, setCalDate] = useState<Date>(() => {
    const firstDate = activeClientContents[0]?.date;
    if (firstDate && /^\d{4}-\d{2}/.test(firstDate)) {
      const [y, m] = firstDate.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [activeDate, setActiveDate] = useState<number>(
    activeClientContents[0]?.dayNumber || new Date().getDate()
  );

  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthLabel = `${MONTH_NAMES[month]} ${year}`;
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

  const filteredContents = useMemo(() => {
    return activeClientContents.filter((item) => {
      if (platformFilter === 'all') return true;
      return item.platforms.includes(platformFilter);
    });
  }, [activeClientContents, platformFilter]);

  const monthContents = useMemo(() => {
    return filteredContents.filter((c) => {
      if (!c.date) return true;
      return c.date.slice(0, 7) === monthKey;
    });
  }, [filteredContents, monthKey]);

  const selectedDayItems = monthContents.filter((c) => c.dayNumber === activeDate);

  const getStatusBadgeStyle = (status: ContentItem['status']) => {
    if (status === 'Disetujui') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Perlu Revisi') return 'bg-rose-50 text-rose-700 border-rose-200';
    if (status === 'Menunggu Review') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-[#EFF7FF] text-[#3B9BF8] border-[#DCEEFF]';
  };

  return (
    <div className="space-y-5">
      {/* Top Controls: View Mode Switcher & Platform Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
        <div className="inline-flex flex-wrap rounded-xl p-1 bg-[#F4F6F9]">
          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              viewMode === 'calendar'
                ? 'bg-[#3B9BF8] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#3B9BF8]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Kalender Distribusi</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('instagram')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              viewMode === 'instagram'
                ? 'bg-[#3B9BF8] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#3B9BF8]'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Simulasi Feed IG 3x3</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('tiktok')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              viewMode === 'tiktok'
                ? 'bg-[#3B9BF8] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#3B9BF8]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Simulasi TikTok 9:16</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline font-medium">
            Platform:
          </span>
          {(['all', 'instagram', 'tiktok', 'youtube_shorts'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatformFilter(p)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                platformFilter === p
                  ? 'bg-[#3B9BF8] text-white shadow-sm'
                  : 'bg-[#F4F6F9] text-slate-600 hover:bg-[#EFF7FF] hover:text-[#3B9BF8]'
              }`}
            >
              {p === 'all'
                ? 'Semua'
                : p === 'instagram'
                ? 'Instagram'
                : p === 'tiktok'
                ? 'TikTok'
                : 'YT Shorts'}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: MONTHLY CALENDAR MATRIX */}
      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          <div className="xl:col-span-9 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <h3 className="font-bold text-[15px] text-slate-900 min-w-[130px]">
                  {monthLabel}
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setCalDate(new Date(year, month - 1, 1));
                      setActiveDate(1);
                    }}
                    className="w-8 h-8 rounded-xl bg-[#F4F6F9] hover:bg-[#EFF7FF] text-slate-600 hover:text-[#3B9BF8] flex items-center justify-center transition cursor-pointer"
                    aria-label="Bulan sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCalDate(new Date(year, month + 1, 1));
                      setActiveDate(1);
                    }}
                    className="w-8 h-8 rounded-xl bg-[#F4F6F9] hover:bg-[#EFF7FF] text-slate-600 hover:text-[#3B9BF8] flex items-center justify-center transition cursor-pointer"
                    aria-label="Bulan berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Disetujui
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Review
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Revisi
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3B9BF8]" />
                  Produksi
                </span>
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
                const dayItems = isCurr
                  ? monthContents.filter((c) => c.dayNumber === cell.day)
                  : [];
                const isSelected = isCurr && cell.day === activeDate;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!isCurr) return;
                      setActiveDate(cell.day);
                      if (dayItems.length === 1) {
                        onSelectItem(dayItems[0]);
                      }
                    }}
                    className={`min-h-[84px] rounded-xl p-1.5 border transition-all ${
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
                      {dayItems.slice(0, 2).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDate(cell.day);
                            onSelectItem(item);
                          }}
                          className={`w-full text-left text-[9.5px] font-semibold px-1.5 py-0.5 rounded-md border truncate cursor-pointer ${getStatusBadgeStyle(
                            item.status
                          )}`}
                        >
                          {item.title}
                        </button>
                      ))}
                      {dayItems.length > 2 && (
                        <span className="block text-[9px] text-[#3B9BF8] font-semibold px-1">
                          +{dayItems.length - 2} lagi
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Day Detail Panel */}
          <div className="xl:col-span-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="text-[13.5px] font-bold text-slate-900">
                  Jadwal Tanggal {activeDate}
                </h4>
                <p className="text-[11px] text-slate-400">{monthLabel}</p>
              </div>
              <span className="text-[11px] font-semibold bg-[#EFF7FF] text-[#3B9BF8] px-2.5 py-1 rounded-lg tabular-nums">
                {selectedDayItems.length} konten
              </span>
            </div>

            {selectedDayItems.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                Belum ada konten dijadwalkan pada tanggal {activeDate} {MONTH_NAMES[month]}.
              </div>
            ) : (
              <div className="space-y-2.5">
                {selectedDayItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectItem(item)}
                    className="w-full text-left p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF7FF] border border-slate-100 hover:border-[#3B9BF8]/40 transition space-y-1.5 cursor-pointer"
                  >
                    <span
                      className={`inline-block text-[9.5px] font-semibold px-2 py-0.5 rounded-md border ${getStatusBadgeStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                    <p className="text-xs font-bold text-slate-900 line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-[10.5px] text-slate-500">
                      {item.type} • {item.platforms.join(', ')}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: INSTAGRAM FEED 3x3 SIMULATOR */}
      {viewMode === 'instagram' && (
        <div className="max-w-md mx-auto bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-[#3B9BF8] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {selectedClient.business.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                {selectedClient.instagram}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedClient.business}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-slate-700">
                <span>
                  <strong>{filteredContents.length}</strong> jadwal
                </span>
                <span>
                  <strong>{selectedClient.postsMax}</strong> kuota feed
                </span>
              </div>
            </div>
          </div>

          {filteredContents.length > 0 ? (
            <div className="grid grid-cols-3 gap-1.5 mt-5">
              {filteredContents.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative group cursor-pointer border border-slate-100"
                >
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 text-white text-xs">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-white" /> Review
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    </span>
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 bg-white/95 text-[#3B9BF8] text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                    {item.version}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              Belum ada konten Instagram yang dijadwalkan.
            </div>
          )}
          <p className="text-[11px] text-slate-400 text-center mt-4">
            Simulasi Grid Instagram • Klik visual untuk review &amp; persetujuan
          </p>
        </div>
      )}

      {/* VIEW 3: TIKTOK FEED 9:16 SIMULATOR */}
      {viewMode === 'tiktok' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="text-center pb-4 mb-4 border-b border-slate-100">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#3B9BF8]">
              TikTok &amp; Reels Showcase
            </span>
            <h4 className="font-bold text-sm text-slate-900 mt-1">
              Pratinjau Thumbnail &amp; Hook Teks 3 Detik
            </h4>
          </div>

          {filteredContents.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredContents.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="aspect-[9/16] bg-slate-900 rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm border border-slate-100"
                >
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-between p-3">
                    <div className="flex justify-between items-center text-[10px] text-white">
                      <span className="bg-slate-900/80 px-2 py-0.5 rounded-md font-medium">
                        {item.day}
                      </span>
                      <span className="bg-[#3B9BF8] text-white font-bold px-2 py-0.5 rounded-md">
                        {item.version}
                      </span>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold text-white line-clamp-2 leading-tight">
                        {item.title}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-sky-200 mt-1.5">
                        <Play className="w-3 h-3 fill-current" /> Klik untuk Review
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              Belum ada video TikTok / Reels yang dijadwalkan.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
