import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function EngineeringSection() {
  const { currentLang, activeCompany, setIsRfqDrawerOpen } = useApp();

  const [bodorTab, setBodorTab] = useState('machine'); // 'machine' | 'plate'
  const [jyotiTab, setJyotiTab] = useState('machine'); // 'machine' | 'plate'

  const isGu = currentLang === 'gu';
  const isHi = currentLang === 'hi';
  const isFr = currentLang === 'fr';

  const companyName = activeCompany?.name || 'Atsondika Global Trade';
  const phone = activeCompany?.phone || '+91 78619 97755';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const openWhatsAppInquiry = (topic) => {
    const text = isGu
      ? `નમસ્તે ${companyName}, હું CNC લેસર કટિંગ અને VMC પ્રિસિઝન જોબ વર્ક (${topic}) માટે ડ્રોઇંગ અને ભાવની માહિતી મેળવવા માંગુ છું.`
      : isHi
      ? `नमस्ते ${companyName}, मैं सीएनसी लेजर कटिंग और वीएमसी प्रेसिजन जॉब वर्क (${topic}) के लिए ड्राइंग और कोटेशन चाहता हूँ।`
      : `Hello ${companyName}, I would like to inquire about CNC Laser Cutting & VMC Precision Job Work (${topic}) with our technical drawings.`;
    window.open(`https://wa.me/${cleanPhone || '917861997755'}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="section engineering-section" id="engineering">
      {/* Ambient background glow accent */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '650px',
          height: '350px',
          background: 'radial-gradient(ellipse at center, rgba(45, 212, 191, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* SECTION HEADER */}
        <div className="section-header">
          <div className="engineering-badge">
            ⚙️ {isGu ? 'ઇન-હાઉસ ઇન્ડસ્ટ્રિયલ ઇન્ફ્રાસ્ટ્રક્ચર' : isHi ? 'इन-हाउस औद्योगिक बुनियादी ढांचा' : isFr ? 'Infrastructure Industrielle Intégrée' : 'In-House Industrial Infrastructure'}
          </div>

          <h2 className="section-title engineering-title">
            {isGu
              ? 'અદ્યતન એન્જિનિયરિંગ & CNC પ્રિસિઝન જોબ વર્ક હબ'
              : isHi
              ? 'उन्नत इंजीनियरिंग और सीएनसी सटीक जॉब वर्क हब'
              : isFr
              ? "Pôle d'Ingénierie de Précision et d'Usinage CNC"
              : 'Advanced Precision Engineering & CNC Job Work Hub'}
          </h2>

          <p className="section-subtitle engineering-subtitle">
            {isGu
              ? 'સુરત અને દક્ષિણ ગુજરાતના ઔદ્યોગિક એકમો તેમ જ ગ્લોબલ એક્સપોર્ટ માટે કટિંગથી લઈને સંપૂર્ણ તૈયાર મશીનરી પાર્ટ્સનું ઇન-હાઉસ ઉત્પાદન.'
              : isHi
              ? 'सूरत और दक्षिण गुजरात के उद्योगों तथा वैश्विक निर्यात के लिए कटिंग से लेकर तैयार मशीनरी पार्ट्स का इन-हाउस निर्माण।'
              : isFr
              ? 'De la découpe de tôles et tubes aux composants mécaniques finis de haute précision fabriqués en interne à Surat, Gujarat.'
              : 'Turnkey in-house precision component manufacturing in Surat, Gujarat — from laser profile & tube cutting to micron-accurate VMC machining.'}
          </p>
        </div>

        {/* 2 MAIN ADVANCED MACHINES GRID */}
        <div className="engineering-grid">
          {/* MACHINE 1: BODOR FIBER LASER CUTTER */}
          <div className="card engineering-card">
            {/* Visual Container with Interactive View Switcher */}
            <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', marginBottom: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <img
                src={bodorTab === 'machine' ? 'images/bodor_laser_showroom_new.jpg' : 'images/bodor_laser_cutting_machine.jpg'}
                alt="Bodor A3T6 CNC Fiber Laser Cutting System"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: bodorTab === 'machine' ? 'cover' : 'contain',
                  background: '#0a0f1d',
                  display: 'block',
                  transition: 'opacity 0.3s ease'
                }}
                onError={(e) => { e.target.src = 'images/logo.png'; }}
              />

              {/* View Switcher Pills */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  display: 'flex',
                  gap: '6px',
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(12px)',
                  padding: '4px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <button
                  type="button"
                  style={{
                    background: bodorTab === 'machine' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'transparent',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '3px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onClick={() => setBodorTab('machine')}
                >
                  ✨ {isGu ? 'નવો મશીન લુક' : 'New Machine'}
                </button>
                <button
                  type="button"
                  style={{
                    background: bodorTab === 'plate' ? 'linear-gradient(135deg, #059669, #047857)' : 'transparent',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '3px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onClick={() => setBodorTab('plate')}
                >
                  🔍 {isGu ? 'ઓરિજિનલ નેમપ્લેટ' : 'OEM Plate'}
                </button>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(5, 150, 105, 0.92)',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '10px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}
              >
                Model: Bodor A3T6
              </div>
            </div>

            <h3 className="engineering-card-title">
              {isGu ? 'CNC ફાઈબર લેસર કટિંગ સિસ્ટમ (શીટ & પાઇપ)' : 'CNC Fiber Laser Sheet & Tube Cutting'}
            </h3>

            <p className="engineering-card-desc">
              {isGu
                ? 'મેટલ શીટ પ્લેટની સાથે રાઉન્ડ, સ્ક્વેર અને રેક્ટંગ્યુલર પાઇપનું અતિશય ચોકસાઈપૂર્વક બર્ર-ફ્રી (Burr-free) હાઈ-સ્પીડ કટિંગ.'
                : 'High-speed, zero-burr contour cutting for metal flat sheets as well as round, square, and rectangular tubes/pipes.'}
            </p>

            {/* Spec Highlights Grid */}
            <div className="engineering-specs-grid">
              <div className="engineering-spec-box">
                <span className="engineering-spec-label">
                  {isGu ? 'મટિરિયલ્સ' : 'Materials'}
                </span>
                <strong className="engineering-spec-value color-teal">MS, SS, Al, Brass</strong>
              </div>
              <div className="engineering-spec-box">
                <span className="engineering-spec-label">
                  {isGu ? 'કટિંગ ક્ષમતા' : 'Capability'}
                </span>
                <strong className="engineering-spec-value color-cyan">Sheet + Pipe/Tube</strong>
              </div>
              <div className="engineering-spec-box">
                <span className="engineering-spec-label">
                  {isGu ? 'એજ ફિનિશિંગ' : 'Edge Finish'}
                </span>
                <strong className="engineering-spec-value color-gold">Smooth & Ready</strong>
              </div>
              <div className="engineering-spec-box">
                <span className="engineering-spec-label">
                  {isGu ? 'એપ્લિકેશન' : 'Applications'}
                </span>
                <strong className="engineering-spec-value color-purple">Panels, Base Plates</strong>
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '10px 16px' }}
                onClick={() => openWhatsAppInquiry('Fiber Laser Sheet & Tube Cutting')}
              >
                📐 {isGu ? 'લેસર કટિંગ ડ્રોઇંગ મોકલો' : 'Send Drawing for Laser Quote'}
              </button>
            </div>
          </div>

          {/* MACHINE 2: JYOTI RX-20 VMC MACHINING CENTER */}
          <div className="card engineering-card">
            {/* Visual Container with Interactive View Switcher */}
            <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', marginBottom: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <img
                src={jyotiTab === 'machine' ? 'images/jyoti_vmc_showroom_new.jpg' : 'images/jyoti_rx20_vmc_machine.jpg'}
                alt="Jyoti RX-20 C-Frame Vertical Machining Center"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: jyotiTab === 'machine' ? 'cover' : 'contain',
                  background: '#0a0f1d',
                  display: 'block',
                  transition: 'opacity 0.3s ease'
                }}
                onError={(e) => { e.target.src = 'images/logo.png'; }}
              />

              {/* View Switcher Pills */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  display: 'flex',
                  gap: '6px',
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(12px)',
                  padding: '4px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <button
                  type="button"
                  style={{
                    background: jyotiTab === 'machine' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'transparent',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '3px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onClick={() => setJyotiTab('machine')}
                >
                  ✨ {isGu ? 'નવો મશીન લુક' : 'New Machine'}
                </button>
                <button
                  type="button"
                  style={{
                    background: jyotiTab === 'plate' ? 'linear-gradient(135deg, #059669, #047857)' : 'transparent',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '3px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onClick={() => setJyotiTab('plate')}
                >
                  🔍 {isGu ? 'ઓરિજિનલ નેમપ્લેટ' : 'OEM Plate'}
                </button>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(2, 132, 199, 0.92)',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '10px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}
              >
                Jyoti CNC RX-20
              </div>
            </div>

            <h3 className="engineering-card-title">
              {isGu ? 'હેવી-ડ્યુટી VMC પ્રિસિઝન મશીનિંગ (Jyoti RX-20)' : 'Heavy-Duty VMC Precision Machining (Jyoti RX-20)'}
            </h3>

            <p className="engineering-card-desc">
              {isGu
                ? '25 kW સ્પિન્ડલ પાવર અને 20-ટૂલ ATC સાથે માઇક્રોન-લેવલ ચોકસાઈવાળું મિલિંગ, ડ્રિલિંગ, ટેપિંગ અને બોરિંગ કામ.'
                : 'High-torque 25 kW spindle power with 20-tool Automatic Tool Changer (ATC) delivering micron-accurate milling, boring, and rigid tapping.'}
            </p>

            {/* Spec Highlights Grid */}
            <div className="engineering-specs-grid">
              <div className="engineering-spec-box">
                <span className="engineering-spec-label">
                  {isGu ? 'પાવર & વજન' : 'Power & Rigidity'}
                </span>
                <strong className="engineering-spec-value color-teal">25 kW | 5,500 Kg</strong>
              </div>
              <div className="engineering-spec-box">
                <span className="engineering-spec-label">
                  {isGu ? 'ટૂલિંગ સિસ્ટમ' : 'Tool Magazine'}
                </span>
                <strong className="engineering-spec-value color-cyan">20-Tool Auto ATC</strong>
              </div>
              <div className="engineering-spec-box">
                <span className="engineering-spec-label">
                  {isGu ? 'ઇન્ડસ્ટ્રિયલ કૂલિંગ' : 'Panel Cooling'}
                </span>
                <strong className="engineering-spec-value color-gold">Werner Finley AC</strong>
              </div>
              <div className="engineering-spec-box">
                <span className="engineering-spec-label">
                  {isGu ? 'મુખ્ય એપ્લિકેશન' : 'Key Parts'}
                </span>
                <strong className="engineering-spec-value color-purple">Textile, Valves, Dies</strong>
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button
                type="button"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  padding: '10px 16px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  boxShadow: '0 0 16px rgba(2, 132, 199, 0.4)'
                }}
                onClick={() => openWhatsAppInquiry('VMC Heavy Precision Machining')}
              >
                ⚙️ {isGu ? 'VMC જોબ વર્ક ઇન્ક્વાયરી કરો' : 'Inquire for VMC Job Work'}
              </button>
            </div>
          </div>
        </div>

        {/* 4-STEP STREAMLINED WORKFLOW BANNER */}
        <div className="engineering-workflow-box">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h4 className="engineering-workflow-title">
              {isGu ? 'સરળ જોબ વર્ક પ્રક્રિયા (૪ સ્ટેપ્સ)' : 'Streamlined 4-Step Engineering Workflow'}
            </h4>
            <span className="engineering-workflow-subtitle">
              {isGu ? 'ડ્રોઇંગ મોકલવાથી લઈને ફાઇનલ પાર્ટ ડિલિવરી સુધી' : 'From initial drawing submission to ready-to-fit component dispatch'}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}
          >
            <div className="engineering-step-card">
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>📤</div>
              <strong className="engineering-step-title" style={{ color: '#0284c7' }}>
                1. {isGu ? 'ડ્રોઇંગ સબમિશન' : 'Submit CAD / Drawing'}
              </strong>
              <span className="engineering-step-desc">
                {isGu ? 'AutoCAD DWG, DXF, STEP, PDF અથવા સેમ્પલ' : 'Share 2D/3D technical drawings or physical samples'}
              </span>
            </div>

            <div className="engineering-step-card">
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>⚡</div>
              <strong className="engineering-step-title" style={{ color: '#0d9488' }}>
                2. {isGu ? 'લેસર શીટ/પાઇપ કટિંગ' : 'Laser Profile & Tube Cut'}
              </strong>
              <span className="engineering-step-desc">
                {isGu ? 'હાઈ સ્પીડ ફાઇબર લેસર વડે બર્ર-ફ્રી કટિંગ' : 'Bodor A3T6 high-speed precision contour cutting'}
              </span>
            </div>

            <div className="engineering-step-card">
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>⚙️</div>
              <strong className="engineering-step-title" style={{ color: '#b45309' }}>
                3. {isGu ? 'VMC મશીનિંગ & થ્રેડિંગ' : 'VMC Micron Machining'}
              </strong>
              <span className="engineering-step-desc">
                {isGu ? 'મિલિંગ, પ્રિસિઝન ડ્રિલિંગ અને રિજિડ ટેપિંગ' : 'Jyoti RX-20 secondary drilling, tapping & milling'}
              </span>
            </div>

            <div className="engineering-step-card">
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>🔍</div>
              <strong className="engineering-step-title" style={{ color: '#16a34a' }}>
                4. {isGu ? 'ક્વોલિટી ચેક & ડિલિવરી' : 'Quality Inspection'}
              </strong>
              <span className="engineering-step-desc">
                {isGu ? 'માઇક્રોમીટર પરિમાણ તપાસ અને સમયસર ડિસ્પેચ' : 'Micron dimensional check & on-schedule delivery'}
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION STRIP */}
        <div className="engineering-cta-strip">
          <div>
            <h4 className="engineering-cta-title">
              {isGu ? 'તમારી પાસે મશીનરી ડ્રોઇંગ કે જોબ વર્ક છે?' : 'Have Engineering Drawings or Custom Job Work Requirements?'}
            </h4>
            <span className="engineering-cta-subtitle">
              {isGu ? 'સુરત વર્કશોપ સાથે સીધા સંપર્ક કરી તુરંત ભાવ અને સેમ્પલિંગની વિગતો મેળવો.' : 'Connect directly with our Surat manufacturing facility for rapid turnaround quotes.'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                fontSize: '0.88rem',
                fontWeight: 800,
                borderRadius: '24px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(37, 211, 102, 0.4)'
              }}
              onClick={() => openWhatsAppInquiry('Drawing & Job Work Consultation')}
            >
              <span>📲</span> {isGu ? 'વોટ્સએપ પર ડ્રોઇંગ મોકલો' : 'Send Drawing on WhatsApp'}
            </button>

            <button
              type="button"
              className="btn-secondary"
              style={{
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 700,
                borderRadius: '24px',
                cursor: 'pointer'
              }}
              onClick={() => setIsRfqDrawerOpen(true)}
            >
              📋 {isGu ? 'ઓનલાઇન RFQ બનાવો' : 'Request Official RFQ'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
