<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientPortalController;
use App\Http\Controllers\MarketingController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes — Cermin Kreatif Agency Architecture
|--------------------------------------------------------------------------
*/

// ============================================================================
// 1. PUBLIC MARKETING & BRIEF ROUTES
// ============================================================================
Route::get('/', [MarketingController::class, 'index'])->name('home');
Route::get('/api/portfolios/featured', [MarketingController::class, 'featuredPortfolios'])->name('api.portfolios.featured');
Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio.index');
Route::get('/our-clients', [ClientController::class, 'index'])->name('clients.index');
Route::get('/services/{slug}', [\App\Http\Controllers\ServiceController::class, 'show'])->name('services.show');
Route::get('/services/{parentSlug}/{subSlug}', [\App\Http\Controllers\ServiceController::class, 'subShow'])->name('services.sub');
Route::post('/brief/submit', [MarketingController::class, 'submitBrief'])->name('brief.submit');

// ============================================================================
// 2. CLIENT PORTAL ROUTES (Protected: Requires Authenticated User)
// ============================================================================
Route::middleware(['auth'])->group(function () {
    Route::get('/portal', [ClientPortalController::class, 'index'])->name('portal');
    Route::post('/portal/contents/{content}/approve', [ClientPortalController::class, 'approveContent'])->name('portal.contents.approve');
    Route::post('/portal/contents/{content}/revision', [ClientPortalController::class, 'requestRevision'])->name('portal.contents.revision');
    Route::post('/portal/contents/request', [ClientPortalController::class, 'submitClientRequest'])->name('portal.contents.request');
});

// ============================================================================
// 3. ADMIN COMMAND CENTER ROUTES (Protected: Requires Auth + Admin Role)
// ============================================================================
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminDashboardController::class, 'index'])->name('admin');

    // Clients CRUD
    Route::post('/admin/clients', [AdminDashboardController::class, 'storeClient'])->name('admin.clients.store');
    Route::patch('/admin/clients/{client}', [AdminDashboardController::class, 'updateClient'])->name('admin.clients.update');
    Route::delete('/admin/clients/{client}', [AdminDashboardController::class, 'destroyClient'])->name('admin.clients.destroy');

    // Contents Operations
    Route::post('/admin/contents', [AdminDashboardController::class, 'storeContent'])->name('admin.contents.store');
    Route::post('/admin/contents/{content}/move-stage', [AdminDashboardController::class, 'moveContentStage'])->name('admin.contents.move-stage');
    Route::post('/admin/contents/{content}/submit-revision-fix', [AdminDashboardController::class, 'submitRevisionFix'])->name('admin.contents.submit-revision-fix');
    Route::delete('/admin/contents/{content}', [AdminDashboardController::class, 'destroyContent'])->name('admin.contents.destroy');

    // Billing & Access
    Route::post('/admin/clients/{client}/verify-payment', [AdminDashboardController::class, 'verifyClientPayment'])->name('admin.clients.verify-payment');
    Route::post('/admin/clients/{client}/add-quota', [AdminDashboardController::class, 'addQuota'])->name('admin.clients.add-quota');

    // Studio Production Tasks
    Route::post('/admin/studio-tasks', [AdminDashboardController::class, 'storeStudioTask'])->name('admin.studio-tasks.store');
    Route::patch('/admin/studio-tasks/{studioTask}', [AdminDashboardController::class, 'updateStudioTask'])->name('admin.studio-tasks.update');
    Route::delete('/admin/studio-tasks/{studioTask}', [AdminDashboardController::class, 'destroyStudioTask'])->name('admin.studio-tasks.destroy');
});

// ============================================================================
// 4. BREEZE DASHBOARD & PROFILE
// ============================================================================
Route::get('/dashboard', function () {
    $user = auth()->user();
    if ($user && $user->isAdmin()) {
        return redirect()->route('admin');
    }
    return redirect()->route('portal');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
