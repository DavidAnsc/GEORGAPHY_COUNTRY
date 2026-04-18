(function () {
  const isNavbarElement = (el) => !!el.closest('.container, .nav-bar, .logo');

  const animationTargets = Array.from(document.querySelectorAll('body *')).filter((el) => {
    if (isNavbarElement(el)) return false;
    if (el.matches('script, style, link, meta, title, html, body')) return false;
    if (el.closest('.track')) return false; // keep slider animation independent
    return true;
  });

  animationTargets.forEach((el) => el.setAttribute('data-animate', ''));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  animationTargets.forEach((el) => revealObserver.observe(el));

  const images = Array.from(document.querySelectorAll('img')).filter((img) => !isNavbarElement(img));

  images.forEach((img) => {
    const isFullscreen = img.classList.contains('full-screen-image') ||
      img.closest('.main-content') && img.id === 'bg';

    if (isFullscreen) {
      img.classList.add('full-screen-image');
    } else if (!img.closest('.track')) {
      img.classList.add('hover-image');
    }
  });
})();
