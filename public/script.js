/**
 * LOGIKA INTERAKTIF WEBSITE X-3 VANGUARD - SMAN 1 CICURUG
 * Mengelola dynamic rendering data, SVG vector icons, pencarian ksatria, filter galeri,
 * efek partikel canvas api obor, scroll reveal, sistem modal RPG stats, dan Web Audio API.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const data = window.VANGUARD_DATA;

  if (!data) {
    console.error('VANGUARD_DATA tidak ditemukan!');
    return;
  }

  // Overwrite dynamic sections with live Supabase data (fallback to static on error)
  try {
    const [leadership, knights, gallery] = await Promise.all([
      fetch('/api/leadership').then(r => r.json()),
      fetch('/api/knights').then(r => r.json()),
      fetch('/api/gallery').then(r => r.json())
    ]);
    if (Array.isArray(leadership) && leadership.length) data.leadership = leadership;
    if (Array.isArray(knights) && knights.length) data.knights = knights.map(k => ({ ...k, rpgStats: k.rpg_stats }));
    if (Array.isArray(gallery) && gallery.length) data.gallery = gallery;
  } catch (err) {
    console.warn('Gagal muat data live, pakai data statis:', err);
  }

  // 1. Inisialisasi Elemen & Data
  initHeroCanvas();
  renderStats(data.lore.stats);
  renderLeadership(data.leadership);
  renderKnights(data.knights);
  renderScheduleAndDuty(data.schedule, data.dutyRoster);
  renderGallery(data.gallery);
  renderAchievements(data.achievements);
  renderTestimonials(data.testimonials);
  setupFiltersAndSearch(data.knights, data.gallery);
  setupNavigation();
  setupScrollReveal();
  setupModalSystem();
  initMedievalAudio();
});

/* --------------------------------------------------------------------------
   0. MEDIEVAL SVG ICON GENERATOR
   -------------------------------------------------------------------------- */
function getMedievalSvg(iconKey, customClass = '') {
  const cls = customClass ? `svg-icon ${customClass}` : 'svg-icon';
  
  const icons = {
    swords: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/>
      <path d="M13 19l2 2 4-4-2-2"/>
      <path d="M19.5 6.5L18 3h-3L3.5 14.5"/>
      <path d="M5 21l-2-2 4-4 2 2"/>
    </svg>`,
    
    wizard: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L4 19h16L12 2z"/>
      <path d="M2 19h20v2H2z"/>
      <path d="M12 9v4M10 11h4"/>
    </svg>`,
    
    castle: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 21V9l2-2 2 2v12M16 21V9l2-2 2 2v12M9 21V12h6v9"/>
      <path d="M3 21h18"/>
      <path d="M7 4h2v3H7zM15 4h2v3h-2zM11 2h2v4h-2z"/>
    </svg>`,
    
    scroll: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6"/>
      <path d="M4 6a2 2 0 0 1 2-2h10"/>
      <path d="M8 10h8M8 14h6"/>
    </svg>`,
    
    crown: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
      <path d="M3 20h18v2H3z"/>
    </svg>`,
    
    shield: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>`,
    
    coins: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="9" r="6"/>
      <path d="M15 9.5a6 6 0 1 1-6 6"/>
      <circle cx="9" cy="9" r="2"/>
    </svg>`,
    
    fleur: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2c1.5 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2.5-5 4-8z"/>
      <path d="M4 14c2.5 0 5-1 6-4-1 4-4 6-6 6z"/>
      <path d="M20 14c-2.5 0-5-1-6-4 1 4 4 6 6 6z"/>
      <path d="M8 18h8v2H8zM12 18v4"/>
    </svg>`,
    
    trophy: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34"/>
      <path d="M18 4H6v7a6 6 0 0 0 12 0V4z"/>
    </svg>`,
    
    medal: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="14" r="6"/>
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"/>
      <path d="M12 2L8.5 8.5h7L12 2z"/>
    </svg>`,
    
    search: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>`,

    instagram: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>`,

    clock: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`,

    calendar: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>`,

    cleaning: `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 21h18M12 3v14M8 17h8"/>
    </svg>`
  };

  return icons[iconKey] || icons.shield;
}

