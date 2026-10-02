import '../../admin.css';

// Admin page: asks for the secret key, then loads the three lists from the
// protected backend routes. The key is only kept for this browser tab
// (sessionStorage) and is never stored in the code.

const BASE = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000').replace(/\/+$/, '');
const API_URL = `${BASE}/api`;
const KEY_STORE = 'phumelela_admin_key';

// Which database columns go in each table, in the same order as the <th> cells.
const COLUMNS = {
  applications: ['student_number', 'email', 'phone', 'gender', 'additional_info', 'created_at'],
  reservations: ['student_number', 'email', 'phone', 'gender', 'additional_info', 'created_at'],
  messages: ['name', 'email', 'subject', 'message', 'created_at'],
};

const loginSection = document.getElementById('admin-login');
const loginForm = document.getElementById('login-form');
const loginStatus = document.getElementById('login-status');
const keyInput = document.getElementById('admin-key');
const adminPage = document.getElementById('admin-page');

function showAdmin(show) {
  loginSection.style.display = show ? 'none' : '';
  adminPage.hidden = !show;
  adminPage.style.display = show ? '' : 'none';
}

async function fetchList(name, key) {
  const res = await fetch(`${API_URL}/admin/${name}`, {
    headers: { 'x-admin-key': key },
  });

  if (res.status === 401) throw new Error('WRONG_KEY');
  if (!res.ok) throw new Error('SERVER_ERROR');

  return res.json();
}

function formatCell(column, value) {
  if (value === null || value === undefined || value === '') return '—';
  if (column === 'created_at') return new Date(value).toLocaleString('en-ZA');
  return String(value);
}

function renderTable(name, rows) {
  const tbody = document.querySelector(`#table-${name} tbody`);
  const status = document.getElementById(`status-${name}`);
  tbody.replaceChildren();

  rows.forEach((row) => {
    const tr = document.createElement('tr');

    COLUMNS[name].forEach((column) => {
      const td = document.createElement('td');
      // textContent (not innerHTML) so nothing a visitor typed can run as code.
      td.textContent = formatCell(column, row[column]);
      td.title = td.textContent; // hover to read the full text
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  status.textContent = rows.length === 0 ? 'No entries yet.' : `${rows.length} total`;
}

async function loadAll(key) {
  const [applications, reservations, messages] = await Promise.all([
    fetchList('applications', key),
    fetchList('reservations', key),
    fetchList('messages', key),
  ]);

  renderTable('applications', applications);
  renderTable('reservations', reservations);
  renderTable('messages', messages);
}

function signOut() {
  sessionStorage.removeItem(KEY_STORE);
  window.location.reload();
}

// Tabs
document.querySelectorAll('.admin-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach((p) => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(`panel-${tab.dataset.tab}`).classList.add('active');
  });
});

document.getElementById('sign-out').addEventListener('click', signOut);

// Sign in
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const key = keyInput.value.trim();
  if (!key) return;

  loginStatus.textContent = 'Checking…';

  try {
    await loadAll(key);
    sessionStorage.setItem(KEY_STORE, key);
    keyInput.value = '';
    loginStatus.textContent = '';
    showAdmin(true);
  } catch (err) {
    loginStatus.textContent =
      err.message === 'WRONG_KEY'
        ? 'Wrong admin key.'
        : 'Could not reach the server. If it was idle, wait a minute and try again.';
  }
});

// If the key was already entered earlier in this tab, sign in automatically.
(async function init() {
  const savedKey = sessionStorage.getItem(KEY_STORE);
  if (!savedKey) return;

  try {
    await loadAll(savedKey);
    showAdmin(true);
  } catch {
    sessionStorage.removeItem(KEY_STORE);
  }
})();
