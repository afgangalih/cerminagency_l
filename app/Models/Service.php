<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'parent_slug',
        'title',
        'badge',
        'tagline',
        'description',
        'hero_visual_type',
        'theme_gradient',
        'meta_title',
        'meta_description',
        'scopes',
        'workflow_steps',
        'why_us_points',
        'showcase_items',
        'pricing_packages',
        'faqs',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'scopes' => 'array',
        'workflow_steps' => 'array',
        'why_us_points' => 'array',
        'showcase_items' => 'array',
        'pricing_packages' => 'array',
        'faqs' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope query untuk layanan aktif terurut.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order', 'asc');
    }

    /**
     * Scope query untuk layanan induk utama (tanpa parent).
     */
    public function scopeMain($query)
    {
        return $query->whereNull('parent_slug')->where('is_active', true)->orderBy('sort_order', 'asc');
    }

    /**
     * Scope query untuk sub-layanan dari parent tertentu.
     */
    public function scopeSubOf($query, string $parentSlug)
    {
        return $query->where('parent_slug', $parentSlug)->where('is_active', true)->orderBy('sort_order', 'asc');
    }

    /**
     * Ambil sub-layanan anak.
     */
    public function getSubServicesAttribute()
    {
        return self::subOf($this->slug)->get();
    }
}

