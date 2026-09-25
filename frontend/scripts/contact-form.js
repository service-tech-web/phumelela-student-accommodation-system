document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-card');
  if (!form) return;

  const fields = [
    { id: 'contact-name', message: 'Please enter your name.' },
    { id: 'contact-email', message: 'Please enter a valid email address.' },
    { id: 'contact-subject', message: 'Please enter a subject.' },
    { id: 'contact-message', message: 'Please enter a message.' },
  ];

  function showError(field, message) {
    field.classList.add('has-error');
    const textEl = field.querySelector('.error-text');
    if (textEl) textEl.textContent = message;
  }

  function clearError(field) {
    field.classList.remove('has-error');
  }

  fields.forEach(({ id }) => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', () => {
      const field = input.closest('.form-field');
      if (input.checkValidity()) clearError(field);
    });
  });

  form.addEventListener('submit', (e) => {
    let hasErrors = false;

    fields.forEach(({ id, message }) => {
      const input = document.getElementById(id);
      if (!input) return;
      const field = input.closest('.form-field');

      if (!input.checkValidity()) {
        showError(field, message);
        hasErrors = true;
      } else {
        clearError(field);
      }
    });

    if (hasErrors) {
      e.preventDefault();
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
    }
  });
});
