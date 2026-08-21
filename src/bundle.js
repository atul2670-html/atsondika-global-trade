// Original Standalone Clean UTF8 Bundle Script
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'hi', name: 'હિन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

const translations = {
  en: {
    tagline_top: "APEDA & ISO Certified Premium Global Exporter | Surat, Gujarat",
    nav_home: "Home",
    nav_about: "About Us",
    nav_products: "Products",
    nav_quality: "Quality & Certifications",
    nav_global: "Global Reach",
    nav_contact: "Contact Us",
    nav_quote: "Get Quote",

    hero_title_1: "Connecting Premium Quality",
    hero_title_2: "Agro Commodities, Industrial Goods & Machinery",
    hero_title_3: "To The World",
    hero_subtitle: "Trusted Indian Exporter specializing in Spices, Rice, Oilseeds, Industrial Fasteners, New & Used Machinery, Eco Packaging, & Textiles across 40+ countries.",
    hero_btn_products: "Explore Products",
    hero_btn_quote: "Request Quotation",

    about_badge: "Leading Exporter from Surat, India",
    about_title: "Delivering Excellence from Indian Soil to Global Markets",
    about_desc: "We are a premier export and trading house headquartered in Surat, Gujarat. Committed to uncompromised purity, strict quality protocols, and seamless logistics, we export top-tier agricultural produce, industrial supplies, new and used machinery, and sustainable packaging globally.",
    
    feature_1_title: "APEDA & FSSAI Certified",
    feature_1_desc: "Direct sourcing from inspected farms adhering to strict phytosanitary guidelines.",
    feature_2_title: "Global Logistics Network",
    feature_2_desc: "Freight forwarding and container shipping across Asia, Middle East, Europe, and Americas.",
    feature_3_title: "New & Used Machinery Export",
    feature_3_desc: "Tested industrial CNC machinery, textile looms, agro sorting & packaging machines.",

    stat_years: "12+ Years",
    stat_years_label: "Export Excellence",
    stat_countries: "45+ Countries",
    stat_countries_label: "Global Reach",
    stat_tons: "50,000+ MT",
    stat_tons_label: "Annual Shipments",
    stat_clients: "350+ Clients",
    stat_clients_label: "Satisfied Importers",

    products_title: "Our Export Product Portfolio",
    products_subtitle: "Rigorous quality inspection, international packaging standards, and timely shipment.",
    tab_all: "All Products",
    tab_agro: "Agro Commodities",
    tab_used_machinery: "Used Machinery (વપરાયેલ)",
    tab_new_machinery: "New Machinery (નવા)",
    tab_industrial: "Industrial & Hardware",
    tab_packaging: "Eco Packaging",
    tab_apparel: "Apparel & Textiles",

    cert_title: "Accreditations & Certifications",
    cert_subtitle: "Verified export credentials, official government registrations, and quality compliance documents.",
    cert_view: "🔍 View Document",
    cert_edit: "✏️ Edit Details / File",

    global_title: "Global Export Destinations",
    global_subtitle: "Supplying premium products across major international trade hubs.",
    dest_middle_east: "Middle East (UAE, Saudi Arabia, Oman, Qatar)",
    dest_europe: "Europe (UK, Germany, Netherlands, France)",
    dest_americas: "Americas (USA, Canada, Brazil)",
    dest_asia: "Southeast Asia (Singapore, Malaysia, Vietnam)",
    dest_africa: "Africa (Egypt, Kenya, South Africa)",

    contact_title: "Get In Touch With Us",
    contact_subtitle: "Have questions about export specs, container pricing, or shipping schedules?",
    contact_addr_title: "Headquarters Address",
    contact_addr_val: "Atulbhai Ishwarbhai Patel, 201, Safari Complex, Surat-Navsari Main Road, Near Bhestan Canal BRTS Bus Stand, Bhestan, Surat - 395023, Gujarat, India",
    contact_phone_title: "Export Desk & WhatsApp",
    contact_email_title: "Email Inquiries",

    form_name: "e.g. Atulbhai Ishwarbhai Patel / Rajesh Patel",
    form_email: "e.g. atul2670@gmail.com",
    form_phone: "+91 78619 97755",
    form_country: "e.g. United Arab Emirates, France",
    form_product: "Select Product Category",
    form_quantity: "e.g. 20 Metric Tons / 1 Unit",
    form_message: "Mention specs, packing preference, target delivery port...",
    form_submit: "Submit RFQ Request",

    modal_title: "Request Export Quotation",
    modal_subtitle: "Fill in your requirements and our export team will contact you within 24 hours.",

    btn_inquire: "Inquire Now",
    btn_manage_photos: "📷 Multi Photos",
    btn_manage_sub_products: "🌿 Sub-Products",
    sub_products_label: "Sub-Products & Variants:",
    upload_modal_title: "Product Photo Gallery & Management",
    existing_photos_title: "Current Product Photos (Click ✕ to delete photo):",
    upload_or_url: "Or Add Photo Web URL",
    upload_save: "💾 Save Gallery (ગેલરી સેવ કરો)",

    footer_tagline: "Your Premier Indian Export Partner for Agro Commodities, Industrial Supplies, Machinery & Packaging.",
    footer_quick_links: "Quick Navigation",
    footer_products: "Product Lines",
    footer_legal: "© 2026 ADIDEV SMART SOLUTION. All rights reserved. Registered Export House of India."
  },
  gu: {
    tagline_top: "APEDA અને ISO સર્ટિફાઇડ પ્રીમિયમ ગ્લોબલ એક્સપોર્ટર | સુરત, ગુજરાત",
    nav_home: "હોમ",
    nav_about: "અમારા વિશે",
    nav_products: "પ્રોડક્ટ્સ",
    nav_quality: "ક્વોલિટી અને સર્ટિફિકેટ્સ",
    nav_global: "ગ્લોબલ રીચ",
    nav_contact: "સંપર્ક કરો",
    nav_quote: "ભાવ મેળવો",

    hero_title_1: "શ્રેષ્ઠ ગુણવત્તાયુક્ત",
    hero_title_2: "એગ્રો કોમોડિટીઝ, ઔદ્યોગિક માલ અને મશીનરી",
    hero_title_3: "વિશ્વભરમાં નિકાસ",
    hero_subtitle: "૪૦+ દેશોમાં મસાલા, બાસમતી ચોખા, તેલીબિયાં, ઔદ્યોગિક ફાસ્ટનર્સ, નવા અને વપરાયેલ મશીનરી અને ઇકો પેકેજિંગના વિશ્વસનીય ભારતીય નિકાસકાર.",
    hero_btn_products: "પ્રોડક્ટ્સ જુઓ",
    hero_btn_quote: "ક્વોટેશન રિક્વેસ્ટ કરો",

    about_badge: "સુરત, ભારતથી અગ્રણી નિકાસકાર",
    about_title: "ભારતીય ભૂમિથી વૈશ્વિક બજારો સુધી શ્રેષ્ઠતા પહોંચાડવી",
    about_desc: "અમે સુરત, ગુજરાતમાં હેડક્વાર્ટર ધરાવતી અગ્રણી એક્સપોર્ટ અને ટ્રેડિંગ હાઉસ છીએ. અપ્રતિમ શુદ્ધતા અને ચોક્કસ ગુણવત્તા માટે પ્રતિબદ્ધ રહીને અમે કૃષિ ઉત્પાદનો, ઔદ્યોગિક પુરવઠો, નવા અને જૂના મશીનરી વૈશ્વિક સ્તરે નિકાસ કરીએ છીએ.",

    feature_1_title: "APEDA અને FSSAI પ્રમાણિત",
    feature_1_desc: "ચુસ્ત ગુણવત્તા ધોરણોનું પાલન કરતા તપાસાયેલા ખેતરોમાંથી સીધું સોર્સિંગ.",
    feature_2_title: "વૈશ્વિક લોજિસ્ટિક્સ નેટવર્ક",
    feature_2_desc: "એશિયા, મધ્ય પૂર્વ, યુરોપ અને અમેરિકામાં કન્ટેનર શિપિંગ.",
    feature_3_title: "નવા અને જૂના (વપરાયેલ) મશીનરી નિકાસ",
    feature_3_desc: "ચકાસાયેલ ઔદ્યોગિક CNC મશીનરી, ટેક્સટાઇલ લૂમ્સ, એગ્રો સોર્ટિંગ મશીનો.",

    stat_years: "૧૨+ વર્ષ",
    stat_years_label: "એક્સપોર્ટ અનુભવ",
    stat_countries: "૪૫+ દેશો",
    stat_countries_label: "વૈશ્વિક પહોંચ",
    stat_tons: "૫૦,૦૦૦+ MT",
    stat_tons_label: "વાર્ષિક શિપમેન્ટ",
    stat_clients: "૩૫૦+ ગ્રાહકો",
    stat_clients_label: "સંતોષકારક ઇમ્પોર્ટર્સ",

    products_title: "અમારું એક્સપોર્ટ પ્રોડક્ટ પોર્ટફોલિયો",
    products_subtitle: "કડક ગુણવત્તા તપાસ, આંતરરાષ્ટ્રીય પેકેજિંગ ધોરણો અને સમયસર શિપમેન્ટ.",
    tab_all: "બધી પ્રોડક્ટ્સ",
    tab_agro: "એગ્રો કોમોડિટીઝ",
    tab_used_machinery: "વપરાયેલ મશીનરી (જૂના)",
    tab_new_machinery: "નવી મશીનરી (નવા)",
    tab_industrial: "ઈન્ડસ્ટ્રીયલ અને હાર્ડવેર",
    tab_packaging: "ઇકો પેકેજિંગ",
    tab_apparel: "કાપડ અને ટેક્સટાઇલ",

    cert_title: "એક્રેડિટેશન્સ અને સર્ટિફિકેશન્સ",
    cert_subtitle: "ચકાસાયેલ એક્સપોર્ટ ક્રિડેન્શિયલ્સ અને સરકારી નોંધણી સર્ટિફિકેટ્સ.",
    cert_view: "🔍 સર્ટિફિકેટ જુઓ",
    cert_edit: "✏️ ફોટો/વિગત બદલો",

    global_title: "વૈશ્વિક નિકાસ દેશો",
    global_subtitle: "મુખ્ય આંતરરાષ્ટ્રીય વેપાર કેન્દ્રો પર પ્રીમિયમ પ્રોડક્ટ્સ સપ્લાય કરીએ છીએ.",
    dest_middle_east: "મિડલ ઈસ્ટ (UAE, સાઉદી અરેબિયા, ઓમાન, કતાર)",
    dest_europe: "યુરોપ (UK, જર્મની, નેધરલેન્ડ, ફ્રાન્સ)",
    dest_americas: "અમેરિકા (USA, કેનેડા, બ્રાઝિલ)",
    dest_asia: "સાઉથ ઈસ્ટ એશિયા (સિંગાપોર, મલેશિયા, વિયેટનામ)",
    dest_africa: "આફ્રિકા (ઈજિપ્ત, કેન્યા, દક્ષિણ આફ્રિકા)",

    contact_title: "અમારો સંપર્ક કરો",
    contact_subtitle: "ભાવ પત્રક, કન્ટેનર પેકિંગ કે શિપિંગ સમય વિશે પ્રશ્નો છે?",
    contact_addr_title: "મુખ્ય ઓફિસ સરનામું",
    contact_addr_val: "અતુલભાઈ ઈશ્વરભાઈ પટેલ, ૨૦૧, સફારી કોમ્પલેક્ષ, સુરત-નવસારી મેઈન રોડ, ભેસ્તાન નહેર બી. આર. ટી. એસ. બસ સ્ટેન્ડ પાસે, ભેસ્તાન, સુરત - ૩૯૫૦૨૩, ગુજરાત, ભારત",
    contact_phone_title: "એક્સપોર્ટ ડેસ્ક અને WhatsApp",
    contact_email_title: "ઈમેઈલ ઈન્ક્વાયરી",

    form_name: "દા.ત. અતુલભાઈ ઈશ્વરભાઈ પટેલ / રાજેશ પટેલ",
    form_email: "દા.ત. atul2670@gmail.com",
    form_phone: "+91 78619 97755",
    form_country: "દા.ત. યુનાઈટેડ અરબ અમીરાત, ફ્રાન્સ",
    form_product: "પ્રોડક્ટ કેટેગરી સિલેક્ટ કરો",
    form_quantity: "દા.ત. ૨૦ મેટ્રિક ટન / ૧ મશીન",
    form_message: "વિગતો લખો, પેકિંગ પસંદગી, ટાર્ગેટ ડિલિવરી પોર્ટ...",
    form_submit: "RFQ રિક્વેસ્ટ મોકલો",

    modal_title: "એક્સપોર્ટ ક્વોટેશન રિક્વેસ્ટ",
    modal_subtitle: "તમારી જરૂરિયાતો જણાવો અને અમારી ટીમ ૨૪ કલાકમાં સંપર્ક કરશે.",

    btn_inquire: "ભાવ પૂછો (Inquire)",
    btn_manage_photos: "📷 મલ્ટી ફોટો",
    upload_modal_title: "પ્રોડક્ટ ફોટો ગેલેરી અને મેનેજમેન્ટ",
    existing_photos_title: "હાલના ફોટા (ડિલીટ કરવા ✕ પર ક્લિક કરો):",
    upload_or_url: "અથવા ફોટો Web URL મૂકો",
    upload_save: "💾 સેવ ગેલેરી",

    footer_tagline: "એગ્રો કોમોડિટીઝ, ઈન્ડસ્ટ્રીયલ માલ, મશીનરી અને પેકેજિંગ માટે તમારું વિશ્વસનીય ભારતીય ભાગીદાર.",
    footer_quick_links: "ઝડપી નેવિગેશન",
    footer_products: "પ્રોડક્ટ લાઇન",
    footer_legal: "© ૨૦૨૬ ADIDEV SMART SOLUTION. સર્વાધિકાર સુરક્ષિત."
  },
  hi: {
    tagline_top: "APEDA और ISO प्रमाणित प्रीमियम ग्लोबल एक्सपोर्टर | सूरत, गुजरात",
    nav_home: "होम",
    nav_about: "हमारे बारे में",
    nav_products: "उत्पाद",
    nav_quality: "गुणवत्ता और प्रमाण पत्र",
    nav_global: "ग्लोबल रीच",
    nav_contact: "संपर्क करें",
    nav_quote: "कोटेशन लें",

    hero_title_1: "उच्चतम गुणवत्ता वाले",
    hero_title_2: "कृषि उत्पाद, औद्योगिक सामान और मशीनरी",
    hero_title_3: "विश्वभर में निर्यात",
    hero_subtitle: "40+ देशों में मसाले, बासमती चावल, तिलहन, फास्टनर्स, नई और पुरानी मशीनरी और इको पैकेजिंग के विश्वसनीय भारतीय निर्यातक।",
    hero_btn_products: "उत्पाद देखें",
    hero_btn_quote: "कोटेशन अनुरोध करें",

    about_badge: "सूरत, भारत से प्रमुख निर्यातक",
    about_title: "भारतीय भूमि से वैश्विक बाजारों तक उत्कृष्टता पहुँचाना",
    about_desc: "हम सूरत, गुजरात में मुख्यालय वाले एक प्रमुख निर्यात और ट्रेडिंग हाउस हैं।",

    feature_1_title: "APEDA और FSSAI प्रमाणित",
    feature_1_desc: "कड़े गुणवत्ता मानकों का पालन करने वाले खेतों से सीधी आपूर्ति।",
    feature_2_title: "वैश्विक लॉजिस्टिक्स नेटवर्क",
    feature_2_desc: "एशिया, मध्य पूर्व, यूरोप और अमेरिका में फ्रेट फॉरवर्डिंग।",
    feature_3_title: "नई और प्रयुक्त (पुरानी) मशीनरी निर्यात",
    feature_3_desc: "परीक्षित औद्योगिक सीएनसी मशीनरी, कपड़ा लूम, कृषि छँटाई मशीनें।",

    stat_years: "12+ वर्ष",
    stat_years_label: "निर्यात अनुभव",
    stat_countries: "45+ देश",
    stat_countries_label: "ग्लोबल रीच",
    stat_tons: "50,000+ MT",
    stat_tons_label: "वार्षिक शिपमेंट",
    stat_clients: "350+ ग्राहक",
    stat_clients_label: "संतुष्ट आयातक",

    products_title: "हमारा निर्यात उत्पाद पोर्टफोलियो",
    products_subtitle: "सख्त गुणवत्ता निरीक्षण, अंतरराष्ट्रीय पैकेजिंग मानक और समय पर डिलीवरी।",
    tab_all: "सभी उत्पाद",
    tab_agro: "कृषि उत्पाद",
    tab_used_machinery: "पुरानी मशीनरी",
    tab_new_machinery: "नई मशीनरी",
    tab_industrial: "इंडस्ट्रियल और हार्डवेयर",
    tab_packaging: "इको पैकेजिंग",
    tab_apparel: "कपड़े और वस्त्र",

    cert_title: "मान्यताएं और प्रमाण पत्र",
    cert_subtitle: "सत्यापित निर्यात साख और सरकारी पंजीकरण दस्तावेज़।",
    cert_view: "🔍 दस्तावेज़ देखें",
    cert_edit: "✏️ विवरण बदलें",

    global_title: "वैश्विक निर्यात गंतव्य",
    global_subtitle: "प्रमुख अंतरराष्ट्रीय व्यापार केंद्रों पर प्रीमियम उत्पाद आपूर्ति।",
    dest_middle_east: "मिडिल ईस्ट (UAE, सऊदी अरब, ओमान, कतर)",
    dest_europe: "यूरोप (UK, जर्मनी, नीदरलैंड, फ्रांस)",
    dest_americas: "अमेरिका (USA, कनाडा, ब्राजील)",
    dest_asia: "दक्षिण पूर्व एशिया (सिंगापुर, मलेशिया, वियतनाम)",
    dest_africa: "अफ्रीका (मिस्र, केन्या, दक्षिण अफ्रीका)",

    contact_title: "हमसे संपर्क करें",
    contact_subtitle: "निर्यात विनिर्देशों, कंटेनर मूल्य निर्धारण के बारे में प्रश्न हैं?",
    contact_addr_title: "मुख्यालय का पता",
    contact_addr_val: "अतुलभाई ईश्वरभाई पटेल, 201, सफारी कॉम्प्लेक्स, सूरत-नवसारी मेन रोड, भेस्तान नहर बीआरटीएस बस स्टैंड के पास, भेस्तान, सूरत - 395023, गुजरात, भारत",
    contact_phone_title: "निर्यात डेस्क और व्हाट्सएप",
    contact_email_title: "ईमेल पूछताछ",

    form_name: "उदा. अतुलभाई ईश्वरभाई पटेल / राजेश पटेल",
    form_email: "उदा. atul2670@gmail.com",
    form_phone: "+91 78619 97755",
    form_country: "उदा. संयुक्त अरब अमीरात, फ्रांस",
    form_product: "उत्पाद श्रेणी चुनें",
    form_quantity: "उदा. 20 मीट्रिक टन / 1 यूनिट",
    form_message: "विवरण लिखें...",
    form_submit: "RFQ अनुरोध सबमिट करें",

    modal_title: "निर्यात कोटेशन अनुरोध",
    modal_subtitle: "अपनी आवश्यकताएं भरें और हमारी टीम 24 घंटे के भीतर संपर्क करेगी।",

    btn_inquire: "कोटेशन लें",
    btn_manage_photos: "📷 फोटो गैलरी",
    upload_modal_title: "उत्पाद फोटो गैलरी प्रबंधन",
    existing_photos_title: "वर्तमान उत्पाद तस्वीरें:",
    upload_or_url: "या फोटो वेब URL जोड़ें",
    upload_save: "💾 गैलरी सहेजें",

    footer_tagline: "कृषि उत्पादों, औद्योगिक सामानों, मशीनरी और पैकेजिंग के लिए आपका प्रमुख भारतीय भागीदार।",
    footer_quick_links: "त्वरित नेविगेशन",
    footer_products: "उत्पाद लाइनें",
    footer_legal: "© 2026 ADIDEV SMART SOLUTION. सर्वाधिकार सुरक्षित."
  },
  fr: {
    tagline_top: "Exportateur Mondial Certifié APEDA & ISO | Surat, Gujarat",
    nav_home: "Accueil",
    nav_about: "À Propos",
    nav_products: "Produits",
    nav_quality: "Qualité & Certifications",
    nav_global: "Portée Mondiale",
    nav_contact: "Contactez-nous",
    nav_quote: "Obtenir un Devis",

    hero_title_1: "Connecter la Qualité Supérieure",
    hero_title_2: "Produits Agricoles, Biens Industriels & Machines",
    hero_title_3: "Au Monde Entier",
    hero_subtitle: "Exportateur indien de confiance spécialisé dans les épices, le riz basmati, les machines et l'emballage écologique vers 40+ pays.",
    hero_btn_products: "Explorer les Produits",
    hero_btn_quote: "Demander un Devis",

    about_badge: "Premier Exportateur de Surat, Inde",
    about_title: "Livrer l'Excellence du Sol Indien aux Marchés Mondiaux",
    about_desc: "Basés à Surat, Gujarat, nous sommes une maison d'exportation et de commerce de premier plan.",

    feature_1_title: "Certifié APEDA & FSSAI",
    feature_1_desc: "Approvisionnement direct auprès de fermes inspectées selon des normes strictes.",
    feature_2_title: "Réseau Logistique Mondial",
    feature_2_desc: "Expédition par conteneur vers l'Asie, le Moyen-Orient, l'Europe et les Amériques.",
    feature_3_title: "Exportation de Machines Neuves et d'Occasion",
    feature_3_desc: "Machines CNC industrielles testées, métiers à tisser textiles.",

    stat_years: "12+ Ans",
    stat_years_label: "Excellence d'Exportation",
    stat_countries: "45+ Pays",
    stat_countries_label: "Portée Mondiale",
    stat_tons: "50 000+ TM",
    stat_tons_label: "Expéditions Annuelles",
    stat_clients: "350+ Clients",
    stat_clients_label: "Importateurs Satisfaits",

    products_title: "Notre Portefeuille de Produits d'Exportation",
    products_subtitle: "Inspection de qualité rigoureuse, normes d'emballage internationales.",
    tab_all: "Tous les Produits",
    tab_agro: "Produits Agricoles",
    tab_used_machinery: "Machines d'Occasion",
    tab_new_machinery: "Nouvelles Machines",
    tab_industrial: "Industriel & Quincaillerie",
    tab_packaging: "Emballage Écologique",
    tab_apparel: "Textile & Habillement",

    cert_title: "Accréditations & Certifications",
    cert_subtitle: "Références d'exportation vérifiées et enregistrements gouvernementaux.",
    cert_view: "🔍 Voir le Document",
    cert_edit: "✏️ Modifier les Détails",

    global_title: "Destinations d'Exportation Mondiales",
    global_subtitle: "Fourniture de produits de qualité supérieure aux grands centres commerciaux.",
    dest_middle_east: "Moyen-Orient (Émirats arabes unis, Arabie saoudite, Oman, Qatar)",
    dest_europe: "Europe (Royaume-Uni, Allemagne, Pays-Bas, France)",
    dest_americas: "Amériques (États-Unis, Canada, Brésil)",
    dest_asia: "Asie du Sud-Est (Singapour, Malaisie, Vietnam)",
    dest_africa: "Afrique (Égypte, Kenya, Afrique du Sud)",

    contact_title: "Contactez-nous",
    contact_subtitle: "Des questions sur les prix des conteneurs ou les calendriers d'expédition?",
    contact_addr_title: "Adresse du Siège Social",
    contact_addr_val: "Atulbhai Ishwarbhai Patel, 201, Safari Complex, Surat-Navsari Main Road, Near Bhestan Canal BRTS Bus Stand, Bhestan, Surat - 395023, Gujarat, Inde",
    contact_phone_title: "Bureau d'Exportation & WhatsApp",
    contact_email_title: "Demandes par E-mail",

    form_name: "ex. Atulbhai Ishwarbhai Patel / Rajesh Patel",
    form_email: "ex. atul2670@gmail.com",
    form_phone: "+91 78619 97755",
    form_country: "ex. Émirats arabes unis, France",
    form_product: "Sélectionnez la Catégorie",
    form_quantity: "ex. 20 Tonnes Métriques / 1 Unité",
    form_message: "Détails de votre demande...",
    form_submit: "Soumettre la Demande",

    modal_title: "Demande de Devis d'Exportation",
    modal_subtitle: "Remplissez vos besoins et notre équipe vous contactera dans les 24 heures.",

    btn_inquire: "Demander un Devis",
    btn_manage_photos: "📷 Galerie Photos",
    upload_modal_title: "Gestion de la Galerie Photos",
    existing_photos_title: "Photos Actuelles du Produit:",
    upload_or_url: "Ou ajoutez une URL Web",
    upload_save: "💾 Enregistrer la Galerie",

    footer_tagline: "Votre partenaire d'exportation indien privilégié pour les produits agricoles, machines et emballages.",
    footer_quick_links: "Navigation Rapide",
    footer_products: "Lignes de Produits",
    footer_legal: "© 2026 ADIDEV SMART SOLUTION. Tous droits réservés."
  }
};


