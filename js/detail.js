// detail.html?id=melati
var id = new URLSearchParams(location.search).get('id');
var kos = DATA_KOS[id] || DATA_KOS.melati;

document.title = kos.nama + ' - KostKita';
document.getElementById('nama').textContent = kos.nama;
document.getElementById('sub').textContent =
  'Kos ' + kos.tipe.toLowerCase() + ' · ' + kos.alamat + ' · ' + kos.jarak + ' ke kampus';
document.getElementById('harga').textContent = rupiah(kos.harga);
document.getElementById('rating').textContent = '⭐ ' + kos.rating + ' (' + kos.ulasan + ' ulasan)';
document.getElementById('sisa').textContent = 'Sisa ' + kos.sisa + ' kamar';
document.getElementById('deskripsi').textContent = kos.deskripsi;

document.getElementById('fasilitas').innerHTML = kos.fasilitas
  .map(function (f) { return '<li>✔ ' + f + '</li>'; })
  .join('');

document.getElementById('tombolBooking').href = 'reservasi.html?id=' + kos.id;

// Favorit (disimpan di localStorage)
var tombolHati = document.getElementById('tombolHati');
var favorit = [];
try { favorit = JSON.parse(localStorage.getItem('favorit')) || []; } catch (e) {}

function gambarHati() {
  var aktif = favorit.indexOf(kos.id) > -1;
  tombolHati.textContent = aktif ? '❤️' : '🤍';
}
tombolHati.addEventListener('click', function () {
  var i = favorit.indexOf(kos.id);
  if (i > -1) favorit.splice(i, 1); else favorit.push(kos.id);
  try { localStorage.setItem('favorit', JSON.stringify(favorit)); } catch (e) {}
  gambarHati();
});
gambarHati();

// Chat belum ada halamannya
document.getElementById('tombolChat').addEventListener('click', function () {
  alert('Fitur chat belum tersedia di prototype ini.');
});

// Penghitung foto sederhana
var foto = 1;
document.getElementById('hero').addEventListener('click', function () {
  foto = foto % 6 + 1;
  document.getElementById('jumlahFoto').textContent = foto + ' / 6 foto';
});