/* --------------------------------------------------------------------------
   1. CANVAS TORCH EMBER PARTICLES (HERO SECTION)
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('emberCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = Math.min(window.innerWidth / 15, 60);

  class Ember {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 50;
      this.size = Math.random() * 3 + 1;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.8 + 0.2;
      this.hue = Math.random() * 30 + 15;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity -= 0.003;
      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 55%, ${this.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Ember());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------------------------------
   2. DYNAMIC RENDERERS
   -------------------------------------------------------------------------- */
function renderStats(stats) {
  const container = document.getElementById('statsGrid');
  if (!container) return;
  container.innerHTML = stats.map(stat => `
    <div class="stat-card reveal">
      <div class="stat-icon">${getMedievalSvg(stat.icon)}</div>
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

function renderLeadership(leaders) {
  const container = document.getElementById('leadershipGrid');
  if (!container) return;
  container.innerHTML = leaders.map(leader => `
    <div class="leader-card reveal">
      <div class="leader-img-wrap">
        <img src="${leader.avatar}" alt="${leader.name}" class="leader-img" loading="lazy">
        <div class="leader-badge">${getMedievalSvg(leader.badge)}</div>
      </div>
      <div class="leader-content">
        <div class="leader-role">${leader.role}</div>
        <h3 class="leader-name">${leader.name}</h3>
        <div class="leader-title">${leader.title}</div>
        <div class="leader-motto">"${leader.motto}"</div>
      </div>
    </div>
  `).join('');
}

function renderKnights(knights) {
  const container = document.getElementById('knightsGrid');
  if (!container) return;
  if (knights.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Tidak ada ksatria yang ditemukan dalam pencarian.</p>`;
    return;
  }
  container.innerHTML = knights.map(knight => `
    <div class="knight-card reveal" data-knight-id="${knight.id}">
      <div class="knight-avatar-wrap">
        <img src="${knight.avatar}" alt="${knight.name}" class="knight-avatar" loading="lazy">
      </div>
      <h3 class="knight-name">${knight.name}</h3>
      <div class="knight-nickname">"${knight.nickname}"</div>
      <span class="knight-squad">${knight.squad}</span>
      <div class="knight-motto">"${knight.motto}"</div>
    </div>
  `).join('');
}

function renderScheduleAndDuty(schedules, dutyRosters) {
  const scheduleContainer = document.getElementById('scheduleContent');
  if (!scheduleContainer) return;

  const currentDayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon ... 5 = Fri

  // 1. Render Subject Schedule Tab Content
  function renderSubjectTab() {
    scheduleContainer.innerHTML = `
      <div class="schedule-grid">
        ${schedules.map(sch => {
          const isToday = sch.dayCode === currentDayIndex;
          return `
            <div class="schedule-card parchment-card reveal ${isToday ? 'active-today' : ''}">
              <div class="schedule-card-header">
                <h3 class="schedule-day-title">${sch.day}</h3>
                ${isToday ? '<span class="today-badge">Hari Ini</span>' : ''}
              </div>
              <ul class="subject-list">
                ${sch.subjects.map(sub => `
                  <li class="subject-item">
                    <div class="subject-time">${getMedievalSvg('clock')} ${sub.time}</div>
                    <div class="subject-name">${sub.name}</div>
                    <div class="subject-mentor">Guru/Instruktur: ${sub.mentor}</div>
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
        }).join('')}
      </div>
    `;
    setupScrollReveal();
  }

  // 2. Render Duty Roster Tab Content
  function renderDutyTab() {
    scheduleContainer.innerHTML = `
      <div class="schedule-grid">
        ${dutyRosters.map((duty, idx) => {
          const dayCode = idx + 1;
          const isToday = dayCode === currentDayIndex;
          return `
            <div class="schedule-card parchment-card reveal ${isToday ? 'active-today' : ''}">
              <div class="schedule-card-header">
                <h3 class="schedule-day-title">${duty.day}</h3>
                ${isToday ? '<span class="today-badge">Piket Hari Ini</span>' : ''}
              </div>
              <ul class="duty-list">
                ${duty.members.map(member => `
                  <li class="duty-item">
                    ${getMedievalSvg('shield', 'duty-icon')} <span>${member}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
        }).join('')}
      </div>
    `;
    setupScrollReveal();
  }

  // Initial render
  renderSubjectTab();

  // Tab Switching Handler
  const tabBtns = document.querySelectorAll('.schedule-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      if (target === 'subjects') {
        renderSubjectTab();
      } else {
        renderDutyTab();
      }
    });
  });
}

