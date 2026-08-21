import React, { useState, useRef, useEffect } from 'react';

export default function SearchableCurrencySelect({ label, value, onChange, currencyDict }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const sortedCodes = Object.keys(currencyDict).sort();
  const currentMeta = currencyDict[value] || { flag: '🌐', name: value };

  const filteredCodes = sortedCodes.filter(code => {
    const meta = currencyDict[code] || { name: code };
    const q = searchQuery.toLowerCase().trim();
    return (
      code.toLowerCase().includes(q) ||
      meta.name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="form-group" style={{ position: 'relative' }} ref={containerRef}>
      <label className="form-label">{label}</label>

      {/* Main Selected Combobox Trigger Bar */}
      <div
        className="form-control searchable-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
          padding: '10px 14px'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '1.2rem' }}>{currentMeta.flag}</span>
          <strong style={{ letterSpacing: '0.5px' }}>{value}</strong>
          <span style={{ opacity: 0.8, fontWeight: 500 }}>- {currentMeta.name}</span>
        </span>
        <span style={{ fontSize: '0.8rem', opacity: 0.7, marginLeft: '8px' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>

      {/* Interactive Typeable Search Popup Menu */}
      {isOpen && (
        <div
          className="searchable-select-popup glass-card"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: '100%',
            maxHeight: '320px',
            zIndex: 1200,
            padding: '12px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            borderRadius: 'var(--radius-md)'
          }}
        >
          {/* Typing Search Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Type currency code (USD, INR...) or country name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '10px 34px 10px 14px',
                fontSize: '0.88rem',
                borderRadius: 'var(--radius-sm)'
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
                  color: 'var(--text-sub)',
                  fontSize: '0.9rem'
                }}
              >
                ✕
              </button>
            )}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', padding: '0 4px', fontWeight: 600 }}>
            Found {filteredCodes.length} of {sortedCodes.length} World Currencies
          </div>

          {/* Filtered Scrollable List */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '210px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              paddingRight: '4px'
            }}
          >
            {filteredCodes.length > 0 ? (
              filteredCodes.map(code => {
                const meta = currencyDict[code] || { flag: '🌐', name: code };
                const isSelected = code === value;
                return (
                  <div
                    key={code}
                    onClick={() => {
                      onChange(code);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`currency-option-item ${isSelected ? 'selected' : ''}`}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem' }}>{meta.flag}</span>
                      <strong>{code}</strong>
                      <span style={{ opacity: 0.8, fontSize: '0.84rem' }}>- {meta.name}</span>
                    </span>
                    {isSelected && <span style={{ color: 'var(--primary-teal-glow)', fontWeight: 800 }}>✓</span>}
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-sub)', fontSize: '0.85rem' }}>
                No matching currencies found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
