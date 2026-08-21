import fs from 'fs';

async function setupFirebaseRealtimeDB() {
  console.log('⚡ Setting up Live Firebase Realtime Cloud Database Engine...');

  // Firebase Realtime DB Endpoint (Public REST API - No complex auth required for read/write)
  const FIREBASE_URL = 'https://adidev-export-master-default-rtdb.asia-southeast1.firebasedatabase.app/store.json';

  const rawStore = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  // Clean payload for instant cloud sync
  const payload = {
    customProductsList: rawStore.customProductsList || [],
    photoOverrides: rawStore.photoOverrides || {},
    updatedAt: Date.now()
  };

  try {
    console.log('Testing Cloud Sync PUT request...');
    const putRes = await fetch(FIREBASE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('PUT Status:', putRes.status);
    const putData = await putRes.json();
    console.log('PUT Response:', putData ? 'SUCCESS' : 'FAILED');

    console.log('Testing Cloud Sync GET request...');
    const getRes = await fetch(FIREBASE_URL);
    console.log('GET Status:', getRes.status);
    const getData = await getRes.json();
    console.log('⚡ GET Response Success! Products synced:', getData?.customProductsList?.length);
  } catch(e) {
    console.error('Firebase DB Error:', e);
  }
}

setupFirebaseRealtimeDB();
