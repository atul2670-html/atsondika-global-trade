import './styles/style.css';
import { toUSEnglishAddress } from './utils/address.js';
import { verifyAdminAccess, updateAdminUIState, isAdminLoggedIn } from './utils/admin.js';
import { initialProductsData, defaultBranchOffices, defaultCertificates, translations } from './data/initialData.js';

// --- CURSOR SPOTLIGHT EFFECT ---
function initCursorSpotlight() {
  const spotlight = document.createElement('div');
  spotlight.className = 'cursor-spotlight';
  document.body.appendChild(spotlight);

  document.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

// LocalStorage Persistence
let customBranchesList = [];
try {
  customBranchesList = JSON.parse(localStorage.getItem('site_branches_v1') || 'null');
  if (!customBranchesList || !Array.isArray(customBranchesList)) customBranchesList = [...defaultBranchOffices];
  else customBranchesList = customBranchesList.map(b => ({ ...b, address: toUSEnglishAddress(b.address), person: toUSEnglishAddress(b.person) }));
} catch(e) { customBranchesList = [...defaultBranchOffices]; }

let customCertificatesList = [];
try {
  customCertificatesList = JSON.parse(localStorage.getItem('site_certificates_v2') || 'null');
  if (!customCertificatesList || !Array.isArray(customCertificatesList)) customCertificatesList = [...defaultCertificates];
} catch(e) { customCertificatesList = [...defaultCertificates]; }

let deletedBuiltInIds = [];
try { deletedBuiltInIds = JSON.parse(localStorage.getItem('deleted_built_in_ids') || '[]'); } catch(e) {}

function loadAllCustomProducts() {
  const keys = ['custom_added_products_v6','custom_added_products_master'];
  let combined = [];
  const seenIds = new Set();
  keys.forEach(k => {
    try {
      const items = JSON.parse(localStorage.getItem(k) || '[]');
      if (Array.isArray(items)) {
        items.forEach(it => { if (it && it.id && !seenIds.has(it.id)) { seenIds.add(it.id); combined.push(it); } });
      }
    } catch (e) {}
  });
  return combined;
}

let customProductsList = loadAllCustomProducts();

// DEFAULT LANGUAGE IS ENGLISH ('en')
let currentLang = 'en';

let currentCategory = 'all';
let searchFilterQuery = '';
let carouselIndices = {};
let uploadedImageDataUrls = [];
let uploadedCertFileData = null;
let editingCertId = null;
let editingBranchId = null;
let editingProductId = null;

function getAllProducts() {
  const activeBuiltIn = initialProductsData.filter(p => !deletedBuiltInIds.includes(p.id));
  return [...activeBuiltIn, ...customProductsList];
}

function saveCustomProductsMaster() {
  try {
    localStorage.setItem('custom_added_products_master', JSON.stringify(customProductsList));
    localStorage.setItem('custom_added_products_v6', JSON.stringify(customProductsList));
  } catch (e) {}
}

function saveBranches() {
  try { localStorage.setItem('site_branches_v1', JSON.stringify(customBranchesList)); } catch(e) {}
}

function saveCertificates() {
  try { localStorage.setItem('site_certificates_v2', JSON.stringify(customCertificatesList)); } catch(e) {}
}

function updateParentProductDropdown() {
  const selectEl = document.getElementById('parentProductSelect');
  if (!selectEl) return;
  selectEl.innerHTML = '';

  const allProds = getAllProducts().filter(p => !p.isSub);
  allProds.forEach(p => {
    const title = p.names[currentLang] || p.names['en'] || p.names['gu'];
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `🌿 ${title}`;
    selectEl.appendChild(opt);
  });
}

function renderTabBar() {
  const tabBarContainer = document.getElementById('tabBarContainer');
  if (!tabBarContainer) return;
  tabBarContainer.innerHTML = '';

  const t = translations[currentLang] || translations['en'];

  const defaultTabs = [
    { filter: 'all', title: t.tab_all },
    { filter: 'agro', title: t.tab_agro },
    { filter: 'used_machinery', title: t.tab_used },
    { filter: 'new_machinery', title: t.tab_new },
    { filter: 'industrial', title: t.tab_ind },
    { filter: 'packaging', title: t.tab_eco }
  ];

  defaultTabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = `tab-btn ${currentCategory === tab.filter ? 'active' : ''}`;
    btn.setAttribute('data-filter', tab.filter);
    btn.textContent = tab.title;
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentCategory = e.currentTarget.getAttribute('data-filter') || 'all';
      renderProducts();
    });
    tabBarContainer.appendChild(btn);
  });

  const customMains = customProductsList.filter(p => !p.isSub);
  customMains.forEach(p => {
    const title = p.names[currentLang] || p.names['en'] || p.names['gu'];
    const btn = document.createElement('button');
    btn.className = `tab-btn ${currentCategory === p.category ? 'active' : ''}`;
    btn.setAttribute('data-filter', p.category);
    btn.innerHTML = `<span>${title}</span><span class="delete-cat-tab" data-id="${p.id}" data-cat="${p.category}">✖</span>`;

    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-cat-tab')) {
        e.stopPropagation();
        deleteMainCategoryAndSubItems(p.id, p.category, title);
        return;
      }
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = p.category;
      renderProducts();
    });

    tabBarContainer.appendChild(btn);
  });

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'btn-primary';
  addBtn.style.marginLeft = '10px';
  addBtn.innerHTML = t.btn_add_prod;
  addBtn.addEventListener('click', () => {
    verifyAdminAccess(() => {
      editingProductId = null;
      uploadedImageDataUrls = [];
      renderModalImagePreviews();
      document.getElementById('modalFormTitle').textContent = t.btn_add_prod;
      updateParentProductDropdown();
      const addProductModal = document.getElementById('addProductModal');
      if (addProductModal) addProductModal.classList.add('show');
    });
  });
  tabBarContainer.appendChild(addBtn);
}

