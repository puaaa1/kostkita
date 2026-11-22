(function () {
  if (akSesi()) { location.replace(akTujuan()); return; }

  akPasangTab();

  var nama = document.getElementById('nama');
  var email = document.getElementById('email');
  var hp = document.getElementById('hp');
  var sandi = document.getElementById('sandi');

  akPasangMata(document.getElementById('mata'), sandi);

  [nama, email, hp, sandi].forEach(function (el) {
    el.addEventListener('input', function () { akGalat(el, ''); });
  });

  /* Tiap aturan mengembalikan teks galat, atau '' kalau sudah benar */
  function aturNama() {
    var v = nama.value.trim();
    if (!v) return 'Nama lengkap wajib diisi.';
    if (v.length < 3) return 'Nama minimal 3 huruf.';
    return '';
  }

  function aturEmail() {
    var v = email.value.trim().toLowerCase();
    if (!v) return 'Email wajib diisi.';
    if (!akEmailValid(v)) return 'Format email belum sesuai. Contoh: nama@email.com.';
    var ada = akCariAkun(v);
    if (ada) return 'Email ini sudah terdaftar. Silakan masuk.';
    return '';
  }

  function aturHp() {
    var v = hp.value.trim();
    if (!v) return 'No. HP wajib diisi.';
    if (!akHpValid(v)) return 'No. HP belum sesuai. Contoh: 08123456789.';
    var ada = akCariAkun(akNormHp(v));
    if (ada) return 'No. HP ini sudah terdaftar. Silakan masuk.';
    return '';
  }

  function aturSandi() {
    var v = sandi.value;
    if (!v) return 'Password wajib diisi.';
    if (v.length < 8) return 'Password minimal 8 karakter.';
    if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'Gunakan kombinasi huruf dan angka.';
    return '';
  }

  /* Tampilkan galat saat pindah kolom, bukan hanya saat menekan tombol */
  [[nama, aturNama], [email, aturEmail], [hp, aturHp], [sandi, aturSandi]].forEach(function (p) {
    p[0].addEventListener('blur', function () {
      if (p[0].value) akGalat(p[0], p[1]());
    });
  });

  document.getElementById('formDaftar').addEventListener('submit', function (e) {
    e.preventDefault();

    var cek = [[nama, aturNama()], [email, aturEmail()], [hp, aturHp()], [sandi, aturSandi()]];
    var pertama = null;
    cek.forEach(function (c) {
      akGalat(c[0], c[1]);
      if (c[1] && !pertama) pertama = c[0];
    });
    if (pertama) { pertama.focus(); return; }

    var daftar = akSemuaAkun();
    var akun = {
      id: 'u' + Date.now().toString(36),
      nama: nama.value.trim(),
      email: email.value.trim().toLowerCase(),
      hp: akNormHp(hp.value),
      sandi: akHash(sandi.value)
    };
    daftar.push(akun);
    akSimpan(AK_KUNCI_AKUN, daftar);
    akMulaiSesi(akun);

    document.getElementById('tombolDaftar').disabled = true;
    akPopup('check', 'Akun berhasil dibuat', 'Selamat datang di KostKita, ' + akun.nama.split(' ')[0] + '!', function () {
      location.href = akTujuan();
    });
  });

  document.getElementById('tautSyarat').addEventListener('click', function (e) {
    e.preventDefault();
    akSheet('Syarat & Ketentuan',
      '<p>KostKita menampilkan informasi kos yang sudah dicek fotonya dan pemiliknya diverifikasi. ' +
      'Dengan membuat akun, kamu setuju memberi data yang benar dan memakai layanan ini hanya untuk mencari dan memesan kos. ' +
      'Booking dan DP mengikuti ketentuan masing-masing kos.</p>');
  });

  document.getElementById('tautPrivasi').addEventListener('click', function (e) {
    e.preventDefault();
    akSheet('Kebijakan Privasi',
      '<p>Data yang kamu isi (nama, email, No. HP) dipakai hanya untuk akun dan proses booking kos. ' +
      'Kami tidak membagikannya ke pihak lain tanpa izinmu.</p>');
  });
})();
