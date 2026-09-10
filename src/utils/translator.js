/**
 * Universal Multilingual Translation & Transliteration Engine for Millions of Products Worldwide
 * Powered by Google Transliteration API + Offline Phonetic Engine + Master 4-Language Trade Grammar Dictionary.
 * Supports US English (en-US), Gujarati (gu-IN), Hindi (hi-IN), and Canadian French (fr-CA).
 */

const transliterationCache = new Map();

// 1 to 99 Universal Multilingual Number Words Map across 4 Languages
export const NUMBER_WORDS_MAP = {
  1: { en: 'One', gu: 'એક', hi: 'एक', fr: 'Un' },
  2: { en: 'Two', gu: 'બે', hi: 'दो', fr: 'Deux' },
  3: { en: 'Three', gu: 'ત્રણ', hi: 'तीन', fr: 'Trois' },
  4: { en: 'Four', gu: 'ચાર', hi: 'चार', fr: 'Quatre' },
  5: { en: 'Five', gu: 'પાંચ', hi: 'पाँच', fr: 'Cinq' },
  6: { en: 'Six', gu: 'છ', hi: 'छह', fr: 'Six' },
  7: { en: 'Seven', gu: 'સાત', hi: 'सात', fr: 'Sept' },
  8: { en: 'Eight', gu: 'આઠ', hi: 'आठ', fr: 'Huit' },
  9: { en: 'Nine', gu: 'નવ', hi: 'नौ', fr: 'Neuf' },
  10: { en: 'Ten', gu: 'દસ', hi: 'दस', fr: 'Dix' },
  11: { en: 'Eleven', gu: 'અગિયાર', hi: 'ग्यारह', fr: 'Onze' },
  12: { en: 'Twelve', gu: 'બાર', hi: 'बारह', fr: 'Douze' },
  13: { en: 'Thirteen', gu: 'તેર', hi: 'तेरह', fr: 'Treize' },
  14: { en: 'Fourteen', gu: 'ચૌદ', hi: 'चौदह', fr: 'Quatorze' },
  15: { en: 'Fifteen', gu: 'પંદર', hi: 'पंद्रह', fr: 'Quinze' },
  16: { en: 'Sixteen', gu: 'સોળ', hi: 'सोलह', fr: 'Seize' },
  17: { en: 'Seventeen', gu: 'સત્તર', hi: 'सत्रह', fr: 'Dix-sept' },
  18: { en: 'Eighteen', gu: 'અઢાર', hi: 'अठारह', fr: 'Dix-huit' },
  19: { en: 'Nineteen', gu: 'ઓગણીસ', hi: 'उन्नीस', fr: 'Dix-neuf' },
  20: { en: 'Twenty', gu: 'વીસ', hi: 'बीस', fr: 'Vingt' },
  21: { en: 'Twenty-One', gu: 'એકવીસ', hi: 'इक्कीस', fr: 'Vingt et un' },
  22: { en: 'Twenty-Two', gu: 'બાવીસ', hi: 'बाबीस', fr: 'Vingt-deux' },
  23: { en: 'Twenty-Three', gu: 'તેવીસ', hi: 'तेईस', fr: 'Vingt-trois' },
  24: { en: 'Twenty-Four', gu: 'ચોવીસ', hi: 'चौबीस', fr: 'Vingt-quatre' },
  25: { en: 'Twenty-Five', gu: 'પચ્ચીસ', hi: 'पच्चीस', fr: 'Vingt-cinq' },
  26: { en: 'Twenty-Six', gu: 'છવ્વીસ', hi: 'छब्बीस', fr: 'Vingt-six' },
  27: { en: 'Twenty-Seven', gu: 'સત્તાવીસ', hi: 'सत्ताईस', fr: 'Vingt-sept' },
  28: { en: 'Twenty-Eight', gu: 'અઠ્ઠાવીસ', hi: 'અટ्ठावन', hi: 'अट्ठाईस', fr: 'Vingt-huit' },
  29: { en: 'Twenty-Nine', gu: 'ઓગણત્રીસ', hi: 'उनतीस', fr: 'Vingt-neuf' },
  30: { en: 'Thirty', gu: 'ત્રીસ', hi: 'तीस', fr: 'Trente' },
  31: { en: 'Thirty-One', gu: 'એકત્રીસ', hi: 'इकत्तीस', fr: 'Trente et un' },
  32: { en: 'Thirty-Two', gu: 'બત્રીસ', hi: 'बत्तीस', fr: 'Trente-deux' },
  33: { en: 'Thirty-Three', gu: 'તેત્રીસ', hi: 'सैंतीस', fr: 'Trente-trois' },
  34: { en: 'Thirty-Four', gu: 'ચોત્રીસ', hi: 'चौंतीस', fr: 'Trente-quatre' },
  35: { en: 'Thirty-Five', gu: 'પાંત્રીસ', hi: 'पैंतीस', fr: 'Trente-cinq' },
  36: { en: 'Thirty-Six', gu: 'છત્રીસ', hi: 'छत्तीस', fr: 'Trente-six' },
  37: { en: 'Thirty-Seven', gu: 'સડત્રીસ', hi: 'सैंतीस', fr: 'Trente-sept' },
  38: { en: 'Thirty-Eight', gu: 'અડત્રીસ', hi: 'अड़तीस', fr: 'Trente-huit' },
  39: { en: 'Thirty-Nine', gu: 'ઓગણચાળીસ', hi: 'उनतालीस', fr: 'Trente-neuf' },
  40: { en: 'Forty', gu: 'ચાળીસ', hi: 'चालीस', fr: 'Quarante' },
  50: { en: 'Fifty', gu: 'પચાસ', hi: 'पचास', fr: 'Cinquante' },
  60: { en: 'Sixty', gu: 'સાઠ', hi: 'साठ', fr: 'Soixante' },
  70: { en: 'Seventy', gu: 'સિત્તેર', hi: 'सत्तर', fr: 'Soixante-dix' },
  80: { en: 'Eighty', gu: 'એંસી', hi: 'अस्सी', fr: 'Quatre-vingts' },
  90: { en: 'Ninety', gu: 'નેવું', hi: 'नब्बे', fr: 'Quatre-vingt-dix' }
};

export function convertDigits(numOrStr, lang = 'en') {
  if (numOrStr === undefined || numOrStr === null) return '';
  const str = String(numOrStr);
  if (lang === 'en' || lang === 'fr') return str;

  const guDigits = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];
  const hiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  const targetDigits = lang === 'gu' ? guDigits : (lang === 'hi' ? hiDigits : null);
  if (!targetDigits) return str;

  return str.replace(/\d/g, digit => targetDigits[parseInt(digit, 10)]);
}

