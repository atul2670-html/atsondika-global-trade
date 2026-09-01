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
  const [domesticCity, setDomesticCity] = useState('Surat, Gujarat');
  const [selectedIncoterm, setSelectedIncoterm] = useState('FOB');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerGstin, setBuyerGstin] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [billingAddress, setBillingAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!isRfqDrawerOpen) return null;

  const totalQuantity = rfqCartItems.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1), 0);

  // Total amount calculation for Local Trade
  const totalLocalAmount = rfqCartItems.reduce((acc, item) => {
    const price = item.localPrice || (item.priceInr ? parseFloat(item.priceInr) : 499);
    return acc + (price * (parseFloat(item.quantity) || 1));
  }, 0);

  const handleSendRfqWhatsApp = () => {
    if (rfqCartItems.length === 0) {
      alert('🛒 Your Cart is empty! Add products first.');
      return;
    }

    let msg = '';
    if (tradeMode === 'local') {
      msg = `🛍️ *LOCAL TRADE RETAIL ORDER (atsondika-global-trade)*\n`;
      msg += `---------------------------------------\n`;
      msg += `🏢 *Company:* ${activeCompany?.name || 'ADIDEV SMART SOLUTION'}\n`;
      msg += `👤 *Customer Name:* ${buyerName || 'Valued Buyer'}\n`;
      if (buyerPhone) msg += `📞 *Phone/WhatsApp:* ${buyerPhone}\n`;
      if (buyerEmail) msg += `✉️ *Email:* ${buyerEmail}\n`;
      if (buyerGstin) msg += `🏛️ *GSTIN:* ${buyerGstin}\n`;
      msg += `🏠 *Delivery Address:* ${deliveryAddress || 'Surat, Gujarat'}\n`;
      if (pincode) msg += `📮 *Pincode:* ${pincode}\n`;
      if (!sameAsBilling && billingAddress) {
        msg += `📑 *Billing Address:* ${billingAddress}\n`;
      } else {
        msg += `📑 *Billing Address:* Same as Delivery Address\n`;
      }
      msg += `---------------------------------------\n`;
      msg += `📦 *ORDERED ITEMS:* (${rfqCartItems.length} Products)\n`;
      rfqCartItems.forEach((item, index) => {
        const prodName = item.names?.[currentLang] || item.names?.en || item.name || 'Product Item';
        const itemPrice = item.localPrice || (item.priceInr ? parseFloat(item.priceInr) : 499);
        msg += `${index + 1}. *${prodName}*\n`;
        msg += `   - Quantity: ${item.quantity} ${item.unit || 'pcs'}\n`;
        msg += `   - Unit Price: ${convertPrice ? convertPrice(itemPrice) : '₹' + itemPrice}\n`;
      });
      msg += `---------------------------------------\n`;
      msg += `🚚 *Delivery Charge:* FREE Delivery\n`;
      msg += `💰 *Total Amount:* ${convertPrice ? convertPrice(totalLocalAmount) : '₹' + totalLocalAmount.toLocaleString()}\n`;
    } else {
      msg = rfqTradeCategory === 'export'
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
    }

    if (notes) {
      msg += `\n📝 *Delivery / Order Notes:* ${notes}\n`;
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
              <h4>{currentLang === 'gu' ? 'તમારું કાર્ટ ખાલી છે' : 'Your Cart is empty'}</h4>
              <p>{currentLang === 'gu' ? 'પ્રોડક્ટ્સ જુઓ અને કાર્ટમાં ઉમેરવા માટે "Add to cart" પર ક્લિક કરો.' : 'Browse our catalog and click "Add to cart" to purchase items.'}</p>
            </div>
          ) : (
            <>
              {/* TRADE SALE TYPE TOGGLE BAR (Only visible in B2B Global mode) */}
              {tradeMode !== 'local' && (
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
              )}

              {/* Product Items List */}
              <div className="rfq-cart-list">
                {rfqCartItems.map((item) => {
                  const name = item.names?.[currentLang] || item.names?.en || item.name || 'Product Item';
                  const itemPrice = item.localPrice || (item.priceInr ? parseFloat(item.priceInr) : 499);

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
                          {tradeMode !== 'local' && (
                            <span className="rfq-item-hscode">HS: {item.hsCode || '090931'}</span>
                          )}
                          <span className="rfq-item-price">
                            {tradeMode === 'local'
                              ? (convertPrice ? convertPrice(itemPrice) : '₹' + itemPrice)
                              : (item.priceUSD ? convertPrice(item.priceUSD) : 'On Request')}
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
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{item.unit || (tradeMode === 'local' ? 'pcs' : 'MT')}</span>
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

              {/* Customer & Address Form */}
              <div className="rfq-customer-form">
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: 'var(--accent-gold)' }}>
                  📋 {tradeMode === 'local'
                    ? (currentLang === 'gu' ? 'ડિલિવરી અને બિલિંગ એડ્રેસ વિગત:' : 'Delivery & Billing Address Details:')
                    : (rfqTradeCategory === 'export' ? 'Export Destination & Inquiry Details:' : 'Domestic India Delivery Details:')}
                </h4>

                {/* LOCAL TRADE ADDRESS FIELDS (Matching User Requirement) */}
                {tradeMode === 'local' ? (
                  <>
                    <div className="rfq-form-group">
                      <label style={{ fontWeight: 800, color: '#38bdf8' }}>
                        🚚 {currentLang === 'gu' ? 'ડિલિવરી એડ્રેસ (Delivery Shipping Address)' : 'Delivery Shipping Address'}
                      </label>
                      <textarea
                        className="rfq-textarea"
                        rows="2"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder={currentLang === 'gu' ? 'મકાન નં, સોસાયટી/બિલ્ડિંગ, રોડ, વિસ્તાર, શહેર' : 'Flat/Door No, Building, Street, Area, City/Town'}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div className="rfq-form-group">
                        <label>📮 {currentLang === 'gu' ? 'પિનકોડ (Pincode)' : 'Pincode'}</label>
                        <input
                          type="text"
                          className="rfq-input"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="e.g. 395006"
                        />
                      </div>

                      <div className="rfq-form-group">
                        <label>🏛️ {currentLang === 'gu' ? 'જીએસટી નં (GSTIN - Optional)' : 'GSTIN (Optional)'}</label>
                        <input
                          type="text"
                          className="rfq-input"
                          value={buyerGstin}
                          onChange={(e) => setBuyerGstin(e.target.value)}
                          placeholder="24AAAAA0000A1Z0"
                        />
                      </div>
                    </div>

                    {/* Same as Delivery Address Checkbox */}
                    <div style={{ margin: '8px 0 12px 0', background: 'rgba(255,255,255,0.04)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem', color: '#e2e8f0', margin: 0 }}>
                        <input
                          type="checkbox"
                          checked={sameAsBilling}
                          onChange={(e) => setSameAsBilling(e.target.checked)}
                          style={{ width: '16px', height: '16px', accentColor: '#10b981' }}
                        />
                        <span>🏛️ {currentLang === 'gu' ? 'બિલિંગ એડ્રેસ અને ડિલિવરી એડ્રેસ સરખું જ છે' : 'Billing Address is same as Delivery Address'}</span>
                      </label>

                      {!sameAsBilling && (
                        <div style={{ marginTop: '10px' }}>
                          <label style={{ fontSize: '0.8rem', color: '#facc15', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                            🏛️ {currentLang === 'gu' ? 'અલગ બિલિંગ એડ્રેસ લખો (GST Billing Address)' : 'Separate GST Billing Address'}
                          </label>
                          <textarea
                            className="rfq-textarea"
                            rows="2"
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                            placeholder={currentLang === 'gu' ? 'જીએસટી રજિસ્ટર્ડ બિઝનેસ બિલિંગ એડ્રેસ' : 'Registered Business Billing Address'}
                          />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  /* GLOBAL B2B EXPORT FIELDS */
                  <>
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
                  </>
                )}

                {/* Common Name, Phone, Email fields */}
                <div className="rfq-form-group">
                  <label>{currentLang === 'gu' ? 'તમારું નામ (Your Name)' : 'Your Name / Business Name'}</label>
                  <input
                    type="text"
                    className="rfq-input"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder={currentLang === 'gu' ? 'તમારું નામ લખો' : 'Enter your name'}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="rfq-form-group">
                    <label>{currentLang === 'gu' ? 'મોબાઈલ / વોટ્સએપ' : 'Phone / WhatsApp'}</label>
                    <input
                      type="text"
                      className="rfq-input"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+91 98765 ..."
                    />
                  </div>

                  <div className="rfq-form-group">
                    <label>{currentLang === 'gu' ? 'ઈમેલ (Email)' : 'Email Address'}</label>
                    <input
                      type="email"
                      className="rfq-input"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="buyer@example.com"
                    />
                  </div>
                </div>

                <div className="rfq-form-group">
                  <label>{currentLang === 'gu' ? 'ખાસ નોંધ / ઓર્ડર વિગત (Delivery Notes)' : 'Custom Delivery Instructions'}</label>
                  <textarea
                    className="rfq-textarea"
                    rows="2"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={currentLang === 'gu' ? 'ઓર્ડર સંબંધિત ખાસ સૂચનાઓ લખો...' : 'Special notes or delivery instructions...'}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {rfqCartItems.length > 0 && (
          <div className="rfq-drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
              <button
                className="btn-clear-cart"
                onClick={clearRfqCart}
              >
                {currentLang === 'gu' ? 'કાર્ટ રીસેટ કરો' : 'Clear Cart'}
              </button>

              <div style={{ textAlign: 'right' }}>
                {tradeMode === 'local' ? (
                  <>
                    <span style={{ fontSize: '0.78rem', color: '#4ade80', fontWeight: 700, display: 'block' }}>🚚 FREE Delivery</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#facc15' }}>
                      Total: {convertPrice ? convertPrice(totalLocalAmount) : '₹' + totalLocalAmount.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', display: 'block' }}>Estimated Container Load</span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-glow)' }}>
                      ~{Math.min(100, Math.round((totalQuantity / 24) * 100))}% of 20ft Container
                    </span>
                  </>
                )}
              </div>
            </div>

            <button
              className="btn-submit-rfq-whatsapp"
              onClick={handleSendRfqWhatsApp}
              style={{
                background: tradeMode === 'local' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : undefined
              }}
            >
              <span>📲</span> {tradeMode === 'local'
                ? (currentLang === 'gu' ? '🛍️ ઓર્ડર કન્ફર્મ કરો (Submit Order via WhatsApp)' : '🛍️ Complete Order via WhatsApp')
                : (currentLang === 'gu' ? '📲 વોટ્સએપ દ્વારા ક્વોટેશન મોકલો' : 'Submit Wholesale Order via WhatsApp')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
