// Shared navigation and utilities

const NAV_LINKS = [
  { href: '../index.html', label: 'Home', id: 'home' },
  { href: '01-pyrogeography.html', label: '01 Pyromes', id: '01-pyrogeography' },
  { href: '02-fire-weather.html', label: '02 Fire Weather', id: '02-fire-weather' },
  { href: '03-extreme-fires.html', label: '03 Korea 2025', id: '03-extreme-fires' },
  { href: '04-simulations.html', label: '04 Simulations', id: '04-simulations' },
  { href: '05-risk-networks.html', label: '05 Risk Networks', id: '05-risk-networks' },
  { href: '06-responsibility.html', label: '06 Responsibility', id: '06-responsibility' },
];

function buildNav(activePage) {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const list = nav.querySelector('.nav-links');
  if (!list) return;

  const homeHref = activePage === 'home' ? '#' : '../index.html';

  NAV_LINKS.forEach((link, i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    let href;
    if (i === 0) {
      href = homeHref;
    } else if (activePage === 'home') {
      href = `pages/${link.href}`;
    } else {
      href = link.href;
    }

    a.href = href;
    a.textContent = link.label;

    if ((activePage === 'home' && i === 0) || link.id === activePage) {
      a.classList.add('active');
    }

    li.appendChild(a);
    list.appendChild(li);
  });
}

// Intersection observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.animationPlayState = 'running';
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.animationPlayState = 'paused';
    el.classList.add('animate-in');
    observer.observe(el);
  });
});
