import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const DEMO_ORDERS = [
  {
    id: 'EXP-2026-8801',
    blNumber: 'BL-ADIDEV-99201',
    containerNo: 'MSCU-884920-1',
    client: 'Al-Maktoum Trading LLC',
    destination: 'Jebel Ali Port, Dubai, UAE',
    vessel: 'MSC MEDITERRANEAN V.204',
    product: 'Premium Cumin Seeds 99% Pure & Basmati Rice 1121',
    quantity: '2 x 20ft FCL (48 MT)',
    status: 'IN_TRANSIT',
    progress: 70,
    eta: '2026-08-16',
    timeline: [
      { step: 1, title: 'Order & RFQ Confirmed', date: '2026-08-01', status: 'completed', desc: 'Contract signed & Advance Payment Verified' },
      { step: 2, title: 'APEDA & ISO Quality Audit', date: '2026-08-04', status: 'completed', desc: 'Laboratory Certificate & Phytosanitary Issued' },
      { step: 3, title: 'Container Stuffing at Factory', date: '2026-08-06', status: 'completed', desc: '20ft Containers sealed with Custom Bolt Seals' },
      { step: 4, title: 'Customs Clearance (Hazira/Surat Port)', date: '2026-08-08', status: 'completed', desc: 'Shipping Bill Passed & Port Gate-In Complete' },
      { step: 5, title: 'Vessel Departed Port', date: '2026-08-10', status: 'active', desc: 'Sailing Arabian Sea en-route to Jebel Ali Port' },
      { step: 6, title: 'Destination Customs & Delivery', date: '2026-08-16', status: 'pending', desc: 'Arrival at Jebel Ali Port, UAE' }
    ]
  },
  {
    id: 'EXP-2026-8802',
    blNumber: 'BL-ADIDEV-77405',
    containerNo: 'MAEU-339210-4',
    client: 'Dubois Import-Export S.A.',
    destination: 'Port of Marseille, France',
    vessel: 'MAERSK MC-KINNEY V.402',
    product: 'Used Textile CNC Machines & Jute Eco Bags',
    quantity: '1 x 40ft HQ FCL',
    status: 'CUSTOMS_CLEARED',
    progress: 45,
    eta: '2026-08-25',
    timeline: [
      { step: 1, title: 'Order & RFQ Confirmed', date: '2026-08-03', status: 'completed', desc: 'Proforma Invoice Accepted' },
      { step: 2, title: 'Quality Audit & Machine Testing', date: '2026-08-06', status: 'completed', desc: 'Video Inspection & Wooden Box Packaging' },
      { step: 3, title: 'Customs Clearance at Mundra Port', date: '2026-08-11', status: 'completed', desc: 'Export Duty & Chamber of Commerce Document Seals' },
      { step: 4, title: 'Vessel Departure', date: '2026-08-14', status: 'active', desc: 'Scheduled for Loading on Maersk Vessel' },
      { step: 5, title: 'Destination Customs Clearance', date: '2026-08-24', status: 'pending', desc: 'Marseille Port Customs Entry' },
      { step: 6, title: 'Delivered to Customer Warehouse', date: '2026-08-25', status: 'pending', desc: 'Final Unloading in France' }
    ]
  }
];

export default function OrderTrackerModal() {
  const { isOrderTrackerOpen, setIsOrderTrackerOpen, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('EXP-2026-8801');
  const [activeOrder, setActiveOrder] = useState(DEMO_ORDERS[0]);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOrderTrackerOpen) return null;

  const handleSearchOrder = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const query = searchQuery.trim().toUpperCase();

    const found = DEMO_ORDERS.find(
      o => o.id.toUpperCase().includes(query) ||
           o.blNumber.toUpperCase().includes(query) ||
           o.containerNo.toUpperCase().includes(query) ||
           o.client.toUpperCase().includes(query)
    );

    if (found) {
      setActiveOrder(found);
    } else {
      setErrorMessage(`⚠️ No active shipment found matching "${query}". Try sample BL number: "BL-ADIDEV-99201" or "EXP-2026-8801".`);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsOrderTrackerOpen(false)}>
      <div className="modal-card tracker-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>🌐</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900 }}>Realtime Shipment & Order Tracker</h3>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-sub)' }}>
                Amazon / Flipkart Style Global Container & BL Tracking System
              </span>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => setIsOrderTrackerOpen(false)}
            aria-label="Close Tracker"
          >
            ✕
          </button>
        </div>

        {/* Search Bar */}
        <div className="tracker-search-container">
          <form onSubmit={handleSearchOrder} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="tracker-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order ID (EXP-2026-8801), BL Number, or Container No..."
            />
            <button type="submit" className="btn-primary" style={{ minWidth: '140px' }}>
              🔍 Track Live
            </button>
          </form>

          {errorMessage && (
            <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '8px', fontWeight: 600 }}>
              {errorMessage}
            </div>
          )}

          <div className="tracker-quick-demos">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Quick Demos:</span>
            {DEMO_ORDERS.map(demo => (
              <button
                key={demo.id}
                type="button"
                className={`demo-pill ${activeOrder.id === demo.id ? 'active' : ''}`}
                onClick={() => {
                  setSearchQuery(demo.id);
                  setActiveOrder(demo);
                  setErrorMessage('');
                }}
              >
                📍 {demo.id} ({demo.destination.split(',')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Active Order Details */}
        {activeOrder && (
          <div className="tracker-body">
            {/* Overview Card */}
            <div className="tracker-overview-card">
              <div className="tracker-overview-grid">
                <div>
                  <span className="tracker-label">Order Reference</span>
                  <div className="tracker-val" style={{ color: 'var(--accent-teal)' }}>{activeOrder.id}</div>
                </div>
                <div>
                  <span className="tracker-label">Bill of Lading (BL)</span>
                  <div className="tracker-val">{activeOrder.blNumber}</div>
                </div>
                <div>
                  <span className="tracker-label">Container Seal No.</span>
                  <div className="tracker-val">{activeOrder.containerNo}</div>
                </div>
                <div>
                  <span className="tracker-label">Vessel & Voyage</span>
                  <div className="tracker-val">{activeOrder.vessel}</div>
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span className="tracker-label">Product Cargo</span>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeOrder.product}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{activeOrder.quantity}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="tracker-label">Estimated Delivery (ETA)</span>
                  <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#38bdf8' }}>{activeOrder.eta}</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ margin: '24px 0 16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 800 }}>
                <span>Shipment Status: <span style={{ color: '#2dd4bf' }}>{activeOrder.status.replace('_', ' ')}</span></span>
                <span>{activeOrder.progress}% Completed</span>
              </div>
              <div className="tracker-progress-track">
                <div
                  className="tracker-progress-fill"
                  style={{ width: `${activeOrder.progress}%` }}
                >
                  <div className="tracker-ship-icon">🚢</div>
                </div>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="tracker-timeline">
              <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 800 }}>Live Container Journey Timeline</h4>

              <div className="timeline-container">
                {activeOrder.timeline.map((step) => (
                  <div key={step.step} className={`timeline-step ${step.status}`}>
                    <div className="step-badge">
                      {step.status === 'completed' ? '✓' : step.status === 'active' ? '🚢' : step.step}
                    </div>
                    <div className="step-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h5 className="step-title">{step.title}</h5>
                        <span className="step-date">{step.date}</span>
                      </div>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
