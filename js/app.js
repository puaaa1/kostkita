(function () {
  function jalankan(fn) {
    try { fn(); } catch (e) { console.error(e); }
  }

  function simpan(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }

  function baca(k, awal) {
    try { return JSON.parse(localStorage.getItem(k)) || awal; } catch (e) { return awal; }
  }

  function angka(teks) {
    return parseInt(String(teks).replace(/\D/g, ''), 10) || 0;
  }

  function rp(n) {
    return n ? 'Rp' + n.toLocaleString('id-ID') : '';
  }

  function aman(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var lokasi = document.getElementById('lokasi');
  var inputHarga = document.querySelectorAll('.input-harga');
  var hargaMin = inputHarga[0];
  var hargaMax = inputHarga[1];
  var blok = document.getElementById('blokRiwayat');
  var daftarEl = document.getElementById('daftarRiwayat');
  var tombolHapus = document.getElementById('hapusRiwayat');

  jalankan(function () {
    var gaya = document.createElement('style');
    gaya.textContent =
      '.chip{cursor:pointer}' +
      '.chip-garis.chip-aktif{background:#DCE8FA;color:#0B1F3F;border-color:#0B1F3F;font-weight:500}';
    document.head.appendChild(gaya);
  });

  jalankan(function () {
    var chipTipe = document.querySelectorAll('#tipe .chip');
    chipTipe.forEach(function (c) {
      c.addEventListener('click', function () {
        chipTipe.forEach(function (x) { x.classList.remove('chip-aktif'); });
        c.classList.add('chip-aktif');
      });
    });
  });

  jalankan(function () {
    document.querySelectorAll('#fasilitas .chip').forEach(function (c) {
      c.addEventListener('click', function () {
        c.classList.toggle('chip-aktif');
      });
    });
  });

  jalankan(function () {
    document.querySelectorAll('#kampus .chip').forEach(function (c) {
      c.addEventListener('click', function () {
        lokasi.value = c.textContent.trim();
        lokasi.focus();
      });
    });
  });

  jalankan(function () {
    [hargaMin, hargaMax].forEach(function (el) {
      el.addEventListener('focus', function () { el.select(); });
      el.addEventListener('input', function () { el.value = rp(angka(el.value)); });
    });
  });

  jalankan(function () {
    if (typeof daftarSaran !== 'function') { return; }
    var dl = document.createElement('datalist');
    dl.id = 'saranLokasi';
    dl.innerHTML = daftarSaran().map(function (x) {
      return '<option value="' + aman(x) + '">';
    }).join('');
    document.body.appendChild(dl);
    lokasi.setAttribute('list', 'saranLokasi');
    lokasi.setAttribute('placeholder', 'Ketik kampus, jalan, atau daerah');
  });

  function teksHarga(d) {
    if (d.min && d.max) { return rp(d.min) + ' - ' + rp(d.max); }
    if (d.min) { return 'Mulai ' + rp(d.min); }
    if (d.max) { return 'Maksimal ' + rp(d.max); }
    return 'Semua harga';
  }

  function tampilRiwayat() {
    if (!blok || !daftarEl) { return; }
    var daftar = baca('riwayatCari', []);
    blok.hidden = !daftar.length;
    daftarEl.innerHTML = daftar.map(function (d, i) {
      return '<div class="riwayat" data-i="' + i + '">' +
        '<span class="riwayat-ikon" data-ikon="clock"></span>' +
        '<div><strong>' + aman(d.lokasi) + '</strong><p>' + teksHarga(d) + '</p></div></div>';
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

  jalankan(function () {
    if (!tombolHapus) { return; }
    tombolHapus.addEventListener('click', function () {
      simpan('riwayatCari', []);
      tampilRiwayat();
    });
  });

  jalankan(tampilRiwayat);

  jalankan(function () {
    document.querySelector('.tombol-kuning').addEventListener('click', function (e) {
      if (!lokasi.value.trim()) {
        e.preventDefault();
        tampilPopup('<span data-ikon="pin"></span>', 'Lokasi belum diisi', 'Isi kampus atau lokasi tujuan dulu ya.', lokasi);
        return;
      }

      var min = angka(hargaMin.value);
      var max = angka(hargaMax.value);
      if (!min || !max) {
        e.preventDefault();
        tampilPopup('Rp', 'Harga belum diisi', 'Isi harga minimum dan maksimum dulu ya.', min ? hargaMax : hargaMin);
        return;
      }

      if (min > max) {
        var t = min;
        min = max;
        max = t;
      }

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

      var riwayat = baca('riwayatCari', []).filter(function (d) {
        return d.lokasi !== cari.lokasi;
      });
      riwayat.unshift(cari);
      simpan('riwayatCari', riwayat.slice(0, 3));
    });
  });
})();