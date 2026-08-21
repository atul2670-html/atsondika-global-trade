import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

console.log('Original store.json size:', Math.round(JSON.stringify(raw).length / 1024), 'KB');

// Compress customProductsList & photoOverrides
const cleanProducts = (raw.customProductsList || []).map(p => {
  const copy = { ...p };
  // Limit heavy base64 strings
  if (copy.image && copy.image.length > 50000) {
    copy.image = copy.image.slice(0, 50000);
  }
  if (copy.images && Array.isArray(copy.images)) {
    copy.images = copy.images.map(img => img && img.length > 50000 ? img.slice(0, 50000) : img);
  }
  return copy;
});

const cleanStore = {
  companiesList: raw.companiesList,
  customProductsList: cleanProducts,
  customerList: raw.customerList || [],
  branchesList: raw.branchesList || [],
  certificatesList: raw.certificatesList || [],
  freightRoutesList: raw.freightRoutesList || [],
  updatedAt: Date.now()
};

const cleanStr = JSON.stringify(cleanStore);
console.log('Compressed store size:', Math.round(cleanStr.length / 1024), 'KB');
