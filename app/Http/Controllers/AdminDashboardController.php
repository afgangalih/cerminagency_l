<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\TransformsAgencyData;
use App\Models\AgencyEvent;
use App\Models\AgencyNotification;
use App\Models\Client;
use App\Models\ClientReview;
use App\Models\Content;
use App\Models\ContentFeedback;
use App\Models\Invoice;
use App\Models\StudioTask;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AdminDashboardController extends Controller
{
    use TransformsAgencyData;

    /**
     * Display Agency Command Center with real MySQL data.
     */
    public function index(): Response
    {
        $clients = Client::with(['user', 'contents.feedbacks', 'invoices', 'studioTasks'])
            ->latest()
            ->get();

        $contents = Content::with(['client', 'feedbacks', 'author'])
            ->latest()
            ->get();

        $videoTasks = StudioTask::with('client')
            ->latest()
            ->get();

        $invoices = Invoice::with(['client', 'verifier'])
            ->latest()
            ->get();

        $notifications = AgencyNotification::with('client')
            ->latest()
            ->take(30)
            ->get()
            ->map(fn($n) => [
                'id' => (string) $n->id,
                'title' => $n->title,
                'description' => $n->description,
                'category' => $n->category,
                'time' => $n->created_at ? $n->created_at->diffForHumans() : 'Baru saja',
                'group' => $n->created_at && $n->created_at->isToday() ? 'Hari Ini' : 'Sebelumnya',
                'unread' => !$n->is_read,
                'actionLabel' => $n->action_label,
                'actionType' => $n->action_type,
                'clientId' => $n->client ? $n->client->client_code : null,
            ])->values();

        $agencyEvents = AgencyEvent::with('client')
            ->orderBy('start_date')
            ->get()
            ->map(fn($e) => [
                'id' => (string) $e->id,
                'title' => $e->title,
                'shortTitle' => $e->short_title ?: $e->title,
                'monthKey' => $e->start_date ? $e->start_date->format('Y-m') : now()->format('Y-m'),
                'startDay' => $e->start_date ? (int) $e->start_date->day : 1,
                'endDay' => $e->end_date ? (int) $e->end_date->day : 1,
                'time' => $e->time_label,
                'category' => $e->category,
                'brand' => $e->brand_name,
                'location' => $e->location,
                'pic' => $e->pic_name,
                'deliverable' => $e->deliverable ?? '-',
                'image' => $e->image_url ?? 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
            ])->values();

        $clientReviews = ClientReview::with('client')
            ->latest()
            ->get()
            ->map(fn($r) => [
                'id' => (string) $r->id,
                'clientName' => $r->client_name,
                'brand' => $r->brand_name,
                'packageName' => $r->package_name ?? 'Retainer',
                'rating' => (float) $r->rating,
                'date' => $r->review_date_label ?? ($r->created_at ? $r->created_at->format('M Y') : '-'),
                'comment' => $r->comment,
            ])->values();

        $studioTeam = User::whereIn('role', ['admin', 'creative_lead', 'editor'])
            ->get()
            ->map(fn($u) => [
                'id' => (string) $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'role' => match ($u->role) {
                    'admin' => 'Creative Director & Admin',
                    'creative_lead' => 'Creative Lead',
                    default => 'Video Editor / Studio',
                },
                'phone' => $u->phone_number ?? '-',
                'avatar' => $u->avatar_url,
            ])->values();

        return Inertia::render('Admin/Dashboard', [
            'clients' => $clients->map(fn($c) => $this->transformClient($c))->values(),
            'contents' => $contents->map(fn($c) => $this->transformContent($c))->values(),
            'videoTasks' => $videoTasks->map(fn($t) => $this->transformTask($t))->values(),
            'invoices' => $invoices->map(fn($i) => $this->transformInvoice($i))->values(),
            'notifications' => $notifications,
            'agencyEvents' => $agencyEvents,
            'clientReviews' => $clientReviews,
            'studioTeam' => $studioTeam,
        ]);
    }

    /**
     * Store new client pipeline in MySQL.
     */
    public function storeClient(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'business' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'package' => 'required|string|max:255',
            'reelsMax' => 'nullable|integer',
            'postsMax' => 'nullable|integer',
            'dpAmount' => 'nullable|string',
            'totalValue' => 'nullable|string',
            'paymentTerm' => 'nullable|string',
            'isUnlocked' => 'nullable|boolean',
            'picAssigned' => 'nullable|string',
            'briefNotes' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $clientCode = 'CK-' . str_pad((string) (Client::count() + 91), 3, '0', STR_PAD_LEFT);
        $invoiceNumber = 'INV/' . date('Y') . '/CK/' . date('m') . '-' . substr($clientCode, 3);

        $user = User::firstOrCreate(
            ['email' => $validated['email']],
            [
                'name' => $validated['name'],
                'password' => Hash::make('password123'),
                'role' => 'client',
                'business_name' => $validated['business'],
                'instagram_handle' => $validated['instagram'] ?? '@brand',
                'phone_number' => $validated['phone'] ?? null,
            ]
        );

        $client = Client::create([
            'client_code' => $clientCode,
            'user_id' => $user->id,
            'pic_name' => $validated['name'],
            'business_name' => $validated['business'],
            'instagram_handle' => $validated['instagram'] ?? '@brand',
            'email' => $validated['email'],
            'phone_whatsapp' => $validated['phone'] ?? null,
            'package_name' => $validated['package'],
            'reels_used' => 0,
            'reels_max' => $validated['reelsMax'] ?? 15,
            'posts_used' => 0,
            'posts_max' => $validated['postsMax'] ?? 20,
            'status' => ($validated['isUnlocked'] ?? false) ? 'Aktif Resmi (Lunas DP)' : 'Menunggu Verifikasi DP',
            'dp_amount' => $validated['dpAmount'] ?? 'Rp 6.750.000',
            'total_value' => $validated['totalValue'] ?? 'Rp 13.500.000',
            'payment_term' => $validated['paymentTerm'] ?? '50% DP',
            'invoice_number' => $invoiceNumber,
            'brief_notes' => $validated['briefNotes'] ?? 'Klien baru didaftarkan via Admin Dashboard.',
            'is_unlocked' => (bool) ($validated['isUnlocked'] ?? false),
            'pic_assigned' => $validated['picAssigned'] ?? 'Reza (Creative Lead)',
        ]);

        Invoice::create([
            'client_id' => $client->id,
            'invoice_number' => $invoiceNumber,
            'term_type' => 'Termin 1 (DP 50%)',
            'amount' => $validated['dpAmount'] ?? 'Rp 6.750.000',
            'status' => ($validated['isUnlocked'] ?? false) ? 'Lunas' : 'Menunggu Verifikasi',
        ]);

        AgencyNotification::create([
            'client_id' => $client->id,
            'title' => "Brand Baru Terdaftar — {$client->business_name}",
            'description' => "Paket {$client->package_name} ({$client->invoice_number}) berhasil didaftarkan oleh {$client->pic_name}.",
            'category' => 'Klien & Onboarding',
            'action_label' => 'Lihat Klien',
            'action_type' => 'clients',
            'is_read' => false,
        ]);

        return back()->with('success', "Klien {$client->business_name} ({$client->client_code}) berhasil didaftarkan ke MySQL!");
    }

    /**
     * Update client details in MySQL.
     */
    public function updateClient(Request $request, string $identifier): RedirectResponse
    {
        $client = Client::where('client_code', $identifier)->orWhere('id', $identifier)->firstOrFail();

        $validated = $request->validate([
            'pic_name' => 'nullable|string|max:255',
            'business_name' => 'nullable|string|max:255',
            'instagram_handle' => 'nullable|string|max:255',
            'pic_assigned' => 'nullable|string|max:255',
            'brief_notes' => 'nullable|string',
            'target_audience' => 'nullable|string',
            'content_pillars' => 'nullable|array',
            'content_pillars.*.title' => 'required_with:content_pillars|string|max:120',
            'content_pillars.*.ratio' => 'nullable|string|max:30',
            'content_pillars.*.targetCount' => 'nullable|integer|min:0',
            'content_pillars.*.description' => 'nullable|string|max:500',
            'kpi_targets' => 'nullable|array',
            'kpi_targets.*.label' => 'required_with:kpi_targets|string|max:120',
            'kpi_targets.*.target' => 'nullable|string|max:60',
            'kpi_targets.*.current' => 'nullable|string|max:60',
            'kpi_targets.*.unit' => 'nullable|string|max:30',
        ]);

        $client->update($validated);
        return back()->with('success', "Data klien {$client->business_name} berhasil diperbarui.");
    }

    /**
     * Delete client record and cascade from MySQL.
     */
    public function destroyClient(string $identifier): RedirectResponse
    {
        $client = Client::where('client_code', $identifier)->orWhere('id', $identifier)->firstOrFail();
        $businessName = $client->business_name;
        $client->delete();

        return back()->with('success', "Klien {$businessName} berhasil dihapus dari database MySQL.");
    }

    /**
     * Store new content item in MySQL.
     */
    public function storeContent(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'clientId' => 'required|string',
            'title' => 'required|string|max:255',
            'type' => 'nullable|string',
            'pillar' => 'nullable|string|max:120',
            'platforms' => 'nullable|array',
            'date' => 'required|string',
            'stage' => 'required|in:script,production,review,revision,scheduled',
            'caption' => 'nullable|string',
            'mediaUrl' => 'nullable|string',
        ]);

        $client = Client::where('client_code', $validated['clientId'])->orWhere('id', $validated['clientId'])->first();

        if (!$client) {
            $client = Client::first();
        }

        $stageStatusMap = [
            'script' => ['status' => 'Draf Naskah', 'ball' => 'agency'],
            'production' => ['status' => 'Sedang Edit', 'ball' => 'agency'],
            'review' => ['status' => 'Menunggu Review', 'ball' => 'client'],
            'revision' => ['status' => 'Perlu Revisi', 'ball' => 'agency'],
            'scheduled' => ['status' => 'Disetujui', 'ball' => 'agency'],
        ];

        $mapping = $stageStatusMap[$validated['stage']] ?? ['status' => 'Draf Naskah', 'ball' => 'agency'];

        $dateObj = Carbon::parse($validated['date']);
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        $days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $dayLabel = sprintf('%02d %s', $dateObj->day, $months[$dateObj->month - 1]);
        $weekdayLabel = $days[$dateObj->dayOfWeek];

        $content = Content::create([
            'client_id' => $client->id,
            'title' => $validated['title'],
            'format_type' => $validated['type'] ?? 'Reels / Video Pendek',
            'pillar' => $validated['pillar'] ?? null,
            'platforms' => $validated['platforms'] ?? ['instagram', 'tiktok'],
            'stage' => $validated['stage'],
            'status' => $mapping['status'],
            'ball_in_court' => $mapping['ball'],
            'version' => 'V1',
            'publish_date' => $dateObj->format('Y-m-d'),
            'day_number' => $dateObj->day,
            'weekday_label' => $weekdayLabel,
            'date_label' => $dayLabel,
            'caption' => $validated['caption'] ?? 'Draf naskah dibuat oleh tim kreatif Cermin.',
            'media_url' => $validated['mediaUrl'] ?? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
            'revision_count' => 0,
            'max_revisions' => 2,
            'created_by' => $request->user()->id,
        ]);

        ContentFeedback::create([
            'content_id' => $content->id,
            'sender_name' => $request->user()->name,
            'sender_role' => 'agency',
            'feedback_text' => "Draf konten '{$content->title}' dijadwalkan oleh tim agensi.",
        ]);

        if (str_contains(strtolower($content->format_type), 'reel') || str_contains(strtolower($content->format_type), 'video') || str_contains(strtolower($content->format_type), 'tiktok')) {
            $client->increment('reels_used');
        } else {
            $client->increment('posts_used');
        }

        return back()->with('success', "Konten '{$content->title}' berhasil dijadwalkan ke MySQL!");
    }

    /**
     * Move content stage in 5-Stage Kanban SOP.
     */
    public function moveContentStage(Request $request, string $identifier): RedirectResponse
    {
        $content = Content::where('id', $identifier)->firstOrFail();

        $validated = $request->validate([
            'stage' => 'required|in:script,production,review,revision,scheduled',
        ]);

        $stageStatusMap = [
            'script' => ['status' => 'Draf Naskah', 'ball' => 'agency'],
            'production' => ['status' => 'Sedang Edit', 'ball' => 'agency'],
            'review' => ['status' => 'Menunggu Review', 'ball' => 'client'],
            'revision' => ['status' => 'Perlu Revisi', 'ball' => 'agency'],
            'scheduled' => ['status' => 'Disetujui', 'ball' => 'agency'],
        ];

        $mapping = $stageStatusMap[$validated['stage']] ?? ['status' => 'Draf Naskah', 'ball' => 'agency'];

        $content->update([
            'stage' => $validated['stage'],
            'status' => $mapping['status'],
            'ball_in_court' => $mapping['ball'],
        ]);

        return back()->with('success', "Tahapan konten '{$content->title}' berhasil dipindahkan ke: {$mapping['status']}.");
    }

    /**
     * Admin submits revised draft for client re-review.
     */
    public function submitRevisionFix(Request $request, string $identifier): RedirectResponse
    {
        $content = Content::where('id', $identifier)->firstOrFail();
        $validated = $request->validate([
            'resolutionNote' => 'nullable|string',
        ]);

        $nextVersion = str_starts_with($content->version, 'V1') ? 'V2 (Draf Revisi)' : 'V3 (Final)';
        $content->update([
            'version' => $nextVersion,
            'stage' => 'review',
            'status' => 'Menunggu Review',
            'ball_in_court' => 'client',
        ]);

        ContentFeedback::create([
            'content_id' => $content->id,
            'sender_name' => $request->user()->name,
            'sender_role' => 'agency',
            'feedback_text' => $validated['resolutionNote'] ?: 'Perbaikan draf selesai dikerjakan sesuai masukan. Siap review kembali.',
        ]);

        return back()->with('success', "Draf revisi untuk '{$content->title}' berhasil diunggah! Menunggu peninjauan klien.");
    }

    /**
     * Delete content item.
     */
    public function destroyContent(string $identifier): RedirectResponse
    {
        $content = Content::where('id', $identifier)->firstOrFail();
        $title = $content->title;
        $content->delete();

        return back()->with('success', "Konten '{$title}' berhasil dihapus dari database.");
    }

    /**
     * Verify client payment proof and unlock portal features.
     */
    public function verifyClientPayment(string $identifier): RedirectResponse
    {
        $client = Client::where('client_code', $identifier)->orWhere('id', $identifier)->firstOrFail();
        $client->update([
            'status' => 'Aktif Resmi (Lunas DP)',
            'is_unlocked' => true,
            'payment_term' => 'Termin 1 Lunas (Akses Terbuka Penuh)',
        ]);

        $client->invoices()->where('status', 'Menunggu Verifikasi')->update([
            'status' => 'Lunas',
            'verified_at' => now(),
            'verified_by' => auth()->id(),
        ]);

        AgencyNotification::create([
            'client_id' => $client->id,
            'title' => "DP 50% Diverifikasi — {$client->business_name}",
            'description' => "Pembayaran {$client->dp_amount} ({$client->invoice_number}) telah diverifikasi. Akses Portal Klien kini terbuka penuh.",
            'category' => 'Finansial & DP',
            'action_label' => 'Buka Finansial',
            'action_type' => 'finance',
            'is_read' => false,
        ]);

        return back()->with('success', "Pembayaran {$client->business_name} diverifikasi! Akses kalender & video resmi dibuka penuh.");
    }

    /**
     * Add-on video quota upsell.
     */
    public function addQuota(Request $request, string $identifier): RedirectResponse
    {
        $client = Client::where('client_code', $identifier)->orWhere('id', $identifier)->firstOrFail();
        $validated = $request->validate([
            'addedReels' => 'required|integer|min:1',
        ]);

        $client->increment('reels_max', $validated['addedReels']);
        return back()->with('success', "+{$validated['addedReels']} Slot Video Add-on berhasil ditambahkan ke kontrak {$client->business_name}!");
    }

    /**
     * Store studio production task in MySQL.
     */
    public function storeStudioTask(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'clientId' => 'required|string',
            'title' => 'required|string|max:255',
            'phase' => 'required|string',
            'shooter' => 'nullable|string',
            'rawFolder' => 'nullable|string',
            'assetLinks' => 'nullable|array',
            'assetLinks.*.label' => 'required_with:assetLinks|string|max:100',
            'assetLinks.*.url' => 'required_with:assetLinks|string|max:1000',
            'status' => 'required|string',
            'progress' => 'required|integer|min:0|max:100',
        ]);

        $client = Client::where('client_code', $validated['clientId'])->orWhere('id', $validated['clientId'])->first();
        $links = $validated['assetLinks'] ?? [];
        $primaryUrl = $links[0]['url'] ?? ($validated['rawFolder'] ?? 'https://drive.google.com');

        StudioTask::create([
            'client_id' => $client ? $client->id : null,
            'title' => $validated['title'],
            'phase' => $validated['phase'],
            'progress' => $validated['progress'],
            'status' => $validated['status'],
            'shooter' => $validated['shooter'] ?? 'Tim Desain',
            'raw_folder_url' => $primaryUrl,
            'asset_links' => $links,
        ]);

        return back()->with('success', "Task studio '{$validated['title']}' berhasil dicatat di MySQL!");
    }

    /**
     * Update studio task progress.
     */
    public function updateStudioTask(Request $request, string $identifier): RedirectResponse
    {
        $task = StudioTask::where('id', $identifier)->firstOrFail();
        $validated = $request->validate([
            'progress' => 'required|integer|min:0|max:100',
            'status' => 'required|string|in:Dalam Antrean,Sedang Berjalan,Selesai',
        ]);

        $task->update($validated);
        return back()->with('success', "Progres task '{$task->title}' diperbarui.");
    }

    /**
     * Destroy studio task.
     */
    public function destroyStudioTask(string $identifier): RedirectResponse
    {
        $task = StudioTask::where('id', $identifier)->firstOrFail();
        $title = $task->title;
        $task->delete();
        return back()->with('success', "Task studio '{$title}' berhasil dihapus.");
    }

    public function markNotificationRead(string $identifier): RedirectResponse
    {
        $notif = AgencyNotification::findOrFail($identifier);
        $notif->update(['is_read' => true]);
        return back();
    }

    public function markAllNotificationsRead(): RedirectResponse
    {
        AgencyNotification::where('is_read', false)->update(['is_read' => true]);
        return back()->with('success', 'Semua notifikasi ditandai sudah dibaca.');
    }

    public function clearReadNotifications(): RedirectResponse
    {
        AgencyNotification::where('is_read', true)->delete();
        return back()->with('success', 'Notifikasi yang sudah dibaca dibersihkan.');
    }

    public function storeEvent(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'brand' => 'required|string|max:255',
            'startDate' => 'required|date',
            'endDate' => 'nullable|date',
            'time' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'pic' => 'nullable|string|max:255',
            'deliverable' => 'nullable|string|max:255',
        ]);

        $client = Client::where('business_name', $validated['brand'])->first();

        AgencyEvent::create([
            'client_id' => $client?->id,
            'title' => $validated['title'],
            'short_title' => $validated['title'],
            'category' => $validated['category'],
            'brand_name' => $validated['brand'],
            'start_date' => $validated['startDate'],
            'end_date' => $validated['endDate'] ?? $validated['startDate'],
            'time_label' => $validated['time'] ?? '10:00 WIB',
            'location' => $validated['location'] ?? 'Studio Cermin Malang',
            'pic_name' => $validated['pic'] ?? 'Dimas Pratama',
            'deliverable' => $validated['deliverable'] ?? 'Produksi Konten',
        ]);

        return back()->with('success', "Jadwal '{$validated['title']}' berhasil ditambahkan ke Kalender Agensi.");
    }

    public function destroyEvent(string $identifier): RedirectResponse
    {
        AgencyEvent::findOrFail($identifier)->delete();
        return back()->with('success', 'Jadwal kalender dihapus.');
    }

    public function storeReview(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'clientName' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'packageName' => 'nullable|string|max:255',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'required|string',
        ]);

        $client = Client::where('business_name', $validated['brand'])->first();

        ClientReview::create([
            'client_id' => $client?->id,
            'client_name' => $validated['clientName'],
            'brand_name' => $validated['brand'],
            'package_name' => $validated['packageName'] ?? $client?->package_name ?? 'Retainer',
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'review_date_label' => now()->format('M Y'),
        ]);

        return back()->with('success', 'Review & ulasan klien berhasil disimpan.');
    }
}
