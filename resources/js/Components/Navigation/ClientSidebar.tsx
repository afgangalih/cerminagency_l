'use client';

import React from 'react';
import { 
  LayoutDashboard, Calendar, Film, Compass, 
  Plus, MessageSquare, X, Lock
} from 'lucide-react';
import { ClientPipeline } from '@/types';

export interface ClientSidebarProps {
  activeTab: 'overview' | 'calendar' | 'production' | 'strategy';
  onTabClick: (tab: 'overview' | 'calendar' | 'production' | 'strategy') => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  accountType: 'demo' | 'official';
  selectedClient: ClientPipeline;
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
  onOpenRequestModal,
  onOpenSupport,
}: ClientSidebarProps) {
  const isDemo = accountType === 'demo';

  const reelsPercent = Math.min((selectedClient.reelsUsed / (selectedClient.reelsMax || 1)) * 100, 100);
  const postsPercent = Math.min((selectedClient.postsUsed / (selectedClient.postsMax || 1)) * 100, 100);

  const handleWhatsAppPIC = () => {
    const text = encodeURIComponent(
      `Halo Kak Dimas (Creative Lead Cermin Kreatif)!\n` +
      `Saya dari ${selectedClient.business} (${selectedClient.name}). Ingin konsultasi mengenai jadwal produksi dan draf konten bulan ini.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in"
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 md:static md:h-full
        w-64 shrink-0
        bg-white border-r border-zinc-200
        flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top Section */}
        <div className="flex flex-col min-h-0 flex-1">
          {/* 1. Header: Client Brand Profile */}
          <div className="p-3 border-b border-zinc-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#01A0CA] to-[#008db3] text-white font-bold flex items-center justify-center text-xs shrink-0 tracking-tight shadow-xs">
                {selectedClient.business.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-zinc-950 truncate">
                    {selectedClient.business}
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold shrink-0 ${
                    accountType === 'official' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                  }`}>
                    {accountType === 'official' ? 'Resmi' : 'Demo'}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono block truncate">
                  {selectedClient.instagram}
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Quota Usage Widget */}
          <div className="p-3 border-b border-zinc-100 shrink-0">
            <div className="bg-sky-50/40 border border-[#01A0CA]/20 rounded-xl p-3 space-y-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-zinc-900">Kuota Konten Bulan Ini</span>
                <span className="font-mono text-[10px] text-[#01A0CA] font-medium bg-white px-1.5 py-0.5 rounded border border-[#01A0CA]/20">
                  Bulan Berjalan
                </span>
              </div>

              {/* Reels Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-zinc-600">
                  <span className="font-medium">Reels & Video (9:16)</span>
                  <span className="font-mono text-zinc-900 font-semibold text-[10px]">
                    {selectedClient.reelsUsed} / {selectedClient.reelsMax}
                  </span>
                </div>
                <div className="w-full bg-zinc-200/70 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#01A0CA] h-full rounded-full transition-all duration-500 shadow-2xs"
                    style={{ width: `${reelsPercent}%` }}
                  />
                </div>
              </div>

              {/* Posts Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-zinc-600">
                  <span className="font-medium">Carousel & Desain Feed</span>
                  <span className="font-mono text-zinc-900 font-semibold text-[10px]">
                    {selectedClient.postsUsed} / {selectedClient.postsMax}
                  </span>
                </div>
                <div className="w-full bg-zinc-200/70 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-sky-500 h-full rounded-full transition-all duration-500 shadow-2xs"
                    style={{ width: `${postsPercent}%` }}
                  />
                </div>
              </div>

              {/* Request Button */}
              <button
                onClick={onOpenRequestModal}
                className="w-full py-1.5 px-3 rounded-lg bg-[#01A0CA] hover:bg-[#008db3] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer mt-1"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Ajukan Konten Baru</span>
              </button>
            </div>
          </div>

          {/* 3. Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
            <div>
              <div className="px-2 mb-1.5 text-[10px] font-semibold tracking-wider uppercase text-zinc-400">
                Menu Portal
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onTabClick('overview')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeTab === 'overview' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>Dasbor Utama</span>
                  </div>
                </button>

                <button
                  onClick={() => onTabClick('calendar')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activeTab === 'calendar'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className={`w-4 h-4 shrink-0 ${activeTab === 'calendar' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>Kalender & Feed IG</span>
                  </div>
                  {isDemo && <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                </button>

                <button
                  onClick={() => onTabClick('production')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activeTab === 'production'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Film className={`w-4 h-4 shrink-0 ${activeTab === 'production' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>Progres Desain &amp; Aset</span>
                  </div>
                  {isDemo && <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                </button>

                <button
                  onClick={() => onTabClick('strategy')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activeTab === 'strategy'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className={`w-4 h-4 shrink-0 ${activeTab === 'strategy' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>Strategi Brand & Hook</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section: Dedicated Creative PIC & Support */}
        <div className="p-3 border-t border-zinc-100 space-y-2.5 shrink-0 bg-white">
          {/* PIC Card */}
          <div className="p-2.5 bg-zinc-50/70 border border-zinc-200/60 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 font-inter block">Creative Director PIC</span>
                <span className="text-xs font-semibold text-zinc-900">Dimas Pratama</span>
              </div>
              <button
                onClick={handleWhatsAppPIC}
                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/60 transition cursor-pointer"
                title="Chat WhatsApp dengan Creative PIC"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Minimalist Sub-links */}
          <div className="flex items-center justify-between px-1 text-[11px] text-zinc-400">
            <button
              onClick={onOpenSupport}
              className="hover:text-zinc-900 transition cursor-pointer"
            >
              Pusat Bantuan
            </button>
            <span>•</span>
            <span className="text-zinc-400">SLA 24 Jam</span>
            <span>•</span>
            <span className="font-inter text-[10px]">Portal v2.4</span>
          </div>
        </div>
      </aside>
    </>
  );
}
