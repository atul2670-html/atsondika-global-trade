import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_WORLD_EMBASSIES } from '../data/globalEmbassiesData';
import FlagIcon from './FlagIcon';

export const INQUIRY_CATEGORIES = [
  {
    id: "buyer_verification",
    labelEn: "Buyer Credibility & Due Diligence Check",
    labelGu: "ખરીદદારની સત્યાર્થતા અને સરકારી ખરાઈ (Buyer Verification)",
    subject: "Request for Buyer Due Diligence & Credibility Verification",
    template: "We are an Indian registered export enterprise. We have received an export inquiry/contract from a counterparty in your jurisdiction. To safeguard international transactions, we request your kind office to confirm if this buyer is officially registered, active, and holds legitimate trade standing."
  },
  {
    id: "importer_list",
    labelEn: "Verified Importers & Distributors Directory",
    labelGu: "સ્થાનિક અધિકૃત ખરીદદારોની યાદી (Importers Directory)",
    subject: "Request for Verified Importers & Distributors Directory",
    template: "We are leading Indian manufacturers and exporters. We request the Commercial Division to kindly share a verified directory of local importers, trade associations, or chambers dealing in our product category within your jurisdiction."
  },
  {
    id: "regulatory_tariffs",
    labelEn: "Customs Tariffs, Standards & Non-Tariff Barriers",
    labelGu: "ટેરિફ, કસ્ટમ ડ્યુટી અને ક્વોલિટી સ્ટાન્ડર્ડ્સ (Tariffs & Compliance)",
    subject: "Inquiry on Import Tariffs, Non-Tariff Barriers & Compliance Regulations",
    template: "We are expanding export supplies of our product to your destination country. We solicit your guidance regarding prevailing customs import duties, preferential tariff agreements (if any), mandatory quality standards, certifications, and packaging/labeling guidelines."
  },
  {
    id: "trade_dispute",
    labelEn: "Trade Dispute & Unpaid Export Dues Settlement",
    labelGu: "વેપાર વિવાદ અને પેમેન્ટ રિકવરી હસ્તક્ષેપ (Trade Dispute Intervention)",
    subject: "Urgent: Official Intervention Request for Trade Dispute & Unpaid Commercial Dues",
    template: "We write to officially report a commercial dispute regarding unpaid export dues against a consignee in your territory despite full contractual delivery. We request the Commercial Wing's diplomatic counsel and formal contact with the defaulting counterparty to facilitate lawful settlement."
  },
  {
    id: "exhibition_b2b",
    labelEn: "B2B Trade Expos & India Pavilion Facilitation",
    labelGu: "આંતરરાષ્ટ્રીય એક્ઝિબિશન અને B2B મેળાઓ (Trade Fairs & B2B)",
    subject: "Inquiry Regarding Upcoming International Trade Expos & India Pavilion Participation",
    template: "Our export firm intends to participate in upcoming trade exhibitions, Buyer-Seller Meets (BSMs), or commercial delegations organized under the aegis of the Indian Mission. Please provide schedules and facilitation guidance."
  }
];

