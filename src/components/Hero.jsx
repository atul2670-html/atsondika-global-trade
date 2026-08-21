import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { autoTranslateFullObject } from '../utils/translator';

export default function Hero() {
  const { currentLang, t, heroBanner, saveHeroBanner, verifyAdminAccess, setActiveModal, isAdminLoggedIn, showLiveToast } = useApp();
  const [showImgMenu, setShowImgMenu] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowImgMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTitle = typeof heroBanner.title === 'object'
    ? (heroBanner.title[currentLang] || heroBanner.title['en'] || t.hero_title)
    : (heroBanner.title || t.hero_title);

  const currentSubtitle = typeof heroBanner.subtitle === 'object'
    ? (heroBanner.subtitle[currentLang] || heroBanner.subtitle['en'] || t.hero_subtitle)
    : (heroBanner.subtitle || t.hero_subtitle);

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <div className="hero-badge" style={{ marginBottom: 0 }}>
              <span>✨</span> {heroBanner.badge}
            </div>

            {/* Admin Edit Hero Banner Note Button (Only visible to Admin) */}
            {isAdminLoggedIn && (
              <button
                type="button"
                className="admin-hero-edit-btn"
                onClick={() => {
                  verifyAdminAccess(() => {
                    setActiveModal('hero');
                  });
                }}
                title="Edit Hero Title, Subtitle Note and Badge"
              >
                ✏️ Edit Note & Headline (Admin Active)
              </button>
            )}
          </div>

          <h1 className="hero-title">
            {currentTitle}
          </h1>
          
          <p className="hero-subtitle">
            {currentSubtitle}
          </p>

          <div className="hero-buttons">
            <a href="#products" className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
              {t.btn_explore}
            </a>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.btn_rfq}
            </button>
          </div>
        </div>

        {/* HERO IMAGE BOX WITH INTERACTIVE 3-DOTS ••• ACTION MENU */}
        <div className="hero-img-box glass-card" style={{ position: 'relative' }}>
          {/* Floating 3-Dots ••• Menu Button (Only visible to Admin) */}
          {isAdminLoggedIn && (
            <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 30 }} ref={menuRef}>
              <button
                type="button"
                className="img-options-btn"
                onClick={() => {
                  verifyAdminAccess(() => {
                    setShowImgMenu(!showImgMenu);
                  });
                }}
                title="Change Hero Photo (Admin Options)"
              >
                •••
              </button>

            {/* Popover Action Menu */}
            {showImgMenu && (
              <div className="img-options-dropdown">
                <label className="img-option-item">
                  📷 Upload Photo from Device
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          saveHeroBanner({ ...heroBanner, image: evt.target.result });
                          setShowImgMenu(false);
                          showLiveToast("✅ Hero Banner Photo Updated!", "success");
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>

                <button
                  type="button"
                  className="img-option-item"
                  onClick={() => {
                    const url = prompt("🔗 Enter Image Web URL (e.g. https://example.com/banner.jpg):", heroBanner.image || '');
                    if (url && url.trim()) {
                      saveHeroBanner({ ...heroBanner, image: url.trim() });
                      setShowImgMenu(false);
                      showLiveToast("✅ Hero Banner Photo Updated!", "success");
                    }
                  }}
                >
                  🔗 Set Custom Image URL
                </button>

                <button
                  type="button"
                  className="img-option-item"
                  onClick={() => {
                    setActiveModal('hero');
                    setShowImgMenu(false);
                  }}
                >
                  ✏️ Edit Headline & Photo in Form
                </button>

                <div style={{ height: '1px', background: 'var(--border-glass)', margin: '4px 0' }}></div>

                <button
                  type="button"
                  className="img-option-item danger"
                  onClick={() => {
                    saveHeroBanner({ ...heroBanner, image: 'images/hero_export_shipping.png' });
                    setShowImgMenu(false);
                    showLiveToast("🔄 Reset to Default Shipping Banner Photo!", "info");
                  }}
                >
                  🔄 Reset to Default Photo
                </button>
              </div>
            )}
          </div>
          )}

          <img
            src={heroBanner.image || 'images/hero_export_shipping.png'}
            alt="Export Shipping Container"
            className="hero-img"
            onError={(e) => { e.target.src = 'images/hero_export_shipping.png'; }}
          />
        </div>
      </div>
    </section>
  );
}
