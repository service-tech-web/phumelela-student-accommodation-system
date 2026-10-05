import { postJSON, showFormStatus, clearFormStatus } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.apply-card');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  const fields = [
    { id: 'first-name', message: 'Please enter your name.' },
    { id: 'surname', message: 'Please enter your surname.' },
    { id: 'student-number', message: 'Student number must be exactly 9 digits.' },
    { id: 'email', message: 'Please enter a valid email address.' },
    { id: 'phone', message: 'Phone number must be 10 digits, starting with 0 (e.g. 0717081353).' },
  ];

  function showError(group, message) {
    group.classList.add('has-error');
    const textEl = group.querySelector('.error-text');
    if (textEl) textEl.textContent = message;
  }

  function clearError(group) {
    group.classList.remove('has-error');
  }

  // Converts a local SA number like "0717081353" into "+27 71 708 1353"
  function toInternationalFormat(localNumber) {
    const digits = localNumber.slice(1); // drop the leading 0 → "717081353"
    return `+27 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 9)}`;
  }

  // Restrict student number + phone to digits only as the user types
  ['student-number', 'phone'].forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, ''); // strip anything that isn't 0-9
      const group = input.closest('.form-group');
      if (input.checkValidity()) clearError(group);
    });
  });

  ['first-name', 'surname'].forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (input.value.trim() !== '') clearError(group);
    });
  });

  document.getElementById('email')?.addEventListener('input', () => {
    const input = document.getElementById('email');
    const group = input.closest('.form-group');
    if (input.checkValidity()) clearError(group);
  });

  // Clear the gender error as soon as any option is picked
  document.querySelectorAll('input[name="gender"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      document.getElementById('gender-group').classList.remove('has-error');
    });
  });

  function validateGender() {
    const genderGroup = document.getElementById('gender-group');
    const isChecked = document.querySelector('input[name="gender"]:checked');

    if (!isChecked) {
      genderGroup.classList.add('has-error');
      genderGroup.querySelector('.error-text').textContent = 'Please select a gender.';
      return false;
    }

    genderGroup.classList.remove('has-error');
    return true;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFormStatus(form);

    let hasErrors = false;

    fields.forEach(({ id, message }) => {
      const input = document.getElementById(id);
      if (!input) return;
      const group = input.closest('.form-group');

      if (!input.checkValidity() || input.value.trim() === '') {
        showError(group, message);
        hasErrors = true;
      } else {
        clearError(group);
      }
    });

    if (!validateGender()) {
      hasErrors = true;
    }

    if (hasErrors) {
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    submitBtn.disabled = true;

    try {
      const localPhone = document.getElementById('phone').value.trim();

      await postJSON('/apply', {
        firstName: document.getElementById('first-name').value.trim(),
        surname: document.getElementById('surname').value.trim(),
        studentNumber: document.getElementById('student-number').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: toInternationalFormat(localPhone),
        gender: form.querySelector('input[name="gender"]:checked')?.value ?? null,
        additionalInfo: document.getElementById('additional-info').value.trim(),
      });

      window.location.href = '/confirmation.html';
    } catch (err) {
      showFormStatus(form, err.message);
      submitBtn.disabled = false;
    }
  });
});
