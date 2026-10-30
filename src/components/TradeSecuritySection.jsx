import React from 'react';
import { useApp } from '../context/AppContext';
import EmbassyConnectDesk from './EmbassyConnectDesk';

export default function TradeSecuritySection() {
  const { currentLang, activeCompany, setIsRfqDrawerOpen, setActiveModal, isAdminLoggedIn, toggleTradeSecurity } = useApp();
  const isGu = currentLang === 'gu';
  const isHi = currentLang === 'hi';
  const isFr = currentLang === 'fr';

  const companyName = activeCompany?.name || 'Atsondika Global Trade';

  return (
    <section className="section" id="trade-security" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '38px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(20, 184, 166, 0.15)',
            border: '1px solid rgba(45, 212, 191, 0.4)',
            color: '#2dd4bf',
            padding: '6px 18px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '14px',
            boxShadow: '0 0 14px rgba(45, 212, 191, 0.2)'
          }}>
            🛡️ {isGu ? '૧૦૦% સુરક્ષિત આંતરરાષ્ટ્રીય વ્યાપાર' : (isHi ? '100% सुरक्षित अंतर्राष्ट्रीय व्यापार' : (isFr ? 'Commerce International 100% Sécurisé' : '100% Safe Global Trade Assurance'))}
          </div>

          <h2 className="section-title" style={{ fontSize: '2.1rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
            {isGu ? 'ટ્રેડ ફાઇનાન્સ & પેમેન્ટ સુરક્ષા ગેરંટી' : (isHi ? 'ट्रेड फाइनेंस और भुगतान सुरक्षा गारंटी' : (isFr ? 'Garantie de Financement & Sécurité de Paiement' : 'Trade Finance & Payment Security Guarantee'))}
          </h2>

          <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '0.94rem', lineHeight: '1.65', color: 'var(--text-sub)' }}>
            {isGu
              ? `${companyName} સાથે વિદેશી ખરીદદારો માટે સંપૂર્ણ જોખમ-મુક્ત આંતરરાષ્ટ્રીય વ્યવહારો. કન્ફર્મ્ડ L/C, થર્ડ-પાર્ટી SGS ક્વોલિટી ઇન્સ્પેક્શન અને પારદર્શક બેંકિંગ ચેનલો.`
              : (isHi
                ? `${companyName} के साथ विदेशी खरीदारों के लिए पूर्णतः जोखिम-मुक्त अंतर्राष्ट्रीय व्यापार। कन्फर्म L/C, थर्ड-पार्टी SGS क्वालिटी इंस्पेक्शन एवं सुरक्षित बैंकिंग।`
                : (isFr
                  ? `Transactions internationales sans risque avec ${companyName}. Lettre de Crédit (L/C) irrévocable, inspection SGS au port de chargement.`
                  : `Completely risk-free international export transactions with ${companyName}. Confirmed Letters of Credit (L/C), Third-Party SGS Quality Inspections, and Swift Bank Routing.`))}
          </p>

          {/* Admin Switch Indicator Badge */}
          {isAdminLoggedIn && (
            <div style={{ marginTop: '14px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.75rem',
                color: '#38bdf8',
                fontWeight: 700
              }}>
                ⚙️ Admin: Visible on Website
                <button
                  type="button"
                  onClick={() => toggleTradeSecurity && toggleTradeSecurity(false)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.25)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: '#f87171',
                    borderRadius: '8px',
                    padding: '2px 8px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    fontWeight: 800,
                    marginLeft: '4px'
                  }}
                  title="Switch OFF from Admin"
                >
                  Turn OFF
                </button>
              </span>
            </div>
          )}
        </div>

        {/* 4 Core Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '22px',
          marginBottom: '35px'
        }}>
          
          {/* Pillar 1 */}
          <div className="glass-card" style={{
            padding: '26px 22px',
            borderRadius: '16px',
            border: '1px solid rgba(45, 212, 191, 0.25)',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.75) 0%, rgba(13, 148, 136, 0.08) 100%)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(45, 212, 191, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '16px',
              border: '1px solid rgba(45, 212, 191, 0.4)'
            }}>
              🏦
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? '૧૦૦% Irrevocable L/C at Sight' : 'Irrevocable Confirmed L/C at Sight'}
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--text-sub)', flex: 1 }}>
              {isGu
                ? 'વિશ્વની ટોચની ૫૦ આંતરરાષ્ટ્રીય બેંકો દ્વારા જારી કરાયેલ કન્ફર્મ્ડ લેટર ઓફ ક્રેડિટ (L/C) સ્વીકાર્ય. માલ વહાણમાં લોડ થયા બાદ શિપિંગ ડોક્યુમેન્ટ્સના વેરિફિકેશન પછી જ પેમેન્ટ રિલીઝ થાય છે.'
                : 'Accepted via Top 50 Global International Banks. Zero financial exposure for buyer; payment released only against authenticated Bill of Lading, Certificate of Origin, and SGS inspection reports.'}
            </p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.78rem', color: '#2dd4bf', fontWeight: 700 }}>
              ✔ {isGu ? 'બાયર માટે ૦% નાણાકીય જોખમ' : 'Zero Buyer Capital Risk'}
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card" style={{
            padding: '26px 22px',
            borderRadius: '16px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.75) 0%, rgba(56, 189, 248, 0.08) 100%)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(14, 165, 233, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '16px',
              border: '1px solid rgba(56, 189, 248, 0.4)'
            }}>
              🔍
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? 'SGS / Bureau Veritas ઈન્સ્પેક્શન' : 'Pre-Shipment SGS / Veritas Audit'}
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--text-sub)', flex: 1 }}>
              {isGu
                ? 'બાયર ભારતીય બંદર (Mundra / Nhava Sheva) પર પોતાની પસંદગીની થર્ડ-પાર્ટી એજન્સી (SGS, Bureau Veritas, Geo-Chem) દ્વારા કન્ટેનર લોડિંગ અને ક્વોલિટીનું લાઇવ ઈન્સ્પેક્શન કરાવી શકે છે.'
                : 'Buyers retain the contractual right to appoint independent inspection agencies (SGS, Bureau Veritas, Geo-Chem) at Mundra/Nhava Sheva ports to verify purity, moisture, weight, and bolt-sealing prior to departure.'}
            </p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>
              ✔ {isGu ? 'લોડિંગ પહેલાં ૧૦૦% ક્વોલિટી પાસ' : '100% Quality Pass Prior Loading'}
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card" style={{
            padding: '26px 22px',
            borderRadius: '16px',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.75) 0%, rgba(168, 85, 247, 0.08) 100%)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(147, 51, 234, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '16px',
              border: '1px solid rgba(168, 85, 247, 0.4)'
            }}>
              🌐
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? 'ડાયરેક્ટ SWIFT & વાયર ટ્રાન્સફર' : 'Direct SWIFT & Foreign Nostro Routing'}
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--text-sub)', flex: 1 }}>
              {isGu
                ? 'અમેરિકા, યુરોપ અને ગલ્ફ માટે ડાયરેક્ટ કોરસપોન્ડન્ટ બેંકિંગ (JPMorgan Chase / Citibank) દ્વારા સ્વિફ્ટ વાયર ટ્રાન્સફર. કોઈ અજાણ્યા વચેટિયા વગર સીધું બેંક-ટુ-બેંક પારદર્શક ટ્રાન્ઝેક્શન.'
                : 'Direct Tier-1 correspondent banking routing (JPMorgan Chase New York, Standard Chartered, Citibank) ensures fast, secure international wires in USD, EUR, GBP, and AED with full SWIFT MT103 confirmation.'}
            </p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.78rem', color: '#c084fc', fontWeight: 700 }}>
              ✔ {isGu ? 'SWIFT MT103 ટ્રેસેબલ વાયર' : 'Direct SWIFT MT103 Traceability'}
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="glass-card" style={{
            padding: '26px 22px',
            borderRadius: '16px',
            border: '1px solid rgba(234, 179, 8, 0.25)',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.75) 0%, rgba(234, 179, 8, 0.08) 100%)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(202, 138, 4, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '16px',
              border: '1px solid rgba(234, 179, 8, 0.4)'
            }}>
              📜
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? 'Incoterms 2020 & લીગલ કોન્ટ્રેક્ટ' : 'Incoterms 2020 & Legal Contracts'}
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--text-sub)', flex: 1 }}>
              {isGu
                ? 'દરેક કન્ટેનર ઓર્ડર ICC (International Chamber of Commerce) ના Incoterms 2020 (FOB, CIF, CFR, DAP) નિયમો હેઠળ આંતરરાષ્ટ્રીય લીગલ સેલ્સ કોન્ટ્રેક્ટ સાથે એક્સપોર્ટ થાય છે.'
                : 'Every export shipment is governed by strict ICC Incoterms 2020 standards (FOB, CIF, CFR, DAP) with full Marine Cargo Insurance (Institute Cargo Clauses A - All Risks) and official Certificate of Origin.'}
            </p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.78rem', color: '#facc15', fontWeight: 700 }}>
              ✔ {isGu ? '૧૦૦% વિવાદ-મુક્ત શિપિંગ નિયમો' : 'ICC Governed Dispute-Free Terms'}
            </div>
          </div>

        </div>

        {/* FEATURE: EMBASSY COMMERCIAL COUNSELLOR & DIPLOMATIC VERIFICATION HUB */}
        <div id="embassy-connect" style={{ marginBottom: '35px' }}>
          <EmbassyConnectDesk />
        </div>

        {/* Action Bar / Trust Banner */}
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.2) 0%, rgba(30, 41, 59, 0.6) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(45, 212, 191, 0.35)',
          padding: '24px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '18px'
        }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
              {isGu ? '🔒 શું તમે મોટો કન્ટેનર ઓર્ડર અથવા કન્ફર્મ્ડ L/C થી આયાત કરવા માંગો છો?' : '🔒 Looking to import bulk containers under Confirmed Bank L/C?'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#a5f3fc', margin: '4px 0 0 0' }}>
              {isGu ? 'અમારા ઇન્ટરનેશનલ ટ્રેડ એક્સપર્ટ સાથે સુરક્ષિત ટ્રેડ ટર્મ્સ અને બેંકિંગ ડ્રાફ્ટ મેળવો.' : 'Speak directly with our Trade Desk for custom banking terms, draft LC verbiage, and swift contract signing.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                padding: '10px 22px',
                background: 'linear-gradient(135deg, #0d9488, #059669)',
                boxShadow: '0 4px 14px rgba(13, 148, 136, 0.4)'
              }}
              onClick={() => {
                if (setIsRfqDrawerOpen) setIsRfqDrawerOpen(true);
              }}
            >
              📄 {isGu ? 'સુરક્ષિત RFQ કોટ મેળવો' : 'Request Secure RFQ'}
            </button>

            <button
              type="button"
              className="btn-secondary"
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                padding: '10px 18px',
                borderColor: 'rgba(56, 189, 248, 0.4)',
                color: '#38bdf8'
              }}
              onClick={() => {
                const el = document.querySelector('#contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              📞 {isGu ? 'ટ્રેડ ડેસ્ક સંપર્ક' : 'Contact Trade Desk'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
