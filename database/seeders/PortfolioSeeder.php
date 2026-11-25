<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'slug' => 'social-media-management',
                'name' => 'Social Media Management',
                'short_label' => 'Social Media Management',
                'icon_name' => 'Share2',
                'service_slug' => 'social-media-management',
                'sort_order' => 1,
            ],
            [
                'slug' => 'instagram-tiktok-feeds',
                'name' => 'Instagram & TikTok Feeds',
                'short_label' => 'IG & TikTok Feeds',
                'icon_name' => 'Video',
                'service_slug' => 'instagram-tiktok-feeds',
                'sort_order' => 2,
            ],
            [
                'slug' => 'graphic-design',
                'name' => 'Graphic Design',
                'short_label' => 'Graphic Design',
                'icon_name' => 'Palette',
                'service_slug' => 'graphic-design',
                'sort_order' => 3,
            ],
            [
                'slug' => 'reels-short-video',
                'name' => 'Reels & Video 9:16',
                'short_label' => 'Reels & Video 9:16',
                'icon_name' => 'Film',
                'service_slug' => 'instagram-tiktok-feeds',
                'sort_order' => 4,
            ],
            [
                'slug' => 'grid-feed-carousel',
                'name' => 'Grid Feed 3x3 & Carousel',
                'short_label' => 'Grid Feed & Carousel',
                'icon_name' => 'LayoutGrid',
                'service_slug' => 'graphic-design',
                'sort_order' => 5,
            ],
            [
                'slug' => 'studio-production',
                'name' => 'Produksi Studio Malang',
                'short_label' => 'Studio Malang',
                'icon_name' => 'Camera',
                'service_slug' => 'instagram-tiktok-feeds',
                'sort_order' => 6,
            ],
            [
                'slug' => 'brand-campaign',
                'name' => 'Brand Campaign',
                'short_label' => 'Brand Campaign',
                'icon_name' => 'Megaphone',
                'service_slug' => 'social-media-management',
                'sort_order' => 7,
            ],
        ];

        foreach ($categories as $cat) {
            PortfolioCategory::updateOrCreate(
                ['slug' => $cat['slug']],
                $cat + ['is_active' => true]
            );
        }

        $portfolios = [
            // --- Social Media Management ---
            [
                'slug' => 'maven-coffee-roasters-smm',
                'title' => 'Retainer Instagram & Kalender Konten Maven',
                'client_name' => 'Maven Coffee Roasters',
                'category_slug' => 'social-media-management',
                'industry' => 'Specialty Coffee & F&B',
                'service_slug' => 'social-media-management',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&auto=format&fit=crop&q=80',
                    '/images/about/studio-workspace.jpg',
                ],
                'deliverables_summary' => '12 Reels + 12 Grid Feed / Bulan',
                'metrics' => '142K+ Reach Organik',
                'summary' => 'Pengelolaan akun Instagram menyeluruh mulai dari perancangan content pillar edukasi manual brew, jadwal posting prime-time, hingga evaluasi insight bulanan via Client Portal.',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'lumen-skin-clinic-smm',
                'title' => 'Manajemen Edukasi Medis & Jadwal Konten',
                'client_name' => 'Lumen Skin Clinic',
                'category_slug' => 'social-media-management',
                'industry' => 'Beauty & Estetika Medis',
                'service_slug' => 'social-media-management',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&auto=format&fit=crop&q=80',
                    '/images/about/studio-room.jpg',
                ],
                'deliverables_summary' => '20 Konten Edukasi Dokter + Admin DM',
                'metrics' => '89K+ Interaksi Audiens',
                'summary' => 'Menjaga kredibilitas klinik kecantikan dengan narasi medis yang mudah dipahami pasien, kalender editorial 30 hari, serta manajemen komentar dan konsultasi DM awal.',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'arche-food-collective-smm',
                'title' => 'Komunitas Kuliner & Storytelling Fanpage',
                'client_name' => 'Arche Food Collective',
                'category_slug' => 'social-media-management',
                'industry' => 'Hospitality & Dining',
                'service_slug' => 'social-media-management',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '24 Konten Terjadwal IG & Facebook',
                'metrics' => '+180% Kunjungan Profil',
                'summary' => 'Sinkronisasi konten Instagram dan Facebook Page untuk memperluas reservasi grup dan keluarga pada akhir pekan melalui copywriting persuasif dan foto menu kurasi studio.',
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'slug' => 'surya-medika-hospital-smm',
                'title' => 'Layanan Informasi Kesehatan Terstruktur',
                'client_name' => 'RS Surya Medika Malang',
                'category_slug' => 'social-media-management',
                'industry' => 'Healthcare & Hospital',
                'service_slug' => 'social-media-management',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '16 Carousel Kesehatan + 8 Reels Dokter',
                'metrics' => '3.4x Peningkatan Save Post',
                'summary' => 'Transformasi komunikasi rumah sakit menjadi informatif dan ramah pembaca dengan sistem review berlapis di Client Portal Cermin.',
                'is_featured' => false,
                'sort_order' => 4,
            ],

            // --- Instagram & TikTok Feeds ---
            [
                'slug' => 'arche-streetwear-lookbook-feeds',
                'title' => 'Lookbook Video Vertikal 9:16 Musim Baru',
                'client_name' => 'Arche Streetwear & Denim',
                'category_slug' => 'instagram-tiktok-feeds',
                'industry' => 'Urban Fashion & Apparel',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '10 Reels Lookbook 4K 60fps',
                'metrics' => '2.4x Konversi Katalog',
                'summary' => 'Produksi video vertikal beritme cepat untuk peluncuran koleksi denim, lengkap dengan sound design berlisensi komersial dan color grading filmik.',
                'is_featured' => true,
                'sort_order' => 5,
            ],
            [
                'slug' => 'daily-matcha-house-feeds',
                'title' => 'Produksi Menu Seasonal Reels & TikTok',
                'client_name' => 'The Daily Matcha House',
                'category_slug' => 'instagram-tiktok-feeds',
                'industry' => 'Kafe Modern & Pastry',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '8 Reels ASMR + Table-top Macro',
                'metrics' => '95K+ Views Organik',
                'summary' => 'Pengambilan gambar makro tekstur minuman dan pastry dengan tata cahaya studio terkendali untuk menggugah selera audiens dalam 3 detik pertama.',
                'is_featured' => true,
                'sort_order' => 6,
            ],
            [
                'slug' => 'seruni-bakery-feeds',
                'title' => 'Kampanye Video Ramadhan & Hampers',
                'client_name' => 'Seruni Artisan Bakery',
                'category_slug' => 'instagram-tiktok-feeds',
                'industry' => 'Bakery & Patisserie',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '12 Video Unboxing & Storyboard Promo',
                'metrics' => 'Sold Out Batch 1-3',
                'summary' => 'Seri video pendek untuk lini hampers musiman dengan alur hook visual kemasan dan detail produk di dalam studio Malang.',
                'is_featured' => false,
                'sort_order' => 7,
            ],
            [
                'slug' => 'kala-gelato-malang-feeds',
                'title' => 'Short Video Series Varian Rasa Baru',
                'client_name' => 'Kala Gelato Malang',
                'category_slug' => 'instagram-tiktok-feeds',
                'industry' => 'Dessert & Gelato Bar',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '8 TikTok & IG Reels + Story Polling',
                'metrics' => '68K+ Penayangan Lokal',
                'summary' => 'Konten POV pelanggan dan behind-the-counter yang dikemas ringan untuk meningkatkan foot-traffic gerai di area Malang Raya.',
                'is_featured' => false,
                'sort_order' => 8,
            ],

            // --- Graphic Design ---
            [
                'slug' => 'kopi-padas-visual-identity',
                'title' => 'Identitas Visual Kemasan & Feed 3x3',
                'client_name' => 'Kopi Padas Nusantara',
                'category_slug' => 'graphic-design',
                'industry' => 'Roastery & Retail Beans',
                'service_slug' => 'graphic-design',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => 'Desain Grid 3x3 + Label Packaging',
                'metrics' => 'Visual Guideline Konsisten',
                'summary' => 'Penyusunan sistem tipografi, palet warna bumi, serta template carousel edukasi asal biji kopi nusantara untuk lini ritel nasional.',
                'is_featured' => true,
                'sort_order' => 9,
            ],
            [
                'slug' => 'nusa-architect-studio-design',
                'title' => 'Katalog Digital & Portfolio Feed Arsitektur',
                'client_name' => 'Nusa Ruang Studio',
                'category_slug' => 'graphic-design',
                'industry' => 'Architecture & Interior',
                'service_slug' => 'graphic-design',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '18 Slide Carousel Proyek + Highlight Icons',
                'metrics' => 'Kenaikan Lead Konsultasi Desain',
                'summary' => 'Penataan layout editorial minimalis pada feed Instagram agar foto render dan hasil bangun proyek tampil seperti majalah arsitektur.',
                'is_featured' => false,
                'sort_order' => 10,
            ],
            [
                'slug' => 'senja-skincare-lab-design',
                'title' => 'Desain Infografis Kandungan Aktif & Cover Reels',
                'client_name' => 'Senja Botanical Lab',
                'category_slug' => 'graphic-design',
                'industry' => 'Skincare Local Brand',
                'service_slug' => 'graphic-design',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '15 Post Produk + 10 Cover Reels',
                'metrics' => 'Rasio Simpan Tinggi',
                'summary' => 'Desain grafis bersih dengan ilustrasi bahan aktif dan hierarki tipografi yang mudah dibaca pada layar ponsel.',
                'is_featured' => false,
                'sort_order' => 11,
            ],
            [
                'slug' => 'bintang-edutech-visual',
                'title' => 'Sistem Desain Konten Akademik & Event',
                'client_name' => 'Bintang Edukasi Indonesia',
                'category_slug' => 'graphic-design',
                'industry' => 'Education & Course',
                'service_slug' => 'graphic-design',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => 'Kit Grafis Webinar & 20 Carousel Tips',
                'metrics' => 'Konsistensi Lintas Channel',
                'summary' => 'Membangun identitas visual edukatif yang segar dan terstruktur agar mudah dikenali oleh audiens mahasiswa dan profesional muda.',
                'is_featured' => false,
                'sort_order' => 12,
            ],

            // --- Reels & Video 9:16 ---
            [
                'slug' => 'djelajah-outdoor-reels',
                'title' => 'Cinematic Gear Test & Outdoor Reels',
                'client_name' => 'Djelajah Outdoor Living',
                'category_slug' => 'reels-short-video',
                'industry' => 'Peralatan Petualang & Apparel',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '8 Video 9:16 On-Location + Studio Detail',
                'metrics' => 'Masuk Explore & FYP Organik',
                'summary' => 'Eksplorasi ketahanan perlengkapan outdoor dengan transisi dinamis dan audio atmosferik berlisensi komersial.',
                'is_featured' => true,
                'sort_order' => 13,
            ],
            [
                'slug' => 'karsa-automotive-detailing',
                'title' => 'Before-After Detailing Video 4K 60fps',
                'client_name' => 'Karsa Auto Detailing',
                'category_slug' => 'reels-short-video',
                'industry' => 'Automotive Care',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '10 Reels Transisi + Sound Design',
                'metrics' => '210K+ Total Video Plays',
                'summary' => 'Menangkap kilau coating cat kendaraan dengan pencahayaan studio terarah dan tempo editing sinkron ketukan musik.',
                'is_featured' => false,
                'sort_order' => 14,
            ],
            [
                'slug' => 'velora-jewelry-macro-reels',
                'title' => 'Macro Showcase Perhiasan Perak & Emas',
                'client_name' => 'Velora Fine Jewelry',
                'category_slug' => 'reels-short-video',
                'industry' => 'Jewelry & Accessories',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '6 Video Makro 9:16 + Color Grading',
                'metrics' => 'Kenaikan Klik Katalog WA',
                'summary' => 'Pengambilan gambar lensa makro di Studio Cermin Malang untuk menonjolkan detail potongan batu dan kilau logam mulia.',
                'is_featured' => false,
                'sort_order' => 15,
            ],

            // --- Grid Feed 3x3 & Carousel ---
            [
                'slug' => 'terracotta-home-living-grid',
                'title' => 'Puzzle Grid 3x3 & Katalog Keramik',
                'client_name' => 'Terracotta Home & Living',
                'category_slug' => 'grid-feed-carousel',
                'industry' => 'Home Decor & Craft',
                'service_slug' => 'graphic-design',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '9-Grid Harmonis + 6 Carousel Care Guide',
                'metrics' => 'Profil Rapi & Kohesif',
                'summary' => 'Merancang komposisi feed 3x3 bersambung agar pengunjung baru langsung merasakan kehangatan estetika produk dekorasi rumah.',
                'is_featured' => false,
                'sort_order' => 16,
            ],
            [
                'slug' => 'meraki-fitness-hub-carousel',
                'title' => 'Seri Carousel Panduan Latihan & Nutrisi',
                'client_name' => 'Meraki Wellness Studio',
                'category_slug' => 'grid-feed-carousel',
                'industry' => 'Fitness & Pilates',
                'service_slug' => 'graphic-design',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '12 Carousel Edukasi + Story Jadwal Kelas',
                'metrics' => '+140% Pendaftaran Trial',
                'summary' => 'Visualisasi langkah latihan pilates dan jadwal kelas mingguan dengan gaya desain yang bersih dan enerjik.',
                'is_featured' => false,
                'sort_order' => 17,
            ],
            [
                'slug' => 'aluna-tea-atelier-grid',
                'title' => 'Editorial Feed & Storytelling Teh Artisan',
                'client_name' => 'Aluna Tea Atelier',
                'category_slug' => 'grid-feed-carousel',
                'industry' => 'Artisan Tea & Beverage',
                'service_slug' => 'graphic-design',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '15 Post Feed + Highlight Icons',
                'metrics' => 'Peningkatan Brand Recall',
                'summary' => 'Kombinasi fotografi produk bertekstur alami dengan tipografi serif elegan untuk segmen teh premium.',
                'is_featured' => false,
                'sort_order' => 18,
            ],

            // --- Produksi Studio Malang ---
            [
                'slug' => 'cermin-studio-talkshow-set',
                'title' => 'Produksi Video Podcast & Edukasi Founder',
                'client_name' => 'Pustaka Digital Malang',
                'category_slug' => 'studio-production',
                'industry' => 'Media & Digital Tech',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => '/images/about/studio-room.jpg',
                'gallery_images' => [
                    '/images/about/studio-room.jpg',
                    '/images/about/studio-workspace.jpg',
                ],
                'deliverables_summary' => '8 Episode Video Vertikal Multi-Cam',
                'metrics' => 'Syuting 1 Hari Selesai 1 Bulan Konten',
                'summary' => 'Sesi syuting terpadu di Studio Fisik Cermin Malang menggunakan multi-kamera 4K, tata cahaya kunci terkalibrasi, dan audio nirkabel jernih.',
                'is_featured' => true,
                'sort_order' => 19,
            ],
            [
                'slug' => 'studio-shoot-katalog-fnb',
                'title' => 'Sesi Foto & Video Produk Kemasan Studio',
                'client_name' => 'Sari Rasa Nusantara',
                'category_slug' => 'studio-production',
                'industry' => 'Packaged Food & Snack',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => '/images/about/studio-workspace.jpg',
                'gallery_images' => [
                    '/images/about/studio-workspace.jpg',
                    '/images/about/studio-team.jpg',
                ],
                'deliverables_summary' => '30 Foto Katalog + 6 Video Promo',
                'metrics' => 'Siap Pakai E-Commerce & IG',
                'summary' => 'Produksi aset visual massal dalam satu batch syuting di studio kami untuk kebutuhan marketplace, feed bulanan, dan materi iklan.',
                'is_featured' => false,
                'sort_order' => 20,
            ],
            [
                'slug' => 'studio-team-fashion-campaign',
                'title' => 'Behind The Scene & Editorial Studio Shoot',
                'client_name' => 'Kainara Modest Wear',
                'category_slug' => 'studio-production',
                'industry' => 'Modest Fashion',
                'service_slug' => 'instagram-tiktok-feeds',
                'thumbnail_url' => '/images/about/studio-team.jpg',
                'gallery_images' => [
                    '/images/about/studio-team.jpg',
                    '/images/about/studio-room.jpg',
                ],
                'deliverables_summary' => '12 Video Fitting + 24 Foto Lookbook',
                'metrics' => 'SLA QC < 24 Jam',
                'summary' => 'Produksi konten katalog busana dengan arahan gaya langsung dari tim kreatif dan peninjauan hasil real-time di studio.',
                'is_featured' => false,
                'sort_order' => 21,
            ],

            // --- Brand Campaign ---
            [
                'slug' => 'tugu-heritage-staycation-campaign',
                'title' => 'Kampanye Musim Liburan & Paket Staycation',
                'client_name' => 'Tugu Heritage Boutique Hotel',
                'category_slug' => 'brand-campaign',
                'industry' => 'Hotel & Hospitality',
                'service_slug' => 'social-media-management',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => 'Reels Tour + Carousel Promo + Copywriting',
                'metrics' => '+64% Inquiry Reservasi DM',
                'summary' => 'Kampanye digital terpadu menyambut musim liburan sekolah dengan video room tour sinematik dan materi visual yang mengarahkan calon tamu ke booking langsung.',
                'is_featured' => false,
                'sort_order' => 22,
            ],
            [
                'slug' => 'raya-optical-rebranding-campaign',
                'title' => 'Peluncuran Koleksi Frame & Rebranding IG',
                'client_name' => 'Raya Optical Studio',
                'category_slug' => 'brand-campaign',
                'industry' => 'Eyewear & Lifestyle',
                'service_slug' => 'social-media-management',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => 'Full Feed Revamp + 8 Reels Styling',
                'metrics' => '2x Pertumbuhan Followers Lokal',
                'summary' => 'Menyegarkan citra toko kacamata konvensional menjadi destinasi gaya hidup anak muda melalui seri konten face-shape styling.',
                'is_featured' => false,
                'sort_order' => 23,
            ],
            [
                'slug' => 'bumi-organik-harvest-campaign',
                'title' => 'Kampanye Edukasi Pangan Organik & Resep',
                'client_name' => 'Bumi Organik Mart',
                'category_slug' => 'brand-campaign',
                'industry' => 'Healthy Grocery',
                'service_slug' => 'social-media-management',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=80',
                ],
                'deliverables_summary' => '16 Reels Resep Cepat + 12 Feed Promo',
                'metrics' => '115K+ Jangkauan Keluarga Muda',
                'summary' => 'Edukasi gaya hidup sehat dan resep harian 1 menit untuk mendorong pembelian rutin bahan pangan segar melalui WhatsApp order.',
                'is_featured' => false,
                'sort_order' => 24,
            ],
        ];

        foreach ($portfolios as $item) {
            Portfolio::updateOrCreate(
                ['slug' => $item['slug']],
                $item + ['is_active' => true]
            );
        }
    }
}

