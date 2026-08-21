import React from 'react';
import { useApp } from '../context/AppContext';
import { toUSEnglishAddress } from '../utils/address';

export default function BranchOfficesSection() {
  const {
    t, branchesList, deleteBranch,
    verifyAdminAccess, setActiveModal, setEditingBranchId, isAdminLoggedIn
  } = useApp();

  return (
    <section className="section" id="branches">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t.branch_sec_title}</h2>
          <p className="section-subtitle">{t.branch_sec_sub}</p>
          {isAdminLoggedIn && (
            <div style={{ marginTop: '18px' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)', fontSize: '0.88rem' }}
                onClick={() => {
                  verifyAdminAccess(() => {
                    setEditingBranchId(null);
                    setActiveModal('branch');
                  });
                }}
              >
                ➕ Add Branch Office
              </button>
            </div>
          )}
        </div>

        <div className="branch-grid">
          {branchesList.map(b => {
            const cleanAddress = toUSEnglishAddress(b.address);
            const cleanPerson = toUSEnglishAddress(b.person || 'Branch Representative');

            return (
              <div key={b.id} className="glass-card branch-card">
                <div>
                  <div className="branch-card-header">
                    <span className="branch-icon">🏢</span>
                    <div className="branch-name">{b.city}</div>
                  </div>
                  <div className="branch-item"><strong>👤 Contact Person:</strong> {cleanPerson}</div>
                  <div className="branch-item"><strong>📞 Phone:</strong> {b.phone || '+91 78619 97755'}</div>
                  <div className="branch-item"><strong>✉️ Email:</strong> {b.email || 'info@adidevexport.com'}</div>
                  <div className="branch-item us-en-address" style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed var(--border-glass)' }}>
                    <strong style={{ color: 'var(--primary-teal-glow)' }}>📍 Address (US English):</strong><br />
                    {cleanAddress}
                  </div>
                </div>

                {isAdminLoggedIn && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px' }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)', fontSize: '0.8rem', fontWeight: 700 }}
                      onClick={() => {
                        verifyAdminAccess(() => {
                          setEditingBranchId(b.id);
                          setActiveModal('branch');
                        });
                      }}
                    >
                      {t.btn_edit}
                    </button>

                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', fontSize: '0.8rem', fontWeight: 700 }}
                      onClick={() => deleteBranch(b.id)}
                    >
                      {t.btn_delete}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
