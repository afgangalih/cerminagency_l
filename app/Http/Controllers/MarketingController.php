<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Invoice;
use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class MarketingController extends Controller
{
    /**
     * Display public landing page.
     */
    public function index(): Response
    {
        $portfolios = Portfolio::active()
            ->with('category:slug,name,short_label')
            ->get();

        $portfolioCategories = PortfolioCategory::active()
            ->withCount(['portfolios' => fn ($query) => $query->where('is_active', true)])
            ->get(['id', 'slug', 'name', 'short_label', 'icon_name', 'service_slug']);

        return Inertia::render('Welcome', [
            'portfolios' => $portfolios,
            'portfolioCategories' => $portfolioCategories,
        ]);
    }

    /**
     * JSON fallback endpoint for landing portfolio showcase (resilient across HMR/partial states).
     */
    public function featuredPortfolios(): JsonResponse
    {
        $portfolios = Portfolio::active()
            ->with('category:slug,name,short_label')
            ->get();

        $portfolioCategories = PortfolioCategory::active()
            ->withCount(['portfolios' => fn ($query) => $query->where('is_active', true)])
            ->get(['id', 'slug', 'name', 'short_label', 'icon_name', 'service_slug']);

        return response()->json([
            'portfolios' => $portfolios,
            'categories' => $portfolioCategories,
        ]);
    }

    /**
     * Handle quick brief submission from landing page.
     */
    public function submitBrief(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'business' => 'required|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'package' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $clientCode = 'CK-' . str_pad((string) (Client::count() + 91), 3, '0', STR_PAD_LEFT);
        $invoiceNumber = 'INV/' . date('Y') . '/CK/' . date('m') . '-' . substr($clientCode, 3);

        $client = Client::create([
            'client_code' => $clientCode,
            'pic_name' => $validated['name'],
            'business_name' => $validated['business'],
            'instagram_handle' => $validated['instagram'] ?? '@brand',
            'email' => $validated['email'],
            'package_name' => $validated['package'],
            'status' => 'Brief Masuk (Belum Bayar)',
            'dp_amount' => 'Rp 4.250.000',
            'total_value' => 'Rp 8.500.000',
            'payment_term' => 'Termin 1 (DP 50%)',
            'invoice_number' => $invoiceNumber,
            'brief_notes' => $validated['notes'] ?? 'Onboarding brief dari landing page.',
            'is_unlocked' => false,
            'pic_assigned' => 'Dimas Pratama (Creative Lead)',
        ]);

        Invoice::create([
            'client_id' => $client->id,
            'invoice_number' => $invoiceNumber,
            'term_type' => 'Termin 1 (DP 50%)',
            'amount' => 'Rp 4.250.000',
            'status' => 'Menunggu Pembayaran',
        ]);

        $waText = urlencode(
            "Halo Tim Cermin Kreatif! 👋\n" .
            "Saya *{$client->pic_name}* dari brand *{$client->business_name}* ({$client->instagram_handle}).\n" .
            "Baru saja mengisi formulir brief awal di platform cerminkreatif.com.\n\n" .
            "📄 No. Faktur Proforma: {$invoiceNumber}\n" .
            "📦 Paket Pilihan: {$client->package_name}\n\n" .
            "Mohon konfirmasi rekening Down Payment (DP) Termin 1 agar kalender kerja & slot syuting Studio Malang segera aktif. Terima kasih!"
        );

        $waUrl = "https://wa.me/6281234567890?text={$waText}";

        return response()->json([
            'success' => true,
            'clientId' => $clientCode,
            'invoiceNumber' => $invoiceNumber,
            'waUrl' => $waUrl,
        ]);
    }
}

