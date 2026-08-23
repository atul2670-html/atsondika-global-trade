import React from 'react';

/**
 * 100% Cross-Platform Vector SVG Country Flags for Windows, macOS, Linux, iOS & Android
 * - en: USA Flag 🇺🇸 (US English Base)
 * - fr: Canada Flag 🇨🇦 (Canadian French Base)
 * - gu / hi: India Flag 🇮🇳 (Indian Base)
 * - gb / uk: United Kingdom Flag 🇬🇧
 */
export const FlagIcon = ({ code, width = 20, height = 14, style = {} }) => {
  const normalizedCode = (code || '').toLowerCase();

  const combinedStyle = {
    borderRadius: '2px',
    verticalAlign: 'middle',
    flexShrink: 0,
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    display: 'inline-block',
    marginRight: '6px',
    ...style
  };

  // US ENGLISH BASE (USA FLAG 🇺🇸)
  if (normalizedCode === 'en' || normalizedCode === 'us' || normalizedCode === 'usa') {
    return (
      <svg width={width} height={height} viewBox="0 0 741 390" style={combinedStyle}>
        <rect width="741" height="390" fill="#B22234"/>
        <path d="M0,30h741M0,90h741M0,150h741M0,210h741M0,270h741M0,330h741" stroke="#fff" strokeWidth="30"/>
        <rect width="296.4" height="210" fill="#3C3B6E"/>
        <g fill="#fff">
          {[...Array(9)].map((_, r) => {
            const isShort = r % 2 === 1;
            const count = isShort ? 5 : 6;
            const y = 21 + r * 21;
            return [...Array(count)].map((_, c) => {
              const x = (isShort ? 49.4 : 24.7) + c * 49.4;
              return (
                <polygon
                  key={`${r}_${c}`}
                  points={`${x},${y-6} ${x+1.8},${y-1.8} ${x+6},${y-1.8} ${x+2.6},${y+1} ${x+4.2},${y+5.2} ${x},${y+2.6} ${x-4.2},${y+5.2} ${x-2.6},${y+1} ${x-6},${y-1.8} ${x-1.8},${y-1.8}`}
                />
              );
            });
          })}
        </g>
      </svg>
    );
  }

  // CANADIAN FRENCH BASE (CANADA FLAG 🇨🇦)
  if (normalizedCode === 'fr' || normalizedCode === 'ca' || normalizedCode === 'canada') {
    return (
      <svg width={width} height={height} viewBox="0 0 1000 500" style={combinedStyle}>
        <rect width="1000" height="500" fill="#D80621"/>
        <rect x="250" width="500" height="500" fill="#FFFFFF"/>
        <path d="M500,60 L524,145 L578,115 L558,180 L620,195 L558,240 L572,325 L518,300 L508,410 L492,410 L482,300 L428,325 L442,240 L380,195 L442,180 L422,115 L476,145 Z" fill="#D80621"/>
      </svg>
    );
  }

  // INDIAN BASE (INDIA TIRANGA FLAG 🇮🇳)
  if (normalizedCode === 'gu' || normalizedCode === 'hi' || normalizedCode === 'in') {
    return (
      <svg width={width} height={height} viewBox="0 0 225 150" style={combinedStyle}>
        <rect width="225" height="50" fill="#FF9933"/>
        <rect y="50" width="225" height="50" fill="#FFFFFF"/>
        <rect y="100" width="225" height="50" fill="#138808"/>
        <circle cx="112.5" cy="75" r="20" fill="none" stroke="#000080" strokeWidth="3"/>
        <g stroke="#000080" strokeWidth="1.5">
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
            <line
              key={deg}
              x1="112.5"
              y1="75"
              x2={112.5 + 20 * Math.cos((deg * Math.PI) / 180)}
              y2={75 + 20 * Math.sin((deg * Math.PI) / 180)}
            />
          ))}
        </g>
      </svg>
    );
  }

  // UNITED KINGDOM FLAG 🇬🇧
  if (normalizedCode === 'gb' || normalizedCode === 'uk') {
    return (
      <svg width={width} height={height} viewBox="0 0 60 30" style={combinedStyle}>
        <clipPath id="flag_uk_clip"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
        <clipPath id="flag_uk_diag"><path d="M30,15 h30 v15 z M30,15 h-30 v-15 z M30,15 h-30 v15 z M30,15 h30 v-15 z"/></clipPath>
        <g clipPath="url(#flag_uk_clip)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#flag_uk_diag)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    );
  }

  return null;
};

export default FlagIcon;
