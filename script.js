// Vitazoo — entradas ao rolar. Cada parte aparece uma vez; nada fica escondido se o observador falhar.
(() => {
  const alvos = document.querySelectorAll('[data-reveal]');
  if (!alvos.length) return;
  const mostrar = (el) => el.classList.add('is-in');
  if (!('IntersectionObserver' in window)) { alvos.forEach(mostrar); return; }
  const io = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      mostrar(e.target);
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  alvos.forEach((el) => io.observe(el));
  window.addEventListener('load', () => setTimeout(() => {
    alvos.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) mostrar(el);
    });
  }, 2000));
})();