export function translateNumberWord(numInput, lang = 'en') {
  const num = parseInt(numInput, 10);
  if (NUMBER_WORDS_MAP[num] && NUMBER_WORDS_MAP[num][lang]) {
    return NUMBER_WORDS_MAP[num][lang];
  }
  return String(numInput);
}

/**
 * Master 4-Language Trade & Commercial Grammar Dictionary
 */
export const MASTER_TRADE_GRAMMAR_DICTIONARY = [
  // Full Sentences & Slogans
  {
    en: /APEDA & ISO Certified Premium Global Exporter \| Surat, Gujarat/gi,
    gu: 'APEDA અને ISO પ્રમાણિત અગ્રણી વૈશ્વિક નિકાસકાર | સુરત, ગુજરાત',
    hi: 'APEDA और ISO प्रमाणित प्रीमियम वैश्विक निर्यातक | सूरत, गुजरात',
    fr: 'Exportateur Mondial Certifié APEDA & ISO | Surat, Gujarat'
  },
  {
    en: /Connecting Premium Quality (Agro Commodities Products|Agro Commodities), Dairy Products, Textile Products, (Ready-made Garments Products|Readymade Garments Products|Ready-made Garments|Readymade Garments), Used Machinery, New Machinery, (Industrial Goods Products|Industrial Goods) & Fasteners To The World\.?/gi,
    gu: 'શ્રેષ્ઠ ગુણવત્તાવાળા એગ્રો કોમોડિટીઝ પ્રોડક્ટ્સ (કૃષિ ઉત્પાદનો), ડેરી પ્રોડક્ટ્સ (ડેરી ઉત્પાદનો), ટેક્સટાઇલ પ્રોડક્ટ્સ (કાપડ ઉત્પાદનો), રેડીમેડ ગારમેન્ટ્સ પ્રોડક્ટ્સ (તૈયાર વસ્ત્ર ઉત્પાદનો), નવી અને વપરાયેલ મશીનરી, ઔદ્યોગિક માલસામાન પ્રોડક્ટ્સ અને ફાસ્ટનર્સને વૈશ્વિક બજારો સાથે જોડતી અગ્રણી ભારતીય નિકાસકાર કંપની.',
    hi: 'उच्च गुणवत्ता वाले कृषि उत्पादों (एग्रो कमोडिटीज), डेयरी उत्पादों (डेयरी प्रोडक्ट्स), कपड़ा उत्पादों (टेक्सटाइल प्रोडक्ट्स), रेडीमेड गारमेंट्स उत्पादों (तैयार वस्त्र), नई और पुरानी मशीनरी, औद्योगिक सामान उत्पादों और फास्टनरों को दुनिया से जोड़ना।',
    fr: 'Connecter les produits agro-alimentaires, produits laitiers, produits textiles, vêtements prêts-à-porter, machines neuves et d\'occasion, produits industriels & boulonnerie de qualité supérieure au monde entier.',
    ar: 'ربط المنتجات الزراعية والغذائية عالية الجودة، ومنتجات الألبان، والمنتجات النسيجية، ومنتجات الملابس الجاهزة، والمعدات الجديدة والمستعملة، والمنتجات الصناعية وأدوات التثبيت بالأسواق العالمية.',
    es: 'Conectando productos agrícolas de calidad superior, productos lácteos, productos textiles, productos de ropa confeccionada, maquinaria nueva y usada, productos industriales y sujetadores con el mundo.',
    de: 'Verbindung von erstklassigen Agrarprodukten, Molkereiprodukten, Textilprodukten, Konfektionskleidungsprodukten, neuen und gebrauchten Maschinen, Industriegüterprodukten und Befestigungselementen mit der Welt.',
    ru: 'Поставка сельскохозяйственной продукции высшего качества, молочной продукции, текстильной продукции, изделий готовой одежды, нового и б/у оборудования, промышленной продукции и крепежа по всему миру.',
    zh: '将优质农产品、乳制品、纺织品产品、成衣服装产品、二手及新型机械、工业品与紧固件产品连接至全球。',
    ja: '高品質な農産物製品、乳製品、繊維製品（テキスタイル）、既製服アパレル製品、中古および新品の産業機械、産業用品・ファスナー製品を世界へ届ける。',
    ko: '고품질 농산물 제품, 유제품, 텍스타일 섬유 제품, 기성복 의류 제품, 중고 및 신형 기계, 산업용품 및 패스너 제품을 전 세계로 연결합니다.',
    pt: 'Conectando produtos agrícolas de qualidade superior, produtos lácteos, produtos têxteis, produtos de vestuário pronto, maquinaria nova e usada, produtos industriais e fixadores ao mundo.',
    it: 'Collegare prodotti agricoli di qualità superiore, prodotti lattiero-caseari, prodotti tessili, prodotti di abbigliamento confezionato, macchinari nuovi e usati, prodotti industriali e bulloneria al mondo.',
    tr: 'Üstün kaliteli tarım ürünlerini, süt ürünlerini, tekstil ürünlerini, hazır giyim ürünlerini, yeni ve ikinci el makineleri, sanayi ürünlerini ve bağlantı elemanlarını dünyaya bağlamak.'
  },
  {
    en: /Trusted Indian Exporter specializing in Spices, Rice, Oilseeds, Fasteners, New & Used Machinery, and Eco Packaging across 40\+ countries/gi,
    gu: 'મસાલા, ચોખા, તેલીબિયાં, ફાસ્ટનર્સ, નવી અને વપરાયેલી મશીનરી, અને ઇકો પેકેજિંગમાં વિશિષ્ટતા ધરાવતો ૪૦+ દેશોમાં વિશ્વસનીય ભારતીય નિકાસકાર.',
    hi: 'मसालों, चावल, तिलहन, फास्टनरों, नई और पुरानी मशीनरी, और इको पैकेजिंग में विशेषज्ञता वाला 40+ से अधिक देशों में विश्वसनीय भारतीय निर्यातक।',
    fr: 'Exportateur indien de confiance spécialisé dans les épices, le riz, les oléagineux, la boulonnerie, les machines neuves et d\'occasion et les emballages écologiques vers plus de 40 pays.'
  },

  // Specifications & Descriptors
  {
    en: /Hi[- ]quality premium product|High[- ]quality premium product|Hi quality premium product|High quality premium product/gi,
    gu: 'ઉચ્ચ ગુણવત્તાવાળી પ્રીમિયમ પ્રોડક્ટ',
    hi: 'उच्च गुणवत्ता वाला प्रीमियम उत्पाद',
    fr: 'Produit Premium de Haute Qualité'
  },
  {
    en: /Hi[- ]quality|High[- ]quality|Hi quality|High quality/gi,
    gu: 'ઉચ્ચ ગુણવત્તાવાળી',
    hi: 'उच्च गुणवत्ता वाला',
    fr: 'Haute Qualité'
  },
  {
    en: /Premium Quality|Export Quality/gi,
    gu: 'એક્સપોર્ટ ક્વોલિટી ગુણવત્તા',
    hi: 'निर्यात गुणवत्ता',
    fr: 'Qualité d\'Exportation Supérieure'
  },
  {
    en: /Standard Export Packaging|Export Packaging|Standard Packaging/gi,
    gu: 'સ્ટાન્ડર્ડ એક્સપોર્ટ પેકેજિંગ',
    hi: 'मानक निर्यात पैकेजिंग',
    fr: 'Emballage d\'Exportation Standard'
  },
  {
    en: /1 Unit \/ Container|1 Unit per Container|Unit \/ Container/gi,
    gu: '૧ યુનિટ / કન્ટેનર',
    hi: '1 यूनिट / कंटेनर',
    fr: '1 Unité par Conteneur'
  },
  {
    en: /Export Item|Export Product/gi,
    gu: 'એક્સપોર્ટ આઈટમ',
    hi: 'निर्यात उत्पाद',
    fr: 'Article d\'Exportation'
  },

  // Agro & Food
  { en: /Chocolates|Chocolate/gi, gu: 'ચોકલેટ', hi: 'चॉकलेट', fr: 'Chocolats', de: 'Schokolade', es: 'Chocolates', ru: 'Шоколад', ar: 'شوكولاتة', zh: '巧克力', ja: 'チョコレート', th: 'ช็อกโกแลต' },
  { en: /Confectionery & Sweets|Confectionery/gi, gu: 'મિઠાઈ અને ચોકલેટ્સ', hi: 'मिष्ठान और चॉकलेट', fr: 'Confiserie & Douceurs', de: 'Süßwaren & Gebäck', es: 'Confitería y Dulces', ru: 'Кондитерские изделия', ar: 'حلويات وشوكولاتة', zh: '糖果与糕点', ja: '製菓・お菓子', th: 'ขนมหวานและขนมขบเคี้ยว' },
  { en: /Red Chilli|Red Chili|Chilli/gi, gu: 'લાલ મરચું', hi: 'लाल मिर्च', fr: 'Piment Rouge', de: 'Roter Chili', es: 'Chili Rojo', ru: 'Красный перец чили', ar: 'فلفل احمر حار', zh: '红辣椒', ja: '赤唐辛子', th: 'พริกแดง' },
  { en: /Cardamom/gi, gu: 'એલચી', hi: 'इलायची', fr: 'Cardamome', de: 'Kardamom', es: 'Cardamomo', ru: 'Кардамон', ar: 'هيل', zh: '豆蔻', ja: 'カルダモン', th: 'กระวาน' },
  { en: /Coriander Seeds|Coriander/gi, gu: 'ધાણા', hi: 'धनिया', fr: 'Graines de Coriandre', de: 'Koriandersamen', es: 'Semillas de Cilantro', ru: 'Семена кориандра', ar: 'كزبرة', zh: '芫荽籽', ja: 'コリアンダーシード', th: 'ลูกผักชี' },
  { en: /Mustard Seeds|Mustard/gi, gu: 'રાઈ', hi: 'सरसों', fr: 'Graines de Moutarde', de: 'Senfsamen', es: 'Semillas de Mostaza', ru: 'Семена горчицы', ar: 'خردل', zh: '芥末籽', ja: 'マスタードシード', th: 'เมล็ดมัสตาร์ด' },
  { en: /Chickpeas|Garbanzo/gi, gu: 'કાબુલી ચણા', hi: 'काबूली चना', fr: 'Pois Chiches', de: 'Kichererbsen', es: 'Garbanzos', ru: 'Нут', ar: 'حمص', zh: '鹰嘴豆', ja: 'ひよこ豆', th: 'ถั่วลูกไก่' },
  { en: /Cumin Seeds|Cumin/gi, gu: 'જીરું', hi: 'जीरा', fr: 'Graines de Cumin', de: 'Kreuzkümmel', es: 'Comino', ru: 'Кумин (Зира)', ar: 'كمون', zh: '孜然', ja: 'クミンシード', th: 'ยี่หร่า' },
  { en: /Turmeric/gi, gu: 'હળદર', hi: 'हल्दी', fr: 'Curcuma', de: 'Kurkuma', es: 'Cúrcuma', ru: 'Куркума', ar: 'كركم', zh: '姜黄粉', ja: 'ターメリック（ウコン）', th: 'ขมิ้น' },
  { en: /Basmati Rice|Rice/gi, gu: 'ચોખા', hi: 'चावल', fr: 'Riz', de: 'Reis', es: 'Arroz', ru: 'Рис Басмати', ar: 'أرز بسمتي', zh: '巴斯马蒂香米', ja: 'バスマティライス', th: 'ข้าวบาสมาติ' },
  { en: /Wheat/gi, gu: 'ઘઉં', hi: 'गेहूं', fr: 'Blé', de: 'Weizen', es: 'Trigo', ru: 'Пшеница', ar: 'قمح', zh: '小麦', ja: '小麦', th: 'ข้าวสาลี' },
  { en: /Sugar/gi, gu: 'ખાંડ', hi: 'चीनी', fr: 'Sucre', de: 'Zucker', es: 'Azúcar', ru: 'Сахар', ar: 'سكر', zh: '白糖', ja: '砂糖', th: 'น้ำตาล' },
  { en: /Peanuts|Groundnut/gi, gu: 'સીંગદાણા', hi: 'मूंगफली', fr: 'Arachides', de: 'Erdnüsse', es: 'Maní / Cacahuates', ru: 'Арахис', ar: 'فول سوداني', zh: '花生米', ja: '落花生・ピーナッツ', th: 'ถั่วลิสง' },
  { en: /Sesame Seeds|Sesame/gi, gu: 'તલ', hi: 'तिल', fr: 'Sésame', de: 'Sesamsamen', es: 'Sésamo / Ajonjolí', ru: 'Семена кунжута', ar: 'سمسم', zh: '芝麻籽', ja: 'ゴマ・白胡麻', th: 'งาดำงาขาว' },
  { en: /Fennel Seeds|Fennel/gi, gu: 'વરિયાળી', hi: 'सौंफ', fr: 'Fenouil', de: 'Fenchelsamen', es: 'Semillas de Hinojo', ru: 'Фенхель', ar: 'شمر', zh: '茴香籽', ja: 'フェンネルシード', th: 'เทียนข้าวเปลือก' },
  { en: /Spices & Agro Commodities|Spices/gi, gu: 'મસાલા અને કૃષિ પેદાશો', hi: 'मसाले और कृषि उत्पाद', fr: 'Épices & Produits Agricoles', de: 'Gewürze & Agrarprodukte', es: 'Especias y Productos Agrícolas', ru: 'Специи и сельхозпродукты', ar: 'توابل ومنتجات زراعية', zh: '香料与农产品', ja: 'スパイス＆農産物', th: 'เครื่องเทศและสินค้าเกษตร' },

  // Garments & Textiles
  { en: /Agro Commodities Products|Agro Commodities/gi, gu: 'એગ્રો કોમોડિટીઝ પ્રોડક્ટ્સ (કૃષિ ઉત્પાદનો)', hi: 'कृषि उत्पाद (एग्रो कमोडिटीज)', fr: 'Produits Agricoles & Agro-alimentaires', de: 'Agrar- & Lebensmittelprodukte', es: 'Productos Agrícolas', ru: 'Сельхозпродукция', ar: 'المنتجات الزراعية', zh: '农产品', ja: '農産物製品', th: 'สินค้าเกษตร' },
  { en: /Dairy Products|Dairy/gi, gu: 'ડેરી પ્રોડક્ટ્સ (ડેરી ઉત્પાદનો)', hi: 'डेयरी उत्पाद (डेयरी प्रोडक्ट्स)', fr: 'Produits Laitiers', de: 'Molkereiprodukte', es: 'Productos Lácteos', ru: 'Молочная продукция', ar: 'منتجات الألبان', zh: '乳制品', ja: '乳製品', th: 'ผลิตภัณฑ์นม' },
  { en: /Readymade Garments Products|Ready-made Garments Products|Readymade Garments|Ready-made Garments/gi, gu: 'રેડીમેડ ગારમેન્ટ્સ પ્રોડક્ટ્સ (તૈયાર વસ્ત્ર ઉત્પાદનો)', hi: 'रेडीमेड गारमेंट्स उत्पाद (तैयार वस्त्र)', fr: 'Produits Vêtements Prêts-à-Porter', de: 'Konfektionsbekleidung Produkte', es: 'Productos de Ropa Confeccionada', ru: 'Изделия готовой одежды', ar: 'منتجات الملابس الجاهزة', zh: '成衣服装产品', ja: '既製服・アパレル製品', th: 'เสื้อผ้าสำเร็จรูป' },
  { en: /Surat Textile Products|Textile Products|Surat Textiles|Textiles/gi, gu: 'ટેક્સટાઇલ પ્રોડક્ટ્સ (કાપડ ઉત્પાદનો)', hi: 'कपड़ा उत्पाद (टेक्सटाइल प्रोडक्ट्स)', fr: 'Produits Textiles de Surat', de: 'Textilprodukte', es: 'Productos Textiles de Surat', ru: 'Текстильная продукция', ar: 'منتجات النسيج والأقمشة', zh: '纺织品面料产品', ja: '繊維製品・テキスタイル', th: 'สิ่งทอและผ้าซูรัต' },
  { en: /Gujarati Dress/gi, gu: 'ગુજરાતી ડ્રેસ', hi: 'गुजराती ड्रेस', fr: 'Robe Gujarati', de: 'Gujarati Kleid', es: 'Vestido Gujarati', ru: 'Гуджаратское платье', ar: 'فستان غوجاراتي', zh: '古吉拉特特色服装', ja: 'グジャラートドレス', th: 'ชุดกูจาราตี' },
  { en: /Punjabi Dress/gi, gu: 'પંજાબી ડ્રેસ', hi: 'पंजाबी ड्रेस', fr: 'Robe Punjabi', de: 'Punjabi Kleid', es: 'Vestido Punjabi', ru: 'Пенджабский костюм', ar: 'فستان بنجابي', zh: '旁遮普长衫', ja: 'パンジャビドレス', th: 'ชุดปัญจาบ' },
  { en: /Chaniya Choli/gi, gu: 'ચણિયા ચોળી', hi: 'चनिया चोली', fr: 'Chaniya Choli', de: 'Chaniya Choli', es: 'Chaniya Choli', ru: 'Чания Чоли', ar: 'تشانيا تشولي', zh: '恰尼亚乔利舞裙', ja: 'チャニヤ・チョリ', th: 'ชุดชานิยาโชลี' },
  { en: /Dupatta|Dupattas/gi, gu: 'દુપટ્ટાસ', hi: 'दुपट्टा', fr: 'Echarpe Dupatta', de: 'Dupatta Schal', es: 'Bufanda Dupatta', ru: 'Дупатта (шаль)', ar: 'دوباتا', zh: '杜帕塔披肩', ja: 'ドゥパッタ（スカーフ）', th: 'ผ้าคลุมดูปัตตา' },
  { en: /Cotton Saree|Saree|Saris|Sarees/gi, gu: 'સાડી', hi: 'साड़ी', fr: 'Sari', de: 'Sari', es: 'Saree', ru: 'Индийское Сари', ar: 'ساري هندي', zh: '印度沙丽', ja: 'インドのサリー', th: 'ชุดส่าหรี' },
  { en: /Kurti|Kurtis/gi, gu: 'કુર્તી', hi: 'कुर्ती', fr: 'Kurti', de: 'Kurti', es: 'Kurti', ru: 'Туника Курти', ar: 'كورتي', zh: '库尔蒂女式上衣', ja: 'クルティ上衣', th: 'เสื้อเคอร์ตี' },
  { en: /Dress Suits|Suits|Suit/gi, gu: 'સૂટ', hi: 'सूट', fr: 'Ensemble Dress', de: 'Damenanzüge', es: 'Trajes Femeninos', ru: 'Женские костюмы', ar: 'بدلات نسائية', zh: '套装和长裙', ja: 'ドレススーツ', th: 'ชุดสูทหญิง' },
  { en: /Shirts|Shirt/gi, gu: 'શર્ટ', hi: 'शर्ट', fr: 'Chemise', de: 'Hemden', es: 'Camisas', ru: 'Мужские рубашки', ar: 'قمصان', zh: '衬衫', ja: 'シャツ', th: 'เสื้อเชิ้ต' },
  { en: /T-Shirts|T-Shirt/gi, gu: 'ટી-શર્ટ્સ', hi: 'टी-शर्ट्स', fr: 'T-Shirts', de: 'T-Shirts', es: 'Camisetas T-Shirt', ru: 'Футболки', ar: 'تي شيرتات', zh: 'T恤衫', ja: 'Tシャツ', th: 'เสื้อยืด' },
  { en: /Jeans & Pants|Jeans|Pants/gi, gu: 'પેન્ટ્સ અને જીન્સ', hi: 'पैंट और जींस', fr: 'Pantalons & Jeans', de: 'Hosen & Jeans', es: 'Pantalones y Jeans', ru: 'Джинсы и брюки', ar: 'جينز وبنطلونات', zh: '牛仔裤与休闲裤', ja: 'ジーンズ＆パンツ', th: 'กางเกงยีนส์' },
  { en: /Fabric & Yarn|Fabrics|Fabric/gi, gu: 'ફેબ્રિક્સ અને કાપડ', hi: 'फैब्रिक्स', fr: 'Tissus & Fils', de: 'Stoffe & Garne', es: 'Telas y Hilos', ru: 'Ткани и нити', ar: 'أقمشة وغزول', zh: '布料与面料', ja: '生地＆ヤーン糸', th: 'ผ้ารวมและเส้นด้าย' },
  { en: /Cotton/gi, gu: 'કપાસ', hi: 'कॉटन', fr: 'Coton', de: 'Baumwolle', es: 'Algodón', ru: 'Хлопок', ar: 'قطن', zh: '纯棉', ja: 'コットン（木綿）', th: 'ฝ้าย' },
  { en: /Polyester/gi, gu: 'પોલિએસ્ટર', hi: 'पॉलिएस्टर', fr: 'Polyester', de: 'Polyester', es: 'Poliéster', ru: 'Полиэстер', ar: 'بوليستر', zh: '涤纶/聚酯纤维', ja: 'ポリエステル', th: 'โพลีเอสเตอร์' },
  { en: /Silk/gi, gu: 'રેશમ', hi: 'सिल्क', fr: 'Soie', de: 'Seide', es: 'Seda', ru: 'Шелк', ar: 'حرير', zh: '真丝蚕丝', ja: 'シルク（絹）', th: 'ผ้าไหม' },

  // Machinery & Electronics
  { en: /CNC Machine|CNC Machinery/gi, gu: 'સી.એન.સી. મશીન', hi: 'सीएनसी मशीन', fr: 'Machine CNC' },
  { en: /Paper Bag & Box Packaging Material/gi, gu: 'પેપર બેગ અને બોક્સનું પેકેજિંગ મટીરીયલ', hi: 'पेपर बैग और बॉक्स पैकेजिंग सामग्री', fr: 'Matériel d\'emballage sacs en papier et boîtes' },
  { en: /New Machinery & Systems|New Machinery Systems|New Machinery|New Machine/gi, gu: 'નવી મશીનરી', hi: 'नई मशीनरी', fr: 'Nouvelles Machines' },
  { en: /Refurbished|Used Industrial Machinery|Used Machinery|Used Machine|Used/gi, gu: 'જૂની અને વપરાયેલી મશીનરી', hi: 'पुरानी मशीनरी', fr: 'Machines d\'Occasion' },
  { en: /Industrial Automation & Electronics|Industrial Automation/gi, gu: 'ઔદ્યોગિક ઓટોમેશન અને ઈલેક્ટ્રોનિક્સ', hi: 'औद्योगिक स्वचालन और इलेक्ट्रॉनिक्स', fr: 'Automation Industrielle & Électronique' },

  // Fasteners & Industrial
  { en: /High Tensile Fasteners/gi, gu: 'હાઈ ટેન્સાઈલ ફાસ્ટનર્સ', hi: 'हाई टेंसाइल फास्टनर्स', fr: 'Fixations à Haute Résistance' },
  { en: /Stainless Steel Bolts/gi, gu: 'સ્ટેનલેસ સ્ટીલ બોલ્ટ્સ', hi: 'स्टेनलेस स्टील बोल्ट', fr: 'Boulons en Acier Inoxydable' },
  { en: /Bolts & Nuts|Bolts|Nuts/gi, gu: 'બોલ્ટ્સ અને નટ્સ', hi: 'बोल्ट और नट्स', fr: 'Boulons & Écrous' },
  { en: /Industrial Goods & Fasteners|Industrial Goods/gi, gu: 'ઔદ્યોગિક માલ અને ફાસ્ટનર્સ', hi: 'औद्योगिक सामान और फास्टनर', fr: 'Biens Industriels & Boulonnerie' },
  { en: /Pipes & Valves|Pipes|Valves/gi, gu: 'પાઇપ્સ અને વાલ્વ', hi: 'पाइप और वॉल्व', fr: 'Tuyaux & Vannes' },
  { en: /Pumps & Motors|Pumps/gi, gu: 'પમ્પ્સ અને મોટર્સ', hi: 'पंप और मोटर', fr: 'Pompes & Moteurs' },

  // Eco Packaging
  { en: /Eco Packaging & Sustainable Materials|Eco Packaging/gi, gu: 'ઇકો પેકેજિંગ અને ટકાવ સામગ્રી', hi: 'इको पैकेजिंग और टिकाऊ सामग्री', fr: 'Emballage Écologique & Matériaux Durables' },
  { en: /Jute Bags/gi, gu: 'જૂટ બેગ્સ (શણના થેલા)', hi: 'जूट के बैग', fr: 'Sacs en Jute' },
  { en: /Non Woven Bags|Non-Woven Bags/gi, gu: 'નોન વુવન બેગ્સ', hi: 'नॉन वोवेन बैग', fr: 'Sacs Non Tissés' },

  // Logistics & RFQ Buttons
  { en: /Add to Quote Cart \(RFQ\)|Add to Quote Cart/gi, gu: 'ક્વોટ કાર્ટમાં ઉમેરો (RFQ)', hi: 'कोट कार्ट में जोड़ें (RFQ)', fr: 'Ajouter au Panier (RFQ)' },
  { en: /Request Quotation \(RFQ\)|Request Quotation/gi, gu: 'કોટેશન વિગત જણાવો (RFQ)', hi: 'कोटेशन अनुरोध (RFQ)', fr: 'Demander un Devis (RFQ)' },
  { en: /Proforma Export Quote/gi, gu: 'પ્રોફોર્મા એક્સપોર્ટ ક્વોટ (PDF)', hi: 'प्रोफॉर्म िनर्यात कोटेशन (PDF)', fr: 'Devis Proforma Export' },
  { en: /Minimum Order Quantity|MOQ/gi, gu: 'ન્યૂનતમ ઓર્ડર જથ્થો (MOQ)', hi: 'न्यूनतम ऑर्डर मात्रा (MOQ)', fr: 'Quantité Minimale de Commande (MOQ)' },
  { en: /HS Code/gi, gu: 'એચ.એસ. કોડ (HS Code)', hi: 'एचएस कोड (HS Code)', fr: 'Code SH (HS Code)' },
  { en: /Verified Exporter/gi, gu: 'પ્રમાણિત નિકાસકાર', hi: 'सत्यापित निर्यातक', fr: 'Exportateur Vérifié' }
];

