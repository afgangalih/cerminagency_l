<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Content extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'title',
        'format_type',
        'pillar',
        'platforms',
        'stage',
        'status',
        'ball_in_court',
        'version',
        'publish_date',
        'day_number',
        'weekday_label',
        'date_label',
        'script_hook',
        'caption',
        'hashtags',
        'media_url',
        'cover_url',
        'drive_raw_url',
        'published_url',
        'published_at',
        'revision_count',
        'max_revisions',
        'created_by',
    ];

    protected $casts = [
        'platforms' => 'array',
        'hashtags' => 'array',
        'publish_date' => 'date',
        'published_at' => 'datetime',
        'day_number' => 'integer',
        'revision_count' => 'integer',
        'max_revisions' => 'integer',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function feedbacks(): HasMany
    {
        return $this->hasMany(ContentFeedback::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

