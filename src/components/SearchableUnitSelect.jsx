import React, { useState, useRef, useEffect } from 'react';

export const worldExportUnitsList = [
  // Mass & Weight
  { code: 'MT', name: 'Metric Tons / Tonnes (1,000 kg)', category: 'Mass & Weight', icon: '⚖️' },
  { code: 'KG', name: 'Kilograms (kg)', category: 'Mass & Weight', icon: '⚖️' },
  { code: 'G', name: 'Grams (g)', category: 'Mass & Weight', icon: '⚖️' },
  { code: 'LBS', name: 'Pounds (lbs / Imperial)', category: 'Mass & Weight', icon: '⚖️' },
  { code: 'TON', name: 'Short Ton / US Ton (2,000 lbs)', category: 'Mass & Weight', icon: '⚖️' },
  { code: 'LT', name: 'Long Ton / UK Ton (2,240 lbs)', category: 'Mass & Weight', icon: '⚖️' },
  { code: 'QUINTAL', name: 'Metric Quintal (100 kg)', category: 'Mass & Weight', icon: '⚖️' },

  // Containers & Shipping Logistics
  { code: '20FT FCL', name: '20ft Full Container Load', category: 'Containers & Shipping', icon: '🚢' },
  { code: '40FT FCL', name: '40ft High Cube Container', category: 'Containers & Shipping', icon: '🚢' },
  { code: '40FT REEFER', name: '40ft Refrigerated Container', category: 'Containers & Shipping', icon: '❄️' },
  { code: 'TEU', name: 'Twenty-foot Equivalent Unit', category: 'Containers & Shipping', icon: '⚓' },
  { code: 'FEU', name: 'Forty-foot Equivalent Unit', category: 'Containers & Shipping', icon: '⚓' },

  // Packaging Units
  { code: 'PALLET', name: 'Standard Export Pallets (Euro/US)', category: 'Packaging Units', icon: '📦' },
  { code: 'BAGS', name: 'Bags (PP / Jute / Paper Bags)', category: 'Packaging Units', icon: '🛍️' },
  { code: 'JUMBO BAGS', name: 'FIBC Jumbo Bags (1 Tonne)', category: 'Packaging Units', icon: '📦' },
  { code: 'CARTONS', name: 'Export Master Cartons / Boxes', category: 'Packaging Units', icon: '📦' },
  { code: 'DRUMS', name: 'HDPE / Steel Drums & Barrels', category: 'Packaging Units', icon: '🛢️' },
  { code: 'BALES', name: 'Compressed Bales (Cotton & Textiles)', category: 'Packaging Units', icon: '🧵' },
  { code: 'CRATES', name: 'Wooden Export Crates', category: 'Packaging Units', icon: '🪵' },
  { code: 'ROLLS', name: 'Rolls (Fabric, Plastic & Paper)', category: 'Packaging Units', icon: '📜' },
  { code: 'SKIDS', name: 'Skids / Bundles (Steel & Timber)', category: 'Packaging Units', icon: '🪵' },

  // Volume & Liquids
  { code: 'LTR', name: 'Liters (L)', category: 'Volume & Liquid', icon: '🛢️' },
  { code: 'CBM', name: 'Cubic Meters (m³)', category: 'Volume & Liquid', icon: '📐' },
  { code: 'CFT', name: 'Cubic Feet (ft³)', category: 'Volume & Liquid', icon: '📐' },
  { code: 'GAL', name: 'US Gallons (gal)', category: 'Volume & Liquid', icon: '🛢️' },
  { code: 'IMP GAL', name: 'Imperial Gallons (UK gal)', category: 'Volume & Liquid', icon: '🛢️' },
  { code: 'KL', name: 'Kiloliters (1,000 L)', category: 'Volume & Liquid', icon: '🛢️' },
  { code: 'BBL', name: 'Barrels (Oil & Petroleum - 42 gal)', category: 'Volume & Liquid', icon: '🛢️' },

  // Pieces, Garments & Industrial
  { code: 'PCS', name: 'Pieces / Individual Units', category: 'Pieces & Industrial', icon: '🧩' },
  { code: 'SETS', name: 'Complete Sets (Machinery & Tools)', category: 'Pieces & Industrial', icon: '⚙️' },
  { code: 'UNITS', name: 'Industrial Machine Units', category: 'Pieces & Industrial', icon: '⚙️' },
  { code: 'LOT', name: 'Consignment / Project Lot', category: 'Pieces & Industrial', icon: '📦' },
  { code: 'NOS', name: 'Numbers (Nos)', category: 'Pieces & Industrial', icon: '🔢' },
  { code: 'PAIRS', name: 'Pairs (Footwear & Gloves)', category: 'Pieces & Industrial', icon: '👟' },
  { code: 'SUITS', name: 'Garment Suits / Readymade Sets', category: 'Pieces & Industrial', icon: '👕' },
  { code: 'DOZEN', name: 'Dozen (12 Pieces)', category: 'Pieces & Industrial', icon: '📦' },
  { code: 'GROSS', name: 'Gross (144 Pieces)', category: 'Pieces & Industrial', icon: '📦' },

  // Length & Area
  { code: 'MTR', name: 'Meters (m)', category: 'Length & Area', icon: '📏' },
  { code: 'YDS', name: 'Yards (Textile Yards)', category: 'Length & Area', icon: '🧵' },
  { code: 'FT', name: 'Feet (ft)', category: 'Length & Area', icon: '📏' },
  { code: 'SQM', name: 'Square Meters (m²)', category: 'Length & Area', icon: '📐' },
  { code: 'SQFT', name: 'Square Feet (ft²)', category: 'Length & Area', icon: '📐' }
];

