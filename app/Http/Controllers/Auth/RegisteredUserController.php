<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'client',
        ]);

        // Auto-link with existing Brief/Client record by email, or create a locked onboarding Client
        $client = Client::where('email', $user->email)->whereNull('user_id')->first();

        if ($client) {
            $client->update(['user_id' => $user->id]);
            $user->update([
                'business_name' => $client->business_name,
                'instagram_handle' => $client->instagram_handle,
            ]);
        } elseif (!Client::where('user_id', $user->id)->exists()) {
            $clientCode = 'CK-' . str_pad((string) (Client::count() + 91), 3, '0', STR_PAD_LEFT);
            $invoiceNumber = 'INV/' . date('Y') . '/CK/' . date('m') . '-' . substr($clientCode, 3);

            $client = Client::create([
                'client_code' => $clientCode,
                'user_id' => $user->id,
                'pic_name' => $user->name,
                'business_name' => $user->name . ' Brand',
                'instagram_handle' => '@brand',
                'email' => $user->email,
                'package_name' => 'Growth Video (12 Reels + 8 Post)',
                'reels_used' => 0,
                'reels_max' => 12,
                'posts_used' => 0,
                'posts_max' => 8,
                'status' => 'Brief Masuk (Belum Bayar)',
                'dp_amount' => 'Rp 6.500.000',
                'total_value' => 'Rp 13.000.000',
                'payment_term' => 'Termin 1 (DP 50%)',
                'invoice_number' => $invoiceNumber,
                'brief_notes' => 'Registrasi mandiri melalui portal. Menunggu diskusi & kesepakatan paket.',
                'is_unlocked' => false,
                'pic_assigned' => 'Dimas Pratama (Creative Lead)',
            ]);

            Invoice::create([
                'client_id' => $client->id,
                'invoice_number' => $invoiceNumber,
                'term_type' => 'Termin 1 (DP 50%)',
                'amount' => 'Rp 6.500.000',
                'status' => 'Menunggu Pembayaran',
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