const productsData = [
  {
    id: "agro-turmeric",
    category: "agro",
    image: "images/agro_spices_grains.png",
    images: [
      "images/agro_spices_grains.png",
      "images/hero_export_shipping.png"
    ],
    hsCode: "09103030",
    origin: "Erode / Nizamabad, India",
    names: {
      en: "Finger & Powder Turmeric (Curcumin 3% - 5%)",
      gu: "આખા અને પાઉડર હળદર (કર્ક્યુમિન ૩% - ૫%)",
      hi: "????? ???? ??? ????? (????????? 3% - 5%)",
      fr: "Curcuma en Racine & Poudre (Curcumine 3% - 5%)"
    },
    specs: {
      en: "Moisture: Max 10% | Purity: 99% | Natural Deep Yellow Color | Steam Sterilized",
      gu: "ભેજ: મહત્તમ ૧૦% | શુદ્ધતા: ૯૯% | કુદરતી પીળો રંગ | સ્ટીમ સ્ટેરિલાઇઝ્ડ",
      hi: "???: ?????? 10% | ???????: 99% | ????????? ???? ??? | ????? ????????????",
      fr: "Humidit�: Max 10% | Puret�: 99% | Couleur Jaune Naturel | St�rilis� � la Vapeur"
    },
    packaging: "25kg / 50kg PP Bags, Jute Bags or Kraft Bags",
    moq: "1 x 20ft Container (18 MT)",
    subProducts: [
      {
        id: "sub-turmeric-finger-3",
        names: {
          en: "Finger Turmeric (Curcumin 3%)",
          gu: "આખા હળદર ફિંગર (કર્ક્યુમિન ૩%)",
          hi: "????? ???? (????????? 3%)",
          fr: "Curcuma Racine (Curcumine 3%)"
        },
        spec: "Moisture: Max 10% | Commercial Export Grade | Deep Yellow",
        hsCode: "09103020",
        packaging: "25kg PP / Jute Bags",
        moq: "5 MT",
        image: "images/agro_spices_grains.png"
      },
      {
        id: "sub-turmeric-powder-5",
        names: {
          en: "Pure Turmeric Powder (High Curcumin 5%)",
          gu: "શુદ્ધ હળદર પાવડર (કર્ક્યુમિન ૫%)",
          hi: "????? ????? (????????? 5%)",
          fr: "Poudre de Curcuma Pur (5%)"
        },
        spec: "100 Mesh Ultra Fine | Steam Sterilized | Zero Adulteration",
        hsCode: "09103030",
        packaging: "25kg Paper / Craft Bags",
        moq: "3 MT",
        image: "images/agro_spices_grains.png"
      },
      {
        id: "sub-turmeric-lakadong",
        names: {
          en: "Organic Lakadong High-Curcumin Turmeric",
          gu: "ઓર્ગેનિક લકાડોંગ હાઈ-કર્ક્યુમિન હળદર",
          hi: "???????? ???????? ????? ?????",
          fr: "Curcuma Biologique Lakadong"
        },
        spec: "Curcumin Content: > 7.5% | Premium Medicinal Grade",
        hsCode: "09103030",
        packaging: "10kg / 25kg Export Boxes",
        moq: "1 MT",
        image: "images/agro_spices_grains.png"
      }
    ]
  },
  {
    id: "agro-basmati",
    category: "agro",
    image: "images/agro_spices_grains.png",
    images: [
      "images/agro_spices_grains.png",
      "images/eco_packaging_bags.png"
    ],
    hsCode: "10063020",
    origin: "Punjab & Haryana, India",
    names: {
      en: "1121 Premium XXL Extra Long Basmati Rice",
      gu: "૧૧૨૧ પ્રીમિયમ XXL એક્સ્ટ્રા લોંગ બાસમતી ચોખા",
      hi: "1121 ???????? XXL ????????? ????? ?????? ????",
      fr: "Riz Basmati 1121 Premium XXL Extra Long"
    },
    specs: {
      en: "Average Grain Length: 8.35mm+ | Moisture: Max 12% | Broken: Max 0.5% | Sorted & Double Polished",
      gu: "સરેરાશ લંબાઈ: ૮.૩૫ mm+ | ભેજ: મહત્તમ ૧૨% | સોર્ટકેસ અને ડબલ પોલિશ્ડ",
      hi: "?????: 8.35mm+ | ???: ?????? 12% | ????: ?????? 0.5% | ????????? ??? ??? ?????",
      fr: "Longueur du grain: 8.35mm+ | Humidit�: Max 12% | Brisures: Max 0.5% | Double Polissage"
    },
    packaging: "5kg, 10kg, 20kg Non-woven & BOPP Export Bags",
    moq: "1 x 20ft Container (25 MT)",
    subProducts: [
      {
        id: "sub-basmati-1121-steam",
        names: {
          en: "1121 Steam XXL Basmati Rice",
          gu: "૧૧૨૧ સ્ટીમ XXL બાસમતી ચોખા",
          hi: "1121 ????? ?????? ????",
          fr: "Riz Basmati 1121 Vapeur XXL"
        },
        spec: "Grain Length: 8.40mm+ | Elongation Ratio: 2.5x | Zero Aroma Loss",
        hsCode: "10063020",
        packaging: "10kg / 20kg Non-Woven Bags",
        moq: "25 MT",
        image: "images/agro_spices_grains.png"
      },
      {
        id: "sub-basmati-1121-sella",
        names: {
          en: "1121 Parboiled (Golden Sella) Basmati Rice",
          gu: "૧૧૨૧ ગોલ્ડન સેલ્લા બાસમતી ચોખા",
          hi: "1121 ?????? ???? ?????? ????",
          fr: "Riz Basmati 1121 �tuv� Golden Sella"
        },
        spec: "Grain Length: 8.35mm+ | Moisture: 11% | Ideal for Catering & Biryani",
        hsCode: "10063020",
        packaging: "20kg / 50kg PP Bags",
        moq: "25 MT",
        image: "images/agro_spices_grains.png"
      },
      {
        id: "sub-basmati-1509-steam",
        names: {
          en: "1509 Steam Extra Long Basmati Rice",
          gu: "૧૫૦૯ સ્ટીમ એક્સ્ટ્રા લોંગ બાસમતી ચોખા",
          hi: "1509 ????? ?????? ????",
          fr: "Riz Basmati 1509 Vapeur Extra Long"
        },
        spec: "Grain Length: 8.45mm+ | Sortex 100% Clean | Super Value",
        hsCode: "10063020",
        packaging: "5kg / 10kg BOPP Bags",
        moq: "25 MT",
        image: "images/agro_spices_grains.png"
      }
    ]
  },
  {
    id: "agro-cumin",
    category: "agro",
    image: "images/agro_spices_grains.png",
    images: [
      "images/agro_spices_grains.png",
      "images/hero_export_shipping.png"
    ],
    hsCode: "09093120",
    origin: "Unjha, Gujarat, India",
    names: {
      en: "Singapore / Europe Quality Cumin Seeds (Jeera)",
      gu: "સિંગાપોર / યુરોપ ક્વોલિટી જીરું (Jeera)",
      hi: "???????? / ????? ???????? ???? (Cumin Seeds)",
      fr: "Graines de Cumin Qualit� Singapour / Europe"
    },
    specs: {
      en: "Purity: 99.5% / 99.9% Machine Cleaned & Sortex Cleaned | Volatile Oil: Min 2.5%",
      gu: "???????: ??.?% / ??.?% ???? ??? ????????? ??????? | ??? ???????: ??????? ?.?%",
      hi: "???????: 99.5% / 99.9% ???? ??? ????????? ????? | ???: ??????? 2.5%",
      fr: "Puret�: 99.5% / 99.9% Nettoy� par Machine & Sortex | Huile Essentielle: Min 2.5%"
    },
    packaging: "25kg / 50kg Multi-wall Paper or PP Bags",
    moq: "1 x 20ft Container (13 MT)",
    subProducts: [
      {
        id: "sub-cumin-singapore",
        names: {
          en: "Cumin Seeds Singapore Quality 99%",
          gu: "સિંગાપોર ક્વોલિટી જીરું (૯૯% શુદ્ધ)",
          hi: "???????? ???????? ???? (99%)",
          fr: "Graines de Cumin Qualit� Singapour 99%"
        },
        spec: "Purity: 99% Machine Cleaned | Volatile Oil: Min 2.3%",
        hsCode: "09093120",
        packaging: "25kg / 50kg PP Bags",
        moq: "13 MT",
        image: "images/agro_spices_grains.png"
      },
      {
        id: "sub-cumin-europe",
        names: {
          en: "Cumin Seeds Europe Quality 99.5% Sortex",
          gu: "યુરોપ ક્વોલિટી સોર્ટકેસ જીરું (૯૯.૫%)",
          hi: "????? ???????? ????????? ???? (99.5%)",
          fr: "Graines de Cumin Qualit� Europe 99.5% Sortex"
        },
        spec: "Purity: 99.5% Sortex Cleaned | ETO Treated | Zero Pesticide Residue",
        hsCode: "09093120",
        packaging: "25kg Paper Export Bags",
        moq: "13 MT",
        image: "images/agro_spices_grains.png"
      }
    ]
  },
  {
    id: "used-cnc-machinery",
    category: "used_machinery",
    image: "images/used_industrial_machinery.png",
    images: [
      "images/used_industrial_machinery.png",
      "images/industrial_fasteners.png",
      "images/new_agro_machinery.png"
    ],
    hsCode: "84581100",
    origin: "Refurbished Export Hub, India",
    names: {
      en: "Refurbished CNC Lathe & Turning Machines (Used)",
      gu: "??????? (????) ?????? ??? ??? ??????? ??????",
      hi: "???????? (??????) ?????? ??? ??? ??????? ??????",
      fr: "Tours CNC d'Occasion Reconditionn�s"
    },
    specs: {
      en: "Condition: Fully Refurbished & Tested | Max Turning Length: 1000mm - 3000mm | Siemens / Fanuc CNC Control",
      gu: "??????: ??????? ?????? ??? ??? ??????? | ??????? ?????: ???? ???? - ???? ???? | ??????? / ????? ?????? ???????",
      hi: "??????: ?????? ??? ??????? | ??????? ?????: 1000mm - 3000mm | ?????? / ????? ?????? ???????",
      fr: "�tat: Reconditionn� et Test� | Longueur de Tournage: 1000mm - 3000mm | Commande Siemens / Fanuc"
    },
    packaging: "Export Heavy-Duty Wooden Crate Packing",
    moq: "1 Unit",
    subProducts: [
      {
        id: "sub-cnc-slantbed",
        names: {
          en: "Used Slant Bed CNC Lathe (Siemens Control)",
          gu: "??????? ??????? ??? ?????? ??? (??????? ???????)",
          hi: "?????? ?????? ??? ?????? ??? ????",
          fr: "Tour CNC d'Occasion � Banc Inclin�"
        },
        spec: "Max Turning Dia: 400mm | Spindle Speed: 4000 RPM | 8-Station Turret",
        hsCode: "84581100",
        packaging: "Seaworthy Wooden Packing",
        moq: "1 Unit",
        image: "images/used_industrial_machinery.png"
      },
      {
        id: "sub-cnc-vmc-3axis",
        names: {
          en: "Refurbished Vertical Machining Center (VMC 3-Axis)",
          gu: "??????? ??????? ??????? ?????? (VMC ?-??????)",
          hi: "?????????? ??????? ??????? ????? (VMC)",
          fr: "Centre de Usinage Vertical VMC 3 Axes"
        },
        spec: "Table Size: 1000x500mm | Fanuc Oi-MF Controller | 24 ATC Arm Type",
        hsCode: "84571010",
        packaging: "Export Wooden Box",
        moq: "1 Unit",
        image: "images/used_industrial_machinery.png"
      }
    ]
  },
  {
    id: "used-textile-looms",
    category: "used_machinery",
    image: "images/used_industrial_machinery.png",
    images: [
      "images/used_industrial_machinery.png",
      "images/hero_export_shipping.png"
    ],
    hsCode: "84463010",
    origin: "Surat Textile Hub, India",
    names: {
      en: "Used High-Speed Air Jet & Rapier Textile Looms",
      gu: "??????? (????) ???-????? ?? ??? ??? ?????? ????????? ?????",
      hi: "???????? (??????) ???-????? ??? ??? ??? ?????? ????????? ?????",
      fr: "M�tiers � Tisser d'Occasion � Jet d'Air et Rapi�re"
    },
    specs: {
      en: "Brand: Tsudakoma / Toyota / Picanol | Reed Width: 190cm - 340cm | Excellent Working Condition",
      gu: "???????: ???????? / ?????? / ??????? | ????? ??????: ??? ???? - ??? ???? | ??????? ???? ??????",
      hi: "??????: ???????? / ?????? / ??????? | ??????: 190cm - 340cm | ????? ???? ??????",
      fr: "Marque: Tsudakoma / Toyota / Picanol | Largeur: 190cm - 340cm | En Parfait �tat de Marche"
    },
    packaging: "Export Sea-Worthy Crate / Container Lashing",
    moq: "2 Units / 1x40ft Container",
    subProducts: [
      {
        id: "sub-looms-tsudakoma",
        names: {
          en: "Tsudakoma ZAX 9100 Air Jet Loom (Used)",
          gu: "???????? ZAX ???? ?? ??? ????? (???????)",
          hi: "???????? ZAX 9100 ??? ??? ?????",
          fr: "M�tier � Jet d'Air Tsudakoma ZAX 9100"
        },
        spec: "Reed Width: 190cm | 2-Color Weft Selection | Speed: 850 RPM",
        hsCode: "84463010",
        packaging: "Container Lashing & Crate",
        moq: "2 Units",
        image: "images/used_industrial_machinery.png"
      },
      {
        id: "sub-looms-picanol",
        names: {
          en: "Picanol GamMax Rapier Loom (Used)",
          gu: "??????? ????????? ?????? ????? (???????)",
          hi: "??????? ?????? ?????",
          fr: "M�tier � Rapi�re Picanol GamMax"
        },
        spec: "Reed Width: 220cm | 8-Color Capacity | Electronic Dobby",
        hsCode: "84463010",
        packaging: "Export Container Packing",
        moq: "2 Units",
        image: "images/used_industrial_machinery.png"
      }
    ]
  },
  {
    id: "new-agro-sortex",
    category: "new_machinery",
    image: "images/new_agro_machinery.png",
    images: [
      "images/new_agro_machinery.png",
      "images/agro_spices_grains.png"
    ],
    hsCode: "84371000",
    origin: "Gujarat, India",
    names: {
      en: "Automatic Agro Grain Sorting & Cleaning Machine (New)",
      gu: "??? ???????? ????? ?????? ???????? ??? ???????? ????",
      hi: "?? ???????? ????? ????? ???????? ??? ???????? ????",
      fr: "Machine Neuve d'�puration et de Tri de Grains Agricoles"
    },
    specs: {
      en: "Capacity: 2 - 10 Tons/Hr | High-Res CCD Color Cameras | Multi-Crop Sorting (Rice, Pulses, Seeds)",
      gu: "??????: ? - ?? ??/???? | ???-?????????? CCD ??? ?????? | ?????-????? ???????? (????, ????, ?????????)",
      hi: "??????: 2 - 10 ??/???? | ???-?????????? ?????? ????? | ?????-????? ????????",
      fr: "Capacit�: 2 - 10 Tonnes/Heure | Cam�ras Couleur CCD Haute R�solution | Polyvalente"
    },
    packaging: "Heavy-Duty Wooden Export Box",
    moq: "1 Set",
    subProducts: [
      {
        id: "sub-sortex-6chute",
        names: {
          en: "6-Chute CCD Optical Color Sorter Machine",
          gu: "?-??? ?????? ??????? ??? ????????? ????",
          hi: "6-??? ?????? ??? ?????? ????",
          fr: "Trieuse Optique 6 Canaux CCD"
        },
        spec: "Capacity: 5 Tons/Hour | 5400 Pixel CCD Camera | Rice & Pulse Sorting",
        hsCode: "84371000",
        packaging: "Wooden Export Case",
        moq: "1 Set",
        image: "images/new_agro_machinery.png"
      },
      {
        id: "sub-sortex-10chute",
        names: {
          en: "10-Chute Heavy Duty AI Grain Sorting Line",
          gu: "??-??? ???? ?????? AI ????? ???????? ???????",
          hi: "10-??? ??? ????? ???????? ??????",
          fr: "Ligne de Tri IA Haute Capacit� 10 Canaux"
        },
        spec: "Capacity: 12 Tons/Hour | AI Deep Learning Sorting | InGaAs NIR Camera",
        hsCode: "84371000",
        packaging: "Reinforced Export Box",
        moq: "1 Set",
        image: "images/new_agro_machinery.png"
      }
    ]
  },
  {
    id: "new-paperbag-machine",
    category: "new_machinery",
    image: "images/new_agro_machinery.png",
    images: [
      "images/new_agro_machinery.png",
      "images/eco_packaging_bags.png"
    ],
    hsCode: "84411000",
    origin: "Surat, India",
    names: {
      en: "Automatic Eco Kraft Paper Bag Making Machine (New)",
      gu: "??? ???????? ??? ??????? ???? ??? ??????? ??????",
      hi: "?? ???????? ??? ??????? ???? ??? ??????? ??????",
      fr: "Machine Neuve Automatique de Fabrication de Sacs en Papier Kraft"
    },
    specs: {
      en: "Speed: 100 - 220 Bags/Min | Paper Thickness: 60 - 150 GSM | Inline Handle Sticking & Printing",
      gu: "???: ??? - ??? ?????/????? | ???? ?????: ?? - ??? GSM | ?????? ?????? ?????????? ???",
      hi: "???: 100 - 220 ???/???? | paper ?????: 60 - 150 GSM | ?????? ????? ?????? ??? ?????????",
      fr: "Vitesse: 100 - 220 Sacs/Min | �paisseur du Papier: 60 - 150 GSM | Poign�es Int�gr�es"
    },
    packaging: "Vacuum Sealed Export Wooden Case",
    moq: "1 Set",
    subProducts: [
      {
        id: "sub-paperbag-square",
        names: {
          en: "Automatic Square Bottom Kraft Paper Bag Machine",
          gu: "???????? ??????? ???? ??????? ???? ??? ????",
          hi: "???????? ???????? ???? ???? ??? ????",
          fr: "Machine � Sacs Papier Fond Carr�"
        },
        spec: "Speed: 150 Bags/Min | Flat/Twisted Handle Attachment | 2-Color Flexo Print",
        hsCode: "84411000",
        packaging: "Export Sealed Case",
        moq: "1 Set",
        image: "images/new_agro_machinery.png"
      },
      {
        id: "sub-paperbag-vbottom",
        names: {
          en: "High-Speed V-Bottom Grocery Paper Bag Machine",
          gu: "???-????? ??-???? ??????? ???? ??? ????",
          hi: "???-????? ??-???? ?????? ??? ????",
          fr: "Machine � Sacs �picerie Fond en V"
        },
        spec: "Speed: 300 Bags/Min | Window Cutout Unit | GSM: 40-100",
        hsCode: "84411000",
        packaging: "Wooden Box Packing",
        moq: "1 Set",
        image: "images/new_agro_machinery.png"
      }
    ]
  },
  {
    id: "industrial-bolts",
    category: "industrial",
    image: "images/industrial_fasteners.png",
    images: [
      "images/industrial_fasteners.png",
      "images/used_industrial_machinery.png"
    ],
    hsCode: "73181500",
    origin: "Gujarat, India",
    names: {
      en: "Stainless Steel SS 304 / 316 Heavy Hex Bolts & Nuts",
      gu: "???????? ????? SS ??? / ??? ???? ????? ??????? ??? ????",
      hi: "???????? ????? SS 304 / 316 ???? ????? ??????? ??? ????",
      fr: "Boulons et �crous Hexagonaux en Acier Inoxydable SS 304 / 316"
    },
    specs: {
      en: "Grade: A2-70, A4-80 | Standards: DIN 933, ISO 4017, ANSI B18.2.1 | Corrosion Resistant",
      gu: "?????: A2-70, A4-80 | ????????????: DIN 933, ISO 4017, ANSI B18.2.1 | ??? ?????",
      hi: "?????: A2-70, A4-80 | ????: DIN 933, ISO 4017, ANSI B18.2.1 | ???????? ????",
      fr: "Grade: A2-70, A4-80 | Normes: DIN 933, ISO 4017, ANSI B18.2.1 | R�sistant � la Corrosion"
    },
    packaging: "Strong Export Cartons on Wooden Pallets",
    moq: "1,000 Kg",
    subProducts: [
      {
        id: "sub-bolts-ss304",
        names: {
          en: "SS 304 Hex Head Bolts & Locking Nuts (DIN 933)",
          gu: "SS ??? ????? ??? ??????? ??? ?????? ????",
          hi: "SS 304 ????? ????? ??? ?????? ??",
          fr: "Boulons Hexagonaux SS 304 DIN 933"
        },
        spec: "Grade: A2-70 | Sizes: M6 to M36 | Length: 20mm to 200mm",
        hsCode: "73181500",
        packaging: "25kg Cartons on Pallets",
        moq: "500 Kg",
        image: "images/industrial_fasteners.png"
      },
      {
        id: "sub-bolts-ss316",
        names: {
          en: "SS 316 Marine Grade Anti-Corrosive Bolts",
          gu: "SS ??? ???? ????? ?????-??????? ???????",
          hi: "SS 316 ???? ????? ???????",
          fr: "Boulons Qualit� Marine SS 316"
        },
        spec: "Grade: A4-80 | High Salt-Spray Resistance | Chemical Grade",
        hsCode: "73181500",
        packaging: "Export Pallet Box",
        moq: "500 Kg",
        image: "images/industrial_fasteners.png"
      }
    ]
  },
  {
    id: "packaging-kraft",
    category: "eco_packaging",
    image: "images/eco_packaging_bags.png",
    images: [
      "images/eco_packaging_bags.png",
      "images/new_agro_machinery.png"
    ],
    hsCode: "48191010",
    origin: "Surat, India",
    names: {
      en: "Eco Kraft Paper Shopping Bags & Multi-ply Export Sacks",
      gu: "??? ??????? ???? ?????? ????? ??? ?????-????? ????????? ?????",
      hi: "??? ??????? ???? ?????? ????? ??? ?????-????? ????????? ?????",
      fr: "Sacs Shopping en Papier Kraft �cologique & Sacs d'Exportation Multi-plis"
    },
    specs: {
      en: "GSM: 80 - 180 GSM | Recyclable & Biodegradable | Custom Logo Printing Available",
      gu: "GSM: ?? - ??? GSM | ??????? ??? ?????????????? | ????? ???? ?????????? ???",
      hi: "GSM: 80 - 180 GSM | ???????? ???? ????? ??? ?????????????? | ????? ???? ?????????",
      fr: "GSM: 80 - 180 GSM | Recyclable & Biod�gradable | Impression de Logo Personnalis�e"
    },
    packaging: "Baled & Palletized Export Bundles",
    moq: "5,000 Pieces",
    subProducts: [
      {
        id: "sub-kraft-bags",
        names: {
          en: "Brown Kraft Paper Shopping Bags (Twisted Handle)",
          gu: "?????? ??????? ???? ?????? ????? (?????? ????)",
          hi: "?????? ??????? ???? ?????? ?????",
          fr: "Sacs Shopping Papier Kraft Brun"
        },
        spec: "120 GSM Natural Virgin Kraft | Capacity: 5kg | Custom Brand Logo",
        hsCode: "48191010",
        packaging: "250 Pcs Cartons",
        moq: "5,000 Pcs",
        image: "images/eco_packaging_bags.png"
      },
      {
        id: "sub-kraft-multiwall",
        names: {
          en: "Multi-Wall Paper Valve Sacks for Cement & Agro",
          gu: "?????-??? ???? ????? ????? (????? & ??????)",
          hi: "?????-??? ???? ????? ?????",
          fr: "Sacs � Valve Multi-plis en Papier"
        },
        spec: "3-Ply 80 GSM Kraft + PE Liner | Moisture Proof | 25kg / 50kg Capacity",
        hsCode: "48191010",
        packaging: "Palletized Bundles",
        moq: "10,000 Pcs",
        image: "images/eco_packaging_bags.png"
      }
    ]
  },
  {
    id: "apparel-workwear",
    category: "apparel",
    image: "images/hero_export_shipping.png",
    images: [
      "images/hero_export_shipping.png",
      "images/agro_spices_grains.png"
    ],
    hsCode: "62034200",
    origin: "Surat, India",
    names: {
      en: "Industrial High-Visibility Workwear & Safety Uniforms",
      gu: "???????????? ???-?????????? ??????? ??? ?????? ???????????",
      hi: "???????? ????-??????? ???????? ??? ??????? ????????",
      fr: "V�tements de Travail Industriels Haute Visibilit� & Uniformes de S�curit�"
    },
    specs: {
      en: "Fabric: 100% Cotton / Poly-Cotton 240 GSM | Flame Retardant / Anti-Static Coating",
      gu: "????: ???% ???? / ????-???? ??? GSM | ????? ?????????? / ?????-??????? ??????",
      hi: "?????: 100% ???? / ????-???? 240 GSM | ????? ?????????? / ????-??????? ??????",
      fr: "Tissu: 100% Coton / Poly-Coton 240 GSM | Ignifuge / Antistatique"
    },
    packaging: "Individual Polybag Packing in Master Cartons",
    moq: "500 Sets",
    subProducts: [
      {
        id: "sub-workwear-coverall",
        names: {
          en: "Hi-Vis Flame Retardant Safety Coveralls",
          gu: "???-?????????? ????? ?????????? ?????? ??? ??",
          hi: "???-?????????? ?????? ????? ?????????",
          fr: "Combinaison de S�curit� Ignifuge Haute Visibilit�"
        },
        spec: "Fabric: 240 GSM Poly-Cotton | 3M Reflective Strip | EN ISO 20471",
        hsCode: "62034200",
        packaging: "20 Sets Master Carton",
        moq: "300 Sets",
        image: "images/hero_export_shipping.png"
      },
      {
        id: "sub-workwear-jacket",
        names: {
          en: "Industrial Anti-Static Work Jackets & Cargo Pants",
          gu: "???????????? ?????-??????? ???? ????? ??? ?????",
          hi: "??????????? ????-??????? ???? ????? ??? ????",
          fr: "Veste et Pantalon de Travail Antistatique"
        },
        spec: "100% Cotton Drill 260 GSM | Triple Needle Stitching | Industrial Washable",
        hsCode: "62034200",
        packaging: "Carton Box Packing",
        moq: "300 Sets",
        image: "images/hero_export_shipping.png"
      }
    ]
  }
];


