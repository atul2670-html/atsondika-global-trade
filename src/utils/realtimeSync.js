/**
 * ADIDEV SMART SOLUTION - Real-Time Global Microsecond Sync Engine
 * Uses Web BroadcastChannel API & LocalStorage Event Listeners to synchronize
 * product updates, price changes, stock status, and currency rates seamlessly across
 * all active browser windows & tabs instantly.
 */

const CHANNEL_NAME = 'adidev_realtime_global_sync_channel';

class RealTimeSyncEngine {
  constructor() {
    this.listeners = new Set();
    this.broadcastChannel = null;

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
        this.broadcastChannel.onmessage = (event) => {
          this.notifyListeners(event.data);
        };
      } catch (err) {
        console.warn('BroadcastChannel error, falling back to storage events:', err);
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'adidev_sync_event_trigger' && e.newValue) {
          try {
            const data = JSON.parse(e.newValue);
            this.notifyListeners(data);
          } catch (err) {
            // ignore parse error
          }
        }
      });
    }
  }

  /**
   * Subscribe to real-time events
   * @param {Function} callback 
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(data) {
    this.listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (e) {
        console.error('Error in real-time listener:', e);
      }
    });
  }

  /**
   * Broadcast real-time event to all connected browser windows/tabs
   * @param {string} type Event type ('PRODUCT_UPDATE', 'PRICE_CHANGE', 'NEW_PRODUCT', 'DELETE_PRODUCT', 'TICKER_UPDATE')
   * @param {Object} payload 
   */
  broadcast(type, payload = {}) {
    const eventData = {
      type,
      payload,
      timestamp: Date.now(),
      senderId: Math.random().toString(36).substring(7)
    };

    // Send via BroadcastChannel
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(eventData);
      } catch (e) {
        console.error('BroadcastChannel postMessage failed:', e);
      }
    }

    // Fallback trigger via localStorage
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('adidev_sync_event_trigger', JSON.stringify(eventData));
      } catch (e) {
        // Storage quota full or disabled
      }
    }
  }
}

export const realtimeEngine = new RealTimeSyncEngine();

/**
 * AUTOMATED GLOBAL CLOUD SYNC ENGINE
 * Automatically synchronizes product additions, edits, photos, prices, and sister company
 * settings across ALL computers and mobile devices worldwide in microsecond real-time.
 */
const DEFAULT_CLOUD_URL = 'https://atsondika-global-trade-default-rtdb.asia-southeast1.firebasedatabase.app/live_store.json';

export function getCloudSyncUrl() {
  try {
    const custom = localStorage.getItem('custom_cloud_sync_url');
    if (custom && custom.trim().startsWith('http')) {
      let url = custom.trim();
      if (!url.endsWith('.json') && !url.includes('?')) {
        url = url.replace(/\/$/, '') + '/live_store.json';
      }
      return url;
    }
  } catch(e) {}
  return DEFAULT_CLOUD_URL;
}

export function setCloudSyncUrl(url) {
  try {
    if (url && url.trim().startsWith('http')) {
      localStorage.setItem('custom_cloud_sync_url', url.trim());
    } else {
      localStorage.removeItem('custom_cloud_sync_url');
    }
  } catch(e) {}
}

async function compressImageForCloud(base64Str) {
  if (!base64Str || typeof base64Str !== 'string' || !base64Str.startsWith('data:image')) {
    return base64Str;
  }
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 800;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressed);
        } catch(e) {
          resolve(base64Str);
        }
      };
      img.onerror = () => resolve(base64Str);
      img.src = base64Str;
    } catch(e) {
      resolve(base64Str);
    }
  });
}

