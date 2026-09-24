/**
 * Data Definitions for Initial Products, Branches, Certificates, and Translations
 */

export const initialProductsData = [
  {
    id: "turmeric",
    category: "agro",
    isSub: true,
    hsCode: "09103030",
    image: "images/agro_spices_grains.png",
    images: ["images/agro_spices_grains.png", "images/hero_export_shipping.png"],
    names: {
      gu: "આખા અને પાઉડર હળદર (કર્ક્યુમિન ૩% - ૫%)",
      en: "Finger & Powder Turmeric (Curcumin 3% - 5%)",
      hi: "हल्दी आखा और पाउडर (Curcumin 3% - 5%)",
      fr: "Curcuma en Racine & Poudre"
    },
    spec: {
      gu: "ભેજ: મહત્તમ ૧૦% | શુદ્ધતા: ૯૯% | કુદરતી પીળો રંગ | સ્ટીમ સ્ટેરિલાઇઝ્ડ",
      en: "Moisture: Max 10% | Purity: 99% | Natural Yellow Color | Steam Sterilized",
      hi: "नमी: अधिकतम 10% | शुद्धता: 99% | प्राकृतिक पीला रंग | स्टीम स्टेरिलाइज्ड",
      fr: "Humidité: Max 10% | Pureté: 99% | Couleur Jaune Naturelle"
    },
    packaging: "25kg / 50kg PP Bags / Jute Bags",
    moq: "18 MT (1 x 20ft Container)"
  },
  {
    id: "basmati",
    category: "agro",
    isSub: true,
    hsCode: "10063020",
    image: "images/agro_spices_grains.png",
    images: ["images/agro_spices_grains.png", "images/new_agro_machinery.png"],
    names: {
      gu: "૧૧૨૧ પ્રીમિયમ XXL એક્સ્ટ્રા લોંગ બાસમતી ચોખા",
      en: "1121 Premium XXL Extra Long Basmati Rice",
      hi: "1121 प्रीमियम XXL बासमती चावल",
      fr: "Riz Basmati 1121 Premium XXL"
    },
    spec: {
      gu: "સરેરાશ લંબાઈ: ૮.૩૫ mm+ | ભેજ: મહત્તમ ૧૨% | સોર્ટકેસ અને ડબલ પોલિશ્ડ",
      en: "Avg Grain Length: 8.35mm+ | Moisture: Max 12% | Sortex & Double Polished",
      hi: "औसत लंबाई: 8.35 mm+ | नमी: अधिकतम 12% | सॉर्टेक्स और डबल पॉलिश",
      fr: "Longueur Moyenne: 8,35 mm+ | Humidité: Max 12% | Double Polissage Sortex"
    },
    packaging: "5kg, 10kg, 20kg Non-woven / BOPP Bags",
    moq: "25 MT (1 x 20ft Container)"
  },
  {
    id: "cumin",
    category: "agro",
    isSub: true,
    hsCode: "09093120",
    image: "images/agro_spices_grains.png",
    images: ["images/agro_spices_grains.png", "images/hero_export_shipping.png"],
    names: {
      gu: "સિંગાપોર / યુરોપ ક્વોલિટી જીરું (Jeera Seeds)",
      en: "Singapore / Europe Quality Cumin Seeds",
      hi: "जीरा (Cumin Seeds Singapore Quality)",
      fr: "Graines de Cumin Qualité Europe"
    },
    spec: {
      gu: "શુદ્ધતા: ૯૯.૫% મશીન ક્લીન અને સોર્ટકેસ ક્લીન | વોલેટાઈલ ઓઈલ: ૨.૫%+",
      en: "Purity: 99.5% Machine Cleaned & Sortex | Volatile Oil: 2.5%+",
      hi: "शुद्धता: 99.5% मशीन क्लीन और सॉर्टेक्स | वाष्पशील तेल: 2.5%+",
      fr: "Pureté: 99,5% Machine & Sortex | Huile Volatile: 2,5%+"
    },
    packaging: "25kg / 50kg Multi-wall Paper / PP Bags",
    moq: "13 MT (1 x 20ft Container)"
  },
  {
    id: "cnc_machine",
    category: "used_machinery",
    isSub: true,
    hsCode: "84581100",
    image: "images/used_industrial_machinery.png",
    images: ["images/used_industrial_machinery.png", "images/industrial_fasteners.png"],
    names: {
      gu: "જૂની અને રિફર્બિશ્ડ ઔદ્યોગિક CNC લેથ મશીનરી",
      en: "Used & Refurbished Industrial CNC Lathe Machinery",
      hi: "पुरानी औद्योगिक CNC मशीनरी",
      fr: "Tours CNC d'Occasion Reconditionnés"
    },
    spec: {
      gu: "ચકાસાયેલ વર્કિંગ કન્ડિશન | સિમેન્સ / ફેનુક કંટ્રોલ સિસ્ટમ | યુરોપથી ઈમ્પોર્ટ",
      en: "Verified Working Condition | Siemens / Fanuc CNC Controls | Imported Quality",
      hi: "सत्यापित कार्य स्थिति | सीमेंस / फैनुक सीएनसी नियंत्रण | आयातित गुणवत्ता",
      fr: "État de Fonctionnement Vérifié | Commandes CNC Siemens / Fanuc"
    },
    packaging: "Seaworthy Wooden Crate / Skid Packing",
    moq: "1 Unit"
  },
  {
    id: "new_agro_machinery",
    category: "new_machinery",
    isSub: true,
    hsCode: "84378010",
    image: "images/new_agro_machinery.png",
    images: ["images/new_agro_machinery.png", "images/used_industrial_machinery.png"],
    names: {
      gu: "નવી ઓટોમેટિક રાઇસ મિલ અને ગ્રેન સોર્ટકેસ મશીનરી",
      en: "New Automatic Rice Mill & Grain Sortex Machinery",
      hi: "नयी ऑटोमैटिक राइस मिल और सॉर्टेक्स मशीनरी",
      fr: "Nouvelles Machines de Meunerie et Sortex"
    },
    spec: {
      gu: "ક્ષમતા: ૩ થી ૧૦ ટન/કલાક | સ્ટેનલેસ સ્ટીલ બોડી | ઉચ્ચ ઉર્જા કાર્યક્ષમતા",
      en: "Capacity: 3 to 10 Tons/Hr | Stainless Steel Contact Parts | High Energy Efficiency",
      hi: "क्षमता: 3 से 10 टन/घंटा | स्टेनलेस स्टील बॉडी | उच्च ऊर्जा दक्षता",
      fr: "Capacité: 3 à 10 Tonnes/Heure | Pièces en Acier Inoxydable"
    },
    packaging: "Export Standard Wooden Case",
    moq: "1 Set"
  },
  {
    id: "fasteners",
    category: "industrial",
    isSub: true,
    hsCode: "73181500",
    image: "images/industrial_fasteners.png",
    images: ["images/industrial_fasteners.png", "images/eco_friendly_packaging.png"],
    names: {
      gu: "હાઇ ટેન્સાઇલ સ્ટીલ બોલ્ટ્સ, નટ્સ અને થ્રેડેડ રોડ્સ",
      en: "High Tensile Steel Hex Bolts, Nuts & Threaded Rods",
      hi: "हाई टेंसिले हेक्स बोल्ट, नट्स और थ्रेडेड रोड्स",
      fr: "Boulons, Écrous & Tiges Filetées Haute Résistance"
    },
    spec: {
      gu: "ગ્રેડ: ૮.૮, ૧૦.૯, ૧૨.૯ અને SS 304/316 | હોટ ડીપ ગેલ્વેનાઇઝ્ડ / જીંક પ્લેટેડ",
      en: "Grades: 8.8, 10.9, 12.9 & SS 304/316 | Hot Dip Galvanized / Zinc Plated",
      hi: "ग्रेड: 8.8, 10.9, 12.9 और SS 304/316 | हॉट डिप गैल्वेनाइज्ड / जिंक प्लेटेड",
      fr: "Grades: 8.8, 10.9, 12.9 & Inox 304/316 | Galvanisé à Chaud"
    },
    packaging: "25kg Carton / Wooden Palletized",
    moq: "5 MT"
  },
  {
    id: "jute_bags",
    category: "eco_packaging",
    isSub: true,
    hsCode: "63051040",
    image: "images/eco_friendly_packaging.png",
    images: ["images/eco_friendly_packaging.png", "images/agro_spices_grains.png"],
    names: {
      gu: "૧૦૦% નેચરલ ઇકો-ફ્રેન્ડલી જૂટ અને હેસિયન બેગ્સ",
      en: "100% Natural Eco-Friendly Jute & Hessian Bags",
      hi: "100% प्राकृतिक पर्यावरण के अनुकूल जूट और हेसियन बैग",
      fr: "Sacs en Jute et Toile de Jute 100% Écologiques"
    },
    spec: {
      gu: "૧૦૦% બાયોડિગ્રેડેબલ | સાઈઝ: ૫૦kg લિન્ક્ડ / બી-ટ્વિલ સાઈઝ | ફૂડ ગ્રેડ વિજીટેબલ ઓઈલ ટ્રીટેડ",
      en: "100% Biodegradable | Size: 50kg Linked / B-Twill Size | Food Grade Vegetable Oil Treated",
      hi: "100% बायोडिग्रेडेबल | आकार: 50 किग्रा | खाद्य ग्रेड वनस्पति तेल उपचारित",
      fr: "100% Biodégradable | Sacs de 50 kg Traités à l'Huile Végétale Alimentaire"
    },
    packaging: "Bale Packing of 300 to 500 Bags",
    moq: "10,000 Bags (1 x 20ft Container)"
  },
  {
    id: "ghee_dairy",
    category: "dairy",
    isSub: true,
    hsCode: "04059020",
    localHsn: "04059020",
    image: "images/agro_spices_grains.png",
    images: ["images/agro_spices_grains.png", "images/hero_export_shipping.png"],
    names: {
      gu: "પ્રીમિયમ શુદ્ધ દેશી ગાય અને ભેંસનું ઘી (Pure Clarified Butter / Ghee)",
      en: "Premium Pure Indian Cow & Buffalo Clarified Butter (Ghee)",
      hi: "प्रीमियम शुद्ध देसी गाय और भैंस का घी",
      fr: "Beurre Pur Clarifié Indien (Ghee)"
    },
    spec: {
      gu: "શુદ્ધતા: ૯૯.૮% | ભેજ: મહત્તમ ૦.૨% | દાણાદાર ટેક્સચર અને સમૃદ્ધ સુગંધ | AGMARK સ્પેશિયલ ગ્રેડ",
      en: "Purity: 99.8% | Moisture: Max 0.2% | Granular Texture & Rich Aroma | AGMARK Special Grade Certified",
      hi: "शुद्धता: 99.8% | नमी: अधिकतम 0.2% | दानेदार बनावट | एगमार्क स्पेशल ग्रेड",
      fr: "Pureté: 99,8% | Humidité: Max 0,2% | Texture Granulaire | Certifié AGMARK"
    },
    packaging: "1L / 5L Jars & 15kg Tin Containers",
    moq: "5 MT (1 x 20ft Container)"
  },
  {
    id: "smp_milk_powder",
    category: "dairy",
    isSub: true,
    hsCode: "04021010",
    localHsn: "04021010",
    image: "images/agro_spices_grains.png",
    images: ["images/agro_spices_grains.png", "images/new_agro_machinery.png"],
    names: {
      gu: "સ્પ્રે ડ્રાઇડ સ્કિમ્ડ મિલ્ક પાઉડર (Skimmed Milk Powder - SMP 34% Protein)",
      en: "Spray Dried Skimmed Milk Powder (SMP 34% Protein)",
      hi: "स्प्रे ड्राइड स्किम्ड मिल्क पाउडर (SMP)",
      fr: "Poudre de Lait Écrémé en Spray (SMP)"
    },
    spec: {
      gu: "પ્રોટીન: ૩૪% મિનિમમ | ફેટ: મહત્તમ ૧.૨% | ભેજ: મહત્તમ ૪% | સોલ્યુબિલિટી ઈન્ડેક્સ: ૯૯.૫%",
      en: "Protein: 34% Min | Fat: Max 1.2% | Moisture: Max 4% | Solubility Index: 99.5%",
      hi: "प्रोटीन: 34% न्यूनतम | वसा: अधिकतम 1.2% | घुलनशीलता सूचकांक: 99.5%",
      fr: "Protéines: 34% Min | Matière Grasse: Max 1,2% | Indice de Solubilité: 99,5%"
    },
    packaging: "25kg Multi-wall Kraft Paper Bags with PE Liner",
    moq: "15 MT (1 x 20ft Container)"
  },
  {
    id: "surat_fabrics",
    category: "textiles",
    isSub: true,
    hsCode: "54075200",
    localHsn: "54075200",
    image: "images/hero_export_shipping.png",
    images: ["images/hero_export_shipping.png", "images/industrial_fasteners.png"],
    names: {
      gu: "સુરત પ્રીમિયમ સિન્થેટિક ફેબ્રિક્સ અને ડિઝાઇનર જેક્વાર્ડ સાડીઓ (Surat Textile)",
      en: "Surat Premium Woven Polyester Fabrics & Jacquard Designer Sarees",
      hi: "सूरत प्रीमियम सिंथेटिक फैब्रिक्स और डिज़ाइनर साड़ियाँ",
      fr: "Tissus Synthétiques & Saris Jacquard de Surat"
    },
    spec: {
      gu: "પહોળાઈ: ૪૪\" થી ૫૮\" | વજન: ૮૦ થી ૧૮૦ GSM | વોટરજેટ વુવન | ઉચ્ચ કલર ફાસ્ટનેસ",
      en: "Width: 44\" - 58\" | Weight: 80 - 180 GSM | High Color Fastness | Waterjet Woven",
      hi: "चौड़ाई: 44\" - 58\" | वजन: 80 - 180 जीएसएम | उच्च रंग स्थिरता",
      fr: "Largeur: 44\" - 58\" | Poids: 80 - 180 GSM | Haute Solidité des Couleurs"
    },
    packaging: "Roll Packing of 100m / Export Bale Packing",
    moq: "5,000 Meters / 500 Sarees"
  },
  {
    id: "cotton_yarn",
    category: "textiles",
    isSub: true,
    hsCode: "52052200",
    localHsn: "52052200",
    image: "images/hero_export_shipping.png",
    images: ["images/hero_export_shipping.png", "images/eco_friendly_packaging.png"],
    names: {
      gu: "૧૦૦% કોમ્બડ કોટન યાર્ન અને રિંગ સ્પન થ્રેડ (Ne 20s થી 40s Count)",
      en: "100% Combed Cotton Yarns & Ring Spun Weaving Threads (Ne 20s to 40s)",
      hi: "100% कॉम्ब्ड कॉटन यार्न और रिंग स्पन धागे",
      fr: "Fils de Coton Peigné 100% & Thread de Tissage"
    },
    spec: {
      gu: "Ne કાઉન્ટ: 20s, 30s, 40s | Uster CV%: મહત્તમ ૧૨% | CSP: 2400+ | ઓટો-કોન્ડ અને સ્પલાઇસ્ડ",
      en: "Ne Count: 20s, 30s, 40s | Uster CV%: Max 12% | CSP: 2400+ | Auto-coned & Spliced",
      hi: "Ne काउंट: 20s, 30s, 40s | उस्टर CV%: अधिकतम 12% | CSP: 2400+",
      fr: "Compte Ne: 20s, 30s, 40s | Uster CV%: Max 12% | CSP: 2400+"
    },
    packaging: "50kg Carton Boxes / Paper Cones",
    moq: "10 MT (1 x 20ft Container)"
  },
  {
    id: "mens_tshirts",
    category: "garments",
    isSub: true,
    hsCode: "61051000",
    localHsn: "61051000",
    image: "images/hero_export_shipping.png",
    images: ["images/hero_export_shipping.png", "images/industrial_fasteners.png"],
    names: {
      gu: "મેન્સ અને બોય્ઝ ૧૦૦% કોમ્બડ કોટન પોલો ટી-શર્ટ્સ અને કેઝ્યુઅલ શર્ટ્સ (Readymade Garments)",
      en: "Men's & Boys' 100% Combed Cotton Bio-Washed Polo T-Shirts & Casual Shirts",
      hi: "मेंस और बॉयज 100% कॉटन पोलो टी-शर्ट्स और शर्ट्स",
      fr: "T-Shirts Polo & Chemises 100% Coton Pour Hommes"
    },
    spec: {
      gu: "GSM: ૧૮૦ થી ૨૨૦ | ૧૦૦% કોટન પિક પિકવે | પ્રી-શ્રન્ક અને બાયો-વોશ્ડ | કલર ફાસ્ટનેસ ગ્રેડ ૪+",
      en: "GSM: 180 - 220 GSM | Fabric: 100% Cotton / Pique Knit | Pre-Shrunk & Bio-Washed | Color Fastness: Grade 4+",
      hi: "जीएसएम: 180 - 220 | 100% कॉटन | बायो-वॉश्ड | कलर फास्टनेस ग्रेड 4+",
      fr: "GSM: 180 - 220 | 100% Coton | Bio-Lave | Solidite des Couleurs Grade 4+"
    },
    packaging: "Individual Polybag Packing / 50 Pcs Per Master Carton",
    moq: "1,000 Pcs (Assorted Sizes S to XXL)"
  },
  {
    id: "womens_kurtis",
    category: "garments",
    isSub: true,
    hsCode: "62044220",
    localHsn: "62044220",
    image: "images/hero_export_shipping.png",
    images: ["images/hero_export_shipping.png", "images/agro_spices_grains.png"],
    names: {
      gu: "લેડીઝ પ્રીમિયમ એમબ્રોઇડરી કોટન-રયોન કુર્તીઓ, સલવાર સુટ્સ અને ડેનિમ વેર (Readymade Apparel)",
      en: "Women's Premium Embroidered Cotton-Rayon Kurtis, Salwar Suits & Denim Apparel",
      hi: "लेडीज प्रीमियम एम्ब्रॉयडरी कुर्तियां और सलवार सूट",
      fr: "Kurtis Brodes & Ensembles Indiens Pour Femmes"
    },
    spec: {
      gu: "ફેબ્રિક: શુદ્ધ કોટન / પ્રીમિયમ રયોન / ડેનિમ | વર્ક: મશીન અને ઝરી વર્ક | સાઈઝ: M થી 4XL",
      en: "Fabric: Pure Cotton / Premium Rayon / Denim | Embroidery: Machine & Zari Work | Sizes: M to 4XL | Export Finish",
      hi: "फैब्रिक: प्योर कॉटन / प्रीमियम रेयान | वर्क: एम्ब्रॉयडरी और ज़री वर्क | साइज़: M से 4XL",
      fr: "Tissu: Pure Coton / Rayonne | Broderie: Travail Zari | Tailles: M a 4XL"
    },
    packaging: "Single Piece Hanger Bag / 100 Pcs Master Export Box",
    moq: "500 Pcs (Assorted Designs & Sizes)"
  },
  {
    id: "main_cat_garments_comp4",
    companyId: "comp_4",
    category: "garments",
    isSub: false,
    hsCode: "620413",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    images: ["images/hero_export_shipping.png"],
    names: {
      gu: "રેડિ-મેડ ગારમેન્ટ્સ (Readymade Garments)",
      en: "Readymade Garments",
      hi: "રેડિ-મેડ ગારમેન્ટ્સ",
      fr: "Vêtements Confectionnés"
    },
    spec: {
      gu: "Premium Export Quality Category. For Mens, Womens and Childrens.",
      en: "Premium Export Quality Category. For Mens, Womens and Childrens.",
      hi: "Premium Export Quality Category.",
      fr: "Catégorie de Qualité d'Exportation Supérieure."
    },
    packaging: "Export Packaging",
    moq: "1 Container / Shipment"
  },
  {
    id: "punjabi_dress_comp4",
    companyId: "comp_4",
    category: "garments",
    parentId: "main_cat_garments_comp4",
    isSub: true,
    hsCode: "620413",
    localHsn: "62041300",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    images: ["images/hero_export_shipping.png"],
    names: {
      gu: "ગુજરાતી ડ્રેસ (Gujarati Dress)",
      en: "Gujarati Dress",
      hi: "ગુજરાતી ડ્રેસ",
      fr: "Robe Gujrati"
    },
    spec: {
      gu: "ઉચ્ચ ગુણવત્તાયુક્ત પ્રીમિયમ પ્રોડક્ટ (Premium Designer Gujarati Suits & Dresses)",
      en: "Premium Export Quality Designer Gujarati Suit & Dress",
      hi: "उच्च गुणवत्ता वाला प्रीमियम गुजराती ड्रेस",
      fr: "Robe Gujrati de Qualité Supérieure"
    },
    packaging: "Standard Export Packaging",
    moq: "1 Unit / Container"
  },
  {
    id: "ind_automation_comp4",
    companyId: "comp_4",
    category: "industrial",
    isSub: true,
    hsCode: "847130",
    localHsn: "84713010",
    image: "images/industrial_fasteners.png",
    images: ["images/industrial_fasteners.png"],
    names: {
      gu: "ઔદ્યોગિક ઓટોમેશન સિસ્ટમ્સ & ઈલેક્ટ્રોનિક કંટ્રોલર્સ (Automation Controllers)",
      en: "Industrial Automation Systems & Electronic PLC Controllers",
      hi: "इंडस्ट्रियल ऑटोमेशन और इलेक्ट्रॉनिक्स",
      fr: "Systèmes d'Automatisation Industrielle"
    },
    spec: {
      gu: "PLC કંટ્રોલ પિન | હાઈ સ્પીડ ડિજિટલ મોનિટરિંગ | IP65 પ્રોટેક્શન",
      en: "PLC Control Panel | High Speed Digital Monitoring | IP65 Protection Grade",
      hi: "PLC कंट्रोल | डिजिटल मॉनिटरिंग | IP65 प्रोटेक्शन",
      fr: "Contrôle PLC | Surveillance Numérique | Protection IP65"
    },
    packaging: "Heavy Duty Wooden Crate",
    moq: "1 Unit / System"
  },
  {
    id: "eco_packaging_comp4",
    companyId: "comp_4",
    category: "packaging",
    isSub: true,
    hsCode: "630510",
    localHsn: "63051030",
    image: "images/eco_friendly_packaging.png",
    images: ["images/eco_friendly_packaging.png"],
    names: {
      gu: "ઇકો પેકેજિંગ & ૧૦૦% બાયોડિગ્રેડેબલ જુટ બેગ્સ (Sustainable Packaging)",
      en: "Eco Packaging & 100% Biodegradable Jute Bags",
      hi: "इको पैकेजिंग और जूट बैग्स",
      fr: "Emballages Écologiques & Sacs en Jute"
    },
    spec: {
      gu: "૧૦૦% ઈકો-ફ્રેન્ડલી | ફૂડ ગ્રેડ વેજીટેબલ ઓઈલ કોટેડ | હેવી ડ્યુટી કેપેસિટી",
      en: "100% Eco-Friendly | Food Grade Vegetable Oil Coated | Heavy Duty Capacity",
      hi: "100% इको-फ्रेंडली | फ़ूड ग्रेड वेजीटेबल ऑयल कोटेड",
      fr: "100% Écologique | Huile Végétale Alimentaire"
    },
    packaging: "Bale Packing of 300 to 500 Bags",
    moq: "5,000 Bags"
  }
];

