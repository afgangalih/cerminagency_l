<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->string('title');
            $table->string('format_type')->default('Reels / Video Pendek');
            $table->json('platforms')->nullable(); // ['instagram', 'tiktok']
            $table->string('stage')->default('script'); // 'script', 'production', 'review', 'revision', 'scheduled'
            $table->string('status')->default('Draf Naskah');
            $table->string('ball_in_court')->default('agency'); // 'agency', 'client'
            $table->string('version')->default('V1');
            $table->date('publish_date')->nullable();
            $table->integer('day_number')->nullable();
            $table->string('weekday_label')->nullable();
            $table->string('date_label')->nullable();
            $table->text('script_hook')->nullable();
            $table->text('caption')->nullable();
            $table->json('hashtags')->nullable();
            $table->text('media_url')->nullable();
            $table->text('cover_url')->nullable();
            $table->text('drive_raw_url')->nullable();
            $table->integer('revision_count')->default(0);
            $table->integer('max_revisions')->default(2); // Anti-Scope Creep SLA
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};

