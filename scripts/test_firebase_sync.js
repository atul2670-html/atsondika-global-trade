import fs from 'fs';

async function testFirebaseSync() {
  console.log('Testing Firebase Realtime Database REST API...');

  // Public test Firebase database REST URL
  const firebaseUrl = 'https://adidev-export-live-default-rtdb.firebaseio.com/store.json';

  const raw = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  // Optimize base64 image strings if overly huge
  const cleanProducts = (raw.customProductsList || []).map(p => {
    const copy = { ...p };
    if (copy.image && copy.image.length > 500000) {
      copy.image = copy.image.slice(0, 500000);
    }
    if (copy.images && Array.isArray(copy.images)) {
      copy.images = copy.images.map(img => img && img.length > 500000 ? img.slice(0, 500000) : img);
    }
    return copy;
  });

  const payload = {
    companiesList: raw.companiesList,
    customProductsList: cleanProducts,
    customerList: raw.customerList || [],
    branchesList: raw.branchesList || [],
    certificatesList: raw.certificatesList || [],
    freightRoutesList: raw.freightRoutesList || [],
    heroBanner: raw.heroBanner,
    aboutData: raw.aboutData,
    updatedAt: Date.now()
  };

  try {
    console.log('PUT payload to Firebase REST API...');
    const putRes = await fetch(firebaseUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('PUT Status:', putRes.status);
    const putData = await putRes.json();
    console.log('PUT Response:', Object.keys(putData || {}));

    console.log('GET payload from Firebase REST API...');
    const getRes = await fetch(firebaseUrl);
    const getData = await getRes.json();
    console.log('GET Success! Companies count:', getData.companiesList?.length, 'Products count:', getData.customProductsList?.length);
  } catch(e) {
    console.error('Firebase REST error:', e);
  }
}

testFirebaseSync();
