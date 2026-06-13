// Riphah International College — Animations & Interactivity

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initScrollAnimations();
  initRevealAnimations();
  initHeroAnimations();
  initParallax();
  initParticles();
  initCounters();
  initContactForm();
  initHeaderScroll();
  initMagneticButtons();
});

/* ---- Preloader ---- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
      triggerHeroReveal();
    }, 1200);
  });

  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.add('loaded');
    triggerHeroReveal();
  }, 3000);
}

function triggerHeroReveal() {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 150);
  });
}

/* ---- Navigation ---- */
function initNavigation() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  toggle?.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle?.classList.remove('active');
    });
  });
}

/* ---- Header scroll ---- */
function initHeaderScroll() {
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__menu a:not(.btn)');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ---- Scroll-triggered card animations ---- */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.facility-card, .campus__highlight, .prog-card, .about__features li, .campus__visit-card'
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, delay * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.dataset.delay = i % 4;
    observer.observe(el);
  });
}

/* ---- Reveal animations for sections ---- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ---- Hero parallax & effects ---- */
function initHeroAnimations() {
  const heroContent = document.querySelector('.hero__content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
      heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
    }
  }, { passive: true });
}

function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, { passive: true });
}

/* ---- Floating particles in hero ---- */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero__particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${6 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.width = `${2 + Math.random() * 4}px`;
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/* ---- Animated counters ---- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ---- Magnetic button hover ---- */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn--primary, .btn--shine');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ---- Contact form ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');

  form?.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Submitting...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Inquiry Submitted!';
      btn.style.background = '#2E59A7';
      form.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });
}
