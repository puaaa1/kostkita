var IKON = {
  home: { vb: '0 0 26 27', d: '<path d="M3 11.8235L13 4L23 11.8235V21.8824C23 22.1788 22.8829 22.4631 22.6746 22.6726C22.4662 22.8822 22.1836 23 21.8889 23H16.3333V16.2941H9.66667V23H4.11111C3.81643 23 3.53381 22.8822 3.32544 22.6726C3.11706 22.4631 3 22.1788 3 21.8824V11.8235Z" stroke-width="2"/>' },
  search: { vb: '0 0 24 26', d: '<path d="M22 22L18 18" stroke-width="2"/><path class="lingkar" d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke-width="2"/>' },
  user: { vb: '0 0 26 27', d: '<path d="M4 23C4 18.3333 8.5 16 13 16C17.5 16 22 18.3333 22 23" stroke-width="2"/><path d="M17 8.5C17 10.9853 14.9853 13 12.5 13C10.0147 13 8 10.9853 8 8.5C8 6.01472 10.0147 4 12.5 4C14.9853 4 17 6.01472 17 8.5Z" stroke-width="2"/>' },
  pin: { vb: '0 0 25 26', d: '<path d="M11.5 22C11.5 22 19 15.3333 19 9.77778C19 7.71498 18.2098 5.73667 16.8033 4.27806C15.3968 2.81944 13.4891 2 11.5 2C9.51088 2 7.60322 2.81944 6.1967 4.27806C4.79018 5.73667 4 7.71498 4 9.77778C4 15.3333 11.5 22 11.5 22Z" stroke-width="1.35"/><path d="M14 9.5C14 10.8807 12.8807 12 11.5 12C10.1193 12 9 10.8807 9 9.5C9 8.11929 10.1193 7 11.5 7C12.8807 7 14 8.11929 14 9.5Z" stroke-width="1.35"/>' },
  clock: { vb: '0 0 24 24', d: '<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke-width="2" stroke-opacity=".5"/><path d="M15 16L12.586 13.586C12.2109 13.211 12.0001 12.7024 12 12.172V6" stroke-width="2" stroke-opacity=".5"/>' },
  back: { vb: '0 0 25 24', d: '<path d="M15 5L8 12L15 19" stroke-width="1.8"/>' },
  next: { vb: '0 0 24 24', d: '<path d="M9 6l6 6-6 6" stroke-width="1.8"/>' },
  down: { vb: '0 0 18 18', d: '<path d="M14.25 6.75L9 12L3.75 6.75" stroke-width="1.5"/>' },
  filter: { vb: '0 0 16 16', d: '<path fill="currentColor" stroke="none" d="M6.45 3.5C6.25 2.65 5.45 2 4.5 2C3.55 2 2.8 2.65 2.55 3.5H1V4.5H2.55C2.75 5.35 3.55 6 4.5 6C5.45 6 6.2 5.35 6.45 4.5H15V3.5H6.45ZM4.5 5C3.95 5 3.5 4.55 3.5 4C3.5 3.45 3.95 3 4.5 3C5.05 3 5.5 3.45 5.5 4C5.5 4.55 5.05 5 4.5 5ZM11.5 6C10.55 6 9.8 6.65 9.55 7.5H1V8.5H9.55C9.75 9.35 10.55 10 11.5 10C12.45 10 13.2 9.35 13.45 8.5H15V7.5H13.45C13.25 6.65 12.45 6 11.5 6ZM11.5 9C10.95 9 10.5 8.55 10.5 8C10.5 7.45 10.95 7 11.5 7C12.05 7 12.5 7.45 12.5 8C12.5 8.55 12.05 9 11.5 9ZM7 10C6.05 10 5.3 10.65 5.05 11.5H1V12.5H5.05C5.25 13.35 6.05 14 7 14C7.95 14 8.7 13.35 8.95 12.5H15V11.5H8.95C8.75 10.65 7.95 10 7 10ZM7 13C6.45 13 6 12.55 6 12C6 11.45 6.45 11 7 11C7.55 11 8 11.45 8 12C8 12.55 7.55 13 7 13Z"/>' },
  image: { vb: '0 0 38 37', d: '<path d="M35.5 27.4583L26.2692 16.8333L11.5 33.8333" stroke-width="2.1"/><path d="M16.5 14.8333C16.5 16.4902 15.1569 17.8333 13.5 17.8333C11.8431 17.8333 10.5 16.4902 10.5 14.8333C10.5 13.1765 11.8431 11.8333 13.5 11.8333C15.1569 11.8333 16.5 13.1765 16.5 14.8333Z" stroke-width="2.1"/><path d="M7.05556 3.83331H31.9444C33.9081 3.83331 35.5 5.75209 35.5 8.11903V29.5476C35.5 31.9145 33.9081 33.8333 31.9444 33.8333H7.05556C5.09188 33.8333 3.5 31.9145 3.5 29.5476V8.11903C3.5 5.75209 5.09188 3.83331 7.05556 3.83331Z" stroke-width="2.1"/>' },
  shield: { vb: '0 0 22 22', d: '<path d="M7.79163 11L10.0833 13.2916L14.6666 8.70831" stroke-width="1.65"/><path d="M11 2.75L18.3333 5.5V11C18.3333 15.5833 15.125 18.3333 11 19.25C6.87496 18.3333 3.66663 15.5833 3.66663 11V5.5L11 2.75Z" stroke-width="2"/>' },
  chat: { vb: '0 0 21 22', d: '<path d="M3.66663 4.58331H18.3333V14.6666H8.24996L3.66663 18.3333V4.58331Z" stroke-width="2"/>' },
  heart: { vb: '0 0 25 24', d: '<path d="M12 20C12 20 5 15.385 5 9.96742C5.00919 9.1562 5.26324 8.36682 5.72864 7.70338C6.19405 7.03993 6.84895 6.53359 7.607 6.25111C8.36504 5.96864 9.19062 5.9233 9.97486 6.12107C10.7591 6.31885 11.4652 6.75044 12 7.35895C12.5348 6.75044 13.2409 6.31885 14.0251 6.12107C14.8094 5.9233 15.635 5.96864 16.393 6.25111C17.151 6.53359 17.806 7.03993 18.2714 7.70338C18.7368 8.36682 18.9908 9.1562 19 9.96742C19 15.385 12 20 12 20Z" stroke-width="1.8"/>' },
  check: { vb: '0 0 19 18', d: '<path d="M3.75 9L7.5 12.75L14.25 5.25" stroke-width="1.35"/>' },
  download: { vb: '0 0 20 20', d: '<path d="M9.99996 3.33337V12.5M5.83329 9.16671L9.99996 13.3334L14.1666 9.16671M4.16663 16.6667H15.8333" stroke-width="1.5"/>' },
  star: { vb: '0 0 24 24', d: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" stroke-width="2"/>' }
};

function ikon(nama) {
  var i = IKON[nama];
  return '<svg class="ikon ikon-' + nama + '" viewBox="' + i.vb + '" fill="none" stroke="currentColor" ' +
         'stroke-linecap="round" stroke-linejoin="round">' + i.d + '</svg>';
}

(function () {
  var PETA = {
    '📍': 'pin', '🔍': 'search', '👤': 'user', '🏠': 'home', '🕒': 'clock',
    '🖼': 'image', '🛡': 'shield', '💬': 'chat', '⚙': 'filter',
    '⭐': 'star', '✔': 'check', '✓': 'check', '❤': 'heart', '🤍': 'heart'
  };
  var POLA = /(📍|🔍|👤|🏠|🕒|🖼|🛡|💬|⚙|⭐|✔|✓|❤|🤍)[️‍]*/g;

  var gaya = document.createElement('style');
  gaya.textContent =
    /* ukuran bawaan: ikon tidak akan pernah membesar memenuhi layar */
    ':where(svg.ikon){width:24px;height:24px;flex:none}' +
    '.ikon-auto{width:1.2em;height:1.2em;vertical-align:-.22em;flex:none}' +
    '.ikon-star{fill:#FFC93C;stroke:#FFC93C}' +
    /* menu bawah: ikon aktif terisi seperti di Figma */
    '.aktif .ikon-home path{fill:currentColor}' +
    '.aktif .ikon-search .lingkar{fill:currentColor}' +
    /* ukuran & warna ikon di tiap bagian halaman */
    '.logo-ikon{color:#fff}.logo-ikon .ikon{width:26px;height:26px;vertical-align:0}' +
    '.kartu-ikon{color:#0B1F3F}.kartu-ikon .ikon{width:22px;height:22px;vertical-align:0}' +
    '.bottom-nav a{color:#0F1A2E}.bottom-nav .ikon{width:26px;height:26px;vertical-align:0}' +
    '.input-wrap .ikon,.tombol-kuning .ikon{width:20px;height:20px}' +
    '.riwayat-ikon{color:#0F1A2E}.riwayat-ikon .ikon{width:24px;height:24px;vertical-align:0}' +
    /* ikon sejajar dengan teks */
    'span[data-ikon]{display:inline-flex;align-items:center}' +
    '.tombol-kuning{display:flex;align-items:center;justify-content:center;gap:8px}' +
    /* bagian Pencarian Terakhir: judul di kiri, tombol Hapus di kanan */
    '.baris-riwayat-judul{display:flex;justify-content:space-between;align-items:center}' +
    '#hapusRiwayat{background:none;border:0;padding:4px 0;font:inherit;font-size:12px;font-weight:600;color:#0B1F3F;text-decoration:underline;cursor:pointer}' +
    '#daftarRiwayat .riwayat{display:flex;gap:12px;align-items:flex-start;padding:8px 0;cursor:pointer}' +
    '#daftarRiwayat .riwayat p{margin:2px 0 0;font-size:12px;color:rgba(15,26,46,.55)}';
  document.head.appendChild(gaya);

  function buatSvg(nama, auto) {
    var t = document.createElement('span');
    t.innerHTML = ikon(nama);
    var s = t.firstChild;
    if (auto) s.setAttribute('class', s.getAttribute('class') + ' ikon-auto');
    return s;
  }

  function ganti(akar) {
    akar.querySelectorAll && akar.querySelectorAll('[data-ikon]').forEach(function (el) {
      if (!el.firstChild || el.firstChild.nodeType === 3) el.innerHTML = ikon(el.getAttribute('data-ikon'));
    });

    var jalan = document.createTreeWalker(akar, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        if (/^(SCRIPT|STYLE|TEXTAREA|OPTION|TITLE|SVG)$/i.test(p)) return NodeFilter.FILTER_REJECT;
        var v = n.nodeValue;
        POLA.lastIndex = 0;
        return (v.trim() === '←' || v.trim() === '→' || POLA.test(v)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var daftar = [], n;
    while ((n = jalan.nextNode())) daftar.push(n);

    daftar.forEach(function (node) {
      var v = node.nodeValue;
      if (v.trim() === '←' || v.trim() === '→') {
        node.parentNode.replaceChild(buatSvg(v.trim() === '←' ? 'back' : 'next', true), node);
        return;
      }
      var frag = document.createDocumentFragment(), akhir = 0, m;
      POLA.lastIndex = 0;
      while ((m = POLA.exec(v))) {
        if (m.index > akhir) frag.appendChild(document.createTextNode(v.slice(akhir, m.index)));
        frag.appendChild(buatSvg(PETA[m[1]], true));
        akhir = m.index + m[0].length;
      }
      if (akhir < v.length) frag.appendChild(document.createTextNode(v.slice(akhir)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  var pengamat = new MutationObserver(function () {
    pengamat.disconnect();
    ganti(document.body);
    pengamat.observe(document.body, { childList: true, subtree: true });
  });

  ganti(document.body);
  pengamat.observe(document.body, { childList: true, subtree: true });
})();