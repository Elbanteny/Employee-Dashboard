# 🏢 Employee Master Hub (Buku Induk Karyawan)

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

Employee Master Hub adalah aplikasi manajemen database karyawan modern yang dibangun untuk efisiensi administrasi SDM. Project ini mengimplementasikan konsep **Modern Monolith** menggunakan stack Laravel + Inertia.js + React.

## 🚀 Fitur Utama

- **Dashboard Analytics**: Visualisasi sebaran karyawan per departemen menggunakan Recharts.
- **Advanced CRUD**: Pengelolaan data karyawan lengkap dengan fitur upload foto profil.
- **Smart Validation**: Validasi data berlapis (Regex pada Frontend & Strict Rules pada Backend).
- **Security First**: Autentikasi sistem menggunakan Laravel Breeze untuk proteksi data admin.
- **Dynamic Search & Pagination**: Pencarian data cepat tanpa reload halaman (SPA experience).

## 🛠️ Tech Stack

- **Backend:** PHP 8.x, Laravel 12
- **Frontend:** React.js, Inertia.js (Bridge), Tailwind CSS
- **Database:** MySQL
- **Visualisasi:** Recharts (Chart.js implementation)

## 📦 Instalasi Manual

1. **Clone repositori**
    ```bash
    git clone https://github.com/Elbanteny/Employee-Dashboard
    cd Employee-Dashboard
    ```
2. **Instal Dependensi**
    ```bash
    composer install
    npm install
    ```
3. **Konfigurasi Environment**
    ```bash
    cp .env.example .env
    php artisan key:generate
    php artisan storage:link
    ```
4. **Migrasi Database & Seeder**
    ```bash
    php artisan migrate --seed
    ```
5. **Jalankan Aplikasi**
    ```bash
    composer run dev
    ```

## 📦 Instalasi dengan Docker

1.  **Clone & Masuk ke Folder**
    ```bash
    git clone https://github.com/Elbanteny/Employee-Dashboard
    cd Employee-Dashboard
    ```
2.  **Setup Environment**
    ```bash
    cp .env.example .env
    ```
3.  **Jalankan Laravel Sail**

    ```bash
    docker run --rm \
     -u "$(id -u):$(id -g)" \
     -v "$(pwd):/var/www/html" \
     -w /var/www/html \
     laravelsail/php82-composer:latest \
     composer install --ignore-platform-reqs

    ./vendor/bin/sail up -d
    ```

4.  **Persiapkan Database & App**
    ```bash
    ./vendor/bin/sail artisan key:generate
    ./vendor/bin/sail artisan migrate --seed
    ./vendor/bin/sail artisan storage:link
    ./vendor/bin/sail npm install
    ./vendor/bin/sail npm run build
    ```
