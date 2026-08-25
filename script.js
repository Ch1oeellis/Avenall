// Splash intro (home page only) — show the mark alone, then phase into the page
const splash = document.getElementById('splash');
if (splash) {
  document.documentElement.style.overflow = 'hidden';

  const hideSplash = () => {
    if (splash.classList.contains('is-hidden')) return;
    splash.classList.add('is-hidden');
    document.documentElement.style.overflow = '';
    setTimeout(() => splash.remove(), 650);
  };

  window.addEventListener('load', () => setTimeout(hideSplash, 2000));
  // Safety net in case the load event is delayed by slow assets
  setTimeout(hideSplash, 3800);
}

// Highlight the current page in the nav
document.querySelectorAll('.main-nav a').forEach((link) => {
  if (link.pathname === window.location.pathname) {
    link.classList.add('active');
  }
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Inquiry form — hands off to the user's email client via mailto
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = inquiryForm.name.value.trim();
    const email = inquiryForm.email.value.trim();
    const company = inquiryForm.company.value.trim();
    const interest = inquiryForm.interest.value;
    const message = inquiryForm.message.value.trim();

    const subject = `Avenall Inquiry: ${interest}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || '—'}`,
      `Interested in: ${interest}`,
      '',
      message,
    ].join('\n');

    const mailto = `mailto:avenalloats@oei-wi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const btn = inquiryForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Opening your email app…';
    btn.disabled = true;

    window.location.href = mailto;

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 2500);
  });
}
