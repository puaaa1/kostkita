(function () {
  var gaya = document.createElement('style');
  gaya.textContent =
    '.chip{cursor:pointer}' +
    '.chip-garis.chip-aktif{background:#DCE8FA;color:#0B1F3F;border-color:#0B1F3F;font-weight:500}' +
    '.riwayat{cursor:pointer}';
  document.head.appendChild(gaya);

  var lokasi = document.getElementById('lokasi');

  if (typeof daftarSaran === 'function') {
    var dl = document.createElement('datalist');
    dl.id = 'saranLokasi';
    dl.innerHTML = daftarSaran().map(function (x) { return '<option value="' + x + '">'; }).join('');
    document.body.appendChild(dl);
    lokasi.setAttribute('list', 'saranLokasi');
    lokasi.setAttribute('placeholder', 'Ketik kampus, jalan, atau daerah');
  }
  var inputHarga = document.querySelectorAll('.input-harga');
  var hargaMin = inputHarga[0];
  var hargaMax = inputHarga[1];

  function simpan(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function baca(k, awal) { try { return JSON.parse(localStorage.getItem(k)) || awal; } catch (e) { return awal; } }

  var chipTipe = document.querySelectorAll('#tipe .chip');
  chipTipe.forEach(function (c) {
    c.addEventListener('click', function () {
      chipTipe.forEach(function (x) { x.classList.remove('chip-aktif'); });
      c.classList.add('chip-aktif');
    });
  });

  document.querySelectorAll('#fasilitas .chip').forEach(function (c) {
    c.addEventListener('click', function () { c.classList.toggle('chip-aktif'); });
  });

  document.querySelectorAll('#kampus .chip').forEach(function (c) {
    c.addEventListener('click', function () {
      lokasi.value = c.textContent.trim();
      lokasi.focus();
    });
  });

  function angka(teks) { return parseInt(String(teks).replace(/\D/g, ''), 10) || 0; }
  function rp(n) { return n ? 'Rp' + n.toLocaleString('id-ID') : ''; }

  [hargaMin, hargaMax].forEach(function (el) {
    el.addEventListener('focus', function () { el.select(); });
    el.addEventListener('input', function () { el.value = rp(angka(el.value)); });
  });

  var blok = document.getElementById('blokRiwayat');
  var daftarEl = document.getElementById('daftarRiwayat');
  var tombolHapus = document.getElementById('hapusRiwayat');

  function tampilRiwayat() {
    if (!blok || !daftarEl) return;
    var daftar = baca('riwayatCari', []);
    blok.hidden = !daftar.length;
    daftarEl.innerHTML = daftar.map(function (d, i) {
      var harga = (d.min || d.max) ? '<p>' + (d.min ? rp(d.min) : 'Rp0') + ' - ' + (d.max ? rp(d.max) : 'bebas') + '</p>' : '';
      return '<div class="riwayat" data-i="' + i + '">' +
        '<span class="riwayat-ikon" data-ikon="clock"></span>' +
        '<div><strong>' + d.lokasi + '</strong>' + harga + '</div></div>';
    }).join('');
    daftarEl.querySelectorAll('.riwayat').forEach(function (el) {
      el.addEventListener('click', function () {
        var d = daftar[el.getAttribute('data-i')];
        lokasi.value = d.lokasi;
        hargaMin.value = rp(d.min);
        hargaMax.value = rp(d.max);
      });
    });
  }
  if (tombolHapus) {
    tombolHapus.addEventListener('click', function () {
      simpan('riwayatCari', []);
      tampilRiwayat();
    });
  }
  tampilRiwayat();

  document.querySelector('.tombol-kuning').addEventListener('click', function (e) {
    if (!lokasi.value.trim()) {
      e.preventDefault();
      lokasi.focus();
      alert('Isi kampus atau lokasi tujuan dulu ya.');
      return;
    }
    var min = angka(hargaMin.value), max = angka(hargaMax.value);
    if (max && min > max) { var t = min; min = max; max = t; }

    var tipeAktif = document.querySelector('#tipe .chip-aktif');
    var cari = {
      lokasi: lokasi.value.trim(),
      tipe: tipeAktif ? tipeAktif.textContent.trim() : 'Semua',
      min: min,
      max: max,
      fasilitas: Array.prototype.map.call(
        document.querySelectorAll('#fasilitas .chip-aktif'),
        function (c) { return c.textContent.trim(); })
    };
    simpan('pencarian', cari);

    var riwayat = baca('riwayatCari', []).filter(function (d) { return d.lokasi !== cari.lokasi; });
    riwayat.unshift(cari);
  });
})();