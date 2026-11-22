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
        'raw_folder_url',
        'shoot_date',
    ];

    protected $casts = [
        'progress' => 'integer',
        'shoot_date' => 'date',
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

