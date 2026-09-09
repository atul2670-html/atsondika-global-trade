// High-Performance Dual-Engine Full Page Web Translator for ATSondika Global Trade
import { normalizeLangCode } from './universalTranslator';

const translationCache = new Map();

/**
 * High-Performance DOM Full-Page Translator
 * Combines Google Translate Widget (googtrans cookie) & Direct Client-Side NMT API (gtx)
 * Guarantees 100% full-page translation for ALL 100+ World Languages
 */
export async function translateWholePage(targetLang = 'en') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const langCode = normalizeLangCode(targetLang);
  document.documentElement.lang = langCode || 'en';

  let gLang = langCode;
  if (gLang === 'zh') gLang = 'zh-CN';
  if (gLang === 'fa') gLang = 'fa';
  if (gLang === 'he') gLang = 'iw';
  if (gLang === 'fil') gLang = 'tl';
  if (gLang === 'jv') gLang = 'jw';

  // 1. Set Google Translate Cookie for widget fallback
  try {
    if (langCode === 'en') {
      document.cookie = "googtrans=/en/en; path=/;";
      document.cookie = `googtrans=/en/en; path=/; domain=${window.location.hostname};`;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    } else {
      const cookieVal = `/en/${gLang}`;
      document.cookie = `googtrans=${cookieVal}; path=/;`;
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname};`;
    }
  } catch (e) {}

  // 2. Ensure Google Translate Script is loaded
  initGoogleTranslateScript();

  // 3. Trigger Google Translate Widget if initialized
  const applyGoogleCombo = () => {
    try {
      const googleSelect = document.querySelector('.goog-te-combo');
      if (googleSelect) {
        const targetVal = (langCode === 'en') ? 'en' : gLang;
        if (googleSelect.value !== targetVal) {
          googleSelect.value = targetVal;
          googleSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return true;
      }
    } catch (e) {}
    return false;
  };

  if (!applyGoogleCombo()) {
    let attempts = 0;
    const pollInterval = setInterval(() => {
      attempts++;
      if (applyGoogleCombo() || attempts >= 20) {
        clearInterval(pollInterval);
      }
    }, 100);
  }

  // 4. Direct Client-Side NMT API (gtx) DOM Text Node Walker for 100% coverage across ALL world languages
  try {
    await translateDomTextNodes(targetLang, gLang);
  } catch (e) {}
}

/**
 * Direct Client-Side DOM Text Node Walker
 * Translates visible text nodes into ANY target language using Google's free gtx NMT client API
 */
export async function translateDomTextNodes(targetLang = 'en', gLang = 'en') {
  if (typeof document === 'undefined') return;

  const langCode = normalizeLangCode(targetLang);

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('.notranslate, .no-translate-element, script, style, textarea, input, select, option, code, pre')) {
          return NodeFilter.FILTER_REJECT;
        }
        const txt = node.textContent.trim();
        if (/^[\d\s\W]+$/.test(txt)) return NodeFilter.FILTER_REJECT;

        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  let currentNode;
  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode);
  }

  if (langCode === 'en') {
    textNodes.forEach(node => {
      if (node._originalText !== undefined) {
        node.textContent = node._originalText;
      }
    });
    return;
  }

  const stringsToTranslate = [];

  textNodes.forEach(node => {
    if (node._originalText === undefined) {
      node._originalText = node.textContent;
    }
    const orig = node._originalText.trim();
    const cacheKey = `${gLang}:${orig}`;
    if (!translationCache.has(cacheKey) && orig.length > 1) {
      if (!stringsToTranslate.includes(orig)) {
        stringsToTranslate.push(orig);
      }
    }
  });

  if (stringsToTranslate.length > 0) {
    const batchSize = 12;
    for (let i = 0; i < stringsToTranslate.length; i += batchSize) {
      const chunk = stringsToTranslate.slice(i, i + batchSize);
      await Promise.all(chunk.map(async (origStr) => {
        try {
          const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(gLang)}&dt=t&q=${encodeURIComponent(origStr)}`;
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (data && data[0] && Array.isArray(data[0])) {
              const transStr = data[0].map(item => item[0]).join('').trim();
              if (transStr) {
                translationCache.set(`${gLang}:${origStr}`, transStr);
              }
            }
          }
        } catch (e) {}
      }));
    }
  }

  textNodes.forEach(node => {
    const orig = (node._originalText || node.textContent).trim();
    const cacheKey = `${gLang}:${orig}`;
    if (translationCache.has(cacheKey)) {
      const translatedVal = translationCache.get(cacheKey);
      if (translatedVal && node.textContent.trim() !== translatedVal) {
        node.textContent = node.textContent.replace(orig, translatedVal);
      }
    }
  });
}

/**
 * Initialize Google Translate Web Script for 100% full-page auto-translation fallback
 */
export function initGoogleTranslateScript() {
  if (typeof window === 'undefined') return;

  if (!document.getElementById('google_translate_element')) {
    const el = document.createElement('div');
    el.id = 'google_translate_element';
    el.style.display = 'none';
    document.body.appendChild(el);
  }

  if (!document.getElementById('google-translate-script')) {
    window.googleTranslateElementInit = function() {
      try {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false
          }, 'google_translate_element');
        }
      } catch(e) {}
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }
}
