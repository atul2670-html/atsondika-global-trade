import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductsGrid from './components/ProductsGrid';
import ContainerCalculator from './components/ContainerCalculator';
import CertificatesSection from './components/CertificatesSection';
import BranchOfficesSection from './components/BranchOfficesSection';
import ContactForm from './components/ContactForm';
import AiChatDrawer from './components/AiChatDrawer';
import Modals from './components/Modals';
import RfqCartDrawer from './components/RfqCartDrawer';
import OrderTrackerModal from './components/OrderTrackerModal';
import { useApp } from './context/AppContext';

export default function App() {
  const { t, activeCompany, getMainCategoryList, setCurrentCategory, currentLang, liveToast } = useApp();

  return (
    <>
      {/* Ambient Animated Mesh Background */}
      <div className="ambient-bg">
        <div className="mesh-orb orb-1"></div>
        <div className="mesh-orb orb-2"></div>
        <div className="mesh-orb orb-3"></div>
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <ProductsGrid />
        <ContainerCalculator />
        <CertificatesSection />
        <BranchOfficesSection />

        {/* Global Reach Section */}
        <section className="section" id="global">
          <div className="section-container" style={{ textAlign: 'center' }}>
            <h2 className="section-title">{t.global_title}</h2>
            <p style={{ color: 'var(--text-sub)', maxWidth: '600px', margin: '0 auto 40px auto' }}>{t.global_sub}</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div className="glass-card" style={{ padding: '20px 30px', fontWeight: 800 }}>{t.region_me}</div>
              <div className="glass-card" style={{ padding: '20px 30px', fontWeight: 800 }}>{t.region_eu}</div>
              <div className="glass-card" style={{ padding: '20px 30px', fontWeight: 800 }}>{t.region_us}</div>
              <div className="glass-card" style={{ padding: '20px 30px', fontWeight: 800 }}>{t.region_asia}</div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
              <img
                src={activeCompany?.logo || 'images/logo.png'}
                alt={activeCompany?.name}
                style={{
                  height: '72px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 14px rgba(45, 212, 191, 0.45))'
                }}
                onError={(e) => { e.target.src = 'images/logo.png'; }}
              />
              <div>
                <h4 style={{
                  fontSize: '1.65rem',
                  margin: 0,
                  fontWeight: 900,
                  letterSpacing: '-0.3px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 40%, #2dd4bf 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))'
                }}>
                  {activeCompany?.name || 'Atsondika Global Trade'}
                </h4>
                <span style={{
                  fontSize: '0.85rem',
                  color: '#38bdf8',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '1.4px',
                  display: 'block',
                  marginTop: '3px',
                  textShadow: '0 0 10px rgba(56, 189, 248, 0.4)'
                }}>
                  {activeCompany?.tagline || 'GLOBAL TRADING HOUSE'}
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>{t.footer_about}</p>
          </div>

          <div className="footer-col">
            <h4>{t.footer_links}</h4>
            <ul className="footer-links">
              <li><a href="#home">{t.nav_home}</a></li>
              <li><a href="#about">{t.nav_about}</a></li>
              <li><a href="#products">{t.nav_products}</a></li>
              <li><a href="#contact">{t.nav_contact}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t.footer_main_prods}</h4>
            <ul className="footer-links">
              {(getMainCategoryList ? getMainCategoryList() : []).map(cat => {
                const labelText = currentLang === 'gu' ? cat.nameGu : cat.nameEn;
                const catSlug = cat.category || cat.id;
                return (
                  <li key={cat.id}>
                    <a
                      href="#products"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentCategory(catSlug);
                        const el = document.querySelector('#products');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {labelText}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t.footer_contact}</h4>
            <p style={{ fontSize: '0.88rem' }} className="us-en-address">
              📍 {activeCompany?.address || 'Bhestan, Surat - 395023, Gujarat, India'}
            </p>
            <p style={{ fontSize: '0.88rem', marginTop: '6px' }}>
              📞 {activeCompany?.phone || '+91 78619 97755'}
            </p>
            <p style={{ fontSize: '0.88rem', marginTop: '6px' }}>
              ✉️ {activeCompany?.email || 'info@adidevexport.com'}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} {activeCompany?.name || 'Atsondika Global Trade'}. All Rights Reserved.
        </div>
      </footer>

      <AiChatDrawer />
      <Modals />
      <RfqCartDrawer />
      <OrderTrackerModal />

      {/* Floating Global Microsecond Live Toast Notification */}
      {liveToast && (
        <div className={`live-toast-banner ${liveToast.type || 'info'}`}>
          <span className="toast-icon">{liveToast.type === 'live' ? '⚡' : liveToast.type === 'success' ? '✅' : '🔔'}</span>
          <div className="toast-body">
            <span className="toast-msg">{liveToast.message}</span>
            <span className="toast-time">{liveToast.timestamp}</span>
          </div>
        </div>
      )}
    </>
  );
}