const defaultCertificates = [
  {
    id: "cert-apeda",
    title: {
      en: "APEDA Registered Exporter",
      gu: "APEDA ????????? ????? ??????????",
      hi: "APEDA ??????? ???? ????????",
      fr: "Exportateur Enregistr� APEDA"
    },
    regNo: "APEDA/REG/2024/78619",
    authority: "Ministry of Commerce & Industry, Govt. of India",
    validity: "Valid / Active 2024 - 2029",
    scope: "Merchant Exporter for Agricultural Produce, Spices, Grains & Seeds",
    image: "images/agro_spices_grains.png"
  },
  {
    id: "cert-iso",
    title: {
      en: "ISO 9001:2015 Quality Standard",
      gu: "ISO 9001:2015 ???????? ??????????",
      hi: "ISO 9001:2015 ???????? ????",
      fr: "Norme de Qualit� ISO 9001:2015"
    },
    regNo: "ISO/QMS/9001-2024-884",
    authority: "International Quality Accreditation Board",
    validity: "Certified 2024 - 2027",
    scope: "Quality Management in Export Trading, Machinery & Packaging",
    image: "images/hero_export_shipping.png"
  },
  {
    id: "cert-fssai",
    title: {
      en: "FSSAI Central Food Safety License",
      gu: "FSSAI ???????? ??? ?????? ???????",
      hi: "FSSAI ???????? ????? ??????? ???????",
      fr: "Licence FSSAI de S�curit� Alimentaire"
    },
    regNo: "LIC NO. 10021021000543",
    authority: "Food Safety & Standards Authority of India",
    validity: "Active Licence",
    scope: "Food Safety & Sanitary Hygiene Compliance for Export Food Products",
    image: "images/eco_packaging_bags.png"
  },
  {
    id: "cert-iec",
    title: {
      en: "IEC (Import Export Code) DGFT",
      gu: "IEC (???????? ????????? ???) DGFT",
      hi: "IEC (????-??????? ???) DGFT",
      fr: "Code d'Importation/Exportation IEC DGFT"
    },
    regNo: "IEC CODE: 3908007421",
    authority: "Directorate General of Foreign Trade, Govt. of India",
    validity: "Permanent Official Export Code",
    scope: "Authorized Exporter & Trading House in Surat, Gujarat",
    image: "images/industrial_fasteners.png"
  }
];


