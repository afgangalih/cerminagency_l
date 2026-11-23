import { Head } from '@inertiajs/react';
import { AgencyProvider } from '@/context/AgencyContext';
'use client';

import React, { useState } from 'react';
import { useAgency } from '@/context/AgencyContext';
import { ContentItem, ContentStage, ClientPipeline, PlatformType, VideoProductionTask, Invoice } from '@/types';
import { 
  LayoutDashboard, Kanban, Film, DollarSign, FileText, 
  Users, Plus, Share2, Receipt, CheckCircle2, Unlock, ChevronRight, 
  ChevronDown, ExternalLink, Menu, X, ArrowUpRight, AlertTriangle, 
  ShieldCheck, Calendar, Grid3X3, Eye, Heart, MessageCircle, Clock,
  Sparkles, Check, Filter, Trash2, RefreshCw, Database, Building2
} from 'lucide-react';
import { AddContentModal } from '@/Components/Modals/AddContentModal';
import { AddClientModal } from '@/Components/Modals/AddClientModal';
import { AddStudioTaskModal } from '@/Components/Modals/AddStudioTaskModal';
import { AddOnQuotaModal } from '@/Components/Modals/AddOnQuotaModal';
import { InspectProofModal } from '@/Components/Modals/InspectProofModal';
import { AdminRevisionModal } from '@/Components/Modals/AdminRevisionModal';
import { ReviewModal } from '@/Components/Modals/ReviewModal';
import { EmptyState } from '@/Components/UI/EmptyState';
import { DashboardTwoExecutive } from '@/Components/Admin/DashboardTwoExecutive';
import { DashboardHeader } from '@/Components/Navigation/DashboardHeader';
import { AdminSidebar } from '@/Components/Navigation/AdminSidebar';
import { ProfileView } from '@/Components/Views/ProfileView';
import { AccountSettingsView } from '@/Components/Views/AccountSettingsView';
import { RetainerPlansView } from '@/Components/Views/RetainerPlansView';

interface AdminDashboardProps {
  clients?: ClientPipeline[];
  contents?: ContentItem[];
  videoTasks?: VideoProductionTask[];
  invoices?: Invoice[];
}

export default function AdminDashboard({
  clients = [],
  contents = [],
  videoTasks = [],
  invoices = [],
}: AdminDashboardProps) {
  return (
    <AgencyProvider
      initialClients={clients}
      initialContents={contents}
      initialVideoTasks={videoTasks}
      initialInvoices={invoices}
      userRole="admin"
    >
      <Head title="Pusat Komando Agensi - Cermin Kreatif" />
      <AdminContent />
    </AgencyProvider>
  );
}

