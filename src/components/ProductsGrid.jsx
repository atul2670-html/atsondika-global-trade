import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { convertGoogleDriveUrl } from '../utils/address';
import { autoTranslateText } from '../utils/translator';

export default function ProductsGrid() {
  const {
    t, currentLang, currentCategory, setCurrentCategory,
    searchFilterQuery, setSearchFilterQuery, tradeMode, setTradeMode,
    getAllProducts, customProductsList, deleteProduct,
    verifyAdminAccess, setActiveModal, setEditingProductId,
    setSelectedRfqProduct, selectedRfqProducts, addRfqProduct, setQuotationProduct, isAdminLoggedIn, activeCompany, openImagePreview,
    productViewMode, setProductViewMode, addToRfqCart, convertPrice, currentCurrency, lastUpdatedProductId, setIsRfqDrawerOpen,
    currentMerchant
  } = useApp();

  const [carouselIndices, setCarouselIndices] = useState({});
  const [hoveredTab, setHoveredTab] = useState(null);

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

  const getSubProductsForCategory = (catFilter) => {
    if (!catFilter || catFilter === 'all') return [];
    return allProds.filter(p => {
      if (p.category === catFilter || p.parentId === catFilter) return true;
      const normTitle = (((p.names?.en || '') + ' ' + (p.names?.gu || '') + ' ' + (p.name || '')).toLowerCase());
      if (normTitle.includes('chocolate') || normTitle.includes('sweet') || normTitle.includes('confectionery')) {
        if (catFilter === 'dairy' || catFilter === 'agro') return true;
      }
      return false;
    });
  };
  const q = searchFilterQuery.toLowerCase().trim();
  let filtered = currentCategory === 'all'
    ? allProds
    : allProds.filter(p => {
        if (p.category === currentCategory) return true;
        const normTitle = (((p.names?.en || '') + ' ' + (p.names?.gu || '') + ' ' + (p.name || '')).toLowerCase());
        // Chocolates & Confectionery belong to both 'dairy' and 'agro' tabs!
        if (normTitle.includes('chocolate') || normTitle.includes('sweet') || normTitle.includes('confectionery')) {
          if (currentCategory === 'dairy' || currentCategory === 'agro') return true;
        }
        return false;
      });

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

          {/* Global Trade B2B vs Local Trade B2C Selector Pill Switcher */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            margin: '20px auto 10px auto',
            background: 'rgba(15, 23, 42, 0.75)',
            padding: '6px',
            borderRadius: '50px',
            border: '1px solid var(--border-glass)',
            maxWidth: '520px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
          }}>
            <button
              type="button"
              onClick={() => setTradeMode('global')}
              style={{
                flex: 1,
                padding: '10px 18px',
                borderRadius: '50px',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                background: tradeMode === 'global' ? 'linear-gradient(135deg, #00d2ff 0%, #0086ff 100%)' : 'transparent',
                border: 'none',
                color: 'white',
                boxShadow: tradeMode === 'global' ? '0 4px 18px rgba(0, 210, 255, 0.4)' : 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              🌐 {currentLang === 'gu' ? 'ગ્લોબલ ટ્રેડ (B2B Export)' : 'Global Trade (B2B Export)'}
            </button>

            <button
              type="button"
              onClick={() => setTradeMode('local')}
              style={{
                flex: 1,
                padding: '10px 18px',
                borderRadius: '50px',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                background: tradeMode === 'local' ? 'linear-gradient(135deg, #ff9900 0%, #e67e22 100%)' : 'transparent',
                border: 'none',
                color: 'white',
                boxShadow: tradeMode === 'local' ? '0 4px 18px rgba(255, 153, 0, 0.4)' : 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              🛍️ {currentLang === 'gu' ? 'લોકલ ટ્રેડ (B2C E-Commerce)' : 'Local Trade (B2C Retail)'}
            </button>
          </div>

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

        {/* Tab Bar with Sub-Product Hover Mega Menu Dropdown */}
        <div className="tab-bar" style={{ position: 'relative', zIndex: 1000, overflow: 'visible' }}>
          {defaultTabs.map(tab => {
            const subProds = getSubProductsForCategory(tab.filter);
            const isHovered = hoveredTab === tab.filter && subProds.length > 0;

            return (
              <div
                key={tab.filter}
                style={{ position: 'relative', display: 'inline-block', zIndex: isHovered ? 9999 : 1 }}
                onMouseEnter={() => setHoveredTab(tab.filter)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <button
                  type="button"
                  className={`tab-btn ${currentCategory === tab.filter ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentCategory(tab.filter);
                    setSearchFilterQuery('');
                  }}
                >
                  {tab.title}
                  {subProds.length > 0 && <span style={{ fontSize: '0.68rem', marginLeft: '6px', opacity: 0.75 }}>▼</span>}
                </button>

                {/* SUB-PRODUCTS MEGA DROPDOWN POPUP ON HOVER */}
                {isHovered && (
                  <div
                    className="sub-product-hover-dropdown"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      zIndex: 99999,
                      minWidth: '290px',
                      maxWidth: '350px',
                      background: '#090d16',
                      border: '2px solid var(--primary-teal-glow)',
                      borderRadius: '14px',
                      padding: '10px',
                      boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 30px rgba(45, 212, 191, 0.4)',
                      maxHeight: '340px',
                      overflowY: 'auto'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', color: '#facc15', fontWeight: 800, padding: '4px 6px 8px 6px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>📦 {subProds.length} {currentLang === 'gu' ? 'પ્રોડક્ટ્સ (ક્લિક કરો)' : 'Products (Click to View)'}</span>
                      <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>⚡ Quick Select</span>
                    </div>

                    {subProds.map(subP => {
                      const enTitle = (subP.names && typeof subP.names === 'object') ? (subP.names['en'] || subP.name || '') : (subP.name || '');
                      const langTitle = (subP.names && typeof subP.names === 'object') ? (subP.names[currentLang] || '') : '';
                      const subTitle = (langTitle && currentLang !== 'en' && !langTitle.includes('વુઅલિચય'))
                        ? langTitle
                        : autoTranslateText(enTitle || langTitle, currentLang);
                      const thumb = convertGoogleDriveUrl((subP.images && subP.images[0]) || subP.image || 'images/agro_spices_grains.png');

                      return (
                        <div
                          key={subP.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentCategory(tab.filter);
                            setSearchFilterQuery(enTitle || subTitle);
                            setHoveredTab(null);
                            setTimeout(() => {
                              const el = document.getElementById(`prod-card-${subP.id}`);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '6px 8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            marginBottom: '4px',
                            background: searchFilterQuery.toLowerCase() === (enTitle || subTitle).toLowerCase() ? 'rgba(45, 212, 191, 0.25)' : 'transparent',
                            border: '1px solid transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(45, 212, 191, 0.25)';
                            e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          <img src={thumb} alt={subTitle} style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                          <div style={{ overflow: 'hidden' }}>
                            <strong style={{ display: 'block', fontSize: '0.82rem', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {subTitle}
                            </strong>
                            <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>
                              HS: {subP.hsCode || '090931'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Cleaned Custom Category Tabs with Edit & Delete options */}
          {customMains.map(p => {
            const title = p.names[currentLang] || p.names['en'] || p.names['gu'];
            const subProds = getSubProductsForCategory(p.category);
            const isHovered = hoveredTab === p.category && subProds.length > 0;

            return (
              <div
                key={p.id}
                style={{ position: 'relative', display: 'inline-block', zIndex: isHovered ? 9999 : 1 }}
                onMouseEnter={() => setHoveredTab(p.category)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <button
                  type="button"
                  className={`tab-btn ${currentCategory === p.category ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentCategory(p.category);
                    setSearchFilterQuery('');
                  }}
                >
                  <span>{title}</span>
                  {subProds.length > 0 && <span style={{ fontSize: '0.68rem', marginLeft: '4px', opacity: 0.75 }}>▼</span>}
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

                {/* SUB-PRODUCTS HOVER DROPDOWN FOR CUSTOM CATEGORIES */}
                {isHovered && (
                  <div
                    className="sub-product-hover-dropdown"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      zIndex: 99999,
                      minWidth: '290px',
                      maxWidth: '350px',
                      background: '#090d16',
                      border: '2px solid var(--primary-teal-glow)',
                      borderRadius: '14px',
                      padding: '10px',
                      boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 30px rgba(45, 212, 191, 0.4)',
                      maxHeight: '340px',
                      overflowY: 'auto'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', color: '#facc15', fontWeight: 800, padding: '4px 6px 8px 6px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>📦 {subProds.length} {currentLang === 'gu' ? 'પ્રોડક્ટ્સ (ક્લિક કરો)' : 'Products (Click to View)'}</span>
                      <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>⚡ Quick Select</span>
                    </div>

                    {subProds.map(subP => {
                      const enTitle = (subP.names && typeof subP.names === 'object') ? (subP.names['en'] || subP.name || '') : (subP.name || '');
                      const langTitle = (subP.names && typeof subP.names === 'object') ? (subP.names[currentLang] || '') : '';
                      const subTitle = (langTitle && currentLang !== 'en' && !langTitle.includes('વુઅલિચય'))
                        ? langTitle
                        : autoTranslateText(enTitle || langTitle, currentLang);
                      const thumb = convertGoogleDriveUrl((subP.images && subP.images[0]) || subP.image || 'images/agro_spices_grains.png');

                      return (
                        <div
                          key={subP.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentCategory(p.category);
                            setSearchFilterQuery(enTitle || subTitle);
                            setHoveredTab(null);
                            setTimeout(() => {
                              const el = document.getElementById(`prod-card-${subP.id}`);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '6px 8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            marginBottom: '4px',
                            background: searchFilterQuery.toLowerCase() === (enTitle || subTitle).toLowerCase() ? 'rgba(45, 212, 191, 0.25)' : 'transparent',
                            border: '1px solid transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(45, 212, 191, 0.25)';
                            e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          <img src={thumb} alt={subTitle} style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                          <div style={{ overflow: 'hidden' }}>
                            <strong style={{ display: 'block', fontSize: '0.82rem', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {subTitle}
                            </strong>
                            <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>
                              HS: {subP.hsCode || '090931'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
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

        {/* Products Grid / List / Compare Container */}
        {productViewMode === 'compare' && filtered.length > 0 ? (
          <div style={{ overflowX: 'auto', background: 'rgba(15, 23, 42, 0.85)', borderRadius: '16px', border: '1px solid var(--border-glass)', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', margin: '16px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '2px solid var(--primary-teal)' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{currentLang === 'gu' ? 'પ્રોડક્ટ નામ' : 'Product Image & Title'}</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{currentLang === 'gu' ? 'કેટેગરી / વિભાગ' : 'Category'}</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{currentLang === 'gu' ? 'કિંમત (Price)' : 'Price / MRP'}</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>{currentLang === 'gu' ? 'HS Code & સ્પેસિફિકેશન' : 'HS Code & Specs'}</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>{currentLang === 'gu' ? 'એક્શન' : 'Action'}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, idx) => {
                  const enTitle = (p.names && typeof p.names === 'object') ? (p.names['en'] || p.name || '') : (p.name || '');
                  const langTitle = (p.names && typeof p.names === 'object') ? (p.names[currentLang] || '') : '';
                  const title = (langTitle && currentLang !== 'en' && !langTitle.includes('વુઅલિચય') && !langTitle.includes('પરેમિયમ'))
                    ? langTitle
                    : autoTranslateText(enTitle || langTitle, currentLang);
                  const basePriceInr = p.localPrice || (p.priceInr ? parseFloat(p.priceInr) : 499 + ((idx + 1) * 160));
                  const formattedPrice = tradeMode === 'local' ? (convertPrice ? convertPrice(basePriceInr) : '₹' + basePriceInr) : (p.priceUSD ? convertPrice(p.priceUSD) : 'On Request');
                  const mrpInr = Math.round(basePriceInr * 1.32);

                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={convertGoogleDriveUrl((p.images && p.images[0]) || p.image || 'images/agro_spices_grains.png')} alt={title} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div>
                          <strong style={{ display: 'block', color: 'white', fontSize: '0.92rem' }}>{title}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#facc15' }}>★★★★☆ (4.8 / 5)</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>{getMainCategoryBadgeTitle(p)}</td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 900, color: '#4ade80', fontSize: '1rem' }}>{formattedPrice}</div>
                        {tradeMode === 'local' && (
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                            M.R.P: {convertPrice ? convertPrice(mrpInr) : '₹' + mrpInr}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                        <div>HS Code: <b style={{ color: '#38bdf8' }}>{p.hsCode || '090931'}</b></div>
                        <div style={{ opacity: 0.85, fontSize: '0.75rem', marginTop: '2px' }}>{p.specifications?.en || 'High Export Quality'}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        {tradeMode === 'local' ? (
                          <button
                            type="button"
                            onClick={() => {
                              addToRfqCart(p, 1, 'pcs');
                              setIsRfqDrawerOpen(true);
                            }}
                            style={{ background: 'linear-gradient(135deg, #ff9900, #e67e22)', color: '#000', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}
                          >
                            🛒 Add to Cart
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              addToRfqCart(p, 1, 'MT');
                              setIsRfqDrawerOpen(true);
                            }}
                            style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}
                          >
                            📲 Request Quote
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={`products-grid ${productViewMode === 'list' ? 'view-list' : ''}`}>
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
            filtered.map((p, idx) => {
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

              {/* LOCAL TRADE B2C E-COMMERCE CARD DESIGN (Matching Screenshots 3 & 4) */}
              if (tradeMode === 'local') {
                const basePriceInr = p.localPrice || (p.priceInr ? parseFloat(p.priceInr) : 499 + ((idx + 1) * 160));
                const mrpInr = Math.round(basePriceInr * 1.32);
                const discountPct = Math.round(((mrpInr - basePriceInr) / mrpInr) * 100);
                const couponPay = Math.round(basePriceInr * 0.94);
                const rating = (4.3 + (idx % 6) * 0.1).toFixed(1);
                const reviews = (150 + idx * 132).toLocaleString();

                return (
                  <div key={p.id} id={`prod-card-${p.id}`} className="local-b2c-card" style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    border: '1px solid rgba(229, 231, 235, 0.8)',
                    transition: 'all 0.25s ease'
                  }}>
                    {/* Top Rank Ribbon Badge (#1, #2, #3...) matching Screenshot 3 & 4 */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 10,
                      background: 'linear-gradient(135deg, #e67e22, #d35400)',
                      color: '#ffffff',
                      fontSize: '0.74rem',
                      fontWeight: 900,
                      padding: '4px 14px 4px 10px',
                      clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}>
                      #{idx + 1}
                    </div>

                    {/* Top Bestseller Badge */}
                    {(idx < 3 || p.isBestseller) && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        zIndex: 10,
                        background: '#c45500',
                        color: '#ffffff',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        Best seller
                      </div>
                    )}

                    {/* Image Container with Watch Badge Overlay */}
                    <div
                      style={{
                        background: '#ffffff',
                        padding: '20px 16px 14px 16px',
                        height: '210px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f3f4f6'
                      }}
                      onClick={() => openImagePreview && openImagePreview({
                        url: imgs[activeIdx],
                        title,
                        hsCode: p.hsCode,
                        category: getMainCategoryBadgeTitle(p),
                        allImages: imgs,
                        activeIndex: activeIdx,
                        productObj: p
                      })}
                    >
                      <img
                        src={imgs[activeIdx]}
                        alt={title}
                        style={{ maxHeight: '175px', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                        onError={(e) => { e.target.src = 'images/agro_spices_grains.png'; }}
                      />

                      {/* Watch Badge Overlay matching Screenshot 3 */}
                      <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        background: 'rgba(255,255,255,0.92)',
                        border: '1px solid #d5d9d9',
                        borderRadius: '20px',
                        padding: '2px 8px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#0F1111',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <span style={{ fontSize: '0.6rem', color: '#0086ff' }}>▶</span> Watch
                      </div>
                    </div>

                    {/* Product Content Body */}
                    <div style={{ padding: '14px 16px 16px 16px', display: 'flex', flexDirection: 'column', flex: 1, background: '#ffffff', color: '#0F1111' }}>
                      {/* Title */}
                      <h4 style={{
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        color: '#007185',
                        margin: '0 0 6px 0',
                        lineHeight: 1.35,
                        height: '2.7em',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        cursor: 'pointer'
                      }}>
                        {title}
                      </h4>

                      {/* Ratings & Reviews Stars Bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <div style={{ color: '#de7921', fontSize: '0.78rem', fontWeight: 800 }}>
                          ★★★★☆ <span style={{ color: '#007185', fontWeight: 700, marginLeft: '2px' }}>{rating}</span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#565959' }}>
                          ({reviews})
                        </span>
                        <span style={{
                          fontSize: '0.65rem',
                          background: '#e7f4e8',
                          color: '#007600',
                          border: '1px solid #c2e2c5',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontWeight: 700
                        }}>
                          🟢 100% Natural
                        </span>
                      </div>

                      {/* Price Section matching Screenshots 3 & 4 */}
                      <div style={{ margin: '4px 0 8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F1111' }}>
                            {convertPrice ? convertPrice(basePriceInr, 'INR') : `₹${basePriceInr.toLocaleString()}`}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: '#565959' }}>
                            ({convertPrice ? convertPrice(Math.round(basePriceInr / 5), 'INR') : `₹${Math.round(basePriceInr / 5)}`}/100 g)
                          </span>
                          <span style={{ fontSize: '0.74rem', color: '#565959', textDecoration: 'line-through' }}>
                            M.R.P.: {convertPrice ? convertPrice(mrpInr, 'INR') : `₹${mrpInr.toLocaleString()}`}
                          </span>
                          <span style={{ fontSize: '0.76rem', color: '#CC0C39', fontWeight: 800 }}>
                            ({discountPct}% off)
                          </span>
                        </div>

                        {/* Coupon Savings Badge */}
                        <div style={{ fontSize: '0.7rem', color: '#007600', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2px 6px', borderRadius: '4px', marginTop: '4px', fontWeight: 700, display: 'inline-block' }}>
                          <span style={{ background: '#007600', color: 'white', padding: '0 4px', borderRadius: '2px', marginRight: '4px', fontSize: '0.62rem' }}>You pay</span>
                          {convertPrice ? convertPrice(couponPay, 'INR') : `₹${couponPay.toLocaleString()}`} with coupon
                        </div>

                        {/* Delivery Tag matching Screenshots 3 & 4 */}
                        <div style={{ fontSize: '0.72rem', color: '#0F1111', marginTop: '6px', fontWeight: 600 }}>
                          <span style={{ color: '#007600', fontWeight: 800 }}>FREE delivery</span> <b>Fri, 4 Sept</b>
                        </div>
                      </div>

                      {/* Amazon/Flipkart Style Yellow "Add to Cart" Button */}
                      <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            addToRfqCart(p, 1, 'pcs', 'LOCAL');
                            setIsRfqDrawerOpen(true);
                          }}
                          style={{
                            width: '100%',
                            background: '#ffd814',
                            border: '1px solid #fcd200',
                            borderRadius: '20px',
                            color: '#0F1111',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            padding: '8px 16px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(213, 217, 217, 0.5)',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseOver={(e) => e.target.style.background = '#f7ca00'}
                          onMouseOut={(e) => e.target.style.background = '#ffd814'}
                        >
                          {currentLang === 'gu' ? '🛒 અત્યારે ખરીદો / કાર્ટમાં ઉમેરો' : 'Add to cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={p.id} id={`prod-card-${p.id}`} className="glass-card product-card" style={{ position: 'relative' }}>
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

                    {/* PRODUCT CARD FOOTER ACTION BUTTONS (DIRECT B2B BULK DEAL & PROFORMA QUOTE) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', paddingTop: '12px' }}>

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
        )}
      </div>
    </section>
  );
}
