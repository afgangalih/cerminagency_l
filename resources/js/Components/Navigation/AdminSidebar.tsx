'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Kanban, Film, Receipt, FileText, 
  Users, Plus, X, ChevronDown, Check
} from 'lucide-react';
import { ClientPipeline, ContentItem, VideoProductionTask } from '@/types';

export interface AdminSidebarProps {
  adminTab: 'mission_control' | 'content_engine' | 'production_mgmt' | 'finance' | 'clients' | 'brief_vault' | 'profile' | 'account_settings' | 'retainer_plans';
  setAdminTab: (tab: 'mission_control' | 'content_engine' | 'production_mgmt' | 'finance' | 'clients' | 'brief_vault' | 'profile' | 'account_settings' | 'retainer_plans') => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  selectedClientId: string;
  setSelectedClientId: (id: string) => void;
  selectedClient: ClientPipeline;
  clientPipeline: ClientPipeline[];
  contentList: ContentItem[];
  videoTasks: VideoProductionTask[];
  stalledReviews: ContentItem[];
  pendingInvoices: ClientPipeline[];
  onOpenAddClient: () => void;
  onOpenAddContent: () => void;
  onClearAllData?: () => void;
  onSeedSampleData?: () => void;
  onOpenSupport?: () => void;
}

function getClientInitials(businessName: string = ''): string {
  const words = businessName.trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return businessName.slice(0, 2).toUpperCase() || 'CK';
}

