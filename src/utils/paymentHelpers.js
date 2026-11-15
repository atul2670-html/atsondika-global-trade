/**
 * Payment Gateways & Banking Setup Utilities
 * Supports rich Indian local gateways & international global B2B export gateways
 * with complete flexibility for custom typing and tie-ups.
 */

export const LOCAL_GATEWAY_OPTIONS = [
  { id: 'razorpay', name: 'Razorpay (Recommended — 0% Fee UPI, Cards, Netbanking)' },
  { id: 'cashfree', name: 'Cashfree Payments (Low Transaction Fee, Auto Split)' },
  { id: 'phonepe', name: 'PhonePe Business PG (Direct UPI, Cards, QR)' },
  { id: 'jiopay', name: 'JioPay Business (Reliance Jio UPI, Cards & Netbanking)' },
  { id: 'easebuzz', name: 'Easebuzz Payments (Smart APIs, Instant Settlement & UPI)' },
  { id: 'paytm', name: 'Paytm Business Gateway (Paytm QR, Wallet, Netbanking)' },
  { id: 'payu', name: 'PayU India Gateway (Enterprise Cards, EMI & UPI)' },
  { id: 'ccavenue', name: 'CCAvenue Multi-Currency (200+ Payment Modes)' },
  { id: 'billdesk', name: 'BillDesk PG (Premier Banking & BillPay Network)' },
  { id: 'instamojo', name: 'Instamojo Smart Gateway (Instant Onboarding)' },
  { id: 'stripe_in', name: 'Stripe India (Global & Domestic Cards, UPI)' },
  { id: 'custom', name: '✏️ Custom / Other Indian Gateway (પોતાનો મનપસંદ ગેટવે ટાઈપ કરો)' }
];

export const GLOBAL_GATEWAY_OPTIONS = [
  { id: 'skydo', name: 'Skydo Global Remittance (Recommended — RBI PA-CB, 0% Forex, Free FIRA)' },
  { id: 'stripe_global', name: 'Stripe Global B2B (USD, EUR, GBP, AUD, Cards & Bank Wire)' },
  { id: 'paypal', name: 'PayPal B2B Commerce (Global PayPal & International Cards)' },
  { id: 'wise', name: 'Wise Business (Multi-Currency Local Receiving Accounts)' },
  { id: 'remitly', name: 'Remitly Global Remittance (Fast International Wire & Bank Deposit)' },
  { id: 'xe', name: 'Xe Money Transfer (Xe.com Global B2B Wire & Live Forex)' },
  { id: 'payoneer', name: 'Payoneer B2B Remittance (Global Receiving Accounts & Escrow)' },
  { id: 'tazapay', name: 'Tazapay Global Escrow (B2B Cross-Border Escrow & Cards)' },
  { id: 'wire_swift', name: 'Direct Bank Wire Transfer / SWIFT IBAN (Direct Bank to Bank Wire)' },
  { id: 'custom', name: '✏️ Custom / Other Global Gateway (પોતાનો મનપસંદ ગ્લોબલ ગેટવે ટાઈપ કરો)' }
];

export const getLocalGatewayName = (local) => {
  if (!local) return 'Razorpay';
  if (local.provider === 'custom') {
    return (local.customName && local.customName.trim()) || 'Custom Local Gateway';
  }
  const map = {
    razorpay: 'Razorpay',
    cashfree: 'Cashfree Payments',
    phonepe: 'PhonePe Business',
    jiopay: 'JioPay Business',
    easebuzz: 'Easebuzz',
    paytm: 'Paytm Business',
    payu: 'PayU India',
    ccavenue: 'CCAvenue',
    billdesk: 'BillDesk',
    instamojo: 'Instamojo',
    stripe_in: 'Stripe India'
  };
  return map[local.provider] || (local.customName && local.customName.trim()) || local.provider || 'Razorpay';
};

export const getGlobalGatewayName = (global) => {
  if (!global) return 'Skydo';
  if (global.provider === 'custom') {
    return (global.customName && global.customName.trim()) || 'Custom Global Gateway';
  }
  const map = {
    skydo: 'Skydo',
    stripe_global: 'Stripe Global',
    paypal: 'PayPal B2B',
    wise: 'Wise Business',
    remitly: 'Remitly',
    xe: 'Xe Money Transfer',
    payoneer: 'Payoneer',
    tazapay: 'Tazapay Escrow',
    wire_swift: 'SWIFT Wire Transfer'
  };
  return map[global.provider] || (global.customName && global.customName.trim()) || global.provider || 'Skydo';
};

