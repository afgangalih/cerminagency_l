'use client';

import React, { useState, useMemo } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { AgencyProvider, useAgency } from '@/context/AgencyContext';
import {
  ContentItem,
  ClientPipeline,
  VideoProductionTask,
  AgencyNotificationItem,
  ContentPillarItem,
} from '@/types';
import {
  Calendar,
  BarChart3,
  Compass,
  CheckCircle2,
  Lock,
  ExternalLink,
  ArrowRight,
  Film,
  Clock,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Send,
  Lightbulb,
  Layers,
  Image as ImageIcon,
  Target,
  FolderOpen,
  UserCheck,
  Eye,
  AlertTriangle,
  Clapperboard,
  Copy,
  Receipt,
  ChevronLeft,
} from 'lucide-react';
import { CalendarView } from '@/Components/Client/CalendarView';
import { ReviewModal } from '@/Components/Modals/ReviewModal';
import { ClientRequestModal } from '@/Components/Modals/ClientRequestModal';
import { LockedFeatureModal } from '@/Components/Modals/LockedFeatureModal';
import { DashboardHeader, BreadcrumbItem } from '@/Components/Navigation/DashboardHeader';
import { ClientSidebar, ClientTabKey } from '@/Components/Navigation/ClientSidebar';

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
      <Head title="Portal Klien — Cermin Kreatif" />
      <PortalContent />
    </AgencyProvider>
  );
}

const DEFAULT_PILLARS: ContentPillarItem[] = [
  {
    title: 'Edukasi & Tips Produk',
    ratio: '40%',
    targetCount: 5,
    description:
      'Membahas masalah spesifik audiens dan mengulas manfaat serta cara pemakaian produk secara langsung.',
  },
  {
    title: 'Lifestyle & Kepercayaan',
    ratio: '35%',
    targetCount: 4,
    description:
      'Membangun kedekatan emosional melalui aktivitas keseharian brand, cerita tim, dan standar kualitas.',
  },
  {
    title: 'Promo & Penawaran',
    ratio: '25%',
    targetCount: 3,
    description:
      'Memicu konversi melalui katalog produk unggulan, penawaran terbatas, dan ajakan bertindak yang jelas.',
  },
];

const TAB_META: Record<ClientTabKey, { title: string; subtitle: string }> = {
  overview: {
    title: 'Ringkasan Portal',
    subtitle:
      'Pantau serapan kuota bulanan, target KPI, jadwal tayang terdekat, dan draf konten yang siap ditinjau.',
  },
  tracker: {
    title: 'Progres Konten',
    subtitle:
      'Pantau perjalanan setiap konten dari tahap naskah & desain, review, siap tayang, hingga link postingan live.',
  },
  calendar: {
    title: 'Kalender & Feed',
    subtitle:
      'Jadwal penayangan konten lintas platform serta simulasi pratinjau grid Instagram dan TikTok.',
  },
  production: {
    title: 'Progres Desain & Aset',
    subtitle:
      'Pantau progres pengerjaan desain dan akses seluruh tautan hasil (Drive, Figma, Canva) di satu tempat.',
  },
  strategy: {
    title: 'Pilar & KPI Brand',
    subtitle:
      'Arah tema konten, target KPI yang disepakati, dan form pengajuan ide topik baru untuk tim kreatif.',
  },
  profile: {
    title: 'Profil & Akun Brand',
    subtitle:
      'Informasi akun login, detail paket retainer aktif, dan ringkasan brief brand Anda.',
  },
};

