import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { defaultCompanyProfiles } from '../data/initialData';

export default function EngineeringSection() {
  const {
    t,
    currentLang,
    activeCompany,
    activeCompanyId,
    companiesList,
    showLiveToast,
    setIsRfqDrawerOpen,
    engineeringMachinesList,
    deleteEngineeringMachine,
    setEditingMachineId,
    setActiveModal,
    isAdminLoggedIn,
    verifyAdminAccess
  } = useApp();

  const [machineTabs, setMachineTabs] = useState({});
  const [engScopeFilter, setEngScopeFilter] = useState('active'); // 'active' | 'all' | specific company id

  // Deduplicated comprehensive sister companies list for Company Scope dropdown
  const allAvailableCompanies = React.useMemo(() => {
    const map = new Map();
    (defaultCompanyProfiles || []).forEach(c => {
      if (c && c.id) map.set(c.id, c);
    });
    (companiesList || []).forEach(c => {
      if (c && c.id) map.set(c.id, { ...(map.get(c.id) || {}), ...c });
    });
    if (activeCompany && activeCompany.id) {
      map.set(activeCompany.id, { ...(map.get(activeCompany.id) || {}), ...activeCompany });
    }
    return Array.from(map.values());
  }, [companiesList, activeCompany]);

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

  const currentCompId = activeCompany?.id || activeCompanyId || 'comp_1';
  const companyMachines = (engineeringMachinesList || []).filter(m => {
    if (engScopeFilter === 'all') return true;
    if (engScopeFilter === 'active') {
      if (!m.companyId || m.companyId === 'all') return true;
      return m.companyId === currentCompId;
    }
    if (!m.companyId || m.companyId === 'all') return true;
    return m.companyId === engScopeFilter;
  });

  const setActiveTab = (machId, tab) => {
    setMachineTabs(prev => ({ ...prev, [machId]: tab }));
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
            ⚙️ {t?.eng_badge || (isGu ? 'ઇન-હાઉસ ઇન્ડસ્ટ્રિયલ ઇન્ફ્રાસ્ટ્રક્ચર' : 'In-House Industrial Infrastructure')}
          </div>

          <h2 className="section-title engineering-title">
            {t?.eng_title || (isGu ? 'અદ્યતન એન્જિનિયરિંગ & CNC પ્રિસિઝન જોબ વર્ક હબ' : 'Advanced Precision Engineering & CNC Job Work Hub')}
          </h2>

          <p className="section-subtitle engineering-subtitle">
            {t?.eng_subtitle || (isGu ? 'સુરત અને દક્ષિણ ગુજરાતના ઔદ્યોગિક એકમો તેમ જ ગ્લોબલ એક્સપોર્ટ માટે કટિંગથી લઈને સંપૂર્ણ તૈયાર મશીનરી પાર્ટ્સનું ઇન-હાઉસ ઉત્પાદન.' : 'Turnkey in-house precision component manufacturing in Surat, Gujarat — from laser profile & tube cutting to micron-accurate VMC machining.')}
          </p>

          {/* ADMIN ACTION: ADD NEW MACHINERY BUTTON */}
          {isAdminLoggedIn && (
            <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  padding: '11px 24px',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  borderRadius: '30px',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onClick={() => {
                  verifyAdminAccess(() => {
                    setEditingMachineId(null);
                    setActiveModal('engineering_machine');
                  });
                }}
              >
                <span>⚙️ ➕</span> {isGu ? 'નવી મશીનરી ઉમેરો (Add New Machinery)' : '+ Add New Machinery'}
              </button>
            </div>
          )}
        </div>

        {/* ADVANCED MACHINES GRID */}
        {/* SISTER COMPANY MACHINERY FILTER TABS */}
        <div className="engineering-scope-bar">
          <button
            type="button"
            className={`engineering-scope-btn scope-active-company ${engScopeFilter === 'active' ? 'active' : ''}`}
            onClick={() => setEngScopeFilter('active')}
          >
            🏢 {companyName} {isGu ? '(હાલની કંપની)' : '(Active)'}
          </button>

          <button
            type="button"
            className={`engineering-scope-btn scope-all ${engScopeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setEngScopeFilter('all')}
          >
            🌐 {isGu ? 'તમામ સિસ્ટર કંપનીઓ' : 'All Sister Companies'} ({(engineeringMachinesList || []).length})
          </button>

          {allAvailableCompanies.filter(c => c.id !== currentCompId && c.name.toLowerCase() !== companyName.toLowerCase()).map(comp => (
            <button
              key={comp.id}
              type="button"
              className={`engineering-scope-btn scope-company ${engScopeFilter === comp.id ? 'active' : ''}`}
              onClick={() => setEngScopeFilter(comp.id)}
            >
              🏢 {comp.name}
            </button>
          ))}
        </div>

        {companyMachines.length === 0 ? (
          <div className="engineering-empty-card">
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚙️</div>
            <h4 className="engineering-empty-title">
              {isGu ? 'આ કંપની માટે હજુ કોઈ મશીનરી ઉમેરેલ નથી' : 'No Machinery Added Yet'}
            </h4>
            <p className="engineering-empty-desc">
              {isGu ? 'ઉપરના "+ નવી મશીનરી ઉમેરો" બટન પર ક્લિક કરીને CNC અથવા લેસર મશીનરી ઉમેરો.' : 'Click above to add your CNC Laser, VMC, Lathe, or other industrial machinery.'}
            </p>
            {isAdminLoggedIn && (
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  verifyAdminAccess(() => {
                    setEditingMachineId(null);
                    setActiveModal('engineering_machine');
                  });
                }}
              >
                ⚙️ + {isGu ? 'નવી મશીનરી ઉમેરો' : 'Add New Machinery'}
              </button>
            )}
          </div>
        ) : (
          <div className="engineering-grid">
            {companyMachines.map((mach) => {
              const currentTab = machineTabs[mach.id] || 'machine';
              const machTitle = mach.names?.[currentLang] || mach.names?.['en'] || mach.names?.['gu'] || mach.title || 'Advanced Machinery';
              const machDesc = mach.desc?.[currentLang] || mach.desc?.['en'] || mach.desc?.['gu'] || mach.desc || '';
              const displayImg = (mach.plateImage && currentTab === 'plate') ? mach.plateImage : (mach.image || 'images/bodor_laser_showroom_new.jpg');
              const inquiryTopic = mach.inquiryTopic || mach.model || machTitle;
              const btnText = mach.btnText?.[currentLang] || (isGu ? (mach.btnTextGu || 'ડ્રોઇંગ મોકલો & ઇન્ક્વાયરી કરો') : (mach.btnTextEn || 'Inquire for Job Work'));

              return (
                <div className="card engineering-card" key={mach.id} style={{ position: 'relative' }}>
                  {/* Admin Action Bar on Card */}
                  {isAdminLoggedIn && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      zIndex: 20,
                      display: 'flex',
                      gap: '6px',
                      background: 'rgba(15, 23, 42, 0.92)',
                      backdropFilter: 'blur(10px)',
                      padding: '4px 8px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.6)'
                    }}>
                      <button
                        type="button"
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          color: '#38bdf8',
                          borderRadius: '12px',
                          padding: '4px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          verifyAdminAccess(() => {
                            setEditingMachineId(mach.id);
                            setActiveModal('engineering_machine');
                          });
                        }}
                        title="Edit Machinery Details"
                      >
                        ✏️ {isGu ? 'એડિટ' : 'Edit'}
                      </button>
                      <button
                        type="button"
                        style={{
                          background: 'rgba(239, 68, 68, 0.22)',
                          border: '1px solid rgba(239, 68, 68, 0.45)',
                          color: '#f87171',
                          borderRadius: '12px',
                          padding: '4px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          deleteEngineeringMachine(mach.id, mach.model || machTitle);
                        }}
                        title="Delete Machinery"
                      >
                        🗑️ {isGu ? 'હટાવો' : 'Delete'}
                      </button>
                    </div>
                  )}

                  {/* Visual Container with Interactive View Switcher */}
                  <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', marginBottom: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <img
                      src={displayImg}
                      alt={machTitle}
                      style={{
                        width: '100%',
                        height: '240px',
                        objectFit: currentTab === 'machine' ? 'cover' : 'contain',
                        background: '#0a0f1d',
                        display: 'block',
                        transition: 'opacity 0.3s ease'
                      }}
                      onError={(e) => { e.target.src = 'images/logo.png'; }}
                    />

                    {/* View Switcher Pills */}
                    {mach.plateImage && (
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
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          zIndex: 10
                        }}
                      >
                        <button
                          type="button"
                          style={{
                            background: currentTab === 'machine' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'transparent',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '3px 10px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                          onClick={() => setActiveTab(mach.id, 'machine')}
                        >
                          ✨ {isGu ? 'નવો મશીન લુક' : 'New Machine'}
                        </button>
                        <button
                          type="button"
                          style={{
                            background: currentTab === 'plate' ? 'linear-gradient(135deg, #059669, #047857)' : 'transparent',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '3px 10px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                          onClick={() => setActiveTab(mach.id, 'plate')}
                        >
                          🔍 {isGu ? 'ઓરિજિનલ નેમપ્લેટ' : 'OEM Plate'}
                        </button>
                      </div>
                    )}

                    {/* Model Badge */}
                    {mach.model && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          background: mach.badgeColor || 'rgba(5, 150, 105, 0.92)',
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '10px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                          zIndex: 10
                        }}
                      >
                        {mach.model}
                      </div>
                    )}
                  </div>

                  {/* Company Scope Badge */}
                  <div style={{ marginBottom: '8px' }}>
                    <span className={`engineering-scope-badge ${(!mach.companyId || mach.companyId === 'all') ? 'badge-all' : 'badge-company'}`}>
                      {(!mach.companyId || mach.companyId === 'all') ? (
                        <>🌐 {isGu ? 'તમામ સિસ્ટર કંપનીઓ' : 'All Sister Companies'}</>
                      ) : (
                        <>🏢 {(() => {
                          const match = allAvailableCompanies.find(c => c.id === mach.companyId);
                          return match?.name || mach.companyId;
                        })()}</>
                      )}
                    </span>
                  </div>

                  <h3 className="engineering-card-title">
                    {machTitle}
                  </h3>

                  {machDesc && (
                    <p className="engineering-card-desc">
                      {machDesc}
                    </p>
                  )}

                  {/* Spec Highlights Grid */}
                  {Array.isArray(mach.specs) && mach.specs.length > 0 && (
                    <div className="engineering-specs-grid">
                      {mach.specs.map((sp, sIdx) => {
                        const specLabel = sp[`label${isGu ? 'Gu' : 'En'}`] || sp.label || sp.labelEn || sp.labelGu || 'Spec';
                        const specVal = sp.value || sp.val || '-';
                        const colorClass = sp.colorClass || (sIdx === 0 ? 'color-teal' : sIdx === 1 ? 'color-cyan' : sIdx === 2 ? 'color-gold' : 'color-purple');
                        return (
                          <div className="engineering-spec-box" key={sIdx}>
                            <span className="engineering-spec-label">
                              {specLabel}
                            </span>
                            <strong className={`engineering-spec-value ${colorClass}`}>
                              {specVal}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '10px 16px' }}
                      onClick={() => openWhatsAppInquiry(inquiryTopic)}
                    >
                      📐 {btnText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