export const getLocalGatewayFieldConfig = (provider) => {
  switch (provider) {
    case 'cashfree':
      return {
        keyLabel: 'Cashfree App ID (Client ID)',
        keyPlaceholder: 'CF_APP_ID_...',
        secretLabel: 'Cashfree Secret Key',
        secretPlaceholder: 'cfsk_ma_live_...',
        info: '✓ Cashfree Payments: Instant Settlements, UPI 2.0, Cards & Netbanking supported.'
      };
    case 'phonepe':
      return {
        keyLabel: 'PhonePe Merchant ID (MID)',
        keyPlaceholder: 'M22XXXXXXXX',
        secretLabel: 'PhonePe Salt Key (API Secret)',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ PhonePe Business PG: Fast 0% Fee UPI Payments, PhonePe Switch & Cards supported.'
      };
    case 'jiopay':
      return {
        keyLabel: 'JioPay Merchant ID (MID)',
        keyPlaceholder: 'JIO_MID_...',
        secretLabel: 'JioPay Merchant Key / Secret',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ JioPay Business: Reliance Jio UPI, RuPay Cards, Netbanking & Jio Wallet supported.'
      };
    case 'easebuzz':
      return {
        keyLabel: 'Easebuzz Merchant Key',
        keyPlaceholder: '2P1ABCD...',
        secretLabel: 'Easebuzz Salt Key',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ Easebuzz: High-speed checkout, UPI 2.0, Netbanking & instant settlement supported.'
      };
    case 'paytm':
      return {
        keyLabel: 'Paytm Merchant ID (MID)',
        keyPlaceholder: 'atsond...MID',
        secretLabel: 'Paytm Merchant Key',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ Paytm Business: Paytm UPI, Wallet, Credit/Debit Cards & Netbanking supported.'
      };
    case 'payu':
      return {
        keyLabel: 'PayU Merchant Key',
        keyPlaceholder: 'gtKFFx...',
        secretLabel: 'PayU Merchant Salt',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ PayU India: Enterprise Payment Gateway with multi-bank redundancy & high success rates.'
      };
    case 'ccavenue':
      return {
        keyLabel: 'CCAvenue Merchant ID',
        keyPlaceholder: '289345...',
        secretLabel: 'CCAvenue Working Key / Access Code',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ CCAvenue: 200+ Indian payment options, Netbanking, Rupay & multi-currency support.'
      };
    case 'billdesk':
      return {
        keyLabel: 'BillDesk Merchant ID',
        keyPlaceholder: 'BD_MERCHANT_...',
        secretLabel: 'BillDesk Secret Key / Checksum',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ BillDesk: Premier Indian banking gateway & direct bank debit integration.'
      };
    case 'instamojo':
      return {
        keyLabel: 'Instamojo Client ID',
        keyPlaceholder: 'test_... / live_...',
        secretLabel: 'Instamojo Client Secret',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ Instamojo Smart Gateway: Fast checkout, payment links & UPI collect.'
      };
    case 'stripe_in':
      return {
        keyLabel: 'Stripe India Publishable Key',
        keyPlaceholder: 'pk_live_...',
        secretLabel: 'Stripe India Secret Key',
        secretPlaceholder: 'sk_live_...',
        info: '✓ Stripe India: Domestic Cards, International Cards & UPI payments supported.'
      };
    case 'custom':
      return {
        keyLabel: 'API Key / Merchant ID / Client ID',
        keyPlaceholder: 'તમારો ગેટવે Client ID / Key ID દાખલ કરો...',
        secretLabel: 'API Secret / Salt Key / Webhook Secret',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ કસ્ટમ ગેટવે: તમે તમારી ઇચ્છા મુજબ કોઈપણ ભારતીય પેમેન્ટ ગેટવે API સાથે સીધું ટાઈપ / જોડાણ (tie-up) કરી શકો છો.'
      };
    case 'razorpay':
    default:
      return {
        keyLabel: 'Razorpay Key ID (API Key)',
        keyPlaceholder: 'rzp_live_...',
        secretLabel: 'Razorpay Key Secret',
        secretPlaceholder: '••••••••••••••••',
        info: '✓ ગ્રાહક સપોર્ટ: Google Pay, PhonePe, Paytm (0% Fee UPI), Debit/Credit Cards & Netbanking supported.'
      };
  }
};

