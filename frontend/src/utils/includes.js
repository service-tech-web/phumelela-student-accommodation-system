async function loadPartial(url, placeholderId) {
  const res = await fetch(url);
  const html = await res.text();
  document.getElementById(placeholderId).innerHTML = html;
}

async function initLayout() {
  await Promise.all([
    loadPartial('/partials/header.html', 'header-placeholder'),
    loadPartial('/partials/footer.html', 'footer-placeholder'),
  ]);

  // Mark the current page's nav link as active
  const currentPath = window.location.pathname;
  document.querySelectorAll('.header__link, .mobile-nav__link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('header__link--active');
    }
  });

  // Hamburger toggle: wired up separately.
}

export default initLayout;
