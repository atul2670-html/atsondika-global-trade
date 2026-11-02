/**
 * Universal Multilingual Translation & Transliteration Engine for Millions of Products Worldwide
 * Powered by Offline Master 7-Language Trade Grammar Dictionary + Online Google Transliteration / MyMemory API.
 * Supports:
 * - en: English (Master Base Fallback)
 * - gu: Gujarati
 * - hi: Hindi
 * - fr: French
 * - es: Spanish (Español)
 * - ar: Arabic (العربية)
 * - zh: Simplified Chinese (简体中文)
 */

const transliterationCache = new Map();

// 1 to 99 Universal Multilingual Number Words Map across 7 Languages
export const NUMBER_WORDS_MAP = {
  1: { en: 'One', gu: 'એક', hi: 'एक', fr: 'Un', es: 'Uno', ar: 'واحد', zh: '一' },
  2: { en: 'Two', gu: 'બે', hi: 'दो', fr: 'Deux', es: 'Dos', ar: 'اثنان', zh: '二' },
  3: { en: 'Three', gu: 'ત્રણ', hi: 'तीन', fr: 'Trois', es: 'Tres', ar: 'ثلاثة', zh: '三' },
  4: { en: 'Four', gu: 'ચાર', hi: 'चार', fr: 'Quatre', es: 'Cuatro', ar: 'أربعة', zh: '四' },
  5: { en: 'Five', gu: 'પાંચ', hi: 'पाँच', fr: 'Cinq', es: 'Cinco', ar: 'خمسة', zh: '五' },
  6: { en: 'Six', gu: 'છ', hi: 'छह', fr: 'Six', es: 'Seis', ar: 'ستة', zh: '六' },
  7: { en: 'Seven', gu: 'સાત', hi: 'सात', fr: 'Sept', es: 'Siete', ar: 'سبعة', zh: '七' },
  8: { en: 'Eight', gu: 'આઠ', hi: 'आठ', fr: 'Huit', es: 'Ocho', ar: 'ثمانية', zh: '八' },
  9: { en: 'Nine', gu: 'નવ', hi: 'नौ', fr: 'Neuf', es: 'Nueve', ar: 'تسعة', zh: '九' },
  10: { en: 'Ten', gu: 'દસ', hi: 'दस', fr: 'Dix', es: 'Diez', ar: 'عشرة', zh: '十' },
  11: { en: 'Eleven', gu: 'અગિયાર', hi: 'ग्यारह', fr: 'Onze', es: 'Once', ar: 'أحد عشر', zh: '十一' },
  12: { en: 'Twelve', gu: 'બાર', hi: 'बारह', fr: 'Douze', es: 'Doce', ar: 'اثنا عشر', zh: '十二' },
  13: { en: 'Thirteen', gu: 'તેર', hi: 'तेरह', fr: 'Treize', es: 'Trece', ar: 'ثلاثة عشر', zh: '十三' },
  14: { en: 'Fourteen', gu: 'ચૌદ', hi: 'चौदह', fr: 'Quatorze', es: 'Catorce', ar: 'أربعة عشر', zh: '十四' },
  15: { en: 'Fifteen', gu: 'પંદર', hi: 'पंद्रह', fr: 'Quinze', es: 'Quince', ar: 'خمسة عشر', zh: '十五' },
  16: { en: 'Sixteen', gu: 'સોળ', hi: 'सोलह', fr: 'Seize', es: 'Dieciséis', ar: 'ستة عشر', zh: '十六' },
  17: { en: 'Seventeen', gu: 'સત્તર', hi: 'सत्रह', fr: 'Dix-sept', es: 'Diecisiete', ar: 'سبعة عشر', zh: '十七' },
  18: { en: 'Eighteen', gu: 'અઢાર', hi: 'अठारह', fr: 'Dix-huit', es: 'Dieciocho', ar: 'ثمانية عشر', zh: '十八' },
  19: { en: 'Nineteen', gu: 'ઓગણીસ', hi: 'उन्नीस', fr: 'Dix-neuf', es: 'Diecinueve', ar: 'تسعة عشر', zh: '十九' },
  20: { en: 'Twenty', gu: 'વીસ', hi: 'बीस', fr: 'Vingt', es: 'Veinte', ar: 'عشرون', zh: '二十' },
  25: { en: 'Twenty-Five', gu: 'પચ્ચીસ', hi: 'पच्चीस', fr: 'Vingt-cinq', es: 'Veinticinco', ar: 'خمسة وعشرون', zh: '二十五' },
  30: { en: 'Thirty', gu: 'ત્રીસ', hi: 'तीस', fr: 'Trente', es: 'Treinta', ar: 'ثلاثون', zh: '三十' },
  40: { en: 'Forty', gu: 'ચાળીસ', hi: 'चालीस', fr: 'Quarante', es: 'Cuarenta', ar: 'أربعون', zh: '四十' },
  50: { en: 'Fifty', gu: 'પચાસ', hi: 'पचास', fr: 'Cinquante', es: 'Cincuenta', ar: 'خمسون', zh: '五十' },
  60: { en: 'Sixty', gu: 'સાઠ', hi: 'साठ', fr: 'Soixante', es: 'Sesenta', ar: 'ستون', zh: '六十' },
  70: { en: 'Seventy', gu: 'સિત્તેર', hi: 'सत्तर', fr: 'Soixante-dix', es: 'Setenta', ar: 'سبعون', zh: '七十' },
  80: { en: 'Eighty', gu: 'એંસી', hi: 'अस्सी', fr: 'Quatre-vingts', es: 'Ochenta', ar: 'ثمانون', zh: '八十' },
  90: { en: 'Ninety', gu: 'નેવું', hi: 'नब्बे', fr: 'Quatre-vingt-dix', es: 'Noventa', ar: 'تسعون', zh: '九十' },
  100: { en: 'One Hundred', gu: 'એક સો', hi: 'एक सौ', fr: 'Cent', es: 'Cien', ar: 'مائة', zh: '一百' }
};