function AdminContent() {
  const {
    clientPipeline,
    contentList,
    videoTasks,
    selectedClientId,
    setSelectedClientId,
    selectedClient,
    activeClientContents,
    moveContentStage,
    updateStudioTask,
    deleteStudioTask,
    deleteClient,
    deleteContentItem,
    clearAllData,
    seedSampleData,
    triggerNotification
  } = useAgency();

  // Navigation tab
  const [adminTab, setAdminTab] = useState<
    'mission_control' | 'content_engine' | 'production_mgmt' | 'finance' | 'clients' | 'brief_vault' | 'profile' | 'account_settings' | 'retainer_plans'
  >('mission_control');

  // Sub-view switcher for Content Engine (Kanban vs Calendar vs IG Feed vs TikTok Feed)
  const [contentViewMode, setContentViewMode] = useState<'kanban' | 'calendar' | 'instagram_feed' | 'tiktok_feed'>('kanban');
  const [platformFilter, setPlatformFilter] = useState<PlatformType | 'all'>('all');
  const [activeDate, setActiveDate] = useState<number>(12);

  // Modals
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddStudioTaskModal, setShowAddStudioTaskModal] = useState(false);
  const [showAddOnModal, setShowAddOnModal] = useState(false);
  const [selectedProofClient, setSelectedProofClient] = useState<ClientPipeline | null>(null);
  const [selectedRevisionContent, setSelectedRevisionContent] = useState<ContentItem | null>(null);
  const [selectedPreviewContent, setSelectedPreviewContent] = useState<ContentItem | null>(null);
  const [clientToDelete, setClientToDelete] = useState<ClientPipeline | null>(null);
  const [contentToDelete, setContentToDelete] = useState<ContentItem | null>(null);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientPicFilter, setClientPicFilter] = useState<string>('ALL');

  const uniqueClientPics = Array.from(
    new Set(clientPipeline.map((c) => c.picAssigned).filter(Boolean))
  ) as string[];

  const filteredClientsForTab = clientPicFilter === 'ALL'
    ? clientPipeline
    : clientPipeline.filter((c) => c.picAssigned === clientPicFilter);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Filtered contents for current client
  const filteredContents = activeClientContents.filter(item => {
    if (platformFilter === 'all') return true;
    return item.platforms.includes(platformFilter);
  });

  // One-Click WhatsApp Dispatcher (Zero Paid API)
  const handlePingClient = (client: ClientPipeline, item: ContentItem) => {
    const text = encodeURIComponent(
      `Halo Kak ${client.name} dari ${client.business}!\n\n` +
      `Tim Cermin Kreatif telah mengunggah draf konten terbaru: "${item.title}".\n` +
      `Format: ${item.type} | Jadwal Tayang: ${item.day} (${item.weekday})\n\n` +
      `Mohon luangkan 1 menit untuk meninjau dan memberikan persetujuan melalui Portal Klien agar antrean publikasi tetap tepat waktu. Terima kasih banyak!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    triggerNotification(`Pesan WhatsApp tindak lanjut untuk ${client.business} siap dikirim!`);
  };

  // Executive KPIs
  const totalMRR = clientPipeline.reduce((acc, c) => acc + (parseInt(c.totalValue.replace(/\D/g, ''), 10) || 0), 0);
  const pendingInvoices = clientPipeline.filter(c => !c.isUnlocked);
  const stalledReviews = contentList.filter(c => c.stage === 'review');

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-zinc-50 text-zinc-900 font-sans antialiased">
      {/* Efferd AppShell-2 Modern Admin Sidebar */}
      <AdminSidebar
        adminTab={adminTab}
        setAdminTab={setAdminTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        selectedClientId={selectedClientId}
        setSelectedClientId={setSelectedClientId}
        selectedClient={selectedClient}
        clientPipeline={clientPipeline}
        contentList={contentList}
        videoTasks={videoTasks}
        stalledReviews={stalledReviews}
        pendingInvoices={pendingInvoices}
        onOpenAddClient={() => setShowAddClientModal(true)}
        onOpenAddContent={() => setShowAddContentModal(true)}
        onClearAllData={clearAllData}
        onSeedSampleData={seedSampleData}
        onOpenSupport={() => {
          const btn = document.querySelector('button[aria-label="Buka dukungan Cermin Kreatif"]') as HTMLButtonElement;
          if (btn) btn.click();
        }}
      />

      {/* ========================================================
          MAIN WORKSPACE CANVAS (Full Precision Layout)
      ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <DashboardHeader
          role="admin"
          activeTabTitle={
            adminTab === 'mission_control' ? 'Pusat Kendali' :
            adminTab === 'content_engine' ? 'SOP Konten' :
            adminTab === 'production_mgmt' ? 'Studio Ops' :
            adminTab === 'finance' ? 'Verifikasi DP & Faktur' :
            adminTab === 'clients' ? 'Direktori Klien' :
            adminTab === 'brief_vault' ? 'Arsip Brief Masuk' :
            adminTab === 'profile' ? 'Profil Akun Studio' :
            adminTab === 'account_settings' ? 'Pengaturan Akun & Studio' :
            'Paket Retainer & Skema Kontrak'
          }
          selectedClient={selectedClient}
          clientPipeline={clientPipeline}
          selectedClientId={selectedClientId}
          setSelectedClientId={setSelectedClientId}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onOpenSupportWidget={() => {
            const btn = document.querySelector('button[aria-label="Buka dukungan Cermin Kreatif"]') as HTMLButtonElement;
            if (btn) btn.click();
          }}
          onOpenAddClient={() => setShowAddClientModal(true)}
          onNavigateTab={(tab) => setAdminTab(tab)}
        />
        <main className="flex-1 w-full min-w-0 p-6 sm:p-8 xl:p-10 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto space-y-8">

          {/* ========================================================
              TAB 1: MISSION CONTROL
          ======================================================== */}
          {adminTab === 'mission_control' && (
            <div className="space-y-6">
              {clientPipeline.length === 0 ? (
                <EmptyState
                  icon={Building2}
                  title="Belum Ada Klien Terdaftar"
                  description="Mulai operasional agensi Cermin Kreatif dengan mendaftarkan brand klien pertama, atau muat data sampel untuk simulasi fitur."
                  actionLabel="+ Daftarkan Klien Pertama"
                  onAction={() => setShowAddClientModal(true)}
                  secondaryLabel="Muat Data Sampel"
                  onSecondaryAction={seedSampleData}
                />
              ) : (
                <DashboardTwoExecutive
                  clients={clientPipeline}
                  contents={contentList}
                  stalledReviews={stalledReviews}
                  onPingClient={handlePingClient}
                  onOpenAddClient={() => setShowAddClientModal(true)}
                  onOpenAddContent={() => setShowAddContentModal(true)}
                  onInspectProof={(client) => setSelectedProofClient(client)}
                  onSelectClient={(id) => setSelectedClientId(id)}
                />
              )}
            </div>
          )}

          {/* ========================================================
          TAB 2: CONTENT ENGINE (MULTI-VIEW)
          ======================================================== */}
          {adminTab === 'content_engine' && (
            <div className="space-y-6">
              {/* Header with View Switchers & Action Buttons */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-2 border-b border-zinc-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                    Produksi Konten — {selectedClient.business || 'Pilih Klien'}
                  </h1>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    Gunakan Kanban SOP 5 tahap, Matriks Kalender 1–31, atau Simulator Feed untuk mengontrol produksi.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Multi-view Switcher */}
                  <div className="inline-flex rounded-xl p-1 bg-white border border-zinc-200 shadow-2xs">
                    <button
                      onClick={() => setContentViewMode('kanban')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                        contentViewMode === 'kanban' 
                          ? 'bg-zinc-900 text-white shadow-2xs' 
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Kanban className="w-3.5 h-3.5" />
                      <span>Kanban SOP</span>
                    </button>

                    <button
                      onClick={() => setContentViewMode('calendar')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                        contentViewMode === 'calendar' 
                          ? 'bg-zinc-900 text-white shadow-2xs' 
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Kalender 1–31</span>
                    </button>

                    <button
                      onClick={() => setContentViewMode('instagram_feed')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                        contentViewMode === 'instagram_feed' 
                          ? 'bg-zinc-900 text-white shadow-2xs' 
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Grid3X3 className="w-3.5 h-3.5" />
                      <span>Feed IG 3x3</span>
                    </button>

                    <button
                      onClick={() => setContentViewMode('tiktok_feed')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                        contentViewMode === 'tiktok_feed' 
                          ? 'bg-zinc-900 text-white shadow-2xs' 
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>TikTok 9:16</span>
                    </button>
                  </div>

                  {/* Add Content Button */}
                  <button
                    onClick={() => setShowAddContentModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Jadwalkan Konten</span>
                  </button>
                </div>
              </div>

              {/* Platform Filter Controls */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 font-inter text-[11px] flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter Platform:
                </span>
                <button
                  onClick={() => setPlatformFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                    platformFilter === 'all'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setPlatformFilter('instagram')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                    platformFilter === 'instagram'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Instagram
                </button>
                <button
                  onClick={() => setPlatformFilter('tiktok')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                    platformFilter === 'tiktok'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  TikTok
                </button>
              </div>

              {/* Empty Check */}
              {clientPipeline.length === 0 ? (
                <EmptyState
                  icon={Building2}
                  title="Belum Ada Brand Klien"
                  description="Daftarkan klien terlebih dahulu untuk mengatur kalender produksi dan pipeline konten."
                  actionLabel="+ Daftarkan Klien"
                  onAction={() => setShowAddClientModal(true)}
                />
              ) : filteredContents.length === 0 ? (
                <EmptyState
                  icon={Calendar}
                  title={`Belum Ada Konten untuk ${selectedClient.business}`}
                  description="Buat konsep konten pertama untuk brand ini. Tentukan naskah, format platform, dan tanggal jadwal penayangan."
                  actionLabel="+ Jadwalkan Konten Pertama"
                  onAction={() => setShowAddContentModal(true)}
                />
              ) : (
                <>
                  {/* SUB-VIEW 1: KANBAN 5 STAGE */}
                  {contentViewMode === 'kanban' && (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
                      {[
                        { key: 'script', label: '1. Riset & Naskah', count: filteredContents.filter(c => c.stage === 'script').length },
                        { key: 'production', label: '2. Produksi & Edit', count: filteredContents.filter(c => c.stage === 'production').length },
                        { key: 'review', label: '3. Menunggu Review', count: filteredContents.filter(c => c.stage === 'review').length },
                        { key: 'revision', label: '4. Perlu Revisi', count: filteredContents.filter(c => c.stage === 'revision').length },
                        { key: 'scheduled', label: '5. Siap Tayang', count: filteredContents.filter(c => c.stage === 'scheduled').length }
                      ].map(column => {
                        const itemsInCol = filteredContents.filter(c => c.stage === column.key);
                        return (
                          <div key={column.key} className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs flex flex-col min-w-[240px]">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
                              <span className="text-xs font-semibold text-zinc-900">{column.label}</span>
                              <span className="text-[10px] font-inter px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-bold">
                                {column.count}
                              </span>
                            </div>

                            <div className="space-y-3 flex-1">
                              {itemsInCol.map(item => (
                                <div
                                  key={item.id}
                                  className="p-3.5 rounded-xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 transition shadow-2xs space-y-2.5 group"
                                >
                                  <div className="flex justify-between items-start gap-1">
                                    <span className="text-[10px] font-inter font-medium text-zinc-500">
                                      {item.day} ({item.weekday})
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <span className="text-[9px] font-inter px-1.5 py-0.2 rounded bg-zinc-200 text-zinc-800 font-bold">
                                        {item.version}
                                      </span>
                                      <button
                                        onClick={() => deleteContentItem(item.id)}
                                        className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-400 hover:text-rose-600 transition"
                                        title="Hapus konten"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>

                                  <h4 className="text-xs font-semibold text-zinc-900 leading-snug line-clamp-2">
                                    {item.title}
                                  </h4>

                                  <div className="text-[10px] font-inter text-zinc-400 uppercase">
                                    {item.platforms.join(' • ')}
                                  </div>

                                  {/* Quick Actions */}
                                  <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-[11px]">
                                    <button
                                      onClick={() => setSelectedPreviewContent(item)}
                                      className="text-zinc-600 hover:text-zinc-900 font-medium flex items-center gap-1 cursor-pointer"
                                    >
                                      <Eye className="w-3 h-3" />
                                      <span>Pratinjau</span>
                                    </button>

                                    {item.stage === 'revision' && (
                                      <button
                                        onClick={() => setSelectedRevisionContent(item)}
                                        className="text-rose-700 hover:text-rose-800 font-semibold cursor-pointer"
                                      >
                                        Input Draf V2
                                      </button>
                                    )}

                                    {item.stage !== 'revision' && (
                                      <select
                                        value={item.stage}
                                        onChange={(e) => moveContentStage(item.id, e.target.value as ContentStage)}
                                        className="text-[10px] bg-white border border-zinc-200 rounded px-1.5 py-0.5 text-zinc-700 cursor-pointer"
                                      >
                                        <option value="script">Pindah: Naskah</option>
                                        <option value="production">Pindah: Edit</option>
                                        <option value="review">Pindah: Review</option>
                                        <option value="revision">Pindah: Revisi</option>
                                        <option value="scheduled">Pindah: Siap Tayang</option>
                                      </select>
                                    )}
                                  </div>
                                </div>
                              ))}

                              {itemsInCol.length === 0 && (
                                <div className="py-8 text-center text-zinc-300 text-[11px] font-inter">
                                  Kosong
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* SUB-VIEW 2: CALENDAR 1-31 MATRIX */}
                  {contentViewMode === 'calendar' && (
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-zinc-100">
                        <span className="text-xs font-inter uppercase text-zinc-400 font-semibold">
                          Matriks Jadwal Penayangan Bulanan
                        </span>
                        <span className="text-xs font-inter text-zinc-700 font-medium">
                          {filteredContents.length} Konten Dijadwalkan
                        </span>
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {daysInMonth.map(day => {
                          const matchedItem = filteredContents.find(c => c.dayNumber === day);
                          const isSelected = activeDate === day;

                          return (
                            <div
                              key={day}
                              onClick={() => {
                                setActiveDate(day);
                                if (matchedItem) setSelectedPreviewContent(matchedItem);
                              }}
                              className={`h-24 p-2 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                                matchedItem
                                  ? 'bg-white border-zinc-300 hover:border-zinc-500 hover:shadow-xs'
                                  : 'bg-zinc-50/70 border-zinc-200/80 hover:border-zinc-300'
                              } ${isSelected ? 'ring-2 ring-zinc-900' : ''}`}
                            >
                              <div className="flex justify-between items-start">
                                <span className={`text-xs font-inter font-medium ${matchedItem ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
                                  {day}
                                </span>
                                {matchedItem && (
                                  <span className={`w-2 h-2 rounded-full ${
                                    matchedItem.status === 'Disetujui' ? 'bg-emerald-500' :
                                    matchedItem.status === 'Perlu Revisi' ? 'bg-rose-500' :
                                    'bg-amber-500'
                                  }`} />
                                )}
                              </div>

                              {matchedItem ? (
                                <div>
                                  <div className="text-[10px] text-zinc-900 font-medium truncate leading-tight">
                                    {matchedItem.title}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className="text-[9px] font-inter text-zinc-500 uppercase truncate">
                                      {matchedItem.platforms.join(' • ')}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[9px] text-zinc-300 font-inter">-</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SUB-VIEW 3: INSTAGRAM FEED 3x3 SIMULATOR */}
                  {contentViewMode === 'instagram_feed' && (
                    <div className="max-w-md mx-auto bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs">
                      <div className="flex items-center gap-4 pb-5 border-b border-zinc-100">
                        <div className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
                          {selectedClient.business.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-zinc-900">{selectedClient.instagram}</h4>
                          <p className="text-xs text-zinc-500 font-light mt-0.5">{selectedClient.business}</p>
                          <div className="flex gap-3 mt-1.5 text-xs text-zinc-700 font-inter">
                            <span><strong>{filteredContents.length}</strong> posts</span>
                            <span><strong>14.2K</strong> followers</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 mt-5">
                        {filteredContents.map(item => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedPreviewContent(item)}
                            className="aspect-square bg-zinc-100 rounded-lg overflow-hidden relative group cursor-pointer border border-zinc-200"
                          >
                            <img
                              src={item.mediaUrl}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white text-xs font-inter">
                              <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-white" /> 1.2K</span>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-zinc-900/80 text-white text-[9px] font-inter px-1 rounded">
                              {item.version}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-zinc-400 font-inter text-center mt-4">
                        Simulasi Grid Instagram • Klik cover untuk preview & audit draf
                      </p>
                    </div>
                  )}

                  {/* SUB-VIEW 4: TIKTOK 9:16 VERTICAL SIMULATOR */}
                  {contentViewMode === 'tiktok_feed' && (
                    <div className="max-w-3xl mx-auto bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs">
                      <div className="text-center pb-4 mb-4 border-b border-zinc-100">
                        <span className="text-xs font-inter uppercase text-zinc-400">TikTok Studio Showcase</span>
                        <h4 className="font-semibold text-sm text-zinc-900 mt-1">Pratinjau Thumbnail 9:16 & Hook 3 Detik</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredContents.map(item => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedPreviewContent(item)}
                            className="aspect-9/16 bg-zinc-900 rounded-2xl overflow-hidden relative group cursor-pointer border border-zinc-200 shadow-xs"
                          >
                            <img
                              src={item.mediaUrl}
                              alt={item.title}
                              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                              <span className="text-[10px] font-inter text-zinc-300 uppercase">{item.day} • {item.version}</span>
                              <h5 className="font-semibold text-xs leading-snug line-clamp-2 mt-1">{item.title}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 3: STUDIO OPS (MALANG)
          ======================================================== */}
          {adminTab === 'production_mgmt' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-zinc-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                    Operasional Studio Malang & Syuting Fisik
                  </h1>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    Atur tahapan syuting fisik di studio Malang, penanggung jawab kamera, dan perbarui progres pengerjaan tim.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddStudioTaskModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Task Studio</span>
                  </button>

                  <a
                    href="https://drive.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1.5 shadow-2xs transition"
                  >
                    <span>Google Drive 4K Master</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {videoTasks.length === 0 ? (
                <EmptyState
                  icon={Film}
                  title="Belum Ada Task Produksi Studio"
                  description="Catat jadwal syuting fisik, tim DOP penanggung jawab kamera, dan folder penyimpanan master 4K."
                  actionLabel="+ Tambah Task Studio Pertama"
                  onAction={() => setShowAddStudioTaskModal(true)}
                />
              ) : (
                <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs divide-y divide-zinc-100">
                  {videoTasks.map(task => {
                    const client = clientPipeline.find(c => c.id === task.clientId) || selectedClient;
                    return (
                      <div key={task.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="text-xs font-inter font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                              {client.business}
                            </span>
                            <span className="text-sm font-semibold text-zinc-900">{task.title}</span>
                            <span className="text-[10px] font-inter px-2 py-0.5 rounded bg-zinc-200 text-zinc-800">
                              {task.phase}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 font-light">
                            Shooter: <strong className="text-zinc-800">{task.shooter}</strong> • Penyimpanan: {task.rawFolder}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-inter text-zinc-700 font-semibold">{task.progress}%</span>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={task.progress}
                              onChange={(e) => updateStudioTask(task.id, parseInt(e.target.value, 10), task.status)}
                              className="w-24 sm:w-28 accent-zinc-900 cursor-pointer"
                            />
                          </div>

                          <select
                            value={task.status}
                            onChange={(e) => updateStudioTask(task.id, task.progress, e.target.value as any)}
                            className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-800 font-medium cursor-pointer"
                          >
                            <option value="Dalam Antrean">Dalam Antrean</option>
                            <option value="Sedang Berjalan">Sedang Berjalan</option>
                            <option value="Selesai">Selesai</option>
                          </select>

                          <button
                            onClick={() => deleteStudioTask(task.id)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Hapus task studio"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 4: FINANSIAL & VERIFIKASI DP
          ======================================================== */}
          {adminTab === 'finance' && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-zinc-200">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                  Birokrasi Finansial & Verifikasi Pembayaran
                </h1>
                <p className="text-xs text-zinc-500 font-light mt-1">
                  Verifikasi Termin 1 (DP 50%) untuk membuka fitur kalender dan Termin 2 sebelum penyerahan master file 4K.
                </p>
              </div>

              {clientPipeline.length === 0 ? (
                <EmptyState
                  icon={Receipt}
                  title="Belum Ada Kontrak atau Faktur Aktif"
                  description="Daftarkan brand klien untuk menerbitkan faktur proforma dan memverifikasi pembayaran DP 50%."
                  actionLabel="+ Tambah Klien & Faktur"
                  onAction={() => setShowAddClientModal(true)}
                />
              ) : (
                <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-inter uppercase text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Brand & Faktur</th>
                          <th className="py-3 px-4">Nilai Kontrak & DP</th>
                          <th className="py-3 px-4">Status Termin</th>
                          <th className="py-3 px-4">Bukti Slip</th>
                          <th className="py-3 px-4 text-right">Aksi Admin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {clientPipeline.map(client => (
                          <tr key={client.id} className="hover:bg-zinc-50/50 transition">
                            <td className="py-4 px-4">
                              <div className="font-semibold text-zinc-900 text-sm">{client.business}</div>
                              <div className="text-[11px] text-zinc-400 font-inter mt-0.5">{client.invoiceNumber}</div>
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-semibold text-zinc-900">Total: {client.totalValue}</div>
                              <div className="text-[11px] text-emerald-700 font-inter font-medium mt-0.5">DP: {client.dpAmount}</div>
                            </td>

                            <td className="py-4 px-4">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-inter border ${
                                client.isUnlocked 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}>
                                {client.status}
                              </span>
                              <div className="text-[10px] text-zinc-500 mt-0.5">{client.paymentTerm}</div>
                            </td>

                            <td className="py-4 px-4">
                              {client.transferProof ? (
                                <button
                                  onClick={() => setSelectedProofClient(client)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11px] font-medium transition cursor-pointer"
                                >
                                  <Receipt className="w-3.5 h-3.5" />
                                  <span>Lihat Slip Transfer</span>
                                </button>
                              ) : (
                                <span className="text-[11px] text-zinc-400 italic">Belum unggah</span>
                              )}
                            </td>

                            <td className="py-4 px-4 text-right">
                              {client.isUnlocked ? (
                                <span className="text-emerald-700 font-inter text-xs inline-flex items-center gap-1 font-semibold">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                                </span>
                              ) : (
                                <button
                                  onClick={() => setSelectedProofClient(client)}
                                  className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs inline-flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                                >
                                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Buka Akses</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 5: DAFTAR KLIEN & KUOTA (+SLOT)
          ======================================================== */}
          {adminTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-zinc-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                    Kesehatan Akun & Kontrol Kuota Retainer
                  </h1>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    Kontrol kuota video bulanan, tambahkan brand baru, atau lakukan upsell slot tambahan (+Add-on video).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddClientModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Klien Baru</span>
                  </button>

                  {selectedClient.id && (
                    <button
                      onClick={() => setShowAddOnModal(true)}
                      className="px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-medium text-xs flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+Slot Add-on ({selectedClient.business})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* PIC Fast Filter Pills */}
              {uniqueClientPics.length > 1 && (
                <div className="flex items-center gap-1.5 p-1 bg-zinc-100/80 rounded-xl w-fit border border-zinc-200/60">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-2">PIC:</span>
                  <button
                    onClick={() => setClientPicFilter('ALL')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                      clientPicFilter === 'ALL'
                        ? 'bg-white text-zinc-950 font-semibold shadow-2xs'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    Semua ({clientPipeline.length})
                  </button>
                  {uniqueClientPics.map((pic) => {
                    const shortName = pic.split(' ')[0];
                    const count = clientPipeline.filter((c) => c.picAssigned === pic).length;
                    return (
                      <button
                        key={pic}
                        onClick={() => setClientPicFilter(pic)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                          clientPicFilter === pic
                            ? 'bg-white text-zinc-950 font-semibold shadow-2xs'
                            : 'text-zinc-600 hover:text-zinc-950'
                        }`}
                      >
                        {shortName} ({count})
                      </button>
                    );
                  })}
                </div>
              )}

              {filteredClientsForTab.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="Belum Ada Klien untuk Filter Ini"
                  description="Tidak ditemukan klien untuk filter PIC terpilih. Ubah filter ke 'Semua' atau daftarkan klien baru."
                  actionLabel="+ Tambah Klien Sekarang"
                  onAction={() => setShowAddClientModal(true)}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {filteredClientsForTab.map(cl => (
                    <div key={cl.id} className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-4 relative group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-base text-zinc-900">{cl.business}</h3>
                          <span className="text-xs text-zinc-500 font-inter block mt-0.5">{cl.name} • {cl.instagram}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-inter px-2 py-0.5 rounded ${
                            cl.isUnlocked 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {cl.isUnlocked ? 'Aktif' : 'Pending DP'}
                          </span>
                          <button
                            onClick={() => setClientToDelete(cl)}
                            className="p-1 rounded text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Hapus klien"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Paket:</span>
                          <span className="text-zinc-900 font-medium">{cl.package}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Kuota Video Terpakai:</span>
                          <span className="font-inter font-bold text-zinc-900">{cl.reelsUsed} / {cl.reelsMax} Konten</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Nilai Kontrak:</span>
                          <span className="text-emerald-700 font-inter font-bold">{cl.totalValue}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-zinc-200/60">
                          <span className="text-zinc-500">PIC Penanggung Jawab:</span>
                          <span className="text-zinc-900 font-semibold font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-zinc-200/70">
                            {cl.picAssigned || 'Studio Lead'}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => {
                            setSelectedClientId(cl.id);
                            setAdminTab('content_engine');
                          }}
                          className="flex-1 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition cursor-pointer"
                        >
                          Buka Konten Brand Ini
                        </button>
                        <button
                          onClick={() => {
                            setSelectedClientId(cl.id);
                            setShowAddOnModal(true);
                          }}
                          className="px-3.5 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition cursor-pointer"
                        >
                          +Slot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 6: VAULT BRIEF & NASKAH BRAND
          ======================================================== */}
          {adminTab === 'brief_vault' && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-zinc-200">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                  Vault Brief & Dokumen Onboarding
                </h1>
                <p className="text-xs text-zinc-500 font-light mt-1">
                  Arsip kesepakatan awal brand, target audiens, dan problem statement klien untuk referensi tim kreatif.
                </p>
              </div>

              {clientPipeline.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="Belum Ada Dokumen Brief"
                  description="Brief klien baru yang masuk dari form landing page atau ditambah manual akan diarsipkan di sini."
                  actionLabel="+ Tambah Klien & Brief"
                  onAction={() => setShowAddClientModal(true)}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {clientPipeline.map(cl => (
                    <div key={cl.id} className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-base text-zinc-900">{cl.business}</h3>
                          <p className="text-xs text-zinc-400 font-inter mt-0.5">PIC: {cl.name} ({cl.email})</p>
                        </div>
                        <span className="text-[10px] font-inter px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-medium">
                          {cl.id}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-700 leading-relaxed font-light">
                        <strong className="text-zinc-900 font-medium block mb-1">Catatan Target / Problem Klien:</strong>
                        "{cl.briefNotes}"
                      </div>

                      <div className="pt-2 flex justify-between items-center text-xs font-inter text-zinc-500">
                        <span>Paket: {cl.package}</span>
                        <button
                          onClick={() => {
                            setSelectedClientId(cl.id);
                            setAdminTab('content_engine');
                          }}
                          className="text-zinc-900 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <span>Kelola Naskah di Kanban</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              FULL PAGE VIEW: PROFIL AKUN STUDIO
          ======================================================== */}
          {adminTab === 'profile' && (
            <ProfileView onBack={() => setAdminTab('mission_control')} />
          )}

          {/* ========================================================
              FULL PAGE VIEW: PENGATURAN AKUN & STUDIO
          ======================================================== */}
          {adminTab === 'account_settings' && (
            <AccountSettingsView onBack={() => setAdminTab('mission_control')} />
          )}

          {/* ========================================================
              FULL PAGE VIEW: PAKET RETAINER & SKEMA KONTRAK
          ======================================================== */}
          {adminTab === 'retainer_plans' && (
            <RetainerPlansView onBack={() => setAdminTab('mission_control')} />
          )}
        </div>
      </main>
      </div>

      {/* Delete Client Confirmation Modal */}
      {clientToDelete && (
        <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
            <h3 className="text-base font-semibold text-zinc-900">Hapus Klien {clientToDelete.business}?</h3>
            <p className="text-xs text-zinc-500 font-light mt-2 leading-relaxed">
              Tindakan ini akan menghapus data klien beserta seluruh jadwal konten dan task studio yang terkait dari penyimpanan lokal.
            </p>
            <div className="pt-5 flex justify-end gap-2.5">
              <button
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2 rounded-xl border border-zinc-200 text-xs text-zinc-700 font-medium hover:bg-zinc-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  deleteClient(clientToDelete.id);
                  setClientToDelete(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium cursor-pointer"
              >
                Ya, Hapus Klien
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Modals */}
      {showAddClientModal && (
        <AddClientModal
          onClose={() => setShowAddClientModal(false)}
        />
      )}

      {showAddStudioTaskModal && (
        <AddStudioTaskModal
          onClose={() => setShowAddStudioTaskModal(false)}
        />
      )}

      {showAddContentModal && (
        <AddContentModal
          onClose={() => setShowAddContentModal(false)}
        />
      )}

      {showAddOnModal && (
        <AddOnQuotaModal
          onClose={() => setShowAddOnModal(false)}
        />
      )}

      {selectedProofClient && (
        <InspectProofModal
          client={selectedProofClient}
          onClose={() => setSelectedProofClient(null)}
        />
      )}

      {selectedRevisionContent && (
        <AdminRevisionModal
          item={selectedRevisionContent}
          onClose={() => setSelectedRevisionContent(null)}
        />
      )}

      {selectedPreviewContent && (
        <ReviewModal
          item={selectedPreviewContent}
          onClose={() => setSelectedPreviewContent(null)}
        />
      )}
    </div>
  );
}
