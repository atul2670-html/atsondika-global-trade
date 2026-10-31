/**
 * COA PARAMETERS & TECHNICAL SPEC ENGINE
 * Dynamic HS Code-based Quality Test Parameters, Storage Norms, and Regulatory Compliance Generator
 * Supports International WCO Harmonized System (HS) Codes & Custom Admin Overrides
 */

// Helper to sanitize HS Code digits
export const cleanHsDigits = (rawHs) => {
  if (!rawHs) return '';
  return String(rawHs).replace(/[^0-9]/g, '');
};

/**
 * Returns comprehensive international WCO Harmonized System (HS) Code classification details
 */
export const getWcoHsCodeDetails = (rawHs, prodName = '') => {
  const hs = cleanHsDigits(rawHs);
  const hs2 = hs.slice(0, 2);
  const hs4 = hs.slice(0, 4);
  const hs6 = hs.slice(0, 6);

  if (hs2 === '54') {
    return {
      hsCode: hs || '540752',
      chapter: '54',
      chapterTitleEn: 'Chapter 54: Man-Made Filaments & Synthetic Textured Yarns',
      chapterTitleGu: 'પ્રકરણ ૫૪: કૃત્રિમ ફિલામેન્ટ પોલિએસ્ટર યાર્ન અને ફેબ્રિક્સ (સાડી/જરી)',
      heading: hs4 || '5407',
      headingTitleEn: hs4 === '5402'
        ? 'Heading 54.02: Synthetic Filament Yarn (Textured / FDY / POY / DTY)'
        : 'Heading 54.07: Woven Fabrics of Synthetic Filament Yarn (Jacquard & Saree Fabrics)',
      headingTitleGu: hs4 === '5402'
        ? 'હેડિંગ ૫૪.૦૨: સિન્થેટિક ફિલામેન્ટ પોલિએસ્ટર યાર્ન (DTY / FDY)'
        : 'હેડિંગ ૫૪.૦૭: સિન્થેટિક પોલિએસ્ટર ફિલામેન્ટ અને જરી વુવન ફેબ્રિક્સ (સાડી/જેક્વાર્ડ)',
      subheading: hs6 || '5407.52',
      subheadingTitleEn: 'Subheading 5407.52: Dyed Woven Fabrics of Textured Polyester Filaments (≥ 85%) with Metallic Jari',
      subheadingTitleGu: 'સબ-હેડિંગ ૫૪૦૭.૫૨: ડાઇડ વુવન પોલિએસ્ટર ફિલામેન્ટ ફેબ્રિક્સ (૮૫% કે તેથી વધુ ફિલામેન્ટ) સાથે જરી',
      governingCouncil: 'TEXPROCIL & OEKO-TEX Standard 100 (Ministry of Textiles, Govt. of India)',
      officialStandard: '≥ 85% Textured Polyester Filament with Metallic Jari Yarn, Rated GSM ± 3% (WCO HS 5407.52)'
    };
  }

  if (hs2 === '52') {
    return {
      hsCode: hs || '520522',
      chapter: '52',
      chapterTitleEn: 'Chapter 52: Cotton & Cotton Yarns (Combed / Carded Ring Spun)',
      chapterTitleGu: 'પ્રકરણ ૫૨: કપાસ, ૧૦૦% શુદ્ધ કોટન સુતર અને કાપડ',
      heading: hs4 || '5205',
      headingTitleEn: 'Heading 52.05: Cotton Yarn (Other Than Sewing Thread), Single / Plied',
      headingTitleGu: 'હેડિંગ ૫૨.૦૫: કોટન યાર્ન સુતર (Ne 20s to 40s કાઉન્ટ)',
      subheading: hs6 || '5205.22',
      subheadingTitleEn: 'Subheading 5205.22: Single Combed Cotton Yarn (Ne 20s to 40s)',
      subheadingTitleGu: 'સબ-હેડિંગ ૫૨૦૫.૨૨: કોમ્બડ કોટન સુતર યાર્ન',
      governingCouncil: 'TEXPROCIL & Cotton Textiles Export Promotion Council of India',
      officialStandard: '100% Combed Natural Cotton / Bio-Washed Ring Spun Yarn (WCO HS 5205)'
    };
  }

  if (hs2 === '61' || hs2 === '62') {
    return {
      hsCode: hs || (hs2 === '61' ? '610910' : '620342'),
      chapter: hs2,
      chapterTitleEn: hs2 === '61' ? 'Chapter 61: Articles of Apparel & Clothing Accessories, Knitted/Crocheted' : 'Chapter 62: Articles of Apparel & Clothing Accessories, Not Knitted (Woven)',
      chapterTitleGu: hs2 === '61' ? 'પ્રકરણ ૬૧: નીટેડ રેડિમેડ ગારમેન્ટ્સ (ટી-શર્ટ, હોઝિયરી)' : 'પ્રકરણ ૬૨: વુવન રેડિમેડ ગારમેન્ટ્સ (શર્ટ, પેન્ટ, ડ્રેસિસ)',
      heading: hs4 || (hs2 === '61' ? '6109' : '6203'),
      headingTitleEn: hs2 === '61' ? 'Heading 61.09: T-shirts, Singlets and Other Vests, Knitted or Crocheted' : 'Heading 62.03: Men\'s or Boys\' Suits, Ensembles, Jackets, Trousers',
      headingTitleGu: hs2 === '61' ? 'હેડિંગ ૬૧.૦૯: ટી-શર્ટ્સ અને નીટેડ ગારમેન્ટ્સ' : 'હેડિંગ ૬૨.૦૩: રેડિમેડ શર્ટ્સ, ટ્રાઉઝર્સ અને ગારમેન્ટ્સ',
      subheading: hs6 || (hs2 === '61' ? '6109.10' : '6203.42'),
      subheadingTitleEn: 'Export Readymade Apparel (OEKO-TEX / AEPC Quality Norms)',
      subheadingTitleGu: 'એક્સપોર્ટ રેડિમેડ ગારમેન્ટ્સ (AEPC સ્ટાન્ડર્ડ)',
      governingCouncil: 'AEPC (Apparel Export Promotion Council of India)',
      officialStandard: 'Export-Grade High Quality Finished Apparel (AQL 2.5 Audit)'
    };
  }

  if (hs2 === '10') {
    return {
      hsCode: hs || '100630',
      chapter: '10',
      chapterTitleEn: 'Chapter 10: Cereals; Basmati & Premium Milled Long Grain Rice',
      chapterTitleGu: 'પ્રકરણ ૧૦: અનાજ (પ્રીમિયમ બાસમતી અને મિલ્ડ ચોખા)',
      heading: hs4 || '1006',
      headingTitleEn: 'Heading 10.06: Rice (Semi-Milled or Wholly Milled, Polished or Glazed)',
      headingTitleGu: 'હેડિંગ ૧૦.૦૬: બાસમતી અને પરબોઇલ્ડ ચોખા',
      subheading: hs6 || '1006.30',
      subheadingTitleEn: 'Subheading 1006.30: Semi-Milled or Wholly Milled Rice (Sortex Cleaned)',
      subheadingTitleGu: 'સબ-હેડિંગ ૧૦૦૬.૩૦: સોર્ટેક્સ ક્લીન બાસમતી ચોખા',
      governingCouncil: 'APEDA & FSSAI (Ministry of Commerce & Industry)',
      officialStandard: 'Min 8.35 mm+ Extra Long Grain, Broken Grains < 1.0% (WCO HS 1006.30)'
    };
  }

  if (hs2 === '09') {
    return {
      hsCode: hs || '091030',
      chapter: '09',
      chapterTitleEn: 'Chapter 09: Coffee, Tea, Maté and Spices (Turmeric, Cumin, Pepper)',
      chapterTitleGu: 'પ્રકરણ ૦૯: મસાલા અને તેજાના (હળદર, જીરું, મરી, ધાણા)',
      heading: hs4 || '0910',
      headingTitleEn: hs4 === '0909' ? 'Heading 09.09: Seeds of Anise, Badian, Fennel, Coriander, Cumin' : 'Heading 09.10: Ginger, Saffron, Turmeric (Curcuma), Thyme, Curry',
      headingTitleGu: hs4 === '0909' ? 'હેડિંગ ૦૯.૦૯: જીરું, વરિયાળી અને ધાણા બીજ' : 'હેડિંગ ૦૯.૧૦: હળદર, આદુ અને તેજાના',
      subheading: hs6 || '0910.30',
      subheadingTitleEn: 'Export Quality Clean Spices (ASTA & ISO 959 / 5562 Standards)',
      subheadingTitleGu: 'એક્સપોર્ટ ક્વોલિટી સોર્ટેક્સ મસાલા',
      governingCouncil: 'Spices Board India & AGMARK / FSSAI',
      officialStandard: 'Curcumin > 3.0% / Volatile Oil > 2.5%, Extraneous Matter < 0.5% (WCO HS 0909/0910)'
    };
  }

  if (hs2 === '04') {
    return {
      hsCode: hs || '040590',
      chapter: '04',
      chapterTitleEn: 'Chapter 04: Dairy Produce; Pure Desi Ghee, Butter & Milk Powder',
      chapterTitleGu: 'પ્રકરણ ૦૪: ડેરી ઉત્પાદનો (અમૂલ શુદ્ધ દેશી ઘી, બટર અને દૂધ પાવડર)',
      heading: hs4 || '0405',
      headingTitleEn: 'Heading 04.05: Butter and Other Fats Derived from Milk (Dairy Ghee)',
      headingTitleGu: 'હેડિંગ ૦૪.૦૫: શુદ્ધ ડેરી ઘી અને મિલ્ક ફેટ',
      subheading: hs6 || '0405.90',
      subheadingTitleEn: 'Subheading 0405.90: Anhydrous Milk Fat / Pure Clarified Butter (Desi Ghee)',
      subheadingTitleGu: 'સબ-હેડિંગ ૦૪૦૫.૯૦: પ્યોર દેશી ઘી (અમૂલ ક્વોલિટી)',
      governingCouncil: 'FSSAI, AGMARK Special Grade & Export Inspection Agency (EIA)',
      officialStandard: 'Min 99.7% Pure Bovine Milk Fat, Moisture Max 0.3% w/w (WCO HS 0405.90)'
    };
  }

  if (hs2 === '73') {
    return {
      hsCode: hs || '731815',
      chapter: '73',
      chapterTitleEn: 'Chapter 73: Articles of Iron or Steel; Precision Fasteners (Bolts, Nuts, Screws)',
      chapterTitleGu: 'પ્રકરણ ૭૩: લોખંડ-સ્ટીલ આર્ટિકલ્સ (હાઇ-ટેન્સાઇલ બોલ્ટ, નટ, સ્ક્રૂ)',
      heading: hs4 || '7318',
      headingTitleEn: 'Heading 73.18: Screws, Bolts, Nuts, Coach Screws, Washers of Iron or Steel',
      headingTitleGu: 'હેડિંગ ૭૩.૧૮: હાઇ-ટેન્સાઇલ બોલ્ટ, નટ, વોશર અને સ્ક્રૂ',
      subheading: hs6 || '7318.15',
      subheadingTitleEn: 'Subheading 7318.15: High-Tensile Threaded Screws and Bolts',
      subheadingTitleGu: 'સબ-હેડિંગ ૭૩૧૮.૧૫: થ્રેડેડ બોલ્ટ અને સ્ક્રૂ',
      governingCouncil: 'EEPC India & ISO 9001 / EN 10204 3.1 Certification',
      officialStandard: 'High-Tensile Grade 8.8 / 10.9 / 12.9 or SS304/SS316 (WCO HS 7318)'
    };
  }

  if (hs2 === '84') {
    return {
      hsCode: hs || '845811',
      chapter: '84',
      chapterTitleEn: 'Chapter 84: Machinery, Nuclear Reactors, Boilers & Mechanical Appliances',
      chapterTitleGu: 'પ્રકરણ ૮૪: મશીનરી, CNC લેથ, મિલિંગ મશીન, પંપ અને પ્લાન્ટ',
      heading: hs4 || '8458',
      headingTitleEn: hs4 === '8471' ? 'Heading 84.71: Automatic Data Processing Machines (Computers & IT)' : 'Heading 84.58: Machine Tools (Lathes) for Removing Metal',
      headingTitleGu: hs4 === '8471' ? 'હેડિંગ ૮૪.૭૧: કોમ્પ્યુટર અને આઇટી સાધનો' : 'હેડિંગ ૮૪.૫૮: CNC લેથ અને પ્રિસિઝન ટર્નિંગ મશીન',
      subheading: hs6 || '8458.11',
      subheadingTitleEn: 'Industrial Machinery & Precision CNC Equipment',
      subheadingTitleGu: 'ઔદ્યોગિક મશીનરી અને સીએનસી સાધનો',
      governingCouncil: 'CE Machinery Directive 2006/42/EC & EEPC India',
      officialStandard: 'Full Factory Acceptance Test (FAT) & CE Machinery Directive Compliant'
    };
  }

  if (hs2 === '85') {
    return {
      hsCode: hs || '851762',
      chapter: '85',
      chapterTitleEn: 'Chapter 85: Electrical Machinery & Equipment; Telecom, Routers & Electronics',
      chapterTitleGu: 'પ્રકરણ ૮૫: ઇલેક્ટ્રોનિક્સ, ટેલિકોમ, રાઉટર, સ્માર્ટફોન અને વાયર્સ',
      heading: hs4 || '8517',
      headingTitleEn: hs4 === '8528' ? 'Heading 85.28: Monitors and Displays, Television Reception Apparatus' : 'Heading 85.17: Telephone Sets, Smartphones, Routers & Switches',
      headingTitleGu: hs4 === '8528' ? 'હેડિંગ ૮૫.૨૮: એલઇડી મોનિટર અને ટેલિવિઝન' : 'હેડિંગ ૮૫.૧૭: સ્માર્ટફોન, વાઇ-ફાઇ રાઉટર અને નેટવર્કિંગ',
      subheading: hs6 || '8517.62',
      subheadingTitleEn: 'Telecommunications & High-Speed Wireless Networking Devices',
      subheadingTitleGu: 'હાઇ-સ્પીડ વાયરલેસ વાઇ-ફાઇ નેટવર્કિંગ સાધનો',
      governingCouncil: 'TEC, BIS, CE RED, FCC & RoHS 2.0 Directive',
      officialStandard: 'IEEE 802.11 Compliant, CE LVD, FCC Part 15 & RoHS 2.0 Directive'
    };
  }

  // Fallback default
  return {
    hsCode: hs || 'Standard',
    chapter: hs2 || '00',
    chapterTitleEn: `WCO HS Chapter ${hs2 || 'Standard'} International Merchandise`,
    chapterTitleGu: `WCO HS પ્રકરણ ${hs2 || 'માનક'} આંતરરાષ્ટ્રીય ઉત્પાદન`,
    heading: hs4 || '0000',
    headingTitleEn: `WCO Heading ${hs4 || 'Standard'} Export Commodity`,
    headingTitleGu: `WCO હેડિંગ ${hs4 || 'માનક'} એક્સપોર્ટ કોમોડિટી`,
    subheading: hs6 || hs || 'Standard',
    subheadingTitleEn: 'Verified Export Specification Standard',
    subheadingTitleGu: 'પ્રમાણિત એક્સપોર્ટ સ્પેસિફિકેશન',
    governingCouncil: 'DGFT (Directorate General of Foreign Trade, Govt. of India)',
    officialStandard: 'International Export Quality & Safety Standard Compliant'
  };
};

