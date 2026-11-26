<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\TransformsAgencyData;
use App\Models\AgencyNotification;
use App\Models\Client;
use App\Models\Content;
use App\Models\ContentFeedback;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ClientPortalController extends Controller
{
    use TransformsAgencyData;

    /**
     * Display Client Portal with real MySQL data.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // If admin visits portal or CLI preview, fallback to first client or specific client
        if ($user && $user->isAdmin()) {
            $client = Client::with(['contents.feedbacks', 'studioTasks', 'invoices'])->first();
        } elseif ($user) {
            $client = $user->client()->with(['contents.feedbacks', 'studioTasks', 'invoices'])->first();
        } else {
            $client = Client::with(['contents.feedbacks', 'studioTasks', 'invoices'])->first();
        }

        $contents = $client ? $client->contents()->with('feedbacks')->latest()->get() : collect();
        $videoTasks = $client ? $client->studioTasks : collect();

        return Inertia::render('Client/Portal', [
            'client' => $client ? $this->transformClient($client) : null,
            'contents' => $contents->map(fn($c) => $this->transformContent($c))->values(),
            'videoTasks' => $videoTasks->map(fn($t) => $this->transformTask($t))->values(),
        ]);
    }

    /**
     * 1-Click Content Approval by Client.
     */
    public function approveContent(string $identifier): RedirectResponse
    {
        $content = Content::where('id', $identifier)->firstOrFail();

        $content->update([
            'status' => 'Disetujui',
            'stage' => 'scheduled',
            'ball_in_court' => 'agency',
            'version' => str_contains($content->version, 'Approved') ? $content->version : ($content->version . ' (Final Approved)'),
        ]);

        ContentFeedback::create([
            'content_id' => $content->id,
            'sender_name' => auth()->user()->name,
            'sender_role' => 'client',
            'feedback_text' => 'Konten disetujui resmi (1-Click Approved), siap ditayangkan.',
        ]);

        return back()->with('success', "Konten '{$content->title}' berhasil disetujui dan dijadwalkan tayang!");
    }

    /**
     * Submit client revision with Anti-Scope Creep check.
     */
    public function requestRevision(Request $request, string $identifier): RedirectResponse
    {
        $content = Content::where('id', $identifier)->firstOrFail();

        $validated = $request->validate([
            'note' => 'required|string|max:1000',
        ]);

        if ($content->revision_count >= $content->max_revisions) {
            return back()->with('error', 'Batas kuota revisi gratis (2x putaran) sudah tercapai untuk konten ini.');
        }

        $content->update([
            'status' => 'Perlu Revisi',
            'stage' => 'revision',
            'ball_in_court' => 'agency',
            'revision_count' => $content->revision_count + 1,
        ]);

        ContentFeedback::create([
            'content_id' => $content->id,
            'sender_name' => auth()->user()->name,
            'sender_role' => 'client',
            'feedback_text' => "Catatan Revisi #{$content->revision_count}: {$validated['note']}",
        ]);

        AgencyNotification::create([
            'client_id' => $content->client_id,
            'title' => "Permintaan Revisi Klien — " . ($content->client?->business_name ?? 'Brand'),
            'description' => auth()->user()->name . " meminta revisi pada \"{$content->title}\": \"{$validated['note']}\"",
            'category' => 'Review & Revisi',
            'action_label' => 'Buka Kanban',
            'action_type' => 'content_engine',
            'is_read' => false,
        ]);

        return back()->with('success', "Catatan revisi #{$content->revision_count} berhasil dikirim ke tim kreatif agensi.");
    }

    /**
     * Submit client content self-request.
     */
    public function submitClientRequest(Request $request): RedirectResponse
    {
        $user = $request->user();
        $client = $user->client ?: Client::first();

        if (!$client) {
            return back()->with('error', 'Profil klien belum terdaftar.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string',
            'platforms' => 'nullable|array',
            'date' => 'required|string',
            'caption' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $isQuotaFull = $client->reels_used >= $client->reels_max;

        $dateObj = Carbon::parse($validated['date']);
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        $days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $dayLabel = sprintf('%02d %s', $dateObj->day, $months[$dateObj->month - 1]);
        $weekdayLabel = $days[$dateObj->dayOfWeek];

        $content = Content::create([
            'client_id' => $client->id,
            'title' => $validated['title'],
            'format_type' => $validated['type'],
            'platforms' => $validated['platforms'] ?? ['instagram'],
            'stage' => 'script',
            'status' => 'Request Masuk',
            'ball_in_court' => 'agency',
            'version' => 'V1 (Request Klien)',
            'publish_date' => $dateObj->format('Y-m-d'),
            'day_number' => $dateObj->day,
            'weekday_label' => $weekdayLabel,
            'date_label' => $dayLabel,
            'caption' => $validated['caption'] ?? ('Catatan Klien: ' . ($validated['notes'] ?? '-')),
            'media_url' => 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
            'revision_count' => 0,
            'max_revisions' => 2,
            'created_by' => $user->id,
        ]);

        ContentFeedback::create([
            'content_id' => $content->id,
            'sender_name' => $user->name,
            'sender_role' => 'client',
            'feedback_text' => 'Pengajuan konten baru melalui portal. Catatan: ' . ($validated['notes'] ?? '-'),
        ]);

        $client->increment('reels_used');

        $msg = $isQuotaFull 
            ? "Pengajuan '{$content->title}' diterima sebagai slot add-on (kuota reguler penuh)."
            : "Pengajuan '{$content->title}' berhasil diajukan & masuk radar tim kreatif!";

        return back()->with('success', $msg);
    }
}
