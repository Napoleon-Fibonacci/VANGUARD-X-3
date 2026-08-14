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

function renderForm() {
  const form = document.getElementById('itemForm');
  form.innerHTML = SCHEMAS[currentTable].map(f =>
    `<div class="admin-row"><label style="width:100px">${f}</label><input name="${f}" ${f === 'id' && editingId ? 'readonly' : ''}></div>`
  ).join('') + (currentTable === 'knights' ? `<div class="admin-row"><label style="width:100px">rpg_stats</label><textarea name="rpg_stats" placeholder='{"keberanian":80,"kecerdasan":80,"kreativitas":80,"ketangkasan":80}'></textarea></div>` : '');
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
  loadList();
};

document.getElementById('cancelBtn').onclick = () => {
  editingId = null;
  document.getElementById('itemForm').reset();
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
    });
    document.getElementById('cancelBtn').style.display = 'inline-block';
  });

  document.querySelectorAll('[data-del]').forEach(btn => btn.onclick = async () => {
    if (!confirm('Hapus item ini?')) return;
    await fetch(`/api/${currentTable}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: btn.dataset.del }) });
    loadList();
  });
}
