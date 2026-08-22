import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function ContactForm() {
  const {
    t, currentLang, selectedRfqProduct, setSelectedRfqProduct,
    selectedRfqProducts, setSelectedRfqProducts, addRfqProduct, removeRfqProduct, clearRfqProducts,
    activeCompany, getMainCategoryList, getAllProducts, registerCustomer
  } = useApp();

  const activeProducts = (selectedRfqProducts && selectedRfqProducts.length > 0)
    ? selectedRfqProducts
    : (selectedRfqProduct ? [selectedRfqProduct] : []);

  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '', product: 'Agro Commodities', msg: '' });

  useEffect(() => {
    const categories = getMainCategoryList ? getMainCategoryList() : [];

    if (activeProducts.length > 0) {
      const firstProd = activeProducts[0];
      const prodCat = (firstProd.category || '').toLowerCase();
      let matchedCat = categories.find(c =>
        c.id === prodCat ||
        c.category === prodCat ||
        c.nameEn.toLowerCase().includes(prodCat)
      );

      if (!matchedCat && prodCat) {
        if (prodCat.includes('garment') || prodCat.includes('textile')) {
          matchedCat = categories.find(c => c.id === 'garments' || c.id === 'textiles');
        } else if (prodCat.includes('industrial') || prodCat.includes('fastener')) {
          matchedCat = categories.find(c => c.id === 'industrial');
        } else if (prodCat.includes('agro') || prodCat.includes('spice')) {
          matchedCat = categories.find(c => c.id === 'agro');
        } else if (prodCat.includes('used')) {
          matchedCat = categories.find(c => c.id === 'used_machinery');
        } else if (prodCat.includes('new')) {
          matchedCat = categories.find(c => c.id === 'new_machinery');
        }
      }

      const autoProductCat = matchedCat ? matchedCat.nameEn : (categories[0]?.nameEn || 'Agro Commodities (Spices, Rice, Oilseeds)');

      const lines = activeProducts.map((p, idx) => {
        const pName = p.names?.[currentLang] || p.names?.en || p.names?.gu || 'Product';
        const hs = p.hsCode ? ` (HS Code: ${p.hsCode})` : '';
        return `${idx + 1}. ${pName}${hs} | MOQ: ${p.moq || '1 Container'} | Specs: ${typeof p.spec === 'string' ? p.spec : 'Export Quality'}`;
      });

      setFormData(prev => ({
        ...prev,
        product: autoProductCat,
        msg: `Inquiry for ${activeProducts.length} Selected Product(s):\n` + lines.join('\n')
      }));
    }
  }, [activeProducts.length, currentLang, getMainCategoryList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerCustomer) {
      const prodNames = activeProducts.map(p => p.names?.[currentLang] || p.names?.en || p.names?.gu).join(', ');
      const hsCodes = activeProducts.map(p => p.hsCode).filter(Boolean).join(', ');

      registerCustomer({
        name: formData.name,
        companyName: formData.company || formData.name,
        phone: formData.phone,
        email: formData.email,
        productName: prodNames || formData.product,
        hsCode: hsCodes || '',
        selectedProducts: activeProducts,
        notes: `Inquiry for ${formData.product}:\n${formData.msg}`
      });
    }
    alert(`✅ Thank you ${formData.name}! Your quotation request for ${activeProducts.length || 1} product(s) has been submitted and saved successfully.`);
    setFormData({ name: '', company: '', phone: '', email: '', product: 'Agro Commodities', msg: '' });
    if (clearRfqProducts) clearRfqProducts();
    else if (setSelectedRfqProduct) setSelectedRfqProduct(null);
  };

  const getWaUrl = () => {
    const compName = activeCompany?.name || 'ADIDEV SMART SOLUTION';
    let text = `Hello ${compName}, I want to inquire about export commodities.`;
    if (activeProducts.length > 0) {
      const titles = activeProducts.map(p => p.names?.en || p.names?.gu).join(', ');
      text = `Hello ${compName}, I am interested in importing ${titles}. Please send quotation.`;
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
            
            {/* Multi-Product RFQ Selection Banner */}
            <div style={{
              background: 'rgba(20, 184, 166, 0.15)',
              border: '1px solid var(--primary-teal-glow)',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 800 }}>
                  🎯 Selected Product(s) for Quote ({activeProducts.length} Items):
                </span>
                {activeProducts.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (clearRfqProducts) clearRfqProducts();
                      else if (setSelectedRfqProduct) setSelectedRfqProduct(null);
                    }}
                    style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.76rem', cursor: 'pointer', fontWeight: 800 }}
                  >
                    Clear All ✕
                  </button>
                )}
              </div>

              {/* Chips of Selected Products */}
              {activeProducts.length > 0 ? (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {activeProducts.map((p, idx) => (
                    <span
                      key={p.id || idx}
                      style={{
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '1px solid rgba(74, 222, 128, 0.4)',
                        color: 'white',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      🏷️ {p.names?.[currentLang] || p.names?.en || p.names?.gu} {p.hsCode ? `(HS: ${p.hsCode})` : ''}
                      <button
                        type="button"
                        onClick={() => {
                          if (removeRfqProduct) removeRfqProduct(p.id);
                          else if (setSelectedRfqProduct) setSelectedRfqProduct(null);
                        }}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 900, padding: 0 }}
                        title="Remove this product"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', margin: '0 0 8px 0' }}>
                  Click "Request Quotation (RFQ)" on any product or select products below to get a custom quote.
                </p>
              )}

              {/* Quick Dropdown to Add More Products Right Inside RFQ Form */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.76rem', color: '#38bdf8', fontWeight: 800 }}>➕ Add Product to Quote:</span>
                <select
                  className="form-control"
                  style={{ fontSize: '0.78rem', padding: '3px 8px', background: '#0f172a', color: 'white', borderColor: '#0284c7', fontWeight: 700, flex: 1 }}
                  onChange={(e) => {
                    const allP = getAllProducts ? getAllProducts() : [];
                    const found = allP.find(item => item.id === e.target.value);
                    if (found) {
                      if (addRfqProduct) addRfqProduct(found);
                      else if (setSelectedRfqProduct) setSelectedRfqProduct(found);
                    }
                    e.target.value = '';
                  }}
                  value=""
                >
                  <option value="" disabled>+ Click to Select Additional Products to Quote List...</option>
                  {(getAllProducts ? getAllProducts() : []).map(p => (
                    <option key={p.id} value={p.id}>
                      {p.names?.[currentLang] || p.names?.en || p.names?.gu} (HS: {p.hsCode || 'N/A'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
                    const prefix = cat.isCustom ? '⭐ ' : '';
                    return (
                      <option key={cat.id} value={cat.nameEn}>
                        {prefix}{labelText}
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