export const defaultBranchOffices = [
  {
    id: "branch-headquarters",
    city: "Surat, Gujarat (Headquarters)",
    person: "Mr. Devang Patel (Managing Director)",
    phone: "+91 78619 97755",
    email: "surat@adidevexport.com",
    address: "Plot No. 45, Ring Road Textile & Commodity Hub, Surat, Gujarat 395002, India"
  },
  {
    id: "branch-mumbai",
    city: "Mumbai, Maharashtra (Port Branch Office)",
    person: "Mr. Rajesh Sharma (Export Logistics Head)",
    phone: "+91 98200 12345",
    email: "mumbai@adidevexport.com",
    address: "Unit 304, JNPT Port Commerce Tower, Nhava Sheva, Navi Mumbai, Maharashtra 400707, India"
  },
  {
    id: "branch-dubai",
    city: "Dubai, UAE (Overseas Trade Hub)",
    person: "Mr. Tariq Al-Mansoor (Middle East Trade Director)",
    phone: "+971 4 399 8877",
    email: "dubai@adidevexport.com",
    address: "Building 4B, Jebel Ali Free Zone (JAFZA), Dubai, United Arab Emirates"
  }
];

export const defaultCertificates = [
  {
    id: "apeda",
    title: "APEDA Registration",
    reg: "Reg No: APEDA/2026/IND-88",
    icon: "🌾"
  },
  {
    id: "iso",
    title: "ISO 9001:2015 Quality Management",
    reg: "Cert No: ISO-9001-2026-ADI",
    icon: "🏅"
  },
  {
    id: "fssai",
    title: "FSSAI Food Safety License",
    reg: "Lic No: 10022021000543",
    icon: "📜"
  },
  {
    id: "spices_board",
    title: "Spices Board of India License",
    reg: "Reg No: SB/EXPORT/2026/09",
    icon: "🌿"
  }
];