function renderGallery(items) {
  const container = document.getElementById('galleryGrid');
  if (!container) return;
  if (items.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Tidak ada arsip foto untuk kategori ini.</p>`;
    return;
  }
  container.innerHTML = items.map(item => `
    <div class="gallery-card reveal" data-gallery-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-category">${item.category}</span>
        <h3 class="gallery-title">${item.title}</h3>
        <p class="gallery-desc">${item.description}</p>
      </div>
    </div>
  `).join('');
}

function renderAchievements(achievements) {
  const container = document.getElementById('achievementsGrid');
  if (!container) return;
  container.innerHTML = achievements.map(ach => `
    <div class="achieve-card reveal">
      <div class="achieve-icon">${getMedievalSvg(ach.icon)}</div>
      <span class="achieve-year">${ach.year}</span>
      <h3 class="achieve-title">${ach.title}</h3>
      <p class="achieve-desc">${ach.description}</p>
    </div>
  `).join('');
}

function renderTestimonials(testimonials) {
  const container = document.getElementById('testimonialsGrid');
  if (!container) return;
  container.innerHTML = testimonials.map(test => `
    <div class="test-card reveal">
      <p class="test-quote">"${test.quote}"</p>
      <div class="test-author">
        <img src="${test.avatar}" alt="${test.name}" class="test-avatar" loading="lazy">
        <div>
          <div class="test-name">${test.name}</div>
          <div class="test-role">${test.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   3. SEARCH & FILTER HANDLERS
   -------------------------------------------------------------------------- */
function setupFiltersAndSearch(allKnights, allGallery) {
  const searchInput = document.getElementById('knightSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filtered = allKnights.filter(k => 
        k.name.toLowerCase().includes(term) ||
        k.nickname.toLowerCase().includes(term) ||
        k.squad.toLowerCase().includes(term) ||
        k.role.toLowerCase().includes(term)
      );
      renderKnights(filtered);
      setupScrollReveal();
    });
  }

  const knightFilterBtns = document.querySelectorAll('.knight-filter-btn');
  knightFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      knightFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const squad = btn.getAttribute('data-squad');
      if (squad === 'all') {
        renderKnights(allKnights);
      } else {
        const filtered = allKnights.filter(k => k.squad === squad);
        renderKnights(filtered);
      }
      setupScrollReveal();
    });
  });

  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      if (category === 'all') {
        renderGallery(allGallery);
      } else {
        const filtered = allGallery.filter(g => g.category === category);
        renderGallery(filtered);
      }
      setupScrollReveal();
    });
  });
}

/* --------------------------------------------------------------------------
   4. NAVIGATION & SCROLL REVEAL
   -------------------------------------------------------------------------- */
function setupNavigation() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
}

function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. MODAL SYSTEM WITH RPG STATS
   -------------------------------------------------------------------------- */
