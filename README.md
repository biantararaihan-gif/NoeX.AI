# 🚀 NoeX.ai — Modern AI Chat & Dashboard UI Prototype

**NoeX.ai** adalah prototipe antarmuka pengguna (UI/UX) berbasis web untuk aplikasi AI Chat modern. Dibuat menggunakan **HTML5**, **Tailwind CSS**, dan **Vanilla JavaScript (ES6+)**, template ini dirancang dengan estetika modern, responsif, serta kaya akan fitur interaktif tanpa membutuhkan *framework* berat.

---

## ✨ Fitur Utama

### 🔐 1. Alur Autentikasi Modern (`#view-auth`)
- **Dual Tab Interface:** Peralihan mulus antara form **Masuk** dan **Daftar Akun**.
- **Opsi OAuth:** UI siap pakai untuk integrasi Google, GitHub, dan Apple.
- **Interaktivitas:** Sakelar visibilitas kata sandi (*show/hide password*), *forgot password handler*, serta banner notifikasi/alert.

### 💬 2. Dashboard Chat Interaktif (`#view-app`)
- **Sidebar Riwayat Percakapan:** 
  - Pengelompokan riwayat otomatis (*Hari ini*, *Kemarin*, *7 hari terakhir*).
  - Fitur pencarian percakapan *real-time*.
  - Mode responsif dengan *drawer* seluler dan efek *backdrop scrim*.
- **Area Chat & Input:**
  - Kartu ide/saran cepat (*quick prompt suggestions*) pada tampilan awal.
  - Pemilih model AI (*NoeX Cepat*, *NoeX Pro*, *NoeX Nalar*).
  - *Textarea* dinamis yang menyesuaikan tinggi secara otomatis (*auto-resizing*).
  - Indikator pengetikan (*typing indicator animation*).
  - Tombol salin pesan (*copy to clipboard*) pada setiap balasan AI.

### 💳 3. Modal Simulasi Pembayaran (`#pay-modal`)
- **Stepped Checkout Flow:** Penjelasan benefit Pro $\rightarrow$ Pemilihan Metode Pembayaran $\rightarrow$ Rincian Bayar $\rightarrow$ Tampilan Sukses.
- **Generator QRIS & Kode Bayar:** Ditenagai generator SVG internal untuk simulasi QRIS, Virtual Account bank, E-Wallet, dan retail.

### 🌙 4. Manajemen Tema & Sesi
- **Dark / Light Mode:** Deteksi otomatis preferensi OS (`prefers-color-scheme`) dan opsi sakelar manual yang tersimpan di `localStorage`.
- **Persistensi Sesi:** Menyimpan status login dan paket pengguna (*Free* / *Pro*) menggunakan `sessionStorage`.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5** — Struktur dokumen semantik dan aksesibel.
- **Tailwind CSS (v3 CDN)** — Utilitas styling responsif dan tema warna kustom.
- **Vanilla JavaScript (ES6+)** — Logika UI, manajemen state lokal, manipulasi DOM, dan event handling.
- **Typography:**
  - *Display:* [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque)
  - *Body:* [Figtree](https://fonts.google.com/specimen/Figtree)

---

## 🚀 Cara Menjalankan Project

Karena proyek ini dibuat menggunakan Vanilla JS dan Tailwind CDN, Anda tidak perlu menginstal dependensi `node_modules` untuk melihat hasilnya.

### Opsi 1: Buka Langsung
1. Clone repositori ini:
   ```bash
   git clone [https://github.com/username-anda/noex-ai-ui.git](https://github.com/username-anda/noex-ai-ui.git)
