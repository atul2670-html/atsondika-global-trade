import fs from 'fs';

async function setupRealtimeCloudBin() {
  console.log('🌐 Creating Free Shared Cloud Storage Bin for Global Real-time Sync...');

  const storeData = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  // Clean payload (products, photos, custom categories)
  const payload = {
    customProductsList: storeData.customProductsList || [],
    photoOverrides: storeData.photoOverrides || {},
    updatedAt: Date.now()
  };

  const payloadStr = JSON.stringify(payload);
  console.log('Payload size in KB:', Math.round(payloadStr.length / 1024));

  // Test creating bin on jsonbin.io with public key
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$7vN3fH3S.BmLQ0Fv0tE29eFmS/9Xw.0qFh7F8V1T9k5Z3b5b5b5b5',
        'X-Bin-Private': 'false',
        'X-Bin-Name': 'adidev_master_store_live'
      },
      body: payloadStr
    });
    const data = await res.json();
    console.log('JSONBin Response:', data);
  } catch(e) {
    console.error('Error creating bin:', e.message);
  }
}

setupRealtimeCloudBin();
