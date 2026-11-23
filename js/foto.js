(function () {
  /* ---------- PENGATURAN ---------- */
  // Ubah ke true kalau foto asli sudah ditaruh di folder img
  // dengan nama: img/melati-1.jpg, img/melati-2.jpg, img/melati-3.jpg, dst.
  var FOTO_ASLI = false;
  var JUMLAH = 3;

  /* ---------- ILUSTRASI SEMENTARA ---------- */
  var PALET = [
    { dinding: '#e9effc', lantai: '#c9d6ee', kayu: '#b98b5e', kain: '#6f8fd6', langit: '#bfe0f5', aksen: '#ffc93c' },
    { dinding: '#fdf0e3', lantai: '#e6cfae', kayu: '#a6764a', kain: '#e08a6d', langit: '#cfe8f7', aksen: '#6fb28f' },
    { dinding: '#e8f4ee', lantai: '#c3dccd', kayu: '#c19a6b', kain: '#4f9d7c', langit: '#c9e6f3', aksen: '#f2b84b' },
    { dinding: '#f3ecf9', lantai: '#d6c9e6', kayu: '#9a7b5f', kain: '#8d73c9', langit: '#d3e5f8', aksen: '#f08ba5' },
    { dinding: '#edf3f7', lantai: '#cbd7e0', kayu: '#8f6f55', kain: '#3f6f8f', langit: '#c3e2f2', aksen: '#ffb347' },
    { dinding: '#fbefef', lantai: '#e8cfcf', kayu: '#b0845c', kain: '#d36b6b', langit: '#cde6f6', aksen: '#7fb5a3' }
  ];

  function angkaDariId(id) {
    var n = 0;
    for (var i = 0; i < id.length; i++) { n += id.charCodeAt(i); }
    return n;
  }

  function adegan(nomor, p) {
    var d = '<rect width="400" height="300" fill="' + p.dinding + '"/>' +
            '<rect y="215" width="400" height="85" fill="' + p.lantai + '"/>';
    if (nomor === 1) {
      d += '<rect x="36" y="40" width="112" height="92" rx="6" fill="' + p.langit + '" stroke="#fff" stroke-width="7"/>' +
           '<line x1="92" y1="40" x2="92" y2="132" stroke="#fff" stroke-width="5"/>' +
           '<line x1="36" y1="86" x2="148" y2="86" stroke="#fff" stroke-width="5"/>' +
           '<circle cx="118" cy="62" r="11" fill="' + p.aksen + '" opacity=".9"/>' +
           '<rect x="190" y="92" width="190" height="62" rx="8" fill="' + p.kayu + '"/>' +
           '<rect x="176" y="150" width="216" height="74" rx="12" fill="#fff"/>' +
           '<rect x="176" y="178" width="216" height="46" rx="12" fill="' + p.kain + '"/>' +
           '<rect x="196" y="136" width="72" height="30" rx="10" fill="#f7f9fd" stroke="#dbe3f2"/>' +
           '<rect x="276" y="136" width="72" height="30" rx="10" fill="#f7f9fd" stroke="#dbe3f2"/>' +
           '<rect x="130" y="168" width="34" height="56" rx="4" fill="' + p.kayu + '"/>' +
           '<polygon points="132,138 162,138 156,160 138,160" fill="' + p.aksen + '"/>' +
           '<rect x="145" y="160" width="4" height="10" fill="#6b6b6b"/>' +
           '<rect x="238" y="44" width="62" height="42" rx="3" fill="#fff" stroke="' + p.kayu + '" stroke-width="4"/>' +
           '<circle cx="258" cy="62" r="7" fill="' + p.aksen + '"/><path d="M244 80 l14 -12 l10 8 l12 -10 l8 14z" fill="' + p.kain + '" opacity=".7"/>';
    } else if (nomor === 2) {
      d += '<rect x="30" y="64" width="130" height="8" rx="2" fill="' + p.kayu + '"/>' +
           '<rect x="38" y="30" width="14" height="34" fill="' + p.kain + '"/>' +
           '<rect x="54" y="38" width="12" height="26" fill="' + p.aksen + '"/>' +
           '<rect x="68" y="26" width="16" height="38" fill="#fff"/>' +
           '<rect x="86" y="34" width="12" height="30" fill="' + p.kayu + '"/>' +
           '<rect x="100" y="40" width="14" height="24" fill="' + p.kain + '"/>' +
           '<rect x="230" y="38" width="120" height="84" rx="6" fill="' + p.langit + '" stroke="#fff" stroke-width="7"/>' +
           '<line x1="290" y1="38" x2="290" y2="122" stroke="#fff" stroke-width="5"/>' +
           '<rect x="70" y="158" width="250" height="14" rx="4" fill="' + p.kayu + '"/>' +
           '<rect x="84" y="172" width="12" height="52" fill="' + p.kayu + '"/>' +
           '<rect x="294" y="172" width="12" height="52" fill="' + p.kayu + '"/>' +
           '<rect x="160" y="108" width="84" height="50" rx="4" fill="#2b3a55"/>' +
           '<rect x="168" y="115" width="68" height="36" rx="2" fill="' + p.langit + '"/>' +
           '<polygon points="148,158 256,158 266,166 138,166" fill="#9aa7bd"/>' +
           '<rect x="268" y="132" width="18" height="26" rx="3" fill="' + p.aksen + '"/>' +
           '<rect x="40" y="168" width="52" height="8" rx="4" fill="' + p.kain + '"/>' +
           '<rect x="46" y="176" width="6" height="48" fill="#6b6b6b"/><rect x="82" y="176" width="6" height="48" fill="#6b6b6b"/>' +
           '<rect x="338" y="186" width="34" height="38" rx="6" fill="' + p.kayu + '"/>' +
           '<path d="M355 186 q-26 -26 -8 -48 q10 18 8 48z M355 186 q26 -22 14 -46 q-16 16 -14 46z" fill="' + p.aksen + '"/>';
    } else {
      d = '<rect width="400" height="300" fill="' + p.dinding + '"/>';
      for (var x = 0; x <= 400; x += 50) { d += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="300" stroke="#fff" stroke-width="3"/>'; }
      for (var y = 0; y <= 300; y += 50) { d += '<line x1="0" y1="' + y + '" x2="400" y2="' + y + '" stroke="#fff" stroke-width="3"/>'; }
      d += '<rect y="236" width="400" height="64" fill="' + p.lantai + '"/>' +
           '<rect x="40" y="30" width="6" height="190" fill="#9aa7bd"/>' +
           '<rect x="40" y="30" width="80" height="6" fill="#9aa7bd"/>' +
           '<rect x="108" y="30" width="26" height="14" rx="4" fill="#7d8aa3"/>' +
           '<g stroke="' + p.langit + '" stroke-width="3" stroke-linecap="round"><line x1="112" y1="56" x2="106" y2="90"/><line x1="121" y1="56" x2="121" y2="96"/><line x1="130" y1="56" x2="136" y2="90"/></g>' +
           '<circle cx="270" cy="88" r="38" fill="#fff" stroke="' + p.kayu + '" stroke-width="6"/>' +
           '<circle cx="270" cy="88" r="30" fill="' + p.langit + '" opacity=".6"/>' +
           '<rect x="200" y="160" width="140" height="22" rx="8" fill="#fff"/>' +
           '<rect x="236" y="182" width="68" height="54" fill="#fff"/>' +
           '<ellipse cx="270" cy="166" rx="40" ry="7" fill="' + p.langit + '"/>' +
           '<rect x="262" y="140" width="6" height="22" fill="#9aa7bd"/><rect x="262" y="136" width="22" height="6" rx="3" fill="#9aa7bd"/>' +
           '<rect x="340" y="110" width="36" height="86" rx="4" fill="' + p.kain + '"/>' +
           '<rect x="340" y="110" width="36" height="12" rx="4" fill="' + p.aksen + '"/>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' + d + '</svg>';
  }

  function ilustrasi(id, n) {
    var p = PALET[angkaDariId(id) % PALET.length];
    var nomor = ((n - 1) % 3) + 1;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(adegan(nomor, p));
  }

  /* ---------- PASANG FOTO ---------- */
  var gaya = document.createElement('style');
  gaya.textContent =
    '.ada-foto{background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}' +
    '.ada-foto > svg,.ada-foto > .ikon,.ada-foto > .hero-img{display:none!important}';
  document.head.appendChild(gaya);

  function pasang(el, id, n) {
    var nomor = ((n - 1) % JUMLAH) + 1;
    var cadangan = ilustrasi(id, nomor);
    function taruh(url) {
      el.style.backgroundImage = 'url("' + url + '")';
      el.classList.add('ada-foto');
    }
    if (!FOTO_ASLI) {
      taruh(cadangan);
      return;
    }
    var asli = 'img/' + id + '-' + nomor + '.jpg';
    var tes = new Image();
    tes.onload = function () { taruh(asli); };
    tes.onerror = function () { taruh(cadangan); };
    tes.src = asli;
  }

  function idDariTautan(teks) {
    var m = /[?&]id=([^&]+)/.exec(teks || '');
    return m ? decodeURIComponent(m[1]) : '';
  }

  function idDariNama(nama) {
    if (typeof DATA_KOS === 'undefined') { return ''; }
    var hasil = '';
    Object.keys(DATA_KOS).forEach(function (k) {
      if (DATA_KOS[k].nama === nama) { hasil = k; }
    });
    return hasil;
  }

  function terapkan() {
    // halaman hasil: kartu kos
    document.querySelectorAll('.kc-foto:not([data-foto])').forEach(function (el) {
      var tautan = el.closest('a');
      var id = tautan ? idDariTautan(tautan.getAttribute('href')) : '';
      if (!id) { return; }
      el.setAttribute('data-foto', id);
      pasang(el, id, 1);
    });

    // halaman bandingkan: foto di kepala kolom
    document.querySelectorAll('.kepala-foto:not([data-foto])').forEach(function (el) {
      var nama = el.parentNode && el.parentNode.querySelector('strong');
      var id = nama ? idDariNama(nama.textContent.trim()) : '';
      if (!id) { return; }
      el.setAttribute('data-foto', id);
      pasang(el, id, 1);
    });

    // halaman detail: foto utama, berganti saat diklik
    var hero = document.getElementById('hero');
    if (hero) {
      var id = idDariTautan(location.search);
      if (id) {
        var teks = document.getElementById('jumlahFoto');
        var n = teks ? parseInt(teks.textContent, 10) || 1 : 1;
        if (hero.getAttribute('data-foto') !== id + '-' + n) {
          hero.setAttribute('data-foto', id + '-' + n);
          pasang(hero, id, n);
        }
      }
    }
  }

  var menunggu = false;
  new MutationObserver(function () {
    if (menunggu) { return; }
    menunggu = true;
    requestAnimationFrame(function () {
      menunggu = false;
      terapkan();
    });
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  terapkan();
})();