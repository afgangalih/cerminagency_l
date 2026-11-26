'use client';

import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { AgencyProvider, useAgency } from '@/context/AgencyContext';
import {
  ContentItem,
  ClientPipeline,
  VideoProductionTask,
  Invoice,
  AgencyNotificationItem,
  AgencyEventItem,
  ClientReviewItem,
  StudioTeamMember,
} from '@/types';
import { AddContentModal } from '@/Components/Modals/AddContentModal';
import { AddClientModal } from '@/Components/Modals/AddClientModal';
import { AddStudioTaskModal } from '@/Components/Modals/AddStudioTaskModal';
import { AddOnQuotaModal } from '@/Components/Modals/AddOnQuotaModal';
import { InspectProofModal } from '@/Components/Modals/InspectProofModal';
import { AdminRevisionModal } from '@/Components/Modals/AdminRevisionModal';
import { ReviewModal } from '@/Components/Modals/ReviewModal';
import { DashboardTwoExecutive } from '@/Components/Admin/DashboardTwoExecutive';
import {
  FinanceDPView,
  ClientsQuotaView,
  VaultBriefView,
  AgencyCalendarView,
  FeedbackReviewView,
} from '@/Components/Admin/AgencyLevelViews';
import {
  ContentEngineView,
  StudioMalangView,
  NotificationsView,
  AdminProfileAccountView,
} from '@/Components/Admin/ExecutionAndSystemViews';
import { DashboardHeader, BreadcrumbItem } from '@/Components/Navigation/DashboardHeader';
import { AdminSidebar, AdminTabKey } from '@/Components/Navigation/AdminSidebar';

interface AdminDashboardProps {
  clients?: ClientPipeline[];
  contents?: ContentItem[];
  videoTasks?: VideoProductionTask[];
  invoices?: Invoice[];
  notifications?: AgencyNotificationItem[];
  agencyEvents?: AgencyEventItem[];
  clientReviews?: ClientReviewItem[];
  studioTeam?: StudioTeamMember[];
}

export default function AdminDashboard({
  clients = [],
  contents = [],
  videoTasks = [],
  invoices = [],
  notifications = [],
  agencyEvents = [],
  clientReviews = [],
  studioTeam = [],
}: AdminDashboardProps) {
  return (
    <AgencyProvider
      initialClients={clients}
      initialContents={contents}
      initialVideoTasks={videoTasks}
      initialInvoices={invoices}
      userRole="admin"
    >
      <Head title="Cermin OS — Agency Admin" />
      <AdminContent
        notifications={notifications}
        agencyEvents={agencyEvents}
        clientReviews={clientReviews}
        studioTeam={studioTeam}
      />
    </AgencyProvider>
  );
}

const TAB_TITLES: Record<AdminTabKey, string> = {
  mission_control: 'Dashboard',
  finance: 'Finansial & DP',
  clients: 'Klien & Kuota',
  brief_vault: 'Prospek & Brief Masuk',
  agency_calendar: 'Kalender Agensi',
  feedback_review: 'Feedback & Review',
  content_engine: 'Content Engine',
  production_mgmt: 'Aset & Desain',
  notifications: 'Notifikasi',
  profile: 'Profil & Akun',
  account_settings: 'Profil & Akun',
  retainer_plans: 'Klien & Kuota',
};

const TAB_SUBTITLES: Record<AdminTabKey, string> = {
  mission_control: 'Ringkasan performa agensi, antrean review, dan jadwal eksekusi hari ini.',
  finance: 'Verifikasi pembayaran DP 50%, status faktur, dan arus kas agensi.',
  clients: 'Kelola daftar brand klien resmi, kuota retainer bulanan, Konten Pilar, dan KPI.',
  brief_vault: 'Pantau calon klien yang baru mengirim brief, potensi omzet, dan follow-up sebelum DP.',
  agency_calendar: 'Agenda meeting, jadwal syuting, dan milestone operasional agensi.',
  feedback_review: 'Pantau umpan balik, tingkat kepuasan, dan testimoni dari setiap brand.',
  content_engine: 'Kelola alur kerja Kanban 5 tahap, matriks kalender 1–31, dan review 2 arah.',
  production_mgmt: 'Pantau progres pengerjaan desain dan kirim multi-link hasil ke klien.',
  notifications: 'Pusat pemberitahuan aktivitas klien, pembayaran, dan pembaruan konten.',
  profile: 'Pengaturan profil akun, keamanan, dan informasi tim internal agensi.',
  account_settings: 'Pengaturan profil akun, keamanan, dan informasi tim internal agensi.',
  retainer_plans: 'Kelola daftar brand klien, kuota retainer bulanan, dan status aktivasi portal.',
};

