// Human label + placeholder per field. Key = raw field name, value = [label, placeholder].
const FIELD_INFO = {
  id: ['ID (unik)', 'contoh: knight-01 — huruf kecil, tanpa spasi'],
  name: ['Nama', 'Nama lengkap ksatria/petinggi'],
  role: ['Peran', 'contoh: Ketua Kelas'],
  title: ['Gelar/Jabatan', 'contoh: Panglima Vanguard'],
  motto: ['Motto', 'Kutipan singkat pribadi'],
  badge: ['Ikon Lencana', 'nama ikon: crown, shield, scroll, dst (lihat daftar ikon di script.js)'],
  avatar: ['Foto', 'Upload foto avatar dari komputer'],
  nickname: ['Julukan', 'contoh: "Sang Penakluk"'],
  squad: ['Pasukan', 'Garda Depan / Ordo Cendekia / Legiun Olahraga / Guild Seni'],
  sort_order: ['Urutan Tampil', 'Angka — makin kecil makin di atas'],
  title_: ['Judul Foto', ''],
  category: ['Kategori', 'Event / Olahraga / Akademik / Kebersamaan'],
  image: ['Foto', 'Upload foto galeri dari komputer'],
  description: ['Deskripsi', 'Penjelasan singkat foto/momen ini']
};

const SCHEMAS = {
  leadership: ['id', 'name', 'role', 'title', 'motto', 'badge', 'avatar', 'sort_order'],
  knights: ['id', 'name', 'nickname', 'squad', 'role', 'motto', 'avatar', 'sort_order'], // rpg_stats edited raw
  gallery: ['id', 'title', 'category', 'image', 'description', 'sort_order']
};

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

const IMAGE_FIELDS = ['avatar', 'image'];

function fieldRow(field, tableKey) {
  const key = (tableKey === 'gallery' && field === 'title') ? 'title_' : field;
  const [label, hint] = FIELD_INFO[key] || [field, ''];
  const readonly = field === 'id' && editingId ? 'readonly' : '';

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

  return `<div class="admin-row">
    <label>${label}</label>
    <input name="${field}" placeholder="${hint}" ${readonly}>
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

function renderForm() {
  const form = document.getElementById('itemForm');
  const heading = { leadership: 'Data Petinggi', knights: 'Data Ksatria', gallery: 'Data Galeri' }[currentTable];
  form.innerHTML =
    `<div class="form-heading">${editingId ? 'Edit' : 'Tambah'} ${heading}</div>` +
    SCHEMAS[currentTable].map(f => fieldRow(f, currentTable)).join('') +
    (currentTable === 'knights'
      ? `<div class="admin-row">
           <label>Statistik RPG</label>
           <textarea name="rpg_stats" placeholder='{"keberanian":80,"kecerdasan":80,"kreativitas":80,"ketangkasan":80}'></textarea>
           <small>Format JSON, nilai 0-100. Muncul di popup detail ksatria.</small>
         </div>`
      : '');
  wireImageInputs(form);
}
renderForm();

document.getElementById('saveBtn').onclick = async () => {
  const form = document.getElementById('itemForm');
  const body = {};
  new FormData(form).forEach((v, k) => body[k] = k === 'sort_order' ? Number(v) : v);
  if (body.rpg_stats) body.rpg_stats = JSON.parse(body.rpg_stats || '{}');

  const method = editingId ? 'PUT' : 'POST';
  if (editingId) body.id = editingId;

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
      <span>${item.name || item.title} <small>(${item.id})</small></span>
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
      if (input) input.value = k === 'rpg_stats' ? JSON.stringify(item[k]) : item[k];
      if (IMAGE_FIELDS.includes(k) && item[k]) {
        const preview = form.querySelector(`[data-preview-for="${k}"]`);
        if (preview) { preview.src = item[k]; preview.style.display = 'block'; }
      }
    });
    document.getElementById('cancelBtn').style.display = 'inline-block';
  });

  document.querySelectorAll('[data-del]').forEach(btn => btn.onclick = async () => {
    if (!confirm('Hapus item ini?')) return;
    await fetch(`/api/${currentTable}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: btn.dataset.del }) });
    loadList();
  });
}