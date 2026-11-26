<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudioTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'content_id',
        'title',
        'phase',
        'progress',
        'status',
        'shooter',
        'camera_setup',
        'raw_folder_url',
        'asset_links',
        'shoot_date',
        'notes',
    ];

    protected $casts = [
        'progress' => 'integer',
        'shoot_date' => 'date',
        'asset_links' => 'array',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function content(): BelongsTo
    {
        return $this->belongsTo(Content::class);
    }
}

