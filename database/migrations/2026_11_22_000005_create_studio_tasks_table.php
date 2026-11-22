<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('studio_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->foreignId('content_id')->nullable()->constrained('contents')->nullOnDelete();
            $table->string('title');
            $table->string('phase')->default('Riset & Naskah'); // 'Riset & Naskah', 'Produksi & Shoot', 'Penyuntingan & Desain', 'Quality Control'
            $table->integer('progress')->default(0); // 0-100
            $table->string('status')->default('Dalam Antrean'); // 'Dalam Antrean', 'Sedang Berjalan', 'Selesai'
            $table->string('shooter')->default('Farhan (Videografer)');
            $table->text('raw_folder_url')->nullable();
            $table->date('shoot_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('studio_tasks');
    }
};

