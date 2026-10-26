import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { convertGoogleDriveUrl, generateDigitalRoundStampSvg } from '../utils/address';

const SAMPLE_PURPOSES = [
  { id: 'lab_test', labelEn: '🧪 Laboratory Chemical & Purity Analysis', labelGu: '🧪 લેબોરેટરી કેમિકલ અને પ્યોરિટી એનાલિસિસ' },
  { id: 'client_approval', labelEn: '👥 Client / Retailer Quality Approval', labelGu: '👥 ક્લાયન્ટ અને રિટેઈલર ક્વોલિટી અપ્રૂવલ' },
  { id: 'trial_production', labelEn: '⚙️ Trial Production & Machine Compatibility', labelGu: '⚙️ ટ્રાયલ પ્રોડક્શન અને ટેસ્ટિંગ' },
  { id: 'bulk_contract', labelEn: '📄 FCL / LCL Container Contract Finalization', labelGu: '📄 કન્ટેનર કોન્ટ્રાક્ટ ફાઈનલાઈઝેશન' }
];

const COURIER_PARTNERS = [
  { id: 'DHL', name: 'DHL Express Worldwide', icon: '🟡' },
  { id: 'FEDEX', name: 'FedEx International Priority', icon: '🟣' },
  { id: 'ARAMEX', name: 'Aramex International', icon: '🔴' },
  { id: 'UPS', name: 'UPS Worldwide Express', icon: '🟤' }
];

