// Reveal animations on scroll
(function () {
  const els = document.querySelectorAll('.tl-item, .card, .step-item');
  if (els.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => obs.observe(el));
  }

  // Rating bars fill
  const ratingContainer = document.querySelector('.autoavaliacao');
  if (ratingContainer) {
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.rating-fill').forEach((bar) => {
            const w = bar.getAttribute('data-width');
            if (w) bar.style.width = w + '%';
          });
          obs2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    obs2.observe(ratingContainer);
  }

  // Checklist toggle
  document.querySelectorAll('.check-item').forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const box = item.querySelector('.check-box');
      if (box) box.classList.toggle('checked');
    });
  });
})();
