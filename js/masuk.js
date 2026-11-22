(function () {
  /* Sudah masuk -> tidak perlu melihat halaman ini lagi */
  if (akSesi()) { location.replace(akTujuan()); return; }

  akPasangTab();

  var idf = document.getElementById('idf');
  var sandi = document.getElementById('sandi');

  akPasangMata(document.getElementById('mata'), sandi);

  /* Galat hilang begitu pengguna mulai mengetik lagi */
  idf.addEventListener('input', function () { akGalat(idf, ''); });
  sandi.addEventListener('input', function () { akGalat(sandi, ''); });

  function cekIdf() {
    var v = idf.value.trim();
    if (!v) { akGalat(idf, 'Isi email atau No. HP kamu dulu ya.'); return false; }
    if (!akIdfValid(v)) { akGalat(idf, 'Format belum sesuai. Contoh: nama@email.com atau 08123456789.'); return false; }
    akGalat(idf, '');
    return true;
  }

  document.getElementById('formMasuk').addEventListener('submit', function (e) {
    e.preventDefault();

    var idfOk = cekIdf();
    var sandiOk = true;
    if (!sandi.value) { akGalat(sandi, 'Isi password kamu dulu ya.'); sandiOk = false; }
    else if (sandi.value.length < 8) { akGalat(sandi, 'Password minimal 8 karakter.'); sandiOk = false; }
    else akGalat(sandi, '');

    if (!idfOk) { idf.focus(); return; }
    if (!sandiOk) { sandi.focus(); return; }

    var akun = akCariAkun(idf.value);
    if (!akun || akun.sandi !== akHash(sandi.value)) {
      /* Pesan sengaja tidak menyebut mana yang salah (lebih aman) */
      akGalat(sandi, 'Email/No. HP atau password salah. Coba lagi, atau daftar kalau belum punya akun.');
      sandi.focus();
      return;
    }

    akMulaiSesi(akun);
    location.href = akTujuan();
  });

  /* "Lupa password?" menggulir ke bagian reset di bawah */
  document.getElementById('tautLupa').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('reset').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  document.getElementById('kirimReset').addEventListener('click', function () {
    if (!cekIdf()) { idf.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    /* Simulasi: pesan sengaja sama baik akun ada maupun tidak, supaya akun orang lain tidak bisa ditebak */
    akPopup('shield', 'Tautan reset dikirim',
      'Kalau ' + idf.value.trim() + ' terdaftar, kami kirim tautan untuk mengatur ulang password. Cek pesan masukmu ya.');
  });
})();
