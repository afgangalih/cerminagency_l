<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientStory extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'client_name',
        'logo_url',
        'cover_image_url',
        'industry',
        'summary',
        'challenge',
        'solution',
        'deliverables',
        'metrics',
        'service_slug',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope studi kasus aktif terurut.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc');
    }
}

