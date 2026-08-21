import fs from 'fs';

const punjabiDressImg = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80';
const garmentsMainImg = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

// 1. Update data/store.json
const storePath = 'c:/Users/patel/Software/import-export-website/data/store.json';
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

(storeData.customProductsList || []).forEach(p => {
  if (p.id === 'sub-prod-punjabi-dress-comp4' || (p.names?.en || '').toLowerCase().includes('punjabi dress')) {
    p.image = punjabiDressImg;
    p.images = [punjabiDressImg, garmentsMainImg];
  }
  if (p.id === 'main-cat-garments-comp4' || (p.names?.en || '').toLowerCase().includes('readymade garments')) {
    p.image = garmentsMainImg;
    p.images = [garmentsMainImg, punjabiDressImg];
  }
});

// Set photoOverrides as well
storeData.photoOverrides = storeData.photoOverrides || {};
storeData.photoOverrides['sub-prod-punjabi-dress-comp4'] = { image: punjabiDressImg, images: [punjabiDressImg, garmentsMainImg] };
storeData.photoOverrides['main-cat-garments-comp4'] = { image: garmentsMainImg, images: [garmentsMainImg, punjabiDressImg] };
storeData.photoOverrides['punjabi_dress_comp4'] = { image: punjabiDressImg, images: [punjabiDressImg, garmentsMainImg] };
storeData.photoOverrides['main_cat_garments_comp4'] = { image: garmentsMainImg, images: [garmentsMainImg, punjabiDressImg] };

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2));
console.log('✅ Updated data/store.json with high-res Garment & Punjabi Dress photos!');

// 2. Update src/data/initialData.js
const initialDataPath = 'c:/Users/patel/Software/import-export-website/src/data/initialData.js';
let initialContent = fs.readFileSync(initialDataPath, 'utf8');

// Replace image URLs for main_cat_garments_comp4 and punjabi_dress_comp4
initialContent = initialContent.replace(
  /id:\s*"main_cat_garments_comp4"[\s\S]*?image:\s*".*?"/,
  `id: "main_cat_garments_comp4",\n    companyId: "comp_4",\n    category: "garments",\n    isSub: false,\n    hsCode: "620413",\n    image: "${garmentsMainImg}"`
);

initialContent = initialContent.replace(
  /id:\s*"punjabi_dress_comp4"[\s\S]*?image:\s*".*?"/,
  `id: "punjabi_dress_comp4",\n    companyId: "comp_4",\n    category: "garments",\n    parentId: "main_cat_garments_comp4",\n    isSub: true,\n    hsCode: "620413",\n    localHsn: "62041300",\n    image: "${punjabiDressImg}"`
);

fs.writeFileSync(initialDataPath, initialContent);
console.log('✅ Updated src/data/initialData.js with high-res Garment & Punjabi Dress photos!');