export function convertDigits(numOrStr, lang = 'en') {
  if (numOrStr === undefined || numOrStr === null) return '';
  const str = String(numOrStr);
  if (lang === 'en' || lang === 'fr' || lang === 'es' || lang === 'zh') return str;

  const guDigits = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];
  const hiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  const arDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  const targetDigits = lang === 'gu' ? guDigits : (lang === 'hi' ? hiDigits : (lang === 'ar' ? arDigits : null));
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
 * Master 7-Language Trade & Commercial Grammar Dictionary
 */
export const MASTER_TRADE_GRAMMAR_DICTIONARY = [
  // Full Sentences & Slogans
  {
    en: /APEDA & ISO Certified Premium Global Exporter \| Surat, Gujarat/gi,
    gu: 'APEDA અને ISO પ્રમાણિત અગ્રણી વૈશ્વિક નિકાસકાર | સુરત, ગુજરાત',
    hi: 'APEDA और ISO प्रमाणित प्रीमियम वैश्विक निर्यातक | सूरत, गुजरात',
    fr: 'Exportateur Mondial Certifié APEDA & ISO | Surat, Gujarat',
    es: 'Exportador Mundial Premium Certificado APEDA e ISO | Surat, Guyarat',
    ar: 'مصدّر عالمي معتمد من APEDA و ISO | سورات، غوجارات',
    zh: 'APEDA 和 ISO 认证的优质全球出口商 | 苏拉特，古吉拉特邦'
  },
  {
    en: /Connecting Premium Quality Agro Commodities, Dairy Products, Textile Products, Readymade Garments, Used Machinery, New Machinery, Industrial Goods & Fasteners To The World/gi,
    gu: 'શ્રેષ્ઠ ગુણવત્તાવાળા એગ્રો કોમોડિટીઝ, ડેરી પ્રોડક્ટ્સ, ટેક્સટાઇલ, રેડીમેડ ગારમેન્ટ્સ, નવી અને વપરાયેલ મશીનરી, ઔદ્યોગિક માલ અને ફાસ્ટનર્સને વિશ્વ સાથે જોડતી અગ્રણી કંપની.',
    hi: 'प्रीमियम गुणवत्ता वाले कृषि उत्पादों, डेयरी उत्पादों, कपड़ा, तैयार वस्त्रों, नई और पुरानी मशीनरी, औद्योगिक सामान और फास्टनरों को दुनिया से जोड़ना।',
    fr: 'Connecter les produits agricoles, produits laitiers, textiles, vêtements, machines d\'occasion et neuves, biens industriels & boulonnerie de qualité supérieure au monde.',
    es: 'Conectando al mundo productos agrícolas, lácteos, textiles, prendas confeccionadas, maquinaria nueva y usada, bienes industriales y fijaciones de primera calidad.',
    ar: 'ربط السلع الزراعية ومنتجات الألبان والمنسوجات والملابس الجاهزة والآلات الجديدة والمستعملة والسلع الصناعية والمثبتات عالية الجودة بالعالم.',
    zh: '向全球连接优质农产品、乳制品、纺织品、成衣、二手及新机械、工业品与紧固件。'
  },
  {
    en: /Trusted Indian Exporter specializing in Spices, Rice, Oilseeds, Fasteners, New & Used Machinery, and Eco Packaging across 40\+ countries/gi,
    gu: 'મસાલા, ચોખા, તેલીબિયાં, ફાસ્ટનર્સ, નવી અને વપરાયેલી મશીનરી, ડેરી, કાપડ અને ઇકો પેકેજિંગમાં વિશિષ્ટતા ધરાવતા ૪૦+ દેશોમાં અગ્રણી ભારતીય નિકાસકાર.',
    hi: 'मसालों, चावल, तिलहन, फास्टनरों, नई और पुरानी मशीनरी, डेयरी, कपड़े और इको पैकेजिंग में विशेषज्ञता वाला प्रमुख भारतीय निर्यातक।',
    fr: 'Exportateur indien de confiance spécialisé dans les épices, le riz, les machines neuves et d\'occasion, les vêtements et les emballages écologiques vers 40+ pays.',
    es: 'Exportador indio de confianza especializado en especias, arroz, semillas oleaginosas, fijaciones, maquinaria nueva y usada y embalajes ecológicos en más de 40 países.',
    ar: 'مصدر هندي موثوق متخصص في التوابل والأرز والبذور الزيتية والمثبتات والآلات الجديدة والمستعملة والتغليف البيئي لأكثر من 40 دولة.',
    zh: '值得信赖的印度出口商，专业从事香料、大米、油料作物、紧固件、新旧机械及环保包装，出口至40多个国家。'
  },

  // Specifications & Descriptors
  {
    en: /Hi[- ]quality premium product|High[- ]quality premium product|Hi quality premium product|High quality premium product/gi,
    gu: 'ઉચ્ચ ગુણવત્તાવાળી પ્રીમિયમ પ્રોડક્ટ',
    hi: 'उच्च गुणवत्ता वाला प्रीमियम उत्पाद',
    fr: 'Produit Premium de Haute Qualité',
    es: 'Producto Premium de Alta Calidad',
    ar: 'منتج فاخر عالي الجودة',
    zh: '高品质优质产品'
  },
  {
    en: /Hi[- ]quality|High[- ]quality|Hi quality|High quality/gi,
    gu: 'ઉચ્ચ ગુણવત્તાવાળી',
    hi: 'उच्च गुणवत्ता वाला',
    fr: 'Haute Qualité',
    es: 'Alta Calidad',
    ar: 'عالي الجودة',
    zh: '高品质'
  },
  {
    en: /Premium Quality|Export Quality/gi,
    gu: 'એક્સપોર્ટ ક્વોલિટી ગુણવત્તા',
    hi: 'निर्यात गुणवत्ता',
    fr: 'Qualité d\'Exportation Supérieure',
    es: 'Calidad de Exportación Premium',
    ar: 'جودة تصدير ممتازة',
    zh: '出口级高品质'
  },
  {
    en: /Standard Export Packaging|Export Packaging|Standard Packaging/gi,
    gu: 'સ્ટાન્ડર્ડ એક્સપોર્ટ પેકેજિંગ',
    hi: 'मानक निर्यात पैकेजिंग',
    fr: 'Emballage d\'Exportation Standard',
    es: 'Embalaje Estándar de Exportación',
    ar: 'تغليف قياسي للتصدير',
    zh: '标准出口包装'
  },
  {
    en: /1 Unit \/ Container|1 Unit per Container|Unit \/ Container/gi,
    gu: '૧ યુનિટ / કન્ટેનર',
    hi: '1 यूनिट / कंटेनर',
    fr: '1 Unité par Conteneur',
    es: '1 Unidad / Contenedor',
    ar: '1 وحدة / حاوية',
    zh: '1 单位 / 集装箱'
  },
  {
    en: /Export Item|Export Product/gi,
    gu: 'એક્સપોર્ટ આઈટમ',
    hi: 'निर्यात उत्पाद',
    fr: 'Article d\'Exportation',
    es: 'Artículo de Exportación',
    ar: 'عنصر تصدير',
    zh: '出口产品'
  },

  // Agro & Food Products
  {
    en: /Chocolates|Chocolate/gi,
    gu: 'ચોકલેટ',
    hi: 'चॉकलेट',
    fr: 'Chocolats',
    es: 'Chocolates',
    ar: 'شوكولاتة',
    zh: '巧克力'
  },
  {
    en: /Confectionery & Sweets|Confectionery/gi,
    gu: 'મિઠાઈ અને ચોકલેટ્સ',
    hi: 'मिष्ठान और चॉकलेट',
    fr: 'Confiserie & Douceurs',
    es: 'Confitería y Dulces',
    ar: 'الحلويات والسكاكر',
    zh: '糖果与甜点'
  },
  {
    en: /Red Chilli|Red Chili|Chilli/gi,
    gu: 'લાલ મરચું',
    hi: 'लाल मिर्च',
    fr: 'Piment Rouge',
    es: 'Chile Rojo',
    ar: 'فلفل أحمر حار',
    zh: '红辣椒'
  },
  {
    en: /Cardamom/gi,
    gu: 'એલચી',
    hi: 'इलायची',
    fr: 'Cardamome',
    es: 'Cardamomo',
    ar: 'هيل',
    zh: '小豆蔻'
  },
  {
    en: /Coriander Seeds|Coriander/gi,
    gu: 'ધાણા',
    hi: 'धनिया',
    fr: 'Graines de Coriandre',
    es: 'Semillas de Cilantro',
    ar: 'بذور الكزبرة',
    zh: '芫荽籽'
  },
  {
    en: /Mustard Seeds|Mustard/gi,
    gu: 'રાઈ',
    hi: 'सरसों',
    fr: 'Graines de Moutarde',
    es: 'Semillas de Mostaza',
    ar: 'بذور الخردل',
    zh: '芥菜籽'
  },
  {
    en: /Chickpeas|Garbanzo/gi,
    gu: 'કાબુલી ચણા',
    hi: 'काबूली चना',
    fr: 'Pois Chiches',
    es: 'Garbanzos',
    ar: 'حمص',
    zh: '鹰嘴豆'
  },
  {
    en: /Cumin Seeds|Cumin/gi,
    gu: 'જીરું',
    hi: 'जीरा',
    fr: 'Graines de Cumin',
    es: 'Semillas de Comino',
    ar: 'بذور الكمون',
    zh: '孜然籽'
  },
  {
    en: /Turmeric/gi,
    gu: 'હળદર',
    hi: 'हल्दी',
    fr: 'Curcuma',
    es: 'Cúrcuma',
    ar: 'كركم',
    zh: '姜黄'
  },
  {
    en: /Basmati Rice|Rice/gi,
    gu: 'ચોખા',
    hi: 'चावल',
    fr: 'Riz',
    es: 'Arroz Basmati',
    ar: 'أرز بسمتي',
    zh: '巴斯马蒂大米'
  },
  {
    en: /Wheat/gi,
    gu: 'ઘઉં',
    hi: 'गेहूं',
    fr: 'Blé',
    es: 'Trigo',
    ar: 'قمح',
    zh: '小麦'
  },
  {
    en: /Sugar/gi,
    gu: 'ખાંડ',
    hi: 'चीनी',
    fr: 'Sucre',
    es: 'Azúcar',
    ar: 'سكر',
    zh: '白糖'
  },
  {
    en: /Peanuts|Groundnut/gi,
    gu: 'સીંગદાણા',
    hi: 'मूंगफली',
    fr: 'Arachides',
    es: 'Cacahuetes',
    ar: 'فول سوداني',
    zh: '花生'
  },
  {
    en: /Sesame Seeds|Sesame/gi,
    gu: 'તલ',
    hi: 'तिल',
    fr: 'Sésame',
    es: 'Semillas de Sésamo',
    ar: 'بذور السمسم',
    zh: '芝麻'
  },
  {
    en: /Fennel Seeds|Fennel/gi,
    gu: 'વરિયાળી',
    hi: 'सौंफ',
    fr: 'Fenouil',
    es: 'Semillas de Hinojo',
    ar: 'بذور الشمر',
    zh: '茴香籽'
  },
  {
    en: /Spices & Agro Commodities|Spices/gi,
    gu: 'મસાલા અને કૃષિ પેદાશો',
    hi: 'मसाले और कृषि उत्पाद',
    fr: 'Épices & Produits Agricoles',
    es: 'Especias y Productos Agrícolas',
    ar: 'التوابل والمنتجات الزراعية',
    zh: '香料与农产品'
  },
  {
    en: /Dairy Products|Pure Indian Cow & Buffalo Clarified Butter \(Ghee\)|Ghee/gi,
    gu: 'ડેરી પ્રોડક્ટ્સ & શુદ્ધ દેશી ઘી',
    hi: 'डेयरी उत्पाद और शुद्ध घी',
    fr: 'Produits Laitiers & Beurre Clarifié (Ghee)',
    es: 'Productos Lácteos y Mantequilla Clarificada (Ghee)',
    ar: 'منتجات الألبان والسمن النقي (السمن الحيواني)',
    zh: '乳制品与纯正印度酥油 (Ghee)'
  },
  {
    en: /Skimmed Milk Powder|SMP 34% Protein|Milk Powder/gi,
    gu: 'સ્કીમ્ડ મિલ્ક પાઉડર (SMP)',
    hi: 'स्किम्ड मिल्क पाउडर (SMP)',
    fr: 'Lait Écrémé en Poudre (SMP)',
    es: 'Leche Desnatada en Polvo (SMP 34% Proteína)',
    ar: 'حليب مجفف منزوع الدسم (SMP)',
    zh: '脱脂奶粉 (SMP 34% 蛋白质)'
  },

  // Garments & Textiles
  {
    en: /Readymade Garments|Ready-made Garments/gi,
    gu: 'રેડિ-મેડ ગારમેન્ટ્સ',
    hi: 'रेडीमेड गारमेंट्स',
    fr: 'Vêtements Confectionnés',
    es: 'Prendas Confeccionadas',
    ar: 'الملابس الجاهزة',
    zh: '成衣服饰'
  },
  {
    en: /Surat Textiles|Textile Products|Textiles/gi,
    gu: 'સુરત ટેક્સટાઈલ્સ',
    hi: 'कपड़ा उत्पाद (Textiles)',
    fr: 'Produits Textiles de Surat',
    es: 'Productos Textiles de Surat',
    ar: 'منسوجات سورات الفاخرة',
    zh: '苏拉特优质纺织品'
  },
  {
    en: /Gujarati Dress/gi,
    gu: 'ગુજરાતી ડ્રેસ',
    hi: 'गुजराती ड्रेस',
    fr: 'Robe Gujarati',
    es: 'Vestido Tradicional Gujarati',
    ar: 'فستان غوجاراتي تقليدي',
    zh: '古吉拉特特色服饰'
  },
  {
    en: /Punjabi Dress/gi,
    gu: 'પંજાબી ડ્રેસ',
    hi: 'पंजाबी ड्रेस',
    fr: 'Robe Punjabi',
    es: 'Vestido Tradicional Punjabi',
    ar: 'فستان بنجابي',
    zh: '旁遮普传统服饰'
  },
  {
    en: /Chaniya Choli/gi,
    gu: 'ચણિયા ચોળી',
    hi: 'चनिया चोली',
    fr: 'Chaniya Choli',
    es: 'Chaniya Choli Tradicional',
    ar: 'شانيا شولي تقليدي',
    zh: '查尼亚乔利传统长裙'
  },
  {
    en: /Dupatta|Dupattas/gi,
    gu: 'દુપટ્ટાસ',
    hi: 'दुपट्टा',
    fr: 'Echarpe Dupatta',
    es: 'Bufanda Dupatta',
    ar: 'وشاح دوباتا',
    zh: '杜帕塔围巾'
  },
  {
    en: /Cotton Saree|Saree|Saris|Sarees/gi,
    gu: 'સાડી',
    hi: 'साड़ी',
    fr: 'Sari',
    es: 'Sari de Algodón',
    ar: 'ساري هندي',
    zh: '印度特色纱丽'
  },
  {
    en: /Kurti|Kurtis/gi,
    gu: 'કુર્તી',
    hi: 'कुर्ती',
    fr: 'Kurti',
    es: 'Kurti Bordada',
    ar: 'كورتي مطرزة',
    zh: '库尔蒂刺绣上装'
  },
  {
    en: /Dress Suits|Suits|Suit/gi,
    gu: 'સૂટ',
    hi: 'सूट',
    fr: 'Ensemble Dress',
    es: 'Trajes de Vestir',
    ar: 'بدلات نسائية فاخرة',
    zh: '套装礼服'
  },
  {
    en: /Shirts|Shirt/gi,
    gu: 'શર્ટ',
    hi: 'शर्ट',
    fr: 'Chemise',
    es: 'Camisas',
    ar: 'قمصان',
    zh: '衬衫'
  },
  {
    en: /T-Shirts|T-Shirt/gi,
    gu: 'ટી-શર્ટ્સ',
    hi: 'टी-शर्ट्स',
    fr: 'T-Shirts',
    es: 'Camisetas',
    ar: 'قمصان تي شيرت',
    zh: 'T恤衫'
  },
  {
    en: /Jeans & Pants|Jeans|Pants/gi,
    gu: 'પેન્ટ્સ અને જીન્સ',
    hi: 'पैंट और जींस',
    fr: 'Pantalons & Jeans',
    es: 'Vaqueros y Pantalones',
    ar: 'جينز وبناطيل',
    zh: '牛仔裤与长裤'
  },
  {
    en: /Fabric & Yarn|Fabrics|Fabric/gi,
    gu: 'ફેબ્રિક્સ અને કાપડ',
    hi: 'फैब्रिक्स',
    fr: 'Tissus & Fils',
    es: 'Telas e Hilados',
    ar: 'أقمشة وخيوط',
    zh: '面料与纱线'
  },
  {
    en: /Cotton Yarn|Cotton/gi,
    gu: 'કપાસ અને સુતરાઉ દોરો',
    hi: 'कॉटन और सूती धागा',
    fr: 'Fils de Coton & Coton',
    es: 'Hilos de Algodón y Algodón',
    ar: 'خيوط قطنية وقطن',
    zh: '全棉纱线与棉花'
  },
  {
    en: /Polyester/gi,
    gu: 'પોલિએસ્ટર',
    hi: 'पॉलिएस्टर',
    fr: 'Polyester',
    es: 'Poliéster',
    ar: 'بوليستر',
    zh: '聚酯纤维'
  },
  {
    en: /Silk/gi,
    gu: 'રેશમ',
    hi: 'सिल्क',
    fr: 'Soie',
    es: 'Seda',
    ar: 'حرير',
    zh: '真丝'
  },

  // Machinery & Electronics
  {
    en: /CNC Machine|CNC Machinery/gi,
    gu: 'સી.એન.સી. મશીન',
    hi: 'सीएनसी मशीन',
    fr: 'Machine CNC',
    es: 'Maquinaria CNC',
    ar: 'آلات التصنيع باستخدام الحاسب الآلي (CNC)',
    zh: '数控机床与加工中心'
  },
  {
    en: /Paper Bag & Box Packaging Material/gi,
    gu: 'પેપર બેગ અને બોક્સનું પેકેજિંગ મટીરીયલ',
    hi: 'पेपर बैग और बॉक्स पैकेजिंग सामग्री',
    fr: 'Matériel d\'emballage sacs en papier et boîtes',
    es: 'Material de Embalaje de Bolsas y Cajas de Papel',
    ar: 'مواد تغليف الأكياس والصناديق الورقية',
    zh: '环保纸袋与包装纸盒材料'
  },
  {
    en: /New Machinery & Systems|New Machinery/gi,
    gu: 'નવી મશીનરી અને સિસ્ટમ્સ',
    hi: 'नई मशीनरी और सिस्टम',
    fr: 'Nouvelles Machines & Systèmes',
    es: 'Nueva Maquinaria y Sistemas',
    ar: 'آلات وأنظمة صناعية جديدة',
    zh: '新型工业机械与自动化系统'
  },
  {
    en: /Used Industrial Machinery|Used Machinery/gi,
    gu: 'વપરાયેલી ઔદ્યોગિક મશીનરી',
    hi: 'पुरानी औद्योगिक मशीनरी',
    fr: 'Machines Industrielles d\'Occasion',
    es: 'Maquinaria Industrial Usada',
    ar: 'آلات صناعية مجددة ومستعملة',
    zh: '二手翻新工业机械'
  },
  {
    en: /Industrial Automation & Electronics|Industrial Automation/gi,
    gu: 'ઔદ્યોગિક ઓટોમેશન અને ઈલેક્ટ્રોનિક્સ',
    hi: 'औद्योगिक स्वचालन और इलेक्ट्रॉनिक्स',
    fr: 'Automation Industrielle & Électronique',
    es: 'Automatización Industrial y Electrónica',
    ar: 'الأتمتة الصناعية والإلكترونيات المتقدمة',
    zh: '工业自动化与电子控制设备'
  },

  // Fasteners & Industrial
  {
    en: /High Tensile Fasteners/gi,
    gu: 'હાઈ ટેન્સાઈલ ફાસ્ટનર્સ',
    hi: 'हाई टेंसाइल फास्टनर्स',
    fr: 'Fixations à Haute Résistance',
    es: 'Fijaciones de Alta Resistencia',
    ar: 'مثبتات عالية الشد والمقاومة',
    zh: '高强度紧固件'
  },
  {
    en: /Stainless Steel Bolts/gi,
    gu: 'સ્ટેનલેસ સ્ટીલ બોલ્ટ્સ',
    hi: 'स्टेनलेस स्टील बोल्ट',
    fr: 'Boulons en Acier Inoxydable',
    es: 'Pernos de Acero Inoxidable',
    ar: 'مسامير الفولاذ المقاوم للصدأ',
    zh: '不锈钢螺栓'
  },
  {
    en: /Bolts & Nuts|Bolts|Nuts/gi,
    gu: 'બોલ્ટ્સ અને નટ્સ',
    hi: 'बोल्ट और नट्स',
    fr: 'Boulons & Écrous',
    es: 'Pernos y Tuercas',
    ar: 'مسامير وصواميل صناعية',
    zh: '螺栓与螺母'
  },
  {
    en: /Industrial Goods & Fasteners|Industrial Goods/gi,
    gu: 'ઔદ્યોગિક માલ અને ફાસ્ટનર્સ',
    hi: 'औद्योगिक सामान और फास्टनर',
    fr: 'Biens Industriels & Boulonnerie',
    es: 'Bienes Industriales y Fijaciones',
    ar: 'السلع الصناعية والمثبتات',
    zh: '工业品与紧固配件'
  },
  {
    en: /Pipes & Valves|Pipes|Valves/gi,
    gu: 'પાઇપ્સ અને વાલ્વ',
    hi: 'पाइप और वॉल्व',
    fr: 'Tuyaux & Vannes',
    es: 'Tuberías y Válvulas',
    ar: 'أنابيب وصمامات صناعية',
    zh: '工业管道与阀门'
  },
  {
    en: /Pumps & Motors|Pumps/gi,
    gu: 'પમ્પ્સ અને મોટર્સ',
    hi: 'पंप और मोटर',
    fr: 'Pompes & Moteurs',
    es: 'Bombas y Motores',
    ar: 'مضخات ومحركات كهربائية',
    zh: '水泵与电机'
  },

  // Eco Packaging
  {
    en: /Eco Packaging & Sustainable Materials|Eco Packaging/gi,
    gu: 'ઇકો પેકેજિંગ અને ટકાવ સામગ્રી',
    hi: 'इको पैकेजिंग और टिकाऊ सामग्री',
    fr: 'Emballage Écologique & Matériaux Durables',
    es: 'Embalaje Ecológico y Sostenible',
    ar: 'التغليف البيئي والمستدام',
    zh: '环保包装与可持续材料'
  },
  {
    en: /Jute Bags/gi,
    gu: 'જૂટ બેગ્સ (શણના થેલા)',
    hi: 'जूट के बैग',
    fr: 'Sacs en Jute',
    es: 'Bolsas de Yute',
    ar: 'أكياس خيش الجوت الطبيعي',
    zh: '天然黄麻环保袋'
  },
  {
    en: /Non Woven Bags|Non-Woven Bags/gi,
    gu: 'નોન વુવન બેગ્સ',
    hi: 'नॉन वोवेन बैग',
    fr: 'Sacs Non Tissés',
    es: 'Bolsas No Tejidas',
    ar: 'أكياس أقمشة غير منسوجة',
    zh: '环保无纺布袋'
  },

  // Logistics & RFQ Buttons
  {
    en: /Add to Quote Cart \(RFQ\)|Add to Quote Cart/gi,
    gu: 'ક્વોટ કાર્ટમાં ઉમેરો (RFQ)',
    hi: 'कोट कार्ट में जोड़ें (RFQ)',
    fr: 'Ajouter au Panier (RFQ)',
    es: 'Añadir al Carrito de Cotización',
    ar: 'أضف إلى سلة عروض الأسعار',
    zh: '加入询价车 (RFQ)'
  },
  {
    en: /Request Quotation \(RFQ\)|Request Quotation/gi,
    gu: 'કોટેશન વિગત જણાવો (RFQ)',
    hi: 'कोटेशन अनुरोध (RFQ)',
    fr: 'Demander un Devis (RFQ)',
    es: 'Solicitar Cotización (RFQ)',
    ar: 'طلب عرض أسعار (RFQ)',
    zh: '请求报价 (RFQ)'
  },
  {
    en: /Proforma Export Quote/gi,
    gu: 'પ્રોફોર્મા એક્સપોર્ટ ક્વોટ (PDF)',
    hi: 'प्रोफॉर्म निर्यात कोटेशन (PDF)',
    fr: 'Devis Proforma Export',
    es: 'Cotización Proforma de Exportación',
    ar: 'فاتورة أولية للتصدير (PDF)',
    zh: '形式出口报价单 (PDF)'
  },
  {
    en: /Minimum Order Quantity|MOQ/gi,
    gu: 'ન્યૂનતમ ઓર્ડર જથ્થો (MOQ)',
    hi: 'न्यूनतम ऑर्डर मात्रा (MOQ)',
    fr: 'Quantité Minimale de Commande (MOQ)',
    es: 'Cantidad Mínima de Pedido (MOQ)',
    ar: 'الحد الأدنى لكمية الطلب (MOQ)',
    zh: '最小起订量 (MOQ)'
  },
  {
    en: /HS Code/gi,
    gu: 'એચ.એસ. કોડ (HS Code)',
    hi: 'एचएस कोड (HS Code)',
    fr: 'Code SH (HS Code)',
    es: 'Código SA (HS Code)',
    ar: 'رمز النظام المنسق (HS Code)',
    zh: '海关编码 (HS Code)'
  },
  {
    en: /Verified Exporter/gi,
    gu: 'પ્રમાણિત નિકાસકાર',
    hi: 'सत्यापित निर्यातक',
    fr: 'Exportateur Vérifié',
    es: 'Exportador Verificado',
    ar: 'مصدّر معتمد',
    zh: '认证出口商'
  }
];

