import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function RfqCartDrawer() {
  const {
    isRfqDrawerOpen,
    setIsRfqDrawerOpen,
    rfqCartItems,
    removeFromRfqCart,
    updateRfqCartQuantity,
    clearRfqCart,
    convertPrice,
    currentCurrency,
    currentLang,
    activeCompany,
    tradeMode
  } = useApp();

  const [rfqTradeCategory, setRfqTradeCategory] = useState('export'); // 'export' | 'domestic'
  const [destinationPort, setDestinationPort] = useState('Jebel Ali, UAE');
  const [domesticCity, setDomesticCity] = useState('Mumbai, Maharashtra');
  const [selectedIncoterm, setSelectedIncoterm] = useState('FOB');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerGstin, setBuyerGstin] = useState('');
  const [notes, setNotes] = useState('');

  if (!isRfqDrawerOpen) return null;

  const totalQuantity = rfqCartItems.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1), 0);

  const handleSendRfqWhatsApp = () => {
    if (rfqCartItems.length === 0) {
      alert('🛒 Your Quote Cart is empty! Add products first.');
      return;
    }

    let msg = rfqTradeCategory === 'export'
      ? `🌐 *OFFICIAL EXPORT RFQ / QUOTE REQUEST*\n`
      : `🇮🇳 *OFFICIAL INDIAN DOMESTIC SALE RFQ (B2B)*\n`;
    msg += `---------------------------------------\n`;
    msg += `🏢 *Company / Supplier:* ${activeCompany?.name || 'ADIDEV SMART SOLUTION'}\n`;
    msg += `👤 *Buyer Name:* ${buyerName || 'Valued Client'}\n`;
    if (buyerGstin) msg += `🏛️ *Buyer GSTIN:* ${buyerGstin}\n`;
    if (buyerPhone) msg += `📞 *Phone:* ${buyerPhone}\n`;
    if (buyerEmail) msg += `✉️ *Email:* ${buyerEmail}\n`;
    if (rfqTradeCategory === 'export') {
      msg += `⚓ *Destination Port:* ${destinationPort}\n`;
      msg += `📄 *Preferred Terms:* ${selectedIncoterm}\n`;
      msg += `💱 *Currency:* ${currentCurrency.code} (${currentCurrency.symbol})\n\n`;
    } else {
      msg += `🚚 *Delivery Destination State/City:* ${domesticCity}\n`;
      msg += `💱 *Currency:* INR (₹ - Indian Rupee)\n\n`;
    }
    msg += `📦 *ITEMS FOR QUOTATION:* (${rfqCartItems.length} Products, ~${totalQuantity} Units/MT)\n`;

    rfqCartItems.forEach((item, index) => {
      const prodName = item.names?.[currentLang] || item.names?.en || item.name || 'Agro Item';
      const formattedPrice = item.priceUSD ? convertPrice(item.priceUSD) : 'On Request';
      msg += `\n${index + 1}. *${prodName}*\n`;
      msg += `   - Quantity: ${item.quantity} ${item.unit || 'MT'}\n`;
      msg += `   - Est. Price: ${formattedPrice}\n`;
      if (rfqTradeCategory === 'export') {
        msg += `   - Incoterms: ${item.incoterm || selectedIncoterm}\n`;
      }
    });

    if (notes) {
      msg += `\n📝 *Additional Notes:* ${notes}\n`;
    }

    msg += `\n---------------------------------------\n`;
    msg += `⚡ *Sent via Realtime Amazon-Style Trade Portal*`;

    const encoded = encodeURIComponent(msg);
    const phone = (activeCompany?.phone || '+917861997755').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="rfq-drawer-overlay" onClick={() => setIsRfqDrawerOpen(false)}>
      <div className="rfq-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="rfq-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.8rem' }}>🛒</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {tradeMode === 'local'
                  ? (currentLang === 'gu' ? '🛍️ લોકલ ટ્રેડ શોપિંગ કાર્ટ (Local Cart)' : '🛍️ Local Trade Shopping Cart')
                  : (rfqTradeCategory === 'export' ? 'Export Quote Cart (RFQ)' : 'Domestic India Sale Quote Cart')}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                {rfqCartItems.length} {currentLang === 'gu' ? 'પ્રોડક્ટ્સ કાર્ટમાં ઉમેરેલ છે' : 'Products in Cart'}
              </span>
            </div>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsRfqDrawerOpen(false)}
            aria-label="Close Drawer"
          >
            ✕
          </button>
        </div>

        {/* Drawer Body */}
        <div className="rfq-drawer-body">
          {rfqCartItems.length === 0 ? (
            <div className="empty-cart-view">
              <span style={{ fontSize: '3rem', opacity: 0.5 }}>📦</span>
              <h4>Your Quote Cart is empty</h4>
              <p>Browse our catalog and click "Add to Quote" to build your wholesale order RFQ.</p>
            </div>
          ) : (
            <>
              {/* TRADE SALE TYPE TOGGLE BAR */}
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '4px', borderRadius: '12px', display: 'flex', gap: '6px', marginBottom: '14px', border: '1px solid var(--border-glass)' }}>
                <button
                  type="button"
                  onClick={() => setRfqTradeCategory('export')}
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: rfqTradeCategory === 'export' ? 'var(--primary-teal)' : 'transparent',
                    color: rfqTradeCategory === 'export' ? 'white' : 'var(--text-sub)'
                  }}
                >
                  🌐 Export Trade (Global)
                </button>
                <button
                  type="button"
                  onClick={() => setRfqTradeCategory('domestic')}
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: rfqTradeCategory === 'domestic' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'transparent',
                    color: rfqTradeCategory === 'domestic' ? 'white' : 'var(--text-sub)'
                  }}
                >
                  🇮🇳 Domestic India Sale (₹)
                </button>
              </div>

              {/* Product Items List */}
              <div className="rfq-cart-list">
                {rfqCartItems.map((item) => {
                  const name = item.names?.[currentLang] || item.names?.en || item.name || 'Agro Item';
                  return (
                    <div key={item.id} className="rfq-cart-item">
                      <img
                        src={item.image || 'images/agro_spices_grains.png'}
                        alt={name}
                        className="rfq-item-img"
                        onError={(e) => { e.target.src = 'images/agro_spices_grains.png'; }}
                      />
                      <div className="rfq-item-info">
                        <h5 className="rfq-item-title">{name}</h5>
                        <div className="rfq-item-meta">
                          <span className="rfq-item-hscode">HS: {item.hsCode || '090931'}</span>
                          <span className="rfq-item-price">
                            {item.priceUSD ? convertPrice(item.priceUSD) : 'On Request'}
                          </span>
                        </div>

                        {/* Quantity & Unit Controls */}
                        <div className="rfq-item-qty-row">
                          <div className="qty-picker">
                            <button
                              type="button"
                              onClick={() => updateRfqCartQuantity(item.id, item.incoterm, Math.max(1, (parseFloat(item.quantity) || 1) - 1))}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateRfqCartQuantity(item.id, item.incoterm, Math.max(1, parseFloat(e.target.value) || 1))}
                            />
                            <button
                              type="button"
                              onClick={() => updateRfqCartQuantity(item.id, item.incoterm, (parseFloat(item.quantity) || 1) + 1)}
                            >
                              +
                            </button>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{item.unit || 'MT'}</span>
                          <button
                            type="button"
                            className="remove-item-btn"
                            onClick={() => removeFromRfqCart(item.id, item.incoterm)}
                            title="Remove from Cart"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inquiry Customer & Shipment Form */}
              <div className="rfq-customer-form">
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: 'var(--accent-gold)' }}>
                  📋 {rfqTradeCategory === 'export' ? 'Export Destination & Inquiry Details:' : 'Domestic India Delivery Details:'}
                </h4>

                {rfqTradeCategory === 'export' ? (
                  <div className="rfq-form-group">
                    <label>Destination Sea/Air Port</label>
                    <input
                      type="text"
                      className="rfq-input"
                      value={destinationPort}
                      onChange={(e) => setDestinationPort(e.target.value)}
                      placeholder="e.g. Jebel Ali (Dubai), Rotterdam, Hamburg"
                    />
                  </div>
                ) : (
                  <div className="rfq-form-group">
                    <label>Delivery Destination State & City (India)</label>
                    <input
                      type="text"
                      className="rfq-input"
                      value={domesticCity}
                      onChange={(e) => setDomesticCity(e.target.value)}
                      placeholder="e.g. Mumbai, Maharashtra / Delhi / Ahmedabad"
                    />
                  </div>
                )}

                {rfqTradeCategory === 'export' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="rfq-form-group">
                      <label>Incoterms</label>
                      <select
                        className="rfq-select"
                        value={selectedIncoterm}
                        onChange={(e) => setSelectedIncoterm(e.target.value)}
                      >
                        <option value="FOB">FOB (Free on Board)</option>
                        <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                        <option value="EXW">EXW (Ex-Works)</option>
                        <option value="CFR">CFR / CNF (Cost & Freight)</option>
                        <option value="FCA">FCA (Free Carrier)</option>
                        <option value="DDP">DDP (Delivered Duty Paid)</option>
                        <option value="DAP">DAP (Delivered at Place)</option>
                        <option value="FAS">FAS (Free Alongside Ship)</option>
                        <option value="CPT">CPT (Carriage Paid To)</option>
                        <option value="CIP">CIP (Carriage & Insurance Paid)</option>
                        <option value="DPU">DPU (Delivered at Place Unloaded)</option>
                      </select>
                    </div>

                    <div className="rfq-form-group">
                      <label>Currency</label>
                      <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
                        {currentCurrency.flag} {currentCurrency.code} ({currentCurrency.symbol})
                      </div>
                    </div>
                  </div>
                )}

                <div className="rfq-form-group">
                  <label>Your Name / Buyer Business Name</label>
                  <input
                    type="text"
                    className="rfq-input"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Enter your name or business name"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="rfq-form-group">
                    <label>Phone / WhatsApp</label>
                    <input
                      type="text"
                      className="rfq-input"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+91 98765 ..."
                    />
                  </div>

                  <div className="rfq-form-group">
                    <label>{rfqTradeCategory === 'domestic' ? 'GSTIN (Optional)' : 'Email Address'}</label>
                    {rfqTradeCategory === 'domestic' ? (
                      <input
                        type="text"
                        className="rfq-input"
                        value={buyerGstin}
                        onChange={(e) => setBuyerGstin(e.target.value)}
                        placeholder="24AAAAA0000A1Z0"
                      />
                    ) : (
                      <input
                        type="email"
                        className="rfq-input"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="importer@company.com"
                      />
                    )}
                  </div>
                </div>

                <div className="rfq-form-group">
                  <label>Custom Packing & Delivery Instructions</label>
                  <textarea
                    className="rfq-textarea"
                    rows="2"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify bag sizes (25kg/50kg), Truck transport requirements, test certificates, etc."
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {rfqCartItems.length > 0 && (
          <div className="rfq-drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <button
                className="btn-clear-cart"
                onClick={clearRfqCart}
              >
                Clear Cart
              </button>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', display: 'block' }}>Estimated Container Load</span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-glow)' }}>
                  ~{Math.min(100, Math.round((totalQuantity / 24) * 100))}% of 20ft Container
                </span>
              </div>
            </div>

            <button
              className="btn-submit-rfq-whatsapp"
              onClick={handleSendRfqWhatsApp}
            >
              <span>📲</span> Submit Wholesale Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
