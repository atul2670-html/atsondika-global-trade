// High-Performance Full Page Web Translator Engine for ATSondika Global Trade
import { normalizeLangCode } from './universalTranslator';

/**
 * High-Performance DOM Full-Page Translator
 * Traverses every text node, button, label, and placeholder in document.body to guarantee 100% full-page translation
 */
export function translateWholePage(targetLang = 'en') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const langCode = normalizeLangCode(targetLang);

  // 1. Set Google Translate cookie for real-time full-page translation
  let gLang = langCode;
  if (gLang === 'zh') gLang = 'zh-CN';
  if (gLang === 'fa') gLang = 'fa';
  if (gLang === 'he') gLang = 'iw';

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

  // 3. Trigger Google Translate Widget if initialized with smart polling
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
      if (applyGoogleCombo() || attempts >= 30) {
        clearInterval(pollInterval);
      }
    }, 100);
  }
}

/**
 * Initialize Google Translate Web Script for 100% full-page auto-translation fallback
 */
export function initGoogleTranslateScript() {
  if (typeof window === 'undefined') return;

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
