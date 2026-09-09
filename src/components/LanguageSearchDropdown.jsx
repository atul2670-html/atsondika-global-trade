import React, { useState, useEffect, useRef } from 'react';
import { ALL_WORLD_LANGUAGES } from '../utils/worldLanguages';
import { translateWholePage } from '../utils/webPageTranslator';

export default function LanguageSearchDropdown({
  currentLanguage,
  setCurrentLanguage,
  isHeader = false,
  isFormInput = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeLangObj = ALL_WORLD_LANGUAGES.find(l => l.code === (currentLanguage || 'en')) || ALL_WORLD_LANGUAGES[0];

  const filteredLanguages = ALL_WORLD_LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.native.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="no-translate-element notranslate" style={{ position: 'relative', zIndex: isOpen ? 9999 : 100, display: 'inline-block' }}>
      {/* Trigger Button Box */}
      <div
        style={{
          background: isHeader ? 'rgba(15, 23, 42, 0.9)' : 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(45, 212, 191, 0.4)',
          borderRadius: isHeader ? '10px' : '14px',
          padding: isHeader ? '4px 10px' : '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          fontWeight: 800,
          fontSize: isHeader ? '0.78rem' : '0.86rem',
          color: 'white',
          minWidth: isHeader ? '140px' : '170px',
          boxShadow: '0 0 10px rgba(45, 212, 191, 0.2)'
        }}
        onClick={() => setIsOpen(!isOpen)}
        title="Select Live Web Page Display Language (100+ Languages)"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: isHeader ? '1.05rem' : '1.15rem' }}>{activeLangObj.flag}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 800, color: '#f8fafc' }}>{activeLangObj.native}</span>
            {activeLangObj.native.toLowerCase() !== activeLangObj.name.toLowerCase() && (
              <span style={{ fontSize: '0.7rem', color: '#2dd4bf', fontWeight: 700 }}>
                ({activeLangObj.name})
              </span>
            )}
          </div>
        </div>
        <span style={{ fontSize: '0.65rem', color: '#2dd4bf', marginLeft: '4px' }}>▼</span>
      </div>

      {/* Popup Search Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 9999,
            marginTop: '6px',
            background: '#0b0f19',
            border: '1px solid rgba(45, 212, 191, 0.5)',
            borderRadius: '14px',
            padding: '10px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.9)',
            maxHeight: '360px',
            minWidth: '240px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {/* Search Input Box */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder={`🔍 Search language... (${activeLangObj.name})`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(45, 212, 191, 0.4)',
                borderRadius: '8px',
                padding: '7px 10px',
                color: 'white',
                fontSize: '0.82rem',
                outline: 'none'
              }}
              autoFocus
            />
          </div>

          {/* List of 100+ World Languages */}
          <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '280px' }}>
            {filteredLanguages.length === 0 ? (
              <div style={{ padding: '10px', textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
                No language found matching "{search}"
              </div>
            ) : (
              filteredLanguages.map(lang => {
                const isSelected = lang.code === currentLanguage;
                return (
                  <div
                    key={lang.code}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 9px',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(45, 212, 191, 0.18)' : 'transparent',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      color: isSelected ? '#2dd4bf' : '#f8fafc'
                    }}
                    onClick={() => {
                      if (!isFormInput && setCurrentLanguage) {
                        try {
                          localStorage.setItem('atsondika_trade_lang', lang.code);
                        } catch(e) {}
                        setCurrentLanguage(lang.code);
                      }
                      setIsOpen(false);
                      setSearch('');
                      if (!isFormInput) {
                        translateWholePage(lang.code);
                        setTimeout(() => {
                          translateWholePage(lang.code);
                        }, 100);
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem' }}>{lang.flag}</span>
                      <div>
                        <div style={{ fontWeight: isSelected ? 800 : 600 }}>{lang.native}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{lang.name} • {lang.region}</div>
                      </div>
                    </div>
                    {isSelected && <span style={{ fontSize: '0.8rem', color: '#2dd4bf', fontWeight: 900 }}>✓</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