export const CATEGORY_TAB_DICTIONARY = {
  all: {
    en: 'All Products',
    gu: 'બધી પ્રોડક્ટ્સ',
    hi: 'सभी उत्पाद',
    fr: 'Tous les Produits',
    ar: 'جميع المنتجات',
    es: 'Todos los Productos',
    de: 'Alle Produkte',
    ru: 'Все товары',
    zh: '所有产品',
    ja: '全商品',
    ko: '전체 상품',
    pt: 'Todos os Produtos',
    it: 'Tutti i Prodotti',
    tr: 'Tüm Ürünler'
  },
  agro: {
    en: '🌾 Agro Commodities & Food',
    gu: '🌾 એગ્રો કોમોડિટીઝ & ફૂડ',
    hi: '🌾 कृषि एवं खाद्य उत्पाद',
    fr: '🌾 Produits Agricoles & Alimentaires',
    ar: '🌾 المنتجات الزراعية والغذائية',
    es: '🌾 Productos Agrícolas y Alimenticios',
    de: '🌾 Agrar- & Lebensmittelprodukte',
    ru: '🌾 Сельхозпродукция и продукты питания',
    zh: '🌾 农产品与食品',
    ja: '🌾 農産物・食品',
    ko: '🌾 농산물 및 식품',
    pt: '🌾 Produtos Agrícolas e Alimentícios',
    it: '🌾 Prodotti Agricoli e Alimentari',
    tr: '🌾 Tarım ve Gıda Ürünleri'
  },
  dairy: {
    en: '🥛 Dairy Products',
    gu: '🥛 ડેરી પ્રોડક્ટ્સ',
    hi: '🥛 डेयरी उत्पाद',
    fr: '🥛 Produits Laitiers',
    ar: '🥛 منتجات الألبان',
    es: '🥛 Productos Lácteos',
    de: '🥛 Molkereiprodukte',
    ru: '🥛 Молочная продукция',
    zh: '🥛 乳制品',
    ja: '🥛 乳製品',
    ko: '🥛 유제품',
    pt: '🥛 Lacticínios',
    it: '🥛 Prodotti Lattiero-Caseari',
    tr: '🥛 Süt Ürünleri'
  },
  textiles: {
    en: '🧵 Surat Textile Products',
    gu: '🧵 ટેક્ષટાઈલ પ્રોડક્ટ્સ',
    hi: '🧵 कपड़ा उत्पाद (Textiles)',
    fr: '🧵 Produits Textiles de Surat',
    ar: '🧵 منتجات المنسوجات والأقمشة',
    es: '🧵 Productos Textiles de Surat',
    de: '🧵 Surat Textilprodukte',
    ru: '🧵 Текстильная продукция',
    zh: '🧵 素拉特纺织品',
    ja: '🧵 繊維製品・テキスタイル',
    ko: '🧵 텍스타일 제품',
    pt: '🧵 Produtos Têxteis de Surat',
    it: '🧵 Prodotti Tessili Surat',
    tr: '🧵 Dokuma ve Tekstil Ürünleri'
  },
  garments: {
    en: '👕 Readymade Garments Products',
    gu: '👕 રેડીમેડ ગારમેન્ટ્સ પ્રોડક્ટ્સ',
    hi: '👕 रेडीमेड गारमेंट्स (तैयार वस्त्र) उत्पाद',
    fr: '👕 Produits Vêtements Prêts-à-Porter',
    ar: '👕 منتجات الملابس الجاهزة',
    es: '👕 Productos de Ropa Confeccionada',
    de: '👕 Konfektionsbekleidung Produkte',
    ru: '👕 Изделия готовой одежды',
    zh: '👕 成衣服装产品',
    ja: '👕 既製服・アパレル製品',
    ko: '👕 기성복 의류 제품',
    pt: '👕 Produtos de Vestuário Pronto',
    it: '👕 Prodotti di Abbigliamento Confezionato',
    tr: '👕 Hazır Giyim Ürünleri'
  },
  used_machinery: {
    en: '⚙️ Used Industrial Machinery',
    gu: '⚙️ વપરાયેલી ઔદ્યોગિક મશીનરી',
    hi: '⚙️ प्रयुक्त एवं पुरानी औद्योगिक मशीनरी',
    fr: '⚙️ Machines Industrielles d\'Occasion',
    ar: '⚙️ المعدات والمكائن الصناعية المستعملة',
    es: '⚙️ Maquinaria Industrial Usada',
    de: '⚙️ Gebrauchte Industriemaschinen',
    ru: '⚙️ Б/У промышленное оборудование',
    zh: '⚙️ 二手工业机械设备',
    ja: '⚙️ 中古産業機械・設備',
    ko: '⚙️ 중고 산업 기계 및 장비',
    pt: '⚙️ Maquinaria Industrial Usada',
    it: '⚙️ Macchinari Industriali Usati',
    tr: '⚙️ İkinci El Sanayi Makineleri'
  },
  new_machinery: {
    en: '🏗️ New Machinery Systems',
    gu: '🏗️ નવી મશીનરી સિસ્ટમ્સ',
    hi: '🏗️ नई औद्योगिक मशीनरी और सिस्टम',
    fr: '🏗️ Nouvelles Machines Industrielles',
    ar: '🏗️ معدات وأنظمة صناعية جديدة',
    es: '🏗️ Nuevos Sistemas de Maquinaria',
    de: '🏗️ Neue Maschinensysteme',
    ru: '🏗️ Новое промышленное оборудование',
    zh: '🏗️ 新型工业机械系统',
    ja: '🏗️ 新品産業機械・システム',
    ko: '🏗️ 신형 산업 기계 시스템',
    pt: '🏗️ Novos Sistemas de Maquinaria',
    it: '🏗️ Nuovi Macchinari Industriali',
    tr: '🏗️ Yeni Makine Sistemleri'
  },
  industrial: {
    en: '🔩 Industrial Goods & Fasteners',
    gu: '🔩 ઔદ્યોગિક માલસામાન & ફાસ્ટનર્સ પ્રોડક્ટ્સ',
    hi: '🔩 औद्योगिक सामान और फास्टनर उत्पाद',
    fr: '🔩 Produits Industriels & Boulonnerie',
    ar: '🔩 المنتجات الصناعية وأدوات التثبيت',
    es: '🔩 Productos Industriales y Sujetadores',
    de: '🔩 Industriegüter & Befestigungsprodukte',
    ru: '🔩 Промышленные товары и крепеж',
    zh: '🔩 工业品与紧固件产品',
    ja: '🔩 産業用品＆ファスナー製品',
    ko: '🔩 산업용품 및 패스너 제품',
    pt: '🔩 Produtos Industriais e Fixadores',
    it: '🔩 Prodotti Industriali e Bulloneria',
    tr: '🔩 Sanayi Ürünleri ve Bağlantı Elemanları'
  },
  packaging: {
    en: '🛍️ Eco Packaging & Jute Bags',
    gu: '🛍️ ઇકો પેકેજિંગ & જૂટ બેગ્સ પ્રોડક્ટ્સ',
    hi: '🛍️ इको पैकेजिंग और जूट बैग उत्पाद',
    fr: '🛍️ Produits d\'Emballage Écologique & Sacs Jute',
    ar: '🛍️ منتجات التغليف البيئي وأكياس الخيش',
    es: '🛍️ Productos de Embalaje Ecológico y Bolsas de Yute',
    de: '🛍️ Öko-Verpackungen & Jutebeutel Produkte',
    ru: '🛍️ Эко-упаковка и джутовые мешки',
    zh: '🛍️ 环保包装与黄麻袋产品',
    ja: '🛍️ エコ包装＆ジュートバッグ製品',
    ko: '🛍️ 친환경 포장 및 황마 가방 제품',
    pt: '🛍️ Produtos de Embalagem Ecológica e Sacos de Juta',
    it: '🛍️ Prodotti di Imballaggio Ecologico e Sacchi in Juta',
    tr: '🛍️ Çevre Dostu Ambalaj ve Jüt Çanta Ürünleri'
  },
  electronic: {
    en: '📟 Electronic Products',
    gu: '📟 ઈલેક્ટ્રોનિક પ્રોડક્ટ્સ',
    hi: '📟 इलेक्ट्रॉनिक उत्पाद',
    fr: '📟 Produits Électroniques',
    ar: '📟 المنتجات الإلكترونية',
    es: '📟 Productos Electrónicos',
    de: '📟 Elektronische Produkte',
    ru: '📟 Электронные товары',
    zh: '📟 电子产品',
    ja: '📟 電子製品',
    ko: '📟 전자 제품',
    pt: '📟 Produtos Eletrônicos',
    it: '📟 Prodotti Elettronici',
    tr: '📟 Elektronik Ürünler'
  },
  automobile: {
    en: '🚗 Automobile Products',
    gu: '🚗 ઓટોમોબાઈલ પ્રોડક્ટ્સ',
    hi: '🚗 ऑटोमोबाइल उत्पाद',
    fr: '🚗 Produits Automobiles',
    ar: '🚗 منتجات السيارات',
    es: '🚗 Productos Automotrices',
    de: '🚗 Automobilprodukte',
    ru: '🚗 Автомобильная продукция',
    zh: '🚗 汽车用品及配件',
    ja: '🚗 自動車関連用品',
    ko: '🚗 자동차 용품',
    pt: '🚗 Produtos Automotivos',
    it: '🚗 Prodotti Automobilistici',
    tr: '🚗 Otomotiv Ürünleri'
  }
};

