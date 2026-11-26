"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Wallet,
  Film,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  MessageCircle,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Camera,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import {
  ClientPipeline,
  ContentItem,
  AgencyEventItem,
  AgencyNotificationItem,
  VideoProductionTask,
} from "@/types";
import { AdminTabKey } from "../Navigation/AdminSidebar";

interface DashboardTwoExecutiveProps {
  clients: ClientPipeline[];
  contents: ContentItem[];
  stalledReviews: ContentItem[];
  videoTasks?: VideoProductionTask[];
  agencyEvents?: AgencyEventItem[];
  notifications?: AgencyNotificationItem[];
  onPingClient: (client: ClientPipeline, item: ContentItem) => void;
  onInspectProof: (client: ClientPipeline) => void;
  onSelectClient: (clientId: string) => void;
  onNavigateTab: (tab: AdminTabKey) => void;
  onOpenAddClient?: () => void;
  onOpenAddContent?: () => void;
}

const formatIDR = (num: number) =>
  `Rp ${Number(num || 0).toLocaleString("id-ID")}`;

const formatShortIDR = (num: number) => {
  if (num >= 1000000) {
    return `Rp ${(num / 1000000).toFixed(1).replace(".0", "")} jt`;
  }
  return formatIDR(num);
};

const parseIDR = (str: string) =>
  parseInt((str || "").replace(/\D/g, ""), 10) || 0;

function buildSmoothSvgPath(points: { x: number; y: number }[]) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const FALLBACK_COVERS = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
];

