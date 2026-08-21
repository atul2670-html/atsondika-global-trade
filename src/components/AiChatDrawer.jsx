import React, { useState } from 'react';

export default function AiChatDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="floating-widget-btn"
        onClick={() => setDrawerOpen(!drawerOpen)}
        title="Instant Export Inquiry"
      >
        💬
        <div className="pulse-ring"></div>
      </button>

      <div className={`ai-chat-drawer ${drawerOpen ? 'show' : ''}`}>
        <div className="ai-chat-header">
          <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>💬 Instant Export Support Desk</div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.3rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>Select a quick inquiry topic:</p>
          
          <button
            type="button"
            className="btn-secondary"
            style={{ textAlign: 'left', fontSize: '0.84rem' }}
            onClick={() => window.open('https://wa.me/917861997755?text=I%20would%20like%20to%20inquire%20about%201121%20Basmati%20Rice%20pricing.', '_blank')}
          >
            🌾 Rice & Spices Inquiry
          </button>

          <button
            type="button"
            className="btn-secondary"
            style={{ textAlign: 'left', fontSize: '0.84rem' }}
            onClick={() => window.open('https://wa.me/917861997755?text=Please%20provide%20specs%20for%20New/Used%20CNC%20Machinery.', '_blank')}
          >
            ⚙️ CNC & Industrial Machinery
          </button>

          <button
            type="button"
            className="btn-secondary"
            style={{ textAlign: 'left', fontSize: '0.84rem' }}
            onClick={() => window.open('https://wa.me/917861997755?text=Send%20details%20regarding%20Container%20Logistics%20and%20APEDA%20certificates.', '_blank')}
          >
            📜 Certificate & Shipping Desk
          </button>

          <a
            href="https://wa.me/917861997755?text=Hello%20ADIDEV%20SMART%20SOLUTION,%20I%20have%20an%20export%20inquiry."
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', justifyContent: 'center', marginTop: '6px' }}
          >
            📲 Chat Direct on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
