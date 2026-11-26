<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contents', function (Blueprint $table) {
            if (!Schema::hasColumn('contents', 'published_url')) {
                $table->text('published_url')->nullable()->after('drive_raw_url');
            }
            if (!Schema::hasColumn('contents', 'published_at')) {
                $table->timestamp('published_at')->nullable()->after('published_url');
            }
        });
    }

    public function down(): void
    {
        Schema::table('contents', function (Blueprint $table) {
            if (Schema::hasColumn('contents', 'published_at')) {
                $table->dropColumn('published_at');
            }
            if (Schema::hasColumn('contents', 'published_url')) {
                $table->dropColumn('published_url');
            }
        });
    }
};

