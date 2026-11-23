# DESIGN.md — Standar Desain Resmi Cermin Kreatif (Anti-Slop System)

Dokumen ini adalah **kontrak hukum desain tunggal (*Single Source of Truth*)** untuk seluruh antarmuka aplikasi Cermin Kreatif (Dashboard Admin, Portal Klien, dan Komponen Review). 

Diadopsi dari kurasi ketat **Impeccable** dan prinsip **design-taste-frontend (app-screens)**. Setiap agen AI atau developer yang menyentuh kode antarmuka **WAJIB mematuhi aturan di bawah ini**.

---

## 1. Lima Hukum Besi Desain (Non-Negotiable Core Rules)

1. **Arsitektur Shell Statis (Anti-Jitter / Anti-Melompat):**
   * Kontainer utama aplikasi adalah `h-screen w-full flex overflow-hidden font-sans antialiased`.
   * Sidebar desktop **wajib statis** (`md:static md:h-full w-64 shrink-0 border-r border-zinc-200 bg-white`).
   * **DILARANG** menggunakan `sticky top-10`, `calc(100vh - 2.5rem)`, atau class yang membuat sidebar melompat saat berpindah halaman atau menggulir konten.
   * Header berada di atas (`shrink-0`), dan **hanya area `<main>` yang menggulir (*overflow-y-auto*)**.

2. **Larangan Mutlak Emoji di Elemen Antarmuka (No Emoji Chrome):**
   * **DILARANG** menggunakan emoji mentah sistem operasi (`📍`, `📄`, `✍️`, `✅`, `⏳`, `💡`, `☕`, `🌿`, dll.) sebagai ikon tombol, badge status, bullet points, atau hiasan judul.
   * Semua indikator visual **wajib** menggunakan tipografi presisi atau ikon SVG Lucide berukuran 14px–16px (`w-3.5 h-3.5` / `w-4 h-4`) dengan stroke bersih.

3. **Warna untuk Data, Bukan untuk Chrome (Colour on Data):**
   * Latar belakang tombol, kartu, dan navigasi harus tenang dan netral (putih, `zinc-50`, `zinc-100`, teks `zinc-900`).
   * Aksen warna hanya diperbolehkan untuk status data nyata:
     - Hijau Emerald (`emerald-600` / `bg-emerald-50`): Data disetujui, lunas, atau selesai.
     - Kuning Amber (`amber-600` / `bg-amber-50`): Data butuh perhatian, review tertahan, atau revisi.
     - Merah Rose (`rose-600` / `bg-rose-50`): Galat, batas SLA habis, atau penolakan.
   * **DILARANG** membuat gradien ungu/biru acak khas AI slop.

4. **Permukaan Rata (Flat Surfaces & Zero Shadow Soup):**
   * Pemisah antarkartu dan panel hanya menggunakan garis tipis 1px netral: `border border-zinc-200` atau `border-zinc-200/80`.
   * **DILARANG** menumpuk bayangan acak (`shadow-[0_2px_12px_rgba(0,0,0,0.03)]`, `shadow-md`, `ring-2`) yang membuat antarmuka terasa kotor dan tidak konsisten.

5. **Metrik Berbasis Tipografi, Bukan Kotak Ikon (Type, Not Tiles):**
   * Angka KPI dan metrik bisnis ditonjolkan lewat ketebalan tipografi (`text-2xl font-bold font-inter tracking-tight text-zinc-950`).
   * **DILARANG** menaruh ikon metrik di dalam lingkaran berwarna-warni mencolok di samping angka.

---

## 2. Palet Token Warna Resmi (Monochrome Zinc Architecture)

| Token | Nilai Tailwind | Penggunaan |
| :--- | :--- | :--- |
| **Canvas Background** | `bg-zinc-50` / `bg-zinc-50/50` | Latar belakang utama seluruh halaman |
| **Card / Panel Surface** | `bg-white` | Kartu konten, modal, dan sidebar |
| **Subtle Hover** | `hover:bg-zinc-100/80` | Status hover tombol dan baris tabel |
| **Primary Inactive** | `bg-zinc-100 text-zinc-800` | Tag kategori, pill non-aktif |
| **Primary Active** | `bg-zinc-900 text-white` | Tombol aksi utama, tab aktif |
| **Hairline Border** | `border-zinc-200` | Pemisah resmi seluruh kontainer kartu |
| **Muted Border** | `border-zinc-100` | Garis pemisah internal (*divider*) |
| **Text Primary (Ink)** | `text-zinc-950` / `text-zinc-900` | Judul, angka metrik, teks penting |
| **Text Secondary** | `text-zinc-600` / `text-zinc-500` | Paragraf penjelasan, label bantuan |
| **Text Tertiary** | `text-zinc-400` | Timestamp, nomor draf, placeholder |

---

## 3. Skala Tipografi (Typography Hierarchy)

* **Font Utama (Display & Headings):** `Plus Jakarta Sans`, sans-serif.
* **Font Antarmuka & Data (Numbers & UI):** `Inter`, font-mono untuk timestamp/durasi.

| Elemen | Ukuran & Bobot | Kelas Tailwind |
| :--- | :--- | :--- |
| **H1 (Page Title)** | 24px–28px, Semibold | `text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900` |
| **H2 / H3 (Card Title)** | 14px–16px, Semibold | `text-sm sm:text-base font-semibold text-zinc-900` |
| **Metric Large** | 24px–30px, Bold (Inter) | `text-2xl sm:text-3xl font-bold font-inter text-zinc-950 tracking-tight` |
| **Body Standard** | 12px–13px, Normal/Light | `text-xs text-zinc-700 leading-relaxed font-light` |
| **Microcopy & Tags** | 10px–11px, Medium/Inter | `text-[10px] sm:text-[11px] font-inter font-medium text-zinc-500` |

---

## 4. Standar Interaksi & Komponen Studio

### A. Tombol Aksi (Buttons)
* **Primary:** `px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition cursor-pointer shadow-xs`.
* **Secondary:** `px-3.5 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition cursor-pointer`.
* **Tag / Category Pill:** `px-2.5 py-1 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-[11px] font-inter font-medium transition cursor-pointer shadow-2xs`.

### B. Indikator Status (Badges)
Gunakan format minimalis: titik bulat 6px + teks:
```tsx
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px] font-medium font-inter">
  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
  <span>Siap Tayang</span>
</div>
```

---

## 5. Peran Skill (Hierarki Kerja)

1. **`impeccable`:**
   * Menjalankan audit kualitas (`impeccable detect`) dan eksekusi instruksi presisi (`polish`, `bolder`, `quieter`, `distill`, `harden`).
2. **`design-taste-frontend (app-screens)`:**
   * Penjaga filosofi tata letak dashboard bisnis (arsitektur shell tetap, pemisah 1px netral, zero shadow soup).
3. **`bahasa-skills`:**
   * Penjaga mutu teks bahasa Indonesia bebas slop mesin (dengan scanner `periksa.py`).

*Semua skill styling di luar daftar di atas resmi diabaikan untuk mencegah kebingungan model AI.*

