import { postJSON, showFormStatus, clearFormStatus } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-card');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFormStatus(form);

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
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    submitBtn.disabled = true;

    try {
      await postJSON('/contact', {
        name: document.getElementById('contact-name').value.trim(),
        email: document.getElementById('contact-email').value.trim(),
        subject: document.getElementById('contact-subject').value.trim(),
        message: document.getElementById('contact-message').value.trim(),
      });

      // No dedicated "message sent" page in the design, so confirm
      // inline and clear the form. White text because the card is orange.
      form.reset();
      showFormStatus(form, 'Thanks! Your message has been sent.', 'var(--background)');
    } catch (err) {
      showFormStatus(form, err.message, 'var(--background)');
    } finally {
      submitBtn.disabled = false;
    }
  });
});
