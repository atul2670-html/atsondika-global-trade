import React from 'react';
import { useApp } from '../context/AppContext';

export default function OemPackagingSection() {
  const { currentLang, activeCompany, setIsRfqDrawerOpen, isAdminLoggedIn, toggleOemPackaging } = useApp();
  const isGu = currentLang === 'gu';
  const isHi = currentLang === 'hi';
  const isFr = currentLang === 'fr';

  const companyName = activeCompany?.name || 'Atsondika Global Trade';

  return (
    <section className="section" id="oem-packaging" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="section-container">

        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '38px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(234, 179, 8, 0.15)',
            border: '1px solid rgba(234, 179, 8, 0.4)',
            color: '#facc15',
            padding: '6px 18px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '14px',
            boxShadow: '0 0 14px rgba(234, 179, 8, 0.2)'
          }}>
            📦 {isGu ? 'કસ્ટમ બ્રાન્ડિંગ & પેકિંગ' : (isHi ? 'कस्टम ब्रांडिंग और पैकेजिंग' : (isFr ? 'Marque Blanche & Emballage OEM' : 'Private Label & OEM Packaging'))}
          </div>

          <h2 className="section-title" style={{ fontSize: '2.1rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
            {isGu ? 'પ્રાઇવેટ લેબલિંગ & કસ્ટમ OEM પેકિંગ સોલ્યુશન્સ' : (isHi ? 'प्राइवेट लेबलिंग और कस्टम OEM पैकेजिंग सॉल्यूशंस' : (isFr ? 'Solutions de Marque Blanche & Emballage Sur Mesure' : 'Private Label & Custom OEM Packaging Solutions'))}
          </h2>

          <p className="section-subtitle" style={{ maxWidth: '740px', margin: '0 auto', fontSize: '0.94rem', lineHeight: '1.65', color: 'var(--text-sub)' }}>
            {isGu
              ? `વિશ્વભરના સુપરમાર્કેટ્સ, બ્રાન્ડ ઓનર્સ અને હોલસેલર્સ માટે ${companyName} તરફથી તમારા પોતાના બ્રાન્ડ નેમ, લોગો, બારકોડ અને કસ્ટમ વજનમાં પ્રીમિયમ પેકિંગ સુવિધા.`
              : (isHi
                ? `विश्वभर के सुपरमार्केट्स और ब्रांड मालिकों के लिए ${companyName} द्वारा आपके अपने ब्रांड नाम, लोगो और बारकोड के साथ प्रीमियम पैकेजिंग सुविधा।`
                : (isFr
                  ? `Emballage sur mesure sous votre propre marque par ${companyName} pour supermarchés, grossistes et distributeurs internationaux.`
                  : `Turnkey Private Labeling & Contract Packaging by ${companyName} for global supermarket chains, brand owners, and institutional distributors under your own brand identity.`))}
          </p>

          {/* Admin Switch Indicator Badge */}
          {isAdminLoggedIn && (
            <div style={{ marginTop: '14px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(234, 179, 8, 0.12)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.75rem',
                color: '#facc15',
                fontWeight: 700
              }}>
                ⚙️ Admin: Visible on Website
                <button
                  type="button"
                  onClick={() => toggleOemPackaging && toggleOemPackaging(false)}
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

        {/* 4 Packaging Category Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '22px',
          marginBottom: '35px'
        }}>

          {/* Solution 1: Retail Consumer Packs */}
          <div className="glass-card" style={{
            padding: '26px 22px',
            borderRadius: '16px',
            border: '1px solid rgba(234, 179, 8, 0.25)',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.75) 0%, rgba(234, 179, 8, 0.08) 100%)',
            display: 'flex',
            flexDirection: 'column'
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
              🛍️
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? 'રિટેલ કન્ઝ્યુમર પેકિંગ (૧૦૦ ગ્રામ થી ૫ કિગ્રા)' : 'Retail Consumer Packs (100g to 5kg)'}
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--text-sub)', flex: 1 }}>
              {isGu
                ? 'સ્ટેન્ડ-અપ ઝિપર પાઉચ, ૩-સાઇડ સીલ ફોઇલ, નાઇટ્રોજન ફ્લશિંગ અને વેક્યુમ સીલિંગ. મસાલા, હળદર, જીરું અને રાઈસ માટે લાંબી સેલ્ફ-લાઇફ અને સુગંધ જાળવી રાખતી પેકિંગ પદ્ધતિ.'
                : 'Stand-up Zipper Pouches, Quad-seal Gusset Bags, Nitrogen-Flushed Aluminum Foils & Vacuum-sealed packs (100g, 250g, 500g, 1kg, 2kg, 5kg) engineered for extended retail shelf-life.'}
            </p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.78rem', color: '#facc15', fontWeight: 700 }}>
              ✔ {isGu ? 'સુપરમાર્કેટ-રેડી શેલ્ફ પેક્સ' : 'Supermarket Shelf-Ready'}
            </div>
          </div>

          {/* Solution 2: Bulk Export Commercial Packing */}
          <div className="glass-card" style={{
            padding: '26px 22px',
            borderRadius: '16px',
            border: '1px solid rgba(20, 184, 166, 0.25)',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.75) 0%, rgba(20, 184, 166, 0.08) 100%)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(13, 148, 136, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '16px',
              border: '1px solid rgba(45, 212, 191, 0.4)'
            }}>
              📦
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? 'બલ્ક કોમર્શિયલ પેકિંગ (૨૫ / ૫૦ કિગ્રા)' : 'Bulk Commercial Packing (25kg / 50kg)'}
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--text-sub)', flex: 1 }}>
              {isGu
                ? '૨૫ કિગ્રા અને ૫૦ કિગ્રા HDPE / PP વુવન બેગ્સ (અંદર પોલીથીન લાઇનર સાથે), મલ્ટી-વોલ ક્રાફ્ટ પેપર બેગ્સ, પરંપરાગત જ્યુટ બેગ્સ અને ૧૦૦૦ કિગ્રા FIBC જમ્બો બેગ્સ.'
                : 'Heavy-duty 25kg & 50kg HDPE/PP woven bags with food-grade LDPE inner liners, Multi-wall Kraft paper sacks, natural Jute bags, and 1000kg FIBC Jumbo bags for large-scale milling.'}
            </p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.78rem', color: '#2dd4bf', fontWeight: 700 }}>
              ✔ {isGu ? 'હાઇ-ડેન્સિટી મોઇશ્ચર પ્રોટેક્શન' : 'High-Density Moisture Barrier'}
            </div>
          </div>

          {/* Solution 3: Custom Brand Artwork & Barcode */}
          <div className="glass-card" style={{
            padding: '26px 22px',
            borderRadius: '16px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.75) 0%, rgba(56, 189, 248, 0.08) 100%)',
            display: 'flex',
            flexDirection: 'column'
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
              🏷️
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? 'કસ્ટમ બ્રાન્ડ લોગો, UPC & લેબલિંગ' : 'Custom Brand Logo & Global Barcoding'}
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--text-sub)', flex: 1 }}>
              {isGu
                ? 'બાયરના પોતાના બ્રાન્ડ લોગો સાથે હાઇ-ડેફિનેશન રોટોગ્રેવ્યૂર / ફ્લેક્સો પ્રિન્ટિંગ, EAN-13 / UPC બારકોડ, ન્યુટ્રીશનલ ફેક્ટ્સ પેનલ અને US FDA / EU નિયમો મુજબ મલ્ટી-લેંગ્વેજ લેબલિંગ.'
                : 'Full-bleed Rotogravure & Flexographic multi-color printing with Buyer’s Brand Logo, EAN-13/UPC barcodes, multilingual nutritional tables, batch numbers, and US FDA/EU compliant labeling.'}
            </p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>
              ✔ {isGu ? 'US FDA & EU કમ્પ્લાયન્ટ લેબલિંગ' : 'FDA & EU Compliant Printing'}
            </div>
          </div>

          {/* Solution 4: Palletization & Transit Protection */}
          <div className="glass-card" style={{
            padding: '26px 22px',
            borderRadius: '16px',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.75) 0%, rgba(168, 85, 247, 0.08) 100%)',
            display: 'flex',
            flexDirection: 'column'
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
              🏗️
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {isGu ? 'પેલેટાઇઝેશન & સ્ટ્રેચ રેપ પ્રોટેક્શન' : 'ISPM-15 Palletization & Shrink Wrap'}
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--text-sub)', flex: 1 }}>
              {isGu
                ? 'ISPM-15 હીટ-ટ્રીટેડ વુડન / પ્લાસ્ટિક પેલેટ્સ, હેવી-ડ્યુટી કોર્નર ગાર્ડ્સ, સ્ટ્રેચ શ્રિંક રેપિંગ અને કન્ટેનરમાં ભેજ નિયંત્રણ માટે સિલિકા-જેલ ડેસીકન્ટ બેગ્સ સાથે સુરક્ષિત ટ્રાન્સપોર્ટ.'
                : 'ISPM-15 certified heat-treated wooden/plastic Euro pallets, heavy-duty edge corner boards, machine stretch wrapping, and container desiccant dry-bags to eliminate sea moisture and sweating.'}
            </p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.78rem', color: '#c084fc', fontWeight: 700 }}>
              ✔ {isGu ? 'દરિયાઈ પરિવહન સામે ૧૦૦% રક્ષણ' : 'Zero Moisture Ocean Transit Shield'}
            </div>
          </div>

        </div>

        {/* 5-STEP CUSTOMER COORDINATION WORKFLOW */}
        <div className="glass-card" style={{
          padding: '28px 24px',
          borderRadius: '18px',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(234, 179, 8, 0.08) 100%)',
          marginBottom: '35px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#facc15',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              background: 'rgba(234, 179, 8, 0.15)',
              padding: '4px 12px',
              borderRadius: '12px',
              border: '1px solid rgba(234, 179, 8, 0.3)'
            }}>
              🤝 {isGu ? 'સરળ કસ્ટમર કોઓર્ડિનેશન' : 'Seamless Customer Coordination'}
            </span>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: '10px 0 4px 0' }}>
              {isGu ? 'Private Label પેકેજિંગમાં કસ્ટમર સાથે ૫-તબક્કાનું કોઓર્ડિનેશન' : '5-Step Customer Coordination Workflow for Private Labeling'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#fef08a', maxWidth: '680px', margin: '0 auto', lineHeight: '1.5' }}>
              {isGu
                ? 'તમારી બ્રાન્ડ ડિઝાઇનથી લઈને ફાઇનલ કન્ટેનર ડિસ્પેચ સુધી - પારદર્શક અને ઝંઝટ-મુક્ત પ્રક્રિયા.'
                : 'From initial artwork dielines to pre-shipment sign-off and container dispatch - completely transparent and structured.'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '16px'
          }}>
            
            {/* Step 1 */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              borderRadius: '14px',
              padding: '18px 16px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#eab308',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.85rem',
                marginBottom: '12px'
              }}>1</div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0' }}>
                {isGu ? 'જરૂરિયાત & ડાયલાઇન' : 'Requirement & Dieline'}
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0, flex: 1 }}>
                {isGu
                  ? 'પેકિંગ સાઇઝ (100g, 500g, 1kg, 25kg) અને મટિરિયલ નક્કી કરી અમે તમને ચોક્કસ સાઇઝનું 2D Dieline (PDF/AI) મોકલીએ છીએ.'
                  : 'We confirm packaging size, barrier material, and supply exact 2D Dieline templates (PDF/AI) for your design placement.'}
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '14px',
              padding: '18px 16px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#38bdf8',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.85rem',
                marginBottom: '12px'
              }}>2</div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0' }}>
                {isGu ? '3D ડિજિટલ મોકઅપ' : '3D Digital Proofing'}
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0, flex: 1 }}>
                {isGu
                  ? 'તમારી બ્રાન્ડ આર્ટવર્ક સાથે 3D મોકઅપ તૈયાર થાય છે. કલર પેલેટ (Pantone/CMYK), બારકોડ અને ન્યુટ્રીશનલ ટેબલની પ્રૂફિંગ મંજૂરી.'
                  : 'We render photorealistic 3D digital mockups to verify Pantone/CMYK colors, barcode readability, and regulatory nutritional text.'}
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              borderRadius: '14px',
              padding: '18px 16px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#c084fc',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.85rem',
                marginBottom: '12px'
              }}>3</div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0' }}>
                {isGu ? 'ફિઝિકલ સેમ્પલ સાઇન-ઓફ' : 'Physical Proofing'}
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0, flex: 1 }}>
                {isGu
                  ? 'માસ પ્રોડક્શન પહેલાં પ્રિન્ટેડ સેમ્પલ DHL/FedEx કુરિયર દ્વારા મોકલાય છે. મટિરિયલ ક્વોલિટી જોઈને તમે ફાઇનલ સાઇન-ઓફ આપો છો.'
                  : 'Pre-production physical samples are dispatched via DHL/FedEx courier for your tactile touch, seal-strength, and print approval.'}
              </p>
            </div>

            {/* Step 4 */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(45, 212, 191, 0.25)',
              borderRadius: '14px',
              padding: '18px 16px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#2dd4bf',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.85rem',
                marginBottom: '12px'
              }}>4</div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0' }}>
                {isGu ? 'માસ પ્રોડક્શન & ઓડિટ' : 'Production & Audit'}
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0, flex: 1 }}>
                {isGu
                  ? 'હાઇ-સ્પીડ રોટોગ્રેવ્યૂર પ્રિન્ટિંગ, ઓટો-ફિલિંગ અને મેટલ ડિટેક્શન સાથે પેકિંગ. પ્રોડક્શન દરમિયાન વિડીયો અપડેટ્સ અપાય છે.'
                  : 'Mass flexo/gravure printing, automated pouching, metal detection, and pre-loading inspection with live factory video feeds.'}
              </p>
            </div>

            {/* Step 5 */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              borderRadius: '14px',
              padding: '18px 16px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#4ade80',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.85rem',
                marginBottom: '12px'
              }}>5</div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0' }}>
                {isGu ? 'પેલેટાઇઝેશન & રવાનગી' : 'Palletized Dispatch'}
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0, flex: 1 }}>
                {isGu
                  ? 'ISPM-15 હીટ-ટ્રીટેડ પેલેટ્સ, સ્ટ્રેચ શ્રિંક રેપિંગ અને કન્ટેનર લોડિંગના ફોટા સાથે દરિયાઈ ભેજ સામે રક્ષણ સાથે પોર્ટ રવાનગી.'
                  : 'ISPM-15 heat-treated pallets, corner guards, machine stretch wrapping, and high-security bolt seal photos before port dispatch.'}
              </p>
            </div>

          </div>
        </div>

        {/* Action Banner */}
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(30, 41, 59, 0.6) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(234, 179, 8, 0.35)',
          padding: '24px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '18px'
        }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
              {isGu ? '✨ શું તમે તમારા પોતાના બ્રાન્ડ નેમથી કસ્ટમ પેકિંગ કરાવવા માંગો છો?' : '✨ Need custom private labeling & packaging for your brand?'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#fef08a', margin: '4px 0 0 0' }}>
              {isGu ? 'અમારા OEM પેકેજિંગ સ્પેશિયાલિસ્ટ પાસેથી સેમ્પલ મોકઅપ અને કસ્ટમ ક્વોટેશન મેળવો.' : 'Request customized packaging mockups, die-lines, and OEM contract pricing directly from our packaging team.'}
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
                background: 'linear-gradient(135deg, #eab308, #ca8a04)',
                color: '#000000',
                boxShadow: '0 4px 14px rgba(234, 179, 8, 0.4)'
              }}
              onClick={() => {
                if (setIsRfqDrawerOpen) setIsRfqDrawerOpen(true);
              }}
            >
              📦 {isGu ? 'OEM પેકિંગ ક્વોટ મેળવો' : 'Request OEM Packaging Quote'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
