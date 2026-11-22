<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_code',
        'user_id',
        'pic_name',
        'business_name',
        'instagram_handle',
        'email',
        'phone_whatsapp',
        'package_name',
        'reels_used',
        'reels_max',
        'posts_used',
        'posts_max',
        'status',
        'dp_amount',
        'total_value',
        'payment_term',
        'transfer_proof_url',
        'invoice_number',
        'brief_notes',
        'is_unlocked',
        'pic_assigned',
        'drive_vault_url',
    ];

    protected $casts = [
        'is_unlocked' => 'boolean',
        'reels_used' => 'integer',
        'reels_max' => 'integer',
        'posts_used' => 'integer',
        'posts_max' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function contents(): HasMany
    {
        return $this->hasMany(Content::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function studioTasks(): HasMany
    {
        return $this->hasMany(StudioTask::class);
    }

    public function supportMessages(): HasMany
    {
        return $this->hasMany(SupportMessage::class);
    }
}