function deleteMainCategoryAndSubItems(mainProdId, categoryCode, categoryName) {
  verifyAdminAccess(() => {
    if (confirm(`🗑️ Are you sure you want to delete "${categoryName}" category and all sub-products?`)) {
      if (initialProductsData.some(item => item.id === mainProdId)) {
        deletedBuiltInIds.push(mainProdId);
        localStorage.setItem('deleted_built_in_ids', JSON.stringify(deletedBuiltInIds));
      } else {
        customProductsList = customProductsList.filter(p => p.id !== mainProdId && p.category !== categoryCode && p.parentId !== mainProdId);
        saveCustomProductsMaster();
      }

      currentCategory = 'all';
      renderTabBar();
      renderProducts();
      updateParentProductDropdown();
      alert(`✅ "${categoryName}" deleted successfully!`);
    }
  });
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const t = translations[currentLang] || translations['en'];
  const q = searchFilterQuery.toLowerCase().trim();

  const allProds = getAllProducts();
  let filtered = currentCategory === 'all' ? allProds : allProds.filter(p => p.category === currentCategory);

  if (q) {
    filtered = filtered.filter(p => {
      const titleGu = (p.names.gu || '').toLowerCase();
      const titleEn = (p.names.en || '').toLowerCase();
      const hs = (p.hsCode || '').toLowerCase();
      const specText = (typeof p.spec === 'object' ? Object.values(p.spec).join(' ') : p.spec || '').toLowerCase();
      return titleGu.includes(q) || titleEn.includes(q) || hs.includes(q) || specText.includes(q);
    });
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 50px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">No Products Found</h3>
        <p style="font-size: 0.9rem; color: var(--text-sub); margin-top: 6px;">Try searching another keyword or select All Products tab.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const title = p.names[currentLang] || p.names['en'] || p.names['gu'];
    const specText = (typeof p.spec === 'object') ? (p.spec[currentLang] || p.spec['en'] || p.spec['gu']) : p.spec;

    const card = document.createElement('div');
    card.className = 'glass-card product-card';

    const imgs = (p.images && p.images.length > 0) ? p.images : [p.image || 'images/agro_spices_grains.png'];
    if (carouselIndices[p.id] === undefined) carouselIndices[p.id] = 0;
    const activeIdx = carouselIndices[p.id] % imgs.length;

    const actionBtnsHtml = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
        <button type="button" class="btn-secondary edit-custom-prod" data-id="${p.id}" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); font-size: 0.8rem; font-weight: 700;">
          ${t.btn_edit}
        </button>
        <button type="button" class="btn-secondary delete-custom-prod" data-id="${p.id}" data-issub="${p.isSub || false}" data-cat="${p.category}" data-title="${title}" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border-color: rgba(239, 68, 68, 0.3); font-size: 0.8rem; font-weight: 700;">
          ${t.btn_delete}
        </button>
      </div>
    `;

    const subTagHtml = p.isSub ? `<span class="sub-product-tag">${t.tag_sub}</span>` : `<span class="sub-product-tag" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border-color: rgba(245, 158, 11, 0.3);">${t.tag_main}</span>`;
    const addSubBtnOnCardHtml = !p.isSub ? `<button type="button" class="btn-primary add-sub-on-card" data-id="${p.id}" style="background: linear-gradient(135deg, #2563eb, #3b82f6); width: 100%; justify-content: center; margin-top: 8px; font-size: 0.85rem;">${t.btn_add_sub_card}</button>` : '';

    const hasMultipleImgs = imgs.length > 1;
    const carouselControlsHtml = hasMultipleImgs ? `
      <button type="button" class="carousel-btn carousel-prev" data-id="${p.id}">❮</button>
      <button type="button" class="carousel-btn carousel-next" data-id="${p.id}">❯</button>
      <div class="carousel-dots">${imgs.map((_, i) => `<span class="carousel-dot ${i === activeIdx ? 'active' : ''}" data-id="${p.id}" data-idx="${i}"></span>`).join('')}</div>
    ` : '';

    card.innerHTML = `
      <div class="product-img-wrapper" id="wrapper-${p.id}">
        <img src="${imgs[activeIdx]}" alt="${title}" class="product-img" id="img-${p.id}" onerror="this.src='images/agro_spices_grains.png';">
        <span class="product-badge">${p.isSub ? 'SUB-VARIANT' : 'MAIN CATEGORY'}</span>
        <span class="product-hs">HS: ${p.hsCode}</span>
        ${carouselControlsHtml}
      </div>
      <div class="product-content">
        ${subTagHtml}
        <h3 class="product-title">${title}</h3>
        <p class="product-spec">${specText}</p>
        <div class="product-meta">
          <div><strong>Packaging:</strong> ${p.packaging}</div>
          <div><strong>MOQ:</strong> <span style="color: var(--accent-gold); font-weight: 800;">${p.moq}</span></div>
        </div>
        <button type="button" class="btn-primary open-quote-modal" style="width: 100%; justify-content: center; margin-top: auto;">
          ${t.btn_inquire}
        </button>
        ${addSubBtnOnCardHtml}
        ${actionBtnsHtml}
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.open-quote-modal').forEach(btn => btn.addEventListener('click', openQuoteModal));
  grid.querySelectorAll('.add-sub-on-card').forEach(btn => btn.addEventListener('click', e => openSubProductModalForParent(e.currentTarget.getAttribute('data-id'))));
  grid.querySelectorAll('.edit-custom-prod').forEach(btn => btn.addEventListener('click', e => verifyAdminAccess(() => openEditProductModal(e.currentTarget.getAttribute('data-id')))));
  grid.querySelectorAll('.delete-custom-prod').forEach(btn => btn.addEventListener('click', e => deleteMainCategoryAndSubItems(e.currentTarget.getAttribute('data-id'), e.currentTarget.getAttribute('data-cat'), e.currentTarget.getAttribute('data-title'))));
}

function openSubProductModalForParent(parentId) {
  verifyAdminAccess(() => {
    editingProductId = null; uploadedImageDataUrls = []; renderModalImagePreviews();
    const t = translations[currentLang] || translations['en'];
    document.getElementById('modalFormTitle').textContent = t.btn_add_sub_card;
    updateParentProductDropdown();
    const newProdType = document.getElementById('newProdType');
    if (newProdType) newProdType.value = 'sub';
    document.getElementById('parentProductGroup').style.display = 'block';
    document.getElementById('subProductExtraFields').style.display = 'block';
    document.getElementById('parentProductSelect').value = parentId;
    document.getElementById('addProductModal').classList.add('show');
  });
}

function openEditProductModal(prodId) {
  const p = getAllProducts().find(item => item.id === prodId);
  if (!p) return;
  editingProductId = prodId;
  const t = translations[currentLang] || translations['en'];
  document.getElementById('modalFormTitle').textContent = t.btn_edit;
  updateParentProductDropdown();
  document.getElementById('newProdType').value = p.isSub ? 'sub' : 'main';
  document.getElementById('newProdNameGu').value = p.names['gu'] || '';
  document.getElementById('newProdNameEn').value = p.names['en'] || '';
  
  if (p.isSub || p.spec) {
    document.getElementById('parentProductGroup').style.display = p.isSub ? 'block' : 'none';
    document.getElementById('subProductExtraFields').style.display = 'block';
    document.getElementById('parentProductSelect').value = p.parentId || '';
    document.getElementById('newProdHsCode').value = p.hsCode || '';
    document.getElementById('newProdMoq').value = p.moq || '';
    document.getElementById('newProdSpec').value = (typeof p.spec === 'object') ? (p.spec[currentLang] || p.spec['en']) : p.spec;
    document.getElementById('newProdPackaging').value = p.packaging || '';
    uploadedImageDataUrls = (p.images && p.images.length > 0) ? [...p.images] : [p.image || 'images/agro_spices_grains.png'];
    renderModalImagePreviews();
  }
  document.getElementById('addProductModal').classList.add('show');
}

function renderModalImagePreviews() {
  const container = document.getElementById('imagePreviewContainer');
  if (!container) return;
  container.innerHTML = '';
  uploadedImageDataUrls.forEach((dataUrl, idx) => {
    const thumb = document.createElement('div');
    thumb.style.position = 'relative'; thumb.style.width = '70px'; thumb.style.height = '70px'; thumb.style.borderRadius = '10px'; thumb.style.overflow = 'hidden'; thumb.style.border = '2px solid var(--primary-teal-glow)';
    thumb.innerHTML = `<img src="${dataUrl}" style="width:100%; height:100%; object-fit:cover;"><button type="button" style="position:absolute; top:2px; right:2px; background:rgba(239,68,68,0.95); color:white; border:none; border-radius:50%; width:22px; height:22px; font-size:12px; cursor:pointer; font-weight:bold;">&times;</button>`;
    thumb.querySelector('button').addEventListener('click', () => { uploadedImageDataUrls.splice(idx, 1); renderModalImagePreviews(); });
    container.appendChild(thumb);
  });
}

function renderBranches() {
  const grid = document.getElementById('branchGrid');
  if (!grid) return; grid.innerHTML = '';
  const t = translations[currentLang] || translations['en'];

  customBranchesList.forEach(b => {
    const card = document.createElement('div');
    card.className = 'glass-card branch-card';
    const cleanAddress = toUSEnglishAddress(b.address);
    const cleanPerson = toUSEnglishAddress(b.person || 'Branch Manager');

    card.innerHTML = `
      <div>
        <div class="branch-card-header">
          <span class="branch-icon">🏢</span>
          <div class="branch-name">${b.city}</div>
        </div>
        <div class="branch-item"><strong>👤 Contact Person:</strong> ${cleanPerson}</div>
        <div class="branch-item"><strong>📞 Phone:</strong> ${b.phone || '+91 78619 97755'}</div>
        <div class="branch-item"><strong>✉️ Email:</strong> ${b.email || 'info@adidevexport.com'}</div>
        <div class="branch-item us-en-address" style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--border-glass);">
          <strong style="color: var(--primary-teal-glow);">📍 Address (US English):</strong><br>${cleanAddress}
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px;">
        <button type="button" class="btn-secondary edit-branch-btn" data-id="${b.id}" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); font-size: 0.8rem; font-weight: 700;">${t.btn_edit}</button>
        <button type="button" class="btn-secondary delete-branch-btn" data-id="${b.id}" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border-color: rgba(239, 68, 68, 0.3); font-size: 0.8rem; font-weight: 700;">${t.btn_delete}</button>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.edit-branch-btn').forEach(btn => btn.addEventListener('click', e => verifyAdminAccess(() => openEditBranchModal(e.currentTarget.getAttribute('data-id')))));
  grid.querySelectorAll('.delete-branch-btn').forEach(btn => btn.addEventListener('click', e => {
    const id = e.currentTarget.getAttribute('data-id');
    verifyAdminAccess(() => {
      customBranchesList = customBranchesList.filter(item => item.id !== id);
      saveBranches(); renderBranches(); alert(`✅ Branch Office Deleted!`);
    });
  }));
}

