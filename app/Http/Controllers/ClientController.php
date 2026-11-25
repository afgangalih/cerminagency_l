<?php

namespace App\Http\Controllers;

use App\Models\ClientLogo;
use App\Models\ClientStory;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display the dynamic Our Clients / Case Studies page.
     */
    public function index(): Response
    {
        $stories = ClientStory::active()->get();
        $logos = ClientLogo::active()->get(['id', 'name', 'logo_url']);

        return Inertia::render('Clients/Index', [
            'stories' => $stories,
            'logos' => $logos,
        ]);
    }
}