export const translations = {
  en: {
    tagline_top: "APEDA & ISO Certified Premium Global Exporter | Surat, Gujarat",
    nav_home: "Home",
    nav_about: "About Us",
    nav_products: "Product Catalog",
    nav_calc: "Calculators",
    nav_quality: "Certifications",
    nav_branches: "Global Offices",
    nav_contact: "Contact Us",
    nav_quote: "Get Instant Quote",

    hero_badge: "APEDA & ISO 9001:2015 REGISTERED EXPORTER",
    hero_title: "Connecting Premium Quality Agro Commodities, Industrial Goods & Machinery To The World",
    hero_subtitle: "Trusted Indian Exporter specializing in Spices, Rice, Oilseeds, Fasteners, New & Used Machinery, and Eco Packaging across 40+ countries.",
    hero_btn_products: "Explore Products",
    hero_btn_quote: "Request Quotation",
    btn_explore: "Explore Products",
    btn_rfq: "Request Quotation (RFQ)",

    about_badge: "Leading Exporter from Surat, India",
    about_title: "Delivering Excellence from Indian Soil to Global Markets",
    about_desc: "We are a premier export and trading house headquartered in Surat, Gujarat. Committed to uncompromised purity, strict quality protocols, and seamless logistics, we export top-tier agricultural produce, industrial supplies, new and used machinery, and sustainable packaging globally.",
    about_feat1: "Direct sourcing & APEDA certified quality",
    about_feat2: "Global logistics & express port delivery",
    about_feat3: "Competitive container pricing & transparent terms",
    stats_title: "Export Track Record",
    stat_exp: "Years Experience",
    stat_countries: "Export Countries",
    stat_shipments: "Metric Tons Exported",
    stat_clients: "Global Importers",

    products_title: "Our Export Product Portfolio",
    products_subtitle: "Browse premium grade Indian export commodities with full HS codes & specifications",
    tab_all: "All Products",
    tab_agro: "Agro Commodities",
    tab_used: "Used Machinery",
    tab_new: "New Machinery",
    tab_ind: "Industrial & Fasteners",
    tab_eco: "Eco Packaging",
    tab_apparel: "Apparel & Textiles",
    btn_add_prod: "+ Add Product",
    btn_edit: "✏️ Edit",
    btn_delete: "🗑️ Delete",
    admin_title: "🔐 Admin Access Verification",
    admin_desc: "Please enter your 4-digit Admin PIN to modify products, hero content, or branch offices.",
    btn_login: "Unlock Admin Control Panel",

    cert_title: "Accreditations & Certifications",
    cert_sub: "Verified export credentials, official government registrations, and quality compliance documents.",
    cert_subtitle: "Verified export credentials, official government registrations, and quality compliance documents.",
    cert_view: "🔍 View Document",
    cert_edit: "✏️ Edit Details / File",

    branch_sec_title: "Global Office Network",
    branch_sec_sub: "Contact our representatives worldwide",

    global_title: "Global Export Destinations",
    global_sub: "Supplying premium products across major international trade hubs.",
    global_subtitle: "Supplying premium products across major international trade hubs.",
    region_me: "📍 Middle East (UAE, KSA, Oman)",
    region_eu: "📍 Europe (UK, Germany, Netherlands)",
    region_us: "📍 Americas (USA, Canada, Brazil)",
    region_asia: "📍 Asia-Pacific (Singapore, Malaysia)",
    dest_middle_east: "Middle East (UAE, Saudi Arabia, Oman, Qatar)",
    dest_europe: "Europe (UK, Germany, Netherlands, France)",
    dest_americas: "Americas (USA, Canada, Brazil)",
    dest_asia: "Southeast Asia (Singapore, Malaysia, Vietnam)",
    dest_africa: "Africa (Egypt, Kenya, South Africa)",

    contact_title: "Get In Touch With Us",
    contact_subtitle: "Have questions about export specs, container pricing, or shipping schedules?",
    contact_addr_title: "Headquarters Address",
    contact_addr: "Atulbhai Ishwarbhai Patel, 201, Safari Complex, Surat-Navsari Main Road, Near Bhestan Canal BRTS Bus Stand, Bhestan, Surat - 395023, Gujarat, India",
    contact_phone_title: "Export Desk & WhatsApp",
    contact_email_title: "Email Inquiries",
    btn_wa: "Chat on WhatsApp",
    rfq_title: "Request Official Quotation (RFQ)",
    form_name: "Full Name / Business Name",
    form_phone: "Phone Number / WhatsApp",
    form_email: "Email Address",
    form_product: "Select Product Category",
    form_msg: "Requirement Details / Specifications",
    btn_rfq_submit: "Submit Quotation Request (RFQ)",

    footer_about: "Leading Indian Exporter specializing in Agro Commodities, Industrial Supplies, Machinery, and Eco Packaging.",
    footer_links: "Quick Links",
    footer_main_prods: "Main Product Categories",
    fp_turmeric: "Turmeric & Spices",
    fp_basmati: "1121 Basmati Rice",
    fp_machinery: "Industrial CNC Machinery",
    fp_bags: "Eco Jute & Non-Woven Bags",
    footer_contact: "Export Desk",
    footer_copy: "© Atsondika Global Trade. All Rights Reserved. APEDA & ISO 9001:2015 Registered Exporter."
  },
  gu: {
    tagline_top: "APEDA અને ISO પ્રમાણિત પ્રીમિયમ ગ્લોબલ એક્સપોર્ટર | સુરત, ગુજરાત",
    nav_home: "હોમ",
    nav_about: "અમારા વિશે",
    nav_products: "ઉત્પાદન યાદી",
    nav_calc: "કેલ્ક્યુલેટર",
    nav_quality: "પ્રમાણપત્રો",
    nav_branches: "ગ્લોબલ શાખાઓ",
    nav_contact: "સંપર્ક કરો",
    nav_quote: "ત્વરિત ક્વોટ મેળવો",

    hero_badge: "APEDA અને ISO 9001:2015 નોંધાયેલ નિકાસકાર",
    hero_title: "શ્રેષ્ઠ ગુણવત્તાવાળા એગ્રો કોમોડિટીઝ, ઔદ્યોગિક માલ અને મશીનરીને વિશ્વ સાથે જોડતી અગ્રણી કંપની",
    hero_subtitle: "મસાલા, ચોખા, તેલીબિયાં, ફાસ્ટનર્સ, નવી અને વપરાયેલી મશીનરી અને ઇકો પેકેજિંગમાં વિશિષ્ટ ભારતીય નિકાસકાર.",
    hero_btn_products: "ઉત્પાદનો જુઓ",
    hero_btn_quote: "ભાવ પત્રક મેળવો",
    btn_explore: "ઉત્પાદનો જુઓ",
    btn_rfq: "ભાવ પત્રક મેળવો (RFQ)",

    about_badge: "સુરત, ભારતથી અગ્રણી નિકાસકાર",
    about_title: "ભારતીય ભૂમિથી વૈશ્વિક બજારો સુધી ઉત્કૃષ્ટતા પહોંચાડવી",
    about_desc: "અમે સુરત, ગુજરાતમાં મુખ્ય મથક ધરાવતી એક અગ્રણી નિકાસ અને વેપાર ગૃહ છીએ. અપ્રતિમ શુદ્ધતા, કડક ગુણવત્તા ધોરણો અને સીમલેસ લોજિસ્ટિક્સ માટે કટિબદ્ધ, અમે ઉચ્ચ કક્ષાની કૃષિ પેદાશો, ઔદ્યોગિક પુરવઠો, નવી અને વપરાયેલી મશીનરી અને ટકાઉ પેકેજિંગની વૈશ્વિક સ્તરે નિકાસ કરીએ છીએ.",
    about_feat1: "સીધું ઉત્પાદન અને APEDA દ્વારા પ્રમાણિત ગુણવત્તા",
    about_feat2: "ગ્લોબલ લોજિસ્ટિક્સ અને ઝડપી બંદર ડિલિવરી",
    about_feat3: "સ્પર્ધાત્મક કિંમતો અને પારદર્શક શરતો",
    stats_title: "નિકાસ કાર્યક્ષમતા અને ક્ષમતા",
    stat_exp: "વર્ષોનો અનુભવ",
    stat_countries: "નિકાસ દેશો",
    stat_shipments: "મેટ્રિક ટન નિકાસ",
    stat_clients: "ગ્લોબલ ક્લાયન્ટ્સ",

    products_title: "અમારા નિકાસ ઉત્પાદનો",
    products_subtitle: "સંપૂર્ણ HS કોડ અને સ્પષ્ટીકરણો સાથે ભારતીય ગુણવત્તાયુક્ત ઉત્પાદનો જુઓ",
    tab_all: "તમામ ઉત્પાદનો",
    tab_agro: "એગ્રો કોમોડિટીઝ",
    tab_used: "વપરાયેલી મશીનરી",
    tab_new: "નવી મશીનરી",
    tab_ind: "ઔદ્યોગિક અને ફાસ્ટનર્સ",
    tab_eco: "ઇકો પેકેજિંગ",
    tab_apparel: "રેડિમેડ ગારમેન્ટ્સ અને કાપડ",
    btn_add_prod: "+ ઉત્પાદન ઉમેરો",
    btn_edit: "✏️ એડિટ કરો",
    btn_delete: "🗑️ ડિલીટ કરો",
    admin_title: "🔐 એડમિન એક્સેસ ચકાસણી",
    admin_desc: "ઉત્પાદનો અને વિગતોમાં ફેરફાર કરવા માટે તમારો ૪-અંકનો એડમિન PIN દાખલ કરો.",
    btn_login: "એડમિન કંટ્રોલ પેનલ અનલોક કરો",

    cert_title: "પ્રમાણપત્રો અને માન્યતાઓ",
    cert_sub: "ચકાસાયેલ નિકાસ ઓળખપત્રો, સરકારી નોંધણીઓ અને ગુણવત્તા પાલન દસ્તાવેજો.",
    cert_subtitle: "ચકાસાયેલ નિકાસ ઓળખપત્રો, સરકારી નોંધણીઓ અને ગુણવત્તા પાલન દસ્તાવેજો.",
    cert_view: "🔍 દસ્તાવેજ જુઓ",
    cert_edit: "✏️ વિગતો / ફાઈલ સુધારો",

    branch_sec_title: "ગ્લોબલ ઓફિસ નેટવર્ક",
    branch_sec_sub: "દુનિયાભરમાં અમારા પ્રતિનિધિઓનો સંપર્ક કરો",

    global_title: "વૈશ્વિક નિકાસ સ્થળો",
    global_sub: "મુખ્ય આંતરરાષ્ટ્રીય વેપાર કેન્દ્રો પર પ્રીમિયમ ઉત્પાદનોનો પુરવઠો.",
    global_subtitle: "મુખ્ય આંતરરાષ્ટ્રીય વેપાર કેન્દ્રો પર પ્રીમિયમ ઉત્પાદનોનો પુરવઠો.",
    region_me: "📍 મધ્ય પૂર્વ (UAE, સાઉદી, ઓમાન)",
    region_eu: "📍 યુરોપ (UK, જર્મની, નેધરલેન્ડ)",
    region_us: "📍 અમેરિકા (USA, કેનેડા, બ્રાઝિલ)",
    region_asia: "📍 એશિયા-પેસિફિક (સિંગાપોર, મલેશિયા)",
    dest_middle_east: "મધ્ય પૂર્વ (UAE, સાઉદી અરેબિયા, ઓમાન, કતાર)",
    dest_europe: "યુરોપ (UK, જર્મની, નેધરલેન્ડ, ફ્રાન્સ)",
    dest_americas: "અમેરિકા (USA, કેનેડા, બ્રાઝિલ)",
    dest_asia: "દક્ષિણપૂર્વ એશિયા (સિંગાપોર, મલેશિયા, વિયેતનામ)",
    dest_africa: "આફ્રિકા (ઇજિપ્ત, કેન્યા, દક્ષિણ આફ્રિકા)",

    contact_title: "અમારો સંપર્ક કરો",
    contact_subtitle: "નિકાસ સ્પેસિફિકેશન, કન્ટેનર કિંમત અથવા શિપિંગ સમયપત્રક વિશે કોઈ પ્રશ્નો છે?",
    contact_addr_title: "મુખ્ય કાર્યાલયનું સરનામું",
    contact_addr: "અતુલભાઈ ઈશ્વરભાઈ પટેલ, ૨૦૧, સફારી કોમ્પ્લેક્સ, સુરત-નવસારી મેઈન રોડ, ભેસ્તાન કેનાલ BRTS બસ સ્ટેન્ડ પાસે, ભેસ્તાન, સુરત - ૩૯૫૦૨૩, ગુજરાત, ભારત",
    contact_phone_title: "નિકાસ ડેસ્ક અને વોટ્સએપ",
    contact_email_title: "ઈમેલ પૂછપરછ",
    btn_wa: "વોટ્સએપ પર ચેટ કરો",
    rfq_title: "સત્તાવાર ભાવ પત્રક મેળવો (RFQ)",
    form_name: "પૂરું નામ / કંપનીનું નામ",
    form_phone: "ફોન નંબર / વોટ્સએપ",
    form_email: "ઈમેઈલ સરનામું",
    form_product: "ઉત્પાદન કેટેગરી પસંદ કરો",
    form_msg: "જરૂરિયાતની વિગતો / સંદેશ",
    btn_rfq_submit: "ભાવ પત્રક વિનંતી મોકલો (RFQ)",

    footer_about: "મસાલા, ચોખા, ઔદ્યોગિક પુરવઠો, મશીનરી અને ઇકો પેકેજિંગમાં વિશિષ્ટ અગ્રણી ભારતીય નિકાસકાર.",
    footer_links: "ઝડપી લીંક",
    footer_main_prods: "મુખ્ય કેટેગરીઝ",
    fp_turmeric: "હળદર અને મસાલા",
    fp_basmati: "૧૧૨૧ બાસમતી ચોખા",
    fp_machinery: "ઔદ્યોગિક CNC મશીનરી",
    fp_bags: "ઇકો જૂટ અને બેગ્સ",
    footer_contact: "નિકાસ ઓફિસ",
    footer_copy: "© Atsondika Global Trade. સર્વાધિકાર સુરક્ષિત. APEDA અને ISO 9001:2015 રજિસ્ટર્ડ એક્સપોર્ટર."
  },
  hi: {
    tagline_top: "APEDA और ISO प्रमाणित प्रीमियम ग्लोबल निर्यातक | सूरत, गुजरात",
    nav_home: "होम",
    nav_about: "हमारे बारे में",
    nav_products: "उत्पाद सूची",
    nav_calc: "कैलकुलेटर",
    nav_quality: "प्रमाणपत्र",
    nav_branches: "वैश्विक कार्यालय",
    nav_contact: "संपर्क करें",
    nav_quote: "तत्काल कोट प्राप्त करें",

    hero_badge: "APEDA और ISO 9001:2015 पंजीकृत निर्यातक",
    hero_title: "प्रीमियम गुणवत्ता वाले कृषि उत्पादों, औद्योगिक सामानों और मशीनों को दुनिया से जोड़ना",
    hero_subtitle: "मसालों, चावल, तिलहन, फास्टनरों, नई और पुरानी मशीनों और इको पैकेजिंग में विशेषज्ञता वाला प्रमुख भारतीय निर्यातक।",
    hero_btn_products: "उत्पाद देखें",
    hero_btn_quote: "कोटेशन अनुरोध",
    btn_explore: "उत्पाद देखें",
    btn_rfq: "कोटेशन अनुरोध (RFQ)",

    about_badge: "सूरत, भारत से प्रमुख निर्यातक",
    about_title: "भारतीय मिट्टी से वैश्विक बाजारों तक उत्कृष्टता पहुंचाना",
    about_desc: "हम सूरत, गुजरात में मुख्यालय वाला एक प्रमुख निर्यात और व्यापारिक घराना हैं। शुद्धता, सख्त गुणवत्ता मानकों और निर्बाध रसद के लिए प्रतिबद्ध, हम कृषि उपज, औद्योगिक आपूर्ति, नई और पुरानी मशीनों और टिकाऊ पैकेजिंग का निर्यात करते हैं।",
    about_feat1: "प्रत्यक्ष सोर्सिंग और APEDA प्रमाणित गुणवत्ता",
    about_feat2: "वैश्विक रसद और एक्सप्रेस बंदरगाह डिलीवरी",
    about_feat3: "प्रतिस्पर्धी मूल्य निर्धारण और पारदर्शी शर्तें",
    stats_title: "निर्यात ट्रैक रिकॉर्ड",
    stat_exp: "वर्षों का अनुभव",
    stat_countries: "निर्यात देश",
    stat_shipments: "मीट्रिक टन निर्यात",
    stat_clients: "वैश्विक ग्राहक",

    products_title: "हमारे निर्यात उत्पाद",
    products_subtitle: "पूर्ण एचएस कोड और विशिष्टताओं के साथ भारतीय निर्यात उत्पादों को देखें",
    tab_all: "सभी उत्पाद",
    tab_agro: "कृषि उत्पाद",
    tab_used: "पुरानी मशीनरी",
    tab_new: "नयी मशीनरी",
    tab_ind: "औद्योगिक और फास्टनरों",
    tab_eco: "इको पैकेजिंग",
    tab_apparel: "परिधान और वस्त्र",
    btn_add_prod: "+ उत्पाद जोड़ें",
    btn_edit: "✏️ एडिट करें",
    btn_delete: "🗑️ हटाएं",
    admin_title: "🔐 एडमिन एक्सेस सत्यापन",
    admin_desc: "उत्पादों और विवरणों में संशोधन करने के लिए अपना 4-अंकीय पिन दर्ज करें।",
    btn_login: "एडमिन कंट्रोल पैनल अनलॉक करें",

    cert_title: "प्रमाणपत्र और मान्यताएं",
    cert_sub: "सत्यापित निर्यात साख, आधिकारिक सरकारी पंजीकरण और गुणवत्ता अनुपालन दस्तावेज।",
    cert_subtitle: "सत्यापित निर्यात साख, आधिकारिक सरकारी पंजीकरण और गुणवत्ता अनुपालन दस्तावेज।",
    cert_view: "🔍 दस्तावेज देखें",
    cert_edit: "✏️ विवरण / फ़ाइल संपादित करें",

    branch_sec_title: "वैश्विक कार्यालय नेटवर्क",
    branch_sec_sub: "दुनिया भर में हमारे प्रतिनिधियों से संपर्क करें",

    global_title: "वैश्विक निर्यात गंतव्य",
    global_sub: "प्रमुख अंतरराष्ट्रीय व्यापार केंद्रों पर प्रीमियम उत्पादों की आपूर्ति।",
    global_subtitle: "प्रमुख अंतरराष्ट्रीय व्यापार केंद्रों पर प्रीमियम उत्पादों की आपूर्ति।",
    region_me: "📍 मध्य पूर्व (यूएई, सऊदी, ओमान)",
    region_eu: "📍 यूरोप (यूके, जर्मनी, नीदरलैंड)",
    region_us: "📍 अमेरिका (यूएसए, कनाडा, ब्राजील)",
    region_asia: "📍 एशिया-प्रशांत (सिंगापुर, मलेशिया)",
    dest_middle_east: "मध्य पूर्व (यूएई, सऊदी अरब, ओमान, कतर)",
    dest_europe: "यूरोप (यूके, जर्मनी, नीदरलैंड, फ्रांस)",
    dest_americas: "अमेरिका (यूएसए, कनाडा, ब्राजील)",
    dest_asia: "दक्षिण पूर्व एशिया (सिंगापुर, मलेशिया, वियतनाम)",
    dest_africa: "अफ्रीका (मिस्र, केन्या, दक्षिण अफ्रीका)",

    contact_title: "हमसे संपर्क करें",
    contact_subtitle: "निर्यात विनिर्देशों, कंटेनर मूल्य निर्धारण या शिपिंग समय सारणी के बारे में प्रश्न हैं?",
    contact_addr_title: "मुख्यालय का पता",
    contact_addr: "अतुलभाई ईश्वरभाई पटेल, 201, सफारी कॉम्प्लेक्स, सूरत-नवसारी मुख्य मार्ग, भेस्तान नहर बीआरटीएस बस स्टैंड के पास, भेस्तान, सूरत - 395023, गुजरात, भारत",
    contact_phone_title: "निर्यात डेस्क और व्हाट्सएप",
    contact_email_title: "ईमेल पूछताछ",
    btn_wa: "व्हाट्सएप पर चैट करें",
    rfq_title: "आधिकारिक कोटेशन अनुरोध (RFQ)",
    form_name: "पूरा नाम / कंपनी का नाम",
    form_phone: "फोन नंबर / व्हाट्सएप",
    form_email: "ईमेल पता",
    form_product: "उत्पाद श्रेणी चुनें",
    form_msg: "आवश्यकता विवरण / संदेश",
    btn_rfq_submit: "कोटेशन अनुरोध भेजें (RFQ)",

    footer_about: "कृषि उत्पादों, औद्योगिक आपूर्ति, मशीनों और इको पैकेजिंग में विशेषज्ञता वाला प्रमुख भारतीय निर्यातक।",
    footer_links: "त्वरित लिंक",
    footer_main_prods: "मुख्य श्रेणियां",
    fp_turmeric: "हल्दी और मसाले",
    fp_basmati: "1121 बासमती चावल",
    fp_machinery: "औद्योगिक सीएनसी मशीनरी",
    fp_bags: "इको जूट बैग",
    footer_contact: "निर्यात कार्यालय",
    footer_copy: "© Atsondika Global Trade. सर्वाधिकार सुरक्षित। APEDA और ISO 9001:2015 पंजीकृत निर्यातक।"
  },
  fr: {
    tagline_top: "Exportateur Mondial de Qualité Supérieure Certifié APEDA & ISO | Surat, Gujarat",
    nav_home: "Accueil",
    nav_about: "À Propos",
    nav_products: "Catalogue Produits",
    nav_calc: "Calculateurs",
    nav_quality: "Certifications",
    nav_branches: "Bureaux Mondiaux",
    nav_contact: "Contactez-nous",
    nav_quote: "Obtenir un Devis",

    hero_badge: "EXPORTATEUR ENREGISTRÉ APEDA & ISO 9001:2015",
    hero_title: "Connecter les produits agricoles et industriels de qualité supérieure au monde",
    hero_subtitle: "Exportateur indien agréé spécialisé dans les épices, le riz, les machines et les emballages écologiques.",
    hero_btn_products: "Explorer les produits",
    hero_btn_quote: "Demander un devis",
    btn_explore: "Explorer les produits",
    btn_rfq: "Demander un Devis (RFQ)",

    about_badge: "Premier Exportateur de Surat, Inde",
    about_title: "Offrir l'excellence du sol indien aux marchés mondiaux",
    about_desc: "Nous sommes une maison d'exportation et de commerce de premier plan basée à Surat, Gujarat. Engagés envers une pureté absolue, des protocoles de qualité stricts et une logistique fluide.",
    about_feat1: "Approvisionnement direct & qualité certifiée APEDA",
    about_feat2: "Logistique mondiale & livraison portuaire express",
    about_feat3: "Tarification compétitive des conteneurs & conditions transparentes",
    stats_title: "Bilan des Exportations",
    stat_exp: "Années d'expérience",
    stat_countries: "Pays d'exportation",
    stat_shipments: "Tonnes métriques exportées",
    stat_clients: "Clients mondiaux",

    products_title: "Notre Portefeuille d'Exportation",
    products_subtitle: "Parcourez les produits indiens avec codes SH complets et spécifications",
    tab_all: "Tous les Produits",
    tab_agro: "Produits Agricoles",
    tab_used: "Machines d'Occasion",
    tab_new: "Nouvelles Machines",
    tab_ind: "Industriel & Fixations",
    tab_eco: "Emballage Écologique",
    tab_apparel: "Vêtements & Textiles",
    btn_add_prod: "+ Ajouter Produit",
    btn_edit: "✏️ Modifier",
    btn_delete: "🗑️ Supprimer",
    admin_title: "🔐 Vérification d'Accès Administrateur",
    admin_desc: "Veuillez saisir votre code PIN à 4 chiffres pour modifier les produits.",
    btn_login: "Déverrouiller le Panneau d'Administration",

    cert_title: "Accréditations & Certifications",
    cert_sub: "Titres d'exportation vérifiés, enregistrements officiels et conformité.",
    cert_subtitle: "Titres d'exportation vérifiés, enregistrements officiels et conformité.",
    cert_view: "🔍 Voir le document",
    cert_edit: "✏️ Modifier les détails",

    branch_sec_title: "Réseau de Bureaux Mondiaux",
    branch_sec_sub: "Contactez nos représentants dans le monde entier",

    global_title: "Destinations d'Expédition Mondiales",
    global_sub: "Fourniture de produits de qualité supérieure sur les principaux marchés.",
    global_subtitle: "Fourniture de produits de qualité supérieure sur les principaux marchés.",
    region_me: "📍 Moyen-Orient (Émirats, Arabie, Oman)",
    region_eu: "📍 Europe (Royaume-Uni, Allemagne, Pays-Bas)",
    region_us: "📍 Amériques (USA, Canada, Brésil)",
    region_asia: "📍 Asie-Pacifique (Singapour, Malaisie)",
    dest_middle_east: "Moyen-Orient (Émirats, Arabie Saoudite, Oman, Qatar)",
    dest_europe: "Europe (Royaume-Uni, Allemagne, Pays-Bas, France)",
    dest_americas: "Amériques (USA, Canada, Brésil)",
    dest_asia: "Asie du Sud-Est (Singapour, Malaisie, Vietnam)",
    dest_africa: "Afrique (Égypte, Kenya, Afrique du Sud)",

    contact_title: "Contactez-nous",
    contact_subtitle: "Des questions sur les spécifications d'exportation ou les tarifs?",
    contact_addr_title: "Adresse du Siège",
    contact_addr: "Atulbhai Ishwarbhai Patel, 201, Safari Complex, Surat-Navsari Main Road, Bhestan, Surat - 395023, Gujarat, Inde",
    contact_phone_title: "Bureau Exportation & WhatsApp",
    contact_email_title: "Demandes par Email",
    btn_wa: "Discuter sur WhatsApp",
    rfq_title: "Demande de Devis Officiel (RFQ)",
    form_name: "Nom complet / Raison sociale",
    form_phone: "Numéro de Téléphone / WhatsApp",
    form_email: "Adresse Email",
    form_product: "Sélectionner la Catégorie",
    form_msg: "Détails de la demande / Message",
    btn_rfq_submit: "Soumettre la Demande de Devis",

    footer_about: "Exportateur indien spécialisé dans les produits agricoles et industriels.",
    footer_links: "Liens Rapides",
    footer_main_prods: "Catégories Principales",
    fp_turmeric: "Curcuma & Épices",
    fp_basmati: "Riz Basmati 1121",
    fp_machinery: "Machines CNC Industrielles",
    fp_bags: "Sacs Écologiques en Jute",
    footer_contact: "Bureau Export",
    footer_copy: "© Atsondika Global Trade. Tous droits réservés. Exportateur APEDA & ISO 9001:2015."
  }
};

