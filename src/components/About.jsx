import React from 'react';
import { useApp } from '../context/AppContext';
import { convertDigits, getTextInLanguage } from '../utils/translator';

export default function About() {
  const { currentLang, t, aboutData, verifyAdminAccess, setActiveModal, isAdminLoggedIn } = useApp();

  const currentBadge = getTextInLanguage(aboutData?.badge || t.about_badge, currentLang);
  const currentTitle = getTextInLanguage(aboutData?.title || t.about_title, currentLang);
  const currentDesc = getTextInLanguage(aboutData?.desc || t.about_desc, currentLang);
  const currentFeat1 = getTextInLanguage(aboutData?.feat1 || t.about_feat1, currentLang);
  const currentFeat2 = getTextInLanguage(aboutData?.feat2 || t.about_feat2, currentLang);
  const currentFeat3 = getTextInLanguage(aboutData?.feat3 || t.about_feat3, currentLang);
  const currentStatsTitle = getTextInLanguage(aboutData?.statsTitle || t.stats_title, currentLang);

  const currentStat1Label = getTextInLanguage(aboutData?.stat1Label || t.stat_years_label || 'Years Experience', currentLang);
  const currentStat2Label = getTextInLanguage(aboutData?.stat2Label || t.stat_countries_label || 'Export Countries', currentLang);
  const currentStat3Label = getTextInLanguage(aboutData?.stat3Label || t.stat_tons_label || 'Metric Tons Exported', currentLang);
  const currentStat4Label = getTextInLanguage(aboutData?.stat4Label || t.stat_clients_label || 'Global Importers', currentLang);

  const counts = aboutData?.counts || { exp: 12, countries: 45, shipments: 50000, clients: 350 };

  return (
    <section className="section" id="about">
      <div className="section-container">
        <div className="about-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span style={{ color: 'var(--primary-teal-glow)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                {currentBadge}
              </span>
              {isAdminLoggedIn && (
                <button
                  type="button"
                  className="btn-secondary no-translate-element"
                  style={{
                    padding: '4px 12px',
                    fontSize: '0.76rem',
                    color: 'var(--accent-gold)',
                    borderColor: 'rgba(245, 158, 11, 0.4)',
                    borderRadius: 'var(--radius-pill)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onClick={() => {
                    verifyAdminAccess(() => {
                      setActiveModal('about');
                    });
                  }}
                  title="Edit About Us & Track Record Stats (Admin Options)"
                >
                  ✏️ Edit About & Stats
                </button>
              )}
            </div>

            <h2 className="section-title" style={{ textAlign: 'left', marginTop: '8px' }}>
              {currentTitle}
            </h2>
            <p style={{ color: 'var(--text-sub)', marginBottom: '18px' }}>
              {currentDesc}
            </p>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>{currentFeat1}</div>
              <div>{currentFeat2}</div>
              <div>{currentFeat3}</div>
            </div>
          </div>

          <div className="glass-card about-card" style={{ position: 'relative' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>
              {currentStatsTitle}
            </h3>
            <div className="about-stats">
              <div className="stat-box">
                <div className="stat-number">{convertDigits(counts.exp, currentLang)}+</div>
                <div className="stat-label">{currentStat1Label}</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{convertDigits(counts.countries, currentLang)}+</div>
                <div className="stat-label">{currentStat2Label}</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{convertDigits(Number(counts.shipments).toLocaleString(), currentLang)}+</div>
                <div className="stat-label">{currentStat3Label}</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{convertDigits(counts.clients, currentLang)}+</div>
                <div className="stat-label">{currentStat4Label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