export const getGlobalGatewayFieldConfig = (provider) => {
  switch (provider) {
    case 'stripe_global':
      return {
        field1Label: 'Stripe Publishable Key (Live)',
        field1Placeholder: 'pk_live_...',
        field2Label: 'Stripe Secret Key (sk_live_...)',
        field2Placeholder: 'sk_live_...',
        field3Label: 'Stripe Statement Descriptor / Account Name',
        field3Placeholder: 'ATSONDIKA GLOBAL TRADE',
        info: '✓ Stripe Global: International Credit/Debit Cards (Visa, Mastercard, Amex), Apple Pay & Global ACH Wire.'
      };
    case 'paypal':
      return {
        field1Label: 'PayPal Client ID',
        field1Placeholder: 'AXXXXXXXXXXXXXXXXXXXXXX...',
        field2Label: 'PayPal Secret Key',
        field2Placeholder: 'EXXXXXXXXXXXXXXXXXXXXXX...',
        field3Label: 'PayPal Merchant / Business Email',
        field3Placeholder: 'exports@atsondika.com',
        info: '✓ PayPal B2B: Global payments accepted in 100+ currencies and 200+ export destinations worldwide.'
      };
    case 'wise':
      return {
        field1Label: 'Wise Profile ID / Account ID',
        field1Placeholder: 'WISE-US-89021...',
        field2Label: 'SWIFT / BIC / ACH Routing Number',
        field2Placeholder: 'TRWIBEB1... / Routing Code',
        field3Label: 'Wise Receiving Account / Entity Name',
        field3Placeholder: 'Atsondika Global Trade LLC / Pvt Ltd',
        info: '✓ Wise Business: Local receiving bank accounts in USD, EUR, GBP, CAD, AUD with mid-market zero markups.'
      };
    case 'remitly':
      return {
        field1Label: 'Remitly Partner ID / Reference ID',
        field1Placeholder: 'RMT-ATS-2026...',
        field2Label: 'Receiving Bank IFSC / SWIFT Code',
        field2Placeholder: 'HDFCINBB / SBIN00...',
        field3Label: 'Remitly Beneficiary Account Name',
        field3Placeholder: 'Atsondika Global Trade — Export A/C',
        info: '✓ Remitly Global: Fast international money transfers from USA, UK, Europe, Australia & Canada with direct bank deposit in India.'
      };
    case 'xe':
      return {
        field1Label: 'Xe Account Number / Client ID',
        field1Placeholder: 'XE-CORP-98201...',
        field2Label: 'Xe SWIFT / BIC Code / Routing',
        field2Placeholder: 'XEB2BUS33... / Routing',
        field3Label: 'Xe Beneficiary Account Name',
        field3Placeholder: 'Atsondika Global Trade Export Escrow',
        info: '✓ Xe Money Transfer: Global corporate cross-border payments, live mid-market forex rates and direct wire routing in 130+ currencies.'
      };
    case 'payoneer':
      return {
        field1Label: 'Payoneer Customer ID / Account ID',
        field1Placeholder: 'PAYONEER-B2B-10928...',
        field2Label: 'SWIFT / Bank Routing Code',
        field2Placeholder: 'PNERUS33... / Routing Code',
        field3Label: 'Payoneer Beneficiary Account Name',
        field3Placeholder: 'Atsondika Global Trade',
        info: '✓ Payoneer B2B: International collection with receiving accounts in USA, UK, Europe, Australia & Japan.'
      };
    case 'tazapay':
      return {
        field1Label: 'Tazapay API Key / Merchant ID',
        field1Placeholder: 'tzp_live_...',
        field2Label: 'Tazapay Secret / Escrow Code',
        field2Placeholder: '••••••••••••••••',
        field3Label: 'Tazapay Escrow Entity Name',
        field3Placeholder: 'Atsondika Global Trade Escrow',
        info: '✓ Tazapay Escrow: Cross-border escrow protection and trade checkout in 170+ export countries.'
      };
    case 'wire_swift':
      return {
        field1Label: 'Bank Account Number / IBAN',
        field1Placeholder: 'e.g. 50200001234567 / IN89...',
        field2Label: 'Bank SWIFT / BIC Code',
        field2Placeholder: 'e.g. HDFCINBB / ICICINBB / SBININBB',
        field3Label: 'Beneficiary Bank & Company Account Name',
        field3Placeholder: 'Atsondika Global Trade — Current A/C',
        info: '✓ Direct Bank Wire: Secure international wire transfer (Telegraphic Transfer - TT / Wire) routed directly to your Indian export bank account.'
      };
    case 'custom':
      return {
        field1Label: 'Account ID / Merchant ID / IBAN / API Key',
        field1Placeholder: 'ગ્લોબલ ગેટવે એકાઉન્ટ ID / Key ID દાખલ કરો...',
        field2Label: 'SWIFT / BIC / Secret Key / Routing Code',
        field2Placeholder: 'SWIFT / BIC / Secret Key...',
        field3Label: 'Escrow / Beneficiary Account Name',
        field3Placeholder: 'લાભાર્થી એકાઉન્ટનું નામ...',
        info: '✓ કસ્ટમ ગ્લોબલ ગેટવે: કોઈપણ આંતરરાષ્ટ્રીય પેમેન્ટ પ્લેટફોર્મ સાથે પોતાની ઇચ્છા મુજબ ટાઈપ / જોડાણ (tie-up) કરવાની સંપૂર્ણ સ્વતંત્રતા.'
      };
    case 'skydo':
    default:
      return {
        field1Label: 'Skydo Account ID / IBAN',
        field1Placeholder: 'SKYDO-EXP-ATS-2026',
        field2Label: 'SWIFT / BIC Code',
        field2Placeholder: 'SKYDUS33XXX',
        field3Label: 'Export Escrow Account Name',
        field3Placeholder: 'Atsondika Global Trade Export Escrow',
        info: '✓ RBI Compliance: RBI PA-CB certified, 0% Forex Markup, Automated Free FIRA / FIRC generation for zero-rated GST export filing.'
      };
  }
};

