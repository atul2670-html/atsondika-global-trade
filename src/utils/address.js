/**
 * Converts Gujarati / Hindi numerals and location terms to US English format.
 */
export function toUSEnglishAddress(str) {
  if (!str) return '';

  const guDigits = ['૦','૧','૨','૩','૪','૫','૬','૭','૮','૯'];
  guDigits.forEach((d, i) => {
    str = str.replace(new RegExp(d, 'g'), i.toString());
  });

  const dict = [
    { gu: /અતુલભાઈ ઈશ્વરભાઈ પટેલ/gi, en: 'Atulbhai Ishwarbhai Patel' },
    { gu: /અતુલભાઈ પટેલ/gi, en: 'Atulbhai Patel' },
    { gu: /રાજેશભાઈ શાહ/gi, en: 'Rajeshbhai Shah' },
    { gu: /વિક્રમ મેહતા/gi, en: 'Vikram Mehta' },
    { gu: /સુરત-નવસારી મેઈન રોડ/gi, en: 'Surat-Navsari Main Road' },
    { gu: /મેઈન રોડ/gi, en: 'Main Road' },
    { gu: /ભેસ્તાન નહેર બીઆરટીએસ બસ સ્ટેન્ડ પાસે/gi, en: 'Near Bhestan Canal BRTS Bus Stand' },
    { gu: /ભેસ્તાન નહેર/gi, en: 'Bhestan Canal' },
    { gu: /ભેસ્તાન ચાર રસ્તા/gi, en: 'Bhestan Char Rasta' },
    { gu: /ચાર રસ્તા/gi, en: 'Char Rasta' },
    { gu: /ભેસ્તાન/gi, en: 'Bhestan' },
    { gu: /સફારી કોમ્પલેક્ષ/gi, en: 'Safari Complex' },
    { gu: /સફારી કોમ્પ્લેક્ષ/gi, en: 'Safari Complex' },
    { gu: /સાઈ સ્કવેર કોમ્પ્લેક્ષ/gi, en: 'Sai Square Complex' },
    { gu: /સાઈ સ્કવેર/gi, en: 'Sai Square' },
    { gu: /સાઇ સ્કવેર/gi, en: 'Sai Square' },
    { gu: /કોમ્પલેક્ષ/gi, en: 'Complex' },
    { gu: /કોમ્પ્લેક્ષ/gi, en: 'Complex' },
    { gu: /કોમ્પ્લેક્સ/gi, en: 'Complex' },
    { gu: /ટ્રેડ સેન્ટર/gi, en: 'Trade Center' },
    { gu: /આશ્રમ રોડ/gi, en: 'Ashram Road' },
    { gu: /નવી ઇન્ડસ્ટ્રીયલ એસ્ટેટ/gi, en: 'New Industrial Estate' },
    { gu: /ઇન્ડસ્ટ્રીયલ એસ્ટેટ/gi, en: 'Industrial Estate' },
    { gu: /એક્સપોર્ટ ટાવર/gi, en: 'Export Tower' },
    { gu: /નાવા સેવા પોર્ટ એરિયા/gi, en: 'Nhava Sheva Port Area' },
    { gu: /પોર્ટ એરિયા/gi, en: 'Port Area' },
    { gu: /સુરત/gi, en: 'Surat' },
    { gu: /અમદાવાદ/gi, en: 'Ahmedabad' },
    { gu: /મુંબઈ/gi, en: 'Mumbai' },
    { gu: /ગુજરાત/gi, en: 'Gujarat' },
    { gu: /મહારાષ્ટ્ર/gi, en: 'Maharashtra' },
    { gu: /ભારત/gi, en: 'India' },
    { gu: /રોડ/gi, en: 'Road' },
    { gu: /સ્ટ્રીટ/gi, en: 'Street' },
    { gu: /માળ/gi, en: 'Floor' },
    { gu: /ફ્લોર/gi, en: 'Floor' },
    { gu: /બીજો/gi, en: '2nd' },
    { gu: /પહેલો/gi, en: '1st' },
    { gu: /ત્રીજો/gi, en: '3rd' }
  ];

  dict.forEach(item => {
    str = str.replace(item.gu, item.en);
  });

  return str.trim();
}

/**
 * Automatically converts any Google Drive link into a direct rendering high-res image URL.
 * e.g., https://drive.google.com/file/d/FILE_ID/view -> https://lh3.googleusercontent.com/d/FILE_ID
 */
export function convertGoogleDriveUrl(url) {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();
  const driveRegex = /drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^&]*&)*id=)([a-zA-Z0-9_-]+)/i;
  const match = trimmed.match(driveRegex);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return trimmed;
}

/**
 * Generates a high-res SVG Digital Round Rubber Stamp seal for any company name & registration number.
 */
export function generateDigitalRoundStampSvg(companyName = "Atsondika Global Trade", regNo = "REGISTERED EXPORTER") {
  const name = String(companyName || "EXPORT HOUSE").toUpperCase();
  const reg = String(regNo || "REGISTERED EXPORTER").toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <defs>
      <path id="circlePathOuter" d="M 100, 100 m -76, 0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" />
      <path id="circlePathInner" d="M 100, 100 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
    </defs>
    <!-- Outer Decorative Rings -->
    <circle cx="100" cy="100" r="95" fill="none" stroke="#1d4ed8" stroke-width="3" stroke-dasharray="6,3" />
    <circle cx="100" cy="100" r="90" fill="none" stroke="#1d4ed8" stroke-width="2.5" />
    <circle cx="100" cy="100" r="62" fill="none" stroke="#1d4ed8" stroke-width="1.8" />
    <circle cx="100" cy="100" r="58" fill="none" stroke="#1d4ed8" stroke-dasharray="3,2" stroke-width="1" />

    <!-- Circular Company Name Text -->
    <text fill="#1d4ed8" font-size="10.5" font-weight="900" font-family="Arial, sans-serif" letter-spacing="1.4">
      <textPath href="#circlePathOuter" startOffset="50%" text-anchor="middle">
        ★ ${name.length > 32 ? name.substring(0, 32) + '...' : name} ★
      </textPath>
    </text>

    <!-- Bottom Arc Location -->
    <text fill="#1d4ed8" font-size="8.5" font-weight="800" font-family="Arial, sans-serif" letter-spacing="1.2">
      <textPath href="#circlePathInner" startOffset="50%" text-anchor="middle">
        SURAT • GUJARAT • INDIA
      </textPath>
    </text>

    <!-- Center Emblem & Reg Details -->
    <polygon points="100,47 104,58 116,58 106,66 110,77 100,70 90,77 94,66 84,58 96,58" fill="#1d4ed8" opacity="0.9" />
    <text x="100" y="98" fill="#1d4ed8" font-size="9.5" font-weight="900" font-family="Arial, sans-serif" text-anchor="middle">
      OFFICIAL SEAL
    </text>
    <text x="100" y="112" fill="#1d4ed8" font-size="7.5" font-weight="800" font-family="Arial, sans-serif" text-anchor="middle">
      ${reg.length > 24 ? reg.substring(0, 24) : reg}
    </text>
    <text x="100" y="126" fill="#1d4ed8" font-size="7.5" font-weight="900" font-family="Arial, sans-serif" text-anchor="middle">
      ★ GOVT APPROVED ★
    </text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

