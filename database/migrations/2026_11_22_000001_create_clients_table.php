<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('client_code')->unique()->nullable(); // e.g. 'CK-091'
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('pic_name');
            $table->string('business_name');
            $table->string('instagram_handle');
            $table->string('email');
            $table->string('phone_whatsapp')->nullable();
            $table->string('package_name')->default('Social Media Retainer Growth');
            $table->integer('reels_used')->default(0);
            $table->integer('reels_max')->default(8);
            $table->integer('posts_used')->default(0);
            $table->integer('posts_max')->default(12);
            $table->string('status')->default('Brief Masuk (Belum Bayar)');
            $table->string('dp_amount')->default('Rp 4.250.000');
            $table->string('total_value')->default('Rp 8.500.000');
            $table->string('payment_term')->default('Termin 1 (DP 50%)');
            $table->text('transfer_proof_url')->nullable();
            $table->string('invoice_number')->default('INV/2026/CK/001');
            $table->text('brief_notes')->nullable();
            $table->boolean('is_unlocked')->default(false); // Gated Access (true when DP verified)
            $table->string('pic_assigned')->default('Dimas Pratama (Creative Lead)');
            $table->text('drive_vault_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};

