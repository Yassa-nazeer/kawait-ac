// === Fix RTL horizontal scroll (white screen fix) ===
window.scrollTo(0, window.scrollY);
document.documentElement.scrollLeft = 0;
document.body.scrollLeft = 0;

// === Burger ===
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');
function toggleMenu() {
  const isOpen = links?.classList.toggle('open');
  burger?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}
function closeMenu() {
  links?.classList.remove('open');
  burger?.setAttribute('aria-expanded', 'false');
}
burger?.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
document.querySelectorAll('.nav__links a').forEach(a =>
  a.addEventListener('click', closeMenu)
);
// Close menu when tapping outside
document.addEventListener('click', (e) => {
  if (links?.classList.contains('open') && !links.contains(e.target) && !burger.contains(e.target)) {
    closeMenu();
  }
});

// === Reveal on scroll ===
// Immediately reveal elements already visible in the viewport (prevents white screen on mobile)
document.querySelectorAll('.reveal').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    el.classList.add('in');
  }
});
// Then observe remaining hidden elements for scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));

// === Scroll progress ===
const sp = document.querySelector('.scroll-progress');
if (sp) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    sp.style.width = pct + '%';
  }, { passive: true });
}

// === WhatsApp form ===
const form = document.querySelector('form[data-wa]');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const name = fd.get('name') || '';
  const phone = fd.get('phone') || '';
  const service = fd.get('service') || '';
  const area = fd.get('area') || '';
  const note = fd.get('note') || '';
  const msg =
`السلام عليكم، طلب جديد من الموقع:
الاسم: ${name}
الهاتف: ${phone}
الخدمة: ${service}
المنطقة: ${area}
التفاصيل: ${note}`;
  window.open(`https://wa.me/96594944683?text=${encodeURIComponent(msg)}`, '_blank');
});

// === Counter (data-count) ===
const ci = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString('ar-EG');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    ci.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => ci.observe(el));
