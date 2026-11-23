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
  const brandDropdownRef = useRef<HTMLDivElement>(null);

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
          {/* 1. Header (Exact h-16 matching DashboardHeader for continuous hairline border) */}
          <div className="h-16 px-4 sm:px-5 border-b border-zinc-200/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-xs tracking-tight shrink-0 shadow-2xs">
                CK
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-zinc-950 tracking-tight block truncate">
                  Cermin Kreatif
                </span>
                <span className="text-[10px] font-mono text-zinc-400 block -mt-0.5">
                  Studio OS
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
              <span className="font-mono text-[9px] text-zinc-400">{clientPipeline.length} Brand</span>
            </div>

            <button
              onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
              className="w-full bg-zinc-50/90 hover:bg-zinc-100/90 border border-zinc-200/80 rounded-xl p-2.5 flex items-center justify-between transition cursor-pointer text-left group shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-xs tracking-tight shrink-0 shadow-2xs">
                  {getClientInitials(selectedClient?.business || 'CK')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-xs font-semibold text-zinc-950 truncate block leading-tight">
                      {selectedClient?.business || 'Pilih Brand'}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono block truncate pl-3 mt-0.5">
                    {selectedClient?.package || 'Retainer Aktif'}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 transition-transform duration-200 shrink-0 ${
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
                  <span>{clientPipeline.length}</span>
                </div>
                <div className="max-h-56 overflow-y-auto space-y-0.5 py-1">
                  {clientPipeline.map((client) => {
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
                            ? 'bg-zinc-100 text-zinc-950 font-semibold'
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              isSelected ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-700'
                            }`}
                          >
                            {getClientInitials(client.business)}
                          </div>
                          <div className="min-w-0">
                            <span className="truncate block font-medium leading-tight">{client.business}</span>
                            <span className="text-[10px] text-zinc-400 font-mono block truncate">{client.package}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-zinc-950 shrink-0 ml-1.5" strokeWidth={1.5} />}
                      </button>
                    );
                  })}
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
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50/70 hover:bg-zinc-100/90 text-zinc-700 text-xs font-medium transition cursor-pointer shadow-2xs"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
                <span>Jadwalkan Konten</span>
              </span>
              <kbd className="text-[10px] font-mono text-zinc-400 bg-white px-1.5 py-0.2 rounded border border-zinc-200/70">
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
                <span className="font-mono text-[9px] text-zinc-400 truncate max-w-[80px]">
                  {selectedClient?.business || 'Klien'}
                </span>
              </div>

              <nav className="space-y-0.5">
                <button
                  onClick={() => {
                    setAdminTab('content_engine');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'content_engine'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Kanban className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span>SOP Konten (Multi-View)</span>
                  </div>
                  <span className={`text-[10px] font-mono ${adminTab === 'content_engine' ? 'text-zinc-300' : 'text-zinc-400'}`}>
                    {activeClientContents.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setAdminTab('production_mgmt');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'production_mgmt'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Film className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span>Produksi & Syuting</span>
                  </div>
                  <span className={`text-[10px] font-mono ${adminTab === 'production_mgmt' ? 'text-zinc-300' : 'text-zinc-400'}`}>
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
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'mission_control'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span>Pusat Kendali</span>
                  </div>
                  {stalledReviews.length > 0 && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      adminTab === 'mission_control' 
                        ? 'bg-zinc-800 text-zinc-300' 
                        : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {stalledReviews.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setAdminTab('clients');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'clients'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span>Direktori Klien</span>
                  </div>
                  <span className={`text-[10px] font-mono ${adminTab === 'clients' ? 'text-zinc-300' : 'text-zinc-400'}`}>
                    {clientPipeline.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setAdminTab('finance');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'finance'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Receipt className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span>Verifikasi DP & Faktur</span>
                  </div>
                  {pendingInvoices.length > 0 && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      adminTab === 'finance' 
                        ? 'bg-zinc-800 text-zinc-300' 
                        : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {pendingInvoices.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setAdminTab('brief_vault');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'brief_vault'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 shrink-0" strokeWidth={1.5} />
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
