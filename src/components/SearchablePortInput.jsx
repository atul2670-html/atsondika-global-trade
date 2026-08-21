import React, { useState, useRef, useEffect } from 'react';

// MASTER COMPREHENSIVE PORT & AIRPORT DATABASE WITH NEARBY CITY/COUNTRY MAPPING
export const masterPortList = [
  // INDIAN ORIGIN PORTS & AIRPORTS
  { code: 'INHZA', name: 'Hazira / Surat Port (INHZA)', city: 'Surat', country: 'India', flag: '🇮🇳', mode: 'Sea Freight', type: 'origin', keywords: 'surat hazira navsari vapi valsad ankleshwar bharuch gujarat india sea port' },
  { code: 'STV', name: 'Surat International Airport (STV)', city: 'Surat', country: 'India', flag: '🇮🇳', mode: 'Air Cargo', type: 'origin', keywords: 'surat stv navsari valsad vapi gujarat india air airport' },
  { code: 'INMUN', name: 'Mundra Port (INMUN)', city: 'Mundra, Kutch', country: 'India', flag: '🇮🇳', mode: 'Sea Freight', type: 'origin', keywords: 'mundra kutch gandhidham bhuj rajkot jamnagar gujarat india port sea' },
  { code: 'INNSA', name: 'Nhava Sheva / JNPT (INNSA)', city: 'Navi Mumbai', country: 'India', flag: '🇮🇳', mode: 'Sea Freight', type: 'origin', keywords: 'nhava sheva jnpt mumbai pune maharashtra india sea port' },
  { code: 'BOM', name: 'Mumbai Airport (BOM)', city: 'Mumbai', country: 'India', flag: '🇮🇳', mode: 'Air Cargo', type: 'origin', keywords: 'mumbai bom chhatrapati pune maharashtra airport air' },
  { code: 'DEL', name: 'Delhi Airport (DEL)', city: 'New Delhi', country: 'India', flag: '🇮🇳', mode: 'Air Cargo', type: 'origin', keywords: 'delhi del gurgaon noida faridabad ludhiana jaipur airport air' },
  { code: 'AMD', name: 'Ahmedabad Airport (AMD)', city: 'Ahmedabad', country: 'India', flag: '🇮🇳', mode: 'Air Cargo', type: 'origin', keywords: 'ahmedabad amd baroda vadodara gandhinagar rajkot gujarat airport air' },
  { code: 'INGPV', name: 'Pipavav Port (INGPV)', city: 'Amreli', country: 'India', flag: '🇮🇳', mode: 'Sea Freight', type: 'origin', keywords: 'pipavav amreli rajkot bhavnagar gujarat port sea' },
  { code: 'IXY', name: 'Kandla / Deendayal Port (IXY)', city: 'Kandla', country: 'India', flag: '🇮🇳', mode: 'Sea Freight', type: 'origin', keywords: 'kandla deendayal kutch gandhidham gujarat port sea' },
  { code: 'INMAA', name: 'Chennai Port (INMAA)', city: 'Chennai', country: 'India', flag: '🇮🇳', mode: 'Sea Freight', type: 'origin', keywords: 'chennai tamil nadu south india port sea' },

  // CANADA DESTINATION PORTS & AIRPORTS
  { code: 'CAVAN', name: 'Vancouver Port (CAVAN)', city: 'Vancouver', country: 'Canada', flag: '🇨🇦', mode: 'Sea Freight', type: 'dest', keywords: 'canada vancouver richmond surrey victoria british columbia port sea' },
  { code: 'CAMTR', name: 'Montreal Port (CAMTR)', city: 'Montreal', country: 'Canada', flag: '🇨🇦', mode: 'Sea Freight', type: 'dest', keywords: 'canada montreal laval quebec city port sea' },
  { code: 'CAHAL', name: 'Halifax Port (CAHAL)', city: 'Halifax', country: 'Canada', flag: '🇨🇦', mode: 'Sea Freight', type: 'dest', keywords: 'canada halifax nova scotia port sea' },
  { code: 'YYZ', name: 'Toronto Pearson International (YYZ)', city: 'Toronto', country: 'Canada', flag: '🇨🇦', mode: 'Air Cargo', type: 'dest', keywords: 'canada toronto mississauga brampton hamilton ontario air airport' },
  { code: 'YVR', name: 'Vancouver International Airport (YVR)', city: 'Vancouver', country: 'Canada', flag: '🇨🇦', mode: 'Air Cargo', type: 'dest', keywords: 'canada vancouver yvr air airport' },
  { code: 'YUL', name: 'Montreal-Trudeau Airport (YUL)', city: 'Montreal', country: 'Canada', flag: '🇨🇦', mode: 'Air Cargo', type: 'dest', keywords: 'canada montreal yul air airport' },
  { code: 'YYC', name: 'Calgary International Airport (YYC)', city: 'Calgary', country: 'Canada', flag: '🇨🇦', mode: 'Air Cargo', type: 'dest', keywords: 'canada calgary edmonton alberta air airport' },

  // MIDDLE EAST DESTINATION PORTS & AIRPORTS
  { code: 'AEJEA', name: 'Jebel Ali, Dubai (AEJEA)', city: 'Dubai', country: 'UAE', flag: '🇦🇪', mode: 'Sea Freight', type: 'dest', keywords: 'dubai uae jebel ali abu dhabi sharjah ajman emirates port sea' },
  { code: 'DXB', name: 'Dubai International (DXB)', city: 'Dubai', country: 'UAE', flag: '🇦🇪', mode: 'Air Cargo', type: 'dest', keywords: 'dubai dxb uae sharjah air airport cargo' },
  { code: 'SHJ', name: 'Sharjah International (SHJ)', city: 'Sharjah', country: 'UAE', flag: '🇦🇪', mode: 'Air Cargo', type: 'dest', keywords: 'sharjah shj uae ajman air airport' },
  { code: 'DWC', name: 'Jebel Ali / Dubai DWC (DWC)', city: 'Dubai', country: 'UAE', flag: '🇦🇪', mode: 'Air Cargo', type: 'dest', keywords: 'dubai dwc al maktoum uae air airport' },
  { code: 'SADMM', name: 'Dammam / King Abdul Aziz (SADMM)', city: 'Dammam', country: 'Saudi Arabia', flag: '🇸🇦', mode: 'Sea Freight', type: 'dest', keywords: 'dammam saudi arabia khobar dhahran port sea' },
  { code: 'SAJED', name: 'Jeddah Islamic Port (SAJED)', city: 'Jeddah', country: 'Saudi Arabia', flag: '🇸🇦', mode: 'Sea Freight', type: 'dest', keywords: 'jeddah makkah saudi arabia port sea' },
  { code: 'RUH', name: 'Riyadh / King Khalid (RUH)', city: 'Riyadh', country: 'Saudi Arabia', flag: '🇸🇦', mode: 'Air Cargo', type: 'dest', keywords: 'riyadh ruh saudi arabia air airport' },
  { code: 'QAQAT', name: 'Hamad Port, Qatar (QAQAT)', city: 'Doha', country: 'Qatar', flag: '🇶🇦', mode: 'Sea Freight', type: 'dest', keywords: 'qatar doha hamad port sea' },

  // EUROPE DESTINATION PORTS & AIRPORTS
  { code: 'NLRTM', name: 'Rotterdam Port (NLRTM)', city: 'Rotterdam', country: 'Netherlands', flag: '🇳🇱', mode: 'Sea Freight', type: 'dest', keywords: 'rotterdam netherlands amsterdam hague europe port sea' },
  { code: 'DEHAM', name: 'Hamburg Port (DEHAM)', city: 'Hamburg', country: 'Germany', flag: '🇩🇪', mode: 'Sea Freight', type: 'dest', keywords: 'hamburg bremen berlin germany europe port sea' },
  { code: 'GBFXT', name: 'Felixstowe Port (GBFXT)', city: 'Felixstowe', country: 'UK', flag: '🇬🇧', mode: 'Sea Freight', type: 'dest', keywords: 'uk united kingdom london felixstowe port sea' },
  { code: 'BEANR', name: 'Antwerp Port (BEANR)', city: 'Antwerp', country: 'Belgium', flag: '🇧🇪', mode: 'Sea Freight', type: 'dest', keywords: 'antwerp brussels belgium europe port sea' },
  { code: 'LHR', name: 'London Heathrow (LHR)', city: 'London', country: 'UK', flag: '🇬🇧', mode: 'Air Cargo', type: 'dest', keywords: 'london heathrow lhr manchester uk air airport' },
  { code: 'FRA', name: 'Frankfurt Airport (FRA)', city: 'Frankfurt', country: 'Germany', flag: '🇩🇪', mode: 'Air Cargo', type: 'dest', keywords: 'frankfurt fra berlin munich germany air airport' },
  { code: 'AMS', name: 'Amsterdam Schiphol (AMS)', city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', mode: 'Air Cargo', type: 'dest', keywords: 'amsterdam schiphol ams netherlands air airport' },
  { code: 'CDG', name: 'Paris Charles de Gaulle (CDG)', city: 'Paris', country: 'France', flag: '🇫🇷', mode: 'Air Cargo', type: 'dest', keywords: 'paris cdg france europe air airport' },

  // USA & NORTH AMERICA
  { code: 'USNYC', name: 'Port of New York / New Jersey (USNYC)', city: 'New York', country: 'USA', flag: '🇺🇸', mode: 'Sea Freight', type: 'dest', keywords: 'usa new york nj new jersey port sea' },
  { code: 'USSAV', name: 'Savannah Port, Georgia (USSAV)', city: 'Savannah', country: 'USA', flag: '🇺🇸', mode: 'Sea Freight', type: 'dest', keywords: 'usa savannah georgia atlanta port sea' },
  { code: 'USLAX', name: 'Los Angeles Port (USLAX)', city: 'Los Angeles', country: 'USA', flag: '🇺🇸', mode: 'Sea Freight', type: 'dest', keywords: 'usa los angeles lax california long beach port sea' },
  { code: 'JFK', name: 'New York (JFK / EWR)', city: 'New York', country: 'USA', flag: '🇺🇸', mode: 'Air Cargo', type: 'dest', keywords: 'usa new york jfk ewr air airport' },
  { code: 'ORD', name: 'Chicago O\'Hare (ORD)', city: 'Chicago', country: 'USA', flag: '🇺🇸', mode: 'Air Cargo', type: 'dest', keywords: 'usa chicago ord illinois air airport' },

  // ASIA PACIFIC
  { code: 'SGSIN', name: 'Singapore Port (SGSIN)', city: 'Singapore', country: 'Singapore', flag: '🇸🇬', mode: 'Sea Freight', type: 'dest', keywords: 'singapore port sea' },
  { code: 'SIN', name: 'Singapore Changi (SIN)', city: 'Singapore', country: 'Singapore', flag: '🇸🇬', mode: 'Air Cargo', type: 'dest', keywords: 'singapore changi sin air airport' },
  { code: 'MYPKG', name: 'Port Klang (MYPKG)', city: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾', mode: 'Sea Freight', type: 'dest', keywords: 'malaysia klang kuala lumpur port sea' },
  { code: 'KUL', name: 'Kuala Lumpur (KUL)', city: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾', mode: 'Air Cargo', type: 'dest', keywords: 'malaysia kuala lumpur kul air airport' },
  { code: 'THLCH', name: 'Laem Chabang (THLCH)', city: 'Chonburi', country: 'Thailand', flag: '🇹🇭', mode: 'Sea Freight', type: 'dest', keywords: 'thailand laem chabang bangkok port sea' },
  { code: 'BKK', name: 'Bangkok Suvarnabhumi (BKK)', city: 'Bangkok', country: 'Thailand', flag: '🇹🇭', mode: 'Air Cargo', type: 'dest', keywords: 'thailand bangkok bkk air airport' },

  // AFRICA
  { code: 'KEMBA', name: 'Mombasa Port (KEMBA)', city: 'Mombasa', country: 'Kenya', flag: '🇰🇪', mode: 'Sea Freight', type: 'dest', keywords: 'kenya mombasa nairobi africa port sea' },
  { code: 'ZADUR', name: 'Durban Port (ZADUR)', city: 'Durban', country: 'South Africa', flag: '🇿🇦', mode: 'Sea Freight', type: 'dest', keywords: 'south africa durban johannesburg port sea' }
];

export default function SearchablePortInput({
  label,
  value,
  onChange,
  placeholder,
  portType = 'all', // 'origin' | 'dest' | 'all'
  quickPresets = []
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Direct Google Internet Search for nearest seaport & airport
  const handleInternetPortSearch = (queryStr) => {
    const q = (queryStr || value || '').trim();
    if (!q) {
      alert("⚠️ Please type a city, port, or country name in the search box first!");
      return;
    }
    const searchKeyword = `${q} nearest seaport airport UNLOCODE container shipping transit time`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchKeyword)}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  const q = (value || '').toLowerCase().trim();

  // Filter master list by name, code, city, country, or nearby city keywords
  const filteredPorts = masterPortList.filter(item => {
    if (portType === 'origin' && item.type !== 'origin') return false;
    if (portType === 'dest' && item.type !== 'dest') return false;
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      (item.keywords && item.keywords.toLowerCase().includes(q))
    );
  }).slice(0, 10);

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={containerRef}>
      {label && (
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary-teal-glow)', marginBottom: '6px' }}>
          {label}
        </label>
      )}

      {/* Main Search Bar with Integrated Internet Search Button */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <input
          type="text"
          className="form-control search-input"
          placeholder={placeholder || "🔍 Search port name, city or country (e.g. Surat, Canada, Dubai)..."}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          style={{ fontSize: '0.86rem', flex: 1 }}
        />

        {/* 🌐 DIRECT INTERNET SEARCH BUTTON (1-Click Google Lookup) */}
        <button
          type="button"
          onClick={() => handleInternetPortSearch(value)}
          className="btn-primary"
          style={{
            padding: '0 10px',
            height: '38px',
            flexShrink: 0,
            fontSize: '0.78rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="Search Google Internet for Nearest Ports & Airports"
        >
          🌐 Search Internet
        </button>

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
            className="btn-secondary"
            style={{ padding: '6px 10px', height: '38px', fontSize: '0.78rem', flexShrink: 0 }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Quick Preset Buttons */}
      {quickPresets && quickPresets.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
          {quickPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.73rem', padding: '3px 8px', borderRadius: '12px' }}
              onClick={() => {
                onChange(preset.value);
                setIsOpen(false);
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {/* Autocomplete Dropdown Panel (HS Code Style with Internet Search Link) */}
      {isOpen && (
        <div
          className="glass-card"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            width: '100%',
            maxHeight: '290px',
            overflowY: 'auto',
            zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.98)',
            backdropFilter: 'blur(24px)',
            border: '1px solid var(--primary-teal-glow)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
            padding: '6px'
          }}
        >
          {/* Top Banner: Direct Internet Search for Current City/Country Query */}
          <div
            onClick={() => {
              handleInternetPortSearch(value);
              setIsOpen(false);
            }}
            style={{
              padding: '8px 10px',
              marginBottom: '6px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 800,
              background: 'rgba(2, 132, 199, 0.18)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.15s ease'
            }}
            className="port-suggestion-item"
          >
            <span>🌐 Search Internet for "{value || 'nearest ports'}" Seaports & Airports</span>
            <span style={{ fontSize: '0.72rem', background: '#0284c7', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>
              Search Google ➔
            </span>
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)', padding: '4px 8px', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '4px' }}>
            👇 Autocomplete Suggestions ({filteredPorts.length} Nearby Ports Found):
          </div>

          {filteredPorts.length === 0 ? (
            <div style={{ padding: '14px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', marginBottom: '10px' }}>
                No predefined local port found for "{value}".
              </p>
              <button
                type="button"
                className="btn-primary"
                style={{
                  width: '100%',
                  fontSize: '0.82rem',
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  justifyContent: 'center'
                }}
                onClick={() => {
                  handleInternetPortSearch(value);
                  setIsOpen(false);
                }}
              >
                🌐 Search Google Internet for "{value}" Nearest Seaports & Airports ➔
              </button>
            </div>
          ) : (
            filteredPorts.map((item, idx) => {
              const isAir = item.mode === 'Air Cargo';
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onChange(item.name);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                  className="port-suggestion-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.1rem' }}>{item.flag}</span>
                    <div>
                      <div style={{ fontWeight: 800, color: 'white' }}>
                        {isAir ? '🛫 ' : '⚓ '}{item.name}
                      </div>
                      <div style={{ fontSize: '0.73rem', color: 'var(--text-sub)' }}>
                        📍 {item.city}, {item.country} ({item.code})
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: isAir ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                    color: isAir ? '#f59e0b' : '#38bdf8',
                    border: isAir ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(56, 189, 248, 0.4)'
                  }}>
                    {isAir ? '✈️ Air' : '🚢 Sea'}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
