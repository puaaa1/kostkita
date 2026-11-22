(function () {
  var gaya = document.createElement('style');
  gaya.textContent =
    '.kc-kartu{background:#fff;border:1px solid rgba(0,0,0,.15);border-radius:14px;margin-bottom:12px;overflow:hidden}' +
    '.kc-isi{display:flex;gap:12px;padding:12px;text-decoration:none;color:inherit}' +
    '.kc-foto{flex:none;width:96px;height:112px;border-radius:10px;background:#DCE8FA;color:rgba(11,31,63,.4);display:flex;align-items:center;justify-content:center;position:relative}' +
    '.kc-foto svg{width:34px;height:34px}' +
    '.kc-verif{position:absolute;top:6px;left:6px;background:#0B1F3F;color:#fff;font-size:9px;font-weight:600;padding:2px 7px;border-radius:999px}' +
    '.kc-info{min-width:0;font-size:12px;display:flex;flex-direction:column;gap:5px}' +
    '.kc-info strong{font-size:15px}' +
    '.kc-lok{color:rgba(15,26,46,.65)}' +
    '.kc-baris{display:flex;gap:8px;align-items:center}' +
    '.kc-tipe{background:#DCE8FA;color:#0B1F3F;border-radius:999px;padding:1px 9px;font-size:11px}' +
    '.kc-tag{display:flex;flex-wrap:wrap;gap:4px}' +
    '.kc-tag span{border:1px solid rgba(0,0,0,.2);border-radius:999px;padding:1px 8px;font-size:10px;font-weight:600}' +
    '.kc-harga{font-weight:600;font-size:13px}' +
    '.kc-sisa{color:#AD0000;font-weight:600}' +
    '.kc-banding{display:flex;align-items:center;gap:8px;padding:10px 14px;border-top:1px solid rgba(0,0,0,.15);font-size:13px;font-weight:600;cursor:pointer}' +
    '.kc-banding input{width:18px;height:18px;accent-color:#0B1F3F}' +
    '.kc-kosong{text-align:center;padding:36px 16px;color:rgba(15,26,46,.65);font-size:13px;line-height:1.6}' +
    '.kc-kosong strong{display:block;color:#0F1A2E;font-size:15px;margin-bottom:6px}' +
    '.kc-saran{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}' +
    '.kc-saran a{background:#DCE8FA;color:#0B1F3F;border-radius:999px;padding:6px 14px;font-size:12px;text-decoration:none}';
  document.head.appendChild(gaya);

  var IKON_GAMBAR = '<svg viewBox="0 0 38 37" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M35.5 27.4583L26.2692 16.8333L11.5 33.8333" stroke-width="2.1"/><path d="M16.5 14.8333C16.5 16.4902 15.1569 17.8333 13.5 17.8333C11.8431 17.8333 10.5 16.4902 10.5 14.8333C10.5 13.1765 11.8431 11.8333 13.5 11.8333C15.1569 11.8333 16.5 13.1765 16.5 14.8333Z" stroke-width="2.1"/><path d="M7.05556 3.83331H31.9444C33.9081 3.83331 35.5 5.75209 35.5 8.11903V29.5476C35.5 31.9145 33.9081 33.8333 31.9444 33.8333H7.05556C5.09188 33.8333 3.5 31.9145 3.5 29.5476V8.11903C3.5 5.75209 5.09188 3.83331 7.05556 3.83331Z" stroke-width="2.1"/></svg>';
  var IKON_PIN = '<svg viewBox="0 0 25 26" width="14" height="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><path d="M11.5 22C11.5 22 19 15.3333 19 9.77778C19 7.71498 18.2098 5.73667 16.8033 4.27806C15.3968 2.81944 13.4891 2 11.5 2C9.51088 2 7.60322 2.81944 6.1967 4.27806C4.79018 5.73667 4 7.71498 4 9.77778C4 15.3333 11.5 22 11.5 22Z" stroke-width="1.35"/><path d="M14 9.5C14 10.8807 12.8807 12 11.5 12C10.1193 12 9 10.8807 9 9.5C9 8.11929 10.1193 7 11.5 7C12.8807 7 14 8.11929 14 9.5Z" stroke-width="1.35"/></svg>';
  var IKON_BINTANG = '<svg viewBox="0 0 24 24" width="12" height="12" fill="#FFC93C" stroke="#FFC93C" stroke-width="2" stroke-linejoin="round" style="vertical-align:-1px"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>';

  var cari = {};
  try { cari = JSON.parse(localStorage.getItem('pencarian')) || {}; } catch (e) {}
  if (!cari.lokasi) cari.lokasi = 'Universitas Brawijaya';

  var elDaftar = document.getElementById('daftar');
  var elJumlah = document.getElementById('jumlah');
  var elUrut = document.getElementById('urutan');
  var tombol = document.getElementById('tombolBandingkan');
  var dipilih = [];

  var kotak = document.querySelector('.kotak-cari strong');
  if (kotak) kotak.textContent = cari.lokasi;

  function kartu(h) {
    var k = h.kos;
    var tag = k.fasilitas.slice(0, 3).map(function (f) { return '<span>' + f + '</span>'; }).join('');
    var jarak = (k.jarakTetap && h.jarak === k.jarakMeter) ? k.jarakTetap : formatJarak(h.jarak);
    return '<article class="kc-kartu">' +
      '<a class="kc-isi" href="detail.html?id=' + k.id + '">' +
        '<div class="kc-foto">' + IKON_GAMBAR + '<span class="kc-verif">Terverifikasi</span></div>' +
        '<div class="kc-info"><strong>' + k.nama + '</strong>' +
          '<div class="kc-lok">' + IKON_PIN + ' ' + jarak + ' · ' + k.jalan + '</div>' +
          '<div class="kc-baris"><span class="kc-tipe">' + k.tipe + '</span><span>' + IKON_BINTANG + ' ' + k.rating + ' (' + k.ulasan + ')</span></div>' +
          '<div class="kc-tag">' + tag + '</div>' +
          '<div class="kc-harga">' + rupiah(k.harga) + '/bulan</div>' +
          '<div class="kc-sisa">Sisa ' + k.sisa + ' kamar</div>' +
        '</div></a>' +
      '<label class="kc-banding"><input type="checkbox" data-id="' + k.id + '"' +
        (dipilih.indexOf(k.id) > -1 ? ' checked' : '') + '> Bandingkan</label>' +
    '</article>';
  }

  function tampil() {
    var r = cariKos({
      lokasi: cari.lokasi, tipe: cari.tipe, min: cari.min, max: cari.max,
      fasilitas: cari.fasilitas, urut: elUrut ? elUrut.value : 'jarak'
    });
    var n = r.daftar.length;

    if (!n) {
      elJumlah.textContent = 'Tidak ada kos ditemukan';
      elDaftar.innerHTML = '<div class="kc-kosong"><strong>Belum ada kos yang cocok</strong>' +
        'Coba ganti kata kunci, longgarkan filter harga, atau pilih kampus ini:' +
        '<div class="kc-saran">' + KAMPUS.map(function (c) { return '<a href="cari.html" data-kampus="' + c.nama + '">' + c.nama + '</a>'; }).join('') + '</div></div>';
      elDaftar.querySelectorAll('[data-kampus]').forEach(function (a) {
        a.addEventListener('click', function () {
          cari.lokasi = a.getAttribute('data-kampus');
          try { localStorage.setItem('pencarian', JSON.stringify(cari)); } catch (e) {}
        });
      });
      return;
    }

    var nama = r.jenis === 'kampus' ? r.kampus.map(function (c) { return c.nama; }).join(', ') : cari.lokasi;
    if (kotak && r.jenis === 'kampus') kotak.textContent = nama;
    elJumlah.textContent = n + ' kos ' + (r.jenis === 'kampus' ? 'dekat ' : 'untuk ') + nama;
    elDaftar.innerHTML = r.daftar.map(kartu).join('');
    elDaftar.querySelectorAll('input[type=checkbox]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var id = cb.getAttribute('data-id'), i = dipilih.indexOf(id);
        if (cb.checked) {
          if (dipilih.length >= 3) { cb.checked = false; alert('Maksimal 3 kos untuk dibandingkan.'); return; }
          dipilih.push(id);
        } else if (i > -1) { dipilih.splice(i, 1); }
        ubahTombol();
      });
    });
  }

  function ubahTombol() {
    tombol.textContent = 'Bandingkan ' + dipilih.length + ' kos';
    tombol.setAttribute('href', 'bandingkan.html?ids=' + dipilih.join(','));
  }
  tombol.addEventListener('click', function (e) {
    if (dipilih.length < 2) { e.preventDefault(); alert('Pilih minimal 2 kos dengan mencentang "Bandingkan".'); }
  });

  if (elUrut) elUrut.addEventListener('change', tampil);
  tampil();
  ubahTombol();
})();