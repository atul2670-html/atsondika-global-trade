using System;
using System.IO;
using System.Text;

class Program {
    static void Main() {
        string dir = @"c:\Users\patel\Software\import-export-website";
        var utf8NoBom = new UTF8Encoding(false);

        string i18nContent = @"export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'hi', name: 'હિन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export const translations = {
  en: {
    tagline_top: ""APEDA & ISO Certified Premium Global Exporter | Surat, Gujarat"",
    nav_home: ""Home"",
    nav_about: ""About Us"",
    nav_products: ""Products"",
    nav_quality: ""Quality & Certifications"",
    nav_global: ""Global Reach"",
    nav_contact: ""Contact Us"",
    nav_quote: ""Get Quote"",

    hero_title_1: ""Connecting Premium Quality"",
    hero_title_2: ""Agro Commodities, Industrial Goods & Machinery"",
    hero_title_3: ""To The World"",
    hero_subtitle: ""Trusted Indian Exporter specializing in Spices, Rice, Oilseeds, Industrial Fasteners, New & Used Machinery, Eco Packaging, & Textiles across 40+ countries."",
    hero_btn_products: ""Explore Products"",
    hero_btn_quote: ""Request Quotation"",

    about_badge: ""Leading Exporter from Surat, India"",
    about_title: ""Delivering Excellence from Indian Soil to Global Markets"",
    about_desc: ""We are a premier export and trading house headquartered in Surat, Gujarat. Committed to uncompromised purity, strict quality protocols, and seamless logistics, we export top-tier agricultural produce, industrial supplies, new and used machinery, and sustainable packaging globally."",
    
    feature_1_title: ""APEDA & FSSAI Certified"",
    feature_1_desc: ""Direct sourcing from inspected farms adhering to strict phytosanitary guidelines."",
    feature_2_title: ""Global Logistics Network"",
    feature_2_desc: ""Freight forwarding and container shipping across Asia, Middle East, Europe, and Americas."",
    feature_3_title: ""New & Used Machinery Export"",
    feature_3_desc: ""Tested industrial CNC machinery, textile looms, agro sorting & packaging machines."",

    stat_years: ""12+ Years"",
    stat_years_label: ""Export Excellence"",
    stat_countries: ""45+ Countries"",
    stat_countries_label: ""Global Reach"",
    stat_tons: ""50,000+ MT"",
    stat_tons_label: ""Annual Shipments"",
    stat_clients: ""350+ Clients"",
    stat_clients_label: ""Satisfied Importers"",

    products_title: ""Our Export Product Portfolio"",
    products_subtitle: ""Rigorous quality inspection, international packaging standards, and timely shipment."",
    tab_all: ""All Products"",
    tab_agro: ""Agro Commodities"",
    tab_used_machinery: ""Used Machinery (વપરાયેલ)"",
    tab_new_machinery: ""New Machinery (નવા)"",
    tab_industrial: ""Industrial & Hardware"",
    tab_packaging: ""Eco Packaging"",
    tab_apparel: ""Apparel & Textiles"",

    cert_title: ""Accreditations & Certifications"",
    cert_subtitle: ""Verified export credentials, official government registrations, and quality compliance documents."",
    cert_view: ""🔍 View Document"",
    cert_edit: ""✏️ Edit Details / File"",

    global_title: ""Global Export Destinations"",
    global_subtitle: ""Supplying premium products across major international trade hubs."",
    dest_middle_east: ""Middle East (UAE, Saudi Arabia, Oman, Qatar)"",
    dest_europe: ""Europe (UK, Germany, Netherlands, France)"",
    dest_americas: ""Americas (USA, Canada, Brazil)"",
    dest_asia: ""Southeast Asia (Singapore, Malaysia, Vietnam)"",
    dest_africa: ""Africa (Egypt, Kenya, South Africa)"",

    contact_title: ""Get In Touch With Us"",
    contact_subtitle: ""Have questions about export specs, container pricing, or shipping schedules?"",
    contact_addr_title: ""Headquarters Address"",
    contact_addr_val: ""Atulbhai Ishwarbhai Patel, 201, Safari Complex, Surat-Navsari Main Road, Near Bhestan Canal BRTS Bus Stand, Bhestan, Surat - 395023, Gujarat, India"",
    contact_phone_title: ""Export Desk & WhatsApp"",
    contact_email_title: ""Email Inquiries"",

    form_name: ""e.g. Atulbhai Ishwarbhai Patel / Rajesh Patel"",
    form_email: ""e.g. atul2670@gmail.com"",
    form_phone: ""+91 78619 97755"",
    form_country: ""e.g. United Arab Emirates, France"",
    form_product: ""Select Product Category"",
    form_quantity: ""e.g. 20 Metric Tons / 1 Unit"",
    form_message: ""Mention specs, packing preference, target delivery port..."",
    form_submit: ""Submit RFQ Request"",

    modal_title: ""Request Export Quotation"",
    modal_subtitle: ""Fill in your requirements and our export team will contact you within 24 hours."",

    btn_inquire: ""Inquire Now"",
    btn_manage_photos: ""📷 Multi Photos"",
    btn_manage_sub_products: ""🌿 Sub-Products"",
    sub_products_label: ""Sub-Products & Variants:"",
    upload_modal_title: ""Product Photo Gallery & Management"",
    existing_photos_title: ""Current Product Photos (Click ✕ to delete photo):"",
    upload_or_url: ""Or Add Photo Web URL"",
    upload_save: ""💾 Save Gallery (ગેલરી સેવ કરો)"",

    footer_tagline: ""Your Premier Indian Export Partner for Agro Commodities, Industrial Supplies, Machinery & Packaging."",
    footer_quick_links: ""Quick Navigation"",
    footer_products: ""Product Lines"",
    footer_legal: ""© 2026 ADIDEV SMART SOLUTION. All rights reserved. Registered Export House of India.""
  },
  gu: {
    tagline_top: ""APEDA અને ISO સર્ટિફાઇડ પ્રીમિયમ ગ્લોબલ એક્સપોર્ટર | સુરત, ગુજરાત"",
    nav_home: ""હોમ"",
    nav_about: ""અમારા વિશે"",
    nav_products: ""પ્રોડક્ટ્સ"",
    nav_quality: ""ક્વોલિટી અને સર્ટિફિકેટ્સ"",
    nav_global: ""ગ્લોબલ રીચ"",
    nav_contact: ""સંપર્ક કરો"",
    nav_quote: ""ભાવ મેળવો"",

    hero_title_1: ""શ્રેષ્ઠ ગુણવત્તાયુક્ત"",
    hero_title_2: ""એગ્રો કોમોડિટીઝ, ઔદ્યોગિક માલ અને મશીનરી"",
    hero_title_3: ""વિશ્વભરમાં નિકાસ"",
    hero_subtitle: ""૪૦+ દેશોમાં મસાલા, બાસમતી ચોખા, તેલીબિયાં, ઔદ્યોગિક ફાસ્ટનર્સ, નવા અને વપરાયેલ મશીનરી અને ઇકો પેકેજિંગના વિશ્વસનીય ભારતીય નિકાસકાર."",
    hero_btn_products: ""પ્રોડક્ટ્સ જુઓ"",
    hero_btn_quote: ""ક્વોટેશન રિક્વેસ્ટ કરો"",

    about_badge: ""સુરત, ભારતથી અગ્રણી નિકાસકાર"",
    about_title: ""ભારતીય ભૂમિથી વૈશ્વિક બજારો સુધી શ્રેષ્ઠતા પહોંચાડવી"",
    about_desc: ""અમે સુરત, ગુજરાતમાં હેડક્વાર્ટર ધરાવતી અગ્રણી એક્સપોર્ટ અને ટ્રેડિંગ હાઉસ છીએ. અપ્રતિમ શુદ્ધતા અને ચોક્કસ ગુણવત્તા માટે પ્રતિબદ્ધ રહીને અમે કૃષિ ઉત્પાદનો, ઔદ્યોગિક પુરવઠો, નવા અને જૂના મશીનરી વૈશ્વિક સ્તરે નિકાસ કરીએ છીએ."",

    feature_1_title: ""APEDA અને FSSAI પ્રમાણિત"",
    feature_1_desc: ""ચુસ્ત ગુણવત્તા ધોરણોનું પાલન કરતા તપાસાયેલા ખેતરોમાંથી સીધું સોર્સિંગ."",
    feature_2_title: ""વૈશ્વિક લોજિસ્ટિક્સ નેટવર્ક"",
    feature_2_desc: ""એશિયા, મધ્ય પૂર્વ, યુરોપ અને અમેરિકામાં કન્ટેનર શિપિંગ."",
    feature_3_title: ""નવા અને જૂના (વપરાયેલ) મશીનરી નિકાસ"",
    feature_3_desc: ""ચકાસાયેલ ઔદ્યોગિક CNC મશીનરી, ટેક્સટાઇલ લૂમ્સ, એગ્રો સોર્ટિંગ મશીનો."",

    stat_years: ""૧૨+ વર્ષ"",
    stat_years_label: ""એક્સપોર્ટ અનુભવ"",
    stat_countries: ""૪૫+ દેશો"",
    stat_countries_label: ""વૈશ્વિક પહોંચ"",
    stat_tons: ""૫૦,૦૦૦+ MT"",
    stat_tons_label: ""વાર્ષિક શિપમેન્ટ"",
    stat_clients: ""૩૫૦+ ગ્રાહકો"",
    stat_clients_label: ""સંતોષકારક ઇમ્પોર્ટર્સ"",

    products_title: ""અમારું એક્સપોર્ટ પ્રોડક્ટ પોર્ટફોલિયો"",
    products_subtitle: ""કડક ગુણવત્તા તપાસ, આંતરરાષ્ટ્રીય પેકેજિંગ ધોરણો અને સમયસર શિપમેન્ટ."",
    tab_all: ""બધી પ્રોડક્ટ્સ"",
    tab_agro: ""એગ્રો કોમોડિટીઝ"",
    tab_used_machinery: ""વપરાયેલ મશીનરી (જૂના)"",
    tab_new_machinery: ""નવી મશીનરી (નવા)"",
    tab_industrial: ""ઈન્ડસ્ટ્રીયલ અને હાર્ડવેર"",
    tab_packaging: ""ઇકો પેકેજિંગ"",
    tab_apparel: ""કાપડ અને ટેક્સટાઇલ"",

    cert_title: ""એક્રેડિટેશન્સ અને સર્ટિફિકેશન્સ"",
    cert_subtitle: ""ચકાસાયેલ એક્સપોર્ટ ક્રિડેન્શિયલ્સ અને સરકારી નોંધણી સર્ટિફિકેટ્સ."",
    cert_view: ""🔍 સર્ટિફિકેટ જુઓ"",
    cert_edit: ""✏️ ફોટો/વિગત બદલો"",

    global_title: ""વૈશ્વિક નિકાસ દેશો"",
    global_subtitle: ""મુખ્ય આંતરરાષ્ટ્રીય વેપાર કેન્દ્રો પર પ્રીમિયમ પ્રોડક્ટ્સ સપ્લાય કરીએ છીએ."",
    dest_middle_east: ""મિડલ ઈસ્ટ (UAE, સાઉદી અરેબિયા, ઓમાન, કતાર)"",
    dest_europe: ""યુરોપ (UK, જર્મની, નેધરલેન્ડ, ફ્રાન્સ)"",
    dest_americas: ""અમેરિકા (USA, કેનેડા, બ્રાઝિલ)"",
    dest_asia: ""સાઉથ ઈસ્ટ એશિયા (સિંગાપોર, મલેશિયા, વિયેટનામ)"",
    dest_africa: ""આફ્રિકા (ઈજિપ્ત, કેન્યા, દક્ષિણ આફ્રિકા)"",

    contact_title: ""અમારો સંપર્ક કરો"",
    contact_subtitle: ""ભાવ પત્રક, કન્ટેનર પેકિંગ કે શિપિંગ સમય વિશે પ્રશ્નો છે?"",
    contact_addr_title: ""મુખ્ય ઓફિસ સરનામું"",
    contact_addr_val: ""અતુલભાઈ ઈશ્વરભાઈ પટેલ, ૨૦૧, સફારી કોમ્પલેક્ષ, સુરત-નવસારી મેઈન રોડ, ભેસ્તાન નહેર બી. આર. ટી. એસ. બસ સ્ટેન્ડ પાસે, ભેસ્તાન, સુરત - ૩૯૫૦૨૩, ગુજરાત, ભારત"",
    contact_phone_title: ""એક્સપોર્ટ ડેસ્ક અને WhatsApp"",
    contact_email_title: ""ઈમેઈલ ઈન્ક્વાયરી"",

    form_name: ""દા.ત. અતુલભાઈ ઈશ્વરભાઈ પટેલ / રાજેશ પટેલ"",
    form_email: ""દા.ત. atul2670@gmail.com"",
    form_phone: ""+91 78619 97755"",
    form_country: ""દા.ત. યુનાઈટેડ અરબ અમીરાત, ફ્રાન્સ"",
    form_product: ""પ્રોડક્ટ કેટેગરી સિલેક્ટ કરો"",
    form_quantity: ""દા.ત. ૨૦ મેટ્રિક ટન / ૧ મશીન"",
    form_message: ""વિગતો લખો, પેકિંગ પસંદગી, ટાર્ગેટ ડિલિવરી પોર્ટ..."",
    form_submit: ""RFQ રિક્વેસ્ટ મોકલો"",

    modal_title: ""એક્સપોર્ટ ક્વોટેશન રિક્વેસ્ટ"",
    modal_subtitle: ""તમારી જરૂરિયાતો જણાવો અને અમારી ટીમ ૨૪ કલાકમાં સંપર્ક કરશે."",

    btn_inquire: ""ભાવ પૂછો (Inquire)"",
    btn_manage_photos: ""📷 મલ્ટી ફોટો"",
    upload_modal_title: ""પ્રોડક્ટ ફોટો ગેલેરી અને મેનેજમેન્ટ"",
    existing_photos_title: ""હાલના ફોટા (ડિલીટ કરવા ✕ પર ક્લિક કરો):"",
    upload_or_url: ""અથવા ફોટો Web URL મૂકો"",
    upload_save: ""💾 સેવ ગેલેરી"",

    footer_tagline: ""એગ્રો કોમોડિટીઝ, ઈન્ડસ્ટ્રીયલ માલ, મશીનરી અને પેકેજિંગ માટે તમારું વિશ્વસનીય ભારતીય ભાગીદાર."",
    footer_quick_links: ""ઝડપી નેવિગેશન"",
    footer_products: ""પ્રોડક્ટ લાઇન"",
    footer_legal: ""© ૨૦૨૬ ADIDEV SMART SOLUTION. સર્વાધિકાર સુરક્ષિત.""
  },
  hi: {
    tagline_top: ""APEDA और ISO प्रमाणित प्रीमियम ग्लोबल एक्सपोर्टर | सूरत, गुजरात"",
    nav_home: ""होम"",
    nav_about: ""हमारे बारे में"",
    nav_products: ""उत्पाद"",
    nav_quality: ""गुणवत्ता और प्रमाण पत्र"",
    nav_global: ""ग्लोबल रीच"",
    nav_contact: ""संपर्क करें"",
    nav_quote: ""कोटेशन लें"",

    hero_title_1: ""उच्चतम गुणवत्ता वाले"",
    hero_title_2: ""कृषि उत्पाद, औद्योगिक सामान और मशीनरी"",
    hero_title_3: ""विश्वभर में निर्यात"",
    hero_subtitle: ""40+ देशों में मसाले, बासमती चावल, तिलहन, फास्टनर्स, नई और पुरानी मशीनरी और इको पैकेजिंग के विश्वसनीय भारतीय निर्यातक।"",
    hero_btn_products: ""उत्पाद देखें"",
    hero_btn_quote: ""कोटेशन अनुरोध करें"",

    about_badge: ""सूरत, भारत से प्रमुख निर्यातक"",
    about_title: ""भारतीय भूमि से वैश्विक बाजारों तक उत्कृष्टता पहुँचाना"",
    about_desc: ""हम सूरत, गुजरात में मुख्यालय वाले एक प्रमुख निर्यात और ट्रेडिंग हाउस हैं।"",

    feature_1_title: ""APEDA और FSSAI प्रमाणित"",
    feature_1_desc: ""कड़े गुणवत्ता मानकों का पालन करने वाले खेतों से सीधी आपूर्ति।"",
    feature_2_title: ""वैश्विक लॉजिस्टिक्स नेटवर्क"",
    feature_2_desc: ""एशिया, मध्य पूर्व, यूरोप और अमेरिका में फ्रेट फॉरवर्डिंग।"",
    feature_3_title: ""नई और प्रयुक्त (पुरानी) मशीनरी निर्यात"",
    feature_3_desc: ""परीक्षित औद्योगिक सीएनसी मशीनरी, कपड़ा लूम, कृषि छँटाई मशीनें।"",

    stat_years: ""12+ वर्ष"",
    stat_years_label: ""निर्यात अनुभव"",
    stat_countries: ""45+ देश"",
    stat_countries_label: ""ग्लोबल रीच"",
    stat_tons: ""50,000+ MT"",
    stat_tons_label: ""वार्षिक शिपमेंट"",
    stat_clients: ""350+ ग्राहक"",
    stat_clients_label: ""संतुष्ट आयातक"",

    products_title: ""हमारा निर्यात उत्पाद पोर्टफोलियो"",
    products_subtitle: ""सख्त गुणवत्ता निरीक्षण, अंतरराष्ट्रीय पैकेजिंग मानक और समय पर डिलीवरी।"",
    tab_all: ""सभी उत्पाद"",
    tab_agro: ""कृषि उत्पाद"",
    tab_used_machinery: ""पुरानी मशीनरी"",
    tab_new_machinery: ""नई मशीनरी"",
    tab_industrial: ""इंडस्ट्रियल और हार्डवेयर"",
    tab_packaging: ""इको पैकेजिंग"",
    tab_apparel: ""कपड़े और वस्त्र"",

    cert_title: ""मान्यताएं और प्रमाण पत्र"",
    cert_subtitle: ""सत्यापित निर्यात साख और सरकारी पंजीकरण दस्तावेज़।"",
    cert_view: ""🔍 दस्तावेज़ देखें"",
    cert_edit: ""✏️ विवरण बदलें"",

    global_title: ""वैश्विक निर्यात गंतव्य"",
    global_subtitle: ""प्रमुख अंतरराष्ट्रीय व्यापार केंद्रों पर प्रीमियम उत्पाद आपूर्ति।"",
    dest_middle_east: ""मिडिल ईस्ट (UAE, सऊदी अरब, ओमान, कतर)"",
    dest_europe: ""यूरोप (UK, जर्मनी, नीदरलैंड, फ्रांस)"",
    dest_americas: ""अमेरिका (USA, कनाडा, ब्राजील)"",
    dest_asia: ""दक्षिण पूर्व एशिया (सिंगापुर, मलेशिया, वियतनाम)"",
    dest_africa: ""अफ्रीका (मिस्र, केन्या, दक्षिण अफ्रीका)"",

    contact_title: ""हमसे संपर्क करें"",
    contact_subtitle: ""निर्यात विनिर्देशों, कंटेनर मूल्य निर्धारण के बारे में प्रश्न हैं?"",
    contact_addr_title: ""मुख्यालय का पता"",
    contact_addr_val: ""अतुलभाई ईश्वरभाई पटेल, 201, सफारी कॉम्प्लेक्स, सूरत-नवसारी मेन रोड, भेस्तान नहर बीआरटीएस बस स्टैंड के पास, भेस्तान, सूरत - 395023, गुजरात, भारत"",
    contact_phone_title: ""निर्यात डेस्क और व्हाट्सएप"",
    contact_email_title: ""ईमेल पूछताछ"",

    form_name: ""उदा. अतुलभाई ईश्वरभाई पटेल / राजेश पटेल"",
    form_email: ""उदा. atul2670@gmail.com"",
    form_phone: ""+91 78619 97755"",
    form_country: ""उदा. संयुक्त अरब अमीरात, फ्रांस"",
    form_product: ""उत्पाद श्रेणी चुनें"",
    form_quantity: ""उदा. 20 मीट्रिक टन / 1 यूनिट"",
    form_message: ""विवरण लिखें..."",
    form_submit: ""RFQ अनुरोध सबमिट करें"",

    modal_title: ""निर्यात कोटेशन अनुरोध"",
    modal_subtitle: ""अपनी आवश्यकताएं भरें और हमारी टीम 24 घंटे के भीतर संपर्क करेगी।"",

    btn_inquire: ""कोटेशन लें"",
    btn_manage_photos: ""📷 फोटो गैलरी"",
    upload_modal_title: ""उत्पाद फोटो गैलरी प्रबंधन"",
    existing_photos_title: ""वर्तमान उत्पाद तस्वीरें:"",
    upload_or_url: ""या फोटो वेब URL जोड़ें"",
    upload_save: ""💾 गैलरी सहेजें"",

    footer_tagline: ""कृषि उत्पादों, औद्योगिक सामानों, मशीनरी और पैकेजिंग के लिए आपका प्रमुख भारतीय भागीदार।"",
    footer_quick_links: ""त्वरित नेविगेशन"",
    footer_products: ""उत्पाद लाइनें"",
    footer_legal: ""© 2026 ADIDEV SMART SOLUTION. सर्वाधिकार सुरक्षित.""
  },
  fr: {
    tagline_top: ""Exportateur Mondial Certifié APEDA & ISO | Surat, Gujarat"",
    nav_home: ""Accueil"",
    nav_about: ""À Propos"",
    nav_products: ""Produits"",
    nav_quality: ""Qualité & Certifications"",
    nav_global: ""Portée Mondiale"",
    nav_contact: ""Contactez-nous"",
    nav_quote: ""Obtenir un Devis"",

    hero_title_1: ""Connecter la Qualité Supérieure"",
    hero_title_2: ""Produits Agricoles, Biens Industriels & Machines"",
    hero_title_3: ""Au Monde Entier"",
    hero_subtitle: ""Exportateur indien de confiance spécialisé dans les épices, le riz basmati, les machines et l'emballage écologique vers 40+ pays."",
    hero_btn_products: ""Explorer les Produits"",
    hero_btn_quote: ""Demander un Devis"",

    about_badge: ""Premier Exportateur de Surat, Inde"",
    about_title: ""Livrer l'Excellence du Sol Indien aux Marchés Mondiaux"",
    about_desc: ""Basés à Surat, Gujarat, nous sommes une maison d'exportation et de commerce de premier plan."",

    feature_1_title: ""Certifié APEDA & FSSAI"",
    feature_1_desc: ""Approvisionnement direct auprès de fermes inspectées selon des normes strictes."",
    feature_2_title: ""Réseau Logistique Mondial"",
    feature_2_desc: ""Expédition par conteneur vers l'Asie, le Moyen-Orient, l'Europe et les Amériques."",
    feature_3_title: ""Exportation de Machines Neuves et d'Occasion"",
    feature_3_desc: ""Machines CNC industrielles testées, métiers à tisser textiles."",

    stat_years: ""12+ Ans"",
    stat_years_label: ""Excellence d'Exportation"",
    stat_countries: ""45+ Pays"",
    stat_countries_label: ""Portée Mondiale"",
    stat_tons: ""50 000+ TM"",
    stat_tons_label: ""Expéditions Annuelles"",
    stat_clients: ""350+ Clients"",
    stat_clients_label: ""Importateurs Satisfaits"",

    products_title: ""Notre Portefeuille de Produits d'Exportation"",
    products_subtitle: ""Inspection de qualité rigoureuse, normes d'emballage internationales."",
    tab_all: ""Tous les Produits"",
    tab_agro: ""Produits Agricoles"",
    tab_used_machinery: ""Machines d'Occasion"",
    tab_new_machinery: ""Nouvelles Machines"",
    tab_industrial: ""Industriel & Quincaillerie"",
    tab_packaging: ""Emballage Écologique"",
    tab_apparel: ""Textile & Habillement"",

    cert_title: ""Accréditations & Certifications"",
    cert_subtitle: ""Références d'exportation vérifiées et enregistrements gouvernementaux."",
    cert_view: ""🔍 Voir le Document"",
    cert_edit: ""✏️ Modifier les Détails"",

    global_title: ""Destinations d'Exportation Mondiales"",
    global_subtitle: ""Fourniture de produits de qualité supérieure aux grands centres commerciaux."",
    dest_middle_east: ""Moyen-Orient (Émirats arabes unis, Arabie saoudite, Oman, Qatar)"",
    dest_europe: ""Europe (Royaume-Uni, Allemagne, Pays-Bas, France)"",
    dest_americas: ""Amériques (États-Unis, Canada, Brésil)"",
    dest_asia: ""Asie du Sud-Est (Singapour, Malaisie, Vietnam)"",
    dest_africa: ""Afrique (Égypte, Kenya, Afrique du Sud)"",

    contact_title: ""Contactez-nous"",
    contact_subtitle: ""Des questions sur les prix des conteneurs ou les calendriers d'expédition?"",
    contact_addr_title: ""Adresse du Siège Social"",
    contact_addr_val: ""Atulbhai Ishwarbhai Patel, 201, Safari Complex, Surat-Navsari Main Road, Near Bhestan Canal BRTS Bus Stand, Bhestan, Surat - 395023, Gujarat, Inde"",
    contact_phone_title: ""Bureau d'Exportation & WhatsApp"",
    contact_email_title: ""Demandes par E-mail"",

    form_name: ""ex. Atulbhai Ishwarbhai Patel / Rajesh Patel"",
    form_email: ""ex. atul2670@gmail.com"",
    form_phone: ""+91 78619 97755"",
    form_country: ""ex. Émirats arabes unis, France"",
    form_product: ""Sélectionnez la Catégorie"",
    form_quantity: ""ex. 20 Tonnes Métriques / 1 Unité"",
    form_message: ""Détails de votre demande..."",
    form_submit: ""Soumettre la Demande"",

    modal_title: ""Demande de Devis d'Exportation"",
    modal_subtitle: ""Remplissez vos besoins et notre équipe vous contactera dans les 24 heures."",

    btn_inquire: ""Demander un Devis"",
    btn_manage_photos: ""📷 Galerie Photos"",
    upload_modal_title: ""Gestion de la Galerie Photos"",
    existing_photos_title: ""Photos Actuelles du Produit:"",
    upload_or_url: ""Ou ajoutez une URL Web"",
    upload_save: ""💾 Enregistrer la Galerie"",

    footer_tagline: ""Votre partenaire d'exportation indien privilégié pour les produits agricoles, machines et emballages."",
    footer_quick_links: ""Navigation Rapide"",
    footer_products: ""Lignes de Produits"",
    footer_legal: ""© 2026 ADIDEV SMART SOLUTION. Tous droits réservés.""
  }
};
";
        File.WriteAllText(dir + @"\src\i18n.js", i18nContent, utf8NoBom);
        Console.WriteLine("✅ src/i18n.js restored cleanly!");
    }
}
