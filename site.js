
const portraits = [
    { name:'Bhoomika',  meta:'Portrait · Stockholm', cover:'Photos/Portraits/Bhoomika.jpg',  lrId:'db7b9d5afd2d4ce3b31afee390951758' },
    { name:'Swetha',    meta:'Portrait · Stockholm', cover:'Photos/Portraits/Swetha.jpg',    lrId:'17fbefefdfcb46c6b4253a1821c226eb' },
    { name:'Ashwini',   meta:'Portrait · Stockholm', cover:'Photos/Portraits/Aswini.jpg',    lrId:'4f7fbc6c78c24ce2b836b95b0376047a' },
    { name:'Nakshatra', meta:'Portrait · Stockholm', cover:'Photos/Portraits/Nakshatra.jpg', lrId:'66143d5b4e1c4849bedc17fa6c13efcf' },
    { name:'Adhith',    meta:'Portrait · Stockholm', cover:'Photos/Portraits/Adhith.jpg',    lrId:'feb1796c30b649e0811897b725190ea7' },
    { name:'Raveena',   meta:'Portrait · Stockholm', cover:'Photos/Portraits/Raveena.jpg',   lrId:'59dee6a3a563445687b22174005fc188' },
    { name:'Bhargav',   meta:'Portrait · Stockholm', cover:'Photos/Portraits/Bhargav.jpg',   lrId:'6d6b50377ca44a7ea3bec46785b8bf4c' },
    { name:'Monica',    meta:'Portrait · Stockholm', cover:'Photos/Portraits/Monica.jpg',    lrId:'4e0d611640af48578ea47aa76ae8afef' },
    { name:'Marie',     meta:'Portrait · Stockholm', cover:'Photos/Portraits/Marie.jpg',     lrId:'ed8cc245fa7049e3b13d2fc4afcd4042' },
    { name:'Yann',      meta:'Portrait · Stockholm', cover:'Photos/Portraits/Yann.jpg',      lrId:'cfab3e5f881e4a2b8d98ed2cc3aaab11' },
  ];
const couples = [
    { name:'Mohan & Akansha',    meta:'Couple Session', cover:'Photos/Couple/Mohan & Akansha.jpg',      lrId:'d06aae9605794fbba916692637ed3b05' },
    { name:'Satheesh & Aswathy', meta:'Couple Session', cover:'Photos/Couple/Satheesh & Ashwathy.jpg',  lrId:'54e74ae957544899bad8526358d7bc35' },
    { name:'Yann & Swetha',      meta:'Couple Session', cover:'Photos/Couple/Yann & Swetha.jpg',        lrId:'41d6f8e68c4044aba8810bf8add8c59a' },
    { name:'Rajesh & Ankita',    meta:'Couple Session', cover:'Photos/Couple/Rajesh & Ankita.jpg',      lrId:'2a4bb67805654fcebbcc8db749457582' },
  ];

function imgSrc(path) { return encodeURI(path); }

function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home',
    'portraits.html': 'nav-portraits',
    'couple.html': 'nav-couple',
    'film.html': 'nav-film',
    'motion.html': 'nav-motion',
    'contact.html': 'nav-contact',
    '': 'nav-home'
  };
  const activeId = map[path] || 'nav-home';
  document.querySelectorAll('.nav-group a').forEach(a => a.classList.remove('active'));
  const el = document.getElementById(activeId);
  if (el) el.classList.add('active');
}

function handleNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const isHome = (window.location.pathname.split('/').pop() || 'index.html') === 'index.html';
  if (!isHome || window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}

function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-menu');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  if (links) links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  setActiveNav();
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);
}

function renderPortraits() {
  const grid = document.getElementById('portraits-grid');
  if (!grid) return;
  grid.innerHTML = portraits.map((p,i) => `
    <div class="portrait-card" onclick="openSession(portraits[${i}])" style="animation-delay:${i*.06}s">
      <img src="${imgSrc(p.cover)}" alt="${p.name}" loading="lazy"/>
      <div class="p-label"><div class="type">${p.meta}</div><div class="name">${p.name}</div></div>
    </div>`).join('');
}

function renderCouples() {
  const grid = document.getElementById('couple-grid');
  if (!grid) return;
  grid.innerHTML = couples.map((c,i) => `
    <div class="couple-card" onclick="openSession(couples[${i}])" style="animation-delay:${i*.08}s">
      <img src="${imgSrc(c.cover)}" alt="${c.name}" loading="lazy"/>
      <div class="c-label"><div class="type">${c.meta}</div><div class="name">${c.name}</div></div>
    </div>`).join('');
}

function renderMarquee() {
  const track = document.getElementById('home-marquee');
  if (!track) return;
  const imgs = portraits.concat(couples).map(p => `<img src="${imgSrc(p.cover)}" alt="" loading="lazy"/>`).join('');
  track.innerHTML = imgs + imgs; // duplicate for seamless loop
}

function openSession(item) {
  const modal = document.getElementById('session-modal');
  if (!modal) return;
  document.getElementById('modal-title').textContent = item.name;
  document.getElementById('modal-meta').textContent = item.meta;
  const body = document.getElementById('modal-body');

  if (item.lrId) {
    body.innerHTML = `<div class="modal-embed"><iframe src="https://lightroom.adobe.com/embed/shares/${item.lrId}/slideshow?background_color=%232D2D2D&color=%23999999" allowfullscreen title="${item.name}"></iframe></div>`;
  } else {
    body.innerHTML = `
      <div class="modal-cover">
        <img src="${imgSrc(item.cover)}" alt="${item.name}"/>
        <div class="modal-cover-note">
          <span class="label">Full Album</span>
          <p>To display the full Lightroom album here, open the relevant data entry in <code>site.js</code>, find <strong>${item.name}</strong>, and set <code>lrId</code> to your Lightroom share ID.</p>
        </div>
      </div>`;
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('visible'));
}

function closeModalBtn() {
  const modal = document.getElementById('session-modal');
  if (!modal) return;
  modal.classList.remove('visible');
  setTimeout(() => { modal.style.display = 'none'; document.getElementById('modal-body').innerHTML = ''; }, 400);
  document.body.style.overflow = '';
}

function closeModal(e) { if (e.target === document.getElementById('session-modal')) closeModalBtn(); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalBtn(); });

function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold:0.1 });
  els.forEach(el => obs.observe(el));
}


function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  if (!slides.length) return;
  let current = 0;
  let timer;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[i].classList.add('active');
    if (dots[i]) dots[i].classList.add('active');
    current = i;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startTimer() {
    timer = setInterval(nextSlide, 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      showSlide(i);
      startTimer();
    });
  });

  startTimer();
}

function initFlashBrand() {
  document.querySelectorAll('.flashr').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      el.classList.remove('is-firing');
      void el.offsetWidth;
      el.classList.add('is-firing');
      const href = el.getAttribute('href') || 'index.html';
      setTimeout(function () { window.location.href = href; }, 300);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFlashBrand();
  renderMarquee();
  renderPortraits();
  renderCouples();
  initReveal();
  initTestimonials();
});
