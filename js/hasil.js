const daftarKos = [
  { id: 1, nama: "Kos Melati", jarak: 800, jalan: "Jl. Veteran", tipe: "Putri", rating: 4.8, ulasan: 32, fasilitas: ["WiFi", "AC", "KM Dalam"], harga: 1200000, sisa: 2 },
  { id: 2, nama: "Kos Cempaka", jarak: 1200, jalan: "Jl. Sigura-gura", tipe: "Campur", rating: 4.5, ulasan: 40, fasilitas: ["WiFi", "Kipas", "KM Luar"], harga: 800000, sisa: 1 },
  { id: 3, nama: "Kos Anggrek", jarak: 1800, jalan: "Jl. Bendungan Sutami", tipe: "Putra", rating: 4.7, ulasan: 29, fasilitas: ["WiFi", "AC", "KM Luar"], harga: 1000000, sisa: 3 }
];

let terpilih = [1];

const elDaftar = document.getElementById("daftar");
const elUrutan = document.getElementById("urutan");
const elTombol = document.getElementById("tombolBandingkan");

function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function formatJarak(meter) {
  if (meter < 1000) {
    return meter + " m";
  }
  return (meter / 1000).toString().replace(".", ",") + " km";
}

function tampilkan() {
  const urut = elUrutan.value;
  const data = daftarKos.slice();
  if (urut === "jarak") {
    data.sort(function (a, b) { return a.jarak - b.jarak; });
  } else if (urut === "harga") {
    data.sort(function (a, b) { return a.harga - b.harga; });
  } else {
    data.sort(function (a, b) { return b.rating - a.rating; });
  }

  let html = "";
  data.forEach(function (kos) {
    const centang = terpilih.includes(kos.id) ? "checked" : "";
    const fasilitas = kos.fasilitas.map(function (f) {
      return '<span class="tag-fas">' + f + "</span>";
    }).join("");

    html +=
      '<div class="kartu-kos">' +
        '<a href="detail.html?id=' + kos.id + '" class="kos-atas">' +
          '<div class="kos-foto">🖼️<span class="label-verif">Terverifikasi</span></div>' +
          '<div class="kos-info">' +
            "<h4>" + kos.nama + "</h4>" +
            '<p class="kos-lokasi">📍 ' + formatJarak(kos.jarak) + " · " + kos.jalan + "</p>" +
            '<div class="baris-mini"><span class="tag-tipe">' + kos.tipe + "</span>" +
              "<span>⭐ <strong>" + kos.rating.toString().replace(".", ",") + "</strong> (" + kos.ulasan + ")</span></div>" +
            '<div class="baris-fasilitas">' + fasilitas + "</div>" +
            '<p class="kos-harga"><strong>' + formatRupiah(kos.harga) + "</strong><span>/bulan</span>" +
              '<span class="kos-sisa">Sisa ' + kos.sisa + " kamar</span></p>" +
          "</div>" +
        "</a>" +
        '<div class="kos-bawah"><label>' +
          '<input type="checkbox" data-id="' + kos.id + '" ' + centang + "> Bandingkan" +
        "</label></div>" +
      "</div>";
  });

  elDaftar.innerHTML = html;
  perbaruiTombol();
}

function perbaruiTombol() {
  elTombol.textContent = "Bandingkan " + terpilih.length + " kos";
  if (terpilih.length < 2) {
    elTombol.classList.add("mati");
  } else {
    elTombol.classList.remove("mati");
  }
}

elDaftar.addEventListener("change", function (e) {
  if (e.target.type !== "checkbox") {
    return;
  }
  const id = Number(e.target.dataset.id);
  if (e.target.checked) {
    terpilih.push(id);
  } else {
    terpilih = terpilih.filter(function (x) { return x !== id; });
  }
  perbaruiTombol();
});

elUrutan.addEventListener("change", tampilkan);

elTombol.addEventListener("click", function () {
  elTombol.href = "bandingkan.html?id=" + terpilih.join(",");
});

tampilkan();