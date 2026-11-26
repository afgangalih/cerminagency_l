<?php

namespace App\Http\Controllers\Concerns;

use App\Models\Client;
use App\Models\Content;
use App\Models\StudioTask;
use App\Models\Invoice;

trait TransformsAgencyData
{
    /**
     * Transform Eloquent Client to ClientPipeline frontend structure.
     */
    public function transformClient(Client $c): array
    {
        return [
            'id' => $c->client_code,
            'dbId' => $c->id,
            'userId' => (string) $c->user_id,
            'name' => $c->pic_name,
            'business' => $c->business_name,
            'instagram' => $c->instagram_handle,
            'email' => $c->email,
            'package' => $c->package_name,
            'reelsUsed' => (int) $c->reels_used,
            'reelsMax' => (int) $c->reels_max,
            'postsUsed' => (int) $c->posts_used,
            'postsMax' => (int) $c->posts_max,
            'status' => $c->status,
            'dpAmount' => $c->dp_amount ?? 'Rp 0',
            'totalValue' => $c->total_value ?? 'Rp 0',
            'paymentTerm' => $c->payment_term ?? '-',
            'transferProof' => $c->transfer_proof_url,
            'transferBank' => $c->transfer_bank ?? 'Transfer Bank',
            'invoiceNumber' => $c->invoice_number ?? '-',
            'briefNotes' => $c->brief_notes ?? '',
            'targetAudience' => $c->target_audience ?? '',
            'coverUrl' => $c->cover_url ?? null,
            'registeredAt' => $c->created_at ? $c->created_at->format('d M Y') : '-',
            'isUnlocked' => (bool) $c->is_unlocked,
            'picAssigned' => $c->pic_assigned ?? 'Tim Creative Cermin',
            'contentPillars' => is_array($c->content_pillars) ? $c->content_pillars : [],
            'kpiTargets' => is_array($c->kpi_targets) ? $c->kpi_targets : [],
        ];
    }

    /**
     * Transform Eloquent Content to ContentItem frontend structure.
     */
    public function transformContent(Content $c): array
    {
        $stageColors = [
            'script' => 'slate',
            'production' => 'slate',
            'review' => 'amber',
            'revision' => 'rose',
            'scheduled' => 'emerald',
            'published' => 'sky',
        ];

        return [
            'id' => $c->id,
            'clientId' => $c->client ? $c->client->client_code : 'CK-091',
            'date' => $c->publish_date ? $c->publish_date->format('Y-m-d') : now()->format('Y-m-d'),
            'dayNumber' => (int) $c->day_number,
            'day' => $c->date_label ?? ($c->publish_date ? $c->publish_date->format('d M') : ''),
            'weekday' => $c->weekday_label ?? 'Senin',
            'title' => $c->title,
            'type' => $c->format_type ?? 'Reels / Video Pendek',
            'pillar' => $c->pillar ?? '',
            'platforms' => is_array($c->platforms) ? $c->platforms : ['instagram'],
            'stage' => $c->stage,
            'status' => $c->status,
            'statusColor' => $stageColors[$c->stage] ?? 'slate',
            'ballInCourt' => $c->ball_in_court ?? 'agency',
            'version' => $c->version ?? 'V1',
            'caption' => $c->caption ?? '',
            'mediaUrl' => $c->media_url ?? '',
            'driveRawUrl' => $c->drive_raw_url ?? '',
            'publishedUrl' => $c->published_url ?? '',
            'publishedAt' => $c->published_at ? $c->published_at->format('d M Y H:i') : null,
            'hashtags' => is_array($c->hashtags) ? $c->hashtags : [],
            'scriptHook' => $c->script_hook ?? '',
            'revisionCount' => (int) $c->revision_count,
            'feedbackHistory' => $c->feedbacks ? $c->feedbacks->map(function ($f) {
                return [
                    'id' => (string) $f->id,
                    'sender' => $f->sender_role === 'client' ? 'Klien' : 'Agensi',
                    'text' => $f->feedback_text,
                    'time' => $f->created_at ? $f->created_at->diffForHumans() : 'Baru saja',
                ];
            })->toArray() : [],
        ];
    }

    /**
     * Transform Eloquent StudioTask to VideoProductionTask frontend structure.
     */
    public function transformTask(StudioTask $t): array
    {
        $links = is_array($t->asset_links) && count($t->asset_links) > 0
            ? $t->asset_links
            : ($t->raw_folder_url
                ? [['label' => 'Folder Master', 'url' => $t->raw_folder_url]]
                : []);

        return [
            'id' => $t->id,
            'clientId' => $t->client ? $t->client->client_code : 'CK-091',
            'title' => $t->title,
            'phase' => $t->phase,
            'progress' => (int) $t->progress,
            'status' => $t->status,
            'rawFolder' => $t->raw_folder_url ?? '',
            'assetLinks' => $links,
            'shooter' => $t->shooter ?? 'Tim Studio',
            'cameraSetup' => $t->camera_setup ?? 'Figma / Drive',
            'shootDate' => $t->shoot_date ? $t->shoot_date->format('d M Y') : 'Terjadwal',
            'notes' => $t->notes ?? '',
        ];
    }

    /**
     * Transform Eloquent Invoice to Invoice frontend structure.
     */
    public function transformInvoice(Invoice $i): array
    {
        return [
            'id' => (string) $i->id,
            'clientId' => $i->client ? $i->client->client_code : '',
            'invoiceNumber' => $i->invoice_number,
            'termType' => $i->term_type,
            'amount' => $i->amount,
            'status' => $i->status,
            'transferProofUrl' => $i->transfer_proof_url,
            'createdAt' => $i->created_at ? $i->created_at->format('d M Y') : '-',
            'verifiedAt' => $i->verified_at ? $i->verified_at->format('d M Y H:i') : null,
        ];
    }
}

