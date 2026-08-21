import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

// Compress base64 images to reasonable max lengths or clean URLs
const compactProducts = (raw.customProductsList || []).map(p => {
  const copy = { ...p };
  if (copy.image && copy.image.length > 80000) {
    copy.image = copy.image.slice(0, 80000);
  }
  if (copy.images && Array.isArray(copy.images)) {
    copy.images = copy.images.map(img => img && img.length > 80000 ? img.slice(0, 80000) : img);
  }
  return copy;
});

const compactOverrides = {};
for (const [key, val] of Object.entries(raw.photoOverrides || {})) {
  compactOverrides[key] = {
    image: val.image && val.image.length > 80000 ? val.image.slice(0, 80000) : val.image,
    images: (val.images || []).map(img => img && img.length > 80000 ? img.slice(0, 80000) : img)
  };
}

const cleanPayload = {
  customProductsList: compactProducts,
  photoOverrides: compactOverrides,
  updatedAt: Date.now()
};

const payloadStr = JSON.stringify(cleanPayload);
console.log('Compact Payload size in KB:', Math.round(payloadStr.length / 1024));
