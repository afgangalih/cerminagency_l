<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            if (!Schema::hasColumn('clients', 'target_audience')) {
                $table->text('target_audience')->nullable()->after('brief_notes');
            }
            if (!Schema::hasColumn('clients', 'transfer_bank')) {
                $table->string('transfer_bank')->nullable()->after('transfer_proof_url');
            }
            if (!Schema::hasColumn('clients', 'cover_url')) {
                $table->text('cover_url')->nullable()->after('drive_vault_url');
            }
        });

        Schema::table('studio_tasks', function (Blueprint $table) {
            if (!Schema::hasColumn('studio_tasks', 'camera_setup')) {
                $table->string('camera_setup')->nullable()->after('shooter');
            }
            if (!Schema::hasColumn('studio_tasks', 'notes')) {
                $table->text('notes')->nullable()->after('shoot_date');
            }
        });
    }

    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropColumn(['target_audience', 'transfer_bank', 'cover_url']);
        });
        Schema::table('studio_tasks', function (Blueprint $table) {
            $table->dropColumn(['camera_setup', 'notes']);
        });
    }
};

