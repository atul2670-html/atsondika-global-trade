import React, { useState, useRef, useEffect } from 'react';
import { DEFAULT_CURRENCIES } from '../utils/realtimeSync.js';

export default function SearchableCurrencySelect({ label, value, onChange, currenciesList, currencyDict }) {
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

  // Build normalized list
  let items = [];
  if (Array.isArray(currenciesList) && currenciesList.length > 0) {
    items = currenciesList;
  } else if (currencyDict && typeof currencyDict === 'object') {
    items = Object.keys(currencyDict).map(code => ({
      code,
      symbol: currencyDict[code].symbol || '',
      flag: currencyDict[code].flag || '🌐',
      name: currencyDict[code].name || code
    }));
  } else {
    items = DEFAULT_CURRENCIES;
  }

  const activeCode = typeof value === 'object' && value ? value.code : (value || 'USD');
  const activeObj = items.find(c => c.code === activeCode) || items[0] || { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar (USA)' };

  const q = searchQuery.toLowerCase().trim();
  const filteredItems = items.filter(c => {
    if (!q) return true;
    return (
      (c.code || '').toLowerCase().includes(q) ||
      (c.name || '').toLowerCase().includes(q) ||
      (c.symbol || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="form-group" style={{ position: 'relative', marginBottom: 0 }} ref={containerRef}>
      {label && <label className="form-label" style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px', display: 'block' }}>{label}</label>}

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
          padding: '8px 12px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '0.85rem'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '1.1rem' }}>{activeObj.flag}</span>
          <strong style={{ letterSpacing: '0.5px', color: '#facc15' }}>{activeObj.code} ({activeObj.symbol})</strong>
        </span>
        <span style={{ fontSize: '0.75rem', opacity: 0.8, marginLeft: '6px' }}>
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
            right: 0,
            width: '280px',
            maxHeight: '340px',
            zIndex: 9999,
            padding: '12px',
            background: '#0f172a',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            borderRadius: '16px'
          }}
        >
          {/* Typing Search Input Bar */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search currency (USD, EUR, AED...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '8px 30px 8px 12px',
                fontSize: '0.82rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  fontSize: '0.85rem'
                }}
              >
                ✕
              </button>
            )}
          </div>

          <div style={{ fontSize: '0.72rem', color: '#94a3b8', padding: '0 2px', fontWeight: 600 }}>
            Showing {filteredItems.length} of {items.length} World Currencies
          </div>

          {/* Filtered Scrollable List */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              paddingRight: '2px'
            }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map(item => {
                const isSelected = item.code === activeCode;
                return (
                  <div
                    key={item.code}
                    onClick={() => {
                      onChange(item);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.84rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.03)',
                      border: '1px solid ' + (isSelected ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255,255,255,0.05)'),
                      color: isSelected ? '#38bdf8' : '#e2e8f0',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem' }}>{item.flag}</span>
                      <strong style={{ color: '#facc15' }}>{item.code} ({item.symbol})</strong>
                      <span style={{ opacity: 0.8, fontSize: '0.78rem' }}>- {item.name}</span>
                    </span>
                    {isSelected && <span style={{ color: '#38bdf8', fontWeight: 900 }}>✓</span>}
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '14px', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>
                No matching currency found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
