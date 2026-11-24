<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            // =================================================================
            // 1. SOCIAL MEDIA MANAGEMENT
            // =================================================================
            [
                'slug' => 'social-media-management',
                'title' => 'Social Media Management',
                'badge' => 'END-TO-END RETAINER',
                'tagline' => 'Bangun Persepsi Brand yang Terpercaya & Konsisten Setiap Hari',
                'description' => 'Pengelolaan ekosistem media sosial secara terpadu: mulai dari riset tren, penyusunan kalender editorial terencana, copywriting naskah engaging, hingga pelaporan insight performa berkala tanpa ribet.',
                'hero_visual_type' => 'dashboard',
                'theme_gradient' => 'navy',
                'meta_title' => 'Jasa Social Media Management Profesional - Cermin Kreatif Malang',
                'meta_description' => 'Layanan pengelolaan media sosial bulanan terstruktur untuk brand UMKM, klinik, F&B, dan korporat. Kalender tertib, copywriting kuat, dan pelaporan transparan.',
                'scopes' => [
                    [
                        'title' => 'Perencanaan Kalender Konten',
                        'subtitle' => 'Pilar tema & jadwal tayang 30 hari tersusun rapi sebelum bulan berjalan.',
                        'badge' => 'Kalender Terkunci',
                        'icon' => 'CalendarDays',
                    ],
                    [
                        'title' => 'Copywriting Naskah & Captions',
                        'subtitle' => 'Hook awal memikat, narasi sesuai brand voice, dan riset tagar tertarget.',
                        'badge' => 'Brand Voice',
                        'icon' => 'PenTool',
                    ],
                    [
                        'title' => 'Optimasi Jadwal & Distribusi',
                        'subtitle' => 'Penjadwalan tepat waktu pada peak hours audiens untuk jangkauan optimal.',
                        'badge' => 'Prime Time',
                        'icon' => 'Clock',
                    ],
                    [
                        'title' => 'Pelaporan & Analisis Insight',
                        'subtitle' => 'Evaluasi metrik bulanan: engagement rate, pertumbuhan followers, dan rekomendasi langkah lanjut.',
                        'badge' => 'Data Transparan',
                        'icon' => 'BarChart3',
                    ],
                ],
                'workflow_steps' => [
                    [
                        'step' => 1,
                        'title' => 'Riset Audiens & Brand Persona',
                        'desc' => 'Kami membedah target pasar, karakter produk, kompetitor, serta merumuskan pilar konten spesifik untuk brand Anda.',
                    ],
                    [
                        'step' => 2,
                        'title' => 'Perumusan Kalender & Naskah Konten',
                        'desc' => 'Tim copywriter dan konseptor menyusun draf naskah, visual direction, dan kalender editorial untuk satu bulan penuh.',
                    ],
                    [
                        'step' => 3,
                        'title' => 'Review via Portal & Jadwal Tayang',
                        'desc' => 'Anda meninjau dan memberi persetujuan satu pintu di Client Portal Cermin (SLA < 24 jam) sebelum konten dijadwalkan tayang.',
                    ],
                ],
                'why_us_points' => [
                    'title' => 'Kenapa Brand Memilih Manajemen Social Media Cermin?',
                    'description' => 'Kami bukan sekadar memposting gambar, tetapi menjaga reputasi dan persepsi visual brand Anda di mata pelanggan.',
                    'bullets' => [
                        'Disiplin jadwal: Kalender konten terkunci tanpa drama telat posting.',
                        'Kolaborasi satu pintu via Client Portal (tanpa file tercecer di chat WhatsApp).',
                        'SLA respons cepat dan kepastian jadwal rilis bulanan.',
                        'Integrasi langsung dengan tim studio visual dan video sinematik di Malang.',
                    ],
                ],
                'showcase_items' => [
                    [
                        'title' => 'Maven Coffee Roasters',
                        'category' => 'F&B Specialist',
                        'image' => '/images/about/studio-workspace.jpg',
                        'metrics' => '+180% Engagement Growth',
                    ],
                    [
                        'title' => 'Lumen Skin Clinic',
                        'category' => 'Beauty & Skincare',
                        'image' => '/images/about/studio-room.jpg',
                        'metrics' => '24 Konten Terjadwal / Bulan',
                    ],
                    [
                        'title' => 'Arche Food Collective',
                        'category' => 'Hospitality & Dining',
                        'image' => '/images/about/studio-team.jpg',
                        'metrics' => '94% On-Time Scheduled Rate',
                    ],
                ],
                'pricing_packages' => [
                    [
                        'name' => 'Starter Social',
                        'price' => 'Rp 4.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Cocok untuk brand lokal yang ingin aktif & rapi secara konsisten.',
                        'is_popular' => false,
                        'features' => [
                            '12 Konten Feed Terjadwal (Feed & Reels gabungan)',
                            'Penyusunan kalender konten bulanan',
                            'Copywriting naskah & riset tagar',
                            'Client Review Portal SLA 48 Jam',
                            'Laporan performa akhir bulan',
                        ],
                    ],
                    [
                        'name' => 'Growth Authority',
                        'price' => 'Rp 7.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Pilihan utama brand bertumbuh yang membutuhkan interaksi tinggi.',
                        'is_popular' => true,
                        'features' => [
                            '20 Konten Feed Terjadwal bulanan',
                            'Kalender editorial & strategi hook interaktif',
                            'Copywriting naskah & cover Reels',
                            'Client Review Portal SLA < 24 Jam (Prioritas)',
                            '2x Sesi revisi draf terstruktur',
                            'Laporan komprehensif & evaluasi strategi',
                        ],
                    ],
                    [
                        'name' => 'Dominasi Market',
                        'price' => 'Rp 12.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Skala penuh untuk brand yang ingin mendominasi percakapan industri.',
                        'is_popular' => false,
                        'features' => [
                            '30 Konten Terjadwal (Posting harian teratur)',
                            'Full content strategy & competitor analysis',
                            'Copywriting persuasif & storytelling mendalam',
                            'Dedicated PIC & Dedicated Creative Director',
                            'Client Review Portal SLA < 12 Jam Kilat',
                            'Pelaporan mingguan & meeting evaluasi bulanan',
                        ],
                    ],
                ],
                'faqs' => [
                    [
                        'q' => 'Apakah layanan ini sudah mencakup admin yang membalas pesan / DM klien?',
                        'a' => 'Fokus utama Cermin adalah produksi strategi konten, visual, copywriting, dan penjadwalan. Untuk interaksi customer service atau balas DM, kami menyediakan opsi add-on Community Moderator jika dibutuhkan.',
                    ],
                    [
                        'q' => 'Bagaimana jika ada konten dadakan seperti ucapan hari raya atau promo kilat?',
                        'a' => 'Tersedia kuota fleksibel untuk penyesuaian kalender konten. Anda cukup mengajukan tiket di Client Portal minimal 2 hari sebelum tayang agar tim desain dapat mengeksekusi dengan standar kualitas yang tetap terjaga.',
                    ],
                    [
                        'q' => 'Berapa kali putaran revisi yang diberikan?',
                        'a' => 'Setiap konten mendapatkan 2 putaran revisi terstruktur. Sistem kami mencatat revisi secara transparan via Client Portal untuk memastikan proyek selesai tepat waktu tanpa drama revisi tak berujung.',
                    ],
                    [
                        'q' => 'Platform media sosial apa saja yang dikelola?',
                        'a' => 'Fokus utama kami adalah Instagram, TikTok, dan Facebook Page, dengan optimasi format konten vertikal 9:16 dan feed 3x3 yang sesuai karakter masing-masing platform.',
                    ],
                ],
                'is_active' => true,
                'sort_order' => 1,
            ],

            // =================================================================
            // 2. INSTAGRAM & TIKTOK FEEDS
            // =================================================================
            [
                'slug' => 'instagram-tiktok-feeds',
                'title' => 'Instagram & TikTok Feeds',
                'badge' => 'KONTEN SINEMATIK 4K',
                'tagline' => 'Produksi Konten Video 9:16 yang Menghentikan Scroll & Menggerakkan Penonton',
                'description' => 'Layanan produksi video vertikal resolusi 4K dengan standar studio sinematik Malang: tata lampu pro, audio jernih, talent profesional, dan editing beritme dinamis untuk menjangkau algoritma FYP dan Reels.',
                'hero_visual_type' => 'reels_phone',
                'theme_gradient' => 'warm_white',
                'meta_title' => 'Jasa Video Reels & TikTok 9:16 Sinematik - Cermin Kreatif Studio Malang',
                'meta_description' => 'Produksi video pendek vertikal 9:16 4K untuk Instagram Reels & TikTok. Syuting di studio fisik Malang, lighting sinema, dan alur penceritaan berkonversi tinggi.',
                'scopes' => [
                    [
                        'title' => 'Format Video Vertikal 9:16 4K',
                        'subtitle' => 'Direkam dengan kamera cinema beresolusi tinggi dan tata lampu studio profesional.',
                        'badge' => 'Ultra HD 4K',
                        'icon' => 'Video',
                    ],
                    [
                        'title' => 'Syuting di Studio Malang & On-Location',
                        'subtitle' => 'Akses studio fisik Cermin di Malang dengan set interior, backdrop, dan perlengkapan lengkap.',
                        'badge' => 'Studio Fisik',
                        'icon' => 'Camera',
                    ],
                    [
                        'title' => 'Editing Dinamis & Hook 3 Detik',
                        'subtitle' => 'Potongan ritmis, efek transisi halus, motion text informatif, dan retensi penonton tinggi.',
                        'badge' => 'High Retention',
                        'icon' => 'Sparkles',
                    ],
                    [
                        'title' => 'Audio Berlisensi & Subtitle Dinamis',
                        'subtitle' => 'Bebas klaim hak cipta musik dengan voice over jernih dan animasi teks subtitle mudah dibaca.',
                        'badge' => 'Lisensi Aman',
                        'icon' => 'Music',
                    ],
                ],
                'workflow_steps' => [
                    [
                        'step' => 1,
                        'title' => 'Penyusunan Script, Hook & Storyboard',
                        'desc' => 'Merancang konsep penceritaan, ide hook 3 detik pertama, dan script pembicara yang relevan dengan tren.',
                    ],
                    [
                        'step' => 2,
                        'title' => 'Sesi Produksi & Syuting di Studio Malang',
                        'desc' => 'Pengambilan gambar di studio fisik kami dengan tim director, sinematografer, lighting master, dan talent pilihan.',
                    ],
                    [
                        'step' => 3,
                        'title' => 'Penyuntingan & Review Video 9:16 di Portal',
                        'desc' => 'Editor melakukan color grading dan sound design. Video siap direview langsung dengan kontrol timestamp di portal.',
                    ],
                ],
                'why_us_points' => [
                    'title' => 'Standar Studio Nyata, Bukan Sekadar Editing Template',
                    'description' => 'Kami memiliki studio fisik di Malang yang dapat Anda kunjungi atau jadwalkan untuk syuting produk.',
                    'bullets' => [
                        'Kamera cinema, lighting studio kelas profesional, dan mikrofon rekaman broadcast.',
                        'Pilihan talent kreator lokal terkurasi yang komunikatif dan mewakili identitas brand.',
                        'Fitur review video vertikal di portal dengan catatan revisi berbasis detik/timestamp.',
                        'Produk luar kota cukup dikirimkan ke alamat studio kami di Malang.',
                    ],
                ],
                'showcase_items' => [
                    [
                        'title' => 'Seri Sinematik Menu Baru',
                        'category' => 'Food & Beverages',
                        'image' => '/images/about/studio-workspace.jpg',
                        'metrics' => '1.2M+ Organik Views',
                    ],
                    [
                        'title' => 'Edukasi Treatment Kulit',
                        'category' => 'Klinik & Medis',
                        'image' => '/images/about/studio-room.jpg',
                        'metrics' => '3.8x Saved Rate',
                    ],
                    [
                        'title' => 'Brand Showcase Sinematik',
                        'category' => 'Lifestyle & Fashion',
                        'image' => '/images/about/studio-team.jpg',
                        'metrics' => '4K 60fps Cinema Look',
                    ],
                ],
                'pricing_packages' => [
                    [
                        'name' => 'Starter Video',
                        'price' => 'Rp 7.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Untuk brand yang ingin memulai produksi video vertikal berkualitas tinggi.',
                        'is_popular' => false,
                        'features' => [
                            '8 Video Vertikal 9:16 Resolusi 4K',
                            '1x Sesi syuting studio bulanan di Malang',
                            'Naskah naskah video & riset hook',
                            'Editing dinamis, musik komersial & subtitle',
                            '2x Putaran revisi per video',
                            'Review video interaktif di Client Portal',
                        ],
                    ],
                    [
                        'name' => 'Signature Retainer',
                        'price' => 'Rp 13.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Pilihan terpopuler: Kuota optimal dengan perputaran video konsisten.',
                        'is_popular' => true,
                        'features' => [
                            '15 Video Vertikal 9:16 Resolusi 4K',
                            '2x Sesi syuting studio/lokasi di Malang',
                            'Pilihan talent/model dari database Cermin',
                            'Color grading sinematik & custom motion text',
                            'Review video prioritas SLA < 24 Jam',
                            'Free cover Reels & format optimasi TikTok',
                        ],
                    ],
                    [
                        'name' => 'Scale Enterprise',
                        'price' => 'Rp 22.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Volume tinggi untuk brand besar yang butuh kehadiran harian di FYP.',
                        'is_popular' => false,
                        'features' => [
                            '25 Video Vertikal 9:16 Resolusi 4K',
                            '4x Sesi syuting komprehensif',
                            'Dedicated Creative Director & Lead Editor',
                            'Akses talent profesional & wardrobe studio',
                            'SLA Review Kilat < 12 Jam di Portal',
                            'Master file 4K ProRes tanpa kompresi',
                        ],
                    ],
                ],
                'faqs' => [
                    [
                        'q' => 'Bagaimana jika brand kami berada di luar kota Malang?',
                        'a' => 'Sangat mudah! Lebih dari 60% klien Cermin berada di luar kota. Anda cukup mengirimkan sampel produk ke studio kami di Malang. Tim kami akan menyiapkan briefing naskah, menyusun storyboard, dan menyiarkan sesi syuting jika Anda ingin memantau secara daring.',
                    ],
                    [
                        'q' => 'Berapa durasi ideal video 9:16 yang diproduksi?',
                        'a' => 'Rata-rata berdurasi antara 15 hingga 45 detik, disesuaikan dengan retensi optimal algoritma Instagram Reels dan TikTok.',
                    ],
                    [
                        'q' => 'Apakah biaya sudah termasuk talent / model video?',
                        'a' => 'Paket Signature dan Scale sudah termasuk talent in-house dari agensi kami. Jika Anda membutuhkan selebgram/influencer spesifik, kami dapat membantu menghubungkan dan mengelolanya sebagai add-on.',
                    ],
                    [
                        'q' => 'Bagaimana jika video membutuhkan revisi?',
                        'a' => 'Anda dapat memutar video di Client Portal Cermin dan menaruh catatan revisi langsung pada detik tertentu (misal di menit 00:14). Tim editor langsung memperbaiki titik tersebut tanpa salah paham.',
                    ],
                ],
                'is_active' => true,
                'sort_order' => 2,
            ],

            // =================================================================
            // 3. GRAPHIC DESIGN
            // =================================================================
            [
                'slug' => 'graphic-design',
                'title' => 'Graphic Design',
                'badge' => 'VISUAL & IDENTITAS BRAND',
                'tagline' => 'Estetika Visual Brand yang Eksklusif, Kohesif & Bernilai Tinggi',
                'description' => 'Layanan perancangan visual menyeluruh: dari susunan puzzle grid feed 3x3 yang bersambung harmonis, cover Reels yang clickable, hingga infografis carousel yang berbobot dan memperkuat citra profesional brand.',
                'hero_visual_type' => 'canvas_grid',
                'theme_gradient' => 'cyan',
                'meta_title' => 'Jasa Desain Grafis Feed Instagram & Visual Branding - Cermin Kreatif Malang',
                'meta_description' => 'Jasa graphic design profesional untuk Instagram feed, carousel edukasi, cover reels, dan panduan visual identitas brand di Malang.',
                'scopes' => [
                    [
                        'title' => 'Desain Grid Feed (3x3 Puzzle & Grid)',
                        'subtitle' => 'Tata letak feed bersambung yang estetik dan harmonis saat profil Instagram Anda dibuka.',
                        'badge' => 'Grid 3x3',
                        'icon' => 'LayoutGrid',
                    ],
                    [
                        'title' => 'Cover Reels & Story Template',
                        'subtitle' => 'Thumbnail video yang mengundang klik dengan judul tegas dan layout rapi di tab Reels.',
                        'badge' => 'High CTR',
                        'icon' => 'Palette',
                    ],
                    [
                        'title' => 'Desain Carousel Edukasi & Promo',
                        'subtitle' => 'Slide konten informatif berlapis yang mendorong penonton menggeser hingga slide terakhir.',
                        'badge' => 'Swipe-Worthy',
                        'icon' => 'Layers',
                    ],
                    [
                        'title' => 'Identitas Visual & Brand Kit',
                        'subtitle' => 'Penyusunan palet warna, tipografi berkarakter, dan elemen grafis konsisten yang mudah diingat.',
                        'badge' => 'Brand Guideline',
                        'icon' => 'Sparkles',
                    ],
                ],
                'workflow_steps' => [
                    [
                        'step' => 1,
                        'title' => 'Moodboard & Eksplorasi Visual Identity',
                        'desc' => 'Menetapkan arah desain, gaya tipografi, dan kombinasi warna yang mencerminkan diferensiasi brand Anda.',
                    ],
                    [
                        'step' => 2,
                        'title' => 'Eksekusi Desain Grid, Carousel & Cover',
                        'desc' => 'Desainer grafis kami merancang setiap frame dengan presisi piksel tinggi, memperhatikan hierarki baca dan kontras.',
                    ],
                    [
                        'step' => 3,
                        'title' => 'Simulasi Tampilan Feed & Penyerahan Aset',
                        'desc' => 'Meninjau simulasi tampilan feed 3x3 di Client Portal sebelum file resolusi tinggi diekspor dan dijadwalkan.',
                    ],
                ],
                'why_us_points' => [
                    'title' => 'Desain Autentik Berkarakter, Tanpa Template Pasaran',
                    'description' => 'Desain brand Anda dikerjakan langsung oleh desainer berpengalaman dengan riset visual mendalam.',
                    'bullets' => [
                        'Bebas dari template Canva pasaran yang digunakan ribuan akun lain.',
                        'Simulasi preview feed 3x3 interaktif sebelum posting untuk memastikan keharmonisan grid.',
                        'Aset grafis diekspor dengan resolusi tajam (RGB 300 DPI, lossless WebP/PNG).',
                        'File master (Adobe Illustrator, Photoshop, atau Figma) dapat diakses jika dibutuhkan.',
                    ],
                ],
                'showcase_items' => [
                    [
                        'title' => 'Grid Feed Identitas 3x3',
                        'category' => 'Coffee & Roastery',
                        'image' => '/images/about/studio-workspace.jpg',
                        'metrics' => 'Continuous Puzzle Harmony',
                    ],
                    [
                        'title' => 'Carousel Edukasi Kesehatan Kulit',
                        'category' => 'Healthcare & Clinic',
                        'image' => '/images/about/studio-room.jpg',
                        'metrics' => 'Top Saved Content Format',
                    ],
                    [
                        'title' => 'Revitalisasi Brand Visual',
                        'category' => 'Retail & Lifestyle',
                        'image' => '/images/about/studio-team.jpg',
                        'metrics' => 'Complete Style Guide',
                    ],
                ],
                'pricing_packages' => [
                    [
                        'name' => 'Starter Visual',
                        'price' => 'Rp 3.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Pilihan tepat untuk merapikan estetika feed dan story akun bisnis Anda.',
                        'is_popular' => false,
                        'features' => [
                            '12 Desain Feed (Single Post & Carousel 3 Slide)',
                            '4 Desain Cover Reels konsisten',
                            'Template Instagram Story bulanan',
                            '2x Putaran revisi terstruktur',
                            'Simulasi feed 3x3 di Client Portal',
                        ],
                    ],
                    [
                        'name' => 'Signature Grid',
                        'price' => 'Rp 6.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Untuk brand yang menuntut tampilan feed Instagram kohesif dan berkelas.',
                        'is_popular' => true,
                        'features' => [
                            '24 Desain Feed (Termasuk format 3x3 Puzzle Feed)',
                            '8 Desain Cover Reels & Story Highlight icon',
                            'Carousel edukasi mendalam (hingga 6 slide)',
                            'Eksplorasi brand identity & visual kit',
                            'Client Review Portal SLA < 24 Jam',
                            'Master asset PNG / WebP resolusi tinggi',
                        ],
                    ],
                    [
                        'name' => 'Full Brand Authority',
                        'price' => 'Rp 10.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Paket desain komprehensif dari media sosial hingga kebutuhan cetak promo.',
                        'is_popular' => false,
                        'features' => [
                            '36 Desain Feed & Carousel tak terbatas',
                            'Full Cover Reels, Story & Banner Promosi',
                            'Brand Guideline Book (Warna, Font, Iconography)',
                            'Desain materi cetak (Brosur, Kartu Nama, Packaging)',
                            'Dedicated Senior Graphic Designer',
                            'Penyerahan Full Master File (AI, PSD, Figma)',
                        ],
                    ],
                ],
                'faqs' => [
                    [
                        'q' => 'Apakah desain yang dibuat menggunakan template yang sama dengan klien lain?',
                        'a' => 'Tidak. Setiap brand mendapatkan arahan visual unik yang diriset sesuai diferensiasi produk, target pasar, dan positioning brand Anda.',
                    ],
                    [
                        'q' => 'Apakah kami bisa melihat bagaimana tampilan profil kami sebelum konten diposting?',
                        'a' => 'Bisa. Fitur simulator grid feed di Client Portal memungkinkan Anda melihat persis bagaimana susunan 9 foto (grid 3x3) saling menyatu sebelum tombol publish ditekan.',
                    ],
                    [
                        'q' => 'Bagaimana jika kami membutuhkan file master untuk keperluan cetak?',
                        'a' => 'File master dalam format Adobe Illustrator (.AI), Photoshop (.PSD), atau Figma dapat disediakan sesuai kesepakatan paket.',
                    ],
                    [
                        'q' => 'Berapa lama proses pembuatan satu set desain?',
                        'a' => 'Biasanya batch desain pertama diselesaikan dalam 3-5 hari kerja setelah moodboard visual disepakati.',
                    ],
                ],
                'is_active' => true,
                'sort_order' => 3,
            ],

            // =================================================================
            // 4. SUB-SERVICE: JASA KELOLA INSTAGRAM
            // =================================================================
            [
                'slug' => 'jasa-kelola-instagram',
                'parent_slug' => 'social-media-management',
                'title' => 'Jasa Kelola Instagram',
                'badge' => 'INSTAGRAM MANAGEMENT',
                'tagline' => 'Tingkatkan Otoritas, Estetika Feed & Pertumbuhan Follower Organik',
                'description' => 'Pengelolaan akun Instagram bisnis profesional menyeluruh: perancangan grid feed 3x3 estetik, naskah Reels engaging dengan hook kuat, kalender konten bulanan teratur, dan optimasi jam tayang untuk jangkauan optimal.',
                'hero_visual_type' => 'canvas_grid',
                'theme_gradient' => 'navy',
                'meta_title' => 'Jasa Kelola Instagram Profesional - Cermin Kreatif Studio Malang',
                'meta_description' => 'Jasa kelola akun Instagram bulanan terpadu. Perencanaan kalender konten, desain feed 3x3, produksi Reels 9:16, dan laporan analitik transparan di Malang.',
                'scopes' => [
                    [
                        'title' => 'Perencanaan Feed & Story',
                        'subtitle' => 'Kalender konten 30 hari meliputi kombinasi single post, carousel edukasi, dan story interaktif.',
                        'badge' => 'Feed & Story',
                        'icon' => 'LayoutGrid',
                    ],
                    [
                        'title' => 'Desain Cover & Reels 9:16',
                        'subtitle' => 'Cover Reels clickable yang menjaga keharmonisan tampilan profil akun Instagram bisnis Anda.',
                        'badge' => 'High CTR',
                        'icon' => 'Palette',
                    ],
                    [
                        'title' => 'Copywriting Caption & Tagar',
                        'subtitle' => 'Penulisan caption persuasif, interaktif, serta riset hashtag tertarget sesuai niche industri.',
                        'badge' => 'Brand Voice',
                        'icon' => 'PenTool',
                    ],
                    [
                        'title' => 'Optimasi Jam Tayang & Insight',
                        'subtitle' => 'Distribusi konten tepat waktu pada peak hours audiens dan evaluasi insight berkala.',
                        'badge' => 'Peak Hours',
                        'icon' => 'BarChart3',
                    ],
                ],
                'workflow_steps' => [
                    [
                        'step' => 1,
                        'title' => 'Audit Profil & Riset Target Audiens',
                        'desc' => 'Membedah profil bio, kompetitor, target audiens, dan menyusun pilar tema konten Instagram 1 bulan.',
                    ],
                    [
                        'step' => 2,
                        'title' => 'Desain Feed 3x3 & Copywriting Caption',
                        'desc' => 'Desainer dan copywriter studio merancang visual dan narasi teks dengan hierarki yang memikat.',
                    ],
                    [
                        'step' => 3,
                        'title' => 'Review di Portal & Penjadwalan Tayang',
                        'desc' => 'Klien meninjau simulasi tampilan feed dan menyetujui seluruh draf di Client Portal sebelum publish.',
                    ],
                ],
                'why_us_points' => [
                    'title' => 'Kenapa Brand Memilih Jasa Kelola Instagram Cermin?',
                    'description' => 'Kami mengutamakan keselarasan visual grid feed dan konsistensi pesan brand tanpa template murahan.',
                    'bullets' => [
                        'Desain kustom eksklusif yang disesuaikan dengan identitas brand Anda.',
                        'Simulasi tampilan feed 3x3 interaktif sebelum posting untuk memastikan keharmonisan profil.',
                        'Aman tanpa meminta password akun (cukup invite partner role via Meta Business Suite).',
                        'Didukung studio fotografi & video sinematik fisik di Malang untuk kebutuhan aset visual.',
                    ],
                ],
                'showcase_items' => [
                    [
                        'title' => 'Maven Coffee Roasters Instagram',
                        'category' => 'Coffee & F&B',
                        'image' => '/images/about/studio-workspace.jpg',
                        'metrics' => '+240% Profil Visits',
                    ],
                    [
                        'title' => 'Lumen Clinic Instagram Feed',
                        'category' => 'Beauty & Skincare',
                        'image' => '/images/about/studio-room.jpg',
                        'metrics' => 'Harmonious 3x3 Layout',
                    ],
                    [
                        'title' => 'Arche Food Instagram Carousel',
                        'category' => 'Dining & Lifestyle',
                        'image' => '/images/about/studio-team.jpg',
                        'metrics' => 'Top Saved Carousel Rate',
                    ],
                ],
                'pricing_packages' => [
                    [
                        'name' => 'Starter IG',
                        'price' => 'Rp 4.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Untuk merapikan profil bisnis dan menjaga keaktifan feed bulanan.',
                        'is_popular' => false,
                        'features' => [
                            '12 Konten Feed Terjadwal (Single & Carousel)',
                            '4 Cover Reels & Template Story',
                            'Kalender konten & riset hashtag',
                            'Client Review Portal SLA 48 Jam',
                            'Laporan pertumbuhan akhir bulan',
                        ],
                    ],
                    [
                        'name' => 'Growth IG Authority',
                        'price' => 'Rp 7.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Paling diminati: Kombinasi feed 3x3 puzzle dan Reels beritme tinggi.',
                        'is_popular' => true,
                        'features' => [
                            '20 Konten Feed Terjadwal (Termasuk Reels)',
                            'Desain susunan feed 3x3 berkesinambungan',
                            'Copywriting caption persuasif & call-to-action',
                            'Review prioritas SLA < 24 Jam di Portal',
                            '2x Putaran revisi terstruktur',
                            'Meeting evaluasi performa bulanan',
                        ],
                    ],
                    [
                        'name' => 'Scale IG Dominasi',
                        'price' => 'Rp 12.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Volume tinggi posting harian untuk dominasi pasar di Instagram.',
                        'is_popular' => false,
                        'features' => [
                            '30 Konten Feed Terjadwal (Posting harian)',
                            'Full Instagram growth strategy & engagement hook',
                            'Dedicated Creative Director & Graphic Lead',
                            'SLA Review Kilat < 12 Jam di Portal',
                            'Akses sesi syuting studio Malang bulanan',
                        ],
                    ],
                ],
                'faqs' => [
                    [
                        'q' => 'Apakah tim Cermin memerlukan password akun Instagram kami?',
                        'a' => 'Tidak wajib. Kami menyarankan akses yang aman melalui Meta Business Suite atau integrasi partner agency resmi sehingga Anda tidak perlu membagikan password pribadi.',
                    ],
                    [
                        'q' => 'Berapa hari sebelum bulan baru kalender konten diserahkan?',
                        'a' => 'Kalender konten dan draf desain diajukan minimal 5-7 hari kerja sebelum awal bulan baru agar Anda memiliki waktu yang leluasa untuk meninjau di Client Portal.',
                    ],
                    [
                        'q' => 'Apakah format Reels juga termasuk dalam pengelolaan Instagram?',
                        'a' => 'Ya, paket kami mengombinasikan format Feed Carousel, Single Post grafis, dan video Reels vertikal yang terbukti mendongkrak reach Instagram.',
                    ],
                    [
                        'q' => 'Bagaimana jika kami ingin mempromosikan postingan via Instagram Ads?',
                        'a' => 'Konten yang kami rancang sudah memenuhi standar spesifikasi Meta Ads, sehingga Anda dapat langsung melakukan boost post atau campaign iklan dari postingan tersebut.',
                    ],
                ],
                'is_active' => true,
                'sort_order' => 4,
            ],

            // =================================================================
            // 5. SUB-SERVICE: JASA KELOLA TIKTOK
            // =================================================================
            [
                'slug' => 'jasa-kelola-tiktok',
                'parent_slug' => 'social-media-management',
                'title' => 'Jasa Kelola TikTok',
                'badge' => 'TIKTOK FYP GROWTH',
                'tagline' => 'Masuki Algoritma FYP & Jangkau Audiens Muda Secara Organik',
                'description' => 'Layanan manajemen akun TikTok bisnis terpadu: perumusan ide hook 3 detik pertama, kurasi sound trending berlisensi, editing vertikal 9:16 beritme dinamis, dan strategi konsistensi posting untuk meningkatkan interaksi.',
                'hero_visual_type' => 'reels_phone',
                'theme_gradient' => 'warm_white',
                'meta_title' => 'Jasa Kelola Akun TikTok Bisnis - Cermin Kreatif Studio Malang',
                'meta_description' => 'Layanan pengelolaan akun TikTok bisnis bulanan. Naskah hook menarik, video 9:16 sinematik, kurasi sound tren, dan strategi tembus FYP.',
                'scopes' => [
                    [
                        'title' => 'Riset Tren & Algoritma FYP',
                        'subtitle' => 'Pemantauan tren audio, topik viral, dan format penyampaian yang disukai algoritma TikTok.',
                        'badge' => 'Tren Harian',
                        'icon' => 'Sparkles',
                    ],
                    [
                        'title' => 'Hook Writing & Naskah Narasi',
                        'subtitle' => 'Perumusan kalimat pembuka 3 detik pertama yang menghentikan scroll penonton.',
                        'badge' => 'High Retention',
                        'icon' => 'PenTool',
                    ],
                    [
                        'title' => 'Editing Dinamis & Sound Design',
                        'subtitle' => 'Ritme potongan video cepat, efek teks bergerak, subtitle, dan musik komersial berlisensi.',
                        'badge' => 'Dynamic Cut',
                        'icon' => 'Video',
                    ],
                    [
                        'title' => 'Manajemen Akun & Optimasi Bio',
                        'subtitle' => 'Penataan bio profil yang rapi, penentuan cover video, dan hashtag strategi.',
                        'badge' => 'Profil Bisnis',
                        'icon' => 'Clock',
                    ],
                ],
                'workflow_steps' => [
                    [
                        'step' => 1,
                        'title' => 'Riset Niche & Ide Konten FYP',
                        'desc' => 'Menentukan pilar konten edukasi, hiburan, dan soft-selling yang cocok dengan karakter produk Anda.',
                    ],
                    [
                        'step' => 2,
                        'title' => 'Produksi Video 9:16 & Sound Curating',
                        'desc' => 'Tim studio mengeksekusi syuting dan editing video berkecepatan tinggi dengan audio tren.',
                    ],
                    [
                        'step' => 3,
                        'title' => 'Review di Portal & Penjadwalan Prime Time',
                        'desc' => 'Video ditinjau di Client Portal dan dijadwalkan pada jam aktif pengguna TikTok.',
                    ],
                ],
                'why_us_points' => [
                    'title' => 'Kenapa TikTok Brand Anda Harus Dikelola Cermin?',
                    'description' => 'Kami memadukan pemahaman kultur TikTok dengan standar produksi video studio nyata di Malang.',
                    'bullets' => [
                        'Tim kreator muda yang aktif memantau dinamika tren dan audio viral di Indonesia.',
                        'Pilihan audio berlisensi komersial sehingga akun bisnis Anda aman dari mute audio atau pelanggaran hak cipta.',
                        'Fasilitas studio fisik Malang dengan lighting profesional dan opsi talent in-house.',
                        'Review draf video vertikal 9:16 langsung di portal dengan catatan revisi presisi berbasis detik.',
                    ],
                ],
                'showcase_items' => [
                    [
                        'title' => 'Seri Edukasi F&B TikTok',
                        'category' => 'Food & Beverages',
                        'image' => '/images/about/studio-workspace.jpg',
                        'metrics' => '850K+ Organic FYP',
                    ],
                    [
                        'title' => 'TikTok Showcase Klinik Kulit',
                        'category' => 'Klinik & Medis',
                        'image' => '/images/about/studio-room.jpg',
                        'metrics' => '4.2x Retention Rate',
                    ],
                    [
                        'title' => 'Behind The Scenes Studio',
                        'category' => 'Lifestyle & Fashion',
                        'image' => '/images/about/studio-team.jpg',
                        'metrics' => 'Consistent Viral Rhythm',
                    ],
                ],
                'pricing_packages' => [
                    [
                        'name' => 'Starter TikTok',
                        'price' => 'Rp 5.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Untuk brand yang ingin mulai membangun eksistensi di TikTok secara konsisten.',
                        'is_popular' => false,
                        'features' => [
                            '8 Video Vertikal 9:16 Bulanan',
                            'Riset hook & penulisan naskah',
                            'Editing dinamis & subtitle otomatis',
                            'Client Review Portal SLA 48 Jam',
                            'Laporan performa view & engagement',
                        ],
                    ],
                    [
                        'name' => 'Signature FYP Growth',
                        'price' => 'Rp 9.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Optimal untuk brand yang menargetkan lonjakan reach dan pertumbuhan follower cepat.',
                        'is_popular' => true,
                        'features' => [
                            '16 Video Vertikal 9:16 Bulanan',
                            'Riset tren audio harian & hook engaging',
                            'Akses talent in-house Cermin studio Malang',
                            'SLA Review Prioritas < 24 Jam di Portal',
                            'Optimasi cover video & link bio',
                            'Evaluasi strategi & meeting bulanan',
                        ],
                    ],
                    [
                        'name' => 'Dominasi FYP Viral',
                        'price' => 'Rp 16.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Volume tinggi rilis video hampir setiap hari untuk mendominasi algoritma.',
                        'is_popular' => false,
                        'features' => [
                            '26 Video Vertikal 9:16 (Posting reguler)',
                            'Full TikTok commercial marketing campaign',
                            'Dedicated Creative Director & Video Editor',
                            'Akses penuh sesi syuting studio fisik Malang',
                            'SLA Review Kilat < 12 Jam di Portal',
                        ],
                    ],
                ],
                'faqs' => [
                    [
                        'q' => 'Apakah bisnis kami harus punya orang yang berjoget di TikTok?',
                        'a' => 'Sama sekali tidak! TikTok saat ini didominasi oleh konten edukasi problem-solver, behind the scenes, storytelling produk, dan visual sinematik yang elegan.',
                    ],
                    [
                        'q' => 'Apakah biaya sudah termasuk talent / pemeran di video?',
                        'a' => 'Paket Signature dan Dominasi sudah menyediakan opsi talent in-house kami. Anda cukup mengirimkan produk ke studio kami di Malang.',
                    ],
                    [
                        'q' => 'Berapa durasi video TikTok yang ideal?',
                        'a' => 'Rata-rata 15 sampai 35 detik dengan tempo yang padat agar retensi penonton tetap tinggi hingga detik terakhir.',
                    ],
                    [
                        'q' => 'Bagaimana jika kami ingin mengintegrasikan TikTok Shop?',
                        'a' => 'Video yang kami produksi siap ditautkan ke keranjang kuning (TikTok Shop) untuk mendorong konversi penjualan langsung.',
                    ],
                ],
                'is_active' => true,
                'sort_order' => 5,
            ],

            // =================================================================
            // 6. SUB-SERVICE: JASA KELOLA FACEBOOK
            // =================================================================
            [
                'slug' => 'jasa-kelola-facebook',
                'parent_slug' => 'social-media-management',
                'title' => 'Jasa Kelola Facebook',
                'badge' => 'FACEBOOK & COMMUNITY',
                'tagline' => 'Perkuat Kehadiran Facebook Page & Loyalitas Komunitas Bisnis Anda',
                'description' => 'Layanan pengelolaan Facebook Page bisnis: perancangan postingan artikel informatif, album katalog produk terstruktur, video feed, dan strategi mempertahankan keterikatan dengan pelanggan setia.',
                'hero_visual_type' => 'dashboard',
                'theme_gradient' => 'navy',
                'meta_title' => 'Jasa Kelola Facebook Page Bisnis - Cermin Kreatif Studio Malang',
                'meta_description' => 'Jasa kelola Facebook Page perusahaan dan UMKM. Penulisan artikel edukatif, desain grafis promo, manajemen album produk, dan laporan transparan.',
                'scopes' => [
                    [
                        'title' => 'Manajemen Facebook Fanpage',
                        'subtitle' => 'Penataan bio, banner header, tombol pesan WhatsApp, dan kelengkapan informasi bisnis.',
                        'badge' => 'Halaman Resmi',
                        'icon' => 'Clock',
                    ],
                    [
                        'title' => 'Desain Postingan & Album Produk',
                        'subtitle' => 'Visual tajam beresolusi tinggi yang dirancang untuk keterbacaan di feed Facebook.',
                        'badge' => 'Katalog Visual',
                        'icon' => 'LayoutGrid',
                    ],
                    [
                        'title' => 'Copywriting Cerita & Edukasi',
                        'subtitle' => 'Artikel naratif dan ulasan produk yang relevan dengan segmen audiens Facebook dewasa dan keluarga.',
                        'badge' => 'Storytelling',
                        'icon' => 'PenTool',
                    ],
                    [
                        'title' => 'Penjadwalan & Analisis Jangkauan',
                        'subtitle' => 'Posting rutin pada jam aktif komunitas serta pelaporan jangkauan organik halaman.',
                        'badge' => 'Laporan Halaman',
                        'icon' => 'BarChart3',
                    ],
                ],
                'workflow_steps' => [
                    [
                        'step' => 1,
                        'title' => 'Audit Facebook Page & Riset Komunitas',
                        'desc' => 'Meninjau kelengkapan profil halaman dan menganalisis karakter audiens pengikut setia Anda.',
                    ],
                    [
                        'step' => 2,
                        'title' => 'Penyusunan Konten Artikel & Grafis',
                        'desc' => 'Merancang postingan gambar, carousel informasi, dan teks persuasif yang memancing diskusi.',
                    ],
                    [
                        'step' => 3,
                        'title' => 'Review di Portal & Penjadwalan Teratur',
                        'desc' => 'Klien meninjau draf materi di Client Portal sebelum postingan dijadwalkan secara sistematis.',
                    ],
                ],
                'why_us_points' => [
                    'title' => 'Kenapa Facebook Page Anda Tetap Relevan Bersama Cermin?',
                    'description' => 'Facebook adalah pasar raksasa dengan daya beli tinggi di segmen keluarga, profesional, dan komunitas lokal.',
                    'bullets' => [
                        'Penyusunan konten berbasis edukasi dan kepercayaan brand (bukan sekadar promosi langsung).',
                        'Integrasi langsung dengan Meta Business Suite untuk sinkronisasi iklan dan pesan.',
                        'Seluruh aset dirancang rapi tanpa gambar buram atau template berantakan.',
                        'Kolaborasi transparan dan disiplin jadwal rilis via Client Portal Cermin.',
                    ],
                ],
                'showcase_items' => [
                    [
                        'title' => 'Facebook Page Brand Edukasi Bisnis',
                        'category' => 'B2B & Training',
                        'image' => '/images/about/studio-workspace.jpg',
                        'metrics' => '+190% Post Engagement',
                    ],
                    [
                        'title' => 'Katalog Produk Facebook Retail',
                        'category' => 'Retail & Lifestyle',
                        'image' => '/images/about/studio-room.jpg',
                        'metrics' => 'High Discussion Rate',
                    ],
                    [
                        'title' => 'Community Post Clinic Facebook',
                        'category' => 'Healthcare & Beauty',
                        'image' => '/images/about/studio-team.jpg',
                        'metrics' => 'Trusted Brand Image',
                    ],
                ],
                'pricing_packages' => [
                    [
                        'name' => 'Starter FB',
                        'price' => 'Rp 3.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Untuk menjaga keaktifan profil bisnis dan halaman Facebook resmi.',
                        'is_popular' => false,
                        'features' => [
                            '12 Postingan Terjadwal (Gambar & Artikel)',
                            'Desain banner header Facebook Page',
                            'Copywriting informatif & ajakan interaksi',
                            'Client Review Portal SLA 48 Jam',
                            'Laporan performa bulanan',
                        ],
                    ],
                    [
                        'name' => 'Growth FB Community',
                        'price' => 'Rp 6.000.000',
                        'period' => '/bulan',
                        'tagline' => 'Paling disarankan untuk membangun interaksi dan basis pelanggan loyal.',
                        'is_popular' => true,
                        'features' => [
                            '20 Postingan Terjadwal (Termasuk video feed)',
                            'Manajemen album produk & katalog berkala',
                            'Copywriting storytelling persuasif',
                            'Review prioritas SLA < 24 Jam di Portal',
                            '2x Sesi revisi terstruktur',
                            'Laporan insight jangkauan halaman',
                        ],
                    ],
                    [
                        'name' => 'Enterprise FB Authority',
                        'price' => 'Rp 10.500.000',
                        'period' => '/bulan',
                        'tagline' => 'Skala komprehensif untuk perusahaan dan brand nasional di Facebook.',
                        'is_popular' => false,
                        'features' => [
                            '30 Postingan Terjadwal (Posting harian)',
                            'Manajemen konten grup & fanpage terpadu',
                            'Dedicated Creative Copywriter & Graphic Lead',
                            'SLA Review Kilat < 12 Jam di Portal',
                            'Meeting strategi dan evaluasi berkala',
                        ],
                    ],
                ],
                'faqs' => [
                    [
                        'q' => 'Apakah Facebook masih efektif untuk pemasaran bisnis saat ini?',
                        'a' => 'Sangat efektif! Facebook memiliki pengguna aktif harian terbesar di Indonesia pada demografi usia matang (25-50+ tahun) yang memiliki daya beli tinggi untuk produk kesehatan, keluarga, properti, dan F&B.',
                    ],
                    [
                        'q' => 'Apakah postingan di Facebook bisa otomatis sama dengan Instagram?',
                        'a' => 'Bisa, tetapi kami menyarankan format yang sedikit disesuaikan karena audiens Facebook lebih menyukai teks deskriptif yang mengalir, sementara Instagram lebih fokus pada estetika visual gambar dan video.',
                    ],
                    [
                        'q' => 'Bagaimana jika kami ingin mengiklankan postingan dengan Facebook Ads?',
                        'a' => 'Seluruh aset yang kami rancang telah mematuhi aturan teks Meta Ads sehingga siap dijadikan materi kampanye iklan bersponsor kapan pun Anda inginkan.',
                    ],
                ],
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($services as $data) {
            Service::updateOrCreate(
                ['slug' => $data['slug']],
                $data
            );
        }
    }
}

