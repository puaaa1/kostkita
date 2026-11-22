/* Fungsi bersama untuk halaman booking (Anggota 3).
   Dipakai oleh reservasi.js, pembayaran.js, dan konfirmasi.js.
   Pasang setelah icons.js dan data-kos.js. */

var BK_BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

/* DP = 25% dari sewa bulan pertama (Rp1.200.000 -> Rp300.000, sesuai desain) */
var BK_PERSEN_DP = 0.25;

function bkHitungDp(harga) {
  return Math.round(harga * BK_PERSEN_DP / 500) * 500;
}

function bkBaca(kunci, awal) {
  try { return JSON.parse(localStorage.getItem(kunci)) || awal; } catch (e) { return awal; }
}

function bkSimpan(kunci, nilai) {
  try { localStorage.setItem(kunci, JSON.stringify(nilai)); } catch (e) {}
}

function bkAman(t) {
  return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function bkDua(n) { return (n < 10 ? '0' : '') + n; }

/* "2026-08-01" -> objek Date (waktu lokal, bukan UTC) */
function bkKeTanggal(iso) {
  var p = iso.split('-');
  return new Date(+p[0], +p[1] - 1, +p[2]);
}

function bkKeIso(d) {
  return d.getFullYear() + '-' + bkDua(d.getMonth() + 1) + '-' + bkDua(d.getDate());
}

function bkHariIni(tambahHari) {
  var d = new Date();
  d.setDate(d.getDate() + (tambahHari || 0));
  return bkKeIso(d);
}

/* Tambah n bulan. 31 Jan + 1 bulan -> 28/29 Feb (tidak meloncat ke Maret). */
function bkTambahBulan(iso, n) {
  var d = bkKeTanggal(iso), tgl = d.getDate();
  d.setMonth(d.getMonth() + n);
  if (d.getDate() !== tgl) d.setDate(0);
  return bkKeIso(d);
}

/* "2026-08-01" -> "1 Agustus 2026" */
function bkTanggalIndo(iso) {
  var d = bkKeTanggal(iso);
  return d.getDate() + ' ' + BK_BULAN[d.getMonth()] + ' ' + d.getFullYear();
}

/* "2026-08-01" -> "01/08/2026" (format di kolom Tanggal masuk) */
function bkIsoKeTeks(iso) {
  if (!iso) return '';
  var p = iso.split('-');
  return p[2] + '/' + p[1] + '/' + p[0];
}

/* "01/08/2026" -> "2026-08-01". Hasil '' kalau tanggalnya tidak ada (mis. 31/02/2026). */
function bkTeksKeIso(teks) {
  var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(teks || '');
  if (!m) return '';
  var d = new Date(+m[3], +m[2] - 1, +m[1]);
  if (d.getDate() !== +m[1] || d.getMonth() !== +m[2] - 1) return '';
  return bkKeIso(d);
}

/* waktu (ms) -> "22 November 2026, 18.10 WIB" */
function bkWaktuIndo(ms) {
  var d = new Date(ms);
  return bkTanggalIndo(bkKeIso(d)) + ', ' + bkDua(d.getHours()) + '.' + bkDua(d.getMinutes()) + ' WIB';
}

function bkBaris(label, nilai) {
  return '<div class="bk-baris"><span>' + label + '</span><strong>' + nilai + '</strong></div>';
}

/* Popup peringatan (gayanya sama dengan popup di halaman Cari) */
function bkPopup(judul, pesan, fokus) {
  var latar = document.createElement('div');
  latar.className = 'bk-popup-latar';
  latar.innerHTML =
    '<div class="bk-popup">' +
      '<div class="bk-popup-ikon">!</div>' +
      '<h4>' + bkAman(judul) + '</h4>' +
      '<p>' + bkAman(pesan) + '</p>' +
      '<button type="button" class="bk-tombol">Oke</button>' +
    '</div>';
  document.body.appendChild(latar);

  function tutup() {
    document.removeEventListener('keydown', tekan);
    latar.remove();
    if (fokus) fokus.focus();
  }
  function tekan(e) {
    if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); tutup(); }
  }
  document.addEventListener('keydown', tekan);
  latar.querySelector('button').addEventListener('click', tutup);
  latar.addEventListener('click', function (e) { if (e.target === latar) tutup(); });
  latar.querySelector('button').focus();
}

/* Layar "memproses..." saat simulasi pembayaran */
function bkLoading(teks) {
  var latar = document.createElement('div');
  latar.className = 'bk-popup-latar';
  latar.innerHTML = '<div class="bk-popup"><div class="bk-putar"></div><h4>' + bkAman(teks) + '</h4>' +
    '<p style="margin:0">Jangan tutup halaman ini.</p></div>';
  document.body.appendChild(latar);
  return latar;
}
