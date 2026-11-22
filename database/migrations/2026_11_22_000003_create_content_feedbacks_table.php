<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')->constrained('contents')->cascadeOnDelete();
            $table->string('sender_name');
            $table->string('sender_role')->default('Klien');
            $table->text('feedback_text');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_feedbacks');
    }
};

