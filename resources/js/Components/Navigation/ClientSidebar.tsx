'use client';

import React from 'react';
import {
  LayoutGrid,
  Calendar,
  Clapperboard,
  Compass,
  Plus,
  MessageCircle,
  X,
  Lock,
  UserCheck,
  ListChecks,
} from 'lucide-react';
import { ClientPipeline } from '@/types';

export type ClientTabKey =
  | 'overview'
  | 'tracker'
  | 'calendar'
  | 'production'
  | 'strategy'
  | 'profile';

export interface ClientSidebarProps {
  activeTab: ClientTabKey;
  onTabClick: (tab: ClientTabKey) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  accountType: 'demo' | 'official';
  selectedClient: ClientPipeline;
  pendingReviewCount?: number;
  studioTaskCount?: number;
  onOpenRequestModal: () => void;
  onOpenSupport: () => void;
}

export function ClientSidebar({
  activeTab,
  onTabClick,
  mobileMenuOpen,
  setMobileMenuOpen,
  accountType,
  selectedClient,
  pendingReviewCount = 0,
  studioTaskCount = 0,
  onOpenRequestModal,
  onOpenSupport,
}: ClientSidebarProps) {
  const isDemo = accountType === 'demo';
  const reelsPercent = Math.min(
    ((selectedClient.reelsUsed || 0) / (selectedClient.reelsMax || 1)) * 100,
    100
  );
  const postsPercent = Math.min(
    ((selectedClient.postsUsed || 0) / (selectedClient.postsMax || 1)) * 100,
    100
  );
  const pillarsCount = selectedClient.contentPillars?.length || 0;

  const handleWhatsAppPIC = () => {
    const text = encodeURIComponent(
      `Halo ${selectedClient.picAssigned || 'Tim Cermin Kreatif'}!\n` +
        `Saya ${selectedClient.name} dari ${selectedClient.business}. Ingin konsultasi mengenai jadwal produksi dan draf konten bulan ini.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const navItems: {
    key: ClientTabKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    locked?: boolean;
    badge?: number | null;
  }[] = [
    {
      key: 'overview',
      label: 'Ringkasan',
      icon: LayoutGrid,
      badge: pendingReviewCount || null,
    },
    {
      key: 'tracker',
      label: 'Progres Konten',
      icon: ListChecks,
      locked: isDemo,
    },
    {
      key: 'calendar',
      label: 'Kalender & Feed',
      icon: Calendar,
      locked: isDemo,
    },
    {
      key: 'production',
      label: 'Progres Desain & Aset',
      icon: Clapperboard,
      locked: isDemo,
      badge: !isDemo && studioTaskCount ? studioTaskCount : null,
    },
    {
      key: 'strategy',
      label: 'Pilar & KPI Brand',
      icon: Compass,
      badge: pillarsCount || null,
    },
    {
      key: 'profile',
      label: 'Profil & Akun',
      icon: UserCheck,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white px-4 py-5 select-none">
      {/* Brand Logo Cermin Kreatif (Matching AdminSidebar) */}
      <div className="flex items-center justify-between mb-5 px-1">
        <button
          type="button"
          onClick={() => onTabClick('overview')}
          className="flex items-center gap-2.5 text-left cursor-pointer"
        >
          <img
            src="/images/cermin-logo.png"
            alt="Cermin Kreatif"
            className="w-9 h-9 rounded-full object-cover shrink-0 shadow-sm border border-slate-100"
          />
          <div>
            <p className="text-[15px] font-bold text-[#1E293B] leading-tight">
              Cermin OS
            </p>
            <p className="text-[10.5px] font-medium text-slate-400">
              Client Portal
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 cursor-pointer"
          aria-label="Tutup menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Brand Workspace Badge */}
      <div className="bg-[#EFF7FF] rounded-2xl p-3 border border-[#DCEEFF] mb-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#3B9BF8] text-white font-bold text-xs flex items-center justify-center shrink-0">
              {selectedClient.business.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {selectedClient.business}
              </p>
              <p className="text-[10.5px] text-slate-400 truncate">
                {selectedClient.instagram}
              </p>
            </div>
          </div>
          <span
            className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
              accountType === 'official'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {accountType === 'official' ? 'Resmi' : 'Demo'}
          </span>
        </div>

        {/* Mini Quota Bars */}
        <div className="bg-white/90 rounded-xl p-2.5 space-y-2 border border-white">
          <div className="space-y-1">
            <div className="flex justify-between text-[10.5px]">
              <span className="text-slate-500 font-medium">Reels &amp; Video</span>
              <span className="font-bold text-slate-800 tabular-nums">
                {selectedClient.reelsUsed}/{selectedClient.reelsMax}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-[#3B9BF8] rounded-full transition-all duration-500"
                style={{ width: `${reelsPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10.5px]">
              <span className="text-slate-500 font-medium">Carousel &amp; Feed</span>
              <span className="font-bold text-slate-800 tabular-nums">
                {selectedClient.postsUsed}/{selectedClient.postsMax}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-[#93C5FD] rounded-full transition-all duration-500"
                style={{ width: `${postsPercent}%` }}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenRequestModal}
          className="w-full py-2 px-3 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ajukan Konten Baru</span>
        </button>
      </div>

      {/* Portal Navigation */}
      <div className="flex-1 overflow-y-auto space-y-1">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Menu Portal Klien
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onTabClick(item.key)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#3B9BF8] text-white shadow-[0_6px_16px_rgba(59,155,248,0.28)]'
                  : 'text-slate-500 hover:bg-[#F3F8FF] hover:text-[#3B9BF8]'
              }`}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </span>
              {item.locked ? (
                <Lock
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isActive ? 'text-white/90' : 'text-amber-500'
                  }`}
                />
              ) : item.badge ? (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md tabular-nums ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#3B9BF8] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Bottom Section: Dedicated Creative PIC (Airy-Blue Signature Wave) */}
      <div className="pt-3 mt-4 space-y-2.5 shrink-0">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#DCEEFF] via-[#B8DEFF] to-[#7CC0FF] p-3.5 relative">
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3B9BF8] text-white font-bold text-[11px] flex items-center justify-center ring-2 ring-white shrink-0">
                {(selectedClient.picAssigned || 'CK').slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-[11.5px] font-bold text-slate-900 truncate">
                  {selectedClient.picAssigned || 'Tim Creative Cermin'}
                </p>
                <p className="text-[9.5px] text-slate-700 truncate">
                  PIC Akun Anda
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleWhatsAppPIC}
              className="w-full bg-white hover:bg-slate-50 text-slate-800 text-[11px] font-semibold py-2 rounded-xl shadow-sm inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#3B9BF8]" />
              Chat WhatsApp PIC
            </button>
          </div>
          <svg
            viewBox="0 0 200 70"
            className="absolute inset-x-0 bottom-0 w-full h-20 opacity-50 pointer-events-none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 35 Q 50 10, 100 32 T 200 28 L 200 70 L 0 70 Z"
              fill="#60A5FA"
            />
            <path
              d="M0 48 Q 60 28, 120 46 T 200 40 L 200 70 L 0 70 Z"
              fill="#3B9BF8"
            />
          </svg>
        </div>

        <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
          <button
            type="button"
            onClick={onOpenSupport}
            className="hover:text-[#3B9BF8] transition cursor-pointer font-medium"
          >
            Pusat Bantuan
          </button>
          <span>•</span>
          <span>SLA 24 Jam</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-100 bg-white sticky top-0 h-screen overflow-y-auto">
        <SidebarContent />
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative z-10 w-64 max-w-[82vw] h-full bg-white shadow-2xl overflow-y-auto">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
