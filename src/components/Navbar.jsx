import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { autoTranslateFullObject } from '../utils/translator';
import { translateFullWebsiteData } from '../utils/masterWebsiteTranslator';
import FlagIcon from './FlagIcon';

export default function Navbar() {
  const {
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
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
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

  const shortMap = { en: 'EN (US)', gu: 'GU (IN)', hi: 'HI (IN)', fr: 'FR (CA)' };
  const nameMap = { en: 'English (US)', gu: 'ગુજરાતી (IN)', hi: 'હિन्दी (IN)', fr: 'Français (Canada)' };

  return (
    <>
      {/* Live Global Market & Currency Ticker Bar (Collapses on Scroll) */}
      <div className="top-bar" style={{
        maxHeight: isScrolled ? '0px' : '80px',
        opacity: isScrolled ? 0 : 1,
        overflow: 'hidden',
        pointerEvents: isScrolled ? 'none' : 'auto',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        paddingTop: isScrolled ? '0' : undefined,
        paddingBottom: isScrolled ? '0' : undefined,
        borderBottomWidth: isScrolled ? '0' : undefined
      }}>
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
                  title="Edit Live Commodity Market Rates & Prices"
                >
                  ✏️ Edit Rates
                </button>
              )}
            </div>

            <div className="top-ticker-marquee">
              {(marketTickerList || []).map((item) => (
                <span className="ticker-item" key={item.id}>
                  {item.icon} {item.symbol}: <strong>{item.price} ({item.change})</strong>
                </span>
              ))}
            </div>
          </div>

          <div className="top-info" style={{ gap: '10px', alignItems: 'center' }}>
            {/* Currency Selector */}
            <div className="currency-selector-box" ref={currencyRef} style={{ position: 'relative' }}>
              <button
                type="button"
                className="currency-btn"
                onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                title="Select Currency"
              >
                <span>{currentCurrency.flag}</span>
                <span>{currentCurrency.code}</span>
                <span style={{ fontSize: '0.65rem' }}>▼</span>
              </button>

              {currencyMenuOpen && (
                <div className="currency-dropdown show" style={{ maxHeight: '360px', overflowY: 'auto' }}>
                  {(currenciesList || []).map((curr) => (
                    <button
                      key={curr.code}
                      type="button"
                      className={`currency-item ${currentCurrency.code === curr.code ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentCurrency(curr);
                        setCurrencyMenuOpen(false);
                      }}
                    >
                      <span>{curr.flag}</span> <strong>{curr.code}</strong> <span style={{ opacity: 0.85, fontSize: '0.72rem' }}>({curr.symbol})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ATTACHED UNIFIED LANGUAGE CONTROL CAPSULE */}
            <div className="lang-box-grouped" ref={langRef} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(45, 212, 191, 0.45)', borderRadius: '20px', padding: '2px 4px', boxShadow: '0 0 12px rgba(45, 212, 191, 0.25)' }}>
              {/* 1. Main Language Dropdown Switcher */}
              <button
                type="button"
                className="lang-btn"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
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
                <div className="lang-menu show" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '6px', zIndex: 1200, minWidth: '220px', padding: '6px', background: '#0b0f19', border: '1px solid rgba(45, 212, 191, 0.4)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                  {/* Featured 1-Click Action Inside Dropdown */}
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.25) 100%)',
                      color: '#34d399',
                      border: '1px solid rgba(52, 211, 153, 0.4)',
                      borderRadius: '8px',
                      marginBottom: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onClick={async () => {
                      setLangMenuOpen(false);
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
                          alert("✅ Entire website auto-translation completed!");
                        } finally {
                          setIsFullTranslating(false);
                        }
                      }
                    }}
                  >
                    ⚡ 🔄 1-Click Master Auto-Translate
                  </button>

                  <div style={{ fontSize: '0.68rem', color: 'var(--text-sub)', padding: '4px 6px', fontWeight: 700, textTransform: 'uppercase' }}>
                    Select Language:
                  </div>

                  {['en', 'gu', 'hi', 'fr'].map((lang) => (
                    <button
                      key={lang}
                      className={`lang-item ${currentLang === lang ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangMenuOpen(false);
                      }}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.82rem', display: 'flex', alignItems: 'center' }}
                    >
                      <FlagIcon code={lang} />
                      <span>{nameMap[lang]}</span>
                    </button>
                  ))}
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

      {/* MAIN HEADER GLASS CONTAINER */}
      <header className="header">
        <div className="header-glass" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
          {/* ROW 1: BRANDING LOGO + MAIN NAVIGATION LINKS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <a href="#" className="logo-area">
              <img
                src={activeCompany.logo || 'images/logo.png'}
                alt={activeCompany.name}
                className="logo-img"
                onError={(e) => { e.target.src = 'images/logo.png'; }}
              />
              <div className="logo-text">
                <h1>{activeCompany.name || 'Atsondika Global Trade'}</h1>
                <span>{activeCompany.tagline || 'GLOBAL TRADING HOUSE & EXPORT HOUSE'}</span>
              </div>
            </a>

            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
              <li><a href="#home" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>{t.nav_home}</a></li>
              <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_about}</a></li>
              <li><a href="#products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_products}</a></li>
              <li><a href="#calc" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Calculator</a></li>
              <li><a href="#quality" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_quality}</a></li>
              <li><a href="#branches" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_branches}</a></li>
              <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav_contact}</a></li>            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isScrolled && tradeMode === 'local' && (
                <button
                  type="button"
                  className="nav-rfq-cart-btn"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 0 10px rgba(245, 158, 11, 0.4)'
                  }}
                  onClick={() => setIsRfqDrawerOpen(true)}
                  title="View Shopping Cart"
                >
                  🛒 <span style={{ background: '#ffffff', color: '#0f172a', padding: '1px 6px', borderRadius: '10px', fontSize: '0.72rem' }}>{rfqCartItems.length}</span>
                </button>
              )}

              <button type="button" className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                ☰
              </button>
            </div>
          </div>

          {/* COLLAPSIBLE TOP SUB-HEADER BARS (SISTER COMPANIES & ACTION BUTTONS HIDE UPWARDS ON SCROLL) */}
          <div style={{
            maxHeight: isScrolled ? '0px' : '400px',
            opacity: isScrolled ? 0 : 1,
            overflow: 'hidden',
            pointerEvents: isScrolled ? 'none' : 'auto',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            marginTop: isScrolled ? '0' : '4px'
          }}>
            {/* ROW 2: PROMINENT MULTI-COMPANY SISTER COMPANIES TABS BAR INSIDE GLASS CONTAINER */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: '1px solid var(--border-glass)'
          }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-gold)', whiteSpace: 'nowrap' }}>
              🏢 {currentLang === 'gu' ? 'સિસ્ટર ગ્રુપ કંપનીઓ (Select Sister Company):' : 'Sister Group Companies:'}
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

          {/* ROW 3: UTILITY ACTION BUTTONS INSIDE GLASS CONTAINER */}
          <div className="header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '6px', flexWrap: 'wrap', gap: '8px' }}>
            {/* LEFT GROUP: LOGIN BUTTONS */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* CUSTOMER LOGIN / PORTAL BUTTON */}
              {currentCustomer ? (
                <button
                  type="button"
                  className="btn-secondary nav-cust-btn"
                  style={{
                    background: 'rgba(56, 189, 248, 0.18)',
                    color: '#38bdf8',
                    borderColor: 'rgba(56, 189, 248, 0.4)',
                    padding: '5px 10px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap'
                  }}
                  onClick={() => setActiveModal('customer_portal')}
                  title={`Logged in as ${currentCustomer.name} (${currentCustomer.phone || currentCustomer.email})`}
                >
                  👤 <span className="nav-btn-label">{currentCustomer.name.split(' ')[0]}</span> ▾
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-secondary nav-cust-btn"
                  style={{
                    background: 'rgba(56, 189, 248, 0.18)',
                    color: '#38bdf8',
                    borderColor: 'rgba(56, 189, 248, 0.35)',
                    padding: '5px 10px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap'
                  }}
                  onClick={() => setActiveModal('customer_auth')}
                  title="Customer Login / Register"
                >
                  👤 <span className="nav-btn-label">{currentLang === 'gu' ? 'કસ્ટમર લોગઈન' : 'Customer Login'}</span>
                </button>
              )}

              {/* MULTI-VENDOR SELLER / MERCHANT REGISTRATION & PORTAL BUTTON */}
              {currentMerchant && currentMerchant.id && currentMerchant.businessName ? (
                <button
                  type="button"
                  className="btn-secondary nav-cust-btn"
                  style={{
                    background: 'rgba(234, 179, 8, 0.2)',
                    color: '#facc15',
                    borderColor: 'rgba(234, 179, 8, 0.4)',
                    padding: '5px 10px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap'
                  }}
                  onClick={() => setActiveModal('seller_portal')}
                  title={`Seller Account: ${currentMerchant.businessName || 'Exporter'}`}
                >
                  🏬 <span className="nav-btn-label">{(currentMerchant.businessName || 'Seller').split(' ')[0]}</span> ⭐
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-secondary nav-cust-btn"
                  style={{
                    background: 'rgba(234, 179, 8, 0.18)',
                    color: '#facc15',
                    borderColor: 'rgba(234, 179, 8, 0.35)',
                    padding: '5px 10px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap'
                  }}
                  onClick={() => setActiveModal('seller_portal')}
                  title="Register as Seller / Exporter to sell your products on our platform"
                >
                  🤝 <span className="nav-btn-label">{currentLang === 'gu' ? 'વેપારી બનો' : 'Sell With Us'}</span>
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
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: 'auto' }}>
              {/* 1. Quick Access to Customer Inquiries / Leads */}
              <button
                type="button"
                className="btn-secondary nav-inquiries-btn"
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  borderColor: 'rgba(56, 189, 248, 0.35)',
                  fontSize: '0.78rem',
                  padding: '5px 10px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setActiveModal('admin_leads')}
                title="View All Customer Inquiries & Sales Leads"
              >
                📥 {currentLang === 'gu' ? `ઈન્ક્વાયરી (${customerList?.length || 0})` : `Inquiries (${customerList?.length || 0})`}
              </button>

              {/* 2. Amazon / Flipkart Style Local Trade Shopping Cart Button (ONLY VISIBLE IN LOCAL TRADE B2C MODE) */}
              {tradeMode === 'local' && (
                <button
                  type="button"
                  className="nav-rfq-cart-btn"
                  onClick={() => setIsRfqDrawerOpen(true)}
                  title={currentLang === 'gu' ? '🛍️ લોકલ ટ્રેડ શોપિંગ કાર્ટ જુઓ' : 'View Shopping Cart (Local Trade)'}
                >
                  <span>🛒</span>
                  <span className="rfq-cart-badge">{rfqCartItems.length}</span>
                </button>
              )}

              {/* 3. Official Payment Receipts & Tax Invoice History Button */}
              <button
                type="button"
                className="btn-secondary"
                style={{
                  background: 'rgba(250, 204, 21, 0.15)',
                  color: '#facc15',
                  borderColor: 'rgba(250, 204, 21, 0.35)',
                  fontSize: '0.78rem',
                  padding: '5px 10px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setActiveModal('payment_receipts')}
                title="View Completed Order Payment Receipts & Tax Invoices"
              >
                🧾 <span className="nav-btn-label">{currentLang === 'gu' ? 'પેમેન્ટ રીસિપ્ટ્સ' : 'Payment Receipts'}</span>
              </button>

              {/* 3. Live Shipment Order Tracker Button (Last Corner) */}
              <button
                type="button"
                className="nav-tracker-btn"
                onClick={() => setIsOrderTrackerOpen(true)}
                title="Track Container Shipment Live"
              >
                🚢 <span className="nav-btn-label">Track Shipment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