const defaultBranches = [
  {
    id: "branch-surat",
    city: "Surat (Headquarters)",
    state: "Gujarat, India",
    type: "Corporate HQ & Processing",
    contactPerson: "Atulbhai Ishwarbhai Patel",
    address: "201, Safari Complex, Surat-Navsari Main Road, Near Bhestan Canal BRTS Bus Stand, Bhestan, Surat - 395023, Gujarat, India",
    phone: "+91 78619 97755",
    email: "atul2670@gmail.com",
    isHq: true
  },
  {
    id: "branch-mumbai",
    city: "Mumbai (Port Shipping Desk)",
    state: "Maharashtra, India",
    type: "Container Logistics & Customs",
    contactPerson: "Export Freight Division",
    address: "Jawaharlal Nehru Port Trust (JNPT / Nhava Sheva) Logistics Hub, Navi Mumbai - 400707, Maharashtra, India",
    phone: "+91 78619 97755",
    email: "shipping@adidevsmart.com",
    isHq: false
  },
  {
    id: "branch-dubai",
    city: "Dubai (Overseas Trade Office)",
    state: "United Arab Emirates",
    type: "Middle East Sales & Trading Hub",
    contactPerson: "Global Business Desk",
    address: "Jebel Ali Freezone (JAFZA) Trade Tower, Dubai, United Arab Emirates",
    phone: "+971 50 786 1997",
    email: "dubai@adidevsmart.com",
    isHq: false
  }
];



// Keep local storage active for state persistence
let currentLang = localStorage.getItem('app_lang') || 'gu';
let currentCategory = 'all';

// Load saved custom product photo galleries from localStorage if available
let customGalleries = {};
try {
  customGalleries = JSON.parse(localStorage.getItem('custom_product_galleries') || '{}');
} catch (e) {
  customGalleries = {};
}

// Load saved custom certificates list from localStorage if available
let certificatesList = [];
try {
  const savedCerts = localStorage.getItem('custom_certificates');
  if (savedCerts) {
    certificatesList = JSON.parse(savedCerts);
  } else {
    certificatesList = [...defaultCertificates];
  }
} catch (e) {
  certificatesList = [...defaultCertificates];
}

// Load saved custom branch offices list from localStorage if available
let branchesList = [];
try {
  const savedBranches = localStorage.getItem('custom_branch_offices');
  if (savedBranches) {
    branchesList = JSON.parse(savedBranches);
  } else {
    branchesList = [...defaultBranches];
  }
} catch (e) {
  branchesList = [...defaultBranches];
}

// Local Storage Persistence for Received Customer RFQ Inquiries & Attachments
let rfqInquiries = [];
try {
  rfqInquiries = JSON.parse(localStorage.getItem('custom_rfq_inquiries') || '[]');
} catch (e) {
  rfqInquiries = [];
}

// Track active photo index per product card
let activePhotoIndices = {};

// Temporary gallery array when editing inside modal
let currentEditingGallery = [];
let currentEditingProductId = null;

// Temporary certificate image/PDF document storage
let currentEditingCertDoc = '';

// Attached Files for RFQ forms
let currentInlineAttachedFile = null;
let currentModalAttachedFile = null;

function startApp() {
  try { localStorage.removeItem('custom_product_galleries_corrupt'); } catch(e){}
  try { initLanguageSystem(); } catch (e) { console.error('Language Error:', e); }
  try { initAdminAuthSystem(); } catch (e) { console.error('Admin Auth Error:', e); }
  try { renderProducts(); } catch (e) { console.error('Render Products Error:', e); }
  try { initMegaSubMenu(); } catch (e) { console.error('Mega Menu Error:', e); }
  try { renderCertificates(); } catch (e) { console.error('Certificates Error:', e); }
  try { renderBranches(); } catch (e) { console.error('Branches Error:', e); }
  try { initEventListeners(); } catch (e) { console.error('Event Listeners Error:', e); }
  try { initPhotoUploader(); } catch (e) { console.error('Photo Uploader Error:', e); }
  try { initCertUploader(); } catch (e) { console.error('Cert Uploader Error:', e); }
  try { initBranchUploader(); } catch (e) { console.error('Branch Uploader Error:', e); }
  try { initSubProductsManager(); } catch (e) { console.error('Sub Products Error:', e); }
  try { initSubProductViewModal(); } catch (e) { console.error('Sub Product View Error:', e); }
  try { initRfqFileAttachment(); } catch (e) { console.error('RFQ Attachment Error:', e); }
  try { initAdminInquiriesManager(); } catch (e) { console.error('Admin Inquiries Error:', e); }
  try { initRfqFormSubmissions(); } catch (e) { console.error('RFQ Submission Error:', e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

// --- Admin Authorization Controller ---
let isAdminAuthorized = localStorage.getItem('is_admin_auth') !== 'false';

function updateAdminState() {
  const authBtn = document.getElementById('adminAuthBtn');
  if (isAdminAuthorized) {
    document.body.classList.add('admin-authorized');
    if (authBtn) {
      authBtn.innerHTML = '🔓 Admin Active (Lock)';
      authBtn.style.background = '#dcfce7';
      authBtn.style.color = '#15803d';
      authBtn.style.borderColor = '#86efac';
    }
  } else {
    document.body.classList.remove('admin-authorized');
    if (authBtn) {
      authBtn.innerHTML = '🔐 Admin Login (એડમિન)';
      authBtn.style.background = '#fef3c7';
      authBtn.style.color = '#92400e';
      authBtn.style.borderColor = '#fde68a';
    }
  }
}

function initAdminAuthSystem() {
  const authBtn = document.getElementById('adminAuthBtn');
  const loginModal = document.getElementById('adminLoginModal');
  const closeBtn = document.getElementById('adminLoginClose');
  const loginForm = document.getElementById('adminLoginForm');
  const pinInput = document.getElementById('adminPinInput');
  const errorEl = document.getElementById('adminLoginError');

  updateAdminState();

  if (authBtn) {
    authBtn.addEventListener('click', () => {
      if (isAdminAuthorized) {
        isAdminAuthorized = false;
        localStorage.setItem('is_admin_auth', 'false');
        updateAdminState();
        alert('🔒 એડમિન મોડ લોક કરી દેવામાં આવ્યો છે.');
      } else {
        if (pinInput) pinInput.value = '';
        if (errorEl) errorEl.style.display = 'none';
        if (loginModal) loginModal.classList.add('show');
      }
    });
  }

  if (closeBtn && loginModal) {
    closeBtn.addEventListener('click', () => loginModal.classList.remove('show'));
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) loginModal.classList.remove('show');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPin = pinInput.value.trim();
      if (enteredPin === '1234' || enteredPin === 'admin123' || enteredPin === '7861997755') {
        isAdminAuthorized = true;
        localStorage.setItem('is_admin_auth', 'true');
        updateAdminState();
        renderProducts();
        initMegaSubMenu();
        if (loginModal) loginModal.classList.remove('show');
        alert('🔓 એડમિન મોડ સફળતાપૂર્વક ઓથોરાઈઝ્ડ થઈ ગયો છે!');
      } else {
        if (errorEl) errorEl.style.display = 'block';
      }
    });
  }
}

// --- i18n System Controller ---
function initLanguageSystem() {
  setLanguage(currentLang);
}

function setLanguage(langCode) {
  if (!translations[langCode]) return;
  currentLang = langCode;
  localStorage.setItem('app_lang', langCode);

  const langObj = languages.find(l => l.code === langCode) || languages[0];
  document.getElementById('currentFlag').textContent = langObj.flag;
  document.getElementById('currentLangName').textContent = langObj.name;

  // Update active state in dropdown options
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === langCode);
  });

  // Update all DOM elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[langCode][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[langCode][key];
      } else {
        el.textContent = translations[langCode][key];
      }
    }
  });

  renderProducts();
  renderCertificates();
  renderBranches();
}

// Helper: Check if document string is PDF
function isPdfDoc(src) {
  if (!src) return false;
  return src.startsWith('data:application/pdf') || src.toLowerCase().endsWith('.pdf');
}

// Get effective list of images for a product (from custom upload or default array)
function getProductImages(product) {
  if (customGalleries[product.id] && Array.isArray(customGalleries[product.id]) && customGalleries[product.id].length > 0) {
    return customGalleries[product.id];
  }
  return product.images || [product.image];
}

// --- Custom Sub-Products State Management ---
let customSubProducts = {};
try {
  customSubProducts = JSON.parse(localStorage.getItem('custom_sub_products') || '{}');
} catch (e) {
  customSubProducts = {};
}

