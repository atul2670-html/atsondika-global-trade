import React from 'react';
import { useApp } from '../context/AppContext';

export default function CertificatesSection() {
  const {
    t, currentLang, certificatesList, deleteCertificate,
    verifyAdminAccess, setActiveModal, setEditingCertId, setSelectedCertForView, isAdminLoggedIn, activeCompany,
    openImagePreview
  } = useApp();

  return (
    <section className="section" id="quality">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t.cert_title}</h2>
          <p className="section-subtitle">{t.cert_sub}</p>
          {isAdminLoggedIn && (
            <div style={{ marginTop: '18px' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #059669, #10b981)', fontSize: '0.88rem' }}
                onClick={() => {
                  verifyAdminAccess(() => {
                    setEditingCertId(null);
                    setActiveModal('certificate');
                  });
                }}
              >
                ➕ Add Certificate for {activeCompany?.name.split(' ')[0]}
              </button>
            </div>
          )}
        </div>

        <div className="cert-grid">
          {certificatesList.length === 0 ? (
            <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '55px 24px' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '14px' }}>📜</div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)' }}>
                {currentLang === 'gu'
                  ? `${activeCompany?.name || 'આ કંપની'} માટે હાલ કોઈ સર્ટિફિકેટ ઉમેરાયેલ નથી`
                  : `No Accreditations & Certifications Added for ${activeCompany?.name || 'this Company'} Yet`}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', maxWidth: '520px', margin: '8px auto 22px auto', lineHeight: '1.6' }}>
                {currentLang === 'gu'
                  ? `${activeCompany?.name} માટે ISO, APEDA, FSSAI અથવા અન્ય સર્ટિફિકેટ ઉમેરવા માટે એડમિન તરીકે લોગિન કરીને '+ Add Certificate' પર ક્લિક કરો.`
                  : `Upload ISO 9001:2015, APEDA, FSSAI, or custom export certificates specifically for ${activeCompany?.name}.`}
              </p>
              {isAdminLoggedIn ? (
                <button
                  type="button"
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #059669, #10b981)', padding: '10px 22px', fontSize: '0.9rem' }}
                  onClick={() => {
                    verifyAdminAccess(() => {
                      setEditingCertId(null);
                      setActiveModal('certificate');
                    });
                  }}
                >
                  ➕ + {currentLang === 'gu' ? 'સર્ટિફિકેટ ઉમેરો' : 'Add Certificate'}
                </button>
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
                  🔐 {currentLang === 'gu' ? 'સર્ટિફિકેટ ઉમેરવા માટે એડમિન લોગીન કરો.' : 'Log in as Admin to add certificates for this company.'}
                </div>
              )}
            </div>
          ) : (
            certificatesList.map(c => {
            const fileBadge = c.fileUrl ? (c.fileType === 'pdf' ? '📄 PDF Document' : '🖼️ 2X Zoomable Photo') : '';

            return (
              <div key={c.id} className="glass-card cert-card">
                <div>
                  <span className="cert-icon">{c.icon || '📜'}</span>
                  <div className="cert-title">{c.title}</div>
                  <div className="cert-reg">{c.reg}</div>
                  {fileBadge && (
                    <span style={{
                      display: 'inline-block',
                      marginTop: '8px',
                      background: 'rgba(20, 184, 166, 0.15)',
                      color: 'var(--primary-teal-glow)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      border: '1px solid rgba(45, 212, 191, 0.3)'
                    }}>
                      {fileBadge}
                    </span>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '14px', fontSize: '0.85rem' }}
                    onClick={() => {
                      if (c.fileUrl && openImagePreview) {
                        openImagePreview({
                          title: `${c.icon || '📜'} ${c.title}`,
                          url: c.fileUrl,
                          category: c.reg ? `Reg No: ${c.reg}` : 'Official Accreditation & Certificate Document',
                          fileType: c.fileType
                        });
                      } else {
                        setSelectedCertForView(c);
                        setActiveModal('viewCert');
                      }
                    }}
                  >
                    👁️ View Certificate
                  </button>

                  {isAdminLoggedIn && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)', fontSize: '0.78rem', fontWeight: 700 }}
                        onClick={() => {
                          verifyAdminAccess(() => {
                            setEditingCertId(c.id);
                            setActiveModal('certificate');
                          });
                        }}
                      >
                        {t.btn_edit}
                      </button>

                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', fontSize: '0.78rem', fontWeight: 700 }}
                        onClick={() => deleteCertificate(c.id)}
                      >
                        {t.btn_delete}
                      </button>
                    </div>
                  )}
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