function setupModalSystem() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  if (!backdrop || !closeBtn || !modalBody) return;

  function closeModal() {
    backdrop.classList.remove('active');
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Delegate click on knight card
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.knight-card');
    if (card) {
      const knightId = card.getAttribute('data-knight-id');
      const knight = window.VANGUARD_DATA.knights.find(k => k.id === knightId);
      if (knight) {
        const stats = knight.rpgStats || { keberanian: 85, kecerdasan: 85, kreativitas: 85, ketangkasan: 85 };
        modalBody.innerHTML = `
          <div class="knight-modal-content">
            <img src="${knight.avatar}" alt="${knight.name}" class="modal-knight-img">
            <h2 class="modal-knight-name">${knight.name}</h2>
            <p class="modal-knight-nick">"${knight.nickname}"</p>
            <div class="modal-knight-squad">${knight.squad} • ${knight.role}</div>
            
            <p class="modal-knight-motto">"${knight.motto}"</p>

            <div class="rpg-stats-container">
              <h4 class="rpg-stats-title">Atribut RPG Ksatria</h4>
              
              <div class="rpg-stat-row">
                <span class="rpg-stat-label">Keberanian (STR)</span>
                <div class="rpg-bar-track">
                  <div class="rpg-bar-fill" style="width: ${stats.keberanian}%;"></div>
                </div>
                <span class="rpg-stat-val">${stats.keberanian}</span>
              </div>

              <div class="rpg-stat-row">
                <span class="rpg-stat-label">Kecerdasan (INT)</span>
                <div class="rpg-bar-track">
                  <div class="rpg-bar-fill" style="width: ${stats.kecerdasan}%;"></div>
                </div>
                <span class="rpg-stat-val">${stats.kecerdasan}</span>
              </div>

              <div class="rpg-stat-row">
                <span class="rpg-stat-label">Kreativitas (ART)</span>
                <div class="rpg-bar-track">
                  <div class="rpg-bar-fill" style="width: ${stats.kreativitas}%;"></div>
                </div>
                <span class="rpg-stat-val">${stats.kreativitas}</span>
              </div>

              <div class="rpg-stat-row">
                <span class="rpg-stat-label">Ketangkasan (AGI)</span>
                <div class="rpg-bar-track">
                  <div class="rpg-bar-fill" style="width: ${stats.ketangkasan}%;"></div>
                </div>
                <span class="rpg-stat-val">${stats.ketangkasan}</span>
              </div>
            </div>
          </div>
        `;
        backdrop.classList.add('active');
        playFanfareSound();
      }
    }

    // Delegate click on gallery card
    const galCard = e.target.closest('.gallery-card');
    if (galCard) {
      const galId = galCard.getAttribute('data-gallery-id');
      const item = window.VANGUARD_DATA.gallery.find(g => g.id === galId);
      if (item) {
        modalBody.innerHTML = `
          <div>
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 6px; border: 2px solid var(--gold-primary); margin-bottom: 1.2rem;">
            <span style="font-family: var(--font-medieval); color: var(--gold-bright); font-size: 0.9rem; text-transform: uppercase;">${item.category}</span>
            <h2 style="font-family: var(--font-heading); color: #ffffff; font-size: 1.8rem; margin: 0.4rem 0 0.8rem;">${item.title}</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">${item.description}</p>
          </div>
        `;
        backdrop.classList.add('active');
      }
    }
  });
}

/* --------------------------------------------------------------------------
   6. WEB AUDIO API - SYNTHETIC MEDIEVAL FANFARE SOUNDS
   -------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function initMedievalAudio() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundBtn.classList.toggle('muted', !soundEnabled);
      soundBtn.setAttribute('title', soundEnabled ? 'Suara Aktif' : 'Suara Ditinggalkan');
      soundBtn.innerHTML = getMedievalSvg(soundEnabled ? 'swords' : 'shield');
      if (soundEnabled) playFanfareSound();
    });
  }

  setup3DCardsTilt();
}

/* --------------------------------------------------------------------------
   7. 3D CARD TILT MICRO-INTERACTION (FRONTEND-DESIGN SPECIAL)
   -------------------------------------------------------------------------- */
function setup3DCardsTilt() {
  const tiltCards = document.querySelectorAll('.knight-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (centerY - y) / 15;
      const rotateY = (x - centerX) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    });
  });
}

function playFanfareSound() {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    
    // Quick regal chime notes: D4 -> F#4 -> A4
    osc.frequency.setValueAtTime(293.66, now); // D4
    osc.frequency.setValueAtTime(369.99, now + 0.1); // F#4
    osc.frequency.setValueAtTime(440.00, now + 0.2); // A4

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (err) {
    // Ignore audio autoplay policies if user has not interacted yet
  }
}

