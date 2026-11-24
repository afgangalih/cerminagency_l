<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // social-media-management, instagram-tiktok-feeds, graphic-design
            $table->string('title'); // Social Media Management, Instagram & TikTok Feeds, Graphic Design
            $table->string('badge'); // Badge kategori (e.g. "RETAINER BULANAN", "KONTEN SINEMATIK 4K", "VISUAL & IDENTITAS BRAND")
            $table->string('tagline'); // Tagline utama
            $table->text('description'); // Penjelasan ringkas layanan
            $table->string('hero_visual_type')->default('dashboard'); // dashboard, reels_phone, canvas_grid
            $table->string('theme_gradient')->default('navy'); // navy, warm_white, cyan
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            // Dynamic Structured Content (Casted as JSON in Eloquent)
            $table->json('scopes'); // 4 Ruang lingkup & deliverables
            $table->json('workflow_steps'); // 3 Tahapan SOP kerja
            $table->json('why_us_points'); // Nilai keunggulan & pembeda Cermin
            $table->json('showcase_items')->nullable(); // Item portofolio terpilih
            $table->json('pricing_packages'); // Tiering paket: Starter, Growth, Dominasi
            $table->json('faqs'); // Tanya jawab teknis klien

            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};

