// =====================================================
// script.js - JavaScript murni (tanpa pustaka pihak ketiga)
// Fitur: (1) menu hamburger, (2) validasi formulir, (3) filter katalog
// =====================================================

// Tandai bahwa JavaScript aktif, supaya CSS boleh menyembunyikan menu di HP.
// Tanpa JavaScript, menu tetap tampil penuh.
document.body.classList.add('js-aktif');

// -----------------------------------------------------
// 1. MENU HAMBURGER (3 poin)
// -----------------------------------------------------
var tombolMenu = document.getElementById('tombol-menu');
var menuUtama = document.getElementById('menu-utama');

if (tombolMenu && menuUtama) {
  tombolMenu.addEventListener('click', function () {
    var terbuka = menuUtama.classList.toggle('terbuka');
    tombolMenu.setAttribute('aria-expanded', String(terbuka));
    tombolMenu.setAttribute('aria-label', terbuka ? 'Tutup menu' : 'Buka menu');
  });
}

// -----------------------------------------------------
// 2. VALIDASI FORMULIR (3 poin)
// Pesan kesalahan tampil di bawah kolom, bukan alert.
// -----------------------------------------------------
var formKontak = document.getElementById('form-kontak');

if (formKontak) {
  // Matikan bubble bawaan browser agar pesan tampil di bawah kolom.
  // Tanpa JavaScript, validasi HTML5 bawaan tetap bekerja.
  formKontak.noValidate = true;

  var pesanSukses = document.getElementById('pesan-sukses');

  function ambilPesanError(kolom) {
    var v = kolom.validity;

    if (v.valueMissing) {
      return 'Kolom ini wajib diisi.';
    }
    if (v.typeMismatch) {
      return 'Format email tidak valid.';
    }
    if (v.patternMismatch) {
      return 'Nomor HP harus 10 sampai 13 digit angka.';
    }
    if (v.tooShort) {
      return 'Minimal ' + kolom.minLength + ' karakter.';
    }
    if (v.tooLong) {
      return 'Maksimal ' + kolom.maxLength + ' karakter.';
    }
    return '';
  }

  function periksaKolom(kolom) {
    var tempatPesan = kolom.parentElement.querySelector('.pesan-error');
    var pesan = ambilPesanError(kolom);

    tempatPesan.textContent = pesan;
    kolom.classList.toggle('salah', pesan !== '');
    return pesan === '';
  }

  var semuaKolom = formKontak.querySelectorAll('input, select, textarea');

  // Periksa ulang saat pengguna mengetik atau memilih
  semuaKolom.forEach(function (kolom) {
    kolom.addEventListener('input', function () {
      periksaKolom(kolom);
      pesanSukses.hidden = true;
    });
    kolom.addEventListener('change', function () {
      periksaKolom(kolom);
    });
  });

  formKontak.addEventListener('submit', function (e) {
    e.preventDefault();

    var formValid = true;
    var kolomPertamaSalah = null;

    semuaKolom.forEach(function (kolom) {
      if (!periksaKolom(kolom)) {
        formValid = false;
        if (!kolomPertamaSalah) {
          kolomPertamaSalah = kolom;
        }
      }
    });

    if (formValid) {
      pesanSukses.hidden = false;
      formKontak.reset();
    } else {
      pesanSukses.hidden = true;
      kolomPertamaSalah.focus();
    }
  });
}

// -----------------------------------------------------
// 3. FITUR DINAMIS KATALOG (4 poin)
// Data berupa array objek yang dirender ke DOM.
// Fitur: cari nama, filter kategori, dan urut nama.
// -----------------------------------------------------
var gridKatalog = document.getElementById('grid-katalog');

