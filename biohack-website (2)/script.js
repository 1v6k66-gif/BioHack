// BioHack ЕООД – script.js

document.addEventListener('DOMContentLoaded', () => {

  /* ---- THEME TOGGLE ---- */
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon = toggle?.querySelector('.theme-icon');

  const saved = localStorage.getItem('biohack-theme') || 'dark';
  root.setAttribute('data-theme', saved);
  if (icon) icon.textContent = saved === 'dark' ? '☀️' : '🌙';

  toggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('biohack-theme', next);
    if (icon) icon.textContent = next === 'dark' ? '☀️' : '🌙';
  });

  /* ---- STICKY HEADER ---- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav?.classList.toggle('open');
  });
  // Close on nav link click
  nav?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  /* ---- BACK TO TOP ---- */
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backTop?.classList.add('visible');
    } else {
      backTop?.classList.remove('visible');
    }
  }, { passive: true });
  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- AOS (Animate on Scroll) ---- */
  const aosEls = document.querySelectorAll('[data-aos]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    aosEls.forEach(el => observer.observe(el));
  } else {
    aosEls.forEach(el => el.classList.add('aos-animate'));
  }

  /* ---- FAQ ACCORDION ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });
      // Open clicked if was closed
      if (!isOpen) {
        item.classList.add('open');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---- PRODUCT FILTER TABS ---- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productSections = document.querySelectorAll('.product-section');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      productSections.forEach(section => {
        if (filter === 'all' || section.dataset.category === filter) {
          section.style.display = '';
          section.style.animation = 'fadeIn 0.4s ease';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();
    const consent = form.querySelector('#consent')?.checked;

    if (!name || !email || !message || !consent) {
      alert('Моля, попълнете всички задължителни полета и се съгласете с обработването на данни.');
      return;
    }

    // Simulate send
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Изпраща се...';
      btn.disabled = true;
    }
    setTimeout(() => {
      form.reset();
      if (btn) { btn.textContent = 'Изпрати съобщение →'; btn.disabled = false; }
      if (successMsg) { successMsg.style.display = 'block'; }
      setTimeout(() => { if (successMsg) successMsg.style.display = 'none'; }, 5000);
    }, 1200);
  });

  /* ---- SMOOTH HASH SCROLL ---- */
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex + 1);
      const isSamePage = href.startsWith('#') ||
        href.startsWith(window.location.pathname + '#');

      if (isSamePage) {
        const target = document.getElementById(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---- COUNTER ANIMATION ---- */
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const num = parseFloat(text);
          const suffix = text.replace(/[\d.]/g, '');
          if (!isNaN(num)) animateCounter(el, num, suffix);
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => statObserver.observe(el));
  }

});
