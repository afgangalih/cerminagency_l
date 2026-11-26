'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { 
  ClientPipeline, 
  ContentItem, 
  VideoProductionTask, 
  UserProfile, 
  ContentStage,
  PlatformType,
  Invoice
} from '@/types';
import { 
  INITIAL_CLIENTS_PIPELINE, 
  INITIAL_CONTENT_ITEMS, 
  INITIAL_VIDEO_PRODUCTION_TASKS 
} from '@/lib/mock-data';

export const EMPTY_CLIENT_FALLBACK: ClientPipeline = {
  id: '',
  name: 'Belum Ada Klien',
  business: 'Belum Ada Klien Terdaftar',
  instagram: '@-',
  email: '-',
  package: 'Belum Memilih Paket',
  reelsUsed: 0,
  reelsMax: 0,
  postsUsed: 0,
  postsMax: 0,
  status: 'Menunggu Verifikasi DP',
  dpAmount: 'Rp 0',
  totalValue: 'Rp 0',
  paymentTerm: '50% DP',
  transferProof: null,
  invoiceNumber: '-',
  briefNotes: 'Silakan tambah klien pertama untuk memulai operasional agensi.',
  registeredAt: '-',
  isUnlocked: false,
  picAssigned: 'Tim Creative Cermin'
};

interface AgencyContextType {
  // State
  currentUser: UserProfile | null;
  accountType: 'demo' | 'official';
  clientPipeline: ClientPipeline[];
  contentList: ContentItem[];
  videoTasks: VideoProductionTask[];
  invoices: Invoice[];
  selectedClientId: string;
  selectedClient: ClientPipeline;
  activeClientContents: ContentItem[];
  notification: string | null;

  // Actions
  setCurrentUser: (user: UserProfile | null) => void;
  setAccountType: (type: 'demo' | 'official') => void;
  setSelectedClientId: (id: string) => void;
  triggerNotification: (msg: string) => void;
  toggleAccountStatus: () => void;
  
  // Data State Actions (Clean & Seed)
  clearAllData: () => void;
  seedSampleData: () => void;

  // Client Management CRUD
  addClient: (client: ClientPipeline) => void;
  updateClient: (clientId: string, updates: Partial<ClientPipeline>) => void;
  deleteClient: (clientId: string) => void;

  // Content Operations CRUD
  addContentItem: (item: {
    clientId: string;
    title: string;
    type: string;
    pillar?: string;
    platforms: PlatformType[];
    date: string;
    stage: ContentStage;
    status: ContentItem['status'];
    statusColor?: string;
    ballInCourt: ContentItem['ballInCourt'];
    version: string;
    caption: string;
    mediaUrl: string;
  }) => void;
  updateContentItem: (contentId: number, updates: Partial<ContentItem>) => void;
  deleteContentItem: (contentId: number) => void;

  // Content SOPs
  approveContent: (contentId: number) => void;
  requestRevision: (contentId: number, note: string) => { success: boolean; message: string };
  submitRevisionFix: (contentId: number, resolutionNote: string) => void;
  moveContentStage: (contentId: number, newStage: ContentStage) => void;
  submitClientRequest: (data: {
    title: string;
    type: string;
    platforms: PlatformType[];
    date: string;
    caption?: string;
    notes?: string;
  }) => { success: boolean; isAddOn: boolean };
  
  // Studio Operations CRUD
  addStudioTask: (task: Omit<VideoProductionTask, 'id'>) => void;
  updateStudioTask: (taskId: number, progress: number, status: 'Dalam Antrean' | 'Sedang Berjalan' | 'Selesai') => void;
  deleteStudioTask: (taskId: number) => void;

