import React from 'react';

/**
 * 100% Cross-Platform SVG Flag Icons for Windows, macOS, Linux, iOS & Android
 * Fixes missing emoji flag font rendering issues on Windows OS browsers.
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

  if (normalizedCode === 'en' || normalizedCode === 'gb' || normalizedCode === 'uk') {
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

  if (normalizedCode === 'fr') {
    return (
      <svg width={width} height={height} viewBox="0 0 3 2" style={combinedStyle}>
        <rect width="1" height="2" x="0" fill="#002395"/>
        <rect width="1" height="2" x="1" fill="#FFFFFF"/>
        <rect width="1" height="2" x="2" fill="#ED2939"/>
      </svg>
    );
  }

  return null;
};

export default FlagIcon;
