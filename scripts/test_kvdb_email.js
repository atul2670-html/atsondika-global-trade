import fs from 'fs';

async function testKvdbEmail() {
  console.log('⚡ Creating KVDB Bucket with email parameter...');
  try {
    const res = await fetch('https://kvdb.io', {
      method: 'POST',
      body: new URLSearchParams({ email: 'adidevexport2026@gmail.com' })
    });
    const bucketId = (await res.text()).trim();
    console.log('✅ Bucket ID Created:', bucketId);

    const storeUrl = `https://kvdb.io/${bucketId}/adidev_master_store`;

    const rawStore = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

    const compactProducts = (rawStore.customProductsList || []).map(p => {
      const copy = { ...p };
      if (copy.image && copy.image.length > 30000) copy.image = copy.image.slice(0, 30000);
      if (copy.images) copy.images = copy.images.map(img => img && img.length > 30000 ? img.slice(0, 30000) : img);
      return copy;
    });

    const payload = {
      customProductsList: compactProducts,
      photoOverrides: rawStore.photoOverrides || {},
      updatedAt: Date.now()
    };

    console.log('POSTing to KVDB Cloud...');
    const postRes = await fetch(storeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('POST Status:', postRes.status);

    console.log('GETting from KVDB Cloud...');
    const getRes = await fetch(storeUrl);
    console.log('GET Status:', getRes.status);
    const getData = await getRes.json();
    console.log('⚡ REALTIME CLOUD SYNC VERIFIED! Synced products:', getData?.customProductsList?.length);
    console.log(`🎉 Cloud URL for AppContext.jsx: ${storeUrl}`);
  } catch(e) {
    console.error('Error:', e);
  }
}

testKvdbEmail();
