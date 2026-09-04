import React, { useState, useEffect } from 'react';
import { worldCurrencies, fallbackRates } from '../utils/currencies.js';
import SearchableCurrencySelect from './SearchableCurrencySelect.jsx';
import SearchablePortInput from './SearchablePortInput.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function ContainerCalculator() {
  const {
    freightRoutesList, deleteFreightRoute,
    isAdminLoggedIn, verifyAdminAccess, setActiveModal, setEditingRouteId,
    currentLang
  } = useApp();

  const [activeTab, setActiveTab] = useState('container'); // 'container' | 'currency' | 'routes'
  const [originSearch, setOriginSearch] = useState('');
  const [destSearch, setDestSearch] = useState('');

  // Freight Calc State
  const [productType, setProductType] = useState('agro_rice');
  const [containerType, setContainerType] = useState('20ft');
  const [tonnage, setTonnage] = useState(20);

  // Currency Calc State
  const [amount, setAmount] = useState(10000);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('INR');
  const [fluctuationPct, setFluctuationPct] = useState(2); // Default 2% Forex Risk Buffer
  const [rates, setRates] = useState(fallbackRates);
  const [currencyDict, setCurrencyDict] = useState(worldCurrencies);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [transportMode, setTransportMode] = useState('all'); // 'all' | 'sea' | 'air'
  const [lastUpdated, setLastUpdated] = useState('Live Forex');

  // Fetch live exchange rates on mount for ALL world currencies with dual failover
  useEffect(() => {
    const primaryApi = 'https://open.er-api.com/v6/latest/USD';
    const secondaryApi = 'https://api.exchangerate-api.com/v4/latest/USD';

    const applyLiveRates = (data, sourceName) => {
      if (data && data.rates) {
        setRates(prev => ({ ...prev, ...data.rates }));
        const timeStr = data.time_last_update_utc
          ? new Date(data.time_last_update_utc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastUpdated(`✅ Verified Realtime Base Live Rate (${timeStr}) • ${sourceName}`);

        setCurrencyDict(prevDict => {
          const updated = { ...prevDict };
          Object.keys(data.rates).forEach(code => {
            if (!updated[code]) {
              updated[code] = {
                name: `${code} Currency`,
                symbol: code,
                flag: '🌐'
              };
            }
          });
          return updated;
        });
        return true;
      }
      return false;
    };

    fetch(primaryApi)
      .then(res => res.json())
      .then(data => {
        if (!applyLiveRates(data, 'Open Exchange API')) {
          fetch(secondaryApi)
            .then(res => res.json())
            .then(secData => applyLiveRates(secData, 'ExchangeRate API'));
        }
      })
      .catch(() => {
        fetch(secondaryApi)
          .then(res => res.json())
          .then(secData => applyLiveRates(secData, 'ExchangeRate API'))
          .catch(() => {
            setLastUpdated('Standard Commercial Rates (Offline Backup)');
          });
      });
  }, []);

  const productData = {
    agro_rice: { weight: 25, cbm: 0.04, label: '🌾 1121 Basmati Rice (25kg Bag)' },
    agro_turmeric: { weight: 50, cbm: 0.08, label: '🌿 Finger / Powder Turmeric (50kg Bag)' },
    agro_cumin: { weight: 25, cbm: 0.06, label: '🌱 Cumin Seeds Singapore Quality (25kg Bag)' },
    industrial_fasteners: { weight: 25, cbm: 0.02, label: '🔩 Stainless Bolts & Fasteners (25kg Carton)' },
    eco_bags: { weight: 10, cbm: 0.05, label: '🛍️ Eco Biodegradable Jute Bags (Bale Packing)' }
  };

  const containerData = {
    '20ft': { maxWeight: 26, maxCbm: 33, label: '🚢 20ft FCL Container (Max 26 MT / 33 CBM)' },
    '40ft': { maxWeight: 28, maxCbm: 67, label: '🚢 40ft High Cube Container (Max 28 MT / 67 CBM)' }
  };

  const curProd = productData[productType] || productData.agro_rice;
  const curCont = containerData[containerType] || containerData['20ft'];

  const bagsCount = Math.round((tonnage * 1000) / curProd.weight);
  const totalCbm = (bagsCount * curProd.cbm).toFixed(1);
  const percentFull = Math.min(100, Math.max(((tonnage / curCont.maxWeight) * 100), ((totalCbm / curCont.maxCbm) * 100))).toFixed(1);

  // Currency Converter Logic with Fluctuation Buffer
  const fromCurrCode = typeof fromCurr === 'object' && fromCurr ? (fromCurr.code || 'USD') : (fromCurr || 'USD');
  const toCurrCode = typeof toCurr === 'object' && toCurr ? (toCurr.code || 'INR') : (toCurr || 'INR');

  const getRawBaseConverted = () => {
    const rateFrom = rates[fromCurrCode] || 1;
    const rateTo = rates[toCurrCode] || 1;
    return (amount / rateFrom) * rateTo;
  };

  const getHedgedConverted = () => {
    const base = getRawBaseConverted();
    return base * (1 + fluctuationPct / 100);
  };

  const convertAmount = () => {
    return getHedgedConverted().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getRawBaseConvertedFormatted = () => {
    return getRawBaseConverted().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getBufferDifferenceFormatted = () => {
    const diff = getHedgedConverted() - getRawBaseConverted();
    const sign = diff >= 0 ? '+' : '';
    return sign + diff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getSingleRate = () => {
    const rateFrom = rates[fromCurrCode] || 1;
    const rateTo = rates[toCurrCode] || 1;
    const single = (1 / rateFrom) * rateTo;
    return single.toFixed(4);
  };

  const getAdjustedRate = () => {
    const single = parseFloat(getSingleRate());
    return (single * (1 + fluctuationPct / 100)).toFixed(4);
  };

  const swapCurrencies = () => {
    const temp = fromCurrCode;
    setFromCurr(toCurrCode);
    setToCurr(temp);
  };

  const sortedCurrencyCodes = Object.keys(currencyDict).sort();

  // Domestic India Truck Freight Calc State
  const [truckType, setTruckType] = useState('12_wheeler');
  const [domesticRoute, setDomesticRoute] = useState('surat_mumbai');

  const domesticTruckRoutes = {
    surat_mumbai: { name: 'Surat (GJ) ➔ Mumbai / Bhiwandi (MH)', dist: '280 km', time: '8 - 10 Hours', rate10: 22000, rate12: 28000, rate14: 36000, rate32ft: 34000 },
    surat_delhi: { name: 'Surat (GJ) ➔ Delhi NCR / Gurgaon / Faridabad', dist: '1,150 km', time: '36 - 42 Hours', rate10: 65000, rate12: 82000, rate14: 105000, rate32ft: 95000 },
    surat_blore: { name: 'Surat (GJ) ➔ Bengaluru / Electronic City (KA)', dist: '1,250 km', time: '40 - 48 Hours', rate10: 72000, rate12: 90000, rate14: 115000, rate32ft: 102000 },
    surat_ahmedabad: { name: 'Surat (GJ) ➔ Ahmedabad / Changodar (Local GJ)', dist: '260 km', time: '6 - 8 Hours', rate10: 18000, rate12: 23000, rate14: 30000, rate32ft: 28000 },
    surat_kolkata: { name: 'Surat (GJ) ➔ Kolkata / Dankuni (WB)', dist: '1,850 km', time: '60 - 72 Hours', rate10: 95000, rate12: 120000, rate14: 155000, rate32ft: 140000 },
    surat_hyderabad: { name: 'Surat (GJ) ➔ Hyderabad / Patancheru (TS)', dist: '980 km', time: '30 - 36 Hours', rate10: 54000, rate12: 68000, rate14: 86000, rate32ft: 78000 },
    surat_jaipur: { name: 'Surat (GJ) ➔ Jaipur / Vishwakarma (RJ)', dist: '860 km', time: '26 - 30 Hours', rate10: 48000, rate12: 60000, rate14: 76000, rate32ft: 70000 }
  };

  const getTruckEstFare = () => {
    const route = domesticTruckRoutes[domesticRoute] || domesticTruckRoutes.surat_mumbai;
    if (truckType === '10_wheeler') return route.rate10;
    if (truckType === '12_wheeler') return route.rate12;
    if (truckType === '14_wheeler') return route.rate14;
    return route.rate32ft;
  };

  return (
    <section className="section" id="calc">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">🧮 Global Export & Domestic India Trade Calculators</h2>
          <p className="section-subtitle">Real-time ocean container capacity, currency converter, and domestic Indian truck & road freight logistics estimator.</p>
        </div>

        {/* Tab Selection Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'container' ? 'active' : ''}`}
            onClick={() => setActiveTab('container')}
            style={{ padding: '12px 24px', fontSize: '0.92rem' }}
          >
            🚢 Container Freight Estimator
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'domestic_truck' ? 'active' : ''}`}
            onClick={() => setActiveTab('domestic_truck')}
            style={{ padding: '12px 24px', fontSize: '0.92rem', background: activeTab === 'domestic_truck' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : undefined }}
          >
            🚚 Domestic India Truck Freight (ભારતીય ટ્રાન્સપોર્ટ)
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'currency' ? 'active' : ''}`}
            onClick={() => setActiveTab('currency')}
            style={{ padding: '12px 24px', fontSize: '0.92rem' }}
          >
            💱 Online Currency Converter
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'routes' ? 'active' : ''}`}
            onClick={() => setActiveTab('routes')}
            style={{ padding: '12px 24px', fontSize: '0.92rem' }}
          >
            🌐 Freight Transit Routes (Sea & Air)
          </button>
        </div>

        {/* TAB 1: CONTAINER CALCULATOR */}
        {activeTab === 'container' && (
          <div className="glass-card calc-card">
            <div className="calc-grid">
              <div>
                <div className="form-group">
                  <label className="form-label">1. Select Commodity</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="form-control"
                  >
                    {Object.entries(productData).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">2. Select Container Type</label>
                  <select
                    value={containerType}
                    onChange={(e) => setContainerType(e.target.value)}
                    className="form-control"
                  >
                    {Object.entries(containerData).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">3. Desired Weight (Tonnage in MT)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={tonnage}
                    min="1"
                    max="100"
                    onChange={(e) => setTonnage(Number(e.target.value))}
                  />
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '26px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-teal-glow)', marginBottom: '16px' }}>
                  📊 Container Utilization Report
                </h4>
                
                <div style={{ fontSize: '0.92rem', marginBottom: '10px' }}>
                  <strong>Total Bag / Carton Count:</strong> <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{bagsCount} Units / Bags</span>
                </div>
                <div style={{ fontSize: '0.92rem', marginBottom: '10px' }}>
                  <strong>Total Volume:</strong> <span style={{ fontWeight: 800, color: 'var(--primary-teal-glow)' }}>{totalCbm} CBM</span>
                </div>
                <div style={{ fontSize: '0.92rem', marginBottom: '10px' }}>
                  <strong>Capacity Filled:</strong> <span style={{ fontWeight: 800, color: '#4ade80' }}>{percentFull}% Capacity Full</span>
                </div>

                <div className="utilization-bar-bg">
                  <div className="utilization-bar-fill" style={{ width: `${percentFull}%` }}></div>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '22px' }}
                  onClick={() => {
                    const rfqMsg = document.getElementById('rfqMsg');
                    if (rfqMsg) rfqMsg.value = `[Container Calculation Estimate]\nVolume: ${tonnage} MT (${bagsCount} Bags, ${totalCbm} CBM, ${percentFull}% Full)`;
                    const contactSec = document.getElementById('contact');
                    if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  📩 Request Quote for this Capacity
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DOMESTIC INDIA TRUCK & ROAD FREIGHT ESTIMATOR */}
        {activeTab === 'domestic_truck' && (
          <div className="glass-card calc-card">
            <div className="calc-grid">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
                  🚚 Domestic Indian Transport Freight Calculator (ભારતીય ટ્રાન્સપોર્ટ ભાડું)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '16px' }}>
                  Select transport truck category and domestic delivery route across Indian states to estimate B2B lorry freight charges.
                </p>

                <div className="form-group">
                  <label className="form-label">1. Select Truck / Lorry Type (ભારતીય ટ્રકના પ્રકાર)</label>
                  <select
                    value={truckType}
                    onChange={(e) => setTruckType(e.target.value)}
                    className="form-control"
                    style={{ fontWeight: 800 }}
                  >
                    <option value="10_wheeler">🚚 10 Wheeler Truck (16 - 18 Metric Tons Capacity)</option>
                    <option value="12_wheeler">🚛 12 Wheeler Heavy Duty Truck (21 - 25 Metric Tons Capacity)</option>
                    <option value="14_wheeler">🚛 14 Wheeler Multi-Axle Truck (30 - 32 Metric Tons Capacity)</option>
                    <option value="32ft_mxl">📦 32ft MXL Container Truck (14 - 15 Tons High Volume)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">2. Select Interstate / Local Delivery Route (રૂટ સિલેક્શન)</label>
                  <select
                    value={domesticRoute}
                    onChange={(e) => setDomesticRoute(e.target.value)}
                    className="form-control"
                    style={{ fontWeight: 800 }}
                  >
                    {Object.entries(domesticTruckRoutes).map(([key, val]) => (
                      <option key={key} value={key}>{val.name} ({val.dist})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Truck Result Box */}
              <div style={{ background: 'rgba(2, 132, 199, 0.08)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8', marginBottom: '16px' }}>
                  📊 Domestic Lorry Freight Summary
                </h4>
                
                <div style={{ fontSize: '0.92rem', marginBottom: '10px' }}>
                  <strong>Selected Route:</strong> <span style={{ fontWeight: 800, color: 'white' }}>{(domesticTruckRoutes[domesticRoute] || {}).name}</span>
                </div>
                <div style={{ fontSize: '0.92rem', marginBottom: '10px' }}>
                  <strong>Estimated Road Distance:</strong> <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{(domesticTruckRoutes[domesticRoute] || {}).dist}</span>
                </div>
                <div style={{ fontSize: '0.92rem', marginBottom: '10px' }}>
                  <strong>Estimated Transit Time:</strong> <span style={{ fontWeight: 800, color: '#4ade80' }}>{(domesticTruckRoutes[domesticRoute] || {}).time}</span>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)', marginTop: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', display: 'block' }}>ESTIMATED TRUCK FREIGHT (INR ₹):</span>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#38bdf8', margin: '4px 0' }}>
                    ₹ {getTruckEstFare().toLocaleString()}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>* Includes Fuel Surcharge & Driver Allowance. Toll Taxes Extra.</span>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '20px', background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}
                  onClick={() => {
                    const rfqMsg = document.getElementById('rfqMsg');
                    const rName = (domesticTruckRoutes[domesticRoute] || {}).name;
                    if (rfqMsg) rfqMsg.value = `[Domestic Truck Booking Inquiry]\nRoute: ${rName}\nTruck Type: ${truckType}\nEst. Rate: ₹${getTruckEstFare().toLocaleString()}`;
                    const contactSec = document.getElementById('contact');
                    if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  🚚 Book Truck / Request Domestic Transport Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ONLINE CURRENCY CONVERTER WITH FLUCTUATION PERCENTAGE BUFFER */}
        {activeTab === 'currency' && (
          <div className="glass-card calc-card">
            <div className="calc-grid">
              <div>
                <div className="form-group">
                  <label className="form-label">Trade Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    min="1"
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>

                <div className="form-row" style={{ alignItems: 'flex-end' }}>
                  <SearchableCurrencySelect
                    label="From Currency (Type or Select)"
                    value={fromCurrCode}
                    onChange={(selected) => setFromCurr(typeof selected === 'object' && selected ? (selected.code || 'USD') : (selected || 'USD'))}
                    currencyDict={currencyDict}
                  />

                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
                    <button
                      type="button"
                      onClick={swapCurrencies}
                      className="theme-btn"
                      style={{ width: '42px', height: '42px', fontSize: '1.2rem' }}
                      title="Swap Currencies"
                    >
                      ⇄
                    </button>
                  </div>

                  <SearchableCurrencySelect
                    label="To Currency (Type or Select)"
                    value={toCurrCode}
                    onChange={(selected) => setToCurr(typeof selected === 'object' && selected ? (selected.code || 'INR') : (selected || 'INR'))}
                    currencyDict={currencyDict}
                  />
                </div>

                {/* Currency Fluctuation Percentage (%) Control Dropdown */}
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800 }}>
                    <span>📈 Forex Risk / Fluctuation Buffer (%)</span>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>{fluctuationPct > 0 ? `+${fluctuationPct}%` : `${fluctuationPct}%`} Buffer Applied</span>
                  </label>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <select
                      className="form-control"
                      value={fluctuationPct}
                      onChange={(e) => setFluctuationPct(Number(e.target.value))}
                      style={{
                        flex: 1,
                        minWidth: '220px',
                        padding: '10px 14px',
                        fontSize: '0.88rem',
                        fontWeight: 800,
                        background: 'rgba(15, 23, 42, 0.95)',
                        color: '#2dd4bf',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer'
                      }}
                    >
                      <option value={0}>0% - Exact Spot Exchange Rate (0% Buffer)</option>
                      <option value={0.5}>+0.5% - Low FX Risk Buffer (+0.5%)</option>
                      <option value={1}>+1.0% - Standard Commercial Buffer (+1.0%)</option>
                      <option value={1.5}>+1.5% - Moderate Volatility Hedge (+1.5%)</option>
                      <option value={2}>+2.0% - Default Export Risk Hedge (+2.0%)</option>
                      <option value={2.5}>+2.5% - High Volatility Protection (+2.5%)</option>
                      <option value={3}>+3.0% - Extended Delivery Buffer (+3.0%)</option>
                      <option value={4}>+4.0% - Emerging Market Hedge (+4.0%)</option>
                      <option value={5}>+5.0% - Maximum Risk Protection (+5.0%)</option>
                      <option value={7.5}>+7.5% - Long-Term Contract Buffer (+7.5%)</option>
                      <option value={10}>+10.0% - High Volatility Hedge (+10.0%)</option>
                    </select>

                    {/* Quick Preset Pills */}
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {[0, 1, 2, 3, 5].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setFluctuationPct(pct)}
                          className={`tab-btn ${fluctuationPct === pct ? 'active' : ''}`}
                          style={{ padding: '6px 10px', fontSize: '0.76rem', fontWeight: 800 }}
                        >
                          {pct === 0 ? '0% Exact' : `+${pct}%`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.84rem',
                  color: '#4ade80',
                  fontWeight: 800,
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <span>⚡ {currentLang === 'gu' ? `રિયલટાઈમ Base Live Rate (${sortedCurrencyCodes.length} ચલણ લાઈવ)` : `Realtime Base Live Rate (${sortedCurrencyCodes.length} World Currencies)`}</span>
                  <span style={{ fontSize: '0.78rem', color: '#6ee7b7' }}>{lastUpdated}</span>
                </div>
              </div>

              {/* Conversion Result Display with Fluctuation Analysis */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '26px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', textAlignment: 'center' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  {currentLang === 'gu' ? `હેજ્ડ કેલ્ક્યુલેશન મૂલ્યાંકન (${fluctuationPct > 0 ? `+${fluctuationPct}% રિસ્ક બફર` : `${fluctuationPct}% બફર`})` : `Hedged Valuation (${fluctuationPct > 0 ? `+${fluctuationPct}% Risk Buffer` : `${fluctuationPct}% Buffer`})`}
                </div>

                {/* Hedged Main Converted Amount */}
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--primary-teal-glow)', margin: '10px 0 4px 0' }}>
                  {currencyDict[toCurrCode]?.symbol || ''} {convertAmount()} <span style={{ fontSize: '1.1rem', color: 'white' }}>{toCurrCode}</span>
                </div>

                {/* Fluctuation Breakdown Box */}
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border-glass)', margin: '14px 0', fontSize: '0.86rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-sub)' }}>
                      🌐 {currentLang === 'gu' ? 'મુખ્ય રિયલટાઈમ Base Live Rate (0% બફર):' : 'Realtime Base Live Rate (0% Spot):'}
                    </span>
                    <strong style={{ color: '#38bdf8' }}>
                      1 {fromCurrCode} = {getSingleRate()} {toCurrCode}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-sub)' }}>
                      💰 {currentLang === 'gu' ? 'મૂળ રિયલટાઈમ મૂલ્ય (0% બફર):' : 'Base Raw Amount (0% Buffer):'}
                    </span>
                    <strong>{currencyDict[toCurrCode]?.symbol || ''} {getRawBaseConvertedFormatted()} {toCurrCode}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-sub)' }}>
                      📈 {currentLang === 'gu' ? 'બફર સાથેનો દરો (Hedged Rate):' : 'Hedged Forex Rate:'}
                    </span>
                    <span>1 {fromCurrCode} = <strong style={{ color: 'var(--accent-gold)' }}>{getAdjustedRate()} {toCurrCode}</strong></span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px dashed var(--border-glass)' }}>
                    <span style={{ color: 'var(--text-sub)' }}>
                      🛡️ {currentLang === 'gu' ? 'ફોરેક્સ રિસ્ક બફર ઈમ્પેક્ટ:' : 'Forex Risk Buffer Impact:'}
                    </span>
                    <strong style={{ color: fluctuationPct >= 0 ? '#4ade80' : '#f87171' }}>
                      {getBufferDifferenceFormatted()} {toCurrCode}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    const rfqMsg = document.getElementById('rfqMsg');
                    if (rfqMsg) {
                      rfqMsg.value = `[Hedged Currency Valuation]\nBudget: ${amount} ${fromCurrCode} = ${convertAmount()} ${toCurrCode}\n(Realtime Base Live Rate: 1 ${fromCurrCode} = ${getSingleRate()} ${toCurrCode} | Raw Base: ${getRawBaseConvertedFormatted()} ${toCurrCode} | Forex Buffer: ${fluctuationPct}% | Impact: ${getBufferDifferenceFormatted()} ${toCurrCode})`;
                    }
                    const contactSec = document.getElementById('contact');
                    if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  📩 {currentLang === 'gu' ? 'હેજ્ડ મૂલ્યાંકન સાથે RFQ મોકલો' : 'Send RFQ with Hedged Valuation'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FREIGHT TRANSIT & ROUTE ESTIMATOR (SEA & AIR CARGO) */}
        {activeTab === 'routes' && (
          <div className="glass-card calc-card">
            {/* Mode & Region Filters Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-teal-glow)', margin: 0 }}>
                  🌐 Global Freight Transit Lead-Times (Sea Vessels & Air Cargo)
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', margin: '4px 0 0 0' }}>
                  Transit times from Indian Hub Ports (Mundra, Hazira/Surat, Nhava Sheva) and International Airports (Surat STV, AMD, BOM, DEL) to global destinations.
                </p>
              </div>

              {/* Transport Mode Switcher Chips & Admin Add Button */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setTransportMode('all')}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-glass)',
                    background: transportMode === 'all' ? 'linear-gradient(135deg, #0d9488, #14b8a6)' : 'rgba(255,255,255,0.05)',
                    color: transportMode === 'all' ? 'white' : 'var(--text-sub)',
                    cursor: 'pointer'
                  }}
                >
                  🌐 All Modes (Sea & Air)
                </button>
                <button
                  type="button"
                  onClick={() => setTransportMode('sea')}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-glass)',
                    background: transportMode === 'sea' ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'rgba(255,255,255,0.05)',
                    color: transportMode === 'sea' ? 'white' : 'var(--text-sub)',
                    cursor: 'pointer'
                  }}
                >
                  🚢 Sea Freight Vessels
                </button>
                <button
                  type="button"
                  onClick={() => setTransportMode('air')}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-glass)',
                    background: transportMode === 'air' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'rgba(255,255,255,0.05)',
                    color: transportMode === 'air' ? '#0f172a' : 'var(--text-sub)',
                    cursor: 'pointer'
                  }}
                >
                  ✈️ Air Cargo Express
                </button>

                {/* Admin Add Freight Route Record Button */}
                <button
                  type="button"
                  onClick={() => {
                    verifyAdminAccess(() => {
                      setEditingRouteId(null);
                      setActiveModal('freight_route');
                    });
                  }}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  ➕ Add Freight Route Record
                </button>
              </div>
            </div>

            {/* DEDICATED SEARCHABLE AUTOCOMPLETE ORIGIN & DESTINATION INPUT FIELDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
              <SearchablePortInput
                label="🔍 Search Origin Port / Airport (India):"
                value={originSearch}
                onChange={(val) => setOriginSearch(val)}
                placeholder="Type Indian port name (e.g. Surat STV, Mundra, Hazira, BOM)..."
                portType="origin"
                quickPresets={[
                  { label: '⚓ Hazira/Surat', value: 'Hazira / Surat Port (INHZA)' },
                  { label: '🛫 Surat STV', value: 'Surat International Airport (STV)' },
                  { label: '⚓ Mundra', value: 'Mundra Port (INMUN)' },
                  { label: '⚓ Nhava Sheva', value: 'Nhava Sheva / JNPT (INNSA)' }
                ]}
              />

              <SearchablePortInput
                label="🔍 Search Destination Port / Airport (Global):"
                value={destSearch}
                onChange={(val) => setDestSearch(val)}
                placeholder="Type global port/country (e.g. Canada, Dubai, Rotterdam, JFK)..."
                portType="dest"
                quickPresets={[
                  { label: '🇨🇦 Canada', value: 'Canada' },
                  { label: '🇦🇪 Dubai', value: 'Dubai' },
                  { label: '🇳🇱 Rotterdam', value: 'Rotterdam' },
                  { label: '🇬🇧 London', value: 'London' },
                  { label: '🇺🇸 New York', value: 'New York' }
                ]}
              />
            </div>

            {/* Sub-Header Region Filter Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px dashed var(--border-glass)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Filter Region:</span>
              {['All', 'Middle East', 'Europe', 'USA / North America', 'Southeast Asia', 'Africa'].map(reg => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegion(reg)}
                  style={{
                    fontSize: '0.78rem',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-glass)',
                    background: selectedRegion === reg ? 'var(--primary-teal)' : 'rgba(255,255,255,0.04)',
                    color: selectedRegion === reg ? 'white' : 'var(--text-sub)',
                    cursor: 'pointer'
                  }}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* Combined Sea & Air Cargo Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-glass)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px', color: 'var(--primary-teal-glow)' }}>Transport Mode</th>
                    <th style={{ padding: '12px 14px', color: 'white' }}>Origin Port / Airport (India)</th>
                    <th style={{ padding: '12px 14px', color: 'var(--accent-gold)' }}>Destination Port / Airport</th>
                    <th style={{ padding: '12px 14px', color: 'white' }}>Region</th>
                    <th style={{ padding: '12px 14px', color: '#4ade80' }}>Transit Lead-Time</th>
                    <th style={{ padding: '12px 14px', color: 'var(--text-sub)' }}>Sailing / Flight Frequency</th>
                    {isAdminLoggedIn && <th style={{ padding: '12px 14px', color: '#f59e0b' }}>Admin Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const filtered = (freightRoutesList || []).filter(item => {
                      // Mode filter
                      if (transportMode === 'sea' && item.mode !== 'Sea Freight') return false;
                      if (transportMode === 'air' && item.mode !== 'Air Cargo') return false;

                      // Region filter
                      if (selectedRegion !== 'All' && item.region !== selectedRegion) return false;

                      // Search Origin Port / Airport
                      if (originSearch.trim()) {
                        const q = originSearch.trim().toLowerCase();
                        const keywords = q.split(/[\s,()\/]+/).filter(k => k.length > 1);
                        const originText = (item.origin || '').toLowerCase();
                        const match = keywords.some(kw => originText.includes(kw));
                        if (!match) return false;
                      }

                      // Search Destination Port / Airport (Matches country, city, port name, or region)
                      if (destSearch.trim()) {
                        const q = destSearch.trim().toLowerCase();
                        const keywords = q.split(/[\s,()\/]+/).filter(k => k.length > 1);
                        const destText = (item.dest || '').toLowerCase();
                        const regionText = (item.region || '').toLowerCase();
                        const modeText = (item.mode || '').toLowerCase();

                        const match = keywords.some(kw => destText.includes(kw) || regionText.includes(kw) || modeText.includes(kw));
                        if (!match) return false;
                      }

                      return true;
                    });

                    if (filtered.length === 0) {
                      return (
                        <tr>
                          <td colSpan={isAdminLoggedIn ? "7" : "6"} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-sub)' }}>
                            🔍 No freight routes found matching your search filter criteria.
                          </td>
                        </tr>
                      );
                    }

                    return filtered.map((item, idx) => {
                      const isAir = item.mode === 'Air Cargo';
                      return (
                        <tr key={item.id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '10px 14px' }}>
                            <span style={{
                              display: 'inline-block',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              padding: '3px 8px',
                              borderRadius: '12px',
                              background: isAir ? 'rgba(245, 158, 11, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                              color: isAir ? '#f59e0b' : '#38bdf8',
                              border: isAir ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(56, 189, 248, 0.3)'
                            }}>
                              {isAir ? '✈️ Air Cargo' : '🚢 Sea Freight'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 14px', fontWeight: 700 }}>
                            {isAir ? '🛫 ' : '⚓ '}{item.origin}
                          </td>
                          <td style={{ padding: '10px 14px', fontWeight: 800, color: 'white' }}>
                            {isAir ? '🛬 ' : '🏢 '}{item.dest}
                          </td>
                          <td style={{ padding: '10px 14px', color: 'var(--text-sub)' }}>{item.region}</td>
                          <td style={{ padding: '10px 14px', fontWeight: 800, color: '#4ade80' }}>⏱️ {item.days}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--text-sub)' }}>
                            {isAir ? '✈️ ' : '🚢 '}{item.freq}
                          </td>
                          {isAdminLoggedIn && (
                            <td style={{ padding: '10px 14px' }}>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                  type="button"
                                  className="btn-secondary"
                                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                  onClick={() => {
                                    setEditingRouteId(item.id);
                                    setActiveModal('freight_route');
                                  }}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn-secondary"
                                  style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                                  onClick={() => deleteFreightRoute(item.id, `${item.origin} ➔ ${item.dest}`)}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(20, 184, 166, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(45, 212, 191, 0.2)', fontSize: '0.82rem', color: 'var(--text-sub)' }}>
              💡 <strong>Freight Options Info:</strong> Sea Freight lead times indicate direct ocean port-to-port vessel days (ideal for bulk MT containers & heavy machinery). Air Cargo Express lead times represent direct flight hours from Surat/BOM/DEL airports (ideal for urgent agro spices, high-value samples, & perishable goods).
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
