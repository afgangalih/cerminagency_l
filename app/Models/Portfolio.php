<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'client_name',
        'category_slug',
        'industry',
        'service_slug',
        'thumbnail_url',
        'gallery_images',
        'deliverables_summary',
        'metrics',
        'summary',
        'external_url',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Relasi ke kategori portofolio.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(PortfolioCategory::class, 'category_slug', 'slug');
    }

    /**
     * Scope portofolio aktif terurut.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc');
    }

    /**
     * Filter dinamis berdasarkan kategori dan pencarian nama klien/judul/industri.
     */
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        $category = $filters['category'] ?? null;
        $search = trim((string) ($filters['search'] ?? ''));

        if ($category && $category !== 'all') {
            $query->where('category_slug', $category);
        }

        if ($search !== '') {
            $query->where(function (Builder $q) use ($search) {
                $q->where('client_name', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('industry', 'like', "%{$search}%")
                    ->orWhere('deliverables_summary', 'like', "%{$search}%");
            });
        }

        return $query;
    }
}

