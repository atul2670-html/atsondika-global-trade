import fs from 'fs';

async function testJsonbinMaster() {
  console.log('⚡ Creating Global Master Cloud Storage Bin on JSONBin...');

  const rawStore = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  // Compress heavy base64 strings so payload is under 1 MB
  const cleanProducts = (rawStore.customProductsList || []).map(p => {
    const copy = { ...p };
    if (copy.image && copy.image.startsWith('data:image') && copy.image.length > 50000) {
      copy.image = copy.image.slice(0, 50000);
    }
    if (copy.images && Array.isArray(copy.images)) {
      copy.images = copy.images.map(img => img && img.startsWith('data:image') && img.length > 50000 ? img.slice(0, 50000) : img);
    }
    return copy;
  });

  const payload = {
    customProductsList: cleanProducts,
    photoOverrides: rawStore.photoOverrides || {},
    updatedAt: Date.now()
  };

  const payloadStr = JSON.stringify(payload);
  console.log('Payload size in KB:', Math.round(payloadStr.length / 1024));

  // JSONBin Free API Key
  const API_KEY = '$2a$10$tZ2c6z8/Y4u5K0H1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0'; // Master Key format

  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2b$10$WpW2.348/7v.e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5',
        'X-Bin-Private': 'false'
      },
      body: payloadStr
    });
    console.log('JSONBin Status:', res.status);
    const data = await res.json();
    console.log('Response:', data);
  } catch(e) {
    console.error('Error:', e);
  }
}

testJsonbinMaster();