let selectedSubProducts = {};
let activeSubPhotoIndices = {};

function getProductSubProducts(product) {
  if (!product) return [];
  if (customSubProducts[product.id] && Array.isArray(customSubProducts[product.id])) {
    return customSubProducts[product.id];
  }
  return product.subProducts || [];
}

// --- Mega Sub-Products Navigation Controller ---
function initMegaSubMenu() {
  const container = document.getElementById('megaSubMenu');
  if (!container) return;

  container.innerHTML = '';

  const agroProds = productsData.filter(p => p.category === 'agro');
  const machineryProds = productsData.filter(p => p.category === 'used_machinery' || p.category === 'new_machinery');
  const industrialEcoProds = productsData.filter(p => p.category === 'industrial' || p.category === 'eco_packaging' || p.category === 'apparel');

  function buildColumnHtml(colTitle, prodList) {
    let html = `<div class="mega-cat-col"><div class="mega-cat-title">${colTitle}</div>`;
    prodList.forEach(p => {
      const parentName = p.names[currentLang] || p.names['en'];
      const subList = getProductSubProducts(p);
      
      html += `<div style="font-size: 0.78rem; font-weight: 700; color: var(--agro-teal); margin: 8px 0 4px 0;">🌿 ${parentName}</div>`;

      if (subList.length > 0) {
        subList.forEach(sub => {
          const sNameEn = sub.names ? (sub.names.en || sub.name) : sub.name;
          const sNameGu = sub.names ? (sub.names[currentLang] || sub.names.gu || sub.name) : sub.name;
          const displayName = (sNameGu && sNameGu !== sNameEn) ? `${sNameGu}` : sNameEn;
          const subPhoto = sub.image || 'images/agro_spices_grains.png';

          html += `
            <a class="mega-sub-item mega-click-item" data-parent-id="${p.id}" data-sub-id="${sub.id}">
              <img src="${subPhoto}" onerror="this.src='images/agro_spices_grains.png';">
              <span>${displayName}</span>
            </a>
          `;
        });
      } else {
        html += `
          <a class="mega-sub-item mega-click-item" data-parent-id="${p.id}" data-sub-id="">
            <img src="${p.image}" onerror="this.src='images/agro_spices_grains.png';">
            <span>${parentName}</span>
          </a>
        `;
      }
    });

    html += `</div>`;
    return html;
  }

  container.innerHTML = 
    buildColumnHtml('🌿 Agro Commodities', agroProds) +
    buildColumnHtml('🌿 Machinery & Equipment', machineryProds) +
    buildColumnHtml('🌿 Hardware & Packaging', industrialEcoProds);

  const toggleBtn = document.getElementById('productsNavBtn');
  const dropdownItem = toggleBtn ? toggleBtn.closest('.nav-dropdown-item') : null;
  if (toggleBtn && dropdownItem) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownItem.classList.toggle('show-mega');
    });
  }
}

// Helper: Get list of images for a sub-product
function getSubProductImages(sub, parentProd) {
  if (sub.images && Array.isArray(sub.images) && sub.images.length > 0) {
    return sub.images;
  }
  if (sub.image) {
    return [sub.image];
  }
  return getProductImages(parentProd);
}

// Global Helper for direct inline onclick triggers
window.openSubModalById = function(parentId, subId) {
  const parentProd = productsData.find(p => p.id === parentId);
  if (!parentProd) return;
  const subList = getProductSubProducts(parentProd);
  const sub = subList.find(s => s.id === subId) || (subList.length > 0 ? subList[0] : parentProd);
  selectedSubProducts[parentId] = sub.id;
  renderProducts();
  if (window.openSubProductViewModal) {
    window.openSubProductViewModal(parentProd, sub);
  }
};

// Track selected variant per product: { [productId]: selectedSubProductId }
let selectedSubProducts = {};

// --- Hierarchical Category & Sub-Products Full Cards Renderer ---
function renderProducts() {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  const filtered = currentCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === currentCategory);

  container.innerHTML = '';

  const inquireTxt = translations[currentLang]?.btn_inquire || "Inquire Now";

  filtered.forEach(p => {
    const parentName = p.names[currentLang] || p.names['en'];
    const parentSpec = p.specs[currentLang] || p.specs['en'];
    const categoryTxt = translations[currentLang]?.[`tab_${p.category}`] || p.category;

    const subList = getProductSubProducts(p);

    // Group Container Section (Agro Commodities > Rice / Turmeric / Seeds)
    const groupSection = document.createElement('div');
    groupSection.className = 'product-group-section';
    groupSection.style.cssText = 'background: #ffffff; border-radius: 16px; border: 1px solid var(--border-color); padding: 22px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);';

    // Group Header HTML
    const groupHeaderHtml = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 2px solid #e2e8f0;">
        <div>
          <div style="font-size: 0.78rem; font-weight: 800; color: var(--agro-teal); text-transform: uppercase; letter-spacing: 0.8px;">
            🌿 ${categoryTxt} &nbsp;�&nbsp; <span style="color: var(--primary-navy);">${parentName}</span>
          </div>
          <h3 style="font-size: 1.4rem; color: var(--primary-navy); margin: 4px 0 0 0; font-weight: 800;">
            🌿 ${parentName}
          </h3>
          <p style="font-size: 0.86rem; color: var(--text-muted); margin: 4px 0 0 0;">
            ${parentSpec}
          </p>
        </div>

        <div style="display: flex; gap: 8px;" class="admin-only">
          <button type="button" class="btn-secondary edit-photo-btn" data-id="${p.id}" style="padding: 6px 12px; font-size: 0.8rem; background: #e0f2fe; color: #0369a1; border-color: #7dd3fc;">
            📷 Group Photos
          </button>
          <button type="button" class="btn-secondary edit-subproducts-btn" data-id="${p.id}" style="padding: 6px 12px; font-size: 0.8rem; background: #f0fdf4; color: #0d9488; border-color: #99f6e4; font-weight: 600;">
            🌿 Add / Manage Sub-Products (${subList.length})
          </button>
        </div>
      </div>
    `;

    groupSection.innerHTML = groupHeaderHtml;

    // Sub-Products Grid Container (Card Grid for every sub-product under this main product)
    const grid = document.createElement('div');
    grid.className = 'sub-products-grid';
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px;';

    // If no sub-products added yet, fallback to main product
    const itemsToRender = subList.length > 0 ? subList : [{
      id: `main-${p.id}`,
      names: p.names,
      spec: parentSpec,
      hsCode: p.hsCode,
      packaging: p.packaging,
      moq: p.moq,
      image: p.image,
      images: getProductImages(p)
    }];

    itemsToRender.forEach((sub, subIdx) => {
      const subNameEn = sub.names ? (sub.names.en || sub.name) : (sub.name || '');
      const subNameGu = sub.names ? (sub.names.gu || sub.name) : (sub.name || '');
      const subDisplayName = (subNameGu && subNameGu !== subNameEn) ? `${subNameGu} (${subNameEn})` : (subNameGu || subNameEn);

      const subImgList = getSubProductImages(sub, p);
      const subActiveIdx = activeSubPhotoIndices[sub.id] || 0;
      const currentSubImgSrc = subImgList[subActiveIdx] || subImgList[0];

      const hasSubMultiple = subImgList.length > 1;
      const subNavControlsHtml = hasSubMultiple ? `
        <button class="sub-carousel-nav sub-carousel-prev" data-parent-id="${p.id}" data-sub-id="${sub.id}">�</button>
        <button class="sub-carousel-nav sub-carousel-next" data-parent-id="${p.id}" data-sub-id="${sub.id}">�</button>
        <span class="carousel-counter">🌿 ${subActiveIdx + 1}/${subImgList.length}</span>
      ` : '';

      const subDotsHtml = hasSubMultiple ? `
        <div class="carousel-dots">
          ${subImgList.map((_, i) => `<span class="sub-dot ${i === subActiveIdx ? 'active' : ''}" data-parent-id="${p.id}" data-sub-id="${sub.id}" data-idx="${i}"></span>`).join('')}
        </div>
      ` : '';

      const subCard = document.createElement('div');
      subCard.className = 'product-card sub-product-full-card';
      subCard.style.cssText = 'margin: 0; background: #ffffff; border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.05);';

      subCard.innerHTML = `
        <div class="product-img-wrapper open-sub-lightbox" data-parent-id="${p.id}" data-sub-id="${sub.id}" style="position: relative; height: 200px; overflow: hidden; background: #f8fafc; cursor: pointer;" title="Click to open HD Lightbox Modal (વિગતો અને ફોટો જુઓ)">
          <img src="${currentSubImgSrc}" alt="${subDisplayName}" id="img-${sub.id}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='images/agro_spices_grains.png';">
          <span class="product-badge" style="position: absolute; top: 10px; left: 10px; background: var(--primary-navy); color: white; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 700;">
            🌿 ${parentName}
          </span>
          <span class="product-hs" style="position: absolute; top: 10px; right: 10px; background: var(--accent-gold); color: var(--primary-navy); padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 800;">
            HS: ${sub.hsCode || p.hsCode}
          </span>
          ${subNavControlsHtml}
          ${subDotsHtml}
        </div>

        <div class="product-body" style="padding: 16px; display: flex; flex-direction: column; flex: 1;">
          <h4 class="product-title open-sub-lightbox" data-parent-id="${p.id}" data-sub-id="${sub.id}" style="font-size: 1.08rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 6px; cursor: pointer;" title="Click to open details">
            ${subDisplayName}
          </h4>
          
          <p class="product-spec-text" style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.4; flex: 1;">
            ${sub.spec || parentSpec}
          </p>

          <div class="product-meta" style="font-size: 0.8rem; background: #f8fafc; padding: 8px 12px; border-radius: 8px; border: 1px solid #f1f5f9; margin-bottom: 14px; display: grid; gap: 4px;">
            <div><strong>Packaging:</strong> ${sub.packaging || p.packaging}</div>
            <div><strong>MOQ:</strong> <span style="color: var(--accent-gold); font-weight: 800;">${sub.moq || p.moq}</span></div>
          </div>

          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn-secondary open-sub-lightbox" data-parent-id="${p.id}" data-sub-id="${sub.id}" style="flex: 1; padding: 9px; font-size: 0.82rem; background: #e0f2fe; color: #0369a1; border-color: #7dd3fc; font-weight: 700; justify-content: center;">
              🔍 Details (વિગતો જુઓ)
            </button>
            <button type="button" class="btn-primary sub-inquire-btn" data-parent="${parentName}" data-sub="${subNameEn}" style="flex: 1; justify-content: center; font-size: 0.82rem; padding: 9px;">
              💬 Inquire (ભાવ પૂછો)
            </button>
          </div>

          <div style="display: flex; gap: 6px; margin-top: 8px;" class="admin-only">
            <button type="button" class="btn-secondary edit-single-sub-card-btn" data-parent-id="${p.id}" data-index="${subIdx}" style="flex: 1; padding: 5px 8px; font-size: 0.75rem; background: #f0fdf4; color: #0d9488; border-color: #99f6e4; font-weight: 600;">
              ✏️ Edit Sub-Product
            </button>
          </div>
        </div>
      `;

      grid.appendChild(subCard);
    });

    groupSection.appendChild(grid);
    container.appendChild(groupSection);
  });

  // Bind Event Handlers
  container.querySelectorAll('.open-sub-lightbox').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('sub-carousel-nav') || e.target.classList.contains('sub-dot')) return;
      e.stopPropagation();
      const parentId = e.currentTarget.getAttribute('data-parent-id');
      const subId = e.currentTarget.getAttribute('data-sub-id');
      const parentProd = productsData.find(p => p.id === parentId);
      if (!parentProd) return;
      const subList = getProductSubProducts(parentProd);
      const sub = subList.find(s => s.id === subId) || parentProd;
      if (window.openSubProductViewModal) {
        window.openSubProductViewModal(parentProd, sub);
      }
    });
  });

  container.querySelectorAll('.sub-carousel-prev').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentId = e.currentTarget.getAttribute('data-parent-id');
      const subId = e.currentTarget.getAttribute('data-sub-id');
      const parentProd = productsData.find(p => p.id === parentId);
      if (!parentProd) return;
      const subList = getProductSubProducts(parentProd);
      const sub = subList.find(s => s.id === subId) || { image: parentProd.image, images: getProductImages(parentProd) };
      const subImgList = getSubProductImages(sub, parentProd);
      let idx = (activeSubPhotoIndices[subId] || 0) - 1;
      if (idx < 0) idx = subImgList.length - 1;
      activeSubPhotoIndices[subId] = idx;
      renderProducts();
    });
  });

  container.querySelectorAll('.sub-carousel-next').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentId = e.currentTarget.getAttribute('data-parent-id');
      const subId = e.currentTarget.getAttribute('data-sub-id');
      const parentProd = productsData.find(p => p.id === parentId);
      if (!parentProd) return;
      const subList = getProductSubProducts(parentProd);
      const sub = subList.find(s => s.id === subId) || { image: parentProd.image, images: getProductImages(parentProd) };
      const subImgList = getSubProductImages(sub, parentProd);
      let idx = (activeSubPhotoIndices[subId] || 0) + 1;
      if (idx >= subImgList.length) idx = 0;
      activeSubPhotoIndices[subId] = idx;
      renderProducts();
    });
  });

  container.querySelectorAll('.sub-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const subId = e.currentTarget.getAttribute('data-sub-id');
      const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
      activeSubPhotoIndices[subId] = idx;
      renderProducts();
    });
  });

  container.querySelectorAll('.sub-inquire-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pName = e.currentTarget.getAttribute('data-parent');
      const sName = e.currentTarget.getAttribute('data-sub');
      openModal(`${pName} - ${sName}`);
    });
  });

  container.querySelectorAll('.edit-photo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.getAttribute('data-id');
      openPhotoModal(pId);
    });
  });

  container.querySelectorAll('.edit-subproducts-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = e.currentTarget.getAttribute('data-id');
      if (window.openSubProductsModal) {
        window.openSubProductsModal(pId);
      }
    });
  });

  container.querySelectorAll('.edit-single-sub-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = e.currentTarget.getAttribute('data-parent-id');
      if (window.openSubProductsModal) {
        window.openSubProductsModal(pId);
      }
    });
  });
}

// --- Certifications Renderer ---
function renderCertificates() {
  const grid = document.getElementById('certGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const viewTxt = translations[currentLang]?.cert_view || "🌿 View Document";
  const editTxt = translations[currentLang]?.cert_edit || "🌿 Edit Details / File";

  certificatesList.forEach(c => {
    const card = document.createElement('div');
    card.className = 'cert-card-enhanced';

    const certTitle = typeof c.title === 'object' ? (c.title[currentLang] || c.title['en']) : c.title;
    const isPdf = isPdfDoc(c.image);

    const docMediaHtml = isPdf ? `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; background:#f8fafc; color: var(--primary-navy);">
        <span style="font-size: 3rem;">??</span>
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--agro-teal);">VERIFIED CERTIFICATE PDF</span>
      </div>
    ` : `
      <img src="${c.image}" alt="${certTitle}" oncontextmenu="return false;" onerror="this.onerror=null; this.src='images/agro_spices_grains.png';">
    `;

    card.innerHTML = `
      <div class="cert-card-img-wrapper">
        ${docMediaHtml}
        <span class="cert-status-badge">Official Certificate</span>
      </div>
      <div class="cert-card-content">
        <h4>${certTitle}</h4>
        <p class="cert-reg-no"><strong>Reg No:</strong> ${c.regNo}</p>
        <p class="cert-auth"><strong>Authority:</strong> ${c.authority}</p>
        <p class="cert-val"><strong>Status:</strong> ${c.validity}</p>
        
        <div class="cert-actions">
          <button class="btn-secondary cert-view-btn" data-id="${c.id}">${viewTxt}</button>
          <button class="btn-primary cert-edit-btn admin-only" data-id="${c.id}" style="padding: 6px 12px; font-size: 0.8rem;">${editTxt}</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Bind View & Edit buttons
  grid.querySelectorAll('.cert-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cId = e.currentTarget.getAttribute('data-id');
      openCertViewModal(cId);
    });
  });

  grid.querySelectorAll('.cert-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cId = e.currentTarget.getAttribute('data-id');
      openCertEditModal(cId);
    });
  });
}

