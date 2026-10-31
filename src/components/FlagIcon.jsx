import React, { useState } from 'react';

/**
 * Universal Cross-Platform Country Flag Component
 * Works 100% reliably on Windows, macOS, Linux, iOS & Android.
 * Solves the Windows limitation where emoji flags render as plain text letters (e.g. "us", "in").
 *
 * Supports:
 * - ISO-3166-1 alpha-2 country codes: US, IN, AE, GB, DE, FR, JP, CA, SA, etc.
 * - Language codes: en (US), gu/hi (IN), fr (CA)
 * - Currency codes: USD (US), INR (IN), EUR (EU), AED (AE), GBP (GB), etc.
 */
export const FlagIcon = ({ code, width = 20, height = 14, style = {}, className = '', alt = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (!code) return null;

  const raw = String(code).trim().toLowerCase();

  // Normalize language, currency, or country aliases to 2-letter ISO country code
  const codeMap = {
    // Languages
    en: 'us',
    usa: 'us',
    gu: 'in',
    hi: 'in',
    india: 'in',
    fr: 'ca', // Canadian French in website
    canada: 'ca',
    uk: 'gb',
    // Currencies
    usd: 'us',
    inr: 'in',
    eur: 'eu',
    aed: 'ae',
    gbp: 'gb',
    sar: 'sa',
    cad: 'ca',
    aud: 'au',
    jpy: 'jp',
    sgd: 'sg',
    chf: 'ch',
    qar: 'qa',
    kwd: 'kw',
    bhd: 'bh',
    omr: 'om',
    nzd: 'nz',
    zar: 'za',
    cny: 'cn',
    myr: 'my',
    thb: 'th',
    rub: 'ru',
    brl: 'br',
    vnd: 'vn',
    krw: 'kr',
    sek: 'se',
    nok: 'no',
    dkk: 'dk',
    pln: 'pl',
    try: 'tr',
    idr: 'id',
    egp: 'eg',
    ils: 'il',
    mxn: 'mx',
    php: 'ph',
    bdt: 'bd',
    lkr: 'lk',
    npr: 'np',
    pkr: 'pk'
  };

  const iso = (codeMap[raw] || raw).slice(0, 2).toLowerCase();

  const combinedStyle = {
    borderRadius: '3px',
    verticalAlign: 'middle',
    flexShrink: 0,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.45)',
    display: 'inline-block',
    objectFit: 'cover',
    aspectRatio: '4 / 3',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    ...style
  };

  // Offline / Error Fallback: Sleek High-Contrast Country Code Badge
  if (hasError) {
    return (
      <span
        className={`flag-fallback ${className}`}
        style={{
          ...combinedStyle,
          width: `${width}px`,
          height: `${height}px`,
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          color: '#38bdf8',
          fontSize: `${Math.max(9, Math.floor(height * 0.62))}px`,
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
        title={iso.toUpperCase()}
      >
        {iso.toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
      width={width}
      height={height}
      alt={alt || iso.toUpperCase()}
      title={iso.toUpperCase()}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`country-flag-img ${className}`}
      style={combinedStyle}
    />
  );
};

export default FlagIcon;