export function DashboardTwoExecutive({
  clients,
  contents,
  stalledReviews,
  videoTasks = [],
  agencyEvents = [],
  notifications = [],
  onPingClient,
  onInspectProof,
  onSelectClient,
  onNavigateTab,
}: DashboardTwoExecutiveProps) {
  const [volumePeriod, setVolumePeriod] = useState<"6 Bulan Terakhir" | "Kuartal Ini">("6 Bulan Terakhir");
  const [volumeDropdownOpen, setVolumeDropdownOpen] = useState(false);
  const [activeVolumeIdx, setActiveVolumeIdx] = useState(5);
  const [hoveredContractIdx, setHoveredContractIdx] = useState<number | null>(null);
  const [pingedIds, setPingedIds] = useState<Record<number, boolean>>({});
  const [selectedDropId, setSelectedDropId] = useState<string>("0");
  const [miniCalDate, setMiniCalDate] = useState(() => new Date());

  // Metrics derived 100% from real MySQL clients & contents
  const agencyMetrics = useMemo(() => {
    const mrr = clients.reduce((s, c) => s + parseIDR(c.totalValue), 0);
    const pendingDP = clients
      .filter((c) => !c.isUnlocked)
      .reduce((s, c) => s + parseIDR(c.dpAmount), 0);
    const activeCount = clients.filter((c) => c.isUnlocked).length;
    const pendingCount = clients.filter((c) => !c.isUnlocked).length;
    const totalReelsUsed = clients.reduce((s, c) => s + (c.reelsUsed || 0), 0);
    const totalPostsUsed = clients.reduce((s, c) => s + (c.postsUsed || 0), 0);
    const totalOutput = totalReelsUsed + totalPostsUsed;
    const totalMonthlyQuota = clients.reduce(
      (s, c) => s + (c.reelsMax || 0) + (c.postsMax || 0),
      0
    );

    return {
      mrr,
      pendingDP,
      activeCount,
      pendingCount,
      totalReelsUsed,
      totalPostsUsed,
      totalOutput,
      totalMonthlyQuota,
    };
  }, [clients]);

  // Production Volume SVG chart anchored to real contents totals for the latest point
  const volumeChartData = useMemo(() => {
    const realReels = Math.max(
      contents.filter(
        (c) =>
          c.type.toLowerCase().includes("reel") ||
          c.type.toLowerCase().includes("video") ||
          c.type.toLowerCase().includes("tiktok")
      ).length,
      agencyMetrics.totalReelsUsed
    );
    const realCarousel = Math.max(
      contents.filter(
        (c) =>
          !c.type.toLowerCase().includes("reel") &&
          !c.type.toLowerCase().includes("video")
      ).length,
      agencyMetrics.totalPostsUsed
    );

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const now = new Date();
    const count = volumePeriod === "Kuartal Ini" ? 3 : 6;
    const ratios = count === 3 ? [0.76, 0.88, 1] : [0.52, 0.62, 0.58, 0.78, 0.88, 1];

    return ratios.map((r, idx) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - idx), 1);
      const label = monthNames[d.getMonth()];
      const isLast = idx === ratios.length - 1;
      const reels = isLast ? Math.max(realReels, 1) : Math.max(Math.round(realReels * r), 1);
      const carousel = isLast ? Math.max(realCarousel, 1) : Math.max(Math.round(realCarousel * r), 1);
      return {
        label,
        reels,
        carousel,
        date: `${label} ${d.getFullYear()}`,
      };
    });
  }, [contents, agencyMetrics, volumePeriod]);

  const safeVolIdx = Math.min(activeVolumeIdx, volumeChartData.length - 1);
  const activeVolPt = volumeChartData[safeVolIdx];

  const vW = 420;
  const vH = 190;
  const vPadL = 32;
  const vPadR = 16;
  const vPadT = 30;
  const vPadB = 26;
  const vPlotW = vW - vPadL - vPadR;
  const vPlotH = vH - vPadT - vPadB;
  const vMaxY = Math.max(
    ...volumeChartData.map((d) => Math.max(d.reels, d.carousel)),
    10
  ) * 1.2;

  const reelsCoords = volumeChartData.map((pt, i) => ({
    ...pt,
    x: vPadL + (volumeChartData.length > 1 ? (i / (volumeChartData.length - 1)) * vPlotW : vPlotW / 2),
    y: vPadT + vPlotH - (pt.reels / vMaxY) * vPlotH,
  }));
  const carouselCoords = volumeChartData.map((pt, i) => ({
    ...pt,
    x: vPadL + (volumeChartData.length > 1 ? (i / (volumeChartData.length - 1)) * vPlotW : vPlotW / 2),
    y: vPadT + vPlotH - (pt.carousel / vMaxY) * vPlotH,
  }));

  const reelsLine = buildSmoothSvgPath(reelsCoords);
  const reelsArea = reelsCoords.length
    ? `${reelsLine} L ${reelsCoords[reelsCoords.length - 1].x} ${vPadT + vPlotH} L ${reelsCoords[0].x} ${vPadT + vPlotH} Z`
    : "";
  const carouselLine = buildSmoothSvgPath(carouselCoords);

  const contractValues = clients.map((c) => parseIDR(c.totalValue));
  const maxContract = Math.max(...contractValues, 10000000);

  const reelsPct = agencyMetrics.totalMonthlyQuota
    ? Math.round((agencyMetrics.totalReelsUsed / agencyMetrics.totalMonthlyQuota) * 100)
    : 0;
  const postsPct = agencyMetrics.totalMonthlyQuota
    ? Math.round((agencyMetrics.totalPostsUsed / agencyMetrics.totalMonthlyQuota) * 100)
    : 0;
  const remainPct = Math.max(0, 100 - reelsPct - postsPct);

  const [selectedAgendaDay, setSelectedAgendaDay] = useState<number | null>(null);
  const miniMonthKey = `${miniCalDate.getFullYear()}-${String(miniCalDate.getMonth() + 1).padStart(2, "0")}`;

  // Gabungkan Agenda Agensi + Jadwal Tayang Konten di bulan kalender aktif
  const monthAgendaItems = useMemo(() => {
    const fromAgency = agencyEvents
      .filter((ev) => ev.monthKey === miniMonthKey)
      .map((ev) => ({
        id: `ev-${ev.id}`,
        title: ev.shortTitle || ev.title,
        brand: ev.brand,
        tag: ev.category,
        dateLabel: `${ev.startDay}${ev.endDay > ev.startDay ? `-${ev.endDay}` : ""} ${ev.monthKey} • ${ev.time}`,
        startDay: ev.startDay,
        endDay: ev.endDay,
      }));

    const fromContents = contents
      .filter((c) => (c.date ? c.date.slice(0, 7) === miniMonthKey : false))
      .map((c) => {
        const cl = clients.find((clItem) => clItem.id === c.clientId);
        return {
          id: `cnt-${c.id}`,
          title: c.title,
          brand: cl?.business || "Brand",
          tag: c.stage === "revision" ? "Deadline Revisi" : "Tayang Konten",
          dateLabel: `${c.day || `Tgl ${c.dayNumber}`} • ${c.type}`,
          startDay: c.dayNumber || 1,
          endDay: c.dayNumber || 1,
        };
      });

    return [...fromAgency, ...fromContents].sort((a, b) => a.startDay - b.startDay);
  }, [agencyEvents, contents, clients, miniMonthKey]);

  const upcomingDrops = useMemo(() => {
    if (selectedAgendaDay !== null) {
      return monthAgendaItems.filter(
        (item) => selectedAgendaDay >= item.startDay && selectedAgendaDay <= item.endDay
      );
    }
    if (monthAgendaItems.length > 0) {
      return monthAgendaItems.slice(0, 3);
    }
    // Fallback jika bulan aktif kosong: tampilkan 3 agenda agensi / konten terdekat
    if (agencyEvents.length > 0) {
      return agencyEvents.slice(0, 3).map((ev, i) => ({
        id: `ev-fb-${i}`,
        title: ev.shortTitle || ev.title,
        brand: ev.brand,
        tag: ev.category,
        dateLabel: `${ev.startDay} ${ev.monthKey} • ${ev.time}`,
        startDay: ev.startDay,
        endDay: ev.endDay,
      }));
    }
    return contents.slice(0, 3).map((c, i) => {
      const cl = clients.find((clItem) => clItem.id === c.clientId);
      return {
        id: `cnt-fb-${i}`,
        title: c.title,
        brand: cl?.business || "Brand",
        tag: c.type,
        dateLabel: c.day || "Bulan Ini",
        startDay: c.dayNumber || 10,
        endDay: c.dayNumber || 10,
      };
    });
  }, [selectedAgendaDay, monthAgendaItems, agencyEvents, contents, clients]);

  const selectedDrop =
    upcomingDrops.find((d) => d.id === selectedDropId) || upcomingDrops[0];

  // Mini Calendar Cells
  const monthNamesFull = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const miniCalLabel = `${monthNamesFull[miniCalDate.getMonth()]} ${miniCalDate.getFullYear()}`;
  const daysInCalMonth = new Date(
    miniCalDate.getFullYear(),
    miniCalDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfWeek = new Date(
    miniCalDate.getFullYear(),
    miniCalDate.getMonth(),
    1
  ).getDay();
  const miniCalCells = [
    ...Array.from({ length: firstDayOfWeek }, () => ({ day: null as number | null, isCurr: false })),
    ...Array.from({ length: daysInCalMonth }, (_, i) => ({ day: i + 1, isCurr: true })),
  ];

  // Studio Activities from real notifications or latest tasks/contents
  const recentActivities = useMemo(() => {
    if (notifications.length > 0) {
      return notifications.slice(0, 4).map((n) => ({
        id: n.id,
        text: n.title,
        time: n.time,
        icon: n.category.includes("Finansial")
          ? CreditCard
          : n.category.includes("Review")
          ? AlertTriangle
          : CheckCircle2,
      }));
    }
    return [
      {
        id: "act-1",
        text: `${agencyMetrics.activeCount} brand aktif dalam retainer produksi bulan ini`,
        time: "Terbaru",
        icon: Camera,
      },
      {
        id: "act-2",
        text: `${stalledReviews.length} konten menunggu persetujuan klien`,
        time: "Aktif",
        icon: Clock,
      },
    ];
  }, [notifications, agencyMetrics.activeCount, stalledReviews.length]);

  const getDpBadgeStyle = (isUnlocked: boolean) =>
    isUnlocked
      ? "bg-[#EFF7FF] text-[#3B9BF8]"
      : "bg-amber-50 text-amber-700";

  const yAxisTicks = [0, 0.25, 0.5, 0.75, 1].map((r) => Math.round(vMaxY * r));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
      {/* LEFT 9 COLUMNS */}
      <div className="xl:col-span-9 space-y-5">
        {/* 1. 4 KPI Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            {
              label: "Brand Retainer Aktif",
              value: `${agencyMetrics.activeCount} / ${clients.length}`,
              delta: `${agencyMetrics.pendingCount} Pending DP`,
              icon: Building2,
            },
            {
              label: "Monthly Retainer (MRR)",
              value: formatShortIDR(agencyMetrics.mrr),
              delta: "Total Kontrak",
              icon: Wallet,
            },
            {
              label: "Output Konten Bulan Ini",
              value: `${agencyMetrics.totalOutput} Aset`,
              delta: `${agencyMetrics.totalReelsUsed}R • ${agencyMetrics.totalPostsUsed}F`,
              icon: Film,
            },
            {
              label: "Rata-rata SLA Review",
              value: `${stalledReviews.length} Antrean`,
              delta: "Target <24j",
              icon: Clock,
            },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="bg-[#EFF7FF] rounded-2xl p-4 border border-[#E1F0FF] flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#3B9BF8] flex items-center justify-center shadow-sm shrink-0">
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-white text-[#3B9BF8] tabular-nums">
                    {kpi.delta}
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-500 truncate">
                    {kpi.label}
                  </p>
                  <p className="text-[19px] font-bold text-slate-900 leading-tight mt-0.5 tabular-nums">
                    {kpi.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Dual Charts Dinamis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Bar Chart Nilai Kontrak per Brand */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-[14px] font-semibold text-slate-800">
                  Nilai Kontrak per Brand
                </h2>
                <div className="flex items-center gap-3 mt-1 text-[10.5px] text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#3B9BF8]" />
                    Lunas DP
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#CBD5E1]" />
                    Menunggu DP
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab("finance")}
                className="text-[11px] font-semibold text-[#3B9BF8] hover:underline cursor-pointer"
              >
                Detail →
              </button>
            </div>

            {clients.length === 0 ? (
              <div className="h-44 flex items-center justify-center text-xs text-slate-400">
                Belum ada data kontrak klien terdaftar.
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2.5 items-end h-44 pt-6">
                {clients.slice(0, 5).map((cl, idx) => {
                  const val = parseIDR(cl.totalValue);
                  const pct = Math.max(18, Math.round((val / maxContract) * 100));
                  const isHovered = hoveredContractIdx === idx;
                  return (
                    <div
                      key={cl.id}
                      onMouseEnter={() => setHoveredContractIdx(idx)}
                      onMouseLeave={() => setHoveredContractIdx(null)}
                      onClick={() => {
                        onSelectClient(cl.id);
                        onNavigateTab("content_engine");
                      }}
                      className="flex flex-col items-center h-full justify-end cursor-pointer group"
                    >
                      <span
                        className={`text-[9.5px] font-bold mb-1 tabular-nums transition-opacity ${
                          isHovered
                            ? "text-[#3B9BF8] opacity-100"
                            : "text-slate-500 opacity-80"
                        }`}
                      >
                        {(val / 1000000).toFixed(1)}jt
                      </span>
                      <div className="w-full max-w-[34px] flex-1 flex items-end">
                        <div
                          className={`w-full rounded-t-xl transition-all ${
                            cl.isUnlocked
                              ? "bg-[#3B9BF8] group-hover:bg-[#2589F5]"
                              : "bg-[#D9DEE6] group-hover:bg-amber-300"
                          }`}
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600 mt-2 truncate max-w-full">
                        {cl.business.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Area/Line Chart Volume Produksi Reels vs Carousel */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-[14px] font-semibold text-slate-800">
                  Volume Produksi Konten
                </h2>
                <div className="flex items-center gap-3 mt-1 text-[10.5px] text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#3B9BF8] rounded-full" />
                    Reels 9:16
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-400" />
                    Carousel/Feed
                  </span>
                </div>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setVolumeDropdownOpen((o) => !o)}
                  className="inline-flex items-center gap-1 bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[11px] font-medium px-2.5 py-1.5 rounded-lg cursor-pointer"
                >
                  {volumePeriod}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {volumeDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-20">
                    {(["6 Bulan Terakhir", "Kuartal Ini"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setVolumePeriod(opt);
                          setActiveVolumeIdx(opt === "Kuartal Ini" ? 2 : 5);
                          setVolumeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F0F7FF] cursor-pointer ${
                          volumePeriod === opt
                            ? "text-[#3B9BF8] font-semibold"
                            : "text-slate-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <svg viewBox={`0 0 ${vW} ${vH}`} className="w-full h-auto select-none">
              <defs>
                <linearGradient id="cerminVolGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B9BF8" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#3B9BF8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {yAxisTicks.map((tick, tIdx) => {
                const y = vPadT + vPlotH - (tick / vMaxY) * vPlotH;
                return (
                  <g key={`${tick}-${tIdx}`}>
                    <line
                      x1={vPadL}
                      y1={y}
                      x2={vW - vPadR}
                      y2={y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                    />
                    <text
                      x={vPadL - 8}
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

              {reelsArea && <path d={reelsArea} fill="url(#cerminVolGrad)" />}
              {carouselLine && (
                <path
                  d={carouselLine}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                />
              )}
              {reelsLine && (
                <path
                  d={reelsLine}
                  fill="none"
                  stroke="#3B9BF8"
                  strokeWidth="2.2"
                />
              )}

              {reelsCoords[safeVolIdx] && activeVolPt && (
                <g>
                  <line
                    x1={reelsCoords[safeVolIdx].x}
                    y1={reelsCoords[safeVolIdx].y}
                    x2={reelsCoords[safeVolIdx].x}
                    y2={vPadT + vPlotH}
                    stroke="#3B9BF8"
                    strokeDasharray="3 3"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx={reelsCoords[safeVolIdx].x}
                    cy={reelsCoords[safeVolIdx].y}
                    r="4.5"
                    fill="#3B9BF8"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <g
                    transform={`translate(${Math.min(
                      Math.max(reelsCoords[safeVolIdx].x - 42, vPadL),
                      vW - vPadR - 84
                    )}, ${Math.max(reelsCoords[safeVolIdx].y - 38, 2)})`}
                  >
                    <rect
                      width="84"
                      height="30"
                      rx="7"
                      fill="#EFF7FF"
                      stroke="#DCEEFF"
                    />
                    <text
                      x="42"
                      y="13"
                      textAnchor="middle"
                      fill="#0F172A"
                      fontSize="9.5"
                      fontWeight="700"
                    >
                      {activeVolPt.reels}R / {activeVolPt.carousel}F
                    </text>
                    <text
                      x="42"
                      y="24"
                      textAnchor="middle"
                      fill="#64748B"
                      fontSize="8.5"
                    >
                      {activeVolPt.date}
                    </text>
                  </g>
                </g>
              )}

              {reelsCoords.map((pt, idx) => (
                <g
                  key={pt.label}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveVolumeIdx(idx)}
                  onClick={() => setActiveVolumeIdx(idx)}
                >
                  <rect
                    x={pt.x - 18}
                    y={vPadT}
                    width="36"
                    height={vPlotH + vPadB}
                    fill="transparent"
                  />
                  <text
                    x={pt.x}
                    y={vH - 6}
                    textAnchor="middle"
                    fill={idx === safeVolIdx ? "#0F172A" : "#94A3B8"}
                    fontWeight={idx === safeVolIdx ? "600" : "400"}
                    fontSize="9.5"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* 3. Alokasi Kuota + Brand Pilihan (left) & Radar Bottleneck >24 Jam (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8 space-y-5">
            {/* Bar Alokasi Kuota */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-11 h-11 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Alokasi Kuota
                  </p>
                  <p className="text-[20px] font-bold text-slate-900 leading-tight tabular-nums">
                    {agencyMetrics.totalMonthlyQuota} Slot
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100">
                  <div
                    className="bg-[#3B9BF8] h-full"
                    style={{ width: `${reelsPct}%` }}
                  />
                  <div
                    className="bg-[#93C5FD] h-full"
                    style={{ width: `${postsPct}%` }}
                  />
                  <div
                    className="bg-[#DCEEFF] h-full"
                    style={{ width: `${remainPct}%` }}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm bg-[#3B9BF8]" />
                    Reels Terpakai{" "}
                    <strong className="text-slate-800">
                      {agencyMetrics.totalReelsUsed}
                    </strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm bg-[#93C5FD]" />
                    Feed Terpakai{" "}
                    <strong className="text-slate-800">
                      {agencyMetrics.totalPostsUsed}
                    </strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm bg-[#DCEEFF]" />
                    Sisa Kuota{" "}
                    <strong className="text-slate-800">
                      {Math.max(
                        0,
                        agencyMetrics.totalMonthlyQuota - agencyMetrics.totalOutput
                      )}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Brand Retainer Pilihan */}
            <div className="bg-[#EFF7FF]/60 rounded-2xl border border-[#E5F1FF] p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-slate-800">
                  Brand Retainer Pilihan
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigateTab("clients")}
                  className="bg-white hover:bg-[#EFF7FF] border border-slate-100 text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Lihat Semua
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {clients.slice(0, 3).map((cl, idx) => (
                  <div
                    key={cl.id}
                    className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-28 rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={cl.coverUrl || FALLBACK_COVERS[idx % FALLBACK_COVERS.length]}
                          alt={cl.business}
                          className="w-full h-full object-cover"
                        />
                        <span
                          className={`absolute top-2 left-2 text-[9.5px] font-semibold px-2 py-0.5 rounded-md shadow-sm ${
                            cl.isUnlocked
                              ? "bg-white/95 text-[#3B9BF8]"
                              : "bg-amber-100/95 text-amber-700"
                          }`}
                        >
                          {cl.isUnlocked ? "Resmi" : "Menunggu DP"}
                        </span>
                      </div>
                      <h3 className="text-[12.5px] font-bold text-slate-900 mt-2 truncate">
                        {cl.business}
                      </h3>
                      <p className="text-[10.5px] text-slate-400 truncate">
                        {cl.package}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-50">
                      <div>
                        <p className="text-[12px] font-bold text-[#3B9BF8] leading-none tabular-nums">
                          {formatShortIDR(parseIDR(cl.totalValue))}
                        </p>
                        <p className="text-[9.5px] text-slate-400 mt-0.5">
                          per bulan
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectClient(cl.id);
                          onNavigateTab("content_engine");
                        }}
                        className="bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[10.5px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Kanban
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Radar Bottleneck Review (>24 Jam) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-[13.5px] font-semibold text-slate-800">
                  Radar Bottleneck (&gt;24j)
                </h2>
                <p className="text-[10.5px] text-slate-400">
                  Menunggu approval klien
                </p>
              </div>
              <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-md tabular-nums">
                {stalledReviews.length} Draf
              </span>
            </div>

            <div className="space-y-2.5 flex-1">
              {stalledReviews.length === 0 ? (
                <div className="h-full min-h-[140px] flex flex-col items-center justify-center text-center text-xs text-slate-400 px-3">
                  <CheckCircle2 className="w-7 h-7 text-emerald-500 mb-1.5" />
                  Semua draf telah direview klien tepat waktu.
                </div>
              ) : (
                stalledReviews.slice(0, 5).map((item) => {
                  const client = clients.find((c) => c.id === item.clientId);
                  if (!client) return null;
                  const isPinged = !!pingedIds[item.id];
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F5FAFF] transition-colors border border-transparent hover:border-sky-100"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#EFF7FF] text-[#3B9BF8] font-bold text-[11px] flex items-center justify-center shrink-0">
                        {client.business.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-[11.5px] font-bold text-slate-800 truncate">
                            {client.business}
                          </p>
                          <span className="text-[9.5px] font-semibold text-rose-500 shrink-0 tabular-nums">
                            {item.day}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-slate-400 truncate mt-0.5">
                          {item.title}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPingedIds((p) => ({ ...p, [item.id]: true }));
                          onPingClient(client, item);
                        }}
                        className={`shrink-0 px-2 py-1.5 rounded-lg text-[10px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                          isPinged
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-[#EFF7FF] hover:bg-[#3B9BF8] text-[#3B9BF8] hover:text-white"
                        }`}
                      >
                        <MessageCircle className="w-3 h-3" />
                        {isPinged ? "Terkirim" : "Ping WA"}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* 4. Faktur Terbaru & Billing Health */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-[14.5px] font-semibold text-slate-800">
                Faktur Terbaru &amp; Billing Health
              </h2>
              <p className="text-[11px] text-slate-400">
                Pending Verifikasi DP 50%:{" "}
                <strong className="text-amber-600">
                  {formatIDR(agencyMetrics.pendingDP)}
                </strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("finance")}
              className="bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-medium px-3.5 py-1.5 rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
            >
              Kelola Finansial
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#EFF7FF] text-slate-500 text-[11px] font-semibold">
                  <th className="py-2.5 px-3.5 rounded-l-xl">Brand Klien</th>
                  <th className="py-2.5 px-3.5">No. Faktur</th>
                  <th className="py-2.5 px-3.5">DP 50%</th>
                  <th className="py-2.5 px-3.5">Status</th>
                  <th className="py-2.5 px-3.5 rounded-r-xl text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {clients.map((cl) => (
                  <tr
                    key={cl.id}
                    className="hover:bg-[#F8FBFF] transition-colors"
                  >
                    <td className="py-3 px-3.5 font-semibold text-slate-800">
                      {cl.business}
                    </td>
                    <td className="py-3 px-3.5 text-slate-500 tabular-nums">
                      {cl.invoiceNumber}
                    </td>
                    <td className="py-3 px-3.5 font-semibold text-slate-800 tabular-nums">
                      {cl.dpAmount}
                    </td>
                    <td className="py-3 px-3.5">
                      <span
                        className={`inline-block text-[10.5px] font-semibold px-2.5 py-1 rounded-lg ${getDpBadgeStyle(
                          cl.isUnlocked
                        )}`}
                      >
                        {cl.isUnlocked ? "Lunas DP" : "Menunggu Verifikasi"}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => onInspectProof(cl)}
                        className="text-[11px] font-semibold text-[#3B9BF8] hover:underline cursor-pointer"
                      >
                        Periksa Bukti
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT 3 COLUMNS: MINI CALENDAR, AGENDA TERDEKAT, AKTIVITAS */}
      <div className="xl:col-span-3 space-y-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[13.5px] font-bold text-slate-800">
              {miniCalLabel}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedAgendaDay(null);
                  setMiniCalDate(
                    (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)
                  );
                }}
                className="w-6 h-6 rounded-lg bg-[#F4F6F9] hover:bg-[#EAF4FF] text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedAgendaDay(null);
                  setMiniCalDate(
                    (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)
                  );
                }}
                className="w-6 h-6 rounded-lg bg-[#F4F6F9] hover:bg-[#EAF4FF] text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-400">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
              <div key={d} className="py-0.5">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center text-[11px]">
            {miniCalCells.map((cell, i) => {
              if (!cell.isCurr || !cell.day) {
                return <div key={i} className="h-7" />;
              }
              const dayNum = cell.day;
              const hasAgenda = monthAgendaItems.some(
                (item) => dayNum >= item.startDay && dayNum <= item.endDay
              );
              const isSelectedDay = selectedAgendaDay === dayNum;
              const isDropHighlighted =
                selectedAgendaDay === null &&
                selectedDrop &&
                monthAgendaItems.some((m) => m.id === selectedDrop.id) &&
                dayNum >= selectedDrop.startDay &&
                dayNum <= selectedDrop.endDay;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    setSelectedAgendaDay((prev) => (prev === dayNum ? null : dayNum))
                  }
                  className={`relative h-7 flex items-center justify-center rounded-lg tabular-nums transition-colors cursor-pointer ${
                    isSelectedDay || isDropHighlighted
                      ? "bg-[#3B9BF8] text-white font-bold shadow-sm"
                      : hasAgenda
                      ? "bg-[#EFF7FF] text-[#2563EB] font-semibold hover:bg-[#DCEEFF]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {dayNum}
                  {hasAgenda && !isSelectedDay && !isDropHighlighted && (
                    <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#3B9BF8]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[13.5px] font-semibold text-slate-800 truncate">
                {selectedAgendaDay !== null
                  ? `Agenda Tgl ${selectedAgendaDay}`
                  : "Agenda & Jadwal Terdekat"}
              </h3>
              <button
                type="button"
                onClick={() => onNavigateTab("agency_calendar")}
                title="Buka Kalender Agensi"
                className="w-6 h-6 rounded-lg bg-[#3B9BF8] hover:bg-[#2589F5] text-white flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {upcomingDrops.length === 0 ? (
                <p className="text-[11px] text-slate-400 text-center py-3">
                  {selectedAgendaDay !== null
                    ? `Tidak ada agenda di tanggal ${selectedAgendaDay}.`
                    : "Belum ada agenda terjadwal."}
                </p>
              ) : (
                upcomingDrops.slice(0, 3).map((drop) => {
                  const isSelected = selectedDrop?.id === drop.id;
                  return (
                    <button
                      key={drop.id}
                      type="button"
                      onClick={() => {
                        setSelectedDropId(drop.id);
                        onNavigateTab("agency_calendar");
                      }}
                      className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#3B9BF8] bg-[#F5FAFF]"
                          : "border-slate-100 hover:border-sky-100"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex flex-col items-center justify-center shrink-0 font-bold tabular-nums">
                        <span className="text-[13px] leading-none">{drop.startDay}</span>
                        <span className="text-[8.5px] uppercase tracking-wider mt-0.5 text-slate-500">
                          {monthNamesFull[miniCalDate.getMonth()].slice(0, 3)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[9px] font-semibold text-[#3B9BF8] bg-[#EFF7FF] px-1.5 py-0.5 rounded-md">
                          {drop.tag}
                        </span>
                        <p className="text-[11.5px] font-bold text-slate-800 truncate mt-0.5">
                          {drop.title || drop.brand}
                        </p>
                        <span className="text-[9.5px] text-slate-400 block truncate mt-0.5">
                          {drop.brand} • {drop.dateLabel}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[13.5px] font-semibold text-slate-800">
              Aktivitas Terbaru
            </h3>
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-3">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#3B9BF8] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                      {act.text}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {act.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
