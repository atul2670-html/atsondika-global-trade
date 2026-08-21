import fs from 'fs';

async function setupFirebaseCloudEngine() {
  console.log('⚡ Setting up Permanent Firebase Realtime Cloud Engine...');

  // Firebase Realtime DB REST endpoint
  const DB_URL = 'https://adidev-export-global-default-rtdb.firebaseio.com/store.json';

  const rawStore = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  // Optimize payload: preserve all custom products, photos, categories, certificates, and routes
  const payload = {
    customProductsList: rawStore.customProductsList || [],
    photoOverrides: rawStore.photoOverrides || {},
    customerList: rawStore.customerList || [],
    branchesList: rawStore.branchesList || [],
    certificatesList: rawStore.certificatesList || [],
    freightRoutesList: rawStore.freightRoutesList || [],
    updatedAt: Date.now()
  };

  const payloadStr = JSON.stringify(payload);
  console.log('Payload size in KB:', Math.round(payloadStr.length / 1024));

  try {
    console.log('Sending PUT to Firebase REST API...');
    const res = await fetch(DB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: payloadStr
    });
    console.log('Firebase Response Status:', res.status);
    const data = await res.json();
    console.log('Firebase Cloud Engine Test Success! Products count:', data?.customProductsList?.length);
  } catch(e) {
    console.error('Firebase Setup Error:', e);
  }
}

setupFirebaseCloudEngine();