/**
 * Returns default standard laboratory test parameters based on WCO HS Code and product context
 */
export const getDefaultParamsForHsCode = (productOrHs) => {
  const p = typeof productOrHs === 'object' && productOrHs !== null ? productOrHs : { hsCode: String(productOrHs || '') };
  const hsRaw = String(p.hsCode || p.localHsn || '').trim();
  const hs = cleanHsDigits(hsRaw);
  const hs2 = hs.slice(0, 2);
  const hs4 = hs.slice(0, 4);
  const hs6 = hs.slice(0, 6);

  const prodNameEn = (typeof p.names === 'object' ? p.names.en : p.name) || p.title || '';
  const prodNameGu = (typeof p.names === 'object' ? p.names.gu : '') || '';
  const cat = (p.category || '').toLowerCase();
  const pId = (p.id || '').toLowerCase();
  const pDescEn = (typeof p.description === 'object' ? p.description.en : p.description) || '';
  const pDescGu = (typeof p.description === 'object' ? p.description.gu : '') || '';
  const pSpecStr = typeof p.spec === 'object' ? Object.values(p.spec).join(' ') : (p.spec || '');
  const pNameFull = [
    prodNameEn,
    prodNameGu,
    p.title || '',
    pDescEn,
    pDescGu,
    pSpecStr,
    cat,
    p.subCategory || ''
  ].join(' ').toLowerCase();

  // 1. Telecommunications & Networking (HS 8517.62 / 8517.69 or Router, Wi-Fi, Switches, Hubs)
  const isNetworkTelecom = hs6 === '851762' || hs6 === '851769' || hs6 === '851770' ||
    (hs4 === '8517' && (pNameFull.includes('router') || pNameFull.includes('rauter') || pNameFull.includes('wi-fi') || pNameFull.includes('wifi') || pNameFull.includes('switch') || pNameFull.includes('modem') || pNameFull.includes('transceiver') || pNameFull.includes('રાઉટર') || pNameFull.includes('વાઇ-ફાઇ')));

  if (isNetworkTelecom) {
    return {
      categoryKey: 'telecom_network',
      categoryLabel: 'Telecommunications & High-Speed Networking Equipment (WCO HS 8517.62)',
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & TEC / CE / RoHS Reg:',
      sealSubtitle: 'TEC, CE, FCC & RoHS AUDITED TELECOM QUALITY SEAL',
      signatoryTitle: 'Lead Telecom & RF Compliance Engineer',
      storageTitle: '⚡ OPERATING ENVIRONMENT & STORAGE GUIDELINES:',
      storageText: 'Store in an ESD-safe, dry indoor climate-controlled environment. Operating Temperature: -10°C to +55°C; Relative Humidity: 10% to 90% (non-condensing). Keep away from conductive moisture, corrosive gases, and severe electromagnetic fields.',
      qualityTitle: '🛡️ TELECOMMUNICATION SAFETY & QUALITY DECLARATION:',
      qualityText: 'Certified 100% compliant with IEEE 802.11 standards, CE Low Voltage Directive (LVD 2014/35/EU), FCC Part 15, and RoHS 2.0 Directive (2011/65/EU). 100% factory stress-tested with full packet throughput benchmark. Zero functional defects.',
      testParams: [
        { param: 'RF Wireless Band & Carrier Frequency (વાયરલેસ ફ્રિક્વન્સી)', standard: '2.4 GHz, 5.0 GHz & 6.0 GHz (IEEE 802.11ax/be Wi-Fi 6/7 Complies)', result: 'Nominal Multi-Band Transmission Pass', method: 'RF Spectrum Analyzer & Vector Signal Analyzer' },
        { param: 'Throughput & Latency Performance (ડેટા સ્પીડ અને લેટન્સી)', standard: 'Min 1200 - 3000 Mbps Full-Duplex (< 3ms Latency, 0% Packet Loss)', result: 'Complies (Tested 2400 Mbps Stable Throughput)', method: 'RFC 2544 Gigabit Ethernet Traffic Generator' },
        { param: 'Network Protocol & Encryption Security (સિક્યોરિટી અને એન્ક્રિપ્શન)', standard: 'WPA3-SAE / WPA2-Enterprise, IPv6, SPI Firewall Shield', result: '100% Protected (Zero Vulnerabilities Detected)', method: 'Automated Penetration & Protocol Suite' },
        { param: 'Electrical Safety & Adapter Insulation (ઇલેક્ટ્રિકલ સલામતી અને એડેપ્ટર)', standard: '12V DC ± 5%, Ripple Voltage < 50mV, Dielectric Hi-Pot 1.5 kV Pass', result: '12.04V DC Stable (Leakage < 0.2 mA)', method: 'IEC 62368-1 / CE Low Voltage Directive (LVD)' },
        { param: 'Electromagnetic Compatibility (EMC / EMI રેડિયેશન શિલ્ડ)', standard: 'EN 55032 Class B & FCC Part 15 (Zero Harmful Interference)', result: 'PASSED (Radiated Emissions < Margin Limit)', method: '10m Anechoic Chamber (CISPR 32 Standards)' },
        { param: 'RoHS 2.0 Lead-Free Environmental Screening (પર્યાવરણીય સલામતી)', standard: '100% Lead-Free Solder, Heavy Metals (Pb, Cd, Hg, Cr6+) NIL', result: 'COMPLIES (RoHS 2.0 Directive 2011/65/EU Certified)', method: 'X-ray Fluorescence Spectrometry (IEC 62321)' }
      ]
    };
  }

  // 2. Smartphones, Cellular Phones & Mobile Devices (HS 8517.11 / 8517.12 / 8517.13 / 8517.14)
  const isSmartphone = hs6 === '851711' || hs6 === '851712' || hs6 === '851713' || hs6 === '851714' ||
    (hs4 === '8517' && (pNameFull.includes('phone') || pNameFull.includes('mobile') || pNameFull.includes('galaxy') || pNameFull.includes('glexi') || pNameFull.includes('s24') || pNameFull.includes('s25') || pNameFull.includes('iphone') || pNameFull.includes('handset') || pNameFull.includes('સેમસંગ') || pNameFull.includes('મોબાઇલ') || pNameFull.includes('ફોન')));

  if (isSmartphone) {
    return {
      categoryKey: 'smartphones',
      categoryLabel: 'Smartphones & Cellular Telecommunications (WCO HS 8517.13)',
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & BIS / CE / RoHS Reg:',
      sealSubtitle: 'BIS, CE, SAR & IP68 AUDITED MOBILE QUALITY SEAL',
      signatoryTitle: 'Lead Mobile Electronics & QA Systems Engineer',
      storageTitle: '⚡ OPERATING ENVIRONMENT & STORAGE GUIDELINES:',
      storageText: 'Store in cool, dry climate-controlled area. Recommended storage temperature: 15°C to 25°C with battery level at 50% state-of-charge for long-term storage. Keep away from extreme thermal heat (> 60°C) and corrosive moisture.',
      qualityTitle: '🛡️ MOBILE ELECTRONICS SAFETY & COMPLIANCE DECLARATION:',
      qualityText: 'Certified 100% compliant with BIS IS 16046 (IEC 62133-2 battery safety), CE Radio Equipment Directive (RED 2014/53/EU), and RoHS 2.0. Clean GSMA Dual IMEI registration. 100% factory pre-tested with zero functional defects.',
      testParams: [
        { param: 'Display & Touch Digitizer Panel (ડિસ્પ્લે પેનલ ક્વોલિટી)', standard: 'AMOLED / OLED / IPS, 120Hz Refresh, Touch Latency < 5ms (Zero Dead Pixels)', result: 'Grade A+ Display (100% Color Uniformity & Zero Defects)', method: 'Automated Optical Inspection (AOI) & Colorimeter' },
        { param: '5G / 4G Cellular RF & Specific Absorption Rate (SAR રેડિયેશન)', standard: 'SAR Limit < 1.6 W/kg (Head & Body ICNIRP / FCC Complies)', result: '0.78 W/kg (Well Within Safe Permissible Limits)', method: 'DASY SAR Electromagnetic Dosimetry Chamber' },
        { param: 'Battery Cell Safety & Thermal Management (બેટરી સલામતી BMS)', standard: 'Li-ion Polymer Cell, Overcharge & Thermal Runaway Protection Active', result: 'IEC 62133-2 & BIS IS 16046 Certified (Zero Overheating)', method: 'Cyclic Charge-Discharge & Thermal Stress Rig' },
        { param: 'Enclosure Ingress Protection (વોટર અને ડસ્ટ પ્રૂફ રેટિંગ)', standard: 'IP68 Standard (1.5 Meter Water Depth Immersion for 30 Mins)', result: 'IP68 Certified (Hermetically Sealed Chassis)', method: 'Dust & Hydrostatic Pressure Ingress Chamber (IEC 60529)' },
        { param: 'Hardware Diagnostics & IMEI Integrity (હાર્ડવેર અને IMEI વેરિફિકેશન)', standard: 'Dual IMEI GSMA Registered, 100% Sensors, Audio & Cameras Tested', result: 'All Diagnostic Flags PASSED (100% Functional)', method: 'High-Speed Factory Hardware Diagnostic Suite' },
        { param: 'RoHS & Hazardous Material Directive (હેઝાર્ડસ મટીરીયલ સ્ક્રીનિંગ)', standard: 'RoHS 2.0 & WEEE Compliant (Eco-Friendly Halogen-Free)', result: 'PASSED (Non-Detect for Hazardous Toxins)', method: 'XRF Spectroscopy & Chemical GC-MS' }
      ]
    };
  }

  // 3. Television, Monitors & Displays (HS 8528)
  const isTelevision = hs4 === '8528' || pNameFull.includes('tv') || pNameFull.includes('television') || pNameFull.includes('monitor') || pNameFull.includes('display panel') || pNameFull.includes('ટીવી');

  if (isTelevision) {
    return {
      categoryKey: 'tv_displays',
      categoryLabel: 'Television Receivers, Video Monitors & Displays (WCO HS 8528.72)',
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & BIS / CE / BEE Reg:',
      sealSubtitle: 'BEE 5-STAR, CE & RoHS AUDITED DISPLAY QUALITY SEAL',
      signatoryTitle: 'Lead Display Engineering & Quality Assurance Officer',
      storageTitle: '⚡ OPERATING ENVIRONMENT & STORAGE GUIDELINES:',
      storageText: 'Store upright in original protective export packaging in a dry indoor warehouse. Recommended ambient temperature: 0°C to 45°C; Relative humidity < 80% (non-condensing). Avoid physical impact, stacking beyond specified box limits, and direct water exposure.',
      qualityTitle: '🛡️ TELEVISION & DISPLAY SAFETY DECLARATION:',
      qualityText: 'Certified compliant with IEC 62368-1 audio/video safety standards, BEE 5-Star Energy Efficiency norms, and RoHS 2.0 Directive. 100% full-screen pattern tested for zero dead pixels. Guaranteed safe for global consumer electronics distribution.',
      testParams: [
        { param: 'Display Resolution & Color Accuracy (ડિસ્પ્લે રિઝોલ્યુશન અને કલર એક્યુરેસી)', standard: '4K Ultra HD (3840 x 2160) / FHD, HDR10+, DCI-P3 > 90% Gamut', result: 'Complies (Rich Wide Color Gamut & Delta E < 2.0)', method: 'Konica Minolta Display Color Analyzer' },
        { param: 'Pixel Defect & Uniformity Examination (પિક્સેલ ડિફેક્ટ ચકાસણી)', standard: 'ISO 9241-307 Class 1 (100% Zero Stuck / Dead Pixel Tolerance)', result: 'Zero Dead Pixels (Flawless Panel Certified)', method: 'High-Resolution CCD Pattern Generator Inspection' },
        { param: 'High Voltage Dielectric Withstand (Hi-Pot વીજળીક સહનશક્તિ)', standard: '1.5 kV AC for 60 seconds (Zero Flashover, Leakage Current < 0.5 mA)', result: '1.5 kV AC Passed (Insulation Resistance > 100 MΩ)', method: 'Dielectric Breakdown Rig (IEC 62368-1 / IS 616)' },
        { param: 'Energy Efficiency & Standby Consumption (પાવર કાર્યક્ષમતા)', standard: 'Standby Power < 0.5 Watt (BEE 5-Star / Energy Star Compliant)', result: '0.32 Watt Standby (Super Energy Efficient)', method: 'Yokogawa Digital Power Meter (IEC 62301)' },
        { param: 'Audio Output & Total Harmonic Distortion (ઓડિયો ગુણવત્તા THD)', standard: '20W Stereo Sound, Total Harmonic Distortion (THD) < 1.0% @ 1kHz', result: '0.45% THD (Crystal Clear Acoustics & Dolby Audio Pass)', method: 'Audio Precision APx500 Audio Analyzer' },
        { param: 'Enclosure Safety & RoHS Directive (બોડી મટીરીયલ અને RoHS)', standard: 'UL94 V-0 Flame-Retardant Polymer Housing & RoHS 2.0 Compliant', result: 'Certified Flame Retardant & Lead-Free', method: 'UL94 Vertical Flame Test & XRF Screening' }
      ]
    };
  }

  // 4. Computers, Laptops & IT Equipment (HS 8471)
  const isComputerIT = hs4 === '8471' || pNameFull.includes('computer') || pNameFull.includes('laptop') || pNameFull.includes('desktop') || pNameFull.includes('server') || pNameFull.includes('કમ્પ્યુટર') || pNameFull.includes('લેપટોપ');

  if (isComputerIT) {
    return {
      categoryKey: 'computers_it',
      categoryLabel: 'Automatic Data Processing Machines & Computers (WCO HS 8471.30)',
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & BIS / CE / FCC Reg:',
      sealSubtitle: 'BIS, CE & ENERGY STAR AUDITED IT QUALITY SEAL',
      signatoryTitle: 'Lead Systems Hardware & Firmware Engineer',
      storageTitle: '⚡ OPERATING ENVIRONMENT & STORAGE GUIDELINES:',
      storageText: 'Store in dry, climate-controlled, dust-free environment. Temperature: 10°C to 40°C; Relative humidity < 80% non-condensing. Protected against electrostatic discharge (ESD) and sudden mechanical vibration.',
      qualityTitle: '🛡️ IT EQUIPMENT SAFETY & QUALITY DECLARATION:',
      qualityText: 'Certified 100% compliant with IEC 62368-1, CE-EMC, FCC Part 15 Class B, and RoHS 2.0. Factory burn-in cycle completed with zero system errors. Ready for enterprise and international retail deployment.',
      testParams: [
        { param: 'Processor & GPU Thermal Stress Cycle (પ્રોસેસર અને થર્મલ સાયકલ)', standard: '100% Full-Load Stress Run for 24 Hrs (Core Temp < 82°C, No Throttling)', result: 'Stable 100% Load Execution (Peak Temp 72°C)', method: 'Burn-In Diagnostic Suite & Thermal Probes' },
        { param: 'Memory & Storage Integrity (RAM અને SSD પરફોર્મન્સ)', standard: 'DDR5 / LPDDR5 ECC Check (0 Bit Errors), NVMe SMART 100% Health', result: 'Zero Memory Faults, NVMe Read > 3500 MB/s (100% Healthy)', method: 'MemTest86 Pro & NVMe SMART Health Telemetry' },
        { param: 'Power Management & Battery Runtime (પાવર સપ્લાય અને બેટરી)', standard: 'Efficiency > 90% (80 Plus Gold), Battery Cycle Life > 1000 Cycles', result: 'Complies (Tested 11.5 Hrs Continuous Runtime)', method: 'Battery Life Benchmark & AC Power Analyzer' },
        { param: 'I/O Ports & Connectivity Verification (પોર્ટ્સ અને વાયરલેસ કનેક્ટિવિટી)', standard: 'Thunderbolt / USB 4, HDMI 2.1, Wi-Fi 6E, Bluetooth 5.3 (100% Functional)', result: '100% Transfer Handshake Confirmed on All Ports', method: 'Loopback Hardware Verification Tester' },
        { param: 'Electrical Safety & Dielectric Insulation (વીજળીક સુરક્ષા)', standard: 'Class I / Class II Safety Standard (IEC 62368-1 & BIS Certified)', result: 'Insulation Resistance > 50 MΩ @ 500V DC', method: 'Safety Analyzer Rig (CE / FCC Standards)' },
        { param: 'Environmental & RoHS Compliance (પર્યાવરણીય પ્રમાણપત્ર)', standard: '100% Lead-Free Solder, Halogen-Free PCB, Recyclable Chassis', result: 'RoHS 2.0 & Energy Star Compliant', method: 'X-ray Fluorescence Spectrometry' }
      ]
    };
  }

  // 5. Electrical Switchgear, Panels, PLC, VFD, Automation (HS 8535, 8536, 8537, 8538)
  const isSwitchgearPanel = hs4 === '8535' || hs4 === '8536' || hs4 === '8537' || hs4 === '8538' ||
    pNameFull.includes('switchgear') || pNameFull.includes('plc') || pNameFull.includes('vfd') || pNameFull.includes('panel') || pNameFull.includes('breaker') || pNameFull.includes('contactor') || pNameFull.includes('relay') || pNameFull.includes('automation') || pNameFull.includes('પેનલ') || pNameFull.includes('ઓટોમેશન');

  if (isSwitchgearPanel) {
    return {
      categoryKey: 'switchgear_panels',
      categoryLabel: 'Electrical Control Panels, Switchgear & Automation (WCO HS 8537.10)',
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & CE / ISO / IEC Reg:',
      sealSubtitle: 'IEC 61439 & CE AUDITED INDUSTRIAL SWITCHGEAR SEAL',
      signatoryTitle: 'Lead QA/QC Automation & Electrical Engineer',
      storageTitle: '⚡ OPERATING ENVIRONMENT & INSTALLATION GUIDELINES:',
      storageText: 'Operate in clean indoor industrial environment. Ambient operating temperature: -10°C to +55°C; Relative humidity < 90% (non-condensing). Solid low-impedance copper earth grounding (< 2.0 Ω) and surge suppression (SPD) required.',
      qualityTitle: '🛡️ ELECTRICAL SAFETY & QUALITY DECLARATION:',
      qualityText: 'Certified 100% compliant with IEC 61439-1/2, IEC 60204-1, CE Low Voltage Directive (LVD) & RoHS 2.0. 100% pre-tested with 72-hour full-load burn-in cycle. Zero manufacturing defects. Safe for international industrial deployment.',
      testParams: [
        { param: 'Rated Supply Voltage (ઓપરેટિંગ વોલ્ટેજ)', standard: '230V AC (1-Ph) / 415V AC (3-Ph) ± 10%', result: '415V AC (Stable / Nominal)', method: 'Digital True-RMS Power Analyzer (IEC 60038)' },
        { param: 'Rated Operating Frequency (આવર્તન / ફ્રિક્વન્સી)', standard: '50 Hz / 60 Hz ± 5% (Pure Waveform)', result: '50.0 Hz (Complies)', method: 'Frequency Spectrum Counter (IEC 60255)' },
        { param: 'Insulation Resistance (ઇન્સ્યુલેશન રેઝિસ્ટન્સ - IR)', standard: 'Min 100 MΩ @ 500V DC / 1000V DC', result: '> 550 MΩ (High Isolation)', method: 'Calibrated Megohmmeter (IEC 60204-1 / IS 10118)' },
        { param: 'Dielectric Withstand / Hi-Pot (વીજળીક સહનશક્તિ)', standard: '2.0 kV AC for 60 sec (Zero Breakdown)', result: '2.5 kV AC Passed (Leakage < 0.8 mA)', method: 'High Voltage Breakdown Rig (IEC 60947-1)' },
        { param: 'Enclosure Ingress Protection (IP પ્રોટેક્શન ગ્રેડ)', standard: 'IP65 / IP66 (Dust-Tight & Water-Jet Proof)', result: 'IP65 Certified (Sealed Enclosure)', method: 'Dust & Water Ingress Chamber (IEC 60529)' },
        { param: 'Electromagnetic Immunity (EMC / EMI નોઇઝ સપ્રેસન)', standard: 'EN 61000-6-2 (Industrial Immunity) & EN 61000-6-4', result: 'PASSED (High Transient Immunity)', method: 'EMC Anechoic Chamber (CISPR 11 / EN 55011)' },
        { param: 'Total Harmonic Distortion (THD પાવર ક્વોલિટી)', standard: 'Max THD < 3.0% at Rated Full Load', result: '1.85% THD (Ultra-Low Distortion)', method: 'Fast Fourier Transform (FFT) Analyzer (IEC 61000-3-2)' },
        { param: 'Full Load Operating Temperature (ઓપરેટિંગ તાપમાન)', standard: 'Ambient -10°C to +55°C (Temp Rise < 40°C)', result: '+31.5°C Thermal Rise (Pass)', method: 'FLIR Calibrated Thermography & RTD' },
        { param: 'Short Circuit Withstand Capacity (શોર્ટ સર્કિટ રક્ષણ)', standard: '10 kA to 35 kA for 1 second', result: '25 kA / 1 sec (Fully Withstands)', method: 'High Current Testing Rig (IEC 61439-1)' },
        { param: 'RoHS 2.0 & CE Environmental Safety Directive', standard: '100% Lead-Free & CE Low Voltage Directive (LVD)', result: 'COMPLIES (RoHS Certified / Lead-Free)', method: 'X-ray Fluorescence Spectrometry (IEC 62321)' }
      ]
    };
  }

  // 6. Power Inverters, Transformers & Converters (HS 8504)
  const isPowerElectronic = hs4 === '8504' || pNameFull.includes('inverter') || pNameFull.includes('transformer') || pNameFull.includes('converter') || pNameFull.includes('power supply') || pNameFull.includes('smps') || pNameFull.includes('ups') || pNameFull.includes('ઇન્વર્ટર') || pNameFull.includes('ટ્રાન્સફોર્મર');

  if (isPowerElectronic) {
    return {
      categoryKey: 'power_electronics',
      categoryLabel: 'Static Converters, Inverters & Power Transformers (WCO HS 8504.40)',
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & BIS / CE / IEEE Reg:',
      sealSubtitle: 'IEEE & CE AUDITED POWER CONVERSION SEAL',
      signatoryTitle: 'Lead Power Electronics QC Engineer',
      storageTitle: '⚡ OPERATING ENVIRONMENT & STORAGE GUIDELINES:',
      storageText: 'Store in dry, well-ventilated indoor environment away from corrosive chemical fumes and dampness. Ambient temperature: -10°C to +50°C. Protect internal windings and magnetics from condensation.',
      qualityTitle: '🛡️ POWER ELECTRONICS SAFETY DECLARATION:',
      qualityText: 'Certified 100% compliant with IEC 62109, IEEE 519 harmonics limits, CE Low Voltage Directive, and RoHS 2.0. Full load heat-run burn-in cycle verified. Pure sine wave output with high efficiency.',
      testParams: [
        { param: 'Output Voltage Regulation & Waveform (વોલ્ટેજ રેગ્યુલેશન)', standard: 'Pure Sine Wave Output, Rated Voltage ± 1.0%', result: 'Pure Sine Wave (Nominal ± 0.6% Pass)', method: 'High-Precision True-RMS Power Analyzer' },
        { param: 'Power Conversion Efficiency (કાર્યક્ષમતા / Efficiency)', standard: 'Min 94.5% to 98.2% at Full Rated Load', result: '97.2% Efficiency at Full Load', method: 'Power Bench Calibrator (IEC 61683)' },
        { param: 'Dielectric Insulation Breakdown (Hi-Pot ટેસ્ટિંગ)', standard: '2.5 kV AC for 60 seconds (Zero Breakdown)', result: 'Passed (Leakage Current < 1.0 mA)', method: 'High Voltage Dielectric Tester' },
        { param: 'Total Harmonic Distortion - THD (પાવર ગુણવત્તા)', standard: 'THD < 2.0% at Linear Load (< 4% at Non-Linear)', result: '1.45% THD (Ultra-Clean Waveform)', method: 'FFT Harmonic Analyzer' },
        { param: 'Thermal Rise & Overload Capacity (ઓવરલોડ ક્ષમતા)', standard: '150% Overload for 10 seconds without trip', result: 'Withstands 160% Load Safely', method: 'Dynamic Resistive Load Bank' },
        { param: 'RoHS 2.0 Environmental Compliance (પર્યાવરણીય મુક્તિ)', standard: '100% Lead-Free & Heavy Metal Free', result: 'RoHS 2.0 Certified', method: 'X-ray Fluorescence Spectrometry' }
      ]
    };
  }

  // 7. Electric Motors & Generators (HS 8501, 8502, 8503)
  const isElectricMotor = hs4 === '8501' || hs4 === '8502' || hs4 === '8503' || pNameFull.includes('motor') || pNameFull.includes('generator') || pNameFull.includes('alternator') || pNameFull.includes('મોટર');

  if (isElectricMotor) {
    return {
      categoryKey: 'motors_generators',
      categoryLabel: 'Electric Motors & Electrical Generators (WCO HS 8501)',
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & BIS / CE / IE3 Reg:',
      sealSubtitle: 'IE3 / IE4 PREMIUM EFFICIENCY AUDITED SEAL',
      signatoryTitle: 'Lead Electrical Machinery Quality Engineer',
      storageTitle: '⚡ STORAGE & BEARING PRESERVATION GUIDELINES:',
      storageText: 'Store in dry warehouse elevated on wooden pallets. Rotate shaft 180 degrees every 30 days to prevent bearing brinelling. Relative humidity < 70%. Protect exposed shafts with rust-preventive export coating.',
      qualityTitle: '🛡️ ROTATING ELECTRICAL MACHINE DECLARATION:',
      qualityText: 'Certified compliant with IEC 60034-1, IS 12615 Premium IE3/IE4 Efficiency, and CE. Dynamic rotor balancing Grade G2.5 passed. Zero mechanical runout or insulation defects.',
      testParams: [
        { param: 'Insulation Class & Resistance (ઇન્સ્યુલેશન રેઝિસ્ટન્સ)', standard: 'Class F / H Insulation, Min 100 MΩ @ 1000V DC', result: '> 480 MΩ (High Isolation)', method: 'Calibrated Megger Tester' },
        { param: 'Dielectric High Voltage Withstand (Hi-Pot)', standard: '2.0 kV AC for 60 seconds (Zero Flashover)', result: 'Passed (Leakage < 0.6 mA)', method: 'High Voltage Rig (IS 12615)' },
        { param: 'Vibration Severity & Dynamic Balancing (વાઇબ્રેશન)', standard: 'Vibration < 1.6 mm/s RMS (ISO 10816 Grade A)', result: '0.85 mm/s (Smooth Dynamic Balance)', method: 'Laser FFT Vibration Analyzer' },
        { param: 'Full Load Efficiency & Power Factor (કાર્યક્ષમતા & PF)', standard: 'IE3 Premium Efficiency (> 92.8%, PF > 0.85)', result: '93.6% Efficiency, 0.88 PF', method: 'Dynamometer Load Bench' },
        { param: 'Mechanical Shaft Runout & Tolerances (શાફ્ટ પરફેક્શન)', standard: 'Radial & Axial Runout < 0.015 mm', result: '0.008 mm (Precision CNC Ground)', method: 'Mitutoyo Dial Indicator / CMM' },
        { param: 'Ingress Protection Grade (IP રેટિંગ)', standard: 'IP55 / IP66 Dust & Water Ingress Proof', result: 'IP55 Certified Sealed Enclosure', method: 'IEC 60529 Water Jet Chamber' }
      ]
    };
  }

  // 8. Electrical Cables, Wires & Conductors (HS 8544)
  const isCablesWires = hs4 === '8544' || pNameFull.includes('cable') || pNameFull.includes('wire') || pNameFull.includes('conductor') || pNameFull.includes('કેબલ') || pNameFull.includes('વાયર');

  if (isCablesWires) {
    return {
      categoryKey: 'cables_conductors',
      categoryLabel: 'Insulated Electrical Wires, Cables & Conductors (WCO HS 8544)',
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & BIS / CE / RoHS Reg:',
      sealSubtitle: 'BIS, CE & RoHS AUDITED CABLE QUALITY SEAL',
      signatoryTitle: 'Lead Cable QA & Dielectric Testing Specialist',
      storageTitle: '⚡ STORAGE & SPOOL HANDLING GUIDELINES:',
      storageText: 'Store cable reels in dry, covered warehouse on solid level surface. Keep reel flange supported and sealed with end caps to prevent moisture ingress into conductors. Avoid dragging across rough surfaces.',
      qualityTitle: '🛡️ ELECTRICAL CONDUCTOR SAFETY DECLARATION:',
      qualityText: 'Certified manufactured from 99.99% pure Electrolytic Tough Pitch (ETP) copper or EC grade aluminum. Conforms to IEC 60228, IS 694 / IS 1554, CE and RoHS 2.0. 100% spark-tested in production.',
      testParams: [
        { param: 'Conductor DC Resistance @ 20°C (કંડક્ટર રેઝિસ્ટન્સ)', standard: 'Conforms to IEC 60228 Class 2/5 Copper Standard', result: '100% High Conductivity Pass', method: 'Kelvin Double Bridge' },
        { param: 'Insulation & Sheath Tensile Strength (ખેંચાણ ક્ષમતા)', standard: 'Min 12.5 N/mm² Tensile, > 150% Elongation at Break', result: '15.2 N/mm² (High Elasticity)', method: 'Tensile Testing Machine (IEC 60811)' },
        { param: 'In-Line Spark & Dielectric Testing (સ્પાર્ક ટેસ્ટિંગ)', standard: '3.0 kV AC Continuous In-Line (Zero Pin-Holes)', result: 'PASSED (Zero Breakdown / Void-Free)', method: 'High Voltage Spark Rig' },
        { param: 'Flame Retardancy & Oxygen Index (અગ્નિ પ્રતિકારકતા)', standard: 'Limiting Oxygen Index (LOI) > 30%, Zero Toxic Halogens', result: 'LOI 33.5% (Self-Extinguishing FRLS)', method: 'Limiting Oxygen Chamber (IEC 60332)' },
        { param: 'RoHS 2.0 Lead-Free Environmental Directive', standard: '100% Lead-Free & Heavy Metal Free Insulation', result: 'RoHS 2.0 Compliant', method: 'X-ray Fluorescence Spectrometry' }
      ]
    };
  }

  // 9. GENERAL CHAPTER 85 / 84 ELECTRONICS & ELECTRICALS (Any other product under Chapter 85 or electrical 84)
  const isGeneralElectronics = hs2 === '85' || cat.includes('elect') || pId.includes('elect') || pNameFull.includes('electronic') || pNameFull.includes('electrical') || pNameFull.includes('ઈલેક્ટ્રોનિક') || pNameFull.includes('ઈલેક્ટ્રીકલ');

  if (isGeneralElectronics) {
    return {
      categoryKey: 'general_electronics',
      categoryLabel: 'Electrical & Electronic Machinery & Equipment (WCO HS Chapter 85)',
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & BIS / CE / RoHS Reg:',
      sealSubtitle: 'BIS, CE & RoHS AUDITED ELECTRICAL APPARATUS SEAL',
      signatoryTitle: 'Lead Electrical Quality Assurance Officer',
      storageTitle: '⚡ OPERATING ENVIRONMENT & STORAGE GUIDELINES:',
      storageText: 'Store in dry indoor warehouse. Recommended temperature: 0°C to 45°C; Relative humidity < 85% (non-condensing). Keep away from conductive liquids, corrosive vapors, and extreme thermal cycling.',
      qualityTitle: '🛡️ ELECTRICAL EQUIPMENT QUALITY & SAFETY DECLARATION:',
      qualityText: 'Certified 100% compliant with international electrical safety standards (IEC 60204-1 / IEC 62368-1), CE Low Voltage Directive, and RoHS 2.0 Directive. Pre-dispatch routine testing completed with zero defects.',
      testParams: [
        { param: 'Rated Supply Voltage & Frequency (વોલ્ટેજ અને આવર્તન)', standard: '110V - 240V AC / 415V AC ± 10%, 50/60 Hz', result: 'Stable & Nominal Operation (Pass)', method: 'Digital True-RMS Power Analyzer' },
        { param: 'Insulation Resistance - IR (ઇન્સ્યુલેશન સુરક્ષા)', standard: 'Min 50 MΩ @ 500V DC (High Isolation Standard)', result: '> 250 MΩ (High Isolation Pass)', method: 'Calibrated Megohmmeter' },
        { param: 'Dielectric High Voltage Withstand (Hi-Pot સહનશક્તિ)', standard: '1.5 kV AC for 60 seconds (Zero Flashover)', result: 'Passed (Leakage Current < 0.5 mA)', method: 'Dielectric Breakdown Test Rig' },
        { param: 'Full Load Operational Endurance (ફુલ લોડ પરફોર્મન્સ)', standard: '100% Pre-Tested Continuous Full-Load Duty Cycle', result: '100% Functional Reliability Pass', method: 'Automated Factory Functional Rig' },
        { param: 'Electromagnetic Compatibility - EMC (ઇએમસી નોઇઝ)', standard: 'EN 61000 Series / CE Certified (No Interference)', result: 'PASSED (Complies with CE-EMC)', method: 'Anechoic Radiation Chamber' },
        { param: 'RoHS 2.0 Environmental Safety Directive', standard: '100% Lead-Free & Heavy Metal Free Componentry', result: 'COMPLIES (RoHS Certified)', method: 'X-ray Fluorescence Spectrometry' }
      ]
    };
  }

  // 10. Rice, Cereals & Grains (HS 1006 / Chapter 10)
  const isRiceGrains = hs4 === '1006' || hs2 === '10' || cat.includes('rice') || cat.includes('grain') || pId.includes('basmati') || pNameFull.includes('rice') || pNameFull.includes('basmati') || pNameFull.includes('ચોખા');

  if (isRiceGrains) {
    return {
      categoryKey: 'rice_grains',
      categoryLabel: 'Milled & Basmati Rice, Cereals & Grains (WCO HS 1006)',
      isRice: true,
      licenseLabel: 'Export License / APEDA & FSSAI Reg:',
      sealSubtitle: 'APEDA, FSSAI & AGMARK CERTIFIED GRAIN SEAL',
      signatoryTitle: 'Chief QC Food Technologist & Grain Inspector',
      storageTitle: '🌿 STORAGE & PEST PREVENTION INSTRUCTIONS:',
      storageText: 'Store in cool, dry, well-ventilated grain silo or warehouse on elevated wooden pallets. Recommended temperature below 22°C with relative humidity below 60%. Free from weevils, pests, and foul odors.',
      qualityTitle: '🛡️ GRAIN QUALITY & PHYTOSANITARY DECLARATION:',
      qualityText: 'Certified 100% Sortex cleaned and free from live insects, stone contaminants, and heavy metal residues. Conforms to APEDA, Agmark Grade-1, and international phytosanitary export norms.',
      testParams: [
        { param: 'Average Grain Length - AGL (દાણાની લંબાઈ)', standard: 'Min 8.35 mm (Pre-cooked Extra Long Grain)', result: '8.42 mm (Extra Long Superior)', method: 'Digital Vernier Caliper' },
        { param: 'Moisture Content (ભેજનું પ્રમાણ)', standard: 'Max 12.0% w/w', result: '11.2% w/w (Safe Storage Moisture)', method: 'Air Oven Method (IS 4333)' },
        { param: 'Broken & Damaged Grains (તૂટેલા દાણા)', standard: 'Max 1.0% w/w', result: '0.4% w/w (Sortex Super Clean)', method: 'Electronic Length Grader' },
        { param: 'Foreign Matter & Paddy Grains (કચરો / ફોતરાં)', standard: 'Max 0.1% / NIL', result: 'NIL (100% Sortexed)', method: 'Gravity Table Inspection' },
        { param: 'Purity & Varietal Authenticity (શુદ્ધતા)', standard: 'Min 95.0% Basmati DNA Authenticity', result: '98.5% Pure Varietal', method: 'Polymerase Chain Reaction (PCR DNA)' },
        { param: 'Elongation Ratio - Post Cooking (ખીલવાની ક્ષમતા)', standard: 'Min 2.0x to 2.5x original length', result: '2.25x Elongation (Soft Fluffy Texture)', method: 'Standard Boiling Test' },
        { param: 'Chalky Grains (સફેદ કાચા દાણા)', standard: 'Max 2.0% w/w', result: '0.8% w/w', method: 'Translucent Light Board' }
      ]
    };
  }

  // 11. Agro Commodities, Spices & Seeds (Chapters 07, 08, 09, 12)
  const isAgroSpice = ['07', '08', '09', '12'].includes(hs2) || cat.includes('agro') || cat.includes('spice') || pId.includes('turmeric') || pId.includes('cumin') || pId.includes('pepper') || pId.includes('chilli') || pNameFull.includes('turmeric') || pNameFull.includes('cumin') || pNameFull.includes('chilli') || pNameFull.includes('હળદર') || pNameFull.includes('જીરુ') || pNameFull.includes('મસાલા');

  if (isAgroSpice) {
    return {
      categoryKey: 'agro_spices',
      categoryLabel: 'Spices, Seeds & Agricultural Commodities (WCO HS Chapter 09)',
      isAgroSpice: true,
      licenseLabel: 'Export License / APEDA & Spices Board Reg:',
      sealSubtitle: 'SPICES BOARD & APEDA AUDITED ORGANIC QUALITY SEAL',
      signatoryTitle: 'Chief Agro Quality Control Chemist',
      storageTitle: '🌿 STORAGE & PRESERVATION INSTRUCTIONS:',
      storageText: 'Store in a cool, dry, dark and well-ventilated warehouse away from direct sunlight, moisture, and volatile chemicals. Recommended storage temperature below 20°C with relative humidity below 60%.',
      qualityTitle: '🛡️ SPICES BOARD & FOOD SAFETY DECLARATION:',
      qualityText: 'Certified 100% pure, unadulterated, and free from Sudan dyes, artificial food colors, or unauthorized pesticide residues. Conforms to ASTA, ESA, and international food hygiene regulations.',
      testParams: [
        { param: 'Physical Appearance & Form (સ્વરૂપ અને રંગ)', standard: 'Homogeneous Fine Powder / Whole Natural Form', result: 'Complies (Vibrant Color & Aroma)', method: 'Visual / Organoleptic' },
        { param: 'Active Purity / Curcuminoids / Essential Oils (શુદ્ધતા)', standard: 'Min 3.0% - 5.0% w/w Active Compound', result: '3.85% (Certified Pure Extract)', method: 'HPLC / ASTA Standard' },
        { param: 'Moisture Content (ભેજનું પ્રમાણ)', standard: 'Max 10.0% w/w', result: '7.8% w/w (Dry Moisture Pass)', method: 'Vacuum Oven (AOAC 925.10)' },
        { param: 'Total Ash Content (રાખનું પ્રમાણ)', standard: 'Max 7.0% w/w', result: '5.2% w/w', method: 'Muffle Furnace @ 550°C' },
        { param: 'Acid Insoluble Ash (રેતી / માટીનું પ્રમાણ)', standard: 'Max 1.0% w/w', result: '0.38% w/w', method: 'Gravimetric (IS 1797)' },
        { param: 'Volatile Essential Oil Content (કુદરતી તેલ)', standard: 'Min 2.5% - 3.5% v/w', result: '3.1% v/w (Rich Aromatic Profile)', method: 'Steam Distillation (Clevenger)' },
        { param: 'Extraneous Foreign Matter (કચરો)', standard: 'Max 0.5% w/w', result: 'NIL (Sortex Cleaned)', method: 'Manual & Gravity Inspection' },
        { param: 'Aflatoxin Contaminant (B1+B2+G1+G2)', standard: 'Max 10.0 ppb (EU Regulation Complies)', result: '< 2.0 ppb (Safe Limits Pass)', method: 'LC-MS/MS' },
        { param: 'Microbiological Screening (Salmonella & E. Coli)', standard: 'Absent in 25 grams', result: 'NEGATIVE (100% Sterile & Safe)', method: 'Microbiological Culture' }
      ]
    };
  }

  // 12. Dairy Products (Chapter 04: Milk, Ghee, Butter, Cheese)
  const isDairy = hs2 === '04' || cat.includes('dairy') || cat.includes('milk') || pNameFull.includes('milk') || pNameFull.includes('ghee') || pNameFull.includes('butter') || pNameFull.includes('ડેરી') || pNameFull.includes('ઘી');

  if (isDairy) {
    return {
      categoryKey: 'dairy',
      categoryLabel: 'Dairy Products & Edible Milk Derivatives (WCO HS Chapter 04)',
      isDairy: true,
      licenseLabel: 'Export License / FSSAI & EIA Dairy Export Reg:',
      sealSubtitle: 'FSSAI & EXPORT INSPECTION AGENCY (EIA) DAIRY SEAL',
      signatoryTitle: 'Chief Dairy Quality Technologist',
      storageTitle: '🥛 COLD CHAIN & PRESERVATION INSTRUCTIONS:',
      storageText: 'Maintain strict cold chain storage below 4°C (or deep frozen below -18°C for butter/ice cream). For skimmed milk powder (SMP), store below 25°C in multi-wall hermetic bags with relative humidity < 65%.',
      qualityTitle: '🛡️ DAIRY COMPLIANCE & PURITY DECLARATION:',
      qualityText: 'Certified 100% manufactured from healthy bovine milk. Free from antibiotics, melamine, synthetic urea, neutralizers, and heavy metals. Conforms to Codex Alimentarius and FSSAI export standards.',
      testParams: [
        { param: 'Milk Protein in Solids-Not-Fat (પ્રોટીન પ્રમાણ)', standard: 'Min 34.0% w/w', result: '34.8% w/w (High Nutrition Grade)', method: 'Kjeldahl Nitrogen Method' },
        { param: 'Milk Fat Content (દૂધની ફેટ / ચરબી)', standard: 'Pure Dairy Fat Standard (100% Bovine Milk Fat)', result: 'Complies (Zero Vegetable Oil Adulteration)', method: 'Gerber / Rose-Gottlieb Method' },
        { param: 'Moisture Content (ભેજ)', standard: 'Max 4.0% w/w (for Powdered Derivatives)', result: '3.4% w/w', method: 'Karl Fischer Titration' },
        { param: 'Titratable Acidity (એસિડિટી)', standard: 'Max 0.15% (as Lactic Acid)', result: '0.12% w/w (Fresh Quality Pass)', method: 'Standard Alkaline Titration' },
        { param: 'Solubility Index (ઓગળવાની ક્ષમતા)', standard: 'Max 1.0 ml Sediment', result: '0.2 ml (Instant Dissolution)', method: 'ADPI Centrifuge Method' },
        { param: 'Total Plate Count - TPC (બેક્ટેરિયલ ગણતરી)', standard: 'Max 10,000 CFU / g', result: '< 1,200 CFU / g (Ultra-Hygienic Pass)', method: 'Standard Plate Count (SPC)' }
      ]
    };
  }

  // 13. Textiles, Garments & Fabrics (Chapters 50 to 63)
  const isTextile = (parseInt(hs2, 10) >= 50 && parseInt(hs2, 10) <= 63) || cat.includes('text') || cat.includes('garment') || cat.includes('fabric') || cat.includes('yarn') || pNameFull.includes('cotton') || pNameFull.includes('saree') || pNameFull.includes('t-shirt') || pNameFull.includes('કાપડ') || pNameFull.includes('સાડી') || pNameFull.includes('સુતર') || pNameFull.includes('ટેક્ષટાઈલ') || pNameFull.includes('ટેક્સટાઈલ') || pNameFull.includes('poly') || pNameFull.includes('jari');

  if (isTextile) {
    const isJariOrZari = pNameFull.includes('jari') || pNameFull.includes('zari') || pNameFull.includes('જરી') || pNameFull.includes('ઝરી') || pNameFull.includes('metallic');
    const isPolyester = pNameFull.includes('poly') || pNameFull.includes('polyester') || pNameFull.includes('પોલિએસ્ટર') || pNameFull.includes('પોલીએસ્ટર') || pNameFull.includes('સિન્થેટીક') || pNameFull.includes('synthetic') || pNameFull.includes('filament') || hs2 === '54' || hs2 === '55';
    const isSilk = pNameFull.includes('silk') || pNameFull.includes('સિલ્ક') || pNameFull.includes('રેશમ') || hs2 === '50';
    const isWool = pNameFull.includes('wool') || pNameFull.includes('woolen') || pNameFull.includes('વુલન') || pNameFull.includes('ઉન') || hs2 === '51';
    const isLinenOrJute = pNameFull.includes('linen') || pNameFull.includes('flax') || pNameFull.includes('jute') || pNameFull.includes('લીનન') || pNameFull.includes('શણ') || hs2 === '53';

    let fiberStandard = '100% Premium Combed Cotton / Certified Blend';
    let catTitle = 'Textiles, Garments & Woven Fabrics (WCO HS Section XI)';
    let careStorage = 'Store in clean, dry, dust-free warehouse on elevated pallets. Keep cartons sealed with polyethylene moisture barrier liners. Keep away from direct sunlight to prevent photochemical discoloration.';

    if (isJariOrZari && isPolyester) {
      fiberStandard = 'Premium Polyester Filament with Metallic Jari Yarn, Rated GSM ± 3%';
      catTitle = `Polyester Filament & Metallic Jari Jacquard Fabrics (WCO HS ${hsRaw || '540752'})`;
      careStorage = 'Store in a clean, dry, dust-free indoor warehouse elevated on wooden pallets. Cartons lined with polyethylene moisture-barrier film. Keep away from direct sunlight, damp walls, and heat sources to prevent metallic jari tarnishing and filament degradation.';
    } else if (isPolyester) {
      fiberStandard = '100% Micro-Polyester / Synthetic Filament Weave, Rated GSM ± 3%';
      catTitle = `Synthetic Filament & Polyester Fabrics (WCO HS Chapter ${hs2 || '54'})`;
    } else if (isSilk) {
      fiberStandard = '100% Pure Natural Mulberry Silk / Silk Blend, Rated GSM ± 3%';
      catTitle = 'Pure Natural Silk & Silk Blend Fabrics (WCO HS Chapter 50)';
    } else if (isWool) {
      fiberStandard = '100% Pure Wool / Blended Worsted Yarn, Rated GSM ± 3%';
      catTitle = 'Woolmark Certified Wool & Thermal Textiles (WCO HS Chapter 51)';
    } else if (isLinenOrJute) {
      fiberStandard = '100% Pure Flax Linen / Natural Jute Yarn, Rated GSM ± 3%';
      catTitle = 'Pure Flax Linen & Natural Fiber Textiles (WCO HS Chapter 53)';
    }

    return {
      categoryKey: 'textiles_garments',
      categoryLabel: catTitle,
      isTextile: true,
      licenseLabel: 'Export License / DGFT IEC & TEXPROCIL Reg:',
      sealSubtitle: 'OEKO-TEX & TEXPROCIL AUDITED TEXTILE SEAL',
      signatoryTitle: 'Lead Textile Chemist & Fabric QA Officer',
      storageTitle: '🧶 STORAGE & FABRIC CARE INSTRUCTIONS:',
      storageText: careStorage,
      qualityTitle: '🛡️ TEXTILE QUALITY & SAFETY DECLARATION:',
      qualityText: 'Certified 100% free from banned carcinogenic azo dyes, formaldehyde, and heavy metals. Conforms to OEKO-TEX Standard 100 and AATCC international washing and color-fastness standards.',
      testParams: [
        { param: 'Fiber Composition (ફાઈબર / સુતર બંધારણ)', standard: fiberStandard, result: '100% Certified Fiber Pass', method: 'Microscopic & Chemical Solvent Analysis' },
        { param: 'Fabric Weight - Grammage GSM (કાપડનું વજન)', standard: 'Rated GSM ± 3% (Uniform Density)', result: 'Complies (Tight Compact Weave)', method: 'GSM Circular Cutter (ASTM D3776)' },
        { param: 'Color Fastness to Washing & Light (કલર ફાસ્ટનેસ)', standard: 'Min Grade 4 - 5 (ISO 105-C06 Standard)', result: 'Grade 4.5 (Excellent No-Bleed Quality)', method: 'Launder-Ometer Washing Cycle' },
        { param: 'Dimensional Stability / Shrinkage (સંકોચન દર)', standard: 'Max ± 2.0% Length & Width Shrinkage', result: '- 1.1% (Pre-Shrunk Sanitized Pass)', method: 'AATCC 135 Standard Washing Test' },
        { param: 'Tensile & Tear Breaking Strength (મજબૂતી)', standard: 'Min 30 N (Warp & Weft Tensile Integrity)', result: '36 N / 34 N (High Durability)', method: 'Elmendorf Tear Strength Tester' }
      ]
    };
  }

  // 14. Packaging Materials (HS 3923, 4819, 6305)
  const isPackaging = hs4 === '3923' || hs4 === '4819' || hs6 === '630510' || hs4 === '6305' || cat.includes('pack') || pId.includes('pack') || pId.includes('bag') || pNameFull.includes('jute') || pNameFull.includes('packaging') || pNameFull.includes('કોથળા') || pNameFull.includes('પેકિંગ');

  if (isPackaging) {
    return {
      categoryKey: 'packaging',
      categoryLabel: 'Articles for Conveyance & Packaging of Goods (WCO HS 3923 / 6305)',
      isPackaging: true,
      licenseLabel: 'Export License / DGFT IEC & ISO 22000 Packaging Reg:',
      sealSubtitle: 'ISO 22000 & FDA COMPLIANT PACKAGING SEAL',
      signatoryTitle: 'Lead Packaging Materials Engineer',
      storageTitle: '📦 STORAGE & MOISTURE PROTECTION INSTRUCTIONS:',
      storageText: 'Store indoors on elevated pallets in dry, well-ventilated warehouse. Keep away from open flame, damp floors, and rodent-prone areas. Maintain relative humidity below 65%.',
      qualityTitle: '🛡️ FOOD-GRADE PACKAGING COMPLIANCE DECLARATION:',
      qualityText: 'Certified manufactured from 100% virgin food-grade polymer or natural hydrocarbon-free vegetable oils. Zero mineral oil hydrocarbons (MOSH/MOAH) or phthalates. Conforms to ISO 22000 and FDA packaging regulations.',
      testParams: [
        { param: 'Fabric / Material Composition (મટીરીયલ બંધારણ)', standard: '100% Eco-Friendly Jute / Virgin Food-Grade PP', result: '100% Virgin Compliant', method: 'Textile Fiber Identification' },
        { param: 'Fabric Weight / Grammage - GSM (કાપડ વજન)', standard: 'Rated GSM ± 5% (Heavy Duty Density)', result: 'Complies (Uniform Density)', method: 'GSM Circular Cutter (ASTM D3776)' },
        { param: 'Tensile Breaking Strength - Warp (ખેંચાણ ક્ષમતા)', standard: 'Min 1200 N / 50 mm Strip', result: '1360 N (High Tensile Break Pass)', method: 'Strip Tensile Test (IS 1969)' },
        { param: 'Tensile Breaking Strength - Weft (આડી મજબૂતી)', standard: 'Min 950 N / 50 mm Strip', result: '1090 N (Reinforced Weave)', method: 'Strip Tensile Test (IS 1969)' },
        { param: 'Seam & Stitching Bursting Strength (સિલિંગ ક્ષમતા)', standard: 'Min 450 N (Double Lock Chain Stitch)', result: '530 N (Zero Seam Slippage)', method: 'Seam Strength Tester' },
        { param: 'Food Grade & Hydrocarbon-Free Screening', standard: 'Zero Mineral Oil Hydrocarbon Residue (MOSH/MOAH NIL)', result: 'COMPLIES (Food Grade Oil Certified)', method: 'GC-FID Hydrocarbon Analysis' }
      ]
    };
  }

  // 15. Mechanical Engineering, Fasteners & Hardware (Chapters 72, 73, 82, mechanical 84)
  const isEngineering = ['72', '73', '82'].includes(hs2) || cat.includes('eng') || cat.includes('cnc') || cat.includes('machin') || cat.includes('industrial') || pId.includes('fastener') || pNameFull.includes('bolt') || pNameFull.includes('nut') || pNameFull.includes('screw') || pNameFull.includes('fastener') || pNameFull.includes('bearing') || pNameFull.includes('વાલ્વ') || pNameFull.includes('બોલ્ટ');

  if (isEngineering) {
    return {
      categoryKey: 'engineering_fasteners',
      categoryLabel: 'Precision Mechanical Components & Fasteners (WCO HS 7318 / Chapter 84)',
      isEngineering: true,
      licenseLabel: 'Export License / DGFT IEC & EEPC / ISO 9001 Reg:',
      sealSubtitle: 'ISO 9001 & EEPC AUDITED PRECISION ENGINEERING SEAL',
      signatoryTitle: 'Lead Metallurgical & Precision Inspection Officer',
      storageTitle: '⚙️ STORAGE, HANDLING & CORROSION PREVENTION:',
      storageText: 'Store in dry indoor warehouse wrapped in VCI anti-corrosion barrier film. Keep away from water splashing, corrosive acid mists, and extreme thermal cycling. Coated with export grade rust-preventive oil.',
      qualityTitle: '🛡️ METALLURGICAL & PRECISION DECLARATION:',
      qualityText: 'Certified 100% manufactured from genuine mill-certified alloys (EN 10204 3.1). Free from internal cracks, voids, or dimensional defects. Conforms to ISO 2768 international precision standards.',
      testParams: [
        { param: 'Material Chemical Composition (ધાતુ કેમિકલ એનાલિસિસ)', standard: 'AISI SS 304 / 316 / High-Tensile Alloy Grade', result: 'Complies (Spectro Certified Metallurgy)', method: 'Optical Emission Spectrometry (OES)' },
        { param: 'Dimensional Tolerance & Precision (માપ સાઇઝ એક્યુરેસી)', standard: '± 0.005 mm (High-Precision CNC Tolerance)', result: '± 0.003 mm (CMM Probe Verified)', method: '3D Coordinate Measuring Machine (CMM)' },
        { param: 'Surface Roughness - Ra (સપાટી સ્મૂધનેસ)', standard: 'Ra 0.4 µm - 0.8 µm (Micro-Polished Finish)', result: 'Ra 0.48 µm (Mirror Finish Pass)', method: 'Mitutoyo Surface Profilometer' },
        { param: 'Material Hardness - HRC (સખ્તાઈ / હાર્ડનેસ)', standard: '45 - 52 HRC (Through-Hardened)', result: '48.5 HRC (Uniform Hardness)', method: 'Rockwell Hardness Tester (ASTM E18)' },
        { param: 'Tensile & Proof Load Yield Strength (ખેંચાણ ક્ષમતા)', standard: 'Min 520 MPa Tensile Strength', result: '585 MPa (High Tensile Yield Pass)', method: 'Universal Tensile Testing Machine (UTM)' },
        { param: 'Non-Destructive Testing - NDT (તિરાડ ચકાસણી)', standard: '100% Defect-Free Surface & Sub-Surface', result: 'Zero Cracks / Porosity Detected', method: 'Dye Penetrant (DPI) & Magnetic Particle' }
      ]
    };
  }

  // 16. Default Fallback (General Merchandise Commodities)
  return {
    categoryKey: 'general',
    categoryLabel: `General Export Quality Standard (WCO HS ${hsRaw || 'General'})`,
    isElectricalElectronic: false,
    licenseLabel: 'Export License / DGFT IEC & Quality Control Reg:',
    sealSubtitle: 'AUDITED GLOBAL EXPORT QUALITY CONTROL SEAL',
    signatoryTitle: 'Chief Quality Compliance Officer',
    storageTitle: '📦 STORAGE & PRESERVATION INSTRUCTIONS:',
    storageText: 'Store in a cool, dry, well-ventilated area away from direct sunlight, moisture, and extreme ambient temperature fluctuations. Keep original export packaging intact.',
    qualityTitle: '🛡️ OFFICIAL QUALITY & EXPORT DECLARATION:',
    qualityText: 'Certified 100% compliant with international export quality standards. Pre-dispatch inspection completed with zero manufacturing defects. Certified fit for international trade shipment.',
    testParams: [
      { param: 'Physical Appearance & Form (બાહ્ય દેખાવ અને પેકિંગ)', standard: 'Uniform Premium Grade Export Standard', result: 'Complies 100% (First Class Finish)', method: 'Visual & Sensory Inspection' },
      { param: 'Weight & Dimension Uniformity (ચોક્કસ વજન / માપ)', standard: 'Conforms strictly to Export Order Specification', result: 'Within Certified ± 0.5% Limits', method: 'Precision Calibrated Measurement' },
      { param: 'Purity & Grade Index (શુદ્ધતા / ગ્રેડ નિર્ધારણ)', standard: 'Grade-1 Export Quality Standard', result: '99.5% Quality Index Certified', method: 'Standard Analytical Method' },
      { param: 'Contaminant & Hazardous Screening (સલામતી ચકાસણી)', standard: 'Zero Hazardous Residue (Safety Complies)', result: 'PASSED (Non-Detect Safe Limits)', method: 'Multi-Residue Laboratory Screening' }
    ]
  };
};