  // Financial & Onboarding Ops
  verifyPayment: (clientId: string) => void;
  addQuotaSlot: (clientId: string, addedReels: number) => void;
  submitBriefOnboarding: (data: {
    name: string;
    business: string;
    instagram: string;
    package: string;
    email: string;
    notes?: string;
  }) => { clientId: string; invoiceNumber: string; waUrl: string };
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

interface AgencyProviderProps {
  children: React.ReactNode;
  initialClients?: ClientPipeline[];
  initialContents?: ContentItem[];
  initialVideoTasks?: VideoProductionTask[];
  initialInvoices?: Invoice[];
  initialSelectedClientId?: string;
  userRole?: 'admin' | 'client';
}

export function AgencyProvider({
  children,
  initialClients,
  initialContents,
  initialVideoTasks,
  initialInvoices = [],
  initialSelectedClientId,
  userRole = 'admin',
}: AgencyProviderProps) {
  const page = usePage();
  const flash = (page.props as any)?.flash;

  const [clientPipeline, setClientPipeline] = useState<ClientPipeline[]>(() => {
    if (initialClients && initialClients.length > 0) return initialClients;
    return INITIAL_CLIENTS_PIPELINE;
  });

  const [contentList, setContentList] = useState<ContentItem[]>(() => {
    if (initialContents && initialContents.length > 0) return initialContents;
    return INITIAL_CONTENT_ITEMS;
  });

  const [videoTasks, setVideoTasks] = useState<VideoProductionTask[]>(() => {
    if (initialVideoTasks && initialVideoTasks.length > 0) return initialVideoTasks;
    return INITIAL_VIDEO_PRODUCTION_TASKS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    return initialInvoices || [];
  });

  const [selectedClientId, setSelectedClientId] = useState<string>(() => {
    if (initialSelectedClientId) return initialSelectedClientId;
    if (initialClients && initialClients.length > 0) return initialClients[0].id;
    return 'CK-091';
  });

  const [accountType, setAccountType] = useState<'demo' | 'official'>(() => {
    if (userRole === 'client' && initialClients && initialClients.length > 0) {
      return initialClients[0].isUnlocked ? 'official' : 'demo';
    }
    return 'official';
  });
  const [notification, setNotification] = useState<string | null>(null);

  const authUser = (page.props as any)?.auth?.user;
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: authUser?.id ? String(authUser.id) : 'usr-001',
    email: authUser?.email || 'budi@mavencoffee.id',
    fullName: authUser?.name || 'Budi Santoso',
    role: userRole,
    businessName: initialClients?.[0]?.business || 'Cermin Kreatif',
    instagramHandle: initialClients?.[0]?.instagram || '@cerminkreatif'
  });

  // Sync props when Inertia reloads with new MySQL data
  useEffect(() => {
    if (initialClients && initialClients.length > 0) {
      setClientPipeline(initialClients);
      if (!initialClients.some(c => c.id === selectedClientId)) {
        setSelectedClientId(initialClients[0].id);
      }
    }
  }, [initialClients]);

  useEffect(() => {
    if (initialContents) {
      setContentList(initialContents);
    }
  }, [initialContents]);

  useEffect(() => {
    if (initialVideoTasks) {
      setVideoTasks(initialVideoTasks);
    }
  }, [initialVideoTasks]);

  useEffect(() => {
    if (initialInvoices) {
      setInvoices(initialInvoices);
    }
  }, [initialInvoices]);

  // Handle flash messages from Laravel
  useEffect(() => {
    if (flash?.success) {
      triggerNotification(flash.success);
    } else if (flash?.error) {
      triggerNotification(flash.error);
    }
  }, [flash]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  const toggleAccountStatus = () => {
    const nextType = accountType === 'demo' ? 'official' : 'demo';
    setAccountType(nextType);
    if (nextType === 'official') {
      triggerNotification('Status akun di-upgrade ke KLIEN RESMI! Seluruh kalender, feed & video terbuka penuh.');
    } else {
      triggerNotification('Status dikembalikan ke MODE DEMO (Fitur kalender & video digembok).');
    }
  };

  // Safe selected client fallback
  const selectedClient = clientPipeline.find(c => c.id === selectedClientId) || clientPipeline[0] || EMPTY_CLIENT_FALLBACK;
  const activeClientContents = selectedClient.id ? contentList.filter(item => item.clientId === selectedClient.id) : [];

  // Keep client portal lock state strictly synced with database isUnlocked
  useEffect(() => {
    if (userRole === 'client' && selectedClient && selectedClient.id) {
      setAccountType(selectedClient.isUnlocked ? 'official' : 'demo');
    }
  }, [userRole, selectedClient.id, selectedClient.isUnlocked]);

  // Reset all to clean zero state
  const clearAllData = () => {
    setClientPipeline([]);
    setContentList([]);
    setVideoTasks([]);
    setSelectedClientId('');
    triggerNotification('Semua data lokal dibersihkan!');
  };

  // Seed sample data
  const seedSampleData = () => {
    setClientPipeline(INITIAL_CLIENTS_PIPELINE);
    setContentList(INITIAL_CONTENT_ITEMS);
    setVideoTasks(INITIAL_VIDEO_PRODUCTION_TASKS);
    setSelectedClientId('CK-091');
    triggerNotification('Data sampel agensi berhasil dimuat kembali untuk pengujian!');
  };

  // Helper date parsing
  const parseDateMetadata = (dateStr: string) => {
    const d = new Date(dateStr);
    const dayNumber = isNaN(d.getDate()) ? 1 : d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const day = `${dayNumber < 10 ? '0' : ''}${dayNumber} ${months[d.getMonth()] || 'Okt'}`;
    const weekday = days[d.getDay()] || 'Senin';
    return { dayNumber, day, weekday };
  };

  // Client CRUD
  const addClient = (newClient: ClientPipeline) => {
    const updated = [newClient, ...clientPipeline];
    setClientPipeline(updated);
    setSelectedClientId(newClient.id);

    router.post('/admin/clients', {
      business: newClient.business,
      name: newClient.name,
      instagram: newClient.instagram,
      email: newClient.email,
      package: newClient.package,
      reelsMax: newClient.reelsMax,
      postsMax: newClient.postsMax,
      dpAmount: newClient.dpAmount,
      totalValue: newClient.totalValue,
      paymentTerm: newClient.paymentTerm,
      isUnlocked: newClient.isUnlocked,
      picAssigned: newClient.picAssigned,
      briefNotes: newClient.briefNotes,
    }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const updateClient = (clientId: string, updates: Partial<ClientPipeline>) => {
    const updated = clientPipeline.map(c => c.id === clientId ? { ...c, ...updates } : c);
    setClientPipeline(updated);

    router.patch(`/admin/clients/${clientId}`, {
      pic_name: updates.name,
      business_name: updates.business,
      instagram_handle: updates.instagram,
      pic_assigned: updates.picAssigned,
      brief_notes: updates.briefNotes,
    }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const deleteClient = (clientId: string) => {
    const updatedClients = clientPipeline.filter(c => c.id !== clientId);
    const updatedContents = contentList.filter(c => c.clientId !== clientId);
    const updatedTasks = videoTasks.filter(t => t.clientId !== clientId);
    setClientPipeline(updatedClients);
    setContentList(updatedContents);
    setVideoTasks(updatedTasks);
    if (selectedClientId === clientId) {
      setSelectedClientId(updatedClients[0]?.id || '');
    }

    router.delete(`/admin/clients/${clientId}`, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Content Operations CRUD
  const addContentItem = (itemData: {
    clientId: string;
    title: string;
    type: string;
    pillar?: string;
    platforms: PlatformType[];
    date: string;
    stage: ContentStage;
    status: ContentItem['status'];
    statusColor?: string;
    ballInCourt: ContentItem['ballInCourt'];
    version: string;
    caption: string;
    mediaUrl: string;
  }) => {
    const { dayNumber, day, weekday } = parseDateMetadata(itemData.date);
    const newId = Date.now();
    const newItem: ContentItem = {
      id: newId,
      ...itemData,
      dayNumber,
      day,
      weekday,
      revisionCount: 0,
      feedbackHistory: [
        { sender: 'Agensi', text: `Draf konten "${itemData.title}" dijadwalkan oleh tim agensi.`, time: 'Baru saja' }
      ]
    };

    const updated = [newItem, ...contentList];
    setContentList(updated);

    router.post('/admin/contents', {
      clientId: itemData.clientId,
      title: itemData.title,
      type: itemData.type,
      pillar: itemData.pillar || '',
      platforms: itemData.platforms,
      date: itemData.date,
      stage: itemData.stage,
      caption: itemData.caption,
      mediaUrl: itemData.mediaUrl,
    }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const updateContentItem = (contentId: number, updates: Partial<ContentItem>) => {
    const updated = contentList.map(item => item.id === contentId ? { ...item, ...updates } : item);
    setContentList(updated);
    triggerNotification('Perubahan konten berhasil disimpan.');
  };

  const deleteContentItem = (contentId: number) => {
    const updated = contentList.filter(item => item.id !== contentId);
    setContentList(updated);

    router.delete(`/admin/contents/${contentId}`, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // 1-Click Approve by Client
  const approveContent = (contentId: number) => {
    const updated = contentList.map(item => {
      if (item.id === contentId) {
        return {
          ...item,
          status: 'Disetujui' as const,
          statusColor: 'emerald',
          stage: 'scheduled' as const,
          ballInCourt: 'agency' as const,
          version: item.version.includes('Approved') ? item.version : `${item.version} (Final Approved)`,
          feedbackHistory: [
            ...item.feedbackHistory,
            { sender: 'Klien' as const, text: 'Konten disetujui resmi (1-Click Approved), siap ditayangkan.', time: 'Baru saja' }
          ]
        };
      }
      return item;
    });
    setContentList(updated);

    router.post(`/portal/contents/${contentId}/approve`, {}, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Request Revision with SLA Max 2 Rounds
  const requestRevision = (contentId: number, note: string) => {
    const target = contentList.find(c => c.id === contentId);
    if (!target) return { success: false, message: 'Konten tidak ditemukan' };

    if (target.revisionCount >= 2) {
      triggerNotification('Batas revisi gratis (SLA 2x) telah tercapai. Tambahan revisi dihitung sebagai slot add-on.');
      return { 
        success: false, 
        message: 'Batas kuota revisi (2x putaran) sudah tercapai untuk konten ini. Silakan konsultasikan revisi mayor ke tim agensi.' 
      };
    }

    const updated = contentList.map(item => {
      if (item.id === contentId) {
        return {
          ...item,
          status: 'Perlu Revisi' as const,
          statusColor: 'rose',
          stage: 'revision' as const,
          ballInCourt: 'agency' as const,
          revisionCount: item.revisionCount + 1,
          feedbackHistory: [
            ...item.feedbackHistory,
            { sender: 'Klien' as const, text: `Catatan Revisi #${item.revisionCount + 1}: ${note}`, time: 'Baru saja' }
          ]
        };
      }
      return item;
    });

    setContentList(updated);

    router.post(`/portal/contents/${contentId}/revision`, { note }, {
      preserveScroll: true,
      preserveState: true,
    });

    return { success: true, message: 'Revisi berhasil diajukan.' };
  };

  // Admin submit revised draft
  const submitRevisionFix = (contentId: number, resolutionNote: string) => {
    const updated = contentList.map(item => {
      if (item.id === contentId) {
        const nextVersion = item.version.startsWith('V1') ? 'V2 (Draf Revisi)' : 'V3 (Final)';
        return {
          ...item,
          version: nextVersion,
          stage: 'review' as const,
          status: 'Menunggu Review' as const,
          statusColor: 'amber',
          ballInCourt: 'client' as const,
          feedbackHistory: [
            ...item.feedbackHistory,
            { sender: 'Tim Agensi' as const, text: resolutionNote || 'Perbaikan draf selesai dikerjakan sesuai masukan. Siap review kembali.', time: 'Baru saja' }
          ]
        };
      }
      return item;
    });

    setContentList(updated);

    router.post(`/admin/contents/${contentId}/submit-revision-fix`, { resolutionNote }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Move stage via Kanban
  const moveContentStage = (contentId: number, newStage: ContentStage) => {
    const updated = contentList.map(item => {
      if (item.id === contentId) {
        let status = item.status;
        let color = item.statusColor;
        let ball = item.ballInCourt;

        if (newStage === 'script') { status = 'Draf Naskah'; color = 'slate'; ball = 'agency'; }
        if (newStage === 'production') { status = 'Sedang Edit'; color = 'slate'; ball = 'agency'; }
        if (newStage === 'review') { status = 'Menunggu Review'; color = 'amber'; ball = 'client'; }
        if (newStage === 'revision') { status = 'Perlu Revisi'; color = 'rose'; ball = 'agency'; }
        if (newStage === 'scheduled') { status = 'Disetujui'; color = 'emerald'; ball = 'agency'; }

        return { ...item, stage: newStage, status, statusColor: color, ballInCourt: ball };
      }
      return item;
    });

    setContentList(updated);

    router.post(`/admin/contents/${contentId}/move-stage`, {
      stage: newStage,
    }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Client self-request content
  const submitClientRequest = (data: {
    title: string;
    type: string;
    platforms: PlatformType[];
    date: string;
    caption?: string;
    notes?: string;
  }) => {
    const client = selectedClient;
    const isQuotaFull = client.reelsUsed >= client.reelsMax;
    const { dayNumber, day, weekday } = parseDateMetadata(data.date);

    const newId = Date.now();
    const newContent: ContentItem = {
      id: newId,
      clientId: client.id,
      date: data.date,
      dayNumber,
      day,
      weekday,
      title: data.title,
      type: data.type,
      platforms: data.platforms,
      stage: 'script',
      status: 'Request Masuk',
      statusColor: isQuotaFull ? 'rose' : 'slate',
      ballInCourt: 'agency',
      version: 'V1 (Request Klien)',
      caption: data.caption || `Catatan Klien: ${data.notes || 'Tidak ada catatan khusus.'}`,
      mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
      revisionCount: 0,
      feedbackHistory: [
        { sender: 'Klien', text: `Pengajuan konten baru melalui portal. Catatan: ${data.notes || '-'}`, time: 'Baru saja' }
      ]
    };

    const updatedContents = [newContent, ...contentList];
    const updatedClients = clientPipeline.map(c => {
      if (c.id === client.id) {
        return {
          ...c,
          reelsUsed: c.reelsUsed + 1
        };
      }
      return c;
    });

    setContentList(updatedContents);
    setClientPipeline(updatedClients);

    router.post('/portal/contents/request', {
      title: data.title,
      type: data.type,
      platforms: data.platforms,
      date: data.date,
      caption: data.caption,
      notes: data.notes,
    }, {
      preserveScroll: true,
      preserveState: true,
    });

    return { success: true, isAddOn: isQuotaFull };
  };

  // Studio Task CRUD
  const addStudioTask = (taskData: Omit<VideoProductionTask, 'id'>) => {
    const newTask: VideoProductionTask = {
      id: Date.now(),
      ...taskData
    };
    const updated = [newTask, ...videoTasks];
    setVideoTasks(updated);

    router.post('/admin/studio-tasks', {
      clientId: taskData.clientId,
      title: taskData.title,
      phase: taskData.phase,
      shooter: taskData.shooter,
      rawFolder: taskData.rawFolder,
      assetLinks: (taskData.assetLinks || []).map((link) => ({
        label: link.label,
        url: link.url,
      })),
      status: taskData.status,
      progress: taskData.progress,
    }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const updateStudioTask = (taskId: number, progress: number, status: 'Dalam Antrean' | 'Sedang Berjalan' | 'Selesai') => {
    const updated = videoTasks.map(t => {
      if (t.id === taskId) {
        return { ...t, progress, status };
      }
      return t;
    });
    setVideoTasks(updated);

    router.patch(`/admin/studio-tasks/${taskId}`, { progress, status }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const deleteStudioTask = (taskId: number) => {
    const updated = videoTasks.filter(t => t.id !== taskId);
    setVideoTasks(updated);

    router.delete(`/admin/studio-tasks/${taskId}`, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Verify payment
  const verifyPayment = (clientId: string) => {
    const updated = clientPipeline.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          status: 'Aktif Resmi (Lunas DP)' as const,
          isUnlocked: true,
          paymentTerm: 'Termin 1 Lunas (Akses Terbuka Penuh)'
        };
      }
      return c;
    });

    setClientPipeline(updated);
    setAccountType('official');

    router.post(`/admin/clients/${clientId}/verify-payment`, {}, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Add-on quota upsell
  const addQuotaSlot = (clientId: string, addedReels: number) => {
    const updated = clientPipeline.map(c => {
      if (c.id === clientId) {
        const currentVal = parseInt(c.totalValue.replace(/\D/g, ''), 10) || 0;
        const addCost = addedReels * 450000;
        return {
          ...c,
          reelsMax: c.reelsMax + addedReels,
          totalValue: `Rp ${(currentVal + addCost).toLocaleString('id-ID')}`
        };
      }
      return c;
    });

    setClientPipeline(updated);

    router.post(`/admin/clients/${clientId}/add-quota`, { addedReels }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Submit quick brief onboarding
  const submitBriefOnboarding = (data: {
    name: string;
    business: string;
    instagram: string;
    package: string;
    email: string;
    notes?: string;
  }) => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newClientId = `CK-${randomNum}`;
    const invoiceNumber = `INV/2026/CK/10-${randomNum}`;

    router.post('/brief/submit', {
      name: data.name,
      business: data.business,
      instagram: data.instagram,
      email: data.email,
      package: data.package,
      notes: data.notes,
    }, {
      preserveScroll: true,
    });

    const waText = encodeURIComponent(
      `Halo Tim Cermin Kreatif, saya telah mengisi brief dari website:\n` +
      `• No Faktur Proforma: ${invoiceNumber}\n` +
      `• Nama PIC: ${data.name}\n` +
      `• Brand: ${data.business} (${data.instagram})\n` +
      `• Paket Pilihan: ${data.package}\n` +
      `• Email: ${data.email}\n` +
      `• Target / Goal: ${data.notes || 'Siap verifikasi DP 50% dan pembukaan kalender produksi.'}`
    );
    const waUrl = `https://wa.me/6281234567890?text=${waText}`;

    triggerNotification(`Brief brand ${data.business} tersimpan! Proforma invoice ${invoiceNumber} diterbitkan.`);
    return { clientId: newClientId, invoiceNumber, waUrl };
  };

  return (
    <AgencyContext.Provider
      value={{
        currentUser,
        accountType,
        clientPipeline,
        contentList,
        videoTasks,
        invoices,
        selectedClientId,
        selectedClient,
        activeClientContents,
        notification,
        setCurrentUser,
        setAccountType,
        setSelectedClientId,
        triggerNotification,
        toggleAccountStatus,
        clearAllData,
        seedSampleData,
        addClient,
        updateClient,
        deleteClient,
        addContentItem,
        updateContentItem,
        deleteContentItem,
        approveContent,
        requestRevision,
        submitRevisionFix,
        moveContentStage,
        submitClientRequest,
        addStudioTask,
        updateStudioTask,
        deleteStudioTask,
        verifyPayment,
        addQuotaSlot,
        submitBriefOnboarding
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
}

export function useAgency() {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error('useAgency must be used within an AgencyProvider');
  }
  return context;
}