function PortalContent() {
  const page = usePage();
  const authUser = (page.props as any)?.auth?.user;

  const {
    accountType,
    selectedClient,
    activeClientContents,
    videoTasks,
    submitClientRequest,
    notification,
    triggerNotification,
  } = useAgency();

  const [activeTab, setActiveTab] = useState<ClientTabKey>('overview');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mini Calendar State (for Right 3-Col Overview Rail)
  const [miniCalDate, setMiniCalDate] = useState<Date>(() => {
    const firstDate = activeClientContents[0]?.date;
    if (firstDate && /^\d{4}-\d{2}/.test(firstDate)) {
      const [y, m] = firstDate.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedMiniDay, setSelectedMiniDay] = useState<number>(
    activeClientContents[0]?.dayNumber || new Date().getDate()
  );

  // Strategy interactive console state
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [proposedTopic, setProposedTopic] = useState('');
  const [trackerStageFilter, setTrackerStageFilter] = useState<'all' | 'producing' | 'review' | 'revision' | 'scheduled' | 'published'>('all');

  const handleTabClick = (tab: ClientTabKey) => {
    if (accountType === 'demo' && (tab === 'calendar' || tab === 'production' || tab === 'tracker')) {
      setShowLockedModal(true);
      return;
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const pendingReviews = useMemo(
    () => activeClientContents.filter((c) => c.status === 'Menunggu Review'),
    [activeClientContents]
  );
  const approvedContents = useMemo(
    () => activeClientContents.filter((c) => c.status === 'Disetujui'),
    [activeClientContents]
  );
  const clientStudioTasks = useMemo(
    () => videoTasks.filter((t) => t.clientId === selectedClient.id),
    [videoTasks, selectedClient.id]
  );

  // Quota Fulfillment
  const totalRetainerQuota =
    (selectedClient.reelsMax || 10) + (selectedClient.postsMax || 2);
  const approvedCount = approvedContents.length;
  const pendingCount = pendingReviews.length;
  const revisionCount = activeClientContents.filter(
    (c) => c.stage === 'revision'
  ).length;
  const inProductionCount = Math.max(
    0,
    totalRetainerQuota - approvedCount - pendingCount - revisionCount
  );
  const percentageFulfillment = Math.min(
    100,
    Math.round((approvedCount / Math.max(1, totalRetainerQuota)) * 100)
  );

  // Next Drop Spotlight
  const nextDropContent =
    activeClientContents
      .filter(
        (c) => c.status === 'Disetujui' || c.status === 'Menunggu Review'
      )
      .sort((a, b) => a.dayNumber - b.dayNumber)[0] || activeClientContents[0];

  // Format Mix Ratios
  const reelsCount = activeClientContents.filter(
    (c) =>
      c.type.toLowerCase().includes('reel') ||
      c.type.toLowerCase().includes('video')
  ).length;
  const carouselCount = activeClientContents.filter(
    (c) =>
      c.type.toLowerCase().includes('carousel') ||
      c.type.toLowerCase().includes('korsel')
  ).length;
  const imageCount = Math.max(
    0,
    activeClientContents.length - reelsCount - carouselCount
  );

  // Real Content Pillars & KPIs from MySQL (with fallback only when not customized yet)
  const hasCustomPillars =
    Boolean(selectedClient.contentPillars) &&
    (selectedClient.contentPillars?.length || 0) > 0;
  const activePillars: ContentPillarItem[] = hasCustomPillars
    ? selectedClient.contentPillars!
    : DEFAULT_PILLARS;
  const activeKpis = selectedClient.kpiTargets || [];

  const safePillarIndex = Math.min(
    activePillarIndex,
    Math.max(0, activePillars.length - 1)
  );
  const currentPillar = activePillars[safePillarIndex] || activePillars[0];

  const getPillarContents = (pillarTitle: string, idx: number) => {
    const exactMatched = activeClientContents.filter(
      (c) => c.pillar && c.pillar.toLowerCase() === pillarTitle.trim().toLowerCase()
    );
    if (exactMatched.length > 0) return exactMatched;
    // Fallback grouping for legacy untagged contents if no content has a pillar yet
    const anyTagged = activeClientContents.some((c) => Boolean(c.pillar));
    if (anyTagged) return [];
    return activeClientContents.filter(
      (_, cIdx) => cIdx % Math.max(1, activePillars.length) === idx
    );
  };

  const pillarFilteredContents = currentPillar
    ? getPillarContents(currentPillar.title, safePillarIndex)
    : [];

  // Derived Notifications for Client Header Popover
  const clientNotifications: AgencyNotificationItem[] = useMemo(() => {
    const items: AgencyNotificationItem[] = [];
    pendingReviews.forEach((c) => {
      items.push({
        id: `rev-${c.id}`,
        title: `Draf Siap Direview: ${c.title}`,
        description: `Jadwal ${c.day} (${c.type}). Klik untuk meninjau & menyetujui konten.`,
        category: 'Review',
        time: c.day,
        group: 'Menunggu Tindakan',
        unread: true,
        actionLabel: 'Review Sekarang',
        actionType: 'review_content',
      });
    });
    clientStudioTasks
      .filter((t) => t.status === 'Selesai')
      .forEach((t) => {
        items.push({
          id: `task-${t.id}`,
          title: `Hasil Desain Siap: ${t.title}`,
          description: `PIC ${t.shooter} telah melampirkan tautan hasil akhir.`,
          category: 'Desain & Aset',
          time: 'Selesai',
          group: 'Pembaruan',
          unread: false,
          actionLabel: 'Lihat Tautan',
          actionType: 'production',
        });
      });
    return items;
  }, [pendingReviews, clientStudioTasks]);

  const handleHeaderNotifAction = (notif: AgencyNotificationItem) => {
    if (notif.id.startsWith('rev-')) {
      const cid = Number(notif.id.replace('rev-', ''));
      const found = activeClientContents.find((c) => c.id === cid);
      if (found) {
        setSelectedContent(found);
        return;
      }
    }
    if (notif.actionType === 'production') {
      handleTabClick('production');
      return;
    }
    setActiveTab('overview');
  };

  // Persist Topic Proposal directly to MySQL via submitClientRequest
  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedTopic.trim()) return;
    if (accountType === 'demo') {
      setShowLockedModal(true);
      return;
    }

    const todayIso = new Date().toISOString().split('T')[0];
    submitClientRequest({
      title: proposedTopic.trim(),
      type: 'Reels / Video Pendek',
      pillar: currentPillar?.title || '',
      platforms: ['instagram', 'tiktok'],
      date: todayIso,
      notes: `Usulan topik dari Portal Klien untuk pilar "${currentPillar?.title || 'Umum'}".`,
    });
    setProposedTopic('');
  };

  const breadcrumbs: BreadcrumbItem[] = useMemo(() => {
    return [
      { label: selectedClient.business || 'Portal Klien', nav: null },
      { label: TAB_META[activeTab].title, nav: null },
    ];
  }, [selectedClient.business, activeTab]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1E293B] font-sans antialiased flex">
      {/* Structured Airy-Blue Client Sidebar */}
      <ClientSidebar
        activeTab={activeTab}
        onTabClick={handleTabClick}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        accountType={accountType}
        selectedClient={selectedClient}
        pendingReviewCount={pendingReviews.length}
        studioTaskCount={clientStudioTasks.length}
        onOpenRequestModal={() => {
          if (accountType === 'demo') {
            setShowLockedModal(true);
            return;
          }
          setShowRequestModal(true);
        }}
        onOpenSupport={() => {
          const text = encodeURIComponent(
            `Halo Tim Cermin Kreatif! Saya ${selectedClient.name} dari ${selectedClient.business}. Butuh bantuan terkait Portal Klien.`
          );
          window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
          triggerNotification('Membuka obrolan dukungan WhatsApp Cermin Kreatif.');
        }}
      />

      {/* Main Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FCFDFF]">
        <DashboardHeader
          role="client"
          activeTabTitle={TAB_META[activeTab].title}
          breadcrumbItems={breadcrumbs}
          notifications={clientNotifications}
          onNotificationAction={handleHeaderNotifAction}
          selectedClient={selectedClient}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          onNavigateTab={() => setActiveTab('profile')}
        />

        <main className="flex-1 px-5 lg:px-7 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Consistent Module Title Block Below Navbar (Matching Admin) */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h1 className="text-[22px] sm:text-[24px] font-bold text-[#1E293B] tracking-tight leading-snug">
                  {TAB_META[activeTab].title}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  {TAB_META[activeTab].subtitle}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-100 px-3 py-1.5 rounded-xl shadow-sm">
                  Paket: <strong className="text-[#3B9BF8]">{selectedClient.package}</strong>
                </span>
                <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-100 px-3 py-1.5 rounded-xl shadow-sm">
                  Faktur: <strong className="text-slate-800">{selectedClient.invoiceNumber}</strong>
                </span>
              </div>
            </div>

            {/* ========================================================
                TAB 1: OVERVIEW (9-COL LEFT + 3-COL RIGHT RAIL MATCHING REF)
            ======================================================== */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
                {/* LEFT 9 COLUMNS: BANNERS, QUOTA, NEXT DROP, REVIEW QUEUE, KPI */}
                <div className="xl:col-span-9 space-y-5">
                  {/* Gated Onboarding Banner (Demo Mode) */}
                  {accountType === 'demo' && (
                    <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-amber-950">
                            Status Onboarding: Menunggu Verifikasi DP 50% ({selectedClient.dpAmount})
                          </h3>
                          <p className="text-xs text-amber-800/90 mt-0.5 leading-relaxed">
                            Brief Anda sudah kami terima. Fitur Kalender &amp; Feed serta Progres Desain &amp; Aset terbuka otomatis setelah DP diverifikasi Admin.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <a
                          href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                            `Halo Tim Cermin Kreatif! 👋\nSaya *${selectedClient.name}* dari brand *${selectedClient.business}* (${selectedClient.instagram}).\n\n📄 No. Faktur: ${selectedClient.invoiceNumber}\n💳 DP 50%: ${selectedClient.dpAmount}\n\nSaya ingin mengonfirmasi pembayaran DP agar portal kerja & kalender segera dibuka. Terima kasih!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Konfirmasi DP via WA</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setShowLockedModal(true)}
                          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition cursor-pointer shadow-sm"
                        >
                          Lihat Cara Aktivasi
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 1. Action Center Banner */}
                  {pendingReviews.length > 0 && (
                    <div className="bg-gradient-to-r from-[#3B9BF8] to-[#2589F5] rounded-2xl p-4 sm:p-5 text-white shadow-[0_10px_24px_rgba(59,155,248,0.28)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white">
                            Tindakan Diperlukan
                          </span>
                          <h3 className="text-sm font-bold text-white mt-1">
                            Ada {pendingReviews.length} Draf Konten Menunggu Persetujuan Anda
                          </h3>
                          <p className="text-xs text-white/85 mt-0.5">
                            Tinjau dan setujui draf agar tim kami bisa langsung menjadwalkan publikasi tepat waktu.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedContent(pendingReviews[0])}
                        className="bg-white hover:bg-slate-50 text-[#2563EB] text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center transition-colors cursor-pointer"
                      >
                        <span>Tinjau Sekarang</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* 2. SERAPAN KUOTA BULANAN + BREAKDOWN 4 STATUS */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="text-[14.5px] font-bold text-slate-800">
                          Serapan Kuota Bulanan &amp; Status Produksi
                        </h2>
                        <p className="text-[11px] text-slate-400">
                          {selectedClient.package} • Realisasi paket bulan berjalan
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#3B9BF8] bg-[#EFF7FF] px-3 py-1 rounded-xl self-start sm:self-auto tabular-nums">
                        {selectedClient.reelsUsed + selectedClient.postsUsed} / {totalRetainerQuota} Slot Terpakai
                      </span>
                    </div>

                    {/* Stacked Progress Bar */}
                    <div className="space-y-2">
                      <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100">
                        <div
                          className="bg-[#3B9BF8] h-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round(((selectedClient.reelsUsed || 0) / Math.max(1, totalRetainerQuota)) * 100)
                            )}%`,
                          }}
                        />
                        <div
                          className="bg-[#93C5FD] h-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round(((selectedClient.postsUsed || 0) / Math.max(1, totalRetainerQuota)) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#3B9BF8]" />
                          Reels 9:16{' '}
                          <strong className="text-slate-800">
                            {selectedClient.reelsUsed}/{selectedClient.reelsMax}
                          </strong>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#93C5FD]" />
                          Carousel / Feed{' '}
                          <strong className="text-slate-800">
                            {selectedClient.postsUsed}/{selectedClient.postsMax}
                          </strong>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-sm bg-slate-200" />
                          Sisa Kuota{' '}
                          <strong className="text-slate-800">
                            {Math.max(0, totalRetainerQuota - (selectedClient.reelsUsed + selectedClient.postsUsed))} Slot
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* 4 Kartu Metrik Status */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                      {[
                        {
                          label: 'Siap Tayang',
                          value: approvedCount,
                          sub: 'Disetujui & terjadwal',
                          icon: CheckCircle2,
                          color: 'text-emerald-600 bg-emerald-50',
                        },
                        {
                          label: 'Perlu Review',
                          value: pendingCount,
                          sub: 'Menunggu approval',
                          icon: Clock,
                          color: 'text-amber-600 bg-amber-50',
                        },
                        {
                          label: 'Dalam Revisi',
                          value: revisionCount,
                          sub: 'Dikerjakan ke V2',
                          icon: AlertTriangle,
                          color: 'text-rose-600 bg-rose-50',
                        },
                        {
                          label: 'Dalam Produksi',
                          value: inProductionCount,
                          sub: 'Desain & editing',
                          icon: Clapperboard,
                          color: 'text-[#3B9BF8] bg-[#EFF7FF]',
                        },
                      ].map((stat) => {
                        const Icon = stat.icon;
                        return (
                          <div
                            key={stat.label}
                            className="bg-[#F8FAFC] rounded-xl p-3.5 border border-slate-100 flex items-center justify-between gap-2"
                          >
                            <div>
                              <p className="text-[11px] font-medium text-slate-500">
                                {stat.label}
                              </p>
                              <p className="text-[20px] font-bold text-slate-900 leading-tight mt-0.5 tabular-nums">
                                {stat.value}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {stat.sub}
                              </p>
                            </div>
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}
                            >
                              <Icon className="w-[18px] h-[18px]" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. NEXT DROP SPOTLIGHT + ANTREAN DRAF MENUNGGU PERSETUJUAN */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    {/* Next Drop Spotlight */}
                    <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#3B9BF8] bg-[#EFF7FF] px-2.5 py-1 rounded-lg">
                            Next Drop Spotlight
                          </span>
                          {nextDropContent && (
                            <span
                              className={`text-[10.5px] font-semibold ${
                                nextDropContent.status === 'Disetujui'
                                  ? 'text-emerald-600'
                                  : 'text-amber-600'
                              }`}
                            >
                              {nextDropContent.status === 'Disetujui'
                                ? 'Siap Tayang'
                                : 'Menunggu Review'}
                            </span>
                          )}
                        </div>

                        {nextDropContent ? (
                          <>
                            <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100">
                              <img
                                src={nextDropContent.mediaUrl}
                                alt={nextDropContent.title}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#3B9BF8] text-[10px] font-bold px-2 py-0.5 rounded-md">
                                {nextDropContent.platforms.join(' & ')} • {nextDropContent.type}
                              </span>
                              <span className="absolute bottom-2.5 right-2.5 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                                {nextDropContent.day} ({nextDropContent.weekday})
                              </span>
                            </div>

                            <div>
                              <h3 className="text-[14px] font-bold text-slate-900 leading-snug">
                                {nextDropContent.title}
                              </h3>
                              <p className="text-[11.5px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                {nextDropContent.caption}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="py-12 text-center text-xs text-slate-400 bg-[#F8FAFC] rounded-xl">
                            Belum ada jadwal tayang aktif.
                          </div>
                        )}
                      </div>

                      {nextDropContent && (
                        <button
                          type="button"
                          onClick={() => setSelectedContent(nextDropContent)}
                          className="mt-4 w-full bg-[#EFF7FF] hover:bg-[#3B9BF8] text-[#3B9BF8] hover:text-white text-xs font-semibold py-2.5 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Pratinjau Jadwal Tayang
                        </button>
                      )}
                    </div>

                    {/* Antrean Draf Menunggu Persetujuan */}
                    <div className="lg:col-span-7 bg-[#EFF7FF]/60 rounded-2xl border border-[#E5F1FF] p-4 flex flex-col justify-between space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-[14px] font-bold text-slate-800">
                            Antrean Draf Menunggu Persetujuan
                          </h2>
                          <p className="text-[11px] text-slate-400">
                            Klik draf untuk menyetujui atau menulis catatan revisi
                          </p>
                        </div>
                        <span className="text-[11px] font-bold bg-white text-amber-600 px-2.5 py-1 rounded-lg border border-amber-100 tabular-nums">
                          {pendingReviews.length} Draf
                        </span>
                      </div>

                      {pendingReviews.length === 0 ? (
                        <div className="bg-white rounded-xl p-6 text-center space-y-2 border border-slate-100 my-auto">
                          <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto" />
                          <p className="text-xs font-bold text-slate-800">
                            Semua Draf Sudah Ditinjau!
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Tidak ada antrean persetujuan saat ini. Pantau jadwal tayang di Kalender &amp; Feed.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5 flex-1">
                          {pendingReviews.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3"
                            >
                              <img
                                src={item.mediaUrl}
                                alt={item.title}
                                className="w-full sm:w-20 h-24 sm:h-16 rounded-lg object-cover shrink-0 bg-slate-100"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[9.5px] font-bold bg-[#EFF7FF] text-[#3B9BF8] px-1.5 py-0.5 rounded">
                                    {item.type}
                                  </span>
                                  <span className="text-[9.5px] font-semibold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
                                    {item.version}
                                  </span>
                                </div>
                                <h3 className="text-xs font-bold text-slate-900 mt-1 truncate">
                                  {item.title}
                                </h3>
                                <p className="text-[10.5px] text-slate-400 mt-0.5">
                                  Target Tayang: {item.day} ({item.weekday})
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setSelectedContent(item)}
                                className="bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-[11px] font-semibold px-3.5 py-2 rounded-xl shrink-0 transition-colors cursor-pointer"
                              >
                                Tinjau &amp; Approve
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4. REAL CLIENT KPI TARGETS (FROM MYSQL) */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center">
                          <Target className="w-4 h-4" />
                        </div>
                        <div>
                          <h2 className="text-sm font-bold text-slate-900">
                            Target KPI Brand ({selectedClient.business})
                          </h2>
                          <p className="text-[11px] text-slate-400">
                            Indikator performa akun &amp; capaian periode berjalan yang disepakati bersama agensi.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleTabClick('strategy')}
                        className="text-xs font-semibold text-[#3B9BF8] hover:underline cursor-pointer"
                      >
                        Lihat Pilar Konten →
                      </button>
                    </div>

                    {activeKpis.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeKpis.map((kpi, idx) => {
                          const curNum = parseFloat(kpi.current.replace(/[^\d.-]/g, '')) || 0;
                          const tgtNum = parseFloat(kpi.target.replace(/[^\d.-]/g, '')) || 0;
                          const pct =
                            tgtNum > 0 ? Math.min(100, Math.round((curNum / tgtNum) * 100)) : 0;

                          return (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 space-y-2.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-slate-800 truncate">
                                  {kpi.label}
                                </span>
                                <span className="text-[10.5px] font-bold text-[#3B9BF8] bg-[#EFF7FF] px-2 py-0.5 rounded-md tabular-nums">
                                  {pct}%
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-lg font-bold text-slate-900 tabular-nums">
                                  {kpi.current}
                                </span>
                                <span className="text-xs text-slate-400">
                                  / {kpi.target} {kpi.unit}
                                </span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-slate-200/70 overflow-hidden">
                                <div
                                  className="h-full bg-[#3B9BF8] rounded-full transition-all"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-5 text-center text-xs text-slate-400 bg-[#F8FAFC] rounded-xl">
                        Target KPI periode ini belum ditambahkan oleh Admin Agensi.
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT 3 COLUMNS: MINI KALENDER + HASIL DESAIN & ASET + TIM DEDIKASI ANDA */}
                <div className="xl:col-span-3 space-y-5">
                  {/* Mini Calendar Jadwal Tayang */}
                  {(() => {
                    const monthNames = [
                      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
                    ];
                    const y = miniCalDate.getFullYear();
                    const m = miniCalDate.getMonth();
                    const mKey = `${y}-${String(m + 1).padStart(2, '0')}`;
                    const dInM = new Date(y, m + 1, 0).getDate();
                    const prevM = new Date(y, m, 0).getDate();
                    const startW = new Date(y, m, 1).getDay();
                    const miniCells: { day: number; month: 'prev' | 'curr' | 'next' }[] = [];
                    for (let i = startW - 1; i >= 0; i--) {
                      miniCells.push({ day: prevM - i, month: 'prev' });
                    }
                    for (let d = 1; d <= dInM; d++) {
                      miniCells.push({ day: d, month: 'curr' });
                    }
                    let nx = 1;
                    while (miniCells.length < 35) {
                      miniCells.push({ day: nx++, month: 'next' });
                    }

                    const dayItems = activeClientContents.filter(
                      (c) =>
                        c.dayNumber === selectedMiniDay &&
                        (!c.date || c.date.slice(0, 7) === mKey)
                    );

                    return (
                      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-[13.5px] font-bold text-slate-800">
                              {monthNames[m]} {y}
                            </h3>
                            <div className="flex items-center gap-0.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setMiniCalDate(new Date(y, m - 1, 1));
                                  setSelectedMiniDay(1);
                                }}
                                className="w-5 h-5 rounded-md bg-[#F4F6F9] hover:bg-[#EFF7FF] text-slate-500 hover:text-[#3B9BF8] flex items-center justify-center cursor-pointer"
                                aria-label="Bulan sebelumnya"
                              >
                                <ChevronLeft className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setMiniCalDate(new Date(y, m + 1, 1));
                                  setSelectedMiniDay(1);
                                }}
                                className="w-5 h-5 rounded-md bg-[#F4F6F9] hover:bg-[#EFF7FF] text-slate-500 hover:text-[#3B9BF8] flex items-center justify-center cursor-pointer"
                                aria-label="Bulan berikutnya"
                              >
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleTabClick('calendar')}
                            className="text-[11px] font-semibold text-[#3B9BF8] hover:underline cursor-pointer shrink-0"
                          >
                            Buka Feed →
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-400">
                          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
                            <div key={d}>{d}</div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-y-1 text-center text-[11px]">
                          {miniCells.slice(0, 35).map((cell, i) => {
                            const isCurr = cell.month === 'curr';
                            const hasContent =
                              isCurr &&
                              activeClientContents.some(
                                (c) =>
                                  c.dayNumber === cell.day &&
                                  (!c.date || c.date.slice(0, 7) === mKey)
                              );
                            const isSel = isCurr && cell.day === selectedMiniDay;
                            return (
                              <button
                                key={i}
                                type="button"
                                disabled={!isCurr}
                                onClick={() => isCurr && setSelectedMiniDay(cell.day)}
                                className={`h-7 rounded-lg flex flex-col items-center justify-center relative tabular-nums transition-colors ${
                                  !isCurr
                                    ? 'text-slate-300'
                                    : isSel
                                    ? 'bg-[#3B9BF8] text-white font-bold cursor-pointer'
                                    : hasContent
                                    ? 'bg-[#EFF7FF] text-[#2563EB] font-semibold cursor-pointer'
                                    : 'text-slate-700 hover:bg-slate-50 cursor-pointer'
                                }`}
                              >
                                {cell.day}
                                {hasContent && !isSel && (
                                  <span className="w-1 h-1 rounded-full bg-[#3B9BF8] absolute bottom-0.5" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Dynamic Agenda Preview for Selected Day */}
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-700">
                              Jadwal Tgl {selectedMiniDay} {monthNames[m].slice(0, 3)}
                            </span>
                            <span className="text-[10px] font-semibold text-[#3B9BF8] bg-[#EFF7FF] px-2 py-0.5 rounded-md tabular-nums">
                              {dayItems.length} konten
                            </span>
                          </div>

                          {dayItems.length === 0 ? (
                            <p className="text-[11px] text-slate-400 py-2 text-center bg-[#F8FAFC] rounded-xl">
                              Tidak ada jadwal tayang di tanggal ini.
                            </p>
                          ) : (
                            <div className="space-y-1.5 max-h-44 overflow-y-auto">
                              {dayItems.map((item) => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => setSelectedContent(item)}
                                  className="w-full text-left p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF7FF] border border-slate-100 hover:border-[#3B9BF8]/40 transition space-y-1 cursor-pointer"
                                >
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span
                                      className={`text-[9.5px] font-semibold px-1.5 py-0.5 rounded-md ${
                                        item.status === 'Disetujui'
                                          ? 'bg-emerald-50 text-emerald-700'
                                          : item.status === 'Perlu Revisi'
                                          ? 'bg-rose-50 text-rose-700'
                                          : 'bg-amber-50 text-amber-700'
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                    <span className="text-[9.5px] text-[#3B9BF8] font-semibold">
                                      Review →
                                    </span>
                                  </div>
                                  <p className="text-[11.5px] font-bold text-slate-800 line-clamp-1">
                                    {item.title}
                                  </p>
                                  <p className="text-[10px] text-slate-400 truncate">
                                    {item.type} • {item.platforms.join(', ')}
                                  </p>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Kartu Link Hasil Desain & Aset */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center shrink-0">
                        <FolderOpen className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[13px] font-bold text-slate-900 truncate">
                          Link Hasil Desain &amp; Aset
                        </h3>
                        <p className="text-[10.5px] text-slate-400 truncate">
                          Drive, Figma &amp; Canva ({clientStudioTasks.length} Task)
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Akses seluruh file desain feed, template Canva, dan aset konten final yang dikirim tim kreatif.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (accountType === 'demo') {
                          setShowLockedModal(true);
                        } else {
                          handleTabClick('production');
                        }
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        accountType === 'official'
                          ? 'bg-[#EFF7FF] hover:bg-[#3B9BF8] text-[#3B9BF8] hover:text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {accountType === 'official' ? (
                        <>
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Buka Daftar Link Aset</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Terkunci (Mode Demo)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Kartu Tim Dedikasi Anda (Exact Reference Layout) */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
                    <h3 className="text-[13px] font-bold text-slate-900">
                      Tim Dedikasi Anda
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] font-bold text-sm flex items-center justify-center shrink-0">
                        {(selectedClient.picAssigned || 'CK').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {selectedClient.picAssigned || 'Tim Creative Cermin'}
                        </p>
                        <p className="text-[10.5px] text-slate-400 truncate">
                          Dedicated Creative Lead
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Online • Siap Koordinasi
                        </span>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                        `Halo ${selectedClient.picAssigned || 'Tim Cermin Kreatif'}, saya ${selectedClient.name} dari ${selectedClient.business}. Ada yang ingin saya diskusikan terkait konten bulan ini.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold py-2 rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Hubungi via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 2: PROGRES KONTEN (READ-ONLY PIPELINE TRACKER)
            ======================================================== */}
            {activeTab === 'tracker' && (() => {
              const filteredTracker = activeClientContents.filter((c) => {
                if (trackerStageFilter === 'all') return true;
                if (trackerStageFilter === 'producing') return c.stage === 'script' || c.stage === 'production';
                return c.stage === trackerStageFilter;
              });

              const steps = [
                { key: 'producing', label: 'Naskah & Desain' },
                { key: 'review', label: 'Review Anda' },
                { key: 'scheduled', label: 'Siap Tayang' },
                { key: 'published', label: 'Sudah Tayang' },
              ];

              const getStepIndex = (stage: ContentItem['stage']) => {
                if (stage === 'script' || stage === 'production' || stage === 'revision') return 0;
                if (stage === 'review') return 1;
                if (stage === 'scheduled') return 2;
                return 3;
              };

              return (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-100 p-3.5 rounded-2xl shadow-sm">
                    {[
                      { id: 'all', label: `Semua (${activeClientContents.length})` },
                      {
                        id: 'producing',
                        label: `Dikerjakan (${activeClientContents.filter((c) => c.stage === 'script' || c.stage === 'production').length})`,
                      },
                      {
                        id: 'review',
                        label: `Butuh Review (${activeClientContents.filter((c) => c.stage === 'review').length})`,
                      },
                      {
                        id: 'revision',
                        label: `Revisi (${activeClientContents.filter((c) => c.stage === 'revision').length})`,
                      },
                      {
                        id: 'scheduled',
                        label: `Siap Tayang (${activeClientContents.filter((c) => c.stage === 'scheduled').length})`,
                      },
                      {
                        id: 'published',
                        label: `Sudah Tayang (${activeClientContents.filter((c) => c.stage === 'published').length})`,
                      },
                    ].map((pill) => (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => setTrackerStageFilter(pill.id as any)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                          trackerStageFilter === pill.id
                            ? 'bg-[#3B9BF8] text-white shadow-sm'
                            : 'bg-[#F4F6F9] text-slate-600 hover:bg-[#EFF7FF] hover:text-[#3B9BF8]'
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  {filteredTracker.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center text-xs text-slate-400 shadow-sm">
                      Belum ada konten pada tahap ini.
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {filteredTracker.map((item) => {
                        const currentIdx = getStepIndex(item.stage);
                        return (
                          <div
                            key={item.id}
                            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                          >
                            <div className="flex items-start gap-3.5 min-w-0 flex-1">
                              <img
                                src={item.mediaUrl}
                                alt={item.title}
                                className="w-14 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                              />
                              <div className="min-w-0 flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-[#EFF7FF] text-[#3B9BF8]">
                                    {item.type}
                                  </span>
                                  {item.pillar && (
                                    <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                      {item.pillar}
                                    </span>
                                  )}
                                  <span className="text-[11px] text-slate-400">
                                    Target: {item.day} ({item.weekday})
                                  </span>
                                </div>

                                <h3 className="text-sm font-bold text-slate-900 truncate">
                                  {item.title}
                                </h3>

                                {/* 4-Step Visual Progress Tracker */}
                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                  {steps.map((st, idx) => {
                                    const done = idx <= currentIdx;
                                    const isRevision = idx === 0 && item.stage === 'revision';
                                    return (
                                      <React.Fragment key={st.key}>
                                        <span
                                          className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-lg ${
                                            isRevision
                                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                                              : st.key === 'published' && done
                                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                              : done
                                              ? 'bg-[#EFF7FF] text-[#3B9BF8]'
                                              : 'bg-slate-50 text-slate-400'
                                          }`}
                                        >
                                          {isRevision ? 'Perlu Revisi' : st.label}
                                        </span>
                                        {idx < steps.length - 1 && (
                                          <span className="text-slate-300 text-xs">→</span>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 shrink-0">
                              {item.driveRawUrl && (
                                <a
                                  href={item.driveRawUrl.startsWith('http') ? item.driveRawUrl : `https://${item.driveRawUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-2 rounded-xl bg-[#F4F6F9] hover:bg-[#EFF7FF] text-slate-700 hover:text-[#3B9BF8] text-xs font-semibold inline-flex items-center gap-1.5 transition"
                                >
                                  <span>Draf Desain</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {item.stage === 'published' && item.publishedUrl && (
                                <a
                                  href={item.publishedUrl.startsWith('http') ? item.publishedUrl : `https://${item.publishedUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition shadow-sm"
                                >
                                  <span>Postingan Live</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => setSelectedContent(item)}
                                className="px-4 py-2 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold transition cursor-pointer shadow-sm"
                              >
                                {item.stage === 'review' ? 'Tinjau & Approve' : 'Detail Konten'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ========================================================
                TAB 3: CALENDAR & FEED SIMULATOR
            ======================================================== */}
            {activeTab === 'calendar' && (
              <CalendarView onSelectItem={(item) => setSelectedContent(item)} />
            )}

            {/* ========================================================
                TAB 3: PROGRES DESAIN & ASET (MULTI-LINK DELIVERABLES)
            ======================================================== */}
            {activeTab === 'production' && (
              <div className="space-y-5">
                {clientStudioTasks.length === 0 ? (
                  <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center shadow-sm space-y-2">
                    <FolderOpen className="w-8 h-8 text-[#3B9BF8] mx-auto" />
                    <p className="text-sm font-bold text-slate-800">
                      Belum ada task desain &amp; aset saat ini
                    </p>
                    <p className="text-xs text-slate-400">
                      Tautan hasil desain (Drive, Figma, Canva) akan muncul otomatis di sini setelah ditambahkan tim agensi.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
                    {clientStudioTasks.map((task) => {
                      const links =
                        task.assetLinks && task.assetLinks.length > 0
                          ? task.assetLinks
                          : task.rawFolder
                          ? [{ label: 'Link Hasil', url: task.rawFolder }]
                          : [];

                      return (
                        <div
                          key={task.id}
                          className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                        >
                          <div className="space-y-2 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">
                                {task.title}
                              </span>
                              <span className="text-[10.5px] px-2.5 py-0.5 rounded-lg bg-[#EFF7FF] text-[#3B9BF8] font-semibold">
                                {task.phase}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-48 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    task.progress === 100
                                      ? 'bg-emerald-500'
                                      : 'bg-[#3B9BF8]'
                                  }`}
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-600 font-semibold tabular-nums">
                                {task.progress}% Selesai
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-xs text-slate-500">
                              PIC:{' '}
                              <strong className="text-slate-800">
                                {task.shooter}
                              </strong>
                            </span>
                            <span
                              className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold border ${
                                task.status === 'Selesai'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : task.status === 'Sedang Berjalan'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {task.status}
                            </span>

                            {links.map((link, idx) => (
                              <a
                                key={`${task.id}-client-link-${idx}`}
                                href={
                                  link.url.startsWith('http')
                                    ? link.url
                                    : `https://${link.url}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-xl bg-[#EFF7FF] hover:bg-[#3B9BF8] text-[#3B9BF8] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                              >
                                <span>Buka {link.label || 'Link Hasil'}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================
                TAB 4: PILAR & KPI BRAND (TERHUBUNG NYATA KE MYSQL)
            ======================================================== */}
            {activeTab === 'strategy' && (
              <div className="space-y-6">
                {!hasCustomPillars && (
                  <div className="bg-[#EFF7FF] border border-[#DCEEFF] rounded-2xl px-4 py-3 text-xs text-slate-600 flex items-center justify-between gap-2">
                    <span>
                      Menampilkan <strong>Template Pilar Default</strong>. Daftar pilar &amp; KPI khusus brand Anda akan muncul otomatis setelah diatur oleh Admin di modul Klien &amp; Kuota.
                    </span>
                  </div>
                )}

                {/* PILLAR CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activePillars.map((pillar, idx) => {
                    const isSelected = safePillarIndex === idx;
                    const countInPillar = getPillarContents(pillar.title, idx).length;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActivePillarIndex(idx)}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#3B9BF8] text-white border-[#3B9BF8] shadow-[0_10px_24px_rgba(59,155,248,0.28)]'
                            : 'bg-white text-slate-900 border-slate-100 hover:border-[#3B9BF8]/40 shadow-sm'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-[#EFF7FF] text-[#3B9BF8]'
                              }`}
                            >
                              Pilar {idx + 1} ({pillar.ratio})
                            </span>
                            <span
                              className={`text-[11px] font-semibold tabular-nums ${
                                isSelected ? 'text-white/90' : 'text-slate-500'
                              }`}
                            >
                              {countInPillar}/{pillar.targetCount} Konten
                            </span>
                          </div>

                          <h3 className="text-[15px] font-bold leading-snug">
                            {pillar.title}
                          </h3>
                          <p
                            className={`text-xs mt-2 leading-relaxed ${
                              isSelected ? 'text-white/85' : 'text-slate-500'
                            }`}
                          >
                            {pillar.description}
                          </p>
                        </div>

                        <div
                          className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                            isSelected
                              ? 'border-white/20 text-white'
                              : 'border-slate-100 text-[#3B9BF8]'
                          }`}
                        >
                          <span>
                            {isSelected ? '● Pilar Sedang Aktif' : 'Filter konten pilar ini'}
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* FILTERED CONTENTS UNDER SELECTED PILLAR */}
                {currentPillar && (
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10.5px] uppercase text-[#3B9BF8] font-bold tracking-wider">
                          KONTEN DI PILAR &ldquo;{currentPillar.title}&rdquo;
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">
                          Realisasi Produksi ({pillarFilteredContents.length} Konten)
                        </h3>
                      </div>
                      <span className="text-xs text-[#3B9BF8] bg-[#EFF7FF] px-3 py-1 rounded-lg font-semibold">
                        Target {currentPillar.targetCount} Konten / Bulan
                      </span>
                    </div>

                    {pillarFilteredContents.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {pillarFilteredContents.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedContent(item)}
                            className="p-3.5 rounded-xl border border-slate-100 bg-[#F8FAFC] hover:bg-white hover:border-[#3B9BF8]/40 transition flex items-center gap-3 cursor-pointer group"
                          >
                            <div className="w-12 h-14 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                              <img
                                src={item.mediaUrl}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10.5px] text-slate-500 font-medium block">
                                {item.day} ({item.weekday})
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                                {item.title}
                              </h4>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-md mt-1 inline-block font-semibold ${
                                  item.status === 'Disetujui'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-amber-50 text-amber-700'
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-400 bg-[#F8FAFC] rounded-xl">
                        Belum ada konten yang ditandai ke pilar ini bulan ini.
                      </div>
                    )}
                  </div>
                )}

                {/* TOPIC PROPOSAL FORM (PERSISTS TO MYSQL) */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3.5">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Usulkan Ide Topik untuk Pilar &ldquo;{currentPillar?.title}&rdquo;
                      </h3>
                      <p className="text-xs text-slate-500">
                        Ide Anda langsung masuk ke daftar pengajuan konten tim kreatif Cermin.
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleTopicSubmit}
                    className="flex flex-col sm:flex-row gap-2.5"
                  >
                    <input
                      type="text"
                      required
                      value={proposedTopic}
                      onChange={(e) => setProposedTopic(e.target.value)}
                      placeholder={`Misal: Ide konten promo / edukasi untuk pilar ${currentPillar?.title}...`}
                      className="flex-1 bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#3B9BF8] focus:ring-2 focus:ring-[#3B9BF8]/25 focus:bg-white transition"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#3B9BF8] hover:bg-[#2589F5] text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Usulan Topik</span>
                    </button>
                  </form>
                </div>

                {/* BRIEF & TARGET AUDIENS BRAND */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 space-y-1.5">
                    <span className="text-[10.5px] font-bold uppercase text-[#3B9BF8] block">
                      Brief &amp; Tujuan Brand
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedClient.briefNotes || 'Belum ada catatan brief khusus.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 space-y-1.5">
                    <span className="text-[10.5px] font-bold uppercase text-[#3B9BF8] block">
                      Target Audiens Utama
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedClient.targetAudience ||
                        'Audiens sesuai segmen paket retainer aktif.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 5: PROFIL & AKUN KLIEN
            ======================================================== */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#3B9BF8] text-white font-bold text-base flex items-center justify-center shrink-0">
                      {(authUser?.name || selectedClient.name || 'CK')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {authUser?.name || selectedClient.name}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">
                        {authUser?.email || selectedClient.email}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-semibold bg-[#EFF7FF] text-[#3B9BF8] px-2 py-0.5 rounded-md">
                        Brand Owner • {selectedClient.business}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Instagram</span>
                      <span className="font-semibold text-slate-800">
                        {selectedClient.instagram}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">PIC Agensi</span>
                      <span className="font-semibold text-slate-800">
                        {selectedClient.picAssigned}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status Portal</span>
                      <span className="font-semibold text-[#3B9BF8]">
                        {accountType === 'official' ? 'Aktif Resmi' : 'Menunggu Verifikasi DP'}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={route('profile.edit')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#EFF7FF] hover:bg-[#3B9BF8] text-[#3B9BF8] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Kelola Keamanan &amp; Kata Sandi</span>
                  </Link>
                </div>

                <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Informasi Retainer &amp; Faktur
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Detail paket berlangganan dan alokasi produksi bulanan Anda.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                      <span className="text-[10.5px] text-slate-400 block">Paket Aktif</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedClient.package}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                      <span className="text-[10.5px] text-slate-400 block">Nomor Faktur</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedClient.invoiceNumber}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                      <span className="text-[10.5px] text-slate-400 block">Nilai Kontrak Bulanan</span>
                      <span className="text-sm font-bold text-[#3B9BF8] mt-0.5 block">
                        {selectedClient.totalValue}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                      <span className="text-[10.5px] text-slate-400 block">DP 50%</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedClient.dpAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Global Airy-Blue Toast Feedback (Matching Admin Dashboard) */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-white border border-[#3B9BF8]/30 text-slate-800 text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-6 h-6 rounded-lg bg-[#EFF7FF] text-[#3B9BF8] flex items-center justify-center shrink-0">
            ✓
          </span>
          <span>{notification}</span>
        </div>
      )}

      {/* Modals */}
      {selectedContent && (
        <ReviewModal
          item={
            activeClientContents.find((c) => c.id === selectedContent.id) ||
            selectedContent
          }
          role="client"
          onClose={() => setSelectedContent(null)}
        />
      )}

      {showRequestModal && (
        <ClientRequestModal onClose={() => setShowRequestModal(false)} />
      )}

      {showLockedModal && (
        <LockedFeatureModal onClose={() => setShowLockedModal(false)} />
      )}
    </div>
  );
}

function ClapperboardPlaceholder(props: { className?: string }) {
  return <BarChart3 {...props} />;
}