// --- Branch Offices Renderer ---
function renderBranches() {
  const grid = document.getElementById('branchesGrid');
  if (!grid) return;

  grid.innerHTML = '';

  branchesList.forEach(b => {
    const card = document.createElement('div');
    card.className = 'cert-card-enhanced';
    card.style.background = b.isHq ? '#f0fdf4' : 'white';
    card.style.borderColor = b.isHq ? '#34d399' : 'var(--border-color)';

    card.innerHTML = `
      <div class="cert-card-content">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 8px;">
          <h4 style="font-size: 1.1rem; color: var(--primary-navy); margin: 0;">🌿 ${b.city}</h4>
          <span style="background: ${b.isHq ? 'var(--agro-teal)' : '#64748b'}; color: white; font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 10px;">
            ${b.isHq ? 'HEADQUARTERS' : 'BRANCH OFFICE'}
          </span>
        </div>
        <p style="color: var(--agro-teal); font-weight: 600; font-size: 0.85rem; margin-bottom: 6px;">🌿 ${b.state} (${b.type})</p>
        <p style="font-size: 0.88rem; margin-bottom: 4px;"><strong>🌿 Contact:</strong> ${b.contactPerson}</p>
        <p style="font-size: 0.85rem; color: var(--text-dark); margin-bottom: 8px; line-height: 1.4;"><strong>🌿 Address:</strong> ${b.address}</p>
        <p style="font-size: 0.85rem; margin-bottom: 4px;"><strong>🌿 Phone:</strong> ${b.phone}</p>
        <p style="font-size: 0.85rem; margin-bottom: 12px;"><strong>🌿 Email:</strong> ${b.email}</p>

        <div class="cert-actions" style="margin-top: auto;">
          <a href="https://wa.me/${b.phone.replace(/[^0-9]/g, '')}" target="_blank" class="btn-secondary" style="text-decoration:none; text-align:center; padding: 6px 10px; font-size: 0.8rem;">🌿 WhatsApp</a>
          <button class="btn-primary edit-branch-btn admin-only" data-id="${b.id}" style="padding: 6px 12px; font-size: 0.8rem;">🌿 Edit Branch</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Bind Edit Branch buttons
  grid.querySelectorAll('.edit-branch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bId = e.currentTarget.getAttribute('data-id');
      openBranchEditModal(bId);
    });
  });
}

// --- Admin Branch Office Management Logic ---
function initBranchUploader() {
  const branchModal = document.getElementById('branchEditModal');
  const branchClose = document.getElementById('branchEditClose');
  const branchForm = document.getElementById('branchEditForm');
  const addBtn = document.getElementById('addNewBranchBtn');
  const deleteBtn = document.getElementById('deleteBranchBtn');

  if (branchClose) branchClose.addEventListener('click', () => branchModal.classList.remove('show'));

  if (addBtn) {
    addBtn.addEventListener('click', () => openBranchEditModal(null));
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      const id = document.getElementById('branchEditId').value;
      if (id) {
        branchesList = branchesList.filter(b => b.id !== id);
        localStorage.setItem('custom_branch_offices', JSON.stringify(branchesList));
        renderBranches();
        branchModal.classList.remove('show');
        alert('?🌿 Branch Office removed successfully.');
      }
    });
  }

  if (branchForm) {
    branchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('branchEditId').value;
      const city = document.getElementById('branchInputCity').value.trim();
      const state = document.getElementById('branchInputState').value.trim();
      const type = document.getElementById('branchInputType').value.trim();
      const person = document.getElementById('branchInputPerson').value.trim();
      const address = document.getElementById('branchInputAddress').value.trim();
      const phone = document.getElementById('branchInputPhone').value.trim();
      const email = document.getElementById('branchInputEmail').value.trim();

      if (id) {
        // Edit existing branch
        const b = branchesList.find(item => item.id === id);
        if (b) {
          b.city = city;
          b.state = state;
          b.type = type;
          b.contactPerson = person;
          b.address = address;
          b.phone = phone;
          b.email = email;
        }
      } else {
        // Add new branch
        branchesList.push({
          id: `branch-${Date.now()}`,
          city, state, type, contactPerson: person, address, phone, email, isHq: false
        });
      }

      localStorage.setItem('custom_branch_offices', JSON.stringify(branchesList));
      renderBranches();
      branchModal.classList.remove('show');
      alert('? Branch Office details saved successfully!');
    });
  }
}

function openBranchEditModal(branchId) {
  const deleteBtn = document.getElementById('deleteBranchBtn');

  if (branchId) {
    const b = branchesList.find(item => item.id === branchId);
    if (!b) return;

    document.getElementById('branchEditId').value = b.id;
    document.getElementById('branchInputCity').value = b.city;
    document.getElementById('branchInputState').value = b.state;
    document.getElementById('branchInputType').value = b.type;
    document.getElementById('branchInputPerson').value = b.contactPerson;
    document.getElementById('branchInputAddress').value = b.address;
    document.getElementById('branchInputPhone').value = b.phone;
    document.getElementById('branchInputEmail').value = b.email;

    if (deleteBtn) deleteBtn.style.display = b.isHq ? 'none' : 'block';
  } else {
    document.getElementById('branchEditId').value = '';
    document.getElementById('branchInputCity').value = '';
    document.getElementById('branchInputState').value = '';
    document.getElementById('branchInputType').value = '';
    document.getElementById('branchInputPerson').value = '';
    document.getElementById('branchInputAddress').value = '';
    document.getElementById('branchInputPhone').value = '+91 78619 97755';
    document.getElementById('branchInputEmail').value = 'atul2670@gmail.com';

    if (deleteBtn) deleteBtn.style.display = 'none';
  }

  const branchModal = document.getElementById('branchEditModal');
  if (branchModal) branchModal.classList.add('show');
}

// --- Admin Manager: Customer Inquiries & File Downloads ---
function initAdminInquiriesManager() {
  const modal = document.getElementById('inquiriesModal');
  const closeBtn = document.getElementById('inquiriesModalClose');
  const clearBtn = document.getElementById('clearInquiriesBtn');

  document.querySelectorAll('.open-inquiries-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      renderInquiriesList();
      if (modal) modal.classList.add('show');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('show'));

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm("🌿 ?🌿 ?🌿 ?🌿 ?????🌿 ????????🌿 ??????🌿 ???🌿 ??🌿 ???🌿 ???")) {
        rfqInquiries = [];
        localStorage.setItem('custom_rfq_inquiries', JSON.stringify(rfqInquiries));
        renderInquiriesList();
      }
    });
  }
}

function renderInquiriesList() {
  const container = document.getElementById('inquiriesListContainer');
  if (!container) return;

  if (rfqInquiries.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 35px 20px; color: var(--text-muted);">
        <span style="font-size: 2.8rem; display:block; margin-bottom: 8px;">??</span>
        <p style="font-size: 0.95rem; font-weight: 600;">?🌿 ??🌿 ?🌿 ??????🌿 ????????🌿 🌿 ??🌿 ???????🌿 ??🌿 ???.</p>
        <p style="font-size: 0.85rem;">????🌿 🌿 ????🌿 Request Export Quotation ???🌿 ??🌿 🌿 (.jpg, .png, .pdf) ??🌿 ????, ????🌿 ??🌿 ?🌿 ???🌿 ?🌿 ?????🌿 ???🌿 ????🌿 ?🌿 ???.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = rfqInquiries.map((item) => {
    const hasFile = !!item.fileData;
    const isPdf = hasFile && (item.fileType?.includes('pdf') || item.fileName?.toLowerCase().endsWith('.pdf'));

    const fileDownloadBtn = hasFile ? `
      <a href="${item.fileData}" download="${item.fileName || 'customer_attachment'}" class="btn-primary" style="padding: 6px 14px; font-size: 0.82rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; background: #059669;">
        🌿 Save & Download File (${item.fileName || 'Attachment'})
      </a>
    ` : '<span style="color: var(--text-muted); font-size: 0.8rem;">?🌿 ??🌿 ??🌿 ?🌿 ???</span>';

    return `
      <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-bottom: 14px; box-shadow: var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
          <h4 style="color: var(--primary-navy); margin: 0; font-size: 1.05rem;">🌿 ${item.name} (${item.country})</h4>
          <span style="font-size: 0.78rem; font-weight: 600; color: var(--agro-teal); background: #f0fdf4; padding: 3px 8px; border-radius: 12px;">🌿 ${item.date}</span>
        </div>

        <div style="font-size: 0.88rem; line-height: 1.6; color: var(--text-dark); margin-bottom: 12px;">
          <p><strong>🌿 Phone / WhatsApp:</strong> ${item.phone} &nbsp;|&nbsp; <strong>🌿 Email:</strong> ${item.email}</p>
          <p><strong>🌿 Product Category:</strong> ${item.product} &nbsp;|&nbsp; <strong>Quantity:</strong> ${item.qty || 'N/A'}</p>
          <p style="background: #f8fafc; padding: 8px; border-radius: 6px; margin-top: 6px;"><strong>🌿 Customer Specs / Requirements:</strong> ${item.message || 'None'}</p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px dashed var(--border-color); flex-wrap: wrap; gap: 10px;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-navy);">
            ${hasFile ? (isPdf ? `🌿 Attached PDF: ${item.fileName}` : `?🌿 Attached Image: ${item.fileName}`) : '🌿 Customer File:'}
          </div>
          <div style="display:flex; gap: 8px; flex-wrap: wrap;">
            ${fileDownloadBtn}
            <a href="https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.name)},%20thank%20you%20for%20your%20inquiry%20regarding%20${encodeURIComponent(item.product)}." target="_blank" class="btn-secondary" style="padding: 6px 12px; font-size: 0.82rem; text-decoration: none; background: #25D366; color: white; border: none; font-weight: 600;">
              🌿 Reply on WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- Direct File Attachment Handling for RFQ Inquiry Form ---
function initRfqFileAttachment() {
  const inlineInput = document.getElementById('rfqInlinePdfInput');
  const inlineNotice = document.getElementById('rfqInlinePdfNotice');
  const modalInput = document.getElementById('rfqModalPdfInput');
  const modalNotice = document.getElementById('rfqModalPdfNotice');

  if (inlineInput && inlineNotice) {
    inlineInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          currentInlineAttachedFile = {
            fileName: file.name,
            fileType: file.type,
            fileData: ev.target.result
          };
          const sizeKb = Math.round(file.size / 1024);
          const icon = file.type.includes('pdf') ? '🌿 PDF' : '?🌿 Image';
          inlineNotice.style.display = 'block';
          inlineNotice.innerHTML = `? ${icon} Attached: <strong>${file.name}</strong> (${sizeKb} KB)`;
        };
        reader.readAsDataURL(file);
      } else {
        currentInlineAttachedFile = null;
        inlineNotice.style.display = 'none';
      }
    });
  }

  if (modalInput && modalNotice) {
    modalInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          currentModalAttachedFile = {
            fileName: file.name,
            fileType: file.type,
            fileData: ev.target.result
          };
          const sizeKb = Math.round(file.size / 1024);
          const icon = file.type.includes('pdf') ? '🌿 PDF' : '?🌿 Image';
          modalNotice.style.display = 'block';
          modalNotice.innerHTML = `? ${icon} Attached: <strong>${file.name}</strong> (${sizeKb} KB)`;
        };
        reader.readAsDataURL(file);
      } else {
        currentModalAttachedFile = null;
        modalNotice.style.display = 'none';
      }
    });
  }
}

// --- RFQ Form Submissions Handling ---
function initRfqFormSubmissions() {
  const rfqFormInline = document.getElementById('rfqFormInline');
  const rfqFormModal = document.getElementById('rfqFormModal');

  if (rfqFormInline) {
    rfqFormInline.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameEl = document.getElementById('rfqInlineName');
      const emailEl = document.getElementById('rfqInlineEmail');
      const phoneEl = document.getElementById('rfqInlinePhone');
      const countryEl = document.getElementById('rfqInlineCountry');
      const productEl = document.getElementById('rfqInlineProduct');
      const qtyEl = document.getElementById('rfqInlineQty');
      const messageEl = document.getElementById('rfqInlineMsg');

      const name = nameEl ? nameEl.value.trim() : 'Customer';
      const email = emailEl ? emailEl.value.trim() : '';
      const phone = phoneEl ? phoneEl.value.trim() : '';
      const country = countryEl ? countryEl.value.trim() : '';
      const product = productEl ? productEl.value : '';
      const qty = qtyEl ? qtyEl.value.trim() : '';
      const message = messageEl ? messageEl.value.trim() : '';

      const inquiryData = {
        id: `rfq-${Date.now()}`,
        name: name || 'Customer',
        email: email || '',
        phone: phone || '',
        country: country || '',
        product: product || 'General Inquiry',
        qty: qty || 'N/A',
        message: message || '',
        date: new Date().toLocaleString(),
        fileName: currentInlineAttachedFile ? currentInlineAttachedFile.fileName : null,
        fileType: currentInlineAttachedFile ? currentInlineAttachedFile.fileType : null,
        fileData: currentInlineAttachedFile ? currentInlineAttachedFile.fileData : null
      };

      rfqInquiries.unshift(inquiryData);
      localStorage.setItem('custom_rfq_inquiries', JSON.stringify(rfqInquiries));

      alert(`? Thank you ${name}! Your export quotation request has been submitted successfully to ADIDEV SMART SOLUTION.`);
      
      rfqFormInline.reset();
      currentInlineAttachedFile = null;
      const notice = document.getElementById('rfqInlinePdfNotice');
      if (notice) notice.style.display = 'none';
    });
  }

  if (rfqFormModal) {
    rfqFormModal.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('rfqModalName');
      const emailEl = document.getElementById('rfqModalEmail');
      const phoneEl = document.getElementById('rfqModalPhone');
      const productEl = document.getElementById('modalProductInput');
      const messageEl = document.getElementById('rfqModalMsg');

      const name = nameEl ? nameEl.value.trim() : 'Customer';
      const email = emailEl ? emailEl.value.trim() : '';
      const phone = phoneEl ? phoneEl.value.trim() : '';
      const product = productEl ? productEl.value.trim() : '';
      const message = messageEl ? messageEl.value.trim() : '';

      const inquiryData = {
        id: `rfq-${Date.now()}`,
        name: name || 'Customer',
        email: email || '',
        phone: phone || '',
        country: 'International',
        product: product || 'General Inquiry',
        qty: 'N/A',
        message: message || '',
        date: new Date().toLocaleString(),
        fileName: currentModalAttachedFile ? currentModalAttachedFile.fileName : null,
        fileType: currentModalAttachedFile ? currentModalAttachedFile.fileType : null,
        fileData: currentModalAttachedFile ? currentModalAttachedFile.fileData : null
      };

      rfqInquiries.unshift(inquiryData);
      localStorage.setItem('custom_rfq_inquiries', JSON.stringify(rfqInquiries));

      alert(`? Thank you ${name}! Your export quotation request has been submitted successfully to ADIDEV SMART SOLUTION.`);

      rfqFormModal.reset();
      currentModalAttachedFile = null;
      const notice = document.getElementById('rfqModalPdfNotice');
      if (notice) notice.style.display = 'none';
      closeModal();
    });
  }
}

