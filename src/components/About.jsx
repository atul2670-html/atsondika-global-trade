import React from 'react';
import { useApp } from '../context/AppContext';
import { convertDigits } from '../utils/translator';

export default function About() {
  const { currentLang, t, aboutData, verifyAdminAccess, setActiveModal, isAdminLoggedIn } = useApp();

  const currentBadge = typeof aboutData?.badge === 'object'
    ? (aboutData.badge[currentLang] || aboutData.badge['en'] || t.about_badge)
    : (aboutData?.badge || t.about_badge);

  const currentTitle = typeof aboutData?.title === 'object'
    ? (aboutData.title[currentLang] || aboutData.title['en'] || t.about_title)
    : (aboutData?.title || t.about_title);

  const currentDesc = typeof aboutData?.desc === 'object'
    ? (aboutData.desc[currentLang] || aboutData.desc['en'] || t.about_desc)
    : (aboutData?.desc || t.about_desc);

  const currentFeat1 = typeof aboutData?.feat1 === 'object'
    ? (aboutData.feat1[currentLang] || aboutData.feat1['en'] || t.about_feat1)
    : (aboutData?.feat1 || t.about_feat1);

  const currentFeat2 = typeof aboutData?.feat2 === 'object'
    ? (aboutData.feat2[currentLang] || aboutData.feat2['en'] || t.about_feat2)
    : (aboutData?.feat2 || t.about_feat2);

  const currentFeat3 = typeof aboutData?.feat3 === 'object'
    ? (aboutData.feat3[currentLang] || aboutData.feat3['en'] || t.about_feat3)
    : (aboutData?.feat3 || t.about_feat3);

  const currentStatsTitle = typeof aboutData?.statsTitle === 'object'
    ? (aboutData.statsTitle[currentLang] || aboutData.statsTitle['en'] || t.stats_title)
    : (aboutData?.statsTitle || t.stats_title);

  const currentStat1Label = typeof aboutData?.stat1Label === 'object'
    ? (aboutData.stat1Label[currentLang] || aboutData.stat1Label['en'] || t.stat_years_label)
    : (t.stat_years_label || 'Years Experience');

  const currentStat2Label = typeof aboutData?.stat2Label === 'object'
    ? (aboutData.stat2Label[currentLang] || aboutData.stat2Label['en'] || t.stat_countries_label)
    : (t.stat_countries_label || 'Export Countries');

  const currentStat3Label = typeof aboutData?.stat3Label === 'object'
    ? (aboutData.stat3Label[currentLang] || aboutData.stat3Label['en'] || t.stat_tons_label)
    : (t.stat_tons_label || 'Metric Tons Exported');

  const currentStat4Label = typeof aboutData?.stat4Label === 'object'
    ? (aboutData.stat4Label[currentLang] || aboutData.stat4Label['en'] || t.stat_clients_label)
    : (t.stat_clients_label || 'Global Importers');

  const counts = aboutData?.counts || { exp: 12, countries: 45, shipments: 50000, clients: 350 };

  return (
    <section className="section" id="about">
      <div className="section-container">
        <div className="about-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span className="notranslate" style={{ color: 'var(--primary-teal-glow)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                {currentBadge}
              </span>
              {isAdminLoggedIn && (
                <button
                  type="button"
                  className="btn-secondary notranslate"
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

            <h2 className="section-title notranslate" style={{ textAlign: 'left', marginTop: '8px' }}>
              {currentTitle}
            </h2>
            <p className="notranslate" style={{ color: 'var(--text-sub)', marginBottom: '18px' }}>
              {currentDesc}
            </p>
            <div className="notranslate" style={{ display: 'grid', gap: '12px' }}>
              <div>{currentFeat1}</div>
              <div>{currentFeat2}</div>
              <div>{currentFeat3}</div>
            </div>
          </div>

          <div className="glass-card about-card" style={{ position: 'relative' }}>
            <h3 className="notranslate" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>
              {currentStatsTitle}
            </h3>
            <div className="about-stats">
              <div className="stat-box">
                <div className="stat-number notranslate">{convertDigits(counts.exp, currentLang)}+</div>
                <div className="stat-label notranslate">{currentStat1Label}</div>
              </div>
              <div className="stat-box">
                <div className="stat-number notranslate">{convertDigits(counts.countries, currentLang)}+</div>
                <div className="stat-label notranslate">{currentStat2Label}</div>
              </div>
              <div className="stat-box">
                <div className="stat-number notranslate">{convertDigits(Number(counts.shipments).toLocaleString(), currentLang)}+</div>
                <div className="stat-label notranslate">{currentStat3Label}</div>
              </div>
              <div className="stat-box">
                <div className="stat-number notranslate">{convertDigits(counts.clients, currentLang)}+</div>
                <div className="stat-label notranslate">{currentStat4Label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
