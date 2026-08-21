import fs from 'fs';

async function testKvdbLive() {
  console.log('⚡ Creating Dedicated Global KVDB Cloud Database Bucket...');

  try {
    // Create new KVDB bucket
    const createRes = await fetch('https://kvdb.io', { method: 'POST' });
    const bucketId = (await createRes.text()).trim();
    console.log('✅ Bucket ID Created:', bucketId);

    const storeUrl = `https://kvdb.io/${bucketId}/adidev_master_store`;

    const rawStore = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

    // Create compact payload
    const compactProducts = (rawStore.customProductsList || []).map(p => {
      const copy = { ...p };
      if (copy.image && copy.image.length > 50000) copy.image = copy.image.slice(0, 50000);
      if (copy.images) copy.images = copy.images.map(img => img && img.length > 50000 ? img.slice(0, 50000) : img);
      return copy;
    });

    const payload = {
      customProductsList: compactProducts,
      photoOverrides: rawStore.photoOverrides || {},
      updatedAt: Date.now()
    };

    console.log('POSTing payload to KVDB Cloud...');
    const postRes = await fetch(storeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('POST Status:', postRes.status);

    console.log('GETting payload from KVDB Cloud...');
    const getRes = await fetch(storeUrl);
    console.log('GET Status:', getRes.status);
    const getData = await getRes.json();
    console.log('⚡ KVDB SYNC SUCCESS! Products count:', getData?.customProductsList?.length);
    console.log(`\n🎉 Bucket URL for AppContext.jsx: ${storeUrl}`);
  } catch(e) {
    console.error('KVDB Error:', e);
  }
}

testKvdbLive();
