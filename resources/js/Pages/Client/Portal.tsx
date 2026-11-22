'use client';

import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { AgencyProvider } from '@/context/AgencyContext';
import { useAgency } from '@/context/AgencyContext';
import { ContentItem, ClientPipeline, VideoProductionTask } from '@/types';
import { 
  Calendar, Video, BarChart3, Compass, CheckCircle2, Lock, 
  Plus, AlertCircle, ExternalLink, ArrowRight, Film, Clock, 
  Menu, X, Sparkles, UserCheck, ChevronRight 
} from 'lucide-react';
import { CalendarView } from '@/Components/Client/CalendarView';
import { ReviewModal } from '@/Components/Modals/ReviewModal';
import { ClientRequestModal } from '@/Components/Modals/ClientRequestModal';
import { LockedFeatureModal } from '@/Components/Modals/LockedFeatureModal';
import { DashboardHeader } from '@/Components/Navigation/DashboardHeader';
import { ClientSidebar } from '@/Components/Navigation/ClientSidebar';

interface ClientPortalProps {
  client?: ClientPipeline | null;
  contents?: ContentItem[];
  videoTasks?: VideoProductionTask[];
}

export default function ClientPortal({
  client,
  contents = [],
  videoTasks = [],
}: ClientPortalProps) {
  const initialClients = client ? [client] : [];

  return (
    <AgencyProvider
      initialClients={initialClients}
      initialContents={contents}
      initialVideoTasks={videoTasks}
      initialSelectedClientId={client?.id}
      userRole="client"
    >
      <Head title="Portal Klien - Cermin Kreatif" />
      <PortalContent />
    </AgencyProvider>
  );
}

