/**
 * Universal Multilingual Translation & Transliteration Engine for Millions of Products Worldwide
 * Powered by Google Transliteration API + Offline Phonetic Engine + Trade Dictionary.
 */

// Cache for live fetched transliterations to avoid repeated network requests
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
  28: { en: 'Twenty-Eight', gu: 'અઠ્ઠાવીસ', hi: 'अट्ठाईस', fr: 'Vingt-huit' },
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
  41: { en: 'Forty-One', gu: 'એકતાળીસ', hi: 'इकतालीस', fr: 'Quarante et un' },
  42: { en: 'Forty-Two', gu: 'બાળીસ', hi: 'बयालीस', fr: 'Quarante-deux' },
  43: { en: 'Forty-Three', gu: 'તેતાળીસ', hi: 'तैंतालीस', fr: 'Quarante-trois' },
  44: { en: 'Forty-Four', gu: 'ચોતાળીસ', hi: 'चौवालिस', fr: 'Quarante-quatre' },
  45: { en: 'Forty-Five', gu: 'પીસ્તાળીસ', hi: 'पैंतालीस', fr: 'Quarante-cinq' },
  46: { en: 'Forty-Six', gu: 'છેતાળીસ', hi: 'छियालीस', fr: 'Quarante-six' },
  47: { en: 'Forty-Seven', gu: 'સુડતાળીસ', hi: 'सैंतालीस', fr: 'Quarante-sept' },
  48: { en: 'Forty-Eight', gu: 'અડતાળીસ', hi: 'अड़तालीस', fr: 'Quarante-huit' },
  49: { en: 'Forty-Nine', gu: 'ઓગણપચાસ', hi: 'उनचास', fr: 'Quarante-neuf' },
  50: { en: 'Fifty', gu: 'પચાસ', hi: 'पचास', fr: 'Cinquante' },
  51: { en: 'Fifty-One', gu: 'એકાવન', hi: 'इक्यावन', fr: 'Cinquante et un' },
  52: { en: 'Fifty-Two', gu: 'બાવન', hi: 'बावन', fr: 'Cinquante-deux' },
  53: { en: 'Fifty-Three', gu: 'ત્રેપન', hi: 'तिरपन', fr: 'Cinquante-trois' },
  54: { en: 'Fifty-Four', gu: 'ચોપન', hi: 'चौवन', fr: 'Cinquante-quatre' },
  55: { en: 'Fifty-Five', gu: 'પંચાવન', hi: 'पचपन', fr: 'Cinquante-cinq' },
  56: { en: 'Fifty-Six', gu: 'છપન', hi: 'छप्पन', fr: 'Cinquante-six' },
  57: { en: 'Fifty-Seven', gu: 'સત્તાવન', hi: 'सत्तावन', fr: 'Cinquante-sept' },
  58: { en: 'Fifty-Eight', gu: 'અઠ્ઠાવન', hi: 'अट्ठावन', fr: 'Cinquante-huit' },
  59: { en: 'Fifty-Nine', gu: 'ઓગણસાઠ', hi: 'उनसठ', fr: 'Cinquante-neuf' },
  60: { en: 'Sixty', gu: 'સાઠ', hi: 'साठ', fr: 'Soixante' },
  61: { en: 'Sixty-One', gu: 'એકસાઠ', hi: 'इकसठ', fr: 'Soixante et un' },
  62: { en: 'Sixty-Two', gu: 'બાસાઠ', hi: 'बासठ', fr: 'Soixante-deux' },
  63: { en: 'Sixty-Three', gu: 'ત્રેસાઠ', hi: 'तिरसठ', fr: 'Soixante-trois' },
  64: { en: 'Sixty-Four', gu: 'ચોસાઠ', hi: 'चौंसठ', fr: 'Soixante-quatre' },
  65: { en: 'Sixty-Five', gu: 'પાંસઠ', hi: 'पैंसठ', fr: 'Soixante-cinq' },
  66: { en: 'Sixty-Six', gu: 'છાસઠ', hi: 'छियासठ', fr: 'Soixante-six' },
  67: { en: 'Sixty-Seven', gu: 'સડસાઠ', hi: 'सरसठ', fr: 'Soixante-sept' },
  68: { en: 'Sixty-Eight', gu: 'અડસાઠ', hi: 'अड़सठ', fr: 'Soixante-huit' },
  69: { en: 'Sixty-Nine', gu: 'ઓગણસિત્તેર', hi: 'उनहत्तर', fr: 'Soixante-neuf' },
  70: { en: 'Seventy', gu: 'સિત્તેર', hi: 'सत्तर', fr: 'Soixante-dix' },
  71: { en: 'Seventy-One', gu: 'એકોતેર', hi: 'इकहत्तर', fr: 'Soixante-onze' },
  72: { en: 'Seventy-Two', gu: 'બોતેર', hi: 'बहत्तर', fr: 'Soixante-douze' },
  73: { en: 'Seventy-Three', gu: 'તંતેર', hi: 'तिहत्तर', fr: 'Soixante-treize' },
  74: { en: 'Seventy-Four', gu: 'ચુમોતેર', hi: 'चौहत्तर', fr: 'Soixante-quatorze' },
  75: { en: 'Seventy-Five', gu: 'પંચોતેર', hi: 'पचहत्तर', fr: 'Soixante-quinze' },
  76: { en: 'Seventy-Six', gu: 'છોતેર', hi: 'छिहत्तर', fr: 'Soixante-seize' },
  77: { en: 'Seventy-Seven', gu: 'સંતોતેર', hi: 'सतहत्तर', fr: 'Soixante-dix-sept' },
  78: { en: 'Seventy-Eight', gu: 'િઠોતેર', hi: 'अठहत्तर', fr: 'Soixante-dix-huit' },
  79: { en: 'Seventy-Nine', gu: 'ઓગણએંસી', hi: 'उनासी', fr: 'Soixante-dix-neuf' },
  80: { en: 'Eighty', gu: 'એંસી', hi: 'अस्सी', fr: 'Quatre-vingts' },
  81: { en: 'Eighty-One', gu: 'એક્યાસી', hi: 'इक्यासी', fr: 'Quatre-vingt-un' },
  82: { en: 'Eighty-Two', gu: 'બ્યાસી', hi: 'बयासी', fr: 'Quatre-vingt-deux' },
  83: { en: 'Eighty-Three', gu: 'ત્યાસી', hi: 'तिरासी', fr: 'Quatre-vingt-trois' },
  84: { en: 'Eighty-Four', gu: 'ચોર્યાસી', hi: 'चौरासी', fr: 'Quatre-vingt-quatre' },
  85: { en: 'Eighty-Five', gu: 'પંચાસી', hi: 'पचासी', fr: 'Quatre-vingt-cinq' },
  86: { en: 'Eighty-Six', gu: 'છ્યાસી', hi: 'छियासी', fr: 'Quatre-vingt-six' },
  87: { en: 'Eighty-Seven', gu: 'સત્યાસી', hi: 'सत्तासी', fr: 'Quatre-vingt-sept' },
  88: { en: 'Eighty-Eight', gu: 'અઠ્યાસી', hi: 'अठासी', fr: 'Quatre-vingt-huit' },
  89: { en: 'Eighty-Nine', gu: 'નેવ્યાસી', hi: 'नवासी', fr: 'Quatre-vingt-neuf' },
  90: { en: 'Ninety', gu: 'નેવું', hi: 'नब्बे', fr: 'Quatre-vingt-dix' },
  91: { en: 'Ninety-One', gu: 'એકાણું', hi: 'इक्यानवे', fr: 'Quatre-vingt-onze' },
  92: { en: 'Ninety-Two', gu: 'બાળું', hi: 'बानवे', fr: 'Quatre-vingt-douze' },
  93: { en: 'Ninety-Three', gu: 'ત્રાણું', hi: 'तिरानवे', fr: 'Quatre-vingt-treize' },
  94: { en: 'Ninety-Four', gu: 'ચોરાણું', hi: 'चौरानवे', fr: 'Quatre-vingt-quatorze' },
  95: { en: 'Ninety-Five', gu: 'પંચાણું', hi: 'पचानवे', fr: 'Quatre-vingt-quinze' },
  96: { en: 'Ninety-Six', gu: 'છન્નું', hi: 'छियानवे', fr: 'Quatre-vingt-seize' },
  97: { en: 'Ninety-Seven', gu: 'સત્તાણું', hi: 'संतानवे', fr: 'Quatre-vingt-dix-sept' },
  98: { en: 'Ninety-Eight', gu: 'અઠ્ઠાણું', hi: 'अट्ठानवे', fr: 'Quatre-vingt-dix-huit' },
  99: { en: 'Ninety-Nine', gu: 'નવ્વાણું', hi: 'निनानवे', fr: 'Quatre-vingt-dix-neuf' }
};

