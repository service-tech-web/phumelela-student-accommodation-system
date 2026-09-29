// Shared helper for talking to the backend.
// If your backend ever moves (different port, deployed server),
// this is the only line you need to change.
const API_URL = 'http://127.0.0.1:3000/api';

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
    // (backend not running, wrong port, no network).
    throw new Error('Could not reach the server. Is the backend running?');
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
