
'use strict';

const RentHub = {

  /* State */
  state: {
    province:    'ทั้งหมด',
    category:    'all',
    search:      '',
    sort:        'default',
    minPrice:    null,
    maxPrice:    null,
    minRating:   0,
    onlyNew:     false,
    onlyTrending: false,
    flatPage:    1,
    perPage:     9,
    likedStores: new Set()
  },

  /* ── INIT ── */
  // ใหม่
init() {
  try { this._loadLikes(); } catch(e) { console.warn('_loadLikes', e); }
  try { this._renderProvinces(); } catch(e) { console.warn('_renderProvinces', e); }
  try { this._renderCatTabs(); } catch(e) { console.warn('_renderCatTabs', e); }
  try { this._renderFeaturedCard(); } catch(e) { console.warn('_renderFeaturedCard', e); }
  try { this._renderGrouped(); } catch(e) { console.warn('_renderGrouped', e); }
  try { this._renderTrending(); } catch(e) { console.warn('_renderTrending', e); }
  try { this._bindSearch(); } catch(e) { console.warn('_bindSearch', e); }
  try { this._bindQuickProvinces(); } catch(e) { console.warn('_bindQuickProvinces', e); }
},

  /* ── RENDER: Province pills (hero) ── */
  _renderProvinces() {
    const provinces = StoreUtils.getProvinces();
    const container = document.getElementById('quickProvinces');
    if (!container) return;

    container.innerHTML = provinces.slice(0, 7).map(p => `
      <button class="rh-pill ${p === 'ทั้งหมด' ? 'active' : ''}"
              data-province="${p}"
              onclick="RentHub.setProvince('${p}', this)">
        ${p}
      </button>
    `).join('');

    /* Province dropdown (filter bar) */
    const dropdown = document.getElementById('provinceDropdown');
    if (!dropdown) return;
    dropdown.innerHTML = provinces.map(p => `
      <div class="rh-prov-item ${p === 'ทั้งหมด' ? 'active' : ''}"
           data-province="${p}"
           onclick="RentHub.setProvince('${p}', this); RentHub.closeProvinceDropdown()">
        ${p}
      </div>
    `).join('');
  },

  /* ── RENDER: Category tabs ── */
  _renderCatTabs() {
    const cats = StoreUtils.getCategories();
    const container = document.getElementById('catTabs');
    if (!container) return;

    container.innerHTML = cats.map(c => `
      <button class="rh-cat-tab ${c.key === 'all' ? 'active' : ''}"
              data-key="${c.key}"
              onclick="RentHub.setCategory('${c.key}', this)">
        ${c.emoji} ${c.label}
      </button>
    `).join('');
  },

  /* ── RENDER: Featured card ── */
  renderFeatured() {
  const container = document.getElementById('featuredStoreCard');
  if (!container) return;
  if (typeof STORES_DATA === 'undefined' || !STORES_DATA.length) return;

  const store = STORES_DATA.find(s => s.isTrending && s.rating >= 4.9) || STORES_DATA[0];
  if (!store) return;

  container.innerHTML = `
    <div class="rh-featured-card" onclick="RentHub.openModal(${store.id})">
      <div class="rh-featured-img">
        <span>${store.emoji}</span>
        ${store.badge ? `<span class="rh-featured-badge ${store.badgeColor}">${store.badge}</span>` : ''}
      </div>
      <div class="rh-featured-info">
        <h3>${store.name}</h3>
        <div class="rh-store-meta">
          ⭐ ${store.rating} (${store.reviewCount} รีวิว)
          <span>•</span>
          📍 ${store.area}, ${store.province}
        </div>
        <div class="rh-store-tags">
          ${store.tags.slice(0,3).map(t => `<span class="rh-tag">${t}</span>`).join('')}
        </div>
        <div class="rh-price">฿${store.priceStart}+ <span>/ ${store.priceUnit}</span></div>
      </div>
    </div>
  `;
},

  /* ── RENDER: Grouped view (by category) ── */
  _renderGrouped() {
  const container = document.getElementById('groupedView');
  if (!container) return;

  // ตรวจว่า STORES_DATA มีจริง
  if (typeof STORES_DATA === 'undefined' || !STORES_DATA.length) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:40px;">กำลังโหลดข้อมูล...</p>';
    return;
  }

  const cats = StoreUtils.getCategories().filter(c => c.key !== 'all');
  let html = '';

  cats.forEach(cat => {
    const stores = STORES_DATA.filter(s => s.categoryKey === cat.key).slice(0, 3);
    if (!stores.length) return;

    const totalCount = STORES_DATA.filter(s => s.categoryKey === cat.key).length;
    const catLabel = cat.label.replace('ร้านเช่า', '').trim();

    html += `
      <div class="rh-group">
        <div class="rh-group-header">
          <div class="rh-group-title">
            <div class="rh-group-bar"></div>
            <div>
              <h3>${cat.emoji} เช่า ${catLabel}</h3>
              <div class="rh-group-sub">${totalCount} ร้านทั่วประเทศ</div>
            </div>
          </div>
          <button class="rh-see-more" onclick="RentHub.setCategory('${cat.key}')">
            ดูทั้งหมด →
          </button>
        </div>
        <div class="rh-grid">
          ${stores.map(s => this._storeCardHTML(s)).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html || '<p style="text-align:center;color:var(--text-light);padding:40px;">ไม่พบข้อมูลร้าน</p>';
  this._reinitReveal();
},

  /* ── RENDER: Trending row ── */
  _renderTrending() {
    const container = document.getElementById('trendingRow');
    if (!container) return;
    const stores = StoreUtils.getTrending();
    container.innerHTML = stores.map(s => this._storeCardHTML(s)).join('');
  },

  /* ── RENDER: Flat (search results / filtered) ── */
  _renderFlat(stores) {
    const grouped   = document.getElementById('groupedView');
    const flat      = document.getElementById('flatView');
    const grid      = document.getElementById('flatGrid');
    const loadMore  = document.getElementById('loadMoreWrap');
    const empty     = document.getElementById('emptyState');
    const meta      = document.getElementById('resultMeta');

    if (stores.length === 0) {
      grouped.style.display  = 'none';
      flat.style.display     = 'none';
      empty.style.display    = 'block';
      if (meta) meta.textContent = '';
      return;
    }

    grouped.style.display = 'none';
    flat.style.display    = 'block';
    empty.style.display   = 'none';

    const paged = stores.slice(0, this.state.perPage * this.state.flatPage);
    grid.innerHTML = paged.map(s => this._storeCardHTML(s)).join('');

    if (meta) {
      meta.textContent = `พบ ${stores.length} ร้าน`;
    }

    if (stores.length > paged.length) {
      loadMore.style.display = 'block';
      loadMore.dataset.total = stores.length;
    } else {
      loadMore.style.display = 'none';
    }
  },

  /* ── STORE CARD HTML ── */
  _storeCardHTML(store) {
    const isLiked = this.state.likedStores.has(store.id);
    return `
      <div class="rh-store-card reveal">
        <div class="rh-card-img">
          <span>${store.emoji}</span>
          ${store.badge ? `<span class="rh-card-badge ${store.badgeColor}">${store.badge}</span>` : ''}
          <button class="rh-heart ${isLiked ? 'liked' : ''}"
                  onclick="event.stopPropagation(); RentHub.toggleLike(${store.id}, this)">
            ${isLiked ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="rh-card-info">
          <div class="rh-card-top">
            <div class="rh-card-name">${store.name}</div>
            <div class="rh-card-rating">⭐ ${store.rating}</div>
          </div>
          <div class="rh-card-loc">📍 ${store.area}, ${store.province}</div>
          <div class="rh-card-tags">
            ${store.tags.slice(0,2).map(t => `<span class="rh-tag">${t}</span>`).join('')}
          </div>
          <div class="rh-card-price">
            <span>฿${store.priceStart}+ / ${store.priceUnit}</span>
            <button class="rh-book-btn" onclick="RentHub.openModal(${store.id})">ดูร้าน</button>
          </div>
        </div>
      </div>
    `;
  },

  /* ── FILTERS ── */
  setProvince(province, el) {
    this.state.province = province;
    this.state.flatPage = 1;

    /* Update active pill */
    document.querySelectorAll('.rh-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.province === province);
    });
    document.querySelectorAll('.rh-prov-item').forEach(p => {
      p.classList.toggle('active', p.dataset.province === province);
    });

    const label = document.getElementById('selectedProvince');
    if (label) label.textContent = province;

    this.applyFilters();
    document.getElementById('storeList')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  setCategory(key, el) {
    this.state.category = key;
    this.state.flatPage = 1;

    document.querySelectorAll('.rh-cat-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.key === key);
    });

    this.applyFilters();
  },

  handleSort(value) {
    this.state.sort = value;
    this.applyFilters();
  },

  handleHeroSearch() {
    const val = document.getElementById('heroSearch')?.value || '';
    this.state.search = val;
    this.state.flatPage = 1;
    this.applyFilters();
    document.getElementById('storeList')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  setStarFilter(val, el) {
    this.state.minRating = val;
    document.querySelectorAll('.rh-star-btn').forEach(b => {
      b.classList.toggle('active', parseFloat(b.dataset.val) === val);
    });
  },

  applyFilters() {
    const priceMin = parseFloat(document.getElementById('priceMin')?.value) || null;
    const priceMax = parseFloat(document.getElementById('priceMax')?.value) || null;
    const onlyNew      = document.getElementById('toggleNew')?.checked || false;
    const onlyTrending = document.getElementById('toggleTrending')?.checked || false;

    Object.assign(this.state, { minPrice: priceMin, maxPrice: priceMax, onlyNew, onlyTrending });

    let results = StoreUtils.filter({
      province: this.state.province,
      category: this.state.category,
      search:   this.state.search,
      sort:     this.state.sort
    });

    /* Extra filters */
    if (this.state.minPrice) results = results.filter(s => s.priceStart >= this.state.minPrice);
    if (this.state.maxPrice) results = results.filter(s => s.priceStart <= this.state.maxPrice);
    if (this.state.minRating > 0) results = results.filter(s => s.rating >= this.state.minRating);
    if (this.state.onlyNew)      results = results.filter(s => s.isNew);
    if (this.state.onlyTrending) results = results.filter(s => s.isTrending);

    /* Switch view */
    const isDefault = this.state.province === 'ทั้งหมด'
      && this.state.category === 'all'
      && !this.state.search.trim()
      && this.state.sort === 'default'
      && !priceMin && !priceMax
      && this.state.minRating === 0
      && !onlyNew && !onlyTrending;

    if (isDefault) {
      this._showGrouped();
    } else {
      this._renderFlat(results);
    }

    this._updateActiveFilters();
    this._updateFilterCount();
    this._reinitReveal();
  },

  _showGrouped() {
    document.getElementById('groupedView').style.display = 'block';
    document.getElementById('flatView').style.display    = 'none';
    document.getElementById('emptyState').style.display  = 'none';
    const meta = document.getElementById('resultMeta');
    if (meta) meta.textContent = '';
  },

  resetAll() {
    this.state = { ...this.state,
      province: 'ทั้งหมด', category: 'all', search: '',
      sort: 'default', minPrice: null, maxPrice: null,
      minRating: 0, onlyNew: false, onlyTrending: false, flatPage: 1
    };

    /* Reset UI */
    if (document.getElementById('heroSearch')) document.getElementById('heroSearch').value = '';
    if (document.getElementById('sortSelect')) document.getElementById('sortSelect').value = 'default';
    if (document.getElementById('priceMin'))   document.getElementById('priceMin').value = '';
    if (document.getElementById('priceMax'))   document.getElementById('priceMax').value = '';
    if (document.getElementById('toggleNew'))      document.getElementById('toggleNew').checked = false;
    if (document.getElementById('toggleTrending')) document.getElementById('toggleTrending').checked = false;

    document.querySelectorAll('.rh-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.province === 'ทั้งหมด');
    });
    document.querySelectorAll('.rh-cat-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.key === 'all');
    });
    const label = document.getElementById('selectedProvince');
    if (label) label.textContent = 'ทั้งหมด';

    this._showGrouped();
    this._updateActiveFilters();
    this._updateFilterCount();
  },

  resetFilters() {
    this.state.minPrice   = null;
    this.state.maxPrice   = null;
    this.state.minRating  = 0;
    this.state.onlyNew    = false;
    this.state.onlyTrending = false;

    if (document.getElementById('priceMin'))   document.getElementById('priceMin').value = '';
    if (document.getElementById('priceMax'))   document.getElementById('priceMax').value = '';
    if (document.getElementById('toggleNew'))      document.getElementById('toggleNew').checked = false;
    if (document.getElementById('toggleTrending')) document.getElementById('toggleTrending').checked = false;
    document.querySelectorAll('.rh-star-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.val === '0');
    });
  },

  /* ── ACTIVE FILTER CHIPS ── */
  _updateActiveFilters() {
    const container = document.getElementById('activeFilters');
    if (!container) return;

    const chips = [];
    if (this.state.province !== 'ทั้งหมด') chips.push({ label: `📍 ${this.state.province}`, key: 'province' });
    if (this.state.category !== 'all') {
      const cat = StoreUtils.getCategories().find(c => c.key === this.state.category);
      if (cat) chips.push({ label: `${cat.emoji} ${cat.label}`, key: 'category' });
    }
    if (this.state.search.trim()) chips.push({ label: `🔍 "${this.state.search}"`, key: 'search' });
    if (this.state.minRating > 0) chips.push({ label: `⭐ ${this.state.minRating}+`, key: 'rating' });
    if (this.state.onlyNew)       chips.push({ label: '🆕 ร้านใหม่', key: 'new' });
    if (this.state.onlyTrending)  chips.push({ label: '🔥 กำลังเทรนด์', key: 'trending' });

    container.innerHTML = chips.map(c => `
      <span class="rh-filter-chip">
        ${c.label}
        <button class="rh-chip-remove" onclick="RentHub._removeFilter('${c.key}')">✕</button>
      </span>
    `).join('');
  },

  _removeFilter(key) {
    if (key === 'province')  this.setProvince('ทั้งหมด');
    if (key === 'category')  this.setCategory('all');
    if (key === 'search')  { this.state.search = ''; if (document.getElementById('heroSearch')) document.getElementById('heroSearch').value = ''; }
    if (key === 'rating')  { this.state.minRating = 0; document.querySelectorAll('.rh-star-btn').forEach(b => b.classList.toggle('active', b.dataset.val === '0')); }
    if (key === 'new')     { this.state.onlyNew = false; if (document.getElementById('toggleNew')) document.getElementById('toggleNew').checked = false; }
    if (key === 'trending'){ this.state.onlyTrending = false; if (document.getElementById('toggleTrending')) document.getElementById('toggleTrending').checked = false; }
    this.applyFilters();
  },

  _updateFilterCount() {
    const countEl = document.getElementById('filterCount');
    if (!countEl) return;
    let count = 0;
    if (this.state.minPrice || this.state.maxPrice) count++;
    if (this.state.minRating > 0) count++;
    if (this.state.onlyNew) count++;
    if (this.state.onlyTrending) count++;
    countEl.textContent  = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
  },

  /* ── LOAD MORE ── */
  loadMore() {
    this.state.flatPage++;
    this.applyFilters();
  },

  /* ── MODAL ── */
  openModal(storeId) {
    const store = STORES_DATA.find(s => s.id === storeId);
    if (!store) return;

    const body = document.getElementById('modalBody');
    if (!body) return;

    const isLiked = this.state.likedStores.has(store.id);

    body.innerHTML = `
      <div class="rh-modal-img">${store.emoji}</div>
      <div class="rh-modal-info">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <h2>${store.name}</h2>
          ${store.badge ? `<span class="rh-card-badge ${store.badgeColor}" style="position:static;">${store.badge}</span>` : ''}
        </div>
        <div class="rh-modal-meta">
          <span>⭐ ${store.rating} (${store.reviewCount} รีวิว)</span>
          <span>•</span>
          <span>📍 ${store.area}, ${store.province}</span>
          <span>•</span>
          <span>${store.category}</span>
        </div>
        <p class="rh-modal-desc">${store.description}</p>
        <div class="rh-modal-tags">
          ${store.tags.map(t => `<span class="rh-tag">${t}</span>`).join('')}
        </div>
        <div class="rh-modal-price-row">
          <div>
            <div class="rh-modal-price-label">ราคาเริ่มต้น</div>
            <div class="rh-modal-price-val">฿${store.priceStart}<small style="font-size:.9rem;font-weight:600;color:var(--text-light)"> / ${store.priceUnit}</small></div>
          </div>
          <div style="text-align:right;">
            <div class="rh-modal-price-label">ไวบ์ที่เหมาะ</div>
            <div style="display:flex;gap:5px;justify-content:flex-end;margin-top:4px;">
              ${store.vibes.map(v => `<span class="rh-tag">#${v}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="rh-modal-actions">
          <button class="btn-primary" onclick="RentHub.bookStore(${store.id})">
            📅 จองคิว / ติดต่อร้าน
          </button>
          <button class="btn-ghost" onclick="RentHub.toggleLikeModal(${store.id})" id="modalLikeBtn">
            ${isLiked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    `;

    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeModal(e) {
    if (e && e.target !== document.getElementById('modalOverlay')) return;
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  bookStore(storeId) {
    const store = STORES_DATA.find(s => s.id === storeId);
    if (!store) return;
    /* Save booking intent to store */
    VibitStore.save('bookingIntent', { storeId, storeName: store.name, ts: Date.now() });
    alert(`✅ บันทึกคิวแล้ว!\n\nร้าน: ${store.name}\nทีมงาน VIBIT จะติดต่อคุณภายใน 24 ชั่วโมง 🙏`);
  },

  /* ── LIKES ── */
  toggleLike(storeId, btn) {
    if (this.state.likedStores.has(storeId)) {
      this.state.likedStores.delete(storeId);
      btn.textContent = '🤍';
      btn.classList.remove('liked');
    } else {
      this.state.likedStores.add(storeId);
      btn.textContent = '❤️';
      btn.classList.add('liked');
    }
    this._saveLikes();
  },

  toggleLikeModal(storeId) {
    const btn = document.getElementById('modalLikeBtn');
    if (!btn) return;
    if (this.state.likedStores.has(storeId)) {
      this.state.likedStores.delete(storeId);
      btn.textContent = '🤍';
    } else {
      this.state.likedStores.add(storeId);
      btn.textContent = '❤️';
    }
    this._saveLikes();
  },

  _saveLikes() {
    VibitStore.save('likedStores', [...this.state.likedStores]);
  },
  _loadLikes() {
    const saved = VibitStore.read('likedStores', []);
    this.state.likedStores = new Set(saved);
  },

  /* ── PROVINCE DROPDOWN ── */
  toggleProvinceDropdown() {
    const dd = document.getElementById('provinceDropdown');
    if (dd) dd.classList.toggle('open');
  },
  closeProvinceDropdown() {
    const dd = document.getElementById('provinceDropdown');
    if (dd) dd.classList.remove('open');
  },

  /* ── FILTER DRAWER ── */
  openFilter() {
    document.getElementById('filterDrawer')?.classList.add('open');
    document.getElementById('drawerOverlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  },
  closeFilter() {
    document.getElementById('filterDrawer')?.classList.remove('open');
    document.getElementById('drawerOverlay')?.classList.remove('open');
    document.body.style.overflow = '';
  },

  /* ── SEARCH BIND (Enter key) ── */
  _bindSearch() {
    const input = document.getElementById('heroSearch');
    if (!input) return;
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.handleHeroSearch();
    });
    input.addEventListener('input', e => {
      if (e.target.value === '') {
        this.state.search = '';
        this.applyFilters();
      }
    });
  },

  _bindQuickProvinces() {
    /* Close dropdown when clicking outside */
    document.addEventListener('click', e => {
      const btn = document.getElementById('locationBtn');
      const dd  = document.getElementById('provinceDropdown');
      if (btn && dd && !btn.contains(e.target) && !dd.contains(e.target)) {
        dd.classList.remove('open');
      }
    });
  },

  /* ── SHOW ALL TRENDING ── */
  showAllTrending() {
    this.state.category = 'all';
    this.state.sort = 'reviews';
    document.getElementById('sortSelect').value = 'reviews';
    this.applyFilters();
    document.getElementById('storeList')?.scrollIntoView({ behavior: 'smooth' });
  },

  showSimilar() {
    this.state.category = 'outfit';
    document.querySelectorAll('.rh-cat-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.key === 'outfit');
    });
    this.applyFilters();
    document.getElementById('storeList')?.scrollIntoView({ behavior: 'smooth' });
  },

  /* ── RE-INIT SCROLL REVEAL ── */
  _reinitReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }
};

/* ── AUTO INIT on DOM ready ── */
function waitAndInit() {
  if (typeof STORES_DATA === 'undefined' || typeof VibitStore === 'undefined') {
    setTimeout(waitAndInit, 50);
    return;
  }
  RentHub.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitAndInit);
} else {
  waitAndInit();
}
