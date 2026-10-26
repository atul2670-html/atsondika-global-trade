import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateDigitalRoundStampSvg } from '../utils/address';

const STATUS_CONFIG = {
  pending: { label: 'Pending Review', labelGu: 'ચકાસણી બાકી', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', icon: '⏳' },
  approved: { label: 'Approved / Packaging', labelGu: 'મંજૂર / પેકિંગ ચાલુ', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)', icon: '📦' },
  dispatched: { label: 'Dispatched / In-Transit', labelGu: 'ડિસ્પેચ / રવાના', color: '#818cf8', bg: 'rgba(129, 140, 248, 0.15)', border: 'rgba(129, 140, 248, 0.4)', icon: '✈️' },
  delivered: { label: 'Delivered to Buyer', labelGu: 'ડિલિવર થઈ ગયું', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.15)', border: 'rgba(74, 222, 128, 0.4)', icon: '✅' },
  rejected: { label: 'Rejected', labelGu: 'અસ્વીકાર', color: '#f87171', bg: 'rgba(248, 113, 113, 0.15)', border: 'rgba(248, 113, 113, 0.4)', icon: '❌' }
};

export default function SampleManagerModal() {
  const {
    activeModal,
    setActiveModal,
    sampleRequestsList,
    updateSampleRequest,
    deleteSampleRequest,
    activeCompany,
    currentLang,
    showLiveToast,
    setSelectedRfqProducts,
    setIsRfqDrawerOpen
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSample, setEditingSample] = useState(null);
  const [invoicePreviewSample, setInvoicePreviewSample] = useState(null);

  // Dispatch Edit Form State
  const [dispatchData, setDispatchData] = useState({
    status: 'dispatched',
    courierName: 'DHL Express',
    trackingNumber: '',
    dispatchedDate: new Date().toISOString().split('T')[0],
    adminNotes: ''
  });

  if (activeModal !== 'admin_samples') return null;

  const samples = Array.isArray(sampleRequestsList) ? sampleRequestsList : [];

  const filteredSamples = samples.filter(s => {
    if (statusFilter !== 'all' && (s.status || 'pending') !== statusFilter) return false;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (s.id || '').toLowerCase().includes(q) ||
      (s.buyerName || '').toLowerCase().includes(q) ||
      (s.companyName || '').toLowerCase().includes(q) ||
      (s.country || '').toLowerCase().includes(q) ||
      (s.productName || '').toLowerCase().includes(q) ||
      (s.trackingNumber || '').toLowerCase().includes(q)
    );
  });

  const counts = {
    all: samples.length,
    pending: samples.filter(s => (s.status || 'pending') === 'pending').length,
    approved: samples.filter(s => s.status === 'approved').length,
    dispatched: samples.filter(s => s.status === 'dispatched').length,
    delivered: samples.filter(s => s.status === 'delivered').length
  };

  const handleOpenDispatch = (sample) => {
    setEditingSample(sample);
    setDispatchData({
      status: sample.status === 'pending' ? 'approved' : (sample.status || 'dispatched'),
      courierName: sample.courierName || 'DHL Express',
      trackingNumber: sample.trackingNumber || '',
      dispatchedDate: sample.dispatchedDate || new Date().toISOString().split('T')[0],
      adminNotes: sample.notes || ''
    });
  };

  const handleSaveDispatch = () => {
    if (!editingSample) return;
    updateSampleRequest(editingSample.id, {
      status: dispatchData.status,
      courierName: dispatchData.courierName,
      trackingNumber: dispatchData.trackingNumber.trim(),
      dispatchedDate: dispatchData.dispatchedDate,
      notes: dispatchData.adminNotes.trim()
    });

    if (showLiveToast) {
      showLiveToast(`✅ Sample Order ${editingSample.id} updated to "${dispatchData.status}"!`, 'success');
    }
    setEditingSample(null);
  };

  const handleExportCSV = () => {
    const csvRows = [
      ["Sample ID", "Date", "Product Name", "HS Code", "Sample Quantity", "Buyer Name", "Company", "Email", "Phone", "Country", "Port / City", "Courier Mode", "Carrier", "Account No", "Status", "AWB Tracking No", "Notes"],
      ...samples.map(s => [
        s.id, s.date, s.productName, s.hsCode, s.sampleQty,
        s.buyerName, s.companyName, s.email, s.phone,
        s.country, s.portCity, s.courierType, s.courierName, s.courierAccountNo,
        s.status, s.trackingNumber, s.notes
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.map(x => `"${(x || '').toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `b2b_sample_requests_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleConvertToFclRfq = (s) => {
    const rfqItem = {
      id: s.productId || 'item_' + Date.now(),
      name: s.productName,
      hsCode: s.hsCode,
      category: s.category || 'agro',
      moq: '1 x 20ft FCL Container',
      unit: 'MT'
    };
    if (setSelectedRfqProducts) {
      setSelectedRfqProducts([rfqItem]);
    }
    if (setIsRfqDrawerOpen) {
      setIsRfqDrawerOpen(true);
    }
    setActiveModal(null);
    if (showLiveToast) {
      showLiveToast(`🚀 Converted Sample ${s.id} for "${s.buyerName}" into Full Container RFQ!`, 'success');
    }
  };

  return (
    <div className="modal-backdrop show" style={{ zIndex: 10000 }} onClick={() => setActiveModal(null)}>
      <div
        className="glass-card modal-card"
        style={{
          maxWidth: '1050px',
          width: '95vw',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '24px',
          background: 'linear-gradient(145deg, #0b1120 0%, #030712 100%)',
          border: '1px solid rgba(45, 212, 191, 0.4)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.95)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={() => setActiveModal(null)}
          style={{ top: '16px', right: '18px', zIndex: 10 }}
        >
          &times;
        </button>

        {/* CUSTOMS INVOICE PREVIEW MODAL */}
        {invoicePreviewSample && (
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
            onClick={() => setInvoicePreviewSample(null)}
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
                    onClick={() => setInvoicePreviewSample(null)}
                    style={{ background: '#f3f4f6', color: '#374151', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer', fontSize: '0.82rem' }}
                  >
                    ✕ Close
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'center', borderBottom: '1px solid #111827', paddingBottom: '10px', marginBottom: '14px' }}>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#000000' }}>
                  {activeCompany?.name || 'Atsondika Global Trade'}
                </h2>
                <div style={{ fontSize: '0.82rem', color: '#4b5563', lineHeight: '1.4' }}>
                  {activeCompany?.tagline || 'GLOBAL TRADING HOUSE & EXPORT HOUSE'}<br />
                  {activeCompany?.address || 'Surat, Gujarat, India - 395006'} | Phone: {activeCompany?.phone || '+91 78619 97755'}<br />
                  Email: {activeCompany?.email || 'info@atsondikaglobaltrade.com'} | GSTIN: {activeCompany?.gstin || '24AAACA0000A1Z5'}
                </div>
                <div style={{ marginTop: '8px', display: 'inline-block', background: '#000000', color: '#ffffff', padding: '3px 14px', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                  COMMERCIAL SAMPLE PROFORMA INVOICE
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.82rem', marginBottom: '14px' }}>
                <div style={{ border: '1px solid #d1d5db', padding: '10px', borderRadius: '6px' }}>
                  <strong style={{ display: 'block', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '4px', textTransform: 'uppercase', color: '#374151' }}>
                    Shipper / Exporter:
                  </strong>
                  <strong>{activeCompany?.name || 'Atsondika Global Trade'}</strong><br />
                  {activeCompany?.address || 'Surat, Gujarat, India'}<br />
                  Origin: <b>INDIA</b>
                </div>

                <div style={{ border: '1px solid #d1d5db', padding: '10px', borderRadius: '6px' }}>
                  <strong style={{ display: 'block', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '4px', textTransform: 'uppercase', color: '#374151' }}>
                    Consignee / Importer:
                  </strong>
                  <strong>{invoicePreviewSample.buyerName}</strong> ({invoicePreviewSample.companyName})<br />
                  {invoicePreviewSample.address}<br />
                  {invoicePreviewSample.portCity}, <b>{invoicePreviewSample.country}</b><br />
                  Phone: {invoicePreviewSample.phone} | Email: {invoicePreviewSample.email}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', background: '#f9fafb', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '14px' }}>
                <div><b>Sample Invoice:</b> {invoicePreviewSample.id}</div>
                <div><b>Date:</b> {invoicePreviewSample.date}</div>
                <div><b>AWB / Tracking:</b> {invoicePreviewSample.trackingNumber || 'PENDING DISPATCH'}</div>
                <div><b>Courier:</b> {invoicePreviewSample.courierName}</div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', marginBottom: '14px' }}>
                <thead>
                  <tr style={{ background: '#f3f4f6', borderTop: '1px solid #111827', borderBottom: '1px solid #111827' }}>
                    <th style={{ padding: '6px', textAlign: 'left' }}>Item #</th>
                    <th style={{ padding: '6px', textAlign: 'left' }}>Description of Goods</th>
                    <th style={{ padding: '6px', textAlign: 'center' }}>HS Tariff Code</th>
                    <th style={{ padding: '6px', textAlign: 'center' }}>Sample Qty</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Declared Value (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '8px 6px' }}>1</td>
                    <td style={{ padding: '8px 6px' }}>
                      <b>{invoicePreviewSample.productName}</b><br />
                      <span style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                        Purpose: {invoicePreviewSample.evaluationPurpose}
                      </span>
                    </td>
                    <td style={{ padding: '8px 6px', textAlign: 'center' }}>{invoicePreviewSample.hsCode}</td>
                    <td style={{ padding: '8px 6px', textAlign: 'center' }}>{invoicePreviewSample.sampleQty}</td>
                    <td style={{ padding: '8px 6px', textAlign: 'right' }}>$10.00</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ border: '1px dashed #9ca3af', padding: '10px 12px', fontSize: '0.78rem', background: '#fffbeb', color: '#92400e', marginBottom: '16px', lineHeight: '1.4' }}>
                <strong>⚠️ LEGAL CUSTOMS DECLARATION:</strong><br />
                "WE HEREBY DECLARE THAT THE CONTENTS OF THIS SHIPMENT ARE FREE COMMERCIAL SAMPLES OF NO COMMERCIAL VALUE, SENT SOLELY FOR LABORATORY TESTING, INSPECTION AND EVALUATION PURPOSES. VALUE DECLARED HEREIN ($10.00 USD) IS STRICTLY FOR CUSTOMS CLEARANCE PURPOSES ONLY PER WCO HS 9803 REGULATIONS."
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={activeCompany?.stamp || generateDigitalRoundStampSvg(activeCompany?.name || 'ATSONDIKA GLOBAL TRADE', activeCompany?.apedaReg || activeCompany?.gstin || 'REGISTERED EXPORTER')}
                    alt="Official Export Seal"
                    style={{ width: '105px', height: '105px', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: '#0369a1', fontWeight: 800, marginTop: '4px' }}>
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

        {/* DISPATCH / EDIT MODAL */}
        {editingSample && (
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
            onClick={() => setEditingSample(null)}
          >
            <div
              style={{
                background: '#0f172a',
                color: '#ffffff',
                width: '100%',
                maxWidth: '520px',
                borderRadius: '18px',
                padding: '24px',
                border: '1px solid rgba(45, 212, 191, 0.4)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ margin: '0 0 14px 0', fontSize: '1.25rem', fontWeight: 900, color: '#2dd4bf', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📦</span> Update Sample Dispatch [{editingSample.id}]
              </h3>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                  Status:
                </label>
                <select
                  className="form-control"
                  value={dispatchData.status}
                  onChange={(e) => setDispatchData({ ...dispatchData, status: e.target.value })}
                >
                  <option value="pending">⏳ Pending Review</option>
                  <option value="approved">📦 Approved & Packaging</option>
                  <option value="dispatched">✈️ Dispatched / In-Transit</option>
                  <option value="delivered">✅ Delivered to Buyer</option>
                  <option value="rejected">❌ Rejected</option>
                </select>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                  Courier Carrier:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. DHL Express Worldwide / FedEx"
                  value={dispatchData.courierName}
                  onChange={(e) => setDispatchData({ ...dispatchData, courierName: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                  Airway Bill (AWB) Tracking Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. DHL-8839201948 / 9876543210"
                  value={dispatchData.trackingNumber}
                  onChange={(e) => setDispatchData({ ...dispatchData, trackingNumber: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                  Dispatched Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={dispatchData.dispatchedDate}
                  onChange={(e) => setDispatchData({ ...dispatchData, dispatchedDate: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                  Internal Notes / Packing Details:
                </label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="e.g. Lab Phytosanitary Certificate #8849 enclosed in pouch."
                  value={dispatchData.adminNotes}
                  onChange={(e) => setDispatchData({ ...dispatchData, adminNotes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingSample(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)', fontWeight: 800 }}
                  onClick={handleSaveDispatch}
                >
                  Save & Update Status
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN MODAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '2.2rem' }}>📦</span>
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  {currentLang === 'gu' ? 'B2B સેમ્પલ ઓર્ડર્સ & કુરિયર ડિસ્પેચ કંટ્રોલ' : 'B2B Sample Inquiries & Courier Dispatch Center'}
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#2dd4bf', fontWeight: 800 }}>
                  Total {samples.length} Global Buyer Requests • Realtime Cloud Synchronized
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.8rem', color: '#4ade80', borderColor: 'rgba(34,197,94,0.4)', padding: '8px 14px' }}
              onClick={handleExportCSV}
            >
              📊 Export CSV / Excel
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '18px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
            {[
              { id: 'all', label: `All (${counts.all})` },
              { id: 'pending', label: `⏳ Pending (${counts.pending})` },
              { id: 'approved', label: `📦 Approved (${counts.approved})` },
              { id: 'dispatched', label: `✈️ Dispatched (${counts.dispatched})` },
              { id: 'delivered', label: `✅ Delivered (${counts.delivered})` }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  background: statusFilter === tab.id ? 'linear-gradient(135deg, #0d9488, #14b8a6)' : 'rgba(255,255,255,0.04)',
                  color: statusFilter === tab.id ? '#ffffff' : '#94a3b8',
                  border: statusFilter === tab.id ? '1px solid #2dd4bf' : '1px solid rgba(255,255,255,0.1)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ minWidth: '240px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by buyer, company, country, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontSize: '0.82rem', padding: '6px 12px' }}
            />
          </div>
        </div>

        {/* SAMPLES TABLE / LIST */}
        {filteredSamples.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.15)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📭</div>
            <h4 style={{ fontSize: '1.1rem', color: '#cbd5e1', margin: '0 0 4px 0' }}>
              No sample requests found matching "{statusFilter}" filter.
            </h4>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              New sample orders placed by global buyers will appear here in real time.
            </span>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8' }}>
                  <th style={{ padding: '10px 12px' }}>Sample ID & Date</th>
                  <th style={{ padding: '10px 12px' }}>Product & Sample Qty</th>
                  <th style={{ padding: '10px 12px' }}>Buyer & Overseas Importer</th>
                  <th style={{ padding: '10px 12px' }}>Courier & AWB Tracking</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSamples.map(sample => {
                  const statusInfo = STATUS_CONFIG[sample.status || 'pending'] || STATUS_CONFIG.pending;

                  return (
                    <tr
                      key={sample.id}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(255,255,255,0.015)'
                      }}
                    >
                      {/* ID & Date */}
                      <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                        <strong style={{ color: '#2dd4bf', display: 'block', fontSize: '0.86rem' }}>
                          {sample.id}
                        </strong>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          {sample.date}
                        </span>
                      </td>

                      {/* Product */}
                      <td style={{ padding: '12px', minWidth: '180px' }}>
                        <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.86rem' }}>
                          {sample.productName}
                        </strong>
                        <div style={{ fontSize: '0.74rem', color: '#38bdf8', marginTop: '2px' }}>
                          HS: {sample.hsCode} • <b>{sample.sampleQty}</b>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '2px' }}>
                          {sample.evaluationPurpose}
                        </div>
                      </td>

                      {/* Buyer */}
                      <td style={{ padding: '12px', minWidth: '190px' }}>
                        <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.86rem' }}>
                          {sample.buyerName}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: '#facc15', fontWeight: 700, display: 'block' }}>
                          🏢 {sample.companyName}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                          📍 {sample.portCity}, <b>{sample.country}</b>
                        </span>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                          📞 {sample.phone} | ✉️ {sample.email}
                        </div>
                      </td>

                      {/* Courier */}
                      <td style={{ padding: '12px', minWidth: '170px' }}>
                        <span style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 800, display: 'block' }}>
                          {sample.courierName}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: sample.courierType === 'freight_collect' ? '#38bdf8' : '#f59e0b', fontWeight: 700 }}>
                          {sample.courierType === 'freight_collect' ? `Collect A/c: ${sample.courierAccountNo}` : 'Prepaid Air Express'}
                        </span>
                        {sample.trackingNumber ? (
                          <div style={{ marginTop: '4px' }}>
                            <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                              AWB: {sample.trackingNumber}
                            </span>
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
                            (AWB Pending)
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: statusInfo.bg,
                            color: statusInfo.color,
                            border: `1px solid ${statusInfo.border}`,
                            padding: '3px 10px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 800
                          }}
                        >
                          <span>{statusInfo.icon}</span> {currentLang === 'gu' ? statusInfo.labelGu : statusInfo.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '12px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                          {/* Dispatch / Update */}
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ fontSize: '0.74rem', padding: '4px 8px', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.4)' }}
                            onClick={() => handleOpenDispatch(sample)}
                            title="Update Status & Tracking AWB"
                          >
                            ✏️ Update / AWB
                          </button>

                          {/* Customs Invoice */}
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ fontSize: '0.74rem', padding: '4px 8px', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)' }}
                            onClick={() => setInvoicePreviewSample(sample)}
                            title="View / Print WCO 9803 Sample Invoice"
                          >
                            📄 Invoice
                          </button>

                          {/* WhatsApp Buyer */}
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ fontSize: '0.74rem', padding: '4px 8px', color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.4)' }}
                            onClick={() => {
                              const cleanPhone = (sample.phone || '').replace(/[^0-9]/g, '');
                              const msg = encodeURIComponent(
                                `Hello ${sample.buyerName},\n\n` +
                                `Greetings from ${activeCompany?.name || 'Atsondika Global Trade'}! Regarding your sample request [${sample.id}] for *${sample.productName}*:\n\n` +
                                `Status: *${sample.status === 'dispatched' ? 'DISPATCHED VIA AIR EXPRESS' : (sample.status || 'IN PACKAGING')}*\n` +
                                (sample.trackingNumber ? `Carrier: *${sample.courierName}*\nAWB Tracking No: *${sample.trackingNumber}*\n` : '') +
                                `Destination: ${sample.portCity}, ${sample.country}\n\n` +
                                `Please feel free to connect for any questions. Thank you!`
                              );
                              window.open(`https://wa.me/${cleanPhone || '917861997755'}?text=${msg}`, '_blank');
                            }}
                            title="Message Buyer on WhatsApp"
                          >
                            💬
                          </button>

                          {/* Convert to Full Container RFQ */}
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ fontSize: '0.74rem', padding: '4px 8px', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.4)' }}
                            onClick={() => handleConvertToFclRfq(sample)}
                            title="Convert to Full Container (FCL/LCL) RFQ"
                          >
                            🚀 FCL Deal
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ fontSize: '0.74rem', padding: '4px 8px', color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.4)' }}
                            onClick={() => {
                              if (confirm(`🗑️ Delete sample request "${sample.id}" for ${sample.buyerName}?`)) {
                                deleteSampleRequest(sample.id);
                              }
                            }}
                            title="Delete Request"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
