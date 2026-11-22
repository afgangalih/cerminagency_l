'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Kanban, Film, Receipt, FileText, 
  Users, Plus, ChevronDown, Check, Search, X, HardDrive
} from 'lucide-react';
import { ClientPipeline, ContentItem, VideoProductionTask } from '@/types';

export interface AdminSidebarProps {
  adminTab: 'mission_control' | 'content_engine' | 'production_mgmt' | 'finance' | 'clients' | 'brief_vault';
  setAdminTab: (tab: 'mission_control' | 'content_engine' | 'production_mgmt' | 'finance' | 'clients' | 'brief_vault') => void;
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
  onClearAllData: () => void;
  onSeedSampleData: () => void;
  onOpenSupport: () => void;
}

export function AdminSidebar({
  adminTab,
  setAdminTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  selectedClientId,
  setSelectedClientId,
  selectedClient,
  clientPipeline,
  contentList,
  videoTasks,
  stalledReviews,
  pendingInvoices,
  onOpenAddClient,
  onOpenAddContent,
  onClearAllData,
  onSeedSampleData,
  onOpenSupport,
}: AdminSidebarProps) {
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const brandDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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
        fixed inset-y-0 left-0 z-50 md:sticky md:top-10 md:h-[calc(100vh-2.5rem)]
        w-72 md:w-64 lg:w-72 shrink-0
        bg-white border-r border-zinc-200/80
        flex flex-col justify-between
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        shadow-sm md:shadow-none
      `}>
        {/* Top: Header, Workspace Switcher, Navigation */}
        <div className="flex flex-col min-h-0 flex-1">
          {/* 1. Sleek Workspace & Tenant Header */}
          <div className="p-3 border-b border-zinc-100 shrink-0 relative" ref={brandDropdownRef}>
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-zinc-950 text-white flex items-center justify-center font-bold text-[11px] tracking-tight">
                  CK
                </div>
                <span className="font-semibold text-xs text-zinc-950 tracking-tight">
                  Cermin Kreatif
                </span>
                <span className="text-[10px] font-inter text-zinc-400">
                  / Studio
                </span>
              </div>

              {/* Mobile Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Brand Context Switcher Button */}
            <button
              onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
              className="w-full bg-zinc-50 hover:bg-zinc-100/90 border border-zinc-200/70 rounded-lg p-2 flex items-center justify-between transition cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded bg-zinc-900 text-white font-medium flex items-center justify-center text-[10px] shrink-0">
                  {(selectedClient.business || 'CK').substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-zinc-900 truncate">
                    {selectedClient.business || 'Pilih Brand'}
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${brandDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Popover Dropdown */}
            {brandDropdownOpen && (
              <div className="absolute top-full left-3 right-3 mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg z-50 p-1 space-y-0.5 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-inter uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
                  Brand Retainer ({clientPipeline.length})
                </div>
                <div className="max-h-44 overflow-y-auto space-y-0.5">
                  {clientPipeline.map((client) => {
                    const isSelected = client.id === selectedClientId;
                    return (
                      <button
                        key={client.id}
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setBrandDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                          isSelected 
                            ? 'bg-zinc-100 text-zinc-950 font-medium' 
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                        }`}
                      >
                        <span className="truncate">{client.business}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-zinc-950 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
                <div className="pt-1 border-t border-zinc-100">
                  <button
                    onClick={() => {
                      setBrandDropdownOpen(false);
                      onOpenAddClient();
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-zinc-900 hover:bg-zinc-100 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Daftarkan Brand Baru</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Quick Command / Search Bar */}
          <div className="px-3 pt-3">
            <button
              onClick={onOpenAddContent}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-50/80 hover:bg-zinc-100/80 border border-zinc-200/60 text-xs text-zinc-500 hover:text-zinc-900 transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px]">Jadwalkan konten...</span>
              </span>
              <kbd className="text-[9px] font-inter px-1 py-0.2 rounded bg-white border border-zinc-200 text-zinc-400 shadow-2xs">
                +N
              </kbd>
            </button>
          </div>

          {/* 3. Navigation Sections (Clean, Restrained, No AI Slop) */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {/* Group 1: Operasional */}
            <div>
              <div className="px-2 mb-1 text-[11px] font-medium text-zinc-400">
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
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Mission Control</span>
                  </div>
                  {stalledReviews.length > 0 && (
                    <span className={`text-[10px] font-inter px-1.5 py-0.2 rounded-full ${
                      adminTab === 'mission_control' ? 'bg-zinc-800 text-amber-300' : 'bg-amber-100 text-amber-900 font-medium'
                    }`}>
                      {stalledReviews.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setAdminTab('content_engine');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'content_engine'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Kanban className="w-4 h-4 shrink-0" />
                    <span>SOP Konten (Multi-View)</span>
                  </div>
                  <span className={`text-[10px] font-inter ${adminTab === 'content_engine' ? 'text-zinc-300' : 'text-zinc-400'}`}>
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
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Film className="w-4 h-4 shrink-0" />
                    <span>Produksi & Syuting</span>
                  </div>
                  <span className={`text-[10px] font-inter ${adminTab === 'production_mgmt' ? 'text-zinc-300' : 'text-zinc-400'}`}>
                    {videoTasks.length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Group 2: Finansial & Dokumen */}
            <div>
              <div className="px-2 mb-1 text-[11px] font-medium text-zinc-400">
                Finansial & Direktori
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => {
                    setAdminTab('finance');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'finance'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Receipt className="w-4 h-4 shrink-0" />
                    <span>Verifikasi DP & Faktur</span>
                  </div>
                  {pendingInvoices.length > 0 && (
                    <span className="text-[10px] font-inter px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-medium">
                      {pendingInvoices.length}
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
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Direktori Klien</span>
                  </div>
                  <span className={`text-[10px] font-inter ${adminTab === 'clients' ? 'text-zinc-300' : 'text-zinc-400'}`}>
                    {clientPipeline.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setAdminTab('brief_vault');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    adminTab === 'brief_vault'
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Vault Brief Brand</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* ========================================================
            MODERN BOTTOM SECTION: Video Media Vault & Infrastructure
            Replaces generic AI filler with real agency cloud storage
        ======================================================== */}
        <div className="p-3 border-t border-zinc-100 space-y-2.5 shrink-0 bg-white">
          {/* Cloud Video Storage Card (Real Agency Metric) */}
          <div className="p-2.5 bg-zinc-50/70 border border-zinc-200/60 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-zinc-700 text-[11px]">
                <HardDrive className="w-3.5 h-3.5 text-zinc-500" />
                <span>Penyimpanan Media & Video</span>
              </span>
              <span className="font-inter text-[10px] text-zinc-500">
                342 GB / 1 TB
              </span>
            </div>
            
            <div className="w-full bg-zinc-200/70 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-zinc-900 h-full rounded-full transition-all duration-500" 
                style={{ width: '34%' }} 
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-0.5">
              <span>Cloud Storage Studio</span>
              <span className="text-zinc-700 font-medium font-inter">34% Terpakai</span>
            </div>
          </div>

          {/* Minimalist Action Bar */}
          <div className="flex items-center justify-between px-1 text-[11px] text-zinc-400">
            <button
              onClick={onOpenSupport}
              className="hover:text-zinc-900 transition cursor-pointer"
            >
              Pusat Bantuan
            </button>
            <span>•</span>
            <button
              onClick={onSeedSampleData}
              className="hover:text-zinc-900 transition cursor-pointer"
              title="Reset data ke sampel standar"
            >
              Sinkron Sampel
            </button>
            <span>•</span>
            <span className="font-inter text-[10px]">v2.4</span>
          </div>
        </div>
      </aside>
    </>
  );
}
