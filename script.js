// =============================================
//  SCROLL TO TOP ON LOAD
// =============================================
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => {
  setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0);
});

// =============================================
//  ALL PROJECT DATA — edit here only
// =============================================
const projects = [
  {
    id: 'kringel',
    title: 'Website for creating, solving and grading tests',
    cat: 'WEB DESIGN',
    year: 'Web Design · 2025',
    desc: 'This project was a semester-long school assignment to design a website for creating, solving and grading tests for studenKringel was a web based platform developed for Tallinn University Science Kitchen. The goal of the project was to create a comprehensive web solution that allows users to create tests with a wide variety of question types, complete them within the same environment, and later evaluate and grade the results all on a single. The project was completed as a semester long team assignment. As the Project Manager, I was responsible for coordinating the team, organizing workflows, and ensuring timely delivery of milestones. In addition to team leadership, I played a key role in designing a high fidelity prototype in Figma, defining the user experience and visual direction of the platform. I was also actively involved in frontend development and contributed to the project documentation.\nThe development process included user research, wireframing, prototyping, and visual design. The final solution was designed to be intuitive, user friendly, and accessible for both students and teachers, providing a seamless experience for creating, solving, and grading tests.ts and teachers. The project included user research, wireframing, prototyping and visual design. The website was designed to be user-friendly and accessible for both students and teachers.',
    link: 'https://github.com/Merili-t/Kringel',
    images: ['images/figma-kringel.png','images/detailid.png','images/guide.png','images/koik_testid.png','images/koik_vastused.png','images/koostamine.png','images/solving.png'],
  },
  {
    id: 'coca-cola',
    title: 'Coca-Cola Onepager',
    cat: 'WEB DESIGN',
    year: 'Web Design · 2026',
    desc: 'A self-initiated concept project. I wanted to try something different and play with a futuristic aesthetic, exploring how product photography principles within web design, using lighting, depth and motion, can make something as familiar as a Coca-Cola can feel like a luxury object.',
    images: ['images/coca-cola.png', 'images/coke1.png', 'images/coke2.png', 'images/coke3.png'],
    link: null,
  },
  {
    id: 'kultuuriklubi',
    title: 'TLÜ Kultuuriklubi',
    cat: 'SOCIAL MEDIA & BRANDING',
    year: 'Social Media · 2025–2026',
    desc: 'Visual identity and social media content for TLÜ Kultuuriklubi — event graphics, Instagram posts, stories and promotional materials created to build a cohesive brand presence across all club events.',
    link: 'https://www.instagram.com/kultuuriklubitlu/',
    images: ['images/kulta/insta.png','images/kulta/malumang_aprill.png','images/kulta/dj.png','images/kulta/malumang.png','images/kulta/sobrapaev.png','images/kulta/sobrapaev2.png','images/kulta/tickets.png','images/kulta/vastlapaev.png','images/kulta/bar.jpg'],
  },
  {
    id: 'zine',
    title: 'Zine Poster',
    cat: 'POSTERS',
    year: 'Poster · 2025',
    desc: 'A poster created for a local zine, exploring themes of identity and self-expression through bold typography and vibrant colors.',
    images: ['images/poster/zine.png','images/poster/zine/zine_1.png','images/poster/zine/zine_2.png','images/poster/zine/zine_3.png','images/poster/zine/zine_4.png','images/poster/zine/zine_5.png','images/poster/zine/zine_6.png','images/poster/zine/zine_7.png','images/poster/zine/zine_8.png'],
  },
  {
    id: 'bmw',
    title: 'BMW Configurator',
    cat: 'WEB DESIGN',
    year: 'Web Design · 2024',
    desc: 'A web application for configuring BMW vehicles, featuring an intuitive interface and real-time visualization of vehicle options.',
    images: ['images/bmw/home.png','images/bmw/specs.png','images/bmw/configure.png','images/bmw/pics.png'],
  },
  {
    id: 'posters-for-fun',
    title: 'Posters for Fun',
    cat: 'POSTERS',
    year: 'Posters · 2025',
    desc: 'I made these in between everything else, just messing around with type and colour when I felt like it. No deadline, no feedback, no stress.',
    images: ['images/poster/mind.png','images/poster/roast_levels.png','images/poster/bored.png','images/poster/scared.png'],
  },
];

