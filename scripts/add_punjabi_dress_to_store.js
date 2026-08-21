import fs from 'fs';

const storePath = 'c:/Users/patel/Software/import-export-website/data/store.json';
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

// 1. Add Readymade Garments Main Category for comp_4 & comp_1 if not exists
const hasGarmentsMain = storeData.customProductsList.some(p => p.id === 'main-cat-garments-comp4');
if (!hasGarmentsMain) {
  storeData.customProductsList.unshift({
    id: 'main-cat-garments-comp4',
    companyId: 'comp_4',
    category: 'garments',
    isSub: false,
    hsCode: '620413',
    names: {
      gu: 'રેડિ-મેડ ગારમેન્ટ્સ (Readymade Garments)',
      en: 'Readymade Garments',
      hi: 'રેડિ-મેડ ગારમેન્ટ્સ',
      fr: 'Vêtements Confectionnés'
    },
    spec: 'Premium Export Quality Category. For Mens, Womens and Childrens.',
    packaging: 'Export Carton Packing',
    moq: '1 Container / Shipment'
  });
}

// 2. Add Punjabi Dress Sub-Product for comp_4 if not exists
const hasPunjabiDress = storeData.customProductsList.some(p => p.id === 'sub-prod-punjabi-dress-comp4');
if (!hasPunjabiDress) {
  storeData.customProductsList.unshift({
    id: 'sub-prod-punjabi-dress-comp4',
    companyId: 'comp_4',
    category: 'garments',
    parentId: 'main-cat-garments-comp4',
    isSub: true,
    hsCode: '620413',
    names: {
      gu: 'પંજાબી ડ્રેસ (Punjabi Dress)',
      en: 'Punjabi Dress',
      hi: 'પંજાબી ડ્રેસ',
      fr: 'Robe Punjabi'
    },
    spec: 'ઉચ્ચ ગુણવત્તાયુક્ત પ્રીમિયમ પ્રોડક્ટ (Premium Designer Punjabi Suits & Dresses)',
    packaging: 'Standard Export Packaging',
    moq: '1 Unit / Container',
    isCustom: true
  });
}

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2));
console.log('✅ Successfully added Readymade Garments & Punjabi Dress to store.json!');
