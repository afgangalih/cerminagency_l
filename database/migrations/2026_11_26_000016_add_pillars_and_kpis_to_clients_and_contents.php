<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            if (!Schema::hasColumn('clients', 'content_pillars')) {
                $table->json('content_pillars')->nullable()->after('target_audience');
            }
            if (!Schema::hasColumn('clients', 'kpi_targets')) {
                $table->json('kpi_targets')->nullable()->after('content_pillars');
            }
        });

        Schema::table('contents', function (Blueprint $table) {
            if (!Schema::hasColumn('contents', 'pillar')) {
                $table->string('pillar')->nullable()->after('format_type');
            }
        });
    }

    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            if (Schema::hasColumn('clients', 'kpi_targets')) {
                $table->dropColumn('kpi_targets');
            }
            if (Schema::hasColumn('clients', 'content_pillars')) {
                $table->dropColumn('content_pillars');
            }
        });

        Schema::table('contents', function (Blueprint $table) {
            if (Schema::hasColumn('contents', 'pillar')) {
                $table->dropColumn('pillar');
            }
        });
    }
};