export function getCategoryTabTitle(catKey, lang = 'en') {
  if (!catKey) return '';
  const normKey = String(catKey).trim().toLowerCase();
  
  let keyMatch = normKey;
  if (normKey.includes('agro') || normKey.includes('food')) keyMatch = 'agro';
  else if (normKey.includes('dairy') || normKey.includes('ghee') || normKey.includes('milk')) keyMatch = 'dairy';
  else if (normKey.includes('textile') || normKey.includes('fabric')) keyMatch = 'textiles';
  else if (normKey.includes('garment') || normKey.includes('apparel') || normKey.includes('suit')) keyMatch = 'garments';
  else if (normKey.includes('used') || normKey.includes('refurbish')) keyMatch = 'used_machinery';
  else if (normKey.includes('new') || normKey.includes('machinery')) keyMatch = 'new_machinery';
  else if (normKey.includes('indus') || normKey.includes('fasten') || normKey.includes('bolt')) keyMatch = 'industrial';
  else if (normKey.includes('pack') || normKey.includes('jute') || normKey.includes('eco')) keyMatch = 'packaging';
  else if (normKey.includes('electron') || normKey.includes('digital')) keyMatch = 'electronic';
  else if (normKey.includes('auto') || normKey.includes('vehicle') || normKey.includes('car')) keyMatch = 'automobile';
  else if (normKey === 'all' || normKey.includes('all')) keyMatch = 'all';

  const entry = CATEGORY_TAB_DICTIONARY[keyMatch];
  if (entry) {
    const langCode = (lang || 'en').split('-')[0].toLowerCase();
    return entry[langCode] || entry.en;
  }
  return catKey;
}

