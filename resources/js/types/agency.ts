export type UserRole = 'admin' | 'client' | 'team_member';

export type PlatformType = 'instagram' | 'tiktok' | 'youtube_shorts' | 'omnichannel';

export type ContentStage = 'script' | 'production' | 'review' | 'revision' | 'scheduled';

export type BallInCourt = 'client' | 'agency';

export type AccountStatus = 'demo' | 'official';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  phoneNumber?: string;
  businessName?: string;
  instagramHandle?: string;
}

export interface FeedbackLog {
  id?: string;
  sender: 'Klien' | 'Agensi' | 'Creative Lead' | 'Editor' | 'Tim Agensi';
  text: string;
  time: string;
}

export interface ContentItem {
  id: number;
  clientId: string;
  date: string; // 'YYYY-MM-DD'
  dayNumber: number; // 1-31
  day: string; // '05 Okt'
  weekday: string; // 'Senin'
  title: string;
  type: string; // 'Reels / Video Pendek' | 'Instagram Carousel' | 'Single Post High-Res' | 'TikTok & Reels'
  pillar?: string;
  platforms: PlatformType[]; // Support multi-platform (IG, TikTok, etc.)
  stage: ContentStage;
  status: 'Draf Naskah' | 'Sedang Edit' | 'Menunggu Review' | 'Perlu Revisi' | 'Disetujui' | 'Request Masuk';
  statusColor?: string;
  ballInCourt: BallInCourt;
  version: string; // 'V1' | 'V2 (Draf Revisi)' | 'Final Approved'
  caption: string;
  mediaUrl: string;
  driveRawUrl?: string;
  hashtags?: string[];
  scriptHook?: string;
  revisionCount: number; // Max 2 rounds (Anti-Scope Creep SLA)
  feedbackHistory: FeedbackLog[];
}

export interface ContentPillarItem {
  title: string;
  ratio: string;
  targetCount: number;
  description: string;
}

export interface ClientKpiItem {
  label: string;
  target: string;
  current: string;
  unit: string;
}

export interface ClientPipeline {
  id: string; // e.g. 'CK-091'
  userId?: string;
  name: string; // PIC Name
  business: string;
  instagram: string;
  email: string;
  package: string;
  reelsUsed: number;
  reelsMax: number;
  postsUsed: number;
  postsMax: number;
  status: 'Menunggu Verifikasi DP' | 'Aktif Resmi (Lunas DP)' | 'Brief Masuk (Belum Bayar)';
  statusBadge?: string;
  dpAmount: string;
  totalValue: string;
  paymentTerm: string;
  transferProof: string | null;
  transferBank?: string;
  invoiceNumber: string;
  briefNotes: string;
  targetAudience?: string;
  coverUrl?: string | null;
  registeredAt: string;
  isUnlocked: boolean; // Flag DP 50% Gated Access
  picAssigned: string;
  contentPillars?: ContentPillarItem[];
  kpiTargets?: ClientKpiItem[];
}

export interface AssetLinkItem {
  label: string;
  url: string;
}

export interface VideoProductionTask {
  id: number;
  clientId: string;
  title: string;
  phase: 'Riset & Naskah' | 'Produksi & Shoot' | 'Penyuntingan & Desain' | 'Quality Control';
  progress: number; // 0 - 100
  status: 'Dalam Antrean' | 'Sedang Berjalan' | 'Selesai';
  rawFolder: string;
  assetLinks?: AssetLinkItem[];
  shooter: string;
  cameraSetup?: string;
  shootDate?: string;
  notes?: string;
}

export interface AgencyNotificationItem {
  id: string;
  title: string;
  description: string;
  category: string;
  time: string;
  group: string;
  unread: boolean;
  actionLabel: string;
  actionType: string;
  clientId?: string | null;
}

export interface AgencyEventItem {
  id: string;
  title: string;
  shortTitle: string;
  monthKey: string;
  startDay: number;
  endDay: number;
  time: string;
  category: string;
  brand: string;
  location: string;
  pic: string;
  deliverable: string;
  image: string;
}

export interface ClientReviewItem {
  id: string;
  clientName: string;
  brand: string;
  packageName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface StudioTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  avatar?: string | null;
}

export interface Invoice {
  id: string;
  clientId: string;
  invoiceNumber: string;
  termType: 'Termin 1 (DP 50%)' | 'Termin 2 (Pelunasan)' | 'Add-on Quota';
  amount: string;
  status: 'Menunggu Verifikasi' | 'Lunas';
  transferProofUrl?: string;
  createdAt: string;
  verifiedAt?: string;
}
