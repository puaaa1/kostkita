function tampilPopup(isiIkon, judul, pesan, fokus) {
  var latar = document.createElement('div');
  latar.className = 'popup-latar';
  latar.innerHTML =
    '<div class="popup-kartu">' +
      '<div class="popup-ikon">' + isiIkon + '</div>' +
      '<div class="popup-judul">' + judul + '</div>' +
      '<p class="popup-teks">' + pesan + '</p>' +
      '<button type="button" class="popup-tombol">Oke</button>' +
    '</div>';
  document.body.appendChild(latar);

  function tutup() {
    document.removeEventListener('keydown', tekan);
    latar.remove();
    if (fokus) { fokus.focus(); }
  }
  function tekan(e) {
    if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); tutup(); }
  }
  document.addEventListener('keydown', tekan);
  latar.querySelector('.popup-tombol').addEventListener('click', tutup);
  latar.addEventListener('click', function (e) { if (e.target === latar) { tutup(); } });
  latar.querySelector('.popup-tombol').focus();
}