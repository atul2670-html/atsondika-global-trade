import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SearchableCurrencySelect from './SearchableCurrencySelect';

export default function RfqCartDrawer() {
  const {
    isRfqDrawerOpen,
    setIsRfqDrawerOpen,
    rfqCartItems,
    removeFromRfqCart,
    updateRfqCartQuantity,
    updateRfqCartUnit,
    clearRfqCart,
    convertPrice,
    currentCurrency,
    setCurrentCurrency,
    currenciesList,
    currentLang,
    activeCompany,
    tradeMode,
    showLiveToast,
    paymentGatewaysConfig
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

  // Payment Checkout System States
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'bank' | 'cod'
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [upiUtxRef, setUpiUtxRef] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [paymentStep, setPaymentStep] = useState('pay'); // 'pay' | 'otp' | 'success'
  const [completedOrderReceipt, setCompletedOrderReceipt] = useState(null);

  if (!isRfqDrawerOpen) return null;

  const totalQuantity = rfqCartItems.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1), 0);

  // Total amount calculation for Local Trade
  const totalLocalAmount = rfqCartItems.reduce((acc, item) => {
    const price = item.localPrice || (item.priceInr ? parseFloat(item.priceInr) : 499);
    return acc + (price * (parseFloat(item.quantity) || 1));
  }, 0);

  // Trigger Payment Modal for Local Trade
  const handleInitiatePayment = () => {
    if (rfqCartItems.length === 0) {
      alert(currentLang === 'gu' ? '🛒 તમારું કાર્ટ ખાલી છે!' : '🛒 Your Cart is empty!');
      return;
    }
    if (!deliveryAddress || deliveryAddress.trim().length < 5) {
      alert(currentLang === 'gu' ? '⚠️ કૃપા કરીને તમારું સંપૂર્ણ ડિલિવરી એડ્રેસ લખો.' : '⚠️ Please enter your complete delivery shipping address.');
      return;
    }
    if (!buyerPhone || buyerPhone.trim().length < 8) {
      alert(currentLang === 'gu' ? '⚠️ કૃપા કરીને તમારો મોબાઈલ / વોટ્સએપ નંબર લખો.' : '⚠️ Please enter your phone/WhatsApp number.');
      return;
    }

    setPaymentStep('pay');
    setShowCheckoutModal(true);
  };

  // Execute Final Successful Payment & Process Order
  const handleCompletePaymentSuccess = () => {
    const orderId = `ORD-LOCAL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderDate = new Date().toLocaleString();

    const orderData = {
      orderId,
      orderDate,
      company: activeCompany?.name || 'ATS-ONDIKA GLOBAL TRADE',
      customerName: buyerName || 'Valued Customer',
      phone: buyerPhone,
      email: buyerEmail,
      gstin: buyerGstin,
      deliveryAddress,
      pincode,
      billingAddress: sameAsBilling ? deliveryAddress : billingAddress,
      paymentMethod: paymentMethod.toUpperCase(),
      paymentStatus: paymentMethod === 'cod' ? 'COD (Pending Delivery)' : 'PAID (Successful)',
      utrRef: upiUtxRef || 'TXN-' + Date.now(),
      items: rfqCartItems.map(item => ({
        name: item.names?.[currentLang] || item.names?.en || item.name || 'Product',
        qty: item.quantity,
        unit: item.unit || 'pcs',
        price: item.localPrice || (item.priceInr ? parseFloat(item.priceInr) : 499)
      })),
      totalAmount: totalLocalAmount,
      deliveryNotes: notes
    };

    // Save completed order to localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('site_customer_orders_v1') || '[]');
      existingOrders.unshift(orderData);
      localStorage.setItem('site_customer_orders_v1', JSON.stringify(existingOrders));
    } catch(e) {}

    setCompletedOrderReceipt(orderData);
    setPaymentStep('success');

    // Clear cart AFTER payment is successful
    clearRfqCart();

    if (showLiveToast) showLiveToast(`🎉 Order ${orderId} Paid & Placed Successfully!`, 'success');

    // Send WhatsApp Paid Order Confirmation to Store Admin
    let msg = `✅ *ORDER & PAYMENT CONFIRMED! (atsondika-global-trade)*\n`;
    msg += `---------------------------------------\n`;
    msg += `🧾 *Order Receipt ID:* ${orderId}\n`;
    msg += `💳 *Payment Status:* ${orderData.paymentStatus}\n`;
    msg += `💰 *Amount Paid:* ${convertPrice ? convertPrice(totalLocalAmount) : '₹' + totalLocalAmount.toLocaleString()}\n`;
    msg += `👤 *Customer Name:* ${orderData.customerName}\n`;
    msg += `📞 *Phone/WhatsApp:* ${orderData.phone}\n`;
    msg += `🏠 *Delivery Address:* ${orderData.deliveryAddress}\n`;
    if (pincode) msg += `📮 *Pincode:* ${pincode}\n`;
    if (buyerGstin) msg += `🏛️ *GSTIN:* ${buyerGstin}\n`;
    msg += `---------------------------------------\n`;
    msg += `📦 *PAID ITEMS:* (${rfqCartItems.length} Products)\n`;
    rfqCartItems.forEach((item, index) => {
      const name = item.names?.[currentLang] || item.names?.en || item.name || 'Product';
      msg += `${index + 1}. *${name}* (Qty: ${item.quantity} ${item.unit || 'pcs'})\n`;
    });
    msg += `---------------------------------------\n`;
    msg += `⚡ *Paid & Verified via Atsondika Local Portal*`;

    const encoded = encodeURIComponent(msg);
    const phone = (activeCompany?.phone || '+917861997755').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  // WhatsApp RFQ for Global Export Trade
  const handleSendRfqWhatsApp = () => {
    if (rfqCartItems.length === 0) {
      alert('🛒 Your Cart is empty! Add products first.');
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

    if (notes) msg += `\n📝 *Notes:* ${notes}\n`;
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
                {rfqCartItems.length} {currentLang === 'gu' ? 'પ્રોડક્ટ્સ કાર્ટમાં સેવ થયેલ છે' : 'Products Saved in Cart'}
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
          {rfqCartItems.length === 0 && !showCheckoutModal ? (
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

                        {/* Quantity Controls */}
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
                          {/* Interactive Unit Selector Dropdown */}
                          <select
                            className="rfq-unit-select"
                            value={item.unit || (tradeMode === 'local' ? (name.toLowerCase().includes('ghee') || name.toLowerCase().includes('ઘી') ? 'kg' : 'pcs') : 'MT')}
                            onChange={(e) => updateRfqCartUnit && updateRfqCartUnit(item.id, item.incoterm, e.target.value)}
                            style={{
                              padding: '5px 8px',
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              background: 'rgba(255, 255, 255, 0.1)',
                              color: '#facc15',
                              border: '1px solid var(--border-glass)',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              outline: 'none'
                            }}
                            title="Select Item Unit (યુનિટ પસંદ કરો)"
                          >
                            <option value="kg" style={{ background: '#0f172a', color: 'white' }}>kg (કિલોગ્રામ)</option>
                            <option value="gm" style={{ background: '#0f172a', color: 'white' }}>gm (ગ્રામ)</option>
                            <option value="pcs" style={{ background: '#0f172a', color: 'white' }}>pcs (પીસ)</option>
                            <option value="Sets" style={{ background: '#0f172a', color: 'white' }}>Sets (સેટ / ડ્રેસ)</option>
                            <option value="Pairs" style={{ background: '#0f172a', color: 'white' }}>Pairs (જોડી / શૂઝ)</option>
                            <option value="Dozen" style={{ background: '#0f172a', color: 'white' }}>Dozen (ડઝન - 12 Pcs)</option>
                            <option value="Litre" style={{ background: '#0f172a', color: 'white' }}>Litre (લીટર / Liquid)</option>
                            <option value="Box" style={{ background: '#0f172a', color: 'white' }}>Box (બોક્સ / ખોખું)</option>
                            <option value="Tin" style={{ background: '#0f172a', color: 'white' }}>Tin (ડબ્બો / ઘી 15kg)</option>
                            <option value="Packet" style={{ background: '#0f172a', color: 'white' }}>Packet (પેકેટ)</option>
                            <option value="Bags" style={{ background: '#0f172a', color: 'white' }}>Bags (કોથળા / ગુણી)</option>
                            <option value="Meter" style={{ background: '#0f172a', color: 'white' }}>Meter (મીટર / કાપડ)</option>
                            <option value="Rolls" style={{ background: '#0f172a', color: 'white' }}>Rolls (રોલ / ફાબ્રિક)</option>
                            <option value="MT" style={{ background: '#0f172a', color: 'white' }}>MT (મીટ્રિક ટન)</option>
                          </select>
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
                    ? (currentLang === 'gu' ? 'ડિલિવરી & પેમેન્ટ વિગત (Delivery & Payment Setup):' : 'Delivery & Payment Setup:')
                    : (rfqTradeCategory === 'export' ? 'Export Destination & Inquiry Details:' : 'Domestic India Delivery Details:')}
                </h4>

                {/* LOCAL TRADE ADDRESS & PAYMENT SELECTOR */}
                {tradeMode === 'local' ? (
                  <>
                    <div className="rfq-form-group">
                      <label style={{ fontWeight: 800, color: '#38bdf8' }}>
                        🚚 {currentLang === 'gu' ? 'બાયર ડિલિવરી સરનામું (Buyer Delivery Shipping Address)' : 'Buyer Delivery Shipping Address'}
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

                    {/* Select Payment Method Bar */}
                    <div className="rfq-form-group" style={{ marginTop: '10px' }}>
                      <label style={{ fontWeight: 800, color: '#facc15' }}>
                        💳 {currentLang === 'gu' ? 'ચુકવણીનો પ્રકાર પસંદ કરો (Payment Method):' : 'Select Payment Option:'}
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('upi')}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid ' + (paymentMethod === 'upi' ? '#10b981' : 'rgba(255,255,255,0.15)'),
                            background: paymentMethod === 'upi' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)',
                            color: paymentMethod === 'upi' ? '#4ade80' : '#e2e8f0',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          📱 UPI / QR (GPay/Paytm)
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid ' + (paymentMethod === 'card' ? '#38bdf8' : 'rgba(255,255,255,0.15)'),
                            background: paymentMethod === 'card' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)',
                            color: paymentMethod === 'card' ? '#38bdf8' : '#e2e8f0',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          💳 Card / NetBanking
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank')}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid ' + (paymentMethod === 'bank' ? '#f59e0b' : 'rgba(255,255,255,0.15)'),
                            background: paymentMethod === 'bank' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.04)',
                            color: paymentMethod === 'bank' ? '#fbbf24' : '#e2e8f0',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          🏦 Bank NEFT / IMPS
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('cod')}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid ' + (paymentMethod === 'cod' ? '#a855f7' : 'rgba(255,255,255,0.15)'),
                            background: paymentMethod === 'cod' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.04)',
                            color: paymentMethod === 'cod' ? '#c084fc' : '#e2e8f0',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          💵 Cash on Delivery
                        </button>
                      </div>
                    </div>

                    {/* LIVE LOCAL GATEWAY STATUS BADGE FOR CUSTOMERS */}
                    <div style={{ marginTop: '10px', background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(59,130,246,0.3)', padding: '10px 14px', borderRadius: '12px', fontSize: '0.8rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem' }}>🔒</span>
                      <div>
                        <strong style={{ color: 'white', display: 'block' }}>💳 Local Payment Gateway: Razorpay (Live Active)</strong>
                        <span style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>Supports Google Pay, PhonePe, Paytm (0% Fee UPI), Debit/Credit Cards & Netbanking</span>
                      </div>
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
                          </select>
                        </div>

                        <div className="rfq-form-group">
                          <SearchableCurrencySelect
                            label={currentLang === 'gu' ? 'કરન્સી (Currency)' : 'Currency'}
                            value={currentCurrency}
                            currenciesList={currenciesList}
                            onChange={(selectedObj) => {
                              if (setCurrentCurrency) setCurrentCurrency(selectedObj);
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* LIVE SKYDO GLOBAL B2B GATEWAY BADGE FOR CUSTOMERS */}
                    <div style={{ marginTop: '10px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', padding: '12px 14px', borderRadius: '12px', fontSize: '0.8rem', color: '#6ee7b7' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '1.1rem' }}>🌐</span>
                        <strong style={{ color: 'white', fontSize: '0.85rem' }}>Skydo Global B2B Inward Remittance Gateway (Live Active)</strong>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#cbd5e1', margin: '2px 0 6px' }}>
                        RBI PA-CB Certified • 0% Forex Markup • Automatic Free FIRA / FIRC Receipt Issued for Zero-Rated GST Export Filing.
                      </p>
                      <div style={{ fontSize: '0.74rem', color: '#fde047', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '8px', fontFamily: 'monospace' }}>
                        Bank Escrow ID: {paymentGatewaysConfig?.global?.accountId || 'SKYDO-EXP-ATS-2026'} | SWIFT: {paymentGatewaysConfig?.global?.swiftCode || 'SKYDUS33XXX'}
                      </div>
                    </div>
                  </>
                )}

                {/* Common Buyer Name, Phone, Email fields */}
                <div className="rfq-form-group">
                  <label>👤 {currentLang === 'gu' ? 'બાયરનું નામ / કંપનીનું નામ (Buyer Name / Business Name)' : 'Buyer Name / Business Name'}</label>
                  <input
                    type="text"
                    className="rfq-input"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder={currentLang === 'gu' ? 'બાયરનું નામ લખો' : 'Enter buyer name'}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="rfq-form-group">
                    <label>📱 {currentLang === 'gu' ? 'બાયર મોબાઈલ / વોટ્સએપ (Buyer Phone)' : 'Buyer Phone / WhatsApp'}</label>
                    <input
                      type="text"
                      className="rfq-input"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+91 98765 ..."
                    />
                  </div>

                  <div className="rfq-form-group">
                    <label>✉️ {currentLang === 'gu' ? 'બાયર ઈમેલ (Buyer Email)' : 'Buyer Email Address'}</label>
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
        {rfqCartItems.length > 0 && !showCheckoutModal && (
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

            {tradeMode === 'local' ? (
              <button
                className="btn-submit-rfq-whatsapp"
                onClick={handleInitiatePayment}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)'
                }}
              >
                <span>💳</span> {currentLang === 'gu'
                  ? `પેમેન્ટ કરીને ઓર્ડર પૂરું કરો (${convertPrice ? convertPrice(totalLocalAmount) : '₹' + totalLocalAmount})`
                  : `Pay & Complete Order (${convertPrice ? convertPrice(totalLocalAmount) : '₹' + totalLocalAmount})`}
              </button>
            ) : (
              <button
                className="btn-submit-rfq-whatsapp"
                onClick={handleSendRfqWhatsApp}
              >
                <span>📲</span> {currentLang === 'gu' ? '📲 વોટ્સએપ દ્વારા ક્વોટેશન મોકલો' : 'Submit Wholesale Order via WhatsApp'}
              </button>
            )}
          </div>
        )}

        {/* INTERACTIVE PAYMENT CHECKOUT MODAL OVERLAY */}
        {showCheckoutModal && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            background: '#090d16',
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#facc15', fontSize: '1.2rem', fontWeight: 800 }}>
                💳 {currentLang === 'gu' ? 'સુરક્ષિત ઓનલાઈન પેમેન્ટ (Local Checkout)' : 'Secure Payment Checkout'}
              </h3>
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Note to User */}
            <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '10px 12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.78rem', color: '#38bdf8' }}>
              ℹ️ {currentLang === 'gu'
                ? 'પેમેન્ટ પૂરું થયા પછી જ ઓર્ડર કન્ફર્મ થશે. ત્યાં સુધી તમારું કાર્ટ સુરક્ષિત સેવ રહેશે.'
                : 'Items will remain saved in your cart until payment is completed successfully.'}
            </div>

            {/* Order Amount Summary */}
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Items Total ({rfqCartItems.length} Products):</span>
                <span style={{ fontWeight: 700, color: '#white' }}>{convertPrice ? convertPrice(totalLocalAmount) : '₹' + totalLocalAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Delivery Fee:</span>
                <span style={{ fontWeight: 800, color: '#4ade80' }}>FREE</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 900 }}>
                <span style={{ color: '#ffffff' }}>Payable Amount:</span>
                <span style={{ color: '#facc15' }}>{convertPrice ? convertPrice(totalLocalAmount) : '₹' + totalLocalAmount}</span>
              </div>
            </div>

            {paymentStep === 'pay' && (
              <>
                {/* UPI / QR Payment Gate */}
                {paymentMethod === 'upi' && (
                  <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#4ade80', fontSize: '0.95rem' }}>
                      📱 Scan QR Code to Pay via GPay / PhonePe / Paytm
                    </h5>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=7861997755@ybl&pn=AtsondikaGlobalTrade&am=${totalLocalAmount}&cu=INR`)}`}
                      alt="UPI QR Code"
                      style={{ background: '#ffffff', padding: '10px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', width: '160px', height: '160px' }}
                    />
                    <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 700 }}>
                      UPI ID: <span style={{ color: '#38bdf8' }}>7861997755@ybl</span>
                    </div>

                    <div style={{ marginTop: '14px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px', textAlign: 'left' }}>
                        Enter Transaction Reference / UTR Number (ઓપ્શનલ):
                      </label>
                      <input
                        type="text"
                        className="rfq-input"
                        placeholder="e.g. 423981290311"
                        value={upiUtxRef}
                        onChange={(e) => setUpiUtxRef(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Card Payment Gate */}
                {paymentMethod === 'card' && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
                    <h5 style={{ margin: '0 0 12px 0', color: '#38bdf8', fontSize: '0.95rem' }}>
                      💳 Enter Credit / Debit Card Details
                    </h5>
                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Cardholder Name</label>
                      <input
                        type="text"
                        className="rfq-input"
                        placeholder="Name on Card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Card Number</label>
                      <input
                        type="text"
                        className="rfq-input"
                        placeholder="4111 2222 3333 4444"
                        maxLength="19"
                        value={cardNum}
                        onChange={(e) => setCardNum(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Expiry Date</label>
                        <input
                          type="text"
                          className="rfq-input"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8' }}>CVV Code</label>
                        <input
                          type="password"
                          className="rfq-input"
                          placeholder="***"
                          maxLength="4"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Gate */}
                {paymentMethod === 'bank' && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#fbbf24', fontSize: '0.95rem' }}>
                      🏦 Company Bank Account for NEFT / RTGS Transfer
                    </h5>
                    <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                      <div>• <b>Bank Name:</b> ICICI Bank Ltd</div>
                      <div>• <b>Account Name:</b> ADIDEV SMART SOLUTION / ATSONDIKA</div>
                      <div>• <b>Account No:</b> 000405012345</div>
                      <div>• <b>IFSC Code:</b> ICIC0000004</div>
                      <div>• <b>Branch:</b> Ring Road, Surat, Gujarat</div>
                    </div>
                  </div>
                )}

                {/* COD Gate */}
                {paymentMethod === 'cod' && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
                    <h5 style={{ margin: '0 0 8px 0', color: '#c084fc', fontSize: '0.95rem' }}>
                      💵 Cash on Delivery (COD) Order Verification
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                      You can pay in cash when the order arrives at your delivery shipping address.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCompletePaymentSuccess}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                    marginTop: 'auto'
                  }}
                >
                  ✅ {currentLang === 'gu' ? 'પેમેન્ટ કન્ફર્મ કરો અને ઓર્ડર પૂરું કરો' : 'Confirm Payment & Complete Order'}
                </button>
              </>
            )}

            {/* Step: Success Invoice Screen */}
            {paymentStep === 'success' && completedOrderReceipt && (
              <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                <span style={{ fontSize: '3.5rem' }}>🎉</span>
                <h4 style={{ color: '#4ade80', margin: '10px 0 6px 0', fontSize: '1.3rem', fontWeight: 900 }}>
                  {currentLang === 'gu' ? 'ઓર્ડર અને પેમેન્ટ સફળતાપૂર્વક પૂરું થઈ ગયું!' : 'Payment & Order Placed Successfully!'}
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>
                  Receipt ID: <b style={{ color: '#facc15' }}>{completedOrderReceipt.orderId}</b>
                </p>

                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '12px', textAlign: 'left', marginBottom: '20px', border: '1px solid var(--border-glass)' }}>
                  <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                    <div><b>Customer:</b> {completedOrderReceipt.customerName}</div>
                    <div><b>Phone:</b> {completedOrderReceipt.phone}</div>
                    <div><b>Address:</b> {completedOrderReceipt.deliveryAddress}</div>
                    <div><b>Payment Status:</b> <span style={{ color: '#4ade80', fontWeight: 800 }}>{completedOrderReceipt.paymentStatus}</span></div>
                    <div><b>Total Amount:</b> <span style={{ color: '#facc15', fontWeight: 800 }}>{convertPrice ? convertPrice(completedOrderReceipt.totalAmount) : '₹' + completedOrderReceipt.totalAmount}</span></div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setIsRfqDrawerOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #00d2ff, #0086ff)',
                    color: 'white',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  👍 {currentLang === 'gu' ? 'પૂરૂ થયું (Done)' : 'Done & Close'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
