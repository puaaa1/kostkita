var param = new URLSearchParams(location.search).get('ids');
var ids = (param ? param.split(',') : ['melati', 'cempaka'])
  .filter(function (i) { return DATA_KOS[i]; })
  .slice(0, 3);
if (ids.length < 2) ids = ['melati', 'cempaka'];
var daftar = ids.map(function (i) { return DATA_KOS[i]; });

var baris = [
  ['Harga per bulan', function (k) { return rupiah(k.harga); }],
  ['Jarak ke kampus', function (k) { return k.jarak; }],
  ['Tipe', function (k) { return k.tipe; }],
  ['Pendingin', function (k) { return k.pendingin; }],
  ['Kamar mandi', function (k) { return k.kamarMandi; }],
  ['WiFi', function (k) { return k.wifi; }],
  ['Rating', function (k) { return '⭐ ' + k.rating; }],
  ['Verifikasi', function () { return '✔ Terverifikasi'; }]
];

var kolom = 'repeat(' + daftar.length + ', 1fr)';

document.getElementById('kepala').style.gridTemplateColumns = kolom;
document.getElementById('kepala').innerHTML = daftar.map(function (k) {
  return '<div class="kepala-kos"><div class="kepala-foto">🖼️</div><strong>' + k.nama + '</strong></div>';
}).join('');

document.getElementById('tabel').innerHTML = baris.map(function (b) {
  var sel = daftar.map(function (k) { return '<strong>' + b[1](k) + '</strong>'; }).join('');
  return '<div class="baris-banding"><span class="label-banding">' + b[0] + '</span>' +
         '<div class="isi-banding" style="grid-template-columns:' + kolom + '">' + sel + '</div></div>';
}).join('');

document.getElementById('aksi').style.gridTemplateColumns = kolom;
document.getElementById('aksi').innerHTML = daftar.map(function (k, i) {
  return '<a href="detail.html?id=' + k.id + '" class="tombol-lihat' + (i % 2 ? ' tombol-lihat-gelap' : '') + '">Lihat ' +
         k.nama.replace('Kos ', '') + '</a>';
}).join('');