import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

for (const key of Object.keys(raw)) {
  const sizeKb = Math.round(JSON.stringify(raw[key]).length / 1024);
  console.log(`Field "${key}": ${sizeKb} KB`);
}
