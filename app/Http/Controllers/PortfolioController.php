<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Allowed items per page options matching 4-column grid layout.
     */
    private const ALLOWED_PER_PAGE = [12, 16, 24, 32];

    /**
     * Display the dynamic public portfolio showcase page.
     */
    public function index(Request $request): Response
    {
        $category = $request->string('category', 'all')->trim()->toString();
        $search = $request->string('search', '')->trim()->toString();
        $requestedPerPage = $request->integer('per_page', 12);

        $perPage = in_array($requestedPerPage, self::ALLOWED_PER_PAGE, true)
            ? $requestedPerPage
            : 12;

        $portfolios = Portfolio::active()
            ->with('category:slug,name,short_label')
            ->filter([
                'category' => $category,
                'search' => $search,
            ])
            ->paginate($perPage)
            ->withQueryString();

        $categories = PortfolioCategory::active()
            ->withCount(['portfolios' => fn ($query) => $query->where('is_active', true)])
            ->get(['id', 'slug', 'name', 'short_label', 'icon_name', 'service_slug']);

        $totalActiveCount = Portfolio::where('is_active', true)->count();

        $services = Service::main()
            ->get(['id', 'slug', 'title']);

        return Inertia::render('Portfolio/Index', [
            'portfolios' => $portfolios,
            'categories' => $categories,
            'totalActiveCount' => $totalActiveCount,
            'services' => $services,
            'filters' => [
                'category' => $category !== '' ? $category : 'all',
                'search' => $search,
                'per_page' => $perPage,
            ],
            'perPageOptions' => self::ALLOWED_PER_PAGE,
        ]);
    }
}