export const getLocalGatewaySubtitle = (local) => {
  if (!local) return 'Supports Google Pay, PhonePe, Paytm (0% Fee UPI), Debit/Credit Cards & Netbanking';
  const name = getLocalGatewayName(local);
  if (local.provider === 'custom') {
    return `${name}: Instant UPI, Netbanking, QR Code & Cards supported.`;
  }
  return `Supports Google Pay, PhonePe, Paytm (0% Fee UPI), Debit/Credit Cards & Netbanking via ${name}.`;
};

export const getGlobalGatewaySubtitle = (global) => {
  if (!global) return 'RBI PA-CB Certified • 0% Forex Markup • Automatic Free FIRA / FIRC Receipt Issued for Zero-Rated GST Export Filing.';
  if (global.provider === 'stripe_global') {
    return 'Stripe Global B2B: Major Credit Cards (Visa, Mastercard, Amex), Wire & Multi-Currency Processing.';
  }
  if (global.provider === 'paypal') {
    return 'PayPal B2B Commerce: Verified Buyer Protection, Global Card Payments & Multi-Currency Settlement.';
  }
  if (global.provider === 'wise') {
    return 'Wise Business: Real Mid-Market Exchange Rates, Low Wire Fees & Multi-Currency Virtual Bank Accounts.';
  }
  if (global.provider === 'remitly') {
    return 'Remitly Global Remittance: Direct foreign bank deposit to Indian export account with guaranteed exchange rates.';
  }
  if (global.provider === 'xe') {
    return 'Xe Money Transfer: Live competitive exchange rates, global wire transfers & direct exporter account settlement.';
  }
  if (global.provider === 'payoneer') {
    return 'Payoneer B2B Remittance: Global Bank Transfer, Low Wire Fees & Fast International Escrow.';
  }
  if (global.provider === 'tazapay') {
    return 'Tazapay B2B Escrow: Cross-Border Milestone Protection, Trade Assurance & Global Compliance.';
  }
  if (global.provider === 'wire_swift') {
    return 'Direct International Bank Wire Transfer (SWIFT / BIC): Direct Bank-to-Bank routing to verified exporter account.';
  }
  if (global.provider === 'custom') {
    const name = getGlobalGatewayName(global);
    return `${name}: Verified International B2B Payment & Direct Foreign Inward Remittance Routing.`;
  }
  return 'RBI PA-CB Certified • 0% Forex Markup • Automatic Free FIRA / FIRC Receipt Issued for Zero-Rated GST Export Filing.';
};

