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
        Schema::create('portfolio_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('short_label')->nullable();
            $table->string('icon_name')->default('Sparkles');
            $table->string('service_slug')->nullable()->index();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('client_name')->index();
            $table->string('category_slug')->index();
            $table->string('industry');
            $table->string('service_slug')->nullable()->index();
            $table->string('thumbnail_url');
            $table->json('gallery_images')->nullable();
            $table->string('deliverables_summary');
            $table->string('metrics')->nullable();
            $table->text('summary');
            $table->string('external_url')->nullable();
            $table->boolean('is_featured')->default(false);
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
        Schema::dropIfExists('portfolios');
        Schema::dropIfExists('portfolio_categories');
    }
};

