import '../../admin.css';

const API_URL = 'http://127.0.0.1:3000/api';

const tabs = document.querySelectorAll('.admin-tab');
const panels = document.querySelectorAll('.admin-panel');

// Tab switching
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    panels.forEach((p) => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(`panel-${tab.dataset.tab}`).classList.add('active');
  });
});

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString();
}

function cell(value) {
  return value ? value : '—';
}

async function loadApplications() {
  const status = document.getElementById('status-applications');
  const tbody = document.querySelector('#table-applications tbody');

  try {
    const res = await fetch(`${API_URL}/apply`);
    const rows = await res.json();

    if (rows.length === 0) {
      status.textContent = 'No applications yet.';
      return;
    }

    status.remove();
    tbody.innerHTML = rows.map((r) => `
      <tr>
        <td>${cell(r.studentNumber)}</td>
        <td>${cell(r.email)}</td>
        <td>${cell(r.phone)}</td>
        <td>${cell(r.gender)}</td>
        <td>${cell(r.additionalInfo)}</td>
        <td>${formatDate(r.createdAt)}</td>
      </tr>
    `).join('');
  } catch (err) {
    status.textContent = 'Could not load applications. Is the backend running?';
  }
}

async function loadReservations() {
  const status = document.getElementById('status-reservations');
  const tbody = document.querySelector('#table-reservations tbody');

  try {
    const res = await fetch(`${API_URL}/reserve`);
    const rows = await res.json();

    if (rows.length === 0) {
      status.textContent = 'No reservations yet.';
      return;
    }

    status.remove();
    tbody.innerHTML = rows.map((r) => `
      <tr>
        <td>${cell(r.studentNumber)}</td>
        <td>${cell(r.email)}</td>
        <td>${cell(r.phone)}</td>
        <td>${cell(r.gender)}</td>
        <td>${cell(r.additionalInfo)}</td>
        <td>${formatDate(r.createdAt)}</td>
      </tr>
    `).join('');
  } catch (err) {
    status.textContent = 'Could not load reservations. Is the backend running?';
  }
}

async function loadMessages() {
  const status = document.getElementById('status-messages');
  const tbody = document.querySelector('#table-messages tbody');

  try {
    const res = await fetch(`${API_URL}/contact`);
    const rows = await res.json();

    if (rows.length === 0) {
      status.textContent = 'No messages yet.';
      return;
    }

    status.remove();
    tbody.innerHTML = rows.map((r) => `
      <tr>
        <td>${cell(r.name)}</td>
        <td>${cell(r.email)}</td>
        <td>${cell(r.subject)}</td>
        <td>${cell(r.message)}</td>
        <td>${formatDate(r.createdAt)}</td>
      </tr>
    `).join('');
  } catch (err) {
    status.textContent = 'Could not load messages. Is the backend running?';
  }
}

loadApplications();
loadReservations();
loadMessages();
