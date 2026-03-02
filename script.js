// =============================================
//  SCROLL TO TOP ON LOAD (must stay at top)
// =============================================
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0);
});

// =============================================
//  CONSOLE TEXT EFFECT (about section name)
// =============================================
function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#0a0a0a'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id);

  if (!target || !con) return;

  target.setAttribute('style', 'color:' + colors[0]);

  window.setInterval(function () {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount);
      window.setTimeout(function () {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0]);
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount);
      letterCount += x;
    }
  }, 120);

  window.setInterval(function () {
    if (visible === true) {
      con.className = 'console-underscore hidden';
      visible = false;
    } else {
      con.className = 'console-underscore';
      visible = true;
    }
  }, 400);
}

const aboutSection = document.getElementById('about');
let consoleStarted = false;

if (aboutSection) {
  const consoleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !consoleStarted) {
        consoleStarted = true;
        consoleText(
          ['MERILI', 'CREATIVE', 'DESIGNER'],
          'text',
          ['#ff2d78', '#0a0a0a', '#ff2d78']
        );
        consoleObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });

  consoleObserver.observe(aboutSection);
}

// =============================================
//  DATE — fills every .date element
// =============================================
function formatDate(d) {
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).toUpperCase();
}

const todayStr = formatDate(new Date());
document.querySelectorAll('.date').forEach(el => el.textContent = todayStr);

const todayDateEl = document.getElementById('today-date');
const aboutDateEl = document.getElementById('about-date');
if (todayDateEl) todayDateEl.textContent = todayStr;
if (aboutDateEl) aboutDateEl.textContent = todayStr;


// =============================================
//  WORK FILTER
// =============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems  = document.querySelectorAll('.work-item');

workItems.forEach(item => {
  item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  item.style.opacity    = '1';
  item.style.transform  = 'translateY(0)';
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    workItems.forEach(item => {
      const cat  = item.dataset.category;
      const show = filter === 'all' || cat === filter;

      if (show) {
        item.style.display = '';
        requestAnimationFrame(() => {
          item.style.opacity   = '1';
          item.style.transform = 'translateY(0)';
        });
      } else {
        item.style.opacity   = '0';
        item.style.transform = 'translateY(12px)';
        setTimeout(() => {
          if (btn.dataset.filter !== 'all' && item.dataset.category !== btn.dataset.filter) {
            item.style.display = 'none';
          }
        }, 300);
      }
    });
  });
});

// =============================================
//  SCROLL REVEAL
// =============================================
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

document.querySelectorAll(
  '.section-title, .about-text, .edu-item, .contact-title, .work-item'
).forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});

// =============================================
//  HERO: subtle parallax on scroll
// =============================================
const heroTitle = document.querySelector('.hero-title');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroTitle) {
    heroTitle.style.transform = `translateY(${y * 0.3}px) scale(${1 + y * 0.0002})`;
    heroTitle.style.opacity   = Math.max(0, 1 - y / 500);
  }
}, { passive: true });

