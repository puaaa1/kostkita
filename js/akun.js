(function () {
  var isi = document.getElementById('isi');
  var panah = ikon('next');

  /* ===== Data dari halaman anggota lain ===== */
  function riwayat() { return akBaca('riwayatBooking', []); }      /* dari pembayaran.js */
  function favorit() { return akBaca('favorit', []); }              /* dari detail.js */
  function semuaUlasan() { return akBaca('ulasanSaya', []); }       /* dibuat di halaman ini */
  function ulasanUntuk(kode) {
    return semuaUlasan().filter(function (u) { return u.kode === kode; })[0] || null;
  }

  function bintang(n) {
    var s = '';
    for (var i = 0; i < n; i++) s += ikon('star');
    return s;
  }

  /* ===== Tampilan belum masuk ===== */
  function tampilTamu() {
    return '' +
      '<h2 class="ak-halaman">Akun Saya</h2>' +
      '<div class="ak-kartu ak-tamu">' +
        '<div class="ak-avatar">' + ikon('user') + '</div>' +
        '<strong>Kamu belum masuk</strong>' +
        '<p>Masuk untuk menyimpan kos favorit, memantau booking, dan memberi ulasan.</p>' +
        '<a href="masuk.html" class="ak-tombol">Masuk</a>' +
        '<a href="daftar.html" class="ak-tombol ak-tombol-garis">Daftar gratis</a>' +
      '</div>' +
      '<div class="ak-bagian">Pengaturan</div>' +
      '<div class="ak-kartu ak-menu">' +
        '<button type="button" data-aksi="bantuan">Bantuan / FAQ' + panah + '</button>' +
        '<button type="button" data-aksi="tentang">Tentang kami' + panah + '</button>' +
      '</div>';
  }

  /* ===== Tampilan sudah masuk ===== */
  function kartuBooking(b) {
    var akhir = bkTambahBulan(b.mulai, b.durasi);
    var selesai = akhir < bkHariIni();
    var ul = ulasanUntuk(b.kode);
    var bawah = '';
    if (selesai) {
      bawah = ul
        ? '<div class="ak-ulasan-kecil">Ulasanmu: ' + bintang(ul.bintang) + '</div>'
        : '<button type="button" class="ak-tombol-ulas" data-aksi="ulas" data-kode="' + akAman(b.kode) + '">Beri ulasan</button>';
    }
    return '' +
      '<div class="ak-kartu ak-booking">' +
        '<span class="ak-lencana' + (selesai ? ' selesai' : '') + '">' + (selesai ? 'Selesai' : akAman(b.status || 'Dikonfirmasi')) + '</span>' +
        '<strong>' + akAman(b.namaKos) + '</strong>' +
        '<p>' + (selesai
          ? bkTanggalIndo(b.mulai) + ' - ' + bkTanggalIndo(akhir)
          : 'Masuk ' + bkTanggalIndo(b.mulai) + ' &middot; ' + b.durasi + ' bulan &middot; DP ' + rupiah(b.dp)) + '</p>' +
        '<p>Kode ' + akAman(b.kode) + '</p>' +
        bawah +
      '</div>';
  }

  function tampilMasuk(akun) {
    var daftar = riwayat();
    var htmlRiwayat = daftar.length
      ? daftar.map(kartuBooking).join('')
      : '<div class="ak-kartu ak-kosong">Belum ada booking. <a href="cari.html">Cari kos sekarang</a></div>';

    return '' +
      '<h2 class="ak-halaman">Akun Saya</h2>' +
      '<div class="ak-kartu ak-profil">' +
        '<div class="ak-avatar">' + ikon('user') + '</div>' +
        '<div><strong>' + akAman(akun.nama) + '</strong><span>' + akAman(akun.email) + '</span><span>' + akAman(akun.hp) + '</span></div>' +
      '</div>' +
      '<div class="ak-bagian">Riwayat booking</div>' +
      htmlRiwayat +
      '<div class="ak-bagian">Pengaturan</div>' +
      '<div class="ak-kartu ak-menu">' +
        '<button type="button" data-aksi="profil">Edit profil' + panah + '</button>' +
        '<button type="button" data-aksi="favorit">Kos favorit' + panah + '</button>' +
        '<button type="button" data-aksi="ulasan">Ulasan saya' + panah + '</button>' +
        '<button type="button" data-aksi="bantuan">Bantuan / FAQ' + panah + '</button>' +
        '<button type="button" data-aksi="tentang">Tentang kami' + panah + '</button>' +
      '</div>' +
      '<button type="button" class="ak-keluar" data-aksi="keluar">Keluar</button>';
  }

  function render() {
    var akun = akSesi();
    isi.innerHTML = akun ? tampilMasuk(akun) : tampilTamu();
  }

  /* ===== Lembar-lembar menu ===== */

  function lembarProfil() {
    var akun = akSesi();
    var s = akSheet('Edit profil',
      '<label class="ak-label" for="eNama">Nama Lengkap</label>' +
      '<input class="ak-input" id="eNama" type="text" value="' + akAman(akun.nama) + '">' +
      '<p class="ak-galat" id="eNamaGalat" role="alert"></p>' +
      '<label class="ak-label" for="eEmail">Email</label>' +
      '<input class="ak-input" id="eEmail" type="email" value="' + akAman(akun.email) + '">' +
      '<p class="ak-galat" id="eEmailGalat" role="alert"></p>' +
      '<label class="ak-label" for="eHp">No. HP</label>' +
      '<input class="ak-input" id="eHp" type="tel" value="' + akAman(akun.hp) + '">' +
      '<p class="ak-galat" id="eHpGalat" role="alert"></p>' +
      '<button type="button" class="ak-tombol" id="eSimpan">Simpan</button>');

    var nama = s.el.querySelector('#eNama');
    var email = s.el.querySelector('#eEmail');
    var hp = s.el.querySelector('#eHp');
    [nama, email, hp].forEach(function (el) {
      el.addEventListener('input', function () { akGalat(el, ''); });
    });

    s.el.querySelector('#eSimpan').addEventListener('click', function () {
      var galatNama = nama.value.trim().length < 3 ? 'Nama minimal 3 huruf.' : '';
      var surel = email.value.trim().toLowerCase();
      var galatEmail = !akEmailValid(surel) ? 'Format email belum sesuai.' : '';
      var galatHp = !akHpValid(hp.value) ? 'No. HP belum sesuai. Contoh: 08123456789.' : '';

      /* Email / HP tidak boleh sama dengan akun orang lain */
      var lain = akSemuaAkun().filter(function (a) { return a.id !== akun.id; });
      if (!galatEmail && lain.some(function (a) { return a.email === surel; })) galatEmail = 'Email ini sudah dipakai akun lain.';
      if (!galatHp && lain.some(function (a) { return a.hp === akNormHp(hp.value); })) galatHp = 'No. HP ini sudah dipakai akun lain.';

      akGalat(nama, galatNama); akGalat(email, galatEmail); akGalat(hp, galatHp);
      if (galatNama || galatEmail || galatHp) return;

      var semua = akSemuaAkun();
      semua.forEach(function (a) {
        if (a.id === akun.id) { a.nama = nama.value.trim(); a.email = surel; a.hp = akNormHp(hp.value); }
      });
      akSimpan(AK_KUNCI_AKUN, semua);
      s.tutup();
      render();
      akPopup('check', 'Profil diperbarui', 'Perubahan datamu sudah disimpan.');
    });
  }

  function lembarFavorit() {
    var ids = favorit().filter(function (id) { return DATA_KOS[id]; });
    var s = akSheet('Kos favorit', ids.length ? '' : '<p class="ak-kosong">Belum ada kos favorit. Ketuk ikon hati di halaman detail kos untuk menyimpannya.</p>');
    if (!ids.length) return;

    function gambar() {
      var sisa = favorit().filter(function (id) { return DATA_KOS[id]; });
      s.el.innerHTML = sisa.length ? sisa.map(function (id) {
        var k = DATA_KOS[id];
        return '<div class="ak-baris-kos">' +
          '<a href="detail.html?id=' + k.id + '"><strong>' + akAman(k.nama) + '</strong>' +
          '<span>' + akAman(k.tipe) + ' &middot; ' + rupiah(k.harga) + '/bulan</span></a>' +
          '<button type="button" data-hapus="' + k.id + '" aria-label="Hapus ' + akAman(k.nama) + ' dari favorit">' + ikon('heart') + '</button>' +
        '</div>';
      }).join('') : '<p class="ak-kosong">Belum ada kos favorit.</p>';
    }
    gambar();
    s.el.addEventListener('click', function (e) {
      var t = e.target.closest('[data-hapus]');
      if (!t) return;
      akSimpan('favorit', favorit().filter(function (id) { return id !== t.getAttribute('data-hapus'); }));
      gambar();
    });
  }

  function lembarUlasan() {
    var u = semuaUlasan();
    akSheet('Ulasan saya', u.length ? u.map(function (x) {
      var nama = DATA_KOS[x.kosId] ? DATA_KOS[x.kosId].nama : 'Kos';
      return '<div class="ak-ulasan-item"><strong>' + akAman(nama) + '</strong><div>' + bintang(x.bintang) + '</div>' +
        (x.teks ? '<p>' + akAman(x.teks) + '</p>' : '') + '</div>';
    }).join('') : '<p class="ak-kosong">Belum ada ulasan. Setelah masa sewa selesai, kamu bisa memberi ulasan dari riwayat booking.</p>');
  }

  function lembarBeriUlasan(kode) {
    var b = riwayat().filter(function (x) { return x.kode === kode; })[0];
    if (!b) return;
    var nilai = 0;
    var s = akSheet('Beri ulasan',
      '<p>Bagaimana pengalamanmu di <strong>' + akAman(b.namaKos) + '</strong>?</p>' +
      '<div class="ak-bintang" role="group" aria-label="Pilih bintang">' +
        [1, 2, 3, 4, 5].map(function (n) {
          return '<button type="button" data-n="' + n + '" aria-label="' + n + ' bintang">' + ikon('star') + '</button>';
        }).join('') +
      '</div>' +
      '<p class="ak-galat" id="uBintangGalat" role="alert"></p>' +
      '<label class="ak-label" for="uTeks">Ceritakan pengalamanmu (opsional)</label>' +
      '<textarea class="ak-area" id="uTeks" maxlength="300" placeholder="Kamarnya bersih, pemiliknya ramah..."></textarea>' +
      '<button type="button" class="ak-tombol" id="uKirim">Kirim ulasan</button>');

    var tombolBintang = s.el.querySelectorAll('.ak-bintang button');
    tombolBintang.forEach(function (t) {
      t.addEventListener('click', function () {
        nilai = +t.getAttribute('data-n');
        tombolBintang.forEach(function (x) { x.classList.toggle('on', +x.getAttribute('data-n') <= nilai); });
        s.el.querySelector('#uBintangGalat').textContent = '';
      });
    });

    s.el.querySelector('#uKirim').addEventListener('click', function () {
      if (!nilai) { s.el.querySelector('#uBintangGalat').textContent = 'Pilih jumlah bintang dulu ya.'; return; }
      var u = semuaUlasan();
      u.unshift({ kode: kode, kosId: b.kosId, bintang: nilai, teks: s.el.querySelector('#uTeks').value.trim(), waktu: Date.now() });
      akSimpan('ulasanSaya', u);
      s.tutup();
      render();
      akPopup('check', 'Terima kasih!', 'Ulasanmu membantu mahasiswa lain memilih kos.');
    });
  }

  function lembarBantuan() {
    var tanya = [
      ['Bagaimana cara booking kos?', 'Buka detail kos, ketuk Booking, isi data dan tanggal masuk, lalu bayar DP. Kode booking muncul di halaman konfirmasi.'],
      ['Apakah DP bisa dikembalikan?', 'Ketentuan DP mengikuti kebijakan masing-masing kos. Cek rincian harga di halaman detail sebelum booking.'],
      ['Bagaimana tahu kos ini terverifikasi?', 'Kos bertanda Terverifikasi sudah dicek identitas pemiliknya, foto kamarnya diperbarui, dan alamatnya.'],
      ['Saya lupa password. Bagaimana?', 'Di halaman Masuk, isi email atau No. HP lalu ketuk Kirim tautan reset.']
    ];
    akSheet('Bantuan / FAQ', tanya.map(function (t) {
      return '<details class="ak-faq"><summary>' + akAman(t[0]) + '</summary><p>' + akAman(t[1]) + '</p></details>';
    }).join(''));
  }

  function lembarTentang() {
    akSheet('Tentang kami',
      '<p>KostKita membantu mahasiswa baru di Malang menemukan kos yang aman tanpa survei dulu: foto terkini, pemilik terverifikasi, ' +
      'dan ulasan penghuni, lengkap dengan booking dari mana saja sebelum tiba di Malang.</p>' +
      '<p style="margin-top:10px">Dibuat sebagai tugas Interaksi Manusia dan Komputer, Kelompok 6, TIF-C, Universitas Brawijaya.</p>');
  }

  function lembarKeluar() {
    var s = akSheet('Keluar dari akun?',
      '<p>Kamu bisa masuk lagi kapan saja. Riwayat booking dan favorit di perangkat ini tetap tersimpan.</p>' +
      '<button type="button" class="ak-keluar" id="yaKeluar">Ya, keluar</button>' +
      '<button type="button" class="ak-tombol ak-tombol-garis" id="batalKeluar">Batal</button>');
    s.el.querySelector('#batalKeluar').addEventListener('click', s.tutup);
    s.el.querySelector('#yaKeluar').addEventListener('click', function () {
      akKeluar();
      s.tutup();
      render();
      window.scrollTo(0, 0);
    });
  }

  var AKSI = {
    profil: lembarProfil, favorit: lembarFavorit, ulasan: lembarUlasan,
    bantuan: lembarBantuan, tentang: lembarTentang, keluar: lembarKeluar
  };

  isi.addEventListener('click', function (e) {
    var t = e.target.closest('[data-aksi]');
    if (!t) return;
    var a = t.getAttribute('data-aksi');
    if (a === 'ulas') lembarBeriUlasan(t.getAttribute('data-kode'));
    else if (AKSI[a]) AKSI[a]();
  });

  render();
})();