export function matchTradeDictionary(text, lang) {
  if (!text || typeof text !== 'string') return text || '';
  let str = text;

  MASTER_TRADE_GRAMMAR_DICTIONARY.forEach(rule => {
    if (rule[lang]) {
      str = str.replace(rule.en, rule[lang]);
    } else if (lang !== 'gu' && lang !== 'hi' && lang !== 'fr') {
      // For all other 100+ languages (ru, ar, de, es, zh, ja, etc.), convert Gujarati/Hindi back to clean English
      if (rule.gu && typeof rule.gu === 'string' && str.includes(rule.gu)) {
        const enVal = (rule.en instanceof RegExp) ? rule.en.source.replace(/\\|\/|gi/g, '') : rule.en;
        str = str.split(rule.gu).join(enVal);
      }
      if (rule.hi && typeof rule.hi === 'string' && str.includes(rule.hi)) {
        const enVal = (rule.en instanceof RegExp) ? rule.en.source.replace(/\\|\/|gi/g, '') : rule.en;
        str = str.split(rule.hi).join(enVal);
      }
    }
  });

  return str;
}

export function sanitizeGrammarAndNouns(text, lang = 'gu') {
  if (!text || typeof text !== 'string') return text || '';
  let str = text;

  // 1. Gujarati Grammar Rules
  if (lang === 'gu') {
    str = str.replace(/ડેરી પ્રોડક્ટ્સ,\s*ટેક્સટાઇલ,/gi, 'ડેરી પ્રોડક્ટ્સ (ડેરી ઉત્પાદનો), ટેક્સટાઇલ પ્રોડક્ટ્સ (કાપડ ઉત્પાદનો),');
    str = str.replace(/ડેરી પ્રોડક્ટ્સ,\s*ટેક્સટાઇલ\b(?! પ્રોડક્ટ્સ| ઉત્પાદનો)/gi, 'ડેરી પ્રોડક્ટ્સ, ટેક્સટાઇલ પ્રોડક્ટ્સ');
    str = str.replace(/\bટેક્સટાઇલ\b(?! પ્રોડક્ટ્સ| ઉત્પાદનો| ફેબ્રિક્સ| લૂમ્સ| માર્કેટ| હબ)/gi, 'ટેક્સટાઇલ પ્રોડક્ટ્સ (કાપડ ઉત્પાદનો)');
    str = str.replace(/રેડીમેડ ગારમેન્ટ્સ\b(?! પ્રોડક્ટ્સ| ઉત્પાદનો)/gi, 'રેડીમેડ ગારમેન્ટ્સ પ્રોડક્ટ્સ (તૈયાર વસ્ત્ર ઉત્પાદનો)');
  }

  // 2. Hindi Grammar Rules
  if (lang === 'hi') {
    str = str.replace(/डेयरी उत्पादों,\s*कपड़ा,/gi, 'डेयरी उत्पादों (डेयरी प्रोडक्ट्स), कपड़ा उत्पादों (टेक्सटाइल प्रोडक्ट्स),');
    str = str.replace(/डेयरी उत्पादों,\s*कपड़ा\b(?! उत्पादों| प्रोडक्ट्स)/gi, 'डेयरी उत्पादों, कपड़ा उत्पादों');
    str = str.replace(/\bकपड़ा\b(?! उत्पादों| प्रोडक्ट्स| उद्योग| बाजार| लूम)/gi, 'कपड़ा उत्पाद (टेक्सटाइल प्रोडक्ट्स)');
    str = str.replace(/रेडीमेड गारमेंट्स\b(?! उत्पादों| प्रोडक्ट्स)/gi, 'रेडीमेड गारमेंट्स उत्पाद');
  }

  // 3. French Grammar Rules
  if (lang === 'fr') {
    str = str.replace(/produits laitiers,\s*textiles,/gi, 'produits laitiers, produits textiles,');
    str = str.replace(/produits laitiers,\s*textiles\b(?! textiles| de)/gi, 'produits laitiers, produits textiles');
  }

  return str;
}

