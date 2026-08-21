import fs from 'fs';

async function testCloudProviders() {
  const sampleData = {
    test: 'adidev_export_live_sync',
    updatedAt: Date.now()
  };

  // Test JSONBin.io (free public endpoint)
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify(sampleData)
    });
    const data = await res.json();
    console.log('JSONBin response:', data);
  } catch(e) {
    console.error('JSONBin error:', e.message);
  }

  // Test KVDB.io (Free public Key-Value DB with CORS)
  try {
    const res = await fetch('https://kvdb.io', {
      method: 'POST'
    });
    const bucketId = await res.text();
    console.log('KVDB Bucket ID:', bucketId);

    if (bucketId && bucketId.length < 30) {
      const saveRes = await fetch(`https://kvdb.io/${bucketId.trim()}/store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sampleData)
      });
      console.log('KVDB Save status:', saveRes.status);
    }
  } catch(e) {
    console.error('KVDB error:', e.message);
  }
}

testCloudProviders();
