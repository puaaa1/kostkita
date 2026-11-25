(function () {
  var DAFTAR_FASILITAS = [
    'Wifi', 'AC', 'Kamar mandi dalam', 'Water heater',
    'Kasur', 'Lemari', 'Parkir motor', 'Dapur bersama'
  ];
  var DAFTAR_TIPE = ['Semua', 'Putri', 'Putra', 'Campur'];

  function baca() {
    try { return JSON.parse(localStorage.getItem('pencarian')) || {}; } catch (e) { return {}; }
  }

  function simpan(v) {
    try { localStorage.setItem('pencarian', JSON.stringify(v)); } catch (e) {}
  }

  function angka(teks) {
    return parseInt(String(teks).replace(/\D/g, ''), 10) || 0;
  }

  function rp(n) {
    return n ? 'Rp' + n.toLocaleString('id-ID') : '';
  }

  var tombolFilter = document.querySelector('.tombol-filter');
  if (!tombolFilter) { return; }

  var gaya = document.createElement('style');
  gaya.textContent =
    '.chip{cursor:pointer}' +
    '.chip-garis.chip-aktif{background:#DCE8FA;color:#0B1F3F;border-color:#0B1F3F;font-weight:500}' +
    '.filter-latar{position:fixed;inset:0;background:rgba(15,31,61,.5);z-index:998;display:none}' +
    '.filter-latar.buka{display:block}' +
    '.filter-lembar{position:fixed;left:50%;bottom:0;transform:translateX(-50%);width:100%;max-width:440px;max-height:88vh;overflow-y:auto;background:#fff;border-radius:28px 28px 0 0;padding:22px 24px 24px;z-index:999;animation:filterNaik .2s ease}' +
    '.filter-kepala{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}' +
    '.filter-kepala h3{font-size:20px;margin:0}' +
    '.filter-tutup{border:none;background:#eef2fb;color:#0f1f3d;width:36px;height:36px;border-radius:50%;font-size:14px;cursor:pointer}' +
    '.filter-aksi{display:flex;gap:10px;margin-top:24px}' +
    '.filter-reset{flex:1;background:#fff;border:1.5px solid #e3e8f1;border-radius:16px;padding:15px;font-family:inherit;font-size:16px;font-weight:600;color:#0f1f3d;cursor:pointer}' +
    '.filter-terapkan{flex:2;margin-top:0}' +
    '.input-cari-hasil{flex:1;min-width:0;border:none;outline:none;background:transparent;font-family:inherit;font-size:14px;font-weight:500;color:#0f1f3d}' +
    '@keyframes filterNaik2{from{opacity:0}to{opacity:1}}' +
    '@keyframes filterNaik{from{transform:translate(-50%,40px);opacity:0}to{transform:translate(-50%,0);opacity:1}}';
  document.head.appendChild(gaya);

  var latar = document.createElement('div');
  latar.className = 'filter-latar';
  latar.innerHTML =
    '<div class="filter-lembar">' +
      '<div class="filter-kepala"><h3>Filter</h3><button type="button" class="filter-tutup">✕</button></div>' +

      '<label class="label">Tipe kos</label>' +
      '<div class="baris-chip" id="fTipe"></div>' +

      '<label class="label">Harga per bulan</label>' +
      '<div class="baris-harga">' +
        '<input type="text" class="input-harga" id="fMin" placeholder="Harga minimum">' +
        '<span>–</span>' +
        '<input type="text" class="input-harga" id="fMax" placeholder="Harga maksimum">' +
      '</div>' +

      '<label class="label">Fasilitas</label>' +
      '<div class="baris-chip" id="fFasilitas"></div>' +

      '<div class="filter-aksi">' +
        '<button type="button" class="filter-reset">Reset</button>' +
        '<button type="button" class="tombol-kuning filter-terapkan">Terapkan</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(latar);

  var elTipe = document.getElementById('fTipe');
  var elFasilitas = document.getElementById('fFasilitas');
  var elMin = document.getElementById('fMin');
  var elMax = document.getElementById('fMax');

  function buatChip(teks, garis) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (garis ? ' chip-garis' : '');
    b.textContent = teks;
    return b;
  }

  DAFTAR_TIPE.forEach(function (t) {
    var c = buatChip(t, false);
    c.addEventListener('click', function () {
      elTipe.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('chip-aktif'); });
      c.classList.add('chip-aktif');
    });
    elTipe.appendChild(c);
  });

  DAFTAR_FASILITAS.forEach(function (f) {
    var c = buatChip(f, true);
    c.addEventListener('click', function () { c.classList.toggle('chip-aktif'); });
    elFasilitas.appendChild(c);
  });

  [elMin, elMax].forEach(function (el) {
    el.addEventListener('focus', function () { el.select(); });
    el.addEventListener('input', function () { el.value = rp(angka(el.value)); });
  });

  function isiDariTersimpan() {
    var cari = baca();
    var tipe = cari.tipe || 'Semua';
    var fas = (cari.fasilitas || []).map(function (f) { return f.toLowerCase(); });

    elTipe.querySelectorAll('.chip').forEach(function (c) {
      c.classList.toggle('chip-aktif', c.textContent === tipe);
    });
    elFasilitas.querySelectorAll('.chip').forEach(function (c) {
      c.classList.toggle('chip-aktif', fas.indexOf(c.textContent.toLowerCase()) > -1);
    });
    elMin.value = rp(cari.min);
    elMax.value = rp(cari.max);
  }

  function perbaruiTombol() {
    var cari = baca();
    var n = 0;
    if (cari.tipe && cari.tipe !== 'Semua') { n++; }
    if (cari.min || cari.max) { n++; }
    n += (cari.fasilitas || []).length;
    tombolFilter.textContent = '⚙ Filter' + (n ? ' (' + n + ')' : '');
    tombolFilter.classList.toggle('filter-aktif', n > 0);
  }

  function buka() {
    isiDariTersimpan();
    latar.classList.add('buka');
  }

  function tutup() {
    latar.classList.remove('buka');
  }

  tombolFilter.addEventListener('click', buka);
  latar.querySelector('.filter-tutup').addEventListener('click', tutup);
  latar.addEventListener('click', function (e) {
    if (e.target === latar) { tutup(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { tutup(); }
  });

  latar.querySelector('.filter-reset').addEventListener('click', function () {
    elTipe.querySelectorAll('.chip').forEach(function (c) {
      c.classList.toggle('chip-aktif', c.textContent === 'Semua');
    });
    elFasilitas.querySelectorAll('.chip').forEach(function (c) {
      c.classList.remove('chip-aktif');
    });
    elMin.value = '';
    elMax.value = '';
  });

  latar.querySelector('.filter-terapkan').addEventListener('click', function () {
    var cari = baca();
    if (!cari.lokasi) { cari.lokasi = 'Universitas Brawijaya'; }

    var tipeAktif = elTipe.querySelector('.chip-aktif');
    var min = angka(elMin.value);
    var max = angka(elMax.value);
    if (min && max && min > max) {
      var t = min;
      min = max;
      max = t;
    }

    cari.tipe = tipeAktif ? tipeAktif.textContent : 'Semua';
    cari.min = min;
    cari.max = max;
    cari.fasilitas = Array.prototype.map.call(
      elFasilitas.querySelectorAll('.chip-aktif'),
      function (c) { return c.textContent; }
    );

    simpan(cari);
    location.reload();
  });

  perbaruiTombol();

  var tombolBanding = document.getElementById('tombolBandingkan');
  function aturTombolBanding() {
    if (!tombolBanding) { return; }
    tombolBanding.classList.toggle('sembunyi', /\b0 kos/.test(tombolBanding.textContent));
  }
  if (tombolBanding) {
    aturTombolBanding();
    new MutationObserver(aturTombolBanding).observe(tombolBanding, { childList: true, characterData: true, subtree: true });
  }

  var kotakCari = document.querySelector('.kotak-cari');
  var teksLama = kotakCari && kotakCari.querySelector('strong');
  var tombolCari = kotakCari && kotakCari.querySelector('.tombol-cari-kecil');

  if (kotakCari && teksLama) {
    var input = document.createElement('input');
    input.type = 'text';
    input.id = 'cariHasil';
    input.className = 'input-cari-hasil';
    input.placeholder = 'Cari kampus atau lokasi';
    input.value = baca().lokasi || teksLama.textContent;
    teksLama.parentNode.replaceChild(input, teksLama);

    try {
      if (typeof daftarSaran === 'function') {
        var dl = document.createElement('datalist');
        dl.id = 'saranHasil';
        dl.innerHTML = daftarSaran().map(function (x) {
          return '<option value="' + String(x).replace(/"/g, '&quot;') + '">';
        }).join('');
        document.body.appendChild(dl);
        input.setAttribute('list', 'saranHasil');
      }
    } catch (e) {}

    function cariLagi() {
      var teks = input.value.trim();
      if (!teks) {
        tampilPopup('<span data-ikon="pin"></span>', 'Lokasi belum diisi', 'Isi kampus atau lokasi tujuan dulu ya.', document.getElementById('cariHasil'));
        return;
      }
      var cari = baca();
      cari.lokasi = teks;
      simpan(cari);

      try {
        var riwayat = JSON.parse(localStorage.getItem('riwayatCari')) || [];
        riwayat = riwayat.filter(function (d) { return d.lokasi !== teks; });
        riwayat.unshift(cari);
        localStorage.setItem('riwayatCari', JSON.stringify(riwayat.slice(0, 3)));
      } catch (e) {}

      location.reload();
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        cariLagi();
      }
    });

    if (tombolCari) {
      tombolCari.addEventListener('click', function (e) {
        e.preventDefault();
        cariLagi();
      });
    }
  }
})();