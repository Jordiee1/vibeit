/* ============================================================
   VIBIT – script.js
   Shared JS across all pages
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────
   1. DATA STORE  (localStorage wrapper)
   ───────────────────────────────────────── */
const VibitStore = {
  KEY: 'vibit_data',

  get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || {};
    } catch {
      return {};
    }
  },

  set(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },

  save(key, value) {
    const data = this.get();
    data[key] = value;
    this.set(data);
  },

  read(key, fallback = null) {
    return this.get()[key] ?? fallback;
  },

  clear() {
    localStorage.removeItem(this.KEY);
  }
};

/* ─────────────────────────────────────────
   2. VIBE DEFINITIONS  (data catalogue)
   ───────────────────────────────────────── */
const VIBE_DATA = {
  Y2K: {
    name: 'Y2K Dream ✨',
    emoji: '🌟',
    score: '96%',
    desc: 'คุณคือตัวเองในโลกมิลเลนเนียม ชอบของแวววาว สีสันจัดจ้าน และไม่กลัวที่จะโดดเด่น',
    tags: ['#Y2K', '#สายแฟ', '#ตัวมารดา', '#กล้องฟิล์ม', '#Aesthetic'],
    color: 'var(--pink)',
    recommendations: [
      { icon: '👗', type: 'RENT LOOK', name: 'Mute.Studio', detail: 'เช่าชุด Y2K สไตล์ผสมเอิร์ธโทน ราคาเริ่ม ฿150/วัน', badge: 'badge-pink' },
      { icon: '📷', type: 'RENT CAMERA', name: 'Sony Cyber-shot Y2K', detail: 'กล้องดิจิตอลวินเทจ ฟีลเผลอ เปิดแฟลช ราคา ฿200/วัน', badge: 'badge-blue' },
      { icon: '📍', type: 'LOCATION', name: 'ONYX BKK Rooftop', detail: 'มุมสูงกลางกรุง แสงดี ฉากหลังสวย เหมาะถ่าย Y2K มาก', badge: 'badge-yellow' },
      { icon: '🎪', type: 'EVENT', name: 'Y2K Night Market', detail: 'ตลาดธีม Y2K ทุกเสาร์ ซอย Ekkamai 5 เข้าฟรี', badge: 'badge-green' }
    ],
    buddies: [
      { emoji: '💅', name: 'JIDA', handle: '@jidaaaa_16', match: '97% match', bg: 'linear-gradient(135deg,var(--pink),var(--purple))' },
      { emoji: '✨', name: 'MEEN', handle: '@meenxoxo', match: '93% match', bg: 'linear-gradient(135deg,var(--yellow),var(--pink))' },
      { emoji: '🌸', name: 'PLOYYY', handle: '@ployyy.fit', match: '88% match', bg: 'linear-gradient(135deg,var(--pink),var(--blue))' }
    ]
  },

  Minimal: {
    name: 'Earth Angel 🤍',
    emoji: '🤍',
    score: '94%',
    desc: 'คุณเชื่อใน "less is more" น้อยแต่มาก เลือกสรรทุกอย่างอย่างตั้งใจ และงามในแบบที่เงียบสงบ',
    tags: ['#Minimal', '#EarthTone', '#Aesthetic', '#SlowLife', '#NoBuy'],
    color: 'var(--green)',
    recommendations: [
      { icon: '👘', type: 'RENT LOOK', name: 'NudeStudy BKK', detail: 'ชุดเอิร์ธโทน neutral tones ทุกชิ้น ราคาเริ่ม ฿180/วัน', badge: 'badge-green' },
      { icon: '📸', type: 'RENT CAMERA', name: 'Fujifilm X100VI', detail: 'กล้องฟิล์มดิจิตอล ฟีลอบอุ่น เหมาะกับไวบ์มินิมอล ฿280/วัน', badge: 'badge-blue' },
      { icon: '📍', type: 'LOCATION', name: 'Baan Khanitha Garden', detail: 'สวนสวย แสงธรรมชาติ บรรยากาศสงบ ถ่ายรูปได้ทั้งวัน', badge: 'badge-yellow' },
      { icon: '☕', type: 'CAFE', name: 'Featherstone Cafe', detail: 'คาเฟ่ minimal ไม้ขาว แสงนุ่ม ที่นั่งเยอะ ไม่รีบไล่', badge: 'badge-green' }
    ],
    buddies: [
      { emoji: '🌿', name: 'FERN', handle: '@fernminimal', match: '95% match', bg: 'linear-gradient(135deg,var(--green),var(--blue))' },
      { emoji: '🤍', name: 'TON', handle: '@ton.earth', match: '91% match', bg: 'linear-gradient(135deg,var(--yellow),var(--green))' },
      { emoji: '🍃', name: 'NAM', handle: '@namlowkey', match: '86% match', bg: 'linear-gradient(135deg,var(--green),var(--yellow))' }
    ]
  },

  Street: {
    name: 'Street King 🔥',
    emoji: '🔥',
    score: '99%',
    desc: 'คุณออกมาจาก street scene อย่างแท้จริง กล้า เท่ ไม่แคร์สายตาคน แต่ทุกอย่างคิดมาแล้วทั้งนั้น',
    tags: ['#Street', '#Hypebeast', '#เท่', '#CoolKid', '#Drip'],
    color: 'var(--purple)',
    recommendations: [
      { icon: '🧢', type: 'RENT LOOK', name: 'IBAOZ Closet', detail: 'Streetwear collector เกรด hype ราคาเริ่ม ฿250/วัน', badge: 'badge-pink' },
      { icon: '📷', type: 'RENT CAMERA', name: 'Ricoh GR IIIx', detail: 'Street photography legend กล้องเล็กเบา ภาพคมกริบ ฿220/วัน', badge: 'badge-blue' },
      { icon: '📍', type: 'LOCATION', name: 'Talad Noi Mural', detail: 'ย่านกราฟฟิตี้ บรรยากาศ underground สุดๆ ถ่ายได้ทั้งวัน', badge: 'badge-yellow' },
      { icon: '🎤', type: 'EVENT', name: 'BKK Street Fest', detail: 'งาน street culture ครั้งใหญ่ Hip-hop + Skate + Art ทุกเดือน', badge: 'badge-green' }
    ],
    buddies: [
      { emoji: '🔥', name: 'IBAOZ', handle: '@ibaoz23', match: '98% match', bg: 'linear-gradient(135deg,var(--purple),var(--pink))' },
      { emoji: '🧢', name: 'KRIT', handle: '@kritdrip', match: '94% match', bg: 'linear-gradient(135deg,var(--blue),var(--purple))' },
      { emoji: '⚡', name: 'WAVE', handle: '@wavestreet', match: '89% match', bg: 'linear-gradient(135deg,var(--pink),var(--yellow))' }
    ]
  },

  Classic: {
    name: 'Soft Glam Queen 👒',
    emoji: '👒',
    score: '92%',
    desc: 'คุณมีรสนิยมสูงส่ง ชอบของคลาสสิกที่ผ่านกาลเวลา งามอย่างมีเสน่ห์ และไม่ตกเทรนด์',
    tags: ['#Classic', '#Glam', '#Timeless', '#LuxVibes', '#OldMoney'],
    color: 'var(--yellow)',
    recommendations: [
      { icon: '👗', type: 'RENT LOOK', name: 'LuxeLend.BKK', detail: 'ชุด classic glam สำหรับ dinner & event ราคาเริ่ม ฿300/วัน', badge: 'badge-yellow' },
      { icon: '📷', type: 'RENT CAMERA', name: 'Leica Q2 Classic', detail: 'กล้องสุดหรู ภาพสวยนุ่ม เหมาะกับสไตล์คลาสสิก ฿350/วัน', badge: 'badge-blue' },
      { icon: '📍', type: 'LOCATION', name: 'Mandarin Oriental BKK', detail: 'โรงแรมคลาสสิกริมแม่น้ำ บรรยากาศยุโรปกลางกรุง', badge: 'badge-pink' },
      { icon: '🍷', type: 'DINING', name: 'Le Normandie', detail: 'ร้าน Fine Dining ฝรั่งเศส วิวแม่น้ำ ดินเนอร์รูฟท็อป', badge: 'badge-yellow' }
    ],
    buddies: [
      { emoji: '💫', name: 'PLOY', handle: '@ployglam', match: '96% match', bg: 'linear-gradient(135deg,var(--yellow),var(--pink))' },
      { emoji: '👑', name: 'MIN', handle: '@minclassic', match: '90% match', bg: 'linear-gradient(135deg,var(--purple),var(--yellow))' },
      { emoji: '🌹', name: 'ARISA', handle: '@arisavibe', match: '85% match', bg: 'linear-gradient(135deg,var(--pink),var(--yellow))' }
    ]
  }
};

