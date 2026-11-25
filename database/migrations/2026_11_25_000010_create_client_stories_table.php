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
        Schema::create('client_stories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('client_name');
            $table->string('logo_url');
            $table->string('cover_image_url');
            $table->string('industry');
            $table->text('summary');
            $table->text('challenge');
            $table->text('solution');
            $table->string('deliverables');
            $table->string('metrics')->nullable();
            $table->string('service_slug')->nullable()->index();
            $table->boolean('is_featured')->default(true);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('client_logos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo_url');
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
        Schema::dropIfExists('client_logos');
        Schema::dropIfExists('client_stories');
    }
};

