<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'client_name',
        'brand_name',
        'package_name',
        'rating',
        'comment',
        'aspect_scores',
        'review_date_label',
    ];

    protected $casts = [
        'rating' => 'float',
        'aspect_scores' => 'array',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}

