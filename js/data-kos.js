// Data kos bersama (dipakai detail.js dan bandingkan.js)
var DATA_KOS = {
  melati: {
    id: 'melati', nama: 'Kos Melati', tipe: 'Putri', jalan: 'Jl. Veteran',
    alamat: 'Jl. Contoh No. 12, Malang', jarak: '800 m', harga: 1200000,
    rating: '4,8', ulasan: 32, sisa: 2,
    deskripsi: 'Kamar 3 x 4 m di lingkungan tenang, dekat warung makan dan halte. Pemilik tinggal di dekat kos dan menerima tamu sampai pukul 21.00.',
    fasilitas: ['AC', 'WiFi', 'Kamar mandi dalam', 'Kasur', 'Lemari', 'Meja belajar'],
    pendingin: 'AC', kamarMandi: 'Dalam', wifi: 'Ada'
  },
  cempaka: {
    id: 'cempaka', nama: 'Kos Cempaka', tipe: 'Campur', jalan: 'Jl. Sigura-gura',
    alamat: 'Jl. Sigura-gura No. 8, Malang', jarak: '1,2 km', harga: 850000,
    rating: '4,5', ulasan: 40, sisa: 1,
    deskripsi: 'Kamar 3 x 3 m, sirkulasi udara baik, dekat minimarket dan tempat fotokopi. Jam malam pukul 22.00.',
    fasilitas: ['Kipas', 'WiFi', 'Kamar mandi luar', 'Kasur', 'Lemari'],
    pendingin: 'Kipas', kamarMandi: 'Luar', wifi: 'Ada'
  },
  anggrek: {
    id: 'anggrek', nama: 'Kos Anggrek', tipe: 'Putra', jalan: 'Jl. Bunga',
    alamat: 'Jl. Bunga No. 5, Malang', jarak: '1,8 km', harga: 1000000,
    rating: '4,7', ulasan: 29, sisa: 3,
    deskripsi: 'Kamar 3 x 3,5 m, parkir motor luas, dapur bersama di lantai bawah.',
    fasilitas: ['Kipas', 'WiFi', 'Kamar mandi dalam', 'Kasur', 'Lemari', 'Parkir motor'],
    pendingin: 'Kipas', kamarMandi: 'Dalam', wifi: 'Ada'
  }
};

function rupiah(n) {
  return 'Rp' + n.toLocaleString('id-ID');
}