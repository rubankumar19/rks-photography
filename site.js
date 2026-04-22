
const CDN = 'https://cdn.myportfolio.com/83d0ee9f-f823-47f2-b3d6-2b49afa565c9/';
const portraits = [
    { name:'Bhoomika',  meta:'Portrait · Stockholm', cover:'6a889fc2-a87f-40f0-946a-40c89213c8d4_rwc_0x434x1365x1365x32.jpg?h=e5824a8cd0b919c02f7b81f8e61b1beb',  lrId:null },
    { name:'Swetha',    meta:'Portrait · Stockholm', cover:'cc464dd8-e1a1-41e9-aa46-a20402aed9d6_rwc_0x124x1365x1365x32.jpg?h=5d4fd15ab822c823a84d8956f22a71a8',  lrId:null },
    { name:'Ashwini',   meta:'Portrait · Stockholm', cover:'19d73f71-28dd-4c30-80e5-14134977dac4_rwc_548x744x606x455x32.jpg?h=1f01c0d7c33ad771f77fcad5062c23b5', lrId:null },
    { name:'Nakshatra', meta:'Portrait · Stockholm', cover:'1fc1b30e-5078-4df9-adc0-b8105dc279c8_rwc_545x135x621x621x32.jpg?h=3cc8e487d2a5928ca1f982d6784e08d1',  lrId:null },
    { name:'Adhith',    meta:'Portrait · Stockholm', cover:'96652475-db82-4386-ae96-0d65fc5aee47_rwc_0x335x1365x1365x32.jpg?h=00d3c9fef164f3ab9997f52ba1496b33',  lrId:null },
    { name:'Raveena',   meta:'Portrait · Stockholm', cover:'38451275-341d-402b-856a-7468b01807b9_rwc_0x43x1364x1023x32.jpg?h=67e2d3b35a8bdc6e90f108403829c942',   lrId:null },
    { name:'Bhargav',   meta:'Portrait · Stockholm', cover:'54c1e97b-1a5a-4205-84d8-922640e21d46_rwc_798x50x1118x1118x32.jpg?h=c1e9398c93be6371855bf34e8eb052a5',  lrId:null },
    { name:'Monica',    meta:'Portrait · Stockholm', cover:'69127b3c-bbdf-457a-b931-1e47bdfa83cd_carw_4x3x32.jpg?h=a9c0beec62201f00fc9ded3cd78712cf',           lrId:null },
    { name:'Marie',     meta:'Portrait · Stockholm', cover:'6ecd5fd0-8e86-448a-a96d-a53fddca3b27_rwc_0x514x1365x1023x32.jpg?h=0256cfa78811563c2a2329a918f8a9d6',   lrId:null },
    { name:'Yann',      meta:'Portrait · Stockholm', cover:'4913ef33-2352-42ee-ac20-65a6d464dff4_rwc_240x426x868x868x32.jpg?h=840abae29b1bb3954dd4d6614f35d624',   lrId:null },
  ];
const couples = [
    { name:'Mohan & Akansha',    meta:'Couple Session', cover:'3237077a-9f48-49ce-8d47-b8405699589f_rwc_0x595x1365x1365x32.jpg?h=fba1a4f6bc89c14a0c44345f353e8f5a', lrId:null },
    { name:'Satheesh & Aswathy', meta:'Couple Session', cover:'ff7f416a-965d-4105-9a3f-953dd8f94fc2_rwc_0x167x1365x1365x32.jpg?h=c866a558199d59e6c6de123ffabe607d',  lrId:null },
    { name:'Yann & Swetha',      meta:'Couple Session', cover:'6cdbfb5c-423a-4064-8e70-bd178c0bec74_rwc_0x241x1365x1365x32.jpg?h=81e8a43a92b95a930bdb6b8a08e8be84',  lrId:null },
    { name:'Rajesh & Ankita',    meta:'Couple Session', cover:'d9921c5f-e5ba-4ab1-a353-40a082db8fb1_rwc_0x376x1151x1151x32.jpg?h=54b6c1278aab48032baca0155207c3d6',  lrId:null },
  ];

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
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
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
  const links = document.getElementById('nav-links');
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
      <img src="${CDN}${p.cover}" alt="${p.name}" loading="lazy"/>
      <div class="p-label"><div class="type">${p.meta}</div><div class="name">${p.name}</div></div>
    </div>`).join('');
}

function renderCouples() {
  const grid = document.getElementById('couple-grid');
  if (!grid) return;
  grid.innerHTML = couples.map((c,i) => `
    <div class="couple-card" onclick="openSession(couples[${i}])" style="animation-delay:${i*.08}s">
      <img src="${CDN}${c.cover}" alt="${c.name}" loading="lazy"/>
      <div class="c-label"><div class="type">${c.meta}</div><div class="name">${c.name}</div></div>
    </div>`).join('');
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
        <img src="${CDN}${item.cover}" alt="${item.name}"/>
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


document.addEventListener('DOMContentLoaded', () => {
  initNav();
  renderPortraits();
  renderCouples();
  initReveal();
});
