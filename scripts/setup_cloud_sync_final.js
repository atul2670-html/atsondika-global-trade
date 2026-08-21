import fs from 'fs';

async function setupCloudSyncFinal() {
  console.log('🌐 Creating Dedicated Free Cloud Storage Bucket for Adidev Export...');

  // Create clean initial payload
  const raw = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  const payload = {
    companiesList: raw.companiesList,
    customProductsList: raw.customProductsList || [],
    photoOverrides: raw.photoOverrides || {},
    customerList: raw.customerList || [],
    branchesList: raw.branchesList || [],
    certificatesList: raw.certificatesList || [],
    freightRoutesList: raw.freightRoutesList || [],
    updatedAt: Date.now()
  };

  // Test creating bin on jsonbin.io or npoint.io or myjson
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$7vN3fH3S.BmLQ0Fv0tE29eFmS/9Xw.0qFh7F8V1T9k5Z3b5b5b5b5',
        'X-Bin-Private': 'false',
        'X-Bin-Name': 'adidev_export_master_bin'
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log('JSONBin Response:', data);
  } catch(e) {
    console.error('Error creating bin:', e);
  }
}

setupCloudSyncFinal();