export const seaFreightPorts = [
  { origin: 'Mundra Port (INMUN)', dest: 'Jebel Ali, Dubai (AEJEA)', region: 'Middle East', days: '4 - 5 Days', freq: 'Daily Direct Vessel', mode: 'Sea Freight' },
  { origin: 'Hazira / Surat Port (INHZA)', dest: 'Jebel Ali, Dubai (AEJEA)', region: 'Middle East', days: '3 - 4 Days', freq: 'Direct Express', mode: 'Sea Freight' },
  { origin: 'Nhava Sheva / JNPT (INNSA)', dest: 'Dammam, Saudi Arabia (SADMM)', region: 'Middle East', days: '6 - 7 Days', freq: '3 Vessels / Week', mode: 'Sea Freight' },
  { origin: 'Mundra Port (INMUN)', dest: 'Jeddah Islamic Port (SAJED)', region: 'Middle East', days: '8 - 10 Days', freq: 'Weekly Service', mode: 'Sea Freight' },
  { origin: 'Nhava Sheva / JNPT (INNSA)', dest: 'Hamad Port, Qatar (QAQAT)', region: 'Middle East', days: '5 - 6 Days', freq: '2 Vessels / Week', mode: 'Sea Freight' },
  { origin: 'Mundra Port (INMUN)', dest: 'Hamburg, Germany (DEHAM)', region: 'Europe', days: '16 - 18 Days', freq: 'Weekly Express', mode: 'Sea Freight' },
  { origin: 'Hazira / Surat Port (INHZA)', dest: 'Rotterdam, Netherlands (NLRTM)', region: 'Europe', days: '17 - 19 Days', freq: 'Weekly Direct', mode: 'Sea Freight' },
  { origin: 'Nhava Sheva / JNPT (INNSA)', dest: 'Felixtowe, UK (GBFXT)', region: 'Europe', days: '18 - 20 Days', freq: 'Weekly Express', mode: 'Sea Freight' },
  { origin: 'Mundra Port (INMUN)', dest: 'Antwerp, Belgium (BEANR)', region: 'Europe', days: '16 - 18 Days', freq: 'Weekly Direct', mode: 'Sea Freight' },
  { origin: 'Nhava Sheva / JNPT (INNSA)', dest: 'Port of New York / New Jersey (USNYC)', region: 'USA / North America', days: '20 - 22 Days', freq: 'Direct Weekly Vessel', mode: 'Sea Freight' },
  { origin: 'Mundra Port (INMUN)', dest: 'Savannah, Georgia (USSAV)', region: 'USA / North America', days: '22 - 24 Days', freq: 'Weekly Express', mode: 'Sea Freight' },
  { origin: 'Hazira / Surat Port (INHZA)', dest: 'Los Angeles, California (USLAX)', region: 'USA / North America', days: '26 - 28 Days', freq: 'Transpacific Weekly', mode: 'Sea Freight' },
  { origin: 'Mundra Port (INMUN)', dest: 'Singapore Port (SGSIN)', region: 'Southeast Asia', days: '6 - 7 Days', freq: 'Daily Direct Vessel', mode: 'Sea Freight' },
  { origin: 'Nhava Sheva / JNPT (INNSA)', dest: 'Port Klang, Malaysia (MYPKG)', region: 'Southeast Asia', days: '7 - 8 Days', freq: '3 Vessels / Week', mode: 'Sea Freight' },
  { origin: 'Hazira / Surat Port (INHZA)', dest: 'Laem Chabang, Thailand (THLCH)', region: 'Southeast Asia', days: '9 - 11 Days', freq: 'Weekly Direct', mode: 'Sea Freight' },
  { origin: 'Mundra Port (INMUN)', dest: 'Mombasa, Kenya (KEMBA)', region: 'Africa', days: '11 - 13 Days', freq: 'Weekly Vessel', mode: 'Sea Freight' },
  { origin: 'Nhava Sheva / JNPT (INNSA)', dest: 'Durban, South Africa (ZADUR)', region: 'Africa', days: '14 - 16 Days', freq: 'Weekly Direct', mode: 'Sea Freight' },
  { origin: 'Mundra Port (INMUN)', dest: 'Vancouver Port (CAVAN), Canada', region: 'USA / North America', days: '22 - 25 Days', freq: 'Weekly Transpacific Vessel', mode: 'Sea Freight' },
  { origin: 'Hazira / Surat Port (INHZA)', dest: 'Montreal Port (CAMTR), Canada', region: 'USA / North America', days: '24 - 26 Days', freq: 'Weekly Direct Vessel', mode: 'Sea Freight' },
  { origin: 'Nhava Sheva / JNPT (INNSA)', dest: 'Halifax Port (CAHAL), Canada', region: 'USA / North America', days: '23 - 25 Days', freq: 'Direct Express Vessel', mode: 'Sea Freight' }
];