function matchTradeDictionary(text, lang) {
  if (!text || typeof text !== 'string') return text || '';
  let str = text;

  MASTER_TRADE_GRAMMAR_DICTIONARY.forEach(rule => {
    if (rule[lang]) {
      str = str.replace(rule.en, rule[lang]);
    }
  });

  return str;
}

export function autoTranslateText(text, lang = 'en') {
  if (!text || typeof text !== 'string') return text || '';
  if (lang === 'en') return text;

  const cacheKey = `${text.trim().toLowerCase()}_${lang}`;
  if (transliterationCache.has(cacheKey)) {
    return transliterationCache.get(cacheKey);
  }

  const dictResult = matchTradeDictionary(text, lang);
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
    const pairMap = {
      fr: 'en-US|fr-CA',
      gu: 'en-US|gu-IN',
      hi: 'en-US|hi-IN',
      es: 'en-US|es-ES',
      ar: 'en-US|ar-SA',
      zh: 'en-US|zh-CN'
    };
    const pairCode = pairMap[lang] || `en-US|${lang}`;
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
          transliterationCache.set(cacheKey, tText);
          return tText;
        }
      }
    }
  } catch (e) {}

  const itcCode = lang === 'gu' ? 'gu-t-i0-und' : (lang === 'hi' ? 'hi-t-i0-und' : (lang === 'ar' ? 'ar-t-i0-und' : ''));
  if (itcCode) {
    try {
      const url = `https://inputtools.google.com/request?text=${encodeURIComponent(clean)}&itc=${itcCode}&num=3`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data[0] === 'SUCCESS' && data[1] && data[1][0] && data[1][0][1] && data[1][0][1][0]) {
          const translated = data[1][0][1][0];
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
    return { en: '', gu: '', hi: '', fr: '', es: '', ar: '', zh: '' };
  }
  const clean = englishText.trim();
  const obj = { en: clean, gu: clean, hi: clean, fr: clean, es: clean, ar: clean, zh: clean };

  const langs = ['gu', 'hi', 'fr', 'es', 'ar', 'zh'];
  const langPairMap = {
    gu: 'en-US|gu-IN',
    hi: 'en-US|hi-IN',
    fr: 'en-US|fr-CA',
    es: 'en-US|es-ES',
    ar: 'en-US|ar-SA',
    zh: 'en-US|zh-CN'
  };

  try {
    const promises = langs.map(async (l) => {
      try {
        const dictMatch = matchTradeDictionary(clean, l);
        if (dictMatch && dictMatch !== clean) {
          obj[l] = dictMatch;
          return;
        }
        const pair = langPairMap[l] || `en-US|${l}`;
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=${pair}`);
        const data = await res.json();
        if (data && data.responseData && data.responseData.translatedText) {
          let text = data.responseData.translatedText.trim();
          if (typeof document !== 'undefined') {
            const txtEl = document.createElement('textarea');
            txtEl.innerHTML = text;
            text = txtEl.value;
          }
          if (text && !text.includes('MYMEMORY WARNING')) obj[l] = text;
          else obj[l] = autoTranslateText(clean, l);
        } else {
          obj[l] = autoTranslateText(clean, l);
        }
      } catch(e) {
        obj[l] = autoTranslateText(clean, l);
      }
    });
    await Promise.all(promises);
  } catch(err) {
    langs.forEach(l => { obj[l] = autoTranslateText(clean, l); });
  }

  return obj;
}

export function autoGenerateMultilingualNames(englishTitle) {
  const en = (englishTitle || '').trim();
  if (!en) return { en: '', gu: '', hi: '', fr: '', es: '', ar: '', zh: '' };
  return {
    en,
    gu: autoTranslateText(en, 'gu'),
    hi: autoTranslateText(en, 'hi'),
    fr: autoTranslateText(en, 'fr'),
    es: autoTranslateText(en, 'es'),
    ar: autoTranslateText(en, 'ar'),
    zh: autoTranslateText(en, 'zh')
  };
}

export function autoGenerateMultilingualSpec(englishSpec) {
  const en = (englishSpec || '').trim();
  if (!en) return { en: '', gu: '', hi: '', fr: '', es: '', ar: '', zh: '' };
  return {
    en,
    gu: autoTranslateText(en, 'gu'),
    hi: autoTranslateText(en, 'hi'),
    fr: autoTranslateText(en, 'fr'),
    es: autoTranslateText(en, 'es'),
    ar: autoTranslateText(en, 'ar'),
    zh: autoTranslateText(en, 'zh')
  };
}