function PortalContent() {
  const { 
    accountType, 
    selectedClient, 
    activeClientContents, 
    videoTasks 
  } = useAgency();

  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'production' | 'strategy'>('overview');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: 'overview' | 'calendar' | 'production' | 'strategy') => {
    if (accountType === 'demo' && (tab === 'calendar' || tab === 'production')) {
      setShowLockedModal(true);
      return;
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const pendingReviews = activeClientContents.filter(c => c.status === 'Menunggu Review');
  const approvedContents = activeClientContents.filter(c => c.status === 'Disetujui');
  const clientStudioTasks = videoTasks.filter(t => t.clientId === selectedClient.id);

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-zinc-50/50">
      {/* Efferd AppShell-2 Modern Client Sidebar */}
      <ClientSidebar
        activeTab={activeTab}
        onTabClick={handleTabClick}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        accountType={accountType}
        selectedClient={selectedClient}
        onOpenRequestModal={() => setShowRequestModal(true)}
        onOpenSupport={() => {
          const btn = document.querySelector('button[aria-label="Buka dukungan Cermin Kreatif"]') as HTMLButtonElement;
          if (btn) btn.click();
        }}
      />


      {/* ========================================================
          MAIN WORKSPACE CANVAS (Full Precision Layout)
      ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader
          role="client"
          activeTabTitle={
            activeTab === 'overview' ? 'Ringkasan Portal' :
            activeTab === 'calendar' ? 'Kalender & Feed Simulator' :
            activeTab === 'production' ? 'Progres Video & Shoot' : 'Strategi Brand & Hook'
          }
          selectedClient={selectedClient}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onOpenSupportWidget={() => {
            const btn = document.querySelector('button[aria-label="Buka dukungan Cermin Kreatif"]') as HTMLButtonElement;
            if (btn) btn.click();
          }}
        />
        <main className="flex-1 w-full min-w-0 p-6 sm:p-8 xl:p-10 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-2 border-b border-zinc-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                    Selamat Datang di Portal {selectedClient.business}
                  </h1>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    Pantau seluruh jadwal penayangan konten, draf video yang perlu persetujuan, dan progres syuting studio.
                  </p>
                </div>
                <div className="text-xs font-inter text-zinc-500 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg shadow-2xs">
                  Faktur: {selectedClient.invoiceNumber}
                </div>
              </div>

              {/* 3 Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-inter text-zinc-400 uppercase tracking-wider block">
                    STATUS KONTRAK KERJA SAMA
                  </span>
                  <div className="text-xl font-semibold text-zinc-900 mt-1.5 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${accountType === 'official' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span>{accountType === 'official' ? 'Aktif Resmi (Lunas DP)' : 'Mode Demo Terkunci'}</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-light mt-2">
                    {accountType === 'official' ? 'Kalender & video terbuka penuh' : 'Menunggu verifikasi DP 50%'}
                  </p>
                </div>

                <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-inter text-zinc-400 uppercase tracking-wider block">
                    KONTEN PERLU REVIEW ANDA
                  </span>
                  <div className="text-3xl font-semibold text-zinc-900 font-inter tracking-tight mt-1.5">
                    {pendingReviews.length} Draf Video
                  </div>
                  <p className="text-xs text-zinc-500 font-light mt-2">
                    Memerlukan persetujuan sebelum jam posting
                  </p>
                </div>

                <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-inter text-zinc-400 uppercase tracking-wider block">
                    KONTEN DISETUJUI & TERJADWAL
                  </span>
                  <div className="text-3xl font-semibold text-emerald-700 font-inter tracking-tight mt-1.5">
                    {approvedContents.length} Siap Tayang
                  </div>
                  <p className="text-xs text-zinc-500 font-light mt-2">
                    Terkunci final untuk penayangan H-1
                  </p>
                </div>
              </div>

              {/* ACTION NEEDED RADAR */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-5 pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
                      Perlu Tindakan Anda (Menunggu Persetujuan Klien)
                    </h2>
                  </div>
                  <span className="text-xs font-inter text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-200">
                    {pendingReviews.length} Konten Pending
                  </span>
                </div>

                {pendingReviews.length > 0 ? (
                  <div className="space-y-3">
                    {pendingReviews.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedContent(item)}
                        className="p-4 rounded-xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer shadow-2xs group"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-12 h-12 rounded-lg bg-zinc-900 overflow-hidden shrink-0 shadow-2xs">
                            <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-inter font-medium text-zinc-500">{item.day} ({item.weekday})</span>
                              <span className="text-[10px] font-inter px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 font-bold">{item.version}</span>
                              <span className="text-[10px] font-inter text-zinc-400">{item.platforms.join(' • ')}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-zinc-900 mt-1 truncate">{item.title}</h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition shadow-xs">
                            Review & Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center text-zinc-400 text-xs font-inter bg-zinc-50/30 rounded-xl border border-dashed border-zinc-200">
                    Tidak ada konten yang pending. Seluruh draf terkini telah ditinjau!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CALENDAR & FEED */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-zinc-200">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                  Kalender Distribusi & Feed Simulator
                </h1>
                <p className="text-xs text-zinc-500 font-light mt-1">
                  Matriks tanggal penayangan bulanan dan simulasi tampilan visual feed Instagram serta thumbnail TikTok.
                </p>
              </div>
              <CalendarView onSelectItem={(item) => setSelectedContent(item)} />
            </div>
          )}

          {/* TAB 3: PRODUCTION STUDIO OPS */}
          {activeTab === 'production' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-zinc-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                    Pipeline Produksi Video Studio Malang
                  </h1>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    Transparansi alur syuting dari riset naskah, pengambilan gambar kamera 4K, hingga tahap finishing.
                  </p>
                </div>
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1.5 transition shadow-2xs"
                >
                  <span>Akses Folder Mentahan 4K</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs divide-y divide-zinc-100">
                {clientStudioTasks.map((task) => (
                  <div key={task.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-semibold text-zinc-900">{task.title}</span>
                        <span className="text-[10px] font-inter px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-medium">
                          {task.phase}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-44 bg-zinc-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${task.progress === 100 ? 'bg-emerald-600' : 'bg-zinc-900'}`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-inter text-zinc-600 font-medium">{task.progress}% Selesai</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-500 font-light">Penanggung Jawab: <strong className="text-zinc-800">{task.shooter}</strong></span>
                      <span className={`text-xs px-2.5 py-1 rounded-md font-inter ${
                        task.status === 'Selesai' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        task.status === 'Sedang Berjalan' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-zinc-100 text-zinc-600'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STRATEGY & HOOK */}
          {activeTab === 'strategy' && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-zinc-200">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                  Strategi Pilar Brand & Formula Hook Retensi
                </h1>
                <p className="text-xs text-zinc-500 font-light mt-1">
                  Panduan acuan tim kreatif dalam menyusun naskah dan produksi visual brand Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                  <span className="text-xs font-inter uppercase text-zinc-400 font-semibold">Pilar 1 (50%)</span>
                  <h3 className="text-base font-semibold text-zinc-900 mt-1">Edukasi & Problem Solving</h3>
                  <p className="text-xs text-zinc-600 font-light mt-2.5 leading-relaxed">
                    Membongkar masalah spesifik audiens dan menyajikan solusi praktis lewat produk brand.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                  <span className="text-xs font-inter uppercase text-zinc-400 font-semibold">Pilar 2 (30%)</span>
                  <h3 className="text-base font-semibold text-zinc-900 mt-1">Storytelling & Founder Journey</h3>
                  <p className="text-xs text-zinc-600 font-light mt-2.5 leading-relaxed">
                    Membangun ikatan emosional melalui cerita autentik di balik dapur produksi dan standar QC.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                  <span className="text-xs font-inter uppercase text-zinc-400 font-semibold">Pilar 3 (20%)</span>
                  <h3 className="text-base font-semibold text-zinc-900 mt-1">Direct Response & Promo</h3>
                  <p className="text-xs text-zinc-600 font-light mt-2.5 leading-relaxed">
                    Memicu konversi penjualan instan melalui penawaran terbatas dan call-to-action yang tegas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      </div>

      {/* Modals */}
      {selectedContent && (
        <ReviewModal
          item={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}

      {showRequestModal && (
        <ClientRequestModal
          onClose={() => setShowRequestModal(false)}
        />
      )}

      {showLockedModal && (
        <LockedFeatureModal
          onClose={() => setShowLockedModal(false)}
        />
      )}
    </div>
  );
}
