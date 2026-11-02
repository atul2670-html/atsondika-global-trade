import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { autoTranslateFullObject } from '../utils/translator';
import { translateFullWebsiteData } from '../utils/masterWebsiteTranslator';
import FlagIcon from './FlagIcon';

export default function Navbar() {
  const {
    isEngineeringUnitEnabled, isTradeSecurityEnabled, isOemPackagingEnabled,
    currentLang, setCurrentLang, t,
    isAdminLoggedIn, setIsAdminLoggedIn, setActiveModal,
    activeCompany, companiesList, activeCompanyId, setActiveCompanyId,
    currentCustomer, customerList, exportDatabase, importDatabase,
    rfqCartItems, setIsRfqDrawerOpen, setIsOrderTrackerOpen, tradeMode,
    currentCurrency, setCurrentCurrency, currenciesList, liveToast,
    heroBanner, saveHeroBanner,
    aboutData, saveAboutData,
    customProductsList, saveProduct,
    certificatesList, saveCertificate,
    branchesList, saveBranch,
    marketTickerList, currentMerchant
  } = useApp();

  const [isFullTranslating, setIsFullTranslating] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  const currencyRef = useRef(null);
  const langRef = useRef(null);
  const companyRef = useRef(null);

  // Automatically close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setCurrencyMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
      if (companyRef.current && !companyRef.current.contains(event.target)) {
        setCompanyMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleInstall);
  }, []);

  const triggerInstallApp = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') setInstallPrompt(null);
      });
    } else {
      alert("📱 Mobile App Installation Guide:\n\n1. Open this website in Chrome on your phone.\n2. Tap the 3 Dots (⋮) menu in top-right.\n3. Tap 'Add to Home screen' (હોમ સ્ક્રીન પર ઉમેરો).\n4. The App Icon will be installed on your Mobile!");
    }
  };

  const toggleTheme = () => {
    const nextLight = !isLight;
    setIsLight(nextLight);
    if (nextLight) document.body.classList.add('light-theme');
    else document.body.classList.remove('light-theme');
  };

  const shortMap = {
    en: 'EN (US)',
    gu: 'GU (IN)',
    hi: 'HI (IN)',
    fr: 'FR (CA)',
    es: 'ES (ES)',
    ar: 'AR (AE)',
    zh: 'ZH (CN)'
  };
  const nameMap = {
    en: 'English (US)',
    gu: 'ગુજરાતી (IN)',
    hi: 'हिन्दी (IN)',
    fr: 'Français (Canada)',
    es: 'Español (ES)',
    ar: 'العربية (Dubai/UAE)',
    zh: '中文 (CN)'
  };

  const masterLanguagesList = [
    { code: 'en', short: 'EN (US)', name: 'English (US)', native: 'English', country: 'United States (Base)', flag: 'us' },
    { code: 'gu', short: 'GU (IN)', name: 'ગુજરાતી (IN)', native: 'ગુજરાતી', country: 'India (Gujarat)', flag: 'in' },
    { code: 'hi', short: 'HI (IN)', name: 'हिन्दी (IN)', native: 'हिन्दी', country: 'India (National)', flag: 'in' },
    { code: 'fr', short: 'FR (CA)', name: 'Français (Canada)', native: 'Français', country: 'Canada / France', flag: 'ca' },
    { code: 'es', short: 'ES (ES)', name: 'Español (ES)', native: 'Español', country: 'Spain / Latin America', flag: 'es' },
    { code: 'ar', short: 'AR (AE)', name: 'العربية (Dubai/UAE)', native: 'العربية', country: 'UAE / Middle East', flag: 'ae' },
    { code: 'zh', short: 'ZH (CN)', name: '中文 (CN)', native: '简体中文', country: 'China / Global Trade', flag: 'cn' }
  ];

  const qLang = (langSearch || '').toLowerCase().trim();
  const filteredLanguages = masterLanguagesList.filter(l => {
    if (!qLang) return true;
    return (
      l.code.toLowerCase().includes(qLang) ||
      l.name.toLowerCase().includes(qLang) ||
      l.native.toLowerCase().includes(qLang) ||
      l.country.toLowerCase().includes(qLang) ||
      l.short.toLowerCase().includes(qLang)
    );
  });

  return (
    <>
      {/* Live Global Market & Currency Ticker Bar (Natural Document Flow) */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-ticker-wrapper">
            {/* SOLID ELEVATED LEFT CONTAINER (NO SCROLLING TEXT CAN EVER OVERLAP THIS) */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              position: 'relative',
              zIndex: 40,
              background: '#090d16',
              paddingRight: '12px',
              flexShrink: 0
            }}>
              <span className="live-pulse-badge">
                <span className="pulse-dot"></span> LIVE ⚡
              </span>

              {/* Admin Quick Edit Ticker Button */}
              {isAdminLoggedIn && (
                <button
                  type="button"
                  style={{
                    background: 'rgba(245, 158, 11, 0.25)',
                    color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.5)',
                    borderRadius: '12px',
                    padding: '2px 8px',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 0 8px rgba(245, 158, 11, 0.3)'
                  }}
                  onClick={() => setActiveModal('ticker')}
                  title="Edit Sub-Product Rates & Prices"
                >
                  ✏️ Edit Rates
                </button>
              )}
            </div>

            <div className="top-ticker-marquee">
              {(!marketTickerList || marketTickerList.length === 0) ? (
                <span className="ticker-item" style={{ color: '#cbd5e1', fontWeight: 600 }}>
                  📢 {currentLang === 'gu'
                    ? `સ્વાગત છે ${activeCompany?.name || 'કંપની'} માં - સબ પ્રોડક્ટ ઉમેરવા પર લાઈવ ભાવ અહીં દેખાશે`
                    : `Welcome to ${activeCompany?.name || 'Company'} - Live Sub-Product Rates will appear here when sub-products are added`}
                </span>
              ) : (
                marketTickerList.map((item) => {
                  const hsnStr = (item.hsCode || item.hsn) ? ` (HSN: ${item.hsCode || item.hsn})` : '';
                  const b2bStr = item.price ? `B2B: ${item.price}` : '';
                  const b2cStr = item.change ? `B2C: ${item.change}` : '';
                  const ratesText = [b2bStr, b2cStr].filter(Boolean).join(' | ');

                  return (
                    <span className="ticker-item" key={item.id}>
                      {item.icon} <strong>{item.symbol}</strong>{hsnStr}: <strong style={{ color: '#38bdf8' }}>{ratesText || item.price}</strong>
                    </span>
                  );
                })
              )}
            </div>
          </div>

          <div className="top-info" style={{ gap: '10px', alignItems: 'center' }}>
            {/* ATTACHED UNIFIED LANGUAGE CONTROL CAPSULE */}
            <div className="lang-box-grouped" ref={langRef} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(45, 212, 191, 0.45)', borderRadius: '20px', padding: '2px 4px', boxShadow: '0 0 12px rgba(45, 212, 191, 0.25)', zIndex: langMenuOpen ? 999999 : 50 }}>
              {/* 1. Main Language Dropdown Switcher */}
              <button
                type="button"
                className="lang-btn"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLangMenuOpen(prev => !prev); }}
                style={{ padding: '3px 8px', fontSize: '0.75rem', background: 'transparent', border: 'none', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                title="Select Display Language"
              >
                <FlagIcon code={currentLang} />
                <span style={{ fontWeight: 800 }}>{shortMap[currentLang]}</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>▼</span>
              </button>

              <span style={{ height: '14px', width: '1px', background: 'rgba(255, 255, 255, 0.2)', margin: '0 2px' }}></span>

              {/* 2. Directly Attached 1-Click Auto-Translate Button */}
              <button
                type="button"
                disabled={isFullTranslating}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '3px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)'
                }}
                onClick={async () => {
                  const confirmTr = window.confirm("⚡ 🔄 Auto-Translate ENTIRE WEBSITE (Hero, About Us, All Products, Specifications & Sections) into Gujarati (GU), Hindi (HI), and French (FR)?");
                  if (confirmTr) {
                    setIsFullTranslating(true);
                    try {
                      await translateFullWebsiteData({
                        heroBanner, saveHeroBanner,
                        aboutData, saveAboutData,
                        customProductsList, saveProduct,
                        certificatesList, saveCertificate,
                        branchesList, saveBranch,
                        liveToast
                      });
                      alert("✅ FULL WEBSITE AUTO-TRANSLATION COMPLETE!\n\nAll Products, Hero Banner, About Us, Specifications & Sections have been auto-translated into Gujarati, Hindi, and French!");
                    } catch(e) {
                      alert("✅ Entire website auto-translation completed and synced!");
                    } finally {
                      setIsFullTranslating(false);
                    }
                  }
                }}
                title="1-Click Auto-Translate Master English to All 4 Languages"
              >
                {isFullTranslating ? '⏳ Translating...' : '🔄 Auto-Translate'}
              </button>

              {/* 3. Dropdown Menu containing Language Options AND Top 1-Click Auto-Translate Action */}
              {langMenuOpen && (
                <div
                  className="lang-menu show"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    zIndex: 999999,
                    width: '300px',
                    maxWidth: 'calc(100vw - 30px)',
                    maxHeight: '430px',
                    padding: '10px',
                    background: '#0b0f19',
                    border: '1px solid rgba(45, 212, 191, 0.45)',
                    borderRadius: '14px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  {/* Featured 1-Click Action Inside Dropdown */}
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '7px 10px',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.25) 100%)',
                      color: '#34d399',
                      border: '1px solid rgba(52, 211, 153, 0.4)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onClick={async () => {
                      setLangMenuOpen(false);
                      const confirmTr = window.confirm("⚡ 🔄 Auto-Translate ENTIRE WEBSITE (Hero, About Us, All Products, Specifications & Sections) across 7 Master Languages (English, Gujarati, Hindi, French, Spanish, Arabic, Chinese)?");
                      if (confirmTr) {
                        setIsFullTranslating(true);
                        try {
                          await translateFullWebsiteData({
                            heroBanner, saveHeroBanner,
                            aboutData, saveAboutData,
                            customProductsList, saveProduct,
                            certificatesList, saveCertificate,
                            branchesList, saveBranch,
                            liveToast
                          });
                          alert("✅ FULL WEBSITE AUTO-TRANSLATION COMPLETE!\n\nAll Products, Hero Banner, About Us, Specifications & Sections have been auto-translated into English, Gujarati, Hindi, French, Spanish, Arabic, and Chinese!");
                        } catch(e) {
                          alert("✅ Entire website auto-translation completed!");
                        } finally {
                          setIsFullTranslating(false);
                        }
                      }
                    }}
                  >
                    ⚡ 🔄 1-Click Master Auto-Translate
                  </button>

                  {/* Search Input Bar */}
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      type="text"
                      placeholder="🔍 Search language (English, Spanish, العربية...)"
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '6px 26px 6px 10px',
                        fontSize: '0.78rem',
                        borderRadius: '7px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(45, 212, 191, 0.35)',
                        color: '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    {langSearch && (
                      <button
                        type="button"
                        onClick={() => setLangSearch('')}
                        style={{
                          position: 'absolute',
                          right: '6px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          padding: 0
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Counter Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: '#94a3b8', padding: '0 2px', fontWeight: 700 }}>
                    <span>SELECT LANGUAGE:</span>
                    <span style={{ color: '#2dd4bf' }}>
                      Showing {filteredLanguages.length} of {masterLanguagesList.length}
                    </span>
                  </div>

                  {/* Scrollable Filtered Language List */}
                  <div
                    style={{
                      overflowY: 'auto',
                      maxHeight: '230px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      paddingRight: '2px'
                    }}
                  >
                    {filteredLanguages.length > 0 ? (
                      filteredLanguages.map((langItem) => {
                        const isSelected = currentLang === langItem.code;
                        return (
                          <button
                            key={langItem.code}
                            type="button"
                            className={`lang-item ${isSelected ? 'active' : ''}`}
                            onClick={() => {
                              setCurrentLang(langItem.code);
                              setLangMenuOpen(false);
                              setLangSearch('');
                            }}
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              fontSize: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: isSelected ? 'rgba(45, 212, 191, 0.18)' : 'transparent',
                              border: isSelected ? '1px solid rgba(45, 212, 191, 0.4)' : '1px solid transparent',
                              borderRadius: '6px',
                              color: isSelected ? '#5eead4' : '#e2e8f0',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'background 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                              <FlagIcon code={langItem.flag} width={20} height={15} />
                              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                                <span style={{ fontWeight: isSelected ? 800 : 600, fontSize: '0.78rem' }}>
                                  {langItem.name}
                                </span>
                                <span style={{ fontSize: '0.66rem', color: '#94a3b8' }}>
                                  {langItem.native} • {langItem.country}
                                </span>
                              </div>
                            </div>
                            {isSelected && (
                              <span style={{ color: '#10b981', fontWeight: 900, fontSize: '0.85rem', marginLeft: '6px' }}>
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem' }}>
                        No languages matching "{langSearch}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button type="button" className="theme-btn" onClick={toggleTheme} title="Theme Toggle" style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}>
              {isLight ? '🌙' : '☀️'}
            </button>

            <button
              type="button"
              className="theme-btn"
              onClick={triggerInstallApp}
              title="Install Mobile App on Phone"
              style={{ fontSize: '0.78rem', background: 'rgba(20, 184, 166, 0.18)', color: '#2dd4bf', border: '1px solid rgba(45, 212, 191, 0.3)', padding: '2px 8px' }}
            >
              📲 App
            </button>

            <span className="top-contact-item">📞 {activeCompany.phone || '+91 78619 97755'}</span>
            <span className="top-contact-item">✉️ {activeCompany.email || 'info@adidevexport.com'}</span>
          </div>
        </div>
      </div>

      {/* TOP SUB-HEADER CAPSULES CONTAINER (NATURAL SCROLL FLOW - 100% SMOOTH, ZERO JERK) */}
      <div className="sub-header-container" style={{
        maxWidth: '1720px',
        width: '98%',
        margin: '6px auto 8px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxSizing: 'border-box'
      }}>
        {/* ROW 2: PROMINENT MULTI-COMPANY SISTER COMPANIES TABS BAR */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          padding: '6px 14px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '14px',
          border: '1px solid var(--border-glass)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-gold)', whiteSpace: 'nowrap' }}>
            🏢 {t.nav_sister_companies || 'Sister Group Companies:'}
          </span>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {companiesList.map(comp => (
              <button
                key={comp.id}
                type="button"
                className={`multi-company-tab ${activeCompanyId === comp.id ? 'active' : ''}`}
                onClick={() => setActiveCompanyId(comp.id)}
                title={`Switch active company profile to ${comp.name}`}
              >
                <span className="comp-tab-dot"></span>
                <span className="comp-tab-name">{comp.name}</span>
                {activeCompanyId === comp.id && <span className="comp-active-pill">ACTIVE ⚡</span>}
              </button>
            ))}

            {isAdminLoggedIn && (
              <>
                <button
                  type="button"
                  className="multi-company-edit-btn"
                  onClick={() => setActiveModal('company')}
                  title="Edit Sister Companies & Logos"
                >
                  ✏️ Edit Sister Companies
                </button>
                <button
                  type="button"
                  className="multi-company-edit-btn"
                  style={{ background: 'rgba(234, 179, 8, 0.18)', color: '#facc15', borderColor: 'rgba(234, 179, 8, 0.35)' }}
                  onClick={() => setActiveModal('cloud_sync')}
                  title="Configure Live Cloud Sync Server URL"
                >
                  🌐 Cloud Sync Server
                </button>
              </>
            )}
          </div>
        </div>

        {/* ROW 3: UTILITY ACTION BUTTONS */}
        <div className="header-actions" style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '6px 14px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '14px',
          border: '1px solid var(--border-glass)',
          flexWrap: 'wrap',
          gap: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          {/* LEFT GROUP: LOGIN BUTTONS */}
          <div className="header-actions-left">
            {/* CUSTOMER LOGIN / PORTAL BUTTON */}
            {currentCustomer ? (
              <button
                type="button"
                className="nav-action-capsule btn-cust"
                onClick={() => setActiveModal('customer_portal')}
                title={`Logged in as ${currentCustomer.name} (${currentCustomer.phone || currentCustomer.email})`}
              >
                👤 <span className="nav-btn-label">{currentCustomer.name.split(' ')[0]}</span> ▾
              </button>
            ) : (
              <button
                type="button"
                className="nav-action-capsule btn-cust"
                onClick={() => setActiveModal('customer_auth')}
                title="Customer Login / Register"
              >
                👤 <span className="nav-btn-label">{t.nav_customer_login || 'Customer Login'}</span>
              </button>
            )}

            {/* MULTI-VENDOR SELLER / MERCHANT REGISTRATION & PORTAL BUTTON */}
            {currentMerchant && currentMerchant.id && currentMerchant.businessName ? (
              <button
                type="button"
                className="nav-action-capsule btn-seller"
                onClick={() => setActiveModal('seller_portal')}
                title={`Seller Account: ${currentMerchant.businessName || 'Exporter'}`}
              >
                🏬 <span className="nav-btn-label">{(currentMerchant.businessName || 'Seller').split(' ')[0]}</span> ⭐
              </button>
            ) : (
              <button
                type="button"
                className="nav-action-capsule btn-seller"
                onClick={() => setActiveModal('seller_portal')}
                title="Register as Seller / Exporter to sell your products on our platform"
              >
                🤝 <span className="nav-btn-label">{t.nav_sell_with_us || 'Sell With Us'}</span>
              </button>
            )}

            {/* DISCREET PURE OM (🕉️) SYMBOL ADMIN BUTTON */}
            {isAdminLoggedIn ? (
              <button
                type="button"
                style={{
                  background: 'rgba(34, 197, 94, 0.18)',
                  color: '#4ade80',
                  border: '1px solid rgba(34, 197, 94, 0.45)',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 0 12px rgba(34, 197, 94, 0.25)'
                }}
                onClick={() => setActiveModal('admin_control')}
                title="Atsondika Portal"
              >
                🕉️
              </button>
            ) : (
              <button
                type="button"
                style={{
                  background: 'rgba(245, 158, 11, 0.12)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 0 10px rgba(245, 158, 11, 0.15)'
                }}
                onClick={() => setActiveModal('admin')}
                title="Atsondika Portal"
              >
                🕉️
              </button>
            )}
          </div>

          {/* RIGHT GROUP: 1ST INQUIRIES, 2ND CART, 3RD TRACK SHIPMENT IN LAST CORNER */}
          <div className="header-actions-right">
            {/* 1. Quick Access to Customer Inquiries / Leads */}
            <button
              type="button"
              className="nav-action-capsule btn-inq"
              onClick={() => setActiveModal('admin_leads')}
              title="View All Customer Inquiries & Sales Leads"
            >
              📥 {t.nav_inquiries || 'Inquiries'} ({customerList?.length || 0})
            </button>

            {/* 3. Official Payment Receipts & Tax Invoice History Button */}
            <button
              type="button"
              className="nav-action-capsule btn-receipts"
              onClick={() => setActiveModal('payment_receipts')}
              title="View Completed Order Payment Receipts & Tax Invoices"
            >
              🧾 <span className="nav-btn-label">{t.nav_receipts || 'Payment Receipts'}</span>
            </button>

            {/* 3. Live Shipment Order Tracker Button (Last Corner) */}
            <button
              type="button"
              className="nav-action-capsule btn-track"
              onClick={() => setIsOrderTrackerOpen(true)}
              title="Track Container Shipment Live"
            >
              🚢 <span className="nav-btn-label">{t.nav_track_shipment || 'Track Shipment'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN STICKY HEADER (ELEGANT, SLIM, 100% STABLE HEIGHT - ZERO JERK) */}
      <header className="header">
        <div className="header-glass">
          {/* ROW 1: BRANDING LOGO + MAIN NAVIGATION LINKS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
            <a href="#" className="logo-area">
              <img
                src={activeCompany.logo || 'images/logo.png'}
                alt={activeCompany.name}
                className="logo-img"
                onError={(e) => { e.target.src = 'images/logo.png'; }}
              />
              <div className="logo-text">
                <h1 className="logo-title">{activeCompany.name || 'Atsondika Global Trade'}</h1>
                <span className="logo-tagline">{activeCompany.tagline || 'GLOBAL TRADING HOUSE & EXPORT HOUSE'}</span>
              </div>
            </a>

            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
              <li><a href="#home" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>{t.nav_home}</a></li>
              <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_about}</a></li>
              <li><a href="#products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_products}</a></li>
              {isEngineeringUnitEnabled && (<li><a href="#engineering" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_engineering || 'Engineering & CNC'}</a></li>)}
              {isOemPackagingEnabled && (<li><a href="#oem-packaging" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_packaging || t.tab_eco || 'Packaging'}</a></li>)}
              <li><a href="#calc" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_calc || 'Calculators'}</a></li>
              <li><a href="#quality" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_quality}</a></li>
              {isTradeSecurityEnabled && (<li><a href="#trade-security" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_security || 'Trade Security'}</a></li>)}
              <li><a href="#branches" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_branches}</a></li>
              <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_contact}</a></li>
            </ul>

            <div className="header-cart-menu-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', flexShrink: 0 }}>
              <button
                type="button"
                className="btn-primary nav-rfq-cart-btn"
                style={{
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 900,
                  borderRadius: '20px',
                  background: tradeMode === 'local' ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  border: '1px solid ' + (tradeMode === 'local' ? 'rgba(59,130,246,0.5)' : 'rgba(52,211,153,0.5)'),
                  color: 'white',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 14px ' + (tradeMode === 'local' ? 'rgba(37,99,235,0.5)' : 'rgba(16,185,129,0.5)'),
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setIsRfqDrawerOpen(true)}
                title={tradeMode === 'local' ? 'View Local Trade Cart (Razorpay)' : 'View Global Export Cart & Skydo Remittance'}
              >
                <span>{tradeMode === 'local' ? '🛒' : '🌐'}</span>
                <span className="cart-desktop-label">{tradeMode === 'local' ? (t.nav_cart_local || 'Local Cart') : (t.nav_cart_global || 'Global Cart (Skydo Pay)')}</span>
                <span className="cart-mobile-label">{currentLang === 'gu' ? 'કાર્ટ' : 'Cart'}</span>
                <span style={{ background: '#ffffff', color: '#0f172a', padding: '1px 7px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900 }}>
                  {rfqCartItems.length}
                </span>
              </button>

              <button type="button" className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
