(function () {
  var b = bkBaca('booking', null);

  /* Belum isi reservasi -> balik ke reservasi. Sudah dibayar -> langsung ke konfirmasi. */
  if (!b || !DATA_KOS[b.kosId] || !b.mulai) { location.replace('reservasi.html'); return; }
  if (b.kode) { location.replace('konfirmasi.html'); return; }

  var kos = DATA_KOS[b.kosId];

  var METODE = [
    { id: 'va', nama: 'Transfer bank (virtual account)', ket: 'Kode bayar dikirim setelah memilih bank' },
    { id: 'ewallet', nama: 'Dompet digital', ket: 'Bayar lewat aplikasi dompet digitalmu' },
    { id: 'qris', nama: 'QRIS', ket: 'Pindai dari aplikasi pembayaran apa pun' }
  ];
  var dipilih = b.metodeId || 'va';

  document.getElementById('kembali').href = 'reservasi.html?id=' + kos.id;

  document.getElementById('ringkasan').innerHTML =
    bkBaris('Kos', bkAman(kos.nama)) +
    bkBaris('Tanggal masuk', bkTanggalIndo(b.mulai)) +
    bkBaris('Durasi sewa', b.durasi + ' bulan') +
    bkBaris('Sewa bulan pertama', rupiah(b.harga)) +
    '<div class="bk-baris bk-total"><span>Bayar sekarang (DP)</span><strong>' + rupiah(b.dp) + '</strong></div>';

  document.getElementById('bayar').textContent = 'Bayar ' + rupiah(b.dp);

  /* Pilihan metode pembayaran */
  var elMetode = document.getElementById('metode');
  elMetode.innerHTML = METODE.map(function (m) {
    return '<label class="bk-metode">' +
      '<input type="radio" name="metode" value="' + m.id + '"' + (m.id === dipilih ? ' checked' : '') + '>' +
      '<span class="bk-radio"></span>' +
      '<span><strong>' + m.nama + '</strong><small>' + m.ket + '</small></span>' +
    '</label>';
  }).join('');

  function tandai() {
    elMetode.querySelectorAll('.bk-metode').forEach(function (l) {
      l.classList.toggle('pilih', l.querySelector('input').checked);
    });
  }
  elMetode.addEventListener('change', tandai);
  tandai();

  function buatKode() {
    var huruf = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', kode = 'KK-';
    for (var i = 0; i < 6; i++) kode += huruf.charAt(Math.floor(Math.random() * huruf.length));
    return kode;
  }

  document.getElementById('bayar').addEventListener('click', function () {
    var pilih = elMetode.querySelector('input:checked');
    if (!pilih) {
      bkPopup('Metode belum dipilih', 'Pilih salah satu metode pembayaran dulu ya.');
      return;
    }
    var m = METODE.filter(function (x) { return x.id === pilih.value; })[0];
    b.metodeId = m.id;
    b.metode = m.nama;
    bkSimpan('booking', b);

    /* Simulasi proses pembayaran (prototype, tidak ada transaksi sungguhan) */
    bkLoading('Memproses pembayaran...');
    setTimeout(function () {
      b.kode = buatKode();
      b.status = 'Dikonfirmasi';
      b.waktuBayar = Date.now();
      bkSimpan('booking', b);

      /* Disimpan juga ke riwayat, bisa dipakai di halaman Akun Saya */
      var riwayat = bkBaca('riwayatBooking', []);
      riwayat.unshift({
        kode: b.kode, kosId: kos.id, namaKos: kos.nama, mulai: b.mulai, durasi: b.durasi,
        dp: b.dp, status: b.status, waktuBayar: b.waktuBayar
      });
      bkSimpan('riwayatBooking', riwayat.slice(0, 10));

      /* replace: tombol Back tidak kembali ke halaman bayar */
      location.replace('konfirmasi.html');
    }, 1500);
  });
})();
