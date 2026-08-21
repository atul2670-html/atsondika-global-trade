// Real-Time Multi-Language Auto-Translation Engine
// Automatically translates English master content into Gujarati (gu), Hindi (hi), and French (fr)

export async function autoTranslateText(englishText, fromLang = 'en') {
  if (!englishText || typeof englishText !== 'string' || !englishText.trim()) {
    return { en: englishText, gu: '', hi: '', fr: '' };
  }

  const cleanText = englishText.trim();

  const targetLangs = [
    { code: 'gu', name: 'Gujarati' },
    { code: 'hi', name: 'Hindi' },
    { code: 'fr', name: 'French' }
  ];

  const results = { en: cleanText, gu: cleanText, hi: cleanText, fr: cleanText };

  // Run parallel fetch for gu, hi, fr
  const fetchPromises = targetLangs.map(async (lang) => {
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=${fromLang}|${lang.code}`
      );
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        let text = data.responseData.translatedText.trim();
        // Fix any HTML entity encoding returned by API
        const txtEl = document.createElement('textarea');
        txtEl.innerHTML = text;
        text = txtEl.value;
        if (text) {
          results[lang.code] = text;
        }
      }
    } catch (err) {
      console.warn(`Auto-translation fallback for ${lang.code}:`, err);
    }
  });

  await Promise.all(fetchPromises);
  return results;
}

// Single Language Quick Auto-Translator
export async function translateSingle(text, targetLang, fromLang = 'en') {
  if (!text || !text.trim()) return text;
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${fromLang}|${targetLang}`
    );
    const data = await res.json();
    if (data && data.responseData && data.responseData.translatedText) {
      let resultText = data.responseData.translatedText.trim();
      const txtEl = document.createElement('textarea');
      txtEl.innerHTML = resultText;
      return txtEl.value || text;
    }
  } catch (e) {}
  return text;
}
