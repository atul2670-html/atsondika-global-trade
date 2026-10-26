import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AiChatDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { activeCompany, currentLang, isEngineeringUnitEnabled } = useApp();

  const isGu = currentLang === 'gu';
  const companyName = activeCompany?.name || 'Atsondika Global Trade';
  const phone = activeCompany?.phone || '+91 78619 97755';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

    const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  };

  const openWhatsApp = (msg) => {
    window.open(`https://wa.me/${cleanPhone || '917861997755'}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
            {/* DIRECT TO TOP FLOATING BUTTON (Placed right near/above WhatsApp Logo) */}
      <button
        type="button"
        className="scroll-to-top-btn"
        onClick={scrollToTop}
        title={isGu ? "ડાઈરેક્ટ ટોપ પર જાઓ (Direct to Top)" : "Direct to Top"}
        aria-label="Direct to Top"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
        <span className="scroll-to-top-label">
          {isGu ? 'ટોપ' : 'TOP'}
        </span>
      </button>

      <button
        type="button"
        className="floating-widget-btn"
        onClick={() => setDrawerOpen(!drawerOpen)}
        title={isGu ? "વોટ્સએપ ઇન્સ્ટન્ટ ઇન્ક્વાયરી ડેસ્ક" : "Instant Export & Job Work Inquiry"}
        style={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="white"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        <div className="pulse-ring"></div>
      </button>

      <div className={`ai-chat-drawer ${drawerOpen ? 'show' : ''}`}>
        <div className="ai-chat-header" style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)' }}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💬</span>
            <span>{isGu ? 'ઇન્સ્ટન્ટ એક્સપોર્ટ & જોબ વર્ક ડેસ્ક' : 'Instant Export & Job Work Desk'}</span>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.3rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
            {isGu ? 'તમારો વિષય પસંદ કરો (ઝડપી જવાબ માટે):' : 'Select a quick inquiry topic:'}
          </p>
          
          <button
            type="button"
            className="btn-secondary"
            style={{ textAlign: 'left', fontSize: '0.84rem' }}
            onClick={() => openWhatsApp(`Hello ${companyName}, I would like to inquire about 1121 Basmati Rice & Spices pricing.`)}
          >
            🌾 {isGu ? 'ચોખા & મસાલા ઇન્ક્વાયરી' : 'Rice & Spices Inquiry'}
          </button>

          {isEngineeringUnitEnabled && (
          <button
            type="button"
            className="btn-secondary"
            style={{
              textAlign: 'left',
              fontSize: '0.84rem',
              borderColor: 'rgba(45, 212, 191, 0.45)',
              background: 'rgba(45, 212, 191, 0.08)'
            }}
            onClick={() => openWhatsApp(`Hello ${companyName}, I have technical drawings and need a quote for CNC Fiber Laser Sheet/Pipe Cutting and Jyoti VMC Precision Job Work.`)}
          >
            ⚡ {isGu ? 'લેસર કટિંગ & VMC જોબ વર્ક' : 'Laser Cutting & VMC Job Work'}
          </button>
          )}

          <button
            type="button"
            className="btn-secondary"
            style={{ textAlign: 'left', fontSize: '0.84rem' }}
            onClick={() => openWhatsApp(`Hello ${companyName}, Please provide specs for New/Used CNC Machinery & Fasteners.`)}
          >
            ⚙️ {isGu ? 'નવી & વપરાયેલી મશીનરી' : 'CNC & Industrial Machinery'}
          </button>

          <button
            type="button"
            className="btn-secondary"
            style={{ textAlign: 'left', fontSize: '0.84rem' }}
            onClick={() => openWhatsApp(`Hello ${companyName}, Please send details regarding Container Shipping, Port Logistics and APEDA/ISO certificates.`)}
          >
            📜 {isGu ? 'શિપિંગ & સર્ટિફિકેટ્સ ડેસ્ક' : 'Certificate & Shipping Desk'}
          </button>

          <button
            type="button"
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              justifyContent: 'center',
              marginTop: '6px',
              padding: '10px 16px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
            onClick={() => openWhatsApp(`Hello ${companyName}, I have a direct export & job work inquiry.`)}
          >
            📲 {isGu ? 'વોટ્સએપ પર સીધી વાત કરો' : 'Chat Direct on WhatsApp'}
          </button>
        </div>
      </div>
    </>
  );
}