if (gridKatalog) {
  var kontrolKatalog = document.getElementById('kontrol-katalog');
  var pesanKosong = document.getElementById('pesan-kosong');

  // Langkah 1: ubah kartu di HTML menjadi array objek
  var dataProyek = [];

  gridKatalog.querySelectorAll('article').forEach(function (kartu) {
    var gambar = kartu.querySelector('img');
    var paragraf = kartu.querySelectorAll('p');
    var tahun = paragraf[1].textContent.match(/\d{4}/);

    dataProyek.push({
      nama: kartu.querySelector('h2').textContent,
      deskripsi: paragraf[0].textContent,
      kategori: kartu.dataset.kategori,
      tahun: tahun ? tahun[0] : '',
      gambar: gambar.getAttribute('src'),
      alt: gambar.getAttribute('alt')
    });
  });

  // Langkah 2: buat kontrol pencarian, filter, dan urutan
  var kolomCari = document.createElement('input');
  kolomCari.type = 'search';
  kolomCari.placeholder = 'Cari nama proyek...';
  kolomCari.setAttribute('aria-label', 'Cari nama proyek');

  var pilihKategori = document.createElement('select');
  pilihKategori.setAttribute('aria-label', 'Filter kategori');

  var daftarKategori = ['Semua'];
  dataProyek.forEach(function (proyek) {
    if (daftarKategori.indexOf(proyek.kategori) === -1) {
      daftarKategori.push(proyek.kategori);
    }
  });
  daftarKategori.forEach(function (kategori) {
    var opsi = document.createElement('option');
    opsi.value = kategori;
    opsi.textContent = kategori === 'Semua' ? 'Semua kategori' : kategori;
    pilihKategori.appendChild(opsi);
  });

  var pilihUrutan = document.createElement('select');
  pilihUrutan.setAttribute('aria-label', 'Urutkan proyek');
  [
    { nilai: 'asli', teks: 'Urutan asli' },
    { nilai: 'az', teks: 'Nama A-Z' },
    { nilai: 'za', teks: 'Nama Z-A' }
  ].forEach(function (u) {
    var opsi = document.createElement('option');
    opsi.value = u.nilai;
    opsi.textContent = u.teks;
    pilihUrutan.appendChild(opsi);
  });

  kontrolKatalog.appendChild(kolomCari);
  kontrolKatalog.appendChild(pilihKategori);
  kontrolKatalog.appendChild(pilihUrutan);

  // Langkah 3: fungsi yang membuat satu kartu dari satu objek
  function buatKartu(proyek) {
    var kartu = document.createElement('article');
    kartu.className = 'kartu';
    kartu.dataset.kategori = proyek.kategori;

    var gambar = document.createElement('img');
    gambar.src = proyek.gambar;
    gambar.alt = proyek.alt;

    var judul = document.createElement('h2');
    judul.textContent = proyek.nama;

    var deskripsi = document.createElement('p');
    deskripsi.textContent = proyek.deskripsi;

    var meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = 'Kategori: ' + proyek.kategori + ' | Tahun: ' + proyek.tahun;

    kartu.appendChild(gambar);
    kartu.appendChild(judul);
    kartu.appendChild(deskripsi);
    kartu.appendChild(meta);
    return kartu;
  }

  // Langkah 4: saring, urutkan, lalu render ke DOM
  function tampilkanKatalog() {
    var kataKunci = kolomCari.value.trim().toLowerCase();
    var kategoriDipilih = pilihKategori.value;

    var hasil = dataProyek.filter(function (proyek) {
      var cocokNama = proyek.nama.toLowerCase().indexOf(kataKunci) !== -1;
      var cocokKategori = kategoriDipilih === 'Semua' || proyek.kategori === kategoriDipilih;
      return cocokNama && cocokKategori;
    });

    if (pilihUrutan.value === 'az') {
      hasil.sort(function (a, b) { return a.nama.localeCompare(b.nama); });
    } else if (pilihUrutan.value === 'za') {
      hasil.sort(function (a, b) { return b.nama.localeCompare(a.nama); });
    }

    gridKatalog.textContent = '';
    hasil.forEach(function (proyek) {
      gridKatalog.appendChild(buatKartu(proyek));
    });

    pesanKosong.hidden = hasil.length !== 0;
  }

  kolomCari.addEventListener('input', tampilkanKatalog);
  pilihKategori.addEventListener('change', tampilkanKatalog);
  pilihUrutan.addEventListener('change', tampilkanKatalog);

  tampilkanKatalog();
}
