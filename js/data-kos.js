var KAMPUS = [
 {
  "id": "ub",
  "nama": "Universitas Brawijaya",
  "alias": [
   "ub",
   "brawijaya",
   "universitas brawijaya"
  ],
  "lat": -7.9525,
  "lon": 112.6129
 },
 {
  "id": "um",
  "nama": "Universitas Negeri Malang",
  "alias": [
   "um",
   "um malang",
   "negeri malang",
   "universitas negeri malang",
   "unm"
  ],
  "lat": -7.961,
  "lon": 112.6186
 },
 {
  "id": "uin",
  "nama": "UIN Malang",
  "alias": [
   "uin",
   "uin malang",
   "maulana malik ibrahim",
   "uin maliki"
  ],
  "lat": -7.9529,
  "lon": 112.6086
 },
 {
  "id": "polinema",
  "nama": "Polinema",
  "alias": [
   "polinema",
   "politeknik negeri malang",
   "poltek"
  ],
  "lat": -7.9468,
  "lon": 112.6153
 },
 {
  "id": "umm",
  "nama": "Universitas Muhammadiyah Malang",
  "alias": [
   "umm",
   "muhammadiyah",
   "universitas muhammadiyah malang"
  ],
  "lat": -7.9206,
  "lon": 112.5958
 },
 {
  "id": "unisma",
  "nama": "Universitas Islam Malang",
  "alias": [
   "unisma",
   "universitas islam malang",
   "islam malang"
  ],
  "lat": -7.9523,
  "lon": 112.6166
 }
];

var DATA_KOS = {};
LIST_KOS.forEach(function (k) {
  k.alamat = k.jalan + ' No. ' + k.no + ', ' + k.area + ', Malang';
  k.deskripsi = k.desk;
  k.pendingin = k.fasilitas.indexOf('AC') > -1 ? 'AC' : 'Kipas';
  k.kamarMandi = k.fasilitas.indexOf('Kamar mandi dalam') > -1 ? 'Dalam' : 'Luar';
  k.wifi = k.fasilitas.indexOf('WiFi') > -1 ? 'Ada' : 'Tidak';
  k.rating = String(k.rating).replace('.', ',');
  var dekat = Infinity;
  KAMPUS.forEach(function (c) { dekat = Math.min(dekat, jarakMeter(k, c)); });
  k.jarakMeter = dekat;
  k.jarak = k.jarakTetap || formatJarak(dekat);
  DATA_KOS[k.id] = k;
});

function rupiah(n) { return 'Rp' + n.toLocaleString('id-ID'); }

function jarakMeter(a, b) {
  var R = 6371000, r = Math.PI / 180;
  var dLa = (b.lat - a.lat) * r, dLo = (b.lon - a.lon) * r;
  var x = Math.sin(dLa / 2) * Math.sin(dLa / 2) +
          Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function formatJarak(m) {
  if (m < 1000) return (Math.round(m / 10) * 10) + ' m';
  return (Math.round(m / 100) / 10).toString().replace('.', ',') + ' km';
}

function norm(t) { return String(t || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(); }

function daftarSaran() {
  var s = KAMPUS.map(function (c) { return c.nama; });
  LIST_KOS.forEach(function (k) {
    if (s.indexOf(k.jalan) < 0) s.push(k.jalan);
    if (s.indexOf(k.area) < 0) s.push(k.area);
  });
  return s;
}

function cariKos(p) {
  var q = norm(p.lokasi), hasil = [], jenis = 'teks', cocok = [];

  if (q) {
    cocok = KAMPUS.filter(function (c) {
      return c.alias.some(function (a) {
        return q === a || new RegExp('(^| )' + a + '( |$)').test(q);
      }) || (q.length >= 3 && norm(c.nama).indexOf(q) > -1);
    });
  }

  if (!q) {
    jenis = 'semua';
    hasil = LIST_KOS.map(function (k) { return { kos: k, jarak: k.jarakMeter }; });
  } else if (cocok.length) {
    jenis = 'kampus';
    LIST_KOS.forEach(function (k) {
      var d = Math.min.apply(null, cocok.map(function (c) { return jarakMeter(k, c); }));
      if (d <= 3000) hasil.push({ kos: k, jarak: d });
    });
  } else {
    var kata = q.split(' ');
    LIST_KOS.forEach(function (k) {
      var teks = norm(k.nama + ' ' + k.jalan + ' ' + k.area + ' ' + k.tipe + ' ' + k.fasilitas.join(' '));
      if (kata.every(function (w) { return teks.indexOf(w) > -1; })) hasil.push({ kos: k, jarak: k.jarakMeter });
    });
  }

  hasil = hasil.filter(function (h) {
    var k = h.kos;
    if (p.tipe && p.tipe !== 'Semua' && k.tipe !== p.tipe) return false;
    if (p.min && k.harga < p.min) return false;
    if (p.max && k.harga > p.max) return false;
    return (p.fasilitas || []).every(function (f) {
      return k.fasilitas.some(function (x) { return norm(x) === norm(f); });
    });
  });

  var u = p.urut || 'jarak';
  hasil.sort(function (a, b) {
    if (u === 'harga') return a.kos.harga - b.kos.harga;
    if (u === 'rating') return parseFloat(b.kos.rating.replace(',', '.')) - parseFloat(a.kos.rating.replace(',', '.'));
    return a.jarak - b.jarak;
  });
  return { daftar: hasil, jenis: jenis, kampus: cocok };
}