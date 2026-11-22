"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  UserPlus,
  Rocket,
  Film,
  Clock,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Plus,
} from "lucide-react";
import { ClientPipeline, ContentItem } from "@/types";

interface DashboardTwoExecutiveProps {
  clients: ClientPipeline[];
  contents: ContentItem[];
  stalledReviews: ContentItem[];
  onPingClient: (client: ClientPipeline, item: ContentItem) => void;
  onOpenAddClient: () => void;
  onOpenAddContent: () => void;
  onInspectProof: (client: ClientPipeline) => void;
  onSelectClient: (clientId: string) => void;
}

/* ─── Delta Badge Component (Efferd-style) ────────────────── */
function DeltaBadge({
  value,
  suffix = "%",
  label = "",
}: {
  value: number;
  suffix?: string;
  label?: string;
}) {
  const isPositive = value >= 0;
  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums ${
        isPositive
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
          : "bg-rose-50 text-rose-700 border border-rose-200/60"
      }`}
    >
      {isPositive ? (
        <TrendingUp className="w-3 h-3 text-emerald-600" />
      ) : (
        <TrendingDown className="w-3 h-3 text-rose-600" />
      )}
      <span>
        {isPositive ? "+" : ""}
        {value}
        {suffix}
      </span>
      {label && <span className="font-normal opacity-70 ml-0.5">{label}</span>}
    </div>
  );
}

/* ─── Revenue Bar Chart (Pure React/SVG — Zero React 19 bugs) ── */
function RevenueBarChart({ totalMRR }: { totalMRR: number }) {
  const [activeDay, setActiveDay] = useState<number | null>(null);

  // Daily distribution sample for current week
  const dailyData = [
    { day: "Sen", label: "Senin", amount: 4250000, height: 60 },
    { day: "Sel", label: "Selasa", amount: 3500000, height: 48 },
    { day: "Rab", label: "Rabu", amount: 6000000, height: 82 },
    { day: "Kam", label: "Kamis", amount: 4800000, height: 68 },
    { day: "Jum", label: "Jumat", amount: 7200000, height: 95 },
    { day: "Sab", label: "Sabtu", amount: 5100000, height: 72 },
    { day: "Min", label: "Minggu", amount: 2800000, height: 40 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-950">
              Arus Kas Retainer (Mingguan)
            </h3>
            <DeltaBadge value={18.4} label="vs siklus lalu" />
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Total realisasi faktur & pelunasan termin minggu ini
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-inter uppercase text-zinc-400">Total Periode</span>
          <p className="text-base font-bold font-inter text-zinc-900 leading-tight">
            Rp {(totalMRR * 0.42).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="pt-6 pb-2">
        <div className="h-44 w-full flex items-end justify-between gap-2 px-2">
          {dailyData.map((item, idx) => {
            const isHovered = activeDay === idx;
            return (
              <div
                key={item.day}
                onMouseEnter={() => setActiveDay(idx)}
                onMouseLeave={() => setActiveDay(null)}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 z-20 px-2.5 py-1 bg-zinc-950 text-white text-[11px] font-inter rounded-lg shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95">
                    {item.label}: Rp {item.amount.toLocaleString("id-ID")}
                  </div>
                )}

                {/* The Bar */}
                <div className="w-full max-w-[42px] bg-zinc-100 rounded-t-lg relative overflow-hidden flex items-end h-36">
                  <div
                    style={{ height: `${item.height}%` }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isHovered
                        ? "bg-zinc-950"
                        : "bg-gradient-to-t from-zinc-800 to-zinc-900/80 group-hover:from-zinc-900 group-hover:to-zinc-950"
                    }`}
                  />
                </div>

                {/* Day Label */}
                <span
                  className={`text-[11px] font-medium transition-colors ${
                    isHovered ? "text-zinc-950 font-bold" : "text-zinc-500"
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-zinc-900" />
          Pembayaran Termin DP 50%
        </span>
        <span className="font-inter text-[11px]">7 Hari Terakhir</span>
      </div>
    </div>
  );
}

/* ─── Production Volume Chart (Efferd Line Chart Style) ─────── */
function ProductionVolumeChart({ contents }: { contents: ContentItem[] }) {
  const reelsCount = contents.filter((c) => c.type.includes("Reels") || c.platforms.includes("instagram")).length;
  const carouselCount = contents.filter((c) => c.type.includes("Carousel")).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-950">
              Volume Produksi Format Konten
            </h3>
            <DeltaBadge value={12.5} label="output" />
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Distribusi deliverable Reels 9:16 vs Feed Carousel
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-zinc-700">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
            Reels 9:16 ({reelsCount})
          </span>
          <span className="flex items-center gap-1 text-zinc-500">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
            Carousel ({carouselCount})
          </span>
        </div>
      </div>

      {/* Smooth Curved Line SVG */}
      <div className="py-4 relative">
        <svg viewBox="0 0 500 140" className="w-full h-36 overflow-visible">
          <defs>
            <linearGradient id="reelsGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#09090b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="carouselGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a1a1aa" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="20" x2="500" y2="20" stroke="#f4f4f5" strokeDasharray="3 3" />
          <line x1="0" y1="60" x2="500" y2="60" stroke="#f4f4f5" strokeDasharray="3 3" />
          <line x1="0" y1="100" x2="500" y2="100" stroke="#f4f4f5" strokeDasharray="3 3" />

          {/* Area Fills */}
          <path
            d="M 0 110 Q 80 85 160 50 T 320 30 T 500 15 L 500 130 L 0 130 Z"
            fill="url(#reelsGlow)"
          />
          <path
            d="M 0 120 Q 90 100 180 80 T 340 70 T 500 65 L 500 130 L 0 130 Z"
            fill="url(#carouselGlow)"
          />

          {/* Lines */}
          <path
            d="M 0 110 Q 80 85 160 50 T 320 30 T 500 15"
            fill="none"
            stroke="#09090b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 0 120 Q 90 100 180 80 T 340 70 T 500 65"
            fill="none"
            stroke="#a1a1aa"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Target Milestone Dots */}
          <circle cx="160" cy="50" r="4" fill="#09090b" className="animate-pulse" />
          <circle cx="320" cy="30" r="4" fill="#09090b" />
          <circle cx="500" cy="15" r="5" fill="#09090b" />
        </svg>

        <div className="flex justify-between text-[11px] font-inter text-zinc-400 pt-1">
          <span>Minggu 1</span>
          <span>Minggu 2</span>
          <span>Minggu 3</span>
          <span>Minggu 4 (Target Rilis)</span>
        </div>
      </div>

      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
        <span>Efisiensi editing studio Malang: <strong>92% on-schedule</strong></span>
        <span className="font-inter text-emerald-700 font-medium">Bebas Bottleneck</span>
      </div>
    </div>
  );
}

/* ─── Recent Invoices Table (Efferd Style) ─────────────────── */
function RecentInvoicesSection({
  clients,
  onInspectProof,
}: {
  clients: ClientPipeline[];
  onInspectProof: (client: ClientPipeline) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-950">
            Faktur & Tagihan Klien Terkini
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Status verifikasi termin DP 50%, pelunasan, dan add-on kuota
          </p>
        </div>
        <span className="text-xs font-inter text-zinc-400">
          {clients.length} Faktur Aktif
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100 text-[11px] font-inter uppercase tracking-wider text-zinc-400 bg-zinc-50/50">
              <th className="py-3 px-5 font-semibold">Brand / Klien</th>
              <th className="py-3 px-4 font-semibold">Nomor Faktur</th>
              <th className="py-3 px-4 font-semibold">Termin Kontrak</th>
              <th className="py-3 px-4 font-semibold text-right">Nilai Tagihan</th>
              <th className="py-3 px-5 font-semibold text-right">Status Akses</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {clients.map((client) => {
              const isPaid = client.isUnlocked;
              return (
                <tr
                  key={client.id}
                  onClick={() => onInspectProof(client)}
                  className="hover:bg-zinc-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-[10px] text-zinc-800 shrink-0">
                        {client.business.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 group-hover:text-zinc-950">
                          {client.business}
                        </p>
                        <p className="text-[11px] text-zinc-400">PIC: {client.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-inter text-zinc-600">
                    {client.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    {client.paymentTerm}
                  </td>
                  <td className="py-3.5 px-4 text-right font-inter font-semibold text-zinc-900">
                    {client.dpAmount}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        isPaid
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isPaid ? "bg-emerald-600" : "bg-amber-600 animate-pulse"
                        }`}
                      />
                      {isPaid ? "Lunas (Unlocked)" : "Perlu Verifikasi DP"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Billing Health Card (Efferd Style) ────────────────────── */
function BillingHealthCard({
  clients,
  onInspectProof,
}: {
  clients: ClientPipeline[];
  onInspectProof: (client: ClientPipeline) => void;
}) {
  const pendingDP = clients.filter((c) => !c.isUnlocked);
  const isHealthy = pendingDP.length === 0;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div className="space-y-1 pb-4 border-b border-zinc-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-950">
            Kesehatan Finansial (Billing Health)
          </h3>
          <span
            className={`text-[10px] font-inter px-2 py-0.5 rounded-full font-bold ${
              isHealthy
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {isHealthy ? "100% AMAN" : `${pendingDP.length} PENDING`}
          </span>
        </div>
        <p className="text-xs text-zinc-500">
          Monitoring syarat DP 50% sebelum shooting studio & rilis
        </p>
      </div>

      <div className="py-6 flex flex-col items-center text-center px-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm ${
            isHealthy
              ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
              : "bg-amber-50 border border-amber-200 text-amber-600"
          }`}
        >
          {isHealthy ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <AlertCircle className="w-6 h-6" />
          )}
        </div>

        <h4 className="text-sm font-semibold text-zinc-900">
          {isHealthy
            ? "Semua Brand Telah Lunas DP"
            : `${pendingDP.length} Faktur Menunggu Validasi`}
        </h4>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-relaxed">
          {isHealthy
            ? "Seluruh slot kalender kerja dan tim videografer di Studio Malang beroperasi lancar tanpa penundaan pembayaran."
            : "Ada brand yang kalendernya terkunci menunggu verifikasi bukti transfer slip bank."}
        </p>
      </div>

      <div className="pt-3 border-t border-zinc-100">
        {isHealthy ? (
          <div className="text-center text-xs text-zinc-400 py-1 font-inter">
            Status Pembayaran Tertib ✓
          </div>
        ) : (
          <button
            onClick={() => onInspectProof(pendingDP[0])}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition"
          >
            <span>Periksa Bukti Bayar ({pendingDP[0].business})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Real-time Agency Activity Feed (Efferd Style) ────────── */
function AgencyActivityFeed() {
  const activities = [
    {
      id: "act-1",
      title: "Draf Revisi V2 (Reels Maven Coffee) diunggah",
      time: "25 menit lalu",
      actor: "Dimas Pratama",
      role: "Creative Lead",
      icon: Film,
      bg: "bg-zinc-100 text-zinc-900",
    },
    {
      id: "act-2",
      title: "dr. Helena (Lumen Clinic) menyetujui Konten #03",
      time: "2 jam lalu",
      actor: "1-Click Approval",
      role: "Client Portal",
      icon: CheckCircle2,
      bg: "bg-emerald-50 text-emerald-700",
    },
    {
      id: "act-3",
      title: "Bukti bayar DP Termin 1 (Arche Apparel) terverifikasi",
      time: "Hari ini, 09:30",
      actor: "Finance Desk",
      role: "Billing",
      icon: CreditCard,
      bg: "bg-zinc-100 text-zinc-900",
    },
    {
      id: "act-4",
      title: "Jadwal syuting studio fisik selesai (Farhan Videografer)",
      time: "Kemarin, 16:45",
      actor: "Studio Malang",
      role: "Production",
      icon: Rocket,
      bg: "bg-zinc-100 text-zinc-900",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between">
      <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-950">
            Aktivitas Operasional Agensi (Live Feed)
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Log interaksi terkini antara studio produksi dan klien
          </p>
        </div>
        <span className="text-xs font-inter text-zinc-400">Real-time</span>
      </div>

      <div className="divide-y divide-zinc-100">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-4 flex items-start gap-3 hover:bg-zinc-50/60 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center shrink-0 mt-0.5 border border-zinc-200/50`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-xs font-medium text-zinc-900 leading-snug">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span className="font-semibold text-zinc-600">{item.actor}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-zinc-100 text-center">
        <button className="text-xs text-zinc-500 hover:text-zinc-950 font-medium transition flex items-center justify-center gap-1 w-full">
          <span>Lihat Semua Riwayat Log</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

/* ─── Main DashboardTwoExecutive Component ─────────────────── */
export function DashboardTwoExecutive({
  clients,
  contents,
  stalledReviews,
  onPingClient,
  onOpenAddClient,
  onOpenAddContent,
  onInspectProof,
  onSelectClient,
}: DashboardTwoExecutiveProps) {
  // Aggregate KPIs
  const totalMRR = clients.reduce(
    (acc, c) => acc + (parseInt(c.totalValue.replace(/\D/g, ""), 10) || 0),
    0
  );
  const totalReelsUsed = clients.reduce((acc, c) => acc + (c.reelsUsed || 0), 0);
  const totalReelsTarget = clients.reduce((acc, c) => acc + (c.reelsMax || 0), 0);

  return (
    <div className="space-y-6">
      {/* ── 1. Top Action Header ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-3 border-b border-zinc-200/80">
        <div>
          <span className="text-[10px] font-inter uppercase tracking-wider text-zinc-400 font-semibold block mb-0.5">
            EXECUTIVE SUITE • CERMIN KREATIF OPS
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Mission Control Agensi
          </h1>
          <p className="text-xs text-zinc-500 font-normal mt-1">
            Pantauan omset retainer bulanan, status produksi studio, dan audit persetujuan klien.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddContent}
            className="px-3.5 py-2 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-900 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Buat Draf Konten</span>
          </button>
          <button
            onClick={onOpenAddClient}
            className="px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Daftarkan Klien</span>
          </button>
        </div>
      </div>

      {/* ── 2. Top 4 Dense KPI Cards (Dashboard-2 Style) ───── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Retainers */}
        <div className="p-5 bg-white border border-zinc-200/90 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Brand Retainer Aktif</span>
            <Building2 className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-inter text-zinc-950">
              {clients.length}
            </span>
            <DeltaBadge value={33.3} label="MoM" />
          </div>
          <p className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 flex items-center justify-between">
            <span>Maven, Lumen, Arche</span>
            <span className="text-emerald-700 font-semibold font-inter">100% Retensi</span>
          </p>
        </div>

        {/* KPI 2: MRR Revenue */}
        <div className="p-5 bg-white border border-zinc-200/90 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Monthly Retainer MRR</span>
            <CreditCard className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold font-inter text-zinc-950">
              Rp {(totalMRR / 1000000).toFixed(1)} Jt
            </span>
            <DeltaBadge value={18.4} label="cashflow" />
          </div>
          <p className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 flex items-center justify-between">
            <span>Target: Rp 35 Jt/bln</span>
            <span className="font-inter text-zinc-700 font-medium">
              {((totalMRR / 35000000) * 100).toFixed(0)}% Capai
            </span>
          </p>
        </div>

        {/* KPI 3: Video Production Output */}
        <div className="p-5 bg-white border border-zinc-200/90 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Reels Dalam Produksi</span>
            <Film className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-inter text-zinc-950">
              {totalReelsUsed} / {totalReelsTarget}
            </span>
            <DeltaBadge value={14.2} label="output" />
          </div>
          <p className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 flex items-center justify-between">
            <span>Sisa kuota: {totalReelsTarget - totalReelsUsed} reels</span>
            <span className="text-zinc-700 font-inter font-medium">Kapasitas 82%</span>
          </p>
        </div>

        {/* KPI 4: Approval Speed SLA */}
        <div className="p-5 bg-white border border-zinc-200/90 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Kecepatan Review Klien</span>
            <Clock className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-inter text-zinc-950">
              18.2 Jam
            </span>
            <DeltaBadge value={12.0} label="lebih cepat" />
          </div>
          <p className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 flex items-center justify-between">
            <span>SLA Target: &lt; 24 Jam</span>
            <span className="text-emerald-700 font-semibold font-inter">94% On-Time</span>
          </p>
        </div>
      </div>

      {/* ── 3. Dual Charts (Revenue Bar & Format Delivery) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RevenueBarChart totalMRR={totalMRR} />
        <ProductionVolumeChart contents={contents} />
      </div>

      {/* ── 4. Invoices Table & Billing Health ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentInvoicesSection
            clients={clients}
            onInspectProof={onInspectProof}
          />
        </div>
        <div>
          <BillingHealthCard
            clients={clients}
            onInspectProof={onInspectProof}
          />
        </div>
      </div>

      {/* ── 5. Operational Radar & Live Activity Feed ──────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Radar Review Botol Leher */}
        <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="pb-3 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="text-sm font-semibold text-zinc-950">
                Radar Botol Leher Review Klien (&gt;24 Jam)
              </h3>
            </div>
            <span className="text-xs font-inter text-zinc-400">
              {stalledReviews.length} Draf
            </span>
          </div>

          {stalledReviews.length > 0 ? (
            <div className="divide-y divide-zinc-100 my-2">
              {stalledReviews.map((item) => {
                const client =
                  clients.find((c) => c.id === item.clientId) || clients[0];
                return (
                  <div
                    key={item.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-900">
                          {client?.business || "Client"}
                        </span>
                        <span className="text-[10px] font-inter px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60">
                          {item.day}
                        </span>
                      </div>
                      <p className="text-zinc-500 truncate text-[11px]">
                        {item.title}
                      </p>
                    </div>

                    <button
                      onClick={() => onPingClient(client, item)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-[11px] shrink-0 transition flex items-center gap-1 shadow-2xs"
                    >
                      <span>Ping WA</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-zinc-400">
              Tidak ada konten yang tertahan review. Semua jadwal aman! ✓
            </div>
          )}

          <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-400 flex items-center justify-between">
            <span>Sistem auto-alert reminder via WhatsApp PIC</span>
            <span className="font-inter text-emerald-700">Online</span>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <AgencyActivityFeed />
      </div>
    </div>
  );
}
