const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Si una imagen aún no está en assets/, la oculta para no mostrar el icono de imagen rota.
document.querySelectorAll('img').forEach((img) => {
  const hide = () => {
    img.classList.add('img-missing');
    const fallback = img.parentElement && img.parentElement.querySelector('.logo-fallback');
    if (fallback) fallback.hidden = false;
  };
  img.addEventListener('error', hide);
  if (img.complete && img.naturalWidth === 0) hide();
});

// Video "Visión Viva": se abre en una ventana y se detiene al cerrarla.
const videoModal = document.getElementById('video-modal');
if (videoModal) {
  const player = videoModal.querySelector('video');
  document.querySelector('[data-video-open]').addEventListener('click', () => { videoModal.showModal(); player.play().catch(() => {}); });
  const err = videoModal.querySelector('.video-modal__error');
  const fail = () => { if (err) err.hidden = false; };
  player.querySelectorAll('source').forEach((s) => s.addEventListener('error', () => {
    if (s === player.querySelector('source:last-of-type')) fail();
  }));
  player.addEventListener('error', fail);
  const close = () => { player.pause(); videoModal.close(); };
  videoModal.querySelector('[data-video-close]').addEventListener('click', close);
  videoModal.addEventListener('click', (ev) => { if (ev.target === videoModal) close(); });
  videoModal.addEventListener('close', () => player.pause());
}