/**
 * Standard OEM Preset Engine: Dynamic Category & HS Code-Specific OEM Generator
 * (Provides tailored OEM conformity parameters, regulatory standards, storage norms,
 * and test methods for Dairy/Amul, Rice, Spices, Fasteners, Industrial Machinery,
 * Agri Machinery, Food Processing Machinery, Used Machinery, and Electronics/IT)
 */
export const getOemStandardPreset = (productOrHs) => {
  const p = typeof productOrHs === 'object' && productOrHs !== null ? productOrHs : { hsCode: String(productOrHs || '') };
  const hsRaw = String(p.hsCode || p.localHsn || '').trim();
  const hs = cleanHsDigits(hsRaw);
  const hs2 = hs.slice(0, 2);
  const hs4 = hs.slice(0, 4);
  const hs6 = hs.slice(0, 6);

  const prodNameEn = (typeof p.names === 'object' ? p.names.en : p.name) || p.title || '';
  const prodNameGu = (typeof p.names === 'object' ? p.names.gu : '') || '';
  const cat = (p.category || '').toLowerCase();
  const pId = (p.id || '').toLowerCase();
  const pDescEn = (typeof p.description === 'object' ? p.description.en : p.description) || '';
  const pDescGu = (typeof p.description === 'object' ? p.description.gu : '') || '';
  const pSpecStr = typeof p.spec === 'object' ? Object.values(p.spec).join(' ') : (p.spec || '');
  const pNameFull = [
    prodNameEn,
    prodNameGu,
    p.title || '',
    pDescEn,
    pDescGu,
    pSpecStr,
    cat,
    p.subCategory || ''
  ].join(' ').toLowerCase();

  // 1. Dairy, Milk & Desi Ghee (Amul / GCMMF / Dairy Products - HS 0405, 0401, 0402, etc.)
  const isDairy = hs2 === '04' || cat.includes('dairy') || cat.includes('milk') || pNameFull.includes('ghee') || pNameFull.includes('ghi') || pNameFull.includes('amul') || pNameFull.includes('butter') || pNameFull.includes('milk') || pNameFull.includes('ઘી') || pNameFull.includes('ડેરી');
  if (isDairy) {
    return {
      categoryKey: 'oem_dairy',
      categoryLabel: `Authentic Dairy OEM & AGMARK Special Grade Standard (WCO HS ${hsRaw || '0405.90'})`,
      isDairy: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / FSSAI & AGMARK / APEDA Reg:',
      sealSubtitle: 'AGMARK SPECIAL GRADE, FSSAI & OEM VERIFIED DAIRY SEAL',
      signatoryTitle: 'Lead Dairy Food Safety & Quality Compliance Officer',
      storageTitle: '🥛 STORAGE & PRESERVATION GUIDELINES:',
      storageText: 'Store in a cool, dry, and hygienic environment away from direct sunlight, ambient heat, and external moisture. Keep factory hermetic container sealed until consumption. No refrigeration required for pure clarified butter (Ghee).',
      qualityTitle: '🛡️ OEM QUALITY & FOOD SAFETY DECLARATION:',
      qualityText: 'Certified that the supplied products conform strictly to original manufacturer (Amul / Dairy OEM) specifications, FSSAI Food Safety regulations, AGMARK Special Grade, and Codex Alimentarius. Pre-dispatch physical and organoleptic inspection completed with zero adulteration. Original manufacturer batch test certificates and regulatory dossiers are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.',
      testParams: [
        {
          param: 'Milk Fat Purity & Moisture Limit (દૂધની શુદ્ધ ચરબી અને ભેજ નિયંત્રણ)',
          standard: 'Min 99.7% Pure Bovine Milk Fat, Moisture Max 0.3% w/w',
          result: 'Pass (Verified as per Dairy OEM / AGMARK Specs)',
          method: 'AGMARK / FSSAI Gerber & Rose-Gottlieb Standards'
        },
        {
          param: 'Adulteration & Food Safety Screening (મિલાવટ મુક્તિ અને ખાદ્ય સુરક્ષા)',
          standard: 'RM Value > 28, Free from foreign vegetable fats, BVO, mineral oil NIL',
          result: 'Complies 100% (Pure Ghee Index Certified)',
          method: 'Baudouin & Halphen Chemical Assay (Codex Standards)'
        },
        {
          param: 'Food-Grade Tamper-Evident Packaging (ફૂડ ગ્રેડ સીલબંધ પેકેજિંગ)',
          standard: 'Original Factory Hermetically Sealed Food-Grade Tin / Jar Pack',
          result: '100% Inspected & Approved',
          method: 'Sensory & Hermetic Seal Integrity Verification'
        }
      ]
    };
  }

  // 2. Basmati Rice, Cereals & Grains (HS 1006 / Chapter 10 / Rice, Basmati, Grain, ચોખા)
  const isRiceGrains = hs4 === '1006' || hs2 === '10' || cat.includes('rice') || cat.includes('grain') || pNameFull.includes('rice') || pNameFull.includes('basmati') || pNameFull.includes('ચોખા') || pNameFull.includes('બાસમતી');
  if (isRiceGrains) {
    return {
      categoryKey: 'oem_rice_grains',
      categoryLabel: `Authentic OEM Milled & Basmati Rice Standard (WCO HS ${hsRaw || '1006.30'})`,
      isRice: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / APEDA & FSSAI Reg:',
      sealSubtitle: 'APEDA, FSSAI & AGMARK CERTIFIED OEM GRAIN SEAL',
      signatoryTitle: 'Chief Grain Technologist & Export Quality Officer',
      storageTitle: '🌿 STORAGE & PEST PREVENTION INSTRUCTIONS:',
      storageText: 'Store in cool, dry, well-ventilated grain silo or warehouse on elevated wooden pallets away from moisture, pests, and volatile odors. Ambient temperature below 24°C with relative humidity below 60%.',
      qualityTitle: '🛡️ OEM GRAIN SPECIFICATION & PHYTOSANITARY DECLARATION:',
      qualityText: 'Certified that the supplied rice/grains conform strictly to original OEM / Mill technical specifications, APEDA export standards, and AGMARK Grade-1 norms. 100% Sortex cleaned. Original mill batch inspection reports and phytosanitary certificates are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.',
      testParams: [
        {
          param: 'Average Grain Length & Sortex Purity (દાણાની લંબાઈ અને સોર્ટેક્સ શુદ્ધતા)',
          standard: 'Min 8.35 mm+ Extra Long Grain, Broken Grains < 1.0% w/w',
          result: 'Pass (Verified as per OEM Mill Specifications)',
          method: 'Digital Vernier Caliper & Optical Sortex Inspection'
        },
        {
          param: 'Moisture & Safe Preservation Index (ભેજનું પ્રમાણ અને સલામતી)',
          standard: 'Max 11.5% - 12.0% w/w Safe Storage Limit',
          result: 'Complies (Moisture Controlled & Dry Certified)',
          method: 'Air-Oven Dehydration Method (IS 4333)'
        },
        {
          param: 'Authenticity & Foreign Contaminant Screening (શુદ્ધતા અને સ્વચ્છતા)',
          standard: 'Min 95.0% Varietal Purity, Live Weevils / Stone Contaminants NIL',
          result: '100% Inspected & Approved',
          method: 'PCR DNA Varietal Assay & Gravity Table Screening'
        }
      ]
    };
  }

  // 3. Agro Spices, Seeds & Herbs (Chapters 07, 08, 09, 12 / Spices, Cumin, Turmeric, મસાલા, જીરું)
  const isAgroSpice = ['07', '08', '09', '12'].includes(hs2) || cat.includes('agro') || cat.includes('spice') || pNameFull.includes('turmeric') || pNameFull.includes('cumin') || pNameFull.includes('spice') || pNameFull.includes('pepper') || pNameFull.includes('chilli') || pNameFull.includes('હળદર') || pNameFull.includes('જીરુ') || pNameFull.includes('મસાલા');
  if (isAgroSpice) {
    return {
      categoryKey: 'oem_spices',
      categoryLabel: `Authentic OEM Pure Spices & Agro Commodities (WCO HS Chapter ${hs2 || '09'})`,
      isAgroSpice: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / Spices Board & APEDA Reg:',
      sealSubtitle: 'SPICES BOARD & APEDA CERTIFIED OEM AGRO SEAL',
      signatoryTitle: 'Chief Agro Food Safety & Quality Assurance Chemist',
      storageTitle: '🌿 STORAGE & AROMATIC PRESERVATION INSTRUCTIONS:',
      storageText: 'Store in a cool, dry, and dark warehouse below 20°C with relative humidity below 60%. Keep in original moisture-barrier bags away from volatile odor sources and moisture.',
      qualityTitle: '🛡️ SPICES BOARD & OEM QUALITY CONFORMITY DECLARATION:',
      qualityText: 'Certified that the supplied spices/seeds conform strictly to original manufacturer/processor specifications, ASTA, ESA, and Spices Board of India standards. Free from artificial dyes (Sudan Red NIL). Original manufacturer batch test certificates and regulatory dossiers are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.',
      testParams: [
        {
          param: 'Active Botanical Purity & Essential Oils (શુદ્ધતા અને કુદરતી સુગંધિત તેલ)',
          standard: 'Pure Natural Cultivar Standard, Min Active Volatile Oils Guaranteed',
          result: 'Pass (Verified as per OEM Processor Datasheet)',
          method: 'Steam Distillation & ASTA Extraction Methods'
        },
        {
          param: 'Foreign Matter & Heavy Metal Screening (કચરો અને કેમિકલ મુક્તિ)',
          standard: 'Extraneous Matter < 0.5% / NIL, Heavy Metals within Safe Limits',
          result: 'Complies (Sortex Cleaned & Lab Certified)',
          method: 'Multi-Residue HPLC / LC-MS Screening'
        },
        {
          param: 'Airtight Food-Grade Export Packaging (ફૂડ ગ્રેડ સીલબંધ પેકેજિંગ)',
          standard: 'Moisture-Proof Multi-Layer Food-Grade Export Bags',
          result: '100% Inspected & Approved',
          method: 'Hermetic Seal & Sensory Verification'
        }
      ]
    };
  }

  // 4. Readymade Garments & Apparels (Chapters 61 & 62 / Readymade Garments, T-Shirts, Shirts, Denim, Kurti, Dress, રેડિમેડ ગારમેન્ટ, તૈયાર કપડાં)
  const isGarment = hs2 === '61' || hs2 === '62' || cat.includes('garment') || cat.includes('apparel') || cat.includes('clothing') || pNameFull.includes('garment') || pNameFull.includes('apparel') || pNameFull.includes('readymade') || pNameFull.includes('ready-made') || pNameFull.includes('t-shirt') || pNameFull.includes('tshirt') || pNameFull.includes('shirt') || pNameFull.includes('jeans') || pNameFull.includes('denim') || pNameFull.includes('kurti') || pNameFull.includes('dress') || pNameFull.includes('trouser') || pNameFull.includes('jacket') || pNameFull.includes('sweater') || pNameFull.includes('રેડિમેડ') || pNameFull.includes('રેડીમેડ') || pNameFull.includes('ગારમેન્ટ') || pNameFull.includes('તૈયાર કપડા') || pNameFull.includes('ટી-શર્ટ') || pNameFull.includes('કુર્તી');
  if (isGarment) {
    // Dynamic fabric identification (Cotton, Polyester, Linen, Woolen, Silk, Rayon, Denim, Blends)
    let fabricLabel = '100% Combed Cotton / Bio-Washed Ring Spun Yarn';
    let fabricNameGu = 'પ્રીમિયમ કોટન (સુતરાઉ કાપડ)';
    let fabricMethod = 'Microscopic Fiber Analysis (AATCC 20A)';
    let garmentSeal = 'AEPC & OEKO-TEX 100 AUDITED GARMENT QUALITY SEAL';

    if (pNameFull.includes('linen') || pNameFull.includes('લીનન') || pNameFull.includes('શણ')) {
      fabricLabel = '100% Pure Flax Linen / Linen Blend (Breathable Natural Weave)';
      fabricNameGu = '૧૦૦% શુદ્ધ લીનન (નેચરલ ફ્લેક્સ શણ)';
      fabricMethod = 'Flax Fiber Microscopic Cross-Section (ASTM D276)';
    } else if (pNameFull.includes('wool') || pNameFull.includes('woolen') || pNameFull.includes('merino') || pNameFull.includes('cashmere') || pNameFull.includes('pashmina') || pNameFull.includes('વુલન') || pNameFull.includes('ઉન') || pNameFull.includes('ગરમ') || pNameFull.includes('સ્વેટર')) {
      fabricLabel = '100% Pure Merino Wool / Woolmark Certified Thermal Knit';
      fabricNameGu = 'શુદ્ધ વુલન / મેરીનો ઉન (થર્મલ વોર્મ ફેબ્રિક)';
      fabricMethod = 'Woolmark Fiber Diameter & Clean Spec Assay';
      garmentSeal = 'WOOLMARK & AEPC CERTIFIED THERMAL APPAREL SEAL';
    } else if (pNameFull.includes('poly') || pNameFull.includes('polyester') || pNameFull.includes('nylon') || pNameFull.includes('microfiber') || pNameFull.includes('spandex') || pNameFull.includes('lycra') || pNameFull.includes('dri-fit') || pNameFull.includes('પોલિએસ્ટર') || pNameFull.includes('સિન્થેટીક')) {
      fabricLabel = '100% Micro-Polyester / Poly-Spandex Quick-Dry Performance Knit';
      fabricNameGu = 'હાઇ-પરફોર્મન્સ પોલિએસ્ટર / ડ્રાય-ફિટ સિન્થેટિક ફેબ્રિક';
      fabricMethod = 'Solvent Separation & Thermal DSC Analysis (ISO 1833)';
    } else if (pNameFull.includes('silk') || pNameFull.includes('rayon') || pNameFull.includes('viscose') || pNameFull.includes('modal') || pNameFull.includes('સિલ્ક') || pNameFull.includes('રેયોન') || pNameFull.includes('મોડલ')) {
      fabricLabel = '100% Premium Viscose Rayon / Mulberry Silk Blend (Soft Drape Luster)';
      fabricNameGu = 'પ્રીમિયમ વિસ્કોસ રેયોન / સિલ્ક લસ્ટર ફેબ્રિક';
      fabricMethod = 'Viscose Dissolution & Fiber Cross-Section (IS 667)';
    } else if (pNameFull.includes('denim') || pNameFull.includes('jeans') || pNameFull.includes('ડેનિમ') || pNameFull.includes('જીન્સ')) {
      fabricLabel = '100% Ring-Spun Cotton Heavy Indigo Denim (11 to 14.5 Oz)';
      fabricNameGu = 'હેવી ઈન્ડિગો ડેનિમ કોટન ફેબ્રિક';
      fabricMethod = 'Denim Oz Weight & Indigo Color Assay (ASTM D3776)';
    } else if (pNameFull.includes('blend') || pNameFull.includes('pc') || pNameFull.includes('cvc') || pNameFull.includes('poly cotton') || pNameFull.includes('મિશ્ર')) {
      fabricLabel = '65/35 or 60/40 Poly-Cotton (PC / CVC) Intimate Yarn Blend';
      fabricNameGu = 'પોલી-કોટન (PC / CVC) મિશ્રિત કાપડ';
      fabricMethod = 'Quantitative Chemical Fiber Blend Analysis (ISO 1833)';
    }

    return {
      categoryKey: 'oem_garments',
      categoryLabel: `Authentic OEM Readymade Garments & Apparels (${fabricNameGu} - WCO HS 61 & 62)`,
      isGarment: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / DGFT IEC & AEPC / OEKO-TEX Reg:',
      sealSubtitle: garmentSeal,
      signatoryTitle: 'Lead Apparel QA & Merchandising Compliance Officer',
      storageTitle: '👗 APPAREL STORAGE, CARTON & HANGER GUIDELINES:',
      storageText: 'Store in a clean, dry, climate-controlled, dust-free warehouse on solid elevated pallets. Garments individually packed in polybags with silica gel desiccant. Cartons stacked upright away from damp floors and direct sunlight.',
      qualityTitle: '🛡️ OEM READYMADE GARMENT & SAFETY DECLARATION:',
      qualityText: `Certified that the supplied readymade garments (${fabricNameGu}) conform strictly to original OEM tech-packs, international size-spec charts, OEKO-TEX Standard 100, and AEPC export standards. 100% metal/needle-detector scanned with zero broken needles. Free from hazardous azo dyes and nickel-releasing accessories. Original manufacturer batch inspection reports and AQL 2.5 final audit sheets are maintained on record and may be obtained directly from the OEM upon buyer's formal request.`,
      testParams: [
        {
          param: `Fabric & Fiber Composition (કાપડનો પ્રકાર - ${fabricNameGu})`,
          standard: fabricLabel,
          result: 'Pass (Verified as per Fabric OEM Mill Tech-Pack)',
          method: fabricMethod
        },
        {
          param: 'Stitching Quality & Seam Strength (સીવણ ગુણવત્તા અને સીમ મજબૂતી - SPI)',
          standard: 'SPI 10 - 12 (Stitches Per Inch), Double-Needle Seams, Zero Loose Threads',
          result: 'Pass (AQL 1.5 High-End Workmanship Verified)',
          method: 'Visual SPI Gauge & Dynamic Seam Tensile Rig (ASTM D1683)'
        },
        {
          param: 'Size Specification & Measurement Tolerance (માપ સાઇઝ અને ફિટિંગ એક્યુરેસી)',
          standard: 'Strictly within ± 0.5 cm of Buyer Tech-Pack Size Chart (S to XXL)',
          result: '100% Dimensionally Accurate Pass',
          method: 'Calibrated Flexible Steel Tape & Dummy Fitting Form'
        },
        {
          param: 'Broken Needle Detection & Eco-Safety (તૂટેલી સોય મુક્તિ અને એકો સેફ્ટી)',
          standard: '100% Needle Detector Pass (Ferrous Ball < 1.0mm), Zero Azo Dyes',
          result: '100% Inspected & Approved',
          method: 'Locking Conveyor Metal Detector & Chemical Extraction (OEKO-TEX)'
        }
      ]
    };
  }

  // 5. Textiles, Fabrics & Yarns (Chapters 50 to 60 / Cotton, Fabric, Saree, Yarn, કાપડ, સુતર, ટેક્ષટાઈલ)
  const isTextile = (parseInt(hs2, 10) >= 50 && parseInt(hs2, 10) <= 60) || cat.includes('text') || cat.includes('fabric') || cat.includes('yarn') || pNameFull.includes('cotton') || pNameFull.includes('fabric') || pNameFull.includes('textile') || pNameFull.includes('saree') || pNameFull.includes('yarn') || pNameFull.includes('cloth') || pNameFull.includes('કાપડ') || pNameFull.includes('સુતર') || pNameFull.includes('સાડી') || pNameFull.includes('ટેક્ષટાઈલ') || pNameFull.includes('ટેક્સટાઈલ') || pNameFull.includes('poly') || pNameFull.includes('jari');
  if (isTextile) {
    const isJariOrZari = pNameFull.includes('jari') || pNameFull.includes('zari') || pNameFull.includes('જરી') || pNameFull.includes('ઝરી') || pNameFull.includes('metallic');
    const isPolyester = pNameFull.includes('poly') || pNameFull.includes('polyester') || pNameFull.includes('પોલિએસ્ટર') || pNameFull.includes('પોલીએસ્ટર') || pNameFull.includes('સિન્થેટીક') || pNameFull.includes('synthetic') || pNameFull.includes('filament') || hs2 === '54' || hs2 === '55';
    const isSilk = pNameFull.includes('silk') || pNameFull.includes('સિલ્ક') || pNameFull.includes('રેશમ') || hs2 === '50';
    const isWool = pNameFull.includes('wool') || pNameFull.includes('woolen') || pNameFull.includes('વુલન') || pNameFull.includes('ઉન') || hs2 === '51';
    const isLinenOrJute = pNameFull.includes('linen') || pNameFull.includes('flax') || pNameFull.includes('jute') || pNameFull.includes('લીનન') || pNameFull.includes('શણ') || hs2 === '53';
    const isJacquard = pNameFull.includes('jacquard') || pNameFull.includes('જાકાર્ડ');

    let fiberStandard = '100% Combed Cotton / Certified Blend, Rated GSM ± 3%';
    let fiberResult = 'Pass (Verified as per Textile OEM Datasheet)';
    let fiberMethod = 'Microscopic Identification & GSM Circular Cutter (ASTM D3776)';
    let catLabel = `Authentic OEM Textiles, Fabrics & Garments (WCO HS Chapter ${hs2 || '52'})`;
    let careStorage = 'Store in a clean, dry, dust-free indoor warehouse elevated on wooden pallets. Cartons lined with polyethylene moisture-barrier film. Keep away from direct sunlight, damp walls, and heat sources to prevent discoloration and fiber degradation.';
    let compDecl = 'Certified that the supplied textile products conform strictly to original manufacturer technical specifications, OEKO-TEX Standard 100, and AATCC/ISO international washing and colorfastness norms. 100% free from carcinogenic azo dyes, formaldehyde, and banned heavy metals. Original manufacturer batch test certificates and fabric inspection dossiers are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.';

    if (isJariOrZari && isPolyester) {
      fiberStandard = 'Premium Polyester Filament with Metallic Jari Yarn, Rated GSM ± 3%';
      fiberResult = 'Pass (Verified as per Polyester & Metallic Jari OEM Specs)';
      fiberMethod = 'Microscopic Identification & GSM Circular Cutter (ASTM D3776)';
      catLabel = `Authentic OEM Polyester Filament & Metallic Jari Jacquard Fabrics (WCO HS ${hsRaw || '540752'})`;
      careStorage = 'Store in a clean, dry, dust-free indoor warehouse elevated on wooden pallets. Cartons lined with polyethylene moisture-barrier film. Keep away from direct sunlight, damp walls, and heat sources to prevent metallic jari tarnishing and filament degradation.';
      compDecl = 'Certified that the supplied polyester filament and metallic jari fabrics conform strictly to original OEM technical specifications, OEKO-TEX Standard 100, and AATCC/ISO international washing and colorfastness norms. 100% free from carcinogenic azo dyes and banned heavy metals. Original manufacturer batch test certificates and fabric inspection dossiers are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.';
    } else if (isPolyester) {
      fiberStandard = '100% Micro-Polyester / Synthetic Filament Weave, Rated GSM ± 3%';
      fiberResult = 'Pass (Verified as per Synthetic Filament OEM Specs)';
      fiberMethod = 'Thermal DSC Analysis & GSM Circular Cutter (ASTM D3776)';
      catLabel = `Authentic OEM Synthetic Filament & Polyester Woven Fabrics (WCO HS Chapter ${hs2 || '54'})`;
      careStorage = 'Store in a clean, dry, dust-free indoor warehouse elevated on wooden pallets. Keep away from excessive heat and direct sunlight.';
      compDecl = 'Certified that the supplied polyester/synthetic fabrics conform strictly to OEKO-TEX Standard 100 and ISO textile testing protocols. 100% free from banned azo dyes and toxic substances.';
    } else if (isSilk) {
      fiberStandard = '100% Pure Natural Mulberry Silk / Silk Blend, Rated GSM ± 3%';
      fiberResult = 'Pass (Grade 5A Mulberry Silk Verified)';
      fiberMethod = 'Silk Dissolution & Fiber Cross-Section Assay (IS 667)';
      catLabel = `Authentic OEM Pure Silk & Silk Blend Textiles (WCO HS Chapter 50)`;
    } else if (isWool) {
      fiberStandard = '100% Pure Wool / Blended Worsted Yarn, Rated GSM ± 3%';
      fiberResult = 'Pass (Woolmark Tested Pure Animal Fiber)';
      fiberMethod = 'Woolmark Fiber Diameter & Clean Spec Assay';
      catLabel = `Authentic OEM Wool & Animal Hair Textiles (WCO HS Chapter 51)`;
    } else if (isLinenOrJute) {
      fiberStandard = '100% Pure Flax Linen / Natural Jute Yarn, Rated GSM ± 3%';
      fiberResult = 'Pass (Natural Long-Staple Flax Verified)';
      fiberMethod = 'Flax Fiber Microscopic Cross-Section (ASTM D276)';
      catLabel = `Authentic OEM Vegetable Fiber & Linen Textiles (WCO HS Chapter 53)`;
    } else if (isJacquard) {
      fiberStandard = 'Premium Jacquard Weave Fabric / Certified Blend, Rated GSM ± 3%';
      catLabel = `Authentic OEM Designer Jacquard Weave Fabrics (WCO HS ${hsRaw || '5407'})`;
    }

    return {
      categoryKey: 'oem_textiles',
      categoryLabel: catLabel,
      isTextile: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / DGFT IEC & TEXPROCIL / OEKO-TEX Reg:',
      sealSubtitle: 'OEKO-TEX & TEXPROCIL AUDITED TEXTILE QUALITY SEAL',
      signatoryTitle: 'Lead Textile QA Engineer & Fabric Technologist',
      storageTitle: '🧶 STORAGE & FABRIC CARE INSTRUCTIONS:',
      storageText: careStorage,
      qualityTitle: '🛡️ OEM TEXTILE SPECIFICATION & COMPLIANCE DECLARATION:',
      qualityText: compDecl,
      testParams: [
        {
          param: 'Fiber Composition & Grammage - GSM (ફાઈબર બંધારણ અને કાપડનું વજન)',
          standard: fiberStandard,
          result: fiberResult,
          method: fiberMethod
        },
        {
          param: 'Color Fastness & Washing Resistance (કલર ફાસ્ટનેસ અને બ્લીડિંગ મુક્તિ)',
          standard: 'Min Grade 4 - 5 to Washing, Rubbing & Light (ISO 105-C06)',
          result: 'Grade 4.5 (Superior Non-Bleed Quality)',
          method: 'Launder-Ometer Washing Cycle & Grey Scale Rating'
        },
        {
          param: 'Azo-Free Safety & Shrinkage Stability (સલામતી અને સંકોચન સ્થિરતા)',
          standard: 'Zero Banned Azo Dyes (OEKO-TEX Compliant), Shrinkage < ± 2%',
          result: '100% Inspected & Approved',
          method: 'GC-MS Chemical Extraction & AATCC 135 Wash Test'
        }
      ]
    };
  }

  // 5. Used & Refurbished Machinery (Second Hand, Refurbished, Old Machines, જુની મશીનરી)
  const isUsedMachinery = pNameFull.includes('used') || pNameFull.includes('old') || pNameFull.includes('refurbish') || pNameFull.includes('second hand') || pNameFull.includes('second-hand') || pNameFull.includes('જુની') || pNameFull.includes('જૂની') || pNameFull.includes('સેકન્ડ હેન્ડ');
  if (isUsedMachinery) {
    return {
      categoryKey: 'oem_used_machinery',
      categoryLabel: `Chartered Engineer Audited Used & Refurbished Machinery (WCO HS ${hsRaw || '84'})`,
      isMachinery: true,
      isUsedMachinery: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / DGFT IEC & Chartered Engineer Reg:',
      sealSubtitle: 'CHARTERED ENGINEER CERTIFIED (CEC) MACHINERY SEAL',
      signatoryTitle: 'Certified Chartered Engineer (Govt. Approved Inspector)',
      storageTitle: '⚙️ STORAGE & REFURBISHED ASSET PRESERVATION:',
      storageText: 'Store in covered indoor warehouse. All critical mechanical guideways, spindles, and bearings coated with heavy rust inhibitor. Control panels sealed with desiccant moisture absorbers.',
      qualityTitle: '🛡️ REFURBISHED MACHINERY & RESIDUAL LIFE DECLARATION:',
      qualityText: 'Certified that the supplied used/refurbished machinery has undergone comprehensive physical inspection, mechanical overhaul, and electrical load testing. Residual operational life assessed at minimum 8 to 12 years with zero critical structural damage. Original Chartered Engineer Certificate (CEC) and refurbishing inspection dossiers are maintained on record and may be obtained directly from the OEM/Certifying Authority upon buyer\'s formal request.',
      testParams: [
        {
          param: 'Mechanical Overhaul & Working Alignment (ઓવરહોલ અને એલાઈનમેન્ટ)',
          standard: 'Refurbished to OEM Functional Tolerances, Spindle Runout < 0.02 mm',
          result: 'Pass (Complete Factory Overhaul Verified)',
          method: 'Dial Gauge Indicator & Precision Dynamic Balancing'
        },
        {
          param: 'Electrical Motor & Control Panel Diagnostics (ઇલેક્ટ્રિકલ ટેસ્ટિંગ)',
          standard: 'Insulation Resistance > 20 MΩ @ 500V DC, All Interlocks Functional',
          result: 'Complies (Rewound / Tested 100% Operable)',
          method: 'Megger High-Voltage & Dynamic Load Testing Rig'
        },
        {
          param: 'Chartered Engineer Residual Life Assessment (CEC સર્ટિફિકેટ)',
          standard: 'Minimum 8 - 12 Years Expected Remaining Operational Life',
          result: '100% Certified & Approved',
          method: 'Chartered Engineer Pre-Shipment Inspection (PSI)'
        }
      ]
    };
  }

  // 5. Food Product Machinery & Processing Equipment (Bakery, Grinder, Packaging Machines, HS 8438, 8422, ફૂડ મશીનરી)
  const isFoodMachinery = hs4 === '8438' || hs4 === '8422' || pNameFull.includes('food machine') || pNameFull.includes('food processing') || pNameFull.includes('bakery') || pNameFull.includes('grinder') || pNameFull.includes('mill') || pNameFull.includes('ફૂડ મશીનરી') || pNameFull.includes('ફૂડ પ્રોડક્ટ મશીનરી');
  if (isFoodMachinery) {
    return {
      categoryKey: 'oem_food_machinery',
      categoryLabel: `Food Contact Compliant OEM Processing Machinery (WCO HS ${hsRaw || '8438'})`,
      isMachinery: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / DGFT IEC & Food Contact Materials (FCM) Reg:',
      sealSubtitle: 'SS304/SS316 FOOD CONTACT HYGIENIC AUDITED SEAL',
      signatoryTitle: 'Lead Food Processing Equipment QC Specialist',
      storageTitle: '⚙️ STORAGE & SANITARY PRESERVATION GUIDELINES:',
      storageText: 'Store in dry covered indoor warehouse wrapped in protective barrier film. All stainless steel food-contact surfaces sanitized and protected against ferrous dust contamination.',
      qualityTitle: '🛡️ OEM FOOD PROCESSING MACHINERY DECLARATION:',
      qualityText: 'Certified that all product-contact parts are manufactured from certified food-grade SS 304 / SS 316 stainless steel conforming to FDA / European Food Contact Materials (EC 1935/2004) regulations and CE Machinery Directive. Original OEM sanitary inspection reports and test certificates are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.',
      testParams: [
        {
          param: 'Food Contact Metallurgy - SS304/SS316 (ફૂડ ગ્રેડ સ્ટેનલેસ સ્ટીલ)',
          standard: 'Certified AISI 304 / 316 Stainless Steel on All Contact Parts',
          result: 'Pass (Verified as per OEM Metallurgy Certificate)',
          method: 'XRF Positive Material Identification (PMI Spectro)'
        },
        {
          param: 'Sanitary Surface Finish & CIP Cleanability (હાઇજેનિક સપાટી Ra)',
          standard: 'Mirror / Satin Polished Ra < 0.8 µm (Zero Crevices / Bacterial Traps)',
          result: 'Complies (Ultra-Smooth Hygienic Finish)',
          method: 'Surface Roughness Profilometer & Sanitary Ingress Audit'
        },
        {
          param: 'Mechanical Electrical Drive & Food Safety Interlocks',
          standard: 'IP65 Washdown-Proof Motors, Food-Grade Lubricants (H1 Registered)',
          result: '100% Inspected & Approved',
          method: 'Sanitary CIP Pressure Run & Safety Interlock Audit'
        }
      ]
    };
  }

  // 6. Agricultural Machinery & Implements (Tractors, Harvesters, Tillers, HS 8432, 8433, 8701, એગ્રીકલ્ચર મશીનરી)
  const isAgriMachinery = hs4 === '8432' || hs4 === '8433' || hs4 === '8701' || pNameFull.includes('tractor') || pNameFull.includes('harvester') || pNameFull.includes('tiller') || pNameFull.includes('plough') || pNameFull.includes('cultivator') || pNameFull.includes('ખેતી') || pNameFull.includes('એગ્રીકલ્ચર મશીનરી') || pNameFull.includes('ટ્રેક્ટર');
  if (isAgriMachinery) {
    return {
      categoryKey: 'oem_agri_machinery',
      categoryLabel: `Authentic OEM Agricultural Machinery & Implements (WCO HS ${hsRaw || '8432'})`,
      isMachinery: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / DGFT IEC & ISO 4254 Ag-Machinery Reg:',
      sealSubtitle: 'ISO 4254 & OECD TRACTOR / AG-EQUIPMENT AUDITED SEAL',
      signatoryTitle: 'Lead Agricultural Machinery Quality Engineer',
      storageTitle: '⚙️ STORAGE & HEAVY IMPLEMENT PRESERVATION:',
      storageText: 'Store on level hardstanding undercover. Hydraulic cylinders retracted and coated with anti-corrosion grease. All lubrication points greased per OEM manual.',
      qualityTitle: '🛡️ OEM AGRICULTURAL MACHINERY DECLARATION:',
      qualityText: 'Certified that the supplied agricultural machinery conforms strictly to original manufacturer technical specifications and ISO 4254 agricultural safety norms. Pre-delivery inspection (PDI) completed with full PTO and hydraulic verification. Original OEM inspection certificates and warranty dossiers are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.',
      testParams: [
        {
          param: 'Chassis Structural Strength & PTO Torque (ચેસિસ અને પીટીઓ ટોર્ક)',
          standard: 'Heavy-Duty High-Tensile Steel, Standard 540/1000 RPM PTO Drive',
          result: 'Pass (Verified as per OEM PDI Protocol)',
          method: 'Dynamometer Load Rig & Structural Ultrasonic Test'
        },
        {
          param: 'Hydraulic System Pressure & Flow Rate (હાઇડ્રોલિક પ્રેશર ટેસ્ટ)',
          standard: 'Rated Working Pressure ± 5% (Zero Hose / Valve Leakage)',
          result: 'Complies (Full Pressure Cycle Tested Pass)',
          method: 'Calibrated Hydraulic Test Rig (ISO 4254)'
        },
        {
          param: 'Protective Coating & Corrosion Shield (કલર કોટિંગ અને રસ્ટ પ્રોટેક્શન)',
          standard: 'Electrostatic Powder Coating > 80 µm (Corrosion Resistant)',
          result: '100% Inspected & Approved',
          method: 'Elcometer Dry Film Thickness & Salt Spray Test'
        }
      ]
    };
  }

  // 7. Industrial Fasteners & Precision Mechanical Hardware (HS 7318, 7307, 8481, 8482, Bolts, Nuts, Valves, ફાસ્ટનર)
  const isFasteners = hs4 === '7318' || hs4 === '7307' || hs4 === '8481' || hs4 === '8482' || hs4 === '8483' || ['72', '73', '82'].includes(hs2) || pNameFull.includes('fastener') || pNameFull.includes('bolt') || pNameFull.includes('nut') || pNameFull.includes('screw') || pNameFull.includes('valve') || pNameFull.includes('flange') || pNameFull.includes('બોલ્ટ') || pNameFull.includes('નટ') || pNameFull.includes('ફાસ્ટનર');
  if (isFasteners) {
    return {
      categoryKey: 'oem_fasteners',
      categoryLabel: `Precision Industrial Fasteners & Hardware (WCO HS ${hsRaw || '7318'})`,
      isEngineering: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / DGFT IEC & EEPC / ISO 9001 Reg:',
      sealSubtitle: 'ISO 9001, DIN & EN 10204 3.1 AUDITED FASTENER SEAL',
      signatoryTitle: 'Lead Metallurgical & Precision Inspection Officer',
      storageTitle: '⚙️ STORAGE, HANDLING & CORROSION PREVENTION:',
      storageText: 'Store in dry indoor warehouse elevated on pallets. Wrapped in VCI anti-corrosion barrier film with export-grade rust-preventive oil. Avoid exposure to acid mists and moisture.',
      qualityTitle: '🛡️ OEM METALLURGICAL & FASTENER QUALITY DECLARATION:',
      qualityText: 'Certified that the supplied fasteners and mechanical components conform strictly to original manufacturer technical specifications, DIN / ISO / ASTM standards, and Mill Test Certificates (EN 10204 3.1). Original OEM inspection reports, material test certificates (MTC), and dimension reports are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.',
      testParams: [
        {
          param: 'Alloy Chemistry & Grade Verification (ધાતુ કેમિકલ એનાલિસિસ)',
          standard: 'High-Tensile Grade 8.8 / 10.9 / 12.9 or Stainless Steel SS304/SS316',
          result: 'Pass (Verified as per OEM Mill Test Certificate)',
          method: 'Optical Emission Spectrometry (OES / EN 10204 3.1)'
        },
        {
          param: 'Tensile Yield & Proof Load Strength (ખેંચાણ ક્ષમતા અને હાર્ડનેસ)',
          standard: 'Conforms to ISO 898-1 / ASTM A193 Standards',
          result: 'Complies (Tested Tensile & Proof Load Passed)',
          method: 'Universal Tensile Testing Machine (UTM) & Rockwell Rig'
        },
        {
          param: 'Dimensional Precision & Thread Tolerance (માપ અને થ્રેડ એક્યુરેસી)',
          standard: 'ISO Metric Tolerance 6g/6H (Go / No-Go Calibrated Gauge Pass)',
          result: '100% Inspected & Approved',
          method: 'Digital Micrometer & Optical Profile Projector'
        }
      ]
    };
  }

  // 8. General Industrial Machinery & Heavy Equipment (HS 84, Machine, Machinery, Plant, મશીનરી)
  const isIndustrialMachinery = hs2 === '84' || pNameFull.includes('machin') || pNameFull.includes('plant') || pNameFull.includes('equipment') || pNameFull.includes('મશીન') || pNameFull.includes('મશીનરી');
  if (isIndustrialMachinery) {
    return {
      categoryKey: 'oem_machinery',
      categoryLabel: `Authentic OEM Industrial Machinery & Equipment (WCO HS ${hsRaw || '84'})`,
      isMachinery: true,
      isElectricalElectronic: false,
      licenseLabel: 'Export License / DGFT IEC & CE Machinery Directive Reg:',
      sealSubtitle: 'CE MACHINERY DIRECTIVE & ISO 9001 AUDITED INDUSTRIAL SEAL',
      signatoryTitle: 'Lead Machinery & Plant Commissioning Engineer',
      storageTitle: '⚙️ STORAGE & CRITICAL COMPONENT PRESERVATION:',
      storageText: 'Store in dry covered indoor warehouse. Critical machined surfaces protected with anti-rust compound. Packed in seaworthy heat-treated ISPM-15 wooden crates.',
      qualityTitle: '🛡️ OEM INDUSTRIAL MACHINERY & FAT DECLARATION:',
      qualityText: 'Certified that the supplied machinery conforms strictly to original OEM engineering designs, CE Machinery Directive 2006/42/EC, and ISO 9001 quality standards. 100% Factory Acceptance Test (FAT) completed. Original OEM machine manual, electrical diagrams, and factory inspection certificates are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.',
      testParams: [
        {
          param: 'Factory Acceptance Test & Operational Run (ફેક્ટરી રન ટેસ્ટ - FAT)',
          standard: '100% Full-Cycle Dry & Load Run, Rated RPM & Power Balance',
          result: 'Pass (Verified as per OEM FAT Protocol)',
          method: 'Factory Dynamic Run Rig & Digital Tachometer'
        },
        {
          param: 'Electrical Control Safety & Emergency Trip (વીજળીક સલામતી અને કંટ્રોલ)',
          standard: 'IEC 60204-1 Machinery Electrical Safety, Emergency Stop Active',
          result: 'Complies (Hi-Pot & Insulation Tested Safe)',
          method: 'Dielectric Analyzer & Automated Safety Loop Test'
        },
        {
          param: 'Heavy-Duty Seaworthy Export Packaging (સીવર્ધી વૂડન ક્રેટ પેકિંગ)',
          standard: 'ISPM-15 Heat-Treated Solid Wooden Crate with VCI Rust Film',
          result: '100% Inspected & Approved',
          method: 'Structural Drop & Seaworthy Packing Audit'
        }
      ]
    };
  }

  // 9. Electronics, IT & Telecommunications (HS 85, 8471, Routers, Mobiles, TVs, Switches, Computers, ગેજેટ્સ)
  const isElectronics = hs2 === '85' || hs4 === '8471' || pNameFull.includes('router') || pNameFull.includes('rauter') || pNameFull.includes('phone') || pNameFull.includes('mobile') || pNameFull.includes('galaxy') || pNameFull.includes('wifi') || pNameFull.includes('electronic') || pNameFull.includes('રાઉટર') || pNameFull.includes('મોબાઇલ');
  if (isElectronics) {
    return {
      categoryKey: 'oem_electronics',
      categoryLabel: `Authentic OEM Electronics & Telecommunications (WCO HS ${hsRaw || '85'})`,
      isElectricalElectronic: true,
      licenseLabel: 'Export License / DGFT IEC & TEC / CE / RoHS Reg:',
      sealSubtitle: 'TEC, CE, FCC & RoHS AUDITED OEM QUALITY SEAL',
      signatoryTitle: 'Lead Telecom & RF Compliance Engineer',
      storageTitle: '⚡ OPERATING ENVIRONMENT & STORAGE GUIDELINES:',
      storageText: 'Store in an ESD-safe, dry indoor climate-controlled environment. Operating Temperature: -10°C to +55°C; Relative Humidity: 10% to 90% (non-condensing). Keep in original factory sealed packaging.',
      qualityTitle: '🛡️ OEM ELECTRONICS & RF COMPLIANCE DECLARATION:',
      qualityText: 'Certified that the supplied products conform strictly to original OEM technical specifications, IEEE/ETSI telecommunication standards, CE Low Voltage Directive, and RoHS 2.0. Pre-dispatch inspection completed with zero manufacturing defects. Original OEM Test Certificates and compliance data sheets are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.',
      testParams: [
        {
          param: 'OEM Technical Standards & RF Norms (ઉત્પાદક ગુણવત્તા સ્ટાન્ડર્ડ)',
          standard: 'Complies strictly with Original OEM Technical Datasheet & Wireless Norms',
          result: 'Pass (Verified as per OEM Factory Test Report)',
          method: 'Factory RF & Spectrum Analysis Verification'
        },
        {
          param: 'Safety & Environmental Directive (RoHS / CE / IEC 62368-1)',
          standard: 'RoHS 2.0 / CE / IEC 62368-1 Directives Compliant',
          result: 'Compliant (Manufacturer Certified Dossier)',
          method: 'OEM Factory Routine & Type Test Compliance'
        },
        {
          param: 'Physical Packaging & ESD Protection (બાહ્ય સુરક્ષા અને સીલ સ્ટાન્ડર્ડ)',
          standard: 'Original Factory Sealed Export Packaging with Impact & ESD Protection',
          result: '100% Inspected & Approved',
          method: 'Visual & Hermetic ESD Seal Verification'
        }
      ]
    };
  }

  // 10. General Merchandise / Fallback OEM
  return {
    categoryKey: 'oem_general',
    categoryLabel: `Authentic OEM Quality & Technical Compliance (WCO HS ${hsRaw || 'Standard'})`,
    isElectricalElectronic: false,
    licenseLabel: 'Export License / DGFT IEC & Standard Compliance:',
    sealSubtitle: 'AUTHENTIC OEM VERIFIED & FACTORY COMPLIANCE SEAL',
    signatoryTitle: 'Lead QA/QC & Technical Compliance Officer',
    storageTitle: '📦 STORAGE & PRESERVATION INSTRUCTIONS:',
    storageText: 'Store in a cool, dry, well-ventilated area away from direct sunlight, moisture, and extreme ambient temperature fluctuations. Keep original export packaging intact.',
    qualityTitle: '🛡️ OEM QUALITY & TECHNICAL CONFORMITY DECLARATION:',
    qualityText: 'Certified that the supplied products conform strictly to original OEM technical specifications and factory test standards. Pre-dispatch inspection completed with zero manufacturing defects. Original OEM Test Certificates and compliance data sheets are maintained on record and may be obtained directly from the OEM upon buyer\'s formal request.',
    testParams: [
      {
        param: 'OEM Technical Standards & Quality Compliance (ઉત્પાદક ગુણવત્તા સ્ટાન્ડર્ડ)',
        standard: 'Complies strictly with Original OEM Technical Datasheet & Specifications',
        result: 'Pass (Verified as per OEM Factory Test Report)',
        method: 'Factory Inspection & OEM Technical Dossier Verification'
      },
      {
        param: 'Safety & Regulatory Directive Compliance (સલામતી અને કાયદાકીય ધોરણ)',
        standard: 'International Quality & Safety Standards Compliant',
        result: 'Compliant (Manufacturer Certified Dossier)',
        method: 'OEM Factory Routine Inspection & Quality Compliance'
      },
      {
        param: 'Physical Packaging & Seal Integrity (બાહ્ય સુરક્ષા અને સીલ સ્ટાન્ડર્ડ)',
        standard: 'Original Factory Sealed Export Packaging',
        result: '100% Inspected & Approved',
        method: 'Visual & Hermetic Seal Verification'
      }
    ]
  };
};

