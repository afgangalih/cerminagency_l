'use client';

import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { AgencyProvider } from '@/context/AgencyContext';
import { useAgency } from '@/context/AgencyContext';
import { ContentItem, ClientPipeline, VideoProductionTask } from '@/types';
import { 
  Calendar, Video, BarChart3, Compass, CheckCircle2, Lock, 
  Plus, AlertCircle, ExternalLink, ArrowRight, Film, Clock, 
  Menu, X, Sparkles, UserCheck, ChevronRight, Copy, Check,
  MessageCircle, Send, Lightbulb, ShieldCheck, Flame, BookOpen, 
  Layers, Image as ImageIcon
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

// Brand Strategy Profile interface for interactive console
interface BrandPillar {
  title: string;
  ratio: string;
  targetCount: number;
  description: string;
  hookExamples: string[];
}

interface BrandStrategyConfig {
  tagline: string;
  pillars: BrandPillar[];
  toneOfVoice: {
    style: string;
    greeting: string;
    doList: string[];
    dontList: string[];
  };
}

// Client-specific dynamic strategy data
const BRAND_STRATEGIES: Record<string, BrandStrategyConfig> = {
  'Maven Coffee Roasters': {
    tagline: 'Membangun Otoritas Specialty Coffee & Komunitas Hangat di Malang',
    pillars: [
      {
        title: 'Craftsmanship & Edukasi Seduh',
        ratio: '40%',
        targetCount: 5,
        description: 'Membongkar teknik roasting biji kopi lokal, panduan seduh manual V60, dan kalibrasi espresso harian.',
        hookExamples: [
          'Kenapa kopi Arabika selalu punya rasa asam buah segar?',
          'Cara kalibrasi mesin espresso tiap jam 7 pagi sebelum buka kafe',
          '3 kesalahan fatal saat seduh kopi sachet di rumah'
        ]
      },
      {
        title: 'Vibe Kedai & Budaya Komunitas',
        ratio: '35%',
        targetCount: 4,
        description: 'Menampilkan interaksi barista yang hangat, suasana nongkrong ramah laptop, dan playlist kafe autentik.',
        hookExamples: [
          'Spot paling tenang buat kerja remote di Maven Coffee Malang',
          'Reaksi barista saat pelanggan minta gula cair di kopi specialty',
          'Kisah di balik petani kopi Gunung Tilu mitra kami'
        ]
      },
      {
        title: 'Signature Menu & Penawaran Terbatas',
        ratio: '25%',
        targetCount: 3,
        description: 'Memicu kunjungan kedai melalui rilis menu seasonal cold brew dan promo bundling sarapan pagi.',
        hookExamples: [
          'Menu rahasia yang cuma dipesan barista Maven saat shift malam',
          'Bundling kopi susu botol 1 liter hemat 25% minggu ini',
          'Sensasi rasa cold brew fermentasi stroberi 24 jam'
        ]
      }
    ],
    toneOfVoice: {
      style: 'Bersahabat, hangat, berwawasan kopi mendalam tanpa terkesan menggurui',
      greeting: 'Kawan Maven',
      doList: [
        'Tampilkan detail crema espresso dan uap kopi secara sinematik',
        'Sebutkan asal biji kopi dan proses pascapanen secara transparan',
        'Gunakan musik jazz, lo-fi, atau indie folk yang menenangkan'
      ],
      dontList: [
        'Hindari musik jedag-jedug yang merusak citra tenang kedai',
        'Jangan pakai klaim berlebihan seperti "kopi terenak di dunia"'
      ]
    }
  },
  'Lumen Skin Clinic': {
    tagline: 'Klinik Estetika Medis Tepercaya: Kulit Sehat Alami Berbasis Bukti Ilmiah',
    pillars: [
      {
        title: 'Dokter Spesialis & Edukasi Bahan Aktif',
        ratio: '45%',
        targetCount: 5,
        description: 'Membahas fakta medis kandungan skincare (Retinol, Niacinamide) serta mitos perawatan kulit oleh dokter ahli.',
        hookExamples: [
          'Dokter kulit bongkar: Jangan pakai bahan ini kalau kulitmu bruntusan!',
          'Kenapa bekas jerawat kehitaman (PIH) susah hilang hanya dengan serum?',
          'Perbedaan mendasar laser flek vs chemical peeling medis'
        ]
      },
      {
        title: 'Pengalaman Pasien & Standar Higienis',
        ratio: '35%',
        targetCount: 4,
        description: 'Transparansi proses treatment yang nyaman, sterilisasi alat medis, dan dokumentasi perbaikan kulit riil pasien.',
        hookExamples: [
          'Melihat langsung proses sterilisasi alat sebelum tindakan laser',
          'Perjalanan 3 bulan mengatasi jerawat meradang tanpa rasa sakit',
          'Ruang konsultasi privat dokter Lumen Skin Clinic'
        ]
      },
      {
        title: 'Promo Eksklusif & Reservasi Jadwal',
        ratio: '20%',
        targetCount: 3,
        description: 'Penawaran terbatas paket perawatan bulanan dan tautan langsung reservasi konsultasi dokter.',
        hookExamples: [
          'Paket Glowing Medical Facial khusus pelanggan baru bulan ini',
          'Hemat 30% konsultasi dokter spesialis tiap hari Selasa',
          'Sisa 5 slot jadwal dokter dermatologi untuk akhir pekan ini'
        ]
      }
    ],
    toneOfVoice: {
      style: 'Menenangkan, empatik, higienis, berbasis keilmuan medis dokter estetika',
      greeting: 'Sahabat Lumen',
      doList: [
        'Tampilkan penjelasan dokter dengan jas medis dan pencahayaan bersih',
        'Gunakan data sebelum-sesudah yang jujur tanpa filter kamera',
        'Gunakan palet warna pastel/putih yang higienis dan elegan'
      ],
      dontList: [
        'Jangan pernah klaim "kulit putih instan dalam 3 hari"',
        'Hindari visual jarum suntik atau darah yang memicu rasa takut audiens'
      ]
    }
  },
  'Arche Studio Apparel': {
    tagline: 'Streetwear Essentials: Potongan Presisi & Material Katun Berat Tahan Cuci',
    pillars: [
      {
        title: 'Lookbook & Panduan Styling OOTD',
        ratio: '50%',
        targetCount: 6,
        description: 'Inspirasi mix and match oversized t-shirt, cargo pants, dan panduan layering warna outfit harian.',
        hookExamples: [
          '3 cara styling kaos oversized biar nggak kelihatan tenggelam',
          'Warna celana yang paling cocok buat kaos abu-abu washed',
          'OOTD nongkrong simpel tapi kelihatan mahal dan rapi'
        ]
      },
      {
        title: 'Uji Durabilitas & Karakter Material',
        ratio: '30%',
        targetCount: 4,
        description: 'Memperlihatkan ketebalan katun combed 24s/16s, jahitan rantai leher, dan sablon discharge anti-retak.',
        hookExamples: [
          'Uji cuci 20 kali: Apakah sablon kaos ini bakal retak?',
          'Kenapa rib leher kaos murah gampang melar sedangkan Arche tidak?',
          'Detail tekstur kain katun berat yang adem di cuaca tropis'
        ]
      },
      {
        title: 'Rilis Artikel Baru & Kuota Terbatas',
        ratio: '20%',
        targetCount: 2,
        description: 'Menciptakan momentum peluncuran koleksi terbatas dengan hitung mundur dan penawaran hari pertama.',
        hookExamples: [
          'Sneak peek artikel terbaru rilis Jumat jam 19.00 WIB (Hanya 100 pcs)',
          'Koleksi jaket corduroy edisi terbatas hampir habis',
          'Detail bordir dada artikel eksklusif akhir tahun'
        ]
      }
    ],
    toneOfVoice: {
      style: 'Percaya diri, modern, santai khas anak muda urban, to the point',
      greeting: 'Bro & Sis',
      doList: [
        'Tampilkan fitting pakaian pada model bergerak secara dinamis',
        'Ambil gambar close-up detail jahitan, kancing, dan tekstur kain',
        'Gunakan musik hip-hop lo-fi atau electronic tempo sedang'
      ],
      dontList: [
        'Hindari gaya bahasa formal kaku layaknya instansi pemerintah',
        'Jangan pakai visual resolusi rendah yang menurunkan nilai produk'
      ]
    }
  }
};

const DEFAULT_STRATEGY: BrandStrategyConfig = {
  tagline: 'Retainer Produksi Konten Video Vertikal & Manajemen Medsos',
  pillars: [
    {
      title: 'Edukasi & Pembahasan Masalah',
      ratio: '45%',
      targetCount: 5,
      description: 'Membahas masalah spesifik audiens dan mengulas cara pemakaian produk brand secara langsung.',
      hookExamples: [
        '3 kesalahan umum yang sering bikin rugi pelanggan',
        'Cara cepat mengatasi masalah harian tanpa ribet',
        'Fakta penting yang jarang diketahui orang awam'
      ]
    },
    {
      title: 'Dapur Produksi & Kepercayaan',
      ratio: '35%',
      targetCount: 4,
      description: 'Membangun kedekatan emosional melalui cerita autentik di balik dapur produksi dan standar QC.',
      hookExamples: [
        'Melihat langsung standar kualitas tim kami setiap pagi',
        'Cerita di balik pemilihan bahan baku pilihan',
        'Keseruan tim saat menyiapkan pesanan pelanggan'
      ]
    },
    {
      title: 'Penawaran Khusus & Promo',
      ratio: '20%',
      targetCount: 3,
      description: 'Memicu konversi penjualan instan melalui penawaran terbatas dan call-to-action yang tegas.',
      hookExamples: [
        'Promo terbatas akhir bulan khusus pengikut setia',
        'Klaim diskon khusus sebelum kuota hari ini habis',
        'Paket hemat bundling produk brand Anda'
      ]
    }
  ],
  toneOfVoice: {
    style: 'Profesional, hangat, bersahabat, tepercaya',
    greeting: 'Rekan Mitra',
    doList: [
      'Gunakan visual tajam dengan komposisi video vertikal 9:16',
      'Fokus pada manfaat riil bagi pengguna produk'
    ],
    dontList: [
      'Hindari istilah teknis rumit yang membingungkan audiens',
      'Jangan gunakan klaim tanpa rujukan data'
    ]
  }
};

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

  // Strategy interactive console state
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [proposedTopic, setProposedTopic] = useState('');
  const [submittedTopics, setSubmittedTopics] = useState<string[]>([]);
  const [topicSubmittedSuccess, setTopicSubmittedSuccess] = useState(false);

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

  // Calculated Quota Fulfillment
  const totalRetainerQuota = (selectedClient.reelsMax || 10) + (selectedClient.postsMax || 2);
  const approvedCount = approvedContents.length;
  const pendingCount = pendingReviews.length;
  const inProductionCount = Math.max(0, totalRetainerQuota - approvedCount - pendingCount);
  const percentageFulfillment = Math.min(100, Math.round((approvedCount / totalRetainerQuota) * 100));

  // Next Scheduled Drop Spotlight
  const nextDropContent = activeClientContents
    .filter(c => c.status === 'Disetujui' || c.status === 'Menunggu Review')
    .sort((a, b) => a.dayNumber - b.dayNumber)[0] || activeClientContents[0];

  // Content format distribution
  const reelsCount = activeClientContents.filter(c => c.type.toLowerCase().includes('reel') || c.type.toLowerCase().includes('video')).length;
  const carouselCount = activeClientContents.filter(c => c.type.toLowerCase().includes('carousel') || c.type.toLowerCase().includes('korsel')).length;
  const imageCount = Math.max(0, activeClientContents.length - reelsCount - carouselCount);

  // Brand Strategy Profile Lookup
  const strategyConfig = BRAND_STRATEGIES[selectedClient.business] || DEFAULT_STRATEGIES(selectedClient.business);

  function DEFAULT_STRATEGIES(businessName: string): BrandStrategyConfig {
    return {
      ...DEFAULT_STRATEGY,
      tagline: `Strategi Retainer Konten & Akun Media Sosial ${businessName}`
    };
  }

  // Handle Client Topic Proposal Submission
  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedTopic.trim()) return;

    setSubmittedTopics(prev => [proposedTopic.trim(), ...prev]);
    setProposedTopic('');
    setTopicSubmittedSuccess(true);
    setTimeout(() => setTopicSubmittedSuccess(false), 4000);
  };

  // Filter contents for currently active pillar (distribute by modulo if no tag)
  const currentPillar = strategyConfig.pillars[activePillarIndex] || strategyConfig.pillars[0];
  const pillarFilteredContents = activeClientContents.filter((_, idx) => idx % strategyConfig.pillars.length === activePillarIndex);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-zinc-50 text-zinc-900 font-sans antialiased">
      {/* Modern Client Sidebar */}
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

      {/* Main Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <DashboardHeader
          role="client"
          activeTabTitle={
            activeTab === 'overview' ? 'Ringkasan Portal' :
            activeTab === 'calendar' ? 'Kalender & Feed Simulator' :
            activeTab === 'production' ? 'Progres Video & Shoot' : 'Konsol Strategi & Pilar Brand'
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

            {/* ========================================================
                TAB 1: OVERVIEW (EXECUTIVE HUB WITH RICH VISUALS & METRICS)
            ======================================================== */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                
                {/* Header Welcome */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-3 border-b border-zinc-200">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                      Pusat Kendali Brand: {selectedClient.business}
                    </h1>
                    <p className="text-xs text-zinc-500 font-light mt-1">
                      Pantau serapan kuota konten bulanan, jadwal tayang terdekat, dan draf video yang siap ditinjau.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-inter text-zinc-600 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg shadow-2xs">
                      PIC Studio: <strong className="text-zinc-950 font-semibold">{selectedClient.picAssigned || 'Dimas (Creative Lead)'}</strong>
                    </span>
                    <span className="text-xs font-inter text-zinc-600 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg shadow-2xs">
                      Faktur: <strong>{selectedClient.invoiceNumber}</strong>
                    </span>
                    <span className="text-xs font-inter px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{selectedClient.package}</span>
                    </span>
                  </div>
                </div>

                {/* ROW 1: NEXT DROP SPOTLIGHT + QUOTA FULFILLMENT GAUGE (CHART) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* HERO CARD: JADWAL TAYANG TERDEKAT (NEXT DROP SPOTLIGHT) */}
                  <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-4 h-4" />
                          </span>
                          <div>
                            <span className="text-[11px] font-inter uppercase text-zinc-400 font-semibold tracking-wide">
                              JADWAL TAYANG TERDEKAT (NEXT DROP)
                            </span>
                            <h3 className="text-sm font-semibold text-zinc-900">
                              Konten Berikutnya Siap Publikasi
                            </h3>
                          </div>
                        </div>

                        {nextDropContent && (
                          <div className={`inline-flex items-center gap-1.5 text-[11px] font-inter px-2.5 py-1 rounded-md font-medium border ${
                            nextDropContent.status === 'Disetujui' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              nextDropContent.status === 'Disetujui' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`} />
                            <span>{nextDropContent.status === 'Disetujui' ? 'Siap Tayang' : 'Menunggu Review'}</span>
                          </div>
                        )}
                      </div>

                      {nextDropContent ? (
                        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-zinc-50/70 p-4 rounded-xl border border-zinc-200/80">
                          <div className="w-16 h-20 rounded-lg bg-zinc-900 overflow-hidden shrink-0 shadow-xs relative">
                            <img 
                              src={nextDropContent.mediaUrl} 
                              alt={nextDropContent.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 left-1 bg-zinc-950/80 text-white text-[9px] font-inter px-1 rounded">
                              {nextDropContent.version}
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 text-xs font-inter text-zinc-500">
                              <span className="font-semibold text-zinc-900">{nextDropContent.day} ({nextDropContent.weekday})</span>
                              <span>•</span>
                              <span>Jam 18.00 WIB</span>
                              <span>•</span>
                              <span className="text-zinc-700">{nextDropContent.platforms.join(' & ')}</span>
                            </div>
                            <h4 className="text-sm font-semibold text-zinc-900 mt-1 truncate">
                              {nextDropContent.title}
                            </h4>
                            <p className="text-xs text-zinc-500 line-clamp-1 mt-1 font-light">
                              {nextDropContent.caption}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedContent(nextDropContent)}
                            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition cursor-pointer shadow-xs shrink-0"
                          >
                            Buka Preview
                          </button>
                        </div>
                      ) : (
                        <div className="mt-4 p-6 text-center text-xs text-zinc-400 bg-zinc-50 rounded-xl">
                          Belum ada jadwal penayangan aktif.
                        </div>
                      )}
                    </div>

                    {/* Format Mix Ratios in Next Drop Footer */}
                    <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs text-zinc-600 gap-2">
                      <span className="text-[11px] font-inter text-zinc-400">Variasi Format Akun:</span>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 font-medium">
                          <Film className="w-3.5 h-3.5 text-zinc-900" />
                          <span>{reelsCount} Reels 9:16</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium">
                          <Layers className="w-3.5 h-3.5 text-zinc-600" />
                          <span>{carouselCount} Korsel Feed</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium">
                          <ImageIcon className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{imageCount} Single Post</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CHART: SERAPAN KUOTA KONTEN BULANAN (SVG PROGRESS GAUGE) */}
                  <div className="lg:col-span-5 bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                        <div>
                          <span className="text-[11px] font-inter uppercase text-zinc-400 font-semibold tracking-wide">
                            SERAPAN KUOTA BULANAN
                          </span>
                          <h3 className="text-sm font-semibold text-zinc-900">
                            Realisasi Paket ({totalRetainerQuota} Konten)
                          </h3>
                        </div>
                        <span className="text-base font-bold font-inter text-zinc-900">
                          {percentageFulfillment}% Tuntas
                        </span>
                      </div>

                      {/* Stacked Progress Bar */}
                      <div className="mt-5 space-y-2">
                        <div className="w-full bg-zinc-100 h-3 rounded-full overflow-hidden flex">
                          <div 
                            style={{ width: `${(approvedCount / totalRetainerQuota) * 100}%` }}
                            className="bg-emerald-600 h-full transition-all duration-500" 
                            title={`Disetujui: ${approvedCount}`}
                          />
                          <div 
                            style={{ width: `${(pendingCount / totalRetainerQuota) * 100}%` }}
                            className="bg-amber-400 h-full transition-all duration-500" 
                            title={`Menunggu Review: ${pendingCount}`}
                          />
                          <div 
                            style={{ width: `${(inProductionCount / totalRetainerQuota) * 100}%` }}
                            className="bg-zinc-300 h-full transition-all duration-500" 
                            title={`Produksi & Edit: ${inProductionCount}`}
                          />
                        </div>

                        {/* Visual Breakdown Legend */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100">
                            <span className="text-[10px] font-inter text-emerald-800 uppercase block">Siap Tayang</span>
                            <span className="text-base font-bold text-emerald-900 font-inter">{approvedCount}</span>
                            <span className="text-[10px] text-emerald-700 block mt-0.5">Final Terkunci</span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-100">
                            <span className="text-[10px] font-inter text-amber-800 uppercase block">Perlu Review</span>
                            <span className="text-base font-bold text-amber-900 font-inter">{pendingCount}</span>
                            <span className="text-[10px] text-amber-700 block mt-0.5">Menunggu Klien</span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                            <span className="text-[10px] font-inter text-zinc-500 uppercase block">Dapur Studio</span>
                            <span className="text-base font-bold text-zinc-800 font-inter">{inProductionCount}</span>
                            <span className="text-[10px] text-zinc-500 block mt-0.5">Shoot & Edit</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                      <span>Sisa kuota bulan berjalan: <strong>{totalRetainerQuota - approvedCount} Konten</strong></span>
                      <span className="text-[11px] font-inter text-emerald-700 font-medium">SLA Tepat Waktu 100%</span>
                    </div>
                  </div>
                </div>

                {/* ROW 2: ACTION RADAR (KONTEN MENUNGGU PERSETUJUAN KLIEN) */}
                <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 shadow-xs">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-5 pb-3 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
                        Perlu Tindakan Anda: Antrean Draf Menunggu Persetujuan
                      </h2>
                    </div>
                    <span className="text-xs font-inter text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-md font-medium">
                      {pendingReviews.length} Draf Belum Ditinjau
                    </span>
                  </div>

                  {pendingReviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {pendingReviews.map(item => (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedContent(item)}
                          className="p-4 rounded-xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 transition flex items-center justify-between gap-3 cursor-pointer shadow-2xs group"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-12 h-14 rounded-lg bg-zinc-900 overflow-hidden shrink-0 shadow-2xs relative">
                              <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition" />
                              <div className="absolute bottom-0 inset-x-0 bg-zinc-950/80 text-[8px] text-zinc-300 text-center font-mono py-0.5">
                                {item.version}
                              </div>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap text-xs font-inter text-zinc-500">
                                <span className="font-semibold text-zinc-800">{item.day} ({item.weekday})</span>
                                <span>•</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-800 font-bold">{item.type}</span>
                              </div>
                              <h3 className="text-sm font-semibold text-zinc-900 mt-1 truncate">{item.title}</h3>
                              <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5 font-light">{item.caption}</p>
                            </div>
                          </div>

                          <button className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition shadow-xs shrink-0">
                            Review
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-zinc-500 text-xs font-inter bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200 flex flex-col items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      <p className="font-medium text-zinc-800">Semua draf terkini telah ditinjau!</p>
                      <p className="text-zinc-400 font-light">Tidak ada konten yang tertahan. Tim produksi Cermin bekerja sesuai jadwal.</p>
                    </div>
                  )}
                </div>

                {/* ROW 3: DEDICATED TEAM & BRAND ASSET VAULT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Account Team Card */}
                  <div className="p-5 bg-white border border-zinc-200 rounded-2xl shadow-xs flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-inter uppercase text-zinc-400 font-semibold tracking-wider block">
                        TIM DEDIKASI AKUN ANDA
                      </span>
                      <h4 className="text-sm font-semibold text-zinc-900">
                        {selectedClient.picAssigned || 'Dimas (Creative Director)'}
                      </h4>
                      <p className="text-xs text-zinc-500 font-light">
                        Penanggung jawab brief, konsep naskah, dan pengawasan kualitas visual studio.
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                        `Halo ${selectedClient.picAssigned || 'Tim Cermin Kreatif'}, saya ${selectedClient.name} dari ${selectedClient.business}. Saya ingin koordinasi jadwal konten.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition shrink-0 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat WhatsApp</span>
                    </a>
                  </div>

                  {/* Google Drive Vault Card */}
                  <div className="p-5 bg-white border border-zinc-200 rounded-2xl shadow-xs flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-inter uppercase text-zinc-400 font-semibold tracking-wider block">
                        ARSIP MASTER BERKAS 4K
                      </span>
                      <h4 className="text-sm font-semibold text-zinc-900">
                        Google Drive Vault: {selectedClient.business}
                      </h4>
                      <p className="text-xs text-zinc-500 font-light">
                        Penyimpanan cloud resolusi tinggi untuk mentahan footage, render final, dan aset logo.
                      </p>
                    </div>

                    <a
                      href="https://drive.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1.5 transition shrink-0 shadow-2xs"
                    >
                      <span>Buka Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                TAB 2: CALENDAR & FEED SIMULATOR
            ======================================================== */}
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

            {/* ========================================================
                TAB 3: PRODUCTION STUDIO OPS
            ======================================================== */}
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

            {/* ========================================================
                TAB 4: STRATEGY & HOOK (INTERACTIVE BRAND STRATEGY CONSOLE)
            ======================================================== */}
            {activeTab === 'strategy' && (
              <div className="space-y-8">
                
                {/* Header */}
                <div className="pb-3 border-b border-zinc-200">
                  <div className="flex items-center gap-2 text-xs font-inter text-zinc-500 mb-1">
                    <Compass className="w-4 h-4 text-zinc-800" />
                    <span>KONSOL STRATEGI & FORMULA HOOK AKUN</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                    Arah Kompas Konten: {selectedClient.business}
                  </h1>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    {strategyConfig.tagline}. Klik salah satu pilar di bawah untuk memfilter konten nyata dan mengusulkan ide topik baru.
                  </p>
                </div>

                {/* 3 INTERACTIVE PILLAR CARDS (FILTER CONTROLS) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {strategyConfig.pillars.map((pillar, idx) => {
                    const isSelected = activePillarIndex === idx;
                    return (
                      <div 
                        key={idx}
                        onClick={() => setActivePillarIndex(idx)}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer relative shadow-xs flex flex-col justify-between ${
                          isSelected 
                            ? 'bg-zinc-950 text-white border-zinc-950 shadow-md ring-2 ring-zinc-950/20' 
                            : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] font-inter uppercase font-bold px-2 py-0.5 rounded ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-700'
                            }`}>
                              Pilar {idx + 1} ({pillar.ratio})
                            </span>
                            <span className={`text-xs font-inter font-medium ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                              Target: {pillar.targetCount} Video
                            </span>
                          </div>

                          <h3 className="text-base font-semibold leading-snug">
                            {pillar.title}
                          </h3>

                          <p className={`text-xs mt-2.5 font-light leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            {pillar.description}
                          </p>
                        </div>

                        {/* Interactive Selection Footer */}
                        <div className={`mt-5 pt-3 border-t flex items-center justify-between text-xs ${
                          isSelected ? 'border-white/20 text-amber-300 font-medium' : 'border-zinc-100 text-zinc-400'
                        }`}>
                          <span>{isSelected ? '● Pilar Sedang Aktif' : 'Klik untuk filter konten'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* FILTERED LIVE CONTENTS UNDER SELECTED PILLAR */}
                <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-zinc-100">
                    <div>
                      <span className="text-[11px] font-inter uppercase text-zinc-400 font-semibold tracking-wide">
                        KONTEN TERIKAT DI BAWAH PILAR "{currentPillar.title.toUpperCase()}"
                      </span>
                      <h3 className="text-sm font-semibold text-zinc-900">
                        Realisasi Produksi ({pillarFilteredContents.length} Konten Terdaftar)
                      </h3>
                    </div>
                    <span className="text-xs font-inter text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md font-medium">
                      Target {currentPillar.targetCount} Video Bulanan
                    </span>
                  </div>

                  {pillarFilteredContents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {pillarFilteredContents.map(item => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedContent(item)}
                          className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-white hover:border-zinc-300 transition flex items-center gap-3 cursor-pointer shadow-2xs group"
                        >
                          <div className="w-12 h-14 rounded-lg bg-zinc-900 overflow-hidden shrink-0 shadow-2xs">
                            <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-inter text-zinc-500 font-medium block">{item.day} ({item.weekday})</span>
                            <h4 className="text-xs font-semibold text-zinc-900 truncate mt-0.5">{item.title}</h4>
                            <span className={`text-[10px] font-inter px-1.5 py-0.2 rounded mt-1 inline-block ${
                              item.status === 'Disetujui' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'bg-amber-50 text-amber-700 font-medium'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-zinc-400 bg-zinc-50 rounded-xl">
                      Belum ada video yang dimasukkan ke pilar ini bulan ini.
                    </div>
                  )}

                  {/* Hook Formula Angle Samples */}
                  <div className="mt-4 pt-4 border-t border-zinc-100 bg-zinc-50/80 p-4 rounded-xl">
                    <span className="text-[11px] font-inter uppercase text-zinc-500 font-semibold block mb-2">
                      Formula Hook yang Disepakati untuk Pilar Ini:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-700 font-light">
                      {currentPillar.hookExamples.map((hook, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-zinc-400 font-mono text-[10px] mt-0.5">#{i+1}</span>
                          <span>"{hook}"</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* INTERACTIVE TOPIC PROPOSAL FORM */}
                <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">
                        Usulkan Ide Topik Spontan untuk Pilar "{currentPillar.title}"
                      </h3>
                      <p className="text-xs text-zinc-500 font-light">
                        Punya ide tren baru atau pesan khusus? Usulkan di sini agar langsung masuk ke daftar naskah tim Cermin.
                      </p>
                    </div>
                  </div>

                  {topicSubmittedSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ide topik berhasil dikirimkan ke tim kreatif Cermin Kreatif! Terima kasih atas masukannya.</span>
                    </div>
                  )}

                  <form onSubmit={handleTopicSubmit} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="text"
                      required
                      value={proposedTopic}
                      onChange={(e) => setProposedTopic(e.target.value)}
                      placeholder={`Misal: Ide video tentang... (untuk pilar ${currentPillar.title})`}
                      className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium flex items-center justify-center gap-2 transition cursor-pointer shadow-xs shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Usulan Topik</span>
                    </button>
                  </form>

                  {/* List of Submitted Topics */}
                  {submittedTopics.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-100">
                      <span className="text-[11px] font-inter text-zinc-400 uppercase font-semibold block mb-2">
                        Usulan Topik yang Dikirimkan Klien:
                      </span>
                      <div className="space-y-1.5">
                        {submittedTopics.map((top, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 flex items-center justify-between">
                            <span>"{top}"</span>
                            <span className="text-[10px] font-inter px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                              Masuk Antrean Tim Riset
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* BRAND VOICE & DO'S / DON'TS POCKET GUIDE */}
                <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">
                        Karakter Suara Brand & Batasan Produksi (Do's & Don'ts)
                      </h3>
                      <p className="text-xs text-zinc-500 font-light">
                        Pedoman resmi yang dipegang teguh tim penulis naskah dan videografer Cermin.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                    
                    {/* DO LIST */}
                    <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                      <span className="text-xs font-semibold text-emerald-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Wajib Diterapkan (Do):</span>
                      </span>
                      <ul className="space-y-2 text-xs text-emerald-900 font-light">
                        {strategyConfig.toneOfVoice.doList.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DONT LIST */}
                    <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100 space-y-2">
                      <span className="text-xs font-semibold text-rose-950 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Pantangan Mutlak (Don't):</span>
                      </span>
                      <ul className="space-y-2 text-xs text-rose-900 font-light">
                        {strategyConfig.toneOfVoice.dontList.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <X className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

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