export function autoTranslateText(text, lang = 'en') {
  if (!text || typeof text !== 'string') return text || '';
  if (lang === 'en') return text;

  const cacheKey = `${text.trim().toLowerCase()}_${lang}`;
  if (transliterationCache.has(cacheKey)) {
    return transliterationCache.get(cacheKey);
  }

  let dictResult = matchTradeDictionary(text, lang);
  dictResult = sanitizeGrammarAndNouns(dictResult, lang);

  // Guarantee every single item after a comma (,) is individually translated
  if (text.includes(',')) {
    const parts = text.split(',');
    const translatedParts = parts.map(part => {
      const trimmed = part.trim();
      if (!trimmed) return part;

      let partResult = matchTradeDictionary(trimmed, lang);
      partResult = sanitizeGrammarAndNouns(partResult, lang);

      MASTER_TRADE_GRAMMAR_DICTIONARY.forEach(rule => {
        if (rule[lang] && rule.en) {
          partResult = partResult.replace(rule.en, rule[lang]);
        }
      });

      return partResult;
    });

    const commaJoined = translatedParts.join(', ');
    if (commaJoined && commaJoined !== text) {
      dictResult = commaJoined;
    }
  }
  
  // If target language is outside gu/hi/fr and text contains Gujarati script (\u0A80-\u0AFF), convert digits and clean up
  if (lang !== 'gu' && lang !== 'hi' && lang !== 'fr' && /[\u0A80-\u0AFF]/.test(dictResult)) {
    dictResult = convertDigits(dictResult, 'en');
  }

  if (dictResult && dictResult !== text) {
    transliterationCache.set(cacheKey, dictResult);
    return dictResult;
  }

  return text;
}