export default function EmbassyConnectDesk() {
  const { currentLang, activeCompany, liveToast } = useApp();
  const isGu = currentLang === 'gu';
  const companyName = activeCompany?.name || 'Atsondika Global Trade';
  const companyIec = activeCompany?.iec || '0819238475';
  const companyEmail = activeCompany?.email || 'info@adidevexport.com';
  const companyPhone = activeCompany?.phone || '+91 78619 97755';

  const [selectedMission, setSelectedMission] = useState(ALL_WORLD_EMBASSIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState(INQUIRY_CATEGORIES[0].id);
  const [productName, setProductName] = useState('Spices, Commodities & Industrial Goods');
  const [hsCode, setHsCode] = useState('0910.30');
  const [customNotes, setCustomNotes] = useState(INQUIRY_CATEGORIES[0].template);
  const [localTimeInfo, setLocalTimeInfo] = useState({ timeStr: '', dateStr: '', isOpen: true });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close custom dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update template when category changes
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const cat = INQUIRY_CATEGORIES.find(c => c.id === catId);
    if (cat) {
      setCustomNotes(cat.template);
    }
  };

  // Live destination clock
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: selectedMission.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: selectedMission.timezone,
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });

        const localHour = parseInt(
          new Intl.DateTimeFormat('en-US', {
            timeZone: selectedMission.timezone,
            hour: 'numeric',
            hour12: false
          }).format(now),
          10
        );
        const localDay = new Intl.DateTimeFormat('en-US', {
          timeZone: selectedMission.timezone,
          weekday: 'short'
        }).format(now);

        const isWeekend = localDay === 'Sat' || localDay === 'Sun';
        const isOpen = !isWeekend && localHour >= 9 && localHour < 17;

        setLocalTimeInfo({
          timeStr: timeFormatter.format(now),
          dateStr: dateFormatter.format(now),
          isOpen
        });
      } catch (e) {
        // Fallback
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [selectedMission]);

  // Copy Email handler
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    if (liveToast) {
      liveToast(isGu ? 'સત્તાવાર ઈમેલ ક્લિપબોર્ડ પર કોપી થયો!' : 'Official Embassy Email copied to clipboard!');
    } else {
      alert(`Copied: ${email}`);
    }
  };

  // Trigger 1-Click Mailto
  const handleOneClickMail = () => {
    const category = INQUIRY_CATEGORIES.find(c => c.id === selectedCategory);
    const subject = `Official Trade Inquiry: ${productName} (HS: ${hsCode}) - ${companyName} [IEC: ${companyIec}]`;
    const body = `To,
The Commercial Counsellor / Head of Economic & Commercial Wing,
${selectedMission.mission},
${selectedMission.city}.

Respected Diplomatic Representative,

Greetings from ${companyName}, India.

We are a registered Indian export enterprise holding DGFT IEC Code: ${companyIec}.
We actively export ${productName} (HS Code: ${hsCode}).

We solicit your esteemed office's commercial facilitation in ${selectedMission.countryEn}.

Requisition Category: ${category ? category.labelEn : 'Trade Facilitation'}
Details:
"${customNotes}"

We look forward to your valuable diplomatic counsel and guidance.

Yours faithfully,
Authorized Representative
${companyName}
Phone: ${companyPhone} | Email: ${companyEmail}
Surat, Gujarat, India
`;

    const mailto = `mailto:${selectedMission.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    if (liveToast) {
      liveToast(isGu ? 'તમારા ઈમેલ ક્લાયન્ટમાં સત્તાવાર પત્ર ઓપન થઈ રહ્યો છે...' : 'Opening diplomatic draft in your default email client...');
    }
  };

  // Filtered Missions for the Search Popup
  const q = searchQuery.toLowerCase().trim();
  const filteredMissions = ALL_WORLD_EMBASSIES.filter(m => {
    if (!q) return true;
    return (
      m.countryEn.toLowerCase().includes(q) ||
      m.countryGu.toLowerCase().includes(q) ||
      m.city.toLowerCase().includes(q) ||
      m.iso.toLowerCase().includes(q) ||
      (m.region && m.region.toLowerCase().includes(q))
    );
  });

  const activeCat = INQUIRY_CATEGORIES.find(c => c.id === selectedCategory);
  const formalLetterText = `DATE: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
REFERENCE: COMM/EXP/${new Date().getFullYear()}/${companyIec.slice(-4)}

TO:
The Commercial Counsellor / First Secretary (Commerce),
${selectedMission.mission},
${selectedMission.address}.
Official MEA Email: ${selectedMission.email}

SUBJECT: ${activeCat ? activeCat.subject : 'Official Commercial Inquiry'} - ${productName} (HS: ${hsCode})

Respected Diplomatic Representative,

We have the honour to address your esteemed mission on behalf of ${companyName}, a certified export house based in Gujarat, India, operating under Director General of Foreign Trade (DGFT) Import-Export Code (IEC): ${companyIec}.

1. NATURE OF INQUIRY:
Category: ${activeCat ? activeCat.labelEn : 'General Trade Facilitation'}
Product Scope: ${productName}
Harmonized System (HS) Code: ${hsCode}

2. DETAILED REQUISITION & STATEMENT:
"${customNotes}"

3. COMPLIANCE & ACCREDITATIONS:
Our export operations strictly adhere to international benchmarks, SGS/Bureau Veritas inspections, and bilateral trade compliance protocols recognized by the Ministry of Commerce & Industry, Government of India.

4. REQUIRED ACTION / FACILITATION:
We earnestly solicit the Commercial Wing's official guidance, due diligence assistance, and liaison with vetted trade associations within ${selectedMission.countryEn}.

Respectfully submitted,

Yours faithfully,
For ${companyName}
Authorized Trade Signatory
Mobile: ${companyPhone} | Email: ${companyEmail}
Registered Trade Office: Surat, Gujarat, India
`;

  return (
    <div className="glass-card" style={{
      marginTop: '35px',
      padding: '30px 24px',
      borderRadius: '20px',
      border: '1px solid rgba(45, 212, 191, 0.35)',
      background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(13, 148, 136, 0.12) 100%)',
      position: 'relative'
    }}>
      
      {/* Top Banner Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(234, 179, 8, 0.15)',
          border: '1px solid rgba(234, 179, 8, 0.4)',
          color: '#facc15',
          padding: '5px 16px',
          borderRadius: '20px',
          fontSize: '0.78rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '12px'
        }}>
          🏛️ {isGu ? 'ઇન્ડિયન એમ્બેસી કોમર્શિયલ વિંગ કનેક્ટ ડેસ્ક' : 'Official Indian Embassy Commercial Connect Desk'}
        </div>

        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.3px', margin: 0 }}>
          {isGu ? 'જે-તે દેશના Commercial Counsellor સાથે સીધો સંપર્ક & ટ્રેડ સિક્યુરિટી' : 'Direct Commercial Counsellor Liaison & Diplomatic Verification'}
        </h3>
        <p style={{ fontSize: '0.88rem', color: '#a5f3fc', maxWidth: '780px', margin: '8px auto 0 auto', lineHeight: '1.6' }}>
          {isGu
            ? `${companyName} તરફથી વિદેશી ખરીદદારની સત્યાર્થતા ચકાસણી (Buyer Verification), સરકારી ટેરિફ માર્ગદર્શન અને પેમેન્ટ સુરક્ષા માટે ભારત સરકારના દૂતાવાસ સાથે ૧-ક્લિક સીધો સંપર્ક.`
            : `Direct communication channel with Commercial Wings of Indian Diplomatic Missions worldwide for Buyer Due Diligence, Customs Tariffs, Non-Tariff Barriers, and Trade Dispute Redressal.`}
        </p>
      </div>

      {/* Grid: Feature 1 (Searchable Directory) & Feature 2 (Dispatch Form) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        alignItems: 'start',
        marginBottom: '30px'
      }}>

        {/* LEFT COLUMN: FEATURE 1 (Custom Searchable Embassy Dropdown & 1-Click Card) */}
        <div className="embassy-card embassy-directory-card" style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(45, 212, 191, 0.25)',
          borderRadius: '16px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          position: 'relative'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2dd4bf', textTransform: 'uppercase' }}>
                {isGu ? 'ફીચર ૧: વૈશ્વિક દૂતાવાસ ડિરેક્ટરી' : 'Feature 1: Global Mission Directory'}
              </span>
              <h4 className="embassy-card-title" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: '2px 0 0 0' }}>
                📍 {isGu ? 'લક્ષ્ય દેશ પસંદ કરો (Select Target Destination) *' : 'Select Target Destination *'}
              </h4>
            </div>
            <span style={{
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              color: '#4ade80',
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '0.7rem',
              fontWeight: 700
            }}>
              MEA Verified
            </span>
          </div>

          {/* CUSTOM SEARCHABLE EMBASSY COMBOBOX (Matching "Export Currency" exact style) */}
          <div style={{ position: 'relative', width: '100%', zIndex: isDropdownOpen ? 50 : 10 }} ref={dropdownRef}>
            
            {/* Trigger Button */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                userSelect: 'none',
                padding: '10px 14px',
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid ' + (isDropdownOpen ? 'rgba(56, 189, 248, 0.8)' : 'rgba(56, 189, 248, 0.35)'),
                borderRadius: '12px',
                color: 'white',
                boxShadow: isDropdownOpen ? '0 0 16px rgba(56, 189, 248, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <FlagIcon code={selectedMission.iso} width={26} height={18} style={{ borderRadius: '3px', boxShadow: '0 2px 6px rgba(0,0,0,0.5)', marginRight: 0 }} />
                <strong style={{ letterSpacing: '0.5px', color: '#facc15', fontSize: '0.9rem' }}>
                  {selectedMission.iso} {isGu ? selectedMission.countryGu : selectedMission.countryEn}
                </strong>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>({selectedMission.city})</span>
              </span>
              <span style={{ fontSize: '0.8rem', color: '#38bdf8', marginLeft: '8px' }}>
                {isDropdownOpen ? '▲' : '▼'}
              </span>
            </div>

            {/* Floating Searchable Popup Menu */}
            {isDropdownOpen && (
              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  width: '100%',
                  maxHeight: '380px',
                  zIndex: 99999,
                  padding: '12px',
                  background: '#090d16',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  borderRadius: '14px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
                {/* Search Input Bar */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder={isGu ? '🔍 દેશ, શહેર કે કોડ શોધો (USA, UAE, Berlin, Tokyo)...' : '🔍 Search country, city, code (USA, UAE, Berlin, London)...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '9px 32px 9px 12px',
                      fontSize: '0.84rem',
                      borderRadius: '8px',
                      background: 'rgba(30, 41, 59, 0.85)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#ffffff',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        fontSize: '0.9rem'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Subtitle Counter */}
                <div style={{
                  fontSize: '0.72rem',
                  color: '#38bdf8',
                  padding: '0 4px',
                  fontWeight: 700,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>Showing {filteredMissions.length} of {ALL_WORLD_EMBASSIES.length} World Embassies</span>
                  <span style={{ color: '#94a3b8' }}>દુનિયાના તમામ દેશો</span>
                </div>

                {/* Filtered Scrollable List */}
                <div
                  style={{
                    overflowY: 'auto',
                    maxHeight: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    paddingRight: '2px'
                  }}
                >
                  {filteredMissions.length > 0 ? (
                    filteredMissions.map((item) => {
                      const isSelected = item.id === selectedMission.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedMission(item);
                            setIsDropdownOpen(false);
                            setSearchQuery('');
                          }}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.84rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: isSelected ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid ' + (isSelected ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.05)'),
                            color: isSelected ? '#38bdf8' : '#e2e8f0',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FlagIcon code={item.iso} width={22} height={15} style={{ borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.4)', marginRight: 0 }} />
                            <strong style={{ color: '#facc15', fontSize: '0.82rem' }}>{item.iso}</strong>
                            <span style={{ fontWeight: 600 }}>{isGu ? item.countryGu : item.countryEn}</span>
                            <span style={{ opacity: 0.7, fontSize: '0.75rem', color: '#94a3b8' }}>- {item.city}</span>
                          </span>
                          {isSelected && <span style={{ color: '#38bdf8', fontWeight: 900 }}>✓</span>}
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>
                      {isGu ? `"${searchQuery}" માટે કોઈ દેશ મળ્યો નથી` : `No matching embassy found for "${searchQuery}"`}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Active Mission Details Card */}
          <div className="embassy-mission-details-box" style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            
            {/* Header: Flag, Country & Live Time */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FlagIcon code={selectedMission.iso} width={42} height={28} style={{ borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.5)', marginRight: 0 }} />
                <div>
                  <div className="embassy-mission-name" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                    {isGu ? selectedMission.countryGu : selectedMission.countryEn}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#38bdf8' }}>
                    {selectedMission.city} • <span style={{ color: '#94a3b8' }}>{selectedMission.region || 'International'}</span>
                  </div>
                </div>
              </div>

              {/* Live Clock Badge */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                color: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: localTimeInfo.isOpen ? '#22c55e' : '#f59e0b',
                  display: 'inline-block'
                }}></span>
                <span style={{ fontWeight: 800 }}>{localTimeInfo.timeStr}</span>
                <span style={{ color: localTimeInfo.isOpen ? '#4ade80' : '#fbbf24', fontSize: '0.68rem', fontWeight: 700 }}>
                  {localTimeInfo.isOpen ? '(Mission Open)' : '(Closed)'}
                </span>
              </div>
            </div>

            {/* Mission Details List */}
            <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div>
                <strong className="embassy-detail-label" style={{ color: '#94a3b8' }}>Mission:</strong>{' '}
                <span className="embassy-detail-val" style={{ color: '#f1f5f9', fontWeight: 700 }}>{selectedMission.mission}</span>
              </div>

              <div>
                <strong className="embassy-detail-label" style={{ color: '#94a3b8' }}>Commercial Head:</strong>{' '}
                <span className="embassy-detail-val" style={{ color: '#f1f5f9' }}>{selectedMission.designation}</span>
              </div>

              <div>
                <strong className="embassy-detail-label" style={{ color: '#94a3b8' }}>Official MEA Email:</strong>{' '}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: '3px' }}>
                  <code style={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    color: '#2dd4bf',
                    border: '1px solid rgba(45, 212, 191, 0.3)',
                    fontSize: '0.78rem',
                    fontWeight: 700
                  }}>
                    {selectedMission.email}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(selectedMission.email)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#38bdf8',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                  >
                    📋 Copy
                  </button>
                </div>
              </div>

              <div>
                <strong className="embassy-detail-label" style={{ color: '#94a3b8' }}>Phone:</strong>{' '}
                <span className="embassy-detail-val" style={{ color: '#f1f5f9' }}>{selectedMission.phone}</span>
              </div>

              <div>
                <strong className="embassy-detail-label" style={{ color: '#94a3b8' }}>Address:</strong>{' '}
                <span className="embassy-detail-val" style={{ color: '#cbd5e1' }}>{selectedMission.address}</span>
              </div>

              <div>
                <strong className="embassy-detail-label" style={{ color: '#94a3b8' }}>Official Portal:</strong>{' '}
                <a
                  href={selectedMission.website}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#38bdf8', textDecoration: 'underline', fontWeight: 700 }}
                >
                  {selectedMission.website.replace('https://www.', '').replace('https://', '')} ↗
                </a>
              </div>
            </div>

            {/* 1-Click Action Button */}
            <button
              type="button"
              onClick={handleOneClickMail}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #0d9488 0%, #059669 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(13, 148, 136, 0.4)',
                marginTop: '6px'
              }}
            >
              ⚡ {isGu ? '૧-ક્લિક સીધો ઈમેલ મોકલો (Direct Mail)' : '1-Click Send Direct Diplomatic Email'}
            </button>

          </div>

        </div>

        {/* RIGHT COLUMN: FEATURE 2 (Structured Query Dispatch Form) */}
        <div className="embassy-card embassy-dispatch-card" style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(234, 179, 8, 0.25)',
          borderRadius: '16px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#facc15', textTransform: 'uppercase' }}>
                {isGu ? 'ફીચર ૨: સરકારી ઢાંચામાં પૂછપરછ' : 'Feature 2: Structured Inquiry Dispatch'}
              </span>
              <h4 className="embassy-card-title" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: '2px 0 0 0' }}>
                📝 {isGu ? 'સત્તાવાર પૂછપરછ ફોર્મ (Inquiry Requisition)' : 'Formal Diplomatic Query Generator'}
              </h4>
            </div>
            <span style={{
              background: 'rgba(234, 179, 8, 0.15)',
              border: '1px solid rgba(234, 179, 8, 0.35)',
              color: '#facc15',
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '0.7rem',
              fontWeight: 700
            }}>
              IEC: {companyIec}
            </span>
          </div>

          {/* Form Fields */}
          <div>
            <label className="embassy-form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>
              {isGu ? 'પૂછપરછનો પ્રકાર (Inquiry Category):' : 'Inquiry Category:'}
            </label>
            <select
              className="embassy-form-input"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '10px',
                border: '1px solid rgba(234, 179, 8, 0.4)',
                background: '#0f172a',
                color: '#ffffff',
                fontSize: '0.84rem',
                fontWeight: 700,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              {INQUIRY_CATEGORIES.map(c => (
                <option key={c.id} value={c.id} style={{ background: '#0f172a', color: '#ffffff' }}>
                  {isGu ? c.labelGu : c.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label className="embassy-form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>
                {isGu ? 'પ્રોડક્ટનું નામ (Product):' : 'Product Name:'}
              </label>
              <input
                type="text"
                className="embassy-form-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: 'rgba(30, 41, 59, 0.7)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label className="embassy-form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>
                {isGu ? 'HS Code (6/8 Digits):' : 'HS Code:'}
              </label>
              <input
                type="text"
                className="embassy-form-input"
                value={hsCode}
                onChange={(e) => setHsCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: 'rgba(30, 41, 59, 0.7)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label className="embassy-form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>
              {isGu ? 'પત્રની વિગત (Official Dispatch Requisition):' : 'Official Letter Content / Requisition:'}
            </label>
            <textarea
              className="embassy-form-input"
              rows="4"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(30, 41, 59, 0.7)',
                color: '#e2e8f0',
                fontSize: '0.82rem',
                lineHeight: '1.5',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(234, 179, 8, 0.4)',
                background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
                color: '#000000',
                fontWeight: 800,
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3)'
              }}
            >
              📜 {isGu ? 'પત્ર પ્રીવ્યૂ કરો (Preview Letter)' : 'Preview Official Diplomatic Letter'}
            </button>
          </div>

        </div>

      </div>

      {/* FEATURE 3: GOVERNMENT OFFICIAL TRADE PORTALS HUB */}
      <div style={{
        paddingTop: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
              {isGu ? 'ફીચર ૩: ભારત સરકાર સત્તાવાર પોર્ટલ્સ' : 'Feature 3: Govt Portals & Safe Harbor Hub'}
            </span>
            <h4 className="embassy-gov-hub-title" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '2px 0 0 0' }}>
              🛡️ {isGu ? 'સત્તાવાર સરકારી પોર્ટલ્સ & વેરિફિકેશન લિંક્સ' : 'Official Trade Verification & Redressal Links'}
            </h4>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px'
        }}>
          
          <a
            href="https://www.indiantradeportal.in/"
            target="_blank"
            rel="noreferrer"
            className="embassy-gov-portal-card"
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              background: 'rgba(15, 23, 42, 0.6)',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s'
            }}
          >
            <div>
              <div style={{ fontSize: '1.25rem', marginBottom: '6px' }}>🇮🇳</div>
              <div className="embassy-gov-portal-title" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>Indian Trade Portal</div>
              <div className="embassy-gov-portal-desc" style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', lineHeight: '1.4' }}>
                {isGu ? 'દેશ મુજબ કસ્ટમ ડ્યુટી, MFN ટેરિફ અને નિયમનકારી ધોરણો.' : 'Country-wise customs tariffs, MFN duty rates & SPS standards.'}
              </div>
            </div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', marginTop: '10px' }}>
              indiantradeportal.in ↗
            </div>
          </a>

          <a
            href="https://mea.gov.in/economic-diplomacy.htm"
            target="_blank"
            rel="noreferrer"
            className="embassy-gov-portal-card"
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              background: 'rgba(15, 23, 42, 0.6)',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s'
            }}
          >
            <div>
              <div style={{ fontSize: '1.25rem', marginBottom: '6px' }}>🤝</div>
              <div className="embassy-gov-portal-title" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>MEA Economic Diplomacy</div>
              <div className="embassy-gov-portal-desc" style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', lineHeight: '1.4' }}>
                {isGu ? 'વિદેશ મંત્રાલયનો 3Ts વિભાગ: ટ્રેડ, ટુરિઝમ અને ટેકનોલોજી સહાય.' : 'Ministry of External Affairs 3Ts trade & commercial missions division.'}
              </div>
            </div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#facc15', marginTop: '10px' }}>
              mea.gov.in ↗
            </div>
          </a>

          <a
            href="https://www.dgft.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="embassy-gov-portal-card"
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid rgba(45, 212, 191, 0.25)',
              background: 'rgba(15, 23, 42, 0.6)',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s'
            }}
          >
            <div>
              <div style={{ fontSize: '1.25rem', marginBottom: '6px' }}>⚖️</div>
              <div className="embassy-gov-portal-title" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>DGFT Trade Dispute Desk</div>
              <div className="embassy-gov-portal-desc" style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', lineHeight: '1.4' }}>
                {isGu ? 'વિદેશી ખરીદદાર સામે પેમેન્ટ ડિફોલ્ટ કે વિવાદ માટે સરકારી પોર્ટલ.' : 'Official Government dispute resolution & defaulting buyer redressal.'}
              </div>
            </div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2dd4bf', marginTop: '10px' }}>
              dgft.gov.in ↗
            </div>
          </a>

          <a
            href="https://www.fieo.org/"
            target="_blank"
            rel="noreferrer"
            className="embassy-gov-portal-card"
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              background: 'rgba(15, 23, 42, 0.6)',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s'
            }}
          >
            <div>
              <div style={{ fontSize: '1.25rem', marginBottom: '6px' }}>🌐</div>
              <div className="embassy-gov-portal-title" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>FIEO Apex Exporters Body</div>
              <div className="embassy-gov-portal-desc" style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', lineHeight: '1.4' }}>
                {isGu ? 'ગ્લોબલ ટ્રેડ એસોસિએશન્સ, RCMC સર્ટિફિકેશન અને B2B બાયર મેળાઓ.' : 'Federation of Indian Export Organisations international buyer meets.'}
              </div>
            </div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#c084fc', marginTop: '10px' }}>
              fieo.org ↗
            </div>
          </a>

        </div>
      </div>

      {/* FORMAL LETTER PREVIEW MODAL */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#0f172a',
            border: '1px solid rgba(234, 179, 8, 0.4)',
            borderRadius: '18px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)'
          }}>
            
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px',
              background: '#1e293b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.25rem' }}>📜</span>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {isGu ? 'સત્તાવાર ડિપ્લોમેટિક પત્ર પ્રીવ્યૂ' : 'Formal Diplomatic Letter Preview'}
                  </h4>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    To: {selectedMission.mission} ({selectedMission.email})
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              padding: '20px',
              overflowY: 'auto',
              flex: 1,
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#e2e8f0',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              background: '#090d16'
            }}>
              {formalLetterText}
            </div>

            {/* Modal Actions */}
            <div style={{
              padding: '14px 20px',
              background: '#1e293b',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(formalLetterText);
                  if (liveToast) liveToast(isGu ? 'સત્તાવાર પત્ર ક્લિપબોર્ડ પર કોપી થયો!' : 'Letter text copied to clipboard!');
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                📋 {isGu ? 'પત્ર કોપી કરો (Copy)' : 'Copy Letter Text'}
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'transparent',
                    color: '#94a3b8',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  {isGu ? 'બંધ કરો' : 'Close'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleOneClickMail();
                    setIsModalOpen(false);
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #0d9488 0%, #059669 100%)',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(13, 148, 136, 0.4)'
                  }}
                >
                  ✉️ {isGu ? 'ઈમેલ ક્લાયન્ટમાં મોકલો' : 'Launch Email Client & Send'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
