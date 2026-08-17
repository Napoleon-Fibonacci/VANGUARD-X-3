// Human label + placeholder per field. Key = raw field name, value = [label, placeholder].
const FIELD_INFO = {
  name: ['Nama', 'Nama lengkap ksatria/petinggi'],
  role: ['Peran', 'contoh: Ketua Kelas'],
  title: ['Gelar/Jabatan', 'contoh: Panglima Vanguard'],
  motto: ['Motto', 'Kutipan singkat pribadi'],
  badge: ['Ikon Lencana', 'nama ikon: crown, shield, scroll, dst (lihat daftar ikon di script.js)'],
  avatar: ['Foto', 'Upload foto avatar dari komputer'],
  nickname: ['Julukan', 'contoh: "Sang Penakluk"'],
  squad: ['Pasukan', 'Garda Depan / Ordo Cendekia / Legiun Olahraga / Guild Seni'],
  sort_order: ['Urutan Tampil', ''],
  title_: ['Judul Foto', ''],
  category: ['Kategori', 'Event / Olahraga / Akademik / Kebersamaan'],
  image: ['Foto', 'Upload foto galeri dari komputer'],
  description: ['Deskripsi', 'Penjelasan singkat foto/momen ini']
};

const SCHEMAS = {
  leadership: ['name', 'role', 'title', 'motto', 'badge', 'avatar', 'sort_order'],
  knights: ['name', 'nickname', 'role', 'motto', 'avatar', 'sort_order'], // rpg_stats edited via slider
  gallery: ['title', 'category', 'image', 'description', 'sort_order']
};

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
}

