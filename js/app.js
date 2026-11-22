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
  var wadah = document.getElementById('daftarRiwayat');
  var tombolHapus = document.getElementById('hapusRiwayat');

  jalankan(function () {
    var gaya = document.createElement('style');
    gaya.textContent =
      '.chip{cursor:pointer}' +
      '.chip-garis.chip-aktif{background:#DCE8FA;color:#0B1F3F;border-color:#0B1F3F;font-weight:500}' +
      '.riwayat{cursor:pointer;margin-bottom:10px}' +
      '.baris-riwayat-judul{display:flex;justify-content:space-between;align-items:center}' +
      '#hapusRiwayat{border:none;background:none;color:#c0120c;font-family:inherit;font-size:13px;cursor:pointer;margin-top:12px}' +
      '.popup-latar{position:fixed;inset:0;background:rgba(15,31,61,.5);display:flex;align-items:center;justify-content:center;padding:24px;z-index:999;animation:popupMuncul .15s ease}' +
      '.popup-kartu{background:#fff;border-radius:24px;padding:28px 24px 22px;width:100%;max-width:320px;text-align:center;box-shadow:0 10px 30px rgba(15,31,61,.25)}' +
      '.popup-ikon{width:56px;height:56px;margin:0 auto 14px;border-radius:50%;background:#DCE8FA;display:flex;align-items:center;justify-content:center;font-size:26px}' +
      '.popup-judul{font-size:17px;font-weight:600;color:#0f1f3d;margin-bottom:6px}' +
      '.popup-teks{font-size:14px;color:#4a5568;line-height:1.5;margin-bottom:20px}' +
      '.popup-tombol{width:100%;background:#ffc93c;border:none;border-radius:12px;padding:13px;font-family:inherit;font-size:15px;font-weight:600;color:#0f1f3d;cursor:pointer}' +
      '@keyframes popupMuncul{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(gaya);
  });

  function popup(ikon, judul, pesan, fokus) {
    var latar = document.createElement('div');
    latar.className = 'popup-latar';
    latar.innerHTML =
      '<div class="popup-kartu">' +
        '<div class="popup-ikon">' + ikon + '</div>' +
        '<div class="popup-judul">' + judul + '</div>' +
        '<p class="popup-teks">' + pesan + '</p>' +
        '<button type="button" class="popup-tombol">Oke</button>' +
      '</div>';
    document.body.appendChild(latar);

    function tutup() {
      document.removeEventListener('keydown', tekanTombol);
      latar.remove();
      if (fokus) { fokus.focus(); }
    }

    function tekanTombol(e) {
      if (e.key === 'Escape' || e.key === 'Enter') { tutup(); }
    }

    document.addEventListener('keydown', tekanTombol);
    latar.querySelector('.popup-tombol').addEventListener('click', tutup);
    latar.addEventListener('click', function (e) {
      if (e.target === latar) { tutup(); }
    });
    latar.querySelector('.popup-tombol').focus();
  }

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
    var daftar = baca('riwayatCari', []);
    if (!daftar.length) {
      blok.hidden = true;
      wadah.innerHTML = '';
      return;
    }
    blok.hidden = false;
    wadah.innerHTML = daftar.map(function (d, i) {
      return '<div class="riwayat" data-i="' + i + '">' +
        '<span class="riwayat-ikon">🕒</span>' +
        '<div><strong>' + aman(d.lokasi) + '</strong><p>' + teksHarga(d) + '</p></div></div>';
    }).join('');
    wadah.querySelectorAll('.riwayat').forEach(function (el) {
      el.addEventListener('click', function () {
        var d = daftar[el.getAttribute('data-i')];
        lokasi.value = d.lokasi;
        hargaMin.value = rp(d.min);
        hargaMax.value = rp(d.max);
      });
    });
  }

  jalankan(tampilRiwayat);

  jalankan(function () {
    tombolHapus.addEventListener('click', function () {
      try {
        localStorage.removeItem('riwayatCari');
        localStorage.removeItem('pencarian');
      } catch (e) {}
      tampilRiwayat();
    });
  });

  jalankan(function () {
    document.querySelector('.tombol-kuning').addEventListener('click', function (e) {
      if (!lokasi.value.trim()) {
        e.preventDefault();
        popup('📍', 'Lokasi belum diisi', 'Isi kampus atau lokasi tujuan dulu ya.', lokasi);
        return;
      }

      var min = angka(hargaMin.value);
      var max = angka(hargaMax.value);
      if (!min || !max) {
        e.preventDefault();
        popup('💰', 'Harga belum diisi', 'Isi harga minimum dan maksimum dulu ya.', min ? hargaMax : hargaMin);
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