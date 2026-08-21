import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

(raw.customProductsList || []).forEach(p => {
  const name = p.names?.en || p.names?.gu || p.id;
  const mainLen = p.image ? p.image.length : 0;
  const imgsLen = (p.images || []).reduce((acc, img) => acc + (img ? img.length : 0), 0);
  console.log(`Product "${name}": mainImg = ${Math.round(mainLen/1024)} KB, totalImgs = ${Math.round(imgsLen/1024)} KB`);
});
