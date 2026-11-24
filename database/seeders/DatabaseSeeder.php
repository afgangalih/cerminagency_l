<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use App\Models\Content;
use App\Models\ContentFeedback;
use App\Models\Invoice;
use App\Models\StudioTask;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        $admin = User::create([
            'name' => 'Dimas Pratama',
            'email' => 'admin@cerminkreatif.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'phone_number' => '081234567890',
            'business_name' => 'Cermin Kreatif Studio Malang',
            'instagram_handle' => '@cerminkreatif',
        ]);

        // 2. Client 1: Maven Coffee Roasters
        $userMaven = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@mavencoffee.id',
            'password' => Hash::make('password123'),
            'role' => 'client',
            'phone_number' => '081298765432',
            'business_name' => 'Maven Coffee Roasters',
            'instagram_handle' => '@mavencoffee',
        ]);

        $clientMaven = Client::create([
            'client_code' => 'CK-091',
            'user_id' => $userMaven->id,
            'pic_name' => 'Budi Santoso',
            'business_name' => 'Maven Coffee Roasters',
            'instagram_handle' => '@mavencoffee',
            'email' => 'budi@mavencoffee.id',
            'phone_whatsapp' => '081298765432',
            'package_name' => 'Growth Video (12 Reels + 8 Post)',
            'reels_used' => 4,
            'reels_max' => 12,
            'posts_used' => 3,
            'posts_max' => 8,
            'status' => 'Menunggu Verifikasi DP',
            'dp_amount' => 'Rp 6.500.000',
            'total_value' => 'Rp 13.000.000',
            'payment_term' => 'Termin 1 (DP 50%)',
            'transfer_proof_url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
            'invoice_number' => 'INV/2026/CK/10-091',
            'brief_notes' => 'Fokus branding coffee beans specialty ke pasar anak muda Jabodetabek & Surabaya.',
            'is_unlocked' => false,
            'pic_assigned' => 'Dimas (Creative Lead)',
            'drive_vault_url' => 'https://drive.google.com',
        ]);

        // 3. Client 2: Lumen Skin Clinic (Unlocked)
        $userLumen = User::create([
            'name' => 'Sarah Wijaya',
            'email' => 'sarah@lumenskin.com',
            'password' => Hash::make('password123'),
            'role' => 'client',
            'phone_number' => '081345678901',
            'business_name' => 'Lumen Skin Clinic',
            'instagram_handle' => '@lumenskin.id',
        ]);

        $clientLumen = Client::create([
            'client_code' => 'CK-092',
            'user_id' => $userLumen->id,
            'pic_name' => 'Sarah Wijaya',
            'business_name' => 'Lumen Skin Clinic',
            'instagram_handle' => '@lumenskin.id',
            'email' => 'sarah@lumenskin.com',
            'phone_whatsapp' => '081345678901',
            'package_name' => 'Full Retainer Social Media & Ads Creative',
            'reels_used' => 8,
            'reels_max' => 20,
            'posts_used' => 10,
            'posts_max' => 12,
            'status' => 'Aktif Resmi (Lunas DP)',
            'dp_amount' => 'Rp 12.000.000',
            'total_value' => 'Rp 24.000.000',
            'payment_term' => 'Termin 1 Lunas, Termin 2 Berjalan',
            'transfer_proof_url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
            'invoice_number' => 'INV/2026/CK/10-088',
            'brief_notes' => 'Butuh konten edukasi dokter kulit, 8 video cinematic studio shooting.',
            'is_unlocked' => true,
            'pic_assigned' => 'Farhan (Video Director)',
            'drive_vault_url' => 'https://drive.google.com',
        ]);

        // 4. Client 3: Arche Studio Apparel
        $userArche = User::create([
            'name' => 'Dimas Ardiansyah',
            'email' => 'dimas@arche.co',
            'password' => Hash::make('password123'),
            'role' => 'client',
            'phone_number' => '081122334455',
            'business_name' => 'Arche Studio Apparel',
            'instagram_handle' => '@arche.apparel',
        ]);

        $clientArche = Client::create([
            'client_code' => 'CK-093',
            'user_id' => $userArche->id,
            'pic_name' => 'Dimas Ardiansyah',
            'business_name' => 'Arche Studio Apparel',
            'instagram_handle' => '@arche.apparel',
            'email' => 'dimas@arche.co',
            'phone_whatsapp' => '081122334455',
            'package_name' => 'Starter Video (4 Reels Shoot)',
            'reels_used' => 1,
            'reels_max' => 4,
            'posts_used' => 0,
            'posts_max' => 0,
            'status' => 'Brief Masuk (Belum Bayar)',
            'dp_amount' => 'Rp 3.500.000',
            'total_value' => 'Rp 7.000.000',
            'payment_term' => 'Belum DP',
            'transfer_proof_url' => null,
            'invoice_number' => 'INV/2026/CK/10-094',
            'brief_notes' => 'Luncurkan produk jaket parasut waterproof outdoor.',
            'is_unlocked' => false,
            'pic_assigned' => 'Belum Ditugaskan',
            'drive_vault_url' => 'https://drive.google.com',
        ]);

        // 5. Invoices
        Invoice::create([
            'client_id' => $clientMaven->id,
            'invoice_number' => 'INV/2026/CK/10-091',
            'term_type' => 'Termin 1 (DP 50%)',
            'amount' => 'Rp 6.500.000',
            'status' => 'Menunggu Verifikasi',
            'transfer_proof_url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
        ]);

        Invoice::create([
            'client_id' => $clientLumen->id,
            'invoice_number' => 'INV/2026/CK/10-088',
            'term_type' => 'Termin 1 (DP 50%)',
            'amount' => 'Rp 12.000.000',
            'status' => 'Lunas',
            'transfer_proof_url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
            'verified_at' => now(),
            'verified_by' => $admin->id,
        ]);

        // 6. Contents for Maven Coffee
        $c1 = Content::create([
            'client_id' => $clientMaven->id,
            'title' => 'Reels: Behind The Scenes Studio & Shoot Gear',
            'format_type' => 'Reels / Video Pendek',
            'platforms' => ['instagram', 'tiktok'],
            'stage' => 'review',
            'status' => 'Menunggu Review',
            'ball_in_court' => 'client',
            'version' => 'V1',
            'publish_date' => '2026-10-05',
            'day_number' => 5,
            'weekday_label' => 'Senin',
            'date_label' => '05 Okt',
            'script_hook' => 'Rahasia lighting sinematik tim Cermin Kreatif saat shoot produk coffee specialty lokal',
            'caption' => 'Rahasia lighting sinematik tim Cermin Kreatif saat shoot produk coffee specialty lokal 🔥 Simak breakdown lengkapnya!',
            'hashtags' => ['#cerminkreatif', '#videoproduction', '#coffeereels'],
            'media_url' => 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
            'cover_url' => 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
            'revision_count' => 0,
            'max_revisions' => 2,
            'created_by' => $admin->id,
        ]);
        ContentFeedback::create([
            'content_id' => $c1->id,
            'sender_name' => 'Agensi',
            'sender_role' => 'Creative Lead',
            'feedback_text' => 'Draf V1 diunggah oleh Creative Lead',
        ]);

        $c2 = Content::create([
            'client_id' => $clientMaven->id,
            'title' => 'Carousel Edukasi: 3 Kesalahan Hook Video TikTok',
            'format_type' => 'Instagram Carousel',
            'platforms' => ['instagram'],
            'stage' => 'scheduled',
            'status' => 'Disetujui',
            'ball_in_court' => 'agency',
            'version' => 'V2 (Final Approved)',
            'publish_date' => '2026-10-12',
            'day_number' => 12,
            'weekday_label' => 'Senin',
            'date_label' => '12 Okt',
            'script_hook' => 'Jangan buang 3 detik pertama audiens Anda!',
            'caption' => 'Jangan buang 3 detik pertama audiens Anda! Berikut riset retensi audiens dari 50+ video viral.',
            'hashtags' => ['#socialmediatips', '#hookvideo', '#mavencoffee'],
            'media_url' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
            'cover_url' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
            'revision_count' => 1,
            'max_revisions' => 2,
            'created_by' => $admin->id,
        ]);
        ContentFeedback::create([
            'content_id' => $c2->id,
            'sender_name' => 'Klien',
            'sender_role' => 'Klien',
            'feedback_text' => 'Tolong pertegas font di cover slide depan',
        ]);
        ContentFeedback::create([
            'content_id' => $c2->id,
            'sender_name' => 'Agensi',
            'sender_role' => 'Tim Agensi',
            'feedback_text' => 'Font diperbaiki dan warna disesuaikan brand kit',
        ]);
        ContentFeedback::create([
            'content_id' => $c2->id,
            'sender_name' => 'Klien',
            'sender_role' => 'Klien',
            'feedback_text' => 'Visual slide 2 disetujui, siap tayang.',
        ]);

        $c3 = Content::create([
            'client_id' => $clientMaven->id,
            'title' => 'Product Launching: Promo Flash Sale Weekend Beans',
            'format_type' => 'Single Post High-Res',
            'platforms' => ['instagram'],
            'stage' => 'revision',
            'status' => 'Perlu Revisi',
            'ball_in_court' => 'agency',
            'version' => 'V1',
            'publish_date' => '2026-10-16',
            'day_number' => 16,
            'weekday_label' => 'Jumat',
            'date_label' => '16 Okt',
            'caption' => 'Diskon terbatas menyambut peluncuran koleksi single origin musim ini. Dapatkan potongan 30%!',
            'media_url' => 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80',
            'cover_url' => 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80',
            'revision_count' => 1,
            'max_revisions' => 2,
            'created_by' => $admin->id,
        ]);
        ContentFeedback::create([
            'content_id' => $c3->id,
            'sender_name' => 'Klien',
            'sender_role' => 'Klien',
            'feedback_text' => 'Tolong ganti logo di pojok kanan bawah dengan versi monochrome putih.',
        ]);

        $c4 = Content::create([
            'client_id' => $clientMaven->id,
            'title' => 'Founder Interview: Filosofi Roasting & Standar QC',
            'format_type' => 'TikTok & Reels',
            'platforms' => ['instagram', 'tiktok', 'youtube_shorts'],
            'stage' => 'scheduled',
            'status' => 'Disetujui',
            'ball_in_court' => 'agency',
            'version' => 'V1 (Final Approved)',
            'publish_date' => '2026-10-21',
            'day_number' => 21,
            'weekday_label' => 'Rabu',
            'date_label' => '21 Okt',
            'caption' => 'Mengapa bahan baku specialty beans menjadi pembeda utama brand kami di pasaran.',
            'media_url' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
            'cover_url' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
            'revision_count' => 0,
            'max_revisions' => 2,
            'created_by' => $admin->id,
        ]);

        $c5 = Content::create([
            'client_id' => $clientMaven->id,
            'title' => 'Customer Story: Testimoni & Review Pemakaian Home Brewer',
            'format_type' => 'TikTok & Story Video',
            'platforms' => ['tiktok'],
            'stage' => 'production',
            'status' => 'Sedang Edit',
            'ball_in_court' => 'agency',
            'version' => 'Draf Naskah',
            'publish_date' => '2026-10-26',
            'day_number' => 26,
            'weekday_label' => 'Senin',
            'date_label' => '26 Okt',
            'caption' => 'Bagaimana penikmat kopi rumahan scale-up rasa seduhannya dengan tips gilingan presisi.',
            'media_url' => 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
            'cover_url' => 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
            'revision_count' => 0,
            'max_revisions' => 2,
            'created_by' => $admin->id,
        ]);

        // Contents for Lumen Skin Clinic
        Content::create([
            'client_id' => $clientLumen->id,
            'title' => 'Treatment Glow: Eksplanasi Dokter SpKK Klinis',
            'format_type' => 'Reels / Video Pendek',
            'platforms' => ['instagram', 'tiktok'],
            'stage' => 'review',
            'status' => 'Menunggu Review',
            'ball_in_court' => 'client',
            'version' => 'V1',
            'publish_date' => '2026-10-18',
            'day_number' => 18,
            'weekday_label' => 'Minggu',
            'date_label' => '18 Okt',
            'caption' => 'Mitos vs Fakta laser wajah: apa yang wajib dihindari sebelum perawatan klinis?',
            'media_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
            'cover_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
            'revision_count' => 0,
            'max_revisions' => 2,
            'created_by' => $admin->id,
        ]);

        // 7. Video Production Tasks (Studio Malang)
        StudioTask::create([
            'client_id' => $clientMaven->id,
            'title' => 'Concept Scripting 5 Reels Viral',
            'phase' => 'Riset & Naskah',
            'progress' => 100,
            'status' => 'Selesai',
            'shooter' => 'Dimas (Creative Lead)',
            'raw_folder_url' => 'https://drive.google.com',
        ]);
        StudioTask::create([
            'client_id' => $clientMaven->id,
            'title' => 'Shooting Session Batch 1 (Studio Malang)',
            'phase' => 'Produksi & Shoot',
            'progress' => 100,
            'status' => 'Selesai',
            'shooter' => 'Farhan & Tim',
            'raw_folder_url' => 'https://drive.google.com',
        ]);
        StudioTask::create([
            'client_id' => $clientMaven->id,
            'title' => 'Rough Cut Editing 3 Video TikTok',
            'phase' => 'Penyuntingan & Desain',
            'progress' => 65,
            'status' => 'Sedang Berjalan',
            'shooter' => 'Reza Editor',
            'raw_folder_url' => 'https://drive.google.com',
        ]);
        StudioTask::create([
            'client_id' => $clientMaven->id,
            'title' => 'Sound Design & Subtitle Hook Final',
            'phase' => 'Quality Control',
            'progress' => 20,
            'status' => 'Dalam Antrean',
            'shooter' => 'Dimas Lead',
            'raw_folder_url' => 'https://drive.google.com',
        ]);
        StudioTask::create([
            'client_id' => $clientLumen->id,
            'title' => 'Shooting Dokter Kulit Episode 1-4',
            'phase' => 'Produksi & Shoot',
            'progress' => 100,
            'status' => 'Selesai',
            'shooter' => 'Farhan',
            'raw_folder_url' => 'https://drive.google.com',
        ]);

        // 8. Public Dynamic Services
        $this->call(ServiceSeeder::class);
    }
}
