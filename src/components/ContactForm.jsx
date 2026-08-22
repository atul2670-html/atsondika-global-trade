import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function ContactForm() {
  const { t, currentLang, selectedRfqProduct, setSelectedRfqProduct, activeCompany, getMainCategoryList, registerCustomer } = useApp();
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '', product: 'Agro Commodities', msg: '' });

  useEffect(() => {
    if (selectedRfqProduct) {
      const prodName = selectedRfqProduct.names[currentLang] || selectedRfqProduct.names['en'] || selectedRfqProduct.names['gu'];
      const hs = selectedRfqProduct.hsCode ? ` (HS Code: ${selectedRfqProduct.hsCode})` : '';
      setFormData(prev => ({
        ...prev,
        msg: `Inquiry for item: ${prodName}${hs}\nMOQ: ${selectedRfqProduct.moq || '1 Container'}\nSpecifications: ${typeof selectedRfqProduct.spec === 'string' ? selectedRfqProduct.spec : 'Standard export quality'}`
      }));
    }
  }, [selectedRfqProduct, currentLang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerCustomer) {
      const pName = selectedRfqProduct ? (selectedRfqProduct.names[currentLang] || selectedRfqProduct.names['en']) : formData.product;
      const hs = selectedRfqProduct ? (selectedRfqProduct.hsCode || '') : '';
      registerCustomer({
        name: formData.name,
        companyName: formData.company || formData.name,
        phone: formData.phone,
        email: formData.email,
        productName: pName,
        hsCode: hs,
        notes: `Inquiry for ${formData.product}: ${formData.msg}`
      });
    }
    alert(`✅ Thank you ${formData.name}! Your quotation request has been submitted and saved successfully.`);
    setFormData({ name: '', company: '', phone: '', email: '', product: 'Agro Commodities', msg: '' });
    setSelectedRfqProduct(null);
  };

  const getWaUrl = () => {
    const compName = activeCompany?.name || 'ADIDEV SMART SOLUTION';
    let text = `Hello ${compName}, I want to inquire about export commodities.`;
    if (selectedRfqProduct) {
      const pTitle = selectedRfqProduct.names['en'] || selectedRfqProduct.names['gu'];
      text = `Hello ${compName}, I am interested in importing ${pTitle} (HS Code: ${selectedRfqProduct.hsCode || 'N/A'}). Please send quotation.`;
    }
    const cleanPhone = (activeCompany?.phone || '7861997755').replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="section" id="contact">
      <div className="section-container">
        <div className="contact-grid">
          <div className="glass-card contact-info-card">
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '22px', color: 'white' }}>{t.contact_title}</h3>
            
            <div className="info-item">
              <h4>{t.contact_addr_title}</h4>
              <p className="us-en-address">📍 {activeCompany?.address || t.contact_addr}</p>
            </div>
            
            <div className="info-item">
              <h4>{t.contact_phone_title}</h4>
              <p>📞 {activeCompany?.phone || '+91 78619 97755'}</p>
            </div>
            
            <div className="info-item">
              <h4>{t.contact_email_title}</h4>
              <p>✉️ {activeCompany?.email || 'info@adidevexport.com'}</p>
            </div>

            <a
              href={getWaUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: 'white', width: '100%', justifyContent: 'center', marginTop: '10px' }}
            >
              💬 {t.btn_wa}
            </a>
          </div>

          <div className="glass-card quote-form-card">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>{t.rfq_title}</h3>
            
            {/* Highlighted Banner when Product RFQ is Triggered */}
            {selectedRfqProduct && (
              <div style={{
                background: 'rgba(20, 184, 166, 0.15)',
                border: '1px solid var(--primary-teal-glow)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.74rem', color: '#4ade80', fontWeight: 800, display: 'block' }}>
                    🎯 Selected Product for Quote:
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>
                    {selectedRfqProduct.names[currentLang] || selectedRfqProduct.names['en']} {selectedRfqProduct.hsCode ? `(HS: ${selectedRfqProduct.hsCode})` : ''}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRfqProduct(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-sub)', cursor: 'pointer', fontSize: '1.1rem' }}
                  title="Clear Selected Item"
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{currentLang === 'gu' ? 'ગ્રાહકનું નામ (Buyer Contact Name) *' : 'Buyer Contact Name *'}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Atul Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{currentLang === 'gu' ? 'કંપનીનું નામ (Company / Business Name) *' : 'Company / Business Name *'}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Atul Automation / SST Group"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t.form_phone} *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+91 78619 97755"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t.form_email}</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="atul2670@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t.form_product}</label>
                <select
                  className="form-control"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  required
                >
                  {(getMainCategoryList ? getMainCategoryList() : []).map(cat => {
                    const labelText = currentLang === 'gu' ? cat.nameGu : cat.nameEn;
                    return (
                      <option key={cat.id} value={cat.nameEn}>
                        {labelText}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t.form_msg}</label>
                <textarea
                  id="rfqMsg"
                  className="form-control"
                  rows="4"
                  placeholder="Enter quantity, target port, or specifications..."
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
                {t.btn_rfq_submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
