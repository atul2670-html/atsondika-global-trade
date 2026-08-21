import fs from 'fs';

const storePath = 'c:/Users/patel/Software/import-export-website/data/store.json';
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

console.log('Inspecting photoOverrides in store.json...');
console.log('photoOverrides keys:', Object.keys(storeData.photoOverrides || {}));

console.log('\nInspecting customProductsList in store.json...');
(storeData.customProductsList || []).forEach(p => {
  const name = p.names?.en || p.names?.gu || p.id;
  const hasImg = !!p.image;
  const imgLen = p.image ? p.image.length : 0;
  console.log(`Product "${name}" (${p.id}): image length = ${imgLen}`);
});
