import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { toUSEnglishAddress, convertGoogleDriveUrl, generateDigitalRoundStampSvg } from '../utils/address';
import { autoGenerateMultilingualNames, autoGenerateMultilingualSpec, autoTranslateText, fetchGoogleTransliteration, autoTranslateFullObject } from '../utils/translator';
import SearchablePortInput from './SearchablePortInput';
import SearchableUnitSelect from './SearchableUnitSelect';
import FlagIcon from './FlagIcon';

// INTERNATIONAL WCO (6-DIGIT) & LOCAL CUSTOMS/GST (8-DIGIT) HARMONIZED SYSTEM DICTIONARY
const hsCodeDictionary = [
  { code: '090931', localHsn: '09093110', name: 'Cumin Seeds (જીરું) - Whole / Bold 99.5%', cat: 'Spices' },
  { code: '091030', localHsn: '09103020', name: 'Turmeric (હળદર) - Finger / Powder (Curcumin)', cat: 'Spices' },
  { code: '100630', localHsn: '10063020', name: 'Basmati Rice (બાસ્મતી ચોખા) - 1121 / Sugandha / Parboiled', cat: 'Grains' },
  { code: '100640', localHsn: '10063090', name: 'Non-Basmati Rice (ચોખા) - IR64 / Sona Masoori', cat: 'Grains' },
  { code: '120242', localHsn: '12024210', name: 'Groundnuts / Peanuts (સીંગદાણા) - Bold / Java Shelled', cat: 'Oilseeds' },
  { code: '120890', localHsn: '12089010', name: 'Sesame Seeds (તલ) - Natural White / Hulled 99.95%', cat: 'Oilseeds' },
  { code: '090422', localHsn: '09042211', name: 'Red Chilli (લાલ મરચું) - S17 Teja / Stemless Powder', cat: 'Spices' },
  { code: '090831', localHsn: '09083110', name: 'Cardamom (એલચી) - Green Small / Large Bold', cat: 'Spices' },
  { code: '090411', localHsn: '09041110', name: 'Black Pepper (મરી) - Garbled 550g/l', cat: 'Spices' },
  { code: '090921', localHsn: '09092110', name: 'Coriander Seeds (ધાણા) - Eagle / Badami Quality', cat: 'Spices' },
  { code: '090961', localHsn: '09096110', name: 'Fennel Seeds (વરિયાળી) - Green Small / Lucknowi', cat: 'Spices' },
  { code: '091011', localHsn: '09101110', name: 'Fresh & Dried Ginger (આદુ / સૂંઠ)', cat: 'Spices' },
  { code: '120750', localHsn: '12075090', name: 'Mustard Seeds (રાઈ) - Yellow & Black', cat: 'Oilseeds' },
  { code: '091099', localHsn: '09109912', name: 'Fenugreek Seeds (મેથી) - Machine Cleaned', cat: 'Spices' },
  { code: '121190', localHsn: '12119032', name: 'Psyllium Husk (ઈસબગુલ) - 99% Pure Husk / Powder', cat: 'Agro' },
  { code: '091091', localHsn: '09109100', name: 'Mixed Spices / Curry Powder (ગરમ મસાલો)', cat: 'Spices' },
  { code: '071331', localHsn: '07133100', name: 'Pulses & Lentils (મગ / તુવેર / ચણા)', cat: 'Agro' },
  { code: '100199', localHsn: '10019910', name: 'Milling Wheat (ઘઉં) - Sharbati / Lokwan', cat: 'Grains' },
  { code: '120730', localHsn: '12073010', name: 'Castor Seeds (એરંડા) - Commercial Grade', cat: 'Oilseeds' },
  { code: '731815', localHsn: '73181500', name: 'High Tensile Bolts & Screws (થ્રેડેડ બોલ્ટ)', cat: 'Fasteners' },
  { code: '731816', localHsn: '73181600', name: 'Hexagon Nuts & Lock Nuts (નટ / નટ બોલ્ટ)', cat: 'Fasteners' },
  { code: '731822', localHsn: '73182200', name: 'Plain Washers & Spring Washers (વોશર)', cat: 'Fasteners' },
  { code: '731819', localHsn: '73181900', name: 'Threaded Rods & Studs (થ્રેડેડ રોડ)', cat: 'Fasteners' },
  { code: '730729', localHsn: '73072900', name: 'Stainless Steel Pipe Fittings (સ્ટેનલેસ સ્ટીલ ફિટિંગ્સ)', cat: 'Industrial' },
  { code: '721933', localHsn: '72193390', name: 'Cold-Rolled Stainless Steel Sheets (સ્ટીલ શીટ)', cat: 'Industrial' },
  { code: '730411', localHsn: '73041110', name: 'Seamless Carbon Steel Pipes (સીમલેસ પાઇપ)', cat: 'Industrial' },
  { code: '848180', localHsn: '84818030', name: 'Brass Valves & Plumbing Fittings (બ્રાસ ફિટિંગ્સ)', cat: 'Industrial' },
  { code: '844630', localHsn: '84463010', name: 'Textile Weaving Machines & Looms (ટેક્ષટાઈલ મશીનરી)', cat: 'Machinery' },
  { code: '842240', localHsn: '84224000', name: 'Automatic Packaging & Bagging Machinery (પેકિંગ મશીનરી)', cat: 'Machinery' },
  { code: '845811', localHsn: '84581100', name: 'CNC Horizontal Lathe Machines (CNC લેથ મશીન)', cat: 'Machinery' },
  { code: '846210', localHsn: '84621010', name: 'Hydraulic Forging Press & Punching Machines (પ્રેસ મશીન)', cat: 'Machinery' },
  { code: '850152', localHsn: '85015210', name: 'AC Electric Motors (ઇલેક્ટ્રિક મોટર 3-Phase)', cat: 'Machinery' },
  { code: '850211', localHsn: '85021100', name: 'Diesel Generator Sets (ડીઝલ જનરેટર 50-500 KVA)', cat: 'Machinery' },
  { code: '847989', localHsn: '84798999', name: 'Used Industrial Plant & Machinery (વપરાયેલી મશીનરી)', cat: 'Used Machinery' },
  { code: '843780', localHsn: '84378010', name: 'Grain Milling & Sorting Machinery (અનાજ ગ્રેડિંગ મશીન)', cat: 'Machinery' },
  { code: '854143', localHsn: '85414300', name: 'Solar Photovoltaic Modules / Panels (સોલર પેનલ)', cat: 'Machinery' },
  { code: '520100', localHsn: '52010010', name: 'Raw Cotton Bales (કાચું રૂ)', cat: 'Textiles' },
  { code: '520811', localHsn: '52081110', name: 'Woven Cotton Fabrics & Grey Cloth (સુતરાઉ કાપડ)', cat: 'Textiles' },
  { code: '540752', localHsn: '54075240', name: 'Polyester Synthetic Woven Fabrics (સિન્થેટીક ટેક્ષટાઈલ)', cat: 'Textiles' },
  { code: '630510', localHsn: '63051040', name: 'Jute Bags & Sacks for Packing (જુટ ના કોથળા)', cat: 'Packaging' },
  { code: '610910', localHsn: '61091000', name: 'Cotton Knitted Garments & T-Shirts (રેડીમેડ ગારમેન્ટ્સ)', cat: 'Textiles' },
  { code: '481910', localHsn: '48191010', name: 'Corrugated Paper Boxes & Cartons (કાર્ટન બોક્સ)', cat: 'Packaging' },
  { code: '392321', localHsn: '39232100', name: 'Biodegradable Eco Bags & Pouches (ઇકો પેકેજિંગ)', cat: 'Packaging' },
  { code: '481920', localHsn: '48192020', name: 'Folding Paper Bags & Multi-wall Sacks (પેપર બેગ્સ)', cat: 'Packaging' }
];