function AdminContent({
  notifications,
  agencyEvents,
  clientReviews,
  studioTeam,
}: {
  notifications: AgencyNotificationItem[];
  agencyEvents: AgencyEventItem[];
  clientReviews: ClientReviewItem[];
  studioTeam: StudioTeamMember[];
}) {
  const {
    clientPipeline,
    contentList,
    videoTasks,
    selectedClientId,
    setSelectedClientId,
    selectedClient,
    moveContentStage,
    updateStudioTask,
    deleteStudioTask,
    deleteClient,
    deleteContentItem,
    verifyPayment,
    triggerNotification,
    notification,
  } = useAgency();

  const [adminTab, setAdminTab] = useState<AdminTabKey>('mission_control');
  const [profileSubTab, setProfileSubTab] = useState<'profil' | 'keamanan' | 'tim'>('profil');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Modals
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddStudioTaskModal, setShowAddStudioTaskModal] = useState(false);
  const [showAddOnModal, setShowAddOnModal] = useState(false);
  const [selectedProofClient, setSelectedProofClient] = useState<ClientPipeline | null>(null);
  const [selectedRevisionContent, setSelectedRevisionContent] = useState<ContentItem | null>(null);
  const [selectedPreviewContent, setSelectedPreviewContent] = useState<ContentItem | null>(null);
  const [clientToDelete, setClientToDelete] = useState<ClientPipeline | null>(null);

  const pendingInvoices = clientPipeline.filter((c) => !c.isUnlocked);
  const stalledReviews = contentList.filter((c) => c.stage === 'review');
  const activeTabTitle = TAB_TITLES[adminTab] || 'Dashboard';

  // Hierarchical Text Breadcrumb Metadata matching _design-ref/CerminAgencyAdmin.tsx
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => {
    const items: BreadcrumbItem[] = [{ label: 'Cermin OS', nav: 'mission_control' }];
    if (adminTab === 'mission_control') {
      items.push({ label: 'Dashboard', nav: null });
    } else if (
      ['finance', 'clients', 'brief_vault', 'agency_calendar', 'feedback_review'].includes(adminTab)
    ) {
      items.push({ label: 'Level Agensi', nav: 'mission_control' });
      items.push({ label: activeTabTitle, nav: null });
    } else if (['content_engine', 'production_mgmt'].includes(adminTab)) {
      items.push({ label: 'Eksekusi Per-Brand', nav: 'clients' });
      if (selectedClient?.business) {
        items.push({ label: selectedClient.business, nav: 'clients' });
      }
      items.push({ label: activeTabTitle, nav: null });
    } else {
      items.push({ label: 'Akun & Sistem', nav: 'mission_control' });
      items.push({ label: activeTabTitle, nav: null });
    }
    return items;
  }, [adminTab, activeTabTitle, selectedClient]);

  // One-Click WhatsApp Dispatcher
  const handlePingClient = (client: ClientPipeline, item: ContentItem) => {
    const text = encodeURIComponent(
      `Halo Kak ${client.name} dari ${client.business}!\n\n` +
        `Tim Cermin Kreatif telah mengunggah draf konten terbaru: "${item.title}".\n` +
        `Format: ${item.type} | Jadwal Tayang: ${item.day} (${item.weekday})\n\n` +
        `Mohon luangkan 1 menit untuk meninjau dan memberikan persetujuan melalui Portal Klien agar antrean publikasi tetap tepat waktu. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    triggerNotification(`Pesan WhatsApp tindak lanjut untuk ${client.business} siap dikirim!`);
  };

  const handleCopyBrief = (cl: ClientPipeline) => {
    const summary = `Brief ${cl.business} (${cl.instagram})\nPIC: ${cl.name} (${cl.email})\nPaket: ${cl.package}\nTarget & Problem: ${cl.briefNotes}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(summary).catch(() => {});
    }
    triggerNotification(`Ringkasan brief ${cl.business} disalin ke clipboard!`);
  };

  const handleNotificationAction = (notif: AgencyNotificationItem) => {
    router.post(`/admin/notifications/${notif.id}/read`, {}, { preserveScroll: true });
    if (notif.clientId) {
      setSelectedClientId(notif.clientId);
    }
    if (notif.actionType === 'finance' || notif.actionType === 'inspect') {
      setAdminTab('finance');
    } else if (notif.actionType === 'content_engine' || notif.actionType === 'kanban') {
      setAdminTab('content_engine');
    } else if (notif.actionType === 'brief_vault') {
      setAdminTab('brief_vault');
    } else if (notif.actionType === 'clients') {
      setAdminTab('clients');
    } else {
      setAdminTab('mission_control');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1E293B] font-sans antialiased flex">
      {/* Structured Sidebar matching Reference */}
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
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FCFDFF]">
        <DashboardHeader
          role="admin"
          activeTabTitle={activeTabTitle}
          breadcrumbItems={breadcrumbItems}
          onNavigateBreadcrumb={(tab) => setAdminTab(tab)}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          notifications={notifications}
          onMarkAllNotifRead={() =>
            router.post('/admin/notifications/mark-all-read', {}, { preserveScroll: true })
          }
          onNotificationAction={handleNotificationAction}
          onOpenNotificationsPage={() => setAdminTab('notifications')}
          onOpenProfileTab={(subtab) => {
            setProfileSubTab(subtab);
            setAdminTab('profile');
          }}
          isNotificationsActive={adminTab === 'notifications'}
          isProfileActive={adminTab === 'profile' || adminTab === 'account_settings'}
          selectedClient={selectedClient}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 px-5 lg:px-7 py-6">
          <div className="mb-6">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-[#1E293B] tracking-tight leading-snug">
              {activeTabTitle}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {TAB_SUBTITLES[adminTab] || ''}
            </p>
          </div>
          {adminTab === 'mission_control' && (
            <DashboardTwoExecutive
              clients={clientPipeline}
              contents={contentList}
              stalledReviews={stalledReviews}
              videoTasks={videoTasks}
              agencyEvents={agencyEvents}
              notifications={notifications}
              onPingClient={handlePingClient}
              onInspectProof={(client) => setSelectedProofClient(client)}
              onSelectClient={(id) => setSelectedClientId(id)}
              onNavigateTab={(tab) => setAdminTab(tab)}
              onOpenAddClient={() => setShowAddClientModal(true)}
              onOpenAddContent={() => setShowAddContentModal(true)}
            />
          )}

          {adminTab === 'finance' && (
            <FinanceDPView
              clients={clientPipeline}
              globalSearch={globalSearch}
              onInspectProof={(cl) => setSelectedProofClient(cl)}
              onVerifyPayment={(id) => verifyPayment(id)}
            />
          )}

          {adminTab === 'clients' && (
            <ClientsQuotaView
              clients={clientPipeline}
              contents={contentList}
              globalSearch={globalSearch}
              onOpenAddClient={() => setShowAddClientModal(true)}
              onOpenAddOn={(clientId) => {
                setSelectedClientId(clientId);
                setShowAddOnModal(true);
              }}
              onDeleteClient={(cl) => setClientToDelete(cl)}
              onJumpToBrand={(clientId) => {
                setSelectedClientId(clientId);
                setAdminTab('content_engine');
              }}
            />
          )}

          {adminTab === 'brief_vault' && (
            <VaultBriefView
              clients={clientPipeline}
              globalSearch={globalSearch}
              onCopyBrief={handleCopyBrief}
              onJumpToKanban={(clientId) => {
                setSelectedClientId(clientId);
                setAdminTab('content_engine');
              }}
              onJumpToFinance={() => setAdminTab('finance')}
            />
          )}

          {adminTab === 'agency_calendar' && (
            <AgencyCalendarView
              clients={clientPipeline}
              contents={contentList}
              agencyEvents={agencyEvents}
              onJumpToContentEngine={(clientId) => {
                setSelectedClientId(clientId);
                setAdminTab('content_engine');
              }}
            />
          )}

          {adminTab === 'feedback_review' && (
            <FeedbackReviewView
              clients={clientPipeline}
              contents={contentList}
              clientReviews={clientReviews}
              globalSearch={globalSearch}
            />
          )}

          {adminTab === 'content_engine' && (
            <ContentEngineView
              selectedClient={selectedClient}
              contents={contentList}
              onOpenAddContent={() => setShowAddContentModal(true)}
              onPreviewContent={(item) => setSelectedPreviewContent(item)}
              onOpenDraftV2={(item) => setSelectedRevisionContent(item)}
              onMoveStage={(id, stage) => moveContentStage(id, stage)}
              onDeleteContent={(id) => deleteContentItem(id)}
            />
          )}

          {adminTab === 'production_mgmt' && (
            <StudioMalangView
              clients={clientPipeline}
              selectedClient={selectedClient}
              videoTasks={videoTasks}
              onOpenAddTask={() => setShowAddStudioTaskModal(true)}
              onUpdateTask={(id, progress, status) => updateStudioTask(id, progress, status)}
              onDeleteTask={(id) => deleteStudioTask(id)}
              onJumpToKanban={(clientId) => {
                setSelectedClientId(clientId);
                setAdminTab('content_engine');
              }}
              onCopyRawLink={(url) => {
                if (navigator.clipboard?.writeText) {
                  navigator.clipboard.writeText(url || 'https://drive.google.com').catch(() => {});
                }
                triggerNotification('Link folder Raw 4K disalin ke clipboard!');
              }}
            />
          )}

          {adminTab === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onMarkAllRead={() =>
                router.post('/admin/notifications/mark-all-read', {}, { preserveScroll: true })
              }
              onClearRead={() =>
                router.delete('/admin/notifications/clear-read', { preserveScroll: true })
              }
              onNotificationAction={handleNotificationAction}
            />
          )}

          {(adminTab === 'profile' || adminTab === 'account_settings') && (
            <AdminProfileAccountView
              initialSubTab={profileSubTab}
              studioTeam={studioTeam}
              onToast={(msg) => triggerNotification(msg)}
            />
          )}
        </main>
      </div>

      {/* Toast Feedback */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-white border border-[#3B9BF8]/30 text-slate-800 text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-6 h-6 rounded-lg bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center shrink-0">
            ✓
          </span>
          <span>{notification}</span>
        </div>
      )}

      {/* Delete Client Confirmation Modal */}
      {clientToDelete && (
        <div className="fixed inset-0 !mt-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">
              Hapus Klien {clientToDelete.business}?
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Tindakan ini akan menghapus data klien beserta seluruh jadwal konten dan task studio yang terkait dari database MySQL.
            </p>
            <div className="pt-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteClient(clientToDelete.id);
                  setClientToDelete(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold cursor-pointer"
              >
                Ya, Hapus Klien
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Modals */}
      {showAddClientModal && (
        <AddClientModal onClose={() => setShowAddClientModal(false)} />
      )}
      {showAddStudioTaskModal && (
        <AddStudioTaskModal onClose={() => setShowAddStudioTaskModal(false)} />
      )}
      {showAddContentModal && (
        <AddContentModal onClose={() => setShowAddContentModal(false)} />
      )}
      {showAddOnModal && (
        <AddOnQuotaModal onClose={() => setShowAddOnModal(false)} />
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
          role="admin"
          onOpenDraftV2={(it) => {
            setSelectedPreviewContent(null);
            setSelectedRevisionContent(it);
          }}
          onClose={() => setSelectedPreviewContent(null)}
        />
      )}
    </div>
  );
}