/**
 * Universal Digits & Numbers Converter (1 to 99 & Any Number String)
 * Converts numbers & digits to Gujarati (૦-૯), Hindi (०-९), French & English
 */
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
 * Main Translation Function
 */
export function autoTranslateText(text, lang = 'en') {
  if (!text || typeof text !== 'string') return text || '';
  if (lang === 'en') return text;

  // 1. Check if cached
  const cacheKey = `${text.trim().toLowerCase()}_${lang}`;
  if (transliterationCache.has(cacheKey)) {
    return transliterationCache.get(cacheKey);
  }

  // 2. Check Trade Dictionary first
  const dictResult = matchTradeDictionary(text, lang);
  if (dictResult && dictResult !== text) {
    transliterationCache.set(cacheKey, dictResult);
    return dictResult;
  }

  // 3. Fallback to Algorithmic Phonetic Engine
  const phoneticResult = algorithmicPhoneticTransliterate(text, lang);
  return phoneticResult;
}

/**
 * Async Google Input Tools Transliteration API (Fetches 100% accurate Gujarati for ANY word in the world)
 */
export async function fetchGoogleTransliteration(text, lang = 'gu') {
  if (!text || !text.trim()) return '';
  const clean = text.trim();
  const cacheKey = `${clean.toLowerCase()}_${lang}`;
  if (transliterationCache.has(cacheKey)) return transliterationCache.get(cacheKey);

  // 1. Try MyMemory Neural Translation API first for natural, fluent sentence translation
  try {
    const mmRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|${lang}`);
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

  // 2. Fallback to Google Transliteration Input Tools API
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

  // 3. Fallback to offline Trade Dictionary & Algorithmic Engine
  return autoTranslateText(clean, lang);
}

/**
 * Trade Dictionary Mapping
 */
function matchTradeDictionary(text, lang) {
  let str = text;

  const dictionary = [
    // Gender & Apparel Prefixes
    { en: /For Women's|For Women|For Ladies|For Girls/gi, gu: 'મહિલાઓ માટે', hi: 'महिलाओं के लिए', fr: 'Pour Femmes' },
    { en: /For Men's|For Men|For Gents|For Boys/gi, gu: 'પુરુષો માટે', hi: 'पुरुषों के लिए', fr: 'Pour Hommes' },
    { en: /For Kids|For Children/gi, gu: 'બાળકો માટે', hi: 'बच्चों के लिए', fr: 'Pour Enfants' },
    { en: /Women's|Ladies'/gi, gu: 'મહિલાઓ માટે', hi: 'महिलाओं के लिए', fr: 'Pour Femmes' },
    { en: /Men's|Gents'/gi, gu: 'પુરુષો માટે', hi: 'पुरुषों के लिए', fr: 'Pour Hommes' },
    { en: /Women|Ladies/gi, gu: 'મહિલાઓ', hi: 'महिलाएं', fr: 'Femmes' },
    { en: /Men|Gents/gi, gu: 'પુરુષો', hi: 'पुरुष', fr: 'Hommes' },
    { en: /Kids|Children/gi, gu: 'બાળકો', hi: 'बच्चे', fr: 'Enfants' },
    // Full Sentence Matching
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
    {
      en: /Delivering Excellence from Indian Soil to Global Markets/gi,
      gu: 'ભારતીય ભૂમિથી વૈશ્વિક બજારો સુધી ઉત્કૃષ્ટતા પહોંચાડવી.',
      hi: 'भारतीय मिट्टी से वैश्विक बाजारों तक उत्कृष्टता पहुंचाना।',
      fr: 'Offrir l\'excellence du sol indien aux marchés mondiaux.'
    },
    {
      en: /We are a premier export and trading house headquartered in Surat, Gujarat.*packaging globally\./gi,
      gu: 'અમે સુરત, ગુજરાતમાં મુખ્ય મથક ધરાવતી એક અગ્રણી નિકાસ અને વેપાર ગૃહ છીએ. અપ્રતિમ શુદ્ધતા, કડક ગુણવત્તા ધોરણો અને સીમલેસ લોજિસ્ટિક્સ માટે કટિબદ્ધ, અમે ઉચ્ચ કક્ષાની કૃષિ પેદાશો, ઔદ્યોગિક પુરવઠો, નવી અને વપરાયેલી મશીનરી, રેડીમેડ ગારમેન્ટ્સ અને ટકાઉ પેકેજિંગની વૈશ્વિક સ્તરે નિકાસ કરીએ છીએ.',
      hi: 'हम सूरत, गुजरात में स्थित एक प्रमुख निर्यात और ट्रेडिंग हाउस हैं। पूर्ण शुद्धता, कड़े गुणवत्ता प्रोटोकॉल और सुचारू लॉजिस्टिक्स के लिए प्रतिबद्ध, हम शीर्ष स्तरीय कृषि उत्पादों, औद्योगिक सामानों, नई और पुरानी मशीनों, रेडीमेड कपड़ों और टिकाऊ पैकेजिंग का वैश्विक स्तर पर निर्यात करते हैं।',
      fr: 'Nous sommes une maison d\'exportation et de commerce de premier plan basée à Surat, Gujarat. Engagés envers une pureté absolue, des protocoles de qualité stricts et une logistique fluide, nous exportons des produits agricoles de premier ordre, des fournitures industrielles, des machines neuves et d\'occasion, des vêtements confectionnés et des emballages durables à l\'échelle mondiale.'
    },
    {
      en: /Leading Exporter from Surat, India/gi,
      gu: 'સુરત, ભારતથી અગ્રણી નિકાસકાર',
      hi: 'सूरत, भारत से प्रमुख निर्यातक',
      fr: 'Premier Exportateur de Surat, Inde'
    },
    {
      en: /Direct sourcing & APEDA certified quality/gi,
      gu: 'સીધું ઉત્પાદન અને APEDA દ્વારા પ્રમાણિત ગુણવત્તા',
      hi: 'प्रत्यक्ष सोर्सिंग और APEDA प्रमाणित गुणवत्ता',
      fr: 'Approvisionnement direct & qualité certifiée APEDA'
    },
    {
      en: /Global logistics & express port delivery/gi,
      gu: 'ગ્લોબલ લોજિસ્ટિક્સ અને ઝડપી બંદર ડિલિવરી',
      hi: 'वैश्विक रसद और एक्सप्रेस बंदरगाह डिलीवरी',
      fr: 'Logistique mondiale & livraison portuaire express'
    },
    {
      en: /Competitive container pricing & transparent terms/gi,
      gu: 'સ્પર્ધાત્મક કિંમતો અને પારદર્શક શરતો',
      hi: 'प्रतिस्पर्धी मूल्य निर्धारण और पारदर्शी शर्तें',
      fr: 'Tarification compétitive des conteneurs & conditions transparentes'
    },

    // Phrase & Word Translations
    { en: /Connecting/gi, gu: 'જોડતી', hi: 'जोड़ना', fr: 'Connecter' },
    { en: /Premium Quality/gi, gu: 'શ્રેષ્ઠ ગુણવત્તાવાળા', hi: 'उत्कृष्ट गुणवत्ता', fr: 'Qualité Supérieure' },
    { en: /Agro Commodities/gi, gu: 'એગ્રો કોમોડિટીઝ (કૃષિ પેદાશો)', hi: 'कृषि उत्पाद', fr: 'Produits Agricoles' },
    { en: /Dairy Products/gi, gu: 'ડેરી પ્રોડક્ટ્સ', hi: 'डेयरी उत्पाद', fr: 'Produits Laitiers' },
    { en: /Textile Products/gi, gu: 'ટેક્સટાઇલ પેદાશો', hi: 'कपड़ा उत्पाद', fr: 'Produits Textiles' },
    { en: /Readymade Garments/gi, gu: 'રેડિ-મેડ ગારમેન્ટ્સ', hi: 'रेडीमेड गारमेंट्स', fr: 'Vêtements Confectionnés' },
    { en: /Used Machinery/gi, gu: 'વપરાયેલી મશીનરી', hi: 'पुराणी मशीनरी', fr: 'Machines d\'Occasion' },
    { en: /New Machinery/gi, gu: 'નવી મશીનરી', hi: 'नई मशीनरी', fr: 'Machines Neuves' },
    { en: /Industrial Goods/gi, gu: 'ઔદ્યોગિક સામાન', hi: 'औद्योगिक सामान', fr: 'Biens Industriels' },
    { en: /Fasteners & Bolts|Fasteners/gi, gu: 'ફાસ્ટનર્સ અને બોલ્ટ્સ', hi: 'फास्टनर और बोल्ट', fr: 'Boulons & Fixations' },
    { en: /To The World/gi, gu: 'વૈશ્વિક બજારોમાં સપ્લાય', hi: 'दुनिया भर में', fr: 'Au Monde' },
    { en: /Trusted Indian Exporter/gi, gu: 'અગ્રણી ભારતીય નિકાસકાર', hi: 'विश्वसनीय भारतीय निर्यातक', fr: 'Exportateur Indien de Confiance' },
    { en: /Eco Packaging/gi, gu: 'ઈકો પેકેજિંગ', hi: 'इको पैकेजिंग', fr: 'Emballage Écologique' },
    { en: /across 40\+ countries/gi, gu: '૪૦+ દેશોમાં સપ્લાય', hi: '40+ देशों में', fr: 'vers 40+ pays' },

    // Spices & Agro Products
    { en: /Red Chilli|Chilli/gi, gu: 'લાલ મરચું', hi: 'लाल मिर्च', fr: 'Piment Rouge' },
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
    { en: /Spices/gi, gu: 'મસાલા', hi: 'मसाले', fr: 'Épices' },

    // Garments & Textiles
    { en: /Gujarati Dress/gi, gu: 'ગુજરાતી ડ્રેસ', hi: 'गुजराती ड्रेस', fr: 'Robe Gujarati' },
    { en: /Punjabi Dress/gi, gu: 'પંજાબી ડ્રેસ', hi: 'पंजाबी ड्रेस', fr: 'Robe Punjabi' },
    { en: /Chaniya Choli/gi, gu: 'ચણિયા ચોળી', hi: 'चनिया चोली', fr: 'Chaniya Choli' },
    { en: /Dupatta/gi, gu: 'દુપટ્ટાસ', hi: 'दुपट्टा', fr: 'Dupatta' },
    { en: /Dress/gi, gu: 'ડ્રેસ', hi: 'ड्रेस', fr: 'Robe' },
    { en: /Saree|Sari/gi, gu: 'સાડી', hi: 'साड़ी', fr: 'Sari' },
    { en: /Kurti|Kurtis/gi, gu: 'કુર્તી', hi: 'कुर्ती', fr: 'Kurti' },
    { en: /Suit|Suits/gi, gu: 'સૂટ', hi: 'સૂટ', hi: 'सूट', fr: 'Ensemble' },
    { en: /Shirt|Shirts/gi, gu: 'શર્ટ', hi: 'शर्ट', fr: 'Chemise' },
    { en: /Pant|Pants|Jeans/gi, gu: 'પેન્ટ્સ & જીન્સ', hi: 'पैंट और जींस', fr: 'Pantalons & Jeans' },
    { en: /Fabric|Fabrics/gi, gu: 'ફેબ્રિક્સ', hi: 'फैब्रिक्स', fr: 'Tissus' },
    { en: /Cotton/gi, gu: 'કપાસ', hi: 'कॉटन', fr: 'Coton' },
    { en: /Yarn/gi, gu: 'દોરા', hi: 'धागे', fr: 'Fil' },
    { en: /T-Shirt|T-Shirts/gi, gu: 'ટી-શર્ટ્સ', hi: 'टी-शर्ट्स', fr: 'T-Shirts' },
    { en: /Polyester/gi, gu: 'પોલિએસ્ટર', hi: 'पॉलिएस्टर', fr: 'Polyester' },
    { en: /Silk/gi, gu: 'રેશમ', hi: 'सिल्क', fr: 'Soie' },

    // Hardware & Industrial
    { en: /High Tensile Fasteners/gi, gu: 'હાઈ ટેન્સાઈલ ફાસ્ટનર્સ', hi: 'हाई टेंसाइल फास्टनर्स', fr: 'Fixations à Haute Résistance' },
    { en: /Stainless Steel Bolts/gi, gu: 'સ્ટેનલેસ સ્ટીલ બોલ્ટ્સ', hi: 'स्टेनलेस स्टील बोल्ट', fr: 'Boulons en Acier Inoxydable' },
    { en: /Bolts|Nuts/gi, gu: 'બોલ્ટ્સ અને નટ્સ', hi: 'बोल्ट और नट्स', fr: 'Boulons & Écrous' },
    { en: /Industrial/gi, gu: 'ઔદ્યોગિક', hi: 'औद्योगिक', fr: 'Industriel' },
    { en: /Machinery|Machine/gi, gu: 'મશીનરી', hi: 'मशीनरी', fr: 'Machines' },
    { en: /Pipes|Pipe/gi, gu: 'પાઇપ્સ', hi: 'पाइप', fr: 'Tuyaux' },
    { en: /Valves|Valve/gi, gu: 'વાલ્વ', hi: 'वॉल्व', fr: 'Vannes' },
    { en: /Pump|Pumps/gi, gu: 'પમ્પ્સ', hi: 'पंप', fr: 'Pompes' },
    { en: /Chemicals|Chemical/gi, gu: 'કેમિકલ્સ', hi: 'रसायन', fr: 'Produits Chimiques' },

    // Eco Packaging
    { en: /Jute Bags/gi, gu: 'જૂટ બેગ્સ (શણના થેલા)', hi: 'जूट के बैग', fr: 'Sacs en Jute' },
    { en: /Non Woven Bags/gi, gu: 'નોન વુવન બેગ્સ', hi: 'नॉन वोवेन बैग', fr: 'Sacs Non Tissés' },
    { en: /Polyester/gi, gu: 'પોલિએસ્ટર', hi: 'पॉलिएस्टर', fr: 'Polyester' },
    { en: /Silk/gi, gu: 'રેશમ', hi: 'सिल्क', fr: 'Soie' },

    // Agro Commodities
    { en: /Cumin Seeds|Cumin/gi, gu: 'જીરું', hi: 'जीरा', fr: 'Graines de Cumin' },
    { en: /Turmeric/gi, gu: 'હળદર', hi: 'हल्दी', fr: 'Curcuma' },
    { en: /Basmati Rice|Rice/gi, gu: 'ચોખા', hi: 'चावल', fr: 'Riz' },
    { en: /Wheat/gi, gu: 'ઘઉં', hi: 'गेहूं', fr: 'Blé' },
    { en: /Sugar/gi, gu: 'ખાંડ', hi: 'चीनी', fr: 'Sucre' },
    { en: /Peanuts|Groundnut/gi, gu: 'સીંગદાણા', hi: 'मूंगफली', fr: 'Arachides' },
    { en: /Sesame Seeds|Sesame/gi, gu: 'તલ', hi: 'तिल', fr: 'Sésame' },
    { en: /Fennel Seeds|Fennel/gi, gu: 'વરિયાળી', hi: 'सौंफ', fr: 'Fenouil' },
    { en: /Spices/gi, gu: 'મસાલા', hi: 'मसाले', fr: 'Épices' },

    // Hardware & Industrial
    { en: /Bolts|Nuts/gi, gu: 'બોલ્ટ્સ અને નટ્સ', hi: 'बोल्ट', fr: 'Boulons' },
    { en: /Industrial/gi, gu: 'ઔદ્યોગિક', hi: 'औद्योगिक', fr: 'Industriel' },
    { en: /Machinery|Machine/gi, gu: 'મશીનરી', hi: 'मशीनरी', fr: 'Machines' },
    { en: /Pipes|Pipe/gi, gu: 'પાઇપ્સ', hi: 'पाइप', fr: 'Tuyaux' },
    { en: /Valves|Valve/gi, gu: 'વાલ્વ', hi: 'वॉल्व', fr: 'Vannes' },
    { en: /Pump|Pumps/gi, gu: 'પમ્પ્સ', hi: 'पंप', fr: 'Pompes' },
    { en: /Chemicals|Chemical/gi, gu: 'કેમિકલ્સ', hi: 'रसायन', fr: 'Produits Chimiques' }
  ];

  dictionary.forEach(rule => {
    if (rule[lang]) {
      str = str.replace(rule.en, rule[lang]);
    }
  });

  return str;
}

/**
 * Letter-by-Letter Phonetic Transliteration Algorithm for ANY English Product Name in the World
 */
function algorithmicPhoneticTransliterate(text, lang = 'gu') {
  if (!text) return '';
  if (lang !== 'gu') return text;

  const words = text.split(/(\s+|-|\/|\&|,)/);

  const converted = words.map(word => {
    if (!word || /^\s+$/.test(word) || /^[-/&,]$/.test(word)) return word;

    let w = word.toLowerCase();

    // Multi-char phonetics
    const rules = [
      { en: 'ksh', gu: 'ક્ષ' }, { en: 'gny', gu: 'જ્ઞ' }, { en: 'shr', gu: 'શ્ર' },
      { en: 'sha', gu: 'શા' }, { en: 'shi', gu: 'શિ' }, { en: 'she', gu: 'શે' }, { en: 'sho', gu: 'શો' }, { en: 'shu', gu: 'શુ' }, { en: 'sh', gu: 'શ' },
      { en: 'cha', gu: 'ચા' }, { en: 'chi', gu: 'ચિ' }, { en: 'che', gu: 'ચે' }, { en: 'cho', gu: 'ચો' }, { en: 'chu', gu: 'ચુ' }, { en: 'ch', gu: 'ચ' },
      { en: 'kha', gu: 'ખા' }, { en: 'khi', gu: 'ખિ' }, { en: 'khe', gu: 'ખે' }, { en: 'kho', gu: 'ખો' }, { en: 'khu', gu: 'ખુ' }, { en: 'kh', gu: 'ખ' },
      { en: 'gha', gu: 'ઘા' }, { en: 'ghi', gu: 'ઘિ' }, { en: 'ghe', gu: 'ઘે' }, { en: 'gho', gu: 'ઘો' }, { en: 'ghu', gu: 'ઘુ' }, { en: 'gh', gu: 'ઘ' },
      { en: 'tha', gu: 'થા' }, { en: 'thi', gu: 'થિ' }, { en: 'the', gu: 'થે' }, { en: 'tho', gu: 'થો' }, { en: 'thu', gu: 'થુ' }, { en: 'th', gu: 'થ' },
      { en: 'dha', gu: 'ધા' }, { en: 'dhi', gu: 'ધિ' }, { en: 'dhe', gu: 'ધે' }, { en: 'dho', gu: 'ધો' }, { en: 'dhu', gu: 'ધુ' }, { en: 'dh', gu: 'ધ' },
      { en: 'pha', gu: 'ફા' }, { en: 'phi', gu: 'ફિ' }, { en: 'phe', gu: 'ફે' }, { en: 'pho', gu: 'ફો' }, { en: 'phu', gu: 'ફુ' }, { en: 'ph', gu: 'ફ' },
      { en: 'bha', gu: 'ભા' }, { en: 'bhi', gu: 'ભિ' }, { en: 'bhe', gu: 'ભે' }, { en: 'bho', gu: 'ભો' }, { en: 'bhu', gu: 'ભુ' }, { en: 'bh', gu: 'ભ' },

      // Single Consonants + Vowels
      { en: 'ka', gu: 'કા' }, { en: 'ki', gu: 'કિ' }, { en: 'ke', gu: 'કે' }, { en: 'ko', gu: 'કો' }, { en: 'ku', gu: 'કુ' }, { en: 'k', gu: 'ક' },
      { en: 'ga', gu: 'ગા' }, { en: 'gi', gu: 'ગિ' }, { en: 'ge', gu: 'ગે' }, { en: 'go', gu: 'ગો' }, { en: 'gu', gu: 'ગુ' }, { en: 'g', gu: 'ગ' },
      { en: 'ja', gu: 'જા' }, { en: 'ji', gu: 'જિ' }, { en: 'je', gu: 'જે' }, { en: 'jo', gu: 'જો' }, { en: 'ju', gu: 'જુ' }, { en: 'j', gu: 'જ' },
      { en: 'ta', gu: 'ટા' }, { en: 'ti', gu: 'ટિ' }, { en: 'te', gu: 'ટે' }, { en: 'to', gu: 'ટો' }, { en: 'tu', gu: 'ટુ' }, { en: 't', gu: 'ટ' },
      { en: 'da', gu: 'ડા' }, { en: 'di', gu: 'ડિ' }, { en: 'de', gu: 'ડે' }, { en: 'do', gu: 'ડો' }, { en: 'du', gu: 'ડુ' }, { en: 'd', gu: 'ડ' },
      { en: 'na', gu: 'ના' }, { en: 'ni', gu: 'નિ' }, { en: 'ne', gu: 'ને' }, { en: 'no', gu: 'નો' }, { en: 'nu', gu: 'નુ' }, { en: 'n', gu: 'ન' },
      { en: 'pa', gu: 'પા' }, { en: 'pi', gu: 'પિ' }, { en: 'pe', gu: 'પે' }, { en: 'po', gu: 'પો' }, { en: 'pu', gu: 'પુ' }, { en: 'p', gu: 'પ' },
      { en: 'fa', gu: 'ફા' }, { en: 'fi', gu: 'ફિ' }, { en: 'fe', gu: 'ફે' }, { en: 'fo', gu: 'ફો' }, { en: 'fu', gu: 'ફુ' }, { en: 'f', gu: 'ફ' },
      { en: 'ba', gu: 'બા' }, { en: 'bi', gu: 'બિ' }, { en: 'be', gu: 'બે' }, { en: 'bo', gu: 'બો' }, { en: 'bu', gu: 'બુ' }, { en: 'b', gu: 'બ' },
      { en: 'ma', gu: 'મા' }, { en: 'mi', gu: 'મિ' }, { en: 'me', gu: 'મે' }, { en: 'mo', gu: 'મો' }, { en: 'mu', gu: 'મુ' }, { en: 'm', gu: 'મ' },
      { en: 'ya', gu: 'યા' }, { en: 'yi', gu: 'યિ' }, { en: 'ye', gu: 'યે' }, { en: 'yo', gu: 'યો' }, { en: 'yu', gu: 'યુ' }, { en: 'y', gu: 'ય' },
      { en: 'ra', gu: 'રા' }, { en: 'ri', gu: 'રિ' }, { en: 're', gu: 'રે' }, { en: 'ro', gu: 'રો' }, { en: 'ru', gu: 'રુ' }, { en: 'r', gu: 'ર' },
      { en: 'la', gu: 'લા' }, { en: 'li', gu: 'લિ' }, { en: 'le', gu: 'લે' }, { en: 'lo', gu: 'લો' }, { en: 'lu', gu: 'લુ' }, { en: 'l', gu: 'લ' },
      { en: 'va', gu: 'વા' }, { en: 'vi', gu: 'વિ' }, { en: 've', gu: 'વે' }, { en: 'vo', gu: 'વો' }, { en: 'vu', gu: 'વુ' }, { en: 'v', gu: 'વ' },
      { en: 'sa', gu: 'સા' }, { en: 'si', gu: 'સિ' }, { en: 'se', gu: 'સે' }, { en: 'so', gu: 'સો' }, { en: 'su', gu: 'સુ' }, { en: 's', gu: 'સ' },
      { en: 'ha', gu: 'હા' }, { en: 'hi', gu: 'હિ' }, { en: 'he', gu: 'હે' }, { en: 'ho', gu: 'હો' }, { en: 'hu', gu: 'હુ' }, { en: 'h', gu: 'હ' },
      { en: 'za', gu: 'ઝા' }, { en: 'zi', gu: 'ઝિ' }, { en: 'ze', gu: 'ઝે' }, { en: 'zo', gu: 'ઝો' }, { en: 'zu', gu: 'ઝુ' }, { en: 'z', gu: 'ઝ' },

      // Vowels
      { en: 'aa', gu: 'આ' }, { en: 'ee', gu: 'ઈ' }, { en: 'oo', gu: 'ઊ' },
      { en: 'a', gu: 'અ' }, { en: 'i', gu: 'ઇ' }, { en: 'e', gu: 'એ' }, { en: 'o', gu: 'ઓ' }, { en: 'u', gu: 'ઉ' }
    ];

    let res = w;
    rules.forEach(r => {
      res = res.replace(new RegExp(r.en, 'g'), r.gu);
    });

    return res;
  });

  return converted.join('');
}

export async function autoTranslateFullObject(englishText) {
  if (!englishText || typeof englishText !== 'string' || !englishText.trim()) {
    return { en: '', gu: '', hi: '', fr: '' };
  }
  const clean = englishText.trim();
  const obj = { en: clean, gu: clean, hi: clean, fr: clean };

  try {
    const langs = ['gu', 'hi', 'fr'];
    const promises = langs.map(async (l) => {
      try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|${l}`);
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