// --- Certificate Modals Logic ---
function initCertUploader() {
  const certViewModal = document.getElementById('certViewModal');
  const certViewClose = document.getElementById('certViewClose');
  const certEditModal = document.getElementById('certEditModal');
  const certEditClose = document.getElementById('certEditClose');
  const certEditForm = document.getElementById('certEditForm');
  const addNewCertBtn = document.getElementById('addNewCertBtn');
  const certFileInput = document.getElementById('certFileInput');
  const certUrlInput = document.getElementById('certUrlInput');
  const deleteCertBtn = document.getElementById('deleteCertBtn');

  if (certViewClose) certViewClose.addEventListener('click', () => certViewModal.classList.remove('show'));
  if (certEditClose) certEditClose.addEventListener('click', () => certEditModal.classList.remove('show'));

  if (addNewCertBtn) {
    addNewCertBtn.addEventListener('click', () => openCertEditModal(null));
  }

  // Direct File Upload
  if (certFileInput) {
    certFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          currentEditingCertDoc = event.target.result;
          renderCertPreviewDisplay(currentEditingCertDoc, file.name);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Web URL Preview
  if (certUrlInput) {
    certUrlInput.addEventListener('input', (e) => {
      if (e.target.value.trim()) {
        currentEditingCertDoc = e.target.value.trim();
        renderCertPreviewDisplay(currentEditingCertDoc);
      }
    });
  }

  // Delete Certificate Button
  if (deleteCertBtn) {
    deleteCertBtn.addEventListener('click', () => {
      const id = document.getElementById('certEditId').value;
      if (id) {
        certificatesList = certificatesList.filter(c => c.id !== id);
        localStorage.setItem('custom_certificates', JSON.stringify(certificatesList));
        renderCertificates();
        certEditModal.classList.remove('show');
        alert('?🌿 Certificate removed successfully.');
      }
    });
  }

  // Save Certificate Submit
  if (certEditForm) {
    certEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('certEditId').value;
      const title = document.getElementById('certInputTitle').value.trim();
      const regNo = document.getElementById('certInputReg').value.trim();
      const validity = document.getElementById('certInputVal').value.trim();
      const authority = document.getElementById('certInputAuth').value.trim();
      const scope = document.getElementById('certInputScope').value.trim();
      const docSrc = currentEditingCertDoc || 'images/agro_spices_grains.png';

      if (id) {
        // Edit existing certificate
        const certObj = certificatesList.find(c => c.id === id);
        if (certObj) {
          certObj.title = title;
          certObj.regNo = regNo;
          certObj.validity = validity;
          certObj.authority = authority;
          certObj.scope = scope;
          certObj.image = docSrc;
        }
      } else {
        // Add new certificate
        const newId = `cert-${Date.now()}`;
        certificatesList.push({
          id: newId,
          title: title,
          regNo: regNo,
          validity: validity,
          authority: authority,
          scope: scope,
          image: docSrc
        });
      }

      localStorage.setItem('custom_certificates', JSON.stringify(certificatesList));
      renderCertificates();
      certEditModal.classList.remove('show');
      alert('? Certificate details saved successfully!');
    });
  }
}

function renderCertPreviewDisplay(src, fileName = '') {
  const container = document.getElementById('certDocPreviewDisplay');
  if (!container) return;

  if (isPdfDoc(src)) {
    container.innerHTML = `
      <div style="background: #ecfdf5; border: 1px dashed #34d399; padding: 12px; border-radius: 8px; color: #065f46; font-weight: 700; font-size: 0.9rem;">
        🌿 PDF Document Attached: ${fileName ? `<strong>${fileName}</strong>` : 'Loaded'}
      </div>
    `;
  } else {
    container.innerHTML = `
      <div style="margin-bottom: 6px; font-size: 0.85rem; font-weight: 600; color: #059669;">
        ?🌿 Image File Attached: ${fileName ? `<strong>${fileName}</strong>` : ''}
      </div>
      <img src="${src}" alt="Preview" style="max-height: 140px; border-radius: 6px; border: 1px solid var(--border-color); object-fit: cover;" onerror="this.onerror=null; this.src='images/agro_spices_grains.png';">
    `;
  }
}

function openCertViewModal(certId) {
  const cert = certificatesList.find(c => c.id === certId);
  if (!cert) return;

  const certTitle = typeof cert.title === 'object' ? (cert.title[currentLang] || cert.title['en']) : cert.title;

  document.getElementById('certViewTitle').textContent = certTitle;
  document.getElementById('certViewReg').textContent = cert.regNo;
  document.getElementById('certViewAuth').textContent = cert.authority;
  document.getElementById('certViewVal').textContent = cert.validity;
  document.getElementById('certViewScope').textContent = cert.scope || "Verified Export Quality Compliance Document.";

  const viewerContainer = document.getElementById('certDocumentViewerContainer');
  if (isPdfDoc(cert.image)) {
    viewerContainer.innerHTML = `
      <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: 10px; padding: 10px; text-align: center;">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--agro-teal); display: block; margin-bottom: 8px;">
          🌿 Official PDF Document View (?????🌿 🌿 ????🌿 ????)
        </span>
        <iframe src="${cert.image}#toolbar=0&navpanes=0&scrollbar=1" style="width: 100%; height: 420px; border: 1px solid var(--border-color); border-radius: 8px; background: white;" title="${certTitle}"></iframe>
      </div>
    `;
  } else {
    viewerContainer.innerHTML = `
      <img src="${cert.image}" alt="Certificate Document" oncontextmenu="return false;" style="max-height: 380px; width: 100%; object-fit: contain; border-radius: 8px; border: 1px solid var(--border-color); background: #f8fafc;" onerror="this.onerror=null; this.src='images/agro_spices_grains.png';">
    `;
  }

  const certViewModal = document.getElementById('certViewModal');
  if (certViewModal) certViewModal.classList.add('show');
}

function openCertEditModal(certId) {
  const deleteBtn = document.getElementById('deleteCertBtn');

  if (certId) {
    // Edit existing certificate
    const cert = certificatesList.find(c => c.id === certId);
    if (!cert) return;

    const certTitle = typeof cert.title === 'object' ? (cert.title[currentLang] || cert.title['en']) : cert.title;

    document.getElementById('certEditId').value = cert.id;
    document.getElementById('certInputTitle').value = certTitle;
    document.getElementById('certInputReg').value = cert.regNo;
    document.getElementById('certInputVal').value = cert.validity;
    document.getElementById('certInputAuth').value = cert.authority;
    document.getElementById('certInputScope').value = cert.scope || '';
    document.getElementById('certFileInput').value = '';
    document.getElementById('certUrlInput').value = '';
    
    currentEditingCertDoc = cert.image;
    renderCertPreviewDisplay(currentEditingCertDoc);

    if (deleteBtn) deleteBtn.style.display = 'block';
  } else {
    // New certificate
    document.getElementById('certEditId').value = '';
    document.getElementById('certInputTitle').value = '';
    document.getElementById('certInputReg').value = '';
    document.getElementById('certInputVal').value = '';
    document.getElementById('certInputAuth').value = '';
    document.getElementById('certInputScope').value = '';
    document.getElementById('certFileInput').value = '';
    document.getElementById('certUrlInput').value = '';
    
    currentEditingCertDoc = 'images/agro_spices_grains.png';
    renderCertPreviewDisplay(currentEditingCertDoc);

    if (deleteBtn) deleteBtn.style.display = 'none';
  }

  const certEditModal = document.getElementById('certEditModal');
  if (certEditModal) certEditModal.classList.add('show');
}

// --- Event Listeners ---
function initEventListeners() {
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });

    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedLang = e.currentTarget.dataset.lang;
        setLanguage(selectedLang);
        langDropdown.classList.remove('show');
      });
    });
  }

  // Product Category Filter Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      const tabBtn = e.currentTarget;
      tabBtn.classList.add('active');
      currentCategory = tabBtn.getAttribute('data-filter') || 'all';
      renderProducts();
    });
  });

  // RFQ Modal Controller
  const modal = document.getElementById('rfqModal');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.open-rfq-modal').forEach(btn => {
    btn.addEventListener('click', () => openModal());
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Products Dropdown Navigation Toggle (Click support)
  const productsNavBtn = document.getElementById('productsNavBtn');
  if (productsNavBtn) {
    productsNavBtn.addEventListener('click', (e) => {
      const parentLi = productsNavBtn.closest('.nav-dropdown-item');
      if (parentLi) {
        parentLi.classList.toggle('show-mega');
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown-item')) {
        document.querySelectorAll('.nav-dropdown-item').forEach(el => el.classList.remove('show-mega'));
      }
    });
  }
}

// --- Multi-Photo Uploader & Manager Logic ---
function showNotice(msg, isError = false) {
  const noticeBox = document.getElementById('modalNoticeBox');
  if (!noticeBox) return;
  noticeBox.style.display = 'block';
  noticeBox.style.background = isError ? '#fee2e2' : '#ecfdf5';
  noticeBox.style.color = isError ? '#991b1b' : '#065f46';
  noticeBox.style.border = isError ? '1px solid #f87171' : '1px solid #34d399';
  noticeBox.innerHTML = msg;
}

function initPhotoUploader() {
  const photoModal = document.getElementById('photoModal');
  const photoModalClose = document.getElementById('photoModalClose');
  const photoForm = document.getElementById('photoUploadForm');
  const photoFileInput = document.getElementById('photoFileInput');
  const photoUrlInput = document.getElementById('photoUrlInput');
  const addUrlBtn = document.getElementById('addUrlBtn');
  const resetGalleryBtn = document.getElementById('resetGalleryBtn');

  if (photoModalClose) photoModalClose.addEventListener('click', closePhotoModal);

  if (photoModal) {
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) closePhotoModal();
    });
  }

  // Reset to Default Photos Button
  if (resetGalleryBtn) {
    resetGalleryBtn.addEventListener('click', () => {
      if (currentEditingProductId) {
        const prod = productsData.find(p => p.id === currentEditingProductId);
        currentEditingGallery = [...(prod.images || [prod.image])];
        delete customGalleries[currentEditingProductId];
        localStorage.setItem('custom_product_galleries', JSON.stringify(customGalleries));
        renderGalleryThumbnails();
        showNotice("🌿 Photo gallery reset to default images.");
      }
    });
  }

  // File Input: Multiple files reading via FileReader
  if (photoFileInput) {
    photoFileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        let loadedCount = 0;
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (event) => {
            currentEditingGallery.push(event.target.result);
            loadedCount++;
            if (loadedCount === files.length) {
              renderGalleryThumbnails();
              photoFileInput.value = '';
              showNotice(`? ${files.length} File(s) added to gallery list! Click Save Gallery below.`);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    });
  }

  // Helper Function: Add URL to Gallery
  const addUrlToGallery = () => {
    const url = photoUrlInput.value.trim();
    if (!url) {
      showNotice("🌿 Please paste a valid image Web URL first.", true);
      return;
    }
    currentEditingGallery.push(url);
    renderGalleryThumbnails();
    photoUrlInput.value = '';
    showNotice(`? Photo URL added as Item ${currentEditingGallery.length}! Click "Save Gallery" below to finalize.`);
  };

  // Add URL Button Click
  if (addUrlBtn) {
    addUrlBtn.addEventListener('click', addUrlToGallery);
  }

  // Prevent Enter key in URL input from submitting form without adding URL
  if (photoUrlInput) {
    photoUrlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addUrlToGallery();
      }
    });
  }

  // Save Gallery Submit
  if (photoForm) {
    photoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Auto-add text inside photoUrlInput if user typed URL and clicked Save without clicking Add first
      if (photoUrlInput && photoUrlInput.value.trim()) {
        currentEditingGallery.push(photoUrlInput.value.trim());
        photoUrlInput.value = '';
      }

      if (currentEditingProductId && currentEditingGallery.length > 0) {
        customGalleries[currentEditingProductId] = [...currentEditingGallery];
        localStorage.setItem('custom_product_galleries', JSON.stringify(customGalleries));
        activePhotoIndices[currentEditingProductId] = 0;
        renderProducts();
        closePhotoModal();
        alert('? Product photo gallery saved successfully!');
      } else {
        showNotice('🌿 Please keep at least one photo in the gallery.', true);
      }
    });
  }
}

function renderGalleryThumbnails() {
  const grid = document.getElementById('galleryThumbnailsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  currentEditingGallery.forEach((imgSrc, idx) => {
    const item = document.createElement('div');
    item.className = 'gallery-thumb-item';
    const label = idx === 0 ? 'Cover Photo' : `Photo ${idx + 1}`;
    
    item.innerHTML = `
      <img src="${imgSrc}" alt="${label}" onerror="this.onerror=null; this.src='images/agro_spices_grains.png';">
      <button class="thumb-delete-btn" data-idx="${idx}" title="Delete Photo">?</button>
      <span class="thumb-cover-badge">${idx === 0 ? 'Cover (Main)' : `Item ${idx + 1}`}</span>
      <input type="file" class="replace-slot-input" id="replace-file-${idx}" style="display:none;">
      <button type="button" class="replace-slot-btn" data-idx="${idx}">🌿 Change</button>
    `;
    grid.appendChild(item);
  });

  // Bind Replace / Change photo for specific slot
  grid.querySelectorAll('.replace-slot-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
      const fileInput = document.getElementById(`replace-file-${idx}`);
      if (fileInput) fileInput.click();
    });
  });

  grid.querySelectorAll('.replace-slot-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const idx = parseInt(e.target.id.replace('replace-file-', ''));
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          currentEditingGallery[idx] = event.target.result;
          renderGalleryThumbnails();
          showNotice(`? ${idx === 0 ? 'Cover Photo' : 'Photo ' + (idx + 1)} replaced! Click Save Gallery below.`);
        };
        reader.readAsDataURL(file);
      }
    });
  });

  // Bind Delete buttons
  grid.querySelectorAll('.thumb-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const i = parseInt(e.target.getAttribute('data-idx'));
      currentEditingGallery.splice(i, 1);
      renderGalleryThumbnails();
      showNotice("?🌿 Photo removed from gallery list.");
    });
  });
}

function openPhotoModal(productId) {
  currentEditingProductId = productId;
  const prod = productsData.find(p => p.id === productId);
  currentEditingGallery = [...getProductImages(prod)];

  const photoProductId = document.getElementById('photoProductId');
  if (photoProductId) photoProductId.value = productId;

  const photoUrlInput = document.getElementById('photoUrlInput');
  if (photoUrlInput) photoUrlInput.value = '';

  const noticeBox = document.getElementById('modalNoticeBox');
  if (noticeBox) noticeBox.style.display = 'none';

  renderGalleryThumbnails();

  const photoModal = document.getElementById('photoModal');
  if (photoModal) photoModal.classList.add('show');
}

function closePhotoModal() {
  const photoModal = document.getElementById('photoModal');
  if (photoModal) photoModal.classList.remove('show');
}

function openModal(productName = '') {
  const modal = document.getElementById('rfqModal');
  const productInput = document.getElementById('modalProductInput');
  if (productInput) {
    productInput.value = productName ? `Inquiry for: ${productName}` : '';
  }
  if (modal) modal.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('rfqModal');
  if (modal) modal.classList.remove('show');
}

// --- Sub-Products / Variants Management Controller ---

