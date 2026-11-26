<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AgencyEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'title',
        'short_title',
        'category',
        'brand_name',
        'start_date',
        'end_date',
        'time_label',
        'location',
        'pic_name',
        'deliverable',
        'image_url',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}