export async function fetchGoogleTransliteration(text, lang = 'gu') {
  if (!text || !text.trim()) return '';
  const clean = text.trim();
  const cacheKey = `${clean.toLowerCase()}_${lang}`;
  if (transliterationCache.has(cacheKey)) return transliterationCache.get(cacheKey);

  try {
    const pairCode = lang === 'fr' ? 'en-US|fr-CA' : (lang === 'gu' ? 'en-US|gu-IN' : (lang === 'hi' ? 'en-US|hi-IN' : `en-US|${lang}`));
    const mmRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=${pairCode}`);
    if (mmRes.ok) {
      const mmData = await mmRes.json();
      if (mmData && mmData.responseData && mmData.responseData.translatedText) {
        let tText = mmData.responseData.translatedText.trim();
        if (typeof document !== 'undefined') {
          const txtEl = document.createElement('textarea');
          txtEl.innerHTML = tText;
          tText = txtEl.value;
        }
        if (tText && tText.toLowerCase() !== clean.toLowerCase() && !tText.includes('MYMEMORY WARNING')) {
          const sanitized = sanitizeGrammarAndNouns(tText, lang);
          transliterationCache.set(cacheKey, sanitized);
          return sanitized;
        }
      }
    }
  } catch (e) {}

  const itcCode = lang === 'gu' ? 'gu-t-i0-und' : (lang === 'hi' ? 'hi-t-i0-und' : '');
  if (itcCode) {
    try {
      const url = `https://inputtools.google.com/request?text=${encodeURIComponent(clean)}&itc=${itcCode}&num=3`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data[0] === 'SUCCESS' && data[1] && data[1][0] && data[1][0][1] && data[1][0][1][0]) {
          const translated = sanitizeGrammarAndNouns(data[1][0][1][0], lang);
          transliterationCache.set(cacheKey, translated);
          return translated;
        }
      }
    } catch(e) {}
  }

  return autoTranslateText(clean, lang);
}

