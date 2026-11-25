<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PortfolioCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'short_label',
        'icon_name',
        'service_slug',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Relasi ke item portofolio dalam kategori ini.
     */
    public function portfolios(): HasMany
    {
        return $this->hasMany(Portfolio::class, 'category_slug', 'slug');
    }

    /**
     * Scope kategori aktif terurut.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)->orderBy('sort_order', 'asc');
    }
}

