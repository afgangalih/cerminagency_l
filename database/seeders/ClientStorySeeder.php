<?php

namespace Database\Seeders;

use App\Models\ClientLogo;
use App\Models\ClientStory;
use Illuminate\Database\Seeder;

class ClientStorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stories = [
            [
                'slug' => 'ocbc-nisp-campaign',
                'client_name' => 'OCBC NISP',
                'logo_url' => '/images/clients/ocbc.png',
                'cover_image_url' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=80',
                'industry' => 'Perbankan & Finansial',
                'summary' => 'OCBC NISP adalah bank swasta nasional yang menghadirkan layanan keuangan modern untuk nasabah ritel maupun pelaku usaha.',
                'challenge' => 'Menyederhanakan pesan literasi keuangan dan produk perbankan digital agar relevan dengan kebiasaan konsumsi video pendek audiens muda di Instagram dan TikTok.',
                'solution' => 'Tim Cermin menyusun seri skrip edukasi finansial singkat berdurasi 30-45 detik dengan struktur hook permasalahan harian, dipadukan desain carousel infografis yang konsisten.',
                'deliverables' => 'Video Reels Edukasi 9:16 + Desain Carousel Finansial',
                'metrics' => 'Peningkatan Share & Save Konten Edukasi',
                'service_slug' => 'instagram-tiktok-feeds',
                'sort_order' => 1,
            ],
            [
                'slug' => 'triv-indonesia-crypto',
                'client_name' => 'TRIV Indonesia',
                'logo_url' => '/images/clients/triv.png',
                'cover_image_url' => 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&auto=format&fit=crop&q=80',
                'industry' => 'Fintech & Aset Digital',
                'summary' => 'TRIV adalah platform jual beli aset digital terpercaya di Indonesia dengan layanan transaksi real-time bagi investor ritel.',
                'challenge' => 'Menjaga komunikasi harian tetap cepat mengikuti pergerakan tren pasar tanpa mengorbankan ketepatan informasi serta estetika visual feed.',
                'solution' => 'Penerapan kalender editorial fleksibel di Client Portal Cermin dengan SLA persetujuan cepat, desain grafis modular, serta video update pasar beritme tinggi.',
                'deliverables' => 'Social Media Management + Grafis Update Harian',
                'metrics' => 'Kalender Konten Konsisten 30 Hari/Bulan',
                'service_slug' => 'social-media-management',
                'sort_order' => 2,
            ],
            [
                'slug' => 'instax-fujifilm-indonesia',
                'client_name' => 'Instax Fujifilm Indonesia',
                'logo_url' => '/images/clients/instax.png',
                'cover_image_url' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&auto=format&fit=crop&q=80',
                'industry' => 'Imaging & Lifestyle',
                'summary' => 'Fujifilm Indonesia melalui lini Instax menghadirkan kamera instan kreatif untuk komunitas fotografi, kreator muda, dan gaya hidup.',
                'challenge' => 'Membangun inspirasi penggunaan kamera instan secara visual yang autentik di tengah dominasi konten digital serba cepat.',
                'solution' => 'Produksi video unboxing, ide styling hasil cetak foto instan, serta kurasi grid feed 3x3 yang menonjolkan palet warna produk secara akurat.',
                'deliverables' => 'Produksi Video Vertikal 9:16 + Desain Grid Feed 3x3',
                'metrics' => 'Reels Product Showcase High Retention',
                'service_slug' => 'instagram-tiktok-feeds',
                'sort_order' => 3,
            ],
            [
                'slug' => 'labore-paragon-skincare',
                'client_name' => 'Labore (PT Paragon)',
                'logo_url' => '/images/clients/labore.png',
                'cover_image_url' => 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80',
                'industry' => 'Beauty & Dermatological Skincare',
                'summary' => 'Labore merupakan merek perawatan kulit sensitif dari Paragon dengan pendekatan riset dermatologi teruji.',
                'challenge' => 'Menyampaikan edukasi kandungan mikrobioma dan perawatan kulit sensitif dalam format visual yang bersih, klinis, namun tetap hangat.',
                'solution' => 'Perancangan sistem tipografi infografis feed bersama copywriting naskah edukatif terstruktur serta video review tekstur produk dengan pencahayaan studio.',
                'deliverables' => 'Graphic Design Carousel + Video Tekstur Produk',
                'metrics' => 'Visual Guideline Klinis Terjaga Rapi',
                'service_slug' => 'graphic-design',
                'sort_order' => 4,
            ],
            [
                'slug' => 'universitas-terbuka-education',
                'client_name' => 'Universitas Terbuka',
                'logo_url' => '/images/clients/ut.png',
                'cover_image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80',
                'industry' => 'Pendidikan Tinggi Terbuka',
                'summary' => 'Universitas Terbuka memperluas akses pendidikan tinggi berkualitas bagi mahasiswa dan profesional di seluruh penjuru Indonesia.',
                'challenge' => 'Menjangkau calon mahasiswa baru dari kalangan pekerja muda dengan informasi pendaftaran dan panduan kuliah jarak jauh yang tidak membosankan.',
                'solution' => 'Pengelolaan konten Instagram & TikTok berbasis testimoni mahasiswa aktif, kalender info registrasi berkala, dan template grafis akademik yang mudah dibaca di ponsel.',
                'deliverables' => 'Social Media Management + Konten Penerimaan Mahasiswa',
                'metrics' => 'Peningkatan Interaksi Informasi PMB',
                'service_slug' => 'social-media-management',
                'sort_order' => 5,
            ],
            [
                'slug' => 'nav-karaoke-keluarga',
                'client_name' => 'NAV Karaoke Keluarga',
                'logo_url' => '/images/clients/nav.png',
                'cover_image_url' => 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&auto=format&fit=crop&q=80',
                'industry' => 'Hiburan & Hospitality',
                'summary' => 'NAV Karaoke adalah jaringan hiburan keluarga terkemuka yang menghadirkan pengalaman bernyanyi nyaman untuk seluruh kalangan.',
                'challenge' => 'Mengomunikasikan promo cabang, paket kumpul keluarga, dan pengalaman ruangan secara menarik kepada segmen keluarga muda dan komunitas.',
                'solution' => 'Produksi video pendek dinamis berdurasi singkat bertema kebersamaan, penataan highlight informasi cabang, serta desain promo musiman yang konsisten.',
                'deliverables' => 'Video Promo Cabang + Desain Feed & Story',
                'metrics' => 'Keterlibatan Promo Musiman Meningkat',
                'service_slug' => 'instagram-tiktok-feeds',
                'sort_order' => 6,
            ],
            [
                'slug' => 'rs-onkologi-surabaya',
                'client_name' => 'RS Onkologi Surabaya',
                'logo_url' => '/images/clients/rsonkology.png',
                'cover_image_url' => 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&auto=format&fit=crop&q=80',
                'industry' => 'Layanan Kesehatan Spesialis',
                'summary' => 'RS Onkologi Surabaya adalah rumah sakit khusus kanker yang berfokus pada layanan medis terpadu, humanis, dan tepercaya.',
                'challenge' => 'Menghadirkan informasi deteksi dini dan layanan spesialis dengan bahasa empatik dan akurasi medis tanpa kesan menakutkan.',
                'solution' => 'Kolaborasi produksi video edukasi dokter spesialis dan seri infografis carousel informatif dengan proses tinjauan naskah berlapis melalui Client Portal.',
                'deliverables' => 'Video Edukasi Dokter + Carousel Kesehatan',
                'metrics' => 'Respon Review Medis Tersistem',
                'service_slug' => 'social-media-management',
                'sort_order' => 7,
            ],
            [
                'slug' => 'gappu-indonesia-material',
                'client_name' => 'Gappu Indonesia',
                'logo_url' => '/images/clients/gappu.png',
                'cover_image_url' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop&q=80',
                'industry' => 'Material Konstruksi & Nat Epoxy',
                'summary' => 'Gappu Indonesia memproduksi solusi nat epoxy dan finishing lantai premium untuk kebutuhan hunian maupun proyek komersial.',
                'challenge' => 'Mendemonstrasikan keunggulan teknis ketahanan air, warna, dan aplikasi produk kepada kontraktor maupun pemilik rumah secara ringkas.',
                'solution' => 'Video demonstrasi before-after aplikasi produk di lapangan, infografis perbandingan spesifikasi teknis, serta katalog produk visual di Instagram.',
                'deliverables' => 'Video Demo Produk + Desain Katalog Teknis',
                'metrics' => 'Pertanyaan Katalog B2B & Ritel Meningkat',
                'service_slug' => 'graphic-design',
                'sort_order' => 8,
            ],
            [
                'slug' => 'depok-single-window-public',
                'client_name' => 'Depok Single Window',
                'logo_url' => '/images/clients/dsw.png',
                'cover_image_url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
                'industry' => 'Layanan Publik Digital',
                'summary' => 'Depok Single Window adalah portal layanan digital terpadu untuk mempermudah akses administrasi dan informasi publik warga.',
                'challenge' => 'Memandu masyarakat dari berbagai kelompok usia memahami alur fitur layanan aplikasi secara visual dan praktis.',
                'solution' => 'Pembuatan panduan visual langkah demi langkah dalam format carousel berseri serta video tutorial vertikal 9:16 yang ringkas dan mudah diikuti.',
                'deliverables' => 'Desain Panduan Fitur + Video Tutorial 9:16',
                'metrics' => 'Pemahaman Fitur Layanan Lebih Cepat',
                'service_slug' => 'graphic-design',
                'sort_order' => 9,
            ],
        ];

        foreach ($stories as $story) {
            ClientStory::updateOrCreate(
                ['slug' => $story['slug']],
                $story + ['is_featured' => true, 'is_active' => true]
            );
        }

        $logos = [
            ['name' => 'Flecto', 'logo_url' => '/images/clients/flecto.png', 'sort_order' => 1],
            ['name' => 'Binus Graduate Program', 'logo_url' => '/images/clients/binusgrad.png', 'sort_order' => 2],
            ['name' => 'Binus School', 'logo_url' => '/images/clients/binusschool.png', 'sort_order' => 3],
            ['name' => 'Depok Single Window', 'logo_url' => '/images/clients/dsw.png', 'sort_order' => 4],
            ['name' => 'Gappu Indonesia', 'logo_url' => '/images/clients/gappu.png', 'sort_order' => 5],
            ['name' => 'Instax Fujifilm', 'logo_url' => '/images/clients/instax.png', 'sort_order' => 6],
            ['name' => 'Komdigi', 'logo_url' => '/images/clients/komdigi.png', 'sort_order' => 7],
            ['name' => 'Labore', 'logo_url' => '/images/clients/labore.png', 'sort_order' => 8],
            ['name' => 'Summarecon', 'logo_url' => '/images/clients/summarecon.png', 'sort_order' => 9],
            ['name' => 'NAV Karaoke', 'logo_url' => '/images/clients/nav.png', 'sort_order' => 10],
            ['name' => 'OCBC NISP', 'logo_url' => '/images/clients/ocbc.png', 'sort_order' => 11],
            ['name' => 'Bunda Medic Hospital', 'logo_url' => '/images/clients/bundamedic.png', 'sort_order' => 12],
            ['name' => 'RS Onkologi Surabaya', 'logo_url' => '/images/clients/rsonkology.png', 'sort_order' => 13],
            ['name' => 'TRIV Indonesia', 'logo_url' => '/images/clients/triv.png', 'sort_order' => 14],
            ['name' => 'Universitas Terbuka', 'logo_url' => '/images/clients/ut.png', 'sort_order' => 15],
        ];

        foreach ($logos as $logo) {
            ClientLogo::updateOrCreate(
                ['logo_url' => $logo['logo_url']],
                $logo + ['is_active' => true]
            );
        }
    }
}

