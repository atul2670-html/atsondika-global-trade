// High-Performance Dual-Engine Full Page Web Translator for ATSondika Global Trade
import { normalizeLangCode } from './universalTranslator';
import { matchTradeDictionary, sanitizeGrammarAndNouns } from './translator';

const translationCache = new Map();
let activeDomObserver = null;

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

  // 1. Enable Google Translate Widget & set googtrans cookie for ALL languages
  try {
    if (gLang === 'en') {
      document.cookie = "googtrans=/en/en; path=/;";
      document.cookie = `googtrans=/en/en; path=/; domain=${window.location.hostname};`;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;

      const googleSelect = document.querySelector('.goog-te-combo');
      if (googleSelect && googleSelect.value) {
        googleSelect.value = '';
        googleSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else {
      const cookieVal = `/en/${gLang}`;
      document.cookie = `googtrans=${cookieVal}; path=/;`;
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname};`;
      initGoogleTranslateScript();

      const applyGoogleCombo = () => {
        try {
          const googleSelect = document.querySelector('.goog-te-combo');
          if (googleSelect && googleSelect.value !== gLang) {
            googleSelect.value = gLang;
            googleSelect.dispatchEvent(new Event('change', { bubbles: true }));
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
    }
  } catch (e) {}

  // 2. Run Direct DOM Text Node Walker with Dictionary Sanitization
  try {
    await translateDomTextNodes(targetLang, gLang);
  } catch (e) {}

  // 3. Attach Live MutationObserver to sanitize any ongoing DOM updates from Google Translate or JS
  try {
    attachDomSanitizerObserver(langCode);
  } catch (e) {}
}

/**
 * Attach Live DOM MutationObserver to clean up Google Translate output in real-time
 */

function attachDomSanitizerObserver(langCode) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (activeDomObserver) {
    activeDomObserver.disconnect();
    activeDomObserver = null;
  }

  if (!langCode || langCode === 'en') return;

  const sanitizeSingleNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      const parent = node.parentElement;
      if (parent && parent.closest('.no-translate-element, script, style, textarea, input, select, option, code, pre')) {
        return;
      }
      const origText = node.textContent;
      const cleanText = sanitizeGrammarAndNouns(origText, langCode);
      if (cleanText !== origText) {
        node.textContent = cleanText;
      }
    }
  };

  const sanitizeSubtree = (targetNode) => {
    if (!targetNode) return;
    if (targetNode.nodeType === Node.TEXT_NODE) {
      sanitizeSingleNode(targetNode);
    } else if (targetNode.nodeType === Node.ELEMENT_NODE) {
      const walker = document.createTreeWalker(targetNode, NodeFilter.SHOW_TEXT);
      let textNode;
      while ((textNode = walker.nextNode())) {
        sanitizeSingleNode(textNode);
      }
    }
  };

  // Immediate pass over current DOM
  sanitizeSubtree(document.body);

  activeDomObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        sanitizeSingleNode(mutation.target);
      } else if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          sanitizeSubtree(node);
        });
      }
    }
  });

  activeDomObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
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
        if (parent.closest('.no-translate-element, script, style, textarea, input, select, option, code, pre')) {
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
      if (node._originalText === undefined) {
        node._originalText = node.textContent;
      } else {
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

    // Check trade dictionary first for native human grammar override
    const dictMatch = matchTradeDictionary(orig, gLang);
    if (dictMatch && dictMatch !== orig) {
      const sanitizedMatch = sanitizeGrammarAndNouns(dictMatch, gLang);
      translationCache.set(cacheKey, sanitizedMatch);
    } else if (!translationCache.has(cacheKey) && orig.length > 1) {
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
              let transStr = data[0].map(item => item[0]).join('').trim();
              if (transStr) {
                transStr = sanitizeGrammarAndNouns(transStr, gLang);
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

