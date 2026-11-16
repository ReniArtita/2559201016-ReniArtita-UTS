# UTS Pemrograman Web Dasar - Website Portofolio Pribadi

## Identitas
- Nama: Reni Artita
- NIM: 2559201016
- Program Studi: Sistem dan Teknologi Informasi, Fakultas Sains dan Informatika, Universitas Pertiba
- Mata kuliah: Pemrograman Web Dasar (semester 3)
- Dosen: Ditra liandaputra., S.Kom., M.Kom

## Tema dan Objek
Tema C: Portofolio pribadi. Objek: Reni Artita sebagai calon pengembang web dan aplikasi.

## Daftar Fitur
**Halaman (4, navigasi sama di semua halaman)**
- Beranda: hero (judul, tagline, tombol ajakan), ringkasan, 3 proyek unggulan
- Tentang: profil, visi, keahlian, foto, tabel riwayat pendidikan
- Katalog: 6 proyek dalam bentuk kartu (gambar, nama, deskripsi, kategori, tahun)
- Kontak: alamat, media sosial, peta Google Maps, formulir kontak

**HTML**
- Elemen semantik: header, nav, main, section, article, address, footer
- Tabel dengan thead dan tbody
- Semua gambar memiliki atribut alt
- Formulir dengan label (for/id), required, type="email", type="tel" dengan pattern, select, textarea dengan minlength dan maxlength

**CSS (css/style.css)**
- Flexbox untuk navigasi, grid untuk katalog
- Variabel CSS di :root
- Media query HP (maksimal 600px) dan desktop (minimal 992px)
- Efek interaksi: hover, transition, dan animasi @keyframes pada hero

**JavaScript (js/script.js, bonus)**
- Menu hamburger dengan classList.toggle
- Validasi formulir dengan pesan di bawah kolom dan pesan sukses
- Katalog dinamis: cari nama, filter kategori, dan urut nama dari array objek

## Sumber Gambar
- Foto profil: foto pribadi
- Gambar proyek: tangkapan layar karya sendiri 
- Font: Google Fonts (Poppins)

## Kendala dan Cara Mengatasi
- Menu hamburger tidak muncul atau tidak berfungsi di HP.
 Penyebabnya awalnya tombol menu tidak disembunyikan di desktop dan menu belum diberi class pengatur. 
 Solusinya memakai media query (maksimal 600px) untuk menampilkan tombol, lalu `classList.toggle` di JavaScript untuk membuka dan menutup menu, serta memperbarui `aria-expanded`.
- Path gambar, CSS, atau JS tidak terbaca.
 Gambar muncul rusak karena salah nama file (huruf besar/kecil, atau ekstensi .jpg/.jpeg/.png tertukar). 
 Solusinya memeriksa nama file di folder `img/` dan memastikan penulisan di HTML sama persis.
- Tata letak katalog berantakan di ukuran layar berbeda.
 Kartu tidak rapi saat layar dikecilkan. 
 Solusinya memakai CSS Grid untuk katalog dan mengatur jumlah kolom lewat media query HP dan desktop.
- Saat mengunggah ke GitHub yaitu folder css, js, dan img awalnya tidak terbentuk dan file tersebar di halaman utama,
 lalu diperbaiki dengan me-rename file dari GitHub.

## Tautan
- Repositori: https://github.com/ReniArtita/UTS-PemrogramanWeb 
- GitHub Pages/Netlify (opsional): https://reniartita.github.io/UTS-PemrogramanWeb/
