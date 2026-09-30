document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const slides = document.querySelectorAll('.slide');
  const capTitle = document.getElementById('capTitle');
  const capPlace = document.getElementById('capPlace');
  let current = 0;

  // Nav turns solid after the hero
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > window.innerHeight - 90);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hero slider with project caption
  const show = (i) => {
    slides[current].classList.remove('active');
    current = i % slides.length;
    slides[current].classList.add('active');
    capTitle.textContent = slides[current].dataset.title;
    capPlace.innerHTML = slides[current].dataset.place;
  };
  if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => show(current + 1), 4500);
  }

  // Service hover images
  document.querySelectorAll('.services__list li').forEach((li) => {
    li.style.setProperty('--img', `url('${li.dataset.img}')`);
  });

  // Lightbox for portfolio images
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('img');
  document.querySelectorAll('.mosaic figure').forEach((fig) => {
    fig.addEventListener('click', () => {
      lightboxImg.src = fig.querySelector('img').src;
      lightbox.classList.add('show');
    });
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      lightbox.classList.remove('show');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('show');
  });

  // Contact form: opens WhatsApp-free mail fallback
  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.querySelector('button').textContent = 'Message sent';
  });
});