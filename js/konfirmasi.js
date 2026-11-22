(function () {
  var b = bkBaca('booking', null);

  /* Belum bayar -> kembali ke pembayaran (yang akan mengarahkan ke reservasi kalau perlu) */
  if (!b || !b.kode || !DATA_KOS[b.kosId]) { location.replace('pembayaran.html'); return; }

  var kos = DATA_KOS[b.kosId];

  document.getElementById('kode').textContent = b.kode;
  document.getElementById('detail').innerHTML =
    bkBaris('Kos', bkAman(kos.nama)) +
    bkBaris('Tanggal masuk', bkTanggalIndo(b.mulai)) +
    bkBaris('Durasi sewa', b.durasi + ' bulan') +
    bkBaris('DP dibayar', rupiah(b.dp)) +
    bkBaris('Status', bkAman(b.status));

  /* ===== Unduh bukti booking sebagai gambar PNG ===== */
  function kotakBulat(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function unduhBukti() {
    var baris = [
      ['Kos', kos.nama],
      ['Alamat', kos.jalan + ' No. ' + kos.no + ', ' + kos.area],
      ['Penyewa', b.nama],
      ['No. HP', b.hp],
      ['Tanggal masuk', bkTanggalIndo(b.mulai)],
      ['Durasi sewa', b.durasi + ' bulan'],
      ['Sewa per bulan', rupiah(b.harga)],
      ['DP dibayar', rupiah(b.dp)],
      ['Metode', b.metode || '-'],
      ['Waktu bayar', bkWaktuIndo(b.waktuBayar)],
      ['Status', b.status]
    ];
    var huruf = 'Poppins, Arial, sans-serif';
    var W = 720, tinggiBaris = 44, H = 330 + baris.length * tinggiBaris + 110;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var x = c.getContext('2d');

    x.fillStyle = '#F3F4F7'; x.fillRect(0, 0, W, H);

    /* Kepala navy */
    x.fillStyle = '#0B1F3F'; x.fillRect(0, 0, W, 150);
    x.fillStyle = '#FFC93C'; x.font = '700 30px ' + huruf; x.fillText('KostKita', 48, 70);
    x.fillStyle = '#FFFFFF'; x.font = '400 20px ' + huruf; x.fillText('Bukti Booking Kos', 48, 106);

    /* Kartu putih */
    x.fillStyle = '#FFFFFF'; kotakBulat(x, 32, 180, W - 64, H - 260, 20); x.fill();
    x.strokeStyle = '#E9EDF5'; x.lineWidth = 2; x.stroke();

    x.fillStyle = '#6B7A90'; x.font = '400 19px ' + huruf; x.fillText('Kode booking', 64, 232);
    x.fillStyle = '#0F1A2E'; x.font = '700 28px ' + huruf; x.textAlign = 'right';
    if ('letterSpacing' in x) x.letterSpacing = '2px';
    x.fillText(b.kode, W - 64, 234);
    if ('letterSpacing' in x) x.letterSpacing = '0px';
    x.textAlign = 'left';

    x.setLineDash([6, 6]); x.strokeStyle = '#DCE0E8';
    x.beginPath(); x.moveTo(64, 266); x.lineTo(W - 64, 266); x.stroke(); x.setLineDash([]);

    baris.forEach(function (r, i) {
      var y = 312 + i * tinggiBaris;
      x.fillStyle = '#6B7A90'; x.font = '400 19px ' + huruf; x.textAlign = 'left';
      x.fillText(r[0], 64, y);
      x.fillStyle = '#0F1A2E'; x.font = '600 19px ' + huruf; x.textAlign = 'right';
      x.fillText(String(r[1]), W - 64, y, W - 64 - 230);
    });
    x.textAlign = 'center'; x.fillStyle = '#4B5362'; x.font = '400 16px ' + huruf;
    x.fillText('Tunjukkan bukti ini ke pemilik kos saat tiba di Malang.', W / 2, H - 40);

    var nama = 'bukti-booking-' + b.kode + '.png';
    function simpanFile(url) {
      var a = document.createElement('a');
      a.href = url; a.download = nama;
      document.body.appendChild(a); a.click(); a.remove();
    }
    if (c.toBlob) {
      c.toBlob(function (blob) {
        var url = URL.createObjectURL(blob);
        simpanFile(url);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      });
    } else {
      simpanFile(c.toDataURL('image/png'));
    }
  }

  document.getElementById('unduh').addEventListener('click', unduhBukti);
})();