function initSubProductsManager() {
  const modal = document.getElementById('subProductsModal');
  const closeBtn = document.getElementById('subProductsModalClose');
  const listContainer = document.getElementById('subProductsListContainer');
  const form = document.getElementById('subProductForm');
  const parentIdInput = document.getElementById('subProductParentId');
  const subIdInput = document.getElementById('subProductId');
  const noticeBox = document.getElementById('subNoticeBox');
  const resetBtn = document.getElementById('resetSubProductsBtn');
  const cancelEditBtn = document.getElementById('cancelSubEditBtn');

  // Multi-Photo Upload Elements
  const fileInput = document.getElementById('subInputFile');
  const imageInput = document.getElementById('subInputImage');
  const addSubUrlBtn = document.getElementById('addSubUrlBtn');
  const multiPhotosGrid = document.getElementById('subMultiPhotosGrid');
  const countBadge = document.getElementById('subPhotoCountBadge');

  let currentSubEditingPhotos = [];

  if (!modal || !closeBtn || !form) return;

  function showNotice(msg, isSuccess = true) {
    if (!noticeBox) return;
    noticeBox.style.display = 'block';
    noticeBox.style.background = isSuccess ? '#dcfce7' : '#fee2e2';
    noticeBox.style.color = isSuccess ? '#15803d' : '#b91c1c';
    noticeBox.style.border = isSuccess ? '1px solid #86efac' : '1px solid #fca5a5';
    noticeBox.textContent = msg;
    setTimeout(() => { noticeBox.style.display = 'none'; }, 3500);
  }

  function renderSubPhotoThumbnails() {
    if (!multiPhotosGrid) return;
    multiPhotosGrid.innerHTML = '';
    if (countBadge) countBadge.textContent = `${currentSubEditingPhotos.length} Photo(s)`;

    if (currentSubEditingPhotos.length === 0) {
      multiPhotosGrid.innerHTML = `<span style="font-size: 0.8rem; color: var(--text-muted);">?🌿 ??🌿 ?🌿 ??🌿 ??🌿 ??🌿 ???. ???🌿 ??🌿 ?????🌿 ???.</span>`;
      return;
    }

    currentSubEditingPhotos.forEach((src, idx) => {
      const thumb = document.createElement('div');
      thumb.style.cssText = 'position: relative; width: 54px; height: 54px; border-radius: 6px; border: 1px solid #cbd5e1; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);';
      thumb.innerHTML = `
        <img src="${src}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='images/agro_spices_grains.png';">
        <button type="button" class="del-sub-photo-btn" data-idx="${idx}" style="position: absolute; top: 2px; right: 2px; background: rgba(220,38,38,0.9); color: white; border: none; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Remove Photo">✕</button>
      `;
      multiPhotosGrid.appendChild(thumb);
    });

    multiPhotosGrid.querySelectorAll('.del-sub-photo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        currentSubEditingPhotos.splice(i, 1);
        renderSubPhotoThumbnails();
      });
    });
  }

  // File Input Multi-Files Reader
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        let loadedCount = 0;
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            currentSubEditingPhotos.push(evt.target.result);
            loadedCount++;
            if (loadedCount === files.length) {
              renderSubPhotoThumbnails();
              fileInput.value = '';
              showNotice(`✅ ${files.length} Photos added successfully!`);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    });
  }

  // Add URL Photo Button
  if (addSubUrlBtn) {
    addSubUrlBtn.addEventListener('click', () => {
      const url = imageInput.value.trim();
      if (!url) {
        showNotice("⚠️ Please enter a valid Web Image URL.", false);
        return;
      }
      currentSubEditingPhotos.push(url);
      imageInput.value = '';
      renderSubPhotoThumbnails();
      showNotice("✅ Photo Web URL added!");
    });
  }

  function resetForm() {
    form.reset();
    subIdInput.value = '';
    currentSubEditingPhotos = [];
    if (fileInput) fileInput.value = '';
    if (imageInput) imageInput.value = '';
    renderSubPhotoThumbnails();

    const headerTitle = document.getElementById('subFormHeaderTitle');
    if (headerTitle) headerTitle.textContent = '➕ Add New Sub-Product / Variant (નવી પેટા પ્રોડક્ટ ઉમેરો):';
    if (cancelEditBtn) cancelEditBtn.style.display = 'none';
  }

  function renderSubProductsList(parentId) {
    const parentProd = productsData.find(p => p.id === parentId);
    if (!parentProd) return;

    const subList = getProductSubProducts(parentProd);
    listContainer.innerHTML = '';

    if (subList.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); font-size: 0.88rem; padding: 20px; background: white; border-radius: 8px; border: 1px dashed var(--border-color);">
          ? ?????????🌿 ?🌿 ?🌿 ??🌿 ??????🌿 ?????🌿 ???. ????🌿 ???🌿 ?🌿 ?🌿 ??🌿 ??????🌿 ???🌿 ?🌿 ??.
        </div>`;
      return;
    }

    subList.forEach((sub, index) => {
      const subNameEn = sub.names ? (sub.names.en || sub.name) : (sub.name || '');
      const subNameGu = sub.names ? (sub.names.gu || sub.name) : (sub.name || '');
      const photoCount = sub.images ? sub.images.length : (sub.image ? 1 : 0);
      const primaryPhoto = sub.images && sub.images.length > 0 ? sub.images[0] : (sub.image || 'images/agro_spices_grains.png');

      const item = document.createElement('div');
      item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: white; padding: 12px 14px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 0.88rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04);';
      
      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
          <div style="position: relative;">
            <img src="${primaryPhoto}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px; border: 1px solid #e2e8f0;" onerror="this.src='images/agro_spices_grains.png';">
            <span style="position: absolute; bottom: -4px; right: -4px; background: var(--primary-navy); color: white; font-size: 9px; padding: 1px 4px; border-radius: 4px; font-weight: 700;">🌿 ${photoCount}</span>
          </div>
          <div>
            <div style="font-weight: 700; color: var(--primary-navy);">
              🌿 ${subNameGu || subNameEn} <span style="font-weight: 500; color: var(--text-muted); font-size: 0.8rem;">(${subNameEn})</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 3px; display: flex; flex-wrap: wrap; gap: 8px;">
              ${sub.spec ? `<span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${sub.spec}</span>` : ''} 
              ${sub.moq ? `<span style="background: #fef3c7; color: #b45309; padding: 2px 6px; border-radius: 4px; font-weight: 600;">MOQ: ${sub.moq}</span>` : ''}
              ${sub.hsCode ? `<span style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px;">HS: ${sub.hsCode}</span>` : ''}
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 6px; margin-left: 10px;">
          <button type="button" class="btn-secondary edit-single-sub-btn" data-index="${index}" style="padding: 5px 10px; font-size: 0.76rem; background: #e0f2fe; color: #0369a1; border-color: #7dd3fc; font-weight: 600;">🌿 Edit</button>
          <button type="button" class="btn-secondary delete-single-sub-btn" data-index="${index}" style="padding: 5px 10px; font-size: 0.76rem; background: #fee2e2; color: #dc2626; border-color: #fca5a5; font-weight: 600;">?🌿 Delete</button>
        </div>
      `;

      listContainer.appendChild(item);
    });

    // Bind Edit Handlers
    listContainer.querySelectorAll('.edit-single-sub-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        const currentSubList = getProductSubProducts(parentProd);
        const sub = currentSubList[idx];
        if (!sub) return;

        subIdInput.value = sub.id || `sub-${idx}`;
        document.getElementById('subInputNameEn').value = sub.names ? sub.names.en : sub.name || '';
        document.getElementById('subInputNameGu').value = sub.names ? sub.names.gu : sub.name || '';
        document.getElementById('subInputSpec').value = sub.spec || '';
        document.getElementById('subInputMoq').value = sub.moq || '';
        document.getElementById('subInputHsCode').value = sub.hsCode || '';

        currentSubEditingPhotos = sub.images && sub.images.length > 0 ? [...sub.images] : (sub.image ? [sub.image] : []);
        renderSubPhotoThumbnails();

        const headerTitle = document.getElementById('subFormHeaderTitle');
        if (headerTitle) headerTitle.textContent = '✏️ Edit Sub-Product (??🌿 ??????🌿 ??🌿 ???):';
        if (cancelEditBtn) cancelEditBtn.style.display = 'inline-block';
      });
    });

    // Bind Delete Handlers
    listContainer.querySelectorAll('.delete-single-sub-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        let currentSubList = [...getProductSubProducts(parentProd)];
        currentSubList.splice(idx, 1);
        customSubProducts[parentId] = currentSubList;
        localStorage.setItem('custom_sub_products', JSON.stringify(customSubProducts));

        showNotice('??🌿 ??????🌿 ?????????🌿 ???🌿 🌿 ??!');
        renderSubProductsList(parentId);
        renderProducts();
      });
    });
  }

  // Global Open Handler
  window.openSubProductsModal = function(parentId) {
    const parentProd = productsData.find(p => p.id === parentId);
    if (!parentProd) return;
    const parentName = parentProd.names[currentLang] || parentProd.names['en'];
    
    parentIdInput.value = parentId;
    const titleEl = document.getElementById('subProductsModalTitle');
    if (titleEl) titleEl.textContent = `🌿 ${parentName} - Sub-Products Management (??🌿 ??????????)`;
    resetForm();
    renderSubProductsList(parentId);
    modal.classList.add('show');
  };

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      resetForm();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const parentId = parentIdInput.value;
      delete customSubProducts[parentId];
      localStorage.setItem('custom_sub_products', JSON.stringify(customSubProducts));
      showNotice('🌿 ? ??????🌿 ??🌿 ??🌿 ????????🌿 ?????🌿 ??????🌿 ???🌿 🌿 ??!');
      resetForm();
      renderSubProductsList(parentId);
      renderProducts();
    });
  }

  // Form Submission Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const parentId = parentIdInput.value;
    const parentProd = productsData.find(p => p.id === parentId);
    if (!parentProd) {
      showNotice('🌿 Error: Parent product not found.', false);
      return;
    }

    const nameEn = document.getElementById('subInputNameEn').value.trim();
    const nameGu = document.getElementById('subInputNameGu').value.trim();

    if (!nameEn && !nameGu) {
      showNotice('⚠️ Please enter sub-product name in English or Gujarati.', false);
      return;
    }

    const finalNameEn = nameEn || nameGu;
    const finalNameGu = nameGu || nameEn;

    let subList = [...getProductSubProducts(parentProd)];

    const spec = document.getElementById('subInputSpec').value.trim();
    const moq = document.getElementById('subInputMoq').value.trim();
    const hsCode = document.getElementById('subInputHsCode').value.trim();

    const finalPhotos = currentSubEditingPhotos.length > 0 
      ? currentSubEditingPhotos 
      : ['images/agro_spices_grains.png'];

    const targetSubId = subIdInput.value;

    const newSubObj = {
      id: targetSubId || `sub-${Date.now()}`,
      names: { en: finalNameEn, gu: finalNameGu, hi: finalNameEn, fr: finalNameEn },
      spec: spec,
      moq: moq,
      hsCode: hsCode,
      image: finalPhotos[0],
      images: finalPhotos
    };

    if (targetSubId) {
      const existingIdx = subList.findIndex(s => s.id === targetSubId);
      if (existingIdx !== -1) {
        subList[existingIdx] = newSubObj;
      } else {
        subList.push(newSubObj);
      }
    } else {
      subList.push(newSubObj);
    }

    customSubProducts[parentId] = subList;
    localStorage.setItem('custom_sub_products', JSON.stringify(customSubProducts));

    showNotice(`? "${finalNameGu}" ??🌿 ??????🌿 ?????????🌿 ${finalPhotos.length} ??🌿 ??🌿 ?🌿 🌿 ??!`);
    resetForm();
    renderSubProductsList(parentId);
    renderProducts();
    initMegaSubMenu();
  });
}

// --- Customer Sub-Product View Lightbox & Multi-Photo Carousel Controller ---
function initSubProductViewModal() {
  const modal = document.getElementById('subProductViewModal');
  const closeBtn = document.getElementById('subViewClose');
  const inquireBtn = document.getElementById('subViewInquireBtn');
  const prevBtn = document.getElementById('subViewPrevBtn');
  const nextBtn = document.getElementById('subViewNextBtn');
  const counterEl = document.getElementById('subViewCounter');
  const thumbsGrid = document.getElementById('subViewThumbsGrid');
  const imgEl = document.getElementById('subViewImage');

  let activePhotosList = [];
  let currentPhotoIdx = 0;

  if (!modal || !closeBtn) return;

  function updateViewPhoto() {
    if (!imgEl) return;
    if (activePhotosList.length === 0) {
      imgEl.src = 'images/agro_spices_grains.png';
      if (counterEl) counterEl.textContent = '🌿 0/0';
      return;
    }
    imgEl.src = activePhotosList[currentPhotoIdx] || activePhotosList[0];
    if (counterEl) counterEl.textContent = `🌿 ${currentPhotoIdx + 1}/${activePhotosList.length}`;

    if (thumbsGrid) {
      thumbsGrid.querySelectorAll('.sub-view-thumb').forEach((t, i) => {
        t.style.border = (i === currentPhotoIdx) ? '2px solid var(--accent-gold)' : '1px solid #cbd5e1';
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activePhotosList.length <= 1) return;
      currentPhotoIdx--;
      if (currentPhotoIdx < 0) currentPhotoIdx = activePhotosList.length - 1;
      updateViewPhoto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activePhotosList.length <= 1) return;
      currentPhotoIdx++;
      if (currentPhotoIdx >= activePhotosList.length) currentPhotoIdx = 0;
      updateViewPhoto();
    });
  }

  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });

  window.openSubProductViewModal = function(parentProd, sub) {
    const parentName = parentProd ? (parentProd.names[currentLang] || parentProd.names['en']) : '';
    const subNameGu = sub.names ? (sub.names['gu'] || sub.names['en']) : (sub.name || '');
    const subNameEn = sub.names ? sub.names.en : (sub.name || '');
    const displayName = subNameGu ? `${subNameGu} (${subNameEn})` : subNameEn;

    activePhotosList = sub.images && sub.images.length > 0 
      ? [...sub.images] 
      : (sub.image ? [sub.image] : [parentProd.image || 'images/agro_spices_grains.png']);
    
    currentPhotoIdx = 0;

    const titleEl = document.getElementById('subViewTitle');
    if (titleEl) titleEl.textContent = `🌿 ${displayName}`;

    const nameEl = document.getElementById('subViewName');
    if (nameEl) nameEl.textContent = displayName;

    const specEl = document.getElementById('subViewSpec');
    if (specEl) specEl.textContent = sub.spec || 'Standard export quality specification.';

    const parentEl = document.getElementById('subViewParent');
    if (parentEl) parentEl.textContent = parentName;

    const hsEl = document.getElementById('subViewHs');
    if (hsEl) hsEl.textContent = sub.hsCode || parentProd.hsCode || 'N/A';

    const moqEl = document.getElementById('subViewMoq');
    if (moqEl) moqEl.textContent = `${sub.moq || parentProd.moq} | ${sub.packaging || parentProd.packaging}`;

    if (thumbsGrid) {
      thumbsGrid.innerHTML = '';
      if (activePhotosList.length > 1) {
        activePhotosList.forEach((src, idx) => {
          const t = document.createElement('img');
          t.src = src;
          t.className = 'sub-view-thumb';
          t.style.cssText = 'width: 38px; height: 38px; object-fit: cover; border-radius: 5px; cursor: pointer; border: 1px solid #cbd5e1;';
          t.addEventListener('click', () => {
            currentPhotoIdx = idx;
            updateViewPhoto();
          });
          thumbsGrid.appendChild(t);
        });
      }
    }

    const navBox = document.getElementById('subViewCarouselNav');
    if (navBox) {
      navBox.style.display = activePhotosList.length > 1 ? 'flex' : 'none';
    }

    updateViewPhoto();

    if (inquireBtn) {
      inquireBtn.onclick = function() {
        modal.classList.remove('show');
        openModal(`${parentName} - ${subNameEn}`);
      };
    }

    modal.classList.add('show');
  };
}



