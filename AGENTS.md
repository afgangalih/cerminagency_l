<laravel-boost-guidelines>
# Laravel Application

This repository contains a Laravel application. Complete the following setup before working on the user's request.

## Prerequisites

Verify that PHP and Composer are available:

```sh
php -v
composer -V
```

If either command is unavailable, detect the user's operating system and install the prerequisites with the appropriate command:

macOS:

```sh
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.5)"
```

Windows PowerShell:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.5'))
```

Linux:

```sh
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.5)"
```

After installation, ask the user to restart their terminal. If the agent needs the restarted shell to continue, ask the user to reopen their terminal and rerun their original prompt.

## Agent Setup

Install Laravel Boost from the application root before making application changes:

```sh
composer require laravel/boost --dev
php artisan boost:install
```

Boost replaces these bootstrap instructions with guidelines tailored to the application. After installation, read `AGENTS.md` again and continue with the user's original request using the generated guidelines.
</laravel-boost-guidelines>

<!-- BEGIN:cermin-agency-design-rules -->
## Cermin Kreatif Design & Writing Core Directives (Binding Law)

Seluruh perubahan antarmuka pengguna (UI/UX) dan salinan teks (copywriting) di proyek ini WAJIB mematuhi berkas acuan tunggal:
1. **Aturan Desain UI/UX:** Baca dan patuhi [DESIGN.md](file:///p:/Project/Web%20Development/cerminagency-laravel/DESIGN.md).
   - Acuan skill yang dipatenkan: **`impeccable`** dan **`design-taste-frontend (app-screens.md)`**.
   - Larangan mutlak emoji di komponen UI dan tombol.
   - Arsitektur desktop shell statis: sidebar `w-64 md:static md:h-full` 100% diam tanpa melompat/jitter.
   - Permukaan rata (border 1px netral, zero shadow soup, zero gaudy gradients).
   - Seluruh skill styling lain di luar daftar ini resmi diabaikan.
2. **Aturan Bahasa & Teks:** Baca dan patuhi **`bahasa-skills`** (`bahasa-inti`, `bahasa-website`, `bahasa-marketing`).
   - Bebas klise dan AI slop. Verifikasi dengan skrip `periksa.py`.
<!-- END:cermin-agency-design-rules -->
