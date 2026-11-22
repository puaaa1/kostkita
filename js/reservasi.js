(function () {
  var param = new URLSearchParams(location.search).get('id');
  var lama = bkBaca('booking', {});
  var kos = DATA_KOS[param] || DATA_KOS[lama.kosId] || DATA_KOS.melati;
  var samaKos = lama.kosId === kos.id && !lama.kode;
  var durasi = samaKos && lama.durasi ? lama.durasi : 6;
  var dp = bkHitungDp(kos.harga);

  var elMulai = document.getElementById('mulai');
  var elPilih = document.getElementById('pilihTanggal');
  var elNama = document.getElementById('nama');
  var elHp = document.getElementById('hp');
  var elKampus = document.getElementById('kampus');
  var tombolDurasi = document.querySelectorAll('#durasi button');

  document.title = 'Reservasi ' + kos.nama + ' - KostKita';
  document.getElementById('kembali').href = 'detail.html?id=' + kos.id;
  document.getElementById('namaKos').textContent = kos.nama;
  document.getElementById('infoKos').textContent = rupiah(kos.harga) + ' /bulan · ' + kos.tipe;
  document.getElementById('dp').textContent = rupiah(dp);

  /* Tanggal masuk: hari ini s.d. 60 hari ke depan */
  var tglMin = bkHariIni();
  var tglMax = bkHariIni(60);
  elPilih.min = tglMin;
  elPilih.max = tglMax;

  /* Isi ulang data penyewa dari pengisian sebelumnya */
  elNama.value = lama.nama || '';
  elHp.value = lama.hp || '';
  elKampus.value = lama.kampus || '';
  if (samaKos && lama.mulai >= tglMin) {
    elMulai.value = bkIsoKeTeks(lama.mulai);
    elPilih.value = lama.mulai;
  }

  /* Kolom tanggal: kalau browser bisa membuka kalender, klik = buka kalender.
     Kalau tidak bisa, pengguna mengetik sendiri dan "/" ditambahkan otomatis. */
  var bisaKalender = typeof elPilih.showPicker === 'function';
  if (bisaKalender) elMulai.readOnly = true;

  function bukaKalender() {
    try { elPilih.showPicker(); } catch (e) {
      bisaKalender = false;
      elMulai.readOnly = false;
      elMulai.focus();
    }
  }
  elMulai.addEventListener('click', function () { if (bisaKalender) bukaKalender(); });
  elMulai.addEventListener('keydown', function (e) {
    if (bisaKalender && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); bukaKalender(); }
  });
  elPilih.addEventListener('change', function () {
    elMulai.value = bkIsoKeTeks(elPilih.value);
    elMulai.classList.remove('salah');
  });
  elMulai.addEventListener('input', function () {
    var a = elMulai.value.replace(/\D/g, '').slice(0, 8);
    if (a.length > 4) a = a.slice(0, 2) + '/' + a.slice(2, 4) + '/' + a.slice(4);
    else if (a.length > 2) a = a.slice(0, 2) + '/' + a.slice(2);
    elMulai.value = a;
  });

  function tandaiDurasi() {
    tombolDurasi.forEach(function (t) {
      t.classList.toggle('pilih', +t.getAttribute('data-bulan') === durasi);
    });
  }
  tombolDurasi.forEach(function (t) {
    t.addEventListener('click', function () {
      durasi = +t.getAttribute('data-bulan');
      tandaiDurasi();
    });
  });
  tandaiDurasi();

  /* No. HP hanya boleh angka (dan + di depan) */
  elHp.addEventListener('input', function () {
    elHp.value = elHp.value.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
  });

  /* Hilangkan tanda merah saat diperbaiki */
  [elMulai, elNama, elHp, elKampus].forEach(function (el) {
    el.addEventListener('input', function () { el.classList.remove('salah'); });
    el.addEventListener('change', function () { el.classList.remove('salah'); });
  });

  function cek() {
    if (!elMulai.value) {
      return [elMulai, 'Tanggal masuk belum diisi', 'Pilih tanggal kamu mulai menempati kos.'];
    }
    var mulai = bkTeksKeIso(elMulai.value);
    if (!mulai) {
      return [elMulai, 'Tanggal belum benar', 'Tulis tanggal dengan format dd/mm/yyyy, contoh 01/12/2026.'];
    }
    if (mulai < tglMin || mulai > tglMax) {
      return [elMulai, 'Tanggal tidak tersedia', 'Pilih tanggal mulai hari ini sampai 60 hari ke depan.'];
    }
    var nama = elNama.value.trim();
    if (nama.length < 3 || !/^[a-zA-Z .'-]+$/.test(nama)) {
      return [elNama, 'Nama belum benar', 'Isi nama lengkap sesuai identitas, minimal 3 huruf.'];
    }
    if (!/^(\+62|62|0)8\d{7,11}$/.test(elHp.value.trim())) {
      return [elHp, 'No. HP belum benar', 'Gunakan nomor WhatsApp aktif, contoh 081234567890.'];
    }
    if (elKampus.value.trim().length < 2) {
      return [elKampus, 'Kampus belum diisi', 'Isi kampus dan jurusanmu, contoh: UB, Teknik Informatika.'];
    }
    return null;
  }

  document.getElementById('lanjut').addEventListener('click', function () {
    var salah = cek();
    if (salah) {
      salah[0].classList.add('salah');
      bkPopup(salah[1], salah[2], salah[0]);
      return;
    }

    var mulai = bkTeksKeIso(elMulai.value);
    bkSimpan('booking', {
      kosId: kos.id,
      mulai: mulai,
      selesai: bkTambahBulan(mulai, durasi),
      durasi: durasi,
      nama: elNama.value.trim(),
      hp: elHp.value.trim(),
      kampus: elKampus.value.trim(),
      harga: kos.harga,
      dp: dp,
      metodeId: samaKos ? lama.metodeId : null
    });
    location.href = 'pembayaran.html';
  });
})();
