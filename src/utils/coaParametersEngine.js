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
 * Returns default standard laboratory test parameters based on WCO HS Code and product context
 */
export const getDefaultParamsForHsCode = (productOrHs) => {
  const p = typeof productOrHs === 'object' && productOrHs !== null ? productOrHs : { hsCode: String(productOrHs || '') };
  const hsRaw = String(p.hsCode || p.localHsn || '').trim();
  const hs = cleanHsDigits(hsRaw);
  const hs2 = hs.slice(0, 2);
  const hs4 = hs.slice(0, 4);
  const hs6 = hs.slice(0, 6);

  const prodNameEn = (typeof p.names === 'object' ? p.names.en : p.name) || '';
  const prodNameGu = (typeof p.names === 'object' ? p.names.gu : '') || '';
  const cat = (p.category || '').toLowerCase();
  const pId = (p.id || '').toLowerCase();
  const pNameFull = ((prodNameEn || '') + ' ' + (prodNameGu || '') + ' ' + (typeof p.spec === 'object' ? Object.values(p.spec).join(' ') : (p.spec || ''))).toLowerCase();

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
  const isTextile = (parseInt(hs2, 10) >= 50 && parseInt(hs2, 10) <= 63) || cat.includes('text') || cat.includes('garment') || cat.includes('fabric') || pNameFull.includes('cotton') || pNameFull.includes('saree') || pNameFull.includes('t-shirt') || pNameFull.includes('કાપડ') || pNameFull.includes('સાડી');

  if (isTextile) {
    return {
      categoryKey: 'textiles_garments',
      categoryLabel: 'Textiles, Garments & Woven Fabrics (WCO HS Section XI)',
      isTextile: true,
      licenseLabel: 'Export License / DGFT IEC & TEXPROCIL Reg:',
      sealSubtitle: 'OEKO-TEX & TEXPROCIL AUDITED TEXTILE SEAL',
      signatoryTitle: 'Lead Textile Chemist & Fabric QA Officer',
      storageTitle: '🧶 STORAGE & FABRIC CARE INSTRUCTIONS:',
      storageText: 'Store in clean, dry, dust-free warehouse on elevated pallets. Keep cartons sealed with polyethylene moisture barrier liners. Keep away from direct sunlight to prevent photochemical discoloration.',
      qualityTitle: '🛡️ TEXTILE QUALITY & SAFETY DECLARATION:',
      qualityText: 'Certified 100% free from banned carcinogenic azo dyes, formaldehyde, and heavy metals. Conforms to OEKO-TEX Standard 100 and AATCC international washing and color-fastness standards.',
      testParams: [
        { param: 'Fiber Composition (ફાઈબર / સુતર બંધારણ)', standard: '100% Premium Combed Cotton / Certified Blend', result: '100% Certified Fiber Pass', method: 'Microscopic & Chemical Solvent Analysis' },
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
 * Main function: Returns active COA parameters for a product.
 * If product has custom parameters saved by Admin (customTestParams), those take priority.
 * Otherwise, dynamically generates parameters strictly according to the product's HS Code.
 */
export const getCoaDataByHsCode = (product) => {
  const defaults = getDefaultParamsForHsCode(product);
  if (!product) return defaults;

  const hasCustomParams = Array.isArray(product.customTestParams) && product.customTestParams.length > 0;
  const activeParams = hasCustomParams ? product.customTestParams : defaults.testParams;
  const activeStorage = product.customStorage || defaults.storageText;
  const activeQualityDecl = product.customQualityDecl || defaults.qualityText;

  return {
    ...defaults,
    testParams: activeParams,
    storageText: activeStorage,
    qualityText: activeQualityDecl,
    hasCustomOverrides: hasCustomParams
  };
};
