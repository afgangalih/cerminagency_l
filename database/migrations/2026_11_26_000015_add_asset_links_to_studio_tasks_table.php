<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('studio_tasks', function (Blueprint $table) {
            if (!Schema::hasColumn('studio_tasks', 'asset_links')) {
                $table->json('asset_links')->nullable()->after('raw_folder_url');
            }
        });
    }

    public function down(): void
    {
        Schema::table('studio_tasks', function (Blueprint $table) {
            $table->dropColumn('asset_links');
        });
    }
};