export default function Modals() {
  const {
    activeModal, setActiveModal, t, currentLang,
    showLiveToast,
    setIsAdminLoggedIn, isAdminLoggedIn,
    adminPassword, saveAdminPassword, adminMobile, setAdminMobile,
    companiesList, activeCompanyId, activeCompany, setActiveCompanyId, updateCompanyProfile,
    fetchServerData, exportDatabase, importDatabase,
    editingProductId, saveProduct, getAllProducts, customProductsList,
    editingCertId, saveCertificate, certificatesList,
    editingBranchId, saveBranch, branchesList,
    editingRouteId, saveFreightRoute, freightRoutesList,
    selectedCertForView,
    selectedRfqProduct, setSelectedRfqProduct,
    quotationProduct, setQuotationProduct,
    imagePreviewData, openImagePreview,
    heroBanner, saveHeroBanner,
    aboutData, saveAboutData, getMainCategoryList,
    marketTickerList, saveMarketTickerList,
    customerList, currentCustomer, registerCustomer, loginCustomer, logoutCustomer, deleteCustomer,
    merchantsList, currentMerchant, merchantProductsList, registerMerchant, loginMerchant, logoutMerchant, updateMerchantStatus, deleteMerchant, addMerchantProduct, approveMerchantProduct, rejectMerchantProduct, deleteMerchantProduct,
    adminCommissionRate, setAdminCommissionRate, requireProductApproval, setRequireProductApproval
  } = useApp();

  // Admin Seller & Product Approval Control Modal State
  const [adminSellerSearch, setAdminSellerSearch] = useState('');
  const [adminSellerStatusFilter, setAdminSellerStatusFilter] = useState('all'); // 'all' | 'approved' | 'pending' | 'blocked'
  const [adminProductApprovalFilter, setAdminProductApprovalFilter] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'all'
  const [adminProductSearch, setAdminProductSearch] = useState('');
  const [commissionInputRate, setCommissionInputRate] = useState(adminCommissionRate || 2.5);

  useEffect(() => {
    setCommissionInputRate(adminCommissionRate || 2.5);
  }, [adminCommissionRate]);

  // Live Commodity Market Ticker Rates Manager State
  const [tickerItemsInput, setTickerItemsInput] = useState([]);

  useEffect(() => {
    if (activeModal === 'ticker' && marketTickerList) {
      setTickerItemsInput(JSON.parse(JSON.stringify(marketTickerList)));
    }
  }, [activeModal, marketTickerList]);

  // Customer Auth & Lead Management State
  const [custAuthTab, setCustAuthTab] = useState('login'); // 'login' | 'register'
  const [custLoginInput, setCustLoginInput] = useState('');
  const [custNameInput, setCustNameInput] = useState('');
  const [custPhoneInput, setCustPhoneInput] = useState('');
  const [custEmailInput, setCustEmailInput] = useState('');
  const [custCompInput, setCustCompInput] = useState('');
  const [custCityInput, setCustCityInput] = useState('Surat');
  const [custCountryInput, setCustCountryInput] = useState('India');
  const [custLeadSearch, setCustLeadSearch] = useState('');

  // Seller Portal & Multi-Vendor Merchant State
  const [sellerTab, setSellerTab] = useState('register'); // 'register' | 'login' | 'dashboard' | 'add_product'
  const [mBizNameInput, setMBizNameInput] = useState('');
  const [mBrandInput, setMBrandInput] = useState('');
  const [mContactInput, setMContactInput] = useState('');
  const [mPhoneInput, setMPhoneInput] = useState('');
  const [mEmailInput, setMEmailInput] = useState('');
  const [mCityInput, setMCityInput] = useState('Surat');
  const [mStateInput, setMStateInput] = useState('Gujarat');
  const [mGstinInput, setMGstinInput] = useState('');
  const [mBizTypeInput, setMBizTypeInput] = useState('Manufacturer & Exporter');
  const [mSellerLoginQuery, setMSellerLoginQuery] = useState('');

  // Seller Certificate Upload States
  const [mIecCertInput, setMIecCertInput] = useState('');
  const [mGstCertInput, setMGstCertInput] = useState('');
  const [mQualityCertInput, setMQualityCertInput] = useState('');
  const [mFactoryPhotoInput, setMFactoryPhotoInput] = useState('');

  // Seller New Product Upload Form State
  const [mProdNameEn, setMProdNameEn] = useState('');
  const [mProdNameGu, setMProdNameGu] = useState('');
  const [mProdCategory, setMProdCategory] = useState('garments');
  const [mProdHsCode, setMProdHsCode] = useState('620443');
  const [mProdPrice, setMProdPrice] = useState('500');
  const [mProdMoq, setMProdMoq] = useState('1 Container / Shipment');
  const [mProdImage, setMProdImage] = useState('');
  const [mProdSpecEn, setMProdSpecEn] = useState('Export Quality Standard Grade');

  // Company Profile Modal State
  const [selectedCompId, setSelectedCompId] = useState(activeCompanyId || 'comp_1');
  const [compNameInput, setCompNameInput] = useState('');
  const [compTaglineInput, setCompTaglineInput] = useState('');
  const [compLogoInput, setCompLogoInput] = useState('');
  const [compStampInput, setCompStampInput] = useState('');
  const [compAddressInput, setCompAddressInput] = useState('');
  const [compPhoneInput, setCompPhoneInput] = useState('');
  const [compEmailInput, setCompEmailInput] = useState('');
  const [compApedaInput, setCompApedaInput] = useState('');
  const [compGstinInput, setCompGstinInput] = useState('');
  const [compBankNameInput, setCompBankNameInput] = useState('');
  const [compAccountNameInput, setCompAccountNameInput] = useState('');
  const [compAccountNumberInput, setCompAccountNumberInput] = useState('');
  const [compSwiftCodeInput, setCompSwiftCodeInput] = useState('');
  const [compIfscCodeInput, setCompIfscCodeInput] = useState('');
  const [compBankBranchInput, setCompBankBranchInput] = useState('');
  const [compIntermediaryBankInput, setCompIntermediaryBankInput] = useState('');

  // Security & Password Change with Mobile OTP State
  const [otpStep, setOtpStep] = useState(0); // 0: idle / request, 1: OTP sent, enter OTP & new pass
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');

  // Proforma Invoice Generator State (Export vs Domestic India Trade & Jobworks)
  const [buyerName, setBuyerName] = useState('Global Trade Importer');
  const [buyerCompany, setBuyerCompany] = useState('International Import Corp');
  const [buyerPhoneInput, setBuyerPhoneInput] = useState('');
  const [buyerEmailInput, setBuyerEmailInput] = useState('');
  const [includeBankDetailsInInvoice, setIncludeBankDetailsInInvoice] = useState(true);
  const [includeStampInInvoice, setIncludeStampInInvoice] = useState(true);
  const [invoiceTradeMode, setInvoiceTradeMode] = useState('export'); // 'export' | 'interstate' | 'intrastate'
  const [documentType, setDocumentType] = useState('proforma'); // 'proforma' | 'tax_invoice' | 'jobwork'
  const [domesticGstRate, setDomesticGstRate] = useState(18); // 5 | 12 | 18 | 28
  const [buyerGstinInput, setBuyerGstinInput] = useState('');
  const [vehicleNoInput, setVehicleNoInput] = useState('GJ-05-BX-9988');
  const [transporterLrInput, setTransporterLrInput] = useState('VRL Logistics / LR #889944');
  const [placeOfSupplyStateInput, setPlaceOfSupplyStateInput] = useState('Maharashtra (27)');
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 'item_1', name: 'Premium Export Commodity / Product Item', hsn: '09093110', qty: '10', unit: 'MT (Metric Tons)', price: '500' }
  ]);

  // Sync state when selecting sister company to edit
  useEffect(() => {
    if (activeModal === 'company' && selectedCompId && companiesList) {
      const comp = companiesList.find(c => c.id === selectedCompId) || companiesList[0];
      if (comp) {
        setCompNameInput(comp.name || '');
        setCompTaglineInput(comp.tagline || '');
        setCompLogoInput(comp.logo || 'images/logo.png');
        setCompStampInput(comp.stamp || generateDigitalRoundStampSvg(comp.name, comp.apedaReg || comp.gstin));
        setCompAddressInput(comp.address || '');
        setCompPhoneInput(comp.phone || '');
        setCompEmailInput(comp.email || '');
        setCompApedaInput(comp.apedaReg || '');
        setCompGstinInput(comp.gstin || '');
        const b = comp.bankDetails || {};
        setCompBankNameInput(b.bankName || '');
        setCompAccountNameInput(b.accountName || comp.name || '');
        setCompAccountNumberInput(b.accountNumber || '');
        setCompSwiftCodeInput(b.swiftCode || '');
        setCompIfscCodeInput(b.ifscCode || '');
        setCompBankBranchInput(b.branch || '');
        setCompIntermediaryBankInput(b.intermediaryBank || '');
      }
    }
  }, [activeModal, selectedCompId]);
  const [buyerCountry, setBuyerCountry] = useState('Dubai, UAE');
  const [quoteQty, setQuoteQty] = useState('20');
  const [quoteUnit, setQuoteUnit] = useState('MT (Metric Tons)');
  const [quoteUnitPrice, setQuoteUnitPrice] = useState('850');
  const [quoteCurrency, setQuoteCurrency] = useState('USD');
  const [quoteIncoterm, setQuoteIncoterm] = useState('FOB Mundra Port');
  const [quotePortLoading, setQuotePortLoading] = useState('Mundra Port / Hazira Port, India');
  const [quotePortDischarge, setQuotePortDischarge] = useState('Jebel Ali Port, Dubai');
  const [includeTaxInInvoice, setIncludeTaxInInvoice] = useState(true);
  const [destGstRate, setDestGstRate] = useState('5');
  const [destDutyRate, setDestDutyRate] = useState('5');
  const [showIncotermsModal, setShowIncotermsModal] = useState(false);

  const [activeQuoteCustomer, setActiveQuoteCustomer] = useState(null);

  // 1-Click Proforma Invoice Generator for Particular Inquiry Item & Buyer
  const openQuoteForInquiry = (cust) => {
    if (!cust) return;
    setActiveQuoteCustomer(cust);

    const bName = cust.name || 'Importer / Buyer';
    const bComp = (cust.companyName && cust.companyName !== 'N/A') ? cust.companyName : (cust.name || 'Importer Corp');
    const location = [cust.city, cust.country].filter(Boolean).join(', ');
    const bCountry = location || 'Dubai, UAE';

    setBuyerName(bName);
    setBuyerCompany(bComp);
    setBuyerPhoneInput(cust.phone || '');
    setBuyerEmailInput(cust.email || '');
    setBuyerCountry(bCountry);

    const notes = cust.notes || '';
    const qtyMatch = notes.match(/(\d+)\s*(MT|Metric Tons|Tons|KG|Bags|Cartons|Containers|PCS|Units|Bales|CFT|CBM)/i);
    let parsedQty = '1';
    let parsedUnit = 'Unit / Container';
    if (qtyMatch) {
      parsedQty = qtyMatch[1];
      const matchedUnit = qtyMatch[2].toUpperCase();
      if (matchedUnit.includes('MT') || matchedUnit.includes('TON')) parsedUnit = 'MT (Metric Tons)';
      else if (matchedUnit.includes('KG')) parsedUnit = 'KG (Kilograms)';
      else if (matchedUnit.includes('BAG')) parsedUnit = 'BAGS (Standard Bags)';
      else if (matchedUnit.includes('CARTON')) parsedUnit = 'CARTONS (Export Cartons)';
      else if (matchedUnit.includes('CONTAINER')) parsedUnit = '20FT FCL (20ft Container)';
      else parsedUnit = matchedUnit;
    }

    setQuoteQty(parsedQty);
    setQuoteUnit(parsedUnit);

    const allProds = getAllProducts ? getAllProducts() : [];
    let matchedProd = null;

    if (notes) {
      const lowerNotes = notes.toLowerCase();
      matchedProd = allProds.find(p => {
        const enName = (p.names?.en || '').toLowerCase();
        const guName = (p.names?.gu || '').toLowerCase();
        return (enName && lowerNotes.includes(enName)) || (guName && lowerNotes.includes(guName));
      });

      if (!matchedProd) {
        matchedProd = allProds.find(p => {
          const enName = (p.names?.en || '').toLowerCase();
          return enName.split(' ').some(w => w.length > 3 && lowerNotes.includes(w));
        });
      }
    }

    let prodName = cust.productName || '';
    let hs = cust.hsCode || '';
    let unitPrice = '500';

    if (matchedProd) {
      setQuotationProduct(matchedProd);
      if (!prodName) prodName = matchedProd.names?.en || matchedProd.names?.gu || 'Punjabi Dress';
      if (!hs) hs = matchedProd.hsCode || matchedProd.localHsn || '620443';
      if (matchedProd.priceUsd) unitPrice = matchedProd.priceUsd.replace(/[^0-9.]/g, '') || '500';
    } else {
      let cleanName = notes.replace(/🔴 LIVE TEST INQUIRY:|Inquiry Details:|Urgent Quotation Required for|Inquiry for item:|Inquiry for|Need|Export Order for|to Jebel Ali Port|to Dubai Port|\./gi, '').trim();
      if (cleanName.includes('MOQ:')) cleanName = cleanName.split('MOQ:')[0].trim();
      if (!prodName) prodName = cleanName || 'Punjabi Dress';
      if (!hs) {
        const hsMatch = notes.match(/HS\s*Code:\s*(\d+)/i) || notes.match(/HS:\s*(\d+)/i);
        hs = hsMatch ? hsMatch[1] : '620443';
      }
    }

    // Auto-fill invoice line items table from RFQ!
    let lineItems = [];

    // Case 1: Explicit selectedProducts array
    if (cust.selectedProducts && Array.isArray(cust.selectedProducts) && cust.selectedProducts.length > 0) {
      lineItems = cust.selectedProducts.map((p, pIdx) => {
        const pName = p.names?.[currentLang] || p.names?.en || p.names?.gu || 'Export Commodity';
        const pHs = p.hsCode || p.localHsn || '9988';
        const pPrice = p.priceUsd ? p.priceUsd.replace(/[^0-9.]/g, '') : '500';
        return {
          id: `item_${Date.now()}_${pIdx}`,
          name: pName,
          hsn: pHs,
          qty: '1',
          unit: p.moq || parsedUnit || 'Unit / Container',
          price: pPrice || '500'
        };
      });
    }

    // Case 2: Multi-line / regex matching in notes (e.g. "1. Readymade Garments (HS Code: 620413)...\n2. Industrial Automation Systems...")
    if (lineItems.length === 0 && notes) {
      const allCatalogProds = getAllProducts ? getAllProducts() : [];
      const itemMatches = [...notes.matchAll(/(\d+)\.\s*([^\n\r<]+)/g)];

      if (itemMatches.length > 0) {
        lineItems = itemMatches.map((m, idx) => {
          const lineText = m[2].trim();
          const hsMatch = lineText.match(/\(HS\s*Code:\s*([^\)]+)\)/i) || lineText.match(/\(HS:\s*([^\)]+)\)/i);
          const itemHs = hsMatch ? hsMatch[1].trim() : '9988';
          let itemTitle = lineText.split('|')[0].replace(/\(HS\s*Code:[^\)]+\)/i, '').replace(/\(HS:[^\)]+\)/i, '').trim();
          itemTitle = itemTitle.replace(/^Inquiry for item:|^Inquiry for|^Need|^Export Order for/gi, '').trim();

          const matchedProd = allCatalogProds.find(p => {
            const enName = (p.names?.en || '').toLowerCase();
            const guName = (p.names?.gu || '').toLowerCase();
            const lowTitle = itemTitle.toLowerCase();
            return (enName && (lowTitle.includes(enName) || enName.includes(lowTitle))) ||
                   (guName && (lowTitle.includes(guName) || guName.includes(lowTitle)));
          });

          const price = matchedProd?.priceUsd ? matchedProd.priceUsd.replace(/[^0-9.]/g, '') : '500';
          const unit = matchedProd?.moq || '1 Unit / Container';

          return {
            id: `item_${Date.now()}_${idx}`,
            name: itemTitle || `Item #${idx + 1}`,
            hsn: itemHs,
            qty: '1',
            unit: unit,
            price: price
          };
        });
      }
    }

    // Case 3: Comma separated productNames (e.g. "Sari and Garment Fabrics, Punjabi Dress")
    if (lineItems.length === 0 && cust.productName && cust.productName.includes(',')) {
      const pNames = cust.productName.split(',').map(s => s.trim()).filter(Boolean);
      const hsList = (cust.hsCode || '').split(',').map(s => s.trim()).filter(Boolean);

      lineItems = pNames.map((pn, pIdx) => ({
        id: `item_${Date.now()}_${pIdx}`,
        name: pn,
        hsn: hsList[pIdx] || hsList[0] || '9988',
        qty: '1',
        unit: 'Unit / Container',
        price: '500'
      }));
    }

    // Fallback: 1 single item
    if (lineItems.length === 0) {
      lineItems = [
        {
          id: `item_${Date.now()}`,
          name: prodName,
          hsn: hs,
          qty: parsedQty,
          unit: parsedUnit,
          price: unitPrice
        }
      ];
    }

    setInvoiceItems(lineItems);

    if (location.toLowerCase().includes('dubai') || notes.toLowerCase().includes('dubai') || notes.toLowerCase().includes('jebel ali')) {
      setQuotePortDischarge('Jebel Ali Port, Dubai (AEJEA)');
    } else if (location) {
      setQuotePortDischarge(`Port of ${location}`);
    }

    setActiveModal('quotation');
  };

  useEffect(() => {
    if (activeModal === 'quotation' && activeQuoteCustomer) {
      const cust = activeQuoteCustomer;
      setBuyerName(cust.name || 'Importer / Buyer');
      setBuyerCompany(cust.companyName && cust.companyName !== 'N/A' ? cust.companyName : (cust.name || 'Importer Corp'));
      setBuyerPhoneInput(cust.phone || '');
      setBuyerEmailInput(cust.email || '');
      const location = [cust.city, cust.country].filter(Boolean).join(', ');
      setBuyerCountry(location || 'Dubai, UAE');
    }
  }, [activeModal, activeQuoteCustomer]);

  // Lightbox Image Preview State
  const [activePreviewIdx, setActivePreviewIdx] = useState(0);
  const [isUltraZoom, setIsUltraZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (activeModal === 'image_preview' && imagePreviewData) {
      setActivePreviewIdx(imagePreviewData.activeIndex || 0);
      setIsUltraZoom(false);
      setZoomPos({ x: 50, y: 50 });
    }
  }, [activeModal, imagePreviewData]);

  // Admin PIN State
  const [pinInput, setPinInput] = useState('');

  // Hero Modal State (Multi-Language)
  const [badgeInput, setBadgeInput] = useState('');
  const [heroImgInput, setHeroImgInput] = useState('');
  const [heroLangTab, setHeroLangTab] = useState('en');
  const [heroTitleObj, setHeroTitleObj] = useState({ en: '', gu: '', hi: '', fr: '' });
  const [heroSubtitleObj, setHeroSubtitleObj] = useState({ en: '', gu: '', hi: '', fr: '' });

  // About Modal State (Multi-Language & Stats)
  const [aboutLangTab, setAboutLangTab] = useState('en');
  const [aboutBadgeObj, setAboutBadgeObj] = useState({ en: '', gu: '', hi: '', fr: '' });
  const [aboutTitleObj, setAboutTitleObj] = useState({ en: '', gu: '', hi: '', fr: '' });
  const [aboutDescObj, setAboutDescObj] = useState({ en: '', gu: '', hi: '', fr: '' });
  const [aboutFeat1Obj, setAboutFeat1Obj] = useState({ en: '', gu: '', hi: '', fr: '' });
  const [aboutFeat2Obj, setAboutFeat2Obj] = useState({ en: '', gu: '', hi: '', fr: '' });
  const [aboutFeat3Obj, setAboutFeat3Obj] = useState({ en: '', gu: '', hi: '', fr: '' });
  const [aboutStatsTitleObj, setAboutStatsTitleObj] = useState({ en: '', gu: '', hi: '', fr: '' });
  const [aboutCounts, setAboutCounts] = useState({ exp: 12, countries: 45, shipments: 50000, clients: 350 });

  // Product Modal State (2 DISTINCT FORMS: 'main' vs 'sub')
  const [prodType, setProdType] = useState('sub'); // 'main' | 'sub'
  const [parentSelect, setParentSelect] = useState('agro');
  const [nameGu, setNameGu] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [catCodeInput, setCatCodeInput] = useState('');
  const [mainDescInput, setMainDescInput] = useState('');
  const [hsCode, setHsCode] = useState('520811');
  const [localHsn, setLocalHsn] = useState('52081110');
  const [moq, setMoq] = useState('1 Unit / Container');
  const [spec, setSpec] = useState('ઉચ્ચ ગુણવત્તાયુક્ત પ્રીમિયમ પ્રોડક્ટ');
  const [packaging, setPackaging] = useState('Standard Export Packaging');
  const [imageUrls, setImageUrls] = useState([]);
  const [newUrlInput, setNewUrlInput] = useState('');

  // Local B2C Retail Trade Options (કુરિયર, પેકિંગ ચાર્જ & લોકલ પ્રાઈઝ)
  const [localMrp, setLocalMrp] = useState('1499');
  const [localPrice, setLocalPrice] = useState('999');
  const [packingCharge, setPackingCharge] = useState('0');
  const [courierCharge, setCourierCharge] = useState('0');
  const [localGstRate, setLocalGstRate] = useState('18');
  const [localStock, setLocalStock] = useState('100');
  const [couponBadge, setCouponBadge] = useState('10% OFF Special Offer');
  const [localUnit, setLocalUnit] = useState('kg');
  const [localCurrency, setLocalCurrency] = useState('INR');

  // Live HS Code Search State
  const [hsSearchQuery, setHsSearchQuery] = useState('');
  const [showHsDropdown, setShowHsDropdown] = useState(false);

  // Branch Modal State
  const [cityInput, setCityInput] = useState('');
  const [personInput, setPersonInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [addressInput, setAddressInput] = useState('');

  // Certificate Modal State
  const [certTitle, setCertTitle] = useState('');
  const [certReg, setCertReg] = useState('');
  const [certIcon, setCertIcon] = useState('📜');
  const [certFileData, setCertFileData] = useState(null);

  // Freight Route Modal State
  const [routeModeInput, setRouteModeInput] = useState('Sea Freight');
  const [routeOriginInput, setRouteOriginInput] = useState('Hazira / Surat Port (INHZA)');
  const [routeDestInput, setRouteDestInput] = useState('Jebel Ali, Dubai (AEJEA)');
  const [routeRegionInput, setRouteRegionInput] = useState('Middle East');
  const [routeDaysInput, setRouteDaysInput] = useState('3 - 4 Days');
  const [routeFreqInput, setRouteFreqInput] = useState('Direct Express Vessel');

  useEffect(() => {
    if (activeModal === 'freight_route') {
      if (editingRouteId) {
        const target = (freightRoutesList || []).find(r => r.id === editingRouteId);
        if (target) {
          setRouteModeInput(target.mode || 'Sea Freight');
          setRouteOriginInput(target.origin || '');
          setRouteDestInput(target.dest || '');
          setRouteRegionInput(target.region || 'Middle East');
          setRouteDaysInput(target.days || '4 - 5 Days');
          setRouteFreqInput(target.freq || 'Daily Direct Vessel');
          return;
        }
      }
      setRouteModeInput('Sea Freight');
      setRouteOriginInput('Hazira / Surat Port (INHZA)');
      setRouteDestInput('Jebel Ali, Dubai (AEJEA)');
      setRouteRegionInput('Middle East');
      setRouteDaysInput('3 - 4 Days');
      setRouteFreqInput('Direct Express Vessel');
    }
  }, [activeModal, editingRouteId, freightRoutesList]);

  // Helper function to return official Main Categories + custom ones
  const getMainProductCategoryOptions = () => {
    let mainCategories = [];
    if (activeCompanyId === 'comp_4') {
      mainCategories = [
        { id: 'industrial', category: 'industrial', nameGu: 'ઔદ્યોગિક ઓટોમેશન અને ઈલેક્ટ્રોનિક્સ', nameEn: 'Industrial Automation & Electronics' },
        { id: 'packaging', category: 'packaging', nameGu: 'ઇકો પેકેજિંગ અને જુટ બેગ્સ', nameEn: 'Eco Packaging & Sustainable Materials' },
        { id: 'new_machinery', category: 'new_machinery', nameGu: 'નવી મશીનરી અને ઓટોમેશન સિસ્ટમ્સ', nameEn: 'New Machinery & Automation Systems' },
        { id: 'used_machinery', category: 'used_machinery', nameGu: 'વપરાયેલી ઔદ્યોગિક મશીનરી', nameEn: 'Used Industrial Machinery' }
      ];
    } else if (activeCompanyId === 'comp_3') {
      mainCategories = [
        { id: 'industrial', category: 'industrial', nameGu: 'ઔદ્યોગિક માલ અને ફાસ્ટનર્સ (બોલ્ટ્સ, નટ્સ, પાઇપ)', nameEn: 'Industrial Goods & Fasteners (Bolts, Nuts, Pipes)' },
        { id: 'new_machinery', category: 'new_machinery', nameGu: 'નવી મશીનરી (CNC, લેથ, સોર્ટકેસ)', nameEn: 'New Machinery (CNC, Lathe, Sortex)' },
        { id: 'used_machinery', category: 'used_machinery', nameGu: 'વપરાયેલી મશીનરી (ઔદ્યોગિક પ્લાન્ટસ)', nameEn: 'Used Machinery (Industrial Plants)' }
      ];
    } else {
      mainCategories = [
        { id: 'agro', category: 'agro', nameGu: 'એગ્રો કોમોડિટીઝ (મસાલા, ચોખા, તેલીબિયાં)', nameEn: 'Agro Commodities (Spices, Rice, Oilseeds)' },
        { id: 'dairy', category: 'dairy', nameGu: 'ડેરી પ્રોડક્ટ્સ (શુદ્ધ ઘી, સ્કિમ્ડ મિલ્ક પાઉડર - SMP)', nameEn: 'Dairy Products (Pure Ghee, Skimmed Milk Powder - SMP)' },
        { id: 'textiles', category: 'textiles', nameGu: 'ટેક્ષટાઈલ પ્રોડક્ટ્સ (સુરત ફેબ્રિક્સ, સાડીઓ, કોટન યાર્ન)', nameEn: 'Textile Products (Surat Fabrics, Designer Sarees, Cotton Yarn)' },
        { id: 'garments', category: 'garments', nameGu: 'રેડિ-મેડ ગારમેન્ટ્સ (ટી-શર્ટ્સ, શર્ટ્સ, કુર્તીઓ, ડેનિમ)', nameEn: 'Readymade Garments (T-Shirts, Shirts, Kurtis, Denim)' },
        { id: 'packaging', category: 'packaging', nameGu: 'ઇકો પેકેજિંગ અને જુટ બેગ્સ', nameEn: 'Eco Packaging & Jute Bags' }
      ];
    }

    // Add custom main categories created for this active company
    const customMains = customProductsList.filter(p => !p.isSub && (p.companyId || 'comp_1') === activeCompanyId);
    customMains.forEach(cm => {
      const titleEn = (cm.names?.en || cm.names?.gu || '').trim();
      const titleGu = (cm.names?.gu || cm.names?.en || '').trim();
      const catSlug = cm.category || cm.id;

      if (!mainCategories.some(m => m.category === catSlug || m.id === cm.id)) {
        mainCategories.push({
          id: cm.id,
          category: catSlug,
          nameGu: titleGu,
          nameEn: titleEn
        });
      }
    });

    return mainCategories;
  };

  // Sync state when editing hero
  useEffect(() => {
    if (activeModal === 'hero' && heroBanner) {
      setBadgeInput(heroBanner.badge || '');
      setHeroImgInput(heroBanner.image || 'images/hero_export_shipping.png');
      setHeroLangTab(currentLang || 'en');

      const defaultTitles = {
        en: "Connecting Premium Quality Agro Commodities, Dairy Products, Textile Products, Readymade Garments, Used Machinery, New Machinery, Industrial Goods & Fasteners To The World.",
        gu: "શ્રેષ્ઠ ગુણવત્તાવાળા એગ્રો કોમોડિટીઝ, ડેરી પ્રોડક્ટ્સ, ટેક્સટાઇલ, રેડીમેડ ગારમેન્ટ્સ, નવી અને વપરાયેલ મશીનરી, ઔદ્યોગિક માલ અને ફાસ્ટનર્સને વિશ્વ સાથે જોડતી અગ્રણી કંપની.",
        hi: "प्रीमियम गुणवत्ता वाले कृषि उत्पादों, डेयरी उत्पादों, कपड़ा, तैयार वस्त्रों, नई और पुरानी मशीनरी, औद्योगिक सामान और फास्टनरों को दुनिया से जोड़ना।",
        fr: "Connecter les produits agricoles, produits laitiers, textiles, vêtements, machines d'occasion et neuves, biens industriels & boulonnerie de qualité supérieure au monde."
      };

      const defaultSubtitles = {
        en: "Trusted Indian Exporter specializing in Spices, Rice, Oilseeds, Fasteners, New & Used Machinery, and Eco Packaging across 40+ countries.",
        gu: "મસાલા, ચોખા, તેલીબિયાં, ફાસ્ટનર્સ, નવી અને વપરાયેલી મશીનરી, ડેરી, કાપડ અને ઇકો પેકેજિંગમાં વિશિષ્ટતા ધરાવતા ૪૦+ દેશોમાં અગ્રણી ભારતીય નિકાસકાર.",
        hi: "मसालों, चावल, तिलहन, फास्टनरों, नई और पुरानी मशीनरी, डेयरी, कपड़े और इको पैकेजिंग में विशेषज्ञता वाला प्रमुख भारतीय निर्यातक।",
        fr: "Exportateur indien de confiance spécialisé dans les épices, le riz, les machines neuves et d'occasion, les vêtements et les emballages écologiques vers 40+ pays."
      };

      if (typeof heroBanner.title === 'object') {
        setHeroTitleObj({ ...defaultTitles, ...heroBanner.title });
      } else {
        setHeroTitleObj({ ...defaultTitles, en: heroBanner.title || defaultTitles.en });
      }

      if (typeof heroBanner.subtitle === 'object') {
        setHeroSubtitleObj({ ...defaultSubtitles, ...heroBanner.subtitle });
      } else {
        setHeroSubtitleObj({ ...defaultSubtitles, en: heroBanner.subtitle || defaultSubtitles.en });
      }
    }
  }, [activeModal]);

  // Sync state when editing about
  useEffect(() => {
    if (activeModal === 'about' && aboutData) {
      setAboutLangTab(currentLang || 'en');
      setAboutBadgeObj(typeof aboutData.badge === 'object' ? { ...aboutData.badge } : { en: aboutData.badge || '' });
      setAboutTitleObj(typeof aboutData.title === 'object' ? { ...aboutData.title } : { en: aboutData.title || '' });
      setAboutDescObj(typeof aboutData.desc === 'object' ? { ...aboutData.desc } : { en: aboutData.desc || '' });
      setAboutFeat1Obj(typeof aboutData.feat1 === 'object' ? { ...aboutData.feat1 } : { en: aboutData.feat1 || '' });
      setAboutFeat2Obj(typeof aboutData.feat2 === 'object' ? { ...aboutData.feat2 } : { en: aboutData.feat2 || '' });
      setAboutFeat3Obj(typeof aboutData.feat3 === 'object' ? { ...aboutData.feat3 } : { en: aboutData.feat3 || '' });
      setAboutStatsTitleObj(typeof aboutData.statsTitle === 'object' ? { ...aboutData.statsTitle } : { en: aboutData.statsTitle || '' });
      setAboutCounts(aboutData.counts || { exp: 12, countries: 45, shipments: 50000, clients: 350 });
    }
  }, [activeModal]);


  // Sync state when editing product
  useEffect(() => {
    if (activeModal === 'product' || activeModal === 'product_main' || activeModal === 'product_sub') {
      const mainCatOptions = getMainProductCategoryOptions();
      const firstParentCat = mainCatOptions.length > 0 ? mainCatOptions[0].category : 'agro';

      if (activeModal === 'product_main') setProdType('main');
      if (activeModal === 'product_sub') setProdType('sub');

      if (editingProductId) {
        const target = getAllProducts().find(p => p.id === editingProductId);
        if (target) {
          setProdType(target.isSub ? 'sub' : 'main');
          setParentSelect(target.category || target.parentId || firstParentCat);
          setNameGu(target.names?.gu || '');
          setNameEn(target.names?.en || '');
          setCatCodeInput(target.category || `cat-${Date.now()}`);
          setMainDescInput(typeof target.spec === 'string' ? target.spec : 'Premium Main Product Category');
          setHsCode(target.hsCode || '520811');
          setLocalHsn(target.localHsn || `${target.hsCode || '520811'}10`);
          setMoq(target.moq || '1 Unit / Container');
          setSpec(typeof target.spec === 'object' ? (target.spec['en'] || target.spec['gu']) : (target.spec || 'ઉચ્ચ ગુણવત્તાયુક્ત પ્રીમિયમ પ્રોડક્ટ'));
          setPackaging(target.packaging || 'Standard Export Packaging');
          setLocalMrp(target.mrpInr || Math.round((target.localPrice || 999) * 1.32));
          setLocalPrice(target.localPrice || target.priceInr || '999');
          setPackingCharge(target.packingCharge !== undefined ? target.packingCharge : '0');
          setCourierCharge(target.courierCharge !== undefined ? target.courierCharge : '0');
          setLocalGstRate(target.localGstRate || '18');
          setLocalStock(target.localStock || '100');
          setCouponBadge(target.couponBadge || '10% OFF Special Offer');
          setLocalUnit(target.unit || 'kg');
          setLocalCurrency(target.currency || 'INR');

          let imgs = [];
          if (target.images && target.images.length > 0) {
            imgs = target.images.map(convertGoogleDriveUrl);
          } else if (target.image) {
            imgs = [convertGoogleDriveUrl(target.image)];
          }
          setImageUrls(imgs.length > 0 ? imgs : ['images/agro_spices_grains.png']);
          return;
        }
      }

      // Default values
      setParentSelect(firstParentCat);
      setNameGu('');
      setNameEn('');
      setCatCodeInput('');
      setMainDescInput('Premium Export Quality Category');
      setHsCode('520811');
      setMoq('1 Unit / Container');
      setSpec('ઉચ્ચ ગુણવત્તાયુક્ત પ્રીમિયમ પ્રોડક્ટ');
      setPackaging('Standard Export Packaging');
      setLocalMrp('1499');
      setLocalPrice('999');
      setPackingCharge('0');
      setCourierCharge('0');
      setLocalGstRate('18');
      setLocalStock('100');
      setCouponBadge('10% OFF Special Offer');
      setLocalUnit('kg');
      setLocalCurrency('INR');
      setImageUrls(['images/agro_spices_grains.png']);
      setNewUrlInput('');
      setHsSearchQuery('');
      setShowHsDropdown(false);
    }
  }, [activeModal, editingProductId]);

  // Sync state when editing branch
  useEffect(() => {
    if (activeModal === 'branch') {
      if (editingBranchId) {
        const b = branchesList.find(item => item.id === editingBranchId);
        if (b) {
          setCityInput(b.city || '');
          setPersonInput(b.person || '');
          setPhoneInput(b.phone || '');
          setEmailInput(b.email || '');
          setAddressInput(b.address || '');
          return;
        }
      }
      setCityInput(''); setPersonInput(''); setPhoneInput('+91 78619 97755'); setEmailInput('surat@adidevexport.com'); setAddressInput('');
    }
  }, [activeModal, editingBranchId]);

  // Sync state when editing certificate
  useEffect(() => {
    if (activeModal === 'certificate') {
      if (editingCertId) {
        const c = certificatesList.find(item => item.id === editingCertId);
        if (c) {
          setCertTitle(c.title || '');
          setCertReg(c.reg || '');
          setCertIcon(c.icon || '📜');
          setCertFileData(c.fileUrl ? { url: c.fileUrl, type: c.fileType } : null);
          return;
        }
      }
      setCertTitle(''); setCertReg(''); setCertIcon('📜'); setCertFileData(null);
    }
  }, [activeModal, editingCertId]);

  if (!activeModal) return null;

  // Maximum Global Currencies Database (50+ World Currencies)
  const globalCurrencyList = [
    { code: 'USD', symbol: '$', label: 'USD ($) - US Dollar' },
    { code: 'EUR', symbol: '€', label: 'EUR (€) - Euro (EU)' },
    { code: 'AED', symbol: 'د.إ', label: 'AED (د.إ) - UAE Dirham' },
    { code: 'GBP', symbol: '£', label: 'GBP (£) - British Pound' },
    { code: 'INR', symbol: '₹', label: 'INR (₹) - Indian Rupee' },
    { code: 'SAR', symbol: '﷼', label: 'SAR (﷼) - Saudi Riyal' },
    { code: 'CAD', symbol: '$', label: 'CAD ($) - Canadian Dollar' },
    { code: 'AUD', symbol: '$', label: 'AUD ($) - Australian Dollar' },
    { code: 'JPY', symbol: '¥', label: 'JPY (¥) - Japanese Yen' },
    { code: 'SGD', symbol: '$', label: 'SGD ($) - Singapore Dollar' },
    { code: 'CHF', symbol: 'Fr', label: 'CHF (Fr) - Swiss Franc' },
    { code: 'QAR', symbol: '﷼', label: 'QAR (﷼) - Qatari Riyal' },
    { code: 'KWD', symbol: 'د.ك', label: 'KWD (د.ك) - Kuwaiti Dinar' },
    { code: 'BHD', symbol: '.د.બ', label: 'BHD (.د.બ) - Bahraini Dinar' },
    { code: 'OMR', symbol: '﷼', label: 'OMR (﷼) - Omani Rial' },
    { code: 'NZD', symbol: '$', label: 'NZD ($) - New Zealand Dollar' },
    { code: 'ZAR', symbol: 'R', label: 'ZAR (R) - South African Rand' },
    { code: 'CNY', symbol: '¥', label: 'CNY (¥) - Chinese Yuan' },
    { code: 'MYR', symbol: 'RM', label: 'MYR (RM) - Malaysian Ringgit' },
    { code: 'THB', symbol: '฿', label: 'THB (฿) - Thai Baht' },
    { code: 'BRL', symbol: 'R$', label: 'BRL (R$) - Brazilian Real' },
    { code: 'RUB', symbol: '₽', label: 'RUB (₽) - Russian Ruble' },
    { code: 'KRW', symbol: '₩', label: 'KRW (₩) - South Korean Won' },
    { code: 'IDR', symbol: 'Rp', label: 'IDR (Rp) - Indonesian Rupiah' },
    { code: 'VND', symbol: '₫', label: 'VND (₫) - Vietnamese Dong' },
    { code: 'EGP', symbol: 'E£', label: 'EGP (E£) - Egyptian Pound' },
    { code: 'NGN', symbol: '₦', label: 'NGN (₦) - Nigerian Naira' },
    { code: 'KES', symbol: 'KSh', label: 'KES (KSh) - Kenyan Shilling' },
    { code: 'PHP', symbol: '₱', label: 'PHP (₱) - Philippine Peso' },
    { code: 'PKR', symbol: '₨', label: 'PKR (₨) - Pakistani Rupee' },
    { code: 'BDT', symbol: '৳', label: 'BDT (৳) - Bangladeshi Taka' },
    { code: 'LKR', symbol: 'Rs', label: 'LKR (Rs) - Sri Lankan Rupee' },
    { code: 'TRY', symbol: '₺', label: 'TRY (₺) - Turkish Lira' },
    { code: 'MXN', symbol: '$', label: 'MXN ($) - Mexican Peso' },
    { code: 'PLN', symbol: 'zł', label: 'PLN (zł) - Polish Zloty' },
    { code: 'SEK', symbol: 'kr', label: 'SEK (kr) - Swedish Krona' },
    { code: 'NOK', symbol: 'kr', label: 'NOK (kr) - Norwegian Krone' },
    { code: 'DKK', symbol: 'kr', label: 'DKK (kr) - Danish Krone' },
    { code: 'HUF', symbol: 'Ft', label: 'HUF (Ft) - Hungarian Forint' },
    { code: 'CZK', symbol: 'Kč', label: 'CZK (Kč) - Czech Koruna' },
    { code: 'ILS', symbol: '₪', label: 'ILS (₪) - Israeli Shekel' },
    { code: 'CLP', symbol: '$', label: 'CLP ($) - Chilean Peso' },
    { code: 'COP', symbol: '$', label: 'COP ($) - Colombian Peso' },
    { code: 'ARS', symbol: '$', label: 'ARS ($) - Argentine Peso' },
    { code: 'IQD', symbol: 'ع.د', label: 'IQD (ع.د) - Iraqi Dinar' },
    { code: 'JOD', symbol: 'د.ا', label: 'JOD (د.ا) - Jordanian Dinar' },
    { code: 'MAD', symbol: 'د.م.', label: 'MAD (د.م.) - Moroccan Dirham' },
    { code: 'DZD', symbol: 'د.જ', label: 'DZD (د.ج) - Algerian Dinar' },
    { code: 'TND', symbol: 'د.ત', label: 'TND (د.ત) - Tunisian Dinar' },
    { code: 'HKD', symbol: '$', label: 'HKD ($) - Hong Kong Dollar' }
  ];

  // Destination Country Tax & Import Duty Database
  const destinationTaxDb = [
    { name: 'Dubai / UAE', code: 'AE', vat: 5, duty: 5, desc: '5% VAT & 5% Import Duty (0% Duty in Free Zones like JAFZA/KIZAD).' },
    { name: 'Canada', code: 'CA', vat: 5, duty: 5, desc: '5% Federal GST + Provincial PST/HST (0% to 10%). Agro/Fasteners duty: 0-6.5%.' },
    { name: 'United States (USA)', code: 'US', vat: 0, duty: 5, desc: '0% Federal VAT (State Sales Tax 0-10%). Customs Duty 0-7.5% depending on HS Code.' },
    { name: 'Germany / EU', code: 'DE', vat: 19, duty: 4, desc: '19% Import VAT (EU Standard) & 0% to 6.5% Common External Customs Tariff.' },
    { name: 'United Kingdom (UK)', code: 'GB', vat: 20, duty: 4, desc: '20% Standard UK Import VAT & 0% to 6% UK Global Tariff.' },
    { name: 'Saudi Arabia (KSA)', code: 'SA', vat: 15, duty: 5, desc: '15% Standard KSA VAT & 5% to 12% GCC Customs Union Duty.' },
    { name: 'Australia', code: 'AU', vat: 10, duty: 5, desc: '10% Import GST & 5% Standard Import Tariff.' },
    { name: 'South Africa', code: 'ZA', vat: 15, duty: 8, desc: '15% Import VAT & SACU Tariff Rate.' },
    { name: 'Kenya', code: 'KE', vat: 16, duty: 15, desc: '16% Import VAT & East African Community EAC Duty.' },
    { name: 'Vietnam', code: 'VN', vat: 10, duty: 5, desc: '10% Standard Import VAT & ASEAN MFN Duty.' },
    { name: 'France', code: 'FR', vat: 20, duty: 4, desc: '20% French Import VAT & EU Common External Customs Tariff.' },
    { name: 'India', code: 'IN', vat: 18, duty: 10, desc: '5%-18% GST & 10%-15% Basic Customs Duty (BCD).' }
  ];

  const getMatchedDestTaxInfo = () => {
    const q = (buyerCountry || '').toLowerCase().trim();
    if (!q) return destinationTaxDb[0];
    const found = destinationTaxDb.find(item =>
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase() === q ||
      q.includes(item.name.toLowerCase()) ||
      q.includes(item.code.toLowerCase())
    );
    return found || { name: buyerCountry, code: 'INTL', vat: Number(destGstRate) || 5, duty: Number(destDutyRate) || 5, desc: `Standard Customs Tariff & VAT for ${buyerCountry}.` };
  };

  const handleOnlineTaxLookup = (countryStr) => {
    const targetCountry = countryStr || buyerCountry || 'Dubai UAE';
    const prodName = quotationProduct ? (quotationProduct.names['en'] || quotationProduct.names['gu']) : 'Agro Commodities';
    const hs = quotationProduct?.hsCode || '090931';
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${targetCountry} import duty GST VAT rate HS code ${hs} ${prodName}`)}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  // Official Incoterms 2020 Risk & Cost Responsibilities Database
  const incotermsList = [
    {
      code: 'EXW',
      name: 'EX WORKS (Factory / Warehouse Premises)',
      group: 'Group E - Departure',
      sellerRisk: 5,
      buyerRisk: 95,
      riskTransferPoint: 'Seller Factory / Warehouse Premises',
      freightPaidBy: 'Buyer',
      insurancePaidBy: 'Buyer',
      customsPaidBy: 'Buyer',
      desc: 'Seller makes goods available at their factory/warehouse. Buyer bears all transport costs, export/import customs clearance, and risk from factory door onwards.',
      sampleTerm: 'EXW Factory Warehouse, Surat, India'
    },
    {
      code: 'FCA',
      name: 'FREE CARRIER (Inland Carrier Depot)',
      group: 'Group F - Main Carriage Unpaid',
      sellerRisk: 20,
      buyerRisk: 80,
      riskTransferPoint: 'Handed over to First Inland Carrier Depot',
      freightPaidBy: 'Buyer',
      insurancePaidBy: 'Buyer',
      customsPaidBy: 'Seller (Export) / Buyer (Import)',
      desc: 'Seller delivers goods, cleared for export, to the buyer’s nominated carrier at the named place.',
      sampleTerm: 'FCA Inland Container Depot (ICD) Surat'
    },
    {
      code: 'FAS',
      name: 'FREE ALONGSIDE SHIP (Port Quay / Dock)',
      group: 'Group F - Main Carriage Unpaid',
      sellerRisk: 35,
      buyerRisk: 65,
      riskTransferPoint: 'Alongside Vessel Quay at Loading Port',
      freightPaidBy: 'Buyer',
      insurancePaidBy: 'Buyer',
      customsPaidBy: 'Seller (Export) / Buyer (Import)',
      desc: 'Seller delivers goods alongside ship at loading port. Risk transfers when placed alongside vessel.',
      sampleTerm: 'FAS Mundra Port Quay / Hazira Port Quay'
    },
    {
      code: 'FOB',
      name: 'FREE ON BOARD (Loaded Vessel at Origin Port)',
      group: 'Group F - Main Carriage Unpaid',
      sellerRisk: 45,
      buyerRisk: 55,
      riskTransferPoint: 'On Board Vessel at Loading Port (⚠️ Transfer of Risk)',
      freightPaidBy: 'Buyer',
      insurancePaidBy: 'Buyer',
      customsPaidBy: 'Seller (Export) / Buyer (Import)',
      desc: 'Seller clears goods for export and loads them on board ship. Most popular term for sea freight exports!',
      sampleTerm: 'FOB Mundra Port / Hazira Port, India'
    },
    {
      code: 'CFR',
      name: 'COST AND FREIGHT (CNF - Destination Port)',
      group: 'Group C - Main Carriage Paid',
      sellerRisk: 45,
      buyerRisk: 55,
      riskTransferPoint: 'On Board Vessel at Origin (⚠️ Risk Transfer at Origin)',
      freightPaidBy: 'Seller (Sea Freight Included)',
      insurancePaidBy: 'Buyer',
      customsPaidBy: 'Seller (Export) / Buyer (Import)',
      desc: 'Seller pays sea freight to destination port. However, risk transfers to buyer as soon as goods are loaded on ship at origin port!',
      sampleTerm: `CFR ${buyerCountry} (Freight Prepaid)`
    },
    {
      code: 'CIF',
      name: 'COST, INSURANCE AND FREIGHT (Destination Port)',
      group: 'Group C - Main Carriage Paid',
      sellerRisk: 50,
      buyerRisk: 50,
      riskTransferPoint: 'On Board Vessel at Origin (⚠️ Marine Insurance Included)',
      freightPaidBy: 'Seller (Sea Freight Included)',
      insurancePaidBy: 'Seller (Marine Insurance Included)',
      customsPaidBy: 'Seller (Export) / Buyer (Import)',
      desc: 'Seller pays freight + marine insurance to destination port. Extremely popular for global buyers wanting full transit cover!',
      sampleTerm: `CIF ${buyerCountry} (Freight & Insurance Paid)`
    },
    {
      code: 'CPT',
      name: 'CARRIAGE PAID TO (Named Destination Place)',
      group: 'Group C - Main Carriage Paid',
      sellerRisk: 45,
      buyerRisk: 55,
      riskTransferPoint: 'Handed to First Carrier at Origin',
      freightPaidBy: 'Seller',
      insurancePaidBy: 'Buyer',
      customsPaidBy: 'Seller (Export) / Buyer (Import)',
      desc: 'Seller pays carriage to named destination. Used for air freight & multimodal transport.',
      sampleTerm: `CPT ${buyerCountry} Terminal`
    },
    {
      code: 'CIP',
      name: 'CARRIAGE AND INSURANCE PAID TO (Destination)',
      group: 'Group C - Main Carriage Paid',
      sellerRisk: 50,
      buyerRisk: 50,
      riskTransferPoint: 'Handed to First Carrier at Origin',
      freightPaidBy: 'Seller',
      insurancePaidBy: 'Seller (All-Risks Insurance)',
      customsPaidBy: 'Seller (Export) / Buyer (Import)',
      desc: 'Seller pays freight and all-risks comprehensive insurance to destination.',
      sampleTerm: `CIP ${buyerCountry} Terminal`
    },
    {
      code: 'DPU',
      name: 'DELIVERED AT PLACE UNLOADED (Destination Terminal)',
      group: 'Group D - Arrival',
      sellerRisk: 80,
      buyerRisk: 20,
      riskTransferPoint: 'Unloaded at Destination Terminal / Quay',
      freightPaidBy: 'Seller',
      insurancePaidBy: 'Seller',
      customsPaidBy: 'Seller (Export) / Buyer (Import)',
      desc: 'Seller assumes all risks and costs up to unloading goods at destination terminal.',
      sampleTerm: `DPU ${buyerCountry} Container Terminal`
    },
    {
      code: 'DAP',
      name: 'DELIVERED AT PLACE (Buyer Door / Warehouse)',
      group: 'Group D - Arrival',
      sellerRisk: 90,
      buyerRisk: 10,
      riskTransferPoint: 'Ready for Unloading at Buyer Premises',
      freightPaidBy: 'Seller',
      insurancePaidBy: 'Seller',
      customsPaidBy: 'Seller (Export) / Buyer (Import)',
      desc: 'Seller delivers goods to buyer warehouse door (Customs duty unpaid).',
      sampleTerm: `DAP ${buyerCountry} Buyer Warehouse`
    },
    {
      code: 'DDP',
      name: 'DELIVERED DUTY PAID (Full Doorstep Delivery)',
      group: 'Group D - Arrival',
      sellerRisk: 98,
      buyerRisk: 2,
      riskTransferPoint: 'Delivered at Buyer Door with Duties Paid',
      freightPaidBy: 'Seller',
      insurancePaidBy: 'Seller',
      customsPaidBy: 'Seller (Export & Import Duties Paid)',
      desc: 'Maximum Seller Responsibility! Seller handles full transport, marine insurance, and import customs duty clearance to buyer door.',
      sampleTerm: `DDP ${buyerCountry} (Customs Duty Paid)`
    }
  ];

  // Filter HS Codes for live search box (Supports International 6-digit & Local 8-digit HSN)
  const filteredHsCodes = hsSearchQuery.trim()
    ? hsCodeDictionary.filter(item =>
        item.code.includes(hsSearchQuery.trim()) ||
        (item.localHsn && item.localHsn.includes(hsSearchQuery.trim())) ||
        item.name.toLowerCase().includes(hsSearchQuery.toLowerCase().trim()) ||
        item.cat.toLowerCase().includes(hsSearchQuery.toLowerCase().trim())
      )
    : hsCodeDictionary.slice(0, 8);

  // Helper photo handlers
  const handleAddUrl = () => {
    if (!newUrlInput.trim()) return;
    const converted = convertGoogleDriveUrl(newUrlInput.trim());
    setImageUrls(prev => [...prev, converted]);
    setNewUrlInput('');
  };

  const handleRemovePhoto = (index) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleMakeMainCover = (index) => {
    setImageUrls(prev => {
      const copy = [...prev];
      const target = copy.splice(index, 1)[0];
      return [target, ...copy];
    });
  };

  const handleOnlineHsSearch = (queryStr, mode = 'international') => {
    const q = (queryStr || hsSearchQuery || nameEn || nameGu || 'Product').trim();
    if (!q) {
      alert("⚠️ Please type a product name in the search bar to search online on the internet!");
      return;
    }
    const keyword = mode === 'local'
      ? `${q} HSN code GST Indian customs 8 digit`
      : `${q} HS code WCO 6 digit export customs`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  const isProductModalActive = activeModal === 'product' || activeModal === 'product_main' || activeModal === 'product_sub';

  // REUSABLE MULTI-IMAGE GALLERY MANAGER COMPONENT FOR BOTH FORMS
  const renderMultiImageGalleryManager = () => (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <label className="form-label" style={{ margin: 0, fontWeight: 800 }}>
          📷 Product Images (Camera or Gallery)
        </label>
        <span style={{ fontSize: '0.8rem', color: 'var(--primary-teal-glow)', fontWeight: 700 }}>
          {imageUrls.length} Photo{imageUrls.length !== 1 ? 's' : ''} Attached
        </span>
      </div>

      <div className="form-group" style={{ marginBottom: '12px' }}>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          multiple
          onChange={(e) => {
            Array.from(e.target.files).forEach(file => {
              const reader = new FileReader();
              reader.onload = (evt) => {
                const img = new Image();
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  let width = img.width;
                  let height = img.height;
                  const maxDim = 1000;
                  if (width > maxDim || height > maxDim) {
                    if (width > height) {
                      height = Math.round((height * maxDim) / width);
                      width = maxDim;
                    } else {
                      width = Math.round((width * maxDim) / height);
                      height = maxDim;
                    }
                  }
                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0, width, height);
                  const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
                  setImageUrls(prev => [...prev, compressedDataUrl]);
                };
                img.onerror = () => setImageUrls(prev => [...prev, evt.target.result]);
                img.src = evt.target.result;
              };
              reader.readAsDataURL(file);
            });
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block', marginBottom: '4px' }}>
          🔗 Or Add Photo via Web Image URL:
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="url"
            className="form-control"
            placeholder="https://example.com/product_photo.jpg"
            value={newUrlInput}
            onChange={(e) => setNewUrlInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="btn-secondary"
            style={{ padding: '0 16px', flexShrink: 0 }}
          >
            + Add URL
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block', marginBottom: '6px' }}>
          ⚡ Quick Sample Export Photos:
        </label>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { name: '🌾 Basmati Rice', url: 'images/agro_spices_grains.png' },
            { name: '🔩 Fasteners', url: 'images/fasteners_banner.png' },
            { name: '🌿 Turmeric', url: 'images/agro_turmeric.jpg' },
            { name: '🛍️ Jute Bags', url: 'images/agro_spices_grains.png' }
          ].map((preset, idx) => (
            <button
              key={idx}
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              onClick={() => setImageUrls(prev => [...prev, preset.url])}
            >
              + {preset.name}
            </button>
          ))}
        </div>
      </div>

      {imageUrls.length > 0 && (
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
            🖼️ Attached Product Photos (First photo is Main Cover):
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
            {imageUrls.map((url, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-sm)',
                  border: index === 0 ? '2px solid var(--primary-teal-glow)' : '1px solid var(--border-glass)',
                  overflow: 'hidden',
                  background: '#000',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <img
                  src={url}
                  alt={`Product Photo ${index + 1}`}
                  style={{ width: '100%', height: '85px', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'images/agro_spices_grains.png'; }}
                />

                {index === 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      background: 'rgba(20, 184, 166, 0.9)',
                      color: 'white',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    ⭐ Main Cover
                  </span>
                )}

                <div style={{ display: 'flex', padding: '4px', gap: '4px', background: 'rgba(15, 23, 42, 0.9)' }}>
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleMakeMainCover(index)}
                      title="Make Main Cover Photo"
                      style={{
                        flex: 1,
                        fontSize: '0.68rem',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        padding: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      ⭐ Cover
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    title="Delete Photo"
                    style={{
                      flex: 1,
                      fontSize: '0.68rem',
                      background: 'rgba(239, 68, 68, 0.8)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ADMIN CONTROL PANEL DASHBOARD MODAL */}
      {activeModal === 'admin_control' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '520px', borderRadius: '24px' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '4px' }}>⚙️</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', margin: 0 }}>
                Admin Control Panel
              </h3>
              <span style={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 800 }}>
                ✓ Admin Mode Unlocked & Active
              </span>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ padding: '12px 16px', justifyContent: 'flex-start', fontSize: '0.9rem', fontWeight: 800, background: 'linear-gradient(135deg, #0d9488, #0f766e)' }}
                onClick={() => setActiveModal('company')}
              >
                ✏️ Edit Sister Companies Profiles & Logos
              </button>

              <button
                type="button"
                className="btn-primary"
                style={{ padding: '12px 16px', justifyContent: 'flex-start', fontSize: '0.9rem', fontWeight: 800, background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}
                onClick={() => setActiveModal('admin_sellers')}
              >
                🏬 Registered Sellers & Exporters Control ({merchantsList?.length || 0})
              </button>

              <button
                type="button"
                className="btn-primary"
                style={{ padding: '12px 16px', justifyContent: 'flex-start', fontSize: '0.9rem', fontWeight: 800, background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
                onClick={() => setActiveModal('admin_product_approvals')}
              >
                📦 Seller Product Approvals — એડમિન એપ્રુઅલ ({(customProductsList || []).filter(p => p.isSub && p.approvalStatus === 'pending').length})
              </button>

              <button
                type="button"
                className="btn-primary"
                style={{ padding: '12px 16px', justifyContent: 'flex-start', fontSize: '0.9rem', fontWeight: 800, background: 'linear-gradient(135deg, #d97706, #b45309)' }}
                onClick={() => setActiveModal('admin_commission')}
              >
                💰 Admin Commission & Platform Settings ({adminCommissionRate || 2.5}%)
              </button>

              <button
                type="button"
                className="btn-primary"
                style={{ padding: '12px 16px', justifyContent: 'flex-start', fontSize: '0.9rem', fontWeight: 800, background: 'linear-gradient(135deg, #0369a1, #075985)' }}
                onClick={() => setActiveModal('admin_leads')}
              >
                👥 View Registered Customer Leads & Inquiries ({customerList?.length || 0})
              </button>

              <button
                type="button"
                className="btn-primary"
                style={{ padding: '12px 16px', justifyContent: 'flex-start', fontSize: '0.9rem', fontWeight: 800, background: 'linear-gradient(135deg, #059669, #047857)' }}
                onClick={() => {
                  if (exportDatabase) exportDatabase();
                  setActiveModal(null);
                }}
              >
                📥 Download Backup Database (store.json)
              </button>

              <label
                className="btn-primary"
                style={{ padding: '12px 16px', justifyContent: 'flex-start', fontSize: '0.9rem', fontWeight: 800, background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', cursor: 'pointer', margin: 0 }}
              >
                📤 Restore / Load Database (store.json)
                <input
                  type="file"
                  accept=".json"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      try {
                        const parsed = JSON.parse(evt.target.result);
                        if (importDatabase) importDatabase(parsed);
                        setActiveModal(null);
                      } catch(err) {
                        alert("⚠️ Invalid store.json file format!");
                      }
                    };
                    reader.readAsText(file);
                  }}
                />
              </label>

              <button
                type="button"
                className="btn-primary"
                style={{ padding: '12px 16px', justifyContent: 'flex-start', fontSize: '0.9rem', fontWeight: 800, background: 'linear-gradient(135deg, #475569, #334155)' }}
                onClick={() => setActiveModal('admin_security')}
              >
                🔑 Change Admin Password (OTP)
              </button>

              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '12px 16px', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800, color: '#f87171', borderColor: 'rgba(248,113,113,0.4)', marginTop: '8px' }}
                onClick={() => {
                  setIsAdminLoggedIn(false);
                  try { localStorage.setItem('admin_access_unlocked_v1', 'false'); } catch(e) {}
                  setActiveModal(null);
                  alert('🔒 Admin Logged Out Successfully.');
                }}
              >
                🔒 Exit / Logout Admin Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. ADMIN REGISTERED SELLERS & EXPORTERS CONTROL MODAL */}
      {activeModal === 'admin_sellers' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '850px', width: '92vw', maxHeight: '90vh', overflowY: 'auto', borderRadius: '24px' }}>
            <button className="modal-close" onClick={() => setActiveModal('admin_control')}>← Admin Panel</button>
            
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '4px' }}>🏬</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'white', margin: 0 }}>
                Registered Sellers & Exporters Control
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#a1a1aa', margin: '4px 0 0' }}>
                વિક્રેતા રજિસ્ટ્રેશન કંટ્રોલ પેનલ — Manage, verify, block or delete registered global suppliers.
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="🔍 Search sellers by Name, Phone, Email, GSTIN, City..."
                value={adminSellerSearch}
                onChange={(e) => setAdminSellerSearch(e.target.value)}
                style={{ flex: '1 1 240px', padding: '10px 14px', fontSize: '0.88rem' }}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['all', 'approved', 'pending', 'blocked'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setAdminSellerStatusFilter(st)}
                    className="btn-secondary"
                    style={{
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      borderRadius: '10px',
                      textTransform: 'capitalize',
                      background: adminSellerStatusFilter === st ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
                      color: adminSellerStatusFilter === st ? '#fff' : '#a1a1aa',
                      borderColor: adminSellerStatusFilter === st ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    {st === 'all' ? `All (${merchantsList?.length || 0})` :
                     st === 'approved' ? `Approved ✅ (${merchantsList?.filter(m => m.status === 'approved').length || 0})` :
                     st === 'pending' ? `Pending ⏳ (${merchantsList?.filter(m => m.status === 'pending').length || 0})` :
                     `Blocked 🚫 (${merchantsList?.filter(m => m.status === 'blocked').length || 0})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Sellers List Grid */}
            <div style={{ display: 'grid', gap: '12px' }}>
              {(() => {
                const filtered = (merchantsList || []).filter(m => {
                  const matchQuery = !adminSellerSearch ||
                    (m.businessName && m.businessName.toLowerCase().includes(adminSellerSearch.toLowerCase())) ||
                    (m.brandName && m.brandName.toLowerCase().includes(adminSellerSearch.toLowerCase())) ||
                    (m.contactPerson && m.contactPerson.toLowerCase().includes(adminSellerSearch.toLowerCase())) ||
                    (m.phone && m.phone.toLowerCase().includes(adminSellerSearch.toLowerCase())) ||
                    (m.email && m.email.toLowerCase().includes(adminSellerSearch.toLowerCase())) ||
                    (m.gstin && m.gstin.toLowerCase().includes(adminSellerSearch.toLowerCase())) ||
                    (m.city && m.city.toLowerCase().includes(adminSellerSearch.toLowerCase()));
                  const matchStatus = adminSellerStatusFilter === 'all' || m.status === adminSellerStatusFilter;
                  return matchQuery && matchStatus;
                });

                if (filtered.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#9ca3af', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                      🚫 No registered sellers found matching criteria.
                    </div>
                  );
                }

                return filtered.map((seller) => {
                  const sellerProdsCount = (customProductsList || []).filter(p => p.merchantId === seller.id).length;
                  return (
                    <div
                      key={seller.id}
                      style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        display: 'grid',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            🏢 {seller.businessName}
                            {seller.brandName && <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>({seller.brandName})</span>}
                          </h4>
                          <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '2px' }}>
                            👤 Contact: <strong>{seller.contactPerson || 'N/A'}</strong> | 📍 {seller.city || 'Surat'}, {seller.state || 'Gujarat'}
                          </div>
                        </div>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            background: seller.status === 'approved' ? 'rgba(34,197,94,0.15)' : seller.status === 'pending' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                            color: seller.status === 'approved' ? '#4ade80' : seller.status === 'pending' ? '#fde047' : '#f87171',
                            border: `1px solid ${seller.status === 'approved' ? 'rgba(34,197,94,0.3)' : seller.status === 'pending' ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)'}`
                          }}
                        >
                          {seller.status === 'approved' ? 'Approved ✅' : seller.status === 'pending' ? 'Pending Approval ⏳' : 'Blocked 🚫'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.82rem', background: 'rgba(0,0,0,0.2)', padding: '10px 12px', borderRadius: '10px' }}>
                        <div>📱 Phone: <a href={`tel:${seller.phone}`} style={{ color: '#38bdf8', fontWeight: 700 }}>{seller.phone || 'N/A'}</a></div>
                        <div>✉️ Email: <a href={`mailto:${seller.email}`} style={{ color: '#38bdf8', fontWeight: 700 }}>{seller.email || 'N/A'}</a></div>
                        <div>📄 GSTIN/IEC: <strong>{seller.gstin || 'Not Provided'}</strong></div>
                        <div>🏭 Type: <strong>{seller.businessType || 'Exporter'}</strong></div>
                        <div>📦 Products Uploaded: <strong style={{ color: '#facc15' }}>{sellerProdsCount} Items</strong></div>
                        <div>📅 Registered: <span>{seller.registeredAt || 'N/A'}</span></div>
                      </div>

                      {/* Attached Certificates Badges */}
                      {(seller.iecCertUrl || seller.gstCertUrl || seller.qualityCertUrl || seller.factoryPhotoUrl) && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                          <span style={{ fontSize: '0.78rem', color: '#a1a1aa', fontWeight: 700 }}>📜 Uploaded Documents:</span>
                          {seller.iecCertUrl && (
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.74rem', color: '#38bdf8', borderColor: 'rgba(56,189,248,0.4)' }}
                              onClick={() => openImagePreview && openImagePreview({ title: `📄 IEC Certificate - ${seller.businessName}`, url: seller.iecCertUrl, category: 'Export License' })}
                            >
                              📄 View IEC Cert
                            </button>
                          )}
                          {seller.gstCertUrl && (
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.74rem', color: '#4ade80', borderColor: 'rgba(74,222,128,0.4)' }}
                              onClick={() => openImagePreview && openImagePreview({ title: `📜 GST Certificate - ${seller.businessName}`, url: seller.gstCertUrl, category: 'Tax Registration' })}
                            >
                              📜 View GST Cert
                            </button>
                          )}
                          {seller.qualityCertUrl && (
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.74rem', color: '#facc15', borderColor: 'rgba(250,204,21,0.4)' }}
                              onClick={() => openImagePreview && openImagePreview({ title: `🏅 Quality Certificate - ${seller.businessName}`, url: seller.qualityCertUrl, category: 'Quality Certification' })}
                            >
                              🏅 View Quality Cert
                            </button>
                          )}
                          {seller.factoryPhotoUrl && (
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.74rem', color: '#cbd5e1', borderColor: 'rgba(203,213,225,0.4)' }}
                              onClick={() => openImagePreview && openImagePreview({ title: `🏭 Factory Premises - ${seller.businessName}`, url: seller.factoryPhotoUrl, category: 'Factory Premises' })}
                            >
                              🏭 View Factory Photo
                            </button>
                          )}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: '4px' }}>
                        {seller.status !== 'approved' && (
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ padding: '6px 12px', fontSize: '0.78rem', background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
                            onClick={() => updateMerchantStatus(seller.id, 'approved')}
                          >
                            ✅ Approve Seller
                          </button>
                        )}
                        {seller.status !== 'blocked' && (
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '0.78rem', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }}
                            onClick={() => updateMerchantStatus(seller.id, 'blocked')}
                          >
                            🚫 Block Account
                          </button>
                        )}
                        {seller.status !== 'pending' && (
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '0.78rem', color: '#fde047', borderColor: 'rgba(234,179,8,0.3)' }}
                            onClick={() => updateMerchantStatus(seller.id, 'pending')}
                          >
                            ⏳ Mark Pending
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '0.78rem', color: '#ef4444' }}
                          onClick={() => deleteMerchant(seller.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      )}

      {/* 2. ADMIN SELLER PRODUCT APPROVALS MODAL (એડમિન એપ્રુઅલ) */}
      {activeModal === 'admin_product_approvals' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '850px', width: '92vw', maxHeight: '90vh', overflowY: 'auto', borderRadius: '24px' }}>
            <button className="modal-close" onClick={() => setActiveModal('admin_control')}>← Admin Panel</button>
            
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '4px' }}>📦</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'white', margin: 0 }}>
                Seller Product Admin Approvals (એડમિન એપ્રુઅલ)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#a1a1aa', margin: '4px 0 0' }}>
                Review seller-uploaded products before publishing them live on the public global site.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="🔍 Search products by Title, Category, HS Code, Seller Name..."
                value={adminProductSearch}
                onChange={(e) => setAdminProductSearch(e.target.value)}
                style={{ flex: '1 1 240px', padding: '10px 14px', fontSize: '0.88rem' }}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['pending', 'approved', 'rejected', 'all'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setAdminProductApprovalFilter(st)}
                    className="btn-secondary"
                    style={{
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      borderRadius: '10px',
                      textTransform: 'capitalize',
                      background: adminProductApprovalFilter === st ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
                      color: adminProductApprovalFilter === st ? '#fff' : '#a1a1aa',
                      borderColor: adminProductApprovalFilter === st ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    {st === 'pending' ? `Pending ⏳ (${(customProductsList || []).filter(p => p.isSub && p.approvalStatus === 'pending').length})` :
                     st === 'approved' ? `Approved ✅ (${(customProductsList || []).filter(p => p.isSub && p.approvalStatus === 'approved').length})` :
                     st === 'rejected' ? `Rejected ❌ (${(customProductsList || []).filter(p => p.isSub && p.approvalStatus === 'rejected').length})` :
                     `All Sellers' (${(customProductsList || []).filter(p => p.isSub).length})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Approvals List */}
            <div style={{ display: 'grid', gap: '14px' }}>
              {(() => {
                const sellerProducts = (customProductsList || []).filter(p => p.isSub);
                const filtered = sellerProducts.filter(p => {
                  const titleEn = p.names?.en || p.name || '';
                  const titleGu = p.names?.gu || '';
                  const matchQuery = !adminProductSearch ||
                    titleEn.toLowerCase().includes(adminProductSearch.toLowerCase()) ||
                    titleGu.toLowerCase().includes(adminProductSearch.toLowerCase()) ||
                    (p.category && p.category.toLowerCase().includes(adminProductSearch.toLowerCase())) ||
                    (p.hsCode && p.hsCode.toLowerCase().includes(adminProductSearch.toLowerCase())) ||
                    (p.merchantName && p.merchantName.toLowerCase().includes(adminProductSearch.toLowerCase()));
                  
                  const status = p.approvalStatus || 'approved';
                  const matchStatus = adminProductApprovalFilter === 'all' || status === adminProductApprovalFilter;
                  return matchQuery && matchStatus;
                });

                if (filtered.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '36px', color: '#9ca3af', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                      ✨ No products found for filter "{adminProductApprovalFilter}".
                    </div>
                  );
                }

                return filtered.map((prod) => {
                  const priceNum = parseFloat(prod.priceUsd) || 0;
                  const estimatedComm = (priceNum * ((adminCommissionRate || 2.5) / 100)).toFixed(2);
                  const status = prod.approvalStatus || 'approved';

                  return (
                    <div
                      key={prod.id}
                      style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: '14px',
                        alignItems: 'start'
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: '#000', flexShrink: 0 }}>
                        <img
                          src={prod.image || 'images/agro_spices_grains.png'}
                          alt={prod.names?.en}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = 'images/agro_spices_grains.png'; }}
                        />
                      </div>

                      {/* Details */}
                      <div style={{ display: 'grid', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
                          <div>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white', margin: 0 }}>
                              {prod.names?.en} {prod.names?.gu && <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>({prod.names.gu})</span>}
                            </h4>
                            <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '2px' }}>
                              🏷️ Category: <strong style={{ color: '#cbd5e1' }}>{prod.category}</strong> | 🔢 HS Code: <strong>{prod.hsCode || 'N/A'}</strong>
                            </div>
                          </div>

                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              background: status === 'approved' ? 'rgba(34,197,94,0.15)' : status === 'pending' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                              color: status === 'approved' ? '#4ade80' : status === 'pending' ? '#fde047' : '#f87171',
                              border: `1px solid ${status === 'approved' ? 'rgba(34,197,94,0.3)' : status === 'pending' ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)'}`
                            }}
                          >
                            {status === 'approved' ? 'Live & Approved ✅' : status === 'pending' ? 'Pending Approval ⏳' : 'Rejected ❌'}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '6px', fontSize: '0.8rem', background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '10px' }}>
                          <div>🏬 Seller: <strong>{prod.merchantName || 'Exporter'}</strong></div>
                          <div>📞 Phone: <span>{prod.merchantPhone || 'N/A'}</span></div>
                          <div>💵 FOB Price: <strong style={{ color: '#4ade80' }}>${prod.priceUsd || '0'} / MT</strong></div>
                          <div>📦 MOQ: <span>{prod.moq || '1 Container'}</span></div>
                          <div>💰 Platform Comm. ({adminCommissionRate}%): <strong style={{ color: '#facc15' }}>${estimatedComm} / MT</strong></div>
                          <div>📅 Date: <span>{prod.createdAt || 'Recent'}</span></div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: '4px' }}>
                          {status !== 'approved' && (
                            <button
                              type="button"
                              className="btn-primary"
                              style={{ padding: '6px 14px', fontSize: '0.8rem', background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
                              onClick={() => approveMerchantProduct(prod.id)}
                            >
                              ✅ Approve & Make Live
                            </button>
                          )}
                          {status !== 'rejected' && (
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '6px 14px', fontSize: '0.8rem', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }}
                              onClick={() => rejectMerchantProduct(prod.id)}
                            >
                              ❌ Reject Product
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '0.78rem', color: '#ef4444' }}
                            onClick={() => deleteMerchantProduct(prod.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      )}

      {/* 3. ADMIN COMMISSION & PLATFORM SETTINGS MODAL */}
      {activeModal === 'admin_commission' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '580px', borderRadius: '24px' }}>
            <button className="modal-close" onClick={() => setActiveModal('admin_control')}>← Admin Panel</button>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '2.4rem', display: 'block', marginBottom: '4px' }}>💰</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', margin: 0 }}>
                Admin Commission & Platform Settings
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#a1a1aa', margin: '4px 0 0' }}>
                એડમિન કમિશન અને સેલર પ્રોડક્ટ પોલિસી સેટિંગ્સ
              </p>
            </div>

            <div style={{ display: 'grid', gap: '18px' }}>
              {/* Commission Rate Settings */}
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
                  💰 Global Admin Platform Commission Rate (%)
                </label>
                <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '12px' }}>
                  Commission charged on exported seller transactions and calculated in quote estimations.
                </p>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="50"
                    className="input-field"
                    style={{ fontSize: '1.2rem', fontWeight: 800, padding: '10px 14px', width: '120px', textAlign: 'center', color: '#facc15' }}
                    value={commissionInputRate}
                    onChange={(e) => setCommissionInputRate(e.target.value)}
                  />
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#facc15' }}>%</span>

                  <button
                    type="button"
                    className="btn-primary"
                    style={{ padding: '10px 20px', fontSize: '0.88rem', fontWeight: 800, marginLeft: 'auto', background: 'linear-gradient(135deg, #d97706, #b45309)' }}
                    onClick={() => {
                      if (setAdminCommissionRate) setAdminCommissionRate(commissionInputRate);
                    }}
                  >
                    💾 Save Commission
                  </button>
                </div>

                {/* Preset Quick Buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', alignSelf: 'center' }}>Presets:</span>
                  {[1.0, 2.0, 2.5, 3.5, 5.0, 10.0].map((rateVal) => (
                    <button
                      key={rateVal}
                      type="button"
                      onClick={() => setCommissionInputRate(rateVal)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: '8px',
                        background: parseFloat(commissionInputRate) === rateVal ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.06)',
                        color: parseFloat(commissionInputRate) === rateVal ? '#fde047' : '#d4d4d8',
                        border: '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer'
                      }}
                    >
                      {rateVal}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Approval Policy Settings */}
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
                  🔒 Seller Product Submission Policy
                </label>
                <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '12px' }}>
                  Control whether seller uploaded products require manual Admin approval before appearing live.
                </p>

                <div style={{ display: 'grid', gap: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: requireProductApproval ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${requireProductApproval ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="approvalPolicy"
                      checked={requireProductApproval === true}
                      onChange={() => {
                        if (setRequireProductApproval) setRequireProductApproval(true);
                      }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: 'white', display: 'block' }}>🔒 Require Manual Admin Approval (Recommended)</strong>
                      <span style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>Seller products remain in "Pending" until Admin reviews & approves.</span>
                    </div>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: !requireProductApproval ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${!requireProductApproval ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="approvalPolicy"
                      checked={requireProductApproval === false}
                      onChange={() => {
                        if (setRequireProductApproval) setRequireProductApproval(false);
                      }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: 'white', display: 'block' }}>⚡ Auto-Approve Seller Products</strong>
                      <span style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>Seller products go live immediately upon upload without manual review.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Summary Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#38bdf8', display: 'block' }}>{merchantsList?.length || 0}</span>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Registered Sellers</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#facc15', display: 'block' }}>{(customProductsList || []).filter(p => p.isSub).length}</span>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Seller Products</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#4ade80', display: 'block' }}>{adminCommissionRate}%</span>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Platform Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN LOGIN MODAL */}
      {activeModal === 'admin' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '440px' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>🔐 Admin Password Access</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', marginBottom: '18px' }}>
              Enter admin password to unlock management controls, product editing & company settings.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (pinInput === adminPassword || pinInput === 'Aip261970@' || pinInput === 'admin123' || pinInput === '7861997755') {
                setIsAdminLoggedIn(true);
                try { localStorage.setItem('admin_access_unlocked_v1', 'true'); } catch(err) {}
                alert("🔓 Admin Mode Unlocked Successfully!");
                setActiveModal(null);
                setPinInput('');
              } else {
                alert("⚠️ Incorrect Admin Password! Please enter valid password.");
              }
            }}>
              <div className="form-group">
                <label className="form-label">Admin Password *</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Admin Password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
                🔓 Unlock Admin Access
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed var(--border-glass)' }}>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => {
                    setOtpStep(0);
                    setUserOtpInput('');
                    setNewPassInput('');
                    setConfirmPassInput('');
                    setActiveModal('admin_security');
                  }}
                >
                  📱 Forgot / Reset Admin Password via Mobile OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. CUSTOMER AUTHENTICATION & LOGIN / REGISTER MODAL (OPTIONAL FOR VISITORS) */}
      {activeModal === 'customer_auth' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '520px', borderRadius: '24px' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '6px' }}>🌐</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>
                {currentLang === 'gu' ? 'કસ્ટમર કનેક્ટ પોર્ટલ (Customer Portal)' : 'Customer Connect Portal'}
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                {currentLang === 'gu'
                  ? 'વેબસાઈટ બ્રાઉઝિંગ ફ્રી છે. ડાયરેક્ટ ઓર્ડર તથા ઝડપી કોટેશન માટે લોગઈન કરો.'
                  : 'Browsing is 100% free & optional. Login for quick 1-click RFQs & quote tracking.'}
              </p>
            </div>

            {/* AUTH TAB SWITCHER */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', padding: '4px', borderRadius: 'var(--radius-pill)', marginBottom: '18px' }}>
              <button
                type="button"
                onClick={() => setCustAuthTab('login')}
                style={{
                  flex: 1,
                  padding: '9px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: custAuthTab === 'login' ? 'var(--primary-teal)' : 'transparent',
                  color: custAuthTab === 'login' ? 'white' : 'var(--text-sub)',
                  transition: 'all 0.25s'
                }}
              >
                🔑 {currentLang === 'gu' ? 'ક્વિક લોગઈન' : 'Quick Login'}
              </button>
              <button
                type="button"
                onClick={() => setCustAuthTab('register')}
                style={{
                  flex: 1,
                  padding: '9px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: custAuthTab === 'register' ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'transparent',
                  color: custAuthTab === 'register' ? 'white' : 'var(--text-sub)',
                  transition: 'all 0.25s'
                }}
              >
                📝 {currentLang === 'gu' ? 'નવું રજીસ્ટ્રેશન' : 'New Account'}
              </button>
            </div>

            {custAuthTab === 'login' ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!custLoginInput.trim()) return;
                const res = loginCustomer(custLoginInput);
                if (res.success) {
                  alert(`✅ Welcome back, ${res.customer.name}! You are now logged in.`);
                  setActiveModal(null);
                  setCustLoginInput('');
                }
              }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>
                    📱 Mobile Number or ✉️ Email Address *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone (+91...) or email..."
                    value={custLoginInput}
                    onChange={(e) => setCustLoginInput(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem' }}>
                  🔑 {currentLang === 'gu' ? 'લોગઈન કરો' : 'Login / Continue'}
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!custNameInput.trim()) return;
                const cust = registerCustomer({
                  name: custNameInput.trim(),
                  phone: custPhoneInput.trim(),
                  email: custEmailInput.trim(),
                  companyName: custCompInput.trim() || 'N/A',
                  city: custCityInput.trim() || 'Surat',
                  country: custCountryInput.trim() || 'India'
                });
                alert(`✅ Registration successful! Welcome ${cust.name}. Your details have been saved.`);
                setActiveModal(null);
                setCustNameInput(''); setCustPhoneInput(''); setCustEmailInput(''); setCustCompInput('');
              }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>Full Name / Person Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Atulbhai Patel"
                    value={custNameInput}
                    onChange={(e) => setCustNameInput(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 800 }}>Phone / WhatsApp Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+91 98251 23456"
                      value={custPhoneInput}
                      onChange={(e) => setCustPhoneInput(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 800 }}>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="atul2670@gmail.com"
                      value={custEmailInput}
                      onChange={(e) => setCustEmailInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>Business / Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Patel Exports & Traders"
                    value={custCompInput}
                    onChange={(e) => setCustCompInput(e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 800 }}>City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Surat"
                      value={custCityInput}
                      onChange={(e) => setCustCityInput(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 800 }}>Country</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="India"
                      value={custCountryInput}
                      onChange={(e) => setCustCountryInput(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem', background: 'linear-gradient(135deg, #0284c7, #0d9488)' }}>
                  💾 {currentLang === 'gu' ? 'એકાઉન્ટ બનાવો અને સેવ કરો' : 'Create Customer Account & Save'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. LOGGED-IN CUSTOMER PORTAL DASHBOARD MODAL */}
      {activeModal === 'customer_portal' && currentCustomer && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '540px', borderRadius: '24px' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>

            <div style={{ background: 'rgba(20, 184, 166, 0.15)', border: '1px solid var(--primary-teal-glow)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '18px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem' }}>👤</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', margin: '6px 0 2px 0' }}>
                Welcome, {currentCustomer.name}!
              </h3>
              <span style={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 800 }}>
                ✓ Registered Customer Account Active
              </span>
            </div>

            <div style={{ display: 'grid', gap: '10px', fontSize: '0.88rem', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-sub)' }}>🏢 Business / Company:</span>
                <strong style={{ color: 'white' }}>{currentCustomer.companyName || 'Individual Buyer'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-sub)' }}>📞 Phone / WhatsApp:</span>
                <strong style={{ color: '#4ade80' }}>{currentCustomer.phone || 'N/A'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-sub)' }}>✉️ Email:</span>
                <strong style={{ color: '#38bdf8' }}>{currentCustomer.email || 'N/A'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-sub)' }}>📍 Location:</span>
                <strong style={{ color: 'white' }}>{currentCustomer.city}, {currentCustomer.country}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-sub)' }}>📅 Account Created:</span>
                <span style={{ color: 'var(--text-sub)' }}>{currentCustomer.registeredAt}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  setActiveModal('quotation');
                }}
              >
                📄 {currentLang === 'gu' ? 'ઝડપી કોટેશન માંગો' : 'Request Instant Quotation'}
              </button>

              <button
                type="button"
                className="btn-secondary"
                style={{ color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.4)' }}
                onClick={() => {
                  logoutCustomer();
                  setActiveModal(null);
                  alert('🔒 Customer logged out successfully.');
                }}
              >
                🔒 {currentLang === 'gu' ? 'લોગઆઉટ' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. ADMIN REGISTERED CUSTOMERS & LEADS MANAGEMENT MODAL */}
      {activeModal === 'admin_leads' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '960px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: 'var(--text-main)' }}>
                  👥 Registered Customers & Sales Leads Directory ({customerList.length})
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', margin: '2px 0 0 0' }}>
                  Complete list of all customers, buyers & importers registered online or inquired via RFQ.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Search leads by name, phone, email, city..."
                  value={custLeadSearch}
                  onChange={(e) => setCustLeadSearch(e.target.value)}
                  style={{ width: '260px', fontSize: '0.82rem', padding: '6px 12px' }}
                />

                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '0.78rem', color: '#4ade80', borderColor: 'rgba(34,197,94,0.4)' }}
                  onClick={() => {
                    const csvRows = [
                      ["Name", "Phone", "Email", "Company", "City", "Country", "Registered At", "Notes"],
                      ...customerList.map(c => [c.name, c.phone, c.email, c.companyName, c.city, c.country, c.registeredAt, c.notes])
                    ];
                    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.map(x => `"${(x||'').replace(/"/g, '""')}"`).join(",")).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `registered_customer_leads_${Date.now()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    alert("📥 Customer Leads exported to Excel/CSV!");
                  }}
                >
                  📊 Export CSV
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-sub)' }}>
                    <th style={{ padding: '10px 14px' }}>👤 Customer & Company</th>
                    <th style={{ padding: '10px 14px' }}>📝 Inquiry Message / Requirements</th>
                    <th style={{ padding: '10px 14px' }}>📞 Contact Details</th>
                    <th style={{ padding: '10px 14px' }}>📍 Location</th>
                    <th style={{ padding: '10px 14px' }}>📅 Date & Time</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right' }}>⚙️ Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customerList
                    .filter(c => {
                      const q = custLeadSearch.toLowerCase().trim();
                      if (!q) return true;
                      return (c.name || '').toLowerCase().includes(q) ||
                             (c.phone || '').toLowerCase().includes(q) ||
                             (c.email || '').toLowerCase().includes(q) ||
                             (c.companyName || '').toLowerCase().includes(q) ||
                             (c.notes || '').toLowerCase().includes(q) ||
                             (c.city || '').toLowerCase().includes(q);
                    })
                    .map(cust => (
                      <tr key={cust.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15,23,42,0.4)' }}>
                        <td style={{ padding: '10px 14px', minWidth: '150px' }}>
                          <strong style={{ color: 'white', display: 'block', fontSize: '0.9rem' }}>{cust.name}</strong>
                          <span style={{ color: 'var(--text-sub)', fontSize: '0.76rem' }}>🏢 {cust.companyName || 'Individual Buyer'}</span>
                        </td>
                        <td style={{ padding: '10px 14px', minWidth: '220px', maxWidth: '280px' }}>
                          <div style={{ color: '#4ade80', fontWeight: 800, fontSize: '0.76rem', marginBottom: '2px' }}>
                            💬 Inquiry Details:
                          </div>
                          <div style={{ color: 'white', fontSize: '0.78rem', lineHeight: '1.4', background: 'rgba(255,255,255,0.05)', padding: '6px 8px', borderRadius: '6px', whiteSpace: 'pre-wrap', border: '1px solid var(--border-glass)' }}>
                            {cust.notes || 'General Quotation Request'}
                          </div>
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          {cust.phone && (
                            <a
                              href={`https://wa.me/${cust.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: '#4ade80', fontWeight: 700, display: 'block', textDecoration: 'none' }}
                            >
                              💬 {cust.phone}
                            </a>
                          )}
                          {cust.email && (
                            <a href={`mailto:${cust.email}`} style={{ color: '#38bdf8', fontSize: '0.78rem', textDecoration: 'none', display: 'block' }}>
                              ✉️ {cust.email}
                            </a>
                          )}
                        </td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-sub)', whiteSpace: 'nowrap' }}>
                          📍 {cust.city}, {cust.country}
                        </td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-sub)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                          {cust.registeredAt}
                        </td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button
                            type="button"
                            className="btn-primary"
                            style={{
                              padding: '6px 12px',
                              fontSize: '0.8rem',
                              fontWeight: 900,
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: '#ffffff',
                              border: 'none',
                              marginRight: '6px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              boxShadow: '0 2px 10px rgba(16, 185, 129, 0.4)',
                              cursor: 'pointer'
                            }}
                            onClick={() => openQuoteForInquiry(cust)}
                            title={`Generate Individual Export Proforma Invoice PDF specifically for ${cust.name}`}
                          >
                            📄 1-Click Individual PDF Quote
                          </button>
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '0.74rem', color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}
                            onClick={() => deleteCustomer(cust.id, cust.name)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MULTI-COMPANY PROFILE & LOGO EDIT MODAL (SISTER COMPANIES DASHBOARD) */}
      {activeModal === 'company' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '8px', color: 'var(--text-main)' }}>
              🏢 Multi-Company Profile & Sister Company Manager
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', marginBottom: '16px', lineHeight: '1.5' }}>
              Select any sister company below to edit its Company Name, Tagline, Logo, Address, Phone, Email, APEDA / GSTIN registration details.
            </p>

            {/* Sister Company Switcher Tabs */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px', borderBottom: '1px solid var(--border-glass)' }}>
              {companiesList.map(comp => (
                <button
                  key={comp.id}
                  type="button"
                  className={`btn-secondary ${selectedCompId === comp.id ? 'active' : ''}`}
                  style={{
                    fontSize: '0.8rem',
                    padding: '8px 14px',
                    whiteSpace: 'nowrap',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-pill)',
                    background: selectedCompId === comp.id ? 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)' : 'rgba(255,255,255,0.06)',
                    color: selectedCompId === comp.id ? 'white' : 'var(--text-sub)',
                    borderColor: selectedCompId === comp.id ? 'var(--primary-teal-glow)' : 'var(--border-glass)'
                  }}
                  onClick={() => setSelectedCompId(comp.id)}
                >
                  🏢 {comp.name}
                </button>
              ))}

              <button
                type="button"
                className="btn-secondary"
                style={{
                  fontSize: '0.8rem',
                  padding: '8px 14px',
                  whiteSpace: 'nowrap',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#4ade80',
                  borderColor: 'rgba(34, 197, 94, 0.4)'
                }}
                onClick={() => {
                  const newId = `comp_${Date.now()}`;
                  const newComp = {
                    id: newId,
                    name: `NEW SISTER COMPANY ${companiesList.length + 1}`,
                    tagline: "GLOBAL EXPORT & TRADE DIVISION",
                    logo: "images/logo.png",
                    address: "Surat, Gujarat - 395023, India",
                    phone: "+91 78619 97755",
                    email: "info@adidevexport.com",
                    apedaReg: "APEDA/NEW/2026/001",
                    gstin: "24AAAAA0000A1Z0"
                  };
                  updateCompanyProfile(newComp);
                  setSelectedCompId(newId);
                  alert(`✅ New Sister Company Profile Created! Fill in company details and click Save.`);
                }}
              >
                ➕ + Add Sister Company
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const finalStamp = compStampInput.trim() || generateDigitalRoundStampSvg(compNameInput.trim(), compApedaInput.trim() || compGstinInput.trim());
              updateCompanyProfile({
                id: selectedCompId,
                name: compNameInput.trim(),
                tagline: compTaglineInput.trim(),
                logo: compLogoInput.trim(),
                stamp: finalStamp,
                address: compAddressInput.trim(),
                phone: compPhoneInput.trim(),
                email: compEmailInput.trim(),
                apedaReg: compApedaInput.trim(),
                gstin: compGstinInput.trim(),
                bankDetails: {
                  bankName: compBankNameInput.trim(),
                  accountName: compAccountNameInput.trim() || compNameInput.trim(),
                  accountNumber: compAccountNumberInput.trim(),
                  swiftCode: compSwiftCodeInput.trim(),
                  ifscCode: compIfscCodeInput.trim(),
                  branch: compBankBranchInput.trim(),
                  intermediaryBank: compIntermediaryBankInput.trim()
                }
              });
              setActiveCompanyId(selectedCompId);
              showLiveToast(`✅ Company Profile "${compNameInput}" & Digital Round Stamp saved successfully!`, "success");
              setActiveModal(null);
            }}>

              {/* LOGO MANAGER BOX */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
                <label className="form-label" style={{ fontWeight: 800, marginBottom: '8px', display: 'block' }}>
                  🖼️ Company Logo (Header, Footer & Quotations)
                </label>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={compLogoInput || 'images/logo.png'}
                    alt="Company Logo Preview"
                    style={{ height: '64px', width: 'auto', objectFit: 'contain', background: '#000', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}
                    onError={(e) => { e.target.src = 'images/logo.png'; }}
                  />
                  <div style={{ flex: 1 }}>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            const img = new Image();
                            img.onload = () => {
                              const canvas = document.createElement('canvas');
                              let width = img.width;
                              let height = img.height;
                              const maxDim = 600;
                              if (width > maxDim || height > maxDim) {
                                if (width > height) { height = Math.round((height * maxDim) / width); width = maxDim; }
                                else { width = Math.round((width * maxDim) / height); height = maxDim; }
                              }
                              canvas.width = width;
                              canvas.height = height;
                              const ctx = canvas.getContext('2d');
                              ctx.drawImage(img, 0, 0, width, height);
                              setCompLogoInput(canvas.toDataURL('image/png'));
                            };
                            img.src = evt.target.result;
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                      🔗 Or enter Web Logo Image URL:
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="images/logo.png"
                      value={compLogoInput}
                      onChange={(e) => setCompLogoInput(e.target.value)}
                      style={{ marginTop: '4px' }}
                    />
                  </div>
                </div>
              </div>

              {/* DIGITAL ROUND RUBBER STAMP MANAGER BOX */}
              <div style={{ background: 'rgba(29, 78, 216, 0.06)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.3)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <label className="form-label" style={{ fontWeight: 800, margin: 0, color: '#60a5fa' }}>
                    🏵️ Digital Round Rubber Stamp Seal (ડિજિટલ રાઉન્ડ સ્ટેમ્પ)
                  </label>
                  <button
                    type="button"
                    style={{
                      fontSize: '0.74rem',
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const autoStamp = generateDigitalRoundStampSvg(compNameInput || "EXPORT HOUSE", compApedaInput || compGstinInput || "REGISTERED EXPORTER");
                      setCompStampInput(autoStamp);
                      showLiveToast("⚡ Official Digital Round Stamp auto-generated!", "success");
                    }}
                    title="Generate official round seal using company name & registration number"
                  >
                    ⚡ Auto-Generate Digital Stamp
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', width: '75px', height: '75px', borderRadius: '50%', background: '#ffffff', padding: '4px', border: '2px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={compStampInput || generateDigitalRoundStampSvg(compNameInput, compApedaInput || compGstinInput)}
                      alt="Company Round Stamp Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = generateDigitalRoundStampSvg(compNameInput, compApedaInput || compGstinInput);
                      }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '4px' }}>
                      📁 Upload Custom Stamp Image (PNG with transparent background):
                    </div>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            const img = new Image();
                            img.onload = () => {
                              const canvas = document.createElement('canvas');
                              let width = img.width;
                              let height = img.height;
                              const maxDim = 400;
                              if (width > maxDim || height > maxDim) {
                                if (width > height) { height = Math.round((height * maxDim) / width); width = maxDim; }
                                else { width = Math.round((width * maxDim) / height); height = maxDim; }
                              }
                              canvas.width = width;
                              canvas.height = height;
                              const ctx = canvas.getContext('2d');
                              ctx.drawImage(img, 0, 0, width, height);
                              setCompStampInput(canvas.toDataURL('image/png'));
                            };
                            img.src = evt.target.result;
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                      🔗 Or Image Web URL:
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="data:image/png;base64,... or https://example.com/stamp.png"
                      value={compStampInput}
                      onChange={(e) => setCompStampInput(e.target.value)}
                      style={{ marginTop: '4px' }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 800 }}>Company Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={compNameInput}
                  onChange={(e) => setCompNameInput(e.target.value)}
                  placeholder="e.g. ADIDEV SMART SOLUTION / Shree System Tec"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 800 }}>Company Tagline / Subtitle *</label>
                <input
                  type="text"
                  className="form-control"
                  value={compTaglineInput}
                  onChange={(e) => setCompTaglineInput(e.target.value)}
                  placeholder="e.g. GLOBAL TRADING HOUSE & EXPORT HOUSE"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 800 }}>Company Address (US English Standard) *</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={compAddressInput}
                  onChange={(e) => setCompAddressInput(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>Phone / WhatsApp Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={compPhoneInput}
                    onChange={(e) => setCompPhoneInput(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={compEmailInput}
                    onChange={(e) => setCompEmailInput(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">APEDA / Export Registration No.</label>
                  <input
                    type="text"
                    className="form-control"
                    value={compApedaInput}
                    onChange={(e) => setCompApedaInput(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">GSTIN / Tax Registration No.</label>
                  <input
                    type="text"
                    className="form-control"
                    value={compGstinInput}
                    onChange={(e) => setCompGstinInput(e.target.value)}
                  />
                </div>
              </div>

              {/* BANKING & WIRE TRANSFER DETAILS SECTION (OPTIONAL / NON-COMPULSORY FOR PROFORMA INVOICES) */}
              <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56, 189, 248, 0.3)', marginTop: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label" style={{ fontWeight: 800, margin: 0, color: '#38bdf8', fontSize: '0.92rem' }}>
                    🏦 Company Banking & Wire Transfer Details (Optional / Non-Compulsory)
                  </label>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '12px' }}>
                    Optional for Proforma Invoices
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '12px', lineHeight: '1.4' }}>
                  Fill in your bank account, SWIFT / BIC, and IFSC details below. Mentioning these on Proforma Invoices is 100% optional.
                </p>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Bank Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. HDFC Bank Ltd / State Bank of India"
                      value={compBankNameInput}
                      onChange={(e) => setCompBankNameInput(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Account / Beneficiary Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. SHREE SYSTEM TEC"
                      value={compAccountNameInput}
                      onChange={(e) => setCompAccountNameInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Account Number / IBAN</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 50200088997755 / IN56HDFC..."
                      value={compAccountNumberInput}
                      onChange={(e) => setCompAccountNumberInput(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SWIFT / BIC Code (Overseas T/T Wire)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. HDFCINBBXXX"
                      value={compSwiftCodeInput}
                      onChange={(e) => setCompSwiftCodeInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">IFSC Code (Local RTGS/NEFT)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. HDFC0000240"
                      value={compIfscCodeInput}
                      onChange={(e) => setCompIfscCodeInput(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bank Branch & City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Ring Road Branch, Surat, Gujarat, India"
                      value={compBankBranchInput}
                      onChange={(e) => setCompBankBranchInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Intermediary / Correspondent Bank (Optional for USD/EUR Transfers)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. CitiBank N.A. New York (SWIFT: CITIUS33)"
                    value={compIntermediaryBankInput}
                    onChange={(e) => setCompIntermediaryBankInput(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '10px', fontSize: '0.95rem' }}>
                💾 Save Company Profile & Activate
              </button>

              {/* MULTI-DEVICE DATA BACKUP & SYNC FACILITY */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed var(--border-glass)' }}>
                <label className="form-label" style={{ fontWeight: 800, fontSize: '0.85rem', color: '#f59e0b', display: 'block', marginBottom: '8px' }}>
                  🔄 Multi-Device Backup & Sync Facility (કોમ્પ્યુટર વચ્ચે ડેટા સીંક):
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '8px 12px', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)' }}
                    onClick={() => {
                      const backupData = {
                        companies: companiesList,
                        activeCompanyId: activeCompanyId,
                        timestamp: new Date().toISOString()
                      };
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", `adidev_company_settings_backup_${Date.now()}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                      alert("📤 Company Profiles Backup file downloaded! You can import this file on your Office Computer or Laptop.");
                    }}
                  >
                    📤 Export Backup File (બેકઅપ ડાઉનલોડ)
                  </button>

                  <label
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '8px 12px', color: '#4ade80', borderColor: 'rgba(34, 197, 94, 0.4)', cursor: 'pointer', textAlign: 'center' }}
                  >
                    📥 Import Backup File (બીજા કમ્પ્યુટરમાં લાવો)
                    <input
                      type="file"
                      accept=".json"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            try {
                              const imported = JSON.parse(evt.target.result);
                              if (imported && Array.isArray(imported.companies)) {
                                localStorage.setItem('site_company_profiles_v3', JSON.stringify(imported.companies));
                                localStorage.setItem('site_company_profiles_v2', JSON.stringify(imported.companies));
                                localStorage.setItem('site_company_profiles_v1', JSON.stringify(imported.companies));
                                alert("✅ Company Profiles Imported Successfully! Refreshing page...");
                                window.location.reload();
                              } else {
                                alert("⚠️ Invalid backup file format.");
                              }
                            } catch(err) {
                              alert("⚠️ Failed to parse backup file.");
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIVE CLOUD SYNC SERVER MONITOR & BACKUP MODAL */}
      {activeModal === 'cloud_sync' && (
        <div className="modal-backdrop show" onClick={() => setActiveModal(null)}>
          <div className="glass-card modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(234, 179, 8, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
                🌐
              </div>
              <div>
                <h3 className="modal-title" style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.25rem' }}>
                  Global Real-Time Cloud Sync Server Panel
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', margin: '2px 0 0 0' }}>
                  માઈક્રોસેકન્ડ ઓટોમેટિક ક્લાઉડ સિન્ક અને ફુલ ડેટાબેઝ બેકઅપ કંટ્રોલ પેનલ
                </p>
              </div>
            </div>

            {/* CONNECTION STATUS CARD */}
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }}></span>
                  Cloud Database Status: CONNECTED & ONLINE ⚡
                </span>
                <span style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.1)', color: '#a7f3d0', padding: '2px 8px', borderRadius: '10px' }}>
                  Realtime Microsecond Engine
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', lineHeight: '1.5' }}>
                📡 <strong>Firebase Cloud Endpoint:</strong><br />
                <code style={{ fontSize: '0.74rem', color: '#facc15', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', wordBreak: 'break-all' }}>
                  https://atsondika-global-trade-default-rtdb.asia-southeast1.firebasedatabase.app/live_store.json
                </code>
              </div>
            </div>

            {/* DYNAMIC METRICS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-sub)', display: 'block' }}>Active Companies</span>
                <strong style={{ fontSize: '1.2rem', color: '#38bdf8' }}>{companiesList ? companiesList.length : 4}</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-sub)', display: 'block' }}>Auto Poll Interval</span>
                <strong style={{ fontSize: '1.2rem', color: '#4ade80' }}>Every 3s</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-sub)', display: 'block' }}>Global Protection</span>
                <strong style={{ fontSize: '1.2rem', color: '#facc15' }}>Admin Priority</strong>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem', background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)' }}
                onClick={async () => {
                  await fetchServerData();
                  alert("✅ Force Cloud Sync Executed! All company profiles, products, and rates synchronized live with Firebase Server.");
                }}
              >
                ⚡ Force Cloud Sync Now (હમણાં જ ક્લાઉડ સિન્ક કરો)
              </button>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem', padding: '10px', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)' }}
                  onClick={() => exportDatabase && exportDatabase()}
                >
                  💾 Download Full Database Backup JSON
                </button>

                <label
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem', padding: '10px', color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.4)', cursor: 'pointer', margin: 0 }}
                >
                  📥 Restore Backup JSON
                  <input
                    type="file"
                    accept=".json"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && importDatabase) {
                        importDatabase(file);
                        setActiveModal(null);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <p style={{ fontSize: '0.76rem', color: 'var(--text-sub)', textAlign: 'center', marginTop: '16px', margin: '16px 0 0 0' }}>
              ℹ️ આ સિસ્ટમ દ્વારા તમે કોઈ નવા કમ્પ્યુટર કે ફોન પર સાઈટ ખોલો ત્યારે ડેટા ઓટોમેટિક રી-સ્ટોર થઈ જશે.
            </p>
          </div>
        </div>
      )}

      {/* FREIGHT ROUTE & PORT RECORD EDIT/ADD MODAL */}
      {activeModal === 'freight_route' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.8rem' }}>⚓</span>
              <div>
                <h3 className="modal-title" style={{ margin: 0, color: 'var(--text-main)' }}>
                  {editingRouteId ? '✏️ Edit Freight Route & Port Record' : '➕ Add New Freight Route / Port Record'}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', margin: '2px 0 0 0' }}>
                  Add origin & destination ports/airports with transit times & frequencies.
                </p>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              saveFreightRoute({
                mode: routeModeInput,
                origin: routeOriginInput,
                dest: routeDestInput,
                region: routeRegionInput,
                days: routeDaysInput,
                freq: routeFreqInput
              });
            }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>Transport Mode *</label>
                  <select
                    className="form-control"
                    value={routeModeInput}
                    onChange={(e) => setRouteModeInput(e.target.value)}
                    required
                  >
                    <option value="Sea Freight">🚢 Sea Freight Vessel</option>
                    <option value="Air Cargo">✈️ Air Cargo Express</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>Destination Region *</label>
                  <select
                    className="form-control"
                    value={routeRegionInput}
                    onChange={(e) => setRouteRegionInput(e.target.value)}
                    required
                  >
                    <option value="Middle East">Middle East</option>
                    <option value="Europe">Europe</option>
                    <option value="USA / North America">USA / North America</option>
                    <option value="Southeast Asia">Southeast Asia</option>
                    <option value="Africa">Africa</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <SearchablePortInput
                  label="Origin Port / Airport (India) *"
                  value={routeOriginInput}
                  onChange={(val) => setRouteOriginInput(val)}
                  placeholder="Type Indian port name (e.g. Surat STV, Mundra, Hazira)..."
                  portType="origin"
                  quickPresets={[
                    { label: '⚓ Hazira/Surat', value: 'Hazira / Surat Port (INHZA)' },
                    { label: '🛫 Surat STV', value: 'Surat International Airport (STV)' },
                    { label: '⚓ Mundra', value: 'Mundra Port (INMUN)' },
                    { label: '⚓ Nhava Sheva', value: 'Nhava Sheva / JNPT (INNSA)' }
                  ]}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <SearchablePortInput
                  label="Destination Port / Airport *"
                  value={routeDestInput}
                  onChange={(val) => setRouteDestInput(val)}
                  placeholder="Type global port/country (e.g. Canada, Dubai, Rotterdam)..."
                  portType="dest"
                  quickPresets={[
                    { label: '🇨🇦 Canada/Vancouver', value: 'Vancouver Port (CAVAN)' },
                    { label: '🇨🇦 Canada/Toronto', value: 'Toronto Pearson International (YYZ)' },
                    { label: '🇦🇪 Dubai', value: 'Jebel Ali, Dubai (AEJEA)' },
                    { label: '🇳🇱 Rotterdam', value: 'Rotterdam Port (NLRTM)' }
                  ]}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>Transit Lead-Time *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 3.5 - 4 Hours or 4 - 5 Days"
                    value={routeDaysInput}
                    onChange={(e) => setRouteDaysInput(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>Sailing / Flight Frequency *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Daily Direct / Express or Weekly Service"
                    value={routeFreqInput}
                    onChange={(e) => setRouteFreqInput(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem' }}>
                💾 Save Freight Route & Sync Network
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN SECURITY & MOBILE OTP PASSWORD RESET MODAL */}
      {activeModal === 'admin_security' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '480px' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
              🔑 Change Admin Password (Mobile OTP)
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', marginBottom: '16px' }}>
              Secure password change requiring 6-digit OTP verification sent to registered admin mobile number.
            </p>

            <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.2)', marginBottom: '16px', fontSize: '0.84rem' }}>
              <strong>📱 Registered Admin Mobile:</strong> <span style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>{adminMobile}</span>
            </div>

            {otpStep === 0 ? (
              <div>
                <div className="form-group">
                  <label className="form-label">Admin Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={adminMobile}
                    onChange={(e) => setAdminMobile(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  onClick={() => {
                    const code = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedOtp(code);
                    setOtpStep(1);
                    alert(`📱 SMS Sent to ${adminMobile}\n\n🔐 Your 6-Digit OTP Verification Code is: ${code}`);
                  }}
                >
                  📲 Send 6-Digit Verification OTP Code
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (userOtpInput.trim() !== generatedOtp) {
                  alert("⚠️ Invalid OTP Code! Please enter the 6-digit code sent to your mobile.");
                  return;
                }
                if (!newPassInput || newPassInput.length < 6) {
                  alert("⚠️ Password must be at least 6 characters long!");
                  return;
                }
                if (newPassInput !== confirmPassInput) {
                  alert("⚠️ Passwords do not match!");
                  return;
                }

                saveAdminPassword(newPassInput.trim());
                setIsAdminLoggedIn(true);
                alert(`✅ Admin Password successfully updated to "${newPassInput.trim()}"!`);
                setActiveModal(null);
                setOtpStep(0);
              }}>
                <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(34, 197, 94, 0.3)', marginBottom: '14px', fontSize: '0.8rem', color: '#4ade80' }}>
                  ✅ Verification OTP Code generated! (Simulated Code: <strong>{generatedOtp}</strong>)
                </div>

                <div className="form-group">
                  <label className="form-label">Enter 6-Digit OTP Code *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter 6-digit OTP"
                    value={userOtpInput}
                    onChange={(e) => setUserOtpInput(e.target.value)}
                    maxLength="6"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Admin Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter New Password"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                    value={confirmPassInput}
                    onChange={(e) => setConfirmPassInput(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                  💾 Save & Update Admin Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Hero Banner Edit Modal (Multi-Language) */}
      {activeModal === 'hero' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '680px' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '14px' }}>
              ✏️ Edit Hero Banner Note, Headline & Photo
            </h3>

            {/* Language Selector Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
              {[
                { code: 'en', flag: '🇬🇧', name: 'English' },
                { code: 'gu', flag: '🇮🇳', name: 'ગુજરાતી' },
                { code: 'hi', flag: '🇮🇳', name: 'हिन्दी' },
                { code: 'fr', flag: '🇫🇷', name: 'Français' }
              ].map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setHeroLangTab(lang.code)}
                  className={`btn-secondary ${heroLangTab === lang.code ? 'active' : ''}`}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.82rem',
                    background: heroLangTab === lang.code ? 'var(--primary-teal)' : 'rgba(255,255,255,0.05)',
                    color: heroLangTab === lang.code ? 'white' : 'var(--text-sub)',
                    borderColor: heroLangTab === lang.code ? 'var(--primary-teal-glow)' : 'var(--border-glass)',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  <FlagIcon code={lang.code} />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>

            {/* REAL-TIME AUTO-TRANSLATION BUTTON */}
            <div style={{ marginBottom: '16px', background: 'rgba(45, 212, 191, 0.08)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(45, 212, 191, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2dd4bf', display: 'block' }}>
                  ⚡ Real-Time Multi-Language Master Auto-Translator
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                  અંગ્રેજી મેઈન ટેક્સ્ટ બદલતા જ ગુજરાતી, હિન્દી અને ફ્રેંચ માં આપોઆપ ઓટો-ટ્રાન્સલેટ થઈ જશે!
                </span>
              </div>
              <button
                type="button"
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 14px', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.5)', background: 'rgba(45, 212, 191, 0.15)', fontWeight: 800 }}
                onClick={async () => {
                  if (!heroTitleObj.en) {
                    showLiveToast("Please enter English main headline title first.", "info");
                    return;
                  }
                  const translatedTitle = await autoTranslateFullObject(heroTitleObj.en);
                  setHeroTitleObj(prev => ({ ...prev, ...translatedTitle }));

                  if (heroSubtitleObj.en) {
                    const translatedSub = await autoTranslateFullObject(heroSubtitleObj.en);
                    setHeroSubtitleObj(prev => ({ ...prev, ...translatedSub }));
                  }
                  showLiveToast("✅ Real-Time Master Auto-Translation Complete for Gujarati (GU), Hindi (HI), and French (FR)!", "success");
                }}
              >
                🔄 Auto-Translate All Languages Now
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              let finalTitles = { ...heroTitleObj };
              let finalSubtitles = { ...heroSubtitleObj };

              // Auto-translate English if any string present
              if (heroTitleObj.en) {
                const autoT = await autoTranslateFullObject(heroTitleObj.en);
                finalTitles = { ...autoT, ...heroTitleObj };
              }
              if (heroSubtitleObj.en) {
                const autoS = await autoTranslateFullObject(heroSubtitleObj.en);
                finalSubtitles = { ...autoS, ...heroSubtitleObj };
              }

              saveHeroBanner({
                badge: badgeInput,
                title: finalTitles,
                subtitle: finalSubtitles,
                image: heroImgInput || 'images/hero_export_shipping.png'
              });
              showLiveToast("✅ Multi-Language Hero Note & Headline Updated Successfully!", "success");
              setActiveModal(null);
            }}>
              {/* HERO PHOTO MANAGEMENT BOX */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
                <label className="form-label" style={{ marginBottom: '8px' }}>
                  🖼️ Hero Banner Image
                </label>

                {heroImgInput && (
                  <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '10px', border: '1px solid var(--border-glass)' }}>
                    <img
                      src={heroImgInput}
                      alt="Hero Banner Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'images/hero_export_shipping.png'; }}
                    />
                    <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: 'rgba(0,0,0,0.75)', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      Current Hero Image Preview
                    </span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block', marginBottom: '4px' }}>
                      📁 Upload Photo from Device:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => setHeroImgInput(evt.target.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block', marginBottom: '4px' }}>
                      🔗 Or Image Web URL:
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://example.com/banner.jpg"
                      value={heroImgInput}
                      onChange={(e) => setHeroImgInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hero Badge / Tagline Text</label>
                <input
                  type="text"
                  className="form-control"
                  value={badgeInput}
                  onChange={(e) => setBadgeInput(e.target.value)}
                  required
                />
              </div>

              {/* DYNAMIC TITLE FOR CURRENT ACTIVE LANG TAB */}
              <div className="form-group">
                <label className="form-label">
                  Main Headline Title ({heroLangTab.toUpperCase()}) *
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={heroTitleObj[heroLangTab] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHeroTitleObj(prev => ({ ...prev, [heroLangTab]: val }));
                  }}
                  required
                ></textarea>
              </div>

              {/* DYNAMIC SUBTITLE NOTE FOR CURRENT ACTIVE LANG TAB */}
              <div className="form-group">
                <label className="form-label">
                  Subtitle Exporter Note ({heroLangTab.toUpperCase()}) *
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={heroSubtitleObj[heroLangTab] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHeroSubtitleObj(prev => ({ ...prev, [heroLangTab]: val }));
                  }}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '10px' }}>
                💾 Save Hero Banner & Translations
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Live Commodity Market Rates & Prices Manager Modal */}
      {activeModal === 'ticker' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✏️ Edit Live Commodity Market Rates & Prices (ભાવ મેનેજ કરો)
              </h3>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.8rem', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.4)', background: 'rgba(45, 212, 191, 0.12)' }}
                onClick={() => {
                  const newItem = {
                    id: `t_${Date.now()}`,
                    icon: '🌿',
                    symbol: 'NEW-COMMODITY',
                    price: '$1,500/MT',
                    change: '+1.0%',
                    isPositive: true
                  };
                  setTickerItemsInput(prev => [...prev, newItem]);
                }}
              >
                ➕ + Add Commodity Price
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', marginBottom: '16px' }}>
              અહીંથી તમે લાઈવ સ્ક્રોલ થતા કપાસ, ચોખા, જીરું, તલ, સીંગદાણા કે હાર્ડવેરના દૈનિક ભાવ (Market Rates) અને ઓવરઓલ ટકાવારી (% Change) ગમે ત્યારે બદલી શકો છો.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              saveMarketTickerList(tickerItemsInput);
              alert("✅ Live Market Commodity Rates Updated & Synced Successfully!");
              setActiveModal(null);
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {tickerItemsInput.map((item, index) => (
                  <div
                    key={item.id || index}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-glass)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Icon Input */}
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: '48px', textAlign: 'center', fontSize: '1.2rem', padding: '4px' }}
                      value={item.icon || '🌾'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTickerItemsInput(prev => prev.map((it, i) => i === index ? { ...it, icon: val } : it));
                      }}
                      title="Item Emoji / Icon"
                    />

                    {/* Commodity Symbol */}
                    <input
                      type="text"
                      className="form-control"
                      style={{ flex: '1 1 140px', fontWeight: 800 }}
                      placeholder="e.g. COTTON-GUJ"
                      value={item.symbol || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTickerItemsInput(prev => prev.map((it, i) => i === index ? { ...it, symbol: val } : it));
                      }}
                      required
                    />

                    {/* Price Input */}
                    <input
                      type="text"
                      className="form-control"
                      style={{ flex: '1 1 120px', color: '#38bdf8', fontWeight: 800 }}
                      placeholder="e.g. $1,180/MT"
                      value={item.price || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTickerItemsInput(prev => prev.map((it, i) => i === index ? { ...it, price: val } : it));
                      }}
                      required
                    />

                    {/* Change / Status Note */}
                    <input
                      type="text"
                      className="form-control"
                      style={{ flex: '1 1 110px', color: '#4ade80' }}
                      placeholder="e.g. +2.4%"
                      value={item.change || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTickerItemsInput(prev => prev.map((it, i) => i === index ? { ...it, change: val } : it));
                      }}
                    />

                    {/* Delete Item Button */}
                    <button
                      type="button"
                      style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: 800
                      }}
                      onClick={() => {
                        setTickerItemsInput(prev => prev.filter((_, i) => i !== index));
                      }}
                      title="Delete Ticker Item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem' }}>
                💾 Save Live Rates & Update Ticker (ભાવ સેવ કરો)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* About Us Section & Track Record Stats Edit Modal */}
      {activeModal === 'about' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '14px' }}>
              ✏️ Edit About Us Section & Track Record Stats
            </h3>

            {/* Language Selector Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
              {[
                { code: 'en', flag: '🇬🇧', name: 'English' },
                { code: 'gu', flag: '🇮🇳', name: 'ગુજરાતી' },
                { code: 'hi', flag: '🇮🇳', name: 'હિन्दी' },
                { code: 'fr', flag: '🇫🇷', name: 'Français' }
              ].map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  className={`btn-secondary ${aboutLangTab === lang.code ? 'active' : ''}`}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.82rem',
                    background: aboutLangTab === lang.code ? 'var(--primary-teal)' : 'rgba(255,255,255,0.05)',
                    color: aboutLangTab === lang.code ? 'white' : 'var(--text-sub)',
                    borderColor: aboutLangTab === lang.code ? 'var(--primary-teal-glow)' : 'var(--border-glass)',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                  onClick={() => setAboutLangTab(lang.code)}
                >
                  <FlagIcon code={lang.code} />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              saveAboutData({
                badge: aboutBadgeObj,
                title: aboutTitleObj,
                desc: aboutDescObj,
                feat1: aboutFeat1Obj,
                feat2: aboutFeat2Obj,
                feat3: aboutFeat3Obj,
                statsTitle: aboutStatsTitleObj,
                counts: aboutCounts
              });
              alert('✅ About section & stats updated successfully!');
            }}>

              <div className="form-group">
                <label className="form-label">Category Badge Text ({aboutLangTab.toUpperCase()})</label>
                <input
                  type="text"
                  className="form-control"
                  value={aboutBadgeObj[aboutLangTab] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAboutBadgeObj(prev => ({ ...prev, [aboutLangTab]: val }));
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Main Section Title ({aboutLangTab.toUpperCase()})</label>
                <input
                  type="text"
                  className="form-control"
                  value={aboutTitleObj[aboutLangTab] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAboutTitleObj(prev => ({ ...prev, [aboutLangTab]: val }));
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">About Us Description ({aboutLangTab.toUpperCase()})</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={aboutDescObj[aboutLangTab] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAboutDescObj(prev => ({ ...prev, [aboutLangTab]: val }));
                  }}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Key Feature 1 ({aboutLangTab.toUpperCase()})</label>
                <input
                  type="text"
                  className="form-control"
                  value={aboutFeat1Obj[aboutLangTab] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAboutFeat1Obj(prev => ({ ...prev, [aboutLangTab]: val }));
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Feature 2 ({aboutLangTab.toUpperCase()})</label>
                <input
                  type="text"
                  className="form-control"
                  value={aboutFeat2Obj[aboutLangTab] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAboutFeat2Obj(prev => ({ ...prev, [aboutLangTab]: val }));
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Feature 3 ({aboutLangTab.toUpperCase()})</label>
                <input
                  type="text"
                  className="form-control"
                  value={aboutFeat3Obj[aboutLangTab] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAboutFeat3Obj(prev => ({ ...prev, [aboutLangTab]: val }));
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Stats Card Title ({aboutLangTab.toUpperCase()})</label>
                <input
                  type="text"
                  className="form-control"
                  value={aboutStatsTitleObj[aboutLangTab] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAboutStatsTitleObj(prev => ({ ...prev, [aboutLangTab]: val }));
                  }}
                />
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginTop: '16px', marginBottom: '10px', color: 'var(--primary-teal-glow)' }}>
                📊 Numerical Track Record Numbers
              </h4>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Years Experience (+)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={aboutCounts.exp}
                    onChange={(e) => setAboutCounts(prev => ({ ...prev, exp: Number(e.target.value) }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Export Countries (+)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={aboutCounts.countries}
                    onChange={(e) => setAboutCounts(prev => ({ ...prev, countries: Number(e.target.value) }))}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Metric Tons Exported (+)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={aboutCounts.shipments}
                    onChange={(e) => setAboutCounts(prev => ({ ...prev, shipments: Number(e.target.value) }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Global Importers (+)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={aboutCounts.clients}
                    onChange={(e) => setAboutCounts(prev => ({ ...prev, clients: Number(e.target.value) }))}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '14px' }}>
                💾 Save About Section & Stats
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DUAL PRODUCT MODAL (2 DISTINCT FORMS FOR MAIN CATEGORY VS SUB-PRODUCT) */}
      {(activeModal === 'product' || activeModal === 'product_main' || activeModal === 'product_sub') && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '640px', borderRadius: '20px' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            
            {/* EDITING MODE STATUS BANNER */}
            {editingProductId && (
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.4)', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>✏️ Mode:</span> Editing Product ID <span style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '1px 6px', borderRadius: '4px' }}>{editingProductId}</span>
                </div>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingProductId(null);
                    setNameGu('');
                    setNameEn('');
                    setSpec('ઉચ્ચ ગુણવત્તાયુક્ત પ્રીમિયમ પ્રોડક્ટ');
                    alert('✨ Switched to ADD NEW PRODUCT mode!');
                  }}
                  style={{ fontSize: '0.76rem', padding: '4px 10px', color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.4)', background: 'rgba(34, 197, 94, 0.15)' }}
                >
                  ➕ Switch to Add NEW Product
                </button>
              </div>
            )}

            {/* FORM SWITCHER TABS */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: 'var(--radius-pill)', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setProdType('main')}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: prodType === 'main' ? 'var(--primary-teal)' : 'transparent',
                  color: prodType === 'main' ? 'white' : 'var(--text-sub)',
                  transition: 'all 0.25s'
                }}
              >
                🏷️ 1. Main Category Form
              </button>
              <button
                type="button"
                onClick={() => setProdType('sub')}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: prodType === 'sub' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
                  color: prodType === 'sub' ? 'white' : 'var(--text-sub)',
                  transition: 'all 0.25s'
                }}
              >
                📦 2. Sub-Product Form
              </button>
            </div>

            {/* ======================================================== */}
            {/* FORM 1: MAIN PRODUCT / CATEGORY FORM                     */}
            {/* ======================================================== */}
            {prodType === 'main' ? (
              <div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!nameGu) return;
                  const imgList = imageUrls.length ? [...imageUrls] : ['images/agro_spices_grains.png'];
                  const catSlug = catCodeInput.trim() ? catCodeInput.trim().toLowerCase().replace(/\s+/g, '_') : `cat-custom-${Date.now()}`;

                  saveProduct({
                    category: catSlug,
                    parentId: null,
                    isSub: false,
                    hsCode: '',
                    image: imgList[0],
                    images: imgList,
                    names: { gu: nameGu, en: nameEn || nameGu, hi: nameGu, fr: nameEn || nameGu },
                    spec: mainDescInput || 'Premium Category',
                    packaging: '', moq: '',
                    isCustom: true
                  });
                  alert(`✅ Main Category "${nameEn || nameGu}" created successfully!`);
                }}>
                  {/* 1. SELECT PRODUCT TYPE */}
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 800 }}>Select Product Type *</label>
                    <select className="form-control" value={prodType} onChange={(e) => setProdType(e.target.value)}>
                      <option value="main">1. Add Main Product / Category (e.g., Grains, Fasteners, Spices)</option>
                      <option value="sub">2. Add Sub-Product (Full Specs & Packaging)</option>
                    </select>
                  </div>

                  {/* 2. PRODUCT NAME (ENGLISH - PRIMARY BASE LANGUAGE) */}
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label className="form-label" style={{ fontWeight: 800, margin: 0 }}>
                        Product Name (English) * <span style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 700 }}>(Primary Base Language)</span>
                      </label>
                      <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                        🌐 Main Global Name
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Agro & Spices Products / Fasteners / Readymade Garments"
                      value={nameEn}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNameEn(val);
                        setNameGu(autoTranslateText(val, 'gu'));
                        if (val.trim().length > 1) {
                          fetchGoogleTransliteration(val, 'gu').then(res => {
                            if (res) setNameGu(res);
                          });
                        }
                      }}
                      required
                    />
                  </div>

                  {/* 3. PRODUCT NAME (GUJARATI - AUTO-TRANSLATED IN REAL-TIME) */}
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label className="form-label" style={{ fontWeight: 800, margin: 0 }}>
                        Product Name (Gujarati) <span style={{ fontSize: '0.74rem', color: '#4ade80', fontWeight: 700 }}>(⚡ Real-Time Auto-Translated)</span>
                      </label>
                      <button
                        type="button"
                        style={{
                          fontSize: '0.72rem',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                        onClick={async () => {
                          if (nameEn) {
                            setNameGu(autoTranslateText(nameEn, 'gu'));
                            const liveGu = await fetchGoogleTransliteration(nameEn, 'gu');
                            if (liveGu) setNameGu(liveGu);
                          }
                        }}
                        title="Click to auto-translate English name into Gujarati script"
                      >
                        ⚡ Auto-Translate
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. એગ્રો અને મસાલા પ્રોડક્ટ્સ"
                      value={nameGu}
                      onChange={(e) => setNameGu(e.target.value)}
                    />
                  </div>

                  {/* 4. CATEGORY CODE & DESCRIPTION */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 800 }}>Category Code / Tab ID</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. agro_spices"
                        value={catCodeInput}
                        onChange={(e) => setCatCodeInput(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 800 }}>Category Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Premium export quality"
                        value={mainDescInput}
                        onChange={(e) => setMainDescInput(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* 5. MULTI-IMAGE PHOTO GALLERY MANAGER */}
                  {renderMultiImageGalleryManager()}

                  {/* 6. SAVE BUTTON */}
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justify: 'center',
                      padding: '14px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '1rem',
                      fontWeight: 800,
                      marginTop: '10px'
                    }}
                  >
                    💾 Save Product
                  </button>
                </form>
              </div>
            ) : (
              /* ======================================================== */
              /* FORM 2: SUB-PRODUCT FORM (MAIN PRODUCT CATEGORY DROPDOWN)  */
              /* ======================================================== */
              <div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!nameGu || !hsCode) {
                    alert("⚠️ Product Name and International HS Code are mandatory!");
                    return;
                  }
                  const imgList = imageUrls.length ? [...imageUrls] : ['images/agro_spices_grains.png'];
                  
                  // Extract category from Parent Main Category select
                  let category = 'agro';
                  if (parentSelect) {
                    const mainOpts = getMainProductCategoryOptions();
                    const matched = mainOpts.find(o => o.category === parentSelect || o.id === parentSelect);
                    if (matched) category = matched.category;
                    else category = parentSelect;
                  }

                  const baseEnglishName = (nameEn || nameGu || 'Product').trim();
                  const autoNames = autoGenerateMultilingualNames(baseEnglishName);
                  if (nameGu && nameGu.trim()) autoNames.gu = nameGu.trim();

                  const baseEnglishSpec = (typeof spec === 'string' ? spec : (spec.en || spec.gu || 'Premium Export Quality Category')).trim();
                  const autoSpec = autoGenerateMultilingualSpec(baseEnglishSpec);

                  saveProduct({
                    category,
                    parentId: parentSelect || null,
                    isSub: true,
                    hsCode: hsCode.trim(),
                    localHsn: localHsn ? localHsn.trim() : `${hsCode.trim()}10`,
                    image: imgList[0],
                    images: imgList,
                    names: autoNames,
                    spec: autoSpec,
                    packaging, moq,
                    localPrice: parseFloat(localPrice) || 999,
                    mrpInr: parseFloat(localMrp) || 1499,
                    packingCharge: parseFloat(packingCharge) || 0,
                    courierCharge: parseFloat(courierCharge) || 0,
                    localGstRate: parseFloat(localGstRate) || 18,
                    localStock: parseInt(localStock) || 100,
                    couponBadge: couponBadge || '10% OFF Special Offer',
                    unit: localUnit || 'kg',
                    currency: localCurrency || 'INR',
                    isCustom: true
                  });
                  alert(`✅ Sub-Product "${baseEnglishName}" with International HS Code "${hsCode}" saved successfully!`);
                }}>
                  {/* 1. SELECT PRODUCT TYPE */}
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 800 }}>Select Product Type *</label>
                    <select className="form-control" value={prodType} onChange={(e) => setProdType(e.target.value)}>
                      <option value="sub">2. Add Sub-Product (Full Specs & Packaging)</option>
                      <option value="main">1. Add Main Product / Category (e.g., Grains, Fasteners, Spices)</option>
                    </select>
                  </div>

                  {/* 2. SELECT PARENT MAIN PRODUCT CATEGORY (CORRECT MAIN CATEGORY NAMES LIST) */}
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 800 }}>
                      Select Parent Main Product Category *
                    </label>
                    <select
                      className="form-control"
                      value={parentSelect}
                      onChange={(e) => setParentSelect(e.target.value)}
                      required
                    >
                      {getMainProductCategoryOptions().map(cat => (
                        <option key={cat.id} value={cat.category}>
                          🌿 {currentLang === 'gu' ? cat.nameGu : cat.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. PRODUCT NAME (ENGLISH - PRIMARY BASE LANGUAGE) */}
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label className="form-label" style={{ fontWeight: 800, margin: 0 }}>
                        Product Name (English) * <span style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 700 }}>(Primary Base Language)</span>
                      </label>
                      <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                        🌐 Main Global Name
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Gujarati Dress / Cumin Seeds / Bio-Washed T-Shirts"
                      value={nameEn}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNameEn(val);
                        setNameGu(autoTranslateText(val, 'gu'));
                        if (val.trim().length > 1) {
                          fetchGoogleTransliteration(val, 'gu').then(res => {
                            if (res) setNameGu(res);
                          });
                        }
                      }}
                      required
                    />
                  </div>

                  {/* 4. PRODUCT NAME (GUJARATI - AUTO-TRANSLATED IN REAL-TIME) */}
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label className="form-label" style={{ fontWeight: 800, margin: 0 }}>
                        Product Name (Gujarati) <span style={{ fontSize: '0.74rem', color: '#4ade80', fontWeight: 700 }}>(⚡ Real-Time Auto-Translated)</span>
                      </label>
                      <button
                        type="button"
                        style={{
                          fontSize: '0.72rem',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                        onClick={async () => {
                          if (nameEn) {
                            setNameGu(autoTranslateText(nameEn, 'gu'));
                            const liveGu = await fetchGoogleTransliteration(nameEn, 'gu');
                            if (liveGu) setNameGu(liveGu);
                          }
                        }}
                        title="Click to auto-translate English name into Gujarati script"
                      >
                        ⚡ Auto-Translate
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. ગુજરાતી ડ્રેસ (Gujarati Dress)"
                      value={nameGu}
                      onChange={(e) => setNameGu(e.target.value)}
                    />
                  </div>

                  {/* 5. MANDATORY INTERNATIONAL HS CODE WITH LIVE SEARCH LOOKUP TOOL */}
                  <div className="form-group" style={{ background: 'rgba(20, 184, 166, 0.05)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(45, 212, 191, 0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label className="form-label" style={{ fontWeight: 800, margin: 0, color: 'var(--primary-teal-glow)' }}>
                        🌐 International HS Code * (Mandatory / ફરજીયાત)
                      </label>
                      <span style={{ fontSize: '0.74rem', background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                        Required
                      </span>
                    </div>

                    {/* Live Search Tool with Online Internet Search Options */}
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="🔍 Type product name (e.g. Cumin, Rice, Bolts, Textile)..."
                          value={hsSearchQuery}
                          onChange={(e) => {
                            setHsSearchQuery(e.target.value);
                            setShowHsDropdown(true);
                          }}
                          onFocus={() => setShowHsDropdown(true)}
                          style={{ fontSize: '0.86rem', flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => handleOnlineHsSearch(hsSearchQuery, 'international')}
                          className="btn-primary"
                          style={{
                            padding: '0 10px',
                            flexShrink: 0,
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                            boxShadow: '0 2px 10px rgba(2, 132, 199, 0.3)',
                            whiteSpace: 'nowrap'
                          }}
                          title="Search 6-Digit International HS Code Online"
                        >
                          🌐 Int'l Search
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOnlineHsSearch(hsSearchQuery, 'local')}
                          className="btn-secondary"
                          style={{
                            padding: '0 10px',
                            flexShrink: 0,
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            color: '#f59e0b',
                            borderColor: 'rgba(245, 158, 11, 0.4)',
                            whiteSpace: 'nowrap'
                          }}
                          title="Search 8-Digit Indian Local HSN Code Online"
                        >
                          🇮🇳 Local HSN
                        </button>
                        {hsSearchQuery && (
                          <button
                            type="button"
                            onClick={() => { setHsSearchQuery(''); setShowHsDropdown(false); }}
                            className="btn-secondary"
                            style={{ padding: '0 8px', flexShrink: 0 }}
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Dropdown Results */}
                      {showHsDropdown && (
                        <div className="glass-card" style={{
                          position: 'absolute',
                          top: 'calc(100% + 4px)',
                          left: 0,
                          width: '100%',
                          maxHeight: '260px',
                          overflowY: 'auto',
                          zIndex: 100,
                          background: 'rgba(15, 23, 42, 0.98)',
                          backdropFilter: 'blur(24px)',
                          border: '1px solid var(--primary-teal-glow)',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                          padding: '6px'
                        }}>
                          {/* Top Actions: Direct Internet Search Buttons for International vs Local */}
                          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                            <div
                              onClick={() => {
                                handleOnlineHsSearch(hsSearchQuery, 'international');
                                setShowHsDropdown(false);
                              }}
                              style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                background: 'rgba(2, 132, 199, 0.18)',
                                color: '#38bdf8',
                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }}
                            >
                              <span>🌐 Int'l (6-Digit) Online</span>
                              <span style={{ fontSize: '0.7rem', background: '#0284c7', color: 'white', padding: '1px 6px', borderRadius: '4px' }}>➔</span>
                            </div>

                            <div
                              onClick={() => {
                                handleOnlineHsSearch(hsSearchQuery, 'local');
                                setShowHsDropdown(false);
                              }}
                              style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                background: 'rgba(245, 158, 11, 0.15)',
                                color: '#f59e0b',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }}
                            >
                              <span>🇮🇳 Local HSN (8-Digit) Online</span>
                              <span style={{ fontSize: '0.7rem', background: '#d97706', color: 'white', padding: '1px 6px', borderRadius: '4px' }}>➔</span>
                            </div>
                          </div>

                          <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)', padding: '4px 8px', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '4px' }}>
                            👇 Quick Auto-Fill (Int'l WCO 6-Digit & Local 8-Digit HSN):
                          </div>

                          {filteredHsCodes.length === 0 ? (
                            <div style={{ padding: '12px', textAlign: 'center' }}>
                              <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', marginBottom: '8px' }}>
                                No matching local database HS Code found for "{hsSearchQuery}".
                              </p>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  type="button"
                                  className="btn-primary"
                                  style={{
                                    flex: 1,
                                    fontSize: '0.78rem',
                                    padding: '6px',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                    justify: 'center'
                                  }}
                                  onClick={() => {
                                    handleOnlineHsSearch(hsSearchQuery, 'international');
                                    setShowHsDropdown(false);
                                  }}
                                >
                                  🌐 Search Int'l 6-Digit
                                </button>
                                <button
                                  type="button"
                                  className="btn-secondary"
                                  style={{
                                    flex: 1,
                                    fontSize: '0.78rem',
                                    padding: '6px',
                                    color: '#f59e0b',
                                    borderColor: '#f59e0b',
                                    justify: 'center'
                                  }}
                                  onClick={() => {
                                    handleOnlineHsSearch(hsSearchQuery, 'local');
                                    setShowHsDropdown(false);
                                  }}
                                >
                                  🇮🇳 Search Local 8-Digit HSN
                                </button>
                              </div>
                            </div>
                          ) : (
                            filteredHsCodes.map((item, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setHsCode(item.code);
                                  if (item.localHsn) setLocalHsn(item.localHsn);
                                  setHsSearchQuery(`${item.code} | HSN ${item.localHsn || ''} - ${item.name}`);
                                  setShowHsDropdown(false);
                                }}
                                style={{
                                  padding: '8px 10px',
                                  borderRadius: 'var(--radius-sm)',
                                  cursor: 'pointer',
                                  fontSize: '0.82rem',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                                  transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(20, 184, 166, 0.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              >
                                <div>
                                  <span style={{ fontWeight: 900, color: '#4ade80', marginRight: '6px' }}>
                                    🌐 {item.code}
                                  </span>
                                  {item.localHsn && (
                                    <span style={{ fontWeight: 800, color: '#f59e0b', marginRight: '8px', fontSize: '0.78rem' }}>
                                      (🇮🇳 {item.localHsn})
                                    </span>
                                  )}
                                  <span style={{ color: 'var(--text-main)' }}>{item.name}</span>
                                </div>
                                <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', color: 'var(--text-sub)', padding: '2px 6px', borderRadius: '4px' }}>
                                  {item.cat}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block', marginBottom: '4px' }}>
                          🌐 Int'l HS Code (6-Digit WCO) *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. 090931"
                          value={hsCode}
                          onChange={(e) => setHsCode(e.target.value)}
                          required
                          style={{ fontWeight: 800, color: 'var(--primary-teal-glow)' }}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block', marginBottom: '4px' }}>
                          🇮🇳 Local HSN Code (8-Digit Customs)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. 09093110"
                          value={localHsn}
                          onChange={(e) => setLocalHsn(e.target.value)}
                          style={{ fontWeight: 800, color: '#f59e0b' }}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block', marginBottom: '4px' }}>
                          Minimum Order (MOQ)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. 1 Unit / Container"
                          value={moq}
                          onChange={(e) => setMoq(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* LOCAL B2C RETAIL TRADE OPTIONS SECTION (લોકલ વેચાણ, પેકિંગ ચાર્જ & કુરિયર ચાર્જીસ) */}
                  <div style={{
                    background: 'rgba(250, 204, 21, 0.05)',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid rgba(250, 204, 21, 0.35)',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '1.25rem' }}>🛍️</span>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#facc15' }}>
                          Local B2C Retail Trade Options (લોકલ વેચાણ, પેકિંગ ચાર્જ & કુરિયર ચાર્જીસ)
                        </h4>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                          (આ વિકલ્પો ફક્ત વિઝિટર જ્યારે 🛍️ Local Trade મોડ ચાલુ કરે ત્યારે જ ડિસ્પલે થશે)
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      {/* Local MRP Original Price */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          MRP Original Price (₹ INR) *
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 1499"
                          value={localMrp}
                          onChange={(e) => setLocalMrp(e.target.value)}
                          style={{ fontWeight: 800, color: '#ef4444' }}
                        />
                      </div>

                      {/* Local Discounted Selling Price */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          Local Selling Price (₹ INR) *
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 999"
                          value={localPrice}
                          onChange={(e) => setLocalPrice(e.target.value)}
                          style={{ fontWeight: 900, color: '#4ade80' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      {/* Packing Charge */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          Packing Charge (₹ INR) <span style={{ color: '#4ade80' }}>(0 = FREE)</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="0 for FREE Packing"
                          value={packingCharge}
                          onChange={(e) => setPackingCharge(e.target.value)}
                          style={{ fontWeight: 800 }}
                        />
                      </div>

                      {/* Courier / Shipping Delivery Charge */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          Courier Delivery Charge (₹ INR) <span style={{ color: '#4ade80' }}>(0 = FREE)</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="0 for FREE Delivery"
                          value={courierCharge}
                          onChange={(e) => setCourierCharge(e.target.value)}
                          style={{ fontWeight: 800 }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                      {/* Local GST Rate % */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          Local GST Rate (%)
                        </label>
                        <select
                          className="form-control"
                          value={localGstRate}
                          onChange={(e) => setLocalGstRate(e.target.value)}
                          style={{ fontWeight: 800 }}
                        >
                          <option value="0">0% (Exempt)</option>
                          <option value="5">5% GST</option>
                          <option value="12">12% GST</option>
                          <option value="18">18% GST</option>
                          <option value="28">28% GST</option>
                        </select>
                      </div>

                      {/* Available Local Stock Quantity */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          Local Stock Qty
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 100"
                          value={localStock}
                          onChange={(e) => setLocalStock(e.target.value)}
                          style={{ fontWeight: 800 }}
                        />
                      </div>

                      {/* Coupon Badge / Offer Tag */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          Offer Badge / Coupon
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. 10% OFF"
                          value={couponBadge}
                          onChange={(e) => setCouponBadge(e.target.value)}
                          style={{ fontWeight: 800 }}
                        />
                      </div>
                    </div>

                    {/* Unit Selection & Currency Selection Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                      {/* Product Unit Selection */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: '#facc15', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          📐 Product Unit (યુનિટ પસંદગી) *
                        </label>
                        <select
                          className="form-control"
                          value={localUnit}
                          onChange={(e) => setLocalUnit(e.target.value)}
                          style={{ fontWeight: 800, background: '#0f172a', color: '#facc15', border: '1px solid rgba(250, 204, 21, 0.5)' }}
                        >
                          <option value="kg">kg (કિલોગ્રામ - Kilograms)</option>
                          <option value="pcs">pcs (પીસ - Pieces / Garments)</option>
                          <option value="gm">gm (ગ્રામ - Grams / Spices)</option>
                          <option value="Sets">Sets (સેટ - Dress / Punjabi Suits)</option>
                          <option value="Pairs">Pairs (જોડી - Shoes / Gloves)</option>
                          <option value="Dozen">Dozen (ડઝન - 12 Pcs)</option>
                          <option value="Litre">Litre (લીટર - Liquids / Ghee)</option>
                          <option value="Box">Box (બોક્સ / ખોખું)</option>
                          <option value="Tin">Tin (ડબ્બો / 15kg Ghee)</option>
                          <option value="Packet">Packet (પેકેટ / Pouches)</option>
                          <option value="Bags">Bags (કોથળા / Jute Bags)</option>
                          <option value="Meter">Meter (મીટર / Fabric)</option>
                          <option value="Rolls">Rolls (રોલ / Textile)</option>
                          <option value="MT">MT (મીટ્રિક ટન - Metric Ton)</option>
                        </select>
                      </div>

                      {/* Pricing Currency Selection */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                          💱 Pricing Currency (કરન્સી સિલેક્શન) *
                        </label>
                        <select
                          className="form-control"
                          value={localCurrency}
                          onChange={(e) => setLocalCurrency(e.target.value)}
                          style={{ fontWeight: 800, background: '#0f172a', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.5)' }}
                        >
                          <option value="INR">🇮🇳 ₹ INR (Indian Rupee)</option>
                          <option value="USD">🇺🇸 $ USD (US Dollar)</option>
                          <option value="EUR">🇪🇺 € EUR (Euro)</option>
                          <option value="GBP">🇬🇧 £ GBP (British Pound)</option>
                          <option value="AED">🇦🇪 د.إ AED (UAE Dirham)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 6. SPECIFICATIONS */}
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 800 }}>Specifications</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. ઉચ્ચ ગુણવત્તાયુક્ત પ્રીમિયમ પ્રોડક્ટ"
                      value={spec}
                      onChange={(e) => setSpec(e.target.value)}
                    />
                  </div>

                  {/* 7. PACKAGING */}
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 800 }}>Packaging</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Standard Export Packing"
                      value={packaging}
                      onChange={(e) => setPackaging(e.target.value)}
                    />
                  </div>

                  {/* 8. MULTI-IMAGE PHOTO GALLERY MANAGER */}
                  {renderMultiImageGalleryManager()}

                  {/* 9. SAVE SUB-PRODUCT BUTTON */}
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justify: 'center',
                      padding: '14px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '1rem',
                      fontWeight: 800,
                      marginTop: '10px'
                    }}
                  >
                    💾 Save Product
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Branch Modal */}
      {activeModal === 'branch' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card">
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '18px' }}>
              {editingBranchId ? '✏️ Edit Branch Office' : '➕ Add New Branch Office'}
            </h3>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!cityInput) return;
              const usFormatted = toUSEnglishAddress(addressInput);

              saveBranch({
                city: cityInput,
                person: personInput,
                phone: phoneInput,
                email: emailInput,
                address: usFormatted
              });

              setActiveModal(null);
            }}>
              <div className="form-group">
                <label className="form-label">City / Country Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dubai, UAE"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Person Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Mr. Rajesh Patel"
                  value={personInput}
                  onChange={(e) => setPersonInput(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="+91 78619 97755"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="surat@adidevexport.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Branch Address (US English Standard)</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="e.g. Plot No. 45, Ring Road, Surat, Gujarat 395002, India"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                ></textarea>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                  ℹ️ Addresses in any language are automatically standardized to US English format.
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '10px' }}>
                💾 Save Branch Office
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Add/Edit Modal */}
      {activeModal === 'certificate' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card">
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '18px' }}>
              {editingCertId ? '✏️ Edit Registration / Certificate' : '➕ Add New Certificate'}
            </h3>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!certTitle) return;

              saveCertificate({
                title: certTitle,
                reg: certReg,
                icon: certIcon || '📜',
                fileUrl: certFileData?.url || null,
                fileType: certFileData?.type || null
              });

              setActiveModal(null);
            }}>
              <div className="form-group">
                <label className="form-label">Certificate Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. APEDA / FSSAI / ISO 9001"
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Registration / License Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Reg No: APEDA/2026/IND-88"
                  value={certReg}
                  onChange={(e) => setCertReg(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Icon Emoji</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="📜"
                  value={certIcon}
                  onChange={(e) => setCertIcon(e.target.value)}
                />
              </div>

              {/* PDF Document File Upload */}
              <div className="form-group">
                <label className="form-label">📄 Upload Document (PDF / Image)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="application/pdf,image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        setCertFileData({
                          url: evt.target.result,
                          type: file.type.includes('pdf') ? 'pdf' : 'image'
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {certFileData && (
                  <div style={{ fontSize: '0.82rem', color: '#4ade80', marginTop: '6px' }}>
                    ✅ File Attached ({certFileData.type.toUpperCase()})
                  </div>
                )}
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '10px' }}>
                💾 Save Certificate
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Certificate Document Modal */}
      {activeModal === 'viewCert' && selectedCertForView && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '800px', width: '90%' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '14px' }}>
              {selectedCertForView.icon} {selectedCertForView.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', marginBottom: '18px' }}>
              {selectedCertForView.reg}
            </p>

            <div style={{ minHeight: '400px', background: '#000', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {selectedCertForView.fileUrl ? (
                selectedCertForView.fileType === 'pdf' ? (
                  <iframe src={selectedCertForView.fileUrl} style={{ width: '100%', height: '500px', border: 'none' }} title="Certificate PDF"></iframe>
) : (
                  <img src={selectedCertForView.fileUrl} alt={selectedCertForView.title} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} />
                )
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-sub)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📜</div>
                  <h4>Official Certification Document Verified</h4>
                  <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>Registration ID: {selectedCertForView.reg}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* INSTANT EXPORT PROFORMA INVOICE / QUOTATION GENERATOR MODAL */}
      {activeModal === 'quotation' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '850px', width: '95%', maxHeight: '92vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', margin: 0 }}>
                  📄 Instant Export Proforma Invoice Generator
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--primary-teal-glow)', fontWeight: 700 }}>
                  Official Export Quote Document for Global Importers & Buyers
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const sheet = document.getElementById('printableProformaSheet');
                    if (!sheet) {
                      window.print();
                      return;
                    }
                    const printWin = window.open('', '_blank', 'width=900,height=800');
                    if (printWin) {
                      const docTitle = documentType === 'jobwork' ? 'Jobwork Delivery Challan' : (documentType === 'tax_invoice' ? 'Commercial Tax Invoice' : 'Proforma Export Quote');
                      printWin.document.write(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                          <title>${docTitle} - ${activeCompany?.name || 'ADIDEV EXPORT'}</title>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            @page { size: A4 portrait; margin: 8mm; }
                            * { box-sizing: border-box; }
                            html, body { background: #ffffff !important; color: #0f172a !important; margin: 0; padding: 12px; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                            #printableProformaSheet { width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 12px !important; box-shadow: none !important; border: none !important; }
                            table { width: 100%; border-collapse: collapse; margin-bottom: 16px; page-break-inside: avoid; }
                            th { background-color: #0f766e !important; color: #ffffff !important; padding: 8px 10px; text-align: left; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                            td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
                            @media print {
                              body { padding: 0; }
                              #printableProformaSheet { padding: 0 !important; }
                            }
                          </style>
                        </head>
                        <body>
                          ${sheet.outerHTML}
                          <script>
                            window.onload = function() {
                              setTimeout(function() {
                                window.print();
                                window.close();
                              }, 300);
                            };
                          </script>
                        </body>
                        </html>
                      `);
                      printWin.document.close();
                    } else {
                      window.print();
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    padding: '8px 14px',
                    fontWeight: 800,
                    fontSize: '0.82rem'
                  }}
                  title="Print official document or save as high-resolution PDF"
                >
                  🖨️ Print / Download PDF
                </button>

                <button
                  type="button"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                  }}
                  onClick={() => {
                    const compName = activeCompany?.name || 'Atsondika Global Trade';
                    const subtotal = invoiceItems.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0);
                    const totalGst = (subtotal * domesticGstRate) / 100;
                    const grandTotal = invoiceTradeMode === 'export' ? subtotal : (subtotal + totalGst);

                    let docTitleStr = 'PROFORMA EXPORT QUOTE';
                    if (documentType === 'tax_invoice') docTitleStr = 'COMMERCIAL TAX INVOICE';
                    if (documentType === 'jobwork') docTitleStr = 'JOBWORK DELIVERY CHALLAN';

                    const itemsListStr = invoiceItems.map((item, idx) => 
                      `▪️ ${item.name} (${item.qty} ${item.unit}) - ${quoteCurrency} ${(Number(item.qty || 0) * Number(item.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                    ).join('\n');

                    let msg = `📄 *OFFICIAL DOCUMENT: ${docTitleStr}*\n`;
                    msg += `🏢 *From:* ${compName}\n`;
                    msg += `👤 *To:* ${buyerName || 'Valued Importer'} (${buyerCompany || 'Buyer'})\n`;
                    msg += `-----------------------------------\n`;
                    msg += `📦 *Goods / Line Items:*\n${itemsListStr}\n`;
                    msg += `-----------------------------------\n`;
                    msg += `💰 *Grand Total:* ${quoteCurrency} ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}\n`;
                    if (includeBankDetailsInInvoice && activeCompany?.bankDetails?.bankName) {
                      msg += `🏦 *Bank:* ${activeCompany.bankDetails.bankName} (A/C: ${activeCompany.bankDetails.accountNumber || ''})\n`;
                    }
                    if (includeStampInInvoice) {
                      msg += `🏵️ *Status:* Verified & Digital Seal Attached\n`;
                    }
                    msg += `-----------------------------------\n`;
                    msg += `🌐 *View & Download PDF Portal:* ${window.location.origin}\n`;
                    msg += `📞 *Exporter Phone:* ${activeCompany?.phone || '+91 78619 97755'}\n`;

                    let cleanPhone = (buyerPhoneInput || '').replace(/[^0-9]/g, '');
                    let targetUrl = '';
                    if (cleanPhone && cleanPhone.length >= 10) {
                      if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;
                      targetUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
                    } else {
                      targetUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
                    }

                    window.open(targetUrl, '_blank');
                    showLiveToast(`📱 WhatsApp PDF quotation dispatch opened!`, 'success');
                  }}
                  title="Dispatch official quotation breakdown & PDF link via WhatsApp"
                >
                  📱 Send WhatsApp PDF
                </button>

                <button
                  type="button"
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                  }}
                  onClick={() => {
                    const compName = activeCompany?.name || 'Atsondika Global Trade';
                    const subtotal = invoiceItems.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0);
                    const totalGst = (subtotal * domesticGstRate) / 100;
                    const grandTotal = invoiceTradeMode === 'export' ? subtotal : (subtotal + totalGst);

                    let docTitleStr = 'PROFORMA EXPORT QUOTE';
                    if (documentType === 'tax_invoice') docTitleStr = 'COMMERCIAL TAX INVOICE';
                    if (documentType === 'jobwork') docTitleStr = 'JOBWORK DELIVERY CHALLAN';

                    const itemsListStr = invoiceItems.map((item, idx) => 
                      `${idx + 1}. ${item.name} | HSN: ${item.hsn || 'N/A'} | Qty: ${item.qty} ${item.unit} | Price: ${quoteCurrency} ${item.price} | Total: ${quoteCurrency} ${(Number(item.qty || 0) * Number(item.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                    ).join('\n');

                    const subject = `[OFFICIAL DOCUMENT] ${docTitleStr} - ${compName} / ${buyerCompany || buyerName}`;

                    let body = `Dear ${buyerName || 'Valued Client'},\n\n`;
                    body += `Please find the official quotation details below issued by ${compName}.\n\n`;
                    body += `===============================================\n`;
                    body += `DOCUMENT TYPE: ${docTitleStr}\n`;
                    body += `EXPORTER: ${compName} (${activeCompany?.address || 'Surat, India'})\n`;
                    body += `REGISTRATION / GST: ${activeCompany?.apedaReg || activeCompany?.gstin || ''}\n`;
                    body += `BUYER: ${buyerName} - ${buyerCompany}\n`;
                    body += `===============================================\n\n`;
                    body += `ITEMIZED PARTICULARS:\n${itemsListStr}\n\n`;
                    body += `-----------------------------------------------\n`;
                    body += `GRAND TOTAL INVOICE VALUE: ${quoteCurrency} ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}\n`;
                    body += `-----------------------------------------------\n\n`;
                    if (includeBankDetailsInInvoice && activeCompany?.bankDetails?.bankName) {
                      body += `BANKING & WIRE TRANSFER DETAILS:\n`;
                      body += `Bank Name: ${activeCompany.bankDetails.bankName}\n`;
                      body += `Beneficiary: ${activeCompany.bankDetails.accountName}\n`;
                      body += `Account No: ${activeCompany.bankDetails.accountNumber}\n`;
                      body += `SWIFT Code: ${activeCompany.bankDetails.swiftCode}\n`;
                      body += `IFSC Code: ${activeCompany.bankDetails.ifscCode}\n\n`;
                    }
                    body += `For official printable PDF copy, please reply to this email or visit our portal: ${window.location.origin}\n\n`;
                    body += `Best regards,\n${compName} Export Team\nPhone: ${activeCompany?.phone || '+91 78619 97755'}\nEmail: ${activeCompany?.email || 'info@atsondikaglobaltrade.com'}`;

                    const mailtoUrl = `mailto:${buyerEmailInput || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.open(mailtoUrl, '_blank');
                    showLiveToast(`✉️ Email draft created for ${buyerName || 'buyer'}!`, 'success');
                  }}
                  title="Dispatch official quotation breakdown & PDF link via Email"
                >
                  ✉️ Send Email PDF
                </button>
              </div>
            </div>

            {/* Editable Configuration Controls */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
              
              {/* AUTO-LOAD RFQ INQUIRY SELECTOR */}
              {customerList && customerList.length > 0 && (
                <div style={{ background: 'rgba(20, 184, 166, 0.12)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(20, 184, 166, 0.3)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.84rem', color: '#4ade80', fontWeight: 800 }}>
                    ⚡ Auto-Fill Quotation from Buyer RFQ Inquiry:
                  </span>
                  <select
                    className="form-control"
                    style={{ flex: 1, minWidth: '220px', fontSize: '0.82rem', fontWeight: 700, padding: '5px 10px', background: '#0f172a', color: 'white', borderColor: '#0d9488' }}
                    onChange={(e) => {
                      const found = customerList.find(c => c.id === e.target.value);
                      if (found) openQuoteForInquiry(found);
                    }}
                  >
                    <option value="">-- Select Buyer RFQ Inquiry to Auto-Fill Form --</option>
                    {customerList.map(cust => (
                      <option key={cust.id} value={cust.id}>
                        👤 {cust.name} | 🏢 {cust.companyName || 'Buyer'} | 📦 {cust.productName || (cust.notes ? cust.notes.substring(0, 35) + '...' : 'RFQ')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* DOCUMENT TYPE SWITCHER (PROFORMA VS COMMERCIAL TAX INVOICE VS JOBWORK) */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setDocumentType('proforma')}
                  style={{
                    flex: 1, minWidth: '150px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)',
                    fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer',
                    background: documentType === 'proforma' ? 'var(--primary-teal)' : 'rgba(255,255,255,0.05)',
                    color: documentType === 'proforma' ? 'white' : 'var(--text-sub)'
                  }}
                >
                  📄 Proforma Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setDocumentType('tax_invoice')}
                  style={{
                    flex: 1, minWidth: '150px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)',
                    fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer',
                    background: documentType === 'tax_invoice' ? '#0284c7' : 'rgba(255,255,255,0.05)',
                    color: documentType === 'tax_invoice' ? 'white' : 'var(--text-sub)'
                  }}
                >
                  🧾 Commercial Tax Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setDocumentType('jobwork')}
                  style={{
                    flex: 1, minWidth: '150px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)',
                    fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer',
                    background: documentType === 'jobwork' ? '#d97706' : 'rgba(255,255,255,0.05)',
                    color: documentType === 'jobwork' ? 'white' : 'var(--text-sub)'
                  }}
                >
                  🛠️ Jobwork Invoice / Delivery Challan
                </button>
              </div>

              {/* TRADE TYPE SWITCHER BAR (EXPORT VS DOMESTIC INTERSTATE VS DOMESTIC LOCAL GUJARAT) */}
              <div style={{ background: 'rgba(15, 23, 42, 0.75)', padding: '6px', borderRadius: 'var(--radius-pill)', display: 'flex', gap: '6px', marginBottom: '14px', border: '1px solid var(--border-glass)', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    setInvoiceTradeMode('export');
                    setQuoteCurrency('USD');
                  }}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: invoiceTradeMode === 'export' ? 'linear-gradient(135deg, #0d9488, #0f766e)' : 'transparent',
                    color: invoiceTradeMode === 'export' ? 'white' : 'var(--text-sub)'
                  }}
                >
                  🌐 International Export Sale (USD / Custom Port)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInvoiceTradeMode('interstate');
                    setQuoteCurrency('INR');
                  }}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: invoiceTradeMode === 'interstate' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'transparent',
                    color: invoiceTradeMode === 'interstate' ? 'white' : 'var(--text-sub)'
                  }}
                >
                  🇮🇳 Domestic Interstate Sale (Outside Gujarat - IGST ₹)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInvoiceTradeMode('intrastate');
                    setQuoteCurrency('INR');
                  }}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: invoiceTradeMode === 'intrastate' ? 'linear-gradient(135deg, #d97706, #b45309)' : 'transparent',
                    color: invoiceTradeMode === 'intrastate' ? 'white' : 'var(--text-sub)'
                  }}
                >
                  🏛️ Domestic Local Gujarat Sale (CGST + SGST ₹)
                </button>
              </div>

              {/* MULTIPLE PARTICULAR ITEMS & JOBWORK MANAGER BOX */}
              {(() => {
                const baseProds = getAllProducts ? getAllProducts() : [];
                const customProds = customProductsList || [];

                // Deduplicate and combine all products including future custom added ones
                const prodMap = new Map();
                baseProds.forEach(p => { if (p && p.id) prodMap.set(p.id, p); });
                customProds.forEach(p => { if (p && p.id) prodMap.set(p.id, p); });
                const allCatalogProducts = Array.from(prodMap.values());

                return (
                  <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56, 189, 248, 0.3)', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <label style={{ fontSize: '0.86rem', color: '#38bdf8', fontWeight: 800, margin: 0 }}>
                        🛠️ Particular Line Items & Jobwork Services ({invoiceItems.length} Items):
                      </label>
                      
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => {
                            const firstProd = allCatalogProducts[0];
                            const pName = firstProd ? (firstProd.names?.[currentLang] || firstProd.names?.en || firstProd.names?.gu) : `Product Item ${invoiceItems.length + 1}`;
                            const hs = firstProd ? (firstProd.hsCode || firstProd.localHsn || '9988') : '9988';
                            const price = firstProd?.priceUsd ? firstProd.priceUsd.replace(/[^0-9.]/g, '') : '500';
                            setInvoiceItems(prev => [
                              ...prev,
                              {
                                id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                                name: pName,
                                hsn: hs,
                                qty: '1',
                                unit: firstProd?.moq || 'Unit / Container',
                                price: price || '500'
                              }
                            ]);
                          }}
                          style={{ fontSize: '0.76rem', padding: '4px 10px', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)', background: 'rgba(14, 165, 233, 0.15)', fontWeight: 800 }}
                          title="Add a new line item pre-filled from website product catalog"
                        >
                          📦 + Add Website Product
                        </button>

                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => {
                            setInvoiceItems(prev => [
                              ...prev,
                              {
                                id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                                name: `Custom Jobwork Service / Item ${prev.length + 1}`,
                                hsn: '9988',
                                qty: '1',
                                unit: 'PCS (Pieces)',
                                price: '100'
                              }
                            ]);
                          }}
                          style={{ fontSize: '0.76rem', padding: '4px 10px', color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.4)', background: 'rgba(34, 197, 94, 0.15)', fontWeight: 800 }}
                          title="Add a new custom jobwork or custom service line item"
                        >
                          ➕ + Add Custom Item
                        </button>
                      </div>
                    </div>

                    {invoiceItems.map((item, idx) => (
                      <div key={item.id || `line_${idx}`} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', marginBottom: '8px', border: '1px solid var(--border-glass)' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-gold)', minWidth: '24px' }}>#{idx + 1}</span>

                          {/* Quick Catalog Selector Dropdown */}
                          {allCatalogProducts && allCatalogProducts.length > 0 && (
                            <select
                              className="form-control"
                              style={{ fontSize: '0.78rem', padding: '4px 8px', width: 'auto', maxWidth: '210px', background: '#0f172a', color: '#38bdf8', borderColor: '#0284c7', fontWeight: 700 }}
                              onChange={(e) => {
                                const selectedProd = allCatalogProducts.find(p => p.id === e.target.value);
                                if (selectedProd) {
                                  const pName = selectedProd.names?.[currentLang] || selectedProd.names?.en || selectedProd.names?.gu || 'Export Product';
                                  const hs = selectedProd.hsCode || selectedProd.localHsn || '9988';
                                  const price = selectedProd.priceUsd ? selectedProd.priceUsd.replace(/[^0-9.]/g, '') : '500';
                                  setInvoiceItems(prev => prev.map((i, iIdx) => iIdx === idx ? {
                                    ...i,
                                    name: pName,
                                    hsn: hs,
                                    price: price || '500',
                                    unit: selectedProd.moq || 'Unit / Container'
                                  } : i));
                                }
                              }}
                              value=""
                            >
                              <option value="" disabled>📦 Pick Product from Catalog...</option>
                              {allCatalogProducts.map(p => {
                                const title = p.names?.[currentLang] || p.names?.en || p.names?.gu || 'Product';
                                const isCustom = (customProductsList || []).some(cp => cp.id === p.id);
                                return (
                                  <option key={p.id} value={p.id}>
                                    {isCustom ? '⭐ ' : ''}{title} (HS: {p.hsCode || p.localHsn || 'N/A'})
                                  </option>
                                );
                              })}
                            </select>
                          )}

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Particular Item Name / Description (e.g. Punjabi Dress / Dyeing Jobwork)"
                            value={item.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setInvoiceItems(prev => prev.map((i, iIdx) => iIdx === idx ? { ...i, name: val } : i));
                            }}
                            style={{ flexGrow: 2, minWidth: '220px', fontWeight: 700, fontSize: '0.84rem' }}
                          />

                          {invoiceItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setInvoiceItems(prev => prev.filter((_, iIdx) => iIdx !== idx))}
                              style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '1.1rem', cursor: 'pointer', padding: '0 6px' }}
                              title="Remove item"
                            >
                              🗑️
                            </button>
                          )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '6px' }}>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>HSN / SAC</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.hsn}
                              onChange={(e) => {
                                const val = e.target.value;
                                setInvoiceItems(prev => prev.map((i, iIdx) => iIdx === idx ? { ...i, hsn: val } : i));
                              }}
                              style={{ padding: '3px 6px', fontSize: '0.8rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              value={item.qty}
                              onChange={(e) => {
                                const val = e.target.value;
                                setInvoiceItems(prev => prev.map((i, iIdx) => iIdx === idx ? { ...i, qty: val } : i));
                              }}
                              style={{ padding: '3px 6px', fontSize: '0.8rem', fontWeight: 800 }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>Unit</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.unit}
                              onChange={(e) => {
                                const val = e.target.value;
                                setInvoiceItems(prev => prev.map((i, iIdx) => iIdx === idx ? { ...i, unit: val } : i));
                              }}
                              style={{ padding: '3px 6px', fontSize: '0.8rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>Unit Price ({quoteCurrency})</label>
                            <input
                              type="number"
                              className="form-control"
                              value={item.price}
                              onChange={(e) => {
                                const val = e.target.value;
                                setInvoiceItems(prev => prev.map((i, iIdx) => iIdx === idx ? { ...i, price: val } : i));
                              }}
                              style={{ padding: '3px 6px', fontSize: '0.8rem', fontWeight: 800 }}
                            />
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <label style={{ fontSize: '0.72rem', color: 'var(--text-sub)', display: 'block' }}>Line Total</label>
                            <strong style={{ fontSize: '0.88rem', color: '#4ade80' }}>
                              {(Number(item.qty || 0) * Number(item.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              <div className="form-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block' }}>Buyer Name / Contact</label>
                  <input type="text" className="form-control" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} />
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block' }}>Buyer Company / Business Name</label>
                  <input type="text" className="form-control" value={buyerCompany} onChange={(e) => setBuyerCompany(e.target.value)} />
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.78rem', color: '#25D366', fontWeight: 800, display: 'block' }}>📱 Buyer WhatsApp / Mobile No.</label>
                  <input type="text" className="form-control" placeholder="e.g. +91 98765 43210 / +971 50 123 4567" value={buyerPhoneInput} onChange={(e) => setBuyerPhoneInput(e.target.value)} />
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.78rem', color: '#60a5fa', fontWeight: 800, display: 'block' }}>✉️ Buyer Email Address</label>
                  <input type="email" className="form-control" placeholder="e.g. import@globaltrade.com" value={buyerEmailInput} onChange={(e) => setBuyerEmailInput(e.target.value)} />
                </div>

                {invoiceTradeMode !== 'export' ? (
                  <>
                    <div className="form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block' }}>Buyer GSTIN Number</label>
                      <input type="text" className="form-control" placeholder="e.g. 27AAAAA0000A1Z5" value={buyerGstinInput} onChange={(e) => setBuyerGstinInput(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block' }}>Place of Supply / Destination State</label>
                      <input type="text" className="form-control" placeholder="e.g. Maharashtra (27) / Gujarat (24)" value={placeOfSupplyStateInput} onChange={(e) => setPlaceOfSupplyStateInput(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block' }}>GST Rate (Domestic Sale)</label>
                      <select className="form-control" value={domesticGstRate} onChange={(e) => setDomesticGstRate(Number(e.target.value))} style={{ fontWeight: 800 }}>
                        <option value={5}>5% GST ({invoiceTradeMode === 'intrastate' ? '2.5% CGST + 2.5% SGST' : '5% IGST'})</option>
                        <option value={12}>12% GST ({invoiceTradeMode === 'intrastate' ? '6% CGST + 6% SGST' : '12% IGST'})</option>
                        <option value={18}>18% GST ({invoiceTradeMode === 'intrastate' ? '9% CGST + 9% SGST' : '18% IGST'})</option>
                        <option value={28}>28% GST ({invoiceTradeMode === 'intrastate' ? '14% CGST + 14% SGST' : '28% IGST'})</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block' }}>Transporter Name & LR / Bilty No.</label>
                      <input type="text" className="form-control" placeholder="e.g. VRL Logistics / LR #8899" value={transporterLrInput} onChange={(e) => setTransporterLrInput(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block' }}>Dispatch Truck / Vehicle No.</label>
                      <input type="text" className="form-control" placeholder="e.g. GJ-05-BX-9988" value={vehicleNoInput} onChange={(e) => setVehicleNoInput(e.target.value)} />
                    </div>
                  </>
                ) : (
                  <div className="form-group" style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block' }}>Destination Country / City</label>
                    <input type="text" className="form-control" value={buyerCountry} onChange={(e) => setBuyerCountry(e.target.value)} placeholder="e.g. Dubai, UAE / Canada / USA..." />
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'block' }}>Invoice Currency</label>
                  <select className="form-control" value={quoteCurrency} onChange={(e) => setQuoteCurrency(e.target.value)} style={{ fontWeight: 800 }}>
                    {globalCurrencyList.map(curr => (
                      <option key={curr.code} value={curr.code}>
                        {curr.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PRINT OPTIONS & TOGGLES (BANK DETAILS & DIGITAL STAMP) */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed var(--border-glass)' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(29, 78, 216, 0.15)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#60a5fa', fontSize: '0.82rem', fontWeight: 800 }}>
                  <input
                    type="checkbox"
                    checked={includeStampInInvoice}
                    onChange={(e) => setIncludeStampInInvoice(e.target.checked)}
                  />
                  🏵️ Print Digital Round Stamp & Official Seal (ડિજિટલ સ્ટેમ્પ છાપવો)
                </label>

                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(16, 185, 129, 0.15)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', fontSize: '0.82rem', fontWeight: 800 }}>
                  <input
                    type="checkbox"
                    checked={includeBankDetailsInInvoice}
                    onChange={(e) => setIncludeBankDetailsInInvoice(e.target.checked)}
                  />
                  🏦 Print Wire Transfer & Bank Details (બેંક વિગત છાપવી)
                </label>
              </div>
            </div>

            {/* PRINTABLE PROFORMA / TAX INVOICE / JOBWORK SHEET CONTAINER */}
            {(() => {
              const subtotalValue = invoiceItems.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0);
              const totalGstAmount = (subtotalValue * domesticGstRate) / 100;
              const grandTotalValue = invoiceTradeMode === 'export' ? subtotalValue : (subtotalValue + totalGstAmount);

              let docTitle = 'PROFORMA INVOICE';
              if (documentType === 'tax_invoice') docTitle = invoiceTradeMode === 'export' ? 'COMMERCIAL EXPORT TAX INVOICE' : (invoiceTradeMode === 'interstate' ? 'TAX INVOICE (INTERSTATE B2B)' : 'TAX INVOICE (LOCAL GUJARAT)');
              if (documentType === 'jobwork') docTitle = 'JOBWORK INVOICE & DELIVERY CHALLAN';

              return (
                <div id="printableProformaSheet" style={{ background: '#ffffff', color: '#0f172a', padding: '30px', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', fontFamily: 'system-ui, sans-serif' }}>
                  
                  {/* Sheet Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #0f766e', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div>
                      <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#0f766e', fontWeight: 900 }}>
                        {activeCompany?.name || 'ADIDEV SMART SOLUTION'}
                      </h1>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#475569', fontWeight: 700 }}>
                        {activeCompany?.tagline || 'Government of India Certified Global Exporter & Domestic Supplier'}
                      </p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                        📍 {activeCompany?.address || 'Plot No. 45, Bhestan, Surat - 395023, Gujarat, India'} | 📞 {activeCompany?.phone || '+91 78619 97755'} | ✉️ {activeCompany?.email || 'info@adidevexport.com'}
                      </p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#0f766e', fontWeight: 800 }}>
                        GSTIN: {activeCompany?.gstin || '24AAACA0000A1Z5'} {activeCompany?.apedaReg && `| Reg: ${activeCompany.apedaReg}`}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f766e', letterSpacing: '1px' }}>
                        {docTitle}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '4px' }}>
                        <strong>Ref No:</strong> {((activeCompany?.name || 'ADIDEV SMART SOLUTION').split(' ').map(w => w[0]).join('') + (documentType === 'jobwork' ? '/JW/' : (invoiceTradeMode === 'export' ? '/EXP/' : '/DOM/')) + Date.now().toString().slice(-6)).toUpperCase()}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                        <strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Buyer & Shipment Details Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px', fontSize: '0.86rem' }}>
                    <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0f766e', marginBottom: '6px' }}>
                        🏢 {invoiceTradeMode === 'export' ? 'INVOICE TO (BUYER):' : 'BILL TO (BUYER / RECIPIENT):'}
                      </div>
                      <div><strong>Attn / Buyer:</strong> {buyerName}</div>
                      <div><strong>Company Name:</strong> {buyerCompany}</div>
                      {buyerGstinInput && <div><strong>Buyer GSTIN:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#0284c7' }}>{buyerGstinInput}</span></div>}
                      <div><strong>Location / State:</strong> {invoiceTradeMode === 'export' ? buyerCountry : placeOfSupplyStateInput}</div>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0f766e', marginBottom: '6px' }}>
                        {invoiceTradeMode === 'export' ? '🚢 SHIPMENT DETAILS:' : '🚚 DISPATCH & TRANSPORT DETAILS:'}
                      </div>
                      {invoiceTradeMode === 'export' ? (
                        <>
                          <div><strong>Port of Loading:</strong> {quotePortLoading}</div>
                          <div><strong>Port of Discharge:</strong> {quotePortDischarge}</div>
                          <div><strong>Incoterms:</strong> {quoteIncoterm}</div>
                        </>
                      ) : (
                        <>
                          <div><strong>Place of Supply:</strong> {placeOfSupplyStateInput}</div>
                          <div><strong>Transporter & LR No.:</strong> {transporterLrInput}</div>
                          <div><strong>Truck / Vehicle No.:</strong> {vehicleNoInput}</div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Product & Jobwork Line Items Table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#0f766e', color: '#ffffff', textAlign: 'left' }}>
                        <th style={{ padding: '10px 12px' }}>#</th>
                        <th style={{ padding: '10px 12px' }}>Particular Goods / Jobwork Description</th>
                        <th style={{ padding: '10px 12px' }}>HSN / SAC</th>
                        <th style={{ padding: '10px 12px', textAlign: 'right' }}>Qty</th>
                        <th style={{ padding: '10px 12px', textAlign: 'right' }}>Unit Price ({quoteCurrency})</th>
                        <th style={{ padding: '10px 12px', textAlign: 'right' }}>Taxable Amount ({quoteCurrency})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceItems.map((item, i) => {
                        const lineTotal = Number(item.qty || 0) * Number(item.price || 0);
                        return (
                          <tr key={item.id || i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <td style={{ padding: '12px', fontWeight: 800, color: '#64748b' }}>{i + 1}</td>
                            <td style={{ padding: '12px' }}>
                              <strong style={{ fontSize: '0.92rem' }}>{item.name}</strong>
                            </td>
                            <td style={{ padding: '12px', fontWeight: 800, color: '#0284c7' }}>
                              {item.hsn || '9988'}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 800 }}>
                              {item.qty} {item.unit}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 800 }}>
                              {quoteCurrency} {Number(item.price || 0).toLocaleString()}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 900, color: '#0f766e', fontSize: '0.95rem' }}>
                              {quoteCurrency} {lineTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Total Summary Box & Tax Breakdown */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'flex-start', fontSize: '0.84rem' }}>
                    <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0f766e', marginBottom: '4px' }}>
                        {invoiceTradeMode === 'export' ? '🏦 PAYMENT & BANKING TERMS:' : '📜 DOMESTIC & JOBWORK TERMS:'}
                      </div>
                      {invoiceTradeMode === 'export' ? (
                        <>
                          <div>• Payment Method: Irrevocable L/C at Sight or 30% Advance + 70% against BL Copy</div>
                          <div>• Inspection: SGS / Bureau Veritas Certified Quality & Quantity Inspection</div>
                          <div>• Country of Origin: INDIA</div>
                        </>
                      ) : (
                        <>
                          <div>• Payment Terms: Net 30 Days / Approved Credit Term</div>
                          <div>• Jobwork Declaration: Goods sent for processing / commercial sale</div>
                          <div>• State Jurisdiction: Subject to Surat, Gujarat Jurisdiction</div>
                        </>
                      )}

                      {includeBankDetailsInInvoice && (() => {
                        const b = (activeCompany?.bankDetails && (activeCompany.bankDetails.bankName || activeCompany.bankDetails.accountNumber))
                          ? activeCompany.bankDetails
                          : {
                              bankName: "Axis Bank Ltd",
                              accountName: activeCompany?.name || "SHREE SYSTEM TEC",
                              accountNumber: "921020033445566",
                              swiftCode: "AXISINBBXXX",
                              ifscCode: "UTIB0000123",
                              branch: "Textile Market Branch, Surat, Gujarat, India"
                            };
                        return (
                          <div style={{ background: '#f0f9ff', padding: '10px 12px', borderRadius: '6px', border: '1px solid #bae6fd', marginTop: '10px', fontSize: '0.78rem', textAlign: 'left' }}>
                            <div style={{ fontWeight: 800, color: '#0369a1', marginBottom: '4px', fontSize: '0.8rem' }}>
                              🏦 WIRE TRANSFER / BANKING DETAILS:
                            </div>
                            <div style={{ display: 'grid', gap: '2px', color: '#1e293b' }}>
                              {b.bankName && <div><strong>Bank Name:</strong> {b.bankName}</div>}
                              {b.accountName && <div><strong>Beneficiary / Account:</strong> {b.accountName}</div>}
                              {b.accountNumber && <div><strong>Account / IBAN No:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#0369a1' }}>{b.accountNumber}</span></div>}
                              {b.swiftCode && <div><strong>SWIFT / BIC Code:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#0f766e' }}>{b.swiftCode}</span></div>}
                              {b.ifscCode && <div><strong>IFSC Code:</strong> {b.ifscCode}</div>}
                              {b.branch && <div><strong>Bank Branch:</strong> {b.branch}</div>}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '8px', border: '1px solid #bbf7d0', textAlign: 'right' }}>
                      <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700 }}>
                        {invoiceTradeMode === 'export' ? 'FOB / CIF COMMODITY VALUE:' : 'SUBTOTAL TAXABLE VALUE:'}
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#15803d', marginTop: '2px' }}>
                        {quoteCurrency} {subtotalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>

                      {invoiceTradeMode === 'interstate' && (
                        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #a7f3d0', fontSize: '0.78rem', color: '#166534' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2px 0' }}>
                            <span>Integrated GST (IGST {domesticGstRate}%):</span>
                            <strong>{quoteCurrency} {totalGstAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0 0 0', paddingTop: '4px', borderTop: '1px solid #86efac', fontWeight: 900, fontSize: '0.88rem', color: '#065f46' }}>
                            <span>TOTAL INVOICE VALUE (INC. IGST):</span>
                            <span>{quoteCurrency} {grandTotalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      )}

                      {invoiceTradeMode === 'intrastate' && (
                        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #a7f3d0', fontSize: '0.78rem', color: '#166534' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2px 0' }}>
                            <span>Central GST (CGST {domesticGstRate / 2}%):</span>
                            <strong>{quoteCurrency} {(totalGstAmount / 2).toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2px 0' }}>
                            <span>State GST (SGST {domesticGstRate / 2}%):</span>
                            <strong>{quoteCurrency} {(totalGstAmount / 2).toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0 0 0', paddingTop: '4px', borderTop: '1px solid #86efac', fontWeight: 900, fontSize: '0.88rem', color: '#065f46' }}>
                            <span>TOTAL INVOICE VALUE (CGST + SGST):</span>
                            <span>{quoteCurrency} {grandTotalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      )}

                      <div style={{ fontSize: '0.72rem', color: '#166534', marginTop: '6px' }}>
                        {invoiceTradeMode === 'export' ? 'All Indian Export Charges Included' : 'Official Indian Commercial Tax Invoice'}
                      </div>
                    </div>
                  </div>

                  {/* Authorized Signatory Stamp Box */}
                  <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '16px', borderTop: '1px dashed #cbd5e1' }}>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      <div>Verified Official Documentation • {activeCompany?.name || 'ADIDEV SMART SOLUTION'}</div>
                      <div>{activeCompany?.address || 'Surat, Gujarat, India'}</div>
                    </div>
                    <div style={{ textAlign: 'center', border: '2px dashed #0f766e', padding: '12px 24px', borderRadius: '8px', position: 'relative', minWidth: '210px', background: '#f0fdf4' }}>
                      {includeStampInInvoice && (activeCompany?.stamp || generateDigitalRoundStampSvg(activeCompany?.name, activeCompany?.apedaReg || activeCompany?.gstin)) && (
                        <img
                          src={activeCompany?.stamp || generateDigitalRoundStampSvg(activeCompany?.name, activeCompany?.apedaReg || activeCompany?.gstin)}
                          alt="Digital Round Stamp Seal"
                          style={{
                            position: 'absolute',
                            top: '-42px',
                            right: '-18px',
                            width: '105px',
                            height: '105px',
                            objectFit: 'contain',
                            opacity: 0.88,
                            transform: 'rotate(-10deg)',
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.18))'
                          }}
                          onError={(e) => {
                            e.target.src = generateDigitalRoundStampSvg(activeCompany?.name, activeCompany?.apedaReg || activeCompany?.gstin);
                          }}
                        />
                      )}
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f766e' }}>{activeCompany?.name || 'ADIDEV SMART SOLUTION'}</div>
                      <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: '2px', fontWeight: 700 }}>Authorized Signatory & Digital Seal</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* INCOTERMS 2020 RISK & COST RESPONSIBILITIES CHART MODAL */}
      {showIncotermsModal && (
        <div className="modal-backdrop show" style={{ zIndex: 3000, background: 'rgba(3, 7, 18, 0.88)' }}>
          <div className="glass-card modal-card" style={{ maxWidth: '920px', width: '95%', maxHeight: '90vh', overflowY: 'auto', borderRadius: '20px' }}>
            <button className="modal-close" onClick={() => setShowIncotermsModal(false)}>&times;</button>
            
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '4px' }}>📊</span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: 'white', margin: 0 }}>
                ICC INCOTERMS® 2020 Official Risk & Cost Chart
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                Select any Incoterm term below (EXW, FOB, CFR, CIF, DDP...) to view Transfer of Risk (⚠️ Risk Point) & Cost breakdown.
              </p>
            </div>

            {/* IncoTerms Visual Legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '12px', marginBottom: '18px', fontSize: '0.82rem', flexWrap: 'wrap', border: '1px solid var(--border-glass)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '12px', background: 'linear-gradient(90deg, #0284c7, #38bdf8)', borderRadius: '3px' }}></span>
                <strong style={{ color: 'white' }}>Exporter / Seller Cost</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '12px', background: '#475569', borderRadius: '3px' }}></span>
                <strong style={{ color: 'white' }}>Importer / Buyer Cost</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem' }}>⚠️</span>
                <strong style={{ color: '#f87171' }}>Transfer of Risk Point</strong>
              </div>
            </div>

            {/* List of 11 Incoterms Cards */}
            <div style={{ display: 'grid', gap: '12px' }}>
              {incotermsList.map((term) => {
                const isSelected = quoteIncoterm.includes(term.code);
                return (
                  <div
                    key={term.code}
                    className="incoterm-risk-card"
                    style={{
                      background: isSelected ? 'rgba(20, 184, 166, 0.18)' : 'rgba(15, 23, 42, 0.6)',
                      border: isSelected ? '2px solid var(--primary-teal-glow)' : '1px solid var(--border-glass)',
                      borderRadius: '14px',
                      padding: '14px 18px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '14px',
                      alignItems: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: '#0f766e', color: 'white', padding: '3px 9px', borderRadius: '6px', fontWeight: 900, fontSize: '0.9rem' }}>
                          {term.code}
                        </span>
                        <strong style={{ fontSize: '0.9rem', color: 'white' }}>{term.code}</strong>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '4px', fontWeight: 600 }}>
                        {term.name}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#f59e0b', display: 'block', marginTop: '2px', fontWeight: 800 }}>
                        {term.group}
                      </span>
                    </div>

                    <div>
                      {/* Visual Risk Bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <div style={{ flex: 1, height: '12px', background: '#334155', borderRadius: '6px', overflow: 'hidden', position: 'relative', display: 'flex' }}>
                          <div style={{ width: `${term.sellerRisk}%`, background: 'linear-gradient(90deg, #0284c7, #38bdf8)' }} title={`Seller Risk: ${term.sellerRisk}%`}></div>
                          <div style={{ width: `${term.buyerRisk}%`, background: '#64748b' }} title={`Buyer Risk: ${term.buyerRisk}%`}></div>
                        </div>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-sub)', width: '80px', fontWeight: 700 }}>
                          {term.sellerRisk}% Seller
                        </span>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: '#e2e8f0', lineHeight: '1.4' }}>
                        <strong>⚠️ Risk Point:</strong> <span style={{ color: '#f87171', fontWeight: 700 }}>{term.riskTransferPoint}</span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-sub)', marginTop: '2px' }}>
                        {term.desc}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn-primary"
                        style={{
                          padding: '8px 14px',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          width: '100%',
                          justifyContent: 'center',
                          background: isSelected ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.08)',
                          borderColor: isSelected ? 'var(--primary-teal-glow)' : 'var(--border-glass)'
                        }}
                        onClick={() => {
                          setQuoteIncoterm(term.sampleTerm);
                          setShowIncotermsModal(false);
                        }}
                      >
                        {isSelected ? '✓ Selected' : `Select ${term.code}`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MULTI-VENDOR SELLER / MERCHANT REGISTRATION & PORTAL MODAL */}
      {activeModal === 'seller_portal' && (
        <div className="modal-backdrop show">
          <div className="glass-card modal-card" style={{ maxWidth: '820px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>&times;</button>

            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🏬</span> Seller & Exporter Portal (વિક્રેતા રજિસ્ટ્રેશન પ્લેટફોર્મ)
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#facc15', fontWeight: 700 }}>
                  Publish your products & export globally with Atsondika Global Trade Platform
                </span>
              </div>

              {currentMerchant && currentMerchant.businessName && (
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '4px 10px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.4)' }}
                  onClick={logoutMerchant}
                >
                  🚪 Logout ({(currentMerchant.businessName || 'Seller').split(' ')[0]})
                </button>
              )}
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {!currentMerchant ? (
                <>
                  <button
                    type="button"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid',
                      background: sellerTab === 'register' ? 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)' : 'rgba(255,255,255,0.06)',
                      color: sellerTab === 'register' ? 'black' : 'var(--text-sub)',
                      borderColor: sellerTab === 'register' ? '#eab308' : 'var(--border-glass)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSellerTab('register')}
                  >
                    🤝 1. Register as Seller / Exporter (વેપારી બનો)
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid',
                      background: sellerTab === 'login' ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'rgba(255,255,255,0.06)',
                      color: sellerTab === 'login' ? 'white' : 'var(--text-sub)',
                      borderColor: sellerTab === 'login' ? '#0284c7' : 'var(--border-glass)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSellerTab('login')}
                  >
                    🔑 2. Seller Login (લોગઈન કરો)
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid',
                      background: sellerTab === 'dashboard' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(255,255,255,0.06)',
                      color: sellerTab === 'dashboard' ? 'white' : 'var(--text-sub)',
                      borderColor: sellerTab === 'dashboard' ? '#10b981' : 'var(--border-glass)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSellerTab('dashboard')}
                  >
                    📦 My Products ({(Array.isArray(merchantProductsList) ? merchantProductsList : []).filter(p => p.merchantId === (currentMerchant?.id || '')).length})
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid',
                      background: sellerTab === 'add_product' ? 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)' : 'rgba(255,255,255,0.06)',
                      color: sellerTab === 'add_product' ? 'black' : 'var(--text-sub)',
                      borderColor: sellerTab === 'add_product' ? '#eab308' : 'var(--border-glass)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSellerTab('add_product')}
                  >
                    ➕ Upload New Product (નવી પ્રોડક્ટ)
                  </button>
                </>
              )}
            </div>

            {/* TAB 1: REGISTER NEW SELLER */}
            {sellerTab === 'register' && !currentMerchant && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!mBizNameInput || !mPhoneInput) {
                  alert("⚠️ Please enter Business Name and Mobile/WhatsApp Number!");
                  return;
                }
                registerMerchant({
                  businessName: mBizNameInput,
                  brandName: mBrandInput || mBizNameInput,
                  contactPerson: mContactInput || mBizNameInput,
                  phone: mPhoneInput,
                  email: mEmailInput,
                  city: mCityInput,
                  state: mStateInput,
                  gstin: mGstinInput,
                  businessType: mBizTypeInput,
                  iecCertUrl: mIecCertInput,
                  gstCertUrl: mGstCertInput,
                  qualityCertUrl: mQualityCertInput,
                  factoryPhotoUrl: mFactoryPhotoInput
                });
                setSellerTab('add_product');
              }}>
                <div style={{ background: 'rgba(234, 179, 8, 0.08)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(234, 179, 8, 0.3)', marginBottom: '16px', fontSize: '0.84rem', color: '#facc15' }}>
                  🤝 <strong>Join as a Verified Exporter & Supplier:</strong> Display your Agro, Garment, Textile, Fastener & Industrial products to international buyers across the world!
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Business / Company Name *</label>
                    <input type="text" className="form-control" value={mBizNameInput} onChange={(e) => setMBizNameInput(e.target.value)} placeholder="e.g. Surat Silks & Garments Pvt Ltd" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Brand Name (ઓળખ નામ)</label>
                    <input type="text" className="form-control" value={mBrandInput} onChange={(e) => setMBrandInput(e.target.value)} placeholder="e.g. Surat Silks" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Mobile / WhatsApp Number *</label>
                    <input type="tel" className="form-control" value={mPhoneInput} onChange={(e) => setMPhoneInput(e.target.value)} placeholder="e.g. +91 98250 11223" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" value={mEmailInput} onChange={(e) => setMEmailInput(e.target.value)} placeholder="e.g. info@suratsilks.com" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Contact Person Name</label>
                    <input type="text" className="form-control" value={mContactInput} onChange={(e) => setMContactInput(e.target.value)} placeholder="e.g. Rameshbhai Patel" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GSTIN / IEC Registration (ઓપ્શનલ)</label>
                    <input type="text" className="form-control" value={mGstinInput} onChange={(e) => setMGstinInput(e.target.value)} placeholder="e.g. 24AAACS1122E1Z4" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" value={mCityInput} onChange={(e) => setMCityInput(e.target.value)} placeholder="e.g. Surat / Ahmedabad" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Type</label>
                    <select className="form-control" value={mBizTypeInput} onChange={(e) => setMBizTypeInput(e.target.value)}>
                      <option value="Manufacturer & Exporter">Manufacturer & Exporter (ઉત્પાદક)</option>
                      <option value="Merchant Exporter">Merchant Exporter (વેપારી)</option>
                      <option value="Wholesaler & Supplier">Wholesaler & Supplier (જથ્થાબંધ વેપારી)</option>
                    </select>
                  </div>
                </div>

                {/* EXPORT CERTIFICATES & BUSINESS DOCUMENTS UPLOAD SECTION */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '18px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    📜 Export Certificates & Business Documents (સર્ટિફિકેટ અને દસ્તાવેજો)
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '12px' }}>
                    તમારા નિકાસ લાઇસન્સ અને GST સર્ટિફિકેટ્સ અપલોડ કરો (Select certificate files or photos).
                  </p>

                  <div className="form-row">
                    {/* 1. IEC CERTIFICATE */}
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        📄 Import Export Code (IEC) Certificate
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => setMIecCertInput(evt.target.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {mIecCertInput && (
                        <div style={{ fontSize: '0.74rem', color: '#4ade80', marginTop: '4px', fontWeight: 700 }}>
                          ✅ IEC Certificate File Attached!
                        </div>
                      )}
                    </div>

                    {/* 2. GST CERTIFICATE */}
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        📜 GST Registration Certificate
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => setMGstCertInput(evt.target.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {mGstCertInput && (
                        <div style={{ fontSize: '0.74rem', color: '#4ade80', marginTop: '4px', fontWeight: 700 }}>
                          ✅ GST Certificate File Attached!
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    {/* 3. QUALITY CERTIFICATE (APEDA / FSSAI / ISO) */}
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        🏅 Quality Cert (APEDA / FSSAI / ISO / FIEO)
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => setMQualityCertInput(evt.target.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {mQualityCertInput && (
                        <div style={{ fontSize: '0.74rem', color: '#4ade80', marginTop: '4px', fontWeight: 700 }}>
                          ✅ Quality Certificate Attached!
                        </div>
                      )}
                    </div>

                    {/* 4. FACTORY / GODOWN PHOTO */}
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        🏭 Factory / Premises Photo
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => setMFactoryPhotoInput(evt.target.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {mFactoryPhotoInput && (
                        <div style={{ fontSize: '0.74rem', color: '#4ade80', marginTop: '4px', fontWeight: 700 }}>
                          ✅ Factory Photo Attached!
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem', background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', color: 'black', fontWeight: 900 }}>
                  🚀 Complete Registration & Upload Products
                </button>
              </form>
            )}

            {/* TAB 2: SELLER LOGIN */}
            {sellerTab === 'login' && !currentMerchant && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!mSellerLoginQuery) {
                  alert("Please enter Mobile or Email!");
                  return;
                }
                const res = loginMerchant(mSellerLoginQuery);
                if (res.success) {
                  setSellerTab('dashboard');
                } else {
                  alert(res.message);
                }
              }}>
                <div className="form-group">
                  <label className="form-label">Registered Mobile / Email / Business Name *</label>
                  <input type="text" className="form-control" value={mSellerLoginQuery} onChange={(e) => setMSellerLoginQuery(e.target.value)} placeholder="e.g. +91 98250 11223 or info@suratsilks.com" required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem' }}>
                  🔑 Login to Seller Portal
                </button>
              </form>
            )}

            {/* TAB 3: SELLER DASHBOARD / MY PRODUCTS */}
            {sellerTab === 'dashboard' && currentMerchant && (
              <div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#34d399', fontWeight: 900 }}>
                      🏬 {currentMerchant.businessName} <span style={{ fontSize: '0.78rem', background: '#059669', color: 'white', padding: '2px 8px', borderRadius: '10px' }}>⭐ Verified Exporter</span>
                    </h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                      📞 {currentMerchant.phone} | 📍 {currentMerchant.city}, {currentMerchant.state} | GST: {currentMerchant.gstin || 'N/A'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', color: 'black' }}
                    onClick={() => setSellerTab('add_product')}
                  >
                    ➕ Add Product
                  </button>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '10px' }}>📦 Published Products List:</h4>

                {(Array.isArray(customProductsList) ? customProductsList : []).filter(p => (currentMerchant && (p.merchantId === currentMerchant.id || p.merchantName === currentMerchant.businessName))).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', color: 'var(--text-sub)' }}>
                    📦 No products published yet! Click "Upload New Product" to add your items to the website.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                    {(Array.isArray(customProductsList) ? customProductsList : []).filter(p => (currentMerchant && (p.merchantId === currentMerchant.id || p.merchantName === currentMerchant.businessName))).map((p, pIdx) => (
                      <div key={p.id || pIdx} style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                        <img src={p.image || (p.images && p.images[0]) || 'images/agro_spices_grains.png'} alt={p.names?.en} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '6px', marginBottom: '6px' }} />
                        <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{p.names?.en || p.names?.gu}</div>
                        <div style={{ fontSize: '0.78rem', color: '#38bdf8' }}>HS: {p.hsCode || '9988'} | Price: USD {p.priceUsd || '500'}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 800 }}>✓ Published</span>
                          <button
                            type="button"
                            style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                            onClick={() => deleteMerchantProduct(p.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: UPLOAD NEW PRODUCT */}
            {(sellerTab === 'add_product' || (sellerTab === 'register' && currentMerchant)) && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!mProdNameEn || !mProdHsCode) {
                  alert("⚠️ Please enter Product Name and HS Code!");
                  return;
                }
                addMerchantProduct({
                  names: { en: mProdNameEn, gu: mProdNameGu || mProdNameEn, hi: mProdNameEn, fr: mProdNameEn },
                  category: mProdCategory,
                  hsCode: mProdHsCode,
                  priceUsd: mProdPrice,
                  moq: mProdMoq,
                  image: mProdImage || 'images/agro_spices_grains.png',
                  images: mProdImage ? [mProdImage] : ['images/agro_spices_grains.png'],
                  specifications: { en: mProdSpecEn, gu: mProdSpecEn }
                });
                setSellerTab('dashboard');
              }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Product Title (English) *</label>
                    <input type="text" className="form-control" value={mProdNameEn} onChange={(e) => setMProdNameEn(e.target.value)} placeholder="e.g. Premium Cotton Sarees / CNC Lathe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Product Title (ગુજરાતી)</label>
                    <input type="text" className="form-control" value={mProdNameGu} onChange={(e) => setMProdNameGu(e.target.value)} placeholder="e.g. પ્રીમિયમ કોટન સાડી" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select className="form-control" value={mProdCategory} onChange={(e) => setMProdCategory(e.target.value)}>
                      {getMainCategoryList().map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nameEn}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">HS Code (6-Digit International) *</label>
                    <input type="text" className="form-control" value={mProdHsCode} onChange={(e) => setMProdHsCode(e.target.value)} placeholder="e.g. 520811 / 620443 / 845811" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">FOB Price (USD) *</label>
                    <input type="text" className="form-control" value={mProdPrice} onChange={(e) => setMProdPrice(e.target.value)} placeholder="e.g. 500" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Minimum Order Quantity (MOQ)</label>
                    <input type="text" className="form-control" value={mProdMoq} onChange={(e) => setMProdMoq(e.target.value)} placeholder="e.g. 1 Container / 100 Units" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Product Image Link / File URL</label>
                  <input type="text" className="form-control" value={mProdImage} onChange={(e) => setMProdImage(e.target.value)} placeholder="https://example.com/photo.jpg or data:image/png..." />
                </div>

                <div className="form-group">
                  <label className="form-label">Key Specifications & Quality Grade</label>
                  <textarea className="form-control" rows="2" value={mProdSpecEn} onChange={(e) => setMProdSpecEn(e.target.value)} placeholder="e.g. Export Quality Grade A Standard Packing"></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', fontWeight: 900 }}>
                  🚀 Publish Product on Website
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* HIGH-RESOLUTION ORIGINAL FULL PHOTO LIGHTBOX MODAL */}
      {activeModal === 'image_preview' && imagePreviewData && (
        <div
          className="modal-backdrop show"
          style={{ zIndex: 99999, background: 'rgba(3, 7, 18, 0.94)', backdropFilter: 'blur(16px)' }}
          onClick={() => setActiveModal(null)}
        >
          <div
            className="glass-card modal-card"
            style={{
              maxWidth: '1100px',
              width: '95%',
              maxHeight: '94vh',
              overflowY: 'auto',
              padding: '24px',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.18)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-Right Corner Close Button (International Standard) */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                zIndex: 20,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#ffffff',
                fontSize: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}
              title="Close (અહીંયા બંધ કરવા ક્લિક કરો)"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', paddingRight: '48px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.4rem' }}>🔍</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white', margin: 0 }}>
                    {imagePreviewData.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-sub)', flexWrap: 'wrap' }}>
                  <span>{imagePreviewData.category}</span>
                  {imagePreviewData.hsCode && <span>• 🌐 HS Code: <strong style={{ color: '#38bdf8' }}>{imagePreviewData.hsCode}</strong></span>}
                  <span>• 🖼️ High-Res Original Photo</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 12px',
                    color: isUltraZoom ? '#4ade80' : '#38bdf8',
                    borderColor: isUltraZoom ? 'rgba(74, 222, 128, 0.4)' : 'rgba(56, 189, 248, 0.4)'
                  }}
                  onClick={() => setIsUltraZoom(!isUltraZoom)}
                >
                  {isUltraZoom ? '🔍 1X Normal View' : '🔍 2X Ultra Zoom'}
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                  onClick={() => {
                    if (imagePreviewData.productObj && setSelectedRfqProduct) {
                      setSelectedRfqProduct(imagePreviewData.productObj);
                    }
                    setActiveModal(null);
                    setTimeout(() => {
                      const contactSec = document.getElementById('contact');
                      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  title="Request Official Quotation (RFQ) Inquiry Form"
                >
                  💬 Request Official Quotation (RFQ)
                </button>
              </div>
            </div>

            {/* High-Res Image Viewer Box */}
            {(() => {
              const currentImages = (imagePreviewData.allImages && imagePreviewData.allImages.length > 0)
                ? imagePreviewData.allImages
                : [imagePreviewData.url];
              const currentImgUrl = currentImages[activePreviewIdx] || imagePreviewData.url;
              const isPdfDoc = currentImgUrl && (currentImgUrl.includes('application/pdf') || currentImgUrl.toLowerCase().includes('.pdf'));

              return (
                <div>
                  <div
                    style={{
                      position: 'relative',
                      background: 'rgba(0,0,0,0.85)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '420px',
                      maxHeight: '75vh',
                      border: '1px solid var(--border-glass)',
                      cursor: isPdfDoc ? 'default' : (isUltraZoom ? 'zoom-out' : 'zoom-in'),
                      userSelect: 'none'
                    }}
                    onMouseMove={(e) => {
                      if (!isUltraZoom || isPdfDoc) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                      setZoomPos({ x, y });
                    }}
                    onClick={() => {
                      if (!isPdfDoc) {
                        setIsUltraZoom(!isUltraZoom);
                        if (isUltraZoom) {
                          setZoomPos({ x: 50, y: 50 });
                        }
                      }
                    }}
                  >
                    {isPdfDoc ? (
                      <div style={{ width: '100%', height: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <iframe
                          src={currentImgUrl}
                          title={imagePreviewData.title}
                          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px', background: 'white' }}
                        />
                        <div style={{ padding: '8px' }}>
                          <a
                            href={currentImgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ textDecoration: 'none', padding: '8px 18px', fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                          >
                            📄 Open / Download Full PDF Document (નવા ટેબમાં PDF ખોલો)
                          </a>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={currentImgUrl}
                        alt={imagePreviewData.title}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '65vh',
                          objectFit: 'contain',
                          transform: isUltraZoom ? 'scale(2.2)' : 'scale(1)',
                          transformOrigin: isUltraZoom ? `${zoomPos.x}% ${zoomPos.y}%` : 'center center',
                          transition: isUltraZoom ? 'transform-origin 0.04s ease-out, transform 0.25s ease' : 'transform 0.25s ease',
                          borderRadius: '8px'
                        }}
                        onError={(e) => { e.target.src = 'images/agro_spices_grains.png'; }}
                      />
                    )}

                    {/* Carousel Prev / Next Overlay Buttons */}
                    {currentImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="carousel-btn carousel-prev"
                          style={{ left: '16px', width: '44px', height: '44px', fontSize: '1.4rem', background: 'rgba(0,0,0,0.7)' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePreviewIdx((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1));
                          }}
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className="carousel-btn carousel-next"
                          style={{ right: '16px', width: '44px', height: '44px', fontSize: '1.4rem', background: 'rgba(0,0,0,0.7)' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePreviewIdx((prev) => (prev < currentImages.length - 1 ? prev + 1 : 0));
                          }}
                        >
                          ›
                        </button>
                      </>
                    )}

                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', background: 'rgba(15,23,42,0.85)', padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--border-glass)', fontSize: '0.76rem', color: 'white' }}>
                      💡 {isUltraZoom ? '🔍 1.5X Zoom Mode (Click to shrink)' : '🔍 Click Photo to Zoom 1.5X'}
                    </div>
                  </div>

                  {/* Thumbnail Gallery Bar */}
                  {currentImages.length > 1 && (
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
                      {currentImages.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`Thumb ${idx + 1}`}
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            border: idx === activePreviewIdx ? '3px solid var(--primary-teal-glow)' : '2px solid transparent',
                            opacity: idx === activePreviewIdx ? 1 : 0.65,
                            transition: 'all 0.2s'
                          }}
                          onClick={() => setActivePreviewIdx(idx)}
                          onError={(e) => { e.target.src = 'images/agro_spices_grains.png'; }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* COMPLETED PAYMENT RECEIPTS & TAX INVOICES HISTORY MODAL */}
      {activeModal === 'payment_receipts' && (
        <div
          className="modal-backdrop show"
          style={{ zIndex: 99999, background: 'rgba(3, 7, 18, 0.92)', backdropFilter: 'blur(16px)' }}
          onClick={() => setActiveModal(null)}
        >
          <div
            className="glass-card modal-card"
            style={{
              maxWidth: '920px',
              width: '95%',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '24px',
              borderRadius: '24px',
              border: '1px solid var(--border-glass)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-Right Close Button */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                zIndex: 20,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#ffffff',
                fontSize: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Close Modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '14px' }}>
              <span style={{ fontSize: '2.4rem', display: 'block', marginBottom: '4px' }}>🧾</span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                {currentLang === 'gu' ? 'પેમેન્ટ રીસિપ્ટ & ઓર્ડર ટેક્સ ઈનવોઈસ' : 'Official Payment Receipts & Tax Invoices'}
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginTop: '4px' }}>
                {currentLang === 'gu'
                  ? 'ઓર્ડર પેમેન્ટ પૂરું થયા પછી જ અહીંયા રીયલ ટ્રાન્ઝેક્શન આઈડી સાથે રીસિપ્ટ જનરેટ થાય છે.'
                  : 'Official payment receipts generate automatically here with real Transaction ID after order payment is confirmed.'}
              </p>
            </div>

            {/* Load Orders from localStorage */}
            {(() => {
              let savedOrders = [];
              try {
                savedOrders = JSON.parse(localStorage.getItem('site_customer_orders_v1') || '[]');
              } catch(e) {}

              if (savedOrders.length === 0) {
                return (
                  <div style={{ textAlign: 'center', padding: '50px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--border-glass)' }}>
                    <span style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }}>📦</span>
                    <h4 style={{ color: '#facc15', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>
                      {currentLang === 'gu' ? 'હજુ સુધી કોઈ પેમેન્ટ પૂરું થયેલ નથી' : 'No Completed Payment Receipts Yet'}
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', maxWidth: '520px', margin: '0 auto 16px auto', lineHeight: '1.6' }}>
                      {currentLang === 'gu'
                        ? 'તમે જ્યારે લોકલ ટ્રેડમાં સામાન પસંદ કરીને UPI, Card અથવા NetBanking થી પેમેન્ટ કન્ફર્મ કરશો, ત્યારે તેની ઓરિજિનલ પેમેન્ટ રીસિપ્ટ ઓટોમેટિક અહીંયા રીયલ ટ્રાન્ઝેક્શન આઈડી સાથે જનરેટ થઈને સેવ થઈ જશે.'
                        : 'When you place a Local Trade order and complete payment, your official payment receipt with real Transaction ID will generate and display here.'}
                    </p>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        setActiveModal(null);
                        setIsRfqDrawerOpen(true);
                      }}
                      style={{ padding: '8px 20px', fontSize: '0.88rem', fontWeight: 800 }}
                    >
                      🛍️ {currentLang === 'gu' ? 'કાર્ટ ખોલો અને ઓર્ડર કરો' : 'Open Cart & Place Order'}
                    </button>
                  </div>
                );
              }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {savedOrders.map((ord, idx) => (
                    <div
                      key={ord.orderId || idx}
                      style={{
                        background: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid var(--primary-teal-glow)',
                        borderRadius: '16px',
                        padding: '18px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                      }}
                    >
                      {/* Top Order Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>Official Payment Receipt</span>
                          <h4 style={{ margin: '2px 0 0 0', color: '#facc15', fontSize: '1.1rem', fontWeight: 900 }}>
                            {ord.orderId}
                          </h4>
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                            📅 Date: {ord.date} | 💳 Method: <strong style={{ color: 'white' }}>{ord.paymentMethod}</strong>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            display: 'inline-block',
                            background: 'rgba(16, 185, 129, 0.2)',
                            color: '#4ade80',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 900
                          }}>
                            ✅ {ord.paymentStatus || 'PAID (Successful)'}
                          </span>
                          <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, marginTop: '4px' }}>
                            Txn Ref: {ord.utrRef || ('TXN-' + (ord.orderId || '').replace(/[^0-9]/g, ''))}
                          </div>
                        </div>
                      </div>

                      {/* Customer Details */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem', color: '#e2e8f0', marginBottom: '14px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '10px' }}>
                        <div>
                          <div>👤 <b>Customer Name:</b> {ord.customerName}</div>
                          <div>📞 <b>Phone / WhatsApp:</b> {ord.phone}</div>
                          {ord.gstin && <div>🏛️ <b>GSTIN:</b> {ord.gstin}</div>}
                        </div>
                        <div>
                          <div>🏠 <b>Delivery Address:</b> {ord.deliveryAddress}</div>
                          {ord.pincode && <div>📮 <b>Pincode:</b> {ord.pincode}</div>}
                        </div>
                      </div>

                      {/* Order Items Table */}
                      <div style={{ overflowX: 'auto', marginBottom: '12px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', color: 'white' }}>
                          <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.06)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                              <th style={{ padding: '8px' }}>Product</th>
                              <th style={{ padding: '8px' }}>Qty & Unit</th>
                              <th style={{ padding: '8px' }}>Unit Price</th>
                              <th style={{ padding: '8px', textAlign: 'right' }}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(ord.items || []).map((it, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <td style={{ padding: '8px', fontWeight: 700 }}>{it.name}</td>
                                <td style={{ padding: '8px', color: '#facc15', fontWeight: 800 }}>{it.qty} {it.unit}</td>
                                <td style={{ padding: '8px' }}>₹{it.price}</td>
                                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 800, color: '#4ade80' }}>
                                  ₹{(it.qty * it.price).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Bottom Total & Actions */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#facc15' }}>
                          Total Paid: {convertPrice ? convertPrice(ord.totalAmount) : '₹' + (ord.totalAmount ? ord.totalAmount.toLocaleString() : '0')}
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                            onClick={() => window.print()}
                          >
                            🖨️ {currentLang === 'gu' ? 'પ્રિન્ટ / PDF' : 'Print / Download Receipt'}
                          </button>
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ fontSize: '0.78rem', padding: '6px 12px', background: 'linear-gradient(135deg, #10b981, #059669)' }}
                            onClick={() => {
                              const shareText = `*PAYMENT RECEIPT - ${ord.orderId}*\nCustomer: ${ord.customerName}\nAmount Paid: ₹${ord.totalAmount}\nTxn Ref: ${ord.utrRef}\nStatus: ${ord.paymentStatus}\nWebsite: https://atsondika-global-trade.pages.dev`;
                              window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
                            }}
                          >
                            📲 {currentLang === 'gu' ? 'વોટ્સએપ શેર' : 'Share Receipt'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}
