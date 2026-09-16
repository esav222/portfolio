/* portfolio.js — interactions */

/* ── NAV scroll state ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll(
  '.project, .about-inner, .contact-inner, .section-header, .section-header-inline'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ── Image slot drag-drop ── */
document.querySelectorAll('.img-slot').forEach(slot => {
  // Hide default hints if an image is already set (from localStorage)
  const key = 'img:' + (slot.dataset.label || slot.closest('[id]')?.id || Math.random());
  slot._key = key;
  const stored = localStorage.getItem(key);
  if (stored) applyImage(slot, stored);

  // Drag-drop
  slot.addEventListener('dragover', e => {
    e.preventDefault();
    slot.classList.add('drag-over');
  });
  slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
  slot.addEventListener('drop', e => {
    e.preventDefault();
    slot.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) readAndApply(slot, file);
  });

  // Click to pick
  slot.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = () => { if (input.files[0]) readAndApply(slot, input.files[0]); };
    input.click();
  });
});

function readAndApply(slot, file) {
  const reader = new FileReader();
  reader.onload = e => {
    applyImage(slot, e.target.result);
    try { localStorage.setItem(slot._key, e.target.result); } catch(err) {}
  };
  reader.readAsDataURL(file);
}

function applyImage(slot, src) {
  // Remove existing img
  slot.querySelectorAll('img').forEach(i => i.remove());
  const img = document.createElement('img');
  img.src = src;
  img.alt = slot.dataset.label || '';
  slot.insertBefore(img, slot.firstChild);
  slot.querySelector('.slot-hint')?.style && (slot.querySelector('.slot-hint').style.opacity = '0');
  slot.querySelector('.slot-label')?.style && (slot.querySelector('.slot-label').style.opacity = '0');
  slot.querySelector('.slot-tag')?.style && (slot.querySelector('.slot-tag').style.opacity = '0');
}