export const airCargoRoutes = [
  { origin: 'Surat Airport (STV)', dest: 'Dubai International (DXB)', region: 'Middle East', days: '3.5 - 4 Hours', freq: 'Daily Direct / Express', mode: 'Air Cargo' },
  { origin: 'Ahmedabad Airport (AMD)', dest: 'Sharjah International (SHJ)', region: 'Middle East', days: '4 Hours', freq: 'Daily Express Air Cargo', mode: 'Air Cargo' },
  { origin: 'Mumbai Airport (BOM)', dest: 'Jebel Ali / Dubai DWC (DWC)', region: 'Middle East', days: '3.5 Hours', freq: 'Multiple Daily Cargo Flights', mode: 'Air Cargo' },
  { origin: 'Mumbai Airport (BOM)', dest: 'Riyadh / King Khalid (RUH)', region: 'Middle East', days: '5 Hours', freq: 'Daily Direct Flight', mode: 'Air Cargo' },
  { origin: 'Delhi Airport (DEL)', dest: 'Jeddah / King Abdulaziz (JED)', region: 'Middle East', days: '5.5 Hours', freq: 'Saudia Cargo Daily', mode: 'Air Cargo' },
  { origin: 'Mumbai Airport (BOM)', dest: 'London Heathrow (LHR)', region: 'Europe', days: '9.5 Hours', freq: 'Direct Daily Flights', mode: 'Air Cargo' },
  { origin: 'Delhi Airport (DEL)', dest: 'Frankfurt Airport (FRA)', region: 'Europe', days: '8.5 Hours', freq: 'Lufthansa Cargo Daily', mode: 'Air Cargo' },
  { origin: 'Ahmedabad Airport (AMD)', dest: 'Amsterdam Schiphol (AMS)', region: 'Europe', days: '10 Hours', freq: 'Express Perishable Cargo', mode: 'Air Cargo' },
  { origin: 'Mumbai Airport (BOM)', dest: 'Paris Charles de Gaulle (CDG)', region: 'Europe', days: '9 Hours', freq: 'Air France Cargo Daily', mode: 'Air Cargo' },
  { origin: 'Mumbai Airport (BOM)', dest: 'New York (JFK / EWR)', region: 'USA / North America', days: '15.5 Hours', freq: 'Air India Direct Flight', mode: 'Air Cargo' },
  { origin: 'Delhi Airport (DEL)', dest: 'Chicago O\'Hare (ORD)', region: 'USA / North America', days: '16 Hours', freq: 'Direct Daily Express', mode: 'Air Cargo' },
  { origin: 'Mumbai Airport (BOM)', dest: 'Toronto Pearson (YYZ)', region: 'USA / North America', days: '16.5 Hours', freq: 'Air Canada / Air India Cargo', mode: 'Air Cargo' },
  { origin: 'Mumbai Airport (BOM)', dest: 'Singapore Changi (SIN)', region: 'Southeast Asia', days: '5 Hours', freq: 'Singapore Airlines Cargo', mode: 'Air Cargo' },
  { origin: 'Surat / Ahmedabad (AMD)', dest: 'Kuala Lumpur (KUL)', region: 'Southeast Asia', days: '5.5 Hours', freq: 'Batik / Malaysia Airlines Cargo', mode: 'Air Cargo' },
  { origin: 'Delhi Airport (DEL)', dest: 'Bangkok Suvarnabhumi (BKK)', region: 'Southeast Asia', days: '4.5 Hours', freq: 'Thai Airways Daily Cargo', mode: 'Air Cargo' }
];

