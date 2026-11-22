<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\TransformsAgencyData;
use App\Models\Client;
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

        return Inertia::render('Admin/Dashboard', [
            'clients' => $clients->map(fn($c) => $this->transformClient($c))->values(),
            'contents' => $contents->map(fn($c) => $this->transformContent($c))->values(),
            'videoTasks' => $videoTasks->map(fn($t) => $this->transformTask($t))->values(),
            'invoices' => $invoices->map(fn($i) => $this->transformInvoice($i))->values(),
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
            'status' => 'required|string',
            'progress' => 'required|integer|min:0|max:100',
        ]);

        $client = Client::where('client_code', $validated['clientId'])->orWhere('id', $validated['clientId'])->first();

        StudioTask::create([
            'client_id' => $client ? $client->id : null,
            'title' => $validated['title'],
            'phase' => $validated['phase'],
            'progress' => $validated['progress'],
            'status' => $validated['status'],
            'shooter' => $validated['shooter'] ?? 'Tim Studio',
            'raw_folder_url' => $validated['rawFolder'] ?? 'Google Drive: /Raw-Shooting',
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
}
