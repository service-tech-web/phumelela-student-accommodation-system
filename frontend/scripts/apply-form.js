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

    // Clear the error as soon as the user starts fixing it
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (input.checkValidity()) clearError(group);
    });
  });

  form.addEventListener('submit', (e) => {
    // Always stop the real submission for now — there's no backend
    // endpoint yet. Once your teammate gives you a real API URL,
    // delete this line and the redirect below, and let the form
    // submit normally to that endpoint.
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
      // Focus the first invalid field
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    // TEMPORARY: validation passed, but there's no backend yet.
    // Redirect straight to the confirmation page so you can demo
    // the flow. Replace this with a real fetch() POST once the
    // backend endpoint exists.
    window.location.href = '/confirmation.html';
  });
});