export function AdminSidebar({
  adminTab,
  setAdminTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  selectedClientId,
  setSelectedClientId,
  selectedClient,
  clientPipeline = [],
  contentList,
  videoTasks,
  stalledReviews,
  pendingInvoices,
  onOpenAddClient,
  onOpenAddContent,
}: AdminSidebarProps) {
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [selectedPicFilter, setSelectedPicFilter] = useState<string>('ALL');
  const brandDropdownRef = useRef<HTMLDivElement>(null);

  // Extract unique PICs from active pipeline
  const uniquePics = Array.from(
    new Set(clientPipeline.map((c) => c.picAssigned).filter(Boolean))
  ) as string[];

  const displayedClients = selectedPicFilter === 'ALL'
    ? clientPipeline
    : clientPipeline.filter((c) => c.picAssigned === selectedPicFilter);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
        setBrandDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeClientContents = contentList.filter(c => c.clientId === selectedClientId);

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
        bg-white border-r border-zinc-200/80
        flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top: Precise h-16 Header, Client Management, Quick Action, Grouped Navigation */}
        <div className="flex flex-col min-h-0 flex-1">
          {/* 1. Header with Official Cermin Brand Logo */}
          <div className="h-16 px-4 sm:px-5 border-b border-zinc-200/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="/images/cermin-logo.png"
                alt="Cermin Kreatif"
                className="w-8 h-8 rounded-full object-cover shrink-0 shadow-xs border border-zinc-200/80"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-zinc-950 tracking-tight block truncate">
                    Cermin Kreatif
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#01A0CA]/10 text-[#01A0CA]">
                    ADMIN
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block -mt-0.5">
                  Studio OS • Komando
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition cursor-pointer"
              aria-label="Tutup menu navigasi"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* 2. Client Switcher (Top Workspace Management — Elegant & Clean) */}
          <div className="px-3.5 pt-3.5 pb-2 shrink-0 relative" ref={brandDropdownRef}>
            <div className="px-1 mb-1.5 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-zinc-400">
              <span>Manajemen Klien</span>
              <span className="font-mono text-[9px] text-[#01A0CA] font-medium bg-[#01A0CA]/10 px-1.5 py-0.2 rounded">
                {clientPipeline.length} Brand
              </span>
            </div>

            <button
              onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
              className="w-full bg-zinc-50/90 hover:bg-white hover:border-[#01A0CA]/40 border border-zinc-200/80 rounded-xl p-2.5 flex items-center justify-between transition cursor-pointer text-left group shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#01A0CA] to-[#008db3] text-white flex items-center justify-center font-bold text-xs tracking-tight shrink-0 shadow-xs">
                  {getClientInitials(selectedClient?.business || 'CK')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 ring-2 ring-emerald-500/20" />
                    <span className="text-xs font-semibold text-zinc-950 truncate block leading-tight">
                      {selectedClient?.business || 'Pilih Brand'}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono block truncate mt-0.5">
                    {selectedClient?.package || 'Retainer Aktif'} • PIC: {selectedClient?.picAssigned || 'Studio Lead'}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-[#01A0CA] transition-transform duration-200 shrink-0 ${
                  brandDropdownOpen ? 'rotate-180' : ''
                }`}
                strokeWidth={1.5}
              />
            </button>

            {/* Popover Dropdown */}
            {brandDropdownOpen && (
              <div className="absolute top-full left-3.5 right-3.5 mt-1.5 bg-white border border-zinc-200/90 rounded-xl shadow-xl z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-100 flex items-center justify-between">
                  <span>Daftar Brand Retainer</span>
                  <span>{displayedClients.length} Brand</span>
                </div>

                {/* PIC Quick Filter Pills */}
                {uniquePics.length > 1 && (
                  <div className="flex items-center gap-1 px-1 py-1 overflow-x-auto border-b border-zinc-100">
                    <button
                      onClick={() => setSelectedPicFilter('ALL')}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer whitespace-nowrap ${
                        selectedPicFilter === 'ALL'
                          ? 'bg-[#01A0CA] text-white shadow-2xs'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      Semua ({clientPipeline.length})
                    </button>
                    {uniquePics.map((pic) => {
                      const shortName = pic.split(' ')[0];
                      const count = clientPipeline.filter((c) => c.picAssigned === pic).length;
                      return (
                        <button
                          key={pic}
                          onClick={() => setSelectedPicFilter(pic)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer whitespace-nowrap ${
                            selectedPicFilter === pic
                              ? 'bg-[#01A0CA] text-white shadow-2xs'
                              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                          }`}
                        >
                          {shortName} ({count})
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="max-h-56 overflow-y-auto space-y-0.5 py-1">
                  {displayedClients.map((client) => {
                    const isSelected = client.id === selectedClientId;
                    return (
                      <button
                        key={client.id}
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setBrandDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold'
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              isSelected ? 'bg-[#01A0CA] text-white' : 'bg-zinc-100 text-zinc-700'
                            }`}
                          >
                            {getClientInitials(client.business)}
                          </div>
                          <div className="min-w-0">
                            <span className="truncate block font-medium leading-tight">{client.business}</span>
                            <span className="text-[10px] text-zinc-400 font-mono block truncate">
                              {client.package} • PIC: {client.picAssigned || 'Studio Lead'}
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#01A0CA] shrink-0 ml-1.5" strokeWidth={2} />}
                      </button>
                    );
                  })}
                  {displayedClients.length === 0 && (
                    <div className="px-3 py-3 text-center text-xs text-zinc-400">
                      Tidak ada brand untuk PIC ini.
                    </div>
                  )}
                </div>
                {onOpenAddClient && (
                  <div className="pt-1 border-t border-zinc-100">
                    <button
                      onClick={() => {
                        setBrandDropdownOpen(false);
                        onOpenAddClient();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-900 hover:bg-zinc-100 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-zinc-600" strokeWidth={1.5} />
                      <span>Daftarkan Brand Baru</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Quick Action */}
          <div className="px-3.5 pb-2 shrink-0">
            <button
              onClick={onOpenAddContent}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-[#01A0CA]/30 bg-gradient-to-r from-[#01A0CA]/5 to-transparent hover:from-[#01A0CA]/15 hover:border-[#01A0CA]/50 text-zinc-800 hover:text-[#01A0CA] text-xs font-medium transition cursor-pointer shadow-2xs group"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-[#01A0CA] group-hover:scale-110 transition-transform" strokeWidth={2} />
                <span className="font-semibold">Jadwalkan Konten</span>
              </span>
              <kbd className="text-[10px] font-mono text-[#01A0CA] bg-white px-1.5 py-0.2 rounded border border-[#01A0CA]/20">
                +N
              </kbd>
            </button>
          </div>

          {/* 4. Navigation Sections */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
            {/* Group 1: Produksi Brand (Contextual - Dedicated Client Scope) */}
            <div>
              <div className="px-2 mb-1.5 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-zinc-400">
                <span>Produksi Brand</span>
                <span className="font-mono text-[9px] text-zinc-500 truncate max-w-[90px]">
                  {selectedClient?.business || 'Klien'}
                </span>
              </div>

              <nav className="space-y-0.5">
                <button
                  onClick={() => {
                    setAdminTab('content_engine');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'content_engine'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Kanban className={`w-4 h-4 shrink-0 ${adminTab === 'content_engine' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>SOP Konten (Multi-View)</span>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${adminTab === 'content_engine' ? 'bg-[#01A0CA] text-white font-bold' : 'text-zinc-400 bg-zinc-100'}`}>
                    {activeClientContents.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setAdminTab('production_mgmt');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'production_mgmt'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Film className={`w-4 h-4 shrink-0 ${adminTab === 'production_mgmt' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>Produksi & Syuting</span>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${adminTab === 'production_mgmt' ? 'bg-[#01A0CA] text-white font-bold' : 'text-zinc-400 bg-zinc-100'}`}>
                    {videoTasks.length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Group 2: Operasional Studio (Global Scope across all clients) */}
            <div className="pt-1">
              <div className="px-2 mb-1.5 text-[10px] font-semibold tracking-wider uppercase text-zinc-400">
                Operasional Studio
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => {
                    setAdminTab('mission_control');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'mission_control'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className={`w-4 h-4 shrink-0 ${adminTab === 'mission_control' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>Pusat Kendali</span>
                  </div>
                  {stalledReviews.length > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-amber-500 text-white font-bold animate-pulse">
                      {stalledReviews.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setAdminTab('clients');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'clients'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className={`w-4 h-4 shrink-0 ${adminTab === 'clients' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>Direktori Klien</span>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${adminTab === 'clients' ? 'bg-[#01A0CA] text-white font-bold' : 'text-zinc-400 bg-zinc-100'}`}>
                    {clientPipeline.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setAdminTab('finance');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'finance'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Receipt className={`w-4 h-4 shrink-0 ${adminTab === 'finance' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>Verifikasi DP & Faktur</span>
                  </div>
                  {pendingInvoices.length > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-emerald-500 text-white font-bold">
                      {pendingInvoices.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setAdminTab('brief_vault');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'brief_vault'
                      ? 'bg-[#01A0CA]/10 text-[#01A0CA] font-semibold border-l-2 border-[#01A0CA] shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className={`w-4 h-4 shrink-0 ${adminTab === 'brief_vault' ? 'text-[#01A0CA]' : 'text-zinc-500'}`} strokeWidth={1.75} />
                    <span>Arsip Brief Masuk</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
