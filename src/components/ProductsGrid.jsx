import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { convertGoogleDriveUrl } from '../utils/address';
import { autoTranslateText } from '../utils/translator';

export default function ProductsGrid() {
  const {
    t, currentLang, currentCategory, setCurrentCategory,
    searchFilterQuery, setSearchFilterQuery,
    getAllProducts, customProductsList, deleteProduct,
    verifyAdminAccess, setActiveModal, setEditingProductId,
    setSelectedRfqProduct, selectedRfqProducts, addRfqProduct, setQuotationProduct, isAdminLoggedIn, activeCompany, openImagePreview,
    productViewMode, setProductViewMode, addToRfqCart, convertPrice, currentCurrency, lastUpdatedProductId, setIsRfqDrawerOpen,
    currentMerchant
  } = useApp();

  const [carouselIndices, setCarouselIndices] = useState({});

  const activeCompId = activeCompany?.id || 'comp_1';
  let defaultTabs = [];

  if (activeCompId === 'comp_4') {
    defaultTabs = [
      { filter: 'all', title: t.tab_all },
      { filter: 'industrial', title: currentLang === 'gu' ? '🔩 ઔદ્યોગિક ઓટોમેશન & ઈલેક્ટ્રોનિક્સ' : '🔩 Industrial Automation & Electronics' },
      { filter: 'packaging', title: currentLang === 'gu' ? '🛍️ ઇકો પેકેજિંગ & જુટ બેગ્સ' : '🛍️ Eco Packaging & Sustainable Materials' },
      { filter: 'new_machinery', title: currentLang === 'gu' ? '🏗️ નવી મશીનરી & સિસ્ટમ્સ' : '🏗️ New Machinery Systems' },
      { filter: 'used_machinery', title: currentLang === 'gu' ? '⚙️ વપરાયેલી ઔદ્યોગિક મશીનરી' : '⚙️ Used Industrial Machinery' }
    ];
  } else if (activeCompId === 'comp_3') {
    defaultTabs = [
      { filter: 'all', title: t.tab_all },
      { filter: 'industrial', title: t.tab_ind },
      { filter: 'new_machinery', title: t.tab_new },
      { filter: 'used_machinery', title: t.tab_used },
      { filter: 'packaging', title: t.tab_eco }
    ];
  } else if (activeCompId === 'comp_2') {
    defaultTabs = [
      { filter: 'all', title: t.tab_all },
      { filter: 'agro', title: t.tab_agro },
      { filter: 'dairy', title: currentLang === 'gu' ? '🥛 ડેરી પ્રોડક્ટ્સ (Dairy Products)' : '🥛 Dairy Products' },
      { filter: 'textiles', title: currentLang === 'gu' ? '🧵 ટેક્ષટાઈલ પ્રોડક્ટ્સ (Surat Textiles)' : '🧵 Textile Products' },
      { filter: 'garments', title: currentLang === 'gu' ? '👕 રેડિ-મેડ ગારમેન્ટ્સ (Garments)' : '👕 Readymade Garments' },
      { filter: 'packaging', title: t.tab_eco }
    ];
  } else {
    defaultTabs = [
      { filter: 'all', title: t.tab_all },
      { filter: 'agro', title: t.tab_agro },
      { filter: 'dairy', title: currentLang === 'gu' ? '🥛 ડેરી પ્રોડક્ટ્સ (Dairy Products)' : '🥛 Dairy Products' },
      { filter: 'textiles', title: currentLang === 'gu' ? '🧵 ટેક્ષટાઈલ પ્રોડક્ટ્સ (Surat Textiles)' : '🧵 Textile Products' },
      { filter: 'garments', title: currentLang === 'gu' ? '👕 રેડિ-મેડ ગારમેન્ટ્સ (Garments)' : '👕 Readymade Garments' },
      { filter: 'used_machinery', title: t.tab_used },
      { filter: 'new_machinery', title: t.tab_new },
      { filter: 'industrial', title: t.tab_ind },
      { filter: 'packaging', title: t.tab_eco }
    ];
  }

  // Deduplicate custom main category tabs for the active company
  const customMains = [];
  const seenCatNames = new Set();
  const defaultFilterSet = new Set(defaultTabs.map(t => t.filter));

  customProductsList.filter(p => (p.companyId || 'comp_1') === activeCompId).forEach(p => {
    const titleEn = (p.names?.en || '').trim();
    const titleGu = (p.names?.gu || '').trim();
    const normTitle = (titleEn || titleGu).toLowerCase();
    const catSlug = (p.category || '').toLowerCase();

    if (!catSlug || defaultFilterSet.has(catSlug)) return;

    if (
      catSlug === 'agro' ||
      catSlug.includes('grain') || catSlug.includes('seed') ||
      normTitle.includes('grains and seeds') || normTitle.includes('grains & seeds') || normTitle.includes('અનાજ')
    ) {
      return;
    }

    if (!seenCatNames.has(catSlug)) {
      seenCatNames.add(catSlug);
      customMains.push(p);
    }
  });

  const allProds = getAllProducts();
  const q = searchFilterQuery.toLowerCase().trim();
  let filtered = currentCategory === 'all' ? allProds : allProds.filter(p => p.category === currentCategory);

  // Filter out pending/rejected seller products for public visitors
  filtered = filtered.filter(p => {
    if (p.isSub) {
      if (p.approvalStatus && p.approvalStatus !== 'approved') {
        if (!isAdminLoggedIn && currentMerchant?.id !== p.merchantId) {
          return false;
        }
      }
    }
    return true;
  });

  if (q) {
    filtered = filtered.filter(p => {
      const titleGu = (p.names.gu || '').toLowerCase();
      const titleEn = (p.names.en || '').toLowerCase();
      const hs = (p.hsCode || '').toLowerCase();
      const specText = (typeof p.spec === 'object' ? Object.values(p.spec).join(' ') : p.spec || '').toLowerCase();
      return titleGu.includes(q) || titleEn.includes(q) || hs.includes(q) || specText.includes(q);
    });
  }

  const handleCarouselMove = (prodId, direction, maxLen) => {
    setCarouselIndices(prev => {
      const current = prev[prodId] || 0;
      let next = direction === 'next' ? current + 1 : current - 1;
      if (next < 0) next = maxLen - 1;
      if (next >= maxLen) next = 0;
      return { ...prev, [prodId]: next };
    });
  };

  const getMainCategoryBadgeTitle = (p) => {
    const catSlug = (p.category || p.parentId || '').toLowerCase();
    const hs = (p.hsCode || '').trim();
    const nameStr = (((p.names && p.names.en) || '') + ' ' + ((p.names && p.names.gu) || '') + ' ' + (p.name || '')).toLowerCase();

    // 1. Check if matching Main Category object exists (where isSub is false)
    const customMain = customProductsList.find(m => !m.isSub && (m.category === p.category || m.id === p.parentId));
    if (customMain) {
      const matchTitle = (customMain.names && typeof customMain.names === 'object')
        ? (customMain.names[currentLang] || customMain.names['en'] || customMain.names['gu'] || '')
        : (customMain.name || '');
      if (matchTitle && matchTitle.trim()) {
        return `🏷️ ${autoTranslateText(matchTitle.trim(), currentLang)}`;
      }
    }

    // 1. Check Agro Commodities & Food / Confectionery Products Group FIRST
    if (catSlug.includes('agro') || nameStr.includes('chocolate') || nameStr.includes('spice') || nameStr.includes('rice') || nameStr.includes('wheat') || nameStr.includes('seed') || nameStr.includes('sugar') || nameStr.includes('food')) {
      if (currentLang === 'gu') return '🏷️ એગ્રો કોમોડિટીઝ & ફૂડ (Agro & Food)';
      if (currentLang === 'hi') return '🏷️ कृषि एवं खाद्य उत्पाद (Agro & Food)';
      if (currentLang === 'fr') return '🏷️ Produits Agricoles & Alimentaires';
      return '🏷️ Agro & Food Products';
    }

    // 2. Garments & Apparel Group
    if (catSlug.includes('garment') || catSlug.includes('apparel') || nameStr.includes('suit') || hs.startsWith('61') || hs.startsWith('62')) {
      if (currentLang === 'gu') return '🏷️ રેડિ-મેડ ગારમેન્ટ્સ (Garments)';
      if (currentLang === 'hi') return '🏷️ रेडीमेड गारमेंट्स';
      if (currentLang === 'fr') return '🏷️ Vêtements Confectionnés';
      return '🏷️ Readymade Garments';
    }

    // 3. Textile & Fabric Products Group
    if (catSlug.includes('textile') || catSlug.includes('fabric') || nameStr.includes('saree') || nameStr.includes('yarn') || nameStr.includes('fabric') || (hs.startsWith('52') && !nameStr.includes('chocolate')) || hs.startsWith('54')) {
      if (currentLang === 'gu') return '🏷️ ટેક્ષટાઈલ પ્રોડક્ટ્સ (Surat Textiles)';
      if (currentLang === 'hi') return '🏷️ कपड़ा उत्पाद (Textiles)';
      if (currentLang === 'fr') return '🏷️ Produits Textiles';
      return '🏷️ Textile Products';
    }

    // 4. Dairy Products Group
    if (catSlug.includes('dairy') || catSlug.includes('ghee') || catSlug.includes('milk') || hs.startsWith('04')) {
      if (currentLang === 'gu') return '🏷️ ડેરી પ્રોડક્ટ્સ (Dairy Products)';
      if (currentLang === 'hi') return '🏷️ डेयरी उत्पाद';
      if (currentLang === 'fr') return '🏷️ Produits Laitiers';
      return '🏷️ Dairy Products';
    }

    // 5. Eco Packaging Group
    if (catSlug.includes('eco') || catSlug.includes('pack') || catSlug.includes('jute') || hs.startsWith('6305')) {
      if (currentLang === 'gu') return '🏷️ ઇકો પેકેજિંગ (Eco Packaging)';
      if (currentLang === 'hi') return '🏷️ इको पैकेजिंग';
      if (currentLang === 'fr') return '🏷️ Emballage Écologique';
      return '🏷️ Eco Packaging';
    }

    // 6. Used Machinery Group
    if (catSlug.includes('used') || catSlug.includes('refurbish')) {
      if (currentLang === 'gu') return '🏷️ જૂની મશીનરી (Used Machinery)';
      if (currentLang === 'hi') return '🏷️ पुरानी मशीनरी';
      if (currentLang === 'fr') return '🏷️ Machines d\'Occasion';
      return '🏷️ Used Machinery';
    }

    // 7. New Machinery Group
    if (catSlug.includes('new') || catSlug.includes('machinery')) {
      if (currentLang === 'gu') return '🏷️ નવી મશીનરી (New Machinery)';
      if (currentLang === 'hi') return '🏷️ नई मशीनरी';
      if (currentLang === 'fr') return '🏷️ Nouvelles Machines';
      return '🏷️ New Machinery';
    }

    // 8. Industrial & Fasteners Group
    if (catSlug.includes('ind') || catSlug.includes('fastener') || catSlug.includes('hardware') || hs.startsWith('73') || hs.startsWith('84')) {
      if (currentLang === 'gu') return '🏷️ ઔદ્યોગિક & ફાસ્ટનર્સ';
      if (currentLang === 'hi') return '🏷️ औद्योगिक और फास्टनरों';
      if (currentLang === 'fr') return '🏷️ Équipements Industriels';
      return '🏷️ Industrial & Fasteners';
    }

    // 9. Agro Commodities Group (Default Fallback)
    if (currentLang === 'gu') return '🏷️ એગ્રો કોમોડિટીઝ (Agro Produce)';
    if (currentLang === 'hi') return '🏷️ कृषि उत्पाद';
    if (currentLang === 'fr') return '🏷️ Produits Agricoles';
    return '🏷️ Agro Commodities';
  };

  return (
    <section className="section" id="products">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t.products_title}</h2>
          <p className="section-subtitle">{t.products_subtitle}</p>

          {/* DEDICATED QUICK ADMIN ACTION BUTTONS */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                padding: '10px 20px',
                fontSize: '0.92rem',
                fontWeight: 800
              }}
              onClick={() => {
                verifyAdminAccess(() => {
                  setEditingProductId(null);
                  setActiveModal('product_sub');
                });
              }}
            >
              📦 + Add Sub-Product (પેટા પ્રોડક્ટ ઉમેરો)
            </button>

            <button
              type="button"
              className="btn-secondary"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                borderColor: 'var(--primary-teal-glow)',
                color: 'white',
                padding: '10px 18px',
                fontSize: '0.92rem',
                fontWeight: 800
              }}
              onClick={() => {
                verifyAdminAccess(() => {
                  setEditingProductId(null);
                  setActiveModal('product_main');
                });
              }}
            >
              🏷️ + Add Main Category (મેઈન પ્રોડક્ટ ઉમેરો)
            </button>
          </div>
        </div>

        {/* Live Filter Search & Multi-View Toolbar */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          <div className="search-filter-box" style={{ flex: 1, margin: 0 }}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search product name, HS code, or specification (Press / to search)..."
              value={searchFilterQuery}
              onChange={(e) => setSearchFilterQuery(e.target.value)}
            />
            <span className="search-shortcut">/</span>
          </div>

          {/* Amazon / Flipkart Style Multi-View Mode Selector */}
          <div className="view-mode-toolbar" style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
            <button
              type="button"
              className={`view-mode-btn ${productViewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setProductViewMode('grid')}
              title="Grid View (Amazon Style)"
            >
              ⊞ Grid
            </button>
            <button
              type="button"
              className={`view-mode-btn ${productViewMode === 'list' ? 'active' : ''}`}
              onClick={() => setProductViewMode('list')}
              title="List View"
            >
              ☰ List
            </button>
            <button
              type="button"
              className={`view-mode-btn ${productViewMode === 'compare' ? 'active' : ''}`}
              onClick={() => setProductViewMode('compare')}
              title="Comparison Table View (Amazon Specs)"
            >
              📊 Compare
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="tab-bar">
          {defaultTabs.map(tab => (
            <button
              key={tab.filter}
              type="button"
              className={`tab-btn ${currentCategory === tab.filter ? 'active' : ''}`}
              onClick={() => setCurrentCategory(tab.filter)}
            >
              {tab.title}
            </button>
          ))}

          {/* Cleaned Custom Category Tabs with Edit & Delete options */}
          {customMains.map(p => {
            const title = p.names[currentLang] || p.names['en'] || p.names['gu'];
            return (
              <button
                key={p.id}
                type="button"
                className={`tab-btn ${currentCategory === p.category ? 'active' : ''}`}
                onClick={() => setCurrentCategory(p.category)}
              >
                <span>{title}</span>
                {isAdminLoggedIn && (
                  <>
                    <span
                      style={{ marginLeft: '6px', opacity: 0.8 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        verifyAdminAccess(() => {
                          setEditingProductId(p.id);
                          setActiveModal('product_main');
                        });
                      }}
                      title={`Edit Category "${title}"`}
                    >
                      ✏️
                    </span>
                    <span
                      className="delete-cat-tab"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(p.id, p.category, title, true);
                      }}
                      title={`Delete Category "${title}"`}
                    >
                      ✖
                    </span>
                  </>
                )}
              </button>
            );
          })}

          {/* Add Sub-Product Action Button inside Tab Bar */}
          <button
            type="button"
            className="btn-primary"
            style={{
              marginLeft: '10px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              fontWeight: 800
            }}
            onClick={() => {
              verifyAdminAccess(() => {
                setEditingProductId(null);
                setActiveModal('product_sub');
              });
            }}
          >
            📦 + Add Sub-Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filtered.length === 0 ? (
            <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🏢</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)' }}>
                {currentLang === 'gu'
                  ? `${activeCompany?.name || 'આ કંપની'} માટે હાલ કોઈ પ્રોડક્ટ ઉમેરાયેલ નથી`
                  : `No Products Added for ${activeCompany?.name || 'this Company'} Yet`}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-sub)', maxWidth: '580px', margin: '10px auto 26px auto', lineHeight: '1.6' }}>
                {currentLang === 'gu'
                  ? `દરેક કંપની નો પોતાનો અલગ પ્રોડક્ટ કેટલોગ છે. ${activeCompany?.name} માટે મેઈન પ્રોડક્ટ્સ અને પેટા પ્રોડક્ટ્સ ઉમેરવા માટે એડમિન લોગીન કરીને નીચેના બટન પર ક્લિક કરો.`
                  : `Each sister company profile maintains its own unique product catalog. Click below to add Main Categories and Sub-Products specifically for ${activeCompany?.name}.`}
              </p>

              {isAdminLoggedIn ? (
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', padding: '10px 22px', fontSize: '0.9rem' }}
                    onClick={() => {
                      verifyAdminAccess(() => {
                        setEditingProductId(null);
                        setActiveModal('product_main');
                      });
                    }}
                  >
                    🏷️ + {currentLang === 'gu' ? 'મેઈન પ્રોડક્ટ (કેટેગરી) ઉમેરો' : 'Add Main Category'}
                  </button>

                  <button
                    type="button"
                    className="btn-primary"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '10px 22px', fontSize: '0.9rem' }}
                    onClick={() => {
                      verifyAdminAccess(() => {
                        setEditingProductId(null);
                        setActiveModal('product_sub');
                      });
                    }}
                  >
                    📦 + {currentLang === 'gu' ? 'પેટા પ્રોડક્ટ (Sub-Product) ઉમેરો' : 'Add Sub-Product'}
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#f59e0b',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}>
                  🔐 {currentLang === 'gu' ? 'પ્રોડક્ટ ઉમેરવા માટે એડમિન લોગીન કરો.' : 'Log in as Admin to add products for this company.'}
                </div>
              )}
            </div>
          ) : (
            filtered.map(p => {
              const enTitle = (p.names && typeof p.names === 'object') ? (p.names['en'] || p.name || '') : (p.name || '');
              const langTitle = (p.names && typeof p.names === 'object') ? (p.names[currentLang] || '') : '';
              const title = (langTitle && currentLang !== 'en' && !langTitle.includes('વુઅલિચય') && !langTitle.includes('પરેમિયમ'))
                ? langTitle
                : autoTranslateText(enTitle || langTitle, currentLang);

              const enSpec = (typeof p.spec === 'object') ? (p.spec['en'] || '') : (typeof p.specifications === 'object' ? p.specifications['en'] : p.spec || '');
              const langSpec = (typeof p.spec === 'object') ? (p.spec[currentLang] || '') : '';
              const specText = (langSpec && currentLang !== 'en' && !langSpec.includes('વુઅલિચય') && !langSpec.includes('પરેમિયમ'))
                ? langSpec
                : autoTranslateText(enSpec || langSpec || 'High Quality Premium Product', currentLang);

              const rawImgs = (p.images && p.images.length > 0) ? p.images : [p.image || 'images/agro_spices_grains.png'];
              const imgs = rawImgs.map(convertGoogleDriveUrl);
              const activeIdx = (carouselIndices[p.id] || 0) % imgs.length;

              return (
                <div key={p.id} className="glass-card product-card" style={{ position: 'relative' }}>
                  <div
                    className="product-img-wrapper"
                    style={{ cursor: 'zoom-in', position: 'relative' }}
                    onClick={() => openImagePreview && openImagePreview({
                      url: imgs[activeIdx],
                      title,
                      hsCode: p.hsCode,
                      category: getMainCategoryBadgeTitle(p),
                      allImages: imgs,
                      activeIndex: activeIdx,
                      productObj: p
                    })}
                    title={currentLang === 'gu' ? '🔍 ઓરિજિનલ ફુલ ફોટો જોવા માટે ક્લિક કરો' : '🔍 Click to view Original Full HD Photo'}
                  >
                    <img
                      src={imgs[activeIdx]}
                      alt={title}
                      className="product-img"
                      onError={(e) => { e.target.src = 'images/agro_spices_grains.png'; }}
                    />
                    <div className="product-img-zoom-overlay">
                      <span>🔍 {currentLang === 'gu' ? 'ઓરિજિનલ ફુલ ફોટો જુઓ' : 'Full HD Photo'}</span>
                    </div>
                    <span className="product-badge">
                      {getMainCategoryBadgeTitle(p)}
                    </span>
                    {p.hsCode && (
                      <span className="product-hs">
                        HS: {p.hsCode}
                      </span>
                    )}

                    {/* Carousel controls */}
                    {imgs.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="carousel-btn carousel-prev"
                          onClick={(e) => { e.stopPropagation(); handleCarouselMove(p.id, 'prev', imgs.length); }}
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className="carousel-btn carousel-next"
                          onClick={(e) => { e.stopPropagation(); handleCarouselMove(p.id, 'next', imgs.length); }}
                        >
                          ›
                        </button>

                        <div className="carousel-dots">
                          {imgs.map((_, i) => (
                            <span
                              key={i}
                              className={`carousel-dot ${i === activeIdx ? 'active' : ''}`}
                              onClick={(e) => { e.stopPropagation(); setCarouselIndices(prev => ({ ...prev, [p.id]: i })); }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="product-content">
                    {p.isSub ? (
                      <span
                        className="sub-product-tag"
                        style={{
                          background: 'rgba(20, 184, 166, 0.15)',
                          color: 'var(--primary-teal-glow)',
                          borderColor: 'rgba(45, 212, 191, 0.3)'
                        }}
                      >
                        📦 {currentLang === 'gu' ? 'એક્સપોર્ટ આઈટમ (Export Item)' : 'Export Item'}
                      </span>
                    ) : (
                      <span
                        className="sub-product-tag"
                        style={{
                          background: 'rgba(245, 158, 11, 0.15)',
                          color: '#f59e0b',
                          borderColor: 'rgba(245, 158, 11, 0.3)'
                        }}
                      >
                        🏷️ Main Category
                      </span>
                    )}

                    <h3 className="product-title">{title}</h3>
                    <p className="product-spec">{specText}</p>

                    {p.isSub && (
                      <div className="product-meta">
                        <div>
                          <strong>{currentLang === 'gu' ? '📦 પેકેજિંગ:' : (currentLang === 'hi' ? '📦 पैकेजिंग:' : (currentLang === 'fr' ? '📦 Emballage:' : '📦 Packaging:'))}</strong>{' '}
                          {autoTranslateText(p.packaging || 'Standard Export Packaging', currentLang)}
                        </div>
                        <div>
                          <strong>{currentLang === 'gu' ? '⚡ ન્યૂનતમ ઓર્ડર (MOQ):' : (currentLang === 'hi' ? '⚡ न्यूनतम ऑर्डर (MOQ):' : (currentLang === 'fr' ? '⚡ Quantité Minimale (MOQ):' : '⚡ MOQ:'))}</strong>{' '}
                          {autoTranslateText(p.moq || '1 Unit / Container', currentLang)}
                        </div>
                        <div>
                          <strong>{currentLang === 'gu' ? '🌐 એચ.એસ. કોડ:' : (currentLang === 'hi' ? '🌐 एचएस कोड:' : (currentLang === 'fr' ? '🌐 Code SH:' : '🌐 HS Code:'))}</strong>{' '}
                          {p.hsCode || 'N/A'}
                        </div>
                      </div>
                    )}

                    {p.merchantName && (
                      <div style={{ marginTop: '6px', background: 'rgba(234, 179, 8, 0.12)', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(234, 179, 8, 0.3)', fontSize: '0.76rem', color: '#facc15', fontWeight: 800 }}>
                        🏬 Supplier: {p.merchantName} <span style={{ color: '#4ade80' }}>⭐ Verified Exporter</span>
                      </div>
                    )}

                    {(!p.isSub && isAdminLoggedIn) && (
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          marginBottom: '10px',
                          fontSize: '0.82rem',
                          background: 'rgba(16, 185, 129, 0.12)',
                          color: '#4ade80',
                          borderColor: 'rgba(34, 197, 94, 0.3)'
                        }}
                        onClick={() => {
                          verifyAdminAccess(() => {
                            setEditingProductId(null);
                            setActiveModal('product_sub');
                          });
                        }}
                      >
                        📦 + Add Sub-Product under this Category
                      </button>
                    )}

                    {/* PRODUCT CARD FOOTER ACTION BUTTONS (STACKED FULL-WIDTH FOR ZERO CLIPPING ON ALL MONITORS) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', paddingTop: '12px' }}>
                      <button
                        type="button"
                        className="btn-primary"
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          padding: '9px 12px',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)'
                        }}
                        onClick={() => {
                          addToRfqCart(p, 1, p.unit || 'MT', 'FOB');
                          setIsRfqDrawerOpen(true);
                        }}
                        title="Add to Wholesale Quote Cart"
                      >
                        {currentLang === 'gu' ? '🛒 ક્વોટ કાર્ટમાં ઉમેરો (RFQ)' : (currentLang === 'hi' ? '🛒 कोट कार्ट में जोड़ें (RFQ)' : (currentLang === 'fr' ? '🛒 Ajouter au Panier' : '🛒 Add to Quote Cart (RFQ)'))}
                      </button>

                      {(() => {
                        const isSelected = (selectedRfqProducts || []).some(sp => sp.id === p.id);

                        return (
                          <button
                            type="button"
                            className="btn-primary"
                            style={{
                              width: '100%',
                              justifyContent: 'center',
                              fontSize: '0.82rem',
                              padding: '8px 12px',
                              whiteSpace: 'nowrap',
                              background: isSelected ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : undefined
                            }}
                            onClick={() => {
                              if (addRfqProduct) addRfqProduct(p);
                              else if (setSelectedRfqProduct) setSelectedRfqProduct(p);
                              const contactSec = document.getElementById('contact');
                              if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                            }}
                            title="Request Quotation (RFQ)"
                          >
                            {isSelected
                              ? (currentLang === 'gu' ? `✔ ક્વોટેશન માં ઉમેરાયું (${selectedRfqProducts.length})` : (currentLang === 'hi' ? `✔ कोटेशन में जोड़ा गया (${selectedRfqProducts.length})` : `✔ Added to RFQ (${selectedRfqProducts.length})`))
                              : (currentLang === 'gu' ? '💬 કોટેશન વિગત જણાવો (RFQ)' : (currentLang === 'hi' ? '💬 कोटेशन अनुरोध (RFQ)' : (currentLang === 'fr' ? '💬 Demander un Devis (RFQ)' : '💬 Request Quotation (RFQ)')))}
                          </button>
                        );
                      })()}

                      <button
                        type="button"
                        className="btn-secondary"
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          color: '#38bdf8',
                          borderColor: 'rgba(56, 189, 248, 0.4)',
                          padding: '7px 12px',
                          fontSize: '0.82rem',
                          fontWeight: 800,
                          whiteSpace: 'nowrap'
                        }}
                        onClick={() => {
                          setQuotationProduct(p);
                          setActiveModal('quotation');
                        }}
                        title="Generate Proforma Invoice / Export Quotation PDF"
                      >
                        {currentLang === 'gu' ? '📄 પ્રોફોર્મા એક્સપોર્ટ ક્વોટ (PDF)' : (currentLang === 'hi' ? '📄 प्रोफॉर्मा निर्यात कोटेशन (PDF)' : (currentLang === 'fr' ? '📄 Devis Proforma Export' : '📄 Proforma Export Quote'))}
                      </button>

                      {/* Admin Action Controls (Only visible when Admin is logged in) */}
                      {isAdminLoggedIn && (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              color: '#facc15',
                              borderColor: 'rgba(250, 204, 21, 0.4)',
                              background: 'rgba(250, 204, 21, 0.1)',
                              padding: '6px 10px',
                              fontSize: '0.78rem',
                              fontWeight: 800
                            }}
                            onClick={() => {
                              verifyAdminAccess(() => {
                                setEditingProductId(p.id);
                                setActiveModal(p.isSub ? 'product_sub' : 'product_main');
                              });
                            }}
                            title={`Edit ${p.isSub ? 'Sub-Product' : 'Main Category'} "${title}"`}
                          >
                            ✏️ Edit Product
                          </button>

                          <button
                            type="button"
                            className="btn-secondary"
                            style={{
                              color: '#f87171',
                              borderColor: 'rgba(239, 68, 68, 0.4)',
                              background: 'rgba(239, 68, 68, 0.1)',
                              padding: '6px 12px',
                              fontSize: '0.78rem',
                              fontWeight: 700
                            }}
                            onClick={() => deleteProduct(p.id, p.category, title, !p.isSub)}
                            title={`Delete "${title}"`}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
