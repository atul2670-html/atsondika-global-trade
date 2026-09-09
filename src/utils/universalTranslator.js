// Enterprise Universal Translation Matrix Engine for 100+ World Languages
const STORAGE_CACHE_KEY = 'atsondika_trade_translations_v1';
const translationMemory = new Map();

try {
  const cached = localStorage.getItem(STORAGE_CACHE_KEY);
  if (cached) {
    const obj = JSON.parse(cached);
    Object.keys(obj).forEach(k => translationMemory.set(k, obj[k]));
  }
} catch (e) {}

function persistCache() {
  try {
    const obj = {};
    translationMemory.forEach((v, k) => {
      obj[k] = v;
    });
    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(obj));
  } catch (e) {}
}

export function normalizeLangCode(code) {
  if (!code) return 'en';
  const c = code.toLowerCase().trim();

  const map = {
    'zh': 'zh-CN',
    'zh-cn': 'zh-CN',
    'zh-tw': 'zh-TW',
    'ir': 'fa',
    'fa': 'fa',
    'pk': 'ur',
    'ur': 'ur',
    'th': 'th',
    'he': 'iw',
    'iw': 'iw',
    'jv': 'jw',
    'fil': 'tl'
  };

  return map[c] || c.split('-')[0];
}

export function getUniversalTranslation(text, targetLang = 'en') {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  const normLang = normalizeLangCode(targetLang);
  if (normLang === 'en') return trimmed;

  const cacheKey = `${normLang}:${trimmed}`;
  if (translationMemory.has(cacheKey)) {
    return translationMemory.get(cacheKey);
  }
  return trimmed;
}

export async function fetchNeuralTranslation(text, targetLang = 'en') {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  const normLang = normalizeLangCode(targetLang);
  if (normLang === 'en') return trimmed;

  const cacheKey = `${normLang}:${trimmed}`;
  if (translationMemory.has(cacheKey)) {
    return translationMemory.get(cacheKey);
  }

  try {
    const pairCode = `en|${normLang}`;
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${pairCode}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        let tText = data.responseData.translatedText.trim();
        if (typeof document !== 'undefined') {
          const txtEl = document.createElement('textarea');
          txtEl.innerHTML = tText;
          tText = txtEl.value;
        }
        if (tText && tText.toLowerCase() !== trimmed.toLowerCase() && !tText.includes('MYMEMORY WARNING')) {
          translationMemory.set(cacheKey, tText);
          persistCache();
          return tText;
        }
      }
    }
  } catch (e) {}

  return trimmed;
}
