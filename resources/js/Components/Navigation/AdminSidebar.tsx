'use client';

import React from 'react';
import { router } from '@inertiajs/react';
import {
  LayoutGrid,
  Wallet,
  Users,
  FileText,
  Calendar,
  ThumbsUp,
  Layers,
  Clapperboard,
  LogOut,
  X,
} from 'lucide-react';
import { ClientPipeline, ContentItem, VideoProductionTask } from '@/types';

export type AdminTabKey =
  | 'mission_control'
  | 'finance'
  | 'clients'
  | 'brief_vault'
  | 'agency_calendar'
  | 'feedback_review'
  | 'content_engine'
  | 'production_mgmt'
  | 'notifications'
  | 'profile'
  | 'account_settings'
  | 'retainer_plans';

export interface AdminSidebarProps {
  adminTab: AdminTabKey;
  setAdminTab: (tab: AdminTabKey) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  selectedClientId: string;
  setSelectedClientId: (id: string) => void;
  selectedClient: ClientPipeline;
  clientPipeline: ClientPipeline[];
  contentList: ContentItem[];
  videoTasks: VideoProductionTask[];
  stalledReviews?: ContentItem[];
  pendingInvoices: ClientPipeline[];
  onOpenAddClient?: () => void;
  onOpenAddContent?: () => void;
  onClearAllData?: () => void;
  onSeedSampleData?: () => void;
  onOpenSupport?: () => void;
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
  pendingInvoices,
}: AdminSidebarProps) {
  const activeBrandContentCount = contentList.filter(
    (c) => c.clientId === selectedClientId
  ).length;
  const activeBrandStudioCount = videoTasks.filter(
    (t) => t.clientId === selectedClientId
  ).length;
  const prospectCount = clientPipeline.filter((c) => !c.isUnlocked).length;

  const agencyNavItems: {
    key: AdminTabKey;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | null;
  }[] = [
    { key: 'mission_control', name: 'Dashboard', icon: LayoutGrid },
    {
      key: 'finance',
      name: 'Finansial & DP',
      icon: Wallet,
      badge: pendingInvoices.length || null,
    },
    { key: 'clients', name: 'Klien & Kuota', icon: Users },
    {
      key: 'brief_vault',
      name: 'Prospek & Brief',
      icon: FileText,
      badge: prospectCount || null,
    },
    { key: 'agency_calendar', name: 'Kalender Agensi', icon: Calendar },
    { key: 'feedback_review', name: 'Feedback & Review', icon: ThumbsUp },
  ];

  const executionNavItems: {
    key: AdminTabKey;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | null;
  }[] = [
    {
      key: 'content_engine',
      name: 'Content Engine',
      icon: Layers,
      badge: activeBrandContentCount || null,
    },
    {
      key: 'production_mgmt',
      name: 'Aset & Desain',
      icon: Clapperboard,
      badge: activeBrandStudioCount || null,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white px-4 py-5 select-none">
      {/* Brand Logo */}
      <button
        type="button"
        onClick={() => {
          setAdminTab('mission_control');
          setMobileMenuOpen(false);
        }}
        className="flex items-center gap-2.5 px-2 mb-5 text-left cursor-pointer"
      >
        <img
          src="/images/cermin-logo.png"
          alt="Cermin Agency"
          className="w-8 h-8 rounded-xl object-cover shadow-sm border border-[#DCEEFF] shrink-0"
        />
        <div>
          <span className="block text-[16px] font-bold tracking-tight text-slate-900 leading-none">
            Cermin OS
          </span>
          <span className="block text-[10px] font-medium text-slate-400 mt-0.5">
            Agency Admin
          </span>
        </div>
      </button>

      {/* Group 1: Level Agensi (Global Scope) */}
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Level Agensi
        </p>
        {agencyNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = adminTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setAdminTab(item.key);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#3B9BF8] text-white shadow-[0_6px_16px_rgba(59,155,248,0.28)]'
                  : 'text-slate-500 hover:bg-[#F3F8FF] hover:text-[#3B9BF8]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                {item.name}
              </span>
              {item.badge ? (
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

      {/* Group 2: Workspace Brand (Per-Brand Scope) */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 flex-1">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Workspace Brand
        </p>

        {/* Brand Switcher */}
        <div className="bg-[#EFF7FF] rounded-xl p-2.5 border border-[#DCEEFF] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-500">
              Brand Aktif
            </span>
            {selectedClient?.id && (
              <span
                className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md ${
                  selectedClient.isUnlocked
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {selectedClient.isUnlocked ? 'Resmi' : 'Demo'}
              </span>
            )}
          </div>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="w-full bg-white text-[11.5px] font-bold text-slate-800 px-2.5 py-1.5 rounded-lg border-0 ring-1 ring-[#DCEEFF] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8] cursor-pointer"
          >
            {clientPipeline.length === 0 ? (
              <option value="">Belum ada klien</option>
            ) : (
              clientPipeline.map((cl) => (
                <option key={cl.id} value={cl.id}>
                  {cl.business}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="space-y-1">
          {executionNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setAdminTab(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#3B9BF8] text-white shadow-[0_6px_16px_rgba(59,155,248,0.28)]'
                    : 'text-slate-500 hover:bg-[#F3F8FF] hover:text-[#3B9BF8]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  {item.name}
                </span>
                {item.badge ? (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md tabular-nums ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#EFF7FF] text-[#3B9BF8]'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Promo Aset Card (Signature Wave) */}
      <div className="mt-5 rounded-2xl overflow-hidden bg-gradient-to-b from-[#DCEEFF] via-[#B8DEFF] to-[#7CC0FF] p-3.5 text-center relative">
        <div className="relative z-10 space-y-1">
          <p className="text-[12px] font-bold text-slate-800 leading-snug">
            Brankas Aset &amp; Desain
          </p>
          <p className="text-[10px] text-slate-600">
            Kelola progres &amp; link hasil desain
          </p>
          <div className="pt-5">
            <button
              type="button"
              onClick={() => {
                setAdminTab('production_mgmt');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-white hover:bg-slate-50 text-slate-800 text-[11px] font-semibold py-1.5 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Buka Aset &amp; Desain
            </button>
          </div>
        </div>
        <svg
          viewBox="0 0 200 70"
          className="absolute inset-x-0 bottom-0 w-full h-20 opacity-60 pointer-events-none"
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

      <button
        type="button"
        onClick={() => router.post('/logout')}
        className="mt-3 flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-colors cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        Keluar
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-[236px] shrink-0 border-r border-[#EEF2F6] sticky top-0 h-screen overflow-y-auto bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[250px] max-w-[82vw] h-full bg-white shadow-xl z-10 overflow-y-auto">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
              aria-label="Tutup menu"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
