document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.apply-card');
  if (!form) return;

  const fields = [
    { id: 'student-number', message: 'Please enter your student number.' },
    { id: 'email', message: 'Please enter a valid email address.' },
    { id: 'phone', message: 'Please enter your phone number.' },
  ];

  function showError(group, message) {
    group.classList.add('has-error');
    const textEl = group.querySelector('.error-text');
    if (textEl) textEl.textContent = message;
  }

  function clearError(group) {
    group.classList.remove('has-error');
  }

  fields.forEach(({ id }) => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (input.checkValidity()) clearError(group);
    });
  });

  form.addEventListener('submit', (e) => {
    // Always stop the real submission for now — there's no backend
    // endpoint yet. Replace this whole handler once your teammate
    // gives you a real API URL to POST to.
    e.preventDefault();

    let hasErrors = false;

    fields.forEach(({ id, message }) => {
      const input = document.getElementById(id);
      if (!input) return;
      const group = input.closest('.form-group');

      if (!input.checkValidity()) {
        showError(group, message);
        hasErrors = true;
      } else {
        clearError(group);
      }
    });

    if (hasErrors) {
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    // TEMPORARY: redirect to confirmation until a real backend exists.
    window.location.href = '/reservation-confirmation.html';
  });
});
