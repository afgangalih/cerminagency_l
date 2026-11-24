<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a specific main service detail page.
     */
    public function show(string $slug): Response
    {
        $service = Service::active()
            ->where('slug', $slug)
            ->firstOrFail();

        $allServices = Service::active()
            ->select(['id', 'slug', 'parent_slug', 'title', 'badge', 'tagline'])
            ->get();

        $subServices = Service::active()
            ->where('parent_slug', $slug)
            ->select(['id', 'slug', 'parent_slug', 'title', 'badge', 'tagline'])
            ->get();

        return Inertia::render('Services/Show', [
            'service' => $service,
            'allServices' => $allServices,
            'subServices' => $subServices,
        ]);
    }

    /**
     * Display a nested sub-service detail page (e.g. social-media-management/jasa-kelola-instagram).
     */
    public function subShow(string $parentSlug, string $subSlug): Response
    {
        $parentService = Service::active()
            ->where('slug', $parentSlug)
            ->firstOrFail();

        $service = Service::active()
            ->where('parent_slug', $parentSlug)
            ->where('slug', $subSlug)
            ->firstOrFail();

        $siblingServices = Service::active()
            ->where('parent_slug', $parentSlug)
            ->select(['id', 'slug', 'parent_slug', 'title', 'badge', 'tagline'])
            ->get();

        return Inertia::render('Services/Show', [
            'service' => $service,
            'parentService' => $parentService,
            'siblingServices' => $siblingServices,
        ]);
    }
}