// =============================================
//  CONSOLE TEXT EFFECT (about section name)
// =============================================
function consoleText(word, id, color) {
  const target = document.getElementById(id);
  const con = document.getElementById('console');
  if (!target || !con) return;

  target.setAttribute('style', 'color:' + color);

  let letterCount = 0;

  const typing = window.setInterval(function () {
    letterCount++;
    target.innerHTML = word.substring(0, letterCount);
    if (letterCount === word.length) {
      clearInterval(typing);
    }
  }, 120);

  let visible = true;
  window.setInterval(function () {
    con.className = visible ? 'console-underscore hidden' : 'console-underscore';
    visible = !visible;
  }, 400);
}

const aboutSection = document.getElementById('about');
let consoleStarted = false;

if (aboutSection) {
  const consoleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !consoleStarted) {
        consoleStarted = true;
        consoleText('MERILI', 'text', '#ff2d78');
        consoleObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });

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
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  let mx = 0, my = 0, cx = 0, cy = 0;
  let isHeroLeft = false;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    ring.style.left = mx + 'px';
    ring.style.top  = my + 'px';
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

  document.querySelectorAll('.hero-left').forEach(el => {
    el.addEventListener('mouseenter', () => {
      isHeroLeft = true;
      dot.style.background  = '#0a0a0a';
      ring.style.borderColor = '#0a0a0a';
    });
    el.addEventListener('mouseleave', () => {
      isHeroLeft = false;
      dot.style.background  = '#ff2d78';
      ring.style.borderColor = '#ff2d78';
    });
  });

  document.querySelectorAll('.skills-ticker').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.background   = '#ff2d78';
      ring.style.borderColor = '#ff2d78';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.background   = '#0a0a0a';
      ring.style.borderColor = '#0a0a0a';
    });
  });

  document.querySelectorAll('#projectModal').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.background   = '#ff2d78';
      ring.style.borderColor = '#ff2d78';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.background   = '#0a0a0a';
      ring.style.borderColor = '#0a0a0a';
    });
  });

  document.querySelectorAll('.edu-left').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.background   = '#ff2d78';
      ring.style.borderColor = '#ff2d78';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.background   = '#0a0a0a';
      ring.style.borderColor = '#0a0a0a';
    });
  });

  document.querySelectorAll('.about-right').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.background   = '#0a0a0a';
      ring.style.borderColor = '#0a0a0a';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.background   = '#ff2d78';
      ring.style.borderColor = '#ff2d78';
    });
  });

  document.querySelectorAll('.contact').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.background   = '#ff2d78';
      ring.style.borderColor = '#ff2d78';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.background   = '#0a0a0a';
      ring.style.borderColor = '#0a0a0a';
    });
  });
  
  const lightSections = document.querySelectorAll('.work, .about, .education');
  const darkSections  = document.querySelectorAll('.hero, .services, .contact');

  const colorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (isHeroLeft) return;
      const isDark = entry.target.classList.contains('services') ||
                     entry.target.classList.contains('contact') ||
                     entry.target.classList.contains('hero');
      dot.style.background   = isDark ? '#ff2d78' : '#0a0a0a';
      ring.style.borderColor = isDark ? '#ff2d78' : '#0a0a0a';
    });
  }, { threshold: 0.4 });

  lightSections.forEach(s => colorObserver.observe(s));
  darkSections.forEach(s  => colorObserver.observe(s));
}

// =============================================
//  PROJECT MODAL
// =============================================
const modal        = document.getElementById('projectModal');
const modalClose   = document.getElementById('modalClose');
const modalGallery = document.getElementById('modalGallery');
const modalCat     = document.getElementById('modalCat');
const modalTitle   = document.getElementById('modalTitle');
const modalYear    = document.getElementById('modalYear');
const modalDesc    = document.getElementById('modalDesc');
const modalLink    = document.getElementById('modalLink');

function buildGallery(images) {
  modalGallery.innerHTML = '';
  images.forEach(src => {
    if (src) {
      const img = document.createElement('img');
      img.src = src.trim();
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

function openModal(projectData) {
  if (!projectData) return;
  modalCat.textContent   = projectData.cat   || '';
  modalTitle.textContent = projectData.title  || '';
  modalYear.textContent  = projectData.year   || '';
  modalDesc.textContent  = projectData.desc   || '';
  modalLink.href         = projectData.link   || '#';

  // Peida "More" nupp kui link puudub
  modalLink.style.display = projectData.link ? 'inline-block' : 'none';

  buildGallery(projectData.images || []);
  modal.querySelector('.modal-box').scrollTop = 0;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  modal.querySelector('.modal-box').scrollTop = 0;
  modal.querySelector('.modal-gallery').scrollLeft = 0;
}

document.querySelectorAll('.work-item').forEach((item, index) => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => openModal(projects[index]));
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });