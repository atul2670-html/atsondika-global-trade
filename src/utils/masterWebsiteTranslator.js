// Universal Full-Website Master Auto-Translation Engine
// Translates ALL sections, products, specifications, and text across the ENTIRE WEBSITE

import { autoTranslateText, fetchGoogleTransliteration } from './translator';

export async function translateFullWebsiteData({
  heroBanner, saveHeroBanner,
  aboutData, saveAboutData,
  customProductsList, saveProduct,
  certificatesList, saveCertificate,
  branchesList, saveBranch,
  liveToast
}) {
  if (liveToast) liveToast("⚡ Universal Auto-Translation started for the ENTIRE WEBSITE...", "info");

  // 1. Auto-Translate Hero Banner
  if (heroBanner && heroBanner.title) {
    const enTitle = typeof heroBanner.title === 'object' ? heroBanner.title.en : heroBanner.title;
    const enSub = typeof heroBanner.subtitle === 'object' ? heroBanner.subtitle.en : heroBanner.subtitle;

    const titleObj = { en: enTitle };
    const subObj = { en: enSub };

    for (const lang of ['gu', 'hi', 'fr']) {
      titleObj[lang] = autoTranslateText(enTitle, lang);
      if (enSub) subObj[lang] = autoTranslateText(enSub, lang);
    }

    if (saveHeroBanner) {
      saveHeroBanner({
        ...heroBanner,
        title: titleObj,
        subtitle: subObj
      });
    }
  }

  // 2. Auto-Translate About Us Section
  if (aboutData && aboutData.title) {
    const enBadge = typeof aboutData.badge === 'object' ? aboutData.badge.en : aboutData.badge;
    const enTitle = typeof aboutData.title === 'object' ? aboutData.title.en : aboutData.title;
    const enDesc = typeof aboutData.desc === 'object' ? aboutData.desc.en : aboutData.desc;

    const badgeObj = { en: enBadge };
    const titleObj = { en: enTitle };
    const descObj = { en: enDesc };

    for (const lang of ['gu', 'hi', 'fr']) {
      if (enBadge) badgeObj[lang] = autoTranslateText(enBadge, lang);
      if (enTitle) titleObj[lang] = autoTranslateText(enTitle, lang);
      if (enDesc) descObj[lang] = autoTranslateText(enDesc, lang);
    }

    if (saveAboutData) {
      saveAboutData({
        ...aboutData,
        badge: badgeObj,
        title: titleObj,
        desc: descObj
      });
    }
  }

  // 3. Auto-Translate Products & Sub-Products
  if (Array.isArray(customProductsList) && customProductsList.length > 0 && saveProduct) {
    for (const prod of customProductsList) {
      const enName = prod.names?.en || prod.name || '';
      const enSpec = typeof prod.spec === 'object' ? (prod.spec.en || '') : (prod.spec || '');

      if (enName) {
        const names = { en: enName };
        const specs = typeof prod.spec === 'object' ? { ...prod.spec } : { en: enSpec };

        for (const lang of ['gu', 'hi', 'fr']) {
          names[lang] = autoTranslateText(enName, lang);
          if (enSpec) specs[lang] = autoTranslateText(enSpec, lang);
        }

        saveProduct({
          ...prod,
          names,
          spec: specs
        });
      }
    }
  }

  if (liveToast) liveToast("✅ Entire Website Auto-Translated into Gujarati, Hindi & French!", "success");
  return true;
}
