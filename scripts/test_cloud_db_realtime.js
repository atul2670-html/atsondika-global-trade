import fs from 'fs';

async function testCloudDbRealtime() {
  console.log('Testing Cloud Database endpoints...');

  // Create lightweight store sample
  const raw = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  const cleanStore = {
    companiesList: raw.companiesList,
    customProductsList: (raw.customProductsList || []).map(p => ({
      id: p.id,
      companyId: p.companyId || 'comp_1',
      category: p.category,
      parentId: p.parentId || null,
      isSub: p.isSub,
      hsCode: p.hsCode,
      names: p.names,
      spec: p.spec,
      packaging: p.packaging,
      moq: p.moq,
      image: p.image?.startsWith('data:') ? p.image.slice(0, 50000) : p.image,
      images: (p.images || []).map(img => img?.startsWith('data:') ? img.slice(0, 50000) : img)
    })),
    customerList: raw.customerList || [],
    branchesList: raw.branchesList || [],
    certificatesList: raw.certificatesList || [],
    freightRoutesList: raw.freightRoutesList || [],
    updatedAt: Date.now()
  };

  const payloadStr = JSON.stringify(cleanStore);
  console.log('Lightweight payload size:', Math.round(payloadStr.length / 1024), 'KB');

  // Test 1: JSONStorage.net
  try {
    const res = await fetch('https://jsonstorage.net/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payloadStr
    });
    const data = await res.json();
    console.log('JSONStorage response:', data);
  } catch(e) {
    console.error('JSONStorage error:', e.message);
  }
}

testCloudDbRealtime();
