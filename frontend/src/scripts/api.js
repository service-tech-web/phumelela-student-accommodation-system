// Shared helper for talking to the backend.
// On Render, set the VITE_API_URL environment variable to your backend
// address (no slash at the end). On your own computer it falls back to localhost.
const BASE = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000').replace(/\/+$/, '');
const API_URL = `${BASE}/api`;

export async function postJSON(path, body) {
  let res;

  try {
    res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    // fetch() only throws when the request never reached the server
    // (backend not running, wrong address, no network).
    throw new Error('Could not reach the server. Please try again in a moment.');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // The backend sends { error: '...' } for validation failures.
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }

  return data;
}

// Shows a message just above the submit button (creates it the first time).
export function showFormStatus(form, message, color = 'var(--error)') {
  let status = form.querySelector('.form-status');

  if (!status) {
    status = document.createElement('p');
    status.className = 'form-status';
    status.style.fontSize = 'var(--size-sm)';
    status.style.marginBottom = '0.75rem';
    status.setAttribute('role', 'alert');
    form.querySelector('button[type="submit"]').before(status);
  }

  status.style.color = color;
  status.textContent = message;
}

export function clearFormStatus(form) {
  form.querySelector('.form-status')?.remove();
}