export const defaultCompanyProfiles = [
  {
    id: "comp_1",
    name: "Atsondika Global Trade",
    tagline: "GLOBAL TRADING HOUSE & EXPORT HOUSE",
    logo: "images/logo.png",
    address: "Surat, Gujarat, India - 395006",
    phone: "+91 78619 97755",
    email: "info@atsondikaglobaltrade.com",
    apedaReg: "APEDA/REG/SURAT/2026/8942",
    gstin: "24AAACA0000A1Z5",
    bankDetails: {
      bankName: "HDFC Bank Ltd",
      accountName: "Atsondika Global Trade",
      accountNumber: "50200088997755",
      swiftCode: "HDFCINBBXXX",
      ifscCode: "HDFC0000240",
      branch: "Ring Road Branch, Surat, Gujarat, India",
      intermediaryBank: "CitiBank N.A. New York (SWIFT: CITIUS33)"
    }
  },
  {
    id: "comp_2",
    name: "ADIDEV AGRO EXPORTS & COMMODITIES",
    tagline: "PREMIUM AGRICULTURAL PRODUCE & SPICES EXPORTER",
    logo: "images/logo.png",
    address: "APMC Market Yard & Export Hub, Surat, Gujarat - 395006",
    phone: "+91 78619 97755",
    email: "agro@adidevexport.com",
    apedaReg: "APEDA/AGRO/SURAT/2026/1102",
    gstin: "24ABCCA1111B1Z2",
    bankDetails: {
      bankName: "State Bank of India",
      accountName: "ADIDEV AGRO EXPORTS & COMMODITIES",
      accountNumber: "409988776655",
      swiftCode: "SBININBBXXX",
      ifscCode: "SBIN0001234",
      branch: "Main Branch, Surat, Gujarat, India",
      intermediaryBank: ""
    }
  },
  {
    id: "comp_3",
    name: "ADIDEV INDUSTRIAL",
    tagline: "HEAVY MACHINERY, CNC EQUIPMENT & FASTENERS",
    logo: "images/logo.png",
    address: "GIDC Industrial Estate, Hazira / Surat, Gujarat - 394270",
    phone: "+91 78619 97755",
    email: "machinery@adidevexport.com",
    apedaReg: "ISO 9001:2015/IND/8849",
    gstin: "24ACDCA2222C1Z9",
    bankDetails: {
      bankName: "ICICI Bank Ltd",
      accountName: "ADIDEV INDUSTRIAL",
      accountNumber: "001105009988",
      swiftCode: "ICICINBBXXX",
      ifscCode: "ICIC0000011",
      branch: "GIDC Hazira Branch, Surat, Gujarat, India",
      intermediaryBank: ""
    }
  },
  {
    id: "comp_4",
    name: "Shree System Tec",
    tagline: "INDUSTRIAL AUTOMATION, ELECTRONICS & SUSTAINABLE SOLUTIONS",
    logo: "images/logo.png",
    address: "Textile & Packaging Park, Surat, Gujarat - 395002",
    phone: "+91 78619 97755",
    email: "info@shreesystemtec.com",
    apedaReg: "ISO 9001:2015/SST/5501",
    gstin: "24ADECA3333D1Z4",
    bankDetails: {
      bankName: "Axis Bank Ltd",
      accountName: "SHREE SYSTEM TEC",
      accountNumber: "921020033445566",
      swiftCode: "AXISINBBXXX",
      ifscCode: "UTIB0000123",
      branch: "Textile Market Branch, Surat, Gujarat, India",
      intermediaryBank: ""
    }
  }
];