/**
 * Main function: Returns active COA parameters for a product.
 * If product is explicitly OEM certified, uses OEM standard preset as default.
 * If product has custom parameters saved by Admin (customTestParams), those take priority.
 * Otherwise, dynamically generates parameters strictly according to the product's HS Code.
 */
export const getCoaDataByHsCode = (product) => {
  const isOem = Boolean(product?.isOemCertified || product?.oemCertified || product?.complianceMode === 'oem');
  const defaults = isOem ? getOemStandardPreset(product) : getDefaultParamsForHsCode(product);
  if (!product) return defaults;

  const hasCustomParams = Array.isArray(product.customTestParams) && product.customTestParams.length > 0;
  let activeParams = hasCustomParams ? product.customTestParams : defaults.testParams;

  // Smart guard: If the product has custom params that still contain the generic cotton default ('100% Combed Cotton')
  // but the product defaults are NOT cotton (e.g. Polyester, Jari, Silk, Wool, etc.),
  // automatically synchronize the first parameter so the COA reflects the product's true composition!
  if (hasCustomParams && defaults.testParams?.[0]?.standard && !defaults.testParams[0].standard.includes('100% Combed Cotton')) {
    activeParams = activeParams.map((param, i) => {
      if (i === 0 && param.standard && param.standard.includes('100% Combed Cotton')) {
        return {
          ...param,
          standard: defaults.testParams[0].standard,
          result: param.result?.includes('Pass') ? defaults.testParams[0].result : param.result,
          method: defaults.testParams[0].method || param.method
        };
      }
      return param;
    });
  }

  // WCO HS 5407 / Chapter 54 Strict Enforcement: Under no circumstance will cotton EVER appear for Chapter 54!
  const hsRawStr = String(product.hsCode || product.localHsn || '');
  const hsCleanStr = cleanHsDigits(hsRawStr);
  if (hsCleanStr.startsWith('54')) {
    activeParams = activeParams.map((param, i) => {
      if (i === 0 && (param.standard?.includes('Cotton') || param.standard?.includes('cotton'))) {
        return {
          ...param,
          standard: defaults.testParams[0]?.standard || '≥ 85% Textured Polyester Filament with Metallic Jari Yarn, Rated GSM ± 3% (WCO HS 5407.52)',
          result: defaults.testParams[0]?.result || 'Pass (Verified as per Polyester & Metallic Jari OEM Specs)',
          method: defaults.testParams[0]?.method || 'Microscopic Identification & GSM Circular Cutter (ASTM D3776)'
        };
      }
      return param;
    });
  }

  let activeStorage = product.customStorage || defaults.storageText;
  let activeQualityDecl = product.customQualityDecl || defaults.qualityText;

  // Synchronize storage and quality declaration if they contain old cotton text on a polyester/jari product
  if (activeStorage && activeStorage.includes('prevent discoloration and fiber degradation') && defaults.storageText.includes('metallic jari')) {
    activeStorage = defaults.storageText;
  }
  if (activeQualityDecl && activeQualityDecl.includes('supplied textile products') && defaults.qualityText.includes('polyester filament and metallic jari')) {
    activeQualityDecl = defaults.qualityText;
  }

  return {
    ...defaults,
    testParams: activeParams,
    storageText: activeStorage,
    qualityText: activeQualityDecl,
    hasCustomOverrides: hasCustomParams,
    isOemCertified: isOem
  };
};