function openEditBranchModal(branchId) {
  const b = customBranchesList.find(item => item.id === branchId);
  if (!b) return;
  editingBranchId = branchId;
  document.getElementById('branchModalTitle').textContent = '✏️ Edit Branch Office (Admin Mode)';
  document.getElementById('branchCityInput').value = b.city || '';
  document.getElementById('branchPersonInput').value = b.person || '';
  document.getElementById('branchPhoneInput').value = b.phone || '';
  document.getElementById('branchEmailInput').value = b.email || '';
  document.getElementById('branchAddressInput').value = toUSEnglishAddress(b.address) || '';
  document.getElementById('branchModal').classList.add('show');
}

function renderCertificates() {
  const grid = document.getElementById('certGrid');
  if (!grid) return; grid.innerHTML = '';
  const t = translations[currentLang] || translations['en'];

  customCertificatesList.forEach(c => {
    const card = document.createElement('div');
    card.className = 'glass-card cert-card';
    const fileBadge = c.fileUrl ? (c.fileType === 'pdf' ? '📄 PDF Document' : '🖼️ Image Certificate') : '';

    card.innerHTML = `
      <div>
        <span class="cert-icon">${c.icon || '📜'}</span>
        <div class="cert-title">${c.title}</div>
        <div class="cert-reg">${c.reg}</div>
        ${fileBadge ? `<span style="display:inline-block; margin-top:8px; background:rgba(20, 184, 166, 0.15); color:var(--primary-teal-glow); font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:20px; border:1px solid rgba(45, 212, 191, 0.3);">${fileBadge}</span>` : ''}
      </div>
      <div>
        <button type="button" class="btn-primary view-cert-btn" data-id="${c.id}" style="width: 100%; justify-content: center; margin-top: 14px; font-size: 0.85rem;">
          👁️ View Certificate
        </button>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px;">
          <button type="button" class="btn-secondary edit-cert-btn" data-id="${c.id}" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); font-size: 0.78rem; font-weight: 700;">${t.btn_edit}</button>
          <button type="button" class="btn-secondary delete-cert-btn" data-id="${c.id}" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border-color: rgba(239, 68, 68, 0.3); font-size: 0.78rem; font-weight: 700;">${t.btn_delete}</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.view-cert-btn').forEach(btn => btn.addEventListener('click', e => openViewCertModal(e.currentTarget.getAttribute('data-id'))));
  grid.querySelectorAll('.edit-cert-btn').forEach(btn => btn.addEventListener('click', e => verifyAdminAccess(() => openEditCertModal(e.currentTarget.getAttribute('data-id')))));
  grid.querySelectorAll('.delete-cert-btn').forEach(btn => btn.addEventListener('click', e => {
    const id = e.currentTarget.getAttribute('data-id');
    verifyAdminAccess(() => { customCertificatesList = customCertificatesList.filter(item => item.id !== id); saveCertificates(); renderCertificates(); });
  }));
}

function openViewCertModal(certId) {
  const c = customCertificatesList.find(item => item.id === certId);
  if (!c) return;
  document.getElementById('viewCertTitle').textContent = `📜 ${c.title}`;
  document.getElementById('viewCertReg').textContent = c.reg || 'Official Government Certificate';
  const body = document.getElementById('viewCertBody');
  const adminDownloadArea = document.getElementById('adminCertDownloadArea');
  const dlBtn = document.getElementById('downloadCertBtn');
  body.innerHTML = '';

  const fileUrl = c.fileUrl || 'images/hero_export_shipping.png';
  const fileType = c.fileType || (fileUrl.endsWith('.pdf') || fileUrl.startsWith('data:application/pdf') ? 'pdf' : 'image');

  if (adminDownloadArea && dlBtn) {
    if (isAdminLoggedIn) {
      adminDownloadArea.style.display = 'flex';
      dlBtn.href = fileUrl;
      dlBtn.setAttribute('download', `${c.title.replace(/\s+/g, '_')}_Certificate`);
    } else {
      adminDownloadArea.style.display = 'none';
    }
  }

  if (fileType === 'pdf') {
    body.innerHTML = `<div style="position: relative; width: 100%; height: 440px; overflow: hidden; border-radius: 12px; border: 1px solid var(--border-glass);"><iframe src="${fileUrl}#toolbar=0&navpanes=0&scrollbar=0" style="width: 100%; height: 100%; border: none;"></iframe></div>`;
  } else {
    body.innerHTML = `<div style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; user-select: none;" oncontextmenu="return false;"><img src="${fileUrl}" alt="${c.title}" style="max-width: 100%; max-height: 420px; object-fit: contain; border-radius: 12px; box-shadow: var(--shadow-glass);" draggable="false" oncontextmenu="return false;"><div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;" oncontextmenu="return false;"></div></div>`;
  }
  document.getElementById('viewCertModal').classList.add('show');
}

function openEditCertModal(certId) {
  const c = customCertificatesList.find(item => item.id === certId);
  if (!c) return;
  editingCertId = certId;
  document.getElementById('certTitleInput').value = c.title || '';
  document.getElementById('certRegInput').value = c.reg || '';
  document.getElementById('certIconSelect').value = c.icon || '📜';
  document.getElementById('certModal').classList.add('show');
}

function updateContainerCalculator() {
  const prodSelect = document.getElementById('calcProduct');
  const containerSelect = document.getElementById('calcContainerType');
  const tonnageInput = document.getElementById('calcTonnage');
  if (!prodSelect || !containerSelect || !tonnageInput) return;

  const opt = prodSelect.options[prodSelect.selectedIndex];
  const unitWeight = parseFloat(opt.getAttribute('data-weight') || 25);
  const unitCbm = parseFloat(opt.getAttribute('data-cbm') || 0.04);
  const contOpt = containerSelect.options[containerSelect.selectedIndex];
  const maxWeight = parseFloat(contOpt.getAttribute('data-max-weight') || 26);
  const maxCbm = parseFloat(contOpt.getAttribute('data-max-cbm') || 33);
  const tonnage = parseFloat(tonnageInput.value || 20);

  const bagsCount = Math.round((tonnage * 1000) / unitWeight);
  const totalCbm = (bagsCount * unitCbm).toFixed(1);
  const maxPercent = Math.min(100, Math.max(((tonnage / maxWeight) * 100), ((totalCbm / maxCbm) * 100))).toFixed(1);

  document.getElementById('calcResultUnits').textContent = `${bagsCount} Units / Bags`;
  document.getElementById('calcResultCbm').textContent = `${totalCbm} CBM`;
  document.getElementById('calcResultPercent').textContent = `${maxPercent}% Capacity Full`;
  const barFill = document.getElementById('calcBarFill');
  if (barFill) barFill.style.width = `${maxPercent}%`;
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  const flagMap = { en: '🇬🇧', gu: '🇮🇳', hi: '🇮🇳', fr: '🇫🇷' };
  const nameMap = { en: 'English', gu: 'ગુજરાતી', hi: 'हिन्दी', fr: 'Français' };

  const currentFlag = document.getElementById('currentFlag');
  const currentLangName = document.getElementById('currentLangName');
  if (currentFlag) currentFlag.textContent = flagMap[lang] || '🇬🇧';
  if (currentLangName) currentLangName.textContent = nameMap[lang] || 'English';
  
  document.querySelectorAll('.lang-item').forEach(item => item.classList.toggle('active', item.dataset.lang === lang));

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });

  renderTabBar(); renderProducts(); renderCertificates(); renderBranches(); updateParentProductDropdown();
}

function openQuoteModal() {
  alert("💬 ADIDEV SMART SOLUTION\n\nTo request a quotation, please fill out the RFQ form or contact us via WhatsApp at 📞 +91 78619 97755.");
}

// APP INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initCursorSpotlight();

  // DEFAULT TO ENGLISH ('en')
  setLanguage('en');

  // Light/Dark Theme Switcher
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-theme');
      themeBtn.textContent = '🌙';
    }
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // Live Search
  const searchInput = document.getElementById('liveSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => { searchFilterQuery = e.target.value; renderProducts(); });
    document.addEventListener('keydown', e => { if (e.key === '/' && document.activeElement !== searchInput) { e.preventDefault(); searchInput.focus(); } });
  }

  // Calculator
  ['calcProduct', 'calcContainerType', 'calcTonnage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.addEventListener('change', updateContainerCalculator); el.addEventListener('input', updateContainerCalculator); }
  });

  const calcQuoteBtn = document.getElementById('calcQuoteBtn');
  if (calcQuoteBtn) {
    calcQuoteBtn.addEventListener('click', () => {
      const rfqMsg = document.getElementById('rfqMsg');
      if (rfqMsg) rfqMsg.value = `[Container Calculation Estimate]\nVolume: ${document.getElementById('calcTonnage').value} MT (${document.getElementById('calcResultUnits').textContent}, ${document.getElementById('calcResultCbm').textContent})`;
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // AI Drawer
  const floatingBtn = document.getElementById('floatingWidgetBtn');
  const aiDrawer = document.getElementById('aiChatDrawer');
  const closeAiBtn = document.getElementById('closeAiChatBtn');
  if (floatingBtn && aiDrawer) floatingBtn.addEventListener('click', () => aiDrawer.classList.toggle('show'));
  if (closeAiBtn && aiDrawer) closeAiBtn.addEventListener('click', () => aiDrawer.classList.remove('show'));

  document.querySelectorAll('.quick-inquiry-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const msg = e.currentTarget.getAttribute('data-msg');
      window.open(`https://wa.me/917861997755?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });

  // Animated Numbers
  const statBoxes = document.querySelectorAll('.stat-number');
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target') || '0');
          let count = 0; const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            count += step;
            if (count >= target) { count = target; clearInterval(timer); }
            entry.target.textContent = count.toLocaleString() + '+';
          }, 40);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statBoxes.forEach(box => observer.observe(box));
  }

  // Language Menu
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', e => { e.stopPropagation(); langMenu.classList.toggle('show'); });
    document.addEventListener('click', () => langMenu.classList.remove('show'));
    document.querySelectorAll('.lang-item').forEach(item => item.addEventListener('click', e => { setLanguage(e.currentTarget.getAttribute('data-lang')); langMenu.classList.remove('show'); }));
  }

  // Modals & Form Handlers
  const openAddBranchBtn = document.getElementById('openAddBranchBtn');
  const branchModal = document.getElementById('branchModal');
  const branchModalClose = document.getElementById('branchModalClose');
  const branchForm = document.getElementById('branchForm');

  if (openAddBranchBtn && branchModal) openAddBranchBtn.addEventListener('click', () => verifyAdminAccess(() => { editingBranchId = null; if (branchForm) branchForm.reset(); branchModal.classList.add('show'); }));
  if (branchModalClose && branchModal) branchModalClose.addEventListener('click', () => branchModal.classList.remove('show'));
  if (branchForm) {
    branchForm.addEventListener('submit', e => {
      e.preventDefault();
      const city = document.getElementById('branchCityInput').value.trim();
      const rawPerson = document.getElementById('branchPersonInput').value.trim() || 'Branch Representative';
      const phone = document.getElementById('branchPhoneInput').value.trim() || '+91 78619 97755';
      const email = document.getElementById('branchEmailInput').value.trim() || 'info@adidevexport.com';
      const rawAddress = document.getElementById('branchAddressInput').value.trim();
      if (!city || !rawAddress) return;

      const address = toUSEnglishAddress(rawAddress);
      const person = toUSEnglishAddress(rawPerson);

      if (editingBranchId) {
        const target = customBranchesList.find(item => item.id === editingBranchId);
        if (target) { target.city = city; target.person = person; target.phone = phone; target.email = email; target.address = address; }
        editingBranchId = null;
      } else {
        customBranchesList.push({ id: `branch_${Date.now()}`, city, person, phone, email, address });
      }
      saveBranches(); renderBranches(); branchForm.reset(); branchModal.classList.remove('show');
    });
  }

  // Certificate Modal
  const triggerCertFileBtn = document.getElementById('triggerCertFileBtn');
  const certFileInput = document.getElementById('certFileInput');
  const certFilePreview = document.getElementById('certFilePreview');

  if (triggerCertFileBtn && certFileInput) {
    triggerCertFileBtn.addEventListener('click', () => certFileInput.click());
    certFileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = evt => {
        const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
        uploadedCertFileData = { url: evt.target.result, type: isPdf ? 'pdf' : 'image' };
        if (certFilePreview) certFilePreview.textContent = `✅ Uploaded: ${file.name}`;
      };
      reader.readAsDataURL(file);
    });
  }

  const openAddCertBtn = document.getElementById('openAddCertBtn');
  const certModal = document.getElementById('certModal');
  const certModalClose = document.getElementById('certModalClose');
  const certForm = document.getElementById('certForm');

  if (openAddCertBtn && certModal) openAddCertBtn.addEventListener('click', () => verifyAdminAccess(() => { editingCertId = null; uploadedCertFileData = null; if (certForm) certForm.reset(); certModal.classList.add('show'); }));
  if (certModalClose && certModal) certModalClose.addEventListener('click', () => certModal.classList.remove('show'));
  const viewCertModalClose = document.getElementById('viewCertModalClose');
  const viewCertModal = document.getElementById('viewCertModal');
  if (viewCertModalClose && viewCertModal) viewCertModalClose.addEventListener('click', () => viewCertModal.classList.remove('show'));

  if (certForm) {
    certForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('certTitleInput').value.trim();
      const reg = document.getElementById('certRegInput').value.trim() || 'Official Registration';
      const icon = document.getElementById('certIconSelect').value || '📜';
      if (!title) return;
      const fileUrl = uploadedCertFileData ? uploadedCertFileData.url : 'images/hero_export_shipping.png';
      const fileType = uploadedCertFileData ? uploadedCertFileData.type : 'image';

      if (editingCertId) {
        const target = customCertificatesList.find(item => item.id === editingCertId);
        if (target) { target.title = title; target.reg = reg; target.icon = icon; target.fileUrl = fileUrl; target.fileType = fileType; }
        editingCertId = null;
      } else {
        customCertificatesList.push({ id: `cert_${Date.now()}`, title, reg, icon, fileUrl, fileType });
      }
      saveCertificates(); renderCertificates(); certForm.reset(); certModal.classList.remove('show');
    });
  }

  // Admin Login
  const adminAuthBtn = document.getElementById('adminAuthBtn');
  const adminModal = document.getElementById('adminModal');
  const adminModalClose = document.getElementById('adminModalClose');
  const adminForm = document.getElementById('adminForm');

  if (adminAuthBtn && adminModal) adminAuthBtn.addEventListener('click', () => { if (isAdminLoggedIn) alert('🔓 Admin is already active!'); else adminModal.classList.add('show'); });
  if (adminModalClose && adminModal) adminModalClose.addEventListener('click', () => adminModal.classList.remove('show'));
  if (adminForm) {
    adminForm.addEventListener('submit', e => {
      e.preventDefault();
      const pin = document.getElementById('adminPin').value.trim();
      if (pin === '1234' || pin === 'admin123' || pin === '7861997755') {
        updateAdminUIState(); alert('🔓 Admin Mode Unlocked!'); adminModal.classList.remove('show');
      } else alert('⚠️ Incorrect Password! Try 1234.');
    });
  }

  // Product Add / Edit
  const imageFileInput = document.getElementById('imageFileInput');
  const triggerCameraBtn = document.getElementById('triggerCameraBtn');
  if (triggerCameraBtn && imageFileInput) {
    triggerCameraBtn.addEventListener('click', () => imageFileInput.click());
    imageFileInput.addEventListener('change', e => {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = evt => { uploadedImageDataUrls.push(evt.target.result); renderModalImagePreviews(); };
        reader.readAsDataURL(file);
      });
    });
  }

  const addProductModal = document.getElementById('addProductModal');
  const addProductModalClose = document.getElementById('addProductModalClose');
  const addProductForm = document.getElementById('addProductForm');
  const newProdType = document.getElementById('newProdType');

  if (newProdType) {
    newProdType.addEventListener('change', e => {
      const type = e.target.value;
      document.getElementById('parentProductGroup').style.display = type === 'sub' ? 'block' : 'none';
      document.getElementById('subProductExtraFields').style.display = type === 'sub' ? 'block' : 'none';
      updateParentProductDropdown();
    });
  }
  if (addProductModalClose && addProductModal) addProductModalClose.addEventListener('click', () => addProductModal.classList.remove('show'));

  if (addProductForm) {
    addProductForm.addEventListener('submit', e => {
      e.preventDefault();
      const prodType = document.getElementById('newProdType').value;
      const nameGu = document.getElementById('newProdNameGu').value.trim();
      const nameEn = document.getElementById('newProdNameEn').value.trim();
      if (!nameGu) return;

      let hsCode = '000000', spec = 'Premium Export Product', packaging = 'Export Packing', moq = '1 Unit';
      let imgList = uploadedImageDataUrls.length ? [...uploadedImageDataUrls] : ['images/agro_spices_grains.png'];

      if (prodType === 'sub') {
        hsCode = document.getElementById('newProdHsCode').value.trim() || '520811';
        spec = document.getElementById('newProdSpec').value.trim() || 'Premium Export Material';
        packaging = document.getElementById('newProdPackaging').value.trim() || 'Export Packing';
        moq = document.getElementById('newProdMoq').value.trim() || '1 Container';
      }

      let category = `cat-custom-${Date.now()}`, parentId = null;
      if (prodType === 'sub') {
        parentId = document.getElementById('parentProductSelect').value;
        const parentProd = getAllProducts().find(p => p.id === parentId);
        if (parentProd) category = parentProd.category;
      }

      if (editingProductId) {
        let targetProd = customProductsList.find(p => p.id === editingProductId);
        if (!targetProd) {
          const builtIn = initialProductsData.find(p => p.id === editingProductId);
          if (builtIn) { targetProd = JSON.parse(JSON.stringify(builtIn)); customProductsList.push(targetProd); }
        }
        if (targetProd) {
          targetProd.isSub = prodType === 'sub';
          targetProd.names.gu = nameGu; targetProd.names.en = nameEn || nameGu;
          targetProd.hsCode = hsCode; targetProd.spec = spec; targetProd.packaging = packaging; targetProd.moq = moq;
          targetProd.images = imgList; targetProd.image = imgList[0];
        }
      } else {
        customProductsList.push({
          id: `prod-${Date.now()}`, category, parentId, isSub: prodType === 'sub', hsCode, image: imgList[0], images: imgList,
          names: { gu: nameGu, en: nameEn || nameGu, hi: nameGu, fr: nameEn || nameGu }, spec, packaging, moq, isCustom: true
        });
      }
      saveCustomProductsMaster(); renderTabBar(); renderProducts(); addProductForm.reset(); addProductModal.classList.remove('show');
    });
  }

  // RFQ Form
  const rfqForm = document.getElementById('rfqForm');
  if (rfqForm) {
    rfqForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('rfqName').value.trim();
      alert(`✅ Thank you ${name}! Your quotation request has been submitted successfully.`); rfqForm.reset();
    });
  }

  // Mobile Menu
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
});