export default function SampleRequestModal() {
  const {
    isSampleModalOpen,
    setIsSampleModalOpen,
    activeSampleProduct,
    setActiveSampleProduct,
    getAllProducts,
    activeCompany,
    addSampleRequest,
    currentLang,
    showLiveToast,
    setIsOrderTrackerOpen
  } = useApp();

  const [selectedProductId, setSelectedProductId] = useState('');
  const [formData, setFormData] = useState({
    buyerName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'United Arab Emirates',
    portCity: 'Dubai / Jebel Ali Port',
    address: '',
    postalCode: '',
    taxId: '',
    sampleQty: '250g Airtight Foil Pack',
    evaluationPurpose: '🧪 Laboratory Chemical & Purity Analysis',
    courierType: 'freight_collect', // 'freight_collect' | 'prepaid' | 'sponsored'
    courierName: 'DHL Express',
    courierAccountNo: '',
    specialNotes: ''
  });

  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [showCustomsInvoice, setShowCustomsInvoice] = useState(false);

  const allProds = getAllProducts ? getAllProducts().filter(p => p.isSub !== false) : [];

  useEffect(() => {
    if (activeSampleProduct) {
      setSelectedProductId(activeSampleProduct.id);
      // Auto pre-fill appropriate sample quantity based on product category
      const cat = (activeSampleProduct.category || '').toLowerCase();
      if (cat.includes('fastener') || cat.includes('machine') || cat.includes('industrial')) {
        setFormData(prev => ({ ...prev, sampleQty: '2 Pcs (Machined Sample)' }));
      } else if (cat.includes('textile') || cat.includes('garment')) {
        setFormData(prev => ({ ...prev, sampleQty: '1 Swatch / Fabric Sample (1m)' }));
      } else {
        setFormData(prev => ({ ...prev, sampleQty: '250g Airtight Foil Pack' }));
      }
    } else if (allProds.length > 0 && !selectedProductId) {
      setSelectedProductId(allProds[0].id);
    }
  }, [activeSampleProduct, isSampleModalOpen]);

  if (!isSampleModalOpen) return null;

  const currentProd = allProds.find(p => p.id === selectedProductId) || activeSampleProduct || allProds[0] || {};
  const prodTitle = (currentProd?.names && typeof currentProd.names === 'object')
    ? (currentProd.names[currentLang] || currentProd.names['en'] || currentProd.name)
    : (currentProd?.name || 'Export Commodity');
  const prodImg = convertGoogleDriveUrl((currentProd?.images && currentProd.images[0]) || currentProd?.image || 'images/agro_spices_grains.png');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.buyerName.trim() || !formData.companyName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert(currentLang === 'gu' ? '⚠️ મહેરબાની કરીને તમામ જરૂરી વિગતો ભરો.' : '⚠️ Please fill all required buyer and company fields.');
      return;
    }

    if (formData.courierType === 'freight_collect' && !formData.courierAccountNo.trim()) {
      alert(currentLang === 'gu' ? '⚠️ મહેરબાની કરીને તમારો કુરિયર એકાઉન્ટ નંબર (DHL/FedEx No.) દાખલ કરો.' : '⚠️ Please enter your Courier Account Number for Freight Collect.');
      return;
    }

    const newRequest = {
      productId: currentProd.id || 'export_item',
      productName: prodTitle,
      hsCode: currentProd.hsCode || '090931',
      category: currentProd.category || 'agro',
      sampleQty: formData.sampleQty,
      evaluationPurpose: formData.evaluationPurpose,
      buyerName: formData.buyerName.trim(),
      companyName: formData.companyName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      country: formData.country.trim(),
      portCity: formData.portCity.trim(),
      address: formData.address.trim(),
      postalCode: formData.postalCode.trim(),
      taxId: formData.taxId.trim(),
      courierType: formData.courierType,
      courierName: formData.courierName,
      courierAccountNo: formData.courierAccountNo.trim(),
      specialNotes: formData.specialNotes.trim(),
      companyId: activeCompany?.id || 'comp_1'
    };

    const created = addSampleRequest(newRequest);
    setSubmittedOrder(created);
    if (showLiveToast) {
      showLiveToast(`📦 ${currentLang === 'gu' ? 'સેમ્પલ રિક્વેસ્ટ સફળતાપૂર્વક મોકલાઈ ગઈ!' : 'Sample Request Submitted Successfully!'} [${created.id}]`, 'success');
    }
  };

  const closeModal = () => {
    setIsSampleModalOpen(false);
    setSubmittedOrder(null);
    setShowCustomsInvoice(false);
    if (setActiveSampleProduct) setActiveSampleProduct(null);
  };

  return (
    <div className="modal-backdrop show" style={{ zIndex: 10000 }} onClick={closeModal}>
      <div
        className="glass-card modal-card sample-request-modal-card"
        style={{
          maxWidth: '860px',
          width: '95vw',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '24px',
          background: 'linear-gradient(145deg, #0b1120 0%, #030712 100%)',
          border: '1px solid rgba(45, 212, 191, 0.4)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(20, 184, 166, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={closeModal}
          style={{ top: '16px', right: '18px', zIndex: 10 }}
        >
          &times;
        </button>

        {/* CUSTOMS INVOICE PREVIEW POPUP */}
        {showCustomsInvoice && submittedOrder && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 10050,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
            onClick={() => setShowCustomsInvoice(false)}
          >
            <div
              style={{
                background: '#ffffff',
                color: '#111827',
                width: '100%',
                maxWidth: '750px',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                fontFamily: 'serif'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e5e7eb', paddingBottom: '12px', marginBottom: '16px', fontFamily: 'sans-serif' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase' }}>
                  WCO HS 9803 • International Commercial Sample Declaration
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    style={{ background: '#0284c7', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer', fontSize: '0.82rem' }}
                  >
                    🖨️ Print / Save PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomsInvoice(false)}
                    style={{ background: '#f3f4f6', color: '#374151', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer', fontSize: '0.82rem' }}
                  >
                    ✕ Close
                  </button>
                </div>
              </div>

              {/* Invoice Body for Customs Clearance */}
              <div style={{ textAlign: 'center', borderBottom: '1px solid #111827', paddingBottom: '10px', marginBottom: '14px' }}>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#000000' }}>
                  {activeCompany?.name || 'Atsondika Global Trade'}
                </h2>
                <div style={{ fontSize: '0.82rem', color: '#4b5563', lineHeight: '1.4' }}>
                  {activeCompany?.tagline || 'GLOBAL TRADING HOUSE & EXPORT HOUSE'}<br />
                  {activeCompany?.address || 'Surat, Gujarat, India - 395006'} | Phone: {activeCompany?.phone || '+91 78619 97755'}<br />
                  Email: {activeCompany?.email || 'info@atsondikaglobaltrade.com'} | GSTIN: {activeCompany?.gstin || '24AAACA0000A1Z5'}
                </div>
                <div style={{ marginTop: '8px', display: 'inline-block', background: '#000000', color: '#ffffff', padding: '3px 14px', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  COMMERCIAL SAMPLE PROFORMA INVOICE
                </div>
              </div>

              {/* Consignee and Shipment Metadata */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.82rem', marginBottom: '14px' }}>
                <div style={{ border: '1px solid #d1d5db', padding: '10px', borderRadius: '6px' }}>
                  <strong style={{ display: 'block', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '4px', textTransform: 'uppercase', color: '#374151' }}>
                    Shipper / Exporter:
                  </strong>
                  <strong>{activeCompany?.name || 'Atsondika Global Trade'}</strong><br />
                  {activeCompany?.address || 'Surat, Gujarat, India'}<br />
                  Country of Origin: <b>INDIA</b><br />
                  Dispatch Air Hub: <b>Surat (STV) / Mumbai (BOM) / Ahmedabad (AMD)</b>
                </div>

                <div style={{ border: '1px solid #d1d5db', padding: '10px', borderRadius: '6px' }}>
                  <strong style={{ display: 'block', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '4px', textTransform: 'uppercase', color: '#374151' }}>
                    Consignee / Overseas Importer:
                  </strong>
                  <strong>{submittedOrder.buyerName}</strong> ({submittedOrder.companyName})<br />
                  {submittedOrder.address}<br />
                  {submittedOrder.portCity}, <b>{submittedOrder.country}</b><br />
                  Phone: {submittedOrder.phone} | Email: {submittedOrder.email}
                </div>
              </div>

              {/* Invoice Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', background: '#f9fafb', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '14px' }}>
                <div><b>Sample Invoice No:</b> {submittedOrder.id}</div>
                <div><b>Date:</b> {submittedOrder.date}</div>
                <div><b>Airway Bill (AWB):</b> {submittedOrder.trackingNumber || 'PENDING PICKUP'}</div>
                <div><b>Carrier:</b> {submittedOrder.courierName} ({submittedOrder.courierType === 'freight_collect' ? `Collect A/c: ${submittedOrder.courierAccountNo}` : 'Prepaid Express'})</div>
              </div>

              {/* Product Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', marginBottom: '14px' }}>
                <thead>
                  <tr style={{ background: '#f3f4f6', borderTop: '1px solid #111827', borderBottom: '1px solid #111827' }}>
                    <th style={{ padding: '6px', textAlign: 'left' }}>Item #</th>
                    <th style={{ padding: '6px', textAlign: 'left' }}>Commercial Description of Goods</th>
                    <th style={{ padding: '6px', textAlign: 'center' }}>HS Tariff Code</th>
                    <th style={{ padding: '6px', textAlign: 'center' }}>Sample Qty</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Declared Value (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '8px 6px' }}>1</td>
                    <td style={{ padding: '8px 6px' }}>
                      <b>{submittedOrder.productName}</b><br />
                      <span style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                        Purpose: {submittedOrder.evaluationPurpose}
                      </span>
                    </td>
                    <td style={{ padding: '8px 6px', textAlign: 'center' }}>{submittedOrder.hsCode}</td>
                    <td style={{ padding: '8px 6px', textAlign: 'center' }}>{submittedOrder.sampleQty}</td>
                    <td style={{ padding: '8px 6px', textAlign: 'right' }}>$10.00</td>
                  </tr>
                </tbody>
              </table>

              {/* Statutory Customs Declaration */}
              <div style={{ border: '1px dashed #9ca3af', padding: '10px 12px', fontSize: '0.78rem', background: '#fffbeb', color: '#92400e', marginBottom: '16px', lineHeight: '1.4' }}>
                <strong>⚠️ LEGAL CUSTOMS DECLARATION:</strong><br />
                "WE HEREBY DECLARE THAT THE CONTENTS OF THIS SHIPMENT ARE FREE COMMERCIAL SAMPLES OF NO COMMERCIAL VALUE, SENT SOLELY FOR LABORATORY TESTING, INSPECTION AND EVALUATION PURPOSES. VALUE DECLARED HEREIN (\$10.00 USD) IS STRICTLY FOR CUSTOMS CLEARANCE PURPOSES ONLY PER WCO HS 9803 REGULATIONS."
              </div>

              {/* Digital Round Stamp & Signatory */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: generateDigitalRoundStampSvg(activeCompany?.name || 'ATSONDIKA GLOBAL TRADE') }}
                    style={{ width: '100px', height: '100px', margin: '0 auto' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: '#0369a1', fontWeight: 800 }}>
                    OFFICIAL EXPORT SEAL
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.82rem' }}>
                  <div style={{ fontWeight: 800, color: '#111827', textTransform: 'uppercase' }}>
                    For {activeCompany?.name || 'Atsondika Global Trade'}
                  </div>
                  <div style={{ margin: '14px 0 4px 0', fontSize: '1.1rem', fontFamily: 'cursive', color: '#1e3a8a' }}>
                    Authorized Signatory
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', borderTop: '1px solid #9ca3af', paddingTop: '4px' }}>
                    Export Director / Documentation Officer
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IF ALREADY SUBMITTED, SHOW SUCCESS CONFIRMATION SCREEN */}
        {submittedOrder ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{ fontSize: '3.6rem', marginBottom: '10px', filter: 'drop-shadow(0 0 20px rgba(52, 211, 153, 0.5))' }}>
              📦✅
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', margin: '0 0 6px 0' }}>
              {currentLang === 'gu' ? 'સેમ્પલ રિક્વેસ્ટ સફળતાપૂર્વક નોંધાઈ ગઈ છે!' : 'Sample Request Confirmed & Registered!'}
            </h3>
            <div style={{ display: 'inline-block', background: 'rgba(45, 212, 191, 0.15)', border: '1px solid rgba(45, 212, 191, 0.4)', color: '#2dd4bf', padding: '6px 16px', borderRadius: '50px', fontSize: '0.95rem', fontWeight: 900, marginBottom: '16px' }}>
              Sample ID: {submittedOrder.id}
            </div>

            <p style={{ fontSize: '0.9rem', color: '#94a3b8', maxWidth: '580px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
              {currentLang === 'gu'
                ? `ધન્યવાદ ${submittedOrder.buyerName}! તમારી ${submittedOrder.productName} માટેની સેમ્પલ રિક્વેસ્ટ એક્સપોર્ટ ડિપાર્ટમેન્ટમાં પહોંચી ગઈ છે. ૨૪ થી ૪૮ કલાકમાં એર કુરિયર દ્વારા ડિસ્પેચ કરવામાં આવશે.`
                : `Thank you ${submittedOrder.buyerName}! Your sample request for ${submittedOrder.productName} has been transmitted to our export logistics hub. Packaging and laboratory documentation is underway.`}
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px', maxWidth: '600px', margin: '0 auto 24px auto', textAlign: 'left', fontSize: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                <div><span style={{ color: '#94a3b8' }}>Company:</span> <strong style={{ color: '#ffffff' }}>{submittedOrder.companyName}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Destination:</span> <strong style={{ color: '#ffffff' }}>{submittedOrder.portCity}, {submittedOrder.country}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Sample Size:</span> <strong style={{ color: '#38bdf8' }}>{submittedOrder.sampleQty}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Courier Mode:</span> <strong style={{ color: '#facc15' }}>{submittedOrder.courierName} ({submittedOrder.courierType === 'freight_collect' ? 'Freight Collect' : 'Prepaid'})</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', padding: '10px 20px', fontSize: '0.9rem', fontWeight: 800 }}
                onClick={() => setShowCustomsInvoice(true)}
              >
                📄 {currentLang === 'gu' ? 'કસ્ટમ્સ સેમ્પલ ઈન્વોઈસ જુઓ (WCO 9803)' : 'View & Print Customs Sample Invoice'}
              </button>

              <button
                type="button"
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', padding: '10px 20px', fontSize: '0.9rem', fontWeight: 800 }}
                onClick={() => {
                  const msg = encodeURIComponent(
                    `Hello Atsondika Global Trade, I have submitted a B2B Sample Request on your website.\n\n` +
                    `📦 *Sample ID:* ${submittedOrder.id}\n` +
                    `📦 *Product:* ${submittedOrder.productName} (HS: ${submittedOrder.hsCode})\n` +
                    `⚖️ *Sample Qty:* ${submittedOrder.sampleQty}\n` +
                    `🏢 *Company:* ${submittedOrder.companyName} (${submittedOrder.country})\n` +
                    `👤 *Contact:* ${submittedOrder.buyerName} (${submittedOrder.phone})\n` +
                    `🚚 *Courier:* ${submittedOrder.courierName} (${submittedOrder.courierType})\n` +
                    (submittedOrder.courierAccountNo ? `🔢 *Courier Account No:* ${submittedOrder.courierAccountNo}\n` : '') +
                    `📍 *Delivery Address:* ${submittedOrder.address}, ${submittedOrder.portCity}\n\n` +
                    `Please dispatch at your earliest convenience. Thank you!`
                  );
                  window.open(`https://wa.me/917861997755?text=${msg}`, '_blank');
                }}
              >
                💬 {currentLang === 'gu' ? 'વોટ્સએપ પર સેમ્પલ રિક્વેસ્ટ મોકલો' : 'Share on WhatsApp'}
              </button>

              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '10px 18px', fontSize: '0.9rem', fontWeight: 800 }}
                onClick={() => {
                  closeModal();
                  if (setIsOrderTrackerOpen) setIsOrderTrackerOpen(true);
                }}
              >
                🔍 {currentLang === 'gu' ? 'સેમ્પલ શિપમેન્ટ ટ્રેક કરો' : 'Track Sample Status'}
              </button>
            </div>
          </div>
        ) : (
          /* FORM BODY */
          <div>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(45, 212, 191, 0.12)', border: '1px solid rgba(45, 212, 191, 0.3)', padding: '4px 14px', borderRadius: '50px', color: '#2dd4bf', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                <span>📦 B2B Commercial Export Evaluation</span>
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: '0 0 6px 0' }}>
                {currentLang === 'gu' ? '📦 સેમ્પલ મંગાવો (Request B2B Export Sample)' : 'Request a Product Sample for B2B Evaluation'}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, maxWidth: '620px', marginInline: 'auto' }}>
                {currentLang === 'gu'
                  ? 'વિદેશી ખરીદદારો માટે લેબોરેટરી ટેસ્ટિંગ અને ક્વોલિટી ચકાસણી માટે ફાસ્ટ એર એક્સપ્રેસ કુરિયર (DHL / FedEx) દ્વારા સેમ્પલ મેળવવાની સુવિધા.'
                  : 'Fast-track international air express dispatch for global importers, brokers & institutions requiring laboratory quality inspection prior to full container contracts.'}
              </p>
            </div>

            {/* Product Card Selector */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <img
                src={prodImg}
                alt={prodTitle}
                style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}
              />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>
                  HS Code: {currentProd?.hsCode || '090931'} • {currentProd?.category || 'Export Item'}
                </span>
                <h4 style={{ margin: '2px 0 4px 0', fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                  {prodTitle}
                </h4>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                  Std Packaging: {currentProd?.packaging || 'Export Standard Packaging'}
                </span>
              </div>

              {/* Product Switcher Dropdown */}
              {allProds.length > 1 && (
                <div style={{ minWidth: '180px' }}>
                  <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '2px' }}>
                    {currentLang === 'gu' ? 'પ્રોડક્ટ બદલો:' : 'Switch Product:'}
                  </label>
                  <select
                    className="form-control"
                    style={{ fontSize: '0.8rem', padding: '6px 8px', background: '#090d16', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                  >
                    {allProds.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.names ? (p.names[currentLang] || p.names['en'] || p.name) : p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Buyer & Company Details */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🏢</span> {currentLang === 'gu' ? '૧. ખરીદદાર & કંપની વિગત (Buyer & Company Information)' : '1. Buyer & Company Information'}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                      {currentLang === 'gu' ? 'સંપર્ક વ્યક્તિનું નામ *' : 'Contact Person Full Name *'}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. John Smith / Ahmed Al-Maktoum"
                      required
                      value={formData.buyerName}
                      onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                      {currentLang === 'gu' ? 'કંપનીનું નામ (Firm / Company) *' : 'Company / Firm Name *'}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Al-Maktoum Trading LLC / EuroFoods GmbH"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                      {currentLang === 'gu' ? 'ઓફિશિયલ બિઝનેસ ઈમેલ *' : 'Official Business Email *'}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="e.g. purchase@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                      {currentLang === 'gu' ? 'વોટ્સએપ / ફોન નંબર (દેશના કોડ સાથે) *' : 'WhatsApp / Mobile No (with Country Code) *'}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. +971 50 123 4567 / +1 415 555 2671"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                      {currentLang === 'gu' ? 'દેશ (Destination Country) *' : 'Destination Country *'}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. United Arab Emirates, USA, Germany, UK"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                      {currentLang === 'gu' ? 'પોર્ટ / શહેર (Destination Port / City) *' : 'Destination Port / City *'}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Dubai / Jebel Ali Port, Rotterdam, New York"
                      required
                      value={formData.portCity}
                      onChange={(e) => setFormData({ ...formData, portCity: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                    {currentLang === 'gu' ? 'કુરિયર ડિલિવરી સરનામું (Street, Building, City, Zip Code) *' : 'Full Courier Delivery Street Address & Zip Code *'}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Warehouse 14, Al Quoz Industrial Area 3, Dubai, UAE (Zip: 89201)"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              {/* Sample Specifications & Evaluation Purpose */}
              <div style={{ marginBottom: '18px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔬</span> {currentLang === 'gu' ? '૨. સેમ્પલ સાઈઝ & ચકાસણી હેતુ (Sample Specs & Purpose)' : '2. Sample Quantity & Testing Purpose'}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                      {currentLang === 'gu' ? 'જરૂરી સેમ્પલ માત્રા (Sample Quantity)' : 'Sample Quantity'}
                    </label>
                    <select
                      className="form-control"
                      value={formData.sampleQty}
                      onChange={(e) => setFormData({ ...formData, sampleQty: e.target.value })}
                    >
                      <option value="100g Airtight Lab Canister">100g Lab Canister (Agro / Spices)</option>
                      <option value="250g Airtight Foil Pack">250g Vacuum Foil Pack (Recommended)</option>
                      <option value="500g Airtight Sample Jar">500g Sample Jar (Grain / Ghee / Oil)</option>
                      <option value="1 kg Master Test Sample Pack">1 kg Master Evaluation Pack</option>
                      <option value="2 Pcs (Machined Sample)">2 Pcs / Units (Industrial / Fasteners / CNC)</option>
                      <option value="1 Swatch / Fabric Sample (1m)">1 Swatch / Fabric Sample (Textiles / Eco Bags)</option>
                      <option value="Custom Quantity (As discussed)">Custom Quantity (Special Request)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                      {currentLang === 'gu' ? 'સેમ્પલ મંગાવવાનો હેતુ (Evaluation Purpose)' : 'Testing / Evaluation Purpose'}
                    </label>
                    <select
                      className="form-control"
                      value={formData.evaluationPurpose}
                      onChange={(e) => setFormData({ ...formData, evaluationPurpose: e.target.value })}
                    >
                      {SAMPLE_PURPOSES.map(p => (
                        <option key={p.id} value={p.labelEn}>
                          {currentLang === 'gu' ? p.labelGu : p.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Courier & Shipping Options */}
              <div style={{ marginBottom: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🚚</span> {currentLang === 'gu' ? '૩. ઇન્ટરનેશનલ કુરિયર પદ્ધતિ (International Courier Preference)' : '3. International Courier & Freight Option'}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: '10px', marginBottom: '14px' }}>
                  {/* Mode 1: Freight Collect */}
                  <label
                    style={{
                      background: formData.courierType === 'freight_collect' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.02)',
                      border: formData.courierType === 'freight_collect' ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="courierType"
                        value="freight_collect"
                        checked={formData.courierType === 'freight_collect'}
                        onChange={() => setFormData({ ...formData, courierType: 'freight_collect' })}
                      />
                      <strong style={{ fontSize: '0.84rem', color: '#ffffff' }}>
                        🚚 Freight Collect (0% Exporter Cost)
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: '1.4' }}>
                      {currentLang === 'gu'
                        ? 'પ્રોડક્ટ સેમ્પલ ૧૦૦% ફ્રી! કુરિયર ચાર્જ તમારા DHL/FedEx એકાઉન્ટમાંથી બિલ થશે.'
                        : 'Free sample product. Shipping charged directly to your DHL / FedEx / Aramex account.'}
                    </span>
                  </label>

                  {/* Mode 2: Prepaid International Courier */}
                  <label
                    style={{
                      background: formData.courierType === 'prepaid' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.02)',
                      border: formData.courierType === 'prepaid' ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="courierType"
                        value="prepaid"
                        checked={formData.courierType === 'prepaid'}
                        onChange={() => setFormData({ ...formData, courierType: 'prepaid' })}
                      />
                      <strong style={{ fontSize: '0.84rem', color: '#ffffff' }}>
                        💳 Prepaid Flat Rate ($35 / ₹2,900)
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: '1.4' }}>
                      {currentLang === 'gu'
                        ? 'જો કુરિયર એકાઉન્ટ ન હોય, તો નોમિનલ શિપિંગ ફી ઓનલાઇન ચૂકવો (કન્ટેનર ઓર્ડરમાં બાદ મળશે).'
                        : 'Nominal flat courier fee. 100% refundable against your first container order!'}
                    </span>
                  </label>

                  {/* Mode 3: Sponsored Evaluation */}
                  <label
                    style={{
                      background: formData.courierType === 'sponsored' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.02)',
                      border: formData.courierType === 'sponsored' ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="courierType"
                        value="sponsored"
                        checked={formData.courierType === 'sponsored'}
                        onChange={() => setFormData({ ...formData, courierType: 'sponsored' })}
                      />
                      <strong style={{ fontSize: '0.84rem', color: '#ffffff' }}>
                        ⭐ Free Trial (Exporter Approval)
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: '1.4' }}>
                      {currentLang === 'gu'
                        ? 'મોટી આંતરરાષ્ટ્રીય કંપનીઓ અને નિયમિત ખરીદદારો માટે એડમિન એપ્રૂવલથી ફ્રી શિપિંગ.'
                        : 'Subject to management approval for verified high-volume corporate buyers.'}
                    </span>
                  </label>
                </div>

                {/* Freight Collect Carrier details */}
                {formData.courierType === 'freight_collect' && (
                  <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800, marginBottom: '4px' }}>
                        Carrier Partner *
                      </label>
                      <select
                        className="form-control"
                        value={formData.courierName}
                        onChange={(e) => setFormData({ ...formData, courierName: e.target.value })}
                      >
                        {COURIER_PARTNERS.map(c => (
                          <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800, marginBottom: '4px' }}>
                        Buyer Courier Account No. (9-Digit) *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 968472910"
                        required
                        value={formData.courierAccountNo}
                        onChange={(e) => setFormData({ ...formData, courierAccountNo: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Special Instructions */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>
                  {currentLang === 'gu' ? 'વિશેષ નોંધ / વિનંતી (Special Testing Instructions / Documents)' : 'Special Testing Notes / Required Documents (Phytosanitary, Lab COA)'}
                </label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="e.g. Please include Certificate of Analysis (COA) with moisture & purity test report."
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeModal}
                  style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                >
                  {currentLang === 'gu' ? 'રદ કરો (Cancel)' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 4px 18px rgba(16, 185, 129, 0.45)',
                    padding: '10px 28px',
                    fontSize: '0.92rem',
                    fontWeight: 900
                  }}
                >
                  📦 {currentLang === 'gu' ? 'સેમ્પલ રિક્વેસ્ટ સબમિટ કરો (Submit Request)' : 'Submit Sample Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
