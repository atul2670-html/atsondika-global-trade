import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function EngineeringSection() {
  const { currentLang, activeCompany, setIsRfqDrawerOpen } = useApp();

  const [bodorTab, setBodorTab] = useState('machine'); // 'machine' | 'plate'
  const [jyotiTab, setJyotiTab] = useState('machine'); // 'machine' | 'plate'
  const [activePlateModal, setActivePlateModal] = useState(null); // 'bodor' | 'jyoti' | 'ac' | null

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
    <section className="section" id="engineering" style={{ position: 'relative', overflow: 'hidden' }}>
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
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '24px',
              background: 'rgba(45, 212, 191, 0.12)',
              border: '1px solid rgba(45, 212, 191, 0.35)',
              color: 'var(--primary-teal-glow)',
              fontSize: '0.82rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.4px',
              marginBottom: '14px',
              boxShadow: '0 0 16px rgba(45, 212, 191, 0.2)'
            }}
          >
            ⚙️ {isGu ? 'ઇન-હાઉસ ઇન્ડસ્ટ્રિયલ ઇન્ફ્રાસ્ટ્રક્ચર' : isHi ? 'इन-हाउस औद्योगिक बुनियादी ढांचा' : isFr ? 'Infrastructure Industrielle Intégrée' : 'In-House Industrial Infrastructure'}
          </div>

          <h2
            className="section-title"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 50%, #2dd4bf 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5))'
            }}
          >
            {isGu
              ? 'અદ્યતન એન્જિનિયરિંગ & CNC પ્રિસિઝન જોબ વર્ક હબ'
              : isHi
              ? 'उन्नत इंजीनियरिंग और सीएनसी सटीक जॉब वर्क हब'
              : isFr
              ? "Pôle d'Ingénierie de Précision et d'Usinage CNC"
              : 'Advanced Precision Engineering & CNC Job Work Hub'}
          </h2>

          <p className="section-subtitle">
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}
        >
          {/* MACHINE 1: BODOR FIBER LASER CUTTER */}
          <div
            className="card"
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(45, 212, 191, 0.25)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease'
            }}
          >
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

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? 'CNC ફાઈબર લેસર કટિંગ સિસ્ટમ (શીટ & પાઇપ)' : 'CNC Fiber Laser Sheet & Tube Cutting'}
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.6', marginBottom: '16px' }}>
              {isGu
                ? 'મેટલ શીટ પ્લેટની સાથે રાઉન્ડ, સ્ક્વેર અને રેક્ટંગ્યુલર પાઇપનું અતિશય ચોકસાઈપૂર્વક બર્ર-ફ્રી (Burr-free) હાઈ-સ્પીડ કટિંગ.'
                : 'High-speed, zero-burr contour cutting for metal flat sheets as well as round, square, and rectangular tubes/pipes.'}
            </p>

            {/* Spec Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'block' }}>
                  {isGu ? 'મટિરિયલ્સ' : 'Materials'}
                </span>
                <strong style={{ fontSize: '0.85rem', color: '#2dd4bf' }}>MS, SS, Al, Brass</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'block' }}>
                  {isGu ? 'કટિંગ ક્ષમતા' : 'Capability'}
                </span>
                <strong style={{ fontSize: '0.85rem', color: '#38bdf8' }}>Sheet + Pipe/Tube</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'block' }}>
                  {isGu ? 'એજ ફિનિશિંગ' : 'Edge Finish'}
                </span>
                <strong style={{ fontSize: '0.85rem', color: '#facc15' }}>Smooth & Ready</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'block' }}>
                  {isGu ? 'એપ્લિકેશન' : 'Applications'}
                </span>
                <strong style={{ fontSize: '0.85rem', color: '#a78bfa' }}>Panels, Base Plates</strong>
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
          <div
            className="card"
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.28)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease'
            }}
          >
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

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? 'હેવી-ડ્યુટી VMC પ્રિસિઝન મશીનિંગ (Jyoti RX-20)' : 'Heavy-Duty VMC Precision Machining (Jyoti RX-20)'}
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.6', marginBottom: '16px' }}>
              {isGu
                ? '25 kW સ્પિન્ડલ પાવર અને 20-ટૂલ ATC સાથે માઇક્રોન-લેવલ ચોકસાઈવાળું મિલિંગ, ડ્રિલિંગ, ટેપિંગ અને બોરિંગ કામ.'
                : 'High-torque 25 kW spindle power with 20-tool Automatic Tool Changer (ATC) delivering micron-accurate milling, boring, and rigid tapping.'}
            </p>

            {/* Spec Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'block' }}>
                  {isGu ? 'પાવર & વજન' : 'Power & Rigidity'}
                </span>
                <strong style={{ fontSize: '0.85rem', color: '#2dd4bf' }}>25 kW | 5,500 Kg</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'block' }}>
                  {isGu ? 'ટૂલિંગ સિસ્ટમ' : 'Tool Magazine'}
                </span>
                <strong style={{ fontSize: '0.85rem', color: '#38bdf8' }}>20-Tool Auto ATC</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'block' }}>
                  {isGu ? 'ઇન્ડસ્ટ્રિયલ કૂલિંગ' : 'Panel Cooling'}
                </span>
                <strong style={{ fontSize: '0.85rem', color: '#facc15' }}>Werner Finley AC</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'block' }}>
                  {isGu ? 'મુખ્ય એપ્લિકેશન' : 'Key Parts'}
                </span>
                <strong style={{ fontSize: '0.85rem', color: '#a78bfa' }}>Textile, Valves, Dies</strong>
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
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid var(--border-glass)',
            borderRadius: '18px',
            padding: '24px',
            marginBottom: '35px'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              {isGu ? 'સરળ જોબ વર્ક પ્રક્રિયા (૪ સ્ટેપ્સ)' : 'Streamlined 4-Step Engineering Workflow'}
            </h4>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-sub)' }}>
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
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>📤</div>
              <strong style={{ fontSize: '0.9rem', color: '#38bdf8', display: 'block', marginBottom: '4px' }}>
                1. {isGu ? 'ડ્રોઇંગ સબમિશન' : 'Submit CAD / Drawing'}
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                {isGu ? 'AutoCAD DWG, DXF, STEP, PDF અથવા સેમ્પલ' : 'Share 2D/3D technical drawings or physical samples'}
              </span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>⚡</div>
              <strong style={{ fontSize: '0.9rem', color: '#2dd4bf', display: 'block', marginBottom: '4px' }}>
                2. {isGu ? 'લેસર શીટ/પાઇપ કટિંગ' : 'Laser Profile & Tube Cut'}
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                {isGu ? 'હાઈ સ્પીડ ફાઇબર લેસર વડે બર્ર-ફ્રી કટિંગ' : 'Bodor A3T6 high-speed precision contour cutting'}
              </span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>⚙️</div>
              <strong style={{ fontSize: '0.9rem', color: '#facc15', display: 'block', marginBottom: '4px' }}>
                3. {isGu ? 'VMC મશીનિંગ & થ્રેડિંગ' : 'VMC Micron Machining'}
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                {isGu ? 'મિલિંગ, પ્રિસિઝન ડ્રિલિંગ અને રિજિડ ટેપિંગ' : 'Jyoti RX-20 secondary drilling, tapping & milling'}
              </span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>🔍</div>
              <strong style={{ fontSize: '0.9rem', color: '#4ade80', display: 'block', marginBottom: '4px' }}>
                4. {isGu ? 'ક્વોલિટી ચેક & ડિલિવરી' : 'Quality Inspection'}
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                {isGu ? 'માઇક્રોમીટર પરિમાણ તપાસ અને સમયસર ડિસ્પેચ' : 'Micron dimensional check & on-schedule delivery'}
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION STRIP */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
            border: '1px solid rgba(45, 212, 191, 0.4)',
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              {isGu ? 'તમારી પાસે મશીનરી ડ્રોઇંગ કે જોબ વર્ક છે?' : 'Have Engineering Drawings or Custom Job Work Requirements?'}
            </h4>
            <span style={{ fontSize: '0.85rem', color: '#a5f3fc' }}>
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