export default function SearchableUnitSelect({ value, onChange, placeholder = 'Select Unit...' }) {
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

  const matchedObj = worldExportUnitsList.find(
    u => u.code.toLowerCase() === (value || '').toLowerCase() || (value || '').toLowerCase().includes(u.code.toLowerCase())
  );

  const displayLabel = value || 'MT (Metric Tons)';
  const currentIcon = matchedObj ? matchedObj.icon : '📦';

  const q = searchQuery.toLowerCase().trim();
  const filteredUnits = worldExportUnitsList.filter(u =>
    u.code.toLowerCase().includes(q) ||
    u.name.toLowerCase().includes(q) ||
    u.category.toLowerCase().includes(q)
  );

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={containerRef}>
      {/* Combobox Trigger Input Bar */}
      <div
        className="form-control searchable-unit-trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
          padding: '10px 14px',
          background: 'rgba(15, 23, 42, 0.7)',
          borderColor: isOpen ? 'var(--primary-teal-glow)' : 'var(--border-glass)',
          borderRadius: '8px'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '1.1rem' }}>{currentIcon}</span>
          <strong style={{ color: 'white' }}>{displayLabel}</strong>
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginLeft: '8px' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>

      {/* Interactive Searchable Dropdown Popup */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: '320px',
            zIndex: 3500,
            background: 'rgba(15, 23, 42, 0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--primary-teal-glow)',
            borderRadius: '14px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
            padding: '12px',
            maxHeight: '360px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {/* Live Filter Search Bar */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              autoFocus
              className="form-control"
              placeholder="🔍 Search Units (e.g., MT, KG, CBM, 20FT, Bags, PCS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                fontSize: '0.85rem',
                padding: '8px 12px 8px 34px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'white',
                borderRadius: '8px'
              }}
            />
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.7 }}>🔍</span>
          </div>

          {/* Unit List Options */}
          <div style={{ overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filteredUnits.length > 0 ? (
              filteredUnits.map(unit => {
                const isSelected = (value || '').toLowerCase() === unit.code.toLowerCase() || (value || '').toLowerCase() === unit.name.toLowerCase();

                return (
                  <div
                    key={unit.code}
                    onClick={() => {
                      onChange(unit.name);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(20, 184, 166, 0.25)' : 'transparent',
                      color: isSelected ? '#4ade80' : 'white',
                      border: isSelected ? '1px solid var(--primary-teal-glow)' : '1px solid transparent',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                      <span>{unit.icon}</span>
                      <div>
                        <strong>{unit.code}</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginLeft: '6px' }}>
                          ({unit.name})
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                      {unit.category}
                    </span>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-sub)', fontSize: '0.85rem' }}>
                <div>No standard matching unit found for "{searchQuery}"</div>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ marginTop: '8px', fontSize: '0.78rem', padding: '4px 10px' }}
                  onClick={() => {
                    onChange(searchQuery);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                >
                  ➕ Use custom unit "{searchQuery}"
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