// Ikon lencana yang bisa dipilih. path SVG minimal, cukup buat preview tombol.
const BADGE_ICONS = {
  crown: '<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18v2H3z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  swords: '<path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l2 2 4-4-2-2"/><path d="M19.5 6.5L18 3h-3L3.5 14.5"/><path d="M5 21l-2-2 4-4 2 2"/>',
  scroll: '<path d="M8 2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6"/><path d="M4 6a2 2 0 0 1 2-2h10"/><path d="M8 10h8M8 14h6"/>',
  wizard: '<path d="M12 2L4 19h16L12 2z"/><path d="M2 19h20v2H2z"/><path d="M12 9v4M10 11h4"/>',
  castle: '<path d="M4 21V9l2-2 2 2v12M16 21V9l2-2 2 2v12M9 21V12h6v9"/><path d="M3 21h18"/><path d="M7 4h2v3H7zM15 4h2v3h-2zM11 2h2v4h-2z"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34"/><path d="M18 4H6v7a6 6 0 0 0 12 0V4z"/>',
  medal: '<circle cx="12" cy="14" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"/><path d="M12 2L8.5 8.5h7L12 2z"/>',
  fleur: '<path d="M12 2c1.5 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2.5-5 4-8z"/><path d="M4 14c2.5 0 5-1 6-4-1 4-4 6-6 6z"/><path d="M20 14c-2.5 0-5-1-6-4 1 4 4 6 6 6z"/><path d="M8 18h8v2H8zM12 18v4"/>',
  coins: '<circle cx="9" cy="9" r="6"/><path d="M15 9.5a6 6 0 1 1-6 6"/><circle cx="9" cy="9" r="2"/>'
};
function badgeSvg(key) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${BADGE_ICONS[key]}</svg>`;
}

let currentTable = 'leadership';
let editingId = null;

// --- Login ---
document.getElementById('loginBtn').onclick = async () => {
  const password = document.getElementById('pw').value;
  const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
  if (res.ok) {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadList();
  } else {
    document.getElementById('loginErr').textContent = 'Password salah';
  }
};

// --- Tabs ---
document.querySelectorAll('.tab-bar button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.tab-bar button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTable = btn.dataset.table;
    editingId = null;
    renderForm();
    loadList();
  };
});

const RPG_STAT_LABELS = {
  keberanian: 'Keberanian (STR)',
  kecerdasan: 'Kecerdasan (INT)',
  kreativitas: 'Kreativitas (ART)',
  ketangkasan: 'Ketangkasan (AGI)'
};

function rpgStatsRow() {
  return `<div class="admin-row">
    <label>Statistik RPG</label>
    <input type="hidden" name="rpg_stats">
    <div class="rpg-slider-block">
      ${Object.entries(RPG_STAT_LABELS).map(([key, label]) => `
        <div class="rpg-slider-row">
          <span class="rpg-slider-label">${label}</span>
          <input type="range" min="0" max="100" value="80" class="rpg-slider" data-stat="${key}">
          <span class="rpg-slider-val" data-stat-val="${key}">80</span>
        </div>
      `).join('')}
      <button type="button" id="rpgRandomBtn" class="filter-btn">🎲 Acak Statistik</button>
    </div>
    <small>Geser slider untuk atur nilai 0-100. Muncul di popup detail ksatria.</small>
  </div>`;
}

function wireRpgSliders(form) {
  const block = form.querySelector('.rpg-slider-block');
  if (!block) return;
  const hidden = form.elements.rpg_stats;

  function syncHidden() {
    const stats = {};
    block.querySelectorAll('.rpg-slider').forEach(s => { stats[s.dataset.stat] = Number(s.value); });
    hidden.value = JSON.stringify(stats);
  }

  block.querySelectorAll('.rpg-slider').forEach(slider => {
    slider.oninput = () => {
      block.querySelector(`[data-stat-val="${slider.dataset.stat}"]`).textContent = slider.value;
      syncHidden();
    };
  });

  block.querySelector('#rpgRandomBtn').onclick = () => {
    block.querySelectorAll('.rpg-slider').forEach(s => {
      const val = Math.floor(Math.random() * 51) + 50; // 50-100, biar tetap wajar
      s.value = val;
      block.querySelector(`[data-stat-val="${s.dataset.stat}"]`).textContent = val;
    });
    syncHidden();
  };

  syncHidden();
}

function setRpgSliders(form, stats) {
  const block = form.querySelector('.rpg-slider-block');
  if (!block || !stats) return;
  block.querySelectorAll('.rpg-slider').forEach(s => {
    const val = stats[s.dataset.stat];
    if (val !== undefined) {
      s.value = val;
      block.querySelector(`[data-stat-val="${s.dataset.stat}"]`).textContent = val;
    }
  });
  form.elements.rpg_stats.value = JSON.stringify(stats);
}

function fieldRow(field, tableKey) {
  const key = (tableKey === 'gallery' && field === 'title') ? 'title_' : field;
  const [label, hint] = FIELD_INFO[key] || [field, ''];

  if (IMAGE_FIELDS.includes(field)) {
    return `<div class="admin-row">
      <label>${label}</label>
      <input type="hidden" name="${field}">
      <div class="upload-field">
        <img class="upload-preview" data-preview-for="${field}">
        <div>
          <input type="file" accept="image/*" data-upload-for="${field}">
          <div class="upload-status" data-status-for="${field}">Pilih foto dari komputer.</div>
        </div>
      </div>
    </div>`;
  }

  if (field === 'badge') {
    return `<div class="admin-row">
      <label>${label}</label>
      <input type="hidden" name="badge">
      <div class="badge-picker" data-picker-for="badge">
        ${Object.keys(BADGE_ICONS).map(key => `<button type="button" class="badge-opt" data-badge="${key}" title="${key}">${badgeSvg(key)}</button>`).join('')}
      </div>
      <small>Pilih satu ikon lencana.</small>
    </div>`;
  }

  if (field === 'sort_order') {
    const seats = Array.from({ length: 46 }, (_, i) => i + 1);
    return `<div class="admin-row">
      <label>${label}</label>
      <input type="hidden" name="sort_order" value="0">
      <div class="seat-picker" data-picker-for="sort_order">
        ${seats.map(n => `<button type="button" class="seat-opt" data-seat="${n}">${n}</button>`).join('')}
      </div>
      <small>Pilih urutan tampil — kotak dipilih akan menyala.</small>
    </div>`;
  }

  return `<div class="admin-row">
    <label>${label}</label>
    <input name="${field}" placeholder="${hint}">
    ${hint ? `<small>${hint}</small>` : ''}
  </div>`;
}

async function uploadFile(file, statusEl) {
  statusEl.textContent = 'Mengupload...';
  statusEl.className = 'upload-status uploading';
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': file.type, 'x-file-name': file.name },
    body: file
  });
  if (!res.ok) {
    statusEl.textContent = 'Gagal upload: ' + (await res.json()).error;
    statusEl.className = 'upload-status error';
    return null;
  }
  const { url } = await res.json();
  statusEl.textContent = 'Terupload.';
  statusEl.className = 'upload-status done';
  return url;
}

function wireImageInputs(form) {
  form.querySelectorAll('[data-upload-for]').forEach(fileInput => {
    const field = fileInput.dataset.uploadFor;
    const hidden = form.elements[field];
    const preview = form.querySelector(`[data-preview-for="${field}"]`);
    const status = form.querySelector(`[data-status-for="${field}"]`);
    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      if (!file) return;
      const url = await uploadFile(file, status);
      if (!url) return;
      hidden.value = url;
      preview.src = url;
      preview.style.display = 'block';
    };
  });
}

function wirePickers(form) {
  const badgeWrap = form.querySelector('[data-picker-for="badge"]');
  if (badgeWrap) {
    badgeWrap.querySelectorAll('.badge-opt').forEach(btn => {
      btn.onclick = () => {
        badgeWrap.querySelectorAll('.badge-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        form.elements.badge.value = btn.dataset.badge;
      };
    });
  }

  const seatWrap = form.querySelector('[data-picker-for="sort_order"]');
  if (seatWrap) {
    seatWrap.querySelectorAll('.seat-opt').forEach(btn => {
      btn.onclick = () => {
        seatWrap.querySelectorAll('.seat-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        form.elements.sort_order.value = btn.dataset.seat;
      };
    });
  }
}

function renderForm() {
  const form = document.getElementById('itemForm');
  const heading = { leadership: 'Data Petinggi', knights: 'Data Ksatria', gallery: 'Data Galeri' }[currentTable];
  form.innerHTML =
    `<div class="form-heading">${editingId ? 'Edit' : 'Tambah'} ${heading}</div>` +
    SCHEMAS[currentTable].map(f => fieldRow(f, currentTable)).join('') +
    (currentTable === 'knights' ? rpgStatsRow() : '');
  wireImageInputs(form);
  wirePickers(form);
  if (currentTable === 'knights') wireRpgSliders(form);
}
renderForm();

document.getElementById('saveBtn').onclick = async () => {
  const form = document.getElementById('itemForm');
  const body = {};
  new FormData(form).forEach((v, k) => {
    if (v === '' && editingId) return; // kosong saat edit = jangan timpa nilai lama
    body[k] = k === 'sort_order' ? Number(v || 0) : v;
  });
  if (body.rpg_stats) body.rpg_stats = JSON.parse(body.rpg_stats || '{}');

  const method = editingId ? 'PUT' : 'POST';
  if (editingId) {
    body.id = editingId;
  } else {
    const nameSource = body.name || body.title || 'item';
    body.id = `${slugify(nameSource)}-${Date.now().toString(36)}`;
  }

  const res = await fetch(`/api/${currentTable}`, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) return alert('Gagal simpan: ' + (await res.json()).error);
  editingId = null;
  form.reset();
  renderForm();
  loadList();
};

document.getElementById('cancelBtn').onclick = () => {
  editingId = null;
  document.getElementById('itemForm').reset();
  renderForm();
  document.getElementById('cancelBtn').style.display = 'none';
};

async function loadList() {
  const res = await fetch(`/api/${currentTable}`);
  const items = await res.json();
  document.getElementById('list').innerHTML = items.map(item => `
    <li>
      <span>${item.name || item.title || '(tanpa nama)'} <small>(${item.id})</small></span>
      <span>
        <button data-edit="${item.id}">Edit</button>
        <button data-del="${item.id}">Hapus</button>
      </span>
    </li>
  `).join('');

  document.querySelectorAll('[data-edit]').forEach(btn => btn.onclick = () => {
    const item = items.find(i => i.id === btn.dataset.edit);
    editingId = item.id;
    renderForm();
    const form = document.getElementById('itemForm');
    Object.keys(item).forEach(k => {
      const input = form.elements[k];
      if (input && k !== 'rpg_stats') input.value = item[k];
      if (IMAGE_FIELDS.includes(k) && item[k]) {
        const preview = form.querySelector(`[data-preview-for="${k}"]`);
        if (preview) { preview.src = item[k]; preview.style.display = 'block'; }
      }
      if (k === 'badge' && item[k]) {
        const btn = form.querySelector(`.badge-opt[data-badge="${item[k]}"]`);
        if (btn) btn.classList.add('active');
      }
      if (k === 'sort_order') {
        const btn = form.querySelector(`.seat-opt[data-seat="${item[k]}"]`);
        if (btn) btn.classList.add('active');
      }
    });
    if (item.rpg_stats) setRpgSliders(form, item.rpg_stats);
    document.getElementById('cancelBtn').style.display = 'inline-block';
  });

  document.querySelectorAll('[data-del]').forEach(btn => btn.onclick = async () => {
    if (!confirm('Hapus item ini?')) return;
    await fetch(`/api/${currentTable}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: btn.dataset.del }) });
    loadList();
  });
}