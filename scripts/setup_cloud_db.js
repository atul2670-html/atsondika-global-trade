import fs from 'fs';

async function setupCloudDb() {
  console.log('🌐 Creating Free Live Cloud Database Bin for Global Real-time Sync...');
  const storeData = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  try {
    // Create bin on JSONBin or npoint
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$7vN3fH3S.BmLQ0Fv0tE29eFmS/9Xw.0qFh7F8V1T9k5Z3b5b5b5b5', // Public master key or test bin
        'X-Bin-Private': 'false',
        'X-Bin-Name': 'adidev_export_live_store'
      },
      body: JSON.stringify(storeData)
    });

    const data = await res.json();
    console.log('Cloud DB Response:', data);
  } catch (err) {
    console.error('Error creating Cloud DB:', err);
  }
}

setupCloudDb();
