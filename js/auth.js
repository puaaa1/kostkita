/* Fungsi bersama untuk halaman akun (Anggota 4): masuk.html, daftar.html, akun.html.
   Pasang setelah icons.js. Untuk akun.html pasang juga data-kos.js dan booking.js.

   CATATAN: ini prototype front end. Data akun disimpan di localStorage browser
   (bukan server), dan password hanya di-hash sederhana, jadi JANGAN dipakai untuk
   data sungguhan. */

var AK_KUNCI_AKUN = 'akunTerdaftar';   /* daftar semua akun: [{id,nama,email,hp,sandi}] */
var AK_KUNCI_SESI = 'sesiAkun';        /* id akun yang sedang masuk */

function akBaca(kunci, awal) {
  try { return JSON.parse(localStorage.getItem(kunci)) || awal; } catch (e) { return awal; }
}

function akSimpan(kunci, nilai) {
  try { localStorage.setItem(kunci, JSON.stringify(nilai)); } catch (e) {}
}

function akAman(t) {
  return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* Hash sederhana (cyrb53) supaya password tidak tersimpan sebagai teks biasa. Hanya untuk prototype. */
function akHash(teks) {
  var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (var i = 0; i < teks.length; i++) {
    var c = teks.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

/* ===== Validasi ===== */

function akNormHp(hp) {
  var d = String(hp || '').replace(/[\s\-().]/g, '');
  if (d.indexOf('+62') === 0) d = '0' + d.slice(3);
  else if (d.indexOf('62') === 0) d = '0' + d.slice(2);
  return d;
}

function akHpValid(hp) {
  return /^08\d{8,11}$/.test(akNormHp(hp));
}

function akEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || '').trim());
}

/* Kolom "Email atau No. HP" boleh berisi salah satunya */
function akIdfValid(v) {
  return akEmailValid(v) || akHpValid(v);
}

/* ===== Akun & sesi ===== */

function akSemuaAkun() { return akBaca(AK_KUNCI_AKUN, []); }

function akCariAkun(idf) {
  var v = String(idf || '').trim().toLowerCase();
  var hp = akNormHp(v);
  var daftar = akSemuaAkun();
  for (var i = 0; i < daftar.length; i++) {
    if (daftar[i].email === v || (akHpValid(v) && daftar[i].hp === hp)) return daftar[i];
  }
  return null;
}

function akSesi() {
  var id = akBaca(AK_KUNCI_SESI, null);
  if (!id) return null;
  var daftar = akSemuaAkun();
  for (var i = 0; i < daftar.length; i++) if (daftar[i].id === id) return daftar[i];
  return null;
}

function akMulaiSesi(akun) { akSimpan(AK_KUNCI_SESI, akun.id); }

function akKeluar() {
  try { localStorage.removeItem(AK_KUNCI_SESI); } catch (e) {}
}

/* Halaman tujuan setelah masuk: ?next=detail.html. Hanya nama file .html lokal yang diterima. */
function akTujuan() {
  var n = new URLSearchParams(location.search).get('next');
  return (n && /^[a-z0-9\-]+\.html$/i.test(n)) ? n : 'akun.html';
}

/* ===== Komponen tampilan: popup tengah & lembar bawah ===== */

function akLatar(kelas) {
  var l = document.createElement('div');
  l.className = 'ak-latar ' + (kelas || '');
  document.body.appendChild(l);
  return l;
}

function akPopup(namaIkon, judul, pesan, saatTutup) {
  var l = akLatar('tengah');
  l.innerHTML =
    '<div class="ak-popup" role="dialog" aria-modal="true">' +
      '<div class="ak-popup-ikon">' + ikon(namaIkon) + '</div>' +
      '<div class="ak-popup-judul">' + akAman(judul) + '</div>' +
      '<p class="ak-popup-teks">' + akAman(pesan) + '</p>' +
      '<button type="button" class="ak-tombol">Oke</button>' +
    '</div>';
  var tombol = l.querySelector('button');
  function selesai() {
    document.removeEventListener('keydown', tekan);
    l.remove();
    if (saatTutup) saatTutup();
  }
  function tekan(e) { if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); selesai(); } }
  document.addEventListener('keydown', tekan);
  tombol.addEventListener('click', selesai);
  l.addEventListener('click', function (e) { if (e.target === l) selesai(); });
  tombol.focus();
}

/* Lembar yang naik dari bawah. Mengembalikan {el: isi, tutup: fungsi}. */
function akSheet(judul, isiHtml) {
  var l = akLatar('');
  l.innerHTML =
    '<div class="ak-sheet" role="dialog" aria-modal="true" aria-label="' + akAman(judul) + '">' +
      '<div class="ak-sheet-kepala">' +
        '<h3>' + akAman(judul) + '</h3>' +
        '<button type="button" class="ak-tutup" aria-label="Tutup">&times;</button>' +
      '</div>' +
      '<div class="ak-sheet-isi">' + isiHtml + '</div>' +
    '</div>';
  function tutup() {
    document.removeEventListener('keydown', tekan);
    l.remove();
  }
  function tekan(e) { if (e.key === 'Escape') tutup(); }
  document.addEventListener('keydown', tekan);
  l.querySelector('.ak-tutup').addEventListener('click', tutup);
  l.addEventListener('click', function (e) { if (e.target === l) tutup(); });
  return { el: l.querySelector('.ak-sheet-isi'), tutup: tutup };
}

/* Tampilkan / hapus pesan galat di bawah kolom */
function akGalat(input, pesan) {
  var p = document.getElementById(input.id + 'Galat');
  if (p) p.textContent = pesan || '';
  input.classList.toggle('salah', !!pesan);
  input.setAttribute('aria-invalid', pesan ? 'true' : 'false');
}

/* Tombol "Lihat/Sembunyi" untuk kolom password */
function akPasangMata(tombol, input) {
  tombol.addEventListener('click', function () {
    var tampil = input.type === 'password';
    input.type = tampil ? 'text' : 'password';
    tombol.textContent = tampil ? 'Sembunyi' : 'Lihat';
    tombol.setAttribute('aria-label', tampil ? 'Sembunyikan password' : 'Lihat password');
  });
}

/* Tab Masuk/Daftar: bawa ?next= ke halaman sebelahnya */
function akPasangTab() {
  document.querySelectorAll('.ak-tab a').forEach(function (a) {
    a.href = a.getAttribute('href').split('?')[0] + location.search;
  });
}
