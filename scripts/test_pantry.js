import fs from 'fs';

async function testPantry() {
  console.log('Testing Pantry Cloud API (Free CORS JSON DB)...');

  // Pantry ID: adidev-export-global-store-2026
  const pantryId = '8f3b2d1e-9a4c-4e5f-8b2a-1c3d5e7f9a0b';
  const basketName = 'adidev_master_store';
  const apiUrl = `https://getpantry.cloud/apiv1/pantry/${pantryId}/basket/${basketName}`;

  const raw = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  const payload = {
    updatedAt: Date.now(),
    companiesCount: raw.companiesList?.length,
    productsCount: raw.customProductsList?.length
  };

  try {
    console.log('POST payload to Pantry Cloud API...');
    const postRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('POST Status:', postRes.status);
    const postData = await postRes.text();
    console.log('POST Response:', postData);

    console.log('GET payload from Pantry Cloud API...');
    const getRes = await fetch(apiUrl);
    const getData = await getRes.json();
    console.log('GET Response:', getData);
  } catch(e) {
    console.error('Pantry API error:', e);
  }
}

testPantry();
