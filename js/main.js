/**
 * js/main.js — Glodi Mbongo Portfolio
 * Handles: navigation, scroll animations, canvas, skill bars,
 *          cert counters, contact form, back-to-top
 */

'use strict';

/* ════════════════════════════════════════════════
   1. NAV — scroll behaviour + active link + mobile
════════════════════════════════════════════════ */
(function initNav() {
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelectorAll('.nav__link');
  const sections  = document.querySelectorAll('section[id]');

  // Create mobile drawer
  const drawer = document.createElement('div');
  drawer.className = 'nav__drawer';
  navLinks.forEach(link => {
    const btn = document.createElement('a');
    btn.href      = link.getAttribute('href');
    btn.className = 'nav__drawer-link' + (link.classList.contains('active') ? ' active' : '');
    btn.textContent = link.textContent;
    btn.addEventListener('click', () => drawer.classList.remove('open'));
    drawer.appendChild(btn);
  });
  document.body.appendChild(drawer);

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
  });

  // Scroll: nav shadow + active section highlight
  let ticking = false;

  const updateNav = () => {
    const y = window.scrollY;

    // Scrolled class
    nav.classList.toggle('scrolled', y > 30);

    // Active section detection
    let currentId = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 100) currentId = sec.id;
    });

    navLinks.forEach(link => {
      const active = link.dataset.section === currentId;
      link.classList.toggle('active', active);
    });

    // Sync drawer
    drawer.querySelectorAll('.nav__drawer-link').forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
  }, { passive: true });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();


/* ════════════════════════════════════════════════
   2. FADE-UP — IntersectionObserver
════════════════════════════════════════════════ */
(function initFadeUp() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();


/* ════════════════════════════════════════════════
   3. HERO CANVAS — animated particle network
════════════════════════════════════════════════ */
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animId;

  const resize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  resize();
  window.addEventListener('resize', resize);

  const NODE_COUNT = 30;
  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r:  Math.random() * 2 + 1,
  }));

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(201,168,76,${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,168,76,0.55)';
      ctx.fill();

      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });

    animId = requestAnimationFrame(draw);
  };

  draw();
})();


/* ════════════════════════════════════════════════
   4. SKILL BARS — animate width when in view
════════════════════════════════════════════════ */
(function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill[data-w]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.w + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ════════════════════════════════════════════════
   5. CERT COUNTERS — animated number count-up
════════════════════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('.cert-stat__val[data-target]');

  const animateCounter = el => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const step     = target / (duration / 16);
    let current    = 0;

    const tick = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + '+';
      if (current < target) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();


/* ════════════════════════════════════════════════
   6. CONTACT FORM — validation + mailto
════════════════════════════════════════════════ */
(function initContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const success   = document.getElementById('formSuccess');

  if (!form) return;

  const getVal = id => document.getElementById(id)?.value.trim() ?? '';

  const setError = (id, hasError) => {
    const input = document.getElementById(id);
    if (input) input.classList.toggle('error', hasError);
  };

  const validate = () => {
    let valid = true;

    const firstName = getVal('firstName');
    const email     = getVal('email');
    const message   = getVal('message');

    setError('firstName', !firstName);
    if (!firstName) valid = false;

    const emailOk = email && /\S+@\S+\.\S+/.test(email);
    setError('email', !emailOk);
    if (!emailOk) valid = false;

    setError('message', !message);
    if (!message) valid = false;

    return valid;
  };

  // Live validation on blur
  ['firstName', 'email', 'message'].forEach(id => {
    document.getElementById(id)?.addEventListener('blur', () => validate());
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(getVal('interest') || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Name: ${getVal('firstName')} ${getVal('lastName')}\n` +
      `Email: ${getVal('email')}\n` +
      `Company: ${getVal('company') || 'N/A'}\n` +
      `Interest: ${getVal('interest') || 'N/A'}\n\n` +
      getVal('message')
    );

    window.open(`mailto:glodimbongo1@gmail.com?subject=${subject}&body=${body}`);

    submitBtn.textContent = '✓ Email client opened';
    submitBtn.disabled = true;
    success.classList.add('show');

    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      success.classList.remove('show');
      form.reset();
    }, 5000);
  });
})();


/* ════════════════════════════════════════════════
   7. BACK TO TOP
════════════════════════════════════════════════ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (btn) {
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();


/* ════════════════════════════════════════════════
   8. FOOTER YEAR
════════════════════════════════════════════════ */
(function initYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();