// =============================================
//  CURSOR DOT (desktop only)
// =============================================
if (window.innerWidth > 900) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: #ff2d78;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, background 0.2s ease, opacity 0.15s ease;
  `;
  document.body.appendChild(dot);

  let mx = 0, my = 0, cx = 0, cy = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateDot() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    dot.style.left = (cx - 5) + 'px';
    dot.style.top  = (cy - 5) + 'px';
    requestAnimationFrame(animateDot);
  }
  animateDot();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => dot.style.opacity = '0');
    el.addEventListener('mouseleave', () => dot.style.opacity = '1');
  });

  document.querySelectorAll('.work-thumb').forEach(el => {
    el.addEventListener('mouseenter', () => dot.style.transform = 'scale(2.5)');
    el.addEventListener('mouseleave', () => dot.style.transform = 'scale(1)');
  });

  const lightSections = document.querySelectorAll('.work, .about, .education');
  const darkSections  = document.querySelectorAll('.hero, .services, .contact');

  const colorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const isDark = entry.target.classList.contains('services') ||
                     entry.target.classList.contains('contact') ||
                     entry.target.classList.contains('hero');
      dot.style.background = isDark ? '#ff2d78' : '#0a0a0a';
    });
  }, { threshold: 0.4 });

  lightSections.forEach(s => colorObserver.observe(s));
  darkSections.forEach(s  => colorObserver.observe(s));
}

// =============================================
//  PROJECT MODAL
//  Reads data-* attributes directly from HTML
//  so adding new projects needs no JS changes.
//
//  Required on .work-item:
//    data-title, data-cat, data-year, data-desc
//    data-link  (optional, defaults to #)
//    data-images (comma-separated image paths)
//
//  Falls back to legacy projects{} object if
//  data-title is absent, for backwards compat.
// =============================================

const legacyProjects = {
  'project-2': {
    title:  'Coca-Cola onepager',
    cat:    'WEB DESIGN',
    year:   'Web Design · 2026',
    desc:   'Short project description goes here.',
    link:   '#',
    photos: ['images/coca-cola.png']
  },
  'project-3': {
    title:  'Project Title Three',
    cat:    'POSTERS',
    year:   'Poster · 2024',
    desc:   'Short project description goes here.',
    link:   '#',
    photos: []
  },
  'project-4': {
    title:  'Project Title Four',
    cat:    'PHOTOGRAPHY',
    year:   'Photography · 2024',
    desc:   'Short project description goes here.',
    link:   '#',
    photos: []
  },
  'project-5': {
    title:  'Project Title Five',
    cat:    'WEB DESIGN',
    year:   'Web Design · 2024',
    desc:   'Short project description goes here.',
    link:   '#',
    photos: []
  },
  'project-6': {
    title:  'Project Title Six',
    cat:    'BRANDING',
    year:   'Branding · 2024',
    desc:   'Short project description goes here.',
    link:   '#',
    photos: []
  },
  'project-7': {
    title:  'Project Title Seven',
    cat:    'POSTERS',
    year:   'Poster · 2023',
    desc:   'Short project description goes here.',
    link:   '#',
    photos: []
  },
  'project-8': {
    title:  'Project Title Eight',
    cat:    'PHOTOGRAPHY',
    year:   'Photography · 2023',
    desc:   'Short project description goes here.',
    link:   '#',
    photos: []
  },
  'project-9': {
    title:  'Project Title Nine',
    cat:    'WEB DESIGN',
    year:   'Web Design · 2023',
    desc:   'Short project description goes here.',
    link:   '#',
    photos: []
  },
};

// Kringel project kept in JS due to many images
const kringelData = {
  title:  'Testiloomis, täitmise ja hindamise keskkond',
  cat:    'WEB DESIGN',
  year:   'Web Design · 2025',
  desc:   'Write a short description of this project here. What was the brief, your approach, and the outcome? Two to four sentences works well.',
  link:   '#',
  photos: [
    'images/figma-kringel.png',
    'images/detailid.png',
    'images/guide.png',
    'images/koik_testid.png',
    'images/koik_vastused.png',
    'images/koostamine.png',
    'images/solving.png',
  ]
};

// ── MODAL ELEMENTS ────────────────────────────
const modal        = document.getElementById('projectModal');
const modalClose   = document.getElementById('modalClose');
const modalGallery = document.getElementById('modalGallery');
const modalCat     = document.getElementById('modalCat');
const modalTitle   = document.getElementById('modalTitle');
const modalYear    = document.getElementById('modalYear');
const modalDesc    = document.getElementById('modalDesc');
const modalLink    = document.getElementById('modalLink');

function buildGallery(photos) {
  modalGallery.innerHTML = '';
  photos.forEach(src => {
    if (src) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = modalTitle.textContent;
      img.className = 'modal-gallery-img';
      modalGallery.appendChild(img);
    } else {
      const box = document.createElement('div');
      box.className = 'modal-gallery-img';
      box.style.background = '#e8e0d4';
      box.style.border = '2px solid #0a0a0a';
      modalGallery.appendChild(box);
    }
  });
}

function openModal(item, legacyId) {
  // Try data-attributes first
  if (item && item.dataset.title) {
    modalCat.textContent   = item.dataset.cat   || '';
    modalTitle.textContent = item.dataset.title  || '';
    modalYear.textContent  = item.dataset.year   || '';
    modalDesc.textContent  = item.dataset.desc   || '';
    modalLink.href         = item.dataset.link   || '#';

    const images = item.dataset.images
      ? item.dataset.images.split(',').map(s => s.trim())
      : [];
    buildGallery(images);

  // Kringel special case (first work item, lots of images)
  } else if (legacyId === 'project-1') {
    const d = kringelData;
    modalCat.textContent   = d.cat;
    modalTitle.textContent = d.title;
    modalYear.textContent  = d.year;
    modalDesc.textContent  = d.desc;
    modalLink.href         = d.link;
    buildGallery(d.photos);

  // Legacy fallback
  } else {
    const data = legacyProjects[legacyId];
    if (!data) return;
    modalCat.textContent   = data.cat;
    modalTitle.textContent = data.title;
    modalYear.textContent  = data.year;
    modalDesc.textContent  = data.desc;
    modalLink.href         = data.link || '#';
    buildGallery(data.photos);
  }

  modal.querySelector('.modal-box').scrollTop = 0;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.work-item').forEach((item, index) => {
  const id = 'project-' + (index + 1);
  item.dataset.modalId = id;
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => openModal(item, item.dataset.modalId));
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});