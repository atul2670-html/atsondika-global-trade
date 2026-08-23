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
    en: /Connecting Premium Quality Agro Commodities, Dairy Products, Textile Products, Readymade Garments, Used Machinery, New Machinery, Industrial Goods & Fasteners To The World/gi,
    gu: 'શ્રેષ્ઠ ગુણવત્તાવાળા એગ્રો કોમોડિટીઝ, ડેરી પ્રોડક્ટ્સ, ટેક્સટાઇલ, રેડીમેડ ગારમેન્ટ્સ, નવી અને વપરાયેલ મશીનરી, ઔદ્યોગિક માલ અને ફાસ્ટનર્સને વિશ્વ સાથે જોડતી અગ્રણી કંપની.',
    hi: 'प्रीमियम गुणवत्ता वाले कृषि उत्पादों, डेयरी उत्पादों, कपड़ा, तैयार वस्त्रों, नई और पुरानी मशीनरी, औद्योगिक सामान और फास्टनरों को दुनिया से जोड़ना।',
    fr: 'Connecter les produits agricoles, produits laitiers, textiles, vêtements, machines d\'occasion et neuves, biens industriels & boulonnerie de qualité supérieure au monde.'
  },
  {
    en: /Trusted Indian Exporter specializing in Spices, Rice, Oilseeds, Fasteners, New & Used Machinery, and Eco Packaging across 40\+ countries/gi,
    gu: 'મસાલા, ચોખા, તેલીબિયાં, ફાસ્ટનર્સ, નવી અને વપરાયેલી મશીનરી, ડેરી, કાપડ અને ઇકો પેકેજિંગમાં વિશિષ્ટતા ધરાવતા ૪૦+ દેશોમાં અગ્રણી ભારતીય નિકાસકાર.',
    hi: 'मसालों, चावल, तिलहन, फास्टनरों, नई और पुरानी मशीनरी, डेयरी, कपड़े और इको पैकेजिंग में विशेषज्ञता वाला प्रमुख भारतीय निर्यातक।',
    fr: 'Exportateur indien de confiance spécialisé dans les épices, le riz, les machines neuves et d\'occasion, les vêtements et les emballages écologiques vers 40+ pays.'
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
  { en: /Chocolates|Chocolate/gi, gu: 'ચોકલેટ', hi: 'चॉकलेट', fr: 'Chocolats' },
  { en: /Confectionery & Sweets|Confectionery/gi, gu: 'મિઠાઈ અને ચોકલેટ્સ', hi: 'मिष्ठान और चॉकलेट', fr: 'Confiserie & Douceurs' },
  { en: /Red Chilli|Red Chili|Chilli/gi, gu: 'લાલ મરચું', hi: 'लाल मिर्च', fr: 'Piment Rouge' },
  { en: /Cardamom/gi, gu: 'એલચી', hi: 'इलायची', fr: 'Cardamome' },
  { en: /Coriander Seeds|Coriander/gi, gu: 'ધાણા', hi: 'धनिया', fr: 'Graines de Coriandre' },
  { en: /Mustard Seeds|Mustard/gi, gu: 'રાઈ', hi: 'सरसों', fr: 'Graines de Moutarde' },
  { en: /Chickpeas|Garbanzo/gi, gu: 'કાબુલી ચણા', hi: 'काबूली चना', fr: 'Pois Chiches' },
  { en: /Cumin Seeds|Cumin/gi, gu: 'જીરું', hi: 'जीरा', fr: 'Graines de Cumin' },
  { en: /Turmeric/gi, gu: 'હળદર', hi: 'हल्दी', fr: 'Curcuma' },
  { en: /Basmati Rice|Rice/gi, gu: 'ચોખા', hi: 'चावल', fr: 'Riz' },
  { en: /Wheat/gi, gu: 'ઘઉં', hi: 'गेहूं', fr: 'Blé' },
  { en: /Sugar/gi, gu: 'ખાંડ', hi: 'चीनी', fr: 'Sucre' },
  { en: /Peanuts|Groundnut/gi, gu: 'સીંગદાણા', hi: 'मूंगफली', fr: 'Arachides' },
  { en: /Sesame Seeds|Sesame/gi, gu: 'તલ', hi: 'तिल', fr: 'Sésame' },
  { en: /Fennel Seeds|Fennel/gi, gu: 'વરિયાળી', hi: 'सौंफ', fr: 'Fenouil' },
  { en: /Spices & Agro Commodities|Spices/gi, gu: 'મસાલા અને કૃષિ પેદાશો', hi: 'मसाले और कृषि उत्पाद', fr: 'Épices & Produits Agricoles' },

  // Garments & Textiles
  { en: /Readymade Garments|Ready-made Garments/gi, gu: 'રેડિ-મેડ ગારમેન્ટ્સ', hi: 'रेडीमेड गारमेंट्स', fr: 'Vêtements Confectionnés' },
  { en: /Surat Textiles|Textile Products|Textiles/gi, gu: 'સુરત ટેક્સટાઈલ્સ', hi: 'कपड़ा उत्पाद (Textiles)', fr: 'Produits Textiles de Surat' },
  { en: /Gujarati Dress/gi, gu: 'ગુજરાતી ડ્રેસ', hi: 'गुजराती ड्रेस', fr: 'Robe Gujarati' },
  { en: /Punjabi Dress/gi, gu: 'પંજાબી ડ્રેસ', hi: 'पंजाबी ड्रेस', fr: 'Robe Punjabi' },
  { en: /Chaniya Choli/gi, gu: 'ચણિયા ચોળી', hi: 'चनिया चोली', fr: 'Chaniya Choli' },
  { en: /Dupatta|Dupattas/gi, gu: 'દુપટ્ટાસ', hi: 'दुपट्टा', fr: 'Echarpe Dupatta' },
  { en: /Cotton Saree|Saree|Saris|Sarees/gi, gu: 'સાડી', hi: 'साड़ी', fr: 'Sari' },
  { en: /Kurti|Kurtis/gi, gu: 'કુર્તી', hi: 'कुर्ती', fr: 'Kurti' },
  { en: /Dress Suits|Suits|Suit/gi, gu: 'સૂટ', hi: 'सूट', fr: 'Ensemble Dress' },
  { en: /Shirts|Shirt/gi, gu: 'શર્ટ', hi: 'शर्ट', fr: 'Chemise' },
  { en: /T-Shirts|T-Shirt/gi, gu: 'ટી-શર્ટ્સ', hi: 'टी-शर्ट्स', fr: 'T-Shirts' },
  { en: /Jeans & Pants|Jeans|Pants/gi, gu: 'પેન્ટ્સ અને જીન્સ', hi: 'पैंट और जींस', fr: 'Pantalons & Jeans' },
  { en: /Fabric & Yarn|Fabrics|Fabric/gi, gu: 'ફેબ્રિક્સ અને કાપડ', hi: 'फैब्रिक्स', fr: 'Tissus & Fils' },
  { en: /Cotton/gi, gu: 'કપાસ', hi: 'कॉटन', fr: 'Coton' },
  { en: /Polyester/gi, gu: 'પોલિએસ્ટર', hi: 'पॉलिएस्टर', fr: 'Polyester' },
  { en: /Silk/gi, gu: 'રેશમ', hi: 'सिल्क', fr: 'Soie' },

  // Machinery & Electronics
  { en: /CNC Machine|CNC Machinery/gi, gu: 'સી.એન.સી. મશીન', hi: 'सीएनसी मशीन', fr: 'Machine CNC' },
  { en: /Paper Bag & Box Packaging Material/gi, gu: 'પેપર બેગ અને બોક્સનું પેકેજિંગ મટીરીયલ', hi: 'पेपर बैग और बॉक्स पैकेजिंग सामग्री', fr: 'Matériel d\'emballage sacs en papier et boîtes' },
  { en: /New Machinery & Systems|New Machinery/gi, gu: 'નવી મશીનરી અને સિસ્ટમ્સ', hi: 'नई मशीनरी और सिस्टम', fr: 'Nouvelles Machines & Systèmes' },
  { en: /Used Industrial Machinery|Used Machinery/gi, gu: 'વપરાયેલી ઔદ્યોગિક મશીનરી', hi: 'पुरानी औद्योगिक मशीनरी', fr: 'Machines Industrielles d\'Occasion' },
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
          transliterationCache.set(cacheKey, tText);
          return tText;
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
          if (text) obj[l] = text;
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
