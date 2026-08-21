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