export const DEFAULT_PROVIDER_CREDENTIALS = {
  local: {
    razorpay: { keyId: 'rzp_live_ATS_LOCAL_2026', keySecret: '••••••••••••••••' },
    cashfree: { keyId: '', keySecret: '' },
    phonepe: { keyId: '', keySecret: '' },
    jiopay: { keyId: '', keySecret: '' },
    easebuzz: { keyId: '', keySecret: '' },
    paytm: { keyId: '', keySecret: '' },
    payu: { keyId: '', keySecret: '' },
    ccavenue: { keyId: '', keySecret: '' },
    billdesk: { keyId: '', keySecret: '' },
    instamojo: { keyId: '', keySecret: '' },
    stripe_in: { keyId: '', keySecret: '' },
    custom: { keyId: '', keySecret: '' }
  },
  global: {
    skydo: { accountId: 'SKYDO-EXP-ATS-2026', swiftCode: 'SKYDUS33XXX', accountName: 'Atsondika Global Trade Export Escrow' },
    stripe_global: { accountId: '', swiftCode: '', accountName: 'Atsondika Global Trade' },
    paypal: { accountId: '', swiftCode: '', accountName: 'Atsondika Global Trade' },
    wise: { accountId: '', swiftCode: '', accountName: 'Atsondika Global Trade LLC / Pvt Ltd' },
    remitly: { accountId: '', swiftCode: '', accountName: 'Atsondika Global Trade — Export A/C' },
    xe: { accountId: '', swiftCode: '', accountName: 'Atsondika Global Trade Export Escrow' },
    payoneer: { accountId: '', swiftCode: '', accountName: 'Atsondika Global Trade' },
    tazapay: { accountId: '', swiftCode: '', accountName: 'Atsondika Global Trade Escrow' },
    wire_swift: { accountId: '', swiftCode: '', accountName: 'Atsondika Global Trade — Current A/C' },
    custom: { accountId: '', swiftCode: '', accountName: 'Atsondika Global Trade' }
  }
};

export const getGlobalGatewayEscrowInfo = (globalConfig) => {
  if (!globalConfig) return 'Bank Escrow ID: SKYDO-EXP-ATS-2026 | SWIFT: SKYDUS33XXX';
  const provider = globalConfig.provider || 'skydo';
  const acc = globalConfig.accountId || '';
  const swift = globalConfig.swiftCode || '';
  const name = globalConfig.accountName ? ` | Beneficiary: ${globalConfig.accountName}` : '';

  switch (provider) {
    case 'remitly':
      return `Remitly Partner ID: ${acc || 'RMT-ATS-2026'} | Bank IFSC/SWIFT: ${swift || 'VERIFIED-BANK-ROUTING'}${name}`;
    case 'xe':
      return `Xe Account No: ${acc || 'XE-CORP-ATS'} | SWIFT/Routing: ${swift || 'DIRECT-ROUTING'}${name}`;
    case 'wise':
      return `Wise Profile ID: ${acc || 'WISE-ATS-2026'} | SWIFT/ACH: ${swift || 'MID-MARKET-WIRE'}${name}`;
    case 'paypal':
      return `PayPal Client ID: ${acc || 'PAYPAL-B2B-ATS'} | Merchant: ${swift || 'exports@atsondika.com'}${name}`;
    case 'stripe_global':
      return `Stripe Key ID: ${acc || 'STRIPE-B2B-LIVE'} | Mode: ${swift || 'GLOBAL-WIRE'}${name}`;
    case 'payoneer':
      return `Payoneer ID: ${acc || 'PNER-ATS-2026'} | SWIFT: ${swift || 'RECEIVING-AC'}${name}`;
    case 'tazapay':
      return `Tazapay Escrow ID: ${acc || 'TZP-ATS-ESCROW'} | Code: ${swift || 'ESCROW-PROTECT'}${name}`;
    case 'wire_swift':
      return `Bank Account: ${acc || 'DIRECT-EXPORT-AC'} | SWIFT: ${swift || 'BANK-SWIFT-BIC'}${name}`;
    case 'custom':
      return `Account ID: ${acc || 'CUSTOM-GLOBAL-ID'} | Routing/SWIFT: ${swift || 'ACTIVE-ROUTING'}${name}`;
    case 'skydo':
    default:
      return `Bank Escrow ID: ${acc || 'SKYDO-EXP-ATS-2026'} | SWIFT: ${swift || 'SKYDUS33XXX'}${name}`;
  }
};
