(function () {
  /* ---------- PENGATURAN ---------- */
  // Ubah ke true kalau foto asli sudah ditaruh di folder img
  // dengan nama: img/melati-1.jpg sampai img/melati-6.jpg, dst.
  var FOTO_ASLI = false;
  var JUMLAH = 6;

  /* ---------- DATA KOS ---------- */
  function dataKos(id) {
    try { return DATA_KOS[id] || null; } catch (e) { return null; }
  }

  function punya(kos, nama) {
    if (!kos || !kos.fasilitas) { return false; }
    return kos.fasilitas.indexOf(nama) > -1;
  }

  function warnaDasar(id) {
    var urutan = 0;
    try { urutan = Object.keys(DATA_KOS).indexOf(id); } catch (e) { urutan = -1; }
    if (urutan < 0) {
      urutan = 0;
      for (var i = 0; i < id.length; i++) { urutan += id.charCodeAt(i); }
    }
    return (urutan * 37 + 205) % 360;
  }

  function hsl(h, s, l) { return 'hsl(' + h + ',' + s + '%,' + l + '%)'; }

  function palet(id) {
    var h = warnaDasar(id);
    return {
      dinding: hsl(h, 70, 95), lantai: hsl(h, 32, 82), kain: hsl(h, 52, 58),
      kainTua: hsl(h, 52, 46), kayu: '#b98b5e', kayuTua: '#8f6a45',
      langit: '#bfe0f5', aksen: '#ffc93c', abu: '#9aa7bd'
    };
  }

  /* ---------- POTONGAN GAMBAR ---------- */
  function r(x, y, w, h, fill, rx, ekstra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"' +
           (rx ? ' rx="' + rx + '"' : '') + (ekstra ? ' ' + ekstra : '') + '/>';
  }

  function c(cx, cy, rad, fill, ekstra) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + rad + '" fill="' + fill + '"' + (ekstra ? ' ' + ekstra : '') + '/>';
  }

  function jendela(x, y, w, h, p) {
    return r(x, y, w, h, p.langit, 6, 'stroke="#fff" stroke-width="7"') +
           '<line x1="' + (x + w / 2) + '" y1="' + y + '" x2="' + (x + w / 2) + '" y2="' + (y + h) + '" stroke="#fff" stroke-width="5"/>' +
           c(x + w - 22, y + 24, 10, p.aksen, 'opacity=".9"');
  }

  function unitAC(x, y) {
    return r(x, y, 112, 32, '#fff', 9, 'stroke="#cfd6e4" stroke-width="2"') +
           r(x + 12, y + 21, 88, 4, '#e3e8f1', 2) +
           c(x + 98, y + 11, 3.5, '#5ad17a') +
           '<g fill="none" stroke="#9fd0ee" stroke-width="3" stroke-linecap="round">' +
           '<path d="M' + (x + 22) + ' ' + (y + 44) + ' q7 7 14 0 t14 0 t14 0"/>' +
           '<path d="M' + (x + 22) + ' ' + (y + 56) + ' q7 7 14 0 t14 0 t14 0"/></g>';
  }

  function kipas(cx, cy) {
    var bilah = '';
    for (var a = 0; a < 360; a += 120) {
      bilah += '<ellipse cx="0" cy="-9" rx="5" ry="12" fill="#c7d0e0" transform="rotate(' + a + ')"/>';
    }
    return '<g transform="translate(' + cx + ',' + cy + ')">' +
           r(-3, 20, 6, 64, '#8f9bb3') + r(-22, 82, 44, 7, '#8f9bb3', 3) +
           c(0, 0, 21, '#fff', 'stroke="#9aa7bd" stroke-width="3"') + bilah + c(0, 0, 4, '#8f9bb3') + '</g>';
  }

  function ikonWifi(cx, cy, warna) {
    return '<g fill="none" stroke="' + warna + '" stroke-width="4.5" stroke-linecap="round">' +
           '<path d="M' + (cx - 24) + ' ' + cy + ' Q' + cx + ' ' + (cy - 22) + ' ' + (cx + 24) + ' ' + cy + '"/>' +
           '<path d="M' + (cx - 14) + ' ' + (cy + 10) + ' Q' + cx + ' ' + (cy - 5) + ' ' + (cx + 14) + ' ' + (cy + 10) + '"/></g>' +
           c(cx, cy + 19, 3.6, warna);
  }

  function ruang(p) {
    return r(0, 0, 400, 300, p.dinding) + r(0, 215, 400, 85, p.lantai);
  }

  /* ---------- ENAM ADEGAN ---------- */
  function adegan(nomor, id) {
    var p = palet(id), k = dataKos(id), d = '';
    var adaAC = punya(k, 'AC'), adaWifi = punya(k, 'WiFi'), adaKasur = punya(k, 'Kasur');
    var adaLemari = punya(k, 'Lemari'), adaDalam = punya(k, 'Kamar mandi dalam');
    var adaPemanas = punya(k, 'Water heater'), adaParkir = punya(k, 'Parkir motor'), adaDapur = punya(k, 'Dapur bersama');

    if (nomor === 1) {
      // kamar tidur
      d = ruang(p) + jendela(36, 40, 100, 76, p);
      d += r(190, 98, 190, 62, p.kayu, 8);
      if (adaKasur) {
        d += r(176, 154, 216, 70, '#fff', 12) + r(176, 180, 216, 44, p.kain, 12) +
             r(196, 140, 72, 30, '#f7f9fd', 10, 'stroke="#dbe3f2"') + r(276, 140, 72, 30, '#f7f9fd', 10, 'stroke="#dbe3f2"');
      } else {
        d += r(176, 172, 216, 14, p.kayuTua, 4) + r(184, 186, 12, 38, p.kayuTua) + r(372, 186, 12, 38, p.kayuTua);
      }
      d += r(128, 172, 34, 52, p.kayu, 4) + '<polygon points="130,142 160,142 154,164 136,164" fill="' + p.aksen + '"/>' + r(143, 164, 4, 10, '#6b6b6b');
      d += adaAC ? unitAC(236, 22) : kipas(80, 150);
    } else if (nomor === 2) {
      // meja belajar
      d = ruang(p) + jendela(250, 36, 112, 80, p);
      d += r(30, 78, 150, 8, p.kayu, 2) + r(38, 44, 14, 34, p.kain) + r(54, 52, 12, 26, p.aksen) + r(68, 40, 16, 38, '#fff') + r(86, 48, 12, 30, p.kayu);
      if (adaWifi) {
        d += r(112, 64, 52, 14, '#fff', 4, 'stroke="#cfd6e4" stroke-width="2"') +
             '<line x1="122" y1="64" x2="118" y2="48" stroke="#8f9bb3" stroke-width="3"/><line x1="154" y1="64" x2="158" y2="48" stroke="#8f9bb3" stroke-width="3"/>' +
             c(124, 71, 2.5, '#5ad17a') + ikonWifi(138, 30, p.kainTua);
      }
      d += r(110, 164, 250, 14, p.kayu, 4) + r(124, 178, 12, 46, p.kayu) + r(334, 178, 12, 46, p.kayu) +
           r(200, 114, 84, 50, '#2b3a55', 4) + r(208, 121, 68, 36, p.langit, 2) + '<polygon points="188,164 296,164 306,172 178,172" fill="#9aa7bd"/>' +
           r(308, 138, 18, 26, p.aksen, 3) +
           r(36, 128, 12, 64, p.kainTua, 5) + r(36, 190, 64, 10, p.kain, 4) + r(42, 200, 6, 24, '#6b6b6b') + r(88, 200, 6, 24, '#6b6b6b');
      if (adaWifi) { d += ikonWifi(242, 132, '#fff'); }
    } else if (nomor === 3) {
      // kamar mandi
      d = r(0, 0, 400, 300, p.dinding);
      for (var x = 0; x <= 400; x += 50) { d += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="300" stroke="#fff" stroke-width="3"/>'; }
      for (var y = 0; y <= 300; y += 50) { d += '<line x1="0" y1="' + y + '" x2="400" y2="' + y + '" stroke="#fff" stroke-width="3"/>'; }
      d += r(0, 236, 400, 64, p.lantai);
      if (adaDalam) {
        d += r(40, 30, 6, 150, '#9aa7bd') + r(40, 30, 80, 6, '#9aa7bd') + r(108, 30, 26, 14, '#7d8aa3', 4) +
             '<g stroke="' + p.langit + '" stroke-width="3" stroke-linecap="round"><line x1="112" y1="56" x2="106" y2="100"/><line x1="121" y1="56" x2="121" y2="106"/><line x1="130" y1="56" x2="136" y2="100"/></g>' +
             c(236, 88, 34, '#fff', 'stroke="' + p.kayu + '" stroke-width="6"') + c(236, 88, 27, p.langit, 'opacity=".6"') +
             r(233, 128, 6, 22, '#9aa7bd') + r(233, 124, 22, 5, '#9aa7bd', 3) +
             r(192, 150, 88, 16, '#fff', 7, 'stroke="#dbe3f2" stroke-width="2"') + '<ellipse cx="236" cy="152" rx="30" ry="5" fill="' + p.langit + '"/>' +
             r(224, 166, 24, 70, '#fff', 0, 'stroke="#dbe3f2" stroke-width="2"') +
             r(318, 150, 46, 34, '#fff', 6, 'stroke="#dbe3f2" stroke-width="2"') + '<ellipse cx="341" cy="204" rx="32" ry="16" fill="#fff" stroke="#dbe3f2" stroke-width="2"/>' +
             r(326, 212, 30, 24, '#fff', 0, 'stroke="#dbe3f2" stroke-width="2"');
        if (adaPemanas) {
          d += r(318, 40, 46, 84, '#e9edf5', 14, 'stroke="#c3cbdc" stroke-width="3"') + c(341, 66, 7, '#ff8a3d') + r(332, 124, 18, 22, '#c3cbdc') +
               '<g fill="none" stroke="#ff8a3d" stroke-width="3" stroke-linecap="round"><path d="M330 28 q5 -8 0 -14"/><path d="M341 28 q5 -8 0 -14"/><path d="M352 28 q5 -8 0 -14"/></g>';
        } else {
          d += r(316, 70, 50, 6, '#9aa7bd', 3) + r(324, 76, 34, 56, p.kain, 5);
        }
      } else {
        d += r(60, 70, 90, 150, p.kayu, 6) + r(68, 78, 74, 134, p.kayuTua, 4) + c(134, 150, 4, '#fff') +
             r(250, 70, 90, 150, p.kayu, 6) + r(258, 78, 74, 134, p.kayuTua, 4) + c(324, 150, 4, '#fff') +
             r(80, 40, 50, 18, '#fff', 4, 'stroke="#cfd6e4"') + r(270, 40, 50, 18, '#fff', 4, 'stroke="#cfd6e4"');
        d += '<text x="105" y="53" font-size="12" text-anchor="middle" fill="#4a5568" font-family="sans-serif">WC</text>' +
             '<text x="295" y="53" font-size="12" text-anchor="middle" fill="#4a5568" font-family="sans-serif">WC</text>';
      }
    } else if (nomor === 4) {
      // lemari
      d = ruang(p);
      if (adaLemari) {
        d += r(110, 40, 170, 178, p.kayu, 8) + r(118, 48, 76, 162, p.kayuTua, 5) + r(198, 48, 74, 162, p.kayuTua, 5) +
             r(184, 120, 5, 26, '#fff', 2) + r(203, 120, 5, 26, '#fff', 2);
      } else {
        d += r(100, 70, 6, 148, '#8f9bb3') + r(284, 70, 6, 148, '#8f9bb3') + r(100, 70, 190, 6, '#8f9bb3', 3);
        var baju = [p.kain, p.aksen, '#fff', p.kainTua, p.kain];
        for (var i = 0; i < baju.length; i++) {
          d += r(112 + i * 34, 82, 26, 54, baju[i], 6, 'stroke="#dbe3f2"') + r(122 + i * 34, 76, 6, 8, '#8f9bb3');
        }
      }
      d += adaAC ? unitAC(286, 18) : kipas(346, 140);
      d += r(30, 178, 52, 42, p.kain, 8) + r(38, 166, 36, 14, p.kainTua, 6);
    } else if (nomor === 5) {
      // tampak depan
      d = r(0, 0, 400, 300, p.langit) + r(0, 232, 400, 68, '#c5ccd8') +
          c(340, 48, 24, p.aksen, 'opacity=".85"') +
          r(40, 96, 220, 136, p.dinding, 6, 'stroke="#fff" stroke-width="4"') + '<polygon points="28,98 150,44 272,98" fill="' + p.kainTua + '"/>' +
          r(112, 150, 50, 82, p.kayu, 4) + c(152, 192, 3, '#fff') + r(60, 120, 40, 42, p.langit, 4, 'stroke="#fff" stroke-width="5"') +
          r(176, 120, 64, 42, p.langit, 4, 'stroke="#fff" stroke-width="5"') + r(108, 108, 58, 18, '#fff', 4, 'stroke="#cfd6e4"') +
          '<text x="137" y="121" font-size="11" text-anchor="middle" fill="#0f1f3d" font-family="sans-serif" font-weight="bold">KOS</text>';
      if (adaParkir) {
        d += r(262, 150, 120, 6, p.kayuTua, 2) + r(270, 156, 6, 76, p.kayuTua) + r(370, 156, 6, 76, p.kayuTua) +
             c(296, 220, 15, '#2b3a55') + c(296, 220, 6, '#9aa7bd') + c(352, 220, 15, '#2b3a55') + c(352, 220, 6, '#9aa7bd') +
             '<path d="M296 220 L316 194 L346 194 L352 220" fill="none" stroke="' + p.kain + '" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>' +
             r(316, 184, 26, 8, '#2b3a55', 4) + r(346, 184, 4, 24, '#2b3a55');
      } else {
        d += r(318, 160, 8, 36, p.kayuTua) + c(322, 140, 28, '#4f9d7c') +
             r(280, 196, 80, 10, p.kayu, 3) + r(286, 206, 6, 26, p.kayu) + r(348, 206, 6, 26, p.kayu);
      }
    } else {
      // dapur bersama atau teras
      d = ruang(p);
      if (adaDapur) {
        d += r(30, 72, 140, 8, p.kayu, 2) + c(56, 62, 10, '#fff', 'stroke="#cfd6e4" stroke-width="2"') + c(88, 62, 10, p.aksen) + c(120, 62, 10, '#fff', 'stroke="#cfd6e4" stroke-width="2"') +
             r(30, 156, 230, 64, p.kayu, 4) + r(30, 148, 230, 12, '#fff', 3) + r(52, 128, 60, 22, '#c7d0e0', 4) + r(60, 120, 44, 10, '#9aa7bd', 3) +
             '<g fill="none" stroke="#c7d0e0" stroke-width="3" stroke-linecap="round"><path d="M78 108 q5 -8 0 -14"/><path d="M90 108 q5 -8 0 -14"/></g>' +
             r(170, 130, 70, 18, '#2b3a55', 3) + c(188, 124, 6, '#ff8a3d') + c(222, 124, 6, '#9aa7bd') +
             r(290, 60, 80, 160, '#fff', 8, 'stroke="#cfd6e4" stroke-width="2"') + r(290, 128, 80, 3, '#cfd6e4') + r(358, 80, 5, 28, '#9aa7bd', 2) + r(358, 146, 5, 40, '#9aa7bd', 2);
      } else {
        d += jendela(150, 30, 100, 70, p) +
             r(40, 116, 12, 84, p.kayuTua, 4) + r(40, 196, 66, 10, p.kayu, 4) + r(46, 188, 54, 10, p.kain, 5) + r(46, 206, 6, 24, p.kayuTua) + r(96, 206, 6, 24, p.kayuTua) +
             r(160, 178, 90, 8, p.kayu, 4) + r(200, 186, 10, 40, p.kayuTua) + r(188, 226, 34, 6, p.kayuTua, 3) +
             r(196, 162, 16, 16, '#fff', 3, 'stroke="#cfd6e4" stroke-width="2"') +
             r(300, 116, 12, 84, p.kayuTua, 4) + r(254, 196, 66, 10, p.kayu, 4) + r(260, 188, 54, 10, p.kain, 5) + r(260, 206, 6, 24, p.kayuTua) + r(308, 206, 6, 24, p.kayuTua) +
             r(350, 188, 38, 38, p.kayu, 6) + '<path d="M369 188 q-26 -28 -8 -50 q10 18 8 50z M369 188 q26 -24 14 -48 q-16 16 -14 48z" fill="#4f9d7c"/>';
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' + d + '</svg>';
  }

  function ilustrasi(id, nomor) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(adegan(nomor, id));
  }

  function keterangan(id, nomor) {
    var k = dataKos(id);
    if (nomor === 1) { return punya(k, 'AC') ? 'Kamar ber-AC' : 'Kamar tidur'; }
    if (nomor === 2) { return punya(k, 'WiFi') ? 'Meja + WiFi' : 'Meja belajar'; }
    if (nomor === 3) {
      if (!punya(k, 'Kamar mandi dalam')) { return 'Kamar mandi luar'; }
      return punya(k, 'Water heater') ? 'Water heater' : 'Kamar mandi dalam';
    }
    if (nomor === 4) { return punya(k, 'Lemari') ? 'Lemari' : 'Rak baju'; }
    if (nomor === 5) { return punya(k, 'Parkir motor') ? 'Parkir motor' : 'Tampak depan'; }
    return punya(k, 'Dapur bersama') ? 'Dapur bersama' : 'Teras';
  }

  window.FotoKos = { ilustrasi: ilustrasi, keterangan: keterangan };

  /* ---------- PASANG FOTO ---------- */
  var gaya = document.createElement('style');
  gaya.textContent =
    '.ada-foto{background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}' +
    '.kc-foto.ada-foto,.bk-foto.ada-foto{background-position:36% center!important}' +
    '.ada-foto > svg,.ada-foto > .ikon,.ada-foto > .hero-img{display:none!important}' +
    '.foto-keterangan{position:absolute;left:14px;bottom:14px;background:rgba(15,31,61,.82);color:#fff;font-size:12px;font-weight:500;padding:5px 12px;border-radius:999px;z-index:2;pointer-events:none}';
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
    var hasil = '';
    try {
      Object.keys(DATA_KOS).forEach(function (k) {
        if (DATA_KOS[k].nama === nama) { hasil = k; }
      });
    } catch (e) {}
    return hasil;
  }

  function terapkan() {
    document.querySelectorAll('.kc-foto:not([data-foto])').forEach(function (el) {
      var tautan = el.closest('a');
      var id = tautan ? idDariTautan(tautan.getAttribute('href')) : '';
      if (!id) { return; }
      el.setAttribute('data-foto', id);
      pasang(el, id, 1);
    });

    document.querySelectorAll('.kepala-foto:not([data-foto])').forEach(function (el) {
      var nama = el.parentNode && el.parentNode.querySelector('strong');
      var id = nama ? idDariNama(nama.textContent.trim()) : '';
      if (!id) { return; }
      el.setAttribute('data-foto', id);
      pasang(el, id, 1);
    });

    document.querySelectorAll('.bk-foto:not([data-foto])').forEach(function (el) {
      var nama = document.getElementById('namaKos');
      var id = nama ? idDariNama(nama.textContent.trim()) : '';
      if (!id) { return; }
      el.setAttribute('data-foto', id);
      pasang(el, id, 1);
    });

    var hero = document.getElementById('hero');
    if (hero) {
      var id = idDariTautan(location.search);
      if (id) {
        var teks = document.getElementById('jumlahFoto');
        var n = teks ? parseInt(teks.textContent, 10) || 1 : 1;
        var nomor = ((n - 1) % JUMLAH) + 1;
        if (hero.getAttribute('data-foto') !== id + '-' + n) {
          hero.setAttribute('data-foto', id + '-' + n);
          pasang(hero, id, n);
          var ket = hero.querySelector('.foto-keterangan');
          if (!ket) {
            ket = document.createElement('span');
            ket.className = 'foto-keterangan';
            hero.appendChild(ket);
          }
          ket.textContent = keterangan(id, nomor);
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