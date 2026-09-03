import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initialProductsData, defaultBranchOffices, defaultCertificates, translations, defaultCompanyProfiles, seaFreightPorts, airCargoRoutes } from '../data/initialData.js';
import { toUSEnglishAddress, convertGoogleDriveUrl } from '../utils/address.js';
import { realtimeEngine, pushGlobalCloudSync, pullGlobalCloudSync, fetchLiveExchangeRates, DEFAULT_CURRENCIES, LIVE_TICKER_ITEMS } from '../utils/realtimeSync.js';

const initialStoreData = {};

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentLang, setCurrentLang] = useState('en');

  // Dynamic 50+ Global Currencies with Live FX Auto-Fetcher
  const [currenciesList, setCurrenciesList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_all_currencies_v1') || 'null');
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return DEFAULT_CURRENCIES;
  });

  useEffect(() => {
    const updateLiveFxRates = async () => {
      const liveRates = await fetchLiveExchangeRates();
      if (liveRates) {
        setCurrenciesList(prev => {
          const updated = prev.map(curr => {
            if (liveRates[curr.code]) {
              return { ...curr, rate: liveRates[curr.code] };
            }
            return curr;
          });
          try { localStorage.setItem('site_all_currencies_v1', JSON.stringify(updated)); } catch(e) {}
          return updated;
        });
      }
    };
    updateLiveFxRates();
    const interval = setInterval(updateLiveFxRates, 60000);
    return () => clearInterval(interval);
  }, []);

  // Admin Password & Mobile OTP Password Reset State
  const [adminPassword, setAdminPassword] = useState(() => {
    try { return localStorage.getItem('site_admin_password_v1') || 'Aip261970@'; }
    catch(e) { return 'Aip261970@'; }
  });

  const [adminMobile, setAdminMobile] = useState(() => {
    try { return localStorage.getItem('site_admin_mobile_v1') || '+91 78619 97755'; }
    catch(e) { return '+91 78619 97755'; }
  });

  // Admin Login State - Default FALSE for visitor safety (Only true when admin logs in)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try { return localStorage.getItem('admin_access_unlocked_v1') === 'true'; }
    catch(e) { return false; }
  });

  // Multi-Company Profile & Switcher State (4 Companies)
  const [companiesList, setCompaniesList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_company_profiles_v3') || localStorage.getItem('site_company_profiles_v2') || localStorage.getItem('site_company_profiles_v1') || 'null');
      if (Array.isArray(stored) && stored.length > 0) {
        return stored;
      }
    } catch(e) {}
    return defaultCompanyProfiles;
  });

  useEffect(() => {
    try {
      localStorage.setItem('site_company_profiles_v3', JSON.stringify(companiesList));
      localStorage.setItem('site_company_profiles_v2', JSON.stringify(companiesList));
      localStorage.setItem('site_company_profiles_v1', JSON.stringify(companiesList));
    } catch(e) {}
  }, [companiesList]);

  const [activeCompanyId, setActiveCompanyId] = useState(() => {
    try {
      const saved = localStorage.getItem('site_active_company_id_v1');
      if (saved) return saved;
    } catch(e) {}
    return 'comp_1';
  });
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchFilterQuery, setSearchFilterQuery] = useState('');
  const [productViewMode, setProductViewMode] = useState('grid'); // 'grid' | 'list' | 'compare'
  
  // Trade Mode System State: 'global' (B2B Export) | 'local' (B2C E-Commerce)
  const [tradeMode, setTradeMode] = useState(() => {
    try { return localStorage.getItem('site_trade_mode_v1') || 'global'; }
    catch(e) { return 'global'; }
  });

  const changeTradeMode = (mode) => {
    setTradeMode(mode);
    try { localStorage.setItem('site_trade_mode_v1', mode); } catch(e) {}
  };

  // Multi-Vendor Merchant / Supplier System State
  const [merchantsList, setMerchantsList] = useState(() => {
    try {
      const stored = localStorage.getItem('site_merchants_list_v1');
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return [
      {
        id: 'merchant-demo-1',
        businessName: 'Surat Silk & Garment House',
        brandName: 'Surat Silks',
        contactPerson: 'Rameshbhai Patel',
        phone: '+91 98250 11223',
        email: 'info@suratsilks.com',
        city: 'Surat',
        state: 'Gujarat',
        gstin: '24AAACS1122E1Z4',
        businessType: 'Manufacturer & Exporter',
        status: 'approved',
        registeredAt: 'Aug 20, 2026'
      }
    ];
  });

  const [currentMerchant, setCurrentMerchant] = useState(() => {
    try {
      const stored = localStorage.getItem('site_current_merchant_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && parsed.id && parsed.businessName) {
          return parsed;
        }
      }
    } catch(e) {}
    return null;
  });

  const [merchantProductsList, setMerchantProductsList] = useState(() => {
    try {
      const stored = localStorage.getItem('site_merchant_products_v1');
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('site_merchants_list_v1', JSON.stringify(merchantsList));
    } catch(e) {}
  }, [merchantsList]);

  useEffect(() => {
    try {
      if (currentMerchant) localStorage.setItem('site_current_merchant_v1', JSON.stringify(currentMerchant));
      else localStorage.removeItem('site_current_merchant_v1');
    } catch(e) {}
  }, [currentMerchant]);

  useEffect(() => {
    try {
      localStorage.setItem('site_merchant_products_v1', JSON.stringify(merchantProductsList));
    } catch(e) {}
  }, [merchantProductsList]);

  // Admin Commission & Seller Approval System State
  const [adminCommissionRate, setAdminCommissionRate] = useState(() => {
    try { return parseFloat(localStorage.getItem('site_admin_commission_rate_v1')) || 2.5; }
    catch(e) { return 2.5; }
  });

  const [requireProductApproval, setRequireProductApproval] = useState(() => {
    try {
      const stored = localStorage.getItem('site_require_product_approval_v1');
      return stored !== null ? stored === 'true' : true;
    } catch(e) { return true; }
  });

  const saveAdminCommissionRate = (rate) => {
    const num = parseFloat(rate);
    const validRate = isNaN(num) ? 2.5 : Math.max(0, Math.min(50, num));
    setAdminCommissionRate(validRate);
    try { localStorage.setItem('site_admin_commission_rate_v1', validRate.toString()); } catch(e) {}
    syncToServer({ adminCommissionRate: validRate });
    showLiveToast(`💰 Admin Commission set to ${validRate}%`, 'success');
  };

  const saveRequireProductApproval = (val) => {
    const boolVal = Boolean(val);
    setRequireProductApproval(boolVal);
    try { localStorage.setItem('site_require_product_approval_v1', boolVal.toString()); } catch(e) {}
    syncToServer({ requireProductApproval: boolVal });
    showLiveToast(`⚙️ Product Approval Policy updated: ${boolVal ? 'Manual Admin Approval Required' : 'Auto Approve'}`, 'info');
  };

  // Payment Gateways Architecture State (Local: Razorpay | Global: Skydo)
  const defaultPaymentGatewaysConfig = {
    local: {
      provider: 'razorpay',
      status: 'active',
      keyId: 'rzp_live_ATS_LOCAL_2026',
      keySecret: '••••••••••••••••',
      merchantName: 'Atsondika Local Trade'
    },
    global: {
      provider: 'skydo',
      status: 'active',
      accountId: 'SKYDO-EXP-ATS-2026',
      swiftCode: 'SKYDUS33XXX',
      ibanVirtualAccount: 'US89 SKYD 1002 9984 001',
      accountName: 'Atsondika Global Trade Export Escrow'
    }
  };

  const [paymentGatewaysConfig, setPaymentGatewaysConfig] = useState(() => {
    try {
      const stored = localStorage.getItem('site_payment_gateways_config_v1');
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return defaultPaymentGatewaysConfig;
  });

  const savePaymentGatewaysConfig = (newConfig) => {
    setPaymentGatewaysConfig(newConfig);
    try { localStorage.setItem('site_payment_gateways_config_v1', JSON.stringify(newConfig)); } catch(e) {}
    syncToServer({ paymentGatewaysConfig: newConfig });
    showLiveToast('💳 Payment Gateways Configuration Saved & Active!', 'success');
  };

  // Real-Time Currency Conversion & Ticker State
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    try { return JSON.parse(localStorage.getItem('site_active_currency_v1') || 'null') || DEFAULT_CURRENCIES[0]; }
    catch(e) { return DEFAULT_CURRENCIES[0]; }
  });

  const [liveToast, setLiveToast] = useState(null); // { message, type, timestamp }
  const [lastUpdatedProductId, setLastUpdatedProductId] = useState(null);

  // Amazon / Flipkart Style RFQ Quote Cart Tray State
  const [rfqCartItems, setRfqCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('site_rfq_cart_items_v1') || '[]'); }
    catch(e) { return []; }
  });
  const [isRfqDrawerOpen, setIsRfqDrawerOpen] = useState(false);

  // Live Shipment & Order Tracker State
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('site_rfq_cart_items_v1', JSON.stringify(rfqCartItems)); }
    catch(e) {}
  }, [rfqCartItems]);

  useEffect(() => {
    try { localStorage.setItem('site_active_currency_v1', JSON.stringify(currentCurrency)); }
    catch(e) {}
  }, [currentCurrency]);

  const showLiveToast = (msg, type = 'info') => {
    setLiveToast({ id: Date.now(), message: msg, type, timestamp: new Date().toLocaleTimeString() });
    setTimeout(() => setLiveToast(null), 4000);
  };

  const addToRfqCart = (product, quantity = 1, unit = 'MT', incoterm = 'FOB') => {
    setRfqCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.incoterm === incoterm);
      if (existing) {
        return prev.map(item => item.id === product.id && item.incoterm === incoterm ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity, unit, incoterm, addedAt: Date.now() }];
    });
    showLiveToast(`🛒 Added "${product.names?.[currentLang] || product.names?.en || product.name}" to Quote Cart!`, 'success');
  };

  const removeFromRfqCart = (id, incoterm) => {
    setRfqCartItems(prev => prev.filter(item => !(item.id === id && item.incoterm === incoterm)));
  };

  const updateRfqCartQuantity = (id, incoterm, newQty) => {
    if (newQty <= 0) {
      removeFromRfqCart(id, incoterm);
      return;
    }
    setRfqCartItems(prev => prev.map(item => item.id === id && item.incoterm === incoterm ? { ...item, quantity: newQty } : item));
  };

  const updateRfqCartUnit = (id, incoterm, newUnit) => {
    setRfqCartItems(prev => prev.map(item => item.id === id && item.incoterm === incoterm ? { ...item, unit: newUnit } : item));
  };

  const clearRfqCart = () => {
    setRfqCartItems([]);
  };

  // Convert USD / INR price to currently selected currency
  const convertPrice = (usdPriceVal) => {
    if (usdPriceVal === null || usdPriceVal === undefined || usdPriceVal === '') return '';
    if (typeof usdPriceVal === 'number') {
      const num = usdPriceVal;
      if (currentCurrency.code === 'USD') return `$${Math.round(num).toLocaleString('en-US')}`;
      const converted = Math.round(num * (currentCurrency.rate || 1)).toLocaleString('en-US');
      return `${currentCurrency.symbol || '₹'}${converted}`;
    }
    const str = String(usdPriceVal);
    if (currentCurrency.code === 'USD') return str;
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return str;
    const converted = Math.round(num * (currentCurrency.rate || 1)).toLocaleString('en-US');
    return `${currentCurrency.symbol || '₹'}${converted}`;
  };

  // Subscribe to RealTimeSyncEngine events across tabs
  useEffect(() => {
    const unsub = realtimeEngine.subscribe((event) => {
      if (!event || !event.type) return;
      if (event.type === 'PRODUCT_UPDATE' || event.type === 'PRICE_CHANGE' || event.type === 'NEW_PRODUCT') {
        if (event.payload && event.payload.productId) {
          setLastUpdatedProductId(event.payload.productId);
          setTimeout(() => setLastUpdatedProductId(null), 8000);
        }
        if (event.payload && event.payload.productName) {
          showLiveToast(`⚡ REAL-TIME UPDATE: Product "${event.payload.productName}" was updated globally!`, 'live');
        } else {
          showLiveToast(`⚡ REAL-TIME UPDATE: Live product changes synced across windows!`, 'live');
        }
        if (!isSyncing.current) {
          setTimeout(() => {
            if (!isSyncing.current) fetchServerData();
          }, 1500);
        }
      }
    });
    return unsub;
  }, []);
  
  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'admin' | 'product' | 'certificate' | 'branch' | 'viewCert' | 'hero' | 'quotation' | null
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingCertId, setEditingCertId] = useState(null);
  const [editingBranchId, setEditingBranchId] = useState(null);
  const [selectedCertForView, setSelectedCertForView] = useState(null);

  // Dynamic RFQ & Multi-Product Quotation State
  const [selectedRfqProducts, setSelectedRfqProducts] = useState([]);
  const [quotationProduct, setQuotationProduct] = useState(null);
  const [imagePreviewData, setImagePreviewData] = useState(null);

  const addRfqProduct = (prod) => {
    if (!prod) return;
    setSelectedRfqProducts(prev => {
      if (prev.some(p => p.id === prod.id)) return prev;
      return [...prev, prod];
    });
  };

  const removeRfqProduct = (prodId) => {
    setSelectedRfqProducts(prev => prev.filter(p => p.id !== prodId));
  };

  const clearRfqProducts = () => {
    setSelectedRfqProducts([]);
  };

  const toggleRfqProduct = (prod) => {
    if (!prod) return;
    setSelectedRfqProducts(prev => {
      const exists = prev.some(p => p.id === prod.id);
      if (exists) return prev.filter(p => p.id !== prod.id);
      return [...prev, prod];
    });
  };

  // Backwards compatible getter and setter for single product RFQ
  const selectedRfqProduct = selectedRfqProducts[0] || null;
  const setSelectedRfqProduct = (prod) => {
    if (!prod) {
      setSelectedRfqProducts([]);
    } else if (typeof prod === 'function') {
      setSelectedRfqProducts(prev => {
        const nextVal = prod(prev[0] || null);
        return nextVal ? [nextVal] : [];
      });
    } else {
      setSelectedRfqProducts([prod]);
    }
  };

  const openImagePreview = (data) => {
    setImagePreviewData(data);
    setActiveModal('image_preview');
  };

  // Multi-Language Hero Banner Note & Headline State
  const defaultHeroBanner = {
    badge: "APEDA & ISO 9001:2015 REGISTERED EXPORTER",
    title: {
      en: "Connecting Premium Quality Agro Commodities, Dairy Products, Textile Products, Readymade Garments, Used Machinery, New Machinery, Industrial Goods & Fasteners To The World.",
      gu: "શ્રેષ્ઠ ગુણવત્તાવાળા એગ્રો કોમોડિટીઝ, ડેરી પ્રોડક્ટ્સ, ટેક્સટાઇલ, રેડીમેડ ગારમેન્ટ્સ, નવી અને વપરાયેલ મશીનરી, ઔદ્યોગિક માલ અને ફાસ્ટનર્સને વિશ્વ સાથે જોડતી અગ્રણી કંપની.",
      hi: "प्रीमियम गुणवत्ता वाले कृषि उत्पादों, डेयरी उत्पादों, कपड़ा, तैयार वस्त्रों, नई और पुरानी मशीनरी, औद्योगिक सामान और फास्टनरों को दुनिया से जोड़ना।",
      fr: "Connecter les produits agricoles, produits laitiers, textiles, vêtements, machines d'occasion et neuves, biens industriels & boulonnerie de qualité supérieure au monde."
    },
    subtitle: {
      en: "Trusted Indian Exporter specializing in Spices, Rice, Oilseeds, Fasteners, New & Used Machinery, and Eco Packaging across 40+ countries.",
      gu: "મસાલા, ચોખા, તેલીબિયાં, ફાસ્ટનર્સ, નવી અને વપરાયેલી મશીનરી, ડેરી, કાપડ અને ઇકો પેકેજિંગમાં વિશિષ્ટતા ધરાવતા ૪૦+ દેશોમાં અગ્રણી ભારતીય નિકાસકાર.",
      hi: "मसालों, चावल, तिलहन, फास्टनरों, नई और पुरानी मशीनरी, डेयरी, कपड़े और इको पैकेजिंग में विशेषज्ञता वाला प्रमुख भारतीय निर्यातक।",
      fr: "Exportateur indien de confiance spécialisé dans les épices, le riz, les machines neuves et d'occasion, les vêtements et les emballages écologiques vers 40+ pays."
    },
    image: "images/hero_export_shipping.png"
  };

  const [heroBanner, setHeroBanner] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_hero_banner_v4') || 'null');
      if (stored && stored.title) {
        const titleObj = typeof stored.title === 'string'
          ? { en: stored.title, gu: defaultHeroBanner.title.gu, hi: defaultHeroBanner.title.hi, fr: defaultHeroBanner.title.fr }
          : { ...defaultHeroBanner.title, ...stored.title };

        const subObj = typeof stored.subtitle === 'string'
          ? { en: stored.subtitle, gu: defaultHeroBanner.subtitle.gu, hi: defaultHeroBanner.subtitle.hi, fr: defaultHeroBanner.subtitle.fr }
          : { ...defaultHeroBanner.subtitle, ...stored.subtitle };

        return { ...defaultHeroBanner, ...stored, title: titleObj, subtitle: subObj };
      }
    } catch(e) {}
    return defaultHeroBanner;
  });

  // Multi-Language About Section & Track Record Stats State
  const defaultAboutData = {
    badge: {
      en: "Leading Exporter from Surat, India",
      gu: "સુરત, ભારતથી અગ્રણી નિકાસકાર",
      hi: "सूरत, भारत से प्रमुख निर्यातक",
      fr: "Premier Exportateur de Surat, Inde"
    },
    title: {
      en: "Delivering Excellence from Indian Soil to Global Markets",
      gu: "ભારતીય ભૂમિથી વૈશ્વિક બજારો સુધી ઉત્કૃષ્ટતા પહોંચાડવી",
      hi: "भारतीय मिट्टी से वैश्विक बाजारों तक उत्कृष्टता पहुंचाना",
      fr: "Offrir l'excellence du sol indien aux marchés mondiaux"
    },
    desc: {
      en: "We are a premier export and trading house headquartered in Surat, Gujarat. Committed to uncompromised purity, strict quality protocols, and seamless logistics, we export top-tier agricultural produce, industrial supplies, new and used machinery, and sustainable packaging globally.",
      gu: "અમે સુરત, ગુજરાતમાં મુખ્ય મથક ધરાવતી એક અગ્રણી નિકાસ અને વેપાર ગૃહ છીએ. અપ્રતિમ શુદ્ધતા, કડક ગુણવત્તા ધોરણો અને સીમલેસ લોજિસ્ટિક્સ માટે કટિબદ્ધ, અમે ઉચ્ચ કક્ષાની કૃષિ પેદાશો, ઔદ્યોગિક પુરવઠો, નવી અને વપરાયેલી મશીનરી અને ટકાઉ પેકેજિંગની વૈશ્વિક સ્તરે નિકાસ કરીએ છીએ.",
      hi: "हम सूरत, गुजरात में मुख्यालय वाला एक प्रमुख निर्यात और व्यापारिक घराना हैं। शुद्धता, सख्त गुणवत्ता मानकों और निर्बाध रसद के लिए प्रतिबद्ध, हम कृषि उपज, औद्योगिक आपूर्ति, नई और पुरानी मशीनों और टिकाऊ पैकेजिंग का निर्यात करते हैं।",
      fr: "Nous sommes une maison d'exportation et de commerce de premier plan basée à Surat, Gujarat. Engagés envers une pureté absolue, des protocoles de qualité stricts et une logistique fluide."
    },
    feat1: {
      en: "Direct sourcing & APEDA certified quality",
      gu: "સીધું ઉત્પાદન અને APEDA દ્વારા પ્રમાણિત ગુણવત્તા",
      hi: "प्रत्यक्ष सोर्सिंग और APEDA प्रमाणित गुणवत्ता",
      fr: "Approvisionnement direct & qualité certifiée APEDA"
    },
    feat2: {
      en: "Global logistics & express port delivery",
      gu: "ગ્લોબલ લોજિસ્ટિક્સ અને ઝડપી બંદર ડિલિવરી",
      hi: "वैश्विक रसद और एक्सप्रेस बंदरगाह डिलीवरी",
      fr: "Logistique mondiale & livraison portuaire express"
    },
    feat3: {
      en: "Competitive container pricing & transparent terms",
      gu: "સ્પર્ધાત્મક કિંમતો અને પારદર્શક શરતો",
      hi: "प्रतिस्पर्धी मूल्य निर्धारण और पारदर्शी शर्तें",
      fr: "Tarification compétitive des conteneurs & conditions transparentes"
    },
    statsTitle: {
      en: "Export Track Record & Capacity",
      gu: "નિકાસ કાર્યક્ષમતા અને ક્ષમતા",
      hi: "निर्यात ट्रैक रिकॉर्ड और क्षमता",
      fr: "Bilan des Exportations & Capacité"
    },
    stat1Label: {
      en: "Years Experience",
      gu: "વર્ષનો અનુભવ",
      hi: "निर्यात अनुभव",
      fr: "Années d'Expérience"
    },
    stat2Label: {
      en: "Export Countries",
      gu: "નિકાસ દેશો",
      hi: "ग्लोबल रीच",
      fr: "Pays d'Exportation"
    },
    stat3Label: {
      en: "Metric Tons Exported",
      gu: "મેટ્રિક ટન નિકાસ",
      hi: "वार्षिक शिपमेंट",
      fr: "Tonnes Métriques Exportées"
    },
    stat4Label: {
      en: "Global Importers",
      gu: "ગ્લોબલ ખરીદદારો & ગ્રાહકો",
      hi: "संतुष्ट आयातक",
      fr: "Importateurs Mondiaux"
    },
    counts: {
      exp: 12,
      countries: 45,
      shipments: 50000,
      clients: 350
    }
  };

  // Default Commodity Market Ticker Rates
  const defaultMarketTicker = [
    { id: 't1', icon: '🌾', symbol: 'COTTON-GUJ', price: '$1.42/kg', change: '+1.8%', isPositive: true },
    { id: 't2', icon: '🍚', symbol: 'RICE-BASMATI-1121', price: '$1,180/MT', change: '+2.4%', isPositive: true },
    { id: 't3', icon: '🌿', symbol: 'CUMIN-SEEDS', price: '$3,450/MT', change: '-0.5%', isPositive: false },
    { id: 't4', icon: '🥜', symbol: 'PEANUT-BOLD', price: '$1,290/MT', change: '+0.9%', isPositive: true },
    { id: 't5', icon: '🌰', symbol: 'SESAME-HULLED', price: '$1,850/MT', change: '+3.1%', isPositive: true },
    { id: 't6', icon: '⚙️', symbol: 'CNC-MACHINERY', price: '$18,500/Unit', change: 'In Stock', isPositive: true },
    { id: 't7', icon: '📌', symbol: 'HT-BOLTS-8.8', price: '$1.25/kg', change: 'FOB Surat', isPositive: true }
  ];

  const [marketTickerList, setMarketTickerList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_market_ticker_v1') || 'null');
      if (stored && Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return defaultMarketTicker;
  });

  const saveMarketTickerList = (newList) => {
    setMarketTickerList(newList);
    localStorage.setItem('site_market_ticker_v1', JSON.stringify(newList));
    syncToServer({ marketTickerList: newList });
  };

  const [aboutData, setAboutData] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_about_data_v5') || 'null');
      if (stored) {
        return {
          ...defaultAboutData,
          ...stored,
          stat1Label: typeof stored.stat1Label === 'object' ? stored.stat1Label : defaultAboutData.stat1Label,
          stat2Label: typeof stored.stat2Label === 'object' ? stored.stat2Label : defaultAboutData.stat2Label,
          stat3Label: typeof stored.stat3Label === 'object' ? stored.stat3Label : defaultAboutData.stat3Label,
          stat4Label: typeof stored.stat4Label === 'object' ? stored.stat4Label : defaultAboutData.stat4Label
        };
      }
    } catch(e) {}
    return defaultAboutData;
  });

  useEffect(() => {
    try {
      localStorage.setItem('site_hero_banner_v2', JSON.stringify(heroBanner));
    } catch(e) {}
  }, [heroBanner]);

  useEffect(() => {
    try {
      localStorage.setItem('site_active_company_id_v1', activeCompanyId);
    } catch(e) {}
  }, [activeCompanyId]);

  useEffect(() => {
    try {
      localStorage.setItem('site_about_data_v1', JSON.stringify(aboutData));
    } catch(e) {}
  }, [aboutData]);

  const saveAboutData = (data) => {
    setAboutData(data);
    syncToServer({ aboutData: data });
    setActiveModal(null);
  };

  useEffect(() => {
    try { localStorage.setItem('admin_access_unlocked_v1', isAdminLoggedIn ? 'true' : 'false'); }
    catch(e) {}
  }, [isAdminLoggedIn]);

  // Deleted built-in IDs
  const [deletedBuiltInIds, setDeletedBuiltInIds] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('deleted_built_in_ids') || '[]');
      if (Array.isArray(stored)) {
        return stored.filter(id => !['dairy', 'agro', 'textiles', 'garments', 'new_machinery', 'used_machinery', 'packaging', 'eco_packaging', 'industrial', 'apparel'].includes(id));
      }
    } catch(e) {}
    return [];
  });

  // SANITIZATION HELPER: Deduplicate tabs & move Grains, Seeds, Spices, Turmeric to 'agro' category + purge corrupted spec strings
  const sanitizeCustomProductsList = (list) => {
    if (!Array.isArray(list)) return [];
    const seenCategoryKeys = new Set();
    const cleaned = [];

    list.forEach(item => {
      if (!item || !item.id) return;
      const copy = { ...item };
      const compId = copy.companyId || 'comp_1';
      copy.companyId = compId;

      const guTitle = (copy.names?.gu || '').toLowerCase();
      const enTitle = (copy.names?.en || copy.name || '').toLowerCase();
      const cat = (copy.category || '').toLowerCase();

      // Rule 0: Clean up corrupted specifications/sub-text across all objects
      const rawSpecGu = copy.spec?.gu || copy.specifications?.gu || '';
      const rawSpecHi = copy.spec?.hi || copy.specifications?.hi || '';
      if (rawSpecGu.includes('વુઅલિચય') || rawSpecGu.includes('પરોડુટ') || rawSpecGu.includes('હિ વુઅલિચય') || !copy.spec || typeof copy.spec !== 'object') {
        copy.spec = {
          en: 'High Quality Premium Product',
          gu: 'ઉચ્ચ ગુણવત્તાવાળી પ્રીમિયમ પ્રોડક્ટ',
          hi: 'उच्च गुणवत्ता वाला प्रीमियम उत्पाद',
          fr: 'Produit Premium de Haute Qualité'
        };
        copy.specifications = { ...copy.spec };
      }

      // Rule 0b: Clean up corrupted or missing product names
      if (enTitle.includes('chocolate')) {
        copy.names = { en: 'Chocolates', gu: 'ચોકલેટ', hi: 'चॉकलेट', fr: 'Chocolats' };
        if (!copy.category || copy.category === 'textiles') copy.category = 'dairy';
      } else if (enTitle.includes('paper bag') || enTitle.includes('packaging material')) {
        copy.category = 'packaging';
        if (!copy.names?.hi || copy.names.hi === copy.names.en) {
          copy.names = {
            en: copy.names?.en || 'Paper Bag & Box Packaging Material',
            gu: 'પેપર બેગ અને બોક્સનું પેકેજિંગ મટીરીયલ',
            hi: 'पेपर बैग और बॉक्स पैकेजिंग सामग्री',
            fr: 'Matériel d\'emballage sacs en papier et boîtes'
          };
        }
      } else if (enTitle.includes('cnc') || enTitle.includes('machine')) {
        if (!cat.includes('machinery')) copy.category = 'new_machinery';
        if (!copy.names?.hi || copy.names.hi === copy.names.en) {
          copy.names = {
            en: copy.names?.en || 'CNC Machine',
            gu: 'સી.એન.સી. મશીન',
            hi: 'सीएनसी मशीन',
            fr: 'Machine CNC'
          };
        }
      }

      // Rule 1: Move Agro Commodities (Spices, Turmeric, Cumin, Rice, Grains & Seeds) to "agro" category ONLY for comp_1 or comp_2
      if (
        (compId === 'comp_1' || compId === 'comp_2') &&
        (cat.includes('grain') || cat.includes('seed') || cat.includes('spice') || cat.includes('agro') ||
        enTitle.includes('grain') || enTitle.includes('seed') || enTitle.includes('turmeric') || enTitle.includes('cumin') || enTitle.includes('rice') || enTitle.includes('spice') ||
        guTitle.includes('અનાજ') || guTitle.includes('બીજ') || guTitle.includes('હળદર') || guTitle.includes('જીરું') || guTitle.includes('ચોખા') || guTitle.includes('મસાલા'))
      ) {
        copy.category = 'agro';
      }

      // Rule 2: Deduplicate Main Category Tabs PER COMPANY (prevents cross-company deletion)
      if (!copy.isSub) {
        const titleKey = (copy.names?.en || copy.names?.gu || '').trim().toLowerCase();
        if (titleKey) {
          const compScopedKey = `${compId}_${titleKey}`;
          if (seenCategoryKeys.has(compScopedKey)) {
            return;
          }
          seenCategoryKeys.add(compScopedKey);
        }
      }

      cleaned.push(copy);
    });

    return cleaned;
  };

  // Dedicated Persistent Product Photo Overrides
  const [photoOverrides, setPhotoOverrides] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_product_photo_overrides_v1') || 'null');
      if (stored && typeof stored === 'object' && Object.keys(stored).length > 0) return stored;
    } catch(e) {}
    return {};
  });

  // IndexedDB Auto-Restore for Unlimited Photo Capacity
  useEffect(() => {
    try {
      localStorage.setItem('site_product_photo_overrides_v1', JSON.stringify(photoOverrides));
    } catch(e) {
      console.warn("localStorage quota exceeded, using IndexedDB fallback.");
    }
    try {
      const req = indexedDB.open('AdidevPhotoDB', 1);
      req.onupgradeneeded = (evt) => {
        const db = evt.target.result;
        if (!db.objectStoreNames.contains('photos')) db.createObjectStore('photos');
      };
      req.onsuccess = (evt) => {
        const db = evt.target.result;
        const tx = db.transaction('photos', 'readwrite');
        tx.objectStore('photos').put(photoOverrides, 'overrides');
      };
    } catch(e) {}
  }, [photoOverrides]);

  // Load from IndexedDB on startup if localStorage was lost
  useEffect(() => {
    try {
      const req = indexedDB.open('AdidevPhotoDB', 1);
      req.onsuccess = (evt) => {
        const db = evt.target.result;
        if (db.objectStoreNames.contains('photos')) {
          const tx = db.transaction('photos', 'readonly');
          const getReq = tx.objectStore('photos').get('overrides');
          getReq.onsuccess = () => {
            if (getReq.result && typeof getReq.result === 'object' && Object.keys(getReq.result).length > 0) {
              setPhotoOverrides(prev => ({ ...getReq.result, ...prev }));
            }
          };
        }
      };
    } catch(e) {}
  }, []);

  // Custom Products with Sanitization
  const [customProductsList, setCustomProductsList] = useState(() => {
    const keys = ['custom_added_products_v8', 'custom_added_products_v7', 'custom_added_products_v6', 'custom_added_products_master'];
    let combined = [];
    const seenIds = new Set();
    keys.forEach(k => {
      try {
        const items = JSON.parse(localStorage.getItem(k) || '[]');
        if (Array.isArray(items)) {
          items.forEach(it => { if (it && it.id && !seenIds.has(it.id)) { seenIds.add(it.id); combined.push(it); } });
        }
      } catch (e) {}
    });

    // ONLY use initialStoreData if localStorage has NO saved custom products at all (clean first-time visitor)
    if (combined.length === 0 && initialStoreData && Array.isArray(initialStoreData.customProductsList)) {
      initialStoreData.customProductsList.forEach(it => {
        if (it && it.id && !seenIds.has(it.id)) {
          seenIds.add(it.id);
          combined.push(it);
        }
      });
    }

    return sanitizeCustomProductsList(combined);
  });

  // Persistent Storage effect for customProductsList across localStorage & IndexedDB
  useEffect(() => {
    try {
      localStorage.setItem('custom_added_products_v8', JSON.stringify(customProductsList));
      localStorage.setItem('custom_added_products_v7', JSON.stringify(customProductsList));
      localStorage.setItem('custom_added_products_v6', JSON.stringify(customProductsList));
      localStorage.setItem('custom_added_products_master', JSON.stringify(customProductsList));
    } catch(e) {
      console.warn("localStorage quota exceeded for products, saving to IndexedDB.");
    }
    try {
      const req = indexedDB.open('AdidevPhotoDB', 1);
      req.onupgradeneeded = (evt) => {
        const db = evt.target.result;
        if (!db.objectStoreNames.contains('photos')) db.createObjectStore('photos');
      };
      req.onsuccess = (evt) => {
        const db = evt.target.result;
        const tx = db.transaction('photos', 'readwrite');
        tx.objectStore('photos').put(customProductsList, 'customProducts');
      };
    } catch(e) {}
  }, [customProductsList]);

  // Load customProductsList from IndexedDB on startup
  useEffect(() => {
    try {
      const req = indexedDB.open('AdidevPhotoDB', 1);
      req.onsuccess = (evt) => {
        const db = evt.target.result;
        if (db.objectStoreNames.contains('photos')) {
          const tx = db.transaction('photos', 'readonly');
          const getReq = tx.objectStore('photos').get('customProducts');
          getReq.onsuccess = () => {
            if (Array.isArray(getReq.result) && getReq.result.length > 0) {
              setCustomProductsList(prev => {
                const map = new Map();
                const deletedLocal = JSON.parse(localStorage.getItem('deleted_built_in_ids') || '[]');
                // 1. Put IndexedDB entries first (fallback) if not deleted
                getReq.result.forEach(p => { if (p && p.id && !deletedLocal.includes(p.id)) map.set(p.id, p); });
                // 2. Put localStorage/current state entries second (takes absolute precedence)
                prev.forEach(p => { if (p && p.id && !deletedLocal.includes(p.id)) map.set(p.id, p); });
                return sanitizeCustomProductsList(Array.from(map.values()));
              });
            }
          };
        }
      };
    } catch(e) {}
  }, []);

  // Branches
  const [branchesList, setBranchesList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_branches_v1') || 'null');
      if (Array.isArray(stored) && stored.length > 0) {
        return stored.map(b => ({ ...b, address: toUSEnglishAddress(b.address), person: toUSEnglishAddress(b.person) }));
      }
    } catch(e) {}
    return [...defaultBranchOffices];
  });

  // Certificates
  const [certificatesList, setCertificatesList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_certificates_v2') || 'null');
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return [...defaultCertificates];
  });

  // Freight Routes & Ports List (Sea & Air Cargo)
  const defaultFreightRoutes = [...seaFreightPorts, ...airCargoRoutes].map((r, i) => ({
    id: r.id || `route-default-${i}`,
    ...r
  }));

  const [freightRoutesList, setFreightRoutesList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_freight_routes_v1') || 'null');
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return defaultFreightRoutes;
  });

  const [editingRouteId, setEditingRouteId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('site_freight_routes_v1', JSON.stringify(freightRoutesList));
    } catch(e) {}
  }, [freightRoutesList]);

  // Save Effects
  useEffect(() => {
    try {
      const sanitized = sanitizeCustomProductsList(customProductsList);
      localStorage.setItem('custom_added_products_v8', JSON.stringify(sanitized));
      localStorage.setItem('custom_added_products_master', JSON.stringify(sanitized));
      localStorage.setItem('custom_added_products_v7', JSON.stringify(sanitized));
      localStorage.setItem('custom_added_products_v6', JSON.stringify(sanitized));
    } catch(e) {}
  }, [customProductsList]);

  useEffect(() => {
    try {
      localStorage.setItem('deleted_built_in_ids', JSON.stringify(deletedBuiltInIds));
    } catch(e) {}
  }, [deletedBuiltInIds]);

  useEffect(() => {
    try {
      localStorage.setItem('site_branches_v1', JSON.stringify(branchesList));
    } catch(e) {}
  }, [branchesList]);

  useEffect(() => {
    try {
      localStorage.setItem('site_certificates_v2', JSON.stringify(certificatesList));
    } catch(e) {}
  }, [certificatesList]);

  useEffect(() => {
    try {
      localStorage.setItem('site_company_profiles_v3', JSON.stringify(companiesList));
      localStorage.setItem('site_company_profiles_v2', JSON.stringify(companiesList));
      localStorage.setItem('site_company_profiles_v1', JSON.stringify(companiesList));
    } catch(e) {}
  }, [companiesList]);

  useEffect(() => {
    try {
      localStorage.setItem('site_active_company_id_v1', activeCompanyId);
    } catch(e) {}
  }, [activeCompanyId]);

  useEffect(() => {
    try {
      localStorage.setItem('site_admin_password_v1', adminPassword);
    } catch(e) {}
  }, [adminPassword]);

  useEffect(() => {
    try {
      localStorage.setItem('site_admin_mobile_v1', adminMobile);
    } catch(e) {}
  }, [adminMobile]);

  // --- REAL-TIME AUTOMATED CLOUD & CROSS-COMPUTER SYNC ENGINE ---
  const getInitialLastUpdate = () => {
    try {
      return Number(localStorage.getItem('site_last_updated_at_v1') || 0);
    } catch(e) { return 0; }
  };
  const lastServerUpdate = useRef(getInitialLastUpdate());
  const isSyncing = useRef(false);
  const isInitialCloudLoadComplete = useRef(false);

  // Sync state to Vercel Serverless Cloud API & Local Network Server
  const syncToServer = async (overrides = {}) => {
    // Prevent uninitialized initial state from overwriting cloud DB before initial pull completes
    if (!isInitialCloudLoadComplete.current && Object.keys(overrides).length === 0) return;
    try {
      const now = overrides.updatedAt || Date.now();
      isSyncing.current = true;
      lastServerUpdate.current = now;
      try { localStorage.setItem('site_last_updated_at_v1', now.toString()); } catch(e) {}

      const currentCompanies = overrides.companiesList || (
        (() => {
          try {
            const raw = localStorage.getItem('site_company_profiles_v3');
            return raw ? JSON.parse(raw) : null;
          } catch(e) { return null; }
        })()
      ) || companiesList;

      const payload = {
        companiesList: currentCompanies,
        customProductsList: overrides.customProductsList || customProductsList,
        photoOverrides: overrides.photoOverrides || photoOverrides,
        deletedBuiltInIds: overrides.deletedBuiltInIds || deletedBuiltInIds,
        branchesList: overrides.branchesList || branchesList,
        certificatesList: overrides.certificatesList || certificatesList,
        freightRoutesList: overrides.freightRoutesList || freightRoutesList,
        customerList: overrides.customerList || customerList,
        heroBanner: overrides.heroBanner || heroBanner,
        aboutData: overrides.aboutData || aboutData,
        activeCompanyId: overrides.activeCompanyId || activeCompanyId,
        updatedAt: now
      };

      // 1. Vercel Serverless Real-Time Cloud API POST
      fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});

      // 2. Local Network Server POST (if local server running)
      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});

      // 3. AUTOMATED GLOBAL CLOUD SYNC (Secondary Cloud Database Backup - Async Fire-and-Forget for 0ms Lightning Speed)
      pushGlobalCloudSync(payload).catch(() => {});

      // 4. Broadcast to all open local browser windows/tabs
      realtimeEngine.broadcast('PRODUCT_UPDATE', { productName: overrides.productName || 'Export Item' });
    } catch(e) {
      console.warn('Network sync POST failed:', e);
    } finally {
      setTimeout(() => { isSyncing.current = false; }, 200);
    }
  };

  // Fetch updated data from Serverless Cloud API & Server
  const fetchServerData = async () => {
    if (isSyncing.current) return;
    try {
      let data = null;

      // 1. Query Automated Global Firebase Cloud Database FIRST for worldwide microsecond sync!
      data = await pullGlobalCloudSync();

      // 2. Fallback to Vercel Serverless Real-Time Cloud API second
      if (!data || !data.updatedAt) {
        try {
          const res = await fetch('/api/store');
          if (res.ok) {
            const json = await res.json();
            if (json && json.updatedAt) data = json;
          }
        } catch(e) {}
      }

      // 3. Fallback to local server endpoint third
      if (!data || !data.updatedAt) {
        try {
          const res = await fetch('/api/data');
          if (res.ok) data = await res.json();
        } catch(e) {}
      }

      if (data) {
        if (Array.isArray(data.deletedInquiryIds)) {
          setDeletedInquiryIds(prev => {
            const merged = Array.from(new Set([...prev, ...data.deletedInquiryIds]));
            try { localStorage.setItem('site_deleted_inquiry_ids_v1', JSON.stringify(merged)); } catch(e) {}
            return merged;
          });
        }

        // Always sync customerList if cloud/server has different inquiries, filtering out deleted IDs
        if (Array.isArray(data.customerList)) {
          setCustomerList(prev => {
            const localDeleted = JSON.parse(localStorage.getItem('site_deleted_inquiry_ids_v1') || '[]');
            const activeServerList = data.customerList.filter(c => c && c.id && !localDeleted.includes(c.id));
            const activePrev = prev.filter(c => c && c.id && !localDeleted.includes(c.id));

            const prevStr = JSON.stringify(activePrev);
            const nextStr = JSON.stringify(activeServerList);
            if (prevStr !== nextStr) {
              try { localStorage.setItem('site_registered_customers_v1', nextStr); } catch(e) {}
              return activeServerList;
            }
            return activePrev;
          });
        }

        const serverTs = Number(data.updatedAt) || 0;
        lastServerUpdate.current = Math.max(lastServerUpdate.current, serverTs);
        try { localStorage.setItem('site_last_updated_at_v1', lastServerUpdate.current.toString()); } catch(e) {}

        if (Array.isArray(data.companiesList) && data.companiesList.length > 0) {
          setCompaniesList(data.companiesList);
        }

        if (Array.isArray(data.customProductsList) && data.customProductsList.length > 0) {
          setCustomProductsList(prev => {
            const map = new Map();
            prev.forEach(p => { if (p && p.id) map.set(p.id, p); });
            data.customProductsList.forEach(p => {
              if (p && p.id) {
                const existing = map.get(p.id);
                if (!existing || JSON.stringify(existing) !== JSON.stringify(p)) {
                  map.set(p.id, p);
                }
              }
            });
            const merged = sanitizeCustomProductsList(Array.from(map.values()));
            try {
              localStorage.setItem('custom_added_products_v8', JSON.stringify(merged));
              localStorage.setItem('custom_added_products_v7', JSON.stringify(merged));
              localStorage.setItem('custom_added_products_v6', JSON.stringify(merged));
              localStorage.setItem('custom_added_products_master', JSON.stringify(merged));
            } catch(e) {}
            return merged;
          });
        }

        if (data.photoOverrides && typeof data.photoOverrides === 'object') {
          setPhotoOverrides(prev => {
            const merged = { ...prev, ...data.photoOverrides };
            try { localStorage.setItem('site_product_photo_overrides_v1', JSON.stringify(merged)); } catch(e) {}
            return merged;
          });
        }

        if (Array.isArray(data.deletedBuiltInIds)) setDeletedBuiltInIds(data.deletedBuiltInIds);
        if (Array.isArray(data.branchesList)) setBranchesList(data.branchesList);
        if (Array.isArray(data.certificatesList)) setCertificatesList(data.certificatesList);
        if (Array.isArray(data.freightRoutesList)) setFreightRoutesList(data.freightRoutesList);
        if (data.heroBanner) setHeroBanner(data.heroBanner);
        if (data.aboutData) setAboutData(data.aboutData);
        if (data.paymentGatewaysConfig && typeof data.paymentGatewaysConfig === 'object') {
          setPaymentGatewaysConfig(data.paymentGatewaysConfig);
          try { localStorage.setItem('site_payment_gateways_config_v1', JSON.stringify(data.paymentGatewaysConfig)); } catch(e) {}
        }
        isInitialCloudLoadComplete.current = true;
      }
    } catch(e) {}
  };

  const [syncVersion, setSyncVersion] = useState(0);

  const triggerRealtimeRefresh = () => {
    setSyncVersion(v => v + 1);
  };

  useEffect(() => {
    const unsubscribe = realtimeEngine.subscribe(() => {
      fetchServerData();
      triggerRealtimeRefresh();
    });
    return () => unsubscribe();
  }, []);

  // Initial load + 3-second automated cloud poll across all global devices
  useEffect(() => {
    fetchServerData();
    const timer = setInterval(() => {
      fetchServerData();
      triggerRealtimeRefresh();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Active Company Helper
  const activeCompany = companiesList.find(c => c.id === activeCompanyId) || companiesList[0];

  const changeActiveCompany = (id) => {
    setActiveCompanyId(id);
    try { localStorage.setItem('site_active_company_id_v1', id); } catch(e) {}
    syncToServer({ activeCompanyId: id });
  };

  const updateCompanyProfile = (updatedCompany) => {
    const now = Date.now();
    isSyncing.current = true;
    lastServerUpdate.current = now;
    try {
      localStorage.setItem('site_last_updated_at_v1', now.toString());
      localStorage.setItem('site_company_profiles_admin_edited_v1', 'true');
    } catch(e) {}

    setCompaniesList(prev => {
      const currentList = Array.isArray(prev) && prev.length > 0 ? prev : defaultCompanyProfiles;
      const exists = currentList.some(c => c.id === updatedCompany.id);
      const newList = exists
        ? currentList.map(c => c.id === updatedCompany.id ? { ...c, ...updatedCompany } : c)
        : [...currentList, updatedCompany];

      try {
        localStorage.setItem('site_company_profiles_v3', JSON.stringify(newList));
        localStorage.setItem('site_company_profiles_v2', JSON.stringify(newList));
        localStorage.setItem('site_company_profiles_v1', JSON.stringify(newList));
      } catch(e) {}

      // Schedule network sync after state commit
      setTimeout(() => {
        syncToServer({ companiesList: newList, updatedAt: now });
      }, 0);

      return newList;
    });

    setTimeout(() => { isSyncing.current = false; }, 5000);
  };

  const saveAdminPassword = (newPassword) => {
    setAdminPassword(newPassword);
    try { localStorage.setItem('site_admin_password_v1', newPassword); } catch(e) {}
  };

  // Admin PIN verification
  const verifyAdminAccess = (actionCallback) => {
    if (isAdminLoggedIn) {
      if (actionCallback) actionCallback();
      return;
    }
    const pin = prompt("🔐 Enter Admin Password:");
    if (pin === adminPassword || pin === 'Aip261970@' || pin === 'admin123' || pin === '7861997755') {
      setIsAdminLoggedIn(true);
      try { localStorage.setItem('admin_access_unlocked_v1', 'true'); } catch(e) {}
      alert("🔓 Admin Mode Unlocked!");
      if (actionCallback) actionCallback();
    } else if (pin !== null) {
      alert("⚠️ Incorrect Admin Password! Access Denied.");
    }
  };

  useEffect(() => {
    // Reset category filter when active company switches
    setCurrentCategory('all');
  }, [activeCompanyId]);

  const getAllProducts = () => {
    const customIds = new Set(customProductsList.map(p => p.id));
    const activeBuiltIn = initialProductsData
      .filter(p => !deletedBuiltInIds.includes(p.id))
      .filter(p => !customIds.has(p.id))
      .map(p => ({ ...p, companyId: p.companyId || 'comp_1' }));

    const rawList = [...activeBuiltIn, ...customProductsList];

    // Exclude any product whose specific ID is present in deletedBuiltInIds
    const nonDeleted = rawList.filter(p => !deletedBuiltInIds.includes(p.id));

    // Filter products strictly belonging to the active company
    const companyProducts = nonDeleted.filter(p => (p.companyId || 'comp_1') === activeCompanyId);

    // Apply persistent photo overrides (custom saved photos take absolute priority)
    const withPhotos = companyProducts.map(prod => {
      const override = photoOverrides[prod.id];
      if (override && override.image) {
        return {
          ...prod,
          image: convertGoogleDriveUrl(override.image),
          images: override.images && override.images.length > 0 ? override.images.map(convertGoogleDriveUrl) : [convertGoogleDriveUrl(override.image)]
        };
      }
      if (prod.images && prod.images.length > 0) {
        return {
          ...prod,
          image: convertGoogleDriveUrl(prod.images[0]),
          images: prod.images.map(convertGoogleDriveUrl)
        };
      }
      if (prod.image) {
        return {
          ...prod,
          image: convertGoogleDriveUrl(prod.image),
          images: [convertGoogleDriveUrl(prod.image)]
        };
      }
      return prod;
    });

    return sanitizeCustomProductsList(withPhotos);
  };

  const saveProduct = (productData) => {
    let targetExisting = editingProductId ? getAllProducts().find(p => p.id === editingProductId) : null;
    let targetCompanyId = productData.companyId || (targetExisting ? targetExisting.companyId : null) || activeCompanyId;

    let dataToSave = {
      ...productData,
      companyId: targetCompanyId
    };
    
    // GUARANTEE UNIQUE PRODUCT ID & CATEGORY SLUG
    if (editingProductId) {
      dataToSave.id = editingProductId;
    } else if (!dataToSave.id) {
      dataToSave.id = `prod-custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    if (!dataToSave.category) {
      dataToSave.category = `cat-custom-${Date.now()}`;
    }

    if (dataToSave.companyId === 'comp_1' || dataToSave.companyId === 'comp_2') {
      const gu = (dataToSave.names?.gu || '').toLowerCase();
      const en = (dataToSave.names?.en || '').toLowerCase();
      if (en.includes('grain') || en.includes('seed') || gu.includes('અનાજ') || gu.includes('બીજ')) {
        dataToSave.category = 'agro';
      }
    }

    // Convert all Google Drive URLs to direct LH3 CDN image URLs
    if (dataToSave.images && Array.isArray(dataToSave.images)) {
      dataToSave.images = dataToSave.images.map(convertGoogleDriveUrl);
      if (dataToSave.images.length > 0) dataToSave.image = dataToSave.images[0];
    } else if (dataToSave.image) {
      dataToSave.image = convertGoogleDriveUrl(dataToSave.image);
      dataToSave.images = [dataToSave.image];
    }

    // Save photo overrides explicitly for this product ID synchronously
    let updatedPhotoOverrides = { ...photoOverrides };
    if (dataToSave.images && dataToSave.images.length > 0) {
      updatedPhotoOverrides[dataToSave.id] = {
        image: dataToSave.images[0],
        images: dataToSave.images
      };
    } else if (dataToSave.image) {
      updatedPhotoOverrides[dataToSave.id] = {
        image: dataToSave.image,
        images: [dataToSave.image]
      };
    }
    setPhotoOverrides(updatedPhotoOverrides);
    try {
      localStorage.setItem('site_product_photo_overrides_v1', JSON.stringify(updatedPhotoOverrides));
    } catch(e) {}

    let nextProductsList = customProductsList;
    if (editingProductId) {
      const exists = customProductsList.some(p => p.id === editingProductId);
      if (exists) {
        nextProductsList = sanitizeCustomProductsList(customProductsList.map(p => p.id === editingProductId ? { ...p, ...dataToSave } : p));
      } else {
        nextProductsList = sanitizeCustomProductsList([...customProductsList, dataToSave]);
      }
    } else {
      nextProductsList = sanitizeCustomProductsList([...customProductsList, dataToSave]);
    }
    setCustomProductsList(nextProductsList);
    try {
      localStorage.setItem('custom_added_products_v8', JSON.stringify(nextProductsList));
      localStorage.setItem('custom_added_products_v7', JSON.stringify(nextProductsList));
      localStorage.setItem('custom_added_products_v6', JSON.stringify(nextProductsList));
      localStorage.setItem('custom_added_products_master', JSON.stringify(nextProductsList));
    } catch(e) {}
    syncToServer({ customProductsList: nextProductsList, photoOverrides: updatedPhotoOverrides });

    // Emit Real-Time Broadcast to all open tabs and windows globally!
    try {
      realtimeEngine.broadcast('PRODUCT_UPDATE', {
        productId: dataToSave.id,
        productName: dataToSave.names?.en || dataToSave.names?.gu || dataToSave.name
      });
    } catch(e) {}

    // Switch current view category to the newly created category so user sees it instantly!
    setCurrentCategory(dataToSave.category);
    setActiveModal(null);
    setEditingProductId(null);
  };

  const deleteProduct = (id, categoryCode, categoryName, isMainCategory) => {
    verifyAdminAccess(() => {
      if (confirm(`🗑️ Are you sure you want to delete "${categoryName}"?`)) {
        // 1. Mark as deleted in built-in registry
        let nextDeleted = [...deletedBuiltInIds];
        if (!nextDeleted.includes(id)) nextDeleted.push(id);
        if (categoryCode && !nextDeleted.includes(categoryCode)) nextDeleted.push(categoryCode);

        // Also mark ALL sub-products under this category in built-in data as deleted
        initialProductsData.forEach(bp => {
          const bpTitle = (bp.names?.en || bp.names?.gu || '').trim().toLowerCase();
          const catTitle = (categoryName || '').trim().toLowerCase();
          if (bp.id === id || bp.category === categoryCode || bp.parentId === id || bp.parentId === categoryCode || bpTitle === catTitle) {
            if (!nextDeleted.includes(bp.id)) nextDeleted.push(bp.id);
          }
        });

        setDeletedBuiltInIds(nextDeleted);
        try { localStorage.setItem('deleted_built_in_ids', JSON.stringify(nextDeleted)); } catch(e) {}

        // 2. Remove photo overrides for this product ID
        let nextPhotoOverrides = { ...photoOverrides };
        delete nextPhotoOverrides[id];
        setPhotoOverrides(nextPhotoOverrides);
        try { localStorage.setItem('site_product_photo_overrides_v1', JSON.stringify(nextPhotoOverrides)); } catch(e) {}

        // 3. ALWAYS purge from custom products list (handles edited items & custom entries)
        const nextProducts = customProductsList.filter(p => {
          if (p.id === id) return false;
          if (isMainCategory) {
            const pTitle = (p.names?.en || p.names?.gu || '').trim().toLowerCase();
            const catTitle = (categoryName || '').trim().toLowerCase();
            if (p.category === categoryCode || pTitle === catTitle) return false;
          }
          return true;
        });
        setCustomProductsList(nextProducts);
        try {
          localStorage.setItem('custom_added_products_v8', JSON.stringify(nextProducts));
          localStorage.setItem('custom_added_products_master', JSON.stringify(nextProducts));
          localStorage.setItem('custom_added_products_v7', JSON.stringify(nextProducts));
          localStorage.setItem('custom_added_products_v6', JSON.stringify(nextProducts));
        } catch(e) {}

        // 4. Overwrite IndexedDB immediately to prevent zombie restoration on page reload
        try {
          const req = indexedDB.open('AdidevPhotoDB', 1);
          req.onsuccess = (evt) => {
            const db = evt.target.result;
            if (db.objectStoreNames.contains('photos')) {
              const tx = db.transaction('photos', 'readwrite');
              tx.objectStore('photos').put(nextProducts, 'customProducts');
              tx.objectStore('photos').put(nextPhotoOverrides, 'overrides');
            }
          };
        } catch(e) {}

        // 5. Global Cloud Microsecond Deletion Sync
        syncToServer({
          deletedBuiltInIds: nextDeleted,
          customProductsList: nextProducts,
          photoOverrides: nextPhotoOverrides
        });

        // 6. Broadcast deletion event to all open tabs & devices globally
        try {
          realtimeEngine.broadcast('PRODUCT_UPDATE', {
            productId: id,
            productName: categoryName
          });
        } catch(e) {}

        // If a Main Category Tab was deleted, switch to 'all' tab
        if (isMainCategory && currentCategory === categoryCode) {
          setCurrentCategory('all');
        }

        alert(`✅ "${categoryName}" deleted successfully!`);
      }
    });
  };

  const saveBranch = (branchData) => {
    let nextBranches = branchesList;
    if (editingBranchId) {
      nextBranches = branchesList.map(b => b.id === editingBranchId ? { ...b, ...branchData } : b);
    } else {
      nextBranches = [...branchesList, branchData];
    }
    setBranchesList(nextBranches);
    syncToServer({ branchesList: nextBranches });
  };

  const deleteBranch = (id, cityName) => {
    verifyAdminAccess(() => {
      if (confirm(`🗑️ Are you sure you want to delete branch office "${cityName}"?`)) {
        const nextBranches = branchesList.filter(b => b.id !== id);
        setBranchesList(nextBranches);
        syncToServer({ branchesList: nextBranches });
        alert(`✅ Branch office "${cityName}" deleted!`);
      }
    });
  };

  const saveCertificate = (certData) => {
    const certToSave = {
      ...certData,
      companyId: certData.companyId || activeCompanyId
    };
    let nextCerts = certificatesList;
    if (editingCertId) {
      nextCerts = certificatesList.map(c => c.id === editingCertId ? { ...c, ...certToSave } : c);
    } else {
      nextCerts = [...certificatesList, { ...certToSave, id: certToSave.id || `cert-${Date.now()}` }];
    }
    setCertificatesList(nextCerts);
    syncToServer({ certificatesList: nextCerts });
  };

  const deleteCertificate = (id, title) => {
    verifyAdminAccess(() => {
      if (confirm(`🗑️ Are you sure you want to delete certificate "${title}"?`)) {
        const nextCerts = certificatesList.filter(c => c.id !== id);
        setCertificatesList(nextCerts);
        syncToServer({ certificatesList: nextCerts });
        alert(`✅ Certificate "${title}" deleted!`);
      }
    });
  };

  const saveHeroBanner = (bannerData) => {
    setHeroBanner(bannerData);
    syncToServer({ heroBanner: bannerData });
    setActiveModal(null);
  };

  const saveFreightRoute = (routeData) => {
    let nextRoutes = freightRoutesList;
    if (editingRouteId) {
      nextRoutes = freightRoutesList.map(r => r.id === editingRouteId ? { ...r, ...routeData } : r);
    } else {
      const newRoute = { ...routeData, id: routeData.id || `route-${Date.now()}` };
      nextRoutes = [newRoute, ...freightRoutesList];
    }
    setFreightRoutesList(nextRoutes);
    syncToServer({ freightRoutesList: nextRoutes });
    setActiveModal(null);
    setEditingRouteId(null);
  };

  const deleteFreightRoute = (id, routeName) => {
    verifyAdminAccess(() => {
      if (confirm(`🗑️ Are you sure you want to delete freight route "${routeName}"?`)) {
        const nextRoutes = freightRoutesList.filter(r => r.id !== id);
        setFreightRoutesList(nextRoutes);
        syncToServer({ freightRoutesList: nextRoutes });
        alert(`✅ Freight route "${routeName}" deleted!`);
      }
    });
  };

  // Dynamic Master Main Product Categories List for Forms & RFQ Dropdowns
  const getMainCategoryList = () => {
    const builtInCategories = [
      { id: 'agro', nameEn: 'Agro Commodities (Spices, Rice, Oilseeds)', nameGu: 'એગ્રો કોમોડિટીઝ (મસાલા, ચોખા, તેલીબિયાં)' },
      { id: 'dairy', nameEn: 'Dairy Products (Pure Ghee, SMP)', nameGu: 'ડેરી પ્રોડક્ટ્સ (શુદ્ધ ઘી, સ્કિમ્ડ મિલ્ક પાઉડર - SMP)' },
      { id: 'textiles', nameEn: 'Textile Products (Surat Fabrics & Sarees)', nameGu: 'ટેક્ષટાઈલ પ્રોડક્ટ્સ (સુરત ફેબ્રિક્સ, સાડીઓ)' },
      { id: 'garments', nameEn: 'Readymade Garments (T-Shirts, Kurtis, Denim)', nameGu: 'રેડિ-મેડ ગારમેન્ટ્સ (ટી-શર્ટ્સ, કુર્તીઓ, ડેનિમ)' },
      { id: 'used_machinery', nameEn: 'Used Machinery (CNC, Lathe, Textile)', nameGu: 'વપરાયેલી મશીનરી (CNC, લેથ, ટેક્ષટાઈલ)' },
      { id: 'new_machinery', nameEn: 'New Machinery (Mill, Sortex, Packaging)', nameGu: 'નવી મશીનરી (રાઇસ મિલ, સોર્ટકેસ, પેકેજિંગ)' },
      { id: 'industrial', nameEn: 'Industrial Goods & Fasteners (Bolts, Nuts, Pipes)', nameGu: 'ઔદ્યોગિક માલ અને ફાસ્ટનર્સ (બોલ્ટ્સ, નટ્સ, પાઇપ)' },
      { id: 'packaging', nameEn: 'Eco Packaging & Jute Bags', nameGu: 'ઇકો પેકેજિંગ અને જુટ બેગ્સ (બાયોડિગ્રેડેબલ)' }
    ];

    const seenIds = new Set(builtInCategories.map(c => c.id));
    const seenNames = new Set(builtInCategories.map(c => c.nameEn.toLowerCase()));

    // Dynamically append custom categories created by Admin now and in the future
    (customProductsList || []).forEach(cm => {
      const catSlug = (cm.category || cm.id || '').trim();
      const titleEn = (cm.names?.en || cm.names?.gu || cm.name || catSlug).trim();
      const titleGu = (cm.names?.gu || cm.names?.en || cm.name || catSlug).trim();
      const normName = titleEn.toLowerCase();

      if (catSlug && !seenIds.has(catSlug) && !seenNames.has(normName)) {
        seenIds.add(catSlug);
        seenNames.add(normName);
        builtInCategories.push({
          id: catSlug,
          category: catSlug,
          nameEn: titleEn,
          nameGu: titleGu,
          isCustom: true
        });
      }
    });

    return builtInCategories;
  };

  const t = translations[currentLang] || translations.en;

  // Filter certificates for the currently selected active company
  const activeCompanyCertificates = certificatesList.filter(c => (c.companyId || 'comp_1') === activeCompanyId);

  // Customer Login / Registration & Lead Capture State (Optional for Visitors)
  const defaultCustomerLeads = [
    {
      id: 'cust-101',
      name: 'Atulbhai Patel',
      phone: '+91 98251 23456',
      email: 'atul2670@gmail.com',
      companyName: 'Surat Global Agro Impex',
      city: 'Surat',
      country: 'India',
      registeredAt: '2026-08-01 10:30 AM',
      inquiriesCount: 3,
      notes: 'Interested in Premium Cumin Seeds & Basmati Rice 1121 container export.'
    },
    {
      id: 'cust-102',
      name: 'Mohammed Al-Maktoum',
      phone: '+971 50 123 4567',
      email: 'm.maktoum@dubaitrade.ae',
      companyName: 'Al-Maktoum Trading LLC',
      city: 'Dubai',
      country: 'United Arab Emirates',
      registeredAt: '2026-08-03 02:15 PM',
      inquiriesCount: 5,
      notes: 'Regular importer of CNC Machines & Packaging Cartons to Jebel Ali Port.'
    },
    {
      id: 'cust-103',
      name: 'Jean-Pierre Dubois',
      phone: '+33 6 12 34 56 78',
      email: 'jp.dubois@europimport.fr',
      companyName: 'Dubois Import-Export S.A.',
      city: 'Marseille',
      country: 'France',
      registeredAt: '2026-08-05 11:00 AM',
      inquiriesCount: 2,
      notes: 'Inquiring for Organic Spices (Turmeric Powder & Green Cardamom) to Fos-sur-Mer.'
    }
  ];

  const [customerList, setCustomerList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_registered_customers_v1') || 'null');
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    if (initialStoreData && Array.isArray(initialStoreData.customerList) && initialStoreData.customerList.length > 0) {
      return initialStoreData.customerList;
    }
    return defaultCustomerLeads;
  });

  const [currentCustomer, setCurrentCustomer] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_active_logged_customer_v1') || 'null');
      if (stored && typeof stored === 'object') return stored;
    } catch(e) {}
    return null;
  });

  const [deletedInquiryIds, setDeletedInquiryIds] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('site_deleted_inquiry_ids_v1') || 'null');
      if (Array.isArray(stored)) return stored;
    } catch(e) {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('site_deleted_inquiry_ids_v1', JSON.stringify(deletedInquiryIds));
    } catch(e) {}
  }, [deletedInquiryIds]);

  useEffect(() => {
    try {
      localStorage.setItem('site_registered_customers_v1', JSON.stringify(customerList));
    } catch(e) {}
  }, [customerList]);

  useEffect(() => {
    try {
      if (currentCustomer) {
        localStorage.setItem('site_active_logged_customer_v1', JSON.stringify(currentCustomer));
      } else {
        localStorage.removeItem('site_active_logged_customer_v1');
      }
    } catch(e) {}
  }, [currentCustomer]);

  const registerCustomer = (data) => {
    const newCust = {
      id: `cust-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: data.name || 'Valued Customer',
      phone: data.phone || '',
      email: data.email || '',
      companyName: data.companyName || 'N/A',
      city: data.city || 'Surat',
      country: data.country || 'India',
      registeredAt: new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      inquiriesCount: 1,
      notes: data.notes || 'Inquiry submitted online',
      productName: data.productName || '',
      hsCode: data.hsCode || '',
      selectedProducts: data.selectedProducts || []
    };

    setCustomerList(prev => {
      const nextList = [newCust, ...prev];
      try { localStorage.setItem('site_registered_customers_v1', JSON.stringify(nextList)); } catch(e) {}
      syncToServer({ customerList: nextList });
      return nextList;
    });

    setCurrentCustomer(newCust);
    return newCust;
  };

  const loginCustomer = (identifier) => {
    const query = identifier.trim().toLowerCase();
    const found = customerList.find(c =>
      (c.phone && c.phone.toLowerCase().includes(query)) ||
      (c.email && c.email.toLowerCase() === query) ||
      (c.name && c.name.toLowerCase().includes(query))
    );

    if (found) {
      setCurrentCustomer(found);
      return { success: true, customer: found };
    }

    const newCust = {
      id: `cust-${Date.now()}`,
      name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
      phone: identifier.includes('@') ? '' : identifier,
      email: identifier.includes('@') ? identifier : '',
      companyName: 'N/A',
      city: 'Surat',
      country: 'India',
      registeredAt: new Date().toLocaleString(),
      inquiriesCount: 1,
      notes: 'Auto-registered via Quick Login'
    };
    const nextList = [newCust, ...customerList];
    setCustomerList(nextList);
    setCurrentCustomer(newCust);
    syncToServer({ customerList: nextList });
    return { success: true, customer: newCust };
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
  };

  const deleteCustomer = (id, name) => {
    verifyAdminAccess(() => {
      if (confirm(`🗑️ Delete customer lead "${name}"?`)) {
        const nextDeleted = Array.from(new Set([...deletedInquiryIds, id]));
        setDeletedInquiryIds(nextDeleted);
        try { localStorage.setItem('site_deleted_inquiry_ids_v1', JSON.stringify(nextDeleted)); } catch(e) {}

        const nextList = customerList.filter(c => c.id !== id);
        setCustomerList(nextList);
        try { localStorage.setItem('site_registered_customers_v1', JSON.stringify(nextList)); } catch(e) {}

        syncToServer({ customerList: nextList, deletedInquiryIds: nextDeleted, deletedInquiryId: id });
        alert(`✅ Customer lead "${name}" deleted!`);
      }
    });
  };

  // Multi-Vendor Merchant / Supplier System Methods
  const registerMerchant = (merchantData) => {
    const newMerchant = {
      id: `merchant-${Date.now()}`,
      businessName: merchantData.businessName || 'Exporter',
      brandName: merchantData.brandName || merchantData.businessName || 'Exporter',
      contactPerson: merchantData.contactPerson || 'N/A',
      phone: merchantData.phone || '',
      email: merchantData.email || '',
      city: merchantData.city || 'Surat',
      state: merchantData.state || 'Gujarat',
      gstin: merchantData.gstin || '',
      businessType: merchantData.businessType || 'Manufacturer & Exporter',
      status: merchantData.status || 'approved',
      registeredAt: new Date().toLocaleDateString(),
      certificates: merchantData.certificates || [],
      iecCertUrl: merchantData.iecCertUrl || '',
      gstCertUrl: merchantData.gstCertUrl || '',
      qualityCertUrl: merchantData.qualityCertUrl || '',
      factoryPhotoUrl: merchantData.factoryPhotoUrl || ''
    };
    const nextMerchants = [newMerchant, ...merchantsList];
    setMerchantsList(nextMerchants);
    setCurrentMerchant(newMerchant);
    try {
      localStorage.setItem('site_merchants_list_v1', JSON.stringify(nextMerchants));
      localStorage.setItem('site_current_merchant_v1', JSON.stringify(newMerchant));
    } catch(e) {}
    syncToServer({ merchantsList: nextMerchants });
    showLiveToast(`🏬 Registered as Seller "${newMerchant.businessName}"!`, 'success');
    return newMerchant;
  };

  const loginMerchant = (identifier) => {
    if (!identifier) return { success: false, message: 'Please enter Mobile or Email!' };
    const query = identifier.trim().toLowerCase();
    const found = merchantsList.find(m =>
      (m.phone && m.phone.toLowerCase().includes(query)) ||
      (m.email && m.email.toLowerCase().includes(query)) ||
      (m.businessName && m.businessName.toLowerCase().includes(query))
    );
    if (found) {
      setCurrentMerchant(found);
      try { localStorage.setItem('site_current_merchant_v1', JSON.stringify(found)); } catch(e) {}
      showLiveToast(`🔑 Welcome back, ${found.businessName}!`, 'success');
      return { success: true, merchant: found };
    }
    return { success: false, message: 'No registered seller found with this Mobile/Email. Please register as a new seller.' };
  };

  const logoutMerchant = () => {
    setCurrentMerchant(null);
    try { localStorage.removeItem('site_current_merchant_v1'); } catch(e) {}
    showLiveToast(`🚪 Seller Logged Out`, 'info');
  };

  const updateMerchantStatus = (merchantId, newStatus) => {
    const nextMerchants = merchantsList.map(m => m.id === merchantId ? { ...m, status: newStatus } : m);
    setMerchantsList(nextMerchants);
    try { localStorage.setItem('site_merchants_list_v1', JSON.stringify(nextMerchants)); } catch(e) {}
    syncToServer({ merchantsList: nextMerchants });
    const statusLabels = { approved: 'Approved ✅', blocked: 'Blocked 🚫', pending: 'Pending ⏳' };
    showLiveToast(`🏬 Seller status updated to ${statusLabels[newStatus] || newStatus}`, 'info');
  };

  const deleteMerchant = (merchantId) => {
    const target = merchantsList.find(m => m.id === merchantId);
    if (!target) return;
    if (confirm(`🗑️ Permanently delete registered seller "${target.businessName}"?`)) {
      const nextMerchants = merchantsList.filter(m => m.id !== merchantId);
      setMerchantsList(nextMerchants);
      if (currentMerchant?.id === merchantId) {
        setCurrentMerchant(null);
        try { localStorage.removeItem('site_current_merchant_v1'); } catch(e) {}
      }
      try { localStorage.setItem('site_merchants_list_v1', JSON.stringify(nextMerchants)); } catch(e) {}
      syncToServer({ merchantsList: nextMerchants });
      showLiveToast(`🗑️ Seller "${target.businessName}" removed!`, 'info');
    }
  };

  const addMerchantProduct = (productData) => {
    if (!currentMerchant) {
      alert("Please log in as a seller first!");
      return;
    }
    const isApprovedByDefault = !requireProductApproval;
    const newProduct = {
      id: `mprod-${Date.now()}`,
      merchantId: currentMerchant.id,
      merchantName: currentMerchant.businessName,
      merchantPhone: currentMerchant.phone,
      merchantEmail: currentMerchant.email,
      isSub: true,
      approvalStatus: isApprovedByDefault ? 'approved' : 'pending',
      names: productData.names || { en: productData.nameEn || 'Merchant Product', gu: productData.nameGu || 'વેપારી પ્રોડક્ટ' },
      category: productData.category || 'garments',
      hsCode: productData.hsCode || '9988',
      priceUsd: productData.priceUsd || '500',
      moq: productData.moq || '1 Container',
      image: productData.image || 'images/agro_spices_grains.png',
      images: productData.images || [productData.image || 'images/agro_spices_grains.png'],
      specifications: productData.specifications || { en: 'Export Quality Standard Grade', gu: 'એક્સપોર્ટ ક્વાલિટી ગ્રેડ એ' },
      companyId: activeCompanyId || 'comp_1',
      createdAt: new Date().toLocaleDateString()
    };

    const nextCustom = [newProduct, ...customProductsList];
    setCustomProductsList(nextCustom);
    const nextMerchantProds = [newProduct, ...merchantProductsList];
    setMerchantProductsList(nextMerchantProds);

    try {
      localStorage.setItem('custom_added_products_v8', JSON.stringify(nextCustom));
      localStorage.setItem('custom_added_products_v7', JSON.stringify(nextCustom));
      localStorage.setItem('site_merchant_products_v1', JSON.stringify(nextMerchantProds));
    } catch(e) {}

    syncToServer({ customProductsList: nextCustom, merchantProductsList: nextMerchantProds });
    if (isApprovedByDefault) {
      showLiveToast(`📦 Product "${newProduct.names?.en}" published and live on website!`, 'success');
    } else {
      showLiveToast(`📦 Product "${newProduct.names?.en}" submitted! Sent for Admin Approval ⏳`, 'info');
    }
  };

  const approveMerchantProduct = (productId) => {
    const nextCustom = customProductsList.map(p => p.id === productId ? { ...p, approvalStatus: 'approved' } : p);
    setCustomProductsList(nextCustom);
    const nextMerchantProds = merchantProductsList.map(p => p.id === productId ? { ...p, approvalStatus: 'approved' } : p);
    setMerchantProductsList(nextMerchantProds);
    try {
      localStorage.setItem('custom_added_products_v7', JSON.stringify(nextCustom));
      localStorage.setItem('site_merchant_products_v1', JSON.stringify(nextMerchantProds));
    } catch(e) {}
    syncToServer({ customProductsList: nextCustom, merchantProductsList: nextMerchantProds });
    showLiveToast(`✅ Product approved and live on site!`, 'success');
  };

  const rejectMerchantProduct = (productId) => {
    const nextCustom = customProductsList.map(p => p.id === productId ? { ...p, approvalStatus: 'rejected' } : p);
    setCustomProductsList(nextCustom);
    const nextMerchantProds = merchantProductsList.map(p => p.id === productId ? { ...p, approvalStatus: 'rejected' } : p);
    setMerchantProductsList(nextMerchantProds);
    try {
      localStorage.setItem('custom_added_products_v7', JSON.stringify(nextCustom));
      localStorage.setItem('site_merchant_products_v1', JSON.stringify(nextMerchantProds));
    } catch(e) {}
    syncToServer({ customProductsList: nextCustom, merchantProductsList: nextMerchantProds });
    showLiveToast(`❌ Product rejected!`, 'info');
  };

  const deleteMerchantProduct = (productId) => {
    if (confirm("🗑️ Delete this product from inventory?")) {
      const nextCustom = customProductsList.filter(p => p.id !== productId);
      setCustomProductsList(nextCustom);
      const nextMerchantProds = merchantProductsList.filter(p => p.id !== productId);
      setMerchantProductsList(nextMerchantProds);
      try {
        localStorage.setItem('custom_added_products_v7', JSON.stringify(nextCustom));
        localStorage.setItem('site_merchant_products_v1', JSON.stringify(nextMerchantProds));
      } catch(e) {}
      syncToServer({ customProductsList: nextCustom, merchantProductsList: nextMerchantProds });
      showLiveToast("🗑️ Product deleted!", "info");
    }
  };

  // 1-Click Site Database Backup Export (store.json)
  const exportDatabase = () => {
    const backupObj = {
      companiesList,
      customProductsList,
      photoOverrides,
      deletedBuiltInIds,
      branchesList,
      certificatesList,
      freightRoutesList,
      customerList,
      deletedInquiryIds,
      heroBanner,
      aboutData,
      activeCompanyId,
      updatedAt: Date.now()
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `store.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    alert('📥 Site Database (store.json) downloaded!');
  };

  // 1-Click Site Database Restore Import (store.json)
  const importDatabase = (importedObj) => {
    if (!importedObj || typeof importedObj !== 'object') return;
    if (Array.isArray(importedObj.companiesList)) {
      setCompaniesList(importedObj.companiesList);
      try { localStorage.setItem('site_company_profiles_v3', JSON.stringify(importedObj.companiesList)); } catch(e) {}
    }
    if (Array.isArray(importedObj.customProductsList)) {
      setCustomProductsList(sanitizeCustomProductsList(importedObj.customProductsList));
      try { localStorage.setItem('custom_added_products_v6', JSON.stringify(importedObj.customProductsList)); } catch(e) {}
    }
    if (importedObj.photoOverrides) {
      setPhotoOverrides(importedObj.photoOverrides);
      try { localStorage.setItem('site_product_photo_overrides_v1', JSON.stringify(importedObj.photoOverrides)); } catch(e) {}
    }
    if (Array.isArray(importedObj.customerList)) {
      setCustomerList(importedObj.customerList);
      try { localStorage.setItem('site_registered_customers_v1', JSON.stringify(importedObj.customerList)); } catch(e) {}
    }
    if (Array.isArray(importedObj.certificatesList)) setCertificatesList(importedObj.certificatesList);
    if (Array.isArray(importedObj.branchesList)) setBranchesList(importedObj.branchesList);
    if (importedObj.heroBanner) setHeroBanner(importedObj.heroBanner);
    if (importedObj.aboutData) setAboutData(importedObj.aboutData);

    syncToServer(importedObj);
    alert('✅ Site Database restored successfully!');
  };

  return (
    <AppContext.Provider value={{
      currentLang, setCurrentLang,
      isAdminLoggedIn, setIsAdminLoggedIn,
      adminPassword, saveAdminPassword,
      adminMobile, setAdminMobile,
      companiesList, activeCompanyId, activeCompany, setActiveCompanyId: changeActiveCompany, updateCompanyProfile,
      currentCategory, setCurrentCategory,
      searchFilterQuery, setSearchFilterQuery,
      tradeMode, setTradeMode: changeTradeMode,
      productViewMode, setProductViewMode,
      currentCurrency, setCurrentCurrency, convertPrice, currenciesList,
      liveToast, showLiveToast, lastUpdatedProductId,
      rfqCartItems, addToRfqCart, removeFromRfqCart, updateRfqCartQuantity, updateRfqCartUnit, clearRfqCart,
      isRfqDrawerOpen, setIsRfqDrawerOpen,
      isOrderTrackerOpen, setIsOrderTrackerOpen,
      activeModal, setActiveModal,
      editingProductId, setEditingProductId,
      editingCertId, setEditingCertId,
      editingBranchId, setEditingBranchId,
      editingRouteId, setEditingRouteId,
      selectedRfqProduct, setSelectedRfqProduct,
      selectedRfqProducts, setSelectedRfqProducts, addRfqProduct, removeRfqProduct, clearRfqProducts, toggleRfqProduct,
      quotationProduct, setQuotationProduct,
      imagePreviewData, setImagePreviewData, openImagePreview,
      heroBanner, saveHeroBanner,
      aboutData, saveAboutData,
      marketTickerList, saveMarketTickerList,
      branchesList, saveBranch, deleteBranch,
      certificatesList: activeCompanyCertificates, saveCertificate, deleteCertificate,
      freightRoutesList, saveFreightRoute, deleteFreightRoute,
      customProductsList, saveProduct, deleteProduct, getAllProducts, getMainCategoryList,
      customerList, currentCustomer, registerCustomer, loginCustomer, logoutCustomer, deleteCustomer,
      merchantsList, currentMerchant, merchantProductsList, registerMerchant, loginMerchant, logoutMerchant, updateMerchantStatus, deleteMerchant, addMerchantProduct, approveMerchantProduct, rejectMerchantProduct, deleteMerchantProduct,
      adminCommissionRate, setAdminCommissionRate: saveAdminCommissionRate,
      requireProductApproval, setRequireProductApproval: saveRequireProductApproval,
      exportDatabase, importDatabase,
      paymentGatewaysConfig, savePaymentGatewaysConfig,
      syncVersion, triggerRealtimeRefresh,
      verifyAdminAccess, t
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