/* Default fallback vibe */
const DEFAULT_VIBE = VIBE_DATA.Y2K;

/* ─────────────────────────────────────────
   3. NAVBAR  (scroll + hamburger)
   ───────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
})();

/* ─────────────────────────────────────────
   4. SCROLL REVEAL  (shared)
   ───────────────────────────────────────── */
(function initReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity .55s ease, transform .55s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ─────────────────────────────────────────
   5. COUNTER ANIMATION  (index page)
   ───────────────────────────────────────── */
function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;

  const duration = 1800;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    el.textContent = current >= 1000
      ? (current / 1000).toFixed(1) + 'K+'
      : current + (step >= steps ? '+' : '');
    if (step >= steps) clearInterval(timer);
  }, duration / steps);
}

/* ─────────────────────────────────────────
   6. QUIZ CONTROLLER  (interact.html)
   ───────────────────────────────────────── */
const VibitQuiz = {
  answers: {},
  currentScreen: 'intro',

  start() {
    this.answers = {};
    this._show('q1');
  },

  answer(questionNum, value) {
    this.answers[`q${questionNum}`] = value;

    // highlight selected
    const screen = document.getElementById(`screen-q${questionNum}`);
    if (screen) {
      screen.querySelectorAll('.quiz-opt').forEach(btn => btn.classList.remove('selected'));
      event.target.classList.add('selected');
    }

    // short delay then advance
    setTimeout(() => {
      if (questionNum < 3) {
        this._show(`q${questionNum + 1}`);
      } else {
        this._show('camera');
      }
    }, 300);
  },

  fakeCapture() {
    const flash = document.getElementById('captureFlash');
    if (flash) {
      flash.classList.add('flash');
      setTimeout(() => flash.classList.remove('flash'), 200);
    }
    setTimeout(() => this._analyze(), 500);
  },

  skipCamera() {
    this._analyze();
  },

  _analyze() {
    const overlay = document.getElementById('analyzingOverlay');
    if (overlay) overlay.classList.add('show');

    // Determine vibe from answers
    const vibe = this._calcVibe();

    // Save to store
    VibitStore.save('lastVibe', vibe);
    VibitStore.save('lastAnswers', this.answers);
    VibitStore.save('lastVibeTime', Date.now());

    // Navigate to result after fake AI delay
    setTimeout(() => {
      window.location.href = 'result.html';
    }, 2800);
  },

  _calcVibe() {
    const q1 = this.answers.q1 || 'Y2K';
    // Simple mapping: q1 answer directly maps to vibe type
    const map = {
      'Y2K':     'Y2K',
      'Minimal': 'Minimal',
      'Street':  'Street',
      'Classic': 'Classic'
    };
    return map[q1] || 'Y2K';
  },

  _show(screenId) {
    document.querySelectorAll('.quiz-screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${screenId}`);
    if (target) target.classList.add('active');
    this.currentScreen = screenId;
  }
};

/* ─────────────────────────────────────────
   7. RESULT RENDERER  (result.html)
   ───────────────────────────────────────── */
const VibitResult = {

  load() {
    const vibeKey = VibitStore.read('lastVibe', 'Y2K');
    const vibe = VIBE_DATA[vibeKey] || DEFAULT_VIBE;

    this._renderHero(vibe);
    this._renderCards(vibe.recommendations);
    this._renderBuddies(vibe.buddies);
  },

  _renderHero(vibe) {
    const emojiEl = document.getElementById('vibeEmoji');
    const scoreEl = document.getElementById('vibeScoreText');
    const nameEl  = document.getElementById('vibeName');
    const descEl  = document.getElementById('vibeDesc');
    const tagsEl  = document.getElementById('vibeTags');

    if (emojiEl)  emojiEl.textContent = vibe.emoji;
    if (scoreEl)  scoreEl.textContent = vibe.score;
    if (nameEl)   nameEl.textContent  = vibe.name;
    if (descEl)   descEl.textContent  = vibe.desc;

    if (tagsEl) {
      tagsEl.innerHTML = vibe.tags
        .map(t => `<span class="vibe-tag">${t}</span>`)
        .join('');
    }
  },

  _renderCards(recs) {
    const container = document.getElementById('resultCards');
    if (!container) return;

    container.innerHTML = recs.map((r, i) => `
      <div class="result-card" style="animation-delay:${i * 0.1}s">
        <span class="rc-icon">${r.icon}</span>
        <div class="rc-type">${r.type}</div>
        <div class="rc-name">${r.name}</div>
        <div class="rc-detail">${r.detail}</div>
        <span class="rc-badge ${r.badge}">${r.type.split(' ')[0]}</span>
      </div>
    `).join('');
  },

  _renderBuddies(buddies) {
    const container = document.getElementById('buddyGrid');
    if (!container) return;

    container.innerHTML = buddies.map(b => `
      <div class="buddy-card" onclick="VibitResult.contactBuddy('${b.name}')">
        <div class="buddy-avatar" style="background:${b.bg}">${b.emoji}</div>
        <div class="buddy-name">${b.name}</div>
        <div class="buddy-handle">${b.handle}</div>
        <span class="buddy-match">${b.match}</span>
      </div>
    `).join('');
  },

  contactBuddy(name) {
    alert(`📩 ส่งคำขอหา ${name} เรียบร้อย!\nรอการตอบรับจาก buddy ของคุณใน 24 ชม.`);
  },

  share() {
    const vibeKey = VibitStore.read('lastVibe', 'Y2K');
    const vibe = VIBE_DATA[vibeKey] || DEFAULT_VIBE;
    const text = `ฉันได้ไวบ์ "${vibe.name}" จาก VIBIT! ${vibe.emoji}\n${vibe.tags.join(' ')}\n\nลองเช็กไวบ์ของคุณได้ที่ vibit.app 🚀`;

    if (navigator.share) {
      navigator.share({ title: 'My VIBIT Result', text })
        .catch(() => this._copyFallback(text));
    } else {
      this._copyFallback(text);
    }
  },

  _copyFallback(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('✅ คัดลอกข้อความเรียบร้อย! เอาไปแปะโซเชียลได้เลย 🎉');
      });
    } else {
      alert('แชร์:\n\n' + text);
    }
  }
};

/* ─────────────────────────────────────────
   8. SMOOTH SCROLL  (anchor links)
   ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});