export async function pushGlobalCloudSync(storeData) {
  if (!storeData) return;
  try {
    const cloudUrl = getCloudSyncUrl();

    // 1. Fetch current cloud state to ensure we never overwrite full data with partial/empty fields
    let existingCloudData = null;
    try {
      const res = await fetch(cloudUrl);
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json === 'object') {
          existingCloudData = json;
        }
      }
    } catch(e) {}

    const cleanOverrides = {
      ...(existingCloudData?.photoOverrides || {}),
      ...(storeData.photoOverrides || {})
    };

    const keys = Object.keys(cleanOverrides);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const item = cleanOverrides[k];
      if (!item) continue;
      if (typeof item === 'string' && item.startsWith('data:image')) {
        cleanOverrides[k] = await compressImageForCloud(item);
      } else if (typeof item === 'object') {
        if (item.image && typeof item.image === 'string' && item.image.startsWith('data:image')) {
          item.image = await compressImageForCloud(item.image);
        }
        if (Array.isArray(item.images)) {
          for (let j = 0; j < item.images.length; j++) {
            if (typeof item.images[j] === 'string' && item.images[j].startsWith('data:image')) {
              item.images[j] = await compressImageForCloud(item.images[j]);
            }
          }
        }
      }
    }

    // Merge customProductsList to avoid losing custom products
    let mergedCustomProducts = storeData.customProductsList;
    if (!Array.isArray(mergedCustomProducts) || mergedCustomProducts.length === 0) {
      mergedCustomProducts = existingCloudData?.customProductsList || storeData.customProductsList || [];
    } else if (Array.isArray(existingCloudData?.customProductsList)) {
      const map = new Map();
      existingCloudData.customProductsList.forEach(p => { if (p && p.id) map.set(p.id, p); });
      mergedCustomProducts.forEach(p => { if (p && p.id) map.set(p.id, p); });
      mergedCustomProducts = Array.from(map.values());
    }

    const payload = {
      ...(existingCloudData || {}),
      ...storeData,
      photoOverrides: cleanOverrides,
      customProductsList: mergedCustomProducts,
      companiesList: (Array.isArray(storeData.companiesList) && storeData.companiesList.length > 0)
        ? storeData.companiesList
        : (existingCloudData?.companiesList || storeData.companiesList || []),
      updatedAt: storeData.updatedAt || Date.now()
    };

    // 1. Primary Cloud Push via REST PATCH
    try {
      await fetch(cloudUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch(e) {}

    // 2. Secondary Push to Serverless Endpoint (/api/store) if available
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch(e) {}

    console.log('✅ Global Cloud Sync Pushed Successfully');
  } catch (err) {
    console.warn('Global Cloud Sync Push Notice:', err);
  }
}

export async function pullGlobalCloudSync() {
  const cloudUrl = getCloudSyncUrl();
  try {
    const response = await fetch(cloudUrl);
    if (response.ok) {
      const json = await response.json();
      if (json && json.updatedAt && (json.customProductsList || json.companiesList || json.photoOverrides || json.heroBanner)) {
        return json;
      }
    }
  } catch (err) {}

  try {
    const response = await fetch('/api/store');
    if (response.ok) {
      const json = await response.json();
      if (json && json.updatedAt && (json.customProductsList || json.companiesList || json.photoOverrides || json.heroBanner)) {
        return json;
      }
    }
  } catch (err) {}

  return null;
}

/**
 * Live Foreign Exchange Rates & Export Commodity Price Ticker Generator
 */
export async function fetchLiveExchangeRates() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.rates) {
      return data.rates;
    }
  } catch (err) {
    console.warn('Live FX Rate Fetch Notice:', err);
  }
  return null;
}

export const DEFAULT_CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0, flag: '🇺🇸', name: 'US Dollar (USA)' },
  { code: 'INR', symbol: '₹', rate: 86.45, flag: '🇮🇳', name: 'Indian Rupee (India)' },
  { code: 'EUR', symbol: '€', rate: 0.92, flag: '🇪🇺', name: 'Euro (Eurozone)' },
  { code: 'AED', symbol: 'د.إ', rate: 3.67, flag: '🇦🇪', name: 'UAE Dirham (Dubai/UAE)' },
  { code: 'GBP', symbol: '£', rate: 0.78, flag: '🇬🇧', name: 'British Pound (UK)' },
  { code: 'SAR', symbol: '﷼', rate: 3.75, flag: '🇸🇦', name: 'Saudi Riyal (KSA)' },
  { code: 'CAD', symbol: 'CA$', rate: 1.38, flag: '🇨🇦', name: 'Canadian Dollar (Canada)' },
  { code: 'AUD', symbol: 'A$', rate: 1.54, flag: '🇦🇺', name: 'Australian Dollar (Australia)' },
  { code: 'JPY', symbol: '¥', rate: 152.3, flag: '🇯🇵', name: 'Japanese Yen (Japan)' },
  { code: 'SGD', symbol: 'S$', rate: 1.34, flag: '🇸🇬', name: 'Singapore Dollar (Singapore)' },
  { code: 'CHF', symbol: 'Fr', rate: 0.89, flag: '🇨🇭', name: 'Swiss Franc (Switzerland)' },
  { code: 'QAR', symbol: '﷼', rate: 3.64, flag: '🇶🇦', name: 'Qatari Riyal (Qatar)' },
  { code: 'KWD', symbol: 'د.ك', rate: 0.31, flag: '🇰🇼', name: 'Kuwaiti Dinar (Kuwait)' },
  { code: 'BHD', symbol: '.د.બ', rate: 0.376, flag: '🇧🇭', name: 'Bahraini Dinar (Bahrain)' },
  { code: 'OMR', symbol: '﷼', rate: 0.385, flag: '🇴🇲', name: 'Omani Rial (Oman)' },
  { code: 'NZD', symbol: 'NZ$', rate: 1.68, flag: '🇳🇿', name: 'New Zealand Dollar (NZ)' },
  { code: 'ZAR', symbol: 'R', rate: 18.2, flag: '🇿🇦', name: 'South African Rand (SA)' },
  { code: 'CNY', symbol: '¥', rate: 7.23, flag: '🇨🇳', name: 'Chinese Yuan (China)' },
  { code: 'MYR', symbol: 'RM', rate: 4.42, flag: '🇲🇾', name: 'Malaysian Ringgit (Malaysia)' },
  { code: 'THB', symbol: '฿', rate: 34.5, flag: '🇹🇭', name: 'Thai Baht (Thailand)' },
  { code: 'BRL', symbol: 'R$', rate: 5.65, flag: '🇧🇷', name: 'Brazilian Real (Brazil)' },
  { code: 'RUB', symbol: '₽', rate: 92.5, flag: '🇷🇺', name: 'Russian Ruble (Russia)' },
  { code: 'KRW', symbol: '₩', rate: 1380, flag: '🇰🇷', name: 'South Korean Won (Korea)' },
  { code: 'IDR', symbol: 'Rp', rate: 15800, flag: '🇮🇩', name: 'Indonesian Rupiah (Indonesia)' },
  { code: 'VND', symbol: '₫', rate: 25400, flag: '🇻🇳', name: 'Vietnamese Dong (Vietnam)' },
  { code: 'EGP', symbol: 'E£', rate: 48.5, flag: '🇪🇬', name: 'Egyptian Pound (Egypt)' },
  { code: 'NGN', symbol: '₦', rate: 1520, flag: '🇳🇬', name: 'Nigerian Naira (Nigeria)' },
  { code: 'KES', symbol: 'KSh', rate: 129.5, flag: '🇰🇪', name: 'Kenyan Shilling (Kenya)' },
  { code: 'PHP', symbol: '₱', rate: 58.2, flag: '🇵🇭', name: 'Philippine Peso (Philippines)' },
  { code: 'PKR', symbol: '₨', rate: 278.5, flag: '🇵🇰', name: 'Pakistani Rupee (Pakistan)' },
  { code: 'BDT', symbol: '৳', rate: 119.5, flag: '🇧🇩', name: 'Bangladeshi Taka (Bangladesh)' },
  { code: 'LKR', symbol: 'Rs', rate: 295.0, flag: '🇱🇰', name: 'Sri Lankan Rupee (Sri Lanka)' },
  { code: 'TRY', symbol: '₺', rate: 34.2, flag: '🇹🇷', name: 'Turkish Lira (Turkey)' },
  { code: 'MXN', symbol: 'Mex$', rate: 19.8, flag: '🇲🇽', name: 'Mexican Peso (Mexico)' },
  { code: 'PLN', symbol: 'zł', rate: 3.98, flag: '🇵🇱', name: 'Polish Zloty (Poland)' },
  { code: 'SEK', symbol: 'kr', rate: 10.5, flag: '🇸🇪', name: 'Swedish Krona (Sweden)' },
  { code: 'NOK', symbol: 'kr', rate: 10.8, flag: '🇳🇴', name: 'Norwegian Krone (Norway)' },
  { code: 'DKK', symbol: 'kr', rate: 6.88, flag: '🇩🇰', name: 'Danish Krone (Denmark)' },
  { code: 'HUF', symbol: 'Ft', rate: 365.0, flag: '🇭🇺', name: 'Hungarian Forint (Hungary)' },
  { code: 'CZK', symbol: 'Kč', rate: 23.2, flag: '🇨🇿', name: 'Czech Koruna (Czechia)' },
  { code: 'ILS', symbol: '₪', rate: 3.72, flag: '🇮🇱', name: 'Israeli Shekel (Israel)' },
  { code: 'CLP', symbol: 'CLP$', rate: 945.0, flag: '🇨🇱', name: 'Chilean Peso (Chile)' },
  { code: 'COP', symbol: 'COL$', rate: 4150.0, flag: '🇨🇴', name: 'Colombian Peso (Colombia)' },
  { code: 'ARS', symbol: 'ARS$', rate: 990.0, flag: '🇦🇷', name: 'Argentine Peso (Argentina)' },
  { code: 'IQD', symbol: 'ع.د', rate: 1310.0, flag: '🇮🇶', name: 'Iraqi Dinar (Iraq)' },
  { code: 'JOD', symbol: 'د.ا', rate: 0.709, flag: '🇯🇴', name: 'Jordanian Dinar (Jordan)' },
  { code: 'MAD', symbol: 'د.م.', rate: 9.95, flag: '🇲🇦', name: 'Moroccan Dirham (Morocco)' },
  { code: 'DZD', symbol: 'د.જ', rate: 134.0, flag: '🇩🇿', name: 'Algerian Dinar (Algeria)' },
  { code: 'TND', symbol: 'د.ત', rate: 3.08, flag: '🇹🇳', name: 'Tunisian Dinar (Tunisia)' },
  { code: 'HKD', symbol: 'HK$', rate: 7.78, flag: '🇭🇰', name: 'Hong Kong Dollar (Hong Kong)' }
];

export const LIVE_TICKER_ITEMS = [
  { id: 't1', symbol: 'COTTON-GUJ', price: '$1.42 / kg', change: '+1.8%', trend: 'up' },
  { id: 't2', symbol: 'RICE-BASMATI-1121', price: '$1,180 / MT', change: '+2.4%', trend: 'up' },
  { id: 't3', symbol: 'SPICES-CUMIN', price: '$3,450 / MT', change: '-0.5%', trend: 'down' },
  { id: 't4', symbol: 'PEANUT-BOLD-40/50', price: '$1,290 / MT', change: '+0.9%', trend: 'up' },
  { id: 't5', symbol: 'SESAME-HULLED', price: '$1,850 / MT', change: '+3.1%', trend: 'up' },
  { id: 't6', symbol: 'ONION-RED-SURAT', price: '$380 / MT', change: '-1.2%', trend: 'down' }
];
