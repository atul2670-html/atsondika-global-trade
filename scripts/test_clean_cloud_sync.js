import fs from 'fs';

async function testCleanCloudSync() {
  const bucketId = 'KXM9oj6ejGwcgyQKChVhkC';
  const storeUrl = `https://kvdb.io/${bucketId}/adidev_master_store`;

  const rawStore = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  // Strip massive base64 strings to clean image URLs or max 2000 chars
  const cleanProducts = (rawStore.customProductsList || []).map(p => {
    const copy = { ...p };
    if (copy.image && copy.image.startsWith('data:image') && copy.image.length > 2000) {
      copy.image = 'images/hero_export_shipping.png';
    }
    if (copy.images && Array.isArray(copy.images)) {
      copy.images = copy.images.map(img => img && img.startsWith('data:image') && img.length > 2000 ? 'images/hero_export_shipping.png' : img);
    }
    return copy;
  });

  const payload = {
    customProductsList: cleanProducts,
    photoOverrides: {},
    updatedAt: Date.now()
  };

  const payloadStr = JSON.stringify(payload);
  console.log('Clean Payload size:', Math.round(payloadStr.length / 1024), 'KB');

  try {
    console.log('Posting clean payload to KVDB...');
    const postRes = await fetch(storeUrl, {
      method: 'POST',
      body: payloadStr
    });
    console.log('POST Status:', postRes.status);
    const resText = await postRes.text();
    console.log('POST Response:', resText);

    console.log('GETting payload from KVDB...');
    const getRes = await fetch(storeUrl);
    console.log('GET Status:', getRes.status);
    const getData = await getRes.json();
    console.log('⚡ REALTIME CLOUD SYNC SUCCESS! Products count:', getData?.customProductsList?.length);
    console.log('🎉 Store URL for AppContext.jsx:', storeUrl);
  } catch(e) {
    console.error('Error:', e);
  }
}

testCleanCloudSync();
