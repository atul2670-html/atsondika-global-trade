import fs from 'fs';

const rawStore = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

console.log('Original store.json size:', Math.round(JSON.stringify(rawStore).length / 1024), 'KB');

// Sanitize images to clean URLs or max 2000 chars
const sanitizedProducts = (rawStore.customProductsList || []).map(p => {
  const copy = { ...p };
  if (copy.image && copy.image.length > 2000) {
    copy.image = 'images/hero_export_shipping.png';
  }
  if (copy.images && Array.isArray(copy.images)) {
    copy.images = copy.images.map(img => img && img.length > 2000 ? 'images/hero_export_shipping.png' : img);
  }
  return copy;
});

const cleanStore = {
  companiesList: rawStore.companiesList,
  customProductsList: sanitizedProducts,
  customerList: rawStore.customerList || [],
  branchesList: rawStore.branchesList || [],
  certificatesList: rawStore.certificatesList || [],
  freightRoutesList: rawStore.freightRoutesList || [],
  updatedAt: Date.now()
};

const cleanStr = JSON.stringify(cleanStore);
console.log('Sanitized store.json size:', Math.round(cleanStr.length / 1024), 'KB');