export async function autoTranslateFullObject(englishText) {
  if (!englishText || typeof englishText !== 'string' || !englishText.trim()) {
    return { en: '', gu: '', hi: '', fr: '' };
  }
  const clean = englishText.trim();
  const obj = { en: clean, gu: clean, hi: clean, fr: clean };

  try {
    const langs = ['gu', 'hi', 'fr'];
    const langPairMap = { gu: 'en-US|gu-IN', hi: 'en-US|hi-IN', fr: 'en-US|fr-CA' };
    const promises = langs.map(async (l) => {
      try {
        const pair = langPairMap[l] || `en-US|${l}`;
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=${pair}`);
        const data = await res.json();
        if (data && data.responseData && data.responseData.translatedText) {
          let text = data.responseData.translatedText.trim();
          const txtEl = document.createElement('textarea');
          txtEl.innerHTML = text;
          text = txtEl.value;
          if (text) obj[l] = sanitizeGrammarAndNouns(text, l);
        } else {
          obj[l] = autoTranslateText(clean, l);
        }
      } catch(e) {
        obj[l] = autoTranslateText(clean, l);
      }
    });
    await Promise.all(promises);
  } catch(err) {
    obj.gu = autoTranslateText(clean, 'gu');
    obj.hi = autoTranslateText(clean, 'hi');
    obj.fr = autoTranslateText(clean, 'fr');
  }

  return obj;
}

export function autoGenerateMultilingualNames(englishTitle) {
  const en = (englishTitle || '').trim();
  if (!en) return { en: '', gu: '', hi: '', fr: '' };
  return {
    en,
    gu: autoTranslateText(en, 'gu'),
    hi: autoTranslateText(en, 'hi'),
    fr: autoTranslateText(en, 'fr')
  };
}

export function autoGenerateMultilingualSpec(englishSpec) {
  const en = (englishSpec || '').trim();
  if (!en) return { en: '', gu: '', hi: '', fr: '' };
  return {
    en,
    gu: autoTranslateText(en, 'gu'),
    hi: autoTranslateText(en, 'hi'),
    fr: autoTranslateText(en, 'fr')
  };
}
