<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agency_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->nullable()->constrained('clients')->nullOnDelete();
            $table->string('title');
            $table->string('short_title')->nullable();
            $table->string('category')->default('Studio Shoot');
            $table->string('brand_name');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('time_label')->default('10:00 WIB');
            $table->string('location')->default('Studio Cermin Malang');
            $table->string('pic_name')->default('Dimas Pratama');
            $table->string('deliverable')->nullable();
            $table->text('image_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agency_events');
    }
};

