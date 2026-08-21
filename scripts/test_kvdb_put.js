import fs from 'fs';

async function testKvdbPut() {
  const bucketId = 'KXM9oj6ejGwcgyQKChVhkC';
  const storeUrl = `https://kvdb.io/${bucketId}/adidev_master_store`;

  const rawStore = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  const compactProducts = (rawStore.customProductsList || []).map(p => {
    const copy = { ...p };
    if (copy.image && copy.image.length > 20000) copy.image = copy.image.slice(0, 20000);
    if (copy.images) copy.images = copy.images.map(img => img && img.length > 20000 ? img.slice(0, 20000) : img);
    return copy;
  });

  const payload = {
    customProductsList: compactProducts,
    photoOverrides: rawStore.photoOverrides || {},
    updatedAt: Date.now()
  };

  const payloadStr = JSON.stringify(payload);
  console.log('Payload size:', Math.round(payloadStr.length / 1024), 'KB');

  try {
    console.log('PUT payload to KVDB...');
    const putRes = await fetch(storeUrl, {
      method: 'POST',
      body: payloadStr
    });
    console.log('POST Status:', putRes.status);
    const text = await putRes.text();
    console.log('Response text:', text);

    console.log('GETting payload from KVDB...');
    const getRes = await fetch(storeUrl);
    console.log('GET Status:', getRes.status);
    const getData = await getRes.json();
    console.log('⚡ REALTIME CLOUD SYNC SUCCESS! Synced products:', getData?.customProductsList?.length);
  } catch(e) {
    console.error('Error:', e);
  }
}

testKvdbPut